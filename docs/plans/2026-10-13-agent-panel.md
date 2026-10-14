# Skitgubbe: keep your Agent Code agents in view while you play

Fixes #6. Status: approved 2026-10-13 (owner: "all defaults", full build). Merge needs explicit approval.
Branch `feat/agent-panel` · Worktree `../agent-code-skitgubbe-agent-panel` · Base `origin/main` @ `d6590f4`.

The cross-repo contract (host projection, SDK fields, rulings on permissions) is
designed in agent-code `docs/plans/2026-10-13-extension-agent-status.md`
(Juliusolsson05/agent-code#1480, Juliusolsson05/agent-code-extension-api#8). This file
covers only the Skitgubbe side, so the two plans cannot disagree on the contract.

## Outcome

Both modals (**Play Skitgubbe**, **Play Skitgubbe with Friends**) show an always-open
panel to the right of the table. It lists every agent that is working or has a
notification: title, project folder, and the badge word Dispatch shows (NEW, ACTION,
QUESTION, ERROR …). It updates live and is read-only.

## Evidence (verified, do not re-derive)

- Host rows (SDK 0.11.0): `{ id, kind, cwd, title, activity?, notification? }`;
  `activity` is `'working' | 'idle'`, `notification` is `{ kind: 'output' | 'attention', label } | null`.
  Older hosts omit both fields. `sessions.subscribe` fires on status changes, coalesced.
- `kind` values: provider ids (`claude`, `codex`, `opencode`, `grok`, `pi`, …),
  `terminal`, `extension-view`, or null for pre-kind sessions (which were Claude).
- The solo root `.sg-root` is a fixed 1240px; `.sg-frame` hugs it (`width: max-content`)
  and the host sizes the modal from it, scaling it down to 90% of the window when wider.
- `src/api.ts` narrows the game to `Pick<AgentCodeApiV1, 'storage'>` on purpose.
- The LAN page is also served to plain browsers (`src/lan/browser.tsx`, no `api`).
- The test runner bundles `tests/*.test.mjs` with esbuild, so tests import TS directly.
- The browser check screenshots `.sg-root`, so a sibling panel does not change its images.

## Design

- `src/agents/agentStatus.ts` (pure, no DOM): `agentPanelModel(snapshot: unknown): { supported, rows }`.
  - Accepts the untyped wire value and ignores malformed rows: it crosses a frame boundary.
  - Agents only. `terminal` and `extension-view` are dropped (ruling in the host plan).
  - Keeps rows that are working or have a notification. Order: attention, then output,
    then working only, then by title.
  - `supported` is false when there are sessions but none carries `activity`, meaning the
    host is older than the feature. An empty list is supported.
  - Title falls back to "<Provider> agent"; project is the last segment of `cwd`.
- `src/agents/AgentPanel.tsx`: reads `observe()` on mount and on every `subscribe` nudge.
  One read in flight; a nudge during a read schedules exactly one more. Renders nothing
  when there is no `sessions` API (plain browser). States: list, "No agents need you",
  "Update Agent Code to see your agents here", "Agent status is unavailable" (rejected read).
- `src/api.ts`: a separate `AgentStatusApi = AgentCodeApiV1['sessions']` for the panel,
  not a widened game API. The game still cannot read sessions; only the panel can.
- Placement: `.sg-frame` becomes a row (game + 232px panel) in solo; the Friends view
  wraps `LanApp` and the panel in a row. Plain-browser LAN guests get no panel.
- Manifest: add `sessions.observe`; version `0.2.0`. SDK devDependency → `#v0.11.0` once
  tagged, lockfile regenerated (also fixes the stale 0.8.0 lock).
- Dev harness: `?agents=demo` stubs a few sessions so the panel can be seen and screenshotted.

## Tests

`tests/agent-panel.test.mjs`, fixture = the row shapes the host test pins
(`sessionStatus.renderer.test.ts` in agent-code): filter, order, older-host detection,
malformed input, title/project fallbacks. The contract test's permission assertion moves
to include `sessions.observe`.

## Verification

`npm run verify`, `npm run test:browser`, `npm run test:lan-browser`, plus a screenshot of
both modals with `?agents=demo`. Boundary: not run inside the real Agent Code host; live
status from real agents is covered by the host PR's tests, not observed here.

## Out of scope

Jump-to-agent (needs a host focus API). Bot engine PR #5 (independent).

## Tasks

- [ ] 1. Model + tests
- [ ] 2. Panel + placement in both views + styles
- [ ] 3. Manifest, SDK pin, README, build outputs
- [ ] 4. Browser checks + screenshots; PR

## Rulings

- Ruling: the panel gets its own narrow `sessions` API type instead of widening
  `SkitgubbeApi` — the game code has no reason to read sessions, and the old comment
  asked that widening stay a deliberate host-power decision — cost if wrong: none.
