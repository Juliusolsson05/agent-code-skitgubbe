import type { AgentStatusApi } from '../api'
import { agentPanelModel, type AgentPanelModel } from './agentStatus'

export type AgentPanelState = { kind: 'loading' } | { kind: 'failed' } | { kind: 'ready'; model: AgentPanelModel }

/**
 * Keep `onState` in step with the host's sessions: read now, and re-read on
 * every `subscribe` nudge. Returns a stop function.
 *
 * Outside React so it can be tested without a DOM (review of #7: the inline
 * version had no test, and a real freeze shipped in it).
 *
 * One read in flight. A nudge that lands mid-read marks it stale, and exactly
 * one more read follows. Reads are strictly sequential, so every answer is
 * newer than what is on screen and is painted. The first version skipped a
 * "stale" answer instead; with a round trip slower than the host's 120 ms
 * nudge window under steady workspace activity, NO answer was ever painted
 * and the panel sat on "Checking your agents…".
 *
 * A rejected read (the permission is missing, e.g. an install that predates
 * the manifest asking for it) reports `failed` and waits for the next nudge
 * rather than retrying in a loop against a broker that will keep refusing.
 */
export function watchSessions(sessions: AgentStatusApi, onState: (state: AgentPanelState) => void): () => void {
  let alive = true
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
          if (alive) onState({ kind: 'ready', model: agentPanelModel(snapshot) })
        } catch {
          if (alive) onState({ kind: 'failed' })
        }
      } while (alive && stale)
    } finally { reading = false }
  }
  void read()
  const unsubscribe = sessions.subscribe(() => { void read() })
  return () => { alive = false; unsubscribe() }
}
