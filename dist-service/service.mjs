// node_modules/agent-code-extension-api/dist/service.js
function defineService(module) {
  return module;
}
var errorText = (error) => String(error?.message ?? error).slice(0, 2e3);
function runService(module) {
  const port = globalThis.process?.parentPort;
  if (!port)
    throw new Error("runService() requires an Agent Code service process (process.parentPort).");
  const handlers = /* @__PURE__ */ new Map();
  let ready = false;
  let stopping = false;
  const context = {
    ready(endpoints) {
      if (ready || stopping)
        return;
      ready = true;
      port.postMessage({ kind: "ready", ...endpoints?.length ? { endpoints } : {} });
    },
    onRequest(name, handler) {
      if (!/^[a-zA-Z][a-zA-Z0-9_.-]{0,63}$/.test(name))
        throw new Error(`Invalid service request name: ${name}`);
      handlers.set(name, handler);
      return { dispose: () => {
        if (handlers.get(name) === handler)
          handlers.delete(name);
      } };
    },
    log: (line) => {
      port.postMessage({ kind: "log", line: String(line).slice(0, 2e3) });
    }
  };
  port.on("message", ({ data }) => {
    const message = data;
    if (!message || typeof message.kind !== "string")
      return;
    if (message.kind === "request" && typeof message.id === "string" && typeof message.name === "string") {
      const { id, name, params } = message;
      void (async () => {
        const handler = handlers.get(name);
        try {
          if (!handler)
            throw new Error(`No service handler registered for ${name}`);
          const value = await handler(params);
          if (!stopping)
            port.postMessage({ kind: "result", id, ok: true, ...value === void 0 ? {} : { value } });
        } catch (error) {
          if (!stopping)
            port.postMessage({ kind: "result", id, ok: false, error: errorText(error) });
        }
      })();
      return;
    }
    if (message.kind === "shutdown" && typeof message.id === "string") {
      const { id } = message;
      stopping = true;
      void (async () => {
        try {
          await module.stop?.();
        } catch {
        }
        port.postMessage({ kind: "stopped", id });
      })();
    }
  });
  void Promise.resolve(module.start(context)).catch((error) => {
    context.log(`service start failed: ${errorText(error)}`);
  });
}

// server/http.ts
import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { networkInterfaces } from "node:os";

// server/room.ts
import { randomBytes } from "node:crypto";

// src/game/engine/cards.ts
var RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var SUITS = ["S", "H", "D", "C"];
var RANK_VALUE = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};
function newDeck() {
  const deck = [];
  for (const suit of SUITS) for (const rank of RANKS) deck.push({ id: `${rank}${suit}`, rank, suit });
  return deck;
}
function shuffle(items, random) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const swap = out[i];
    out[i] = out[j];
    out[j] = swap;
  }
  return out;
}

// src/game/engine/rules.ts
var DEFAULT_RULES = Object.freeze({
  invisibleFive: true,
  twoResets: true,
  tenBurns: true,
  fourBurns: true,
  burnPlaysAgain: true,
  swapPhase: true,
  chanceCard: true,
  noSpecialFinish: false,
  sevenOrLower: false
});
var RULE_KEYS = Object.keys(DEFAULT_RULES);
function parseRules(value) {
  const out = { ...DEFAULT_RULES };
  if (!value || typeof value !== "object") return out;
  const input = value;
  for (const key2 of RULE_KEYS) if (typeof input[key2] === "boolean") out[key2] = input[key2];
  return out;
}
function isWild(rank, rules) {
  return rank === "2" && rules.twoResets || rank === "10" && rules.tenBurns || rank === "5" && rules.invisibleFive;
}
function effectiveTop(pile, rules) {
  for (let i = pile.length - 1; i >= 0; i--) {
    const rank = pile[i].rank;
    if (rank === "5" && rules.invisibleFive) continue;
    return rank;
  }
  return null;
}
function canPlayOn(rank, pile, rules) {
  if (isWild(rank, rules)) return true;
  const top = effectiveTop(pile, rules);
  if (top === null) return true;
  if (top === "2" && rules.twoResets) return true;
  if (top === "7" && rules.sevenOrLower) return RANK_VALUE[rank] <= 7;
  return RANK_VALUE[rank] >= RANK_VALUE[top];
}
function burnReason(pile, rules) {
  const top = pile[pile.length - 1];
  if (!top) return null;
  if (top.rank === "10" && rules.tenBurns) return "ten";
  if (rules.fourBurns && pile.length >= 4 && pile.slice(-4).every((card) => card.rank === top.rank)) return "four";
  return null;
}
var isFinishForbidden = (rank, rules) => rules.noSpecialFinish && (rank === "2" || rank === "10" || rank === "A");

