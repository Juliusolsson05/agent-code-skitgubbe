// The computer players.
//
// One engine, five capability levels. Every level is the same code with a different
// BotConfig: what changes is which HUMAN skills are switched on, never hidden
// information. The ladder was finalised from simulation data (dev/bot-lab.mjs,
// recorded in docs/decomposition/bot-ladder-data.md), not from intuition.
//
// Information discipline: the engine's Snapshot contains everything (it is the
// solo authority), so the bot POLICES ITSELF. It reads other players' hand LENGTHS
// and face-up rows, the pile, and counts — never their hidden card identities, and
// never its own face-down cards (even their owner cannot know those). Level 5's
// "perfect human" tracking is built only from the public stream: plays, pickups,
// burns, reveals, and setup swaps (a card put face up is seen by the table, and the
// card it replaced is a KNOWN card in that player's hand). Cards drawn from the deck
// stay unknown until played, exactly as at a real table.
//
// Collaboration: denying a player about to go out is the whole table's job, and the
// seat immediately before the threat is the natural defender — it can spend its high
// card last, when the information is freshest. Earlier bots therefore keep the pile
// LOW (the defender keeps headroom: "p2 can still lay its N"). Level 5 plays the
// logical equilibrium and trusts that seat even when it is the human, because with
// everyone playing sensibly that is strictly better positioning; it only takes over
// when it can PROVE the defender cannot deny (tracked cards too low, or blind), or
// after the human demonstrably wastes a block. Denial itself is skipped entirely
// when the threat's known cards force a quick win (e.g. an ace, a 10 and three 3s:
// 10 burns, 3-3-3 follows, ace finishes — no pile stops it): blocking then only
// burns our own high cards, so the correct play is to race.

import { RANK_VALUE, type Card, type Rank } from './engine/cards'
import type { SkitgubbeGame, Snapshot, GameEvent } from './engine/game'
import { burnReason, canPlayOn, isFinishForbidden, isWild, type Rules } from './engine/rules'

export type Move =
  | { type: 'play'; ids: string[] }
  | { type: 'flip'; id: string }
  | { type: 'chance' }
  | { type: 'pickup' }
  | { type: 'pass' }

// --- capability ladder -----------------------------------------------------------------

export type BotLevel = 1 | 2 | 3 | 4 | 5
export const DEFAULT_BOT_LEVEL: BotLevel = 4

export type BotConfig = {
  /** Multi-step same-turn finishing (2/burn chains). Off: only a direct last-card play. */
  finish: boolean
  /** Play equal-rank sets together and aim four-of-a-kind burns. */
  sets: boolean
  /** Penalty for spending the last wild while face-down cards remain. */
  escape: boolean
  /** Memory of repeated exchanges, so a bot never loops the same trade. */
  repeat: boolean
  /** Setup: stack matching hand/face-up cards for a replacement draw. */
  stacks: boolean
  /** Setup: zone-aware arrangement (low cards fine in hand, wilds wanted up). */
  balance: boolean
  /** none: never denies. naive: highest card. assigned: only the last defender denies. */
  denial: 'none' | 'naive' | 'assigned'
  /** Among equally denying plays, spend the lowest sufficient rank. */
  minimal: boolean
  /** off: everyone denies alone. bots: trust only bot defenders. logical: trust the
   *  equilibrium defender whatever species, until proven unreliable. */
  cooperate: 'off' | 'bots' | 'logical'
  /** Save a wild as the last face-up card → first blind flip is guaranteed legal. */
  pipeline: 'off' | 'basic' | 'refined'
  /** none: no memory. events: remembers witnessed burns. full: tracks seen cards to holders. */
  tracking: 'none' | 'events' | 'full'
  /** Expected-value gamble on the draw pile instead of always picking up. */
  chance: boolean
  /** Feed high cards to swollen hands, restrict players close to going out. */
  pressure: boolean
}

const CONFIGS: Record<BotLevel, BotConfig> = {
  // 1 "by the books": lowest legal card, strongest cards up, no tricks.
  1: { finish: false, sets: false, escape: false, repeat: false, stacks: false, balance: false, denial: 'none', minimal: false, cooperate: 'off', pipeline: 'off', tracking: 'none', chance: false, pressure: false },
  // 2 "solid club player": sets, same-turn finishes, keeps wilds, never loops.
  2: { finish: true, sets: true, escape: true, repeat: true, stacks: false, balance: false, denial: 'none', minimal: false, cooperate: 'off', pipeline: 'off', tracking: 'none', chance: false, pressure: false },
  // 3 "sharp": stacking, wild-last pipeline, chance EV — pure shedding gains, no
  // denial yet (measured: blunt denial LOSES games; denying is a weapon, not a habit).
  3: { finish: true, sets: true, escape: true, repeat: true, stacks: true, balance: false, denial: 'none', minimal: false, cooperate: 'off', pipeline: 'basic', tracking: 'none', chance: true, pressure: false },
  // 4 "strong": assigned denial with the cheapest sufficient card, balanced setup,
  // pressure on two-card opponents, and the refined flip pipeline (leave the pile
  // low for blind flips; keep the last wild for the row's end). No cooperation yet:
  // trusting another seat to defend only pays once you can verify it can.
  4: { finish: true, sets: true, escape: true, repeat: true, stacks: true, balance: true, denial: 'assigned', minimal: true, cooperate: 'off', pipeline: 'refined', tracking: 'events', chance: true, pressure: true },
  // 5 "perfect human": everything, a full seen-card ledger, equilibrium cooperation
  // that trusts human defenders until they waste a block, and forced-win detection.
  5: { finish: true, sets: true, escape: true, repeat: true, stacks: true, balance: true, denial: 'assigned', minimal: true, cooperate: 'logical', pipeline: 'refined', tracking: 'full', chance: true, pressure: true },
}

