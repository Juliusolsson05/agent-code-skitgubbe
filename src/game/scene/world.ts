import * as THREE from 'three'

// All world dimensions live here and ONLY here (spec §12, convention 2).
//
// Units: 1 world unit ≈ one card width. The table lies in the XZ plane. The felt's TOP
// surface is y = 0 — that is the datum every other height is expressed against, so
// "does this sit on the table?" is always the question "is y > 0?". A previous version
// had the wood slab's beveled top at y ≈ 0.18 while the felt sat at y = 0, which buried
// the felt and every chip underneath it. Keeping one datum makes that class of bug
// impossible to express.
//
// The camera looks down the +Z axis from the player's side, so +Z is "toward the player"
// and −Z is "toward the dealer".

// --- cards ---
// Cards are sized for READABILITY, not for scale fidelity. A real card is ~3.5% of a
// real table's width; here it is ~8%, because the player has to read a rank glyph at
// 860px from a bird's-eye camera. Fidelity that you cannot read is worthless.
export const CW = 1.42 // card width
export const CH = 1.99 // card height (1:1.4 poker ratio, matches the 100×140 SVG viewBox)
// Card thickness, deliberately ~6x scale-exaggerated (a real card is 0.5% of its own
// width; this is ~2.5%). At true scale the edge is sub-pixel and cards read as decals
// printed on the felt rather than objects lying on it.
export const CT = 0.038 // card thickness
export const CARD_RADIUS = 0.092 // corner radius of the rounded stock (§8.2)

// --- table (§8.1) ---
export const FELT_W = 22
export const FELT_D = 12.8
export const TABLE_W = 23.4
export const TABLE_D = 14.2
export const TABLE_H = 0.9 // body thickness — real bulk, so the camera sees its sides
export const RAIL_H = 0.42 // padded rail height above the felt
export const TABLE_CORNER_R = 1.15

/**
 * How far the bottom card floats above the felt, and how much each card above it adds.
 * Exaggerated on purpose (Blackjack's finding): a card lying truly flat casts a contact
 * shadow a fraction of a millimetre wide, which reads as a decal. Lifting it lets the key
 * light throw a real drop shadow, and the per-card step shows which card is on top.
 */
export const CARD_LIFT = 0.055
export const CARD_STACK_STEP = 0.017

// --- layout -------------------------------------------------------------------
// Four players need four independent card areas plus a centre lane for the piles.
// Enlarging only the canvas scaled the old overlaps up: the old far row at z=-1.95
// covered the draw labels, and the side hands crossed their own face-up cards. This
// felt has half-extents 11 × 6.4. Side rows at |x|=7.7 leave the centre ±4.2 clear;
// the outer hand edge is 10.6, still inside the felt. Far/near rows start outside
// |z|=2.2, leaving room for the pile and its requirement above it. Keep these clearances
// when changing card scale; the CSS modal and camera frame must grow together.

/** Distance from the centre to a seat's face-down/face-up row. Your row sits further
 *  out (your hand is not on the table, so the near strip is free) and the far row
 *  closer in, so the far bot's hand still fits inside the tighter camera frame. */
export const SEAT_TABLE_DEPTH_BOTTOM = 3.65
export const SEAT_TABLE_DEPTH_TOP = 3.35
export const SEAT_TABLE_WIDTH = 7.7
/** Extra distance from the table row out to a bot's hand fan, toward its edge. */
export const SEAT_HAND_OFFSET = 1.9
/** Spacing of the three face-down/face-up slots. Side seats run along the table's
 *  depth with viewer-facing cards (1.99 tall), so they need the wider gap to not overlap. */
export const SLOT_GAP = 1.9
export const SLOT_GAP_SIDE = 2.3
/** The pile is where every decision is read, so its cards render a touch larger. */
export const PILE_SCALE = 1.12
/** A face-up card sits slightly toward the centre so the face-down card under it peeks out. */
export const UP_NUDGE = 0.16
/** Widest spacing between a bot's hand cards, and the longest the fan may get before the
 *  cards overlap harder instead of spilling off the felt. */
export const HAND_FAN_BOT = 0.42
export const HAND_SPAN_BOT = 4.4

/** Centre pile, draw pile and burn tray (felt coordinates, y = 0). */
export const PILE_POS = new THREE.Vector3(0, 0, 0)
export const DRAW_POS = new THREE.Vector3(3.4, 0, 0)
export const BURN_POS = new THREE.Vector3(-3.4, 0, 0)
/** How tall the full 52-card draw block is. Exaggerated for the same reason Blackjack's
 *  shoe is: from 17° off vertical, true-scale stack height is invisible. */
export const DECK_BLOCK_H = 0.9

/**
 * What the camera frames (§4.2). Deliberately the felt plus a little rail — NOT the whole
 * table. Framing the furniture wastes ~15% of the viewport on wood the player never looks
 * at, and shrinks the cards correspondingly. We show enough rail to read the table as an
 * object and spend the rest of the frame on the play area.
 */
export const FRAME_W = 22.6
export const FRAME_D = 13.2

// --- camera (§4) ---
/** Elevation above the horizon. 73° = 17° off vertical: bird's-eye with a slight tilt. */
export const CAM_ELEVATION_DEG = 73
/** A LONG lens. Combined with the fitted distance this is near-orthographic, which is
 *  what makes the table readable; a wide lens up close was the "annoying" perspective. */
export const CAM_FOV = 30
/** Framing slack around the table. */
export const CAM_MARGIN = 1.025

// --- lighting calibration (§5.1) ---
/** The brightest diffuse surface must land here (linear, pre-tone-map). Exceeding ~1.0
 *  is what produced the blown-out white cards and chips. */
export const TARGET_WHITE_LUMA = 0.86
