import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Room } from '../server/room.ts'
const nonce = n => n.toString(16).padStart(48, '0')
// Contract probes against actual shuffled deals, not snapshots invented to
// agree with the projection. Each owner supplies the oracle for their hand.
test('real four-seat deal rotates ownership and keeps every hidden rank off the wire', () => {
  const room = new Room('Host', nonce(1))
  const tokens = [room.members[0].token, ...[2,3,4].map(n => room.join(`Friend ${n}`, nonce(n)))]
  room.start(0, room.revision, undefined)
  const views = tokens.map(t => room.view(room.authenticate(t)))
  for (let seat = 0; seat < 4; seat++) {
    const v = views[seat]
    assert.equal(v.snapshot.players[0].name, room.members[seat].name)
    const ids = v.snapshot.players.flatMap(p => [...p.hand, ...p.up, ...p.down].map(c => c.id))
    assert.equal(new Set(ids).size, 36)
    for (const [at, p] of v.snapshot.players.entries()) {
      for (const card of [...p.down, ...(at ? p.hand : [])]) assert.deepEqual(Object.keys(card).sort(), ['hidden','id'])
      assert.ok(p.up.every(c => c.rank && /^[a-f0-9]{48}$/.test(c.id)))
    }
    const owner = views[(seat + 1) % 4].snapshot.players[0].hand
    assert.deepEqual(v.snapshot.players[1].hand.map(c => c.id), owner.map(c => c.id))
    assert.ok(!JSON.stringify(v).includes('token'))
  }
})
test('real actions bind authenticated ownership, reject stale input, and deduplicate retries', () => {
  const room = new Room('Host', nonce(1)); room.join('Friend', nonce(2)); room.start(0, room.revision, undefined)
  const host = room.view(0), guest = room.view(1)
  assert.throws(() => room.act(1, room.revision, nonce(3), {type:'swap',hand:host.snapshot.players[0].hand[0].id,up:guest.snapshot.players[0].up[0].id}), /not legal/)
  room.act(0, room.revision, nonce(4), {type:'ready'})
  const revision = room.revision
  room.act(0, revision - 1, nonce(4), {type:'ready'})
  assert.equal(room.revision, revision)
  assert.throws(() => room.act(1, revision - 1, nonce(5), {type:'ready'}), /changed/)
  room.act(1, revision, nonce(6), {type:'ready'})
  assert.equal(room.view(0).snapshot.phase, 'playing')
  const turn = room.view(0).snapshot.current, v = room.view(turn)
  room.act(turn, room.revision, nonce(7), {type:'play',cards:[v.legal[0]]})
  const response = room.view(turn, revision)
  assert.equal(response.transitions.length, 2)
  assert.ok(response.transitions.at(-1).events.some(e => e.type === 'play'))
  assert.throws(() => room.start(1, room.revision, undefined), /host/)
})
test('absence pauses turns, credentials reconnect the same seat, host alone ends room', () => {
  let now = 1000
  const room = new Room('Host', nonce(1), () => now); const token = room.join('Friend', nonce(2))
  room.start(0, room.revision, undefined)
  now += 16000
  room.authenticate(room.members[0].token)
  assert.equal(room.view(0).paused, true)
  assert.throws(() => room.act(0, room.revision, nonce(8), {type:'ready'}), /reconnect/)
  assert.equal(room.authenticate(token), 1)
  assert.equal(room.view(0).paused, false)
  room.leave(0)
  assert.equal(room.view(1).closed, true)
})

test('simultaneous ready from two browsers commutes only within the same deal', () => {
  const room = new Room('Host',nonce(1));room.join('Friend',nonce(2));room.start(0,room.revision,undefined)
  const initial=room.view(0)
  room.act(0,initial.revision,nonce(10),{type:'ready'},initial.snapshot.gameId)
  assert.throws(()=>room.act(1,initial.revision,nonce(11),{type:'ready'},initial.snapshot.gameId-1),/changed/)
  room.act(1,initial.revision,nonce(11),{type:'ready'},initial.snapshot.gameId)
  assert.equal(room.view(0).snapshot.phase,'playing')
})