export const BOT_LEVEL_OPTIONS: Array<{ level: BotLevel; title: string; blurb: string }> = [
  { level: 1, title: 'By the book', blurb: 'Plays the lowest legal card. No tricks.' },
  { level: 2, title: 'Solid', blurb: 'Sheds sets, keeps wilds, plans same-turn finishes.' },
  { level: 3, title: 'Sharp', blurb: 'Blocks players about to go out and stacks its setup.' },
  { level: 4, title: 'Strong', blurb: 'Denies with the cheapest sufficient card and sets up safe flips.' },
  { level: 5, title: 'Perfect human', blurb: 'Counts every card it has seen. Only deck draws stay hidden.' },
]

/** The shipped ladder. Exported for the simulation lab, which benchmarks the levels
 *  against each other and ablates single skills to attribute their value. */
export const botConfigFor = (level: number): BotConfig =>
  CONFIGS[Math.max(1, Math.min(5, Math.trunc(level || DEFAULT_BOT_LEVEL))) as BotLevel]

const configFor = botConfigFor

// --- public view: the only snapshot fields a bot may read ------------------------------

type Pub = {
  snap: Snapshot
  me: number
  rules: Rules
  hand: Card[]
  up: Card[]
  pile: Card[]
  others: Array<{ seat: number; handCount: number; up: Card[]; downCount: number; place: number | null; bot: boolean }>
  deckDead: boolean
}

function pub(snap: Snapshot, p: number): Pub {
  return {
    snap, me: p, rules: snap.rules,
    hand: snap.players[p]!.hand,
    up: snap.players[p]!.up,
    pile: snap.pile,
    others: snap.players.map((q, seat) => seat === p ? null! : ({
      seat, handCount: q.hand.length, up: q.up, downCount: q.down.length, place: q.place, bot: q.bot,
    })).filter(Boolean),
    deckDead: snap.drawCount === 0,
  }
}

// --- card values: the same rank is worth different amounts in different zones ----------

/** Raw keep-utility, zone independent: wilds outrank everything, then face value. */
function keepUtility(rank: Rank, rules: Rules): number {
  if (rank === '10' && rules.tenBurns) return 30
  if (rank === '2' && rules.twoResets) return 29
  if (rank === '5' && rules.invisibleFive) return 20
  return RANK_VALUE[rank]
}

/** Why zones differ: the hand is played first and REFILLS while the deck lives, so it
 *  is a tempo zone where low cards leave easily. The face-up row is reached only when
 *  the deck is dead: no refills, so wilds (always playable) and high cards (beat a
 *  random pile, deny opponents) are gold, and low cards are traps. A wild saved as the
 *  LAST face-up card makes the first blind flip 100% legal — the single biggest
 *  endgame lever in the game, and the reason 2/10 face up is super high value. */
function zoneValue(card: Card, zone: 'hand' | 'up', rules: Rules): number {
  const rank = card.rank
  if (zone === 'hand') {
    let v = keepUtility(rank, rules)
    if (isWild(rank, rules)) v *= 0.8 // the deck bails you out; hoarding is wasted
    else if (RANK_VALUE[rank] <= 6) v -= 4 // low ordinary cards clog the tempo zone
    return v
  }
  let v = keepUtility(rank, rules) * 1.3
  if (isWild(rank, rules)) v += 10 // guaranteed playable whenever the row is reached
  else if (RANK_VALUE[rank] >= 11) v += 3
  else if (RANK_VALUE[rank] <= 7) v -= 5
  return v
}

// --- level-5 ledger: what a perfect human remembers ------------------------------------
//
// Built exclusively from observeBot() over the public stream. known[i] is the set of
// cards we SAW enter player i's hand — a pickup, a failed flip/chance, or the card a
// setup swap knocked off their face-up row (swaps are public) — that have not become
// public again. Always a subset of their real hand, never a guess. burnedRanks
// remembers witnessed burns. humanSlack counts a human defender visibly declining to
// block a known threat, which ends the level-5 "bet on their judgment" equilibrium.

type Ledger = {
  pileModel: Card[]               // pile as last observed, for pickup/burn attribution
  burnedRanks: Map<Rank, number>
  known: Array<Set<string>>
  /** Per seat: witnessed failures to block a known single-card threat behind it.
   *  Trust in a defender — human OR bot — is earned by behavior, not assumed. */
  slack: number[]
}

const ledgers = new WeakMap<SkitgubbeGame, Ledger>()

function ledgerOf(game: SkitgubbeGame, snap: Snapshot): Ledger {
  let l = ledgers.get(game)
  if (!l) {
    l = { pileModel: [...snap.pile], burnedRanks: new Map(), known: snap.players.map(() => new Set<string>()), slack: snap.players.map(() => 0) }
    ledgers.set(game, l)
  }
  while (l.known.length < snap.players.length) { l.known.push(new Set()); l.slack.push(0) }
  return l
}

/** Feed one public action into the ledger. The view calls this after every move
 *  (human and bot); engine-only harnesses mirror it. Events arrive in play order. */
