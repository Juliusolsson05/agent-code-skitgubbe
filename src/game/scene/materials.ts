import * as THREE from 'three'

import type { Rank, Suit } from '../../assets/svg/suits'
import { cardBackTexture, cardFaceTexture } from './textures/cardTextures'
import { DEFAULT_RULES } from '../engine/rules'
import { feltNormalMap, feltTexture } from './textures/felt'
import { woodTexture } from './textures/surfaces'

// Every material in the scene (spec §8.4). Centralised so geometry files stay about
// shape and lighting stays about light.
//
// ── THE ROUGHNESS FLOOR IS A CORRECTNESS CONSTRAINT, NOT TASTE (§5.2) ──
// The camera and the key light are BOTH above a horizontal table, so for any table-top
// surface the GGX mirror direction points straight back at the viewer. At low roughness
// the specular lobe is narrow and intense, and it spikes far past the diffuse level —
// which is what blew out the white cards and the $1 chip. No horizontal surface may go
// below roughness 0.55, and envMapIntensity is capped at 0.45 on table-top objects.
// The rail is the one glossier surface (0.45) and it is vertical-ish, so its lobe points
// away from camera and reads as a tasteful edge roll instead of glare.

export function feltMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    map: feltTexture(DEFAULT_RULES),
    normalMap: feltNormalMap(),
    normalScale: new THREE.Vector2(0.35, 0.35),
    roughness: 0.98,
    metalness: 0,
    envMapIntensity: 0.25,
  })
}

export function woodMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    map: woodTexture(),
    roughness: 0.42,
    metalness: 0.05,
    envMapIntensity: 0.55,
  })
}

/** The rail is oiled pine, like a Swedish kitchen table, not a casino's leather bumper.
 *  The wood texture tinted warm and light; the same roughness Blackjack's rail uses. */
export function railMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    map: woodTexture(),
    color: 0xd9a26b,
    roughness: 0.45,
    metalness: 0,
    envMapIntensity: 0.7,
  })
}

/** Brass inlay between felt and rail — the detail that reads as a real table (§8.1). */
export function trimMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0xc9a227,
    roughness: 0.35,
    metalness: 0.9,
    envMapIntensity: 0.9,
  })
}

/** Card stock — the rounded body under the printed decals (§8.2). */
export function cardStockMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0xf4f2ea,
    roughness: 0.62,
    metalness: 0,
    envMapIntensity: 0.4,
  })
}

/**
 * A printed decal (face or back). `polygonOffset` keeps it from z-fighting the stock it
 * sits 0.8mm above — at this scale the depth buffer cannot reliably separate them.
 */
function decalMaterial(map: THREE.Texture): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    map,
    roughness: 0.62,
    metalness: 0,
    envMapIntensity: 0.4,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
    // ── alphaTest IS WHY THE CORNERS AREN'T BLACK ──
    // The decal geometry is a SQUARE plane, but the card art is a rounded rect, so the
    // four corner regions of the texture are fully transparent. On an opaque material
    // alpha is simply ignored and those texels render with their RGB — which for a
    // cleared canvas is (0,0,0). Result: four hard black triangles on every card.
    //
    // Discarding sub-threshold fragments cuts the corners away instead, revealing the
    // rounded white stock underneath, so the card gets a genuinely rounded silhouette
    // against the felt. Using alphaTest rather than `transparent: true` keeps the decal
    // in the opaque pass — no depth sorting, and it still casts a correct shadow.
    alphaTest: 0.5,
  })
}

export function cardFaceMaterial(rank: Rank, suit: Suit): THREE.MeshStandardMaterial {
  return decalMaterial(cardFaceTexture(rank, suit))
}

export function cardBackMaterial(): THREE.MeshStandardMaterial {
  return decalMaterial(cardBackTexture())
}

export function floorMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x120a0d,
    roughness: 0.85,
    metalness: 0,
    envMapIntensity: 0.3,
  })
}
