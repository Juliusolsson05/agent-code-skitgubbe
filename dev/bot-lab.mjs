// The bot laboratory runner: bundles the TS engine with esbuild (the repo has no tsx
// dependency; dev/test.mjs uses the same trick) and executes the lab body.
//
//   npm run bench:bots            # full run (~3k games, seconds on a laptop)
//   npm run bench:bots -- 800     # smaller deterministic run
import { build } from 'esbuild'
import { readFile, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const source = await readFile(new URL('./bot-lab-run.mjs', import.meta.url), 'utf8')
const temp = await mkdtemp(join(tmpdir(), 'sg-bot-lab-'))
try {
  await build({
    stdin: { contents: source, resolveDir: new URL('.', import.meta.url).pathname, loader: 'ts' },
    bundle: true, platform: 'node', format: 'esm', target: 'node22',
    outfile: join(temp, 'bot-lab.mjs'), logLevel: 'warning',
  })
  const { run } = await import(pathToFileURL(join(temp, 'bot-lab.mjs')).href)
  await run(process.argv.slice(2))
} finally { await rm(temp, { recursive: true, force: true }) }
