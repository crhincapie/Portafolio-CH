/* ──────────────────────────────────────────────────────────────
   Liquid Glass · refracción real sobre lo que hay detrás
   En Chromium se genera, por elemento, un mapa de desplazamiento
   (perfil de lente convexa en el bisel) y se aplica con
   backdrop-filter: url(#filtro). En el resto de navegadores queda
   el vidrio esmerilado + brillo especular del CSS (.lg).
   ────────────────────────────────────────────────────────────── */
const ua = navigator.userAgent;
export const supportsRefraction =
  /Chrome\/\d+/.test(ua) && !/Edg\/1[0-1]\d\./.test(ua) && !/Firefox|FxiOS|CriOS.*Mobile/.test(ua) &&
  typeof CSS !== "undefined" && CSS.supports("backdrop-filter", "url(#a) blur(1px)");

let defs = null;
let uid = 0;
const tracked = new Map();

function ensureDefs() {
  if (defs) return defs;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.position = "absolute";
  svg.style.pointerEvents = "none";
  defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  svg.appendChild(defs);
  document.body.appendChild(svg);
  return defs;
}

/** Mapa de desplazamiento para un rectángulo redondeado: R/G = vector hacia dentro. */
function displacementMap(w, h, radius, bezel) {
  const s = 0.5; // media resolución: suficiente, el filtro lo escala
  const cw = Math.max(2, Math.round(w * s)), ch = Math.max(2, Math.round(h * s));
  const c = document.createElement("canvas");
  c.width = cw; c.height = ch;
  const ctx = c.getContext("2d");
  const img = ctx.createImageData(cw, ch);
  const hx = w / 2, hy = h / 2, r = Math.min(radius, hx, hy);
  for (let j = 0; j < ch; j++) {
    for (let i = 0; i < cw; i++) {
      const px = (i + 0.5) / s - hx, py = (j + 0.5) / s - hy;
      const qx = Math.abs(px) - (hx - r), qy = Math.abs(py) - (hy - r);
      const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
      const d = Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r; // <0 dentro
      let nx = 0, ny = 0;
      if (qx > 0 && qy > 0) { const l = Math.hypot(qx, qy) || 1; nx = (qx / l) * Math.sign(px); ny = (qy / l) * Math.sign(py); }
      else if (qx > qy) nx = Math.sign(px); else ny = Math.sign(py);
      const t = Math.min(1, Math.max(0, -d / bezel));
      const mag = d > 0 ? 0 : Math.pow(1 - t, 2.4); // lente convexa: más fuerte en el borde
      const k = (j * cw + i) * 4;
      img.data[k] = 128 - nx * mag * 127;
      img.data[k + 1] = 128 - ny * mag * 127;
      img.data[k + 2] = 128;
      img.data[k + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

function build(el) {
  const rect = el.getBoundingClientRect();
  const w = Math.round(rect.width), h = Math.round(rect.height);
  if (w < 4 || h < 4) return;
  const info = tracked.get(el);
  if (info && info.w === w && info.h === h) return;
  const cs = getComputedStyle(el);
  const radius = parseFloat(cs.borderTopLeftRadius) || 0;
  const strength = parseFloat(el.dataset.liquid || "") || 46;
  const bezel = Math.min(28, Math.max(10, Math.min(w, h) * 0.32));
  const id = info?.id || `lg-${++uid}`;
  const d = ensureDefs();
  let filter = d.querySelector(`#${id}`);
  if (!filter) {
    filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", id);
    filter.setAttribute("x", "0"); filter.setAttribute("y", "0");
    filter.setAttribute("width", "100%"); filter.setAttribute("height", "100%");
    filter.setAttribute("color-interpolation-filters", "sRGB");
    filter.innerHTML = `
      <feImage result="map" preserveAspectRatio="none" x="0" y="0"></feImage>
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="soft"></feGaussianBlur>
      <feDisplacementMap in="soft" in2="map" xChannelSelector="R" yChannelSelector="G" result="r"></feDisplacementMap>
      <feDisplacementMap in="soft" in2="map" xChannelSelector="R" yChannelSelector="G" result="b"></feDisplacementMap>
      <feColorMatrix in="r" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="rr"></feColorMatrix>
      <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb"></feColorMatrix>
      <feBlend in="rr" in2="gb" mode="screen"></feBlend>`;
    d.appendChild(filter);
  }
  const fe = filter.querySelector("feImage");
  fe.setAttribute("width", w); fe.setAttribute("height", h);
  fe.setAttribute("href", displacementMap(w, h, radius, bezel));
  const maps = filter.querySelectorAll("feDisplacementMap");
  maps[0].setAttribute("scale", String(strength));          // rojo
  maps[1].setAttribute("scale", String(strength * 0.86));   // verde/azul: aberración cromática sutil
  el.style.setProperty("--lg-filter", `url(#${id})`);
  el.classList.add("lg-refract");
  tracked.set(el, { id, w, h });
}

const ro = typeof ResizeObserver !== "undefined"
  ? new ResizeObserver((entries) => { for (const e of entries) build(e.target); })
  : null;

/** Activa la refracción en todos los [data-liquid] dentro de root. */
export function liquify(root = document) {
  if (!supportsRefraction) return;
  root.querySelectorAll("[data-liquid]").forEach((el) => {
    if (tracked.has(el) && el.isConnected) { build(el); return; }
    build(el);
    ro && ro.observe(el);
  });
  // limpiar filtros de nodos que ya no existen
  for (const [el, info] of tracked) {
    if (!el.isConnected) { ro && ro.unobserve(el); defs?.querySelector(`#${info.id}`)?.remove(); tracked.delete(el); }
  }
}
