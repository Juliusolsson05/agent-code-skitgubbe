import { r as i, S as ve, i as z, R as me, h as je, a as Se, j as t, s as Ne, H as Re, C as xe, b as Ce, c as $e, d as Ee, e as Ae, D as Le, f as He, g as Te, k as Fe, G as Me } from "./styles-CCgV-JYk.js";
import { d as Pe } from "./runtime-XLX8az2X.js";
const de = "skitgubbe.lan-host";
function Ie() {
  return async ({ path: a, method: h, headers: r, body: d }) => {
    const m = await fetch(`./__service/${de}${a}`, {
      method: h,
      headers: r,
      body: d,
      cache: "no-store"
    });
    return { ok: m.ok, status: m.status, json: () => m.json() };
  };
}
function Ue(a, h) {
  const r = new URL(h).origin;
  return async ({ path: d, method: m, headers: b, body: C }) => {
    if (!d.startsWith("/")) throw new Error("Invalid service path.");
    const j = await a(`${r}${d}`, {
      // WHY BOTH VERB FIELDS: the SDK 0.9 type names the verb `httpMethod`, but
      // the host's frame and runtime bridges on agent-code origin/main
      // (frameDocument.ts, runtimeDocument.ts) read `init.method`. An
      // SDK-shaped POST therefore left as a GET, carrying a body that fetch
      // refuses. agent-code#1151 reads `httpMethod || method`. Sending both
      // makes guest POSTs correct on hosts before AND after that fix, so in-app
      // guests don't wait on it. Drop `method` once every supported host reads
      // `httpMethod`.
      httpMethod: m,
      method: m,
      // WHY THE GUEST STATES ITS ORIGIN: the host's POST rule is "Origin must
      // name the address you dialed" (server/http.ts). A browser adds that
      // header itself; Agent Code's brokered fetch runs in the host app's main
      // process and adds none, so every guest POST got a 403. The value is the
      // literal origin this adapter dials, which is exactly what a browser on
      // that page would send, so the host's rule is satisfied honestly and not
      // bypassed. It works the same against the standalone CLI host and an
      // in-extension host (whose listener forwards it with the dialed Host).
      headers: [
        ...Object.entries(b).filter(([f]) => f.toLowerCase() !== "origin").map(([f, A]) => ({ name: f, value: A })),
        { name: "Origin", value: r }
      ],
      ...C === void 0 ? {} : { body: C }
    });
    return {
      ok: j.status >= 200 && j.status < 300,
      status: j.status,
      // The broker returns text; the client expects response.json(). The Skitgubbe
      // host answers JSON on every route (errors included), so parsing here
      // preserves the client's existing error envelope handling exactly.
      json: async () => JSON.parse(j.body)
    };
  };
}
function We(a, h) {
  return Ue((r, d) => a.fetch(r, d), h);
}
function De(a, h) {
  const r = a?.lanAddresses;
  return Array.isArray(r) ? r.filter((d) => typeof d == "string" && /^\d{1,3}(?:\.\d{1,3}){3}$/.test(d)).map((d) => `http://${d}:${h}`) : [];
}
function be(a) {
  const h = a.trim(), r = /^http:\/\/(localhost|(?:\d{1,3}\.){3}\d{1,3})(?::([1-9]\d{0,4}))?\/?$/.exec(h), d = () => new Error("Paste the host’s printed http:// private IPv4 address and port, without a path, code or password.");
  if (!r) throw d();
  const [, m, b] = r;
  if (b && Number(b) > 65535) throw d();
  if (m !== "localhost") {
    const C = m.split(".");
    if (C.some((A) => String(Number(A)) !== A || Number(A) > 255)) throw d();
    const [j, f] = C.map(Number);
    if (!(j === 127 || j === 10 || j === 192 && f === 168 || j === 172 && f >= 16 && f <= 31)) throw d();
  }
  return new URL(h).origin + "/";
}
function qe({ room: a, audio: h, enabled: r, action: d, onAgain: m }) {
  const b = i.useRef(null), C = i.useRef(null), j = i.useRef(null), f = i.useRef(null), A = i.useRef(null), B = i.useRef(-1), L = i.useRef(Promise.resolve()), H = i.useRef(!0), [u, T] = i.useState(a.snapshot), [S, X] = i.useState(!0), [D, re] = i.useState(!1), [$, M] = i.useState([]), [P, _] = i.useState(null), [E, I] = i.useState(/* @__PURE__ */ new Set()), [U, ae] = i.useState(""), [K, q] = i.useState(h.isMuted), [k, J] = i.useState(0), [N, O] = i.useState(null), [ie, oe] = i.useState(!1), Z = i.useRef(/* @__PURE__ */ new Map()), V = i.useRef(a);
  V.current = a;
  const Y = () => {
    const e = f.current;
    e && O({ seats: u.players.map((s, c) => e.seatAnchor(u.players.length, c)), pile: e.pileAnchor(), draw: e.drawAnchor() });
  }, ee = async (e, s, c) => {
    if (!j.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const p = document.createElement("div");
    p.className = "sg-flight", p.style.width = `${s.width}px`, p.innerHTML = Ae(/* @__PURE__ */ t.jsx(xe, { rank: e.rank, suit: e.suit })), j.current.append(p), await p.animate([
      { transform: `translate(${s.x - s.width / 2}px, ${s.y - s.width * 0.7}px) scale(1)` },
      { transform: `translate(${c.x - s.width / 2}px, ${c.y - s.width * 0.7}px) scale(${c.width / s.width})` }
    ], { duration: 280, easing: "ease-in-out", fill: "both" }).finished.catch(() => {
    }), p.remove();
  }, te = (e) => {
    const s = C.current.getBoundingClientRect(), c = b.current.getBoundingClientRect();
    return { x: s.left - c.left + e.x, y: s.top - c.top + e.y, width: e.cardWidth };
  }, n = (e) => {
    const s = b.current.getBoundingClientRect();
    return { x: e.left - s.left + e.width / 2, y: e.top - s.top + e.height / 2, width: e.width };
  }, g = {
    play: async (e, s) => {
      if (!f.current) return;
      const c = te(s ?? f.current.pileAnchor());
      await Promise.all(e.map((p) => ee(p, Z.current.has(p.id) ? n(Z.current.get(p.id)) : { ...c, y: c.y + 200, width: 90 }, c)));
    },
    receive: async (e, s) => {
      if (await new Promise(requestAnimationFrame), f.current && e.length <= 4) {
        const c = te(s === "draw" ? f.current.drawAnchor() : f.current.pileAnchor());
        await Promise.all(e.map((p) => {
          const l = b.current?.querySelector(`[data-card="${p.id}"]`);
          return l ? ee(p, c, n(l.getBoundingClientRect())) : Promise.resolve();
        }));
      }
      H.current && I((c) => new Set([...c].filter((p) => !e.some((l) => l.id === p))));
    }
  };
  i.useEffect(() => {
    H.current = !0;
    try {
      const e = new ve(C.current, { deal: () => h.deal(), place: () => h.place(), reveal: () => h.reveal(), burn: () => h.burn(), gather: () => h.gather() });
      f.current = e, e.setOnResize(Y), Y();
    } catch {
      oe(!0);
    }
    return () => {
      H.current = !1, f.current?.dispose(), f.current = null;
    };
  }, []), i.useEffect(() => {
    if (!a.snapshot || a.revision <= B.current) return;
    const e = B.current;
    B.current = a.revision;
    const s = a.transitions.filter((l) => l.revision > e), c = !A.current && e < 0, p = a.resync || !s.length;
    X(!0), L.current = L.current.then(async () => {
      if (H.current) {
        if (p) {
          const l = a.snapshot;
          T(l), c && l.phase === "swap" ? (I(new Set(l.players[0].hand.map((x) => x.id))), await f.current?.animate(null, l, [], g)) : f.current?.sync(l), A.current = l;
        } else for (const l of s) {
          if (!H.current) return;
          const x = A.current, se = l.snapshot, ke = new Set(x?.players[0]?.hand.map((W) => W.id) ?? []);
          I(new Set(se.players[0].hand.filter((W) => !ke.has(W.id)).map((W) => W.id))), T(se);
          const Q = l.events.find((W) => W.type === "play" || W.type === "pickup" || W.type === "flip" || W.type === "burn");
          Q && "player" in Q && ae(`${se.players[Q.player].name} ${Q.type === "play" ? "played" : Q.type === "pickup" ? "took the pile" : Q.type === "burn" ? "burned the pile" : "turned a card over"}.`), await f.current?.animate(x, se, l.events, g), A.current = se;
        }
        H.current && (I(/* @__PURE__ */ new Set()), M([]), _(null), a.revision === B.current && (X(!1), a.snapshot?.current === 0 && h.yourTurn()));
      }
    }).catch(() => {
      H.current && (f.current?.sync(V.current.snapshot), T(V.current.snapshot), I(/* @__PURE__ */ new Set()), X(!1));
    });
  }, [a]);
  const o = u.players[0], R = u.phase === "swap" && !o.ready, y = o.hand.length ? "hand" : o.up.length ? "up" : "down", v = r && !S && !D && u.phase === "playing" && u.current === 0 && o.place === null, ue = r && !S && !D && R, ge = [
    { key: "hand", cards: [...o.hand].sort((e, s) => z(e) && z(s) ? me[e.rank] - me[s.rank] || e.suit.localeCompare(s.suit) : 0), label: `Hand · ${o.hand.length}` },
    { key: "up", cards: o.up, label: `Face up · ${o.up.length}` },
    { key: "down", cards: o.down, label: `Face down · ${o.down.length}` }
  ], w = ge.filter((e) => R ? e.key !== "down" : e.key === y).flatMap((e) => e.cards), he = (je(o.hand.length, !1, 696) - 1) * 72;
  i.useLayoutEffect(Y, [he, u.players.length]);
  const G = new Set(a.legal), F = async (e) => {
    if (!(!r || S || D)) {
      Z.current = new Map([...b.current?.querySelectorAll("[data-card]") ?? []].map((s) => [s.dataset.card, s.getBoundingClientRect()])), re(!0), h.unlock();
      try {
        await d(e), M([]), _(null);
      } catch {
      } finally {
        H.current && re(!1);
      }
    }
  }, pe = (e, s = !1) => {
    if (w.some((c) => c.id === e.id)) {
      if (ue) {
        if (P === e.id) return _(null);
        const c = o.hand.some((l) => l.id === e.id), p = o.hand.some((l) => l.id === P);
        if (!P || c === p) return _(e.id);
        F({ type: "swap", hand: c ? e.id : P, up: c ? P : e.id });
        return;
      }
      if (v) {
        if (y === "down") {
          F({ type: "flip", card: e.id });
          return;
        }
        !z(e) || !G.has(e.id) || M((c) => {
          const p = w.filter((x) => z(x) && x.rank === e.rank && G.has(x.id)).map((x) => x.id);
          if (s) return p.every((x) => c.includes(x)) ? [] : p;
          if (c.includes(e.id)) return c.filter((x) => x !== e.id);
          const l = w.find((x) => x.id === c[0]);
          return l && z(l) && l.rank === e.rank ? [...c, e.id] : [e.id];
        });
      }
    }
  }, ce = (e) => {
    const s = Math.max(0, Math.min(w.length - 1, e));
    J(s), b.current?.querySelector(`[data-index="${s}"]`)?.focus({ preventScroll: !0 });
  };
  i.useLayoutEffect(() => {
    if (S || D) return;
    const e = document.activeElement;
    (!e || e === document.body || b.current?.contains(e)) && (b.current?.querySelector(`[data-index="${Math.min(k, w.length - 1)}"]`) ?? b.current?.querySelector(".sg-primary"))?.focus({ preventScroll: !0 });
  }, [u, S, D]);
  const ye = () => {
    if (!v) return;
    if (y === "down") {
      w[k] && F({ type: "flip", card: w[k].id });
      return;
    }
    const e = $.length ? $ : w[k] && G.has(w[k].id) ? [w[k].id] : [];
    e.length && F({ type: "play", cards: e });
  }, fe = Se(u);
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: b,
      className: "sg-root",
      role: "application",
      "aria-label": "Skitgubbe with friends",
      "aria-busy": S || D,
      "data-phase": u.phase,
      "data-turn": v ? "you" : "other",
      onKeyDown: (e) => {
        if (!(e.target instanceof HTMLElement) || !e.target.dataset.card) return;
        const s = Number(e.target.dataset.index);
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "Enter", " "].includes(e.key) && e.preventDefault(), e.key === "Home" && ce(0), e.key === "End" && ce(w.length - 1), (e.key === "ArrowLeft" || e.key === "ArrowRight") && ce(s + (e.key === "ArrowLeft" ? -1 : 1)), (e.key === "ArrowUp" || e.key === "ArrowDown") && ce(s + (e.key === "ArrowUp" ? -1 : 1) * Ee(w.length, !1, 696)), e.key === " " && pe(w[s], e.shiftKey), e.key === "Enter" && (R ? pe(w[s]) : ye()), e.key.toLowerCase() === "t" && v && F({ type: "pickup" }), e.key.toLowerCase() === "d" && v && F({ type: "chance" });
      },
      children: [
        /* @__PURE__ */ t.jsx("style", { children: Ne }),
        /* @__PURE__ */ t.jsxs("header", { className: "sg-header", children: [
          /* @__PURE__ */ t.jsx("h1", { children: "Skitgubbe" }),
          /* @__PURE__ */ t.jsxs("p", { className: "sg-record", children: [
            o.name,
            " · with friends"
          ] }),
          /* @__PURE__ */ t.jsx("button", { className: "sg-ghost", onClick: () => {
            h.setMuted(!K), q(!K);
          }, children: K ? "Sound on" : "Mute" })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "sg-table", style: { height: 560 - he }, children: [
          /* @__PURE__ */ t.jsx("div", { className: "sg-scene", ref: C, "aria-hidden": "true" }),
          ie && /* @__PURE__ */ t.jsx("div", { className: "sg-scene-error", children: "3D is unavailable. Use the cards and controls below." }),
          N && u.players.map((e, s) => s ? /* @__PURE__ */ t.jsxs("div", { className: `sg-seat${u.current === s ? " is-active" : ""}`, style: { left: N.seats[s].x, top: N.seats[s].y }, children: [
            /* @__PURE__ */ t.jsx("strong", { children: e.name }),
            /* @__PURE__ */ t.jsx("span", { children: e.place ? `Out #${e.place}` : `${e.hand.length} in hand · ${e.down.length} hidden` })
          ] }, s) : null),
          N && u.phase === "playing" && /* @__PURE__ */ t.jsxs("div", { className: "sg-need", style: { left: N.pile.x, top: N.pile.y - N.pile.cardWidth }, children: [
            /* @__PURE__ */ t.jsx("strong", { children: fe.short }),
            /* @__PURE__ */ t.jsx("span", { children: fe.detail })
          ] }),
          N && /* @__PURE__ */ t.jsxs("span", { className: "sg-stack-count", style: { left: N.draw.x, top: N.draw.y - N.draw.cardWidth }, children: [
            u.drawCount,
            " to draw"
          ] }),
          u.phase === "over" && !S && /* @__PURE__ */ t.jsx("div", { className: "sg-result", children: /* @__PURE__ */ t.jsxs("div", { className: "sg-result-card", role: "dialog", "aria-label": "Result", children: [
            /* @__PURE__ */ t.jsx("h2", { children: u.skitgubbe === 0 ? "You’re the skitgubbe." : "You made it out." }),
            /* @__PURE__ */ t.jsx("ol", { children: [...u.players].sort((e, s) => e.place - s.place).map((e) => /* @__PURE__ */ t.jsxs("li", { children: [
              e.place,
              ". ",
              e.name
            ] }, e.name)) }),
            a.isHost ? /* @__PURE__ */ t.jsx("button", { className: "sg-primary", disabled: !r || D, onClick: () => void m(), children: "Play again" }) : /* @__PURE__ */ t.jsx("p", { children: "Waiting for the host to deal again." })
          ] }) })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: `sg-hand${v ? " is-turn" : ""}`, style: { height: 176 + he }, children: ge.map((e) => /* @__PURE__ */ t.jsxs("div", { className: `sg-row sg-row-${e.key}${y === e.key && u.phase === "playing" ? " is-source" : ""}`, role: "listbox", "aria-label": e.label, "aria-multiselectable": !R, children: [
          /* @__PURE__ */ t.jsxs("span", { className: "sg-row-label", children: [
            e.label,
            y === e.key && u.phase === "playing" && /* @__PURE__ */ t.jsx("span", { className: "sg-playable-hint", children: " · Playing from here" })
          ] }),
          !e.cards.length && /* @__PURE__ */ t.jsx("span", { className: "sg-batch-empty", children: "Empty" }),
          /* @__PURE__ */ t.jsx(Re, { cards: e.cards, width: e.key === "hand" ? 696 : 216, cardSize: e.key === "hand" ? 90 : 64, slots: e.key === "up" ? o.upSlots : void 0, hidden: E, render: (s, c) => {
            const p = w.findIndex((x) => x.id === s.id), l = ue && e.key !== "down" || v && e.key === y && (y === "down" || G.has(s.id));
            return /* @__PURE__ */ t.jsx(
              "button",
              {
                type: "button",
                role: "option",
                "aria-selected": $.includes(s.id) || P === s.id,
                "aria-disabled": !l,
                "data-card": s.id,
                "data-index": p,
                tabIndex: p === Math.min(k, w.length - 1) ? 0 : -1,
                onFocus: () => J(p),
                "aria-label": z(s) ? `${$e(s)}${l ? ", playable" : ""}` : `Face-down card ${c + 1}`,
                className: `sg-card${l ? " is-playable" : ""}${$.includes(s.id) || P === s.id ? " is-selected" : ""}`,
                onClick: (x) => pe(s, x.shiftKey),
                onDoubleClick: () => {
                  v && G.has(s.id) && F({ type: "play", cards: $.includes(s.id) ? $ : [s.id] });
                },
                children: z(s) ? /* @__PURE__ */ t.jsx(xe, { className: "sg-card-art", rank: s.rank, suit: s.suit }) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsx(Ce, { className: "sg-card-art" }),
                  /* @__PURE__ */ t.jsx("span", { className: "sg-back-number", children: c + 1 })
                ] })
              },
              s.id
            );
          } })
        ] }, e.key)) }),
        /* @__PURE__ */ t.jsxs("div", { className: "sg-decision", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "sg-decision-text", role: "status", children: [
            /* @__PURE__ */ t.jsx("strong", { children: a.paused ? "Waiting for a player to reconnect" : S ? "Cards in motion" : R ? "Set up your table" : u.phase === "swap" ? "Waiting for everyone to be ready" : v ? `Your turn: ${fe.short.toLowerCase()}` : o.place ? `You finished #${o.place}` : `Waiting for ${u.players[u.current].name}` }),
            /* @__PURE__ */ t.jsx("span", { children: R ? "Select a hand card and a face-up card. Matches stack; different ranks swap." : U })
          ] }),
          /* @__PURE__ */ t.jsx("div", { className: "sg-actions", children: R ? /* @__PURE__ */ t.jsx("button", { className: "sg-primary", disabled: !ue, onClick: () => void F({ type: "ready" }), children: "Ready to play" }) : u.phase === "playing" && o.place === null ? /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            a.canChance && /* @__PURE__ */ t.jsx("button", { className: "sg-secondary", disabled: !v, onClick: () => void F({ type: "chance" }), children: "Chance card" }),
            a.canPickUp && /* @__PURE__ */ t.jsx("button", { className: "sg-secondary", disabled: !v, onClick: () => void F({ type: "pickup" }), children: "Take the pile" }),
            a.canPass && /* @__PURE__ */ t.jsx("button", { className: "sg-secondary", disabled: !v, onClick: () => void F({ type: "pass" }), children: "Pass" }),
            /* @__PURE__ */ t.jsx("button", { className: "sg-primary", disabled: !v || y !== "down" && !$.length && !G.has(w[k]?.id ?? ""), onClick: ye, children: y === "down" ? "Turn a card over" : `Play${$.length > 1 ? ` ${$.length} cards` : ""}` })
          ] }) : null })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "sg-flights", ref: j, "aria-hidden": "true" })
      ]
    }
  );
}
const Oe = ".sg-lan{width:1240px;min-height:904px;color:#eef1f5;background:#171b21;font:14px/1.5 system-ui,sans-serif;border-radius:14px;overflow:hidden}.sg-lan *{box-sizing:border-box}.sg-lobby{width:640px;margin:70px auto;padding:32px;border:1px solid #ffffff22;border-radius:14px;background:#20262e}.sg-lobby h1{font:32px Georgia,serif;margin:0 0 16px}.sg-lobby p{color:#bbc2cc}.sg-lobby label{display:flex;flex-direction:column;gap:6px;margin:14px 0}.sg-lobby input:not([type=checkbox]){padding:10px 12px;border:1px solid #ffffff40;border-radius:6px;color:#fff;background:#151a21;font:inherit}.sg-lan button{padding:10px 16px;margin:4px;color:#eef1f5;border:1px solid #ffffff33;border-radius:8px;background:#303945;font:inherit;cursor:pointer}.sg-lan button:disabled{opacity:.45;cursor:default}.sg-lan .sg-primary{background:#e3c56f;color:#241a06}.sg-join-fields{margin-top:22px;padding-top:8px;border-top:1px solid #ffffff22}.sg-lobby .sg-lan-rule{flex-direction:row;align-items:start}.sg-lan-rule small{display:block;color:#bbc2cc;font-size:12px}.sg-members{padding-left:24px}.sg-members li{padding:5px}.sg-share{color:#e3c56f!important;overflow-wrap:anywhere;user-select:all}.sg-lan-bar{height:40px;display:flex;align-items:center;gap:16px;padding:0 14px;font-size:12px}.sg-lan-bar span:first-child{margin-right:auto;user-select:all}.sg-lan-bar button{padding:3px 10px}.sg-lan .sg-root button{margin:0}.sg-lan .sg-card{padding:0;background:none;border:none}.sg-lobby [role=alert]{color:#ffc0b5}", le = () => [...crypto.getRandomValues(new Uint8Array(24))].map((a) => a.toString(16).padStart(2, "0")).join(""), we = async ({ path: a, method: h, headers: r, body: d }) => fetch(a, { method: h, headers: r, body: d, cache: "no-store" }), ne = "skitgubbe.lan-seat";
function Be({ api: a, audio: h }) {
  const [r, d] = i.useState(null), [m, b] = i.useState(""), [C, j] = i.useState(""), [f, A] = i.useState(""), [B, L] = i.useState(""), [H, u] = i.useState(!1), [T, S] = i.useState(!1), [X, D] = i.useState(!0), [re, $] = i.useState(!1), M = i.useRef(!1), [P, _] = i.useState({ ...Le }), E = i.useRef(null), I = i.useRef(we), U = i.useRef(-1), ae = i.useRef(""), K = i.useRef(Promise.resolve()), q = i.useRef(!0), k = i.useRef("");
  if (!k.current)
    try {
      k.current = sessionStorage.getItem("sg.lan-nonce") ?? le(), sessionStorage.setItem("sg.lan-nonce", k.current);
    } catch {
      k.current = le();
    }
  const J = async (n) => {
    E.current = n;
    try {
      n ? sessionStorage.setItem(ne, JSON.stringify(n)) : sessionStorage.removeItem(ne);
    } catch {
    }
    a?.storage && await a.storage.set(ne, n);
  }, N = async (n, g, o = E.current?.token) => {
    const R = await I.current({ path: n, method: "POST", headers: { "Content-Type": "application/json", ...o ? { Authorization: `Bearer ${o}` } : {} }, body: JSON.stringify(g) }), y = await R.json();
    if (!R.ok) throw new Error(y.error ?? `Host returned ${R.status}.`);
    return y;
  }, O = (n, g = {}) => {
    const o = E.current?.token, R = K.current.then(async () => {
      const y = await N(n, { ...g, since: U.current }, o);
      if (!(!q.current || o !== E.current?.token || M.current)) {
        if (y.revision >= U.current) {
          U.current = y.revision, d(y);
          const v = JSON.stringify(y.rules);
          ae.current !== v && (ae.current = v, _(y.rules));
        }
        u(!0), L("");
      }
    }).catch((y) => {
      throw q.current && o === E.current?.token && !M.current && (L(y instanceof Error ? y.message : String(y)), u(!1)), y;
    });
    return K.current = R.catch(() => {
    }), R;
  }, ie = async (n) => {
    if (!a) I.current = we;
    else if (n.host) {
      if (!a.services) throw new Error("This Agent Code build does not support LAN services.");
      await a.services.start(de);
      const g = await a.services.expose(de, !0);
      if (!g.lan || !g.port) throw new Error("LAN exposure was not granted.");
      if (n.urls = De(await a.services.invoke(de, "status", {}), g.port), !n.urls.length) throw new Error("No private network address found. Connect to your local Wi-Fi or Ethernet and try again.");
      I.current = Ie();
    } else {
      if (!a.net) throw new Error("This Agent Code build does not support LAN joining.");
      I.current = We(a.net, be(n.destination));
    }
    E.current = n;
  };
  i.useEffect(() => {
    q.current = !0, (async () => {
      try {
        let o = null;
        try {
          o = JSON.parse(sessionStorage.getItem(ne) ?? "null");
        } catch {
        }
        !o && a?.storage && (o = await a.storage.get(ne) ?? null), o && typeof o.token == "string" && /^[a-f0-9]{48}$/.test(o.token) && (await ie(o), await O("/api/state"));
      } catch (o) {
        q.current && L(o instanceof Error ? o.message : String(o));
      } finally {
        q.current && D(!1);
      }
    })();
    let n;
    const g = async () => {
      E.current?.token && !M.current && await O("/api/state").catch(() => {
      }), q.current && (n = setTimeout(g, 700));
    };
    return n = setTimeout(g, 700), () => {
      q.current = !1, clearTimeout(n);
    };
  }, []);
  const oe = async (n) => {
    if (!(T || !m.trim())) {
      S(!0), L("");
      try {
        const g = { token: "", host: n, destination: n || !a ? "" : be(f), urls: a ? [] : [location.origin] };
        await ie(g);
        const o = await N(n ? "/api/create" : "/api/join", { name: m, nonce: k.current, ...n ? {} : { code: C } }, "");
        if (!o.token) throw new Error("Host did not return a seat.");
        g.token = o.token, await J(g), U.current = -1, await O("/api/state");
      } catch (g) {
        L(g instanceof Error ? g.message : String(g));
      } finally {
        S(!1);
      }
    }
  }, Z = async (n) => {
    await O("/api/action", { revision: U.current, requestId: le(), gameId: r?.snapshot?.gameId, action: n });
  }, V = async () => {
    S(!0);
    try {
      await O("/api/start", { revision: U.current, rules: P });
    } catch {
    } finally {
      S(!1);
    }
  }, Y = async () => {
    S(!0);
    try {
      if (await K.current, E.current?.token && !r?.closed && await N("/api/leave", {}), r?.snapshot && !r.isHost && !r.closed) {
        M.current = !0, $(!0), L("");
        return;
      }
      await J(null), U.current = -1, d(null), u(!1), L(""), k.current = le();
      try {
        sessionStorage.setItem("sg.lan-nonce", k.current);
      } catch {
      }
    } catch (n) {
      L(n instanceof Error ? n.message : String(n));
    } finally {
      S(!1);
    }
  }, ee = async () => {
    await J(null), M.current = !1, $(!1), U.current = -1, d(null), L("");
  }, te = r ? `${E.current?.urls.join(" or ") || f || location.origin} · Room ${r.code}` : "";
  return /* @__PURE__ */ t.jsxs("div", { className: "sg-lan", children: [
    /* @__PURE__ */ t.jsx("style", { children: Oe }),
    re ? /* @__PURE__ */ t.jsxs("section", { className: "sg-lobby", children: [
      /* @__PURE__ */ t.jsx("h1", { children: "Your seat is waiting" }),
      /* @__PURE__ */ t.jsx("p", { children: "The table is paused while you’re away. Reopening this view also restores your seat." }),
      /* @__PURE__ */ t.jsx("button", { onClick: () => {
        M.current = !1, $(!1), O("/api/state").catch(() => {
        });
      }, children: "Resume game" })
    ] }) : r?.snapshot && !r.closed ? /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
      /* @__PURE__ */ t.jsxs("div", { className: "sg-lan-bar", children: [
        /* @__PURE__ */ t.jsx("span", { children: r.isHost ? te : `Room ${r.code}` }),
        /* @__PURE__ */ t.jsx("span", { role: "status", children: B || (H ? r.paused ? `Waiting for ${r.members.filter((n) => !n.connected).map((n) => n.name).join(", ")} to reconnect` : "Connected" : "Reconnecting…") }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => void Y(), disabled: T, children: r.isHost ? "End room" : "Step away" }),
        !H && /* @__PURE__ */ t.jsx("button", { onClick: () => void ee(), children: "Forget saved seat" })
      ] }),
      /* @__PURE__ */ t.jsx(qe, { room: r, audio: h, enabled: H && !r.paused && !T, action: Z, onAgain: V })
    ] }) : /* @__PURE__ */ t.jsxs("section", { className: "sg-lobby", children: [
      /* @__PURE__ */ t.jsx("h1", { children: "Skitgubbe with friends" }),
      X ? /* @__PURE__ */ t.jsx("p", { children: "Restoring your seat…" }) : r ? r.closed ? /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("p", { children: "The host ended this room." }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => void Y(), children: "Back to rooms" })
      ] }) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("p", { className: "sg-share", children: r.isHost ? te : `Room ${r.code}` }),
        r.isHost && E.current?.urls.every((n) => n.includes("127.0.0.1")) && /* @__PURE__ */ t.jsx("p", { children: "Friends use this computer’s private network address with the same port." }),
        /* @__PURE__ */ t.jsx("ol", { className: "sg-members", children: r.members.map((n, g) => /* @__PURE__ */ t.jsxs("li", { children: [
          n.name,
          n.host ? " · Host" : "",
          " · ",
          n.connected ? "Connected" : "Reconnecting"
        ] }, g)) }),
        /* @__PURE__ */ t.jsx("p", { children: r.isHost ? "Deal when everyone has joined (2–4 players)." : "Waiting for the host to deal." }),
        r.isHost && /* @__PURE__ */ t.jsxs("details", { children: [
          /* @__PURE__ */ t.jsx("summary", { children: "House rules" }),
          He.map((n) => /* @__PURE__ */ t.jsxs("label", { className: "sg-lan-rule", children: [
            /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: P[n.key], onChange: (g) => _((o) => ({ ...o, [n.key]: g.target.checked })) }),
            /* @__PURE__ */ t.jsxs("span", { children: [
              n.title,
              /* @__PURE__ */ t.jsx("small", { children: n.detail })
            ] })
          ] }, n.key))
        ] }),
        r.isHost && /* @__PURE__ */ t.jsx("button", { className: "sg-primary", disabled: T || r.members.length < 2 || r.paused, onClick: () => void V(), children: "Deal cards" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => void Y(), disabled: T, children: r.isHost ? "End room" : "Leave room" })
      ] }) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("p", { children: "Host a table, or join a friend on the same network." }),
        /* @__PURE__ */ t.jsxs("label", { children: [
          "Your name",
          /* @__PURE__ */ t.jsx("input", { autoComplete: "nickname", maxLength: 24, value: m, onChange: (n) => b(n.target.value) })
        ] }),
        /* @__PURE__ */ t.jsx("button", { className: "sg-primary", disabled: T || !m.trim(), onClick: () => void oe(!0), children: "Host a room" }),
        /* @__PURE__ */ t.jsxs("div", { className: "sg-join-fields", children: [
          a && /* @__PURE__ */ t.jsxs("label", { children: [
            "Host address",
            /* @__PURE__ */ t.jsx("input", { placeholder: "http://192.168.1.42:5193", value: f, onChange: (n) => A(n.target.value) })
          ] }),
          /* @__PURE__ */ t.jsxs("label", { children: [
            "Room code",
            /* @__PURE__ */ t.jsx("input", { maxLength: 8, value: C, onChange: (n) => j(n.target.value.toUpperCase()) })
          ] }),
          /* @__PURE__ */ t.jsx("button", { disabled: T || !m.trim() || !C.trim(), onClick: () => void oe(!1), children: "Join room" })
        ] }),
        E.current?.token && /* @__PURE__ */ t.jsx("button", { onClick: () => void ee(), children: "Forget saved seat" })
      ] }),
      /* @__PURE__ */ t.jsx("p", { role: "alert", children: B })
    ] })
  ] });
}
const Ye = Pe({
  mount(a, h) {
    const r = document.createElement("style");
    r.textContent = Te, document.head.append(r);
    const d = new Me(), m = () => d.unlock();
    window.addEventListener("pointerdown", m), window.addEventListener("keydown", m);
    const b = Fe(a);
    return b.render(/* @__PURE__ */ t.jsx(Be, { api: h.api, audio: d })), () => {
      window.removeEventListener("pointerdown", m), window.removeEventListener("keydown", m), d.dispose(), r.remove(), queueMicrotask(() => b.unmount());
    };
  }
});
export {
  Ye as default
};
