import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SkitgubbeGame } from '../src/game/engine/game.ts'
import { DEFAULT_RULES } from '../src/game/engine/rules.ts'

const rules = patch => ({ ...DEFAULT_RULES, swapPhase: false, ...patch })
/** A two- or more-player game placed at an exact position with setup(). */
function at(state, patch = {}) {
  const game = new SkitgubbeGame({ players: state.players.length, rules: rules(patch) })
  game.setup(state)
  return game
}
const ids = cards => cards.map(c => c.id)
const total = snap => snap.players.reduce((n, p) => n + p.hand.length + p.up.length + p.down.length, 0) + snap.pile.length + snap.drawCount + snap.burnedCount
const events = (game, type) => game.takeEvents().filter(e => e.type === type)
// Opponent padding: cards that keep a seat in the game without mattering to the test.
const idle = { hand: ['KC', 'KD'], up: ['QC'], down: ['QD'] }

test('a fresh deal gives everyone 3 down, 3 up, 3 in hand; the lowest ordinary hand card starts', () => {
  let s = 1
  const random = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296 }
  const game = new SkitgubbeGame({ players: 4, random, rules: rules() })
  const snap = game.getSnapshot()
  for (const p of snap.players) assert.deepEqual([p.hand.length, p.up.length, p.down.length], [3, 3, 3])
  assert.equal(snap.drawCount, 52 - 36)
  const lowest = p => Math.min(...p.hand.filter(c => !['2', '5', '10'].includes(c.rank)).map(c => ({ J: 11, Q: 12, K: 13, A: 14 })[c.rank] ?? Number(c.rank)))
  const best = Math.min(...snap.players.map(lowest))
  assert.equal(snap.current, snap.players.findIndex(p => lowest(p) === best))
})

test('only the current player may act, and a play refills the hand from the draw pile', () => {
  const game = at({ players: [{ hand: ['4S', '6S', '6H'], down: ['3C'] }, idle], draw: ['9H', 'AH'] })
  assert.equal(game.play(1, ['KC']), false)
  assert.equal(game.play(0, ['4S']), true)
  const snap = game.getSnapshot()
  assert.deepEqual(ids(snap.players[0].hand), ['6S', '6H', '9H'], 'the next draw-pile card')
  assert.equal(snap.current, 1)
  assert.deepEqual(events(game, 'draw').map(e => e.count), [1])
})

test('several cards of one rank play together; mixed ranks and cards lower than the pile are refused', () => {
  const game = at({ players: [{ hand: ['6S', '6H', '4S', '9S'] }, idle], pile: ['5C', '7C'] }, { invisibleFive: false })
  assert.equal(game.play(0, ['6S', '4S']), false, 'one rank per play')
  assert.equal(game.play(0, ['6S', '6H']), false, 'a 6 does not beat the 7')
  assert.equal(game.play(0, ['9S']), true)
})

test('a 10 burns the pile and the burner starts the next one; with that rule off, play moves on', () => {
  const state = { players: [{ hand: ['10S', '4S'] }, idle], pile: ['JC', 'AC'], draw: [] }
  const again = at(state)
  again.play(0, ['10S'])
  assert.deepEqual(events(again, 'burn').map(e => [e.reason, e.count]), [['ten', 3]])
  assert.equal(again.getSnapshot().pile.length, 0)
  assert.equal(again.getSnapshot().current, 0)
  const moveOn = at(state, { burnPlaysAgain: false })
  moveOn.play(0, ['10S'])
  assert.equal(moveOn.getSnapshot().current, 1)
})

test('four of a kind burns even when the four were laid by different players', () => {
  const game = at({ players: [{ hand: ['8S', '8H', '3S'] }, { hand: ['8D', '8C', 'KC'] }], current: 1 })
  game.play(1, ['8D', '8C'])
  game.play(0, ['8S', '8H'])
  assert.deepEqual(events(game, 'burn').map(e => e.reason), ['four'])
  assert.equal(game.getSnapshot().current, 0)
})

