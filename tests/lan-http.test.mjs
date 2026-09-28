import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { startLanHost } from '../server/http.ts'
import { netFetchTransport } from '../src/lan/transport.ts'
const nonce = n => n.toString(16).padStart(48, '0')
const assets = pathToFileURL(resolve('lan-dist') + '/')
test('real HTTP joins, privacy, reconnect, origins, and duplicate actions', async () => {
  const host = await startLanHost({ assets })
  try {
    const post = async (path, body, token, origin = host.origin) => {
      const response = await fetch(`${host.origin}/api/${path}`, {method:'POST',headers:{'Content-Type':'application/json',Origin:origin,...(token ? {Authorization:`Bearer ${token}`} : {})},body:JSON.stringify(body)})
      return {status:response.status,body:await response.json()}
    }
    assert.equal((await post('create',{name:'Alice',nonce:nonce(1)},null,'http://evil.example')).status,403)
    const a = (await post('create',{name:'Alice',nonce:nonce(1)})).body.token
    const lobby = (await post('state',{},a)).body
    assert.equal((await post('join',{name:'Bob',nonce:nonce(2),code:'bad'})).status,403)
    const b = (await post('join',{name:'Bob',nonce:nonce(2),code:lobby.code})).body.token
    const joined = (await post('state',{},a)).body
    assert.equal((await post('start',{revision:joined.revision},b)).status,403)
    let v = (await post('start',{revision:joined.revision},a)).body
    assert.equal(v.snapshot.players.length,2)
    const bView = (await post('state',{},b)).body
    assert.equal(bView.snapshot.players[0].name,'Bob')
    assert.ok(bView.snapshot.players[1].hand.every(c => c.hidden && !('rank' in c)))
    const params={revision:v.revision,requestId:nonce(3),action:{type:'ready'}}
    v=(await post('action',params,a)).body
    assert.equal((await post('action',params,a)).body.revision,v.revision)
    assert.equal((await post('action',{...params,requestId:nonce(4)},b)).status,409)
    assert.equal((await post('action',{revision:v.revision,requestId:nonce(5),action:{type:'ready'}},b)).body.snapshot.phase,'playing')
    assert.equal((await fetch(host.origin+'/../package.json')).status,404)
    assert.equal((await fetch(host.origin, {method:'OPTIONS'})).headers.get('access-control-allow-origin'),null)
    assert.equal((await post('state',{},'fake')).status,401)
    assert.equal((await post('leave',{},a)).status,200)
    assert.equal((await post('state',{},b)).body.closed,true)
  } finally { await host.close() }
})
test('SDK service and listener attestations preserve host-only creation', async () => {
  const host=await startLanHost({assets,agentCodeHost:true})
  try {
    const call=async headers => fetch(host.origin+'/api/create',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify({name:'Host',nonce:nonce(7)})})
    const guest=await call({'x-agent-code-transport':'lan','x-forwarded-for':'192.168.1.99','x-forwarded-host':'192.168.1.4:5193',Origin:'http://192.168.1.4:5193'})
    assert.equal(guest.status,403)
    assert.equal((await call({'x-agent-code-transport':'service'})).status,200)
  } finally {await host.close()}
})
test('brokered guest keeps POST, auth, body and dialed Origin through SDK seam', async () => {
  let actual
  const transport=netFetchTransport(async (url,init) => {actual={url,init};return {status:200,contentType:'application/json',body:'{"ok":true}'}},'http://192.168.1.5:5193/')
  const response=await transport({path:'/api/action',method:'POST',headers:{Authorization:'Bearer test'},body:'{"action":"ready"}'})
  assert.equal(actual.url,'http://192.168.1.5:5193/api/action')
  assert.equal(actual.init.httpMethod,'POST');assert.equal(actual.init.method,'POST')
  assert.equal(actual.init.body,'{"action":"ready"}')
  assert.deepEqual(actual.init.headers,[{name:'Authorization',value:'Bearer test'},{name:'Origin',value:'http://192.168.1.5:5193'}])
  assert.deepEqual(await response.json(),{ok:true})
})
