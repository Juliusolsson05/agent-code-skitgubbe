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
