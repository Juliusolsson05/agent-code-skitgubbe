import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

import type { SkitgubbeApi } from '../api'
import { CardBack } from '../assets/svg/CardBack'
import { CardFace } from '../assets/svg/CardFace'
import { applyMove, chooseMove, chooseSwaps } from './bot'
import type { GameAudio } from './audio'
import { cardLabel, cardName, isRed, type Card } from './engine/cards'
import { MAX_PLAYERS, MIN_PLAYERS, SkitgubbeGame, type GameEvent, type Snapshot } from './engine/game'
import { DEFAULT_RULES, effectiveTop, parseRules, type Rules } from './engine/rules'
import { SkitgubbeScene } from './scene'
import styles from './skitgubbe.css?inline'

const SETTINGS_KEY = 'skitgubbe.settings'
const RECORDS_KEY = 'skitgubbe.records'
const MUTE_KEY = 'skitgubbe.muted'

// Bot pacing. The engine decides instantly; these delays exist so a human can follow
// the table. A burn gets longer because the sweep animation and the callout need a beat
// before the same bot (who plays again) moves. Once you are out you are only watching,
// so the rest of the game speeds up rather than making you sit through it.
const BOT_DELAY_MS = 900
const BOT_AFTER_BURN_MS = 1450
const BOT_SPECTATE_MS = 420
/** Wait for the opening deal to land before the first bot move. */
const OPENING_DEAL_MS = 2300
const CALLOUT_MS = 1600

export type Settings = { players: number; rules: Rules }
export type Records = { games: number; wins: number; skitgubbe: number }

const DEFAULT_SETTINGS: Settings = { players: 3, rules: { ...DEFAULT_RULES } }
const EMPTY_RECORDS: Records = { games: 0, wins: 0, skitgubbe: 0 }

export function parseSettings(value: unknown): Settings {
  const input = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
  const players = typeof input.players === 'number' && Number.isInteger(input.players)
    ? Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, input.players)) : DEFAULT_SETTINGS.players
  return { players, rules: parseRules(input.rules) }
}

function parseRecords(value: unknown): Records {
  const input = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
  const count = (key: keyof Records) => {
    const v = input[key]
    return typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0
  }
  return { games: count('games'), wins: count('wins'), skitgubbe: count('skitgubbe') }
}

/** The settings panel's rule rows. Order follows the life of a game: swap, play, burn, finish. */
const RULE_ROWS: Array<{ key: keyof Rules; title: string; detail: string }> = [
  { key: 'swapPhase', title: 'Swap before play', detail: 'Trade hand cards for your face-up cards before the first turn.' },
  { key: 'invisibleFive', title: 'Invisible 5', detail: 'A 5 goes on anything and is see-through: the next card must beat what lies under it.' },
  { key: 'twoResets', title: '2 resets', detail: 'A 2 goes on anything, and anything goes on a 2.' },
  { key: 'tenBurns', title: '10 burns', detail: 'A 10 goes on anything and burns the whole pile.' },
  { key: 'fourBurns', title: 'Four of a kind burns', detail: 'Four cards of one rank on top burn the pile.' },
  { key: 'burnPlaysAgain', title: 'Burner plays again', detail: 'Whoever burned the pile starts the new one.' },
  { key: 'chanceCard', title: 'Chance card', detail: 'Gamble on the top of the draw pile instead of playing from your hand.' },
  { key: 'sevenOrLower', title: '7 or lower', detail: 'On a 7, the next card must be 7 or lower.' },
  { key: 'noSpecialFinish', title: 'No finishing on 2, 10 or A', detail: 'Your last card may not be a 2, a 10 or an ace.' },
]

const PLACE = ['', '1st', '2nd', '3rd', '4th']

type Callout = { id: number; title: string; detail?: string; tone: 'burn' | 'info' | 'win' | 'loss' | 'ghost' }

