# Skitgubbe card game plan

Status: in progress. Refs #1. Branch `feat/skitgubbe-card-game`. Nothing merges without the owner's explicit approval.

## Outcome

Skitgubbe, the Swedish family shedding game, as a standalone Agent Code extension. You play against 1–3 computer players on a 3D felt table in the style of Mini Games' Blackjack. The house rules can be changed in settings. A second command opens LAN rooms for 2–4 human players, including browser guests.

What the owner said (2026-09-27):
- Skitgubbe is the "shithead" family game: face-down, face-up and hand cards, play equal or higher, a 10 clears the pile.
- Add an "invisible 5". Clarified mid-build: a 5 can be played on anything and is see-through. The next player plays on whatever lies under it ("if we have a king on the board, I lay a 5, next person plays on king").
- Make it its own repo, because it is niche.
- Rules configurable in settings.
- "Make it as blackjack, with some great animations."

What I assumed (all **UNCONFIRMED**; the owner said "do the full thing" without answering the decision list):
- ~~U1~~ CONFIRMED by the owner: the invisible 5 above is the default. The setting is a single on/off; off makes 5 an ordinary card. My earlier reading ("anything goes on a 5, the 5 itself plays normally") was wrong and is not offered.
- U2. Defaults: 2 resets, 10 burns, four of a kind burns, a burn lets the same player play again, the swap phase is on, the chance card is on. "No finishing on 2/10/A" and "7 or lower" are off.
- U3. CONFIRMED correction: the player holding the lowest hand card excluding 2 starts; ties go to the earliest seat, counting from you. After a pickup, the next player starts a fresh pile.
- U4. You plus 2 bots by default, adjustable from 1 to 3. There is one bot strategy.
- U5. Stats are games, wins (out first) and times you were the skitgubbe, saved on this device.
- U6. Keys: ← → move between your cards, Space selects, Enter plays, T takes the pile, D draws a chance card, M mutes.
- U7. No LICENSE file, matching the sibling extension repos, which have none. Choosing a license is the owner's call.

## Evidence (verified, do not re-derive)

- Rules research (Pagat, spelregler.org, hurspelarman.se, spelstad.se, skitgubberegler.se, Swedish Wikipedia) found two games called "Skitgubbe". The owner rejected the classic two-phase trick-taking game and chose the modern shithead / Vändtia game. Sites disagree on 2 (wild or reset), 7 (or lower), and on finishing on specials, which is why those are settings.
- Mini Games (`Juliusolsson05/agent-code-mini-games` at `b20dc10`, v0.10.0) is the template. The facts below come from reading it.
  - API v2: `defineRuntime({activate(){}})` plus `defineView({mount})`. `extensionViteConfig({entries:{runtime,view}})`. Always build with `NODE_ENV=production`, because a dev build emits `jsxDEV` and fails in the frame.
  - `dist/` is committed, because GitHub installs use the source tarball. The contract test walks `dist` against the 16 MB per-file cap.
  - The frame's CSP forbids fetching binary assets. All art is SVG or canvas and all sound is Web Audio synthesis.
  - The host sizes the modal from the measured content. Use a fixed intrinsic width, never `vw` clamps, or the sizing loops.
  - Chrome inherits the host `--theme-*` tokens. Game art (felt, cards) keeps its own palette.
  - Blackjack 3D: `svgToTexture` needs an explicit `xmlns`, and any existing width/height must be stripped before injection, or decoding fails silently and cards render blank. Direct render with ACES at exposure 1.0 and no post-processing. Horizontal materials keep a roughness floor of 0.55. The camera uses a 30° FOV at 73° elevation, fitted to `FRAME_W`/`FRAME_D`. Card = extruded rounded stock plus two decal planes with `alphaTest`. Motion is t/duration easing, never per-frame lerp, and allocation-free in the loop.
  - Engines are pure, with injected `random`. Tests go through `dev/test.mjs` (esbuild bundle plus `node --test`). Browser checks run Playwright against a separate Vite server.
  - Storage: merge records upward, never overwrite before hydration, serialize writes.

