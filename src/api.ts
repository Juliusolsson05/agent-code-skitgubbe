import type { AgentCodeApiV1 } from 'agent-code-extension-api'

// The game only persists settings, stats and the mute choice. Naming that narrow
// dependency (the same one Mini Games uses) keeps the UI compatible with both the
// frozen v1 view API and the v2 view context. Widening it is a real host-power
// decision, not a side effect of adding a feature.
export type SkitgubbeApi = Pick<AgentCodeApiV1, 'storage'>
