import { test } from 'node:test'
import assert from 'node:assert/strict'
import { agentPanelModel } from '../src/agents/agentStatus.ts'

// Rows shaped exactly like Agent Code's `sessions.observe()` output after
// Juliusolsson05/agent-code#1479 — the same fields and values its host test
// (src/renderer/src/apps/api/sessionStatus.renderer.test.ts) pins on the other
// side of the wire: activity 'working' | 'idle', notification { kind, label } | null.
const row = (id, patch) => ({ id, kind: 'claude', cwd: `/Users/me/work/${id}`, title: null, activity: 'idle', notification: null, ...patch })

test('attention outranks unseen output even when its title sorts later', () => {
  // Review (sg-a): the first ordering test's attention row also sorted first
  // by title, so ranking attention and output equally survived.
  const model = agentPanelModel([
    row('new', { title: 'Alpha', notification: { kind: 'output', label: 'NEW' } }),
    row('ask', { title: 'Zulu', notification: { kind: 'attention', label: 'QUESTION' } }),
    row('busy', { title: 'Aardvark', activity: 'working' }),
  ])
  assert.deepEqual(model.rows.map(r => r.id), ['ask', 'new', 'busy'])
})

test('lists working and notified agents, most urgent first', () => {
  const model = agentPanelModel([
    row('quiet'),
    row('busy', { title: 'Refactor parser', activity: 'working' }),
    row('done', { kind: 'codex', title: 'Write tests', notification: { kind: 'output', label: 'NEW' } }),
    row('blocked', { title: 'Deploy', activity: 'working', notification: { kind: 'attention', label: 'ACTION' } }),
  ])
  assert.equal(model.supported, true)
  // Attention outranks unseen output, which outranks plain working: the panel
  // is read in a glance between turns, so what needs the player goes on top.
  assert.deepEqual(model.rows.map(r => r.id), ['blocked', 'done', 'busy'])
  assert.deepEqual(model.rows[0], {
    id: 'blocked', title: 'Deploy', project: 'blocked', working: true,
    notification: { kind: 'attention', label: 'ACTION' },
  })
})

test('leaves out shells and extension panes, even when Dispatch badges them', () => {
  const model = agentPanelModel([
    row('shell', { kind: 'terminal', activity: 'working', notification: { kind: 'output', label: 'NEW' } }),
    row('pane', { kind: 'extension-view', notification: { kind: 'output', label: 'NEW' } }),
    row('agent', { kind: 'opencode', activity: 'working' }),
  ])
  assert.deepEqual(model.rows.map(r => r.id), ['agent'])
})

test('an older Agent Code is reported as unsupported, not as "nothing to show"', () => {
  // Pre-0.11.0 hosts send identity only. An empty list here would tell the
  // player no agent needs them when the host simply cannot say.
  const legacy = [{ id: 'a', kind: 'claude', cwd: '/x', title: 'Old host' }]
  assert.deepEqual(agentPanelModel(legacy), { supported: false, rows: [] })
  assert.deepEqual(agentPanelModel([]), { supported: true, rows: [] })
})

test('a malformed row is skipped instead of blanking the panel', () => {
  const model = agentPanelModel([
    null, 'nonsense', { activity: 'working' },
    row('odd-badge', { notification: { kind: 'shiny', label: 'NEW' } }),
    row('ok', { activity: 'working' }),
  ])
  assert.deepEqual(model.rows.map(r => r.id), ['ok'])
  assert.deepEqual(agentPanelModel(undefined), { supported: true, rows: [] })
})

test('names an untitled agent after its provider and its project after the last folder', () => {
  const { rows } = agentPanelModel([
    row('c', { kind: 'codex', cwd: '/Users/me/clients/acme/', activity: 'working' }),
    row('l', { kind: null, cwd: 'C:\\code\\game', activity: 'working' }),
  ])
  const codex = rows.find(r => r.id === 'c')
  const legacyClaude = rows.find(r => r.id === 'l')
  assert.equal(codex.title, 'Codex agent')
  // The host's provider name, not the capitalised id.
  assert.equal(agentPanelModel([row('o', { kind: 'opencode', title: null, activity: 'working' })]).rows[0].title, 'OpenCode agent')
  assert.equal(codex.project, 'acme')
  // Sessions from before kinds existed were all Claude.
  assert.equal(legacyClaude.title, 'Claude agent')
  assert.equal(legacyClaude.project, 'game')
})

// ── watchSessions: the read loop behind the panel ─────────────────────────────
import { watchSessions } from '../src/agents/watchSessions.ts'

const tick = ms => new Promise(resolve => setTimeout(resolve, ms))

// A host stub with a controllable round trip and nudge source. `version`
// changes on every nudge, like real status flips, so a painted answer can be
// matched to the moment it was read.
function fakeHost({ latencyMs }) {
  let version = 0
  const listeners = new Set()
  return {
    sessions: {
      async observe() {
        const seen = version
        await tick(latencyMs)
        return [row(`v${seen}`, { activity: 'working' })]
      },
      subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) },
    },
    nudge() { version += 1; for (const l of listeners) l() },
    get listeners() { return listeners.size },
    get version() { return version },
  }
}

test('keeps painting while nudges arrive faster than a read completes', async () => {
  // Review of #7 (sg-a): with reads slower than the nudge interval, the first
  // version discarded every answer as stale and the panel never left
  // "Checking your agents…". Reads 30 ms, nudges every 10 ms for 150 ms.
  const host = fakeHost({ latencyMs: 30 })
  const states = []
  const stop = watchSessions(host.sessions, state => states.push(state))
  for (let i = 0; i < 15; i++) { await tick(10); host.nudge() }
  await tick(100)
  stop()
  const painted = states.filter(s => s.kind === 'ready')
  assert.ok(painted.length >= 3, `painted ${painted.length} times`)
  // The last paint reflects the last nudge: the trailing re-read happened.
  assert.equal(painted.at(-1).model.rows[0].id, `v${host.version}`)
})

test('never paints after stop, and unsubscribes', async () => {
  const host = fakeHost({ latencyMs: 20 })
  const states = []
  const stop = watchSessions(host.sessions, state => states.push(state))
  assert.equal(host.listeners, 1)
  stop()
  assert.equal(host.listeners, 0)
  await tick(40)
  assert.deepEqual(states, [])
})

test('a refused read reports failed and recovers on the next nudge', async () => {
  let refuse = true
  const listeners = new Set()
  const sessions = {
    async observe() { if (refuse) throw new Error('not granted'); return [row('a', { activity: 'working' })] },
    subscribe(l) { listeners.add(l); return () => listeners.delete(l) },
  }
  const states = []
  const stop = watchSessions(sessions, state => states.push(state))
  await tick(0)
  assert.deepEqual(states.map(s => s.kind), ['failed'])
  refuse = false
  for (const l of listeners) l()
  await tick(0)
  assert.deepEqual(states.map(s => s.kind), ['failed', 'ready'])
  stop()
})

test('a nudge during a read triggers exactly one more read, which is painted', async () => {
  // Without the trailing re-read, the change behind a mid-read nudge would
  // only appear at the NEXT nudge, which may never come while play goes on.
  const host = fakeHost({ latencyMs: 30 })
  const states = []
  const stop = watchSessions(host.sessions, state => states.push(state))
  await tick(10)
  host.nudge()   // lands while the first read (v0) is in flight
  host.nudge()   // a second one in the same read collapses into one re-read
  await tick(100)
  stop()
  assert.deepEqual(states.map(s => s.model.rows[0].id), ['v0', 'v2'])
})
