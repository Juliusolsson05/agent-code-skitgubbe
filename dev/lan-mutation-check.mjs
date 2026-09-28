import { build } from 'esbuild'
import { readFile, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
const dir=await mkdtemp(join(tmpdir(),'sg-lan-mutations-'))
try {
 for(const [name,from,to] of [
  ['hidden-hand-leak','owner === seat ? p.hand.map(this.card) : p.hand.map(hidden)','p.hand.map(this.card)'],
  ['simultaneous-ready','revision !== this.revision && !readySameDeal','revision !== this.revision'],
 ]) {
  const out=join(dir,name+'.mjs')
  await build({entryPoints:['tests/lan-room.test.mjs'],outfile:out,bundle:true,platform:'node',format:'esm',logLevel:'silent',plugins:[{name:'isolate-mutation',setup(b){b.onLoad({filter:/server\/room\.ts$/},async args=>({contents:(await readFile(args.path,'utf8')).replace(from,to),loader:'ts'}))}}]})
  const result=spawnSync(process.execPath,['--test',out],{encoding:'utf8'})
  if(result.status===0)throw new Error(`${name} mutation survived`)
  console.log(`PASS regression guard kills ${name} mutation`)
 }
}finally{await rm(dir,{recursive:true,force:true})}
