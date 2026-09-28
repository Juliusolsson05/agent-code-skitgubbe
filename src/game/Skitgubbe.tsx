import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import type { SkitgubbeApi } from '../api'
import { CardBack } from '../assets/svg/CardBack'
import { CardFace } from '../assets/svg/CardFace'
import { applyMove, BOT_LEVEL_OPTIONS, chooseMove, DEFAULT_BOT_LEVEL, observeBot, prepareBot, type BotLevel, type Move } from './bot'
import type { GameAudio } from './audio'
import { cardLabel, cardName, RANK_VALUE, type Card, type Rank } from './engine/cards'
import { MAX_PLAYERS, MIN_PLAYERS, SkitgubbeGame, type GameEvent, type Snapshot } from './engine/game'
import { DEFAULT_RULES, effectiveTop, parseRules, type Rules } from './engine/rules'
import { SkitgubbeScene, type Projected, type SelfHooks } from './scene'
import styles from './skitgubbe.css?inline'
import { HandFan, handRows, handColumns } from './HandFan'

const SETTINGS_KEY = 'skitgubbe.settings'
const RECORDS_KEY = 'skitgubbe.records'
const MUTE_KEY = 'skitgubbe.muted'

// Pacing AFTER the table is still. v1 ran bots on fixed timers that ignored animation,
// so a bot could move while a 30-card pickup was still flying (measured by the Codex
// review). Now a bot waits for the previous action's animation to resolve, then pauses
// just long enough for a person to read what happened.
const BOT_PAUSE_MS = 240
const BOT_PAUSE_AFTER_BURN_MS = 380
const BOT_PAUSE_SPECTATING_MS = 100
/** A thinking beat before a bot acts, so its move reads as a decision, not a reflex. */
const BOT_THINK_MS = 420
const CALLOUT_MS = 1400

const FLIGHT_PLAY_MS = 280
const FLIGHT_RECEIVE_MS = 260
const FLIGHT_PACKET_MS = 340

export type Settings = { players: number; rules: Rules; bots: BotLevel }
export type Records = { games: number; wins: number; skitgubbe: number }

const DEFAULT_SETTINGS: Settings = { players: 3, rules: { ...DEFAULT_RULES }, bots: DEFAULT_BOT_LEVEL }
const EMPTY_RECORDS: Records = { games: 0, wins: 0, skitgubbe: 0 }

export function parseSettings(value: unknown): Settings {
  const input = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
  const players = typeof input.players === 'number' && Number.isInteger(input.players)
    ? Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, input.players)) : DEFAULT_SETTINGS.players
  const bots = [1, 2, 3, 4, 5].includes(input.bots as number) ? input.bots as BotLevel : DEFAULT_SETTINGS.bots
  return { players, rules: parseRules(input.rules), bots }
}

function parseRecords(value: unknown): Records {
  const input = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
  const count = (key: keyof Records) => {
    const v = input[key]
    return typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0
  }
  return { games: count('games'), wins: count('wins'), skitgubbe: count('skitgubbe') }
}

/** The settings rows, in the order a game happens: set up, play, burn, finish. */
export const RULE_ROWS: Array<{ key: keyof Rules; title: string; detail: string }> = [
  { key: 'swapPhase', title: 'Swap before play', detail: 'Trade hand cards for your face-up cards before the first turn.' },
  { key: 'invisibleFive', title: 'Invisible 5', detail: 'A 5 goes on anything and is see-through: the next card has to beat what lies under it.' },
  { key: 'twoResets', title: '2 resets — play again', detail: 'A 2 goes on anything. Keep your turn and play any card on top.' },
  { key: 'tenBurns', title: '10 burns', detail: 'A 10 goes on anything and burns the pile.' },
  { key: 'fourBurns', title: 'Four of a kind burns', detail: 'Four cards of one rank on top burn the pile.' },
  { key: 'burnPlaysAgain', title: 'Burner goes again', detail: 'Whoever burned the pile starts the next one.' },
  { key: 'chanceCard', title: 'Chance card', detail: 'Try the top card of the draw pile instead of playing from your hand.' },
  { key: 'sevenOrLower', title: '7 or lower', detail: 'On a 7, the next card has to be 7 or lower.' },
  { key: 'noSpecialFinish', title: 'No finishing on 2, 10 or ace', detail: 'Your last card can’t be a 2, a 10 or an ace.' },
]

const PLACE = ['', 'first', 'second', 'third', 'fourth']
const COUNT_WORD = ['', 'one', 'two', 'three', 'four']
const RANK_WORD: Record<Rank, [string, string]> = {
  A: ['ace', 'aces'], K: ['king', 'kings'], Q: ['queen', 'queens'], J: ['jack', 'jacks'],
  '10': ['10', '10s'], '9': ['9', '9s'], '8': ['8', '8s'], '7': ['7', '7s'], '6': ['6', '6s'],
  '5': ['5', '5s'], '4': ['4', '4s'], '3': ['3', '3s'], '2': ['2', '2s'],
}

function describeCards(cards: Card[]): string {
  if (cards.length === 1) return cardLabel(cards[0]!)
  return `${COUNT_WORD[cards.length] ?? cards.length} ${RANK_WORD[cards[0]!.rank][1]}`
}

/** What the next card has to be, in words. The single most important sentence on screen. */
export function requirement(snap: import('../lan/protocol').TableSnapshot): { short: string; detail?: string } {
  const top = effectiveTop(snap.pile, snap.rules)
  const raw = snap.pile[snap.pile.length - 1]
  const seeThrough = raw && raw.rank !== top ? ` (the ${raw.rank} is invisible)` : ''
  if (!top) return { short: 'Any card', detail: raw ? `Only invisible 5s on the pile${''}` : undefined }
  if (top === '2' && snap.rules.twoResets) return { short: 'Any card', detail: `${snap.players[snap.current]?.name ?? 'The player'} plays again after the 2${seeThrough}` }
  if (top === '7' && snap.rules.sevenOrLower) return { short: '7 or lower', detail: seeThrough ? `Playing on a 7${seeThrough}` : undefined }
  const word = top === 'A' ? 'Ace' : top === 'K' ? 'King or higher' : top === 'Q' ? 'Queen or higher' : top === 'J' ? 'Jack or higher' : `${top} or higher`
  return { short: word === 'Ace' ? 'Ace only' : word, detail: seeThrough ? `Playing on the ${top}${seeThrough}` : undefined }
}

