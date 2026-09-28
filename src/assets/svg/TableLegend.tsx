import type { Rules } from '../../game/engine/rules'

// What is printed on the felt: the game's name and the house rules in force.
//
// Rules printed on the table matter more here than in Blackjack. Every family plays
// Skitgubbe slightly differently and this table's rules are configurable, so a player
// glancing down should be able to read "2 resets · 10 burns · invisible 5" without
// opening settings. Positions are passed in through the felt's UV↔world mapping; nothing
// is eyeballed, for the same reason as Blackjack's TableLogo.

const GOLD = '#f0e2b6'

export type TableLegendProps = {
  w: number
  h: number
  rules: Rules
  drawLabel: { x: number; y: number }
  burnLabel: { x: number; y: number }
  titleY: number
  rulesY: number
}

export function ruleSummary(rules: Rules): string[] {
  const specials = [
    rules.twoResets && '2 RESETS',
    rules.invisibleFive && 'INVISIBLE 5',
    rules.sevenOrLower && '7 OR LOWER',
    rules.tenBurns && '10 BURNS',
    rules.fourBurns && 'FOUR OF A KIND BURNS',
  ].filter(Boolean) as string[]
  return specials.length ? specials : ['PLAY EQUAL OR HIGHER']
}

export function TableLegend({ w, rules, drawLabel, burnLabel, titleY, rulesY, h }: TableLegendProps) {
  // Signage, not content: small and quiet, like a real table's printed rules.
  const title = Math.round(w * 0.024)
  const sub = Math.round(w * 0.0125)
  const label = Math.round(w * 0.0105)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <g textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif">
        <text x={w / 2} y={titleY} fontSize={title} fontWeight={700} fill={GOLD} fillOpacity="0.5" letterSpacing={title * 0.12}>
          SKITGUBBE
        </text>
        <text x={w / 2} y={rulesY} fontSize={sub} fontWeight={600} fill={GOLD} fillOpacity="0.42" letterSpacing={sub * 0.08}>
          {ruleSummary(rules).join('  ·  ')}
        </text>
        <text x={drawLabel.x} y={drawLabel.y} fontSize={label} fontWeight={600} fill={GOLD} fillOpacity="0.38" letterSpacing={label * 0.14}>DRAW</text>
        <text x={burnLabel.x} y={burnLabel.y} fontSize={label} fontWeight={600} fill={GOLD} fillOpacity="0.38" letterSpacing={label * 0.14}>BURNED</text>
      </g>
    </svg>
  )
}
