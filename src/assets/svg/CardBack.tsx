import type { CSSProperties } from 'react'

// A conventional two-way card back. The previous animal silhouette was ambiguous at
// table scale and looked accidental. Repeated diamonds stay recognisable when fanned,
// rotated or seen at 60px; there is no emblem whose orientation suggests hidden value.
// Explicit geometry avoids document-global SVG ids colliding across DOM card copies
// and works unchanged when this component is rasterised for a Three.js texture.
const diamonds = Array.from({ length: 70 }, (_, i) => {
  const x = 18 + (i % 7) * 10.6667
  const y = 16 + Math.floor(i / 7) * 12
  return `M${x} ${y - 4}l3.4 4-3.4 4-3.4-4Z`
}).join(' ')

export function CardBack({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 140" className={className} style={style}>
      <rect x="0.5" y="0.5" width="99" height="139" rx="9" fill="#eee5d4" stroke="#312019" strokeOpacity=".35" />
      <rect x="5" y="5" width="90" height="130" rx="5" fill="#862b31" />
      <rect x="9" y="9" width="82" height="122" rx="3" fill="none" stroke="#ead3b0" strokeWidth="1" />
      <path d={diamonds} fill="none" stroke="#e2be99" strokeWidth=".8" strokeOpacity=".7" />
    </svg>
  )
}
