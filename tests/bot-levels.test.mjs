import { test } from 'node:test'
import assert from 'node:assert/strict'
import { applyMove, chooseMove, observeBot, prepareBot } from '../src/game/bot.ts'
import { newDeck } from '../src/game/engine/cards.ts'
import { SkitgubbeGame } from '../src/game/engine/game.ts'
import { DEFAULT_RULES } from '../src/game/engine/rules.ts'

const seeded = seed => () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296 }
const noSwap = { ...DEFAULT_RULES, swapPhase: false }
/** Every deciding seat keeps blind cards, so nothing here can simply finish first:
 *  the scenario must be decided by the skill under test, not by a lucky empty row. */
const blinds = ['8C', '8D', '8H']

/** Drive one bot turn the way the real view does, so the ledger sees every event. */
function step(game, level) {
  const p = game.getSnapshot().current
  const prev = game.getSnapshot()
  const move = chooseMove(game, p, level)
  assert.ok(applyMove(game, p, move), `illegal bot move ${JSON.stringify(move)}`)
  observeBot(game, prev, game.getSnapshot(), game.takeEvents())
}

// --- the ladder's distinctive behaviors ------------------------------------------------

test('level 1 plays the lowest legal single card and never denies', () => {
  const game = new SkitgubbeGame({ players: 2, rules: noSwap })
  game.setup({ players: [{ hand: ['6S', '6H', '9C'], down: blinds }, { hand: ['KC', '4D', '7D'], down: ['5C', '5D', '5H'] }], pile: ['4C'] })
  assert.deepEqual(chooseMove(game, 0, 1), { type: 'play', ids: ['6S'] })
  const threat = new SkitgubbeGame({ players: 2, rules: noSwap })
  threat.setup({ players: [{ hand: ['4S', 'KS'], down: blinds }, { hand: ['QC'] }], pile: ['3C'] })
  assert.deepEqual(chooseMove(threat, 0, 1), { type: 'play', ids: ['4S'] })
})

test('a strong bot denies a last hidden card with its highest ordinary card', () => {
  const game = new SkitgubbeGame({ players: 2, rules: noSwap })
  game.setup({ players: [{ hand: ['4S', 'KS'], down: blinds }, { hand: ['QC'] }], pile: ['3C'] })
  assert.deepEqual(chooseMove(game, 0, 4), { type: 'play', ids: ['KS'] })
})

test('a perfect bot facilitates when a later bot is the defender', () => {
  // Order 0 → 1 → 2. Seat 0 (human) is down to one card; the defender is seat 2 (bot).
  // Seat 1 must keep the pile LOW so seat 2 can spend its ace, not waste its own king.
  const game = new SkitgubbeGame({ players: 3, rules: noSwap })
  game.setup({
    players: [
      { hand: ['QS'] },
      { hand: ['4S', 'KS'], down: blinds },
      { hand: ['AS', '4D'], down: ['9C', '9D', '9H'] },
    ],
    pile: ['3C'], current: 1,
  })
  assert.deepEqual(chooseMove(game, 1, 5), { type: 'play', ids: ['4S'] })
  // The 4 does not keep the turn: seat 2 is now the defender in the same game.
  applyMove(game, 1, chooseMove(game, 1, 4))
  assert.equal(game.getSnapshot().current, 2)
  assert.deepEqual(chooseMove(game, 2, 5), { type: 'play', ids: ['AS'] })
})

test('a strong bot covers a human defender itself; a perfect bot bets on the human', () => {
  // Order 0 (human) → 1 (threat) → 2 (me). The defender of seat 1 is the HUMAN at 0.
  // Level 4 trusts bots only, so it denies with its king. Level 5 plays the logical
  // equilibrium — the human seat is trusted to cover the threat — and keeps positioning
  // by feeding the cheapest card instead.
  const base = () => {
    const game = new SkitgubbeGame({ players: 3, rules: noSwap })
    game.setup({
      players: [
        { hand: ['AS', '4D'], down: ['6C', '6D', '6H'] },
        { hand: ['QS'] },
        { hand: ['4S', 'KS'], down: blinds },
      ],
      pile: ['3C'], current: 2,
    })
    return game
  }
  assert.deepEqual(chooseMove(base(), 2, 4), { type: 'play', ids: ['KS'] })
  assert.deepEqual(chooseMove(base(), 2, 5), { type: 'play', ids: ['4S'] })
})

