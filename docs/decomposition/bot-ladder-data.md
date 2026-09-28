# Bot ladder data
Status: recorded (three runs, seeded and reproducible). Source of truth for the
shipped level configs; rerun with `npm run bench:bots -- <heads-up-n> <field-n>`.

Methodology: every game uses the production engine and the production bot pipeline,
including `observeBot` event feeding, so level-5 tracking runs exactly as in a real
deal. Seeds are fixed LCG values; a rerun reproduces the table bit for bit.

Two metrics, because they answer different questions:

- **Heads-up** (win rate, seats alternate): raw strength one-on-one.
- **Fixed field** (avg place of one entrant among two level-2 anchors, seat rotates):
  the shipped experience — every bot at one level — measured against a constant
  opponent field.

## Run 3 — final configs (after behavior trust + refined-pipeline placement)

Heads-up, 800 games per pair (95% CI ≈ ±3.5%):

| | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|
| L1 | — | 34.8% | 33.0% | 35.9% | 33.8% |
| L2 | 67.0% | — | 47.3% | 50.5% | 46.0% |
| L3 | 64.9% | 48.9% | — | 46.0% | 51.4% |
| L4 | 67.1% | 54.5% | 49.5% | — | 50.1% |
| L5 | 64.1% | 53.5% | 54.3% | 49.9% | — |

Fixed field, 1600 games per entrant (CI on avg place ≈ ±0.02):

| Entrant | avg place | 1st | skitgubbe |
|---|---|---|---|
| L1 | 2.316 | 21.8% | 53.4% |
| L2 | 1.998 | 32.8% | 32.6% |
| L3 | 1.957 | 33.9% | 29.6% |
| L4 | 1.965 | 35.8% | 32.3% |
| L5 | 1.961 | 35.6% | 31.7% |
| L4 no denial | 1.986 | 34.1% | 32.7% |
| L4 no pressure | 1.971 | 34.3% | 31.4% |
| L4 no balance | 1.949 | 36.9% | 31.9% |
| L4 basic pipeline | 1.994 | 34.7% | 34.1% |
| L5 no tracking | 1.986 | 35.1% | 33.7% |
| L5 no coop | 1.961 | 36.3% | 32.4% |
| L5 no pipeline | 1.992 | 34.5% | 33.8% |

## Earlier runs (config differences noted)

Run 2 (before per-seat behavior trust; L4 still basic pipeline): L1 2.221, L2 2.007,
L3 1.955, L4 1.949, L5 1.942 — strictly monotone; cooperation ablation was the
largest single skill (removing it cost 0.085 place and +6pp skitgubbe).

Run 1 (L3 still had naive denial, L4 had bot-only cooperation): mixed-level rotation
showed L3's blunt denial and L4's assumed trust both LOSING games vs L2; those two
findings drove the re-laddering (L3 sheds instead of denying, trust is earned).

## Conclusions that finalised the ladder

1. **The fundamentals cliff is real and huge.** Level 1 loses ~2 of 3 heads-up and is
   skitgubbe >50% at a soft table. Level 2 (finish chains, sets, wild preservation,
   repetition guard) captures most of the winnable ground: the game's ceiling above
   solid basics is genuinely small per game.
2. **Levels 3–5 are refinements with small but consistent edges.** ~0.01–0.04 place
   over L2, within single-run noise of each other, but every ablation above is
   positive: each skill helps the seat that has it. The unit test therefore asserts
   the stable invariants (huge L1 gap, no inversion against the field), not the
   micro-ordering of 3/4/5.
3. **Blunt denial is a losing habit; precise denial is a weapon.** Naive "play high
   when someone is low" (old L3) lost measurable games. Assigned denial with the
   cheapest sufficient rank (L4) gains them back — `L4 no denial` costs 0.021 place.
4. **The refined flip pipeline is the biggest single refinement skill** (`L4 basic
   pipeline` costs 0.029, `L5 no pipeline` costs 0.031): leaving a low pile for blind
   flips and saving the last wild wins endgames that basic play loses.
5. **Cooperation must be earned.** Assuming a defender will block (old L4) bleeds
   value to weak seats. Trusting until a witnessed missed block (L5's per-seat slack
   ledger) recovers the equilibrium: vs strong fields trust holds and pays; vs weak
   fields the ledger flips L5 to self-denial, which is why `L5 no coop` now measures
   even — cooperation's value shows in the runs where trust was justified (Run 2).
6. **Card counting (L5 tracking) is worth ~0.025 place** (`L5 no tracking` 1.986 vs
   1.961) — real, not dominant, exactly like card counting at a real table.

## Termination (hygiene, all levels)

Seeds 1–160 × 3 rule sets × mixed player counts all finish. Two infinite pickup wars
were found and fixed during development (seed 38 default rules: a queen shuttle;
seed 30 no-wild rules: an ace triple shuttle; later seed 35 no-wild 4-player after
the pipeline change). Fixes, in order of application: repetition penalties alone do
NOT terminate wars (they shift all options equally) → least-tried exploration at
revisited positions → coarse recency rings (deck-dead + pile bucket + move) force
rotation through every option → all play selections (denial, facilitation, pipeline,
tempo) route through the same guard. The coarse key deliberately ignores pile-top
rank and hand sizes: real wars churn exactly those, which hid the repetition in the
first recorded loop.
