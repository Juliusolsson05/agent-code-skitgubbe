// The computer players.
//
// One strategy, deliberately plain: a friendly bot that plays like a sensible person
// at a family table, not a solver. It reads ONLY what that person could see: its own
// hand and table cards, the pile, and the draw pile's size. It never peeks at its
// face-down cards or anyone's hand (the engine snapshot contains them, so this is a
// discipline of this file, and the tests guard it by construction: every decision
// below is derived from `self`, the pile and counts).

import { RANK_VALUE, type Card, type Rank } from './engine/cards'
import type { SkitgubbeGame } from './engine/game'
import { isWild, type Rules } from './engine/rules'

export type Move =
  | { type: 'play'; ids: string[] }
  | { type: 'flip'; id: string }
  | { type: 'chance' }
  | { type: 'pickup' }
  | { type: 'pass' }

/** A 10 is only worth spending to burn a pile this big; below it, keep the 10. */
const BURN_WORTHY_PILE = 6

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

export function chooseMove(game: SkitgubbeGame, p: number): Move {
  const snap = game.getSnapshot()
  const self = snap.players[p]!
  const rules = snap.rules
  const source = game.source(p)

  if (source === 'down') {
    // Blind is blind: any face-down card is as good as another.
    return { type: 'flip', id: self.down[0]!.id }
  }

  const cards = source === 'hand' ? self.hand : source === 'up' ? self.up : []
  const legal = new Set(game.legalCardIds(p))
  const byRank = new Map<Rank, Card[]>()
  for (const card of cards) {
    if (!legal.has(card.id)) continue
    byRank.set(card.rank, [...(byRank.get(card.rank) ?? []), card])
  }

  if (byRank.size) {
    const ranks = [...byRank.keys()]
    // A big pile is exactly what a 10 is for: take it off the table before the pile
    // becomes somebody's (possibly our own) problem.
    if (rules.tenBurns && byRank.has('10') && snap.pile.length >= BURN_WORTHY_PILE) {
      return { type: 'play', ids: largestPlayable(game, p, byRank.get('10')!) }
    }
    const ordinary = ranks.filter(rank => !isWild(rank, rules))
    const pickFrom = ordinary.length ? ordinary : ranks
    // Shed the cheapest card that fits, ALL copies of it: getting rid of low cards is
    // how you win, and playing a pair together is never worse than splitting it.
    const rank = pickFrom.sort((a, b) => keepValue(a, rules) - keepValue(b, rules))[0]!
    return { type: 'play', ids: largestPlayable(game, p, byRank.get(rank)!) }
  }

  // Nothing fits. A chance card is never worse than picking up: a miss costs the same
  // pile plus one card, and a hit costs nothing.
  if (game.canChance(p)) return { type: 'chance' }
  if (game.canPickUp(p)) return { type: 'pickup' }
  return { type: 'pass' }
}

/** All copies if that is a legal play, otherwise one fewer at a time. Every single card
 *  here is legal on its own, so this always ends with at least one card; the set can
 *  still be refused as a whole when it would be the player's last cards and the rules
 *  forbid finishing on that rank (a bot playing its last two 2s together). */
function largestPlayable(game: SkitgubbeGame, p: number, cards: Card[]): string[] {
  const ids = cards.map(c => c.id)
  while (ids.length > 1 && !game.canPlay(p, ids)) ids.pop()
  return ids
}

/** Apply a move to the game. Returns false only if the move was illegal, which the
 *  tests treat as a bot bug. */
export function applyMove(game: SkitgubbeGame, p: number, move: Move): boolean {
  switch (move.type) {
    case 'play': return game.play(p, move.ids)
    case 'flip': return game.flip(p, move.id)
    case 'chance': return game.chance(p)
    case 'pickup': return game.pickUp(p)
    case 'pass': return game.pass(p)
  }
}
