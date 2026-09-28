// The computer players.
//
// A human-style strategy: finish if possible, keep a visible opponent from going out,
// shed awkward low sets, and preserve escape cards until their extra turn is useful.
// No sampling and no access to opponents' hidden ranks. The small finish planner only
// follows OUR known cards while 2s/burns keep the turn; it cannot predict a blind flip.

import { RANK_VALUE, type Card, type Rank } from './engine/cards'
import type { SkitgubbeGame, Snapshot } from './engine/game'
import { burnReason, canPlayOn, isFinishForbidden, type Rules } from './engine/rules'

export type Move =
  | { type: 'play'; ids: string[] }
  | { type: 'flip'; id: string }
  | { type: 'chance' }
  | { type: 'pickup' }
  | { type: 'pass' }

/** How valuable a card is to KEEP. Wild cards get you out of trouble later, so they are
 *  the ones to save and the ones to show face up (face-up cards are guaranteed to be
 *  yours; face-down ones are luck). Order among wilds: a 10 clears everything, a 2
 *  resets, a 5 only postpones. */
function keepValue(rank: Rank, rules: Rules): number {
  if (rank === '10' && rules.tenBurns) return 30
  if (rank === '2' && rules.twoResets) return 29
  if (rank === '5' && rules.invisibleFive) return 20
  return RANK_VALUE[rank]
}

/** Put the three best cards of hand + face-up on the table face up. */
export function chooseSwaps(game: SkitgubbeGame, p: number): Array<[handId: string, upId: string]> {
  const snap = game.getSnapshot()
  const self = snap.players[p]!
  const rules = snap.rules
  const hand = [...self.hand]
  const up = [...self.up]
  const swaps: Array<[string, string]> = []
  for (;;) {
    const bestHand = [...hand].sort((a, b) => keepValue(b.rank, rules) - keepValue(a.rank, rules))[0]
    const worstUp = [...up].sort((a, b) => keepValue(a.rank, rules) - keepValue(b.rank, rules))[0]
    if (!bestHand || !worstUp || keepValue(bestHand.rank, rules) <= keepValue(worstUp.rank, rules)) break
    swaps.push([bestHand.id, worstUp.id])
    hand[hand.indexOf(bestHand)] = worstUp
    up[up.indexOf(worstUp)] = bestHand
  }
  return swaps
}

/** Arrange a bot's table before it becomes ready. First keep strong cards face up,
 *  then add matching hand cards to those stacks. Each successful match moves a real
 *  card out of the hand, so even repeated matching replacement draws terminate. */
export function prepareBot(game: SkitgubbeGame, p: number): void {
  for (const [h, u] of chooseSwaps(game, p)) game.swap(p, h, u)
  for (;;) {
    const self = game.getSnapshot().players[p]!
    const card = self.hand.find(c => self.up.some(u => u.rank === c.rank))
    const target = card && self.up.find(u => u.rank === card.rank)
    if (!card || !target || !game.swap(p, card.id, target.id)) break
  }
  game.ready(p)
}

// A human notices when the same exchange has already failed. Pure rank scoring has
// no such memory and replayed an eleven-move cycle in seed 2. Record successful bot
// actions, not queries, so inspecting the next move twice cannot change the decision.
// Weak ownership releases history when a deal is discarded; cap distinct positions so
// a very long game cannot grow this ledger indefinitely. Keys contain PUBLIC counts,
// public face-up/pile ranks and this player's own hand, never other hidden identities.
const history = new WeakMap<SkitgubbeGame, Map<string, Map<string, number>>>()
function positionKey(s: Snapshot, p: number): string {
  return JSON.stringify([p, s.drawCount, s.burnedCount, s.pile.map(c => c.rank),
    s.players.map((q, i) => [q.place, i === p ? q.hand.map(c => c.rank).sort() : q.hand.length,
      q.up.map(c => c.rank).sort(), q.down.length])])
}
const moveKey = (move: Move, s: Snapshot, p: number): string => move.type === 'play'
  ? `play:${move.ids.length}:${[...s.players[p]!.hand, ...s.players[p]!.up].find(c => c.id === move.ids[0])!.rank}`
  : move.type

/** Look for a finish on THIS turn, using only known cards and the current house rules.
 *  Each recursion sheds at least one card. Restrict the small endgame search to twelve
 *  visible cards; a large pickup uses the ordinary policy rather than freezing the UI.
 *  Hands must empty before face-up cards. Face-down cards are never inspected here. */
function finishPlan(hand: Card[], up: Card[], pile: Card[], rules: Rules): string[] | null {
  const cards = hand.length ? hand : up
  const groups = new Map<Rank, Card[]>()
  for (const card of cards) groups.set(card.rank, [...(groups.get(card.rank) ?? []), card])
  for (const [rank, group] of groups) {
    if (!canPlayOn(rank, pile, rules)) continue
    // All copies first, but keep a copy when the finishing restriction requires it.
    for (let n = group.length; n > 0; n--) {
      const played = group.slice(0, n)
      const ids = played.map(c => c.id)
      const rest = cards.filter(c => !ids.includes(c.id))
      const h = hand.length ? rest : []
      const u = hand.length ? up : rest
      if (!h.length && !u.length) {
        if (!isFinishForbidden(rank, rules)) return ids
        continue
      }
      const nextPile = [...pile, ...played]
      const burns = burnReason(nextPile, rules)
      const again = (rank === '2' && rules.twoResets) || (burns && rules.burnPlaysAgain)
      if (again && finishPlan(h, u, burns ? [] : nextPile, rules)) return ids
    }
  }
  return null
}