const sortCards = (cards: Card[]) => [...cards].sort((a, b) => RANK_VALUE[a.rank] - RANK_VALUE[b.rank] || a.suit.localeCompare(b.suit))

type Callout = { id: number; title: string; detail?: string; tone: 'burn' | 'win' | 'loss' | 'info' }
type Anchors = { seats: Projected[]; pile: Projected; draw: Projected; burn: Projected } | null

/**
 * React owns text, controls, your hand and every flight in and out of it; the 3D scene
 * owns the table. The engine is immediate; the table is not, so the view keeps two
 * snapshots: `view` (the engine's latest, which the rail renders with not-yet-arrived
 * cards hidden) and `settled` (what the table shows once its animation is over, which
 * decides whose turn it looks like and what the next card must be).
 */
export function Skitgubbe({ api, audio }: { api: SkitgubbeApi; audio: GameAudio }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const handRef = useRef<HTMLDivElement>(null)
  const flightRef = useRef<HTMLDivElement>(null)
  const settingsButtonRef = useRef<HTMLButtonElement>(null)
  const sceneRef = useRef<SkitgubbeScene | null>(null)
  const gameRef = useRef<SkitgubbeGame | null>(null)
  const [view, setView] = useState<Snapshot | null>(null)
  const [settled, setSettled] = useState<Snapshot | null>(null)
  const viewRef = useRef<Snapshot | null>(null)
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set())
  const [busy, setBusy] = useState(true)
  const busyRef = useRef(true)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const settingsRef = useRef(settings)
  const [records, setRecords] = useState<Records>(EMPTY_RECORDS)
  const [selected, setSelected] = useState<string[]>([])
  const [focusIndex, setFocusIndex] = useState(0)
  const [swapPick, setSwapPick] = useState<string | null>(null)
  const [callout, setCallout] = useState<Callout | null>(null)
  const calloutQueue = useRef<Callout[]>([])
  const [lastAction, setLastAction] = useState('')
  const [notice, setNotice] = useState('')
  const [muted, setMuted] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const showSettingsRef = useRef(false)
  const [sceneFailed, setSceneFailed] = useState(false)
  const [anchors, setAnchors] = useState<Anchors>(null)
  const touched = useRef({ settings: false, mute: false, played: false })
  const recordsBase = useRef<Records | null>(null)
  const recordsDelta = useRef<Records>({ ...EMPTY_RECORDS })
  const writes = useRef<Promise<unknown>>(Promise.resolve())
  const calloutId = useRef(0)
  /** Rail rectangles captured the instant you act, before React removes the cards. */
  const launchRects = useRef(new Map<string, DOMRect>())
  const queue = useRef<Promise<void>>(Promise.resolve())
  const lastWasBurn = useRef(false)

  const save = useCallback((key: string, value: unknown) => {
    writes.current = writes.current.then(() => api.storage.set(key, value as never)).catch(() => {})
  }, [api])

  const shout = useCallback((c: Omit<Callout, 'id'>) => {
    const next = { ...c, id: ++calloutId.current }
    // Queue, never overwrite: a burn followed by "Nils is out" must both be read.
    setCallout(current => {
      if (current) {
        calloutQueue.current.push(next)
        return current
      }
      return next
    })
  }, [])

  useEffect(() => {
    if (!callout) return
    const timer = window.setTimeout(() => setCallout(calloutQueue.current.shift() ?? null), CALLOUT_MS)
    return () => window.clearTimeout(timer)
  }, [callout])

  // --- flights between the DOM hand and the table ------------------------------------

  const rootPoint = (p: Projected) => {
    const stage = stageRef.current!.getBoundingClientRect()
    const root = rootRef.current!.getBoundingClientRect()
    return { x: stage.left - root.left + p.x, y: stage.top - root.top + p.y, width: p.cardWidth }
  }
  const rootRect = (r: DOMRect) => {
    const root = rootRef.current!.getBoundingClientRect()
    return { x: r.left - root.left + r.width / 2, y: r.top - root.top + r.height / 2, width: r.width }
  }

  /** Animate card images from one point to another over everything. Resolves on arrival. */
  const fly = useCallback((items: Array<{ card: Card | null; from: { x: number; y: number; width: number }; to: { x: number; y: number; width: number }; delay?: number; packet?: number }>, ms: number) => {
    const layer = flightRef.current
    if (!layer || !items.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve()
    return Promise.all(items.map(({ card, from, to, delay = 0, packet = 0 }) => {
      const el = document.createElement('div')
      el.className = packet ? 'sg-flight is-packet' : 'sg-flight'
      const art = renderToStaticMarkup(card ? CardFace({ rank: card.rank, suit: card.suit }) : CardBack({}))
      // A packet is a few backs offset like a squared-up stack; one element, one motion.
      el.innerHTML = packet ? Array.from({ length: packet }, (_, i) => `<div style="position:absolute;inset:0;transform:translate(${i * 2}px,${-i * 2}px)">${art}</div>`).join('') : art
      if (packet) el.style.height = `${from.width * 1.4}px`
      el.style.width = `${from.width}px`
      layer.append(el)
      const h = from.width * 1.4
      const scale = to.width / from.width
      const anim = el.animate([
        { transform: `translate(${from.x - from.width / 2}px, ${from.y - h / 2}px) scale(1)` },
        { transform: `translate(${to.x - from.width / 2}px, ${to.y - h / 2}px) scale(${scale})` },
      ], { duration: ms, delay, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'both' })
      return anim.finished.catch(() => {}).then(() => el.remove())
    })).then(() => {})
  }, [])

  const hooks: SelfHooks = {
    play: async (cards, destination) => {
      const scene = sceneRef.current
      if (!scene) return
      const pile = rootPoint(destination ?? scene.pileAnchor())
      await fly(cards.map((card, i) => {
        const rect = launchRects.current.get(card.id)
        const from = rect ? rootRect(rect) : { ...pile, y: pile.y + 200 }
        return { card, from, to: { ...pile, width: pile.width * (destination ? 1 : 1.12) }, delay: i * 35 }
      }), FLIGHT_PLAY_MS)
    },
    receive: async (cards, source) => {
      const scene = sceneRef.current
      const hand = handRef.current
      if (!scene || !hand) return reveal(cards)
      const anchor = rootPoint(source === 'pile' ? scene.pileAnchor() : scene.drawAnchor())
      // Wait a frame so the reserved (invisible) slots have been laid out.
      await new Promise(requestAnimationFrame)
      if (source === 'pile' && cards.length > 1) {
        // A pickup travels as ONE packet (a squared-up stack), not one flying card per
        // pile card: at 30 cards the per-card version buried the hand in card backs.
        const rect = hand.getBoundingClientRect()
        const to = rootRect(new DOMRect(rect.left + rect.width / 2 - 45, rect.top + 30, 90, 126))
        await fly([{ card: null, from: anchor, to, packet: Math.min(4, cards.length) }], FLIGHT_PACKET_MS)
      } else {
        await fly(cards.map((card, i) => {
          const slot = hand.querySelector<HTMLElement>(`[data-card="${card.id}"]`)
          const to = slot ? rootRect(slot.getBoundingClientRect()) : { x: anchor.x, y: anchor.y + 240, width: 90 }
          return { card, from: anchor, to, delay: i * 55 }
        }), FLIGHT_RECEIVE_MS)
      }
      reveal(cards)
    },
  }
  const reveal = (cards: Card[]) => setHidden(h => {
    const next = new Set(h)
    for (const c of cards) next.delete(c.id)
    return next
  })

  // --- the pipeline: engine action → animation → settle ------------------------------

  /** Run one engine action through the table. Everything the player sees goes through
   *  here, serialised, so two animations never overlap and nothing acts mid-flight. */
  const run = useCallback((prev: Snapshot | null, next: Snapshot, events: GameEvent[]) => {
    // Every public action feeds the bots' shared ledger before anything else: plays,
    // pickups, burns, reveals and setup swaps are what a counting bot is allowed to
    // know. Level-5 bots read it; lower levels simply ignore it.
    if (gameRef.current) observeBot(gameRef.current, prev ?? next, next, events)
    busyRef.current = true
    setBusy(true)
    viewRef.current = next
    // Cards arriving in your hand are reserved in the rail but hidden until they land.
    const prevIds = new Set(prev && prev.gameId === next.gameId ? prev.players[0]!.hand.map(c => c.id) : [])
    const arriving = next.players[0]!.hand.filter(c => !prevIds.has(c.id)).map(c => c.id)
    setHidden(h => new Set([...h, ...arriving]))
    setView(next)
    describe(events, next)
    lastWasBurn.current = events.some(e => e.type === 'burn')
    queue.current = queue.current.then(async () => {
      const scene = sceneRef.current
      if (scene) await scene.animate(prev, next, events, hooks).catch(() => {})
      if (viewRef.current !== next) return
      setHidden(new Set())
      setSettled(next)
      afterSettle(events, next)
      busyRef.current = false
      setBusy(false)
    })
  }, [])

  const describe = (events: GameEvent[], s: Snapshot) => {
    const name = (p: number) => (p === 0 ? 'You' : s.players[p]!.name)
    for (const e of events) {
      if (e.type === 'stack') setLastAction(`${name(e.player)} stacked ${cardLabel(e.card)} face up.`)
      else if (e.type === 'play') setLastAction(`${name(e.player)} played ${describeCards(e.cards)}.`)
      else if (e.type === 'pickup') setLastAction(`${name(e.player)} took the pile (${e.count} ${e.count === 1 ? 'card' : 'cards'}).`)
      else if (e.type === 'chance') setLastAction(`${name(e.player)} tried a chance card: ${cardLabel(e.card)}${e.ok ? ', and it fit.' : ', no luck.'}`)
      else if (e.type === 'flip') setLastAction(`${name(e.player)} turned up ${cardLabel(e.card)}${e.ok ? '.' : ', which didn’t fit.'}`)
      else if (e.type === 'pass') setLastAction(`${name(e.player)} passed.`)
      else if (e.type === 'burn') setLastAction(`${name(e.player)} burned the pile.`)
    }
  }

  const afterSettle = (events: GameEvent[], s: Snapshot) => {
    const name = (p: number) => (p === 0 ? 'You' : s.players[p]!.name)
    for (const e of events) {
      if (e.type === 'burn') shout({ tone: 'burn', title: e.reason === 'ten' ? 'Burned' : 'Four of a kind', detail: `${e.count} cards off the table` })
      else if (e.type === 'flip' && !e.ok && e.player === 0) shout({ tone: 'loss', title: `${cardLabel(e.card)} didn’t fit`, detail: 'It goes into your hand with the pile.' })
      else if (e.type === 'finish') {
        if (e.player === 0) (e.place === 1 ? audio.won() : audio.out())
        shout({ tone: e.player === 0 ? 'win' : 'info', title: e.player === 0 ? `You’re out, ${PLACE[e.place]}` : `${name(e.player)} is out, ${PLACE[e.place]}` })
      } else if (e.type === 'over') {
        if (e.skitgubbe === 0) audio.lost()
        const place = s.players[0]!.place
        const delta = recordsDelta.current
        delta.games++
        if (place === 1) delta.wins++
        if (e.skitgubbe === 0) delta.skitgubbe++
        const base = recordsBase.current
        const total = base ? sum(base, delta) : { ...delta }
        setRecords(total)
        // Unknown stored totals must never be overwritten by this session's smaller ones.
        if (base) save(RECORDS_KEY, total)
      }
    }
    if (s.phase === 'playing' && s.current === 0 && s.players[0]!.place === null) audio.yourTurn()
  }

  const newGame = useCallback((next: Settings = settingsRef.current) => {
    const game = new SkitgubbeGame({ players: next.players, rules: next.rules })
    gameRef.current = game
    // Bots arrange their table at once; the deal waits only for you. Their setup
    // swaps are public: feed the events to the ledger instead of discarding them.
    for (let p = 1; p < next.players; p++) {
      prepareBot(game, p, next.bots)
    }
    const opening = game.getSnapshot()
    observeBot(game, opening, opening, game.takeEvents())
    setSelected([])
    setSwapPick(null)
    setFocusIndex(0)
    setCallout(null)
    calloutQueue.current = []
    setLastAction('')
    setNotice('')
    run(null, game.getSnapshot(), [])
  }, [run])

  // --- mount -------------------------------------------------------------------------
  useEffect(() => {
    const container = stageRef.current
    let scene: SkitgubbeScene | null = null
    const measure = () => {
      const s = sceneRef.current
      const snap = viewRef.current
      if (!s || !snap) return
      setAnchors({
        seats: snap.players.map((_, i) => s.seatAnchor(snap.players.length, i)),
        pile: s.pileAnchor(),
        draw: s.drawAnchor(),
        burn: s.burnAnchor(),
      })
    }
    if (container) {
      try {
        scene = new SkitgubbeScene(container, {
          place: () => audio.place(), deal: () => audio.deal(), reveal: () => audio.reveal(),
          burn: () => audio.burn(), gather: () => audio.gather(),
        })
        scene.setOnResize(measure)
        sceneRef.current = scene
      } catch {
        // Some hosts disable WebGL. Everything you need to play is DOM: your hand, the
        // pile requirement, and each opponent's plate with their face-up cards.
        setSceneFailed(true)
      }
    }
    // Storage owns the opening rules. Dealing defaults first queued a full 3-player
    // animation, then gathered and redealt when saved settings said 4 players. Keep
    // the empty table while hydration resolves and enqueue exactly ONE opening game.
    measure()

    let alive = true
    void Promise.allSettled([api.storage.get(SETTINGS_KEY), api.storage.get(RECORDS_KEY), api.storage.get<boolean>(MUTE_KEY)])
      .then(([settingsResult, recordsResult, muteResult]) => {
        if (!alive) return
        let openingSettings = settingsRef.current
        if (settingsResult.status === 'fulfilled' && settingsResult.value !== undefined && !touched.current.settings) {
          const loaded = parseSettings(settingsResult.value)
          settingsRef.current = loaded
          setSettings(loaded)
          openingSettings = loaded
        }
        if (recordsResult.status === 'fulfilled') {
          recordsBase.current = parseRecords(recordsResult.value)
          const total = sum(recordsBase.current, recordsDelta.current)
          setRecords(total)
          if (recordsDelta.current.games) save(RECORDS_KEY, total)
        }
        if (muteResult.status === 'fulfilled' && typeof muteResult.value === 'boolean' && !touched.current.mute) {
          audio.setMuted(muteResult.value)
          setMuted(muteResult.value)
        }
        // If the player explicitly started a game during a slow storage read, honour
        // that choice. A rejected storage read still opens one game with defaults.
        if (!gameRef.current) newGame(openingSettings)
      })

    if (!document.activeElement || document.activeElement === document.body) rootRef.current?.focus({ preventScroll: true })
    return () => {
      alive = false
      scene?.dispose()
      sceneRef.current = null
    }
  }, [api, audio, newGame, save])

  // Seat plates follow the seat count.
  useLayoutEffect(() => {
    const s = sceneRef.current
    if (!s || !view) return
    setAnchors({
      seats: view.players.map((_, i) => s.seatAnchor(view.players.length, i)),
      pile: s.pileAnchor(),
      draw: s.drawAnchor(),
      burn: s.burnAnchor(),
    })
  }, [view?.players.length, view?.gameId])

  // --- bots ---------------------------------------------------------------------------
  useEffect(() => {
    const game = gameRef.current
    if (busy || showSettings || !settled || !game || settled.phase !== 'playing') return
    const current = settled.current
    if (!settled.players[current]!.bot) return
    const spectating = settled.players[0]!.place !== null
    const pause = spectating ? BOT_PAUSE_SPECTATING_MS : lastWasBurn.current ? BOT_PAUSE_AFTER_BURN_MS : BOT_PAUSE_MS
    const timer = window.setTimeout(() => {
      if (gameRef.current !== game || busyRef.current) return
      const move: Move = chooseMove(game, current, settingsRef.current.bots)
      const prev = game.getSnapshot()
      if (applyMove(game, current, move)) run(prev, game.getSnapshot(), game.takeEvents())
    }, pause + (spectating ? 0 : BOT_THINK_MS))
    return () => window.clearTimeout(timer)
  }, [busy, settled, showSettings, run])

  // Selections only make sense for cards you can still play.
  useEffect(() => {
    const game = gameRef.current
    if (!game || !view) return
    const legal = new Set(game.legalCardIds(0))
    setSelected(ids => (ids.every(id => legal.has(id)) ? ids : ids.filter(id => legal.has(id))))
  }, [view])

  // --- derived --------------------------------------------------------------------------
  const game = gameRef.current
  const me = view?.players[0]
  const source = view && game && view.phase === 'playing' ? game.source(0) : null
  const yourTurn = !busy && !!settled && settled.phase === 'playing' && settled.current === 0 && me?.place === null
  const legal = new Set(yourTurn && game ? game.legalCardIds(0) : [])
  const swapping = view?.phase === 'swap' && !!me && !me.ready
  // All three batches remain visible. Showing only the current source made
  // players unable to distinguish a held hand from their reserved table cards.
  // Only the current source contributes keyboard targets and legal choices.
  const rows: Array<{ key: 'hand' | 'up' | 'down'; label: string; cards: Card[] }> = !me ? [] : [
    { key: 'hand', label: `Hand · ${me.hand.length}`, cards: sortCards(me.hand) },
    { key: 'up', label: `Face up · ${me.up.length}`, cards: me.up },
    { key: 'down', label: `Face down · ${me.down.length}`, cards: me.down },
  ]
  const extraHandHeight = (handRows(me?.hand.length ?? 0, false, 696) - 1) * 72
  const flat = rows.filter(r => swapping ? r.key !== 'down' : r.key === source).flatMap(r => r.cards.map(card => ({ card, row: r.key })))
  const selectionValid = yourTurn && selected.length > 0 && !!game?.canPlay(0, selected)
  const selectedCards = selected.map(id => flat.find(f => f.card.id === id)?.card).filter(Boolean) as Card[]

  // --- actions ---------------------------------------------------------------------------
  const act = (fn: (g: SkitgubbeGame) => boolean) => {
    const g = gameRef.current
    if (!g || busyRef.current) return false
    audio.unlock()
    touched.current.played = true
    // Measure the rail NOW: after this action React removes the played cards, and the
    // flight needs to start exactly where each card was.
    launchRects.current = new Map([...(handRef.current?.querySelectorAll<HTMLElement>('[data-card]') ?? [])].map(el => [el.dataset.card!, el.getBoundingClientRect()]))
    const prev = g.getSnapshot()
    if (!fn(g)) return false
    setSelected([])
    setNotice('')
    run(prev, g.getSnapshot(), g.takeEvents())
    return true
  }

  /** Play the selection, or with nothing selected the card at `at` (the focused card).
   *  The index comes from the event's target, never from state: focus state can lag a
   *  render behind a fast arrow-then-Enter, which played the wrong card or nothing. */
  const playSelection = (at = focusIndex) => {
    if (!yourTurn || !game) return
    const focused = flat[at]?.card
    const ids = selected.length ? selected : focused && legal.has(focused.id) ? [focused.id] : []
    if (!ids.length) return setNotice(legal.size ? 'Choose a card first.' : 'Nothing fits. Take the pile.')
    if (!game.canPlay(0, ids)) {
      const rank = flat.find(f => f.card.id === ids[0])?.card.rank
      return setNotice(snapRules().noSpecialFinish && rank && ['2', '10', 'A'].includes(rank) ? `Keep one back: you can’t finish on ${rank === 'A' ? 'an ace' : `a ${rank}`}.` : 'Those cards can’t go on the pile.')
    }
    act(g => g.play(0, ids))
  }
  const snapRules = () => view?.rules ?? DEFAULT_RULES

  const toggle = (card: Card, all = false) => {
    if (!view) return
    if (swapping) { if (!me?.down.some(c => c.id === card.id)) return swapWith(card); return }
    if (!yourTurn || !flat.some(f => f.card.id === card.id)) return
    if (source === 'down') return void act(g => g.flip(0, card.id))
    if (!legal.has(card.id)) return setNotice(`${cardLabel(card)} doesn’t fit. ${requirement(settled ?? view).short}.`)
    setNotice('')
    setSelected(ids => {
      const sameRank = flat.filter(f => f.card.rank === card.rank && legal.has(f.card.id)).map(f => f.card.id)
      if (all) return ids.length === sameRank.length && sameRank.every(id => ids.includes(id)) ? [] : sameRank
      if (ids.includes(card.id)) return ids.filter(id => id !== card.id)
      // A play is one rank: picking another rank starts a new selection.
      const firstRank = flat.find(f => f.card.id === ids[0])?.card.rank
      return firstRank === card.rank ? [...ids, card.id] : [card.id]
    })
  }

  const swapWith = (card: Card) => {
    if (!me || !swapping) return
    touched.current.played = true
    const inHand = me.hand.some(c => c.id === card.id)
    if (!swapPick) return setSwapPick(card.id)
    if (swapPick === card.id) return setSwapPick(null)
    const pickInHand = me.hand.some(c => c.id === swapPick)
    if (pickInHand === inHand) return setSwapPick(card.id)
    const [h, u] = inHand ? [card.id, swapPick] : [swapPick, card.id]
    setSwapPick(null)
    act(g => g.swap(0, h, u))
  }

  const start = () => {
    if (!act(g => g.ready(0))) return
    const opening = gameRef.current!.getSnapshot()
    const who = opening.players[opening.current]!
    const low = [...who.hand].filter(c => c.rank !== '2').sort((a, b) => RANK_VALUE[a.rank] - RANK_VALUE[b.rank])[0]
    setLastAction(`${who.name} ${opening.current === 0 ? 'start' : 'starts'}${low ? ` with the lowest hand card, ${cardLabel(low)}` : ''}.`)
  }
  const toggleMute = () => {
    touched.current.mute = true
    const next = !audio.isMuted
    audio.setMuted(next)
    setMuted(next)
    if (!next) audio.unlock()
    save(MUTE_KEY, next)
  }
  const changeSettings = (next: Settings) => {
    touched.current.settings = true
    settingsRef.current = next
    setSettings(next)
    save(SETTINGS_KEY, next)
  }
  const openSettings = (open: boolean) => {
    showSettingsRef.current = open
    setShowSettings(open)
    if (!open) queueMicrotask(() => settingsButtonRef.current?.focus({ preventScroll: true }))
  }

  // --- focus: one roving stop in the hand, recovered after every move ------------------
  const focusCard = (index: number) => {
    const count = flat.length
    if (!count) return
    const i = Math.max(0, Math.min(count - 1, index))
    setFocusIndex(i)
    const card = handRef.current?.querySelector<HTMLElement>(`[data-index="${i}"]`)
    card?.focus({ preventScroll: true })
    // Keep the page still, but scroll the card rail itself. preventScroll also blocks
    // this inner scroll, so End on a large picked-up hand otherwise focuses offscreen.
    const rail = card?.closest<HTMLElement>('.sg-fan')
    if (card && rail) {
      const c = card.getBoundingClientRect(), r = rail.getBoundingClientRect()
      if (c.left < r.left) rail.scrollLeft -= r.left - c.left
      else if (c.right > r.right) rail.scrollLeft += c.right - r.right
    }
  }
  useEffect(() => {
    // When a move removes the focused card, keep keyboard play alive: move focus to the
    // card now at the same index, or to the game itself. v1 dropped focus to <body>
    // here and every shortcut died (review P0; it also stalled our own browser check).
    if (focusIndex >= flat.length && flat.length) setFocusIndex(flat.length - 1)
    const active = document.activeElement
    const inGame = !!active && rootRef.current?.contains(active)
    if (!showSettings && (!active || active === document.body || (inGame && !active.isConnected))) {
      const el = handRef.current?.querySelector<HTMLElement>(`[data-index="${Math.min(focusIndex, flat.length - 1)}"]`)
      ;(el ?? rootRef.current)?.focus({ preventScroll: true })
    }
  })

  // Keys are read at window level whenever focus is inside the game OR nowhere at all,
  // so a card leaving the DOM can never take the controls with it. Focus in a host
  // input, or anywhere else outside the game, is left alone.
  const keyHandler = useRef<(e: KeyboardEvent) => void>(() => {})
  keyHandler.current = (event: KeyboardEvent) => {
    const root = rootRef.current
    const target = event.target as HTMLElement
    if (!root || (!root.contains(target) && target !== document.body && target !== document.documentElement)) return
    if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return
    const key = event.key
    if (showSettingsRef.current) {
      if (key === 'Escape') { event.preventDefault(); event.stopPropagation(); openSettings(false) }
      return
    }
    if (key === ',') { event.preventDefault(); openSettings(true); return }
    if (key === 'm' || key === 'M') { event.preventDefault(); toggleMute(); return }
    if (!view) return
    if (view.phase === 'over') {
      if (key === 'Enter') { event.preventDefault(); newGame() }
      return
    }
    const onButton = target.closest('button') && !target.dataset.card
    const cardIndex = target.dataset.index !== undefined ? Number(target.dataset.index) : focusIndex
    switch (key) {
      case 'ArrowLeft': case 'ArrowRight': {
        event.preventDefault()
        focusCard(cardIndex + (key === 'ArrowLeft' ? -1 : 1))
        return
      }
      case 'Home': event.preventDefault(); focusCard(0); return
      case 'End': event.preventDefault(); focusCard(flat.length - 1); return
      case 'ArrowUp': case 'ArrowDown': {
        if (!swapping) {
          event.preventDefault()
          focusCard(cardIndex + (key === 'ArrowUp' ? -1 : 1) * handColumns(flat.length, false, 696))
          return
        }
        event.preventDefault()
        // Swap phase has two rows: keep the column when moving between them.
        const row = flat[cardIndex]?.row
        const col = row === 'up' ? cardIndex - (me?.hand.length ?? 0) : cardIndex
        focusCard(key === 'ArrowDown' || row === 'hand' ? (me?.hand.length ?? 0) + Math.min(col, 2) : Math.min(col, (me?.hand.length ?? 1) - 1))
        return
      }
      case ' ': {
        if (onButton) return
        event.preventDefault()
        const card = flat[cardIndex]?.card
        if (card) toggle(card, event.shiftKey)
        return
      }
      case 'Enter': {
        if (onButton) return
        event.preventDefault()
        if (swapping) {
          const card = flat[cardIndex]?.card
          if (card) swapWith(card)
          return
        }
        if (source === 'down') {
          const card = flat[cardIndex]?.card
          if (card && yourTurn) act(g => g.flip(0, card.id))
          return
        }
        playSelection(cardIndex)
        return
      }
      case 'Escape':
        if (selected.length || swapPick) { event.preventDefault(); setSelected([]); setSwapPick(null) }
        return
      case 't': case 'T': if (yourTurn) { event.preventDefault(); act(g => g.pickUp(0)) } return
      case 'd': case 'D': if (yourTurn) { event.preventDefault(); act(g => g.chance(0)) } return
      case 'p': case 'P': if (yourTurn) { event.preventDefault(); act(g => g.pass(0)) } return
    }
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => keyHandler.current(e)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // --- render ------------------------------------------------------------------------
  const shown = settled ?? view
  const need = shown && shown.phase === 'playing' ? requirement(shown) : null
  const decision = decisionText(view, settled, busy, yourTurn, source, legal.size, game, lastAction)
  const pending = view && JSON.stringify({ players: settings.players, rules: settings.rules }) !== JSON.stringify({ players: view.players.length, rules: view.rules })
  const nothingFits = yourTurn && source !== 'down' && legal.size === 0
  const primary = !view ? null
    : view.phase === 'over' ? null
      : swapping ? { label: 'Start the game', key: '', onClick: start, disabled: false }
        : source === 'down' ? { label: 'Turn a card over', key: 'Enter', onClick: () => { const c = flat[focusIndex]?.card; if (c) act(g => g.flip(0, c.id)) }, disabled: !yourTurn }
          : nothingFits && game?.canPickUp(0) ? { label: `Take the pile (${view.pile.length})`, key: 'T', onClick: () => act(g => g.pickUp(0)), disabled: false }
            : { label: selectedCards.length ? `Play ${describeCards(selectedCards)}` : 'Play', key: 'Enter', onClick: () => playSelection(), disabled: !yourTurn || (!selectionValid && !(flat[focusIndex] && legal.has(flat[focusIndex]!.card.id))) }

  return (
    <div className="sg-root" ref={rootRef} tabIndex={-1} role="application" aria-roledescription="card game" aria-label="Skitgubbe"
      aria-busy={busy} data-phase={view?.phase} data-turn={yourTurn ? 'you' : 'other'}>
      <style>{styles}</style>
      <header className="sg-header">
        <SkitgubbeMark />
        <h1>Skitgubbe</h1>
        <p className="sg-record" aria-label="Your record on this device">
          {records.games === 0 ? 'Your first game' : `${records.wins} won of ${records.games}${records.skitgubbe ? `, skitgubbe ${records.skitgubbe === 1 ? 'once' : `${records.skitgubbe} times`}` : ''}`}
        </p>
        <button type="button" className="sg-ghost" onClick={() => newGame()}>New game</button>
        <button type="button" className="sg-icon" onClick={toggleMute} aria-label={muted ? 'Turn sound on' : 'Mute sound'} aria-pressed={muted} title={muted ? 'Sound on (M)' : 'Mute (M)'}>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 8h3l4-4v12l-4-4H3z" />{muted ? <path d="m13 7 5 6m0-6-5 6" /> : <><path d="M13 7a5 5 0 0 1 0 6" /><path d="M15 4a9 9 0 0 1 0 12" /></>}</svg>
        </button>
        <button type="button" ref={settingsButtonRef} className="sg-icon" onClick={() => openSettings(!showSettings)} aria-label="House rules" aria-haspopup="dialog" title="House rules (,)">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" /><path d="M7 3v4m6 1v4m-5 1v4" /></svg>
        </button>
      </header>

      <div className="sg-table" style={{ height: 600 - extraHandHeight }} {...inertIf(showSettings)}>
        <div className="sg-scene" ref={stageRef} aria-hidden="true" />
        {sceneFailed && <div className="sg-scene-error">The 3D table can’t open here, but everything you need is below.</div>}
        {view && anchors && view.players.map((p, i) => i === 0 ? null : (
          <SeatPlate key={i} name={p.name} player={p} at={anchors.seats[i]!} active={!!settled && settled.phase === 'playing' && settled.current === i}
            place={p.place} skitgubbe={view.skitgubbe === i} />
        ))}
        {need && anchors && (
          <div className="sg-need" style={{ left: anchors.pile.x, top: anchors.pile.y - anchors.pile.cardWidth * 0.95 }}>
            <strong>{need.short}</strong>{need.detail && <span>{need.detail}</span>}
          </div>
        )}
        {view && anchors && <>
          <span className="sg-stack-count" style={{ left: anchors.draw.x, top: anchors.draw.y - anchors.draw.cardWidth * 1.05 }}>{view.drawCount ? `${view.drawCount} to draw` : 'Draw pile empty'}</span>
          <span className="sg-stack-count" style={{ left: anchors.burn.x, top: anchors.burn.y - anchors.burn.cardWidth * 1.05 }}>{view.burnedCount ? `${view.burnedCount} burned` : 'Nothing burned'}</span>
        </>}
        {callout && <div key={callout.id} className={`sg-callout is-${callout.tone}`} role="status"><strong>{callout.title}</strong>{callout.detail && <span>{callout.detail}</span>}</div>}
        {view?.phase === 'over' && settled?.phase === 'over' && <Result snap={view} onAgain={() => newGame()} />}
      </div>

      <div className={`sg-hand${yourTurn ? ' is-turn' : ''}`} ref={handRef} style={{ height: 176 + extraHandHeight }} {...inertIf(showSettings || view?.phase === 'over')}>
        {rows.map(row => (
          <div key={row.key} className={`sg-row sg-row-${row.key}${source === row.key && view?.phase === 'playing' ? ' is-source' : ''}`} role="listbox" aria-multiselectable={!swapping} aria-label={row.label}>
            <span className="sg-row-label">{row.label}{source === row.key && view?.phase === 'playing' && <span className="sg-playable-hint"> · Playing from here</span>}</span>
            {!row.cards.length && <span className="sg-batch-empty">Empty</span>}
            <HandFan cards={row.cards} width={row.key === 'hand' ? 696 : 216} cardSize={row.key === 'hand' ? 90 : 64} slots={row.key === 'up' ? me?.upSlots : undefined} hidden={hidden} render={(card, i) => {
              const index = flat.findIndex(f => f.card.id === card.id)
              const faceDown = row.key === 'down'
              const playable = swapping && row.key !== 'down' || (yourTurn && row.key === source && (faceDown || legal.has(card.id)))
              const isSelected = selected.includes(card.id) || swapPick === card.id
              return (
                <button type="button" key={card.id} data-card={card.id} data-index={index} role="option"
                  tabIndex={index === focusIndex ? 0 : -1}
                  className={`sg-card${isSelected ? ' is-selected' : ''}${playable ? ' is-playable' : ''}${hidden.has(card.id) ? ' is-arriving' : ''}`}
                  aria-selected={isSelected} aria-disabled={!playable}
                  aria-label={faceDown ? `Face-down card ${i + 1}` : `${cardName(card)}${yourTurn && legal.has(card.id) ? ', playable' : ''}${yourTurn && !faceDown && !legal.has(card.id) && !swapping ? ', doesn’t fit' : ''}`}
                  onFocus={() => setFocusIndex(index)}
                  onClick={event => toggle(card, event.shiftKey)}
                  onDoubleClick={() => { if (yourTurn && legal.has(card.id)) act(g => g.play(0, selected.includes(card.id) ? selected : [card.id])) }}>
                  {faceDown ? <><CardBack className="sg-card-art" /><span className="sg-back-number">{i + 1}</span></> : <CardFace rank={card.rank} suit={card.suit} className="sg-card-art" />}
                  {isSelected && <span className="sg-check" aria-hidden="true" />}
                </button>
              )
            }} />
          </div>
        ))}
        {!rows.length && me?.place && <p className="sg-hand-empty">You finished {PLACE[me.place]}. The others are playing it out.</p>}
      </div>

      <div className="sg-decision" {...inertIf(showSettings)}>
        <div className="sg-decision-text" role="status" aria-live="polite">
          <strong>{decision.title}</strong>
          <span>{notice || decision.detail}</span>
        </div>
        <div className="sg-actions">
          {view?.phase === 'playing' && view.rules.chanceCard && source === 'hand' && (
            <button type="button" className="sg-secondary" disabled={!yourTurn || !game?.canChance(0)} onClick={() => act(g => g.chance(0))} title="Play the top of the draw pile blind. If it doesn’t fit, you take the pile with it.">
              Chance card <kbd>D</kbd>
            </button>
          )}
          {view?.phase === 'playing' && !nothingFits && source !== 'down' && (
            <button type="button" className="sg-secondary" disabled={!yourTurn || !game?.canPickUp(0)} onClick={() => act(g => g.pickUp(0))}>Take the pile <kbd>T</kbd></button>
          )}
          {yourTurn && game?.canPass(0) && <button type="button" className="sg-secondary" onClick={() => act(g => g.pass(0))}>Pass <kbd>P</kbd></button>}
          {primary && <button type="button" className="sg-primary" disabled={primary.disabled} onClick={primary.onClick}>{primary.label}{primary.key && <kbd>{primary.key}</kbd>}</button>}
        </div>
      </div>

      <div className="sg-flights" ref={flightRef} aria-hidden="true" />

      {showSettings && <SettingsDialog settings={settings} pending={!!pending} onChange={changeSettings}
        onClose={() => openSettings(false)} onApply={() => { openSettings(false); newGame() }} />}
    </div>
  )
}

/** React 18 has no `inert` prop type; the attribute itself works in every current browser
 *  and is what keeps the table unreachable behind the settings dialog. */
function inertIf(on: boolean): Record<string, string> {
  return on ? { inert: '' } : {}
}

function sum(a: Records, b: Records): Records {
  return { games: a.games + b.games, wins: a.wins + b.wins, skitgubbe: a.skitgubbe + b.skitgubbe }
}

function decisionText(view: Snapshot | null, settled: Snapshot | null, busy: boolean, yourTurn: boolean, source: string | null, legalCount: number, game: SkitgubbeGame | null, lastAction: string): { title: string; detail: string } {
  if (!view) return { title: 'Shuffling', detail: '' }
  if (view.phase === 'swap') {
    return view.players[0]!.ready
      ? { title: 'Dealing', detail: '' }
      : { title: 'Set up your table', detail: 'Pick a hand card and a face-up card. Matching ranks stack and refill your hand; different ranks swap.' }
  }
  if (view.phase === 'over') return { title: view.skitgubbe === 0 ? 'You’re the skitgubbe' : 'You made it out', detail: 'Press Enter to deal again.' }
  if (!settled || busy) return { title: lastAction || 'Dealing', detail: '' }
  const me = view.players[0]!
  if (me.place) return { title: `You finished ${PLACE[me.place]}`, detail: lastAction }
  if (!yourTurn) return { title: `Waiting for ${settled.players[settled.current]!.name}`, detail: lastAction }
  const need = requirement(settled)
  if (source === 'down') return { title: 'Your turn, blind', detail: 'Turn one of your face-down cards over. If it doesn’t fit, you take the pile with it.' }
  if (legalCount) return { title: `Your turn: ${need.short.toLowerCase()}`, detail: lastAction || 'Select cards of one rank, then play them.' }
  return {
    title: 'Nothing fits',
    detail: game?.canChance(0) ? `${need.short} is needed. Take the pile, or try a chance card.` : game?.canPass(0) ? 'You can’t finish on that card. Pass this turn.' : `${need.short} is needed. Take the pile.`,
  }
}

function SeatPlate({ name, player, at, active, place, skitgubbe }: { name: string; player: Snapshot['players'][number]; at: Projected; active: boolean; place: number | null; skitgubbe: boolean }) {
  return (
    <div className={`sg-seat${active ? ' is-active' : ''}${place ? ' is-out' : ''}`} style={{ left: at.x, top: at.y }}>
      <strong>{name}{active && <em>playing</em>}</strong>
      {place ? <span>{skitgubbe ? 'Skitgubbe' : `Out, ${PLACE[place]}`}</span> : (
        <span>
          {player.hand.length} in hand

          {player.down.length > 0 && <> · {player.down.length} hidden</>}
        </span>
      )}
    </div>
  )
}

function Result({ snap, onAgain }: { snap: Snapshot; onAgain: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => { ref.current?.focus({ preventScroll: true }) }, [])
  const order = snap.players.map((p, i) => ({ p, i })).sort((a, b) => (a.p.place ?? 9) - (b.p.place ?? 9))
  const lost = snap.skitgubbe === 0
  const first = snap.players[0]!.place === 1
  return (
    <div className="sg-result">
      <div className={`sg-result-card${lost ? ' is-loss' : first ? ' is-win' : ''}`} role="dialog" aria-label="Result">
        <h2>{lost ? 'You’re the skitgubbe.' : first ? 'You won.' : 'You made it out.'}</h2>
        <ol>
          {order.map(({ p, i }) => (
            <li key={i} className={`${i === 0 ? 'is-you' : ''}${snap.skitgubbe === i ? ' is-skitgubbe' : ''}`}>
              <span>{p.place}</span>{i === 0 ? 'You' : p.name}{snap.skitgubbe === i && <em>skitgubbe</em>}
            </li>
          ))}
        </ol>
        <button type="button" ref={ref} className="sg-primary" onClick={onAgain}>Play again <kbd>Enter</kbd></button>
      </div>
    </div>
  )
}

function SettingsDialog({ settings, pending, onChange, onClose, onApply }: {
  settings: Settings; pending: boolean
  onChange: (s: Settings) => void; onClose: () => void; onApply: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { ref.current?.querySelector<HTMLElement>('button, input')?.focus({ preventScroll: true }) }, [])
  const setRule = (key: keyof Rules, value: boolean) => onChange({ ...settings, rules: { ...settings.rules, [key]: value } })
  // Contain Tab inside the dialog: the table behind it is inert, and focus escaping to
  // it would leave a keyboard player acting on a game they can't see.
  const trap = (event: React.KeyboardEvent) => {
    if (event.key !== 'Tab') return
    const items = [...(ref.current?.querySelectorAll<HTMLElement>('button, input') ?? [])]
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }
  return (
    <div className="sg-dialog-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <div ref={ref} className="sg-dialog" role="dialog" aria-modal="true" aria-labelledby="sg-rules-title" onKeyDown={trap}>
        <div className="sg-dialog-head">
          <h2 id="sg-rules-title">House rules</h2>
          <button type="button" className="sg-icon" onClick={onClose} aria-label="Close house rules">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg>
          </button>
        </div>
        <div className="sg-dialog-body">
          <p>Every family plays it a little differently. Changes apply from the next game.</p>
          <fieldset className="sg-opponents"><legend>Opponents</legend>
            <div>{[1, 2, 3].map(n => <button key={n} type="button" aria-pressed={settings.players === n + 1} onClick={() => onChange({ ...settings, players: n + 1 })}>{n}</button>)}</div>
          </fieldset>
          <fieldset className="sg-opponents"><legend>Bots</legend>
            <div>{BOT_LEVEL_OPTIONS.map(o => <button key={o.level} type="button" aria-pressed={settings.bots === o.level} title={o.blurb} onClick={() => onChange({ ...settings, bots: o.level })}>{o.level}</button>)}</div>
            <em className="sg-bot-blurb">{BOT_LEVEL_OPTIONS.find(o => o.level === settings.bots)?.title} — {BOT_LEVEL_OPTIONS.find(o => o.level === settings.bots)?.blurb}</em>
          </fieldset>
          <div className="sg-rules">
            {RULE_ROWS.map(row => (
              <label key={row.key} className="sg-rule">
                <input type="checkbox" checked={settings.rules[row.key]} onChange={event => setRule(row.key, event.currentTarget.checked)} />
                <span><strong>{row.title}</strong><em>{row.detail}</em></span>
              </label>
            ))}
          </div>
        </div>
        <div className="sg-dialog-foot">
          <button type="button" className="sg-ghost" onClick={() => onChange({ ...settings, rules: { ...DEFAULT_RULES } })}>Reset to our rules</button>
          <button type="button" className="sg-primary" onClick={onApply}>{pending ? 'Deal with these rules' : 'Deal a new game'}</button>
        </div>
      </div>
    </div>
  )
}

function SkitgubbeMark() {
  // A plain card symbol, matching the geometric back without a figurative emblem.
  return (
    <svg className="sg-mark" width="30" height="36" viewBox="0 0 30 36" aria-hidden="true">
      <rect x="1" y="1" width="28" height="34" rx="4" fill="#8e2f24" />
      <rect x="3.5" y="3.5" width="23" height="29" rx="2.5" fill="none" stroke="#f3e3c3" strokeOpacity=".7" />
      <path d="M15 9l6 9-6 9-6-9Z" fill="#f3e3c3" />
    </svg>
  )
}