/**
 * React owns text, controls and your card rail; the 3D scene owns the table. The engine
 * lives in a ref and publishes snapshots, and bots are driven here on timers, so the
 * rules stay pure and testable while the pacing stays a view concern.
 *
 * WHY your cards are DOM rather than clickable 3D meshes: text and choices must be real,
 * focusable, screen-reader-visible controls (Blackjack's spec §11 rule), and picking
 * 1.4-unit cards by raycast from a 17°-tilted camera is fiddly on a trackpad. The table
 * shows the same cards; the rail is where you choose them.
 */
export function Skitgubbe({ api, audio }: { api: SkitgubbeApi; audio: GameAudio }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<SkitgubbeScene | null>(null)
  const gameRef = useRef<SkitgubbeGame | null>(null)
  const [snap, setSnap] = useState<Snapshot | null>(null)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const settingsRef = useRef(settings)
  const [records, setRecords] = useState<Records>(EMPTY_RECORDS)
  const [selected, setSelected] = useState<string[]>([])
  const [swapPick, setSwapPick] = useState<string | null>(null)
  const [callout, setCallout] = useState<Callout | null>(null)
  const [muted, setMuted] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [sceneFailed, setSceneFailed] = useState(false)
  const settingsId = useId()
  // Hydration bookkeeping: storage answers asynchronously over the host bridge, and a
  // late answer must never overwrite what the player already did in this session.
  const touched = useRef({ settings: false, mute: false, played: false })
  const recordsBase = useRef<Records | null>(null)
  const recordsDelta = useRef<Records>({ ...EMPTY_RECORDS })
  const writes = useRef<Promise<unknown>>(Promise.resolve())
  const calloutId = useRef(0)
  const dealtAt = useRef(0)

  const save = useCallback((key: string, value: unknown) => {
    // Serialize writes: the bridge may complete them out of order, and an older value
    // must never land after a newer one.
    writes.current = writes.current.then(() => api.storage.set(key, value as never)).catch(() => {})
  }, [api])

  const shout = useCallback((c: Omit<Callout, 'id'>) => setCallout({ ...c, id: ++calloutId.current }), [])

  /** Push the engine's state to React and the scene, and turn its events into sound,
   *  callouts and stats. The single path every action goes through. */
  const sync = useCallback(() => {
    const game = gameRef.current
    if (!game) return
    const next = game.getSnapshot()
    const events = game.takeEvents()
    sceneRef.current?.update(next)
    setSnap(next)
    handleEvents(events, next)
  }, [])

  const handleEvents = (events: GameEvent[], s: Snapshot) => {
    const name = (p: number) => (p === 0 ? 'You' : s.players[p]!.name)
    for (const e of events) {
      if (e.type === 'play' && e.cards[0]!.rank === '5' && s.rules.invisibleFive && e.cards.length < 4) {
        audio.ghost()
        const under = effectiveTop(s.pile, s.rules)
        shout({ tone: 'ghost', title: 'Invisible 5', detail: under ? `Still playing on ${under === 'A' ? 'an ace' : `a ${under}`}` : 'The table is open' })
      } else if (e.type === 'burn') {
        audio.burn()
        shout({ tone: 'burn', title: e.reason === 'ten' ? 'Burned!' : 'Four of a kind!', detail: `${e.count} cards gone${s.rules.burnPlaysAgain && s.current === e.player && s.phase === 'playing' ? ` · ${name(e.player)} ${e.player === 0 ? 'go' : 'goes'} again` : ''}` })
      } else if (e.type === 'pickup') {
        audio.pickup()
        shout({ tone: e.player === 0 ? 'loss' : 'info', title: `${name(e.player)} ${e.player === 0 ? 'take' : 'takes'} the pile`, detail: `${e.count} ${e.count === 1 ? 'card' : 'cards'}` })
      } else if (e.type === 'flip' && !e.ok) {
        audio.denied()
        shout({ tone: e.player === 0 ? 'loss' : 'info', title: `${cardLabel(e.card)} didn’t fit`, detail: `${name(e.player)} ${e.player === 0 ? 'take' : 'takes'} the pile` })
      } else if (e.type === 'chance') {
        shout({ tone: e.ok ? 'win' : 'info', title: `Chance: ${cardLabel(e.card)}`, detail: e.ok ? 'It fits!' : 'No luck' })
      } else if (e.type === 'finish') {
        if (e.player === 0) (e.place === 1 ? audio.fanfare() : audio.win())
        shout({ tone: e.player === 0 ? 'win' : 'info', title: e.player === 0 ? `You’re out · ${PLACE[e.place]}` : `${name(e.player)} is out · ${PLACE[e.place]}` })
      } else if (e.type === 'over') {
        if (e.skitgubbe === 0) audio.lose()
        shout({ tone: e.skitgubbe === 0 ? 'loss' : 'win', title: e.skitgubbe === 0 ? 'You’re the skitgubbe' : `${name(e.skitgubbe)} is the skitgubbe` })
        const place = s.players[0]!.place
        const delta = recordsDelta.current
        delta.games++
        if (place === 1) delta.wins++
        if (e.skitgubbe === 0) delta.skitgubbe++
        const base = recordsBase.current
        const total = base ? sum(base, delta) : { ...delta }
        setRecords(total)
        // Unknown stored totals must not be overwritten by this session's smaller ones.
        if (base) save(RECORDS_KEY, total)
      }
    }
  }

  const newGame = useCallback((next: Settings = settingsRef.current) => {
    const game = new SkitgubbeGame({ players: next.players, rules: next.rules })
    gameRef.current = game
    // Bots swap and ready up at once; the table waits only for you.
    for (let p = 1; p < next.players; p++) {
      for (const [h, u] of chooseSwaps(game, p)) game.swap(p, h, u)
      game.ready(p)
    }
    dealtAt.current = performance.now()
    game.takeEvents()
    setSelected([])
    setSwapPick(null)
    setCallout(null)
    audio.shuffle()
    sync()
  }, [audio, sync])

  // --- mount: scene, first deal, storage ---------------------------------------------
  useEffect(() => {
    const container = stageRef.current
    let scene: SkitgubbeScene | null = null
    if (container) {
      try {
        scene = new SkitgubbeScene(container, { cardLand: () => audio.deal(), cardSweep: () => audio.sweep() })
        sceneRef.current = scene
      } catch {
        // Some hosts disable WebGL. The game stays fully playable from the rails below:
        // your cards, the pile readout and every opponent's counts are real DOM.
        setSceneFailed(true)
      }
    }
    newGame(DEFAULT_SETTINGS)

    let alive = true
    void Promise.allSettled([api.storage.get(SETTINGS_KEY), api.storage.get(RECORDS_KEY), api.storage.get<boolean>(MUTE_KEY)])
      .then(([settingsResult, recordsResult, muteResult]) => {
        if (!alive) return
        if (settingsResult.status === 'fulfilled' && settingsResult.value !== undefined && !touched.current.settings) {
          const loaded = parseSettings(settingsResult.value)
          settingsRef.current = loaded
          setSettings(loaded)
          // Only redeal if nobody has touched the first game yet; a player mid-swap keeps
          // their cards and the saved rules apply from the next game.
          if (!touched.current.played) newGame(loaded)
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
      })

    if (!document.activeElement || document.activeElement === document.body) rootRef.current?.focus({ preventScroll: true })
    return () => {
      alive = false
      scene?.dispose()
      sceneRef.current = null
    }
  }, [api, audio, newGame, save])

  // --- bots ---------------------------------------------------------------------------
  const lastEventWasBurn = useRef(false)
  useEffect(() => {
    const game = gameRef.current
    if (!snap || !game || snap.phase !== 'playing') return
    const current = snap.current
    if (!snap.players[current]!.bot) return
    const youOut = snap.players[0]!.place !== null
    const sinceDeal = performance.now() - dealtAt.current
    const delay = Math.max(OPENING_DEAL_MS - sinceDeal, youOut ? BOT_SPECTATE_MS : lastEventWasBurn.current ? BOT_AFTER_BURN_MS : BOT_DELAY_MS)
    const timer = window.setTimeout(() => {
      if (gameRef.current !== game) return
      const move = chooseMove(game, current)
      applyMove(game, current, move)
      sync()
    }, delay)
    return () => window.clearTimeout(timer)
  }, [snap, sync])
  useEffect(() => {
    // Remembered for the NEXT bot delay. Derived from the pile emptying under the same
    // player rather than from events, which are consumed inside sync().
    lastEventWasBurn.current = !!snap && snap.pile.length === 0 && snap.burnedCount > 0
  }, [snap])

  useEffect(() => {
    if (!callout) return
    const timer = window.setTimeout(() => setCallout(c => (c?.id === callout.id ? null : c)), CALLOUT_MS)
    return () => window.clearTimeout(timer)
  }, [callout])

  // Selections only make sense for the cards you can still play this turn.
  useEffect(() => {
    const game = gameRef.current
    if (!game || !snap) return
    const legal = new Set(game.legalCardIds(0))
    setSelected(ids => (ids.every(id => legal.has(id)) ? ids : ids.filter(id => legal.has(id))))
  }, [snap])

  // --- your actions -------------------------------------------------------------------
  const game = gameRef.current
  const me = snap?.players[0]
  const yourTurn = !!snap && snap.phase === 'playing' && snap.current === 0 && me?.place === null
  const source = yourTurn && game ? game.source(0) : null
  const legal = new Set(yourTurn && game ? game.legalCardIds(0) : [])
  const act = (fn: (g: SkitgubbeGame) => boolean) => {
    const g = gameRef.current
    if (!g) return false
    audio.unlock()
    touched.current.played = true
    const ok = fn(g)
    if (ok) {
      setSelected([])
      sync()
    } else audio.denied()
    return ok
  }

  const toggleCard = (card: Card) => {
    if (!snap) return
    if (snap.phase === 'swap') return swapClick(card)
    if (!yourTurn) return
    if (source === 'down') return void act(g => g.flip(0, card.id))
    if (!legal.has(card.id)) {
      audio.denied()
      return
    }
    setSelected(ids => {
      if (ids.includes(card.id)) return ids.filter(id => id !== card.id)
      // Picking a different rank starts a new selection: a play is one rank.
      const current = cardsById(snap).get(ids[0] ?? '')
      return current && current.rank === card.rank ? [...ids, card.id] : [card.id]
    })
  }

  const swapClick = (card: Card) => {
    if (!snap || !me || me.ready) return
    touched.current.played = true
    const inHand = me.hand.some(c => c.id === card.id)
    if (!swapPick) return setSwapPick(card.id)
    if (swapPick === card.id) return setSwapPick(null)
    const pickInHand = me.hand.some(c => c.id === swapPick)
    if (pickInHand === inHand) return setSwapPick(card.id)
    const [h, u] = inHand ? [card.id, swapPick] : [swapPick, card.id]
    act(g => g.swap(0, h, u))
    setSwapPick(null)
    audio.deal()
  }

  const playSelected = () => {
    if (!selected.length) {
      // Enter with nothing selected plays the focused card, so the keyboard needs no
      // separate "select" step for the common single-card play.
      const focused = document.activeElement instanceof HTMLElement ? document.activeElement.dataset.card : undefined
      if (focused && legal.has(focused)) act(g => g.play(0, [focused]))
      else audio.denied()
      return
    }
    act(g => g.play(0, selected))
  }

  const start = () => act(g => g.ready(0))

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (event.ctrlKey || event.metaKey || event.altKey || event.nativeEvent.isComposing) return
    if (target.closest('input, textarea, select, [role="textbox"]')) return
    const key = event.key.toLowerCase()
    if (key === 'escape' && showSettings) { event.preventDefault(); setShowSettings(false); return }
    if (showSettings || !snap) return
    if (key === 'arrowleft' || key === 'arrowright') {
      const cards = [...(railRef.current?.querySelectorAll<HTMLButtonElement>('[data-card]') ?? [])]
      if (!cards.length) return
      event.preventDefault()
      const at = cards.indexOf(target as HTMLButtonElement)
      const next = at < 0 ? 0 : Math.max(0, Math.min(cards.length - 1, at + (key === 'arrowleft' ? -1 : 1)))
      cards[next]!.focus()
      return
    }
    if (event.repeat) return
    if (key === 'enter') {
      // A focused non-card button keeps its native Enter.
      if (target.closest('button') && !target.dataset.card) return
      event.preventDefault()
      if (snap.phase === 'over') newGame()
      else if (snap.phase === 'swap') start()
      else if (yourTurn && source === 'down') {
        const id = target.dataset.card ?? me?.down[0]?.id
        if (id) act(g => g.flip(0, id))
      } else if (yourTurn) playSelected()
      return
    }
    if (key === 't' && yourTurn) { event.preventDefault(); act(g => g.pickUp(0)) }
    else if (key === 'd' && yourTurn) { event.preventDefault(); act(g => g.chance(0)) }
    else if (key === 'm') { event.preventDefault(); toggleMute() }
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

  // --- render ------------------------------------------------------------------------
  const status = statusLine(snap, source, legal.size, game)
  const railCards: Card[] = !snap || !me ? [] : snap.phase === 'swap' ? [...me.hand, ...me.up] : source === 'up' ? me.up : source === 'down' ? me.down : me.hand
  const pending = snap && JSON.stringify(settings) !== JSON.stringify({ players: snap.players.length, rules: snap.rules })

  return (
    <div className="sg-root" ref={rootRef} tabIndex={0} role="region" aria-label="Skitgubbe game" onKeyDown={onKeyDown}
      data-phase={snap?.phase} data-turn={yourTurn ? 'you' : 'bot'}
      onPointerDown={event => {
        const target = event.target as HTMLElement
        if (!target.closest('button, input, select, textarea')) event.currentTarget.focus({ preventScroll: true })
      }}>
      <style>{styles}</style>
      <header className="sg-header">
        <SkitgubbeMark />
        <div className="sg-heading"><span>THE SWEDISH SHEDDING GAME</span><h1>Skitgubbe</h1></div>
        <dl className="sg-records" aria-label="Your record on this device">
          <div><dt>Games</dt><dd>{records.games}</dd></div>
          <div><dt>Won</dt><dd>{records.wins}</dd></div>
          <div><dt>Skitgubbe</dt><dd>{records.skitgubbe}</dd></div>
        </dl>
        <button type="button" className="sg-button sg-quiet" onClick={() => newGame()}>New game</button>
        <button type="button" className="sg-button sg-tool" onClick={toggleMute} aria-label={muted ? 'Turn sound on' : 'Mute sound'} aria-pressed={!muted} title={muted ? 'Sound on (M)' : 'Mute (M)'}>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 8h3l4-4v12l-4-4H3z" />{muted ? <path d="m13 7 5 6m0-6-5 6" /> : <><path d="M13 7a5 5 0 0 1 0 6" /><path d="M15 4a9 9 0 0 1 0 12" /></>}</svg>
        </button>
        <button type="button" className={`sg-button sg-tool${showSettings ? ' sg-selected' : ''}`} onClick={() => setShowSettings(v => !v)} aria-label="Game settings" aria-expanded={showSettings} aria-controls={settingsId} title="Rules and players">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" /><path d="M7 3v4m6 1v4m-5 1v4" /></svg>
        </button>
      </header>

      <div className="sg-table">
        <div className="sg-scene" ref={stageRef} aria-hidden="true" />
        {sceneFailed && <div className="sg-scene-error">The 3D table couldn’t open here. The game still works from the cards below.</div>}
        {snap && <Seats snap={snap} />}
        {callout && <div key={callout.id} className={`sg-callout sg-callout-${callout.tone}`} role="status" aria-live="polite"><strong>{callout.title}</strong>{callout.detail && <span>{callout.detail}</span>}</div>}
        {snap?.phase === 'over' && <Result snap={snap} onAgain={() => newGame()} />}
      </div>

      <div className="sg-status" role="status" aria-live="polite">
        <strong>{status.title}</strong><span>{status.detail}</span>
        <PileReadout snap={snap} />
      </div>

      <div className="sg-rail" ref={railRef} role="group" aria-label={snap?.phase === 'swap' ? 'Your hand and face-up cards' : 'Your cards'}>
        {snap?.phase === 'swap' && me && <span className="sg-rail-label">Hand</span>}
        {railCards.map((card, i) => {
          const faceDown = source === 'down'
          const isUp = snap?.phase === 'swap' && me ? me.up.some(c => c.id === card.id) : false
          const playable = snap?.phase === 'swap' ? !me?.ready : yourTurn && (faceDown || legal.has(card.id))
          const isSelected = selected.includes(card.id) || swapPick === card.id
          return (
            <span key={card.id} className="sg-rail-slot">
              {snap?.phase === 'swap' && isUp && me && me.up[0]?.id === card.id && <span className="sg-rail-label sg-rail-label-up">Face up</span>}
              <button type="button" data-card={card.id}
                className={`sg-card${isSelected ? ' is-selected' : ''}${playable ? ' is-playable' : ''}${isUp ? ' is-up' : ''}`}
                aria-pressed={isSelected}
                aria-disabled={!playable}
                aria-label={faceDown ? `Face-down card ${i + 1}, play blind` : `${cardName(card)}${isUp ? ', face up' : ''}${playable ? '' : ', cannot be played now'}`}
                onClick={() => toggleCard(card)}
                onKeyDown={event => {
                  // Enter plays (handled on the root); only Space toggles the selection,
                  // so a native button activation never doubles as a play.
                  if (event.key === 'Enter') event.preventDefault()
                }}>
                {faceDown ? <CardBack className="sg-card-art" /> : <CardFace rank={card.rank} suit={card.suit} className="sg-card-art" />}
              </button>
            </span>
          )
        })}
        {!railCards.length && <span className="sg-rail-empty">{me?.place ? `You finished ${PLACE[me.place]}. Watching the rest of the table…` : 'Your cards will appear here.'}</span>}
      </div>

      <div className="sg-actions">
        {snap?.phase === 'swap' ? (
          <>
            <span className="sg-hint">{swapPick ? 'Now pick a card from the other row to swap with it.' : 'Click a hand card, then a face-up card, to swap them.'}</span>
            <button type="button" className="sg-button sg-primary" onClick={start} disabled={!!me?.ready}>Start game <kbd>↵</kbd></button>
          </>
        ) : snap?.phase === 'over' ? (
          <button type="button" className="sg-button sg-primary" onClick={() => newGame()}>Play again <kbd>↵</kbd></button>
        ) : (
          <>
            <button type="button" className="sg-button sg-primary" disabled={!yourTurn || source === 'down' || (!selected.length && !legal.size)} onClick={playSelected}>
              {selected.length > 1 ? `Play ${selected.length} cards` : 'Play'} <kbd>↵</kbd>
            </button>
            <button type="button" className="sg-button" disabled={!yourTurn || !game?.canPickUp(0)} onClick={() => act(g => g.pickUp(0))}>Take pile <kbd>T</kbd></button>
            {snap?.rules.chanceCard && <button type="button" className="sg-button" disabled={!yourTurn || !game?.canChance(0)} onClick={() => act(g => g.chance(0))} title="Play the top card of the draw pile blind; if it doesn’t fit you take the pile">Chance card <kbd>D</kbd></button>}
            {yourTurn && game?.canPass(0) && <button type="button" className="sg-button" onClick={() => act(g => g.pass(0))}>Pass</button>}
          </>
        )}
      </div>

      <footer className="sg-footer">
        <span>← → choose · Space select · Enter play · T take pile{snap?.rules.chanceCard ? ' · D chance' : ''} · M sound</span>
        <span>{pending ? 'New rules apply from the next game' : 'Records saved on this device'}</span>
      </footer>

      {showSettings && <SettingsPanel id={settingsId} settings={settings} pending={!!pending} onChange={changeSettings}
        onClose={() => setShowSettings(false)} onApply={() => { setShowSettings(false); newGame() }} />}
    </div>
  )
}

function sum(a: Records, b: Records): Records {
  return { games: a.games + b.games, wins: a.wins + b.wins, skitgubbe: a.skitgubbe + b.skitgubbe }
}

function cardsById(snap: Snapshot): Map<string, Card> {
  const map = new Map<string, Card>()
  for (const p of snap.players) for (const c of [...p.hand, ...p.up, ...p.down]) map.set(c.id, c)
  return map
}

function statusLine(snap: Snapshot | null, source: string | null, legalCount: number, game: SkitgubbeGame | null): { title: string; detail: string } {
  if (!snap) return { title: 'Shuffling…', detail: '' }
  if (snap.phase === 'swap') return { title: 'Set up your table', detail: 'Put your strongest cards face up. Face-down cards are played blind at the end.' }
  if (snap.phase === 'over') return { title: 'Game over', detail: snap.skitgubbe === 0 ? 'Better luck next deal.' : 'You made it out.' }
  const player = snap.players[snap.current]!
  if (snap.current !== 0) return { title: `${player.name} is thinking…`, detail: snap.players[0]!.place ? `You finished ${PLACE[snap.players[0]!.place!]}.` : 'Your turn is next when the glow reaches you.' }
  if (source === 'down') return { title: 'Your turn · face-down cards', detail: 'Pick one blind. If it doesn’t fit, you take the pile with it.' }
  if (legalCount) return { title: 'Your turn', detail: source === 'up' ? 'Playing from your face-up cards.' : 'Pick a card (several of one rank play together).' }
  return { title: 'Your turn · nothing fits', detail: game?.canChance(0) ? 'Take the pile, or try your luck with a chance card.' : game?.canPass(0) ? 'You can’t go out on that card: pass.' : 'Take the pile.' }
}

function PileReadout({ snap }: { snap: Snapshot | null }) {
  if (!snap) return null
  const top = snap.pile[snap.pile.length - 1]
  const under = effectiveTop(snap.pile, snap.rules)
  const hidden = top && top.rank !== under
  return (
    <span className="sg-pile-readout">
      <span>Pile {top ? <b className={isRed(top) ? 'sg-red' : ''}>{cardLabel(top)}</b> : <b>empty</b>}{hidden && <em> · play on {under ?? 'anything'}</em>}</span>
      <span>{snap.pile.length} in pile · {snap.drawCount} to draw · {snap.burnedCount} burned</span>
    </span>
  )
}

/** The opponents' counts and whose turn it is, as real text over the table's edge. */
function Seats({ snap }: { snap: Snapshot }) {
  const positions = snap.players.length === 2 ? ['bottom', 'top'] : snap.players.length === 3 ? ['bottom', 'left', 'right'] : ['bottom', 'left', 'top', 'right']
  return (
    <>
      {snap.players.map((p, i) => i === 0 ? null : (
        <div key={i} className={`sg-seat sg-seat-${positions[i]}${snap.current === i && snap.phase === 'playing' ? ' is-turn' : ''}${p.place ? ' is-out' : ''}`}>
          <strong>{p.name}</strong>
          <span>{p.place ? (snap.skitgubbe === i ? 'Skitgubbe' : `Out · ${PLACE[p.place]}`) : `${p.hand.length} in hand · ${p.up.length + p.down.length} on table`}</span>
        </div>
      ))}
    </>
  )
}

function Result({ snap, onAgain }: { snap: Snapshot; onAgain: () => void }) {
  const order = snap.players.map((p, i) => ({ p, i })).sort((a, b) => (a.p.place ?? 9) - (b.p.place ?? 9))
  const lost = snap.skitgubbe === 0
  return (
    <div className="sg-result">
      <div className={`sg-result-card${lost ? ' is-loss' : ''}`}>
        <span className="sg-kicker">{lost ? 'THE LAST ONE HOLDING CARDS' : snap.players[0]!.place === 1 ? 'FIRST OUT' : 'SAFE'}</span>
        <h2>{lost ? 'You’re the skitgubbe.' : snap.players[0]!.place === 1 ? 'You won!' : 'You got out.'}</h2>
        <ol>{order.map(({ p, i }) => <li key={i} className={snap.skitgubbe === i ? 'is-skitgubbe' : ''}><span>{PLACE[p.place ?? 0]}</span>{i === 0 ? 'You' : p.name}{snap.skitgubbe === i && <em>skitgubbe</em>}</li>)}</ol>
        <button type="button" className="sg-button sg-primary" onClick={onAgain}>Deal again</button>
      </div>
    </div>
  )
}

function SettingsPanel({ id, settings, pending, onChange, onClose, onApply }: {
  id: string; settings: Settings; pending: boolean
  onChange: (s: Settings) => void; onClose: () => void; onApply: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { ref.current?.querySelector<HTMLElement>('button, input')?.focus({ preventScroll: true }) }, [])
  const setRule = (key: keyof Rules, value: boolean) => onChange({ ...settings, rules: { ...settings.rules, [key]: value } })
  return (
    <div id={id} ref={ref} className="sg-settings" role="dialog" aria-label="Rules and players">
      <div className="sg-settings-title"><h2>House rules</h2><button type="button" className="sg-button sg-close" onClick={onClose} aria-label="Close settings">×</button></div>
      <p>Every family plays it a little differently. Changes apply from the next game.</p>
      <fieldset className="sg-players"><legend>Opponents</legend>
        <div>{[1, 2, 3].map(n => <button key={n} type="button" className="sg-button" aria-pressed={settings.players === n + 1} onClick={() => onChange({ ...settings, players: n + 1 })}>{n}</button>)}</div>
      </fieldset>
      <div className="sg-rule-list">
        {RULE_ROWS.map(row => (
          <label key={row.key} className="sg-rule">
            <input type="checkbox" checked={settings.rules[row.key]} onChange={event => setRule(row.key, event.currentTarget.checked)} />
            <span><strong>{row.title}</strong><em>{row.detail}</em></span>
          </label>
        ))}
      </div>
      <div className="sg-settings-actions">
        <button type="button" className="sg-button sg-quiet" onClick={() => onChange({ ...settings, rules: { ...DEFAULT_RULES } })}>Reset rules</button>
        <button type="button" className="sg-button sg-primary" onClick={onApply}>{pending ? 'Deal with these rules' : 'New game'}</button>
      </div>
    </div>
  )
}

function SkitgubbeMark() {
  // Two cards fanned with a 5 on top: the invisible 5 is this table's signature rule.
  return (
    <svg className="sg-mark" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#12402a" />
      <rect x="9" y="8" width="15" height="21" rx="2.5" fill="#a11228" transform="rotate(-14 16 18)" />
      <rect x="16" y="11" width="15" height="21" rx="2.5" fill="#fdfdfb" transform="rotate(10 23 21)" />
      <text x="24" y="26" fontSize="11" fontWeight="800" fontFamily="Georgia, serif" fill="#20232b" textAnchor="middle" transform="rotate(10 23 21)">5</text>
    </svg>
  )
}