// src/game/engine/game.ts
var HAND_SIZE = 3;
var MIN_PLAYERS = 2;
var MAX_PLAYERS = 4;
var DEFAULT_NAMES = ["You", "Astrid", "Nils", "Greta"];
var nextGameId = 1;
var SkitgubbeGame = class {
  rules;
  gameId = nextGameId++;
  phase;
  players;
  current = 0;
  pile = [];
  draw;
  burnedCount = 0;
  finished = 0;
  skitgubbe = null;
  events = [];
  constructor(options = {}) {
    this.rules = { ...options.rules ?? DEFAULT_RULES };
    const count = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, Math.trunc(options.players ?? 3)));
    const names = options.names ?? DEFAULT_NAMES;
    const deck = options.deck ? [...options.deck] : shuffle(newDeck(), options.random ?? Math.random);
    this.players = Array.from({ length: count }, (_, i) => ({
      name: names[i] ?? `Player ${i + 1}`,
      bot: i !== 0,
      hand: [],
      up: [],
      upSlots: {},
      down: [],
      ready: false,
      place: null
    }));
    for (const pile of ["down", "up", "hand"])
      for (let round = 0; round < HAND_SIZE; round++)
        for (const player of this.players) player[pile].push(deck.shift());
    for (const player of this.players) player.up.forEach((card, i) => {
      player.upSlots[card.id] = i;
    });
    this.draw = deck.reverse();
    this.phase = "swap";
    if (!this.rules.swapPhase) this.startPlay();
  }
  /** Replace the table with `state` and start playing from it (see SetupState). The same
   *  shape as Blockfall's setup(): it exists so rules can be tested from the exact
   *  position they are about, instead of by replaying a whole game to get there. */
  setup(state) {
    const deck = new Map(newDeck().map((card) => [card.id, card]));
    const take = (ids = []) => ids.map((id) => {
      const card = deck.get(id);
      if (!card) throw new Error(`setup: unknown or duplicate card ${id}`);
      deck.delete(id);
      return card;
    });
    if (state.players.length !== this.players.length) throw new Error("setup: player count must match the game");
    state.players.forEach((seat, i) => {
      const player = this.players[i];
      player.hand = take(seat.hand);
      player.up = take(seat.up);
      player.upSlots = Object.fromEntries(player.up.map((card, i2) => [card.id, i2]));
      player.down = take(seat.down);
      player.place = seat.place ?? null;
      player.ready = true;
    });
    this.pile = take(state.pile);
    this.draw = take(state.draw).reverse();
    this.burnedCount = deck.size;
    this.finished = this.players.filter((p) => p.place !== null).length;
    this.phase = "playing";
    this.current = state.current ?? 0;
    this.skitgubbe = null;
    this.events = [];
  }
  // --- queries -------------------------------------------------------------------
  getSnapshot() {
    return {
      gameId: this.gameId,
      phase: this.phase,
      rules: { ...this.rules },
      players: this.players.map((p) => ({ ...p, hand: [...p.hand], up: [...p.up], upSlots: { ...p.upSlots }, down: [...p.down] })),
      current: this.current,
      pile: [...this.pile],
      drawCount: this.draw.length,
      burnedCount: this.burnedCount,
      skitgubbe: this.skitgubbe
    };
  }
  /** Everything that happened since the last call, for sound, animation and callouts. */
  takeEvents() {
    const out = this.events;
    this.events = [];
    return out;
  }
  source(p) {
    const player = this.players[p];
    if (!player || player.place !== null) return null;
    if (player.hand.length) return "hand";
    if (player.up.length) return "up";
    if (player.down.length) return "down";
    return null;
  }
  /** Cards this player may put down right now, each judged as a single card. Face-down
   *  cards are never "legal" in advance: they are played blind with flip(), which is the
   *  whole point of them. Judging singly matters for "no finishing on 2/10/A": holding
   *  A A with nothing else, playing ONE ace is fine even though playing both is not. */
  legalCardIds(p) {
    if (!this.isTurn(p)) return [];
    const source = this.source(p);
    if (source !== "hand" && source !== "up") return [];
    const cards = this.players[p][source];
    return cards.filter((card) => canPlayOn(card.rank, this.pile, this.rules) && !this.forbiddenFinish(p, source, 1, card)).map((card) => card.id);
  }
  canChance(p) {
    return this.isTurn(p) && this.rules.chanceCard && this.draw.length > 0 && this.source(p) === "hand";
  }
  canPickUp(p) {
    return this.isTurn(p) && this.pile.length > 0;
  }
  /**
   * The one dead end the rules can create: with "no finishing on 2/10/A" a player whose
   * only remaining cards are forbidden finishers cannot play on an EMPTY pile, and there
   * is nothing to pick up. Real tables just skip that player until the pile has cards.
   */
  canPass(p) {
    if (!this.isTurn(p) || this.pile.length > 0) return false;
    const source = this.source(p);
    return (source === "hand" || source === "up") && this.legalCardIds(p).length === 0 && !this.canChance(p);
  }
  // --- swap phase -------------------------------------------------------------------
  swap(p, handId, upId) {
    const player = this.players[p];
    if (this.phase !== "swap" || !player || player.ready) return false;
    const h = player.hand.findIndex((c) => c.id === handId);
    const u = player.up.findIndex((c) => c.id === upId);
    if (h < 0 || u < 0) return false;
    const card = player.hand[h];
    const target = player.up[u];
    const slot = player.upSlots[target.id];
    if (card.rank === target.rank) {
      player.hand.splice(h, 1);
      player.up.push(card);
      player.upSlots[card.id] = slot;
      this.events.push({ type: "stack", player: p, card });
      this.refill(p);
    } else {
      const group = player.up.filter((c) => player.upSlots[c.id] === slot);
      player.hand.splice(h, 1, ...group);
      player.up = player.up.filter((c) => player.upSlots[c.id] !== slot);
      for (const c of group) delete player.upSlots[c.id];
      player.up.splice(Math.min(u, player.up.length), 0, card);
      player.upSlots[card.id] = slot;
    }
    return true;
  }
  ready(p) {
    const player = this.players[p];
    if (this.phase !== "swap" || !player || player.ready) return false;
    player.ready = true;
    if (this.players.every((q) => q.ready)) this.startPlay();
    return true;
  }
  // --- turns ------------------------------------------------------------------------
  /** Whether play(p, cardIds) would be accepted, without changing anything. Bots and the
   *  UI use it for multi-card plays, where each card can be legal alone while the set is
   *  not (two aces as your last cards under "no finishing on 2/10/A"). */
  canPlay(p, cardIds) {
    return this.validatePlay(p, cardIds) !== null;
  }
  play(p, cardIds) {
    const valid = this.validatePlay(p, cardIds);
    if (!valid) return false;
    const { source, played } = valid;
    this.players[p][source] = this.players[p][source].filter((c) => !cardIds.includes(c.id));
    if (source === "up") for (const card of played) delete this.players[p].upSlots[card.id];
    this.pile.push(...played);
    this.events.push({ type: "play", player: p, cards: played, source });
    if (source === "hand") this.refill(p);
    this.afterPlay(p);
    return true;
  }
  validatePlay(p, cardIds) {
    if (!this.isTurn(p) || cardIds.length === 0) return null;
    const source = this.source(p);
    if (source !== "hand" && source !== "up") return null;
    const from = this.players[p][source];
    const cards = cardIds.map((id) => from.find((c) => c.id === id));
    if (cards.some((c) => !c) || new Set(cardIds).size !== cardIds.length) return null;
    const played = cards;
    const rank = played[0].rank;
    if (played.some((c) => c.rank !== rank)) return null;
    if (!canPlayOn(rank, this.pile, this.rules)) return null;
    if (this.forbiddenFinish(p, source, played.length, played[0])) return null;
    return { source, played };
  }
  /** Play a face-down card blind. A card that does not fit is taken up with the pile. */
  flip(p, downId) {
    if (!this.isTurn(p) || this.source(p) !== "down") return false;
    const player = this.players[p];
    const card = player.down.find((c) => c.id === downId);
    if (!card) return false;
    player.down = player.down.filter((c) => c.id !== downId);
    const ok = canPlayOn(card.rank, this.pile, this.rules) && !(player.down.length === 0 && isFinishForbidden(card.rank, this.rules));
    this.events.push({ type: "flip", player: p, card, ok });
    if (ok) {
      this.pile.push(card);
      this.afterPlay(p);
    } else {
      this.takePile(p, [card]);
    }
    return true;
  }
  /** Gamble on the top of the draw pile. A miss costs the pile plus that card. */
  chance(p) {
    if (!this.canChance(p)) return false;
    const card = this.draw.pop();
    const ok = canPlayOn(card.rank, this.pile, this.rules);
    this.events.push({ type: "chance", player: p, card, ok });
    if (ok) {
      this.pile.push(card);
      this.refill(p);
      this.afterPlay(p);
    } else {
      this.takePile(p, [card]);
    }
    return true;
  }
  pickUp(p) {
    if (!this.canPickUp(p)) return false;
    this.takePile(p, []);
    return true;
  }
  pass(p) {
    if (!this.canPass(p)) return false;
    this.events.push({ type: "pass", player: p });
    this.advance();
    return true;
  }
  // --- internals --------------------------------------------------------------------
  isTurn(p) {
    return this.phase === "playing" && this.current === p && this.players[p]?.place === null;
  }
  /** Would putting `count` cards like `card` down empty this player's cards entirely? */
  forbiddenFinish(p, source, count, card) {
    if (!isFinishForbidden(card.rank, this.rules)) return false;
    const player = this.players[p];
    if (source === "hand" && this.draw.length > 0) return false;
    const remaining = player.hand.length + player.up.length + player.down.length - count;
    return remaining === 0;
  }
  refill(p) {
    const hand = this.players[p].hand;
    let drawn = 0;
    while (hand.length < HAND_SIZE && this.draw.length) {
      hand.push(this.draw.pop());
      drawn++;
    }
    if (drawn) this.events.push({ type: "draw", player: p, count: drawn });
  }
  takePile(p, extra) {
    const taken = [...this.pile, ...extra];
    this.players[p].hand.push(...taken);
    this.pile = [];
    this.events.push({ type: "pickup", player: p, count: taken.length });
    this.advance();
  }
  afterPlay(p) {
    const resetTwo = this.rules.twoResets && this.pile.at(-1)?.rank === "2";
    const reason = burnReason(this.pile, this.rules);
    if (reason) {
      this.events.push({ type: "burn", player: p, reason, count: this.pile.length });
      this.burnedCount += this.pile.length;
      this.pile = [];
    }
    const player = this.players[p];
    if (!player.hand.length && !player.up.length && !player.down.length) {
      player.place = ++this.finished;
      this.events.push({ type: "finish", player: p, place: player.place });
      const left = this.players.filter((q) => q.place === null);
      if (left.length <= 1) {
        this.phase = "over";
        const loser = this.players.findIndex((q) => q.place === null);
        if (loser >= 0) {
          this.players[loser].place = ++this.finished;
          this.skitgubbe = loser;
          this.events.push({ type: "over", skitgubbe: loser });
        }
        return;
      }
      this.advance();
      return;
    }
    if (resetTwo || reason && this.rules.burnPlaysAgain) return;
    this.advance();
  }
  advance() {
    for (let step = 1; step <= this.players.length; step++) {
      const next = (this.current + step) % this.players.length;
      if (this.players[next].place === null) {
        this.current = next;
        return;
      }
    }
  }
  startPlay() {
    this.phase = "playing";
    for (const player of this.players) player.ready = true;
    this.current = this.starter();
  }
  /** The owner starts with the lowest hand card EXCEPT 2. Compute after everyone is
   *  ready: swaps, stacks and replacement draws can change who has the low card.
   *  Only 2 is excluded from this comparison; do not exclude every wild rank. Ties
   *  (or the degenerate all-2 case) go to the earliest seat, counting from you. */
  starter() {
    let best = 0;
    let bestValue = Infinity;
    this.players.forEach((player, i) => {
      for (const card of player.hand) {
        if (card.rank === "2") continue;
        if (RANK_VALUE[card.rank] < bestValue) {
          bestValue = RANK_VALUE[card.rank];
          best = i;
        }
      }
    });
    return best;
  }
};

