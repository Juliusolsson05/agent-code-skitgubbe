import { useEffect, useState } from 'react'

import type { AgentStatusApi } from '../api'
import { watchSessions, type AgentPanelState } from './watchSessions'
import styles from './agents.css?inline'

/**
 * The always-open column of Agent Code agents beside the table (#6).
 *
 * Read-only on purpose (owner decision, 2026-10-13): jumping to an agent would
 * need a host "focus session" API that does not exist yet, and a row that
 * looks clickable but is not is worse than a plain list. The rows are not
 * focusable and clicking the column does not take focus, so the game's
 * window-level keys keep working. One exception, deliberately kept: once the
 * list overflows, Chromium makes the scroller itself a Tab stop so a keyboard
 * player can scroll it; while it has focus the game ignores keys, which is
 * the game's own "focus elsewhere is left alone" rule.
 */
export function AgentPanel({ sessions }: { sessions?: AgentStatusApi }) {
  const [state, setState] = useState<AgentPanelState>({ kind: 'loading' })

  useEffect(() => {
    if (!sessions) return
    return watchSessions(sessions, setState)
  }, [sessions])

  // A plain browser guest in a LAN game has no Agent Code to ask.
  if (!sessions) return null

  const rows = state.kind === 'ready' ? state.model.rows : []
  const attention = rows.filter(row => row.notification?.kind === 'attention').length
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
        {/* Polite live region on the count only: announcing every row change
            beside a card game would be noise, but "an agent now needs you" is
            the reason the column exists, so the attention count is spoken. */}
        <span className="sg-agents-count" aria-live="polite" hidden={rows.length === 0}
          aria-label={attention ? `${attention} need${attention === 1 ? 's' : ''} you` : `${rows.length} active`}>
          {rows.length}
        </span>
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
                  <span className="sg-agent-meta" title={row.project}>
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
