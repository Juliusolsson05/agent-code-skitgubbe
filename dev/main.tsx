import type { AgentCodeApiV1, JsonValue, ViewContext, ViewModule } from 'agent-code-extension-api'

import { mountSkitgubbe } from '../src/view/mount'

// Dev harness: browser-only, NOT shipped. `npm run dev:web` mounts the real view against
// a stubbed host so the table can be iterated on with hot reload instead of rebuilding
// and reinstalling into Agent Code. Storage is localStorage under its own namespace, so
// settings and records survive a reload the way they do in the app.
// `?build=production` mounts the committed dist/view.js instead of the sources.

const NS = 'skitgubbe-dev:'

const api: AgentCodeApiV1 = {
  extension: { id: 'skitgubbe', apiVersion: 1 },
  storage: {
    async get<T extends JsonValue>(key: string): Promise<T | undefined> {
      const raw = localStorage.getItem(NS + key)
      return raw == null ? undefined : (JSON.parse(raw) as T)
    },
    async set(key: string, value: JsonValue): Promise<void> { localStorage.setItem(NS + key, JSON.stringify(value)) },
    async delete(key: string): Promise<void> { localStorage.removeItem(NS + key) },
    async keys(): Promise<string[]> { return Object.keys(localStorage).filter(k => k.startsWith(NS)).map(k => k.slice(NS.length)) },
  },
  ui: { async close() { console.log('[dev] ui.close()') }, async showToast(message: string) { console.log('[dev] toast:', message) } },
  theme: { async tokens() { return {} } },
  workspace: { async observe() { return { activeTabId: null, tabIds: [], sessionCount: 0 } }, subscribe: () => () => {} },
  // `?agents=demo` fills the agent column with rows shaped like Agent Code's
  // real sessions.observe() output (activity + Dispatch badge), and flips one
  // agent between working and finished every few seconds so the live update
  // path runs too. `?agents=legacy` mimics a host older than SDK 0.11.0.
  sessions: {
    async observe() {
      const mode = new URLSearchParams(location.search).get('agents')
      if (mode === 'legacy') return [{ id: 'old', kind: 'claude', cwd: '/Users/me/work/api', title: 'Old host agent' }]
      if (mode !== 'demo') return []
      const flip = Math.floor(Date.now() / 4000) % 2 === 0
      return [
        { id: 'a', kind: 'claude', cwd: '/Users/me/work/agent-code', title: 'Fix the reconnect race', activity: 'working', notification: { kind: 'attention', label: 'ACTION' } },
        { id: 'b', kind: 'codex', cwd: '/Users/me/work/landing', title: 'Rewrite pricing copy', activity: 'idle', notification: { kind: 'output', label: 'NEW' } },
        { id: 'c', kind: 'opencode', cwd: '/Users/me/work/skitgubbe', title: 'Tune level 5 bots', activity: flip ? 'working' : 'idle', notification: flip ? null : { kind: 'output', label: 'NEW' } },
        { id: 'd', kind: 'claude', cwd: '/Users/me/work/infra', title: null, activity: 'working', notification: null },
        { id: 'e', kind: 'terminal', cwd: '/Users/me/work/infra', title: 'zsh', activity: 'working', notification: null },
        { id: 'f', kind: 'claude', cwd: '/Users/me/work/docs', title: 'Quiet agent', activity: 'idle', notification: null },
      ]
    },
    subscribe(listener) {
      if (new URLSearchParams(location.search).get('agents') !== 'demo') return () => {}
      const timer = setInterval(listener, 4000)
      return () => clearInterval(timer)
    },
  },
  panes: { async observe() { return [] }, subscribe: () => () => {} },
}

const context: ViewContext = {
  api: {
    ...api,
    extension: { id: 'skitgubbe', apiVersion: 2 },
    // The game never touches project files; rejecting stubs keep the harness honest.
    files: {
      readText: async () => { throw new Error('Project files are unavailable in the browser harness') },
      writeText: async () => { throw new Error('Project files are unavailable in the browser harness') },
    },
  },
  view: { id: 'skitgubbe.play', instanceId: 'browser-development-view' },
  runtime: { state: () => undefined, request: async () => undefined, subscribe: () => () => {} },
}

const host = document.getElementById('app')
if (!host) throw new Error('dev harness: #app root missing')
let dispose: (() => void) | void
if (new URLSearchParams(location.search).get('view') === 'friends') {
  // The Friends modal as Agent Code mounts it (lobby + agent column). Without
  // services/net in this stub, Host/Join report that the build lacks them —
  // this is for looking at the layout, not for playing a LAN game.
  const module = await import('../src/lanView') as { default: ViewModule }
  dispose = module.default.mount(host, context)
} else if (new URLSearchParams(location.search).get('build') === 'production') {
  const module = await import(/* @vite-ignore */ '/dist/view.js') as { default: ViewModule }
  dispose = module.default.mount(host, context)
} else {
  dispose = mountSkitgubbe(host, context)
}
window.addEventListener('beforeunload', () => dispose?.(), { once: true })
