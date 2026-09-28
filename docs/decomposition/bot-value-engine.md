# Bot value engine
Status: implemented; ladder finalised from simulation data (bot-ladder-data.md).

One engine, five capability levels, each a strict subset of the next's skills. The
engine reads only public information at every level: pile contents, every face-up
row, hand/down COUNTS, its own hand and up row, and the public event stream. It never
reads other players' hidden cards, and never reads its own face-down cards — even
their owner cannot know those. Level 5's "perfect human" memory is built from the
same public stream: plays, pickups, burns, reveals, and setup swaps.

## Zone value model (the owner's core request)

The same rank is worth different amounts depending on where it sits:

- **Hand** (played first, refills while the deck lives — a tempo zone): low ordinary
  cards are liabilities that leave early; wilds are slightly discounted because the
  deck keeps bailing you out.
- **Face-up** (reached only when the deck is dead — a survival zone): wilds +10
  (always playable on arrival), high ordinary +3 (beat a random pile, deny), low
  ordinary −5 (traps). A wild saved as the LAST face-up card makes the first blind
  flip 100% legal — the single biggest endgame lever, and why a 2/10 face up is
  super high value when flips remain.
- **Face-down**: value 0 — unknown even to its owner; only the count matters.

## Setup (swap phase)

`chooseSwaps` greedily swaps by zone-adjusted gain, with the precondition that the
face-up row never gets weaker than the hand (owner-approved invariant). Slots whose
rank also sits in the hand are reserved for stacking (covering a stack pair with a
king destroys a set and a replacement draw). `prepareBot` then stacks matching
hand/face-up pairs when churn wins: the stacked copy thickens the table set and the
replacement draw's expected value beats keeping a known low card.

## Turn engine

1. **Finish** if the known cards go out this turn (multi-step 2/burn chains from
   level 2; a direct last-card play at level 1). Face-down cards present means
   emptying hand+up is NOT a finish — it is the blind phase.
2. **Threats.** The nearest single-card opponent after me (or a known forced-win
   hand: a 2- or 10-led sequence that finishes from any pile, like the owner's
   "ace + 10 + three 3s"). Forced wins are marked unstoppable: no pile stops them,
   so denial is skipped and the race is played instead. Single-card threats:
   - level 3: none (denial is a level-4 weapon, not a habit — measured).
   - level 4: assigned denial — only the seat that plays immediately before the
     threat spends cards, and the CHEAPEST sufficient rank (if all aces are
     visible, a king denies exactly as much as an ace — keep the ace).
   - level 5: cooperation. Earlier bots keep the pile LOW so the defending seat
     can spend its high card with maximum headroom ("p2 can lay its N"). Trust is
     EARNED: the ledger records, per seat, witnessed failures to block a known
     single-card threat; one wasted block ends trust for the deal, human or bot.
3. **Pipeline.** With flips remaining, never spend the wild that guarantees the
   safe first flip; leave the pile LOW when no wild remains (refined, level 4+).
4. **Tempo.** Shed value, set bonuses (four-burn completion and partial stacking),
   burn/again bonuses, last-wild preservation, liability shedding, pressure on
   two-card opponents (restrict replies) and feeding high cards to swollen hands.
5. **Stuck.** Chance EV from the unseen-card distribution (tracked at level 5,
   rank bounds below) versus pickup.

## Memory scopes (the "small memory" ruling)

- Levels 1–3: none. Level 4: witnessed burns only.
- Level 5 "perfect human": a seen-card ledger — every card that entered view
  publicly (plays, pickups, failed reveals, setup swaps) is tracked to its holder
  until it becomes public again. Deck-drawn cards stay unknown until played. This
  is exactly what a counting human knows; no hand reconstruction, no deck-order
  inference. Pickups make hidden hands partially KNOWN (the pile was public), which
  turns denial exact: block the tracked 9 with a jack, not a king.

## Termination guards (every level)

Pickup wars can cycle forever under pure scoring. Three guards, all routed through
one chokepoint that every play selection (denial, facilitation, pipeline, tempo)
passes through: exact-position visit counts, coarse recency rings (deck-dead + pile
bucket + move, deliberately ignoring the dimensions real wars churn), and
least-tried fallback so a true cycle must rotate through every option. See
bot-ladder-data.md's termination section for the three recorded infinite games.

## Level ladder (final; each skill's measured value in bot-ladder-data.md)

| Level | Title | Adds |
|---|---|---|
| 1 | By the book | lowest legal card, strongest-up swaps, direct finish |
| 2 | Solid | finish chains, set shedding, wild preservation, repetition guard |
| 3 | Sharp | stacking churn, wild-last pipeline, chance EV |
| 4 | Strong | assigned minimal denial, balanced setup, pressure, refined flip pipeline, burn memory |
| 5 | Perfect human | seen-card ledger (exact denial, forced-win detection), equilibrium cooperation with earned trust |
