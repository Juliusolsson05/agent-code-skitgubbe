# Skitgubbe card game plan

Status: in progress. Refs #1. Branch `feat/skitgubbe-card-game`. Nothing merges without the owner's explicit approval.

## Outcome

Skitgubbe, the Swedish family shedding game, as a standalone Agent Code extension. You play against 1–3 computer players on a 3D felt table in the style of Mini Games' Blackjack. The house rules can be changed in settings.

What the owner said (2026-09-27):
- Skitgubbe is the "shithead" family game: face-down, face-up and hand cards, play equal or higher, a 10 clears the pile.
- Add an "invisible 5". Clarified mid-build: a 5 can be played on anything and is see-through. The next player plays on whatever lies under it ("if we have a king on the board, I lay a 5, next person plays on king").
- Make it its own repo, because it is niche.
- Rules configurable in settings.
- "Make it as blackjack, with some great animations."

What I assumed (all **UNCONFIRMED**; the owner said "do the full thing" without answering the decision list):
- ~~U1~~ CONFIRMED by the owner: the invisible 5 above is the default. The setting is a single on/off; off makes 5 an ordinary card. My earlier reading ("anything goes on a 5, the 5 itself plays normally") was wrong and is not offered.
- U2. Defaults: 2 resets, 10 burns, four of a kind burns, a burn lets the same player play again, the swap phase is on, the chance card is on. "No finishing on 2/10/A" and "7 or lower" are off.
- U3. The player holding the lowest ordinary card starts; ties go to the earliest seat, counting from you. After a pickup, the next player starts a fresh pile.
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

Online multiplayer, jokers, team play, several bot difficulties, and adding it to Mini Games' launcher.

## Progress

- [x] Repo created, Issue #1 filed, worktree `feat/skitgubbe-card-game`
- [ ] Scaffold, engine and tests
- [ ] Bot
- [ ] Scene, view, audio
- [ ] Dev harness, browser check, CI, README
- [ ] Build, verify, PR