test('a wasted block ends the perfect bot’s trust in a human defender', () => {
  const game = new SkitgubbeGame({ players: 3, rules: noSwap })
  // First position: the human at 0 feeds a 4 under a KNOWN single 9H behind it.
  game.setup({
    players: [
      { hand: ['4D', 'AS'], down: ['6C', '6D', '6H'] },
      { up: ['9H'] },
      { hand: ['4S', 'KS'], down: blinds },
    ],
    pile: ['3C'], current: 0,
  })
  let prev = game.getSnapshot()
  observeBot(game, prev, prev, []) // ledger exists before the public action, as in play
  assert.ok(game.play(0, ['4D']))
  observeBot(game, prev, game.getSnapshot(), game.takeEvents())
  // Same shape as the trust test: now the perfect bot denies itself.
  game.setup({
    players: [
      { hand: ['AS'], down: ['6C', '6D', '6H'] },
      { hand: ['QS'] },
      { hand: ['4S', 'KS'], down: blinds },
    ],
    pile: ['3C'], current: 2,
  })
  assert.deepEqual(chooseMove(game, 2, 5), { type: 'play', ids: ['KS'] })
})

test('a tracked pickup turns denial exact: block the known 9 with a jack, not a king', () => {
  const game = new SkitgubbeGame({ players: 2, rules: noSwap })
  // Seat 1 visibly picks up a 9; the ledger now knows their only card exactly.
  game.setup({ players: [{ hand: ['JS', '2S'], down: blinds }, { hand: ['7S'] }], pile: ['9H'], current: 1 })
  let prev = game.getSnapshot()
  observeBot(game, prev, prev, [])
  assert.ok(game.pickUp(1))
  observeBot(game, prev, game.getSnapshot(), game.takeEvents())
  game.setup({ players: [{ hand: ['JS', 'QS', 'KS'], down: blinds }, { hand: ['9H'] }], pile: ['3C'], current: 0 })
  assert.deepEqual(chooseMove(game, 0, 5), { type: 'play', ids: ['JS'] })
  // Without tracking (fresh game), the 9 is only probable: the king minimises the
  // chance of any reply beating it, so level 4 spends the king.
  const blind = new SkitgubbeGame({ players: 2, rules: noSwap })
  blind.setup({ players: [{ hand: ['JS', 'QS', 'KS'], down: blinds }, { hand: ['9H'] }], pile: ['3C'], current: 0 })
  assert.deepEqual(chooseMove(blind, 0, 4), { type: 'play', ids: ['KS'] })
})

test('a known forced win is raced, not pressured', () => {
  // Their two tracked cards are 10 + queen: burn, then the queen lands on the empty
  // pile — a guaranteed win no pile can stop. Level 5 saw the pickup, marks the racer
  // and keeps its tempo (sheds the 4). Level 4, blind to the sequence, still spends
  // its king trying to restrict a two-card hand.
  const game = new SkitgubbeGame({ players: 2, rules: noSwap })
  game.setup({ players: [{ hand: ['4S', 'KS'], down: blinds }, { hand: ['7S'] }], pile: ['10H', 'QS'], current: 1 })
  let prev = game.getSnapshot()
  observeBot(game, prev, prev, [])
  assert.ok(game.pickUp(1))
  observeBot(game, prev, game.getSnapshot(), game.takeEvents())
  game.setup({ players: [{ hand: ['4S', 'KS'], down: blinds }, { hand: ['10H', 'QS'] }], pile: ['3C'], current: 0 })
  assert.deepEqual(chooseMove(game, 0, 5), { type: 'play', ids: ['4S'] })
  const blind = new SkitgubbeGame({ players: 2, rules: noSwap })
  blind.setup({ players: [{ hand: ['4S', 'KS'], down: blinds }, { hand: ['10H', 'QS'] }], pile: ['3C'], current: 0 })
  assert.deepEqual(chooseMove(blind, 0, 4), { type: 'play', ids: ['KS'] })
})

test('setup stacking churns a low pair into a thicker table and a fresh card', () => {
  // A fixed deal through the constructor: setup() would skip the swap phase entirely.
  // Deal order is rounds of down/up/hand per player; the remaining cards are drawn in
  // the order listed, so the stacked 3 refills the hand with the 2 of clubs.
  const byId = new Map(newDeck().map(c => [c.id, c]))
  const deal = [
    'QC', 'AC', 'QD', 'AD', 'QH', 'AH',
    'JC', '3H', 'JD', '9C', 'JH', '6D',
    '8C', '3S', '8D', 'KS', '8H', '7D',
    '2C', '2D', '2H', '2S', '5C', '5D',
  ].map(id => byId.get(id))
  const make = () => new SkitgubbeGame({ players: 2, rules: DEFAULT_RULES, deck: deal.map(c => ({ ...c })) })
  const game = make()
  prepareBot(game, 1, 3)
  const after = game.getSnapshot().players[1]
  assert.ok(after.ready)
  assert.ok(after.up.some(c => c.id === '3S') && after.up.some(c => c.id === '3H'), 'the 3s share the table')
  assert.equal(after.hand.length, 3, 'the hand refilled after the stack')
  // Level 2 does not stack: the table keeps exactly its dealt three cards.
  const simple = make()
  prepareBot(simple, 1, 2)
  assert.equal(simple.getSnapshot().players[1].up.length, 3)
})

