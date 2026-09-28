import { useEffect, useRef, useState } from 'react'
import type { GameAudio } from '../game/audio'
import { DEFAULT_RULES, type Rules } from '../game/engine/rules'
import type { RoomView, Action } from './protocol'
import { brokeredGuestTransport, lanShareUrls, proxyTransport, SERVICE_ID, type LanTransport, type NetFetchInit } from './transport'
import { privateHostDestination } from './destination'
import { LanTable } from './LanTable'
import { RULE_ROWS } from '../game/Skitgubbe'
import styles from './lan.css?inline'

export type LanApi = {
  services?: {
    start(id: string): Promise<unknown>
    expose(id: string, lan: boolean): Promise<{ lan: boolean; port?: number }>
    invoke(id: string, name: string, params: Record<string, never>): Promise<unknown>
  }
  net?: { fetch(url: string, init?: NetFetchInit): Promise<{ status: number; contentType: string; body: string }> }
  storage?: { get<T>(key: string): Promise<T | undefined>; set(key: string, value: never): Promise<void> }
}
const randomId = () => [...crypto.getRandomValues(new Uint8Array(24))].map(n => n.toString(16).padStart(2, '0')).join('')
const browserTransport: LanTransport = async ({ path, method, headers, body }) => fetch(path, { method, headers, body, cache: 'no-store' })
type Seat = { token: string; destination: string; host: boolean; urls: string[] }
const SEAT_KEY = 'skitgubbe.lan-seat'

