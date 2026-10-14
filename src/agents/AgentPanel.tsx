import { useEffect, useState } from 'react'

import type { AgentStatusApi } from '../api'
import { agentPanelModel, type AgentPanelModel } from './agentStatus'
import styles from './agents.css?inline'

type State = { kind: 'loading' } | { kind: 'failed' } | { kind: 'ready'; model: AgentPanelModel }

/**
 * The always-open column of Agent Code agents beside the table (#6).
 *
 * Read-only on purpose (owner decision, 2026-10-13): jumping to an agent would
 * need a host "focus session" API that does not exist yet, and a row that
 * looks clickable but is not is worse than a plain list. Nothing here is
 * focusable, so the game's window-level keyboard handlers (arrows, Space,
 * Enter) keep working while the panel updates.
 */
export function AgentPanel({ sessions }: { sessions?: AgentStatusApi }) {
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    if (!sessions) return
    let alive = true
    // One read in flight. A nudge that lands mid-read only marks the result
    // stale, and exactly one more read follows. The host already coalesces its
    // nudges, but observe() is a round trip through the frame broker, and an
    // answer that resolves after a newer one must never repaint over it.
    let reading = false
    let stale = false
    const read = async () => {
      if (reading) { stale = true; return }
      reading = true
      try {
        do {
          stale = false
          try {
            const snapshot = await sessions.observe()
            if (alive && !stale) setState({ kind: 'ready', model: agentPanelModel(snapshot) })
          } catch {
            // Rejected when the permission is missing, for example an install
            // that predates the manifest asking for it. Say so; do not retry in
            // a loop against a broker that will keep refusing.
            if (alive && !stale) setState({ kind: 'failed' })
          }
        } while (alive && stale)
      } finally { reading = false }
    }
    void read()
    const unsubscribe = sessions.subscribe(() => { void read() })
    return () => { alive = false; unsubscribe() }
  }, [sessions])

  // A plain browser guest in a LAN game has no Agent Code to ask.
  if (!sessions) return null

  const rows = state.kind === 'ready' ? state.model.rows : []
  const message =
    state.kind === 'loading' ? 'Checking your agents…'
      : state.kind === 'failed' ? 'Agent status is unavailable.'
        : !state.model.supported ? 'Update Agent Code to see your agents here.'
          : rows.length === 0 ? 'No agents are working or waiting for you.'
            : null

  return (
    <aside className="sg-agents" aria-label="Agent Code agents">
      <style>{styles}</style>
      <header className="sg-agents-head">
        <span>Agents</span>
        {rows.length > 0 && <span className="sg-agents-count">{rows.length}</span>}
      </header>
      {message
        ? <p className="sg-agents-empty">{message}</p>
        : (
          <ul className="sg-agents-list">
            {rows.map(row => (
              <li key={row.id} className={`sg-agent${row.notification?.kind === 'attention' ? ' is-attention' : ''}`}>
                <span className={`sg-agent-dot${row.working ? ' is-working' : ''}`} aria-hidden="true" />
                <span className="sg-agent-text">
                  <span className="sg-agent-title" title={row.title}>{row.title}</span>
                  <span className="sg-agent-meta">
                    {row.project}{row.project && row.working ? ' · ' : ''}{row.working ? 'working' : ''}
                  </span>
                </span>
                {row.notification && (
                  <span className={`sg-agent-badge is-${row.notification.kind}`}>{row.notification.label}</span>
                )}
              </li>
            ))}
          </ul>
        )}
    </aside>
  )
}