export function observeBot(game: SkitgubbeGame, prev: Snapshot, next: Snapshot, events: GameEvent[]): void {
  const l = ledgerOf(game, next)
  const pile = [...l.pileModel]
  const burn = () => { for (const c of pile) l.burnedRanks.set(c.rank, Math.min(4, (l.burnedRanks.get(c.rank) ?? 0) + 1)); pile.length = 0 }
  const pick = (seat: number, extra: Card[]) => { for (const c of [...pile, ...extra]) l.known[seat]!.add(c.id); pile.length = 0 }
  for (const e of events) {
    if (e.type === 'play') pile.push(...e.cards)
    else if (e.type === 'burn') burn()
    else if (e.type === 'pickup') pick(e.player, [])
    else if (e.type === 'flip' || e.type === 'chance') {
      if (e.ok) pile.push(e.card)
      else pick(e.player, [e.card])
    } else if (e.type === 'swap') {
      // Setup swaps are public: the incoming card is now face up on the table, and the
      // group it replaced is a KNOWN card sitting in that player's hidden hand.
      for (const c of e.toHand) l.known[e.player]!.add(c.id)
    }
    // 'stack' needs no ledger work: the stacked card was private and becomes public;
    // its replacement draw is from the deck and stays unknown.
  }
  // Defender reliability, any species: this seat played an ordinary card while a
  // single KNOWN card sat behind it, and the play left that card legal. One such
  // waste ends the "trust that seat to defend" equilibrium for the rest of the deal —
  // a human feeding a threat and a lower-level bot that never denies are the same fact.
  for (const e of events) {
    if (e.type !== 'play' || !e.cards.length) continue
    const mover = e.cards[0]!
    if (!next.players[e.player] || isWild(mover.rank, next.rules)) continue // wilds never block anyway
    const after = [...pile, ...e.cards]
    if (burnReason(after, next.rules)) continue // a burn restarts the pile; judging it is noise
    const threat = singleKnownThreatBehind(prev, next, e.player)
    if (threat && canPlayOn(threat.rank, after, next.rules)) l.slack[e.player] = (l.slack[e.player] ?? 0) + 1
  }
  // Re-sync with the authoritative snapshot: whatever is public now is public.
  l.pileModel = [...next.pile]
  const publicNow = new Set<string>()
  for (const c of next.pile) publicNow.add(c.id)
  for (const q of next.players) for (const c of q.up) publicNow.add(c.id)
  for (const ids of l.known) for (const id of ids) if (publicNow.has(id)) ids.delete(id)
}

/** The single-card opponent right after `seat` whose exact card we can see (their one
 *  face-up card, or a tracked hand card). Used to judge a defender's missed block. */
function singleKnownThreatBehind(prev: Snapshot, next: Snapshot, seat: number): Card | null {
  const n = next.players.length
  for (let step = 1; step < n; step++) {
    const at = (seat + step) % n
    const before = prev?.players[at]
    const now = next.players[at]!
    if (!before || now.place !== null) continue
    const totalBefore = before.hand.length + before.up.length + before.down.length
    if (totalBefore !== 1) continue
    if (before.up.length === 1) return before.up[0]!
    // Hand-held single card: only identified if the ledger saw it enter; the caller
    // cannot reach the ledger from here cheaply, so only the visible case counts.
    return null
  }
  return null
}

/** Resolve a card id ("KS", "10H") to its card shape without touching hidden zones. */
function catalogCard(id: string): Card | null {
  const rank = (id.length === 3 ? id.slice(0, 2) : id.slice(0, 1)) as Rank
  const suit = id.slice(-1) as Card['suit']
  return RANK_VALUE[rank] === undefined ? null : { id, rank, suit }
}

/** Ranks that could still be a given hidden card, given everything we have seen. */
function unlocatedCounts(l: Ledger, view: Pub): Map<Rank, number> {
  const out = new Map<Rank, number>()
  for (const r of Object.keys(RANK_VALUE) as Rank[]) out.set(r, 4)
  const take = (rank: Rank) => out.set(rank, Math.max(0, (out.get(rank) ?? 0) - 1))
  for (const c of view.pile) take(c.rank)
  for (const q of view.snap.players) for (const c of q.up) take(c.rank)
  for (const c of view.hand) take(c.rank)
  // My own face-down cards stay unknown TO ME, so they stay in the pool. Others'
  // hands contribute exactly the cards the ledger watched enter them.
  for (let seat = 0; seat < view.snap.players.length; seat++) {
    if (seat === view.me) continue
    for (const id of l.known[seat] ?? []) {
      const card = catalogCard(id)
      if (card) take(card.rank)
    }
  }
  for (const [rank, count] of l.burnedRanks) for (let i = 0; i < count; i++) take(rank)
  return out
}

/** Probability that a hidden single card (in an opponent's hand or face-down) can be
 *  legally played on `pileAfter`, from the bot's point of view. */
function pHiddenLegal(l: Ledger, view: Pub, pileAfter: Card[], tracking: BotConfig['tracking']): number {
  const ranks = Object.keys(RANK_VALUE) as Rank[]
  if (tracking === 'none') {
    const legal = ranks.filter(r => canPlayOn(r, view.pile, view.rules)).length
    return legal / ranks.length
  }
  const counts = unlocatedCounts(l, view)
  let total = 0, legal = 0
  for (const r of ranks) {
    const c = counts.get(r) ?? 0
    total += c
    if (canPlayOn(r, pileAfter, view.rules)) legal += c
  }
  return total ? legal / total : 0.5
}

