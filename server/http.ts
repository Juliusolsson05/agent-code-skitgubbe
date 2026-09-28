import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { readFile, readdir } from 'node:fs/promises'
import { networkInterfaces } from 'node:os'
import { Room, RoomError } from './room'
function fail(status: number, message: string): never { throw new RoomError(status, message) }
const isLoopback = (address?: string) => address === '127.0.0.1' || address === '::1' || address === '::ffff:127.0.0.1'
const privateV4 = (s: string) => /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(s)

/** The machine's private IPv4 LAN addresses — the only addresses a friend can
 *  dial. Shared by the standalone --lan bind list and the in-extension
 *  service's `status` answer: the sandboxed view cannot enumerate interfaces,
 *  so the service (a normal Node process) reports them for the share line. */
export const lanAddresses = (): string[] => Object.values(networkInterfaces()).flatMap(list =>
  (list ?? []).filter(i => i.family === 'IPv4' && !i.internal && privateV4(i.address)).map(i => i.address))

/** Host-set marker from Agent Code (src/main/extensions/serviceTransport.ts,
 *  TRANSPORT_ATTESTATION_HEADER): `service` = this extension's own frame via
 *  the service proxy; `lan` = a LAN peer via the host's net.listen listener. */
const TRANSPORT_HEADER = 'x-agent-code-transport'
/** A forwarded Host must be `a.b.c.d:port`, nothing else. */
const literalHost = /^(\d{1,3}(?:\.\d{1,3}){3}):(\d{1,5})$/

/** `via` names the path the request took: a direct socket, the host player's
 *  own frame through the Agent Code service proxy, or a LAN peer through the
 *  host's listener. */
type Caller = { peer: string | undefined; host: string | undefined; via: 'direct' | 'service' | 'lan' }

/**
 * Resolve WHO is asking before any rule runs. Every security rule below (peer,
 * Host, same-origin, loopback-only create) reads this, never the raw socket.
 *
 * Standalone website (the CLI, `agentCodeHost` off): the socket peer, the Host
 * header and the browser's Origin. Markers are never read, so those rules are
 * byte-for-byte what they were.
 *
 * Inside Agent Code (`agentCodeHost`, set only by server/service.ts) the server
 * binds loopback only, and every request arrives from the host app's main
 * process on 127.0.0.1. Taken at face value that would make every LAN guest
 * "local", free to take the host seat via /api/create. And the host player's
 * own frame, whose Origin never reaches us, could not create at all. The host
 * therefore marks each request (agent-code#1147):
 *
 * - `lan`: the forwarded peer and Host become the caller. This DOWNGRADES trust
 *   from loopback to "a LAN guest", and it wins over any other claim. The
 *   listener sets these values from its socket and request line and never
 *   copies a peer's own, so a guest can neither forge nor strip them. It is
 *   trusted ONLY with the raw Host the listener always dials with,
 *   `127.0.0.1:<our port>`. A DNS-rebound page (Host: evil.example:<port>) is
 *   same-origin with itself, so it could attach the marker without any
 *   preflight; without this rule its `lan` claim would skip the exact Host
 *   allow-list below.
 * - `service`: the host player's own frame. The host already checked the grant
 *   and the running service, and the frame's CSP is `connect-src 'self'`. The
 *   marker then stands in for the same-origin proof. A cross-origin page can't
 *   send it: a custom header needs a CORS preflight, and this server never
 *   answers one (OPTIONS is a 404 without CORS headers). NEVER add CORS here;
 *   doing so would make this marker forgeable by any website. A rebound page
 *   can send it, but its Host then fails the exact allow-list.
 *
 * Markers only count on a loopback socket. Agent Code's net.fetch refuses both
 * the marker headers and loopback service ports, so no other extension can
 * send them. Any LOCAL PROGRAM still can, including every extension's service
 * child, which is ordinary Node. Loopback callers are therefore local-user
 * trust, and that is all `service` or a loopback forwarded peer grants: a
 * same-machine client dialing the listener on 127.x arrives as a loopback
 * `lan` peer and may create, exactly like the host computer's own browser.
 */
function resolveCaller(request: IncomingMessage, agentCodeHost: boolean, ownHost: string): Caller {
  const socketPeer = request.socket.remoteAddress?.replace(/^::ffff:/, '')
  const marker = agentCodeHost && isLoopback(socketPeer) ? request.headers[TRANSPORT_HEADER] : undefined
  if (marker === 'lan') {
    if (request.headers.host !== ownHost) fail(403, 'Unrecognized host.')
    const peer = request.headers['x-forwarded-for']
    const host = request.headers['x-forwarded-host']
    // We don't know the listener's OS-chosen port or which interface the guest
    // dialed, so an exact Host allow-list (the standalone rule) is impossible.
    // A private or loopback IPv4 LITERAL is the DNS-rebinding defence for the
    // GUEST's browser instead: rebinding needs a hostname, and a hostname can
    // never match this. IPv6 guests are refused here and by the peer rule, as
    // on the standalone server: IPv4 only (the share line shows IPv4 too).
    const literal = typeof host === 'string' ? literalHost.exec(host) : null
    if (!literal || !(privateV4(literal[1]) || literal[1] === '127.0.0.1')) fail(403, 'Unrecognized host.')
    return { peer: typeof peer === 'string' ? peer.replace(/^::ffff:/, '') : undefined, host: host as string, via: 'lan' }
  }
  return { peer: socketPeer, host: request.headers.host, via: marker === 'service' ? 'service' : 'direct' }
}
function body(request: IncomingMessage, limit = 4096): Promise<unknown> {
  if (request.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') fail(415, 'Use application/json.')
  if (Number(request.headers['content-length'] ?? 0) > limit) { request.resume(); fail(413, 'Request is too large.') }
  return new Promise((resolve, reject) => {
    let size = 0, rejected = false
    const chunks: Buffer[] = []
    request.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > limit) { rejected = true; chunks.length = 0; reject(new RoomError(413, 'Request is too large.')); return }
      if (!rejected) chunks.push(chunk)
    })
    request.on('end', () => {
      if (rejected) return
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))) }
      catch { reject(new RoomError(400, 'Invalid JSON.')) }
    })
    request.on('error', () => reject(new RoomError(400, 'Request interrupted.')))
  })
}