## Design

### Repository layout (mirrors Mini Games 1:1)

```
agent-code.extension.json   id skitgubbe, command/view skitgubbe.play (modal)
src/runtime.ts, src/view.ts, src/api.ts, src/view/mount.tsx, src/styles.css
src/assets/svg/            CardFace, CardBack, suits, pips (copied from Mini Games), TableLegend
src/game/engine/           cards.ts, rules.ts, game.ts (pure)
src/game/bot.ts            pure move choice from a player's view
src/game/audio.ts          synthesized sound
src/game/scene/            3D table (adapted from Blackjack's scene)
src/game/Skitgubbe.tsx     React shell: HUD, your card rail, settings, bot pacing
tests/                     engine, rules, bot tests
testing/extension-contract.test.mjs
dev/                       harness, test runner, browser check
```

### Engine contract (`src/game/engine`)

- `Rules`: `{ invisibleFive, twoResets, tenBurns, fourBurns, burnPlaysAgain, swapPhase, chanceCard, noSpecialFinish, sevenOrLower }` plus `DEFAULT_RULES` and `parseRules(unknown)`.
- `canPlayOn(rank, pile, rules)` decides legality. The effective top skips see-through 5s when `invisibleFive` is on. Resets: an empty pile, or a 2 (when `twoResets`). With `sevenOrLower`, a 7 requires a rank of 7 or lower. The wildcards are 2 (when `twoResets`), 10 (when `tenBurns`), and 5 (when `invisibleFive`).
- `SkitgubbeGame(options: { players: 2..4, rules, random })`:
  - phases: `swap`, then `playing`, then `over`
  - actions: `swap(p, handId, upId)`, `ready(p)`, `play(p, cardIds)`, `flip(p, downId)`, `chance(p)`, `pickUp(p)`; each returns a boolean and never throws
  - queries: `legalCardIds(p)`, `source(p)`, `getSnapshot()` (returns copies)
  - `update()` does not exist, because the engine has no time. `takeEvents()` drains `play | burn | pickup | draw | chance | flip | finish | over`.
- Invariants: 52 cards are conserved across the hand, table, pile, draw pile and burned stacks. Only the current player acts. After a burn the same player continues only if `burnPlaysAgain` is on and they still have cards. The game is over when at most one player holds cards, and that player is the skitgubbe.

### Bot (`bot.ts`)

`chooseSwap(player)` puts the three strongest cards face up. `chooseMove(game, p)` returns a `Move`:
- From the current source, it plays the cheapest legal ordinary rank, all copies of it.
- It saves wildcards, but spends a 10 when the pile has 8 or more cards.
- It flips a face-down card when that is the source.
- Otherwise it takes a chance card (only when that rule is on and the draw pile has cards), else it picks up.

It only reads its own hand and table cards, the pile and the counts.

### Scene (`src/game/scene`)

Adapted from Blackjack: world, camera, lighting, room, materials, animation, card, table, textures. Chips, the rack and the shoe props are dropped.
- Reconcile is generic. Every card id visible in the snapshot gets a target transform from the seat layout. New ids spawn at the draw pile. Changed targets re-arm an arc from the card's current pose. Missing ids (burned) sweep to the burn tray.
- Seats go clockwise from you (bottom): left, top, right. One bot sits top, two sit left and right.
- The draw pile is a block that shrinks. The burned pile grows in a tray. The play pile stacks in the centre with slight random yaw.
- Impact sounds fire from the scene on landing, as in Blackjack.

### View (`Skitgubbe.tsx`)

