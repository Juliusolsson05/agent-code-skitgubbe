// Which card may go on which pile, under the house rules the player picked.
//
// Every "special card" behaviour is a setting. Rule sites disagree on almost all of
// them (is 2 a reset or just the lowest card? does a 7 force lower? may you finish on
// a 10?), and the owner asked for the rules to be configurable rather than for us to
// pick one family's version. The defaults are the owner's table.

import { RANK_VALUE, type Card, type Rank } from './cards'

export type Rules = {
  /** A 5 can go on anything and is see-through: the next card is judged against
   *  whatever lies under it. King, then 5, and the next player must still beat the king. */
  invisibleFive: boolean
  /** A 2 goes on anything; its player keeps the turn and plays any card on it.
   *  Off: 2 is ordinary and passes the turn. Finishing still takes precedence. */
  twoResets: boolean
  /** A 10 can go on anything and burns the pile. Off: 10 is an ordinary card. */
  tenBurns: boolean
  /** Four cards of the same rank on top of the pile burn it, whoever played them. */
  fourBurns: boolean
  /** After a burn, the player who burned plays again on the empty table. */
  burnPlaysAgain: boolean
  /** Before play, everyone may swap hand cards with their own face-up cards. */
  swapPhase: boolean
  /** Instead of playing from hand, gamble on the top card of the draw pile. */
  chanceCard: boolean
  /** Your last card may not be a 2, a 10 or an ace. */
  noSpecialFinish: boolean
  /** On a 7, the next card must be 7 or lower (wild cards still allowed). */
  sevenOrLower: boolean
}

export const DEFAULT_RULES: Readonly<Rules> = Object.freeze({
  invisibleFive: true,
  twoResets: true,
  tenBurns: true,
  fourBurns: true,
  burnPlaysAgain: true,
  swapPhase: true,
  chanceCard: true,
  noSpecialFinish: false,
  sevenOrLower: false,
})

export const RULE_KEYS = Object.keys(DEFAULT_RULES) as Array<keyof Rules>

/** Stored settings are an untrusted boundary: keep valid booleans, default the rest, so a
 *  rule added in a later version starts at its default instead of `undefined`. */
export function parseRules(value: unknown): Rules {
  const out: Rules = { ...DEFAULT_RULES }
  if (!value || typeof value !== 'object') return out
  const input = value as Record<string, unknown>
  for (const key of RULE_KEYS) if (typeof input[key] === 'boolean') out[key] = input[key] as boolean
  return out
}

/** Cards that may be played on any pile. */
export function isWild(rank: Rank, rules: Rules): boolean {
  return (rank === '2' && rules.twoResets) || (rank === '10' && rules.tenBurns) || (rank === '5' && rules.invisibleFive)
}

/** The card a new play is judged against. See-through 5s are skipped, however many are
 *  stacked, so a 5 on a 5 on a king still means "beat the king". An all-5 pile is as
 *  good as an empty one. */
export function effectiveTop(pile: readonly Card[], rules: Rules): Rank | null {
  for (let i = pile.length - 1; i >= 0; i--) {
    const rank = pile[i]!.rank
    if (rank === '5' && rules.invisibleFive) continue
    return rank
  }
  return null
}

export function canPlayOn(rank: Rank, pile: readonly Card[], rules: Rules): boolean {
  if (isWild(rank, rules)) return true
  const top = effectiveTop(pile, rules)
  if (top === null) return true
  if (top === '2' && rules.twoResets) return true
  if (top === '7' && rules.sevenOrLower) return RANK_VALUE[rank] <= 7
  return RANK_VALUE[rank] >= RANK_VALUE[top]
}

/** Why the pile burns after the last play, if it does. Checked on the raw pile: four
 *  5s are four of a kind even though each one is see-through. */
export function burnReason(pile: readonly Card[], rules: Rules): 'ten' | 'four' | null {
  const top = pile[pile.length - 1]
  if (!top) return null
  if (top.rank === '10' && rules.tenBurns) return 'ten'
  if (rules.fourBurns && pile.length >= 4 && pile.slice(-4).every(card => card.rank === top.rank)) return 'four'
  return null
}

/** Cards you may not go out on when `noSpecialFinish` is set. */
export const isFinishForbidden = (rank: Rank, rules: Rules): boolean =>
  rules.noSpecialFinish && (rank === '2' || rank === '10' || rank === 'A')