export async function startLanHost(options: { port?: number; lan?: boolean; agentCodeHost?: boolean; assets?: URL } = {}) {
  const addresses = ['127.0.0.1', ...(options.lan ? lanAddresses() : [])]
  const built = options.assets ?? new URL('../lan-dist/', import.meta.url)
  // An explicit map of production assets is the complete file-serving surface.
  // Never resolve a request path against the repository or expose the Vite server.
  const assets = new Map<string, { bytes: Buffer; type: string }>()
  for (const file of await readdir(built)) {
    if (!/^(index\.html|[\w-]+\.(js|css))$/.test(file)) continue
    assets.set(file === 'index.html' ? '/' : `/${file}`, { bytes: await readFile(new URL(file, built)), type: file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'text/html' })
  }
  if (!assets.has('/')) throw new Error('Build the LAN website before hosting.')
  let room: Room | null = null, port = 0
  let tokens = 240, lastRate = Date.now(), admissions = 20, lastAdmission = Date.now()
  const rate = (admission: boolean) => {
    const now = Date.now()
    if (admission) {
      admissions = Math.min(20, admissions + (now - lastAdmission) / 3000); lastAdmission = now
      if (admissions < 1) fail(429, 'Too many join attempts. Try again shortly.')
      admissions--
    } else {
      tokens = Math.min(240, tokens + (now - lastRate) / 40); lastRate = now
      if (tokens < 1) fail(429, 'Too many requests. Try again shortly.')
      tokens--
    }
  }
  const send = (response: ServerResponse, status: number, value: unknown) => {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify(value))
  }
  const server = createServer(async (request, response) => {
    response.setHeader('Cache-Control', 'no-store')
    response.setHeader('X-Content-Type-Options', 'nosniff')
    response.setHeader('Referrer-Policy', 'no-referrer')
    response.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'")
    try {
      const caller = resolveCaller(request, !!options.agentCodeHost, `127.0.0.1:${port}`)
      if (!isLoopback(caller.peer) && (!caller.peer || !privateV4(caller.peer))) fail(403, 'Private-network peers only.')
      if (!caller.host || caller.via !== 'lan' && !addresses.some(a => caller.host === `${a}:${port}`)) fail(403, 'Unrecognized host.')
      if (caller.via !== 'service') {
        const origin = `http://${caller.host}`
        if (request.headers.origin && request.headers.origin !== origin || request.headers['sec-fetch-site'] === 'cross-site') fail(403, 'Foreign origin rejected.')
        if (request.method === 'POST' && request.headers.origin !== origin) fail(403, 'Same-origin request required.')
      }
      rate(false)
      const route = request.url ?? ''
      if (request.method === 'GET' && assets.has(route)) {
        const asset = assets.get(route)!
        response.setHeader('Content-Type', `${asset.type}; charset=utf-8`)
        response.end(asset.bytes); return
      }
      if (request.method !== 'POST' || !['/api/create','/api/join','/api/state','/api/start','/api/action','/api/leave'].includes(route)) fail(404, 'Not found.')
      const value = await body(request)
      if (!value || typeof value !== 'object' || Array.isArray(value)) fail(400, 'Invalid request.')
      const input = value as Record<string, unknown>
      if (route === '/api/create') {
        rate(true)
        if (!isLoopback(caller.peer)) fail(403, 'Create the room on the host computer.')
        if (room && !room.closed) {
          if (room.members[0]!.nonce !== input.nonce) fail(409, 'A room is already open. Rejoin or end it first.')
        } else room = new Room(input.name as string, input.nonce as string)
        send(response, 200, { token: room.members[0]!.token }); return
      }
      if (route === '/api/join') {
        rate(true)
        if (!room || room.closed) fail(410, 'No room is open on this computer.')
        if (typeof input.code !== 'string' || input.code.trim().toUpperCase() !== room.code) fail(403, 'Room code does not match.')
        send(response, 200, { token: room.join(input.name as string, input.nonce as string) }); return
      }
      if (!room) fail(410, 'The host has closed this room.')
      const header = request.headers.authorization
      const seat = room.authenticate(typeof header === 'string' && header.startsWith('Bearer ') ? header.slice(7) : '')
      const since = typeof input.since === 'number' && Number.isSafeInteger(input.since) ? input.since : -1
      if (route === '/api/start') room.start(seat, input.revision as number, input.rules)
      if (route === '/api/action') room.act(seat, input.revision as number, input.requestId as string, input.action as never, input.gameId as number)
      if (route === '/api/leave') {
        room.leave(seat); send(response, 200, { left: true }); return
      }
      send(response, 200, room.view(seat, since))
    } catch (error) {
      send(response, error instanceof RoomError ? error.status : 500, { error: error instanceof RoomError ? error.message : 'The host could not process this request.' })
    }
  })
  server.requestTimeout = 10000
  server.headersTimeout = 10000
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(options.port ?? 0, options.lan ? '0.0.0.0' : '127.0.0.1', resolve)
  })
  port = (server.address() as { port: number }).port
  return { origin: `http://127.0.0.1:${port}`, close: () => new Promise<void>((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve()); server.closeAllConnections()
  }) }
}
