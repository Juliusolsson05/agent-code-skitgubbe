# LAN play
Status: implemented; final layout acceptance and PR pending. Approval: pre-authorized by full-build and LAN requests.

A: solo engine owns hidden cards and a React table owns pacing. Poker's SDK 0.9
service implementation is the verified transport reference; it does not prove
Skitgubbe multiplayer works. D: two commands, local bots or a shared 2–4-human
room; browser and extension guests; private hands, synchronized legal actions,
rejoin after refresh, host-controlled deal/rules, readable layered large hands.

## Stage 0 results (verified, do not re-derive)
- One solo command, zero services, SDK pinned before networking support.
- Poker has two commands, one Node service and three client transports:
  same-origin browser, service proxy, brokered net.fetch.
- Poker service.ts binds loopback/port0; expose supplies the LAN listener port.
- Poker http.ts resolves service/lan attestations before local-host permission.
- Two compatibility constraints in Poker: status invoke needs explicit {},
  brokered POST sends both method/httpMethod plus the dialed Origin.
- Solo Snapshot exposes all hands/down ranks and rank-bearing IDs. It must NEVER
  be serialized to clients. H1 (reuse full snapshot) DISPROVEN by engine source.
- H2 (reuse the scene with hidden cards) pending projection/renderer verification.
- Existing long hand is one overlapping/horizontally scrolled row; user reports
  it becomes unplayable. Requested layers become the shared hand renderer.

## Stages
1. Projection and authority: src/lan/protocol.ts, server/room.ts.
   Produces authenticated seat actions, revisions, opaque IDs, redacted table.
   Verify with real dealt-game contract probes: conservation, hidden fields,
   wrong-seat/stale/replayed action rejection, all seats rotated consistently.
   Separate because networking must never own or reconstruct game rules.
2. Transport: server/http.ts, service.ts, main.ts, src/lan/transport.ts.
   Produces browser assets + SDK service endpoints with bounded JSON/no CORS.
   Verify live HTTP host/join/action/poll/leave and caller attestation probes.
   Separate because all socket trust belongs outside the view. Reference: Poker.
3. Client: LAN lobby and shared scene/hand renderer, SDK entry + browser entry.
   Produces ready/setup/play/result, host deal/rematch, share URL/code, rejoin.
   Verify two browser contexts and brokered/proxy adapter contract probes.
   Separate because a projected view is never an authoritative game state.
4. Packaging and acceptance: built dist/lan-dist/dist-service, docs and CI.
   Verify unit/contract/browser checks and a full multiplayer game.
   Actual installed Electron and two physical computers are a separate boundary;
   report honestly if unavailable.

## Rulings / unknowns
1. 2–4 human players, no bots in friend rooms: matches play-with-friends request;
   solo retains bots. A disconnected player keeps their seat; game waits and can
   resume. No silent bot takeover. Host can end room and explicitly create again.
2. Credentials are tab-scoped sessionStorage; never URLs or broadcast payloads.
   In-extension host token additionally persists in host storage for reopen.
3. Service lifetime is the room lifetime; process restart ends the room. Refresh
   reconnects; durable crash recovery/host migration is outside this first LAN scope.
4. One active room per service, random room code, host alone starts/rematches.
5. Public events are bounded and revision-ordered; lagging clients resync without
   replaying the opening deal. No background client simulation.
6. House-rule meanings stay those already accepted by the owner. Multirow hands
   expand within the fixed modal by allocating some table height to the hand.

Stop-and-ask: destructive changes, new external service/relay, or incompatible
rule semantics. No such action is required by this design.

## Verification and latest correction
H2 HOLDS: real host/guest browsers render the shared scene from private views.
Two browsers completed 86 human actions, refresh/rejoin, step-away/resume, host
rematch and room closure with no page exceptions. SDK bundle startup, real HTTP
endpoint, status and shutdown contract passed. Forty engine/network checks pass;
mutating hidden-hand projection or same-deal Ready makes regression checks fail.
Review: guest Leave discarded credentials while retaining seat (valid P2); replaced
with resumable Step away. No additional authority/privacy/SDK findings.
Owner's newest correction: keep Hand / Face up / Face down visible side by side,
with the active source marked. Hand layers occupy 696px; table batches get 216px
each and readable 64px cards. Verification reruns for that visible-scope change.
Final three-batch browser rerun passed: 90 LAN actions, refresh and Step away
recovery, rematch/closure, no browser errors. Forty-card solo hand is four layers
with all three batches present; final solo keyboard playthrough completed 26 turns.
All four stages are implemented and locally verified. CI and release are final gates.
