import * as THREE from 'three'

import { cardBackTexture } from '../textures/cardTextures'
import { BURN_POS, CH, CW, DECK_BLOCK_H, DRAW_POS } from '../world'

// The draw pile and the burned pile as blocks of cards whose height tracks the game.
//
// Individual meshes for 52 cards that nobody can see the faces of would cost 150 draw
// calls for nothing. A block with a card back on top and paper-white sides is what a
// stack looks like from above, and it is how Blackjack's shoe and discard tray are drawn.
// The same Blackjack lesson applies to height: from 17° off vertical, true-scale stack
// height is invisible, so DECK_BLOCK_H is exaggerated.

export type TablePiles = {
  /** 0 = empty, 1 = a full deck. Eased, not snapped. */
  setDraw(fraction: number): void
  setBurned(fraction: number): void
  step(dt: number): void
}

const FILL_EASE = 5

function block(position: THREE.Vector3, yaw: number): THREE.Mesh {
  const edge = new THREE.MeshStandardMaterial({ color: 0xf1efe6, roughness: 0.75, envMapIntensity: 0.3 })
  const top = new THREE.MeshStandardMaterial({ map: cardBackTexture(), roughness: 0.62, envMapIntensity: 0.35 })
  // Box faces: [+x, −x, +y(top), −y, +z, −z]
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(CW, DECK_BLOCK_H, CH), [edge, edge, top, edge, edge, edge])
  mesh.position.copy(position)
  mesh.rotation.y = yaw
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function buildPiles(scene: THREE.Scene): TablePiles {
  const draw = block(DRAW_POS, 0.06)
  // The burned pile sits askew: it is a heap of swept cards, not a tidy deck.
  const burned = block(BURN_POS, -0.22)
  scene.add(draw, burned)

  /** Grow from the felt up, not from the block's centre; a sliver at 0 is hidden
   *  because a zero scale is a degenerate matrix. */
  const apply = (mesh: THREE.Mesh, fraction: number) => {
    const f = Math.max(0, Math.min(1, fraction))
    mesh.visible = f > 0.004
    const s = Math.max(0.004, f)
    mesh.scale.y = s
    mesh.position.y = 0.01 + (DECK_BLOCK_H * s) / 2
  }
  const level = { draw: 1, burned: 0 }
  const target = { draw: 1, burned: 0 }
  apply(draw, 1)
  apply(burned, 0)

  return {
    setDraw: f => { target.draw = f },
    setBurned: f => { target.burned = f },
    step: dt => {
      const k = Math.min(1, dt * FILL_EASE)
      level.draw += (target.draw - level.draw) * k
      level.burned += (target.burned - level.burned) * k
      apply(draw, level.draw)
      apply(burned, level.burned)
    },
  }
}
