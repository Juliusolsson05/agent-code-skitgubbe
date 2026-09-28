import type { Card } from '../game/engine/cards'
import type { GameEvent, Player, Snapshot, Source } from '../game/engine/game'
import type { Rules } from '../game/engine/rules'

/** A back has an opaque identity, never an invented rank. Even the owner cannot
 * know a face-down card. This type is the renderer boundary, not engine input. */
export type HiddenCard = { id: string; hidden: true }
export type TableCard = Card | HiddenCard
export const isKnown = (card: TableCard): card is Card => 'rank' in card
export type TablePlayer = Omit<Player, 'hand' | 'down'> & { hand: TableCard[]; down: TableCard[] }
export type TableSnapshot = Omit<Snapshot, 'players'> & { players: TablePlayer[] }
export type Action =
  | { type: 'swap'; hand: string; up: string }
  | { type: 'play'; cards: string[] }
  | { type: 'flip'; card: string }
  | { type: 'ready' | 'chance' | 'pickup' | 'pass' }
export type Transition = { revision: number; snapshot: TableSnapshot; events: GameEvent[] }
export type RoomView = {
  roomId: string
  revision: number
  code: string
  isHost: boolean
  closed: boolean
  paused: boolean
  members: Array<{ name: string; connected: boolean; host: boolean }>
  rules: Rules
  snapshot: TableSnapshot | null
  transitions: Transition[]
  resync: boolean
  source: Source | null
  legal: string[]
  canChance: boolean
  canPickUp: boolean
  canPass: boolean
}