export function chooseMove(game: SkitgubbeGame, p: number): Move {
  const snap = game.getSnapshot()
  const self = snap.players[p]!
  const rules = snap.rules
  const source = game.source(p)
  if (source === 'down') return { type: 'flip', id: self.down[0]!.id }

  if (!snap.drawCount && !self.down.length && self.hand.length + self.up.length <= 12) {
    const finish = finishPlan(self.hand, self.up, snap.pile, rules)
    if (finish && game.canPlay(p, finish)) return { type: 'play', ids: finish }
  }

  const cards = source === 'hand' ? self.hand : source === 'up' ? self.up : []
  const groups = new Map<Rank, Card[]>()
  for (const card of cards) groups.set(card.rank, [...(groups.get(card.rank) ?? []), card])
  // Counts and face-up cards are public. Avoid feeding an opponent's visible final
  // card, but never infer a rank from the id of a hidden hand/down card.
  let next = (p + 1) % snap.players.length
  while (snap.players[next]!.place !== null && next !== p) next = (next + 1) % snap.players.length
  const opponent = snap.players[next]!
  let best: { ids: string[]; score: number } | null = null
  for (const [rank, group] of groups) {
    for (let n = group.length; n > 0; n--) {
      const played = group.slice(0, n)
      const ids = played.map(c => c.id)
      if (!game.canPlay(p, ids)) continue
      const pile = [...snap.pile, ...played]
      const burns = burnReason(pile, rules)
      const again = (rank === '2' && rules.twoResets) || !!(burns && rules.burnPlaysAgain)
      // Two low cards are usually better to shed than one high card. Wilds have an
      // extra holding value because they remain playable if the next pile is an ace.
      // Low cards are liabilities: favour removing them before cashing a large high
      // set. Weighting set size above rank made seed 2 repeatedly trade its kings
      // and aces, then pick them back up with a stranded 6. Sets still break ties.
      let score = n * 5 - keepValue(rank, rules) * 2
      if (burns) score += Math.min(18, snap.pile.length * 2)
      if (again) score += 14
      if (!again && !opponent.hand.length && opponent.up.length) {
        const answers = opponent.up.filter(c => canPlayOn(c.rank, burns ? [] : pile, rules))
        if (!answers.length) score += 24 // make the next player pick up
        if (!opponent.down.length && answers.length === opponent.up.length &&
            answers.every(c => c.rank === answers[0]!.rank) && !isFinishForbidden(answers[0]!.rank, rules)) score -= 60
      } else if (!again && opponent.hand.length === 1 && !opponent.up.length && !opponent.down.length) {
        // Its identity is unknown: a high ordinary card restricts possible replies.
        // Apply the reversed order for the optional seven rule as well.
        const possibleReplies = Object.keys(RANK_VALUE).filter(r => canPlayOn(r as Rank, burns ? [] : pile, rules)).length
        score += (13 - possibleReplies) * 2
      }
      const repeats = history.get(game)?.get(positionKey(snap, p))?.get(moveKey({ type: 'play', ids }, snap, p)) ?? 0
      score -= repeats * 60
      if (!best || score > best.score) best = { ids, score }
    }
  }
  if (best) return { type: 'play', ids: best.ids }
  // A chance can avoid a pickup, but it can also add a card. This is a simple gamble
  // when stuck, not the old claim that chance is mathematically never worse.
  if (game.canChance(p)) return { type: 'chance' }
  if (game.canPickUp(p)) return { type: 'pickup' }
  return { type: 'pass' }
}

/** Apply a move to the game. Returns false only if the move was illegal, which the
 *  tests treat as a bot bug. */
export function applyMove(game: SkitgubbeGame, p: number, move: Move): boolean {
  const before = game.getSnapshot()
  let accepted: boolean
  switch (move.type) {
    case 'play': accepted = game.play(p, move.ids); break
    case 'flip': accepted = game.flip(p, move.id); break
    case 'chance': accepted = game.chance(p); break
    case 'pickup': accepted = game.pickUp(p); break
    case 'pass': accepted = game.pass(p); break
  }
  if (accepted) {
    const ledger = history.get(game) ?? new Map<string, Map<string, number>>()
    const key = positionKey(before, p)
    const moves = ledger.get(key) ?? new Map<string, number>()
    const chosen = moveKey(move, before, p)
    moves.set(chosen, (moves.get(chosen) ?? 0) + 1)
    ledger.set(key, moves)
    if (ledger.size > 256) ledger.delete(ledger.keys().next().value!)
    history.set(game, ledger)
  }
  return accepted
}
