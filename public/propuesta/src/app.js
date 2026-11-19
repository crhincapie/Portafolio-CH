/* ════════════════════════════════════════════════════════════════
   Cristian Hincapié · Portafolio — Propuesta 2026 · app
   Vistas: inicio (#inicio, #sobre…), índice (#casos), caso (#caso-slug)
   ════════════════════════════════════════════════════════════════ */
import { createScene } from "./scene.js";
import { liquify } from "./glass.js";

const D = window.CH_DATA;
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;
const wide = () => window.innerWidth > 920;
const root = document.documentElement;

/* ── almacenamiento seguro ── */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
};

/* ── Textos nuevos de la propuesta (los existentes vienen de messages/*.json) ── */
const UI = {
  es: {
    home: "Inicio", languages: "Idiomas", years: "Trayectoria",
    venn: { business: "Negocio", users: "Usuarios", tech: "Tecnología", core: "Producto" },
    ring: { hint: "Arrastra para explorar", prev: "Caso anterior", next: "Caso siguiente", of: "de" },
    cursorView: "Ver caso", cursorDrag: "Arrastra",
    toLight: "Cambiar a modo claro", toDark: "Cambiar a modo oscuro", lang: "Idioma",
    openMenu: "Abrir menú", close: "Cerrar", nextCase: "Siguiente caso", backTop: "Volver arriba",
    cvTitle: "Currículum", cvInteractive: "Ver CV interactivo", cvPdf: "Descargar PDF",
    cvNote: "Se abre en cristianhincapie.com, en el idioma y modo que estás viendo.",
    prevImg: "Imagen anterior", nextImg: "Imagen siguiente", zoom: "Ampliar imagen",
    quote: "Testimonio", step: "Paso", featured: "Caso destacado", sections: "Secciones",
    contents: "Contenido", sector: "Sector", designFlow: "Del wireframe al sistema", screens: "Pantallas", components: "Componentes", tools: "Herramientas",
  },
  en: {
    home: "Home", languages: "Languages", years: "Track record",
    venn: { business: "Business", users: "Users", tech: "Technology", core: "Product" },
    ring: { hint: "Drag to explore", prev: "Previous case", next: "Next case", of: "of" },
    cursorView: "View case", cursorDrag: "Drag",
    toLight: "Switch to light mode", toDark: "Switch to dark mode", lang: "Language",
    openMenu: "Open menu", close: "Close", nextCase: "Next case", backTop: "Back to top",
    cvTitle: "Resume", cvInteractive: "Open interactive resume", cvPdf: "Download PDF",
    cvNote: "Opens on cristianhincapie.com, in the language and mode you're viewing.",
    prevImg: "Previous image", nextImg: "Next image", zoom: "Enlarge image",
    quote: "Testimonial", step: "Step", featured: "Featured case", sections: "Sections",
    contents: "Contents", sector: "Sector", designFlow: "From wireframe to system", screens: "Screens", components: "Components", tools: "Tools",
  },
};

/* ── Estado ── */
const S = {
  lang: initialLang(),
  theme: root.dataset.theme || "dark",
  view: null,
  scene: null,
  lenis: null,
  cleanups: [],
  pointer: { x: innerWidth / 2, y: innerHeight / 2 },
  blobSections: [],
  portraitEl: null,
  fixedBlob: null,
  ringApi: null,
};

function initialLang() {
  const saved = store.get("ch-lang");
  if (saved === "es" || saved === "en") return saved;
  return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
}

