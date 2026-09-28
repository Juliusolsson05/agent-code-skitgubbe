import * as THREE from 'three'

import type { Card } from '../engine/cards'
import type { TableSnapshot as Snapshot } from '../../lan/protocol'
import {
  CARD_LIFT,
  CARD_STACK_STEP,
  CT,
  DRAW_POS,
  HAND_FAN_BOT,
  HAND_SPAN_BOT,
  PILE_POS,
  PILE_SCALE,
  SEAT_HAND_OFFSET,
  SEAT_TABLE_DEPTH_BOTTOM,
  SEAT_TABLE_DEPTH_TOP,
  SEAT_TABLE_WIDTH,
  SLOT_GAP,
  SLOT_GAP_SIDE,
  UP_NUDGE,
} from './world'

// Where every card on the TABLE rests, as a pure function of the snapshot.
//
// The scene no longer tweens straight to this layout (that was v1's mistake: a 10 that
// burned the pile flew from the hand directly to the burn tray without ever landing).
// It plays each action as a sequence, and uses these targets as the resting positions
// once the action is over. Your own hand is NOT here: it lives in the DOM rail and
// cards fly between the rail and the table as overlays.

export type CardTarget = {
  position: THREE.Vector3
  yaw: number
  faceDown: boolean
  scale: number
  /** Deal order index (only meaningful for the opening deal). */
  order: number
}

export type Seat = {
  /** Unit vector from the table centre toward this player's edge. */
  out: THREE.Vector3
  /** Unit vector along the edge, to the player's right. */
  right: THREE.Vector3
  /** Card yaw so a HELD card's bottom edge faces that player. */
  yaw: number
  depth: number
  gap: number
  side: boolean
}

const bottom: Seat = { out: new THREE.Vector3(0, 0, 1), right: new THREE.Vector3(1, 0, 0), yaw: 0, depth: SEAT_TABLE_DEPTH_BOTTOM, gap: SLOT_GAP, side: false }
const top: Seat = { out: new THREE.Vector3(0, 0, -1), right: new THREE.Vector3(-1, 0, 0), yaw: Math.PI, depth: SEAT_TABLE_DEPTH_TOP, gap: SLOT_GAP, side: false }
const left: Seat = { out: new THREE.Vector3(-1, 0, 0), right: new THREE.Vector3(0, 0, 1), yaw: -Math.PI / 2, depth: SEAT_TABLE_WIDTH, gap: SLOT_GAP_SIDE, side: true }
const right: Seat = { out: new THREE.Vector3(1, 0, 0), right: new THREE.Vector3(0, 0, -1), yaw: Math.PI / 2, depth: SEAT_TABLE_WIDTH, gap: SLOT_GAP_SIDE, side: true }

/**
 * Seats in turn order, clockwise as seen from above: you at the bottom, then left, top,
 * right. Turn order in the engine is seat order, so reading the table clockwise IS the
 * order of play. Two bots take the side seats so neither sits hidden behind the pile.
 */
export function seatsFor(count: number): Seat[] {
  if (count <= 2) return [bottom, top]
  if (count === 3) return [bottom, left, right]
  return [bottom, left, top, right]
}

/** Deterministic per-card jitter from its id, so re-running layout never makes a resting
 *  card twitch, while the pile still looks dropped by hand. */
export function jitter(id: string, salt: number): number {
  let h = 2166136261 ^ salt
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619)
  return ((h >>> 0) / 4294967296) * 2 - 1
}

export function onSeat(seat: Seat, along: number, outward: number, y: number, out = new THREE.Vector3()): THREE.Vector3 {
  return out.copy(seat.out).multiplyScalar(outward).addScaledVector(seat.right, along).setY(y)
}

const LIFT = CARD_LIFT + CT / 2

/** The resting pose of the i-th card of the play pile. Shared by the layout and by the
 *  scene's play sequence, so a card lands exactly where it will then rest. */
export function pileTarget(card: Card, index: number): CardTarget {
  return {
    // Small jitter: at v1's ±0.18 the top card of a tall pile could hide the rank of
    // the card under an invisible 5, which is exactly the card you need to read.
    position: new THREE.Vector3(PILE_POS.x + jitter(card.id, 3) * 0.08, LIFT + index * CARD_STACK_STEP * PILE_SCALE, PILE_POS.z + jitter(card.id, 4) * 0.08),
    yaw: jitter(card.id, 5) * 0.12,
    faceDown: false,
    scale: PILE_SCALE,
    order: 0,
  }
}

export function layoutTable(snap: Snapshot): Map<string, CardTarget> {
  const targets = new Map<string, CardTarget>()
  const seats = seatsFor(snap.players.length)
  const n = snap.players.length
  // The opening deal goes round the table the way cards are dealt: everyone's first
  // face-down card, then everyone's second, and so on.
  const dealOrder = (pass: number, round: number, seat: number) => (pass * 3 + round) * n + seat

  snap.players.forEach((player, p) => {
    const seat = seats[p]!
    player.down.forEach((card, i) => {
      targets.set(card.id, {
        position: onSeat(seat, (i - 1) * seat.gap, seat.depth, LIFT),
        // Table cards face the VIEWER, not their owner: an opponent's face-up king should
        // read as a king from your chair, not as a sideways glyph (review finding).
        yaw: jitter(card.id, 1) * 0.02,
        faceDown: true,
        scale: 1,
        order: dealOrder(0, i, p),
      })
    })
    const heights = new Map<number, number>()
    player.up.forEach((card, i) => {
      const slot = player.upSlots[card.id] ?? i
      const layer = heights.get(slot) ?? 0
      heights.set(slot, layer + 1)
      targets.set(card.id, {
        position: onSeat(seat, (slot - 1) * seat.gap + layer * 0.08, seat.depth - UP_NUDGE - layer * 0.06, LIFT + CT + CARD_STACK_STEP + layer * (CT + CARD_STACK_STEP)),
        yaw: jitter(card.id, 2) * 0.02,
        faceDown: false,
        scale: 1,
        order: dealOrder(1, slot, p) + layer * 0.15,
      })
    })
    if (p === 0) return
    const count = player.hand.length
    const gap = count > 1 ? Math.min(HAND_FAN_BOT, HAND_SPAN_BOT / (count - 1)) : 0
    // Clamp the whole fan's rotation, however many cards a pickup gave the bot.
    const fanStep = count > 1 ? Math.min(0.03, 0.24 / (count - 1)) : 0
    player.hand.forEach((card, i) => {
      targets.set(card.id, {
        position: onSeat(seat, (i - (count - 1) / 2) * gap, seat.depth + SEAT_HAND_OFFSET, LIFT + i * CARD_STACK_STEP),
        yaw: seat.yaw + (i - (count - 1) / 2) * fanStep,
        faceDown: true,
        scale: 1,
        order: dealOrder(2, i, p),
      })
    })
  })

  snap.pile.forEach((card, i) => targets.set(card.id, pileTarget(card, i)))
  return targets
}

/** Where a card appears when it enters play from the draw pile. */
export const DRAW_SPAWN = new THREE.Vector3(DRAW_POS.x, 0.95, DRAW_POS.z)
/** Where a blind or chance card is held up for everyone to read before it lands. */
export const REVEAL_POS = new THREE.Vector3(PILE_POS.x, 1.4, PILE_POS.z + 0.3)
