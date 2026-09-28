import * as THREE from 'three'

import type { Snapshot } from '../engine/game'
import {
  arcPosition,
  clamp01,
  DEAL_ARC_LIFT,
  DEAL_DURATION,
  DEAL_ROUND_STAGGER,
  dealEase,
  DEAL_SPIN,
  DISCARD_ARC_LIFT,
  DISCARD_DURATION,
  DISCARD_STAGGER,
  easeInOutCubic,
  easeOutCubic,
  FLIP_DURATION,
  FLIP_LIFT,
  prefersReducedMotion,
  SCOOP_STAGGER,
} from './animation'
import { fitCamera, makeCamera } from './camera'
import { DRAW_SPAWN, layoutTable, seatsFor } from './layout'
import { installLighting, type LightRig } from './lighting'
import { disposeCard, disposeCardGeometry, makeCard } from './objects/card'
import { buildPiles, type TablePiles } from './objects/piles'
import { buildTable } from './objects/table'
import { installRoom } from './room'
import { disposeCardTextures } from './textures/cardTextures'
import { glowTexture } from './textures/surfaces'
import { BURN_POS, PILE_POS, SEAT_HAND_OFFSET } from './world'

type CardEntry = {
  group: THREE.Group
  /** The arc is evaluated from these each frame, from wherever the card was when its
   *  target last changed. Re-arming from the CURRENT pose (not the old target) is what
   *  lets a card already in flight be redirected without a jump. */
  from: THREE.Vector3
  to: THREE.Vector3
  /** Seconds since this travel started; negative = still waiting its turn in a stagger. */
  t: number
  yawFrom: number
  yawTo: number
  faceDown: boolean
  flipT: number
  flipFrom: number
  landed: boolean
}

type RetiringCard = { group: THREE.Group; from: THREE.Vector3; to: THREE.Vector3; t: number; yawFrom: number; yawTo: number }

/** Sounds that belong to IMPACTS, fired when the visual lands, not when the engine
 *  decided the move (the Blackjack lesson: firing on decision played the swish while
 *  the card was still in the air). */
export type SceneSfx = {
  cardLand(): void
  /** Once per burn, not once per card. */
  cardSweep(): void
}

