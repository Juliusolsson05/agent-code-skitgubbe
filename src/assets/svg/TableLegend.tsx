import type { Rules } from '../../game/engine/rules'

// What is printed on the felt: the game's name and the house rules in force.
//
// Rules printed on the table matter more here than in Blackjack. Every family plays
// Skitgubbe slightly differently and this table's rules are configurable, so a player
// glancing down should be able to read "2 resets · 10 burns · invisible 5" without
// opening settings. Positions are passed in through the felt's UV↔world mapping; nothing
// is eyeballed, for the same reason as Blackjack's TableLogo.

// Linen, printed faintly: signage for the table, never instructions (those are DOM).
const GOLD = '#f3e3c3'

export type TableLegendProps = {
  w: number
  h: number
  rules: Rules
  titleY: number
  rulesY: number
}

export function ruleSummary(rules: Rules): string[] {
  const specials = [
    rules.twoResets && '2 resets',
    rules.invisibleFive && 'invisible 5',
    rules.sevenOrLower && '7 or lower',
    rules.tenBurns && '10 burns',
    rules.fourBurns && 'four of a kind burns',
  ].filter(Boolean) as string[]
  return specials.length ? specials : ['play equal or higher']
}

export function TableLegend({ w, rules, titleY, rulesY, h }: TableLegendProps) {
  // Signage, not content: small and quiet. Printed in the house serif, sentence case,
  // so it reads as a cloth's embroidery rather than casino signage.
  const title = Math.round(w * 0.024)
  const sub = Math.round(w * 0.0125)
    return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <g textAnchor="middle" fontFamily="'Iowan Old Style', Palatino, Georgia, serif">
        <text x={w / 2} y={titleY} fontSize={title * 1.25} fontStyle="italic" fill={GOLD} fillOpacity="0.34">
          Skitgubbe
        </text>
        <text x={w / 2} y={rulesY} fontSize={sub * 1.1} fill={GOLD} fillOpacity="0.36">
          {ruleSummary(rules).join(',  ')}
        </text>
      </g>
    </svg>
  )
}
