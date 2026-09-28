# Browser acceptance teardown
Status: investigating. Approval: pre-authorized release validation.
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