/**
 * The Skitgubbe table in real 3D, built from Mini Games' Blackjack scene: same camera,
 * light rig, room, table, card construction and SVG texture pipeline, which that game's
 * spec derived and screenshot-verified. What is new here is the reconcile: a generic
 * "every card flies to its layout target" instead of Blackjack's dealer/player layout.
 *
 * ORCHESTRATOR ONLY, as in Blackjack: dimensions live in world.ts, where cards go in
 * layout.ts, how things look in materials/objects/textures. No colour literal or
 * dimension belongs in this file.
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
  private cards = new Map<string, CardEntry>()
  private retiring: RetiringCard[] = []
  private table: ReturnType<typeof buildTable>
  private piles: TablePiles
  private gameId = -1
  private burned = 0
  private scratch = new THREE.Vector3()
  /** A warm pool of light under whoever's turn it is. It glides between seats, so the
   *  turn passing is something you SEE move round the table, not a label that changes. */
  private turnGlow: THREE.Mesh
  private turnFrom = new THREE.Vector3()
  private turnTo = new THREE.Vector3()
  private turnT = 1
  /** A flash on the pile when it burns. Authored as an additive sprite, never bloom:
   *  Blackjack's spec §2.2 is why this scene has no post-processing at all. */
  private burnFlash: THREE.Mesh
  private burnFlashT = 1

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

    const glow = glowTexture()
    this.turnGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(6.2, 3.4),
      new THREE.MeshBasicMaterial({ map: glow, color: 0xffd98a, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    this.turnGlow.rotation.x = -Math.PI / 2
    this.turnGlow.position.y = 0.012
    this.scene.add(this.turnGlow)
    this.burnFlash = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 4.2),
      new THREE.MeshBasicMaterial({ map: glow, color: 0xff9a4d, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    this.burnFlash.rotation.x = -Math.PI / 2
    this.burnFlash.position.set(PILE_POS.x, 0.02, PILE_POS.z)
    this.scene.add(this.burnFlash)

    this.ro = new ResizeObserver(() => this.resize())
    this.ro.observe(container)
    this.loop = this.loop.bind(this)
    this.raf = requestAnimationFrame(this.loop)
  }

  // --- reconcile: engine state → meshes ---------------------------------------------

  update(snap: Snapshot): void {
    if (this.disposed) return
    const fresh = snap.gameId !== this.gameId
    if (fresh) this.reset(snap.gameId)
    this.table.setRules(snap.rules)

    const targets = layoutTable(snap, fresh)
    let moving = 0
    for (const [id, target] of targets) {
      let entry = this.cards.get(id)
      if (!entry) {
        // Every card enters from the draw pile: the deal and every refill.
        const card = findCard(snap, id)!
        const group = makeCard(card.rank, card.suit)
        group.position.copy(DRAW_SPAWN)
        group.rotation.set(Math.PI, 0, 0)
        this.scene.add(group)
        entry = {
          group,
          from: DRAW_SPAWN.clone(),
          to: target.position.clone(),
          t: this.reducedMotion ? DEAL_DURATION : -(fresh ? target.delay * DEAL_ROUND_STAGGER : moving * DEAL_ROUND_STAGGER * 2),
          yawFrom: 0,
          yawTo: target.yaw,
          faceDown: true,
          // A new card starts face down (it came off the draw pile) and turns over in
          // flight if its target is face up, so a refill visibly becomes YOUR card.
          flipT: FLIP_DURATION,
          flipFrom: Math.PI,
          landed: false,
        }
        this.cards.set(id, entry)
        moving++
      } else if (!entry.to.equals(target.position) || entry.yawTo !== target.yaw) {
        entry.from.copy(entry.group.position)
        entry.to.copy(target.position)
        entry.yawFrom = entry.group.rotation.y
        entry.yawTo = target.yaw
        entry.t = this.reducedMotion ? DEAL_DURATION : -moving * SCOOP_STAGGER
        entry.landed = false
        moving++
      }
      if (entry.faceDown !== target.faceDown) {
        entry.flipFrom = entry.group.rotation.x
        // Start the turn together with the card's travel (a staggered deal card waits
        // its turn face down, then turns over in flight) rather than flipping in place
        // while it is still sitting on the draw pile.
        entry.flipT = this.reducedMotion ? FLIP_DURATION : Math.min(0, entry.t)
        entry.faceDown = target.faceDown
      }
    }

    // Cards that left play (a burn) sweep into the burn tray rather than vanishing.
    let retired = 0
    for (const [id, entry] of this.cards) {
      if (targets.has(id)) continue
      this.retiring.push({
        group: entry.group,
        from: entry.group.position.clone(),
        to: new THREE.Vector3(BURN_POS.x, 0.6, BURN_POS.z),
        t: this.reducedMotion ? DISCARD_DURATION : -retired * DISCARD_STAGGER,
        yawFrom: entry.group.rotation.y,
        yawTo: entry.group.rotation.y + 0.8 + Math.random() * 0.8,
      })
      this.cards.delete(id)
      retired++
    }
    if (retired) {
      this.sfx.cardSweep()
      this.burnFlashT = this.reducedMotion ? 1 : 0
    }
    this.burned = snap.burnedCount
    this.piles.setDraw(snap.drawCount / 52)
    this.piles.setBurned(this.burned / 52)

    // The turn glow follows the current player (and goes out when the game is over).
    const seat = seatsFor(snap.players.length)[snap.current]!
    const next = new THREE.Vector3().copy(seat.out).multiplyScalar(seat.depth + SEAT_HAND_OFFSET * 0.45).setY(0.012)
    if (!next.equals(this.turnTo)) {
      this.turnFrom.copy(fresh ? next : this.turnGlow.position)
      this.turnTo.copy(next)
      this.turnT = this.reducedMotion || fresh ? 1 : 0
      this.turnGlow.rotation.z = seat.out.x !== 0 ? Math.PI / 2 : 0
    }
    ;(this.turnGlow.material as THREE.MeshBasicMaterial).opacity = snap.phase === 'playing' ? 0.2 : 0
  }

  private reset(gameId: number): void {
    // A new deal gathers every card from the previous game back into the deck: sweep
    // them all to the draw pile instead of blinking the table empty.
    this.gameId = gameId
    let i = 0
    for (const entry of this.cards.values()) {
      this.retiring.push({
        group: entry.group,
        from: entry.group.position.clone(),
        to: DRAW_SPAWN.clone(),
        t: this.reducedMotion ? DISCARD_DURATION : -(i++) * 0.008,
        yawFrom: entry.group.rotation.y,
        yawTo: 0,
      })
    }
    this.cards.clear()
    this.burned = 0
  }

  // --- render loop --------------------------------------------------------------------

  private loop(): void {
    if (this.disposed) return
    // Clamp: a background tab can hand back a multi-second delta and teleport everything.
    const dt = Math.min(0.05, this.clock.getDelta())

    for (const e of this.cards.values()) {
      e.t += dt
      const t = clamp01(e.t / DEAL_DURATION)
      if (t > 0) {
        arcPosition(e.from, e.to, dealEase(t), DEAL_ARC_LIFT * 0.7 * (1 - t * 0.15), this.scratch)
        e.group.position.copy(this.scratch)
        // Closed-form yaw with a half-sine spin that is exactly 0 at both ends: the
        // Blackjack fix for the "glitchy rotation" of a damped follow.
        e.group.rotation.y = e.yawFrom + (e.yawTo - e.yawFrom) * easeOutCubic(t) + Math.sin(Math.PI * t) * DEAL_SPIN * 0.6
      }
      if (!e.landed && t >= 1) {
        e.landed = true
        this.sfx.cardLand()
      }
      if (e.flipT < FLIP_DURATION) {
        e.flipT += dt
        const ft = clamp01(e.flipT / FLIP_DURATION)
        const target = e.faceDown ? Math.PI : 0
        e.group.rotation.x = e.flipFrom + (target - e.flipFrom) * easeInOutCubic(ft)
        // Lift through the turn; without it a flip reads as a spin.
        e.group.position.y += Math.sin(ft * Math.PI) * FLIP_LIFT
      }
    }

    for (let i = this.retiring.length - 1; i >= 0; i--) {
      const r = this.retiring[i]!
      r.t += dt
      const t = clamp01(r.t / DISCARD_DURATION)
      if (t > 0) {
        arcPosition(r.from, r.to, easeInOutCubic(t), DISCARD_ARC_LIFT, this.scratch)
        r.group.position.copy(this.scratch)
        r.group.rotation.y = r.yawFrom + (r.yawTo - r.yawFrom) * t
        // Shrink into the tray over the last quarter so the card joins the stack rather
        // than popping out of existence on top of it.
        const fade = t > 0.75 ? 1 - (t - 0.75) / 0.25 : 1
        r.group.scale.setScalar(Math.max(0.02, fade))
      }
      if (t >= 1) {
        this.scene.remove(r.group)
        disposeCard(r.group)
        this.retiring.splice(i, 1)
      }
    }

    if (this.turnT < 1) {
      this.turnT = Math.min(1, this.turnT + dt / 0.45)
      this.turnGlow.position.lerpVectors(this.turnFrom, this.turnTo, easeInOutCubic(this.turnT))
    } else {
      this.turnGlow.position.copy(this.turnTo)
    }
    if (this.burnFlashT < 1) {
      this.burnFlashT = Math.min(1, this.burnFlashT + dt / 0.9)
      const f = this.burnFlashT
      // A quick bloom-up and a slower fade: the pile catches fire, then embers.
      ;(this.burnFlash.material as THREE.MeshBasicMaterial).opacity = (f < 0.15 ? f / 0.15 : 1 - (f - 0.15) / 0.85) * 0.75
      this.burnFlash.scale.setScalar(0.7 + easeOutCubic(f) * 0.6)
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
    // Re-solve the framing; a hard-coded camera breaks when the stage aspect changes.
    fitCamera(this.camera, w / h)
  }

  dispose(): void {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.ro.disconnect()
    for (const entry of this.cards.values()) disposeCard(entry.group)
    for (const r of this.retiring) disposeCard(r.group)
    this.cards.clear()
    this.retiring = []
    this.lights.dispose()
    disposeCardGeometry()
    disposeCardTextures()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}

function findCard(snap: Snapshot, id: string) {
  for (const p of snap.players) for (const c of [...p.hand, ...p.up, ...p.down]) if (c.id === id) return c
  return snap.pile.find(c => c.id === id)
}
