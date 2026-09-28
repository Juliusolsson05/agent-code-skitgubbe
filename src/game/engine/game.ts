// The whole game of Skitgubbe as a pure state machine.
//
// No DOM, no timers, no Math.random of its own. The view decides WHEN a bot moves and
// how long an animation lasts; the engine only decides WHAT is legal and what happens.
// That split is what lets every rule below be tested exactly, and it is the same
// discipline as the Mini Games engines this repo was modelled on.
//
// Actions never throw. They return false when illegal (wrong player, wrong phase, a
// card that is not yours), because the UI calls them straight from clicks and keys and
// a rejected click must be a no-op, not a crash.

import { newDeck, RANK_VALUE, shuffle, type Card } from './cards'
import { burnReason, canPlayOn, DEFAULT_RULES, isFinishForbidden, type Rules } from './rules'

export type Phase = 'swap' | 'playing' | 'over'
/** Where a player's next card must come from. Hand first; face-up only once the hand is
 *  empty (which, because hands refill, also means the draw pile is gone); face-down last. */
export type Source = 'hand' | 'up' | 'down'

export type Player = {
  name: string
  bot: boolean
  hand: Card[]
  up: Card[]
  /** Card id → original table position. Matching setup cards share a position; array
   *  indices cannot represent this because stacking adds cards without adding slots. */
  upSlots: Record<string, number>
  down: Card[]
  /** Swap phase only: this player has finished swapping. */
  ready: boolean
  /** 1 = first out. The skitgubbe gets the last place. null while still playing. */
  place: number | null
}

export type GameEvent =
  | { type: 'stack'; player: number; card: Card }
  | { type: 'swap'; player: number; faceUp: Card; toHand: Card[] }
  | { type: 'play'; player: number; cards: Card[]; source: Source }
  | { type: 'flip'; player: number; card: Card; ok: boolean }
  | { type: 'chance'; player: number; card: Card; ok: boolean }
  | { type: 'draw'; player: number; count: number }
  | { type: 'burn'; player: number; reason: 'ten' | 'four'; count: number }
  | { type: 'pickup'; player: number; count: number }
  | { type: 'pass'; player: number }
  | { type: 'finish'; player: number; place: number }
  | { type: 'over'; skitgubbe: number }

export type Snapshot = {
  /** Changes with every new deal, so the view can reset its own effects and timers. */
  gameId: number
  phase: Phase
  rules: Rules
  players: Player[]
  current: number
  /** Bottom first. */
  pile: Card[]
  drawCount: number
  burnedCount: number
  skitgubbe: number | null
}

export type GameOptions = {
  /** Total players including you (seat 0). */
  players?: number
  rules?: Rules
  random?: () => number
  names?: string[]
  /** Deal from this exact order instead of shuffling (tests and replays). Index 0 is dealt first. */
  deck?: Card[]
}

/**
 * Test and replay seeding: put exact cards in exact places mid-game. Card ids are
 * `${rank}${suit}` ("10H", "QS"). Any card of the deck not placed anywhere counts as
 * already burned, so the 52-card total still holds.
 */
export type SetupState = {
  players: Array<{ hand?: string[]; up?: string[]; down?: string[]; place?: number | null }>
  /** Bottom first. */
  pile?: string[]
  /** Next card drawn first. */
  draw?: string[]
  current?: number
}

export const HAND_SIZE = 3
export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 4
const DEFAULT_NAMES = ['You', 'Astrid', 'Nils', 'Greta']

let nextGameId = 1

export class SkitgubbeGame {
  private readonly rules: Rules
  private readonly gameId = nextGameId++
  private phase: Phase
  private players: Player[]
  private current = 0
  private pile: Card[] = []
  private draw: Card[]
  private burnedCount = 0
  private finished = 0
  private skitgubbe: number | null = null
  private events: GameEvent[] = []

