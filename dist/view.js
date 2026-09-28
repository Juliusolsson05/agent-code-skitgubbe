import { d as r } from "./runtime-XLX8az2X.js";
import { k as a, j as s, l as u, G as c, g as m } from "./styles-CCgV-JYk.js";
const i = "agent-code-skitgubbe-styles";
function w() {
  if (document.getElementById(i)) return;
  const e = document.createElement("style");
  e.id = i, e.textContent = m, document.head.append(e);
}
function l(e, d) {
  w();
  const n = new c(), t = () => n.unlock();
  window.addEventListener("keydown", t), window.addEventListener("pointerdown", t);
  const o = a(e);
  return o.render(/* @__PURE__ */ s.jsx("div", { className: "sg-frame", children: /* @__PURE__ */ s.jsx(u, { api: d.api, audio: n }) })), () => {
    window.removeEventListener("keydown", t), window.removeEventListener("pointerdown", t), n.dispose(), queueMicrotask(() => o.unmount());
  };
}
const f = r({
  mount: l
});
export {
  f as default
};
