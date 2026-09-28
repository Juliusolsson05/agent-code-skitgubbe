import { defineService, runService } from 'agent-code-extension-api'
import { lanAddresses, startLanHost } from './http'
let host: Awaited<ReturnType<typeof startLanHost>> | null = null
// Only Agent Code owns LAN exposure. This child listens on an ephemeral
// loopback port; services.expose asks the host for the permission-gated listener.
runService(defineService({
  async start(context) {
    host = await startLanHost({ agentCodeHost: true })
    context.onRequest('status', () => ({ lanAddresses: lanAddresses() }))
    context.ready([{ name: 'http', port: Number(new URL(host!.origin).port) }])
  },
  async stop() { await host?.close(); host = null },
}))