const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
const t = (p) => get(D.messages[S.lang], p) ?? p;
const u = (p) => get(UI[S.lang], p) ?? p;
const L = (o) => (o && (o[S.lang] ?? o.es)) || "";
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const paras = (s) => String(s).split(/\n\n+/).map((p) => `<p>${esc(p)}</p>`).join("");
const pad = (n) => String(n).padStart(2, "0");
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ── Iconos (trazo 1.8, 24px) ── */
const ic = (d, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
const I = {
  go: ic('<path d="M7 17 17 7M8 7h9v9"/>', 'class="go"'),
  left: ic('<path d="M15 18l-6-6 6-6"/>'),
  right: ic('<path d="M9 6l6 6-6 6"/>'),
  back: ic('<path d="M19 12H5M11 18l-6-6 6-6"/>'),
  mail: ic('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>'),
  doc: ic('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
  download: ic('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  sun: ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', 'class="sun"'),
  moon: ic('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>', 'class="moon"'),
  menu: ic('<path d="M4 8h16M4 16h16"/>'),
  x: ic('<path d="M6 6l12 12M18 6 6 18"/>'),
  target: ic('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6" fill="currentColor"/>'),
  evidence: ic('<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>'),
  layers: ic('<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>'),
  spark: ic('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V9h3.6zM22.2 0H1.8A1.8 1.8 0 0 0 0 1.7v20.6A1.8 1.8 0 0 0 1.8 24h20.4a1.8 1.8 0 0 0 1.8-1.7V1.7A1.8 1.8 0 0 0 22.2 0z"/></svg>',
  behance: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.2 11.4c.9-.4 1.6-1.2 1.6-2.4 0-2.3-1.7-3-3.8-3H0v12.3h6.2c2.3 0 4.5-1.1 4.5-3.7 0-1.6-.8-2.8-2.5-3.2zM2.7 8.1h2.6c1 0 1.9.3 1.9 1.4s-.7 1.5-1.7 1.5H2.7zm3 8.1h-3v-3.4h3c1.2 0 2 .5 2 1.8s-.9 1.6-2 1.6zM21.6 7.1h-5.2V5.8h5.2zm2.4 7.1c0-2.7-1.6-4.9-4.4-4.9a4.6 4.6 0 0 0-4.7 4.8c0 2.9 1.8 4.8 4.7 4.8 2.2 0 3.6-1 4.3-3.1h-2.2a2.2 2.2 0 0 1-2 1.3c-1.5 0-2.2-.8-2.2-2.2h6.5zm-6.5-1.1a1.9 1.9 0 0 1 2-1.9c1.2 0 1.8.7 1.9 1.9z"/></svg>',
};

/* ════════════════════════════════════════════════════════════════
   PLANTILLAS
   ════════════════════════════════════════════════════════════════ */
const NAV = [
  { id: "sobre", key: "about" }, { id: "experiencia", key: "experience" }, { id: "proyectos", key: "projects" },
  { id: "enfoque", key: "approach" }, { id: "testimonios", key: "testimonials" }, { id: "contacto", key: "contact" },
];
const SLIDES = [1, 2, 3, 4].map((n) => ({
  t1: () => t(`hero.slide${n}Title1`), t2: () => t(`hero.slide${n}Title2`),
  sub: () => t(`hero.slide${n}Subtitle`), desc: () => t(`hero.slide${n}Desc`),
  phases: () => (n === 4 ? [1, 2, 3, 4, 5].map((i) => t(`hero.servicePhase${i}Desc`)) : [1, 2, 3, 4].map((i) => t(`hero.processPhase${i}Desc`))),
}));
const featured = () => D.projects.filter((p) => p.featured);
const others = () => D.projects.filter((p) => !p.featured);
// Servida por Next.js (localhost o Vercel) los CV viven en /cv del mismo sitio; con file:// se usa el dominio publicado.
const cvBase = () => (location.protocol.startsWith("http") && (/cristianhincapie\.com$/.test(location.hostname) || location.pathname.startsWith("/propuesta")) ? "" : D.site.url);

function headerHTML() {
  return `
  <div class="wrap bar">
    <a class="brand-mark lg" href="#inicio" data-liquid="34" aria-label="Cristian Hincapié — ${esc(u("home"))}">
      <span class="monogram" aria-hidden="true">CH</span><span class="name">Cristian Hincapié</span>
    </a>
    <nav class="nav-pill lg" data-liquid="40" aria-label="${esc(u("sections"))}">
      <span class="thumb" aria-hidden="true"></span>
      ${NAV.map((n) => `<a href="#${n.id}" data-nav="${n.id}">${esc(t("nav." + n.key))}</a>`).join("")}
      <a href="#casos" data-nav="casos">${esc(t("nav.caseStudies"))}</a>
    </nav>
    <div class="tools">
      <button class="icon-btn lg theme theme-ico" data-liquid="30" data-theme-toggle aria-label="${esc(S.theme === "dark" ? u("toLight") : u("toDark"))}">${I.sun}${I.moon}</button>
      <div class="lang-switch lg" data-liquid="30" data-lang="${S.lang}" role="group" aria-label="${esc(u("lang"))}">
        <span class="knob" aria-hidden="true"></span>
        <button data-set-lang="es" aria-pressed="${S.lang === "es"}" lang="es">ES</button>
        <button data-set-lang="en" aria-pressed="${S.lang === "en"}" lang="en">EN</button>
      </div>
      <button class="icon-btn lg menu-btn" data-liquid="30" data-menu-open aria-label="${esc(u("openMenu"))}" aria-expanded="false" aria-controls="mobileMenu">${I.menu}</button>
    </div>
  </div>
  <div class="mobile-menu" id="mobileMenu" data-open="false">
    <button class="icon-btn lg close" data-menu-close aria-label="${esc(u("close"))}">${I.x}</button>
    <nav aria-label="${esc(u("sections"))}">
      ${NAV.map((n) => `<a href="#${n.id}">${esc(t("nav." + n.key))}</a>`).join("")}
      <a href="#casos">${esc(t("nav.caseStudies"))}</a>
    </nav>
    <div class="cv-actions"><button class="btn btn-brand" data-cv>${I.doc}${esc(t("hero.ctaCv"))}</button></div>
  </div>`;
}

function railHTML() {
  return [{ id: "inicio", label: u("home") }, ...NAV.map((n) => ({ id: n.id, label: t("nav." + n.key) }))]
    .map((s) => `<a href="#${s.id}" data-rail="${s.id}" aria-label="${esc(s.label)}"><span>${esc(s.label)}</span></a>`).join("");
}

function chars(word) {
  return [...word].map((c) => `<span class="ch">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");
}

function heroHTML() {
  const s = SLIDES[0];
  const roles = t("hero.roles").split("·").map((x) => x.trim());
  const clients = t("hero.clients").split("·").map((x) => x.trim());
  const items = [...roles, t("hero.tagline1"), ...clients, t("hero.tagline2")];
  const marquee = items.map((x) => `<span>${esc(x)}</span>`).join("");
  return `
  <section id="inicio" class="hero" data-section data-blob='{"x":0.19,"y":-0.2,"s":0.58,"c":0.22,"f":0.85,"mx":0.3,"my":0.18}'>
    <div class="wrap">
      <div class="hero-top">
        <p class="hero-kicker">${esc(t("hero.kicker"))}</p>
        <span class="avail lg"><span class="dot" aria-hidden="true"></span>${esc(t("contact.availability"))}</span>
      </div>
      <div class="hero-grid">
        <div>
          <p class="display" id="heroDisplay">
            <span class="row r1">${chars(s.t1())}</span>
            <span class="row r2">${chars(s.t2())}<span class="caret" aria-hidden="true"></span></span>
          </p>
          <div class="hero-copy" id="heroCopy" aria-live="polite">
            <p class="hero-sub">${esc(s.sub())}</p>
            <p class="hero-desc">${esc(s.desc())}</p>
            <ol class="phases">${s.phases().map((p, i) => `<li><b>${pad(i + 1)}</b>${esc(p)}</li>`).join("")}</ol>
          </div>
          <div class="hero-cta">
            <a class="btn btn-brand" href="#proyectos" data-magnetic>${esc(t("hero.ctaProjects"))}${I.go}</a>
            <button class="btn btn-glass lg" data-liquid="38" data-cv data-magnetic>${I.doc}${esc(t("hero.ctaCv"))}</button>
          </div>
          <div class="slides-nav" role="tablist" aria-label="${esc(t("hero.roles"))}">
            ${SLIDES.map((sl, i) => `<button role="tab" aria-selected="${i === 0}" data-slide="${i}"><span class="fill" aria-hidden="true"></span>${esc(sl.t1() + " " + sl.t2())}</button>`).join("")}
          </div>
        </div>
        <div class="portrait-slot" id="portraitSlot">
          <img src="assets/img/portrait-${S.theme}.webp" alt="Cristian Hincapié" width="480" height="600" />
          <div class="portrait-caption lg"><strong>Cristian Hincapié</strong><span>${esc(t("about.location"))}</span></div>
        </div>
      </div>
      <div class="hero-band">
        <h1>${esc(t("hero.line1"))} <span>${esc(t("hero.line2"))}</span></h1>
        <dl class="stats lg">
          <div><dt>${esc(t("hero.statYearsLabel"))}</dt><dd class="big tabular">${esc(t("hero.statYearsValue"))}</dd></div>
          <div><dt>${esc(t("hero.statSectorsLabel"))}</dt><dd>${esc(t("hero.statSectorsValue"))}</dd></div>
          <div><dt>${esc(t("hero.statCraftLabel"))}</dt><dd>${esc(t("hero.statCraftValue"))}</dd></div>
        </dl>
      </div>
    </div>
    <div class="marquee" aria-label="${esc(t("hero.lead"))}"><div class="marquee-track" aria-hidden="true">${marquee}${marquee}</div></div>
  </section>`;
}

function aboutHTML() {
  const words = t("about.title").split(" ").map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
  const v = UI[S.lang].venn;
  return `
  <section id="sobre" data-section data-blob='{"x":0.27,"y":0.02,"s":1.25,"c":0.015,"f":0.9}'>
    <div class="wrap manifesto">
      <span class="kicker">${esc(t("about.kicker"))}</span>
      <h2 class="manifesto-text" style="margin-top:1.5rem">${words}</h2>
    </div>
    <div class="wrap about-grid" style="padding-bottom:clamp(6rem,12vw,10rem)">
      <div>
        <div class="about-body">${paras(t("about.body"))}</div>
        <div class="facts">
          <div class="fact lg"><small>${esc(t("about.locationLabel"))}</small>${esc(t("about.location"))}</div>
          <div class="fact lg"><small>${esc(u("languages"))}</small>${esc(t("about.languages"))}</div>
          <div class="fact lg"><small>${esc(u("years"))}</small>${esc(t("hero.statYearsValue"))} · ${esc(t("hero.statYearsLabel"))}</div>
        </div>
      </div>
      <figure class="venn" aria-label="${esc(t("hero.lead"))}">
        <svg viewBox="0 0 400 400" role="img" aria-hidden="true">
          <circle class="c a" cx="200" cy="148" r="112"/>
          <circle class="c b" cx="142" cy="248" r="112"/>
          <circle class="c" cx="258" cy="248" r="112"/>
          <text x="200" y="98">${esc(v.business)}</text>
          <text x="104" y="300">${esc(v.users)}</text>
          <text x="296" y="300">${esc(v.tech)}</text>
          <circle class="core" cx="200" cy="215" r="34"/>
          <text class="core-t" x="200" y="219">${esc(v.core)}</text>
        </svg>
      </figure>
    </div>
  </section>`;
}

function experienceHTML() {
  const n = D.experience.length;
  return `
  <section id="experiencia" class="sec" data-section data-blob='{"x":0.36,"y":0.24,"s":0.5,"c":0.12,"f":1.0}'>
    <div class="wrap">
      <header class="sec-head"><span class="kicker">${esc(t("experience.kicker"))}</span><h2>${esc(t("experience.title"))}</h2><p>${esc(t("experience.subtitle"))}</p></header>
      <div class="stack">
        ${D.experience.map((e, i) => `
        <article class="xp lg" style="--i:${i}">
          <span class="logo"><img src="${e.logo}" alt="" loading="lazy" /></span>
          <div>
            <h3>${esc(L(e.company))}</h3>
            <p class="role">${esc(L(e.role))}</p>
            <span class="sector">${esc(L(e.period))}</span>
          </div>
          <p class="sum">${esc(L(e.summary))}</p>
          <span class="idx" aria-hidden="true">${pad(i + 1)} / ${pad(n)}</span>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function featHTML(p, i, n) {
  const img = p.heroImage || p.gallery[0];
  const metrics = (p.caseStudy.metrics || []).slice(0, 2);
  return `
  <article class="feat lg" aria-label="${esc(u("featured"))} ${i + 1}: ${esc(L(p.title))}">
    <div class="feat-info">
      <div class="feat-meta"><span class="n">${pad(i + 1)} / ${pad(n)}</span><span>${esc(L(p.company))} — ${esc(p.year)}</span></div>
      <h3>${esc(L(p.title))}</h3>
      <p class="role">${esc(L(p.role))}</p>
      <p class="sum">${esc(L(p.summary))}</p>
      ${metrics.map((m) => `<p class="metric">${esc(L(m))}</p>`).join("")}
      <ul class="tags">${p.tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <div class="feat-actions">
        <a class="btn btn-brand btn-sm" href="#caso-${p.slug}">${esc(t("projects.viewCase"))}${I.go}</a>
        ${p.prototypeUrl ? `<a class="btn btn-glass btn-sm lg" href="${esc(p.prototypeUrl)}" target="_blank" rel="noopener">${esc(t("projects.prototype"))}${I.go}</a>` : ""}
      </div>
    </div>
    <a class="feat-media" href="#caso-${p.slug}" data-cursor="view" tabindex="-1" aria-hidden="true">
      <span class="glow"></span>
      <span class="frame"><img src="${img}" alt="" loading="${i === 0 ? "eager" : "lazy"}" /></span>
    </a>
  </article>`;
}

function projectsHTML() {
  const f = featured();
  return `
  <section id="proyectos" data-section data-blob='{"x":0.4,"y":0.32,"s":0.4,"c":0.14,"f":1.0}'>
    <div class="wrap sec" style="padding-bottom:2rem">
      <header class="sec-head" style="margin-bottom:0"><span class="kicker">${esc(t("projects.kicker"))}</span><h2>${esc(t("projects.title"))}</h2><p>${esc(t("projects.subtitle"))}</p></header>
    </div>
    <div class="feat-wrap">
      <div class="feat-pin">
        <div class="feat-track">${f.map((p, i) => featHTML(p, i, f.length)).join("")}</div>
        <div class="feat-progress lg" aria-hidden="true"><span class="tabular" id="featNow">01</span><span class="bar"><i></i></span><span class="tabular">${pad(f.length)}</span></div>
      </div>
    </div>
    <div class="wrap more">
      <div class="more-head">
        <div><span class="kicker">${esc(t("projects.moreTitle"))}</span><h3 style="margin-top:1rem">${esc(t("projects.moreHeadline"))}</h3><p>${esc(t("projects.moreSubtitle"))}</p></div>
        <a class="btn btn-glass lg" data-liquid="38" href="#casos" data-magnetic>${esc(t("projects.viewAll"))}${I.go}</a>
      </div>
      <div class="ring-stage" id="ringStage" data-cursor="drag" role="group" aria-roledescription="carousel" aria-label="${esc(t("projects.moreHeadline"))}">
        <div class="ring" id="ring">
          ${others().map((p, i) => `
          <a class="ring-card lg" href="#caso-${p.slug}" data-i="${i}" draggable="false" aria-label="${esc(L(p.title))} — ${esc(L(p.summary))}">
            <span class="img"><img src="${p.heroImage}" alt="" loading="lazy" draggable="false" /></span>
            <span class="txt"><strong>${esc(L(p.title))}</strong><span>${esc(L(p.company))} — ${esc(p.year)}</span></span>
          </a>`).join("")}
        </div>
      </div>
      <div class="ring-ctrl">
        <button class="icon-btn lg" data-ring="-1" aria-label="${esc(u("ring.prev"))}">${I.left}</button>
        <span class="hint" id="ringHint" aria-live="polite">${esc(u("ring.hint"))}</span>
        <button class="icon-btn lg" data-ring="1" aria-label="${esc(u("ring.next"))}">${I.right}</button>
      </div>
    </div>
  </section>`;
}

function approachHTML() {
  const icons = [I.target, I.evidence, I.layers, I.spark];
  const steps = t("approach.body").split(/\n\n+/);
  return `
  <section id="enfoque" class="sec" data-section data-blob='{"x":-0.3,"y":-0.24,"s":0.62,"c":0.1,"f":1.3}'>
    <div class="wrap approach-grid">
      <div class="approach-sticky">
        <span class="kicker">${esc(t("approach.kicker"))}</span>
        <h2>${esc(t("approach.title"))}</h2>
        <div class="pills">${[1, 2, 3, 4].map((n, i) => `<span class="pill lg" data-pill="${n}"><i>${icons[i]}</i>${esc(t("approach.pill" + n))}</span>`).join("")}</div>
      </div>
      <div class="steps">
        ${steps.map((s, i) => `<p class="step" data-step="${i}"><small>${esc(u("step"))} ${pad(i + 1)} / ${pad(steps.length)}</small>${esc(s)}</p>`).join("")}
      </div>
    </div>
  </section>`;
}

function initials(name) { return name.split(/\s+/).map((x) => x[0]).slice(0, 2).join(""); }

function testimonialsHTML() {
  const T = D.testimonials;
  return `
  <section id="testimonios" class="sec" data-section data-blob='{"x":0.36,"y":0.28,"s":0.55,"c":0.12,"f":1.0}'>
    <div class="wrap">
      <header class="sec-head"><span class="kicker">${esc(t("testimonials.kicker"))}</span><h2>${esc(t("testimonials.title"))}</h2><p>${esc(t("testimonials.subtitle"))}</p></header>
      <div class="quotes" role="region" aria-roledescription="carousel" aria-label="${esc(t("testimonials.title"))}">
        <div class="q-stage" id="qStage">
          ${T.map((q, i) => `
          <figure class="q-card lg" data-liquid="60" id="q-${i}" role="tabpanel" aria-roledescription="slide" aria-label="${esc(u("quote"))} ${i + 1} / ${T.length}" aria-hidden="${i !== 0}" ${i !== 0 ? 'style="opacity:0;visibility:hidden"' : ""}>
            <span class="label">${esc(L(q.sectionTitle))}</span>
            <blockquote>${esc(L(q.quote))}</blockquote>
            <figcaption class="q-who">
              <span class="av" aria-hidden="true">${esc(initials(q.name))}</span>
              <span><b>${esc(q.name)}</b><span>${esc(L(q.role))} — ${esc(q.company)}</span></span>
              ${q.logo ? `<span class="co"><img src="${q.logo}" alt="${esc(q.company)}" /></span>` : ""}
            </figcaption>
          </figure>`).join("")}
        </div>
        <div class="q-tabs" role="tablist">
          ${T.map((q, i) => `<button role="tab" aria-selected="${i === 0}" aria-controls="q-${i}" data-q="${i}">${esc(L(q.sectionTitle))}<span class="t" aria-hidden="true"></span></button>`).join("")}
        </div>
      </div>
    </div>
  </section>`;
}

function contactHTML() {
  const words = t("contact.title").split(" ").map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
  return `
  <section id="contacto" class="contact" data-section data-blob='{"x":0.28,"y":0.04,"s":1.35,"c":0.08,"f":1.0}'>
    <div class="wrap">
      <span class="kicker">${esc(t("contact.kicker"))}</span>
      <h2 class="manifesto-text contact-title" style="margin-top:1.5rem;max-width:15ch">${words}</h2>
      <p class="sub">${esc(t("contact.subtitle"))}</p>
      <div class="contact-actions">
        <a class="c-btn primary" href="mailto:${D.site.email}" data-magnetic><span class="l">${I.mail}${esc(t("contact.emailCta"))}</span>${I.go}</a>
        <a class="c-btn lg" data-liquid="40" href="https://wa.me/${D.site.whatsapp}" target="_blank" rel="noopener" data-magnetic><span class="l">${I.whatsapp}${esc(t("contact.whatsappCta"))}</span>${I.go}</a>
        <a class="c-btn lg" data-liquid="40" href="${D.site.linkedin}" target="_blank" rel="noopener" data-magnetic><span class="l">${I.linkedin}${esc(t("contact.linkedinCta"))}</span>${I.go}</a>
        <a class="c-btn lg" data-liquid="40" href="${D.site.behance}" target="_blank" rel="noopener" data-magnetic><span class="l">${I.behance}${esc(t("contact.behanceCta"))}</span>${I.go}</a>
        <button class="c-btn lg" data-liquid="40" data-cv data-magnetic><span class="l">${I.download}${esc(t("contact.downloadCV"))}</span>${I.go}</button>
      </div>
      <div class="contact-foot">
        <span class="avail lg"><span class="dot" aria-hidden="true"></span>${esc(t("contact.availability"))}</span>
        <span class="mail">${esc(D.site.email)}</span>
        <span>${esc(t("contact.footnote"))}</span>
      </div>
    </div>
  </section>`;
}

function footerHTML() {
  return `
  <div class="wrap foot-grid">
    <div><p class="t">${esc(t("footer.title"))}</p><p class="s">${esc(t("footer.subtitle"))}</p></div>
    <nav class="foot-links" aria-label="${esc(t("nav.contact"))}">
      <a href="${D.site.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      <a href="${D.site.behance}" target="_blank" rel="noopener">Behance</a>
      <a href="mailto:${D.site.email}">Email</a>
      <a href="https://wa.me/${D.site.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
    </nav>
    <a class="btn btn-glass btn-sm lg" href="#inicio">${esc(u("backTop"))}</a>
  </div>
  <div class="wrap foot-bottom"><span>© ${new Date().getFullYear()}. ${esc(t("footer.rights"))}</span><span>Bogotá, Colombia</span></div>`;
}

function indexHTML(filter = "all") {
  const list = filter === "featured" ? featured() : D.projects;
  return `
  <section class="wrap view-pad" data-view="index">
    <div class="index-head">
      <div><span class="kicker">${esc(t("projectsPage.kicker"))}</span><h1 style="margin-top:1rem">${esc(t("projectsPage.title"))}</h1><p>${esc(t("projectsPage.subtitle"))}</p></div>
      <div class="seg lg" role="group" aria-label="${esc(t("projectsPage.kicker"))}">
        <button data-filter="featured" aria-pressed="${filter === "featured"}">${esc(t("projectsPage.featured"))}</button>
        <button data-filter="all" aria-pressed="${filter === "all"}">${esc(t("projectsPage.all"))}</button>
      </div>
    </div>
    <div class="idx-list">
      ${list.map((p, i) => `
      <a class="idx-row" href="#caso-${p.slug}" data-preview="${p.heroImage || p.gallery[0]}">
        <span class="n">${pad(i + 1)}</span>
        <strong>${esc(L(p.title))}</strong>
        <span class="c">${esc(L(p.company))} — ${esc(L(p.role))}</span>
        <span class="y">${esc(p.year)}</span>
        ${I.go}
      </a>`).join("")}
    </div>
  </section>
  <div class="idx-preview" id="idxPreview" aria-hidden="true"><img alt="" /></div>`;
}

function caseHTML(p) {
  const cs = p.caseStudy;
  const all = D.projects;
  const next = all[(all.indexOf(p) + 1) % all.length];
  const metrics = cs.metrics || [];
  const gal = p.gallery.length ? p.gallery : [p.heroImage];
  const mobile = p.galleryVariant !== "desktop" && p.slug === "agrocash";
  const steps = ["label_stepResearch", "label_stepMap", "label_stepPrototype", "label_stepValidate"];
  const sec = [
    ["ctx", t("caseStudy.context"), `<p class="txt">${esc(L(cs.context))}</p>`, "big"],
    ["reto", t("caseStudy.label_problem"), `<p class="txt">${esc(L(cs.problem))}</p>`, "big"],
    ["obj", t("caseStudy.label_goals"), `<p class="txt">${esc(L(cs.goals))}</p>`],
    ["research", t("caseStudy.label_research"), `<p class="txt">${esc(L(cs.research))}</p>`],
    ["proceso", t("caseStudy.label_process"), `<div><p class="txt"><strong>${esc(t("caseStudy.label_processTitle"))}.</strong> ${esc(L(cs.uxProcess))}</p><ol class="process">${steps.map((s, i) => `<li class="lg"><b>${pad(i + 1)}</b><span>${esc(t("caseStudy." + s))}</span></li>`).join("")}</ol></div>`],
    ["diseno", u("designFlow"), `<div class="trio">
        <div class="lg"><h3>${esc(t("caseStudy.label_wireframes"))}</h3><p>${esc(L(cs.wireframes))}</p></div>
        <div class="lg"><h3>${esc(t("caseStudy.label_uiExploration"))}</h3><p>${esc(L(cs.uiExploration))}</p></div>
        <div class="lg"><h3>${esc(t("caseStudy.label_designSystem"))}</h3><p>${esc(L(cs.designSystem))}</p></div></div>`],
    ["decisiones", t("caseStudy.label_decisions"), `<p class="txt">${esc(L(cs.decisions))}</p>`, "big"],
    ["resultados", t("caseStudy.label_results"), `<div style="display:grid;gap:1.5rem"><p class="txt">${esc(L(cs.results))}</p>
        ${metrics.length ? `<div style="display:grid;gap:.6rem">${metrics.map((m) => `<p class="metric">${esc(L(m))}</p>`).join("")}</div>` : ""}
        <div class="numbers">
          <div class="lg"><b data-count="${cs.interfaces}">${cs.interfaces}</b><span>${esc(t("caseStudy.label_metricScreens"))}</span></div>
          <div class="lg"><b data-count="${cs.components}">${cs.components}</b><span>${esc(t("caseStudy.label_heroComponents"))}</span></div>
          <div class="lg"><b data-count="${cs.tools.length}">${cs.tools.length}</b><span>${esc(t("caseStudy.label_metricTools"))}</span></div>
        </div></div>`],
    ["aprendizajes", t("caseStudy.label_learnings"), `<p class="txt">${esc(L(cs.learnings))}</p>`, "big"],
    ["stack", `${t("caseStudy.tools")} / ${t("caseStudy.label_tech")}`, `<div style="display:grid;gap:1rem"><div class="chips">${cs.tools.map((x) => `<span>${esc(x)}</span>`).join("")}</div><div class="chips">${cs.techStack.map((x) => `<span>${esc(x)}</span>`).join("")}</div></div>`],
    ["galeria", t("caseStudy.gallery"), `<div class="gallery">
        <div class="g-track" id="gTrack" tabindex="0" aria-label="${esc(t("caseStudy.gallery"))}">
          ${gal.map((g, i) => `<button class="g-item ${mobile ? "mobile" : ""}" data-lb="${i}" aria-label="${esc(u("zoom"))} ${i + 1}"><img src="${g}" alt="${esc(L(p.title))} — ${i + 1}" decoding="async" /></button>`).join("")}
        </div>
        <div class="g-nav"><button class="icon-btn lg" data-g="-1" aria-label="${esc(u("prevImg"))}">${I.left}</button><button class="icon-btn lg" data-g="1" aria-label="${esc(u("nextImg"))}">${I.right}</button><span class="count">${gal.length} ${esc(t("caseStudy.label_galleryCount"))}</span></div>
      </div>`],
    ["enlaces", t("caseStudy.links"), p.prototypeUrl
      ? `<div><a class="btn btn-brand" href="${esc(p.prototypeUrl)}" target="_blank" rel="noopener">${esc(t("caseStudy.openPrototype"))}${I.go}</a></div>`
      : `<p class="txt" style="color:var(--muted)">${esc(t("caseStudy.noLinks"))}</p>`],
  ];
  return `
  <article data-view="case">
    <div class="wrap case-hero">
      <a class="back lg" href="#proyectos">${I.back}${esc(t("projects.back"))}</a>
      <h1 class="case-title">${esc(L(p.title))}</h1>
      <div class="case-intro">
        <p class="sum">${esc(L(p.summary))}</p>
        <div style="display:grid;gap:1rem">
          <dl class="meta lg">
            <div><dt>${esc(t("caseStudy.label_heroYear"))}</dt><dd>${esc(p.year)}</dd></div>
            <div><dt>${esc(t("caseStudy.label_role"))}</dt><dd>${esc(L(p.role))}</dd></div>
            <div><dt>${esc(u("sector"))}</dt><dd>${esc(L(p.company))}</dd></div>
            <div><dt>${esc(t("caseStudy.label_heroScreens"))}</dt><dd>${cs.interfaces}</dd></div>
            <div><dt>${esc(t("caseStudy.label_heroComponents"))}</dt><dd>${cs.components}</dd></div>
          </dl>
          <ul class="tags">${p.tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
      </div>
      <figure class="case-cover" style="margin-inline:0"><img src="${p.heroImage || gal[0]}" alt="${esc(L(p.title))}" /></figure>
    </div>
    <div class="wrap case-body">
      <nav class="toc lg" aria-label="${esc(u("contents"))}" style="padding:8px;border-radius:18px">${sec.map(([id, label]) => `<a href="#caso-${p.slug}" data-toc="${id}">${esc(label)}</a>`).join("")}</nav>
      <div class="case-sections">
        ${sec.map(([id, label, body, cls]) => `<section class="cs ${cls || ""}" id="cs-${id}"><h2>${esc(label)}</h2>${body}</section>`).join("")}
      </div>
    </div>
    <div class="wrap">
      <a class="next-case lg" data-liquid="50" href="#caso-${next.slug}">
        <div><small>${esc(u("nextCase"))}</small><strong>${esc(L(next.title))}</strong><p style="color:var(--muted);margin-top:1rem;max-width:30rem">${esc(L(next.summary))}</p></div>
        <span class="img"><img src="${next.heroImage || next.gallery[0]}" alt="" loading="lazy" /></span>
      </a>
    </div>
  </article>`;
}

function cvSheetHTML() {
  const mode = S.theme === "light" ? "light" : "dark";
  const base = cvBase();
  const html = `${base}/cv/${S.lang === "en" ? "cv-en.html" : "cv.html"}?theme=${mode}`;
  const pdf = `${base}/cv/pdf/cv-${S.lang}-${mode}.pdf`;
  return `
    <button class="icon-btn lg x" data-close aria-label="${esc(u("close"))}">${I.x}</button>
    <div class="sheet-inner">
      <div class="cv-top">
        <span class="ph"><img src="assets/img/portrait-${S.theme}.webp" alt="" /></span>
        <div><span class="kicker">${esc(u("cvTitle"))}</span><h2 id="cvTitle" style="margin-top:.6rem">Cristian Hincapié</h2><p>${esc(t("footer.subtitle"))}</p></div>
      </div>
      <div class="cv-cols">
        <div><h3>${esc(t("nav.experience"))}</h3><div class="cv-xp">
          ${D.experience.map((e) => `<div><b>${esc(L(e.role))}</b><span>${esc(L(e.company))} — ${esc(L(e.period))}</span><p>${esc(L(e.summary))}</p></div>`).join("")}
        </div></div>
        <div class="cv-side">
          <h3 style="margin-bottom:0">${esc(t("nav.about"))}</h3>
          <p>${esc(t("about.body").split(/\n\n+/)[0])}</p>
          <p><strong>${esc(t("about.locationLabel"))}:</strong> ${esc(t("about.location"))}<br/><strong>${esc(u("languages"))}:</strong> ${esc(t("about.languages"))}</p>
          <p><strong>Email:</strong> ${esc(D.site.email)}</p>
          <div class="cv-actions">
            <a class="btn btn-brand btn-sm" href="${pdf}" target="_blank" rel="noopener">${I.download}${esc(u("cvPdf"))}</a>
            <a class="btn btn-glass btn-sm lg" href="${html}" target="_blank" rel="noopener">${esc(u("cvInteractive"))}${I.go}</a>
          </div>
          <p class="cv-note">${esc(u("cvNote"))}</p>
        </div>
      </div>
    </div>`;
}

/* ════════════════════════════════════════════════════════════════
   RUTAS
   ════════════════════════════════════════════════════════════════ */
const HOME_ANCHORS = new Set(["inicio", ...NAV.map((n) => n.id)]);

function parseHash() { return parseTarget(decodeURIComponent(location.hash.replace(/^#/, ""))); }
function parseTarget(h) {
  if (h.startsWith("caso-")) {
    const slug = h.slice(5);
    if (D.projects.some((p) => p.slug === slug)) return { view: "case", slug };
  }
  if (h === "casos") return { view: "index" };
  return { view: "home", anchor: HOME_ANCHORS.has(h) ? h : null };
}

let indexFilter = "all";

function render(route, { keepScroll = false } = {}) {
  killView();
  S.lenis?.start();
  const app = $("#app");
  S.view = route.view;
  if (route.view === "home") {
    app.innerHTML = heroHTML() + aboutHTML() + experienceHTML() + projectsHTML() + approachHTML() + testimonialsHTML() + contactHTML();
    document.title = "Cristian Hincapié — Senior Product Designer";
  } else if (route.view === "index") {
    app.innerHTML = indexHTML(indexFilter);
    document.title = `${t("projectsPage.title").replace(/\.$/, "")} · Cristian Hincapié`;
  } else {
    const p = D.projects.find((x) => x.slug === route.slug);
    app.innerHTML = caseHTML(p);
    document.title = `${L(p.title)} · Cristian Hincapié`;
  }
  $("#siteHeader").innerHTML = headerHTML();
  $("#rail").innerHTML = route.view === "home" ? railHTML() : "";
  $("#footer").innerHTML = footerHTML();
  $("#cvSheet").innerHTML = cvSheetHTML();
  root.lang = S.lang;
  liquify(document);
  initHeader();
  if (route.view === "home") initHome();
  else if (route.view === "index") initIndex();
  else initCase();
  initGlobalInteractions();
  ScrollTrigger.refresh();
  if (!keepScroll) {
    if (route.anchor && route.anchor !== "inicio") scrollToId(route.anchor, true);
    else scrollTop();
  }
}

function scrollTop() { if (S.lenis) S.lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); }
function scrollToId(id, immediate = false) {
  const el = document.getElementById(id);
  if (!el) return;
  if (S.lenis) S.lenis.scrollTo(el, { immediate, duration: 1.4, easing: (x) => 1 - Math.pow(1 - x, 4) });
  else el.scrollIntoView({ behavior: immediate || REDUCED ? "auto" : "smooth" });
}

function navigate(hash, origin) {
  const target = hash.replace(/^#/, "");
  const cur = parseHash();
  const next = parseTarget(target);
  // misma vista (inicio → sección): solo desplazamiento
  if (cur.view === "home" && next.view === "home" && S.view === "home") {
    history.replaceState(null, "", "#" + target);
    if (target === "inicio") S.lenis ? S.lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
    else scrollToId(target);
    return;
  }
  transition(origin, () => { history.pushState(null, "", "#" + target); render(next); });
}

/* Transición circular (View Transitions API) o cortina de respaldo */
function transition(origin, update) {
  const x = origin ? origin.x : innerWidth / 2, y = origin ? origin.y : innerHeight / 2;
  root.style.setProperty("--vt-x", x + "px");
  root.style.setProperty("--vt-y", y + "px");
  if (REDUCED || !document.startViewTransition) { update(); return; }
  document.startViewTransition(() => { update(); });
}

/* ════════════════════════════════════════════════════════════════
   COMPORTAMIENTOS
   ════════════════════════════════════════════════════════════════ */
function onCleanup(fn) { S.cleanups.push(fn); }
function killView() {
  S.cleanups.splice(0).forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  ScrollTrigger.getAll().forEach((st) => st.kill());
  S.blobSections = []; S.portraitEl = null; S.fixedBlob = null; S.ringApi = null;
}

function initHeader() {
  const header = $("#siteHeader");
  $("[data-theme-toggle]", header).addEventListener("click", (e) => toggleTheme(e));
  $$("[data-set-lang]", header).forEach((b) => b.addEventListener("click", (e) => setLang(b.dataset.setLang, e)));
  const menu = $("#mobileMenu"), openBtn = $("[data-menu-open]", header);
  const setMenu = (open) => {
    menu.dataset.open = String(open); openBtn.setAttribute("aria-expanded", String(open));
    if (open) { S.lenis?.stop(); $("a", menu)?.focus(); } else { S.lenis?.start(); }
  };
  openBtn.addEventListener("click", () => setMenu(true));
  $("[data-menu-close]", menu).addEventListener("click", () => { setMenu(false); openBtn.focus(); });
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  menu.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); openBtn.focus(); } });
}

function setActiveNav(id) {
  const pill = $(".nav-pill"); if (!pill) return;
  const thumb = $(".thumb", pill);
  let found = null;
  $$("a[data-nav]", pill).forEach((a) => { const on = a.dataset.nav === id; a.setAttribute("aria-current", String(on)); if (on) found = a; });
  $$("#rail a").forEach((a) => a.setAttribute("aria-current", String(a.dataset.rail === id)));
  if (found) { thumb.style.opacity = "1"; thumb.style.width = found.offsetWidth + "px"; thumb.style.transform = `translateX(${found.offsetLeft - 5}px)`; thumb.style.left = "5px"; }
  else thumb.style.opacity = "0";
}

function toggleTheme(e) {
  const next = S.theme === "dark" ? "light" : "dark";
  transition({ x: e.clientX || innerWidth - 80, y: e.clientY || 40 }, () => {
    S.theme = next; root.dataset.theme = next; store.set("ch-theme", next);
    S.scene?.setTheme(next);
    $$('img[src*="portrait-"]').forEach((img) => { img.src = `assets/img/portrait-${next}.webp`; });
    const btn = $("[data-theme-toggle]"); btn?.setAttribute("aria-label", next === "dark" ? u("toLight") : u("toDark"));
    $("#cvSheet").innerHTML = cvSheetHTML(); bindCvSheet();
    $('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#09090b" : "#fafaf9");
  });
}

function setLang(lang, e) {
  if (lang === S.lang) return;
  const y = window.scrollY;
  const route = parseHash();
  transition({ x: e.clientX, y: e.clientY }, () => {
    S.lang = lang; store.set("ch-lang", lang);
    render(route, { keepScroll: true });
    S.lenis ? S.lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
    ScrollTrigger.update();
    $(`[data-set-lang="${lang}"]`)?.focus();
  });
}

/* Hoja del CV */
function bindCvSheet() {
  const dlg = $("#cvSheet");
  $("[data-close]", dlg)?.addEventListener("click", () => dlg.close());
}
function openCv() {
  const dlg = $("#cvSheet");
  if (!dlg.open) { dlg.showModal(); S.lenis?.stop(); }
}

let globalBound = false;
function initGlobalInteractions() {
  bindCvSheet();
  $$("[data-cv]").forEach((b) => b.addEventListener("click", openCv));
  if (FINE && !REDUCED) {
    $$("[data-magnetic]").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const move = (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.22); yTo((e.clientY - r.top - r.height / 2) * 0.3); };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
    });
  }
  if (globalBound) return;
  globalBound = true;

  $("#cvSheet").addEventListener("close", () => S.lenis?.start());
  $("#cvSheet").addEventListener("click", (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); });

  // enlaces internos
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (a.closest(".ring-card") && S.ringApi?.dragged()) { e.preventDefault(); return; }
    const href = a.getAttribute("href");
    if (a.dataset.toc) { e.preventDefault(); const el = document.getElementById("cs-" + a.dataset.toc); el && (S.lenis ? S.lenis.scrollTo(el, { offset: -100 }) : el.scrollIntoView()); return; }
    e.preventDefault();
    navigate(href, { x: e.clientX || innerWidth / 2, y: e.clientY || innerHeight / 2 });
  });
  window.addEventListener("popstate", () => render(parseHash()));

  // puntero → escena + cursor
  const cursor = $("#cursor");
  const cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
  const cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
  window.addEventListener("pointermove", (e) => {
    S.pointer.x = e.clientX; S.pointer.y = e.clientY;
    S.scene?.setPointer((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    if (FINE) { cx(e.clientX); cy(e.clientY); }
  }, { passive: true });
  if (FINE) {
    document.addEventListener("pointerover", (e) => {
      const lab = e.target.closest("[data-cursor]");
      const hov = e.target.closest("a, button, [role=tab]");
      cursor.classList.toggle("label", !!lab);
      cursor.classList.toggle("hover", !lab && !!hov);
      $("span", cursor).textContent = lab ? (lab.dataset.cursor === "drag" ? u("cursorDrag") : u("cursorView")) : "";
    });
  }
  document.addEventListener("visibilitychange", () => { if (!S.scene) return; document.hidden ? S.scene.stop() : S.scene.start(); });
}

/* ── INICIO ───────────────────────────────────────────────────── */
function initHome() {
  S.blobSections = $$("[data-blob]").map((el) => ({ el, s: JSON.parse(el.dataset.blob) }));
  S.portraitEl = $("#portraitSlot");

  // navegación activa
  $$("[data-section]").forEach((sec) => {
    ScrollTrigger.create({ trigger: sec, start: "top 45%", end: "bottom 45%", onToggle: (st) => st.isActive && setActiveNav(sec.id) });
  });

  initHeroRotator();
  initManifesto($(".manifesto"), $(".manifesto-text"));
  initManifesto($("#contacto"), $(".contact-title"), "top 80%", "top 25%");
  initVenn();
  initStack();
  initFeatured();
  S.ringApi = initRing();
  initApproach();
  initQuotes();
}

function initHeroRotator() {
  const display = $("#heroDisplay"), copy = $("#heroCopy");
  const tabs = $$(".slides-nav [data-slide]");
  let idx = 0, timer = null, fillTween = null;
  const DUR = 6.5;
  const r1 = $(".r1", display), r2 = $(".r2", display);

  function startFill() {
    fillTween?.kill();
    $$(".fill", $(".slides-nav")).forEach((f) => gsap.set(f, { scaleX: 0 }));
    const f = $(".fill", tabs[idx]);
    if (REDUCED) { gsap.set(f, { scaleX: 1 }); return; }
    fillTween = gsap.to(f, { scaleX: 1, duration: DUR, ease: "none", onComplete: () => go((idx + 1) % SLIDES.length, true) });
  }
  function go(n, auto = false) {
    if (n === idx && auto === false) return;
    const s = SLIDES[n];
    idx = n;
    tabs.forEach((b, i) => b.setAttribute("aria-selected", String(i === n)));
    const swap = () => {
      r1.innerHTML = chars(s.t1());
      r2.innerHTML = chars(s.t2()) + '<span class="caret" aria-hidden="true"></span>';
      copy.innerHTML = `<p class="hero-sub">${esc(s.sub())}</p><p class="hero-desc">${esc(s.desc())}</p><ol class="phases">${s.phases().map((p, i) => `<li><b>${pad(i + 1)}</b>${esc(p)}</li>`).join("")}</ol>`;
    };
    if (REDUCED) { swap(); startFill(); return; }
    gsap.timeline()
      .to($$(".ch", display), { yPercent: -110, duration: 0.5, stagger: 0.012, ease: "power3.in" })
      .to(copy, { autoAlpha: 0, y: -8, duration: 0.3 }, 0)
      .add(() => { swap(); gsap.fromTo($$(".ch", display), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.018, ease: "expo.out" }); })
      .fromTo(copy, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "<0.15");
    // la escena reacciona: cada rol "agita" el vidrio
    if (S.blobSections[0]) { S.blobSections[0].s.c = [0.22, 0.18, 0.15, 0.26][n]; S.blobSections[0].s.f = [0.85, 1.0, 1.15, 0.75][n]; }
    startFill();
  }
  tabs.forEach((b, i) => {
    b.addEventListener("click", () => go(i));
    b.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); const n = (idx + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length; tabs[n].focus(); go(n); }
    });
  });
  // pausar fuera de vista / al pasar el puntero
  ScrollTrigger.create({ trigger: "#inicio", start: "top top", end: "bottom top", onLeave: () => fillTween?.pause(), onEnterBack: () => fillTween?.resume() });
  const hero = $("#inicio");
  hero.addEventListener("pointerenter", () => { if (FINE) fillTween?.timeScale(0.35); });
  hero.addEventListener("pointerleave", () => fillTween?.timeScale(1));
  startFill();
  onCleanup(() => { fillTween?.kill(); clearTimeout(timer); });
}

function initManifesto(trigger, textEl, start = "top 75%", end = "bottom 70%") {
  if (!trigger || !textEl) return;
  const words = $$(".w", textEl);
  if (REDUCED) { words.forEach((w) => w.classList.add("on")); return; }
  ScrollTrigger.create({
    trigger, start, end, scrub: true,
    onUpdate: (st) => { const n = Math.round(st.progress * words.length * 1.15); words.forEach((w, i) => w.classList.toggle("on", i < n)); },
  });
}

function initVenn() {
  const svg = $(".venn svg"); if (!svg || REDUCED) return;
  const circles = $$("circle.c", svg);
  const offs = [[0, -50], [-45, 30], [45, 30]];
  const tl = gsap.timeline({ scrollTrigger: { trigger: ".venn", start: "top 85%", end: "center 50%", scrub: 1 } });
  circles.forEach((c, i) => tl.fromTo(c, { x: offs[i][0], y: offs[i][1] }, { x: 0, y: 0, ease: "none" }, 0));
  tl.fromTo($(".core", svg), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, ease: "back.out(2)" }, 0.6)
    .fromTo($(".core-t", svg), { opacity: 0 }, { opacity: 1 }, 0.8);
}

function initStack() {
  if (REDUCED) return;
  const cards = $$(".xp");
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    gsap.to(card, {
      scale: 1 - (cards.length - i) * 0.03, ease: "none",
      scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: `top ${110 + (i + 1) * 18}px`, scrub: true },
    });
    gsap.to(card.children, { opacity: 0.35, ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top 70%", end: `top ${110 + (i + 1) * 18}px`, scrub: true } });
  });
}

function initFeatured() {
  const pin = $(".feat-pin"), track = $(".feat-track");
  if (!pin || !wide() || REDUCED) return;
  const dist = () => track.scrollWidth - innerWidth;
  const bar = $(".feat-progress .bar i"), now = $("#featNow");
  const n = $$(".feat", track).length;
  const tween = gsap.to(track, {
    x: () => -dist(), ease: "none",
    scrollTrigger: {
      trigger: pin, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
      onUpdate: (st) => { gsap.set(bar, { scaleX: st.progress }); now.textContent = pad(Math.min(n, 1 + Math.floor(st.progress * n * 0.999))); },
    },
  });
  $$(".feat", track).forEach((panel) => {
    const img = $(".frame img", panel);
    gsap.fromTo(img, { xPercent: 0, scale: 1.12 }, { xPercent: -8, scale: 1.12, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
    gsap.fromTo($("h3", panel), { x: 60 }, { x: 0, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "left 35%", scrub: true } });
  });
}

function initRing() {
  const stage = $("#ringStage"), ring = $("#ring");
  if (!stage) return null;
  const cards = $$(".ring-card", ring);
  const n = cards.length, step = 360 / n;
  let angle = 0, vel = REDUCED ? 0 : -0.06, target = null, dragging = false, moved = 0, lastX = 0, visible = false, hover = false;
  const hint = $("#ringHint");
  const radius = () => { const w = cards[0].offsetWidth; return Math.round((w / 2) / Math.tan(Math.PI / n) + w * 0.18); };
  let R = radius();
  const ro = new ResizeObserver(() => { R = radius(); layout(); });
  ro.observe(stage);

  function front() { return ((Math.round(-angle / step) % n) + n) % n; }
  function layout() {
    cards.forEach((c, i) => {
      const a = i * step + angle;
      const rad = (a * Math.PI) / 180;
      const facing = Math.cos(rad);
      c.style.transform = `rotateY(${a}deg) translateZ(${R}px)`;
      c.style.opacity = String(0.25 + Math.max(0, facing) * 0.75);
      c.style.zIndex = String(Math.round(facing * 100) + 100);
      c.tabIndex = facing > 0.6 ? 0 : -1;
    });
    const f = front();
    hint.textContent = dragging || moved ? `${pad(f + 1)} ${u("ring.of")} ${pad(n)} — ${L(others()[f].title)}` : u("ring.hint");
  }
  function tick() {
    if (!visible) return;
    if (target !== null) { angle += (target - angle) * 0.12; if (Math.abs(target - angle) < 0.05) { angle = target; target = null; } }
    else if (!dragging) { angle += vel; if (!hover && !REDUCED) vel += (-0.06 - vel) * 0.02; else vel *= 0.94; }
    layout();
  }
  gsap.ticker.add(tick);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; layout(); }, { threshold: 0.05 });
  io.observe(stage);

  const snapTo = (dir) => { const f = Math.round(-angle / step) + dir; target = -f * step; moved = 1; };
  let captured = false;
  stage.addEventListener("pointerdown", (e) => { if (e.button > 0) return; dragging = true; moved = 0; captured = false; lastX = e.clientX; target = null; });
  stage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx); vel = dx * 0.18; angle += vel;
    if (moved > 6 && !captured) { captured = true; stage.setPointerCapture?.(e.pointerId); }
  });
  const up = () => { if (!dragging) return; dragging = false; if (moved > 6) { const f = Math.round(-(angle + vel * 12) / step); target = -f * step; } };
  stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
  stage.addEventListener("pointerenter", () => { hover = true; }); stage.addEventListener("pointerleave", () => { hover = false; up(); });
  $$("[data-ring]").forEach((b) => b.addEventListener("click", () => snapTo(-Number(b.dataset.ring))));
  stage.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { e.preventDefault(); snapTo(-1); } if (e.key === "ArrowLeft") { e.preventDefault(); snapTo(1); } });
  cards.forEach((c, i) => c.addEventListener("focus", () => { hover = true; target = -i * step + Math.round((angle + i * step) / 360) * 360; }));
  layout();
  onCleanup(() => { gsap.ticker.remove(tick); io.disconnect(); ro.disconnect(); });
  return { dragged: () => captured };
}

function initApproach() {
  const map = { 0: [1, 2], 1: [4], 2: [3] };
  const pills = $$(".pill");
  const set = (i) => { $$(".step").forEach((s) => s.classList.toggle("on", Number(s.dataset.step) === i)); pills.forEach((p) => p.classList.toggle("on", map[i]?.includes(Number(p.dataset.pill)))); };
  if (REDUCED || !wide()) { pills.forEach((p) => p.classList.add("on")); return; }
  set(0);
  $$(".step").forEach((s) => ScrollTrigger.create({ trigger: s, start: "top 62%", end: "bottom 38%", onToggle: (st) => st.isActive && set(Number(s.dataset.step)) }));
}

function initQuotes() {
  const cards = $$(".q-card"), tabs = $$(".q-tabs [data-q]");
  if (!cards.length) return;
  let idx = 0, bar = null, inView = false;
  const DUR = 8;
  function show(n, dir = 1) {
    if (n === idx) return;
    const out = cards[idx], inn = cards[n];
    idx = n;
    tabs.forEach((b, i) => b.setAttribute("aria-selected", String(i === n)));
    cards.forEach((c, i) => c.setAttribute("aria-hidden", String(i !== n)));
    if (REDUCED) { gsap.set(out, { autoAlpha: 0 }); gsap.set(inn, { autoAlpha: 1 }); }
    else {
      gsap.to(out, { autoAlpha: 0, yPercent: -6 * dir, rotateX: 8 * dir, filter: "blur(8px)", duration: 0.6, ease: "power3.in" });
      gsap.fromTo(inn, { autoAlpha: 0, yPercent: 8 * dir, rotateX: -10 * dir, filter: "blur(10px)" }, { autoAlpha: 1, yPercent: 0, rotateX: 0, filter: "blur(0px)", duration: 1, delay: 0.35, ease: "expo.out", clearProps: "filter" });
    }
    run();
  }
  function run() {
    bar?.kill();
    tabs.forEach((b) => gsap.set($(".t", b), { scaleX: 0 }));
    if (REDUCED || !inView) return;
    bar = gsap.to($(".t", tabs[idx]), { scaleX: 1, duration: DUR, ease: "none", onComplete: () => show((idx + 1) % cards.length) });
  }
  tabs.forEach((b, i) => {
    b.addEventListener("click", () => show(i, i > idx ? 1 : -1));
    b.addEventListener("keydown", (e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); const n = (idx + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length; tabs[n].focus(); show(n, e.key === "ArrowRight" ? 1 : -1); } });
  });
  const stage = $("#qStage");
  stage.addEventListener("pointerenter", () => bar?.pause()); stage.addEventListener("pointerleave", () => bar?.resume());
  stage.addEventListener("focusin", () => bar?.pause()); stage.addEventListener("focusout", () => bar?.resume());
  let sx = null;
  stage.addEventListener("pointerdown", (e) => { sx = e.clientX; });
  stage.addEventListener("pointerup", (e) => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) show((idx + (dx < 0 ? 1 : -1) + cards.length) % cards.length, dx < 0 ? 1 : -1); });
  ScrollTrigger.create({ trigger: stage, start: "top 85%", end: "bottom 15%", onToggle: (st) => { inView = st.isActive; inView ? run() : bar?.pause(); } });
  onCleanup(() => bar?.kill());
}

/* ── ÍNDICE ───────────────────────────────────────────────────── */
function initIndex() {
  S.fixedBlob = { x: 0.34, y: -0.18, s: 0.85, c: 0.18, f: 0.9 };
  $$("[data-filter]").forEach((b) => b.addEventListener("click", () => {
    indexFilter = b.dataset.filter;
    const y = window.scrollY;
    render({ view: "index" }, { keepScroll: true });
    window.scrollTo(0, y);
  }));
  const prev = $("#idxPreview"), img = $("img", prev);
  if (!FINE) return;
  const px = gsap.quickTo(prev, "left", { duration: 0.5, ease: "power3.out" });
  const py = gsap.quickTo(prev, "top", { duration: 0.5, ease: "power3.out" });
  $$(".idx-row").forEach((row) => {
    row.addEventListener("pointerenter", () => { img.src = row.dataset.preview; prev.classList.add("on"); });
    row.addEventListener("pointerleave", () => prev.classList.remove("on"));
    row.addEventListener("pointermove", (e) => { px(e.clientX + 200); py(e.clientY); });
  });
}

/* ── CASO ─────────────────────────────────────────────────────── */
function initCase() {
  S.fixedBlob = { x: 0.4, y: 0.34, s: 0.42, c: 0.12, f: 1.0 };
  if (!REDUCED) {
    gsap.fromTo(".case-cover", { scale: 0.92, borderRadius: 48 }, { scale: 1, borderRadius: 32, ease: "none", scrollTrigger: { trigger: ".case-cover", start: "top bottom", end: "top 25%", scrub: true } });
    gsap.fromTo(".case-cover img", { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: ".case-cover", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.from(".case-title", { yPercent: 30, opacity: 0.2, duration: 1.2, ease: "expo.out" });
    $$("[data-count]").forEach((el) => {
      const to = Number(el.dataset.count); const o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: to, duration: 1.4, ease: "power3.out", onUpdate: () => { el.textContent = Math.round(o.v); } }) });
    });
  }
  // índice lateral activo
  $$(".cs").forEach((sec) => ScrollTrigger.create({
    trigger: sec, start: "top 45%", end: "bottom 45%",
    onToggle: (st) => { if (st.isActive) $$(".toc a").forEach((a) => a.setAttribute("aria-current", String("cs-" + a.dataset.toc === sec.id))); },
  }));
  // galería
  const track = $("#gTrack");
  $$("[data-g]").forEach((b) => b.addEventListener("click", () => track.scrollBy({ left: Number(b.dataset.g) * track.clientWidth * 0.8, behavior: REDUCED ? "auto" : "smooth" })));
  // lightbox
  const lb = $("#lightbox"), lbImg = $("img", lb), lbCount = $("[data-lb-count]", lb);
  const imgs = $$(".g-item img", track).map((i) => i.getAttribute("src"));
  let cur = 0;
  const showLb = (i) => { cur = (i + imgs.length) % imgs.length; lbImg.src = imgs[cur]; lbCount.textContent = `${cur + 1} / ${imgs.length}`; };
  $$("[data-lb]", track).forEach((b) => b.addEventListener("click", () => { showLb(Number(b.dataset.lb)); lb.showModal(); S.lenis?.stop(); }));
  const prevB = $("[data-lb-prev]", lb), nextB = $("[data-lb-next]", lb), closeB = $("[data-lb-close]", lb);
  prevB.setAttribute("aria-label", u("prevImg")); nextB.setAttribute("aria-label", u("nextImg")); closeB.setAttribute("aria-label", u("close"));
  const onPrev = () => showLb(cur - 1), onNext = () => showLb(cur + 1), onClose = () => lb.close();
  const onKey = (e) => { if (!lb.open) return; if (e.key === "ArrowRight") onNext(); if (e.key === "ArrowLeft") onPrev(); };
  const onBg = (e) => { if (e.target === lb) lb.close(); };
  const onClosed = () => S.lenis?.start();
  prevB.addEventListener("click", onPrev); nextB.addEventListener("click", onNext); closeB.addEventListener("click", onClose);
  document.addEventListener("keydown", onKey); lb.addEventListener("click", onBg); lb.addEventListener("close", onClosed);
  onCleanup(() => {
    prevB.removeEventListener("click", onPrev); nextB.removeEventListener("click", onNext); closeB.removeEventListener("click", onClose);
    document.removeEventListener("keydown", onKey); lb.removeEventListener("click", onBg); lb.removeEventListener("close", onClosed);
  });
}

/* ════════════════════════════════════════════════════════════════
   ESCENA ↔ SCROLL
   ════════════════════════════════════════════════════════════════ */
const smooth = (a, b, x) => { const t2 = Math.min(1, Math.max(0, (x - a) / (b - a))); return t2 * t2 * (3 - 2 * t2); };
function syncScene() {
  const sc = S.scene; if (!sc) return;
  if (S.fixedBlob) { sc.setTarget(S.fixedBlob); sc.setPortrait(null, 0); return; }
  const secs = S.blobSections; if (!secs.length) return;
  const mid = innerHeight * 0.5;
  let i = 0;
  for (let k = 0; k < secs.length; k++) { const r = secs[k].el.getBoundingClientRect(); if (r.top <= mid) i = k; }
  const a = secs[i].s, b = (secs[i + 1] || secs[i]).s;
  const r = secs[i].el.getBoundingClientRect();
  const p = r.height ? (mid - r.top) / r.height : 0;
  const f = smooth(0.6, 1, p);
  const mix = (k) => (a[k] ?? 0) + ((b[k] ?? 0) - (a[k] ?? 0)) * f;
  // en móvil el vidrio se centra y se reduce para no tapar el texto
  const m = wide() ? 1 : 0;
  const mm = (k, alt) => { const va = a[alt] ?? a[k] * (alt === "mx" ? 0.35 : 1), vb = b[alt] ?? b[k] * (alt === "mx" ? 0.35 : 1); return va + (vb - va) * f; };
  sc.setTarget({ x: m ? mix("x") : mm("x", "mx"), y: m ? mix("y") : mm("y", "my"), s: mix("s") * (m ? 1 : 0.75), c: mix("c"), f: mix("f") });
  if (S.portraitEl) {
    const pr = S.portraitEl.getBoundingClientRect();
    sc.setPortrait({ left: pr.left, top: pr.top, width: pr.width, height: pr.height }, pr.bottom > -50 && pr.top < innerHeight + 50 ? 1 : 0);
  }
}

/* ════════════════════════════════════════════════════════════════
   ARRANQUE
   ════════════════════════════════════════════════════════════════ */
function boot() {
  // escena 3D
  const canvas = $("#gl");
  const lowPower = !wide() || (navigator.hardwareConcurrency || 8) <= 4;
  try {
    const test = document.createElement("canvas").getContext("webgl2");
    if (!test) throw new Error("no webgl2");
    S.scene = createScene(canvas, { theme: S.theme, lowPower, reducedMotion: REDUCED, portraits: window.CH_PORTRAITS || { dark: "assets/img/portrait-dark.webp", light: "assets/img/portrait-light.webp" } });
    S.scene.setTarget({ s: 0 });
    S.scene.start();
  } catch (err) {
    canvas.remove();
    document.body.classList.add("no-gl");
    const fb = document.createElement("div"); fb.className = "gl-fallback"; document.body.prepend(fb);
  }
  if (REDUCED) document.body.classList.add("no-motion");

  // scroll suave
  if (!REDUCED && window.Lenis) {
    S.lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 });
    S.lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => S.lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  gsap.ticker.add(syncScene);
  if (REDUCED) window.addEventListener("scroll", syncScene, { passive: true });

  render(parseHash());

  // loader + entrada del hero (un único momento orquestado)
  const loader = $("#loader");
  const finish = () => {
    loader.classList.add("done");
    if (S.view === "home" && !REDUCED) {
      gsap.from($$("#heroDisplay .ch"), { yPercent: 110, duration: 1.2, stagger: 0.03, ease: "expo.out", delay: 0.1 });
      gsap.from(["#heroCopy", ".hero-cta", ".slides-nav", ".hero-band", ".hero-top"], { autoAlpha: 0, y: 18, duration: 1, stagger: 0.08, ease: "power3.out", delay: 0.35 });
    }
  };
  setTimeout(finish, REDUCED ? 0 : 1150);
  window.addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

boot();
