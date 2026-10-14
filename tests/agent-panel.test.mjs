import { test } from 'node:test'
import assert from 'node:assert/strict'
import { agentPanelModel } from '../src/agents/agentStatus.ts'

// Rows shaped exactly like Agent Code's `sessions.observe()` output after
// Juliusolsson05/agent-code#1479 — the same fields and values its host test
// (src/renderer/src/apps/api/sessionStatus.renderer.test.ts) pins on the other
// side of the wire: activity 'working' | 'idle', notification { kind, label } | null.
const row = (id, patch) => ({ id, kind: 'claude', cwd: `/Users/me/work/${id}`, title: null, activity: 'idle', notification: null, ...patch })

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
  assert.equal(codex.project, 'acme')
  // Sessions from before kinds existed were all Claude.
  assert.equal(legacyClaude.title, 'Claude agent')
  assert.equal(legacyClaude.project, 'game')
})