export function LanApp({ api, audio }: { api?: LanApi; audio: GameAudio }) {
  const [room, setRoom] = useState<RoomView | null>(null)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [connected, setConnected] = useState(false)
  const [working, setWorking] = useState(false)
  const [restoring, setRestoring] = useState(true)
  const [away, setAway] = useState(false)
  const awayRef = useRef(false)
  const [rules, setRules] = useState<Rules>({ ...DEFAULT_RULES })
  const seat = useRef<Seat | null>(null)
  const transport = useRef<LanTransport>(browserTransport)
  const revision = useRef(-1)
  const remoteRules = useRef('')
  const chain = useRef(Promise.resolve())
  const alive = useRef(true)
  const nonce = useRef('')
  if (!nonce.current) {
    try { nonce.current = sessionStorage.getItem('sg.lan-nonce') ?? randomId(); sessionStorage.setItem('sg.lan-nonce', nonce.current) }
    catch { nonce.current = randomId() }
  }

  const remember = async (value: Seat | null) => {
    seat.current = value
    try { value ? sessionStorage.setItem(SEAT_KEY, JSON.stringify(value)) : sessionStorage.removeItem(SEAT_KEY) } catch { /* tab may be storage-denied */ }
    // Host storage lets closing/reopening the command rejoin the same seat.
    // This credential stays on its own device and is never placed in a link.
    if (api?.storage) await api.storage.set(SEAT_KEY, value as never)
  }
  const post = async (path: string, data: object, token = seat.current?.token) => {
    const response = await transport.current({ path, method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(data) })
    const value = await response.json() as RoomView & { error?: string; token?: string }
    if (!response.ok) throw new Error(value.error ?? `Host returned ${response.status}.`)
    return value
  }
  // Polls and mutations share one queue, so a late poll cannot undo an action.
  // A transport failure retains the credential and seat, never creates a new room.
  const request = (path: string, data: object = {}): Promise<void> => {
    const credential = seat.current?.token
    const work = chain.current.then(async () => {
      const value = await post(path, { ...data, since: revision.current }, credential)
      // Forget/leave can happen while a failed connection is still returning.
      // A late response belongs to that old credential, never to the next lobby.
      if (!alive.current || credential !== seat.current?.token || awayRef.current) return
      if (value.revision >= revision.current) {
        revision.current = value.revision
        setRoom(value)
        const ruleKey = JSON.stringify(value.rules)
        if (remoteRules.current !== ruleKey) { remoteRules.current = ruleKey; setRules(value.rules) }
      }
      setConnected(true); setError('')
    }).catch(reason => {
      if (alive.current && credential === seat.current?.token && !awayRef.current) { setError(reason instanceof Error ? reason.message : String(reason)); setConnected(false) }
      throw reason
    })
    chain.current = work.catch(() => {})
    return work
  }
  const install = async (saved: Seat) => {
    if (!api) transport.current = browserTransport
    else if (saved.host) {
      if (!api.services) throw new Error('This Agent Code build does not support LAN services.')
      await api.services.start(SERVICE_ID)
      const exposure = await api.services.expose(SERVICE_ID, true)
      if (!exposure.lan || !exposure.port) throw new Error('LAN exposure was not granted.')
      saved.urls = lanShareUrls(await api.services.invoke(SERVICE_ID, 'status', {}), exposure.port)
      if (!saved.urls.length) throw new Error('No private network address found. Connect to your local Wi-Fi or Ethernet and try again.')
      transport.current = proxyTransport()
    } else {
      if (!api.net) throw new Error('This Agent Code build does not support LAN joining.')
      transport.current = brokeredGuestTransport(api.net, privateHostDestination(saved.destination))
    }
    seat.current = saved
  }

  useEffect(() => {
    alive.current = true
    void (async () => {
      try {
        let saved: Seat | null = null
        try { saved = JSON.parse(sessionStorage.getItem(SEAT_KEY) ?? 'null') } catch { /* no saved seat */ }
        if (!saved && api?.storage) saved = await api.storage.get<Seat>(SEAT_KEY) ?? null
        if (saved && typeof saved.token === 'string' && /^[a-f0-9]{48}$/.test(saved.token)) {
          await install(saved)
          await request('/api/state')
        }
      } catch (e) { if (alive.current) setError(e instanceof Error ? e.message : String(e)) }
      finally { if (alive.current) setRestoring(false) }
    })()
    let timer: ReturnType<typeof setTimeout>
    const poll = async () => {
      if (seat.current?.token && !awayRef.current) await request('/api/state').catch(() => {})
      if (alive.current) timer = setTimeout(poll, 700)
    }
    timer = setTimeout(poll, 700)
    return () => { alive.current = false; clearTimeout(timer) }
  }, [])

  const admit = async (host: boolean) => {
    if (working || !name.trim()) return
    setWorking(true); setError('')
    try {
      const next: Seat = { token: '', host, destination: host || !api ? '' : privateHostDestination(address), urls: !api ? [location.origin] : [] }
      await install(next)
      const value = await post(host ? '/api/create' : '/api/join', { name, nonce: nonce.current, ...(host ? {} : { code }) }, '')
      if (!value.token) throw new Error('Host did not return a seat.')
      next.token = value.token
      await remember(next)
      revision.current = -1
      await request('/api/state')
    } catch (e) { setError(e instanceof Error ? e.message : String(e)) }
    finally { setWorking(false) }
  }
  const action = async (action: Action) => { await request('/api/action', { revision: revision.current, requestId: randomId(), gameId: room?.snapshot?.gameId, action }) }
  const deal = async () => {
    setWorking(true)
    try { await request('/api/start', { revision: revision.current, rules }) }
    catch { /* request displays the error */ }
    finally { setWorking(false) }
  }
  const leave = async () => {
    setWorking(true)
    try {
      // Queue after any outstanding poll so it cannot repaint an ended room.
      await chain.current
      if (seat.current?.token && !room?.closed) await post('/api/leave', {})
      if (room?.snapshot && !room.isHost && !room.closed) {
        // The authority retains dealt seats. Deleting this credential here made
        // Leave permanently strand everyone: a fresh join cannot enter a dealt
        // room. Step away pauses polling but retains the one resumable identity.
        awayRef.current = true; setAway(true); setError(''); return
      }
      await remember(null)
      revision.current = -1; setRoom(null); setConnected(false); setError('')
      nonce.current = randomId()
      try { sessionStorage.setItem('sg.lan-nonce', nonce.current) } catch { /* optional */ }
    } catch (e) { setError(e instanceof Error ? e.message : String(e)) }
    finally { setWorking(false) }
  }
  const forget = async () => { await remember(null); awayRef.current = false; setAway(false); revision.current = -1; setRoom(null); setError('') }
  const share = room ? `${seat.current?.urls.join(' or ') || address || location.origin} · Room ${room.code}` : ''
  return <div className="sg-lan"><style>{styles}</style>
    {away ? <section className="sg-lobby"><h1>Your seat is waiting</h1><p>The table is paused while you’re away. Reopening this view also restores your seat.</p><button onClick={() => { awayRef.current = false; setAway(false); void request('/api/state').catch(() => {}) }}>Resume game</button></section> : room?.snapshot && !room.closed ? <>
      <div className="sg-lan-bar"><span>{room.isHost ? share : `Room ${room.code}`}</span>
        <span role="status">{error || (!connected ? 'Reconnecting…' : room.paused ? `Waiting for ${room.members.filter(m => !m.connected).map(m => m.name).join(', ')} to reconnect` : 'Connected')}</span>
        <button onClick={() => void leave()} disabled={working}>{room.isHost ? 'End room' : 'Step away'}</button>
        {!connected && <button onClick={() => void forget()}>Forget saved seat</button>}
      </div>
      <LanTable room={room} audio={audio} enabled={connected && !room.paused && !working} action={action} onAgain={deal} />
    </> : <section className="sg-lobby">
      <h1>Skitgubbe with friends</h1>
      {restoring ? <p>Restoring your seat…</p> : !room ? <>
        <p>Host a table, or join a friend on the same network.</p>
        <label>Your name<input autoComplete="nickname" maxLength={24} value={name} onChange={e => setName(e.target.value)} /></label>
        <button className="sg-primary" disabled={working || !name.trim()} onClick={() => void admit(true)}>Host a room</button>
        <div className="sg-join-fields">
          {api && <label>Host address<input placeholder="http://192.168.1.42:5193" value={address} onChange={e => setAddress(e.target.value)} /></label>}
          <label>Room code<input maxLength={8} value={code} onChange={e => setCode(e.target.value.toUpperCase())} /></label>
          <button disabled={working || !name.trim() || !code.trim()} onClick={() => void admit(false)}>Join room</button>
        </div>
        {seat.current?.token && <button onClick={() => void forget()}>Forget saved seat</button>}
      </> : room.closed ? <><p>The host ended this room.</p><button onClick={() => void leave()}>Back to rooms</button></> : <>
        <p className="sg-share">{room.isHost ? share : `Room ${room.code}`}</p>
        {room.isHost && seat.current?.urls.every(u => u.includes('127.0.0.1')) && <p>Friends use this computer’s private network address with the same port.</p>}
        <ol className="sg-members">{room.members.map((m, i) => <li key={i}>{m.name}{m.host ? ' · Host' : ''} · {m.connected ? 'Connected' : 'Reconnecting'}</li>)}</ol>
        <p>{room.isHost ? 'Deal when everyone has joined (2–4 players).' : 'Waiting for the host to deal.'}</p>
        {room.isHost && <details><summary>House rules</summary>{RULE_ROWS.map(row => <label className="sg-lan-rule" key={row.key}>
          <input type="checkbox" checked={rules[row.key]} onChange={e => setRules(r => ({ ...r, [row.key]: e.target.checked }))} /><span>{row.title}<small>{row.detail}</small></span>
        </label>)}</details>}
        {room.isHost && <button className="sg-primary" disabled={working || room.members.length < 2 || room.paused} onClick={() => void deal()}>Deal cards</button>}
        <button onClick={() => void leave()} disabled={working}>{room.isHost ? 'End room' : 'Leave room'}</button>
      </>}
      <p role="alert">{error}</p>
    </section>}
  </div>
}