/** Their KNOWN cards force a win whatever anyone does to the pile: the finishing plan
 *  opens with a 2 (any pile becomes 2-top: everything legal) or a 10 (burn to an
 *  empty pile: everything legal), after which the owner controls every top. An ace, a
 *  10 and three 3s is the classic: burn, 3-3-3, ace. A 5 does NOT force (it stays
 *  see-through on the old requirement), so 5-led plans are ignored here. */
function forcedWin(cards: Card[], rules: Rules): boolean {
  if (!cards.length || cards.length > 8) return false
  const openers = cards.filter(c => (c.rank === '2' && rules.twoResets) || (c.rank === '10' && rules.tenBurns))
  for (const opener of openers) {
    const rest = cards.filter(c => c.id !== opener.id)
    const pileAfter = opener.rank === '10' ? [] : [opener]
    if (finishPlan(rest, [], pileAfter, rules, true)) return true
  }
  return false
}

// --- setup: arrange hand + face-up before play ------------------------------------------

/** Greedy zone-aware swaps. The precondition keepUtility(h) > keepUtility(u) keeps the
 *  owner-approved invariant that the face-up row ends at least as strong as the hand;
 *  balance only decides WHICH improving swaps are worth the tempo. */
export function chooseSwaps(game: SkitgubbeGame, p: number, level: number = DEFAULT_BOT_LEVEL): Array<[handId: string, upId: string]> {
  const cfg = configFor(level)
  return chooseSwapsWith(game, p, cfg)
}

/** The lab seam for setup, mirroring chooseMoveWith. */
export function chooseSwapsWith(game: SkitgubbeGame, p: number, cfg: BotConfig): Array<[handId: string, upId: string]> {
  const snap = game.getSnapshot()
  const self = snap.players[p]!
  const rules = snap.rules
  const hand = [...self.hand]
  const up = [...self.up]
  const swaps: Array<[string, string]> = []
  for (;;) {
    let best: { h: Card; u: Card; gain: number } | null = null
    // A face-up card whose rank also sits in the hand is STACK fodder, not swap
    // fodder: covering it with a king destroys a set (and the replacement draw), so
    // those slots are off-limits to the swap search. Nothing else changes.
    const handRanks = new Set(hand.map(c => c.rank))
    for (const h of hand) for (const u of up) {
      if (u.rank !== h.rank && handRanks.has(u.rank)) continue
      if (keepUtility(h.rank, rules) <= keepUtility(u.rank, rules)) continue
      // Balanced view: what the swap is worth in ZONE terms, not raw keep value.
      let gain = zoneValue(h, 'up', rules) - zoneValue(u, 'up', rules) + zoneValue(u, 'hand', rules) - zoneValue(h, 'hand', rules)
      if (!cfg.balance) gain = keepUtility(h.rank, rules) - keepUtility(u.rank, rules)
      if (!best || gain > best.gain) best = { h, u, gain }
    }
    if (!best || best.gain <= 0.5) break
    swaps.push([best.h.id, best.u.id])
    hand[hand.indexOf(best.h)] = best.u
    up[up.indexOf(best.u)] = best.h
  }
  return swaps
}

/** Arranges the whole table before ready: swaps, then stacking churn. A stack trades a
 *  known hand card for a random replacement plus a thicker face-up set; it wins when
 *  the churn beats keeping the known card (low ordinary cards are prime churn fuel). */
export function prepareBot(game: SkitgubbeGame, p: number, level: number = DEFAULT_BOT_LEVEL): void {
  prepareBotWith(game, p, configFor(level))
}

export function prepareBotWith(game: SkitgubbeGame, p: number, cfg: BotConfig): void {
  for (const [h, u] of chooseSwapsWith(game, p, cfg)) game.swap(p, h, u)
  if (cfg.stacks) {
    const meanHand = (rules: Rules) =>
      (Object.keys(RANK_VALUE) as Rank[]).reduce((sum, r) => sum + zoneValue({ id: '', rank: r, suit: 'S' }, 'hand', rules), 0) / 13
    for (let guard = 0; guard < 6; guard++) {
      const snap = game.getSnapshot()
      const self = snap.players[p]!
      if (!self.hand.length) break
      let best: { h: Card; u: Card; gain: number } | null = null
      for (const h of self.hand) for (const u of self.up) {
        if (h.rank !== u.rank) continue
        // Replacement lands in the hand; the stacked copy thickens the up set.
        const gain = zoneValue(h, 'up', snap.rules) + (cfg.balance ? meanHand(snap.rules) : keepUtility(h.rank, snap.rules)) - zoneValue(h, 'hand', snap.rules) + 4
        if (!best || gain > best.gain) best = { h, u, gain }
      }
      // Stack only when it clearly beats keeping the card: churn is a gamble on the
      // unseen deck, so demand a real margin.
      if (!best || best.gain <= 2 || !game.swap(p, best.h.id, best.u.id)) break
    }
  }
  game.ready(p)
}

// --- threats and denial -----------------------------------------------------------------

type Threat = {
  seat: number
  card: Card | null   // exact card when publicly known (their single face-up, or ledger)
  unstoppable: boolean // wild last card, or known cards force a quick win: race instead
}

/** The opponent closest to going out after me. total ≤ 1 is denyable when we know (or
 *  can bound) the card; a forced-win hand at any size up to 8 cards is unstoppable.
 *  Ledger-derived knowledge is level 5 only: lower levels treat hidden as hidden. */
