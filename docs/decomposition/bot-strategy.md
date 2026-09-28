# Human-style bot strategy

Status: implemented and verified; awaiting owner review. Approval: pre-authorized by the owner's request for a strong
human strategy, explicitly replacing the earlier request for mathematical perfection.

A: The rules engine validates moves. The original bot sheds low ranks and saves wilds.
D: The bot sees known same-turn finishes, avoids feeding a visible last card, keeps
low cards manageable, and changes tactics instead of repeating a losing exchange.
It must never use hidden ranks. This is a heuristic, not an optimal-play claim.

Stage 0 results: 31 checks, 29 passing. The first tactical scoring policy repeated a
position on seed 2 at move 123 (first seen at 112); its high sets came back after it
stranded low cards. Giving low cards more weight improved that game but still repeated
on seed 9. Hypothesis “rank scoring alone prevents loops”: DISPROVEN. Do not keep
retuning weights as a loop fix. Existing seed sweeps are the regression corpus.

1. Tactical choice produces bot.ts and contract probes from the owner's 2 rule.
   Verify direct finish/denial choices without a browser. Separate because legality
   and useful tactics must be correct before history influences their priority.
2. Repetition memory produces a bounded per-game public-position ledger in bot.ts.
   Verify seed sweeps terminate and changing hidden identities preserves choices.
   Separate because a strategy without history repeats exactly at the same state.
3. View integration produces browser playthrough screenshots and one-deal tracing.
   Verify actual controls, bot pacing, settings and production mounting.

Isolation: bot.ts is the only strategy consumer of the rules engine; applyMove records
only accepted moves. Repeated calls to chooseMove before a move remain idempotent.
Unknowns: (1) opening stack semantics pending owner; (2) general strategy strength is
not measured against human players, so do not describe it as perfect or unbeatable.
Fixture plan: existing seeded full games plus explicit user-rule contract probes;
trace a failed cycle before changing the repetition policy. No hidden-state search.
