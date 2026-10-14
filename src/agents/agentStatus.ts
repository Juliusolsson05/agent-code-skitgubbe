import type { ExtensionSessionNotification } from 'agent-code-extension-api'

/** One line in the agent panel. */
export type AgentRow = {
  id: string
  title: string
  /** Last folder of the session's cwd: enough to tell two projects apart at a glance. */
  project: string
  working: boolean
  notification: ExtensionSessionNotification | null
}

export type AgentPanelModel = {
  /**
   * False when the host is older than the agent status fields (SDK 0.11.0).
   * The panel must then SAY so: rendering such a host's rows as an empty list
   * would tell the player "no agent needs you" when the truth is "this Agent
   * Code cannot tell".
   */
  supported: boolean
  rows: AgentRow[]
}

// Session kinds that are not agents. Dispatch badges shell terminals too (a
// command finished), but beside a card table that is noise: the owner asked
// for agents. An extension pane (kind `extension-view`) is not an agent either,
// and this very panel may be running inside one.
//
// A DENY list on purpose, and the host warns against exactly this shape
// (providerKind.ts: "use isAgentSessionKind, never kind !== 'terminal'"): the
// next non-agent kind the host adds would show here as "<Kind> agent". The
// alternative, an allow list of today's providers (claude, codex, opencode,
// grok, pi), fails the other way: a NEW provider's agents silently vanish
// from the panel. An extension cannot import the host's list, and a stray
// row is visible and harmless where a missing agent is not, so deny wins.
// Verified against the host on 2026-10-13: the only non-agent kinds are these.
const NOT_AGENTS = new Set(['terminal', 'extension-view'])

// The host's display names for its providers (agent-code
// src/providers/*/renderer/identity.ts `shortLabel`, the word Dispatch's
// agent badge shows), so an untitled row reads "OpenCode agent", not
// "Opencode agent". Unknown kinds fall back to a capitalised id.
const PROVIDER_NAMES: Record<string, string> = {
  claude: 'Claude', codex: 'Codex', opencode: 'OpenCode', grok: 'Grok', pi: 'Pi',
}

// Attention first: it is the only state where an agent is blocked on the
// player. Unseen output next, working last; within a group, by title so the
// list does not reshuffle every time a nudge re-reads it.
const rank = (row: AgentRow) =>
  row.notification?.kind === 'attention' ? 0 : row.notification ? 1 : 2

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

function readNotification(value: unknown): ExtensionSessionNotification | null {
  if (!isRecord(value)) return null
  if (value.kind !== 'output' && value.kind !== 'attention') return null
  if (typeof value.label !== 'string' || !value.label.trim()) return null
  // Dispatch's words are short (NEW, ACTION, QUESTION); a cap keeps a
  // surprising future label from pushing the title out of a 232px column.
  return { kind: value.kind, label: value.label.trim().slice(0, 12) }
}

const providerName = (kind: string | null) =>
  // A null kind is a pre-kind session, and those were all Claude (the host's
  // Dispatch badge makes the same call).
  !kind ? 'Claude' : PROVIDER_NAMES[kind] ?? kind.charAt(0).toUpperCase() + kind.slice(1)

function projectOf(cwd: unknown): string {
  if (typeof cwd !== 'string') return ''
  const parts = cwd.split(/[\\/]+/).filter(Boolean)
  return parts[parts.length - 1] ?? cwd
}

/**
 * Turn `api.sessions.observe()` into the panel's rows.
 *
 * Takes `unknown` on purpose: the value crossed a frame boundary as JSON, and
 * an older or future host may send rows this build has never seen. A row that
 * does not parse is skipped instead of throwing, so one odd session cannot
 * blank the whole panel.
 */
export function agentPanelModel(snapshot: unknown): AgentPanelModel {
  const sessions = Array.isArray(snapshot) ? snapshot.filter(isRecord) : []
  // Detect support on ALL sessions, not just agents: a host that reports
  // status sends it on every row, so one shell is enough to know.
  const supported = sessions.length === 0 || sessions.some(s => typeof s.activity === 'string')
  if (!supported) return { supported, rows: [] }

  const rows: AgentRow[] = []
  for (const session of sessions) {
    if (typeof session.id !== 'string') continue
    const kind = typeof session.kind === 'string' ? session.kind : null
    if (kind && NOT_AGENTS.has(kind)) continue
    const working = session.activity === 'working'
    const notification = readNotification(session.notification)
    if (!working && !notification) continue
    const title = typeof session.title === 'string' && session.title.trim()
      ? session.title.trim()
      : `${providerName(kind)} agent`
    rows.push({ id: session.id, title, project: projectOf(session.cwd), working, notification })
  }
  rows.sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title) || a.id.localeCompare(b.id))
  return { supported, rows }
}
