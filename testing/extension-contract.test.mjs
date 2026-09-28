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
  assert.deepEqual(manifest.contributes.commands.map(c => c.id), ['skitgubbe.play'])
  assert.deepEqual(manifest.contributes.views, [{ id: 'skitgubbe.play', title: 'Skitgubbe', mount: 'modal', entry: 'dist/view.js' }])
  assert.deepEqual(manifest.activationEvents, ['onView:skitgubbe.play'])
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
