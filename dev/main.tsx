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
  sessions: { async observe() { return [] }, subscribe: () => () => {} },
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
if (new URLSearchParams(location.search).get('build') === 'production') {
  const module = await import(/* @vite-ignore */ '/dist/view.js') as { default: ViewModule }
  dispose = module.default.mount(host, context)
} else {
  dispose = mountSkitgubbe(host, context)
}
window.addEventListener('beforeunload', () => dispose?.(), { once: true })