// server/room.ts
var RoomError = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
function fail(status, message) {
  throw new RoomError(status, message);
}
var key = () => randomBytes(24).toString("hex");
var Room = class {
  constructor(name, nonce, now = Date.now) {
    this.now = now;
    this.join(name, nonce, true);
  }
  id = key();
  code = randomBytes(4).toString("hex").toUpperCase();
  members = [];
  revision = 0;
  closed = false;
  game = null;
  rules = { ...DEFAULT_RULES };
  aliases = /* @__PURE__ */ new Map();
  realIds = /* @__PURE__ */ new Map();
  history = [];
  requests = /* @__PURE__ */ new Map();
  join(name, nonce, creating = false) {
    if (this.closed) fail(410, "This room has ended.");
    const prior = this.members.find((m) => m.nonce === nonce);
    if (prior) {
      prior.seen = this.now();
      return prior.token;
    }
    if (this.game || this.members.length >= 4) fail(409, "This table is full or already playing.");
    const clean = typeof name === "string" ? name.normalize("NFC").trim().replace(/\s+/gu, " ") : "";
    if (!clean || clean.length > 24 || /[\p{Cc}\p{Cf}]/u.test(clean)) fail(400, "Use a name of 1\u201324 characters.");
    if (!/^[a-f0-9]{48}$/.test(nonce)) fail(400, "Invalid join identity.");
    this.members.push({ name: clean, token: key(), nonce, seen: this.now() });
    if (!creating) this.revision++;
    return this.members.at(-1).token;
  }
  authenticate(token) {
    const seat = this.members.findIndex((m) => m.token === token);
    if (seat < 0) fail(401, "Your seat could not be restored. Join the room again.");
    this.members[seat].seen = this.now();
    return seat;
  }
  connected(seat) {
    return this.now() - this.members[seat].seen < 15e3;
  }
  stamp(events) {
    this.revision++;
    this.history.push({ revision: this.revision, snapshot: this.game.getSnapshot(), events });
    if (this.history.length > 100) this.history.shift();
  }
  start(seat, revision, rules) {
    if (seat !== 0) fail(403, "Only the host can deal.");
    if (this.closed || revision !== this.revision) fail(409, "The table changed. Try again.");
    if (this.game && this.game.getSnapshot().phase !== "over") fail(409, "Finish this game before dealing again.");
    if (this.members.length < 2 || this.members.some((_, i) => !this.connected(i))) fail(409, "Wait for at least two connected players.");
    this.rules = parseRules(rules);
    this.game = new SkitgubbeGame({ players: this.members.length, names: this.members.map((m) => m.name), rules: this.rules });
    this.aliases = new Map(newDeck().map((c) => [c.id, key()]));
    this.realIds = new Map([...this.aliases].map(([id, alias]) => [alias, id]));
    this.history = [];
    this.stamp([]);
  }
  act(seat, revision, requestId, action, gameId) {
    if (!/^[a-f0-9]{48}$/.test(requestId)) fail(400, "Invalid action identity.");
    const seen = this.requests.get(this.members[seat].token) ?? /* @__PURE__ */ new Set();
    if (seen.has(requestId)) return;
    const readySameDeal = action?.type === "ready" && gameId === this.game?.getSnapshot().gameId && this.game?.getSnapshot().phase === "swap";
    if (this.closed || !this.game || revision !== this.revision && !readySameDeal) fail(409, "The table changed. Choose your move again.");
    if (this.members.some((_, i) => !this.connected(i))) fail(409, "Waiting for a player to reconnect.");
    const id = (alias) => this.realIds.get(alias) ?? "";
    const g = this.game;
    let ok = false;
    if (action?.type === "swap") ok = g.swap(seat, id(action.hand), id(action.up));
    else if (action?.type === "play" && Array.isArray(action.cards) && action.cards.length <= 4) ok = g.play(seat, action.cards.map(id));
    else if (action?.type === "flip") ok = g.flip(seat, id(action.card));
    else if (action?.type === "ready") ok = g.ready(seat);
    else if (action?.type === "chance") ok = g.chance(seat);
    else if (action?.type === "pickup") ok = g.pickUp(seat);
    else if (action?.type === "pass") ok = g.pass(seat);
    if (!ok) fail(409, "That move is not legal now.");
    seen.add(requestId);
    if (seen.size > 128) seen.delete(seen.values().next().value);
    this.requests.set(this.members[seat].token, seen);
    this.stamp(g.takeEvents());
  }
  leave(seat) {
    if (seat === 0) {
      this.closed = true;
      this.revision++;
      return;
    }
    if (this.game) {
      this.members[seat].seen = -Infinity;
      return;
    }
    this.members.splice(seat, 1);
    this.revision++;
  }
  card = (c) => ({ ...c, id: this.aliases.get(c.id) });
  project(snapshot, seat) {
    const n = snapshot.players.length;
    const rotated = (i) => (i - seat + n) % n;
    return {
      ...snapshot,
      current: rotated(snapshot.current),
      skitgubbe: snapshot.skitgubbe === null ? null : rotated(snapshot.skitgubbe),
      pile: snapshot.pile.map(this.card),
      players: Array.from({ length: n }, (_, at) => {
        const owner = (seat + at) % n, p = snapshot.players[owner];
        const hidden = (c) => ({ id: this.aliases.get(c.id), hidden: true });
        return {
          ...p,
          bot: false,
          hand: owner === seat ? p.hand.map(this.card) : p.hand.map(hidden),
          down: p.down.map(hidden),
          up: p.up.map(this.card),
          upSlots: Object.fromEntries(Object.entries(p.upSlots).map(([id, slot]) => [this.aliases.get(id), slot]))
        };
      })
    };
  }
  events(events, seat) {
    const n = this.members.length;
    return events.map((e) => {
      if (e.type === "over") return { ...e, skitgubbe: (e.skitgubbe - seat + n) % n };
      const rotated = { ...e, player: (e.player - seat + n) % n };
      if ("card" in rotated) return { ...rotated, card: this.card(rotated.card) };
      if ("cards" in rotated) return { ...rotated, cards: rotated.cards.map(this.card) };
      return rotated;
    });
  }
  view(seat, since = -1) {
    const g = this.game, snapshot = g?.getSnapshot() ?? null;
    const first = this.history[0]?.revision ?? this.revision;
    const resync = since < first - 1 || since > this.revision;
    return {
      roomId: this.id,
      revision: this.revision,
      code: this.code,
      isHost: seat === 0,
      closed: this.closed,
      paused: this.members.some((_, i) => !this.connected(i)),
      members: this.members.map((m, i) => ({ name: m.name, connected: this.connected(i), host: i === 0 })),
      rules: { ...this.rules },
      snapshot: snapshot ? this.project(snapshot, seat) : null,
      transitions: resync ? [] : this.history.filter((e) => e.revision > since).map((e) => ({ revision: e.revision, snapshot: this.project(e.snapshot, seat), events: this.events(e.events, seat) })),
      resync,
      source: g?.source(seat) ?? null,
      legal: g?.legalCardIds(seat).map((id) => this.aliases.get(id)) ?? [],
      canChance: g?.canChance(seat) ?? false,
      canPickUp: g?.canPickUp(seat) ?? false,
      canPass: g?.canPass(seat) ?? false
    };
  }
};

