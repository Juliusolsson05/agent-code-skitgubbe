import { randomBytes } from 'node:crypto'
import { newDeck, type Card } from '../src/game/engine/cards'
import { SkitgubbeGame, type GameEvent, type Snapshot } from '../src/game/engine/game'
import { DEFAULT_RULES, parseRules } from '../src/game/engine/rules'
import type { Action, RoomView, TableSnapshot } from '../src/lan/protocol'

export class RoomError extends Error {
  constructor(readonly status: number, message: string) { super(message) }
}
function fail(status: number, message: string): never { throw new RoomError(status, message) }
const key = () => randomBytes(24).toString('hex')
type Member = { name: string; token: string; nonce: string; seen: number }
type Entry = { revision: number; snapshot: Snapshot; events: GameEvent[] }
export class Room {
  readonly id = key()
  readonly code = randomBytes(4).toString('hex').toUpperCase()
  readonly members: Member[] = []
  revision = 0
  closed = false
  private game: SkitgubbeGame | null = null
  private rules = { ...DEFAULT_RULES }
  private aliases = new Map<string, string>()
  private realIds = new Map<string, string>()
  private history: Entry[] = []
  private requests = new Map<string, Set<string>>()
  constructor(name: string, nonce: string, private readonly now = Date.now) { this.join(name, nonce, true) }