function criticalThreat(l: Ledger, view: Pub, cfg: BotConfig): Threat | null {
  const useLedger = cfg.tracking === 'full'
  const n = view.snap.players.length
  let found: Threat | null = null
  for (let step = 1; step <= n && !found; step++) {
    const seat = (view.me + step) % n
    const q = view.snap.players[seat]!
    if (q.place !== null || seat === view.me) continue
    const total = q.hand.length + q.up.length + q.down.length
    if (total === 1) {
      if (q.hand.length === 1 && view.deckDead) {
        const known = [...(l.known[seat] ?? [])]
        const card = useLedger && known.length ? catalogCard(known[0]!) : null
        found = { seat, card, unstoppable: false }
      } else if (q.hand.length === 0 && q.up.length === 1) {
        found = { seat, card: q.up[0]!, unstoppable: isWild(q.up[0]!.rank, view.rules) }
      } else if (q.hand.length === 0 && q.up.length === 0 && q.down.length === 1) {
        found = { seat, card: null, unstoppable: false }
      }
      continue
    }
    if (!useLedger) continue
    // Known cards forcing a quick win: the ledger's view of their hand, plus their
    // whole face-up row once the hand is empty (then the row is exactly their cards).
    const knownHand = [...(l.known[seat] ?? [])].map(catalogCard).filter(Boolean) as Card[]
    const cards = q.hand.length ? knownHand : [...q.up]
    if (forcedWin(cards, view.rules)) found = { seat, card: null, unstoppable: true }
  }
  return found
}

/** The player whose job it is to deny the threat: whoever plays immediately before it.
 *  Level 5 plays the equilibrium and trusts that seat even when human — betting on the
 *  defender's judgment keeps everyone's positioning optimal — unless the human has
 *  already wasted a block this deal, or the defender provably cannot deny (blind, or
 *  tracked cards top out too low). Level 4 trusts bot defenders only. */
function iAmDefender(l: Ledger, view: Pub, threat: Threat, cfg: BotConfig): boolean {
  if (cfg.cooperate === 'off') return true
  const n = view.snap.players.length
  let seat = (threat.seat - 1 + n) % n
  while (view.snap.players[seat]!.place !== null) seat = (seat - 1 + n) % n
  if (seat === view.me) return true
  const d = view.snap.players[seat]!
  if (cfg.cooperate === 'bots' && !d.bot) return true
  if (cfg.cooperate === 'logical' && (l.slack[seat] ?? 0) > 0) return true
  // What can the defender actually deny with? A blind player cannot aim at all.
  if (!d.hand.length && !d.up.length) return true
  const tools: Card[] = d.hand.length
    ? (cfg.tracking === 'full' ? [...(l.known[seat] ?? [])].map(catalogCard).filter(Boolean) as Card[] : [])
    : [...d.up]
  if (d.hand.length && !tools.length) return false // unknown hand: assume competence
  const best = tools.filter(c => !isWild(c.rank, view.rules)).sort((a, b) => RANK_VALUE[b.rank] - RANK_VALUE[a.rank])[0]
  return !best || RANK_VALUE[best.rank] < RANK_VALUE.J
}

// --- finishing ----------------------------------------------------------------------------

/** Look for a finish on THIS turn, using only known cards. `depth` allows 2/burn
 *  chains; without it only a direct last-card play counts (level 1). */
function finishPlan(hand: Card[], up: Card[], pile: Card[], rules: Rules, depth: boolean): string[] | null {
  const cards = hand.length ? hand : up
  const groups = new Map<Rank, Card[]>()
  for (const card of cards) groups.set(card.rank, [...(groups.get(card.rank) ?? []), card])
  for (const [rank, group] of groups) {
    if (!canPlayOn(rank, pile, rules)) continue
    for (let count = group.length; count > 0; count--) {
      const played = group.slice(0, count)
      const ids = played.map(c => c.id)
      const rest = cards.filter(c => !ids.includes(c.id))
      const h = hand.length ? rest : []
      const u = hand.length ? up : rest
      if (!h.length && !u.length) {
        if (!isFinishForbidden(rank, rules)) return ids
        continue
      }
      if (!depth) continue
      const nextPile = [...pile, ...played]
      const burns = burnReason(nextPile, rules)
      const again = (rank === '2' && rules.twoResets) || (burns && rules.burnPlaysAgain)
      if (again && finishPlan(h, u, burns ? [] : nextPile, rules, depth)) return ids
    }
  }
  return null
}

// --- repetition guard ------------------------------------------------------------------------

const history = new WeakMap<SkitgubbeGame, Map<string, Map<string, number>>>()
function positionKey(s: Snapshot, p: number): string {
  return JSON.stringify([p, s.drawCount, s.burnedCount, s.pile.map(c => c.rank),
    s.players.map((q, i) => [q.place, i === p ? q.hand.map(c => c.rank).sort() : q.hand.length,
      q.up.map(c => c.rank).sort(), q.down.length])])
}
const moveKey = (move: Move, s: Snapshot, p: number): string => move.type === 'play'
  ? `play:${move.ids.length}:${[...s.players[p]!.hand, ...s.players[p]!.up].find(c => c.id === move.ids[0])!.rank}`
  : move.type