test('the invisible 5: a king, then a 5, and the next player still has to beat the king', () => {
  const game = at({ players: [{ hand: ['5H', '3S'] }, { hand: ['9C', 'AS', 'KC'] }], pile: ['KD'] })
  assert.equal(game.play(0, ['5H']), true, 'a 5 goes on anything')
  assert.equal(game.play(1, ['9C']), false, 'the king still counts under the 5')
  assert.equal(game.play(1, ['AS']), true)
})

test('picking up takes the whole pile and the next player starts a fresh one', () => {
  const game = at({ players: [{ hand: ['4S'] }, idle], pile: ['9C', 'JC'] })
  assert.deepEqual(game.legalCardIds(0), [])
  assert.equal(game.pickUp(0), true)
  const snap = game.getSnapshot()
  assert.deepEqual(ids(snap.players[0].hand), ['4S', '9C', 'JC'])
  assert.equal(snap.pile.length, 0)
  assert.equal(snap.current, 1)
})

test('a chance card that fits is played; one that misses is taken up with the pile', () => {
  const miss = at({ players: [{ hand: ['4S'] }, idle], pile: ['JC'], draw: ['3C', '9H'] })
  assert.equal(miss.chance(0), true)
  assert.deepEqual(events(miss, 'chance').map(e => [e.card.id, e.ok]), [['3C', false]])
  assert.deepEqual(ids(miss.getSnapshot().players[0].hand), ['4S', 'JC', '3C'])
  assert.equal(miss.getSnapshot().current, 1)

  const hit = at({ players: [{ hand: ['4S'] }, idle], pile: ['JC'], draw: ['AC', '9H'] })
  hit.chance(0)
  assert.deepEqual(ids(hit.getSnapshot().pile), ['JC', 'AC'])
  assert.deepEqual(ids(hit.getSnapshot().players[0].hand), ['4S', '9H'], 'the hand refills after a hit')

  const off = at({ players: [{ hand: ['4S'] }, idle], pile: ['JC'], draw: ['AC'] }, { chanceCard: false })
  assert.equal(off.chance(0), false)
})

test('cards come from the hand, then the face-up cards, then the face-down cards', () => {
  const game = at({ players: [{ hand: ['4S'], up: ['6S'], down: ['9S'] }, { hand: ['3C', '3D', '3H'] }] })
  assert.equal(game.source(0), 'hand')
  assert.equal(game.play(0, ['6S']), false, 'face-up cards wait until the hand is empty')
  game.play(0, ['4S'])
  game.pickUp(1)
  assert.equal(game.source(0), 'up')
  game.play(0, ['6S'])
  game.pickUp(1)
  assert.equal(game.source(0), 'down')
  assert.deepEqual(game.legalCardIds(0), [], 'face-down cards are never chosen in advance')
})

test('a blind card that fits goes on the pile; one that does not comes back with the pile', () => {
  const fits = at({ players: [{ down: ['AS', '3S'] }, idle], pile: ['9C'] })
  fits.flip(0, 'AS')
  assert.deepEqual(ids(fits.getSnapshot().pile), ['9C', 'AS'])
  const misses = at({ players: [{ down: ['3S', 'AS'] }, idle], pile: ['9C'] })
  misses.flip(0, '3S')
  assert.deepEqual(events(misses, 'flip').map(e => e.ok), [false])
  assert.deepEqual(ids(misses.getSnapshot().players[0].hand), ['9C', '3S'])
  assert.deepEqual(ids(misses.getSnapshot().players[0].down), ['AS'])
})

