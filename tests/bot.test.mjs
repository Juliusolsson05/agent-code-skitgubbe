import { test } from 'node:test'
import assert from 'node:assert/strict'
import { applyMove, chooseMove, chooseSwaps, prepareBot } from '../src/game/bot.ts'
import { SkitgubbeGame } from '../src/game/engine/game.ts'
import { DEFAULT_RULES } from '../src/game/engine/rules.ts'

const seeded = seed => () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296 }

test('bots finish every game with only legal moves, for every player count and several rule sets', () => {
  const ruleSets = [
    DEFAULT_RULES,
    { ...DEFAULT_RULES, invisibleFive: false, twoResets: false, chanceCard: false },
    { ...DEFAULT_RULES, sevenOrLower: true, noSpecialFinish: true, burnPlaysAgain: false },
  ]
  for (const rules of ruleSets) {
    for (let seed = 1; seed <= 40; seed++) {
      const players = 2 + (seed % 3)
      const game = new SkitgubbeGame({ players, rules, random: seeded(seed) })
      for (let p = 0; p < players; p++) {
        prepareBot(game, p)
      }
      let moves = 0
      while (game.getSnapshot().phase === 'playing') {
        const p = game.getSnapshot().current
        const move = chooseMove(game, p)
        assert.ok(applyMove(game, p, move), `illegal bot move ${JSON.stringify(move)} (seed ${seed})`)
        assert.ok(++moves < 4000, `seed ${seed} did not finish`)
      }
      assert.notEqual(game.getSnapshot().skitgubbe, null)
    }
  }
})

test('a bot sheds its cheapest fitting card, all copies, and keeps its wild cards', () => {
  const game = new SkitgubbeGame({ players: 2, rules: { ...DEFAULT_RULES, swapPhase: false } })
  game.setup({ players: [{ hand: ['6S', '6H', '9C', '2D', '10D'] }, { hand: ['KC'] }], pile: ['4C'] })
  assert.deepEqual(chooseMove(game, 0), { type: 'play', ids: ['6S', '6H'] })
})

test('a bot uses a 10 to finish on the same turn, regardless of pile size', () => {
  const big = new SkitgubbeGame({ players: 2, rules: { ...DEFAULT_RULES, swapPhase: false } })
  big.setup({ players: [{ hand: ['10S', 'AS'] }, { hand: ['KC'] }], pile: ['3C', '4C', '6C', '7C', '8C', '9C'] })
  assert.deepEqual(chooseMove(big, 0), { type: 'play', ids: ['10S'] })
  const small = new SkitgubbeGame({ players: 2, rules: { ...DEFAULT_RULES, swapPhase: false } })
  small.setup({ players: [{ hand: ['10S', 'AS'] }, { hand: ['KC'] }], pile: ['9C'] })
  assert.deepEqual(chooseMove(small, 0), { type: 'play', ids: ['10S'] })
})

test('with nothing that fits, a bot tries a chance card before taking the pile', () => {
  const game = new SkitgubbeGame({ players: 2, rules: { ...DEFAULT_RULES, swapPhase: false } })
  game.setup({ players: [{ hand: ['3S'] }, { hand: ['KC'] }], pile: ['AC'], draw: ['4H'] })
  assert.deepEqual(chooseMove(game, 0), { type: 'chance' })
  const noChance = new SkitgubbeGame({ players: 2, rules: { ...DEFAULT_RULES, swapPhase: false, chanceCard: false } })
  noChance.setup({ players: [{ hand: ['3S'] }, { hand: ['KC'] }], pile: ['AC'], draw: ['4H'] })
  assert.deepEqual(chooseMove(noChance, 0), { type: 'pickup' })
})

test('the swap puts the strongest cards face up', () => {
  const game = new SkitgubbeGame({ players: 2, rules: DEFAULT_RULES, random: seeded(3) })
  for (const [h, u] of chooseSwaps(game, 1)) game.swap(1, h, u)
  const { hand, up } = game.getSnapshot().players[1]
  const strength = c => ({ '10': 30, '2': 29, '5': 20, J: 11, Q: 12, K: 13, A: 14 })[c.rank] ?? Number(c.rank)
  assert.ok(Math.min(...up.map(strength)) >= Math.max(...hand.map(strength)))
})

// Contract probes from the owner's 2 rule and the request for sensible human tactics.
test('a bot sees the 2 then low-card finish instead of giving away the turn', () => {
  const game = new SkitgubbeGame({ players: 2, rules: { ...DEFAULT_RULES, swapPhase: false } })
  game.setup({ players: [{ hand: ['3S', '2S'] }, { hand: ['KS'] }] })
  assert.deepEqual(chooseMove(game, 0), { type: 'play', ids: ['2S'] })
  applyMove(game, 0, chooseMove(game, 0))
  applyMove(game, 0, chooseMove(game, 0))
  assert.equal(game.getSnapshot().players[0].place, 1)
})

test('a bot blocks a visible final card instead of blindly shedding its lowest card', () => {
  const game = new SkitgubbeGame({ players: 2, rules: { ...DEFAULT_RULES, swapPhase: false } })
  game.setup({ players: [{ hand: ['4S', '9S', 'KS'], down: ['2S'] }, { up: ['6H'] }] })
  assert.deepEqual(chooseMove(game, 0), { type: 'play', ids: ['9S'] })
})

test('changing hidden ranks with the same public counts never changes the bot choice', () => {
  const game = new SkitgubbeGame({ players: 2, rules: { ...DEFAULT_RULES, swapPhase: false } })
  const choices = []
  for (const hidden of ['3H', 'AH', '10H']) {
    game.setup({ players: [{ hand: ['4S', '9S', 'KS'], down: [hidden] }, { hand: ['6H'] }] })
    choices.push(chooseMove(game, 0))
  }
  assert.deepEqual(choices[0], choices[1])
  assert.deepEqual(choices[1], choices[2])
})
