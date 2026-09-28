import * as THREE from 'three'

import type { Card } from '../engine/cards'
import type { GameEvent } from '../engine/game'
import { isKnown, type TableCard, type TableSnapshot as Snapshot } from '../../lan/protocol'
import { clamp01, easeInOutCubic, easeOutCubic, prefersReducedMotion } from './animation'
import { fitCamera, makeCamera } from './camera'
import { DRAW_SPAWN, jitter, layoutTable, onSeat, pileTarget, REVEAL_POS, seatsFor, type CardTarget } from './layout'
import { installLighting, type LightRig } from './lighting'
import { disposeCard, disposeCardGeometry, makeCard } from './objects/card'
import { buildPiles, type TablePiles } from './objects/piles'
import { buildTable } from './objects/table'
import { installRoom } from './room'
import { disposeCardTextures } from './textures/cardTextures'
import { glowTexture } from './textures/surfaces'
import { BURN_POS, CH, DRAW_POS, PILE_POS } from './world'

// ── MOTION PROFILES ─────────────────────────────────────────────────────────────────
// v1 gave every change the same 420 ms arc with a 0.33 rad spin: a card sliding one
// slot along a bot's hand hopped and twirled like a dealt card, and a 30-card pickup
// queued for a second. A Codex review measured it and prescribed one profile per kind
// of movement. The numbers below are those, and the principle is: the more often a
// movement happens, the shorter, flatter and quieter it is.
type Profile = { duration: number; lift: number; stagger: number; ease: (t: number) => number; spin: number; impact: boolean }
const P = {
  deal: { duration: 0.28, lift: 0.2, stagger: 0.028, ease: easeOutCubic, spin: 0.04, impact: false },
  play: { duration: 0.28, lift: 0.12, stagger: 0.035, ease: easeInOutCubic, spin: 0, impact: true },
  refill: { duration: 0.26, lift: 0.18, stagger: 0.055, ease: easeOutCubic, spin: 0, impact: false },
  rearrange: { duration: 0.14, lift: 0, stagger: 0, ease: easeOutCubic, spin: 0, impact: false },
  packet: { duration: 0.34, lift: 0.1, stagger: 0, ease: easeInOutCubic, spin: 0, impact: false },
  burn: { duration: 0.3, lift: 0.08, stagger: 0, ease: easeInOutCubic, spin: 0, impact: false },
  gather: { duration: 0.36, lift: 0.1, stagger: 0, ease: easeInOutCubic, spin: 0, impact: false },
  reveal: { duration: 0.3, lift: 0, stagger: 0, ease: easeInOutCubic, spin: 0, impact: false },
} satisfies Record<string, Profile>

const HOLD_REVEAL_MS = 220
const HOLD_BEFORE_BURN_MS = 100
const HOLD_BEFORE_DEAL_MS = 100
const GLOW_FADE = 0.16

type Motion = {
  from: THREE.Vector3
  to: THREE.Vector3
  yawFrom: number
  yawTo: number
  scaleFrom: number
  scaleTo: number
  t: number
  profile: Profile
  done?: () => void
}

type Flip = { from: number; to: number; t: number; duration: number }

/**
 * A card on the table. The OUTER group carries position, yaw and scale; the INNER card
 * carries only the flip. Composing a flip with a yaw on one Euler (v1) made a turning
 * card wobble around a skewed axis, and a centred X flip swung the card's edge ~0.35
 * units through the felt. Splitting them makes each rotation clean, and the flip lifts
 * the inner card by exactly the clearance its half-length needs.
 */
type Entry = { outer: THREE.Group; inner: THREE.Group; motion: Motion | null; flip: Flip | null; faceDown: boolean; known: boolean }

/** Sounds tied to what the player SEES, fired by the scene when it happens on screen. */
export type SceneSfx = {
  /** One card set of a play lands on the pile (once per play, not per card). */
  place(): void
  /** The opening deal starts (one sound for the whole deal). */
  deal(): void
  /** A blind or chance card turns over. */
  reveal(): void
  /** The pile goes up in smoke. */
  burn(): void
  /** A pile slides to someone's hand. */
  gather(): void
}

/** Your hand is DOM, so moves into and out of it are overlays the view animates. The
 *  scene calls these at the right point of a sequence and waits for them. */