// Coarse war detector. Exact positions churn in a pickup war (hands keep changing
// composition), so the exact-position guard never fires. A real player instead
// notices "we have traded basically this same trick three times in the last few
// turns" and changes it. Model exactly that: a small ring of recent coarse
// situations (buckets, not card lists) per seat, and a count of how often the SAME
// coarse situation + move just recurred. Three hits inside the ring forces the
// least-recently-tried action, which a true cycle must rotate through.
const recentRings = new WeakMap<SkitgubbeGame, Map<number, string[]>>()
function coarseKey(s: Snapshot): string {
  const bucket = (n: number) => n <= 3 ? 0 : n <= 7 ? 1 : 2
  // Deliberately minimal: deck dead, pile size, and (via the caller) the move itself.
  // Earlier versions keyed on pile-top rank and players' total-card buckets, and a
  // real shuttle war churns exactly those (hands oscillate 5↔11, tops rotate), so the
  // repetition stayed invisible. Pile size + move is stable enough to catch the war
  // and coarse enough to survive the churn.
  return JSON.stringify([s.drawCount === 0 ? 1 : 0, bucket(s.pile.length)])
}
function recordRecent(game: SkitgubbeGame, p: number, before: Snapshot, move: Move): void {
  const key = `${coarseKey(before)}|${moveKey(move, before, p)}`
  const seats = recentRings.get(game) ?? new Map<number, string[]>()
  const ring = seats.get(p) ?? []
  ring.push(key)
  if (ring.length > 16) ring.shift()
  seats.set(p, ring)
  recentRings.set(game, seats)
}
function recentCount(game: SkitgubbeGame, p: number, before: Snapshot, move: Move): number {
  const key = `${coarseKey(before)}|${moveKey(move, before, p)}`
  return (recentRings.get(game)?.get(p) ?? []).filter(k => k === key).length
}

// --- the move chooser --------------------------------------------------------------------

export function chooseMove(game: SkitgubbeGame, p: number, level: number = DEFAULT_BOT_LEVEL): Move {
  return chooseMoveWith(game, p, botConfigFor(level))
}

/** The lab seam: benchmark arbitrary capability configurations. */
export function chooseMoveWith(game: SkitgubbeGame, p: number, cfg: BotConfig): Move {
  const snap = game.getSnapshot()
  const view = pub(snap, p)
  const l = ledgerOf(game, snap)
  const self = view.snap.players[p]!
  const source = game.source(p)

  if (source === 'down') return { type: 'flip', id: self.down[0]!.id }

  // 1. Finish now if the known cards can go out THIS turn. Face-down cards mean an
  //    empty hand+up row is NOT a finish — it is the blind phase — so with cards still
  //    down, finishing is impossible and the pipeline takes over instead.
  if (!self.down.length) {
    const finish = finishPlan(self.hand, self.up, snap.pile, view.rules, cfg.finish)
    if (finish && game.canPlay(p, finish)) return { type: 'play', ids: finish }
  }

  const candidates = candidatePlays(game, p, view, cfg)
  const threat = cfg.denial !== 'none' ? criticalThreat(l, view, cfg) : null
  // A forced-win opponent is raced, never fed or fought: pressure against it is
  // wasted positioning, so tempo scoring is told to skip it.
  const raceSeat = threat?.unstoppable ? threat.seat : null

  // The exploration guard (every level — termination is hygiene, not a skill).
  // Penalty scoring shifts all options at a revisited position together, and a bot
  // locked in denial or facilitation mode never even reaches the penalty. So every
  // play selection funnels through here: when the exact position was visited 3+ times,
  // or the same coarse situation+move just recurred in a deck-dead endgame (a pickup
  // war), fall back to the LEAST-TRIED option among plays and pickup. A true cycle
  // must rotate through every option, and each rotation changes the table until the
  // war resolves — a four-burn, a flip, or a hand running dry.
  const guarded = (preferred: Candidate | null): Move | null => {
    if (!preferred) return null
    const visits = history.get(game)?.get(positionKey(view.snap, p))
    const tried = (move: Move) => visits?.get(moveKey(move, view.snap, p)) ?? 0
    const hot = (move: Move) => recentCount(game, p, view.snap, move)
    const heat = (move: Move) => tried(move) >= 3 ? 99
      : view.deckDead && hot(move) >= (move.type === 'pickup' ? 3 : 2) ? 50 : 0
    if (!candidates.some(c => heat({ type: 'play', ids: c.ids })) && !heat({ type: 'pickup' })) {
      return { type: 'play', ids: preferred.ids }
    }
    const options: Array<Candidate | 'pickup'> = [...candidates, ...(game.canPickUp(p) ? ['pickup' as const] : [])]
    const hottest = options.map(o => heat(o === 'pickup' ? { type: 'pickup' } : { type: 'play', ids: o.ids }))
    const coolest = Math.min(...hottest)
    const cool = options.filter((_, i) => hottest[i] === coolest)
    if (cool.length === 1 && cool[0] === 'pickup') return { type: 'pickup' }
    const pool = cool.filter((o): o is Candidate => o !== 'pickup')
    const from = pool.length ? pool : candidates
    const best = from.reduce((a, b) => scorePlay(a, view, cfg, game, p, raceSeat) > scorePlay(b, view, cfg, game, p, raceSeat) ? a : b)
    return { type: 'play', ids: best.ids }
  }

  // 2. Deny the player about to go out — or clear the road for the seat that can.
  //    Forced-win threats are marked unstoppable: no pile stops a 10/2-led finish, so
  //    spending denial (or positioning for someone else's) only burns our own cards.
  if (threat && !threat.unstoppable) {
    if (cfg.denial === 'naive') {
      const deny = candidates.filter(c => !c.burns && !isWild(c.rank, view.rules)).sort((a, b) => RANK_VALUE[b.rank] - RANK_VALUE[a.rank])[0]
      const move = guarded(deny ?? null)
      if (move) return move
    } else if (iAmDefender(l, view, threat, cfg)) {
      const move = guarded(denialPlay(candidates, threat, l, view, cfg))
      if (move) return move
    } else {
      const move = guarded(facilitatePlay(candidates, view))
      if (move) return move
    }
  }

  // 3. Endgame pipeline: never spend the wild that guarantees the safe first flip.
  const pipelined = pipelineFilter(candidates, view, cfg)
  if (pipelined.length) {
    const move = guarded(pipelined.reduce((a, b) => scorePlay(a, view, cfg, game, p, raceSeat) > scorePlay(b, view, cfg, game, p, raceSeat) ? a : b))
    if (move) return move
  }

  // 4. Ordinary tempo.
  if (candidates.length) {
    const move = guarded(candidates.reduce((a, b) => scorePlay(a, view, cfg, game, p, raceSeat) > scorePlay(b, view, cfg, game, p, raceSeat) ? a : b))
    if (move) return move
  }

  // 5. Stuck: gamble or take the pile.
  if (cfg.chance && game.canChance(p)) {
    const pHit = pHiddenLegal(l, view, snap.pile, cfg.tracking)
    if (pHit * 6 > (1 - pHit) * (snap.pile.length + 1)) return { type: 'chance' }
  }
  if (game.canPickUp(p)) return { type: 'pickup' }
  return { type: 'pass' }
}