- Layout: a header (title, stats, sound, settings), then the 3D stage, then a seat strip (bots' hand counts, whose turn it is), a status line, your card rail (DOM SVG cards from the current source) and an action bar.
- Bots act on a timer, about 850 ms per move and longer after a burn, so play is readable. The engine owns the rules and the view owns the pacing.
- The settings popover holds the player count and every rule. Changes save immediately and apply when the next game starts.
- If WebGL fails, the game stays playable from the DOM rails.

## Tests

Engine tests use seeded or constructed hands, not literals invented to pass. Each test names the rule it protects:
- legality for every rule option: the invisible 5 on and off (including a 5 on a King, then a card that has to beat the King), 2, 10, 7-or-lower
- four-of-a-kind burn across players, and burn-plays-again on and off
- drawing back to 3 while the draw pile lasts, and multi-card plays
- source order (hand, then face-up, then face-down), blind flip success and failure
- chance card success and failure, pickup
- `noSpecialFinish`
- finishing order, the skitgubbe result, and 52-card conservation
- rejecting actions from the wrong player
- bot: the full game completes with 1–3 bots for many seeds, and every bot move is legal

The browser check covers: a game renders, the swap phase and start, playing a card by keyboard, taking the pile, settings persistence, and the production bundle mounting.

## Verification

`npm test`, `npm run typecheck`, `NODE_ENV=production npm run build`, `npm run test:extension`, `npm run test:browser` (local Chrome), plus CI.

**Boundary:** not verified inside the Electron extension host. A GitHub install into Agent Code is owed as manual QA.

## Out of scope

Internet relays, host migration, durable LAN crash recovery, jokers, team play, several bot difficulties, and adding it to Mini Games' launcher.

## Scope correction: experience overhaul (2026-09-28)

The owner played v1: "the game experience is dogshit … the layout is shit, animations are weird and uncomfortable, no keyboard navigation, cheap feel". The owner asked for Codex agents to review it. Two read-only Codex reviewers played the game and read the code: one covered layout, keyboard and feel; the other covered animation and the 3D table. Their verified findings, and what we are doing about each:

**Choreography (the root cause of the "weird" motion).** The scene tweened straight to the final state. A 10 flew from your hand directly into the burn tray without ever landing on the pile. Every card change got the same 420 ms arc with a 0.33 rad spin. Bots moved before the cards had landed (a 30-card pickup took 960 ms against a 900 ms timer). A new deal started while the old cards were still being gathered. Adopted:
- `scene.animate(prev, next, events)` returns a Promise and plays one sequence per action: play → land → (burn: hold 100 ms → packet sweep 300 ms) → refill → rearrange.
- Blind and chance reveals flip, then hold 220 ms before landing or being picked up.
- Bot and human turns wait for completion: the next bot moves 240 ms after completion, 380 ms after a burn, 100 ms when you are out.
- Motion profiles: deal 280 ms / lift 0.20 / stagger 28 ms; play 280 ms / 0.12; refill 260 ms / 0.18 / stagger 55 ms; rearrange 140 ms / no lift; pickup packet 340 ms. No spin except 0.04 rad on the deal. Lift is `sin²`, yaw takes the shortest path.
- Flips only happen for real reveals, on an inner group with edge clearance.
- A burn is one packet. The flash lasts 400 ms at 0.22 opacity with no expanding scale.
- A new game gathers first (360 ms), then deals.
- Fixed seat glows crossfade after the action completes, instead of one light travelling across the table.
- Reduced motion snaps to the final transforms, including face orientation (the reviewer reproduced a face-up card left showing its back).

**Your hand ↔ table.** Your cards used to vanish through the bottom edge of the canvas while the rail had already changed. Adopted: DOM flight overlays. A card flies from its rail rectangle to the projected pile, drawn cards fly from the projected deck to a reserved rail slot, and a pickup flies as one packet. Rail cards stay hidden until their flight lands.

**Keyboard (P0).**
- Focus used to fall to `<body>` after every play, and every shortcut then died. This was also why my first browser check stalled. Fixed: keys are handled at window level whenever focus is in the game or nowhere, and focus is recovered to the card at the same index.
- One consistent model: roving tabindex in the card group; ←/→ and Home/End move; ↑/↓ switch rows during the swap; Space selects; Shift+Space selects every card of that rank; Enter plays the selection or the focused card; Escape clears; T, D and P take the pile, draw a chance card and pass; M toggles sound; "," opens settings.
- Settings is a real modal: Escape handled first, focus trapped and restored, bots paused while it is open.

**Layout and readability.**
- Final frame: 1240×904; the initial 900×750 proposal was rejected.
- Cards are 90×126, sorted by rank. Large hands now use balanced layers, at most 18 cards per layer, with 72px of each earlier layer exposed. Table height yields to extra layers; no horizontal hand scrolling.
- The rail keeps showing your current source during bot turns, labelled "Hand · 16", "Face up · 3" or "Face down · 2".
- A DOM "Play 9 or higher / Any card / 7 or lower / 5♥ counts as 9" readout sits by the pile; draw and burned counts sit by their stacks.
- Compact opponent badges are anchored away from their cards and show only name and hand/hidden counts.
- The camera frame is tighter (`FRAME_D` 9.6, `FRAME_W` 16.1, margin 1.025), the pile is scaled 1.12, table cards face the viewer, and corner indices are larger (rank 24/20, suit 14).
- The primary action names the move ("Play three 8s") and is validated with `canPlay`. When nothing fits, "Take 12 cards" becomes the primary.
- No dimming of your cards on bot turns; a "Waiting for Astrid" state plus a last-action line instead.
- Callouts only for burns, failed reveals and finishes, 160 ms in with no overshoot, and a minimum dwell.
- One result card with focus on "Play again".
- Type is 14/12 px with 44 px targets.

The later owner size correction superseded the initial 420px compromise: the normal stage is 600px (560px below the LAN connection bar), shrinking only to make room for large hand layers.

## Progress

- [x] Repo created, Issue #1 filed, worktree `feat/skitgubbe-card-game`
- [x] Scaffold, engine and tests
- [x] Bot
- [x] Scene, view, audio
- [x] Dev harness, browser check, CI, README
- [ ] Build, verify, PR

## Layout correction after four-player preview

The owner rejected the cramped 900px modal. Increase intrinsic width to 1240px and
the stage to 600px, with a 176px hand shelf. Expand the felt and seat spacing together:
22 × 12.8 world units, side seats at ±7.7, far/near rows beyond ±3.3, centre piles
at ±3.4. Keep badges away from card footprints and use the wider shelf for large
hands. Verify all player counts and the four-player game in a browser; rebuild dist.

## Owner's latest rule and UX corrections

- The 2 resets and keeps the same player's turn. Finishing still takes precedence.
- The starting player holds the lowest card after setup, **excluding 2**. This
  supersedes the earlier ordinary-card filter and the briefly proposed inclusion of 2.
- Matching hand/face-up cards stack into an existing table slot during setup and
  refill the hand. Working interpretation of “either direction”: either click order;
  the stack stays face up. The clarification question remains available to the owner.
- NPC plates show name and counts, without repeating the face-up ranks. Far seat plate
  is centred on the far rail; side plates sit above their own card rows.
- Playable cards have a persistent green outline on the human turn, with separate
  selection and keyboard focus styling.
- Strong human-style bot tactics replace the proposed simulation search. Same-turn
  finishes, visible-opponent denial and repeated-position memory; no hidden peeking.
- Opening hydration now precedes the first deal. Browser tracing reproduced the old
  sequence `[3, 4]` players and verifies the corrected single `[4]` deal.

Verification so far: 33 engine/rules/bot checks pass, including seeded complete games,
conservation, the 2 continuation and setup stack. Layout checks cover 2/3/4 players;
browser playthroughs reached the result with 14 and 24 human keyboard turns. The
latest stack integration is under browser verification; production artifacts rebuilt.

## LAN scope expansion (owner request)
Follow docs/decomposition/lan-play.md stages. Add `skitgubbe.friends` command
and view alongside solo `skitgubbe.play`, SDK 0.9 service, private projections,
browser guests, lobby/share/reconnect/host rematch. Implement all stages before
PR. Latest owner correction: large hands must use multiple card rows/layers.

## Review dispositions and layered-hand correction
The rules reviewer found the old random swap fixture could choose matching ranks;
it now uses a deterministic nonmatching deal. The animation reviewer reproduced
failed blind 3S on KH arriving from the pile and again as a draw; reconciliation
now excludes cards already delivered by the action. Their 40-card End-focus trace
also reproduced an offscreen focused card; the owner's newer multiple-layer
request supersedes horizontal scrolling. Shared HandFan now exposes all layers.
The crude horse emblem was replaced with a geometric red/cream card back.

LAN stages 1 and 2: 40 checks pass, including real HTTP probes, rotated private
views, wrong-seat and stale-action rejection, duplicate retries, disconnect/rejoin,
and simultaneous Ready (recorded two-browser failure before correction).

## Three batches always visible (owner correction)
Hand, face-up cards and numbered face-down backs remain beside each other in solo
and LAN. Only the current source accepts moves or participates in keyboard card
navigation; setup permits hand/face-up only. Shared HandFan assigns 696px to the
hand and 216px to each table batch. Forty held cards use four exposed rows.
The stage yields height to layers within the fixed modal. This supersedes the
old current-source-only shelf and the earlier full-width 18-card row limit.

## Final local acceptance and release gate
Plan vs built: MATCH for solo rules/bots/table/controls/settings, LAN rooms/private
views/reconnect/rematch, and all owner layout corrections. Recorded defaults and
boundaries remain above; no unrecorded rule change.

Final local checks: 40 engine/rules/bot/network tests and 3 production extension/
SDK-service contract tests pass; TypeScript and all three artifact builds pass.
Agent Code's actual manifest parser accepts 2 commands and 1 service. Solo browser
acceptance passes with 26 human keyboard turns; final LAN acceptance passes with
90 human actions across separate browser contexts, all three batches visible,
private payloads, refresh/rejoin, Step away/resume, rematch and room closure.
Privacy and simultaneous-Ready mutation probes fail as expected. One earlier
software-rendered LAN run exceeded the acceptance timer; native Chrome completed
both subsequent runs (86 and 90 actions). This was a test wall-time boundary,
not evidence of a reproduced engine stall.

The owner authorized cutting a release once ready. Version 0.1.0 is the initial
release; publish the verified feature commit after CI. Agent Code install.ts
resolveSource prefers releases/latest's source archive, so this release is
installable without merging the PR. The PR remains open for explicit merge
approval. Installed Electron and two physical devices are the manual QA boundary.

## Bot value engine (owner request, post-release)

Replaced the flat keep-value bot with a five-level capability ladder built on zone
values (hand = tempo zone, face-up = survival zone, wild-last-before-flips is the
biggest endgame lever). Setup now balances hand/face-up and plays the stacking game.
Turn play: finish → threats (assigned minimal denial; forced-win hands are raced,
not blocked) → flip pipeline → tempo → chance EV. Level 5 counts every publicly
seen card (pickups and setup swaps included — swaps are public per owner ruling)
and cooperates by keeping the pile low for the defender seat, trusting it until a
witnessed wasted block (human or bot). Memory is deliberately human-scale: no hand
reconstruction, deck draws stay unknown.

Ladder finalized from simulation data (docs/decomposition/bot-ladder-data.md):
level 1 is dramatically weakest, level 2 captures the fundamentals cliff, levels
3–5 add measured refinements (denial ~0.02 place, refined pipeline ~0.03, tracking
~0.025). Three infinite pickup wars were found and fixed with least-tried/coarse
recency guards applied to every play selection. Bot level is a setting (default 4).
Keyboard fixture re-recorded (27 human turns) and replayed through the real UI.
