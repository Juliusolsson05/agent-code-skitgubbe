// The bot laboratory body. Benchmarks the five capability levels against each other
// and ablates single skills to attribute their value. The results finalised the
// shipped ladder; recorded tables live in docs/decomposition/bot-ladder-data.md.
//
// Everything is seeded LCG: reruns reproduce exactly. Games mirror the real view:
// every applied move feeds observeBot so level-5 tracking works as in production.
import { applyMove, botConfigFor, chooseMoveWith, observeBot, prepareBotWith } from '../src/game/bot.ts'
import { SkitgubbeGame } from '../src/game/engine/game.ts'
import { DEFAULT_RULES } from '../src/game/engine/rules.ts'

const seeded = (seed: number) => () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296 }

type Entrant = { name: string; config: ReturnType<typeof botConfigFor> }

const level = (n: number): Entrant => ({ name: `L${n}`, config: botConfigFor(n) })
const variant = (name: string, base: number, patch: Partial<ReturnType<typeof botConfigFor>>): Entrant => ({
  name, config: { ...botConfigFor(base), ...patch },
})

/** Play one seeded game with per-seat entrants; returns each seat's place (1 best). */
function play(players: number, seats: Entrant[], seed: number): number[] {
  const game = new SkitgubbeGame({ players, rules: DEFAULT_RULES, random: seeded(seed) })
  seats.forEach((e, p) => prepareBotWith(game, p, e.config))
  const opening = game.getSnapshot()
  observeBot(game, opening, opening, game.takeEvents())
  let guard = 0
  while (game.getSnapshot().phase === 'playing') {
    const p = game.getSnapshot().current
    const prev = game.getSnapshot()
    const move = chooseMoveWith(game, p, seats[p].config)
    if (!applyMove(game, p, move)) throw new Error(`illegal move ${JSON.stringify(move)} seed ${seed}`)
    observeBot(game, prev, game.getSnapshot(), game.takeEvents())
    if (++guard > 6000) throw new Error(`game did not finish (seed ${seed}`)
  }
  return game.getSnapshot().players.map(q => q.place)
}

const pct = (won: number, of: number) => `${(100 * won / of).toFixed(1)}%`

export async function run(argv: string[] = []) {
  const big = Number(argv[0] ?? 800)
  const small = Number(argv[1] ?? big)
  const lines: string[] = []

  // --- A. heads-up among shipped levels -------------------------------------------------
  const levels = [level(1), level(2), level(3), level(4), level(5)]
  const names = levels.map(e => e.name)
  lines.push(`## A. Heads-up win rate (row vs column), ${big} games per pair`, '')
  lines.push('| | ' + names.join(' | ') + ' |')
  lines.push('|---' + names.map(() => '---').join('|') + '|')
  for (const a of levels) {
    const row: string[] = []
    for (const b of levels) {
      if (a === b) { row.push('—'); continue }
      let wins = 0
      for (let i = 0; i < big; i++) {
        const seats = i % 2 === 0 ? [a, b] : [b, a]
        const places = play(2, seats, 1000 + i + names.indexOf(a.name) * 97 + names.indexOf(b.name) * 13)
        if (places[seats.indexOf(a)] === 1) wins++
      }
      row.push(pct(wins, big))
    }
    lines.push(`| ${a.name} | ` + row.join(' | ') + ' |')
  }

  // --- B. the realistic scaling metric: one entrant + two same-level anchors -------------
  // The real game has every bot at ONE level, so skill must show against a fixed
  // field, not in mixed tables. Entrant's average place among three seats, rotated.
  lines.push('', `## B. Three-player vs two L2 anchors (${small} games, entrant seat rotates)`, '')
  lines.push('| Entrant | avg place | 1st | skitgubbe |', '|---|---|---|---|')
  const field: Entrant[] = [...levels,
    variant('L4 no denial', 4, { denial: 'none' }),
    variant('L4 no pressure', 4, { pressure: false }),
    variant('L4 no balance', 4, { balance: false }),
    variant('L4 basic pipeline', 4, { pipeline: 'basic' }),
    variant('L5 no tracking', 5, { tracking: 'events' }),
    variant('L5 no coop', 5, { cooperate: 'off' }),
    variant('L5 no pipeline', 5, { pipeline: 'basic' }),
  ]
  const anchor = level(2)
  for (const e of field) {
    let sum = 0, first = 0, skit = 0
    for (let i = 0; i < small; i++) {
      const seat = i % 3
      const seats = [anchor, anchor, anchor]
      seats[seat] = e
      const places = play(3, seats, 7000 + i + e.name.length * 31)
      sum += places[seat]
      if (places[seat] === 1) first++
      if (places[seat] === 3) skit++
    }
    const avg = sum / small
    lines.push(`| ${e.name} | ${avg.toFixed(3)} | ${pct(first, small)} | ${pct(skit, small)} |`)
  }

  console.log(lines.join('\n'))
}
