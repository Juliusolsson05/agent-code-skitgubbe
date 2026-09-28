import assert from 'node:assert/strict'
import { build } from 'esbuild'
import { mkdtemp, rm, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright'
const temp = await mkdtemp(join(tmpdir(),'sg-lan-browser-'))
await build({entryPoints:['server/http.ts'],bundle:true,platform:'node',format:'esm',outfile:join(temp,'http.mjs'),logLevel:'warning'})
const {startLanHost} = await import(pathToFileURL(join(temp,'http.mjs')).href)
const host = await startLanHost({assets:pathToFileURL(resolve('lan-dist')+'/')})
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || undefined,args:['--mute-audio']})
const errors=[]
const contexts=await Promise.all([0,1].map(()=>browser.newContext({viewport:{width:1440,height:1050},reducedMotion:'reduce'})))
const pages=await Promise.all(contexts.map(c=>c.newPage()))
const states=[null,null]
for(const [i,p] of pages.entries()) {
 p.on('pageerror',e=>errors.push(e.message))
 p.on('response',async r=>{if(r.url().includes('/api/') && r.ok()) {const v=await r.json().catch(()=>null);if(v?.snapshot) states[i]=v}})
 p.setDefaultTimeout(20000)
}
const settled=async p=>p.waitForFunction(()=>document.querySelector('.sg-root')?.getAttribute('aria-busy')==='false')
await mkdir('test-results',{recursive:true})
try {
 const [a,b]=pages
 await Promise.all(pages.map(p=>p.goto(host.origin)))
 await a.getByLabel('Your name').fill('Alice');await a.getByRole('button',{name:'Host a room',exact:true}).click()
 const share=await a.locator('.sg-share').innerText()
 const code=/Room ([A-F0-9]+)/.exec(share)[1]
 await b.getByLabel('Your name').fill('Bob');await b.getByLabel('Room code').fill(code);await b.getByRole('button',{name:'Join room',exact:true}).click()
 await a.getByText('Bob · Connected',{exact:true}).waitFor()
 await a.screenshot({path:'test-results/lan-lobby.png'})
 await a.getByRole('button',{name:'Deal cards',exact:true}).click()
 await Promise.all(pages.map(settled))
 for(const p of pages) {
   assert.equal(await p.locator('.sg-row').count(),3)
   assert.equal(await p.locator('.sg-row-down .sg-card').count(),3)
   assert.equal(await p.locator('.sg-row-down .sg-card.is-playable').count(),0)
 }
 assert.equal(states[0].snapshot.players[0].name,'Alice');assert.equal(states[1].snapshot.players[0].name,'Bob')
 for(const v of states) {
   assert.ok(v.snapshot.players[1].hand.every(c=>c.hidden && !('rank' in c)))
   assert.ok(v.snapshot.players.every(p=>p.down.every(c=>c.hidden && !('rank' in c))))
 }
 await a.screenshot({path:'test-results/lan-host.png'});await b.screenshot({path:'test-results/lan-guest.png'})
 // Reopening the browser page preserves the credential and own seat, not a second Bob.
 await b.reload();await settled(b)
 assert.equal(states[1].snapshot.players[0].name,'Bob')
 assert.equal(states[1].members.length,2)
 await b.getByRole('button',{name:'Step away',exact:true}).click()
 await b.getByRole('button',{name:'Resume game',exact:true}).waitFor()
 await a.getByText('Waiting for Bob to reconnect',{exact:true}).first().waitFor()
 await b.getByRole('button',{name:'Resume game',exact:true}).click()
 await Promise.all(pages.map(settled))
 await a.getByText('Connected',{exact:true}).waitFor()
 await Promise.all(pages.map(p=>p.getByRole('button',{name:'Ready to play',exact:true}).click()))
 await Promise.all(pages.map(p=>p.waitForFunction(()=>document.querySelector('.sg-root')?.dataset.phase==='playing')))
 let turns=0
 const deadline=Date.now()+600000
 while(!states.every(s=>s.snapshot.phase==='over')) {
   assert.ok(Date.now()<deadline,'LAN playthrough exceeded its ten-minute acceptance budget')
   const index=states.findIndex(s=>s?.snapshot.phase==='playing' && s.snapshot.current===0)
   if(index<0) {await a.waitForTimeout(50);continue}
   const p=pages[index]
   await settled(p)
   if(await p.locator('.sg-root').getAttribute('data-turn')!=='you') {await p.waitForTimeout(50);continue}
   const before=states[index].revision
   const cards=p.locator('.sg-card.is-playable')
   if(await cards.count()) {
     // Use the public controls. Random legal choices avoid an artificial
     // always-lowest pickup cycle; the host still validates every action.
     const at=turns%7===0 ? (await cards.count())-1 : 0
     const c=cards.nth(at)
     if(states[index].source==='down') await c.click()
     else {await c.click({modifiers:['Shift']});await p.getByRole('button',{name:/^Play( \d+ cards)?$/}).click()}
   } else if(await p.getByRole('button',{name:'Take the pile',exact:true}).isVisible()) await p.getByRole('button',{name:'Take the pile',exact:true}).click()
   else if(await p.getByRole('button',{name:'Pass',exact:true}).isVisible()) await p.getByRole('button',{name:'Pass',exact:true}).click()
   else throw new Error('No usable turn controls')
   await p.waitForFunction(()=>document.querySelector('.sg-root')?.getAttribute('aria-busy')==='false')
   const until=Date.now()+10000
   while(states[index].revision<=before && Date.now()<until) await p.waitForTimeout(30)
   assert.ok(states[index].revision>before,'action accepted')
   turns++
   if (turns % 20 === 0) console.log(`LAN progress: ${turns} actions`)
 }
 await Promise.all(pages.map(settled))
 assert.equal(states[0].snapshot.gameId,states[1].snapshot.gameId)
 await a.screenshot({path:'test-results/lan-result.png'})
 console.log(`PASS LAN full game: ${turns} human actions, separate seats, private payloads, refresh rejoin`)
 await a.getByRole('button',{name:'Play again',exact:true}).click()
 await Promise.all(pages.map(p=>p.waitForFunction(()=>document.querySelector('.sg-root')?.dataset.phase==='swap')))
 await a.getByRole('button',{name:'End room',exact:true}).click()
 await b.getByText('The host ended this room.',{exact:true}).waitFor()
 assert.deepEqual(errors,[])
 console.log('PASS host rematch, room closure, no browser exceptions')
} finally {await browser.close();await host.close();await rm(temp,{recursive:true,force:true})}
