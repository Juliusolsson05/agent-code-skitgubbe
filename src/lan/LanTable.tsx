import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CardBack } from '../assets/svg/CardBack'
import { CardFace } from '../assets/svg/CardFace'
import { HandFan, handColumns, handRows } from '../game/HandFan'
import { requirement } from '../game/Skitgubbe'
import { cardName, RANK_VALUE, type Card } from '../game/engine/cards'
import type { GameAudio } from '../game/audio'
import { SkitgubbeScene, type Projected, type SelfHooks } from '../game/scene'
import { isKnown, type Action, type RoomView, type TableCard, type TableSnapshot } from './protocol'
import styles from '../game/skitgubbe.css?inline'

type Props = { room: RoomView; audio: GameAudio; enabled: boolean; action(a: Action): Promise<void>; onAgain(): Promise<void> }
export function LanTable({ room, audio, enabled, action, onAgain }: Props) {
  const root = useRef<HTMLDivElement>(null), stage = useRef<HTMLDivElement>(null), flight = useRef<HTMLDivElement>(null)
  const scene = useRef<SkitgubbeScene | null>(null)
  const previous = useRef<TableSnapshot | null>(null)
  const seen = useRef(-1)
  const queue = useRef(Promise.resolve())
  const mounted = useRef(true)
  const [snap, setSnap] = useState<TableSnapshot>(room.snapshot!)
  const [busy, setBusy] = useState(true)
  const [sending, setSending] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [swapPick, setSwapPick] = useState<string | null>(null)
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set())
  const [message, setMessage] = useState('')
  const [muted, setMuted] = useState(audio.isMuted)
  const [focus, setFocus] = useState(0)
  const [anchors, setAnchors] = useState<{ seats: Projected[]; pile: Projected; draw: Projected } | null>(null)
  const [failed, setFailed] = useState(false)
  const launch = useRef(new Map<string, DOMRect>())
  const currentRoom = useRef(room); currentRoom.current = room

  const measure = () => {
    const s = scene.current
    if (s) setAnchors({ seats: snap.players.map((_, i) => s.seatAnchor(snap.players.length, i)), pile: s.pileAnchor(), draw: s.drawAnchor() })
  }
  const fly = async (card: Card, from: { x: number; y: number; width: number }, to: { x: number; y: number; width: number }) => {
    if (!flight.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = document.createElement('div'); el.className = 'sg-flight'; el.style.width = `${from.width}px`
    el.innerHTML = renderToStaticMarkup(<CardFace rank={card.rank} suit={card.suit} />)
    flight.current.append(el)
    const animation = el.animate([
      { transform: `translate(${from.x - from.width / 2}px, ${from.y - from.width * .7}px) scale(1)` },
      { transform: `translate(${to.x - from.width / 2}px, ${to.y - from.width * .7}px) scale(${to.width / from.width})` },
    ], { duration: 280, easing: 'ease-in-out', fill: 'both' })
    await animation.finished.catch(() => {}); el.remove()
  }
  const point = (p: Projected) => {
    const a = stage.current!.getBoundingClientRect(), b = root.current!.getBoundingClientRect()
    return { x: a.left - b.left + p.x, y: a.top - b.top + p.y, width: p.cardWidth }
  }
  const rectPoint = (r: DOMRect) => {
    const b = root.current!.getBoundingClientRect()
    return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2, width: r.width }
  }
  const hooks: SelfHooks = {
    play: async (cards, destination) => {
      if (!scene.current) return
      const to = point(destination ?? scene.current.pileAnchor())
      await Promise.all(cards.map(c => fly(c, launch.current.has(c.id) ? rectPoint(launch.current.get(c.id)!) : { ...to, y: to.y + 200, width: 90 }, to)))
    },
    receive: async (cards, source) => {
      await new Promise(requestAnimationFrame)
      if (scene.current && cards.length <= 4) {
        const from = point(source === 'draw' ? scene.current.drawAnchor() : scene.current.pileAnchor())
        await Promise.all(cards.map(c => {
          const el = root.current?.querySelector<HTMLElement>(`[data-card="${c.id}"]`)
          return el ? fly(c, from, rectPoint(el.getBoundingClientRect())) : Promise.resolve()
        }))
      }
      if (mounted.current) setHidden(old => new Set([...old].filter(id => !cards.some(c => c.id === id))))
    },
  }
  useEffect(() => {
    mounted.current = true
    try {
      const s = new SkitgubbeScene(stage.current!, { deal: () => audio.deal(), place: () => audio.place(), reveal: () => audio.reveal(), burn: () => audio.burn(), gather: () => audio.gather() })
      scene.current = s; s.setOnResize(measure); measure()
    } catch { setFailed(true) }
    return () => { mounted.current = false; scene.current?.dispose(); scene.current = null }
  }, [])
  useEffect(() => {
    if (!room.snapshot || room.revision <= seen.current) return
    const last = seen.current
    seen.current = room.revision
    const steps = room.transitions.filter(t => t.revision > last)
    const fresh = !previous.current && last < 0
    const resync = room.resync || !steps.length
    setBusy(true)
    queue.current = queue.current.then(async () => {
      if (!mounted.current) return
      if (resync) {
        const next = room.snapshot!
        setSnap(next)
        if (fresh && next.phase === 'swap') {
          setHidden(new Set(next.players[0]!.hand.map(c => c.id)))
          await scene.current?.animate(null, next, [], hooks)
        } else scene.current?.sync(next)
        previous.current = next
      } else for (const step of steps) {
        if (!mounted.current) return
        const prior = previous.current, next = step.snapshot
        const before = new Set(prior?.players[0]?.hand.map(c => c.id) ?? [])
        setHidden(new Set(next.players[0]!.hand.filter(c => !before.has(c.id)).map(c => c.id)))
        setSnap(next)
        const e = step.events.find(e => e.type === 'play' || e.type === 'pickup' || e.type === 'flip' || e.type === 'burn')
        if (e && 'player' in e) setMessage(`${next.players[e.player]!.name} ${e.type === 'play' ? 'played' : e.type === 'pickup' ? 'took the pile' : e.type === 'burn' ? 'burned the pile' : 'turned a card over'}.`)
        await scene.current?.animate(prior, next, step.events, hooks)
        previous.current = next
      }
      if (!mounted.current) return
      setHidden(new Set()); setSelected([]); setSwapPick(null)
      if (room.revision === seen.current) { setBusy(false); if (room.snapshot?.current === 0) audio.yourTurn() }
    }).catch(() => {
      if (mounted.current) { scene.current?.sync(currentRoom.current.snapshot!); setSnap(currentRoom.current.snapshot!); setHidden(new Set()); setBusy(false) }
    })
  }, [room])

  const me = snap.players[0]!
  const swapping = snap.phase === 'swap' && !me.ready
  const source = me.hand.length ? 'hand' : me.up.length ? 'up' : 'down'
  const yourTurn = enabled && !busy && !sending && snap.phase === 'playing' && snap.current === 0 && me.place === null
  const canSetup = enabled && !busy && !sending && swapping
  const rows: Array<{ key: 'hand' | 'up' | 'down'; cards: TableCard[]; label: string }> = [
    { key: 'hand', cards: [...me.hand].sort((a,b) => isKnown(a) && isKnown(b) ? RANK_VALUE[a.rank] - RANK_VALUE[b.rank] || a.suit.localeCompare(b.suit) : 0), label: `Hand · ${me.hand.length}` },
    { key: 'up', cards: me.up, label: `Face up · ${me.up.length}` },
    { key: 'down', cards: me.down, label: `Face down · ${me.down.length}` },
  ]
  const flat = rows.filter(r => swapping ? r.key !== 'down' : r.key === source).flatMap(r => r.cards)
  const extra = (handRows(me.hand.length, false, 696) - 1) * 72
  useLayoutEffect(measure, [extra, snap.players.length])
  const legal = new Set(room.legal)
  const send = async (a: Action) => {
    if (!enabled || busy || sending) return
    launch.current = new Map([...(root.current?.querySelectorAll<HTMLElement>('[data-card]') ?? [])].map(el => [el.dataset.card!, el.getBoundingClientRect()]))
    setSending(true); audio.unlock()
    try { await action(a); setSelected([]); setSwapPick(null) } catch { /* lobby reports transport/rejection */ }
    finally { if (mounted.current) setSending(false) }
  }
  const choose = (card: TableCard, all = false) => {
    if (!flat.some(c => c.id === card.id)) return
    if (canSetup) {
      if (swapPick === card.id) return setSwapPick(null)
      const hand = me.hand.some(c => c.id === card.id), priorHand = me.hand.some(c => c.id === swapPick)
      if (!swapPick || hand === priorHand) return setSwapPick(card.id)
      void send({ type: 'swap', hand: hand ? card.id : swapPick, up: hand ? swapPick : card.id }); return
    }
    if (!yourTurn) return
    if (source === 'down') { void send({ type: 'flip', card: card.id }); return }
    if (!isKnown(card) || !legal.has(card.id)) return
    setSelected(ids => {
      const same = flat.filter(c => isKnown(c) && c.rank === card.rank && legal.has(c.id)).map(c => c.id)
      if (all) return same.every(id => ids.includes(id)) ? [] : same
      if (ids.includes(card.id)) return ids.filter(id => id !== card.id)
      const prior = flat.find(c => c.id === ids[0])
      return prior && isKnown(prior) && prior.rank === card.rank ? [...ids, card.id] : [card.id]
    })
  }
  const focusCard = (at: number) => {
    const next = Math.max(0, Math.min(flat.length - 1, at))
    setFocus(next); root.current?.querySelector<HTMLElement>(`[data-index="${next}"]`)?.focus({ preventScroll: true })
  }
  useLayoutEffect(() => {
    if (busy || sending) return
    // A played DOM button disappears. Recover focus just as solo does, otherwise
    // the next arrow/Enter would go to the page instead of the player's hand.
    const active = document.activeElement
    if (!active || active === document.body || root.current?.contains(active)) {
      const card = root.current?.querySelector<HTMLElement>(`[data-index="${Math.min(focus, flat.length - 1)}"]`)
      ;(card ?? root.current?.querySelector<HTMLElement>('.sg-primary'))?.focus({ preventScroll: true })
    }
  }, [snap, busy, sending])
  const play = () => {
    if (!yourTurn) return
    if (source === 'down') { if (flat[focus]) void send({ type: 'flip', card: flat[focus]!.id }); return }
    const ids = selected.length ? selected : flat[focus] && legal.has(flat[focus]!.id) ? [flat[focus]!.id] : []
    if (ids.length) void send({ type: 'play', cards: ids })
  }
  const need = requirement(snap)
  return <div ref={root} className="sg-root" role="application" aria-label="Skitgubbe with friends" aria-busy={busy || sending} data-phase={snap.phase} data-turn={yourTurn ? 'you' : 'other'}
    onKeyDown={e => {
      if (!(e.target instanceof HTMLElement) || !e.target.dataset.card) return
      const index = Number(e.target.dataset.index)
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','Enter',' '].includes(e.key)) e.preventDefault()
      if (e.key === 'Home') focusCard(0)
      if (e.key === 'End') focusCard(flat.length - 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') focusCard(index + (e.key === 'ArrowLeft' ? -1 : 1))
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') focusCard(index + (e.key === 'ArrowUp' ? -1 : 1) * handColumns(flat.length, false, 696))
      if (e.key === ' ') choose(flat[index]!, e.shiftKey)
      if (e.key === 'Enter') swapping ? choose(flat[index]!) : play()
      if (e.key.toLowerCase() === 't' && yourTurn) void send({ type: 'pickup' })
      if (e.key.toLowerCase() === 'd' && yourTurn) void send({ type: 'chance' })
    }}>
    <style>{styles}</style>
    <header className="sg-header"><h1>Skitgubbe</h1><p className="sg-record">{me.name} · with friends</p>
      <button className="sg-ghost" onClick={() => { audio.setMuted(!muted); setMuted(!muted) }}>{muted ? 'Sound on' : 'Mute'}</button>
    </header>
    <div className="sg-table" style={{ height: 560 - extra }}>
      <div className="sg-scene" ref={stage} aria-hidden="true" />
      {failed && <div className="sg-scene-error">3D is unavailable. Use the cards and controls below.</div>}
      {anchors && snap.players.map((p, i) => i ? <div key={i} className={`sg-seat${snap.current === i ? ' is-active' : ''}`} style={{ left: anchors.seats[i]!.x, top: anchors.seats[i]!.y }}>
        <strong>{p.name}</strong><span>{p.place ? `Out #${p.place}` : `${p.hand.length} in hand · ${p.down.length} hidden`}</span>
      </div> : null)}
      {anchors && snap.phase === 'playing' && <div className="sg-need" style={{ left: anchors.pile.x, top: anchors.pile.y - anchors.pile.cardWidth }}><strong>{need.short}</strong><span>{need.detail}</span></div>}
      {anchors && <span className="sg-stack-count" style={{ left: anchors.draw.x, top: anchors.draw.y - anchors.draw.cardWidth }}>{snap.drawCount} to draw</span>}
      {snap.phase === 'over' && !busy && <div className="sg-result"><div className="sg-result-card" role="dialog" aria-label="Result">
        <h2>{snap.skitgubbe === 0 ? 'You’re the skitgubbe.' : 'You made it out.'}</h2>
        <ol>{[...snap.players].sort((a,b) => a.place! - b.place!).map(p => <li key={p.name}>{p.place}. {p.name}</li>)}</ol>
        {room.isHost ? <button className="sg-primary" disabled={!enabled || sending} onClick={() => void onAgain()}>Play again</button> : <p>Waiting for the host to deal again.</p>}
      </div></div>}
    </div>
    <div className={`sg-hand${yourTurn ? ' is-turn' : ''}`} style={{ height: 176 + extra }}>
      {rows.map(row => <div className={`sg-row sg-row-${row.key}${source === row.key && snap.phase === 'playing' ? ' is-source' : ''}`} key={row.key} role="listbox" aria-label={row.label} aria-multiselectable={!swapping}>
        <span className="sg-row-label">{row.label}{source === row.key && snap.phase === 'playing' && <span className="sg-playable-hint"> · Playing from here</span>}</span>
        {!row.cards.length && <span className="sg-batch-empty">Empty</span>}
        <HandFan cards={row.cards} width={row.key === 'hand' ? 696 : 216} cardSize={row.key === 'hand' ? 90 : 64} slots={row.key === 'up' ? me.upSlots : undefined} hidden={hidden} render={(card, i) => {
          const index = flat.findIndex(c => c.id === card.id)
          const playable = canSetup && row.key !== 'down' || yourTurn && row.key === source && (source === 'down' || legal.has(card.id))
          return <button key={card.id} type="button" role="option" aria-selected={selected.includes(card.id) || swapPick === card.id} aria-disabled={!playable} data-card={card.id} data-index={index}
            tabIndex={index === Math.min(focus, flat.length - 1) ? 0 : -1} onFocus={() => setFocus(index)}
            aria-label={isKnown(card) ? `${cardName(card)}${playable ? ', playable' : ''}` : `Face-down card ${i + 1}`}
            className={`sg-card${playable ? ' is-playable' : ''}${selected.includes(card.id) || swapPick === card.id ? ' is-selected' : ''}`}
            onClick={e => choose(card, e.shiftKey)} onDoubleClick={() => { if (yourTurn && legal.has(card.id)) void send({type:'play',cards: selected.includes(card.id) ? selected : [card.id]}) }}>
            {isKnown(card) ? <CardFace className="sg-card-art" rank={card.rank} suit={card.suit} /> : <><CardBack className="sg-card-art" /><span className="sg-back-number">{i + 1}</span></>}
          </button>
        }} />
      </div>)}
    </div>
    <div className="sg-decision"><div className="sg-decision-text" role="status">
      <strong>{room.paused ? 'Waiting for a player to reconnect' : busy ? 'Cards in motion' : swapping ? 'Set up your table' : snap.phase === 'swap' ? 'Waiting for everyone to be ready' : yourTurn ? `Your turn: ${need.short.toLowerCase()}` : me.place ? `You finished #${me.place}` : `Waiting for ${snap.players[snap.current]!.name}`}</strong>
      <span>{swapping ? 'Select a hand card and a face-up card. Matches stack; different ranks swap.' : message}</span>
    </div><div className="sg-actions">
      {swapping ? <button className="sg-primary" disabled={!canSetup} onClick={() => void send({type:'ready'})}>Ready to play</button> : snap.phase === 'playing' && me.place === null ? <>
        {room.canChance && <button className="sg-secondary" disabled={!yourTurn} onClick={() => void send({type:'chance'})}>Chance card</button>}
        {room.canPickUp && <button className="sg-secondary" disabled={!yourTurn} onClick={() => void send({type:'pickup'})}>Take the pile</button>}
        {room.canPass && <button className="sg-secondary" disabled={!yourTurn} onClick={() => void send({type:'pass'})}>Pass</button>}
        <button className="sg-primary" disabled={!yourTurn || source !== 'down' && !selected.length && !legal.has(flat[focus]?.id ?? '')} onClick={play}>{source === 'down' ? 'Turn a card over' : `Play${selected.length > 1 ? ` ${selected.length} cards` : ''}`}</button>
      </> : null}
    </div></div>
    <div className="sg-flights" ref={flight} aria-hidden="true" />
  </div>
}