type Candidate = { ids: string[]; rank: Rank; n: number; burns: boolean; again: boolean; pileAfter: Card[] }

function candidatePlays(game: SkitgubbeGame, p: number, view: Pub, cfg: BotConfig): Candidate[] {
  const source = game.source(p)
  if (source !== 'hand' && source !== 'up') return []
  const cards = source === 'hand' ? view.hand : view.up
  const groups = new Map<Rank, Card[]>()
  for (const card of cards) groups.set(card.rank, [...(groups.get(card.rank) ?? []), card])
  const out: Candidate[] = []
  for (const [rank, group] of groups) {
    const maxN = cfg.sets ? group.length : 1
    for (let n = maxN; n > 0; n--) {
      const ids = group.slice(0, n).map(c => c.id)
      if (!game.canPlay(p, ids)) continue
      const played = group.slice(0, n)
      const pileAfter = [...view.pile, ...played]
      const burns = !!burnReason(pileAfter, view.rules)
      const again = (rank === '2' && view.rules.twoResets) || (burns && view.rules.burnPlaysAgain)
      out.push({ ids, rank, n, burns, again, pileAfter })
    }
  }
  return out
}

/** Deny: make the threat's next play illegal (or as unlikely as the unseen deck allows).
 *  Wilds never deny (a wild top lets everything through) and a 10 burns to an empty
 *  pile, which denies nothing — both excluded structurally. Among plays that deny
 *  equally well, spend the LOWEST sufficient rank and keep the higher one for later:
 *  if every ace is accounted for, a king denies exactly as much as an ace. */
function denialPlay(candidates: Candidate[], threat: Threat, l: Ledger, view: Pub, cfg: BotConfig): Candidate | null {
  const ordinary = candidates.filter(c => !isWild(c.rank, view.rules) && !c.burns)
  if (!ordinary.length) return null
  if (threat.card) {
    const denying = ordinary.filter(c => !canPlayOn(threat.card!.rank, c.pileAfter, view.rules))
    if (!denying.length) return null
    return denying.reduce((a, b) => RANK_VALUE[a.rank] !== RANK_VALUE[b.rank]
      ? (cfg.minimal ? (RANK_VALUE[a.rank] < RANK_VALUE[b.rank] ? a : b) : (RANK_VALUE[a.rank] > RANK_VALUE[b.rank] ? a : b))
      : (a.n > b.n ? a : b))
  }
  let best: { c: Candidate; p: number } | null = null
  for (const c of ordinary) {
    const pLose = pHiddenLegal(l, view, c.pileAfter, cfg.tracking)
    const better = !best
      || pLose < best.p - 0.02
      || (Math.abs(pLose - best.p) <= 0.02 && (cfg.minimal
        ? RANK_VALUE[c.rank] < RANK_VALUE[best.c.rank] || (RANK_VALUE[c.rank] === RANK_VALUE[best.c.rank] && c.n > best.c.n)
        : RANK_VALUE[c.rank] > RANK_VALUE[best.c.rank]))
    if (better) best = { c, p: pLose }
  }
  return best?.c ?? null
}

/** Facilitate: I am not the defender, so keep the pile LOW and cheap. The defending
 *  seat after me then has every high card available to spend ("p2 can lay its N"). */
function facilitatePlay(candidates: Candidate[], view: Pub): Candidate | null {
  const ordinary = candidates.filter(c => !isWild(c.rank, view.rules) && !c.burns)
  if (!ordinary.length) return null
  return ordinary.reduce((a, b) => RANK_VALUE[a.rank] < RANK_VALUE[b.rank] || (RANK_VALUE[a.rank] === RANK_VALUE[b.rank] && a.n > b.n) ? a : b)
}

/** Pipeline: when face-down cards remain, the face-up row should END on a wild. Playing
 *  the wild first wastes the guarantee; playing it last makes the first blind flip
 *  legal on any card. Refined (level 5) also leaves the pile LOW when no wild remains,
 *  maximising blind-flip odds, and keeps a last wild in a dying hand for the same job. */
