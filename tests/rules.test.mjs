import { test } from 'node:test'
import assert from 'node:assert/strict'
import { burnReason, canPlayOn, DEFAULT_RULES, effectiveTop, parseRules } from '../src/game/engine/rules.ts'

// Cards by rank only: legality never depends on suit, so the suit is fixed.
const pile = (...ranks) => ranks.map((rank, i) => ({ id: `${rank}-${i}`, rank, suit: 'S' }))
const rules = patch => ({ ...DEFAULT_RULES, ...patch })

test('the invisible 5 goes on anything and the next card is judged against what lies under it', () => {
  // The owner's own example: a king on the board, a 5 on it, the next player plays on the king.
  const kingThenFive = pile('K', '5')
  assert.equal(canPlayOn('5', pile('K'), DEFAULT_RULES), true, 'a 5 can be laid on a king')
  assert.equal(effectiveTop(kingThenFive, DEFAULT_RULES), 'K')
  assert.equal(canPlayOn('9', kingThenFive, DEFAULT_RULES), false, 'a 9 does not beat the king under the 5')
  assert.equal(canPlayOn('A', kingThenFive, DEFAULT_RULES), true)
  // Stacked fives stay transparent all the way down; a pile of only fives is open.
  assert.equal(effectiveTop(pile('Q', '5', '5'), DEFAULT_RULES), 'Q')
  assert.equal(canPlayOn('3', pile('5', '5'), DEFAULT_RULES), true)
})

test('with the invisible 5 turned off, 5 is an ordinary card', () => {
  const off = rules({ invisibleFive: false })
  assert.equal(canPlayOn('5', pile('K'), off), false)
  assert.equal(effectiveTop(pile('K', '5'), off), '5')
  assert.equal(canPlayOn('6', pile('K', '5'), off), true)
})

test('2 resets and 10 burns only when their rules are on', () => {
  assert.equal(canPlayOn('2', pile('A'), DEFAULT_RULES), true)
  assert.equal(canPlayOn('3', pile('A', '2'), DEFAULT_RULES), true, 'anything goes on a 2')
  assert.equal(canPlayOn('10', pile('A'), DEFAULT_RULES), true)
  const plain = rules({ twoResets: false, tenBurns: false })
  assert.equal(canPlayOn('2', pile('3'), plain), false, 'without the rule 2 is the lowest card')
  assert.equal(canPlayOn('10', pile('J'), plain), false)
  assert.equal(canPlayOn('J', pile('10'), plain), true)
})

test('7 or lower forces a 7 or lower, but wild cards still go on it', () => {
  const seven = rules({ sevenOrLower: true })
  assert.equal(canPlayOn('8', pile('7'), seven), false)
  assert.equal(canPlayOn('7', pile('7'), seven), true)
  assert.equal(canPlayOn('3', pile('7'), seven), true)
  assert.equal(canPlayOn('10', pile('7'), seven), true)
  assert.equal(canPlayOn('3', pile('7'), DEFAULT_RULES), false, 'off by default')
  // An invisible 5 on a 7 keeps the 7 in force.
  assert.equal(canPlayOn('8', pile('7', '5'), seven), false)
})

test('a 10 burns, and four of a kind on top burns across plays, including four fives', () => {
  assert.equal(burnReason(pile('3', '10'), DEFAULT_RULES), 'ten')
  assert.equal(burnReason(pile('9', '9', '9', '9'), DEFAULT_RULES), 'four')
  assert.equal(burnReason(pile('9', '9', '5', '9'), DEFAULT_RULES), null, 'a see-through 5 breaks the four')
  assert.equal(burnReason(pile('5', '5', '5', '5'), DEFAULT_RULES), 'four')
  assert.equal(burnReason(pile('9', '9', '9', '9'), rules({ fourBurns: false })), null)
  assert.equal(burnReason(pile('10'), rules({ tenBurns: false })), null)
})

test('stored rules keep valid booleans and default everything else', () => {
  assert.deepEqual(parseRules(null), DEFAULT_RULES)
  const parsed = parseRules({ invisibleFive: false, tenBurns: 'yes', unknown: true })
  assert.equal(parsed.invisibleFive, false)
  assert.equal(parsed.tenBurns, true)
  assert.equal('unknown' in parsed, false)
})