export type SelfHooks = {
  /** Your hand cards are about to land on the pile: fly them there, then resolve. */
  play(cards: Card[], destination?: Projected): Promise<void>
  /** These cards just went from the table (or draw pile) into your hand. */
  receive(cards: Card[], from: 'pile' | 'draw'): Promise<void>
}

/** A point on the table projected into stage pixels, plus how wide a card is there. */
export type Projected = { x: number; y: number; cardWidth: number }

/**
 * The Skitgubbe table in 3D, built on Mini Games' Blackjack scene (camera, light rig,
 * room, table body, card construction and SVG texture pipeline, all derived and
 * screenshot-verified in that game's spec). What is Skitgubbe's own is the director:
 * animate(prev, next, events) plays each engine action as a visible sequence and
 * resolves when it is over, so the view can hold the next turn until the table is still.
 */
export class SkitgubbeScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private lights: LightRig
  private ro: ResizeObserver
  private raf = 0
  private disposed = false
  private clock = new THREE.Clock()
  private reducedMotion = prefersReducedMotion()
  private cards = new Map<string, Entry>()
  private table: ReturnType<typeof buildTable>
  private piles: TablePiles
  private gameId = -1
  /** Bumped by every new game and dispose: a sequence that awaits across a bump stops. */
  private generation = 0
  private glows: THREE.Mesh[] = []
  private glowTarget = -1
  private glowLevel: number[] = []
  private burnFlash: THREE.Mesh
  private burnFlashT = 1
  private scratch = new THREE.Vector3()
  private onResize: (() => void) | null = null

  constructor(private container: HTMLElement, private sfx: SceneSfx) {
    const w = Math.max(1, container.clientWidth)
    const h = Math.max(1, container.clientHeight)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    this.renderer.setSize(w, h)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    // lighting.ts's intensities are calibrated at exactly this exposure.
    this.renderer.toneMappingExposure = 1.0
    container.appendChild(this.renderer.domElement)

    this.camera = makeCamera(w / h)
    installRoom(this.scene)
    this.lights = installLighting(this.scene, this.renderer)
    this.table = buildTable(this.scene)
    this.piles = buildPiles(this.scene)

    // A soft ember under the pile when it burns. An additive sprite, never bloom
    // (Blackjack's spec §2.2 is why this scene has no post-processing at all).
    this.burnFlash = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 2.6),
      new THREE.MeshBasicMaterial({ map: glowTexture(), color: 0xffa15a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    this.burnFlash.rotation.x = -Math.PI / 2
    this.burnFlash.position.set(PILE_POS.x, 0.02, PILE_POS.z)
    this.scene.add(this.burnFlash)

    this.ro = new ResizeObserver(() => this.resize())
    this.ro.observe(container)
    this.loop = this.loop.bind(this)
    this.raf = requestAnimationFrame(this.loop)
  }

  /** Called after every resize so the view can re-anchor its DOM labels. */
  setOnResize(fn: (() => void) | null): void {
    this.onResize = fn
  }

  // --- projection for DOM anchors and flights ----------------------------------------

  project(world: THREE.Vector3): Projected {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    const a = this.scratch.copy(world).project(this.camera)
    const b = new THREE.Vector3(world.x + 1.42, world.y, world.z).project(this.camera)
    return { x: (a.x * 0.5 + 0.5) * w, y: (-a.y * 0.5 + 0.5) * h, cardWidth: Math.abs(b.x - a.x) * 0.5 * w }
  }

  pileAnchor(): Projected { return this.project(new THREE.Vector3(PILE_POS.x, 0.1, PILE_POS.z)) }
  drawAnchor(): Projected { return this.project(new THREE.Vector3(DRAW_POS.x, 0.5, DRAW_POS.z)) }
  burnAnchor(): Projected { return this.project(new THREE.Vector3(BURN_POS.x, 0.2, BURN_POS.z)) }

  /** Where an opponent's name plate belongs: at the far end of their table row, where
   *  it labels their cards without covering any (the first placement sat on the hand). */
  seatAnchor(players: number, seatIndex: number): Projected {
    const seat = seatsFor(players)[seatIndex]!
    if (seat.side) return this.project(new THREE.Vector3(seat.out.x * seat.depth, 0.1, -(seat.gap + 1.55)))
    // A small screen-space badge on the far rail clears the back row even as the
    // camera fits a different stage aspect. Its centre remains aligned to that seat.
    return { ...this.project(onSeat(seat, 0, seat.depth, 0.1)), y: 20 }

  }

  // --- the director ------------------------------------------------------------------

  /**
   * Play what happened between two snapshots, then settle into `next`. Resolves when
   * the table is still. A new game (different gameId) gathers the old cards first and
   * then deals.
   */
  async animate(prev: Snapshot | null, next: Snapshot, events: GameEvent[], self: SelfHooks): Promise<void> {
    if (this.disposed) return
    this.table.setRules(next.rules)
    if (!prev || next.gameId !== this.gameId) return this.newGame(next, self)
    const gen = this.generation
    // Visual order of the pile, kept in step with the engine's as events are replayed.
    let pile = [...prev.pile]
    let revealed: Card | null = null
    // Received cards belong to this action, even if absent from the previous pile
    // (notably a failed blind/chance reveal). They must never be refilled a second
    // time from the deck during final reconciliation.
    const receivedSelf = new Set<string>()

    for (const e of events) {
      if (gen !== this.generation) return
      if (e.type === 'stack') {
        const target = layoutTable(next).get(e.card.id)!
        if (e.player === 0) {
          await self.play([e.card], this.project(target.position))
          this.place(e.card, target)
        } else await this.moveAll([[e.card, target]], P.play)
        this.sfx.place()
      } else if (e.type === 'play') {
        if (e.player === 0 && e.source === 'hand') {
          await self.play(e.cards)
          if (gen !== this.generation) return
          // The overlay has arrived: the real cards appear in place, settled.
          e.cards.forEach((card, i) => this.place(card, pileTarget(card, pile.length + i)))
        } else {
          await this.moveAll(e.cards.map((card, i) => [card, pileTarget(card, pile.length + i)] as const), P.play)
        }
        pile = [...pile, ...e.cards]
        this.sfx.place()
      } else if (e.type === 'flip' || e.type === 'chance') {
        // Blind cards are held up where everyone can read them, then land or are taken.
        if (!this.cards.has(e.card.id)) this.spawn(e.card, DRAW_SPAWN, 0, true)
        this.sfx.reveal()
        await this.moveAll([[e.card, { position: REVEAL_POS.clone(), yaw: 0, faceDown: false, scale: 1.12, order: 0 }]], P.reveal)
        await this.wait(HOLD_REVEAL_MS, gen)
        if (e.ok) {
          await this.moveAll([[e.card, pileTarget(e.card, pile.length)]], P.play)
          pile = [...pile, e.card]
          this.sfx.place()
        } else {
          revealed = e.card
        }
      } else if (e.type === 'burn') {
        await this.wait(HOLD_BEFORE_BURN_MS, gen)
        this.burnFlashT = this.reducedMotion ? 1 : 0
        this.sfx.burn()
        await this.retire(pile, new THREE.Vector3(BURN_POS.x, 0.6, BURN_POS.z), P.burn)
        pile = []
        this.piles.setBurned(next.burnedCount / 52)
      } else if (e.type === 'pickup') {
        const taken = revealed ? [...pile, revealed] : pile
        revealed = null
        this.sfx.gather()
        if (e.player === 0) {
          // Into YOUR hand: the table cards leave, and the view flies them into the rail.
          await Promise.all([this.retire(taken, this.nearEdge(), P.packet, true), self.receive(taken, 'pile')])
          taken.forEach(card => receivedSelf.add(card.id))
        } else {
          const targets = layoutTable(next)
          await this.moveAll(taken.map(card => [card, targets.get(card.id)!] as const).filter(([, t]) => t), P.packet)
        }
        pile = []
      }
    }
    if (gen !== this.generation) return
    await this.settle(prev, next, self, receivedSelf)
  }

  /** Reach the resting layout of `next`: refills come off the draw pile, everything else
   *  that moved slides without a hop, and the turn light moves to whoever is next. */
  private async settle(prev: Snapshot, next: Snapshot, self: SelfHooks, receivedSelf: ReadonlySet<string>): Promise<void> {
    const gen = this.generation
    const targets = layoutTable(next)
    const arrivals: Array<[TableCard, CardTarget]> = []
    const shifts: Array<[TableCard, CardTarget]> = []
    for (const [id, target] of targets) {
      const card = findCard(next, id)!
      if (!this.cards.has(id)) arrivals.push([card, target])
      else shifts.push([card, target])
    }
    // Cards that left the table without an event path (defensive: should not happen).
    for (const id of [...this.cards.keys()]) if (!targets.has(id)) this.remove(id)

    const prevMine = new Set(prev.players[0]!.hand.map(c => c.id))
    const pileBefore = new Set(prev.pile.map(c => c.id))
    const drawnForMe = next.players[0]!.hand.filter(c => !receivedSelf.has(c.id) && !prevMine.has(c.id) && !pileBefore.has(c.id) && !this.cards.has(c.id))

    this.piles.setDraw(next.drawCount / 52)
    arrivals.forEach(([card]) => this.spawn(card, DRAW_SPAWN, 0, true))
    await Promise.all([
      this.moveAll(shifts, P.rearrange),
      this.moveAll(arrivals, P.refill),
      drawnForMe.length ? self.receive(drawnForMe.filter(isKnown), 'draw') : Promise.resolve(),
    ])
    if (gen !== this.generation) return
    this.showTurn(next)
  }

  private async newGame(next: Snapshot, self: SelfHooks): Promise<void> {
    const gen = ++this.generation
    this.gameId = next.gameId
    this.hideTurn()
    // Gather the old cards to the deck FIRST, then deal. v1 dealt while the previous
    // game's cards were still flying back, and 54 cards crossed paths around the deck.
    if (this.cards.size) {
      await this.retire([...this.cards.keys()].map(id => ({ id }) as Card), DRAW_SPAWN.clone(), P.gather)
      if (gen !== this.generation) return
      await this.wait(HOLD_BEFORE_DEAL_MS, gen)
    }
    this.piles.setBurned(0)
    this.piles.setDraw(1)
    if (gen !== this.generation) return

    const targets = [...layoutTable(next)].sort((a, b) => a[1].order - b[1].order)
    this.sfx.deal()
    for (const [id] of targets) this.spawn(findCard(next, id)!, DRAW_SPAWN, 0, true)
    await Promise.all([
      this.moveAll(targets.map(([id, t]) => [findCard(next, id)!, t] as const), P.deal),
      // Your three hand cards arrive in the rail as the round that deals hands reaches you.
      (async () => {
        await this.wait(Math.round(targets.length * P.deal.stagger * 1000 * 0.66), gen)
        if (gen === this.generation) await self.receive(next.players[0]!.hand.filter(isKnown), 'draw')
      })(),
    ])
    if (gen !== this.generation) return
    this.piles.setDraw(next.drawCount / 52)
    this.showTurn(next)
  }

  sync(next: Snapshot): void {
    ++this.generation
    this.gameId = next.gameId
    for (const id of [...this.cards.keys()]) this.remove(id)
    this.table.setRules(next.rules)
    for (const [id, target] of layoutTable(next)) {
      const entry = this.spawn(findCard(next, id)!, target.position, target.yaw, target.faceDown)
      entry.outer.scale.setScalar(target.scale)
    }
    this.piles.setDraw(next.drawCount / 52)
    this.piles.setBurned(next.burnedCount / 52)
    this.showTurn(next)
  }

  // --- movement primitives -------------------------------------------------------------

  private spawn(card: TableCard, at: THREE.Vector3, yaw: number, faceDown: boolean): Entry {
    const existing = this.cards.get(card.id)
    if (existing) {
      // An opponent's back becomes public only when its action arrives. Replace
      // its blank face in place; spawning from the draw pile would reveal twice.
      if (!existing.known && isKnown(card)) {
        const inner = makeCard(card.rank, card.suit)
        inner.rotation.copy(existing.inner.rotation)
        existing.outer.remove(existing.inner)
        disposeCard(existing.inner)
        existing.outer.add(inner)
        existing.inner = inner
        existing.known = true
      }
      return existing
    }
    const inner = isKnown(card) ? makeCard(card.rank, card.suit) : makeCard()
    inner.rotation.x = faceDown ? Math.PI : 0
    const outer = new THREE.Group()
    outer.add(inner)
    outer.position.copy(at)
    outer.rotation.y = yaw
    this.scene.add(outer)
    const entry: Entry = { outer, inner, motion: null, flip: null, faceDown, known: isKnown(card) }
    this.cards.set(card.id, entry)
    return entry
  }

  /** Put a card straight into a resting pose (a card arriving from your DOM hand). */
  private place(card: Card, target: CardTarget): void {
    const entry = this.spawn(card, target.position, target.yaw, false)
    entry.outer.position.copy(target.position)
    entry.outer.rotation.y = target.yaw
    entry.outer.scale.setScalar(target.scale)
    entry.inner.rotation.x = 0
    entry.faceDown = false
  }

  /** Move cards to targets with one profile; resolves when the last one has landed. */
  private moveAll(moves: ReadonlyArray<readonly [TableCard, CardTarget]>, profile: Profile): Promise<void> {
    if (!moves.length) return Promise.resolve()
    return new Promise(resolve => {
      let pending = moves.length
      const done = () => { if (--pending === 0) resolve() }
      moves.forEach(([card, target], i) => {
        const entry = this.spawn(card, DRAW_SPAWN, 0, true)
        const stagger = profile === P.deal ? target.order : i
        if (this.reducedMotion) {
          entry.outer.position.copy(target.position)
          entry.outer.rotation.y = target.yaw
          entry.outer.scale.setScalar(target.scale)
          entry.inner.rotation.x = target.faceDown ? Math.PI : 0
          entry.inner.position.y = 0
          entry.faceDown = target.faceDown
          entry.motion = null
          entry.flip = null
          done()
          return
        }
        entry.motion = {
          from: entry.outer.position.clone(),
          to: target.position.clone(),
          yawFrom: entry.outer.rotation.y,
          yawTo: shortestYaw(entry.outer.rotation.y, target.yaw),
          scaleFrom: entry.outer.scale.x,
          scaleTo: target.scale,
          t: -stagger * profile.stagger,
          profile,
          done,
        }
        if (entry.faceDown !== target.faceDown) {
          // The turn-over rides on the same travel, so a card is never seen flipping
          // in place before it moves.
          entry.flip = { from: entry.inner.rotation.x, to: target.faceDown ? Math.PI : 0, t: -stagger * profile.stagger, duration: profile.duration }
          entry.faceDown = target.faceDown
        }
      })
    })
  }

  /** Move cards as one packet to `to` and remove them on arrival. */
  private retire(cards: Array<Pick<Card, 'id'>>, to: THREE.Vector3, profile: Profile, fadeOnly = false): Promise<void> {
    const ids = cards.map(c => c.id).filter(id => this.cards.has(id))
    if (!ids.length) return Promise.resolve()
    if (this.reducedMotion || fadeOnly) {
      for (const id of ids) this.remove(id)
      return Promise.resolve()
    }
    // One packet: every card keeps its offset from the packet's centre and travels
    // together, with no per-card stagger. v1 staggered 70 ms per card, so a 30-card
    // burn became a 2.5 second queue of shrinking, spinning cards.
    const centre = new THREE.Vector3()
    for (const id of ids) centre.add(this.cards.get(id)!.outer.position)
    centre.divideScalar(ids.length)
    return new Promise(resolve => {
      let pending = ids.length
      for (const id of ids) {
        const entry = this.cards.get(id)!
        const offset = entry.outer.position.clone().sub(centre).multiplyScalar(0.35)
        entry.motion = {
          from: entry.outer.position.clone(),
          to: to.clone().add(offset).setY(to.y + offset.y),
          yawFrom: entry.outer.rotation.y,
          yawTo: entry.outer.rotation.y + jitter(id, 9) * 0.08,
          scaleFrom: entry.outer.scale.x,
          scaleTo: entry.outer.scale.x,
          t: 0,
          profile,
          done: () => {
            this.remove(id)
            if (--pending === 0) resolve()
          },
        }
      }
    })
  }

  private remove(id: string): void {
    const entry = this.cards.get(id)
    if (!entry) return
    this.scene.remove(entry.outer)
    disposeCard(entry.inner)
    this.cards.delete(id)
  }

  private nearEdge(): THREE.Vector3 {
    return new THREE.Vector3(0, 0.6, 5.6)
  }

  private wait(ms: number, gen: number): Promise<void> {
    if (this.reducedMotion || gen !== this.generation) return Promise.resolve()
    return new Promise(resolve => window.setTimeout(resolve, ms))
  }

  // --- turn light ----------------------------------------------------------------------

  /** One fixed pool of lamplight per seat; the active one fades up only once the action
   *  is over. v1's single light travelled across the table and announced the next turn
   *  before the played card had even landed. */
  private showTurn(snap: Snapshot): void {
    if (this.glows.length !== snap.players.length) this.buildGlows(snap.players.length)
    this.glowTarget = snap.phase === 'playing' ? snap.current : -1
  }

  private hideTurn(): void {
    this.glowTarget = -1
  }

  private buildGlows(count: number): void {
    for (const g of this.glows) this.scene.remove(g)
    const tex = glowTexture()
    this.glows = seatsFor(count).map(seat => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(4.8, 1.6),
        new THREE.MeshBasicMaterial({ map: tex, color: 0xffd98a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
      )
      mesh.rotation.x = -Math.PI / 2
      if (seat.side) mesh.rotation.z = Math.PI / 2
      onSeat(seat, 0, seat.depth + (seat.side ? 0.1 : 0.2), 0.012, mesh.position)
      this.scene.add(mesh)
      return mesh
    })
    this.glowLevel = this.glows.map(() => 0)
  }

  // --- render loop -----------------------------------------------------------------------

  private loop(): void {
    if (this.disposed) return
    // Clamp: a background tab can hand back a multi-second delta and teleport everything.
    const dt = Math.min(0.05, this.clock.getDelta())

    for (const entry of this.cards.values()) {
      const m = entry.motion
      if (m) {
        m.t += dt
        const raw = clamp01(m.t / m.profile.duration)
        if (raw > 0) {
          const t = m.profile.ease(raw)
          entry.outer.position.lerpVectors(m.from, m.to, t)
          // sin² lift: zero slope at both ends, so a card leaves and settles softly and
          // never dips below its endpoints (v1's overshooting ease did).
          entry.outer.position.y += m.profile.lift * Math.sin(Math.PI * raw) ** 2
          entry.outer.rotation.y = m.yawFrom + (m.yawTo - m.yawFrom) * t + Math.sin(Math.PI * raw) * m.profile.spin
          entry.outer.scale.setScalar(m.scaleFrom + (m.scaleTo - m.scaleFrom) * t)
        }
        if (raw >= 1) {
          entry.motion = null
          m.done?.()
        }
      }
      const f = entry.flip
      if (f) {
        f.t += dt
        const ft = clamp01(f.t / f.duration)
        const angle = f.from + (f.to - f.from) * easeInOutCubic(ft)
        entry.inner.rotation.x = angle
        // Edge clearance: a card turning about its centre sweeps its half-length below
        // the pivot; lift by exactly that so it never cuts through the cloth.
        entry.inner.position.y = (CH / 2 + 0.06) * Math.abs(Math.sin(angle))
        if (ft >= 1) {
          entry.flip = null
          entry.inner.position.y = 0
        }
      }
    }

    this.glows.forEach((glow, i) => {
      const target = i === this.glowTarget ? 1 : 0
      const step = this.reducedMotion ? 1 : dt / GLOW_FADE
      this.glowLevel[i] = this.glowLevel[i]! + Math.max(-step, Math.min(step, target - this.glowLevel[i]!))
      ;(glow.material as THREE.MeshBasicMaterial).opacity = this.glowLevel[i]! * 0.12
    })

    if (this.burnFlashT < 1) {
      this.burnFlashT = Math.min(1, this.burnFlashT + dt / 0.4)
      const f = this.burnFlashT
      ;(this.burnFlash.material as THREE.MeshBasicMaterial).opacity = (f < 0.2 ? f / 0.2 : 1 - (f - 0.2) / 0.8) * 0.22
    } else {
      ;(this.burnFlash.material as THREE.MeshBasicMaterial).opacity = 0
    }

    this.piles.step(dt)
    this.renderer.render(this.scene, this.camera)
    this.raf = requestAnimationFrame(this.loop)
  }

  private resize(): void {
    const w = Math.max(1, this.container.clientWidth)
    const h = Math.max(1, this.container.clientHeight)
    this.renderer.setSize(w, h)
    fitCamera(this.camera, w / h)
    this.onResize?.()
  }

  dispose(): void {
    this.disposed = true
    this.generation++
    cancelAnimationFrame(this.raf)
    this.ro.disconnect()
    for (const entry of this.cards.values()) disposeCard(entry.inner)
    this.cards.clear()
    this.lights.dispose()
    disposeCardGeometry()
    disposeCardTextures()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}

/** Yaw target equivalent to `to` but reached by the short way round from `from`. */
function shortestYaw(from: number, to: number): number {
  let d = (to - from) % (Math.PI * 2)
  if (d > Math.PI) d -= Math.PI * 2
  if (d < -Math.PI) d += Math.PI * 2
  return from + d
}

function findCard(snap: Snapshot, id: string): TableCard | undefined {
  for (const p of snap.players) for (const c of [...p.hand, ...p.up, ...p.down]) if (c.id === id) return c
  return snap.pile.find(c => c.id === id)
}
