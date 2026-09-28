// The deck and its vocabulary.
//
// WHY the engine owns Rank/Suit (and the SVG art re-exports them) rather than the
// other way round: the rules must be testable in plain Node without pulling React or
// JSX into the test bundle. The card art is copied from Mini Games and only needs the
// same string unions, so it imports them from here.

export type Suit = 'H' | 'D' | 'C' | 'S'
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

/** A card is identified by rank+suit. One deck means ids are unique, and a stable id is
 *  what lets the 3D table follow the SAME card from the draw pile to a hand to the pile
 *  to the burn tray, animating each move instead of re-creating meshes. */
export type Card = { id: string; rank: Rank; suit: Suit }

export const RANKS: readonly Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
export const SUITS: readonly Suit[] = ['S', 'H', 'D', 'C']

/** Ordinary strength. Aces are high in every Skitgubbe variant we found; 2 and 10 only
 *  become special through the rules, so here they keep their face value. */
export const RANK_VALUE: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, J: 11, Q: 12, K: 13, A: 14,
}

const SUIT_GLYPH: Record<Suit, string> = { S: '♠', H: '♥', D: '♦', C: '♣' }
const SUIT_NAME: Record<Suit, string> = { S: 'spades', H: 'hearts', D: 'diamonds', C: 'clubs' }
const RANK_NAME: Record<Rank, string> = {
  A: 'ace', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10', J: 'jack', Q: 'queen', K: 'king',
}

export const cardLabel = (card: Card): string => `${card.rank}${SUIT_GLYPH[card.suit]}`
export const cardName = (card: Card): string => `${RANK_NAME[card.rank]} of ${SUIT_NAME[card.suit]}`
export const isRed = (card: Card): boolean => card.suit === 'H' || card.suit === 'D'

export function newDeck(): Card[] {
  const deck: Card[] = []
  for (const suit of SUITS) for (const rank of RANKS) deck.push({ id: `${rank}${suit}`, rank, suit })
  return deck
}

/** Fisher–Yates with injected randomness, so a seeded test deals the same game every run. */
export function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    const swap = out[i]!
    out[i] = out[j]!
    out[j] = swap
  }
  return out
}
