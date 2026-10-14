import { d as a } from "./runtime-XLX8az2X.js";
import { k as r, j as s, l as u, G as c, A as m, g as w } from "./styles-BLR5Jw3i.js";
const d = "agent-code-skitgubbe-styles";
function l() {
  if (document.getElementById(d)) return;
  const e = document.createElement("style");
  e.id = d, e.textContent = w, document.head.append(e);
}
function p(e, o) {
  l();
  const t = new c(), n = () => t.unlock();
  window.addEventListener("keydown", n), window.addEventListener("pointerdown", n);
  const i = r(e);
  return i.render(
    /* @__PURE__ */ s.jsxs("div", { className: "sg-frame sg-frame-with-agents", children: [
      /* @__PURE__ */ s.jsx(u, { api: o.api, audio: t }),
      /* @__PURE__ */ s.jsx(m, { sessions: o.api.sessions })
    ] })
  ), () => {
    window.removeEventListener("keydown", n), window.removeEventListener("pointerdown", n), t.dispose(), queueMicrotask(() => i.unmount());
  };
}
const k = a({
  mount: p
});
export {
  k as default
};
