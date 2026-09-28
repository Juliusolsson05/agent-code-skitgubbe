import type { TableCard } from '../lan/protocol'

export function handRows(count: number, compact = false, width = 1160): number {
  return Math.max(1, Math.ceil(count / Math.min(compact ? 8 : 18, Math.max(1, Math.floor((width - 90) / 60) + 1))))
}
export function handColumns(count: number, compact = false, width = 1160): number {
  return Math.ceil(count / handRows(count, compact, width))
}
/** Large pickups need exposed ranks, not a horizontal strip of 30px slivers.
 * Keep up to 18 per row, distribute evenly, and expose 72px of every earlier
 * layer. The table gives those layers height so the modal never keeps growing.
 * Stable layers on opponents' turns avoid moving a target just as our turn starts. */
export function HandFan<T extends TableCard>({ cards, slots, hidden, compact = false, width: available = 1160, cardSize = 90, render }: {
  cards: T[]; slots?: Record<string, number>; hidden: ReadonlySet<string>; compact?: boolean; width?: number; cardSize?: number
  render: (card: T, i: number) => JSX.Element
}) {
  const columns = slots ? cards.length : handColumns(cards.length, compact, available)
  const rows = slots ? 1 : handRows(cards.length, compact, available)
  const step = columns > 1 ? Math.min(cardSize + 8, (available - cardSize) / (columns - 1)) : 0
  const layers = new Map<number, number>()
  const positions = cards.map((card, i) => {
    if (!slots) return { left: (i % columns) * step, top: Math.floor(i / columns) * 72 }
    const slot = slots[card.id] ?? i
    const layer = layers.get(slot) ?? 0
    layers.set(slot, layer + 1)
    return { left: slot * Math.min(cardSize + 20, (available - cardSize - 24) / 2) + layer * 8, top: 0 }
  })
  const width = cardSize + Math.max(0, ...positions.map(p => p.left))
  return <div className="sg-fan" data-rows={rows} style={{ ['--card-width' as string]: `${cardSize}px`, width: Math.min(width, available), height: cardSize * 1.4 + 16 + (rows - 1) * 72 }}>
    <div className="sg-fan-inner" style={{ width, height: cardSize * 1.4 + (rows - 1) * 72 }}>
      {cards.map((card, i) => <div key={card.id} className="sg-fan-slot" style={{ ...positions[i], width: cardSize, height: cardSize * 1.4, visibility: hidden.has(card.id) ? 'hidden' : undefined }}>{render(card, i)}</div>)}
    </div>
  </div>
}
