import assert from 'node:assert/strict'
import { access, readFile, readdir, stat } from 'node:fs/promises'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

const manifest = JSON.parse(await readFile(new URL('../agent-code.extension.json', import.meta.url), 'utf8'))

test('the launch command opens exactly the host-routed modal view', () => {
  // A command without a same-id view, or a view without its onView activation,
  // installs fine and then does nothing when the player runs "Play Skitgubbe".
  assert.equal(manifest.apiVersion, 2)
  assert.equal(manifest.entry, 'dist/runtime.js')
  assert.deepEqual(manifest.contributes.commands.map(c => c.title), ['Play Skitgubbe', 'Play Skitgubbe with Friends'])
  for (const command of manifest.contributes.commands) {
    const view = manifest.contributes.views.find(v => v.id === command.id)
    assert.equal(view?.mount, 'modal')
    assert.ok(manifest.activationEvents.includes(`onView:${command.id}`))
  }
  assert.deepEqual(manifest.permissions, ['service.run','service.transport','net.listen','net.connect'])
  assert.equal(manifest.contributes.services[0].id, 'skitgubbe.lan-host')
})

test('ships importable runtime and bounded view artifacts for source installation', async () => {
  const runtime = new URL(`../${manifest.entry}`, import.meta.url)
  const view = new URL(`../${manifest.contributes.views[0].entry}`, import.meta.url)
  await Promise.all([access(runtime), access(view)])
  assert.equal(typeof (await import(pathToFileURL(fileURLToPath(runtime)).href)).default.activate, 'function')
  assert.equal(typeof (await import(pathToFileURL(fileURLToPath(view)).href)).default.mount, 'function')
  // The installer caps EVERY file, including shared chunks no manifest entry names,
  // so walk dist the way it does. three.js makes the view large.
  const dist = new URL('../dist/', import.meta.url)
  for (const entry of await readdir(dist, { withFileTypes: true })) {
    if (!entry.isFile()) continue
    assert.ok((await stat(new URL(entry.name, dist))).size < 16 * 1024 * 1024, `${entry.name} exceeds the host file limit`)
  }
})

test('friend view and bundled service speak the SDK ready/request/shutdown contract', async () => {
  const { EventEmitter } = await import('node:events')
  const view = manifest.contributes.views.find(v => v.id === 'skitgubbe.friends')
  assert.equal(typeof (await import(new URL(`../${view.entry}`, import.meta.url))).default.mount, 'function')
  const port = new EventEmitter()
  const messages = []
  port.postMessage = message => { messages.push(message); port.emit('outgoing', message) }
  const wait = predicate => new Promise((resolve, reject) => {
    const prior = messages.find(predicate)
    if (prior) return resolve(prior)
    const timer = setTimeout(() => reject(new Error('Service did not answer SDK message')), 5000)
    const listener = message => { if (predicate(message)) { clearTimeout(timer); port.off('outgoing', listener); resolve(message) } }
    port.on('outgoing', listener)
  })
  // Contract probe: SDK uses Electron's process.parentPort. The bundle itself
  // runs unchanged, opens its real loopback HTTP endpoint, and acknowledges stop.
  process.parentPort = port
  await import(new URL(`../${manifest.contributes.services[0].entry}`, import.meta.url))
  try {
    const ready = await wait(m => m.kind === 'ready')
    const response = await fetch(`http://127.0.0.1:${ready.endpoints[0].port}/`)
    assert.equal(response.status, 200)
    assert.match(await response.text(), /Skitgubbe with friends/)
    port.emit('message', { data: { kind: 'request', id: 'status-1', name: 'status', params: {} } })
    const result = await wait(m => m.kind === 'result' && m.id === 'status-1')
    assert.equal(result.ok, true)
    assert.ok(Array.isArray(result.value.lanAddresses))
  } finally {
    port.emit('message', { data: { kind: 'shutdown', id: 'stop-1' } })
    await wait(m => m.kind === 'stopped' && m.id === 'stop-1')
    delete process.parentPort
  }
})
