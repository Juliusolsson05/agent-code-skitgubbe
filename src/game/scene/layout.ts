import * as THREE from 'three'

import type { Card } from '../engine/cards'
import type { Snapshot } from '../engine/game'
import {
  CARD_LIFT,
  CARD_STACK_STEP,
  CT,
  DRAW_POS,
  HAND_FAN_BOT,
  HAND_SPAN_BOT,
  PILE_POS,
  SEAT_HAND_OFFSET,
  SELF_HAND_OFFSET,
  SELF_HAND_Y,
  SEAT_TABLE_DEPTH,
  SEAT_TABLE_WIDTH,
  SLOT_GAP,
  UP_NUDGE,
} from './world'

// Where every visible card belongs, as a pure function of the snapshot.
//
// WHY one function for the whole table instead of per-event animation code: the engine
// reports WHAT happened, and card positions are fully determined by the resulting state.
// Computing targets from state and letting the scene tween each card toward its target
// makes every transition animate correctly by construction: a play is a card whose
// target moved from a hand to the pile, a pickup is thirty cards whose targets moved to
// a hand, a burn is cards whose target disappeared. No event can be animated wrongly
// because no event is animated at all.

export type CardTarget = {
  position: THREE.Vector3
  yaw: number
  faceDown: boolean
  /** Seconds to wait before moving. Only the opening deal uses it. */
  delay: number
}

/** A seat's frame on the felt: where its centre line is and which way it faces. */
export type Seat = {
  /** Unit vector from the table centre toward this player's edge. */
  out: THREE.Vector3
  /** Unit vector along the edge, to the player's right. */
  right: THREE.Vector3
  /** Card yaw so the card's bottom edge faces the player. */
  yaw: number
  depth: number
}

const bottom: Seat = { out: new THREE.Vector3(0, 0, 1), right: new THREE.Vector3(1, 0, 0), yaw: 0, depth: SEAT_TABLE_DEPTH }
const top: Seat = { out: new THREE.Vector3(0, 0, -1), right: new THREE.Vector3(-1, 0, 0), yaw: Math.PI, depth: SEAT_TABLE_DEPTH }
const left: Seat = { out: new THREE.Vector3(-1, 0, 0), right: new THREE.Vector3(0, 0, 1), yaw: -Math.PI / 2, depth: SEAT_TABLE_WIDTH }
const right: Seat = { out: new THREE.Vector3(1, 0, 0), right: new THREE.Vector3(0, 0, -1), yaw: Math.PI / 2, depth: SEAT_TABLE_WIDTH }

/**
 * Seats in turn order, clockwise as seen from above: you at the bottom, then left, top,
 * right. Turn order in the engine is seat order, so reading the table clockwise IS the
 * order of play. Two bots take the side seats rather than one side and the top, so
 * neither opponent is hidden behind the pile from your point of view.
 */
export function seatsFor(count: number): Seat[] {
  if (count <= 2) return [bottom, top]
  if (count === 3) return [bottom, left, right]
  return [bottom, left, top, right]
}

/** Deterministic per-card jitter from its id, so re-running layout never makes a
 *  resting card twitch, while the pile still looks dropped by hand. */
function jitter(id: string, salt: number): number {
  let h = 2166136261 ^ salt
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619)
  return ((h >>> 0) / 4294967296) * 2 - 1
}

function onSeat(seat: Seat, along: number, outward: number, y: number, out: THREE.Vector3): THREE.Vector3 {
  return out.copy(seat.out).multiplyScalar(outward).addScaledVector(seat.right, along).setY(y)
}

export function layoutTable(snap: Snapshot, dealing: boolean): Map<string, CardTarget> {
  const targets = new Map<string, CardTarget>()
  const seats = seatsFor(snap.players.length)
  const lift = CARD_LIFT + CT / 2

  // The opening deal goes round the table the way cards are dealt: every player's first
  // face-down card, then every second one, and so on. Delay encodes that order.
  const dealOrder = (round: number, pass: number, seat: number) =>
    dealing ? ((pass * 3 + round) * snap.players.length + seat) : 0

  snap.players.forEach((player, p) => {
    const seat = seats[p]!
    player.down.forEach((card, i) => {
      targets.set(card.id, {
        position: onSeat(seat, (i - 1) * SLOT_GAP, seat.depth, lift, new THREE.Vector3()),
        yaw: seat.yaw + jitter(card.id, 1) * 0.03,
        faceDown: true,
        delay: dealOrder(i, 0, p),
      })
    })
    player.up.forEach((card, i) => {
      targets.set(card.id, {
        // On top of the matching face-down card, nudged toward the centre.
        position: onSeat(seat, (i - 1) * SLOT_GAP, seat.depth - UP_NUDGE, lift + CT + CARD_STACK_STEP, new THREE.Vector3()),
        yaw: seat.yaw + jitter(card.id, 2) * 0.05,
        faceDown: false,
        delay: dealOrder(i, 1, p),
      })
    })
    const self = p === 0
    const n = player.hand.length
    if (self) {
      // YOUR hand leaves the table toward you and out of frame: the rail below the
      // table is your hand. Drawing it on the felt as well doubled every card and
      // covered your own face-up row (seen in the first screenshot). Flying off-screen
      // still animates every draw and pickup as cards coming TO you.
      player.hand.forEach((card, i) => {
        targets.set(card.id, {
          position: new THREE.Vector3((i - (n - 1) / 2) * 0.3, SELF_HAND_Y, seat.depth + SELF_HAND_OFFSET),
          yaw: 0,
          faceDown: false,
          delay: dealOrder(i, 2, p),
        })
      })
    } else {
      const gap = n > 1 ? Math.min(HAND_FAN_BOT, HAND_SPAN_BOT / (n - 1)) : 0
      player.hand.forEach((card, i) => {
        targets.set(card.id, {
          position: onSeat(seat, (i - (n - 1) / 2) * gap, seat.depth + SEAT_HAND_OFFSET, lift + i * CARD_STACK_STEP, new THREE.Vector3()),
          // A slight fan rotation reads as "held cards" rather than "cards on display".
          yaw: seat.yaw + (i - (n - 1) / 2) * 0.03,
          faceDown: true,
          delay: dealOrder(i, 2, p),
        })
      })
    }
  })

  snap.pile.forEach((card: Card, i) => {
    targets.set(card.id, {
      position: new THREE.Vector3(
        PILE_POS.x + jitter(card.id, 3) * 0.18,
        lift + i * CARD_STACK_STEP,
        PILE_POS.z + jitter(card.id, 4) * 0.14,
      ),
      yaw: jitter(card.id, 5) * 0.35,
      faceDown: false,
      delay: 0,
    })
  })

  return targets
}

/** Where a card appears when it enters play from the draw pile. */
export const DRAW_SPAWN = new THREE.Vector3(DRAW_POS.x, 0.9, DRAW_POS.z)