test('no finishing on 2, 10 or ace: the last card is refused, and on an empty pile the player passes', () => {
  const state = { players: [{ up: ['AS'] }, idle], pile: ['9C'] }
  const strict = at(state, { noSpecialFinish: true })
  assert.deepEqual(strict.legalCardIds(0), [])
  assert.equal(strict.play(0, ['AS']), false)
  assert.equal(strict.pickUp(0), true, 'the only way on is to take the pile')

  const stuck = at({ players: [{ up: ['AS'] }, idle] }, { noSpecialFinish: true })
  assert.equal(stuck.canPass(0), true)
  assert.equal(stuck.pass(0), true)
  assert.equal(stuck.getSnapshot().current, 1)

  const pair = at({ players: [{ up: ['AS', 'AH'] }, idle], pile: ['9C'] }, { noSpecialFinish: true })
  assert.equal(pair.play(0, ['AS', 'AH']), false, 'both aces would be the last cards')
  assert.equal(pair.play(0, ['AS']), true, 'one ace leaves a card behind')

  const relaxed = at(state)
  assert.equal(relaxed.play(0, ['AS']), true, 'off by default')
})

test('going out records the place, and the last player holding cards is the skitgubbe', () => {
  const game = at({ players: [{ up: ['AS'] }, { hand: ['3C', '4C'] }, { hand: ['KC'] }], pile: ['9C'] })
  game.play(0, ['AS'])
  let snap = game.getSnapshot()
  assert.equal(snap.players[0].place, 1)
  assert.equal(snap.phase, 'playing')
  assert.equal(snap.current, 1, 'play skips finished players')
  game.pickUp(1)
  game.play(2, ['KC'])
  snap = game.getSnapshot()
  assert.equal(snap.phase, 'over')
  assert.equal(snap.skitgubbe, 1)
  assert.deepEqual(snap.players.map(p => p.place), [1, 3, 2])
  assert.deepEqual(events(game, 'over').map(e => e.skitgubbe), [1])
})

test('whole games always end with one skitgubbe and all 52 cards accounted for', () => {
  for (let seed = 1; seed <= 60; seed++) {
    let s = seed
    const random = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296 }
    const players = 2 + (seed % 3)
    const game = new SkitgubbeGame({ players, random, rules: rules({ noSpecialFinish: seed % 2 === 0 }) })
    let moves = 0
    while (game.getSnapshot().phase === 'playing' && moves++ < 5000) {
      const p = game.getSnapshot().current
      if (game.source(p) === 'down') game.flip(p, game.getSnapshot().players[p].down[0].id)
      else {
        const legal = game.legalCardIds(p)
        if (legal.length) game.play(p, [legal[0]])
        else if (!game.pickUp(p)) assert.ok(game.pass(p), 'a player with no move can always pass')
      }
      assert.equal(total(game.getSnapshot()), 52)
    }
    const snap = game.getSnapshot()
    assert.equal(snap.phase, 'over', `seed ${seed} finishes`)
    assert.equal(snap.players[snap.skitgubbe].place, players, 'the skitgubbe is last')
  }
})

test('the swap phase trades hand and face-up cards and play starts when everyone is ready', () => {
  const game = new SkitgubbeGame({ players: 2, rules: { ...DEFAULT_RULES } })
  const before = game.getSnapshot().players[0]
  assert.equal(game.getSnapshot().phase, 'swap')
  assert.equal(game.play(0, [before.hand[0].id]), false)
  assert.equal(game.swap(0, before.hand[0].id, before.up[0].id), true)
  const after = game.getSnapshot().players[0]
  assert.equal(after.hand[0].id, before.up[0].id)
  assert.equal(after.up[0].id, before.hand[0].id)
  assert.equal(game.swap(0, 'nope', before.up[1].id), false)
  game.ready(0)
  assert.equal(game.swap(0, after.hand[0].id, after.up[0].id), false, 'no swaps once ready')
  assert.equal(game.getSnapshot().phase, 'swap', 'waits for everyone')
  game.ready(1)
  assert.equal(game.getSnapshot().phase, 'playing')
})

test('snapshots are copies', () => {
  const game = at({ players: [{ hand: ['4S'] }, idle] })
  const snap = game.getSnapshot()
  snap.players[0].hand.pop()
  snap.pile.push({ id: 'AS', rank: 'A', suit: 'S' })
  assert.equal(game.getSnapshot().players[0].hand.length, 1)
  assert.equal(game.getSnapshot().pile.length, 0)
})