test('the pipeline saves a wild as the LAST face-up card when flips remain', () => {
  // Deck dead, hand gone, face-up row [J, 2] with three blind cards behind: the J
  // first leaves the 2 to open the blind phase on a reset pile where any flip fits.
  // Emptying the row is not a finish, so the finish planner must stay out of it.
  const game = new SkitgubbeGame({ players: 2, rules: noSwap })
  game.setup({
    players: [{ up: ['JS', '2S'], down: blinds }, { hand: ['KC', '4D', '7D'], down: ['5C', '5D', '5H'] }],
    pile: ['9C'], current: 0,
  })
  assert.deepEqual(chooseMove(game, 0, 3), { type: 'play', ids: ['JS'] })
  assert.deepEqual(chooseMove(game, 0, 5), { type: 'play', ids: ['JS'] })
})

// --- the ladder is real: stronger levels place better over seeded games -----------------

test('levels 1, 3 and 5 place in order against a fixed-level field', () => {
  // The shipped game runs every bot at ONE level, so skill must show against a fixed
  // field — the same metric as the simulation lab (docs/decomposition/bot-ladder-data.md).
  // Mixed-level tables are deliberately NOT asserted: cooperation trusts defender seats,
  // and a table full of never-denying level-3s punishes that trust; the lab records the
  // effect and the ledger earns trust back only from witnessed missed blocks.
  const levels = [1, 3, 5]
  const places = new Map([1, 2, 3, 5].map(l => [l, []]))
  const GAMES = 400
  for (let seed = 1; seed <= GAMES; seed++) {
    const game = new SkitgubbeGame({ players: 3, rules: DEFAULT_RULES, random: seeded(seed) })
    const mine = levels[seed % 3]
    const mySeat = seed % 3
    const levelAt = seat => seat === mySeat ? mine : 2
    for (let p = 0; p < 3; p++) prepareBot(game, p, levelAt(p))
    observeBot(game, game.getSnapshot(), game.getSnapshot(), game.takeEvents())
    let guard = 0
    while (game.getSnapshot().phase === 'playing') {
      const p = game.getSnapshot().current
      const prev = game.getSnapshot()
      const move = chooseMove(game, p, levelAt(p))
      assert.ok(applyMove(game, p, move))
      observeBot(game, prev, game.getSnapshot(), game.takeEvents())
      assert.ok(++guard < 4000, `seed ${seed} did not finish`)
    }
    game.getSnapshot().players.forEach((q, seat) => { places.get(levelAt(seat)).push(q.place) })
  }
  const avg = l => places.get(l).reduce((a, b) => a + b, 0) / places.get(l).length
  // Deterministic seeds, exact numbers. The fundamentals cliff (L1) is huge; the
  // refinement gap (L3→L5) is small per game but must never invert.
  assert.ok(avg(3) < avg(1) - 0.15, `sharp must crush by the book (3:${avg(3).toFixed(3)} vs 1:${avg(1).toFixed(3)})`)
  assert.ok(avg(5) < avg(1) - 0.15, `perfect human must crush by the book (5:${avg(5).toFixed(3)} vs 1:${avg(1).toFixed(3)})`)
  assert.ok(avg(5) <= avg(3) + 0.02, `perfect human must never trail sharp (5:${avg(5).toFixed(3)} vs 3:${avg(3).toFixed(3)})`)
  assert.ok(avg(5) <= avg(2) + 0.02, `perfect human must never trail solid (5:${avg(5).toFixed(3)} vs 2:${avg(2).toFixed(3)})`)
})

test('every level finishes legal games for every player count', () => {
  for (const level of [1, 2, 3, 4, 5]) {
    for (let seed = 1; seed <= 6; seed++) {
      const players = 2 + (seed % 3)
      const game = new SkitgubbeGame({ players, rules: DEFAULT_RULES, random: seeded(seed * 7 + level) })
      for (let p = 0; p < players; p++) prepareBot(game, p, level)
      const opening = game.getSnapshot()
      observeBot(game, opening, opening, game.takeEvents())
      let guard = 0
      while (game.getSnapshot().phase === 'playing') {
        step(game, level)
        assert.ok(++guard < 4000, `level ${level} seed ${seed} did not finish`)
      }
      assert.notEqual(game.getSnapshot().skitgubbe, null)
    }
  }
})