// server/http.ts
function fail2(status, message) {
  throw new RoomError(status, message);
}
var isLoopback = (address) => address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
var privateV4 = (s) => /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(s);
var lanAddresses = () => Object.values(networkInterfaces()).flatMap((list) => (list ?? []).filter((i) => i.family === "IPv4" && !i.internal && privateV4(i.address)).map((i) => i.address));
var TRANSPORT_HEADER = "x-agent-code-transport";
var literalHost = /^(\d{1,3}(?:\.\d{1,3}){3}):(\d{1,5})$/;
function resolveCaller(request, agentCodeHost, ownHost) {
  const socketPeer = request.socket.remoteAddress?.replace(/^::ffff:/, "");
  const marker = agentCodeHost && isLoopback(socketPeer) ? request.headers[TRANSPORT_HEADER] : void 0;
  if (marker === "lan") {
    if (request.headers.host !== ownHost) fail2(403, "Unrecognized host.");
    const peer = request.headers["x-forwarded-for"];
    const host2 = request.headers["x-forwarded-host"];
    const literal = typeof host2 === "string" ? literalHost.exec(host2) : null;
    if (!literal || !(privateV4(literal[1]) || literal[1] === "127.0.0.1")) fail2(403, "Unrecognized host.");
    return { peer: typeof peer === "string" ? peer.replace(/^::ffff:/, "") : void 0, host: host2, via: "lan" };
  }
  return { peer: socketPeer, host: request.headers.host, via: marker === "service" ? "service" : "direct" };
}
function body(request, limit = 4096) {
  if (request.headers["content-type"]?.split(";")[0].trim().toLowerCase() !== "application/json") fail2(415, "Use application/json.");
  if (Number(request.headers["content-length"] ?? 0) > limit) {
    request.resume();
    fail2(413, "Request is too large.");
  }
  return new Promise((resolve, reject) => {
    let size = 0, rejected = false;
    const chunks = [];
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        rejected = true;
        chunks.length = 0;
        reject(new RoomError(413, "Request is too large."));
        return;
      }
      if (!rejected) chunks.push(chunk);
    });
    request.on("end", () => {
      if (rejected) return;
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new RoomError(400, "Invalid JSON."));
      }
    });
    request.on("error", () => reject(new RoomError(400, "Request interrupted.")));
  });
}
async function startLanHost(options = {}) {
  const addresses = ["127.0.0.1", ...options.lan ? lanAddresses() : []];
  const built = options.assets ?? new URL("../lan-dist/", import.meta.url);
  const assets = /* @__PURE__ */ new Map();
  for (const file of await readdir(built)) {
    if (!/^(index\.html|[\w-]+\.(js|css))$/.test(file)) continue;
    assets.set(file === "index.html" ? "/" : `/${file}`, { bytes: await readFile(new URL(file, built)), type: file.endsWith(".js") ? "text/javascript" : file.endsWith(".css") ? "text/css" : "text/html" });
  }
  if (!assets.has("/")) throw new Error("Build the LAN website before hosting.");
  let room = null, port = 0;
  let tokens = 240, lastRate = Date.now(), admissions = 20, lastAdmission = Date.now();
  const rate = (admission) => {
    const now = Date.now();
    if (admission) {
      admissions = Math.min(20, admissions + (now - lastAdmission) / 3e3);
      lastAdmission = now;
      if (admissions < 1) fail2(429, "Too many join attempts. Try again shortly.");
      admissions--;
    } else {
      tokens = Math.min(240, tokens + (now - lastRate) / 40);
      lastRate = now;
      if (tokens < 1) fail2(429, "Too many requests. Try again shortly.");
      tokens--;
    }
  };
  const send = (response, status, value) => {
    response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(value));
  };
  const server = createServer(async (request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("Content-Security-Policy", "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
    try {
      const caller = resolveCaller(request, !!options.agentCodeHost, `127.0.0.1:${port}`);
      if (!isLoopback(caller.peer) && (!caller.peer || !privateV4(caller.peer))) fail2(403, "Private-network peers only.");
      if (!caller.host || caller.via !== "lan" && !addresses.some((a) => caller.host === `${a}:${port}`)) fail2(403, "Unrecognized host.");
      if (caller.via !== "service") {
        const origin = `http://${caller.host}`;
        if (request.headers.origin && request.headers.origin !== origin || request.headers["sec-fetch-site"] === "cross-site") fail2(403, "Foreign origin rejected.");
        if (request.method === "POST" && request.headers.origin !== origin) fail2(403, "Same-origin request required.");
      }
      rate(false);
      const route = request.url ?? "";
      if (request.method === "GET" && assets.has(route)) {
        const asset = assets.get(route);
        response.setHeader("Content-Type", `${asset.type}; charset=utf-8`);
        response.end(asset.bytes);
        return;
      }
      if (request.method !== "POST" || !["/api/create", "/api/join", "/api/state", "/api/start", "/api/action", "/api/leave"].includes(route)) fail2(404, "Not found.");
      const value = await body(request);
      if (!value || typeof value !== "object" || Array.isArray(value)) fail2(400, "Invalid request.");
      const input = value;
      if (route === "/api/create") {
        rate(true);
        if (!isLoopback(caller.peer)) fail2(403, "Create the room on the host computer.");
        if (room && !room.closed) {
          if (room.members[0].nonce !== input.nonce) fail2(409, "A room is already open. Rejoin or end it first.");
        } else room = new Room(input.name, input.nonce);
        send(response, 200, { token: room.members[0].token });
        return;
      }
      if (route === "/api/join") {
        rate(true);
        if (!room || room.closed) fail2(410, "No room is open on this computer.");
        if (typeof input.code !== "string" || input.code.trim().toUpperCase() !== room.code) fail2(403, "Room code does not match.");
        send(response, 200, { token: room.join(input.name, input.nonce) });
        return;
      }
      if (!room) fail2(410, "The host has closed this room.");
      const header = request.headers.authorization;
      const seat = room.authenticate(typeof header === "string" && header.startsWith("Bearer ") ? header.slice(7) : "");
      const since = typeof input.since === "number" && Number.isSafeInteger(input.since) ? input.since : -1;
      if (route === "/api/start") room.start(seat, input.revision, input.rules);
      if (route === "/api/action") room.act(seat, input.revision, input.requestId, input.action, input.gameId);
      if (route === "/api/leave") {
        room.leave(seat);
        send(response, 200, { left: true });
        return;
      }
      send(response, 200, room.view(seat, since));
    } catch (error) {
      send(response, error instanceof RoomError ? error.status : 500, { error: error instanceof RoomError ? error.message : "The host could not process this request." });
    }
  });
  server.requestTimeout = 1e4;
  server.headersTimeout = 1e4;
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(options.port ?? 0, options.lan ? "0.0.0.0" : "127.0.0.1", resolve);
  });
  port = server.address().port;
  return { origin: `http://127.0.0.1:${port}`, close: () => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
    server.closeAllConnections();
  }) };
}

// server/service.ts
var host = null;
runService(defineService({
  async start(context) {
    host = await startLanHost({ agentCodeHost: true });
    context.onRequest("status", () => ({ lanAddresses: lanAddresses() }));
    context.ready([{ name: "http", port: Number(new URL(host.origin).port) }]);
  },
  async stop() {
    await host?.close();
    host = null;
  }
}));