  constructor(options: GameOptions = {}) {
    this.rules = { ...(options.rules ?? DEFAULT_RULES) }
    const count = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, Math.trunc(options.players ?? 3)))
    const names = options.names ?? DEFAULT_NAMES
    const deck = options.deck ? [...options.deck] : shuffle(newDeck(), options.random ?? Math.random)
    this.players = Array.from({ length: count }, (_, i) => ({
      name: names[i] ?? `Player ${i + 1}`, bot: i !== 0, hand: [], up: [], upSlots: {}, down: [], ready: false, place: null,
    }))
    // Dealt the way people deal at a table: a round of face-down cards, a round of
    // face-up cards on top, then a round of hand cards. With a fixed test deck this
    // makes "who gets which card" predictable from the deck order alone.
    for (const pile of ['down', 'up', 'hand'] as const)
      for (let round = 0; round < HAND_SIZE; round++)
        for (const player of this.players) player[pile].push(deck.shift()!)
    for (const player of this.players) player.up.forEach((card, i) => { player.upSlots[card.id] = i })
    // The draw pile is popped from the end, so reverse: the next card dealt from the
    // fixed deck order is the next one drawn.
    this.draw = deck.reverse()
    this.phase = 'swap'
    if (!this.rules.swapPhase) this.startPlay()
  }

  /** Replace the table with `state` and start playing from it (see SetupState). The same
   *  shape as Blockfall's setup(): it exists so rules can be tested from the exact
   *  position they are about, instead of by replaying a whole game to get there. */
  setup(state: SetupState): void {
    const deck = new Map(newDeck().map(card => [card.id, card]))
    const take = (ids: string[] = []) => ids.map(id => {
      const card = deck.get(id)
      if (!card) throw new Error(`setup: unknown or duplicate card ${id}`)
      deck.delete(id)
      return card
    })
    if (state.players.length !== this.players.length) throw new Error('setup: player count must match the game')
    state.players.forEach((seat, i) => {
      const player = this.players[i]!
      player.hand = take(seat.hand)
      player.up = take(seat.up)
      player.upSlots = Object.fromEntries(player.up.map((card, i) => [card.id, i]))
      player.down = take(seat.down)
      player.place = seat.place ?? null
      player.ready = true
    })
    this.pile = take(state.pile)
    this.draw = take(state.draw).reverse()
    this.burnedCount = deck.size
    this.finished = this.players.filter(p => p.place !== null).length
    this.phase = 'playing'
    this.current = state.current ?? 0
    this.skitgubbe = null
    this.events = []
  }

  // --- queries -------------------------------------------------------------------

  getSnapshot(): Snapshot {
    return {
      gameId: this.gameId,
      phase: this.phase,
      rules: { ...this.rules },
      players: this.players.map(p => ({ ...p, hand: [...p.hand], up: [...p.up], upSlots: { ...p.upSlots }, down: [...p.down] })),
      current: this.current,
      pile: [...this.pile],
      drawCount: this.draw.length,
      burnedCount: this.burnedCount,
      skitgubbe: this.skitgubbe,
    }
  }

  /** Everything that happened since the last call, for sound, animation and callouts. */
  takeEvents(): GameEvent[] {
    const out = this.events
    this.events = []
    return out
  }

  source(p: number): Source | null {
    const player = this.players[p]
    if (!player || player.place !== null) return null
    if (player.hand.length) return 'hand'
    if (player.up.length) return 'up'
    if (player.down.length) return 'down'
    return null
  }

  /** Cards this player may put down right now, each judged as a single card. Face-down
   *  cards are never "legal" in advance: they are played blind with flip(), which is the
   *  whole point of them. Judging singly matters for "no finishing on 2/10/A": holding
   *  A A with nothing else, playing ONE ace is fine even though playing both is not. */
  legalCardIds(p: number): string[] {
    if (!this.isTurn(p)) return []
    const source = this.source(p)
    if (source !== 'hand' && source !== 'up') return []
    const cards = this.players[p]![source]
    return cards
      .filter(card => canPlayOn(card.rank, this.pile, this.rules) && !this.forbiddenFinish(p, source, 1, card))
      .map(card => card.id)
  }

  canChance(p: number): boolean {
    return this.isTurn(p) && this.rules.chanceCard && this.draw.length > 0 && this.source(p) === 'hand'
  }

  canPickUp(p: number): boolean {
    return this.isTurn(p) && this.pile.length > 0
  }

  /**
   * The one dead end the rules can create: with "no finishing on 2/10/A" a player whose
   * only remaining cards are forbidden finishers cannot play on an EMPTY pile, and there
   * is nothing to pick up. Real tables just skip that player until the pile has cards.
   */
  canPass(p: number): boolean {
    if (!this.isTurn(p) || this.pile.length > 0) return false
    const source = this.source(p)
    return (source === 'hand' || source === 'up') && this.legalCardIds(p).length === 0 && !this.canChance(p)
  }

  // --- swap phase -------------------------------------------------------------------

  swap(p: number, handId: string, upId: string): boolean {
    const player = this.players[p]
    if (this.phase !== 'swap' || !player || player.ready) return false
    const h = player.hand.findIndex(c => c.id === handId)
    const u = player.up.findIndex(c => c.id === upId)
    if (h < 0 || u < 0) return false
    const card = player.hand[h]!
    const target = player.up[u]!
    const slot = player.upSlots[target.id]!
    if (card.rank === target.rank) {
      // The owner plays matching hand/table cards as one face-up stack during setup.
      // Refill only the hand vacancy, using the real draw pile; no card is created and
      // an exhausted deck simply leaves the shorter hand. The UI normalises either
      // click order into these hand/table ids before calling this action.
      player.hand.splice(h, 1)
      player.up.push(card)
      player.upSlots[card.id] = slot
      this.events.push({ type: 'stack', player: p, card })
      this.refill(p)
    } else {
      // A stacked position remains one rank. A normal swap exchanges its whole group
      // with the selected hand card, otherwise swapping just its top card mixes ranks.
      const group = player.up.filter(c => player.upSlots[c.id] === slot)
      player.hand.splice(h, 1, ...group)
      player.up = player.up.filter(c => player.upSlots[c.id] !== slot)
      for (const c of group) delete player.upSlots[c.id]
      player.up.splice(Math.min(u, player.up.length), 0, card)
      player.upSlots[card.id] = slot
      // Setup swaps are public at a real table: everyone sees the card laid down and
      // knows the replaced group went into that hand. Perfect-human bots track exactly
      // this, so the engine announces it like any other public action.
      this.events.push({ type: 'swap', player: p, faceUp: card, toHand: group })
    }
    return true
  }

  ready(p: number): boolean {
    const player = this.players[p]
    if (this.phase !== 'swap' || !player || player.ready) return false
    player.ready = true
    if (this.players.every(q => q.ready)) this.startPlay()
    return true
  }

  // --- turns ------------------------------------------------------------------------

  /** Whether play(p, cardIds) would be accepted, without changing anything. Bots and the
   *  UI use it for multi-card plays, where each card can be legal alone while the set is
   *  not (two aces as your last cards under "no finishing on 2/10/A"). */
  canPlay(p: number, cardIds: readonly string[]): boolean {
    return this.validatePlay(p, cardIds) !== null
  }

  play(p: number, cardIds: readonly string[]): boolean {
    const valid = this.validatePlay(p, cardIds)
    if (!valid) return false
    const { source, played } = valid
    this.players[p]![source] = this.players[p]![source].filter(c => !cardIds.includes(c.id))
    if (source === 'up') for (const card of played) delete this.players[p]!.upSlots[card.id]
    this.pile.push(...played)
    this.events.push({ type: 'play', player: p, cards: played, source })
    if (source === 'hand') this.refill(p)
    this.afterPlay(p)
    return true
  }

  private validatePlay(p: number, cardIds: readonly string[]): { source: 'hand' | 'up'; played: Card[] } | null {
    if (!this.isTurn(p) || cardIds.length === 0) return null
    const source = this.source(p)
    if (source !== 'hand' && source !== 'up') return null
    const from = this.players[p]![source]
    const cards = cardIds.map(id => from.find(c => c.id === id))
    if (cards.some(c => !c) || new Set(cardIds).size !== cardIds.length) return null
    const played = cards as Card[]
    const rank = played[0]!.rank
    // Several cards go down together only as a set of one rank; that is what makes
    // "four of a kind burns" reachable in a single turn.
    if (played.some(c => c.rank !== rank)) return null
    if (!canPlayOn(rank, this.pile, this.rules)) return null
    if (this.forbiddenFinish(p, source, played.length, played[0]!)) return null
    return { source, played }
  }

  /** Play a face-down card blind. A card that does not fit is taken up with the pile. */
  flip(p: number, downId: string): boolean {
    if (!this.isTurn(p) || this.source(p) !== 'down') return false
    const player = this.players[p]!
    const card = player.down.find(c => c.id === downId)
    if (!card) return false
    player.down = player.down.filter(c => c.id !== downId)
    const ok = canPlayOn(card.rank, this.pile, this.rules) && !(player.down.length === 0 && isFinishForbidden(card.rank, this.rules))
    this.events.push({ type: 'flip', player: p, card, ok })
    if (ok) {
      this.pile.push(card)
      this.afterPlay(p)
    } else {
      this.takePile(p, [card])
    }
    return true
  }

  /** Gamble on the top of the draw pile. A miss costs the pile plus that card. */
  chance(p: number): boolean {
    if (!this.canChance(p)) return false
    const card = this.draw.pop()!
    // Chance happens from the hand while the draw pile lasts, so it can never be the
    // player's last card: the finishing restriction cannot apply here.
    const ok = canPlayOn(card.rank, this.pile, this.rules)
    this.events.push({ type: 'chance', player: p, card, ok })
    if (ok) {
      this.pile.push(card)
      this.refill(p)
      this.afterPlay(p)
    } else {
      this.takePile(p, [card])
    }
    return true
  }

  pickUp(p: number): boolean {
    if (!this.canPickUp(p)) return false
    this.takePile(p, [])
    return true
  }

  pass(p: number): boolean {
    if (!this.canPass(p)) return false
    this.events.push({ type: 'pass', player: p })
    this.advance()
    return true
  }

  // --- internals --------------------------------------------------------------------

  private isTurn(p: number): boolean {
    return this.phase === 'playing' && this.current === p && this.players[p]?.place === null
  }

  /** Would putting `count` cards like `card` down empty this player's cards entirely? */
  private forbiddenFinish(p: number, source: Source, count: number, card: Card): boolean {
    if (!isFinishForbidden(card.rank, this.rules)) return false
    const player = this.players[p]!
    // From the hand, a draw pile with cards refills you: that play cannot be your last.
    if (source === 'hand' && this.draw.length > 0) return false
    const remaining = player.hand.length + player.up.length + player.down.length - count
    return remaining === 0
  }

  private refill(p: number): void {
    const hand = this.players[p]!.hand
    let drawn = 0
    while (hand.length < HAND_SIZE && this.draw.length) {
      hand.push(this.draw.pop()!)
      drawn++
    }
    if (drawn) this.events.push({ type: 'draw', player: p, count: drawn })
  }

  private takePile(p: number, extra: Card[]): void {
    const taken = [...this.pile, ...extra]
    this.players[p]!.hand.push(...taken)
    this.pile = []
    this.events.push({ type: 'pickup', player: p, count: taken.length })
    // The picker's turn is over; the next player starts a fresh pile.
    this.advance()
  }

  private afterPlay(p: number): void {
    // Capture the played rank before a possible four-of-a-kind burn empties the pile.
    // A reset 2 gives its player another play, independently of the burn setting.
    const resetTwo = this.rules.twoResets && this.pile.at(-1)?.rank === '2'
    const reason = burnReason(this.pile, this.rules)
    if (reason) {
      this.events.push({ type: 'burn', player: p, reason, count: this.pile.length })
      this.burnedCount += this.pile.length
      this.pile = []
    }
    const player = this.players[p]!
    if (!player.hand.length && !player.up.length && !player.down.length) {
      player.place = ++this.finished
      this.events.push({ type: 'finish', player: p, place: player.place })
      const left = this.players.filter(q => q.place === null)
      if (left.length <= 1) {
        this.phase = 'over'
        const loser = this.players.findIndex(q => q.place === null)
        if (loser >= 0) {
          this.players[loser]!.place = ++this.finished
          this.skitgubbe = loser
          this.events.push({ type: 'over', skitgubbe: loser })
        }
        return
      }
      this.advance()
      return
    }
    if (resetTwo || (reason && this.rules.burnPlaysAgain)) return
    this.advance()
  }

  private advance(): void {
    for (let step = 1; step <= this.players.length; step++) {
      const next = (this.current + step) % this.players.length
      if (this.players[next]!.place === null) {
        this.current = next
        return
      }
    }
  }

  private startPlay(): void {
    this.phase = 'playing'
    for (const player of this.players) player.ready = true
    this.current = this.starter()
  }

  /** The owner starts with the lowest hand card EXCEPT 2. Compute after everyone is
   *  ready: swaps, stacks and replacement draws can change who has the low card.
   *  Only 2 is excluded from this comparison; do not exclude every wild rank. Ties
   *  (or the degenerate all-2 case) go to the earliest seat, counting from you. */
  private starter(): number {
    let best = 0
    let bestValue = Infinity
    this.players.forEach((player, i) => {
      for (const card of player.hand) {
        if (card.rank === '2') continue
        if (RANK_VALUE[card.rank] < bestValue) {
          bestValue = RANK_VALUE[card.rank]
          best = i
        }
      }
    })
    return best
  }
}
