import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { createServer } from 'vite'
import { chromium } from 'playwright'

// Real controls and rendering: the rules suite cannot catch keyboard focus leaving the
// hand or a turn beginning while the scene is still busy. Use an isolated browser and
// server so verification never changes the player's saved settings in the live preview.
const server = await createServer({ configFile: 'vite.dev.config.ts', cacheDir: 'node_modules/.vite-browser-check', server: { host: '127.0.0.1', port: 0, open: false } })
await server.listen()
const base = server.resolvedUrls.local[0]
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || undefined, args: ['--mute-audio'] })
const context = await browser.newContext({ viewport: { width: 1440, height: 1050 }, reducedMotion: 'reduce' })
const page = await context.newPage()
page.setDefaultTimeout(30000)
// Observe the actual scene entry point without exposing a test API in the product.
// Saved four-player settings previously produced two opening deals (3, then 4).
await page.addInitScript(() => { window.openingDeals = []; window.receipts = [] })
await page.route('**/src/game/scene/index.ts*', async route => {
  const response = await route.fetch()
  const body = (await response.text()).replace('async newGame(next, self) {',
    'async newGame(next, self) { window.openingDeals.push(next.players.length);')
  await route.fulfill({ response, body })
})
// Exact opening setup from the owner's hand-8/table-8 example. Inject only the
// constructor input in this browser; the engine, controls and animation run unchanged.
await page.route('**/src/game/engine/game.ts*', async route => {
  const response = await route.fetch()
  const prefix = ['3S','3H','4S','4H','5S','5H','8S','9S','6S','6H','7S','7H','8H','9H','JS','JH','QS','QH','KS']
  const injected = `constructor(options = {}) { if (location.search.includes('stack-fixture')) {
    const ids = ${JSON.stringify(prefix)};
    options = { ...options, deck: [...ids.map(id => newDeck().find(c => c.id === id)), ...newDeck().filter(c => !ids.includes(c.id))] };
  }`
  let body = (await response.text()).replace('constructor(options = {}) {', injected)
  body = body.replace('if (!this.rules.swapPhase) this.startPlay();', `if (!this.rules.swapPhase) this.startPlay();
    if (location.search.includes('large-hand')) { const ids = newDeck().map(c=>c.id); this.setup({players:[{hand:ids.slice(0,40)},{hand:ids.slice(40)}]}); }
    if (location.search.includes('blind-receipt')) this.setup({players:[{down:['3S']},{hand:['AS']}],pile:['KH']});`)
  await route.fulfill({ response, body })
})
await page.route('**/src/game/Skitgubbe.tsx*', async route => {
  const response = await route.fetch()
  await route.fulfill({ response, body: (await response.text()).replace(/receive: async \((\w+), (\w+)\) => \{/, (_, cards, source) => `receive: async (${cards}, ${source}) => { window.receipts.push({ids:${cards}.map(c=>c.id),source:${source}});`) })
})
const errors = []
page.on('pageerror', e => errors.push(e.message))
await mkdir('test-results', { recursive: true })
const settled = () => page.waitForFunction(() => document.querySelector('.sg-root')?.getAttribute('aria-busy') === 'false')
const shot = name => page.locator('.sg-root').screenshot({ path: `test-results/${name}.png`, animations: 'disabled' })

try {
  await page.goto(`${base}dev/`)
  await settled()
  // All table sizes, including the owner's four-player screenshot. Check labels stay
  // within the stage and do not overlap each other; screenshots verify the 3D cards.
  for (const players of [2, 3, 4]) {
    await page.evaluate(n => localStorage.setItem('skitgubbe-dev:skitgubbe.settings', JSON.stringify({ players: n })), players)
    await page.reload()
    await settled()
    assert.equal(await page.locator('.sg-seat').count(), players - 1)
    assert.deepEqual(await page.evaluate(() => window.openingDeals), [players], 'one opening deal using saved settings')
    const boxes = await page.locator('.sg-seat').evaluateAll(els => els.map(el => {
      const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right, bottom: r.bottom }
    }))
    const stage = await page.locator('.sg-table').boundingBox()
    for (const a of boxes) {
      assert.ok(a.x >= stage.x && a.right <= stage.x + stage.width && a.y >= stage.y && a.bottom <= stage.y + stage.height, 'seat plate stays inside table')
      for (const b of boxes) if (a !== b) assert.ok(a.right <= b.x || b.right <= a.x || a.bottom <= b.y || b.bottom <= a.y, 'seat plates do not overlap')
    }
    assert.equal(await page.locator('.sg-hand .sg-card').count(), 9)
    assert.equal(await page.locator('.sg-row').count(), 3)
    assert.equal(await page.locator('.sg-row-down .sg-card.is-playable').count(), 0)
    await shot(`table-${players}-players`)
  }
  const batches = await page.locator('.sg-row').evaluateAll(els => els.map(el => {const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top}}))
  assert.ok(batches[0].right <= batches[1].left && batches[1].right <= batches[2].left)
  assert.ok(batches.every(b=>b.top===batches[0].top))
  console.log('PASS layout: 2–4 players, labels contained and separate')

  await page.evaluate(() => localStorage.setItem('skitgubbe-dev:skitgubbe.settings', JSON.stringify({ players: 2 })))
  for (const order of [['8H', '8S'], ['8S', '8H']]) {
    await page.goto(`${base}dev/?stack-fixture`)
    await settled()
    const drawCount = () => page.locator('.sg-stack-count').first().innerText().then(text => Number.parseInt(text))
    const before = await drawCount()
    for (const id of order) await page.locator(`.sg-hand [data-card="${id}"]`).click()
    await settled()
    assert.equal(await page.locator('.sg-row-up .sg-card').count(), 4)
    assert.equal(await page.locator('.sg-row-hand .sg-card').count(), 3)
    assert.equal(await drawCount(), before - 1)
    await shot('setup-stack')
  }
  console.log('PASS setup stack: either click order, one replacement card')

  await page.goto(`${base}dev/?large-hand`)
  await settled()
  assert.equal(await page.locator('.sg-card').count(), 40)
  assert.equal(await page.locator('.sg-row-hand .sg-fan').getAttribute('data-rows'), '4')
  const layers = await page.locator('.sg-fan-slot').evaluateAll(els => [...new Set(els.map(el=>el.getBoundingClientRect().top))])
  assert.equal(layers.length, 4, '40-card pickup uses four exposed layers beside table batches')
  await page.locator('.sg-card').first().focus(); await page.keyboard.press('End')
  const reachable = await page.locator('.sg-card').last().evaluate(el => {
    const r=el.getBoundingClientRect(); const target=document.elementFromPoint(r.x+12,r.y+12)
    return el.contains(target)
  })
  assert.ok(reachable, 'last card is visible and clickable without horizontal scrolling')
  await shot('large-hand')
  await page.goto(`${base}dev/?blind-receipt`)
  await settled()
  await page.evaluate(()=>{window.receipts=[]})
  await page.getByRole('option',{name:'Face-down card 1',exact:true}).click()
  await settled()
  const receipts=await page.evaluate(()=>window.receipts)
  assert.deepEqual(receipts,[{ids:['KH','3S'],source:'pile'}], 'failed blind card arrives exactly once, from the pile')
  console.log('PASS large-hand layers and failed-blind single receipt')
  await page.evaluate(() => localStorage.setItem('skitgubbe-dev:skitgubbe.settings', JSON.stringify({ players: 4 })))
  await page.goto(`${base}dev/`)
  await settled()

  // A swap through the real card controls, then play the whole game with keys. Home
  // starts each scan: repeatedly pressing Right at the last card cannot reach an
  // earlier legal card (the old probe incorrectly called that a game stall).
  console.log('BEGIN full keyboard game')
  const firstHand = page.locator('.sg-hand .sg-card').first()
  await firstHand.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await settled()
  await page.getByRole('button', { name: 'Start the game', exact: true }).click()
  console.log('STARTED full keyboard game')
  let turns = 0
  const deadline = Date.now() + 180000
  while (await page.locator('.sg-root').getAttribute('data-phase') !== 'over') {
    assert.ok(Date.now() < deadline, 'game completes without stalling')
    await settled()
    if (await page.locator('.sg-root').getAttribute('data-turn') !== 'you') {
      await page.waitForTimeout(100)
      continue
    }
    const playable = await page.locator('.sg-hand .sg-card.is-playable').count()
    if (playable) {
      await page.keyboard.press('Home')
      const count = await page.locator('.sg-hand .sg-card').count()
      for (let i = 0; i < count; i++) {
        if (await page.evaluate(() => document.activeElement?.classList.contains('is-playable'))) break
        await page.keyboard.press('ArrowRight')
      }
      await page.keyboard.press('Enter')
    } else await page.keyboard.press('t')
    turns++
    if (turns % 10 === 0) console.log(`Solo progress: ${turns} human turns`)
    await settled()
    if (turns === 5) await shot('playing')
  }
  await settled()
  await shot('result')
  assert.ok(turns > 0)
  assert.match(await page.locator('.sg-record').innerText(), /of 1/)
  console.log(`PASS complete game: ${turns} human turns by keyboard, bots and result`)

  // Rules and records survive a reload. Escape closes the dialog and restores focus.
  await page.getByRole('button', { name: 'House rules', exact: true }).click()
  await page.getByLabel(/Invisible 5/).uncheck()
  await page.keyboard.press('Escape')
  assert.equal(await page.getByRole('dialog', { name: 'House rules', exact: true }).count(), 0)
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'House rules')
  await page.reload()
  await settled()
  await page.getByRole('button', { name: 'House rules', exact: true }).click()
  assert.equal(await page.getByLabel(/Invisible 5/).isChecked(), false)
  await shot('settings')
  await page.keyboard.press('Escape')
  await page.evaluate(() => { const input = document.createElement('input'); input.id = 'host-input'; document.body.append(input); input.focus() })
  await page.keyboard.type('t')
  assert.equal(await page.locator('#host-input').inputValue(), 't')
  console.log('PASS settings, persistence, focus restoration and host input isolation')

  await page.goto(`${base}dev/?build=production`)
  await settled()
  await shot('production')
  assert.deepEqual(errors, [])
  console.log('PASS production bundle and no page errors')
} catch (error) {
  // Report BEFORE cleanup: a stuck browser/optimizer must not hide the original
  // failure behind an indefinitely running GitHub step.
  console.error(error)
  process.exitCode = 1
} finally {
  const close = Promise.allSettled([context.close(), browser.close(), server.close()])
  const timer = setTimeout(() => {
    console.error('Browser acceptance cleanup exceeded 15 seconds')
    process.exit(1)
  }, 15000)
  await close
  clearTimeout(timer)
}

