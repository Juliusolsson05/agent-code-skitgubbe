# Browser acceptance teardown
Status: recorded cause; validating runner-specific rendering budget. Approval: pre-authorized release validation.
A: local Chrome solo and two-browser LAN acceptance pass. GitHub's first two runs
both remain in test:browser beyond eight minutes. Live job log ends after PASS
large-hand layers and failed-blind single receipt. The test's play budget is three
minutes, but an exception is only printed AFTER three unbounded finally awaits.
D: actual acceptance error is visible immediately, cleanup cannot suppress it,
and final CI validates the same shipped game. No gameplay assertion is weakened.

Stage 0: extracted live UI logs from run 36367393137/job108756414507, step7 at8m37s.
H1: teardown conceals an earlier error — unknown until catch logging probe.
H2: ordinary software-rendering slowness — not sufficient evidence to conclude.

1. Harness-only probe: immediate error logging, explicit stage/turn progress,
   bounded cleanup. Produces the real CI failure without changing game or assertions.
   Verify local browser acceptance and rerun CI. Separate because guessing at game
   logic before seeing the actual timeout would mask the cause.
2. Resolve only the recorded failure; preserve the existing assertions. Verify the
   release source matches the tested game modules. Installed Electron remains outside
   this acceptance boundary.

## Recorded result
The original job completed at 01:58:34Z. Layout finished at 01:51:54Z (164s),
setup at 01:54:00Z (126s later), large-hand at 01:54:53Z, and the keyboard game
hit the literal 180000ms budget at 01:58:34Z. H1 DISPROVEN: cleanup did finish
and did not conceal the failure indefinitely. Preserve immediate catch logging
and bounded cleanup because they make future failures inspectable, not as the fix.
H2 REFINED: the recorded failure is a wall-clock budget on software rendering;
native Chrome completed identical behavioral checks and full games locally.
CI keeps the 1440x1050 CSS viewport but uses deviceScaleFactor0.5 to reduce raster
work, and a ten-minute full-game budget. Every behavioral assertion is unchanged;
this is not a product speed guarantee or a waived game-completion requirement.
Local screenshots remain full resolution. Progress now prints every ten moves.

The local CI-density probe also produced more than 200 human attempts with a
random deal. A random human lowest-single policy can legitimately keep collecting
piles; its duration is not a rule invariant. Record a deterministic contract game
from the production engine instead: tests/fixtures/keyboard-game.json, LCG seed1,
66 total moves and19 human moves. It uses the same setup swap and lowest-single
policy as the keyboard driver, and real production bots for opponents. Replay
that deal through UI and assert the exact19 human actions and terminal result.
This preserves the complete-game assertion and makes a wrong/ignored keyboard
action distinguishable from a long randomly dealt game. Other layout games remain
random; pure engine/bot seed sweeps still cover many games.
The recorded deal replay passed in native Chrome with exactly19 human actions,
matching the engine recording, plus all layout/settings/production assertions.
The CI density/budget fix's first run has already passed its solo browser stage;
final acceptance now uses the bounded recorded deal for reproducibility.

Run36368213334 completed gameplay but failed the record assertion: actual
"0 won of 2, skitgubbe 2 times", expected /of 1/. The preceding blind-receipt
scenario can complete and persist a result before navigation on slower runners.
The keyboard scenario now captures its starting record and verifies exactly one
additional completed game, preserving persistence and duplicate-result detection.

LAN evidence: run36368147186 logged20/40/60 accepted moves at02:07:21,
02:10:07,02:13:02, then reached its ten-minute budget at02:14:46. There
was ongoing progress, not an awaiting-state stall. Native full games passed
at86 and90 actions. The random-deal driver has no bounded move count.
Next stage: record a two-human production-engine game with the SAME public
selection policy, then replay its deal through the existing HTTP/browser driver
and assert the recorded terminal action count. Preserve all privacy, reconnect,
ready, rematch and end-room checks. Separate recording from UI replay so engine
and transport evidence are independently inspectable. No product hook is added.
Recorded fixture: production engine LCGseed773, full52-card deck,48 actions.
The native two-browser replay matched exactly48 actions and passed privacy,
refresh, Step away/Resume, simultaneous Ready, rematch and room closure.
Only temporary esbuild constructor input is injected; shipped artifacts stay
byte-identical to the merged release candidate.

Final two CI runs both failed only test:lan-browser on wall-clock: run36368147186
accepted20/40/60 actions then hit600s; run36369291345 (recorded deal) reached
20 of48 in629s. Solo passed both runs. Root cause refined: scene animations
already collapse under reduced motion, but Playwright actionability and default
rAF polling are frame-bound, and SwiftShader frames cost seconds with two WebGL
contexts. Remedies, all test-harness-only: timer polling(100-200ms) for every
wait, CI raster density0.25, CI budget1200s, job timeout-minutes30, and a
shorter recorded game (best of30000 seeds under the identical driver policy:
seed972, 42 actions; 48 was the previous fixture). Native Chrome reproduced
exactly42 actions with all privacy/reconnect/rematch checks passing.