  join(name: string, nonce: string, creating = false): string {
    if (this.closed) fail(410, 'This room has ended.')
    const prior = this.members.find(m => m.nonce === nonce)
    if (prior) { prior.seen = this.now(); return prior.token }
    if (this.game || this.members.length >= 4) fail(409, 'This table is full or already playing.')
    const clean = typeof name === 'string' ? name.normalize('NFC').trim().replace(/\s+/gu, ' ') : ''
    if (!clean || clean.length > 24 || /[\p{Cc}\p{Cf}]/u.test(clean)) fail(400, 'Use a name of 1–24 characters.')
    if (!/^[a-f0-9]{48}$/.test(nonce)) fail(400, 'Invalid join identity.')
    this.members.push({ name: clean, token: key(), nonce, seen: this.now() })
    if (!creating) this.revision++
    return this.members.at(-1)!.token
  }
  authenticate(token: string): number {
    const seat = this.members.findIndex(m => m.token === token)
    if (seat < 0) fail(401, 'Your seat could not be restored. Join the room again.')
    this.members[seat]!.seen = this.now()
    return seat
  }
  private connected(seat: number): boolean { return this.now() - this.members[seat]!.seen < 15000 }
  private stamp(events: GameEvent[]): void {
    this.revision++
    this.history.push({ revision: this.revision, snapshot: this.game!.getSnapshot(), events })
    if (this.history.length > 100) this.history.shift()
  }
  start(seat: number, revision: number, rules: unknown): void {
    if (seat !== 0) fail(403, 'Only the host can deal.')
    if (this.closed || revision !== this.revision) fail(409, 'The table changed. Try again.')
    if (this.game && this.game.getSnapshot().phase !== 'over') fail(409, 'Finish this game before dealing again.')
    if (this.members.length < 2 || this.members.some((_, i) => !this.connected(i))) fail(409, 'Wait for at least two connected players.')
    this.rules = parseRules(rules)
    this.game = new SkitgubbeGame({ players: this.members.length, names: this.members.map(m => m.name), rules: this.rules })
    // Rank-bearing engine ids never cross the wire. A per-deal random alias is
    // stable through hand/table/pile transitions, so revealing a back animates the
    // SAME card without leaking its identity before the public play.
    this.aliases = new Map(newDeck().map(c => [c.id, key()]))
    this.realIds = new Map([...this.aliases].map(([id, alias]) => [alias, id]))
    this.history = []
    this.stamp([])
  }
  act(seat: number, revision: number, requestId: string, action: Action, gameId?: number): void {
    if (!/^[a-f0-9]{48}$/.test(requestId)) fail(400, 'Invalid action identity.')
    const seen = this.requests.get(this.members[seat]!.token) ?? new Set<string>()
    if (seen.has(requestId)) return // lost HTTP acknowledgement must not play twice
    // Ready acknowledgements commute within one deal: two friends naturally
    // press Ready together. A global stale-revision rejection left one waiting
    // indefinitely. The deal id prevents an old request readying a new game.
    const readySameDeal = action?.type === 'ready' && gameId === this.game?.getSnapshot().gameId && this.game?.getSnapshot().phase === 'swap'
    if (this.closed || !this.game || revision !== this.revision && !readySameDeal) fail(409, 'The table changed. Choose your move again.')
    if (this.members.some((_, i) => !this.connected(i))) fail(409, 'Waiting for a player to reconnect.')
    const id = (alias: string) => this.realIds.get(alias) ?? ''
    const g = this.game
    let ok = false
    if (action?.type === 'swap') ok = g.swap(seat, id(action.hand), id(action.up))
    else if (action?.type === 'play' && Array.isArray(action.cards) && action.cards.length <= 4) ok = g.play(seat, action.cards.map(id))
    else if (action?.type === 'flip') ok = g.flip(seat, id(action.card))
    else if (action?.type === 'ready') ok = g.ready(seat)
    else if (action?.type === 'chance') ok = g.chance(seat)
    else if (action?.type === 'pickup') ok = g.pickUp(seat)
    else if (action?.type === 'pass') ok = g.pass(seat)
    if (!ok) fail(409, 'That move is not legal now.')
    seen.add(requestId)
    if (seen.size > 128) seen.delete(seen.values().next().value!)
    this.requests.set(this.members[seat]!.token, seen)
    this.stamp(g.takeEvents())
  }
  leave(seat: number): void {
    if (seat === 0) { this.closed = true; this.revision++; return }
    if (this.game) { this.members[seat]!.seen = -Infinity; return }
    this.members.splice(seat, 1)
    this.revision++
  }
  private card = (c: Card): Card => ({ ...c, id: this.aliases.get(c.id)! })
  private project(snapshot: Snapshot, seat: number): TableSnapshot {
    const n = snapshot.players.length
    const rotated = (i: number) => (i - seat + n) % n
    return {
      ...snapshot, current: rotated(snapshot.current),
      skitgubbe: snapshot.skitgubbe === null ? null : rotated(snapshot.skitgubbe),
      pile: snapshot.pile.map(this.card),
      players: Array.from({ length: n }, (_, at) => {
        const owner = (seat + at) % n, p = snapshot.players[owner]!
        const hidden = (c: Card) => ({ id: this.aliases.get(c.id)!, hidden: true as const })
        return { ...p, bot: false, hand: owner === seat ? p.hand.map(this.card) : p.hand.map(hidden),
          down: p.down.map(hidden), up: p.up.map(this.card),
          upSlots: Object.fromEntries(Object.entries(p.upSlots).map(([id, slot]) => [this.aliases.get(id)!, slot])) }
      }),
    }
  }
  private events(events: GameEvent[], seat: number): GameEvent[] {
    const n = this.members.length
    return events.map(e => {
      if (e.type === 'over') return { ...e, skitgubbe: (e.skitgubbe - seat + n) % n }
      const rotated = { ...e, player: (e.player - seat + n) % n }
      if ('card' in rotated) return { ...rotated, card: this.card(rotated.card) }
      if ('cards' in rotated) return { ...rotated, cards: rotated.cards.map(this.card) }
      return rotated
    })
  }
  view(seat: number, since = -1): RoomView {
    const g = this.game, snapshot = g?.getSnapshot() ?? null
    const first = this.history[0]?.revision ?? this.revision
    // Catching up through a bounded journal preserves every burn/flip. A very old
    // client snaps to the current table instead of replaying an hour of moves.
    const resync = since < first - 1 || since > this.revision
    return { roomId: this.id, revision: this.revision, code: this.code, isHost: seat === 0,
      closed: this.closed, paused: this.members.some((_, i) => !this.connected(i)),
      members: this.members.map((m, i) => ({ name: m.name, connected: this.connected(i), host: i === 0 })),
      rules: { ...this.rules }, snapshot: snapshot ? this.project(snapshot, seat) : null,
      transitions: resync ? [] : this.history.filter(e => e.revision > since).map(e => ({ revision: e.revision, snapshot: this.project(e.snapshot, seat), events: this.events(e.events, seat) })),
      resync, source: g?.source(seat) ?? null, legal: g?.legalCardIds(seat).map(id => this.aliases.get(id)!) ?? [],
      canChance: g?.canChance(seat) ?? false, canPickUp: g?.canPickUp(seat) ?? false, canPass: g?.canPass(seat) ?? false }
  }
}