function pipelineFilter(candidates: Candidate[], view: Pub, cfg: BotConfig): Candidate[] {
  if (cfg.pipeline === 'off' || !candidates.length) return []
  const self = view.snap.players[view.me]!
  const down = self.down.length > 0
  const wilds = (cards: Card[]) => cards.filter(c => isWild(c.rank, view.rules))
  const onUpRow = self.hand.length === 0 && self.up.length > 0
  if (onUpRow && down) {
    const upWilds = wilds(view.up)
    const nonWild = candidates.filter(c => !isWild(c.rank, view.rules))
    if (upWilds.length && nonWild.length) return nonWild
    if (!upWilds.length && cfg.pipeline === 'refined') {
      // No wild to save: at least leave the easiest possible pile for the blind flip.
      return [...candidates].sort((a, b) => RANK_VALUE[a.rank] - RANK_VALUE[b.rank]).slice(0, 1)
    }
  }
  if (view.deckDead && self.hand.length > 0 && down && !wilds(view.up).length && wilds(view.hand).length === 1) {
    // Keep one wild as the hand's LAST card: the 2-top pile lets the whole up row play.
    const nonWild = candidates.filter(c => !isWild(c.rank, view.rules))
    if (nonWild.length) return nonWild
  }
  return []
}

function scorePlay(c: Candidate, view: Pub, cfg: BotConfig, game: SkitgubbeGame, p: number, raceSeat: number | null = null): number {
  const rules = view.rules
  const self = view.snap.players[p]!
  let score = c.n * 5 - keepUtility(c.rank, rules) * 2
  if (cfg.sets && c.n >= 2) score += 2 * c.n
  if (cfg.sets) {
    const tail = view.pile.length ? view.pile.slice(-4).filter(x => x.rank === c.rank).length : 0
    if (tail && tail + c.n >= 4) score += 12 // completes a four-of-a-kind burn
    else if (tail) score += tail * 4 // stacking toward a burn is progress: cards leave only by burning or finishing
  }
  if (c.burns) score += Math.min(18, view.pile.length * 2)
  if (c.again) score += 14
  if (cfg.escape && isWild(c.rank, rules)) {
    const wildsLeft = [...self.hand, ...self.up].filter(x => isWild(x.rank, rules)).length - c.n
    if (wildsLeft === 0 && self.down.length) score -= 12
  }
  if (RANK_VALUE[c.rank] <= 7 && self.hand.length && view.snap.drawCount > 0) score += 3
  // Endgame lead on an empty pile: with the deck dead and few cards left in the war,
  // a low lead just hands the pile back (seed 38's queen war looped exactly so). Lead
  // high instead and force a resolution — a four-burn or the opponent's pickup.
  // Wilds stay excluded: the pipeline and escape rules own those.
  if (view.deckDead && !view.pile.length && !isWild(c.rank, rules)
    && self.hand.length + self.up.length + self.down.length <= 6) {
    score += RANK_VALUE[c.rank] * 3
  }
  if (cfg.pressure && !c.again) {
    const next = nextOpponent(view)
    if (next && next.seat !== raceSeat) {
      if (next.handCount + next.up.length + next.downCount <= 2) {
        // A two-card neighbour is one turn from winning: restricting its replies
        // outweighs hoarding a high card, so this weight beats the keep penalty.
        const replies = (Object.keys(RANK_VALUE) as Rank[]).filter(r => canPlayOn(r, c.burns ? [] : c.pileAfter, rules)).length
        score += (13 - replies) * 4
      } else if (next.handCount >= 5) {
        score += RANK_VALUE[c.rank] * 0.5
      }
    }
  }
  if (cfg.repeat) {
    const repeats = history.get(game)?.get(positionKey(view.snap, p))?.get(moveKey({ type: 'play', ids: c.ids }, view.snap, p)) ?? 0
    score -= repeats * 60
  }
  return score
}

function nextOpponent(view: Pub): Pub['others'][number] | null {
  const n = view.snap.players.length
  for (let step = 1; step <= n; step++) {
    const seat = (view.me + step) % n
    const q = view.snap.players[seat]!
    if (q.place === null && seat !== view.me) return view.others.find(o => o.seat === seat) ?? null
  }
  return null
}

/** Apply a move to the game. Returns false only if the move was illegal, which the
 *  tests treat as a bot bug. */
export function applyMove(game: SkitgubbeGame, p: number, move: Move): boolean {
  const before = game.getSnapshot()
  let accepted: boolean
  switch (move.type) {
    case 'play': accepted = game.play(p, move.ids); break
    case 'flip': accepted = game.flip(p, move.id); break
    case 'chance': accepted = game.chance(p); break
    case 'pickup': accepted = game.pickUp(p); break
    case 'pass': accepted = game.pass(p); break
  }
  if (accepted) {
    recordRecent(game, p, before, move)
    const ledger = history.get(game) ?? new Map<string, Map<string, number>>()
    const key = positionKey(before, p)
    const moves = ledger.get(key) ?? new Map<string, number>()
    const chosen = moveKey(move, before, p)
    moves.set(chosen, (moves.get(chosen) ?? 0) + 1)
    ledger.set(key, moves)
    if (ledger.size > 256) ledger.delete(ledger.keys().next().value!)
    history.set(game, ledger)
  }
  return accepted
}
