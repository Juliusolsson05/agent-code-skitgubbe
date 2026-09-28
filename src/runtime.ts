import { defineRuntime } from 'agent-code-extension-api'

// Skitgubbe has no background work: the game, its bots and its audio belong to the
// visible modal and must stop when it closes. API v2 still gives every view one
// managed runtime identity; an empty activation makes that ownership explicit
// instead of moving frame-bound animation into a hidden window.
export default defineRuntime({
  activate() {},
})
