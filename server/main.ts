import { startLanHost, lanAddresses } from './http'
const lan = process.argv.includes('--lan')
const host = await startLanHost({ lan, port: Number(process.env.SKITGUBBE_PORT ?? 5193) })
console.log(`Host Skitgubbe: ${host.origin}`)
if (lan) for (const address of lanAddresses()) console.log(`Friends join: http://${address}:${new URL(host.origin).port}`)
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.once(signal, () => { void host.close().then(() => process.exit(0)) })
