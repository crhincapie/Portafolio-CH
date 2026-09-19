const CDP = require('/var/folders/w6/b_m7y2ts1x96z12w_9dc0jxw0000gn/T/opencode/node_modules/chrome-remote-interface/index.js');

const PAGE_W = 792;
const PAGE_H = 1740;

const themes = [
  { name: 'dark (screen)', theme: 'dark', print: false },
  { name: 'light (screen)', theme: 'light', print: false },
  { name: 'dark (print)', theme: 'dark', print: true },
  { name: 'light (print)', theme: 'light', print: true },
];

const PHRASES = [
  'Lideré iniciativas de diseño y evolución',
  'desde investigación y arquitectura de información hasta user flows',
  'soluciones digitales claras y accionables',
  'creando patrones y componentes reutilizables',
  'analítica digital',
  'Facilito workshops',
  'más de 300 usuarios',
  'incluyendo Copilot, Gemini y Claude',
  'Power Automate y n8n',
  'desde discovery hasta implementación',
  'user flows, arquitectura de información, wireframes, prototipos',
  'investigación con usuarios',
  'usabilidad, conversión y claridad de interacción',
  'equilibrando necesidades de usuario y objetivos de negocio',
  'comportamiento de usuarios',
  'viabilidad técnica y la correcta implementación',
  'Inteligencia Artificial',
  'productos financieros web y mobile',
  'pruebas de usabilidad y validaciones funcionales',
  'prototipos de alta fidelidad',
  'evolucionar continuamente los canales digitales',
  'métricas y comportamiento de usuarios',
  'implementación con equipos de desarrollo',
  'plataformas web y aplicaciones móviles',
  'flujos de usuario y experiencias de producto',
  'componentes reutilizables',
  'React, Angular, Ionic, HTML, CSS y JavaScript',
  'landing pages y experiencias digitales orientadas a conversión',
  'más de 8 años de experiencia',
  'Diseñador de producto',
  'UX · UI · Product Design · Service Design',
  'end-to-end',
  'Design Systems',
  'soluciones simples y escalables',
  'me permite conectar la intención del diseño',
  'evolución en producto',
  'Politécnico Gran Colombiano',
  'Cenigraf',
  'Fundamentos UX',
  'Google',
  'Agile',
  'Julian Torres Gomez',
  'Yasmin Ayala Torres',
  'Edwin Nayib Fuentes',
  'Brayhan Farid Garcia',
  'Evertec',
  'Ontop',
  'Profesional Senior',
  'Compensar',
  'ADL Digital Lab',
  'Scotiabank Colpatria',
  'Fitpal SAS',
  'Inglés',
  'Español',
  'Nativo',
  'c.hincapie.design@gmail.com',
  'linkedin',
  'Senior Product Designer',
  'Design & UX/UI Lead',
];

async function measure(theme, print) {
  const cdp = await CDP({ port: 9222 });
  const { Runtime, Page, Emulation } = cdp;
  await Promise.all([Page.enable(), Runtime.enable()]);

  const url = `file:///Users/cristianhincapie/Documents/Portafolio/Portafolio-CH/public/cv/cv.html?theme=${theme}`;
  await Emulation.setDeviceMetricsOverride({ width: PAGE_W + 40, height: PAGE_H + 80, deviceScaleFactor: 1, mobile: false });
  await Page.navigate({ url });
  await Page.loadEventFired();
  await new Promise(r => setTimeout(r, 1200));
  if (print) { await Emulation.setEmulatedMedia({ media: 'print' }); await new Promise(r => setTimeout(r, 400)); }

  const expr = `(function(){
    const PHRASES = ${JSON.stringify(PHRASES)};
    const PAGE = document.querySelector('.page');
    if (!PAGE) return { evalError: 'no .page' };
    const pr = PAGE.getBoundingClientRect();
    const ph = pr.height, pw = pr.width;
    const frame = document.querySelector('.frame');
    const frameTop = frame.getBoundingClientRect().top;
    const skip = el => {
      const cls = el.getAttribute('class') || '';
      const eg = el.closest && el.closest('.bg-art,.topline,.deco');
      return /bg-art|page-bg|glass-bg|topline|deco|wave|ring|dotp|blob/i.test(cls) || !!eg;
    };
    const nameOf = el => (el.getAttribute && el.getAttribute('class')) || el.tagName;
    const all = Array.from(PAGE.querySelectorAll('*')).filter(el => {
      const st = getComputedStyle(el); const r = el.getBoundingClientRect();
      return r.width > 1 && r.height > 1 && st.visibility !== 'hidden' && st.display !== 'none' && !skip(el);
    });
    const rects = all.map(el => { const r = el.getBoundingClientRect(); return { el, t: r.top, b: r.bottom, l: r.left, r2: r.right, w: r.width }; });
    const overlaps = [];
    for (let i=0;i<rects.length;i++) for (let j=i+1;j<rects.length;j++) {
      const a = rects[i], b = rects[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const ox = Math.min(a.r2,b.r2) - Math.max(a.l,b.l);
      const oy = Math.min(a.b,b.b) - Math.max(a.t,b.t);
      if (ox > 2 && oy > 2) {
        overlaps.push(nameOf(a.el)+' ∩ '+nameOf(b.el)+' ('+Math.round(ox)+'x'+Math.round(oy)+')');
      }
    }
    const txt = PAGE.textContent || '';
    const missing = PHRASES.filter(p => !txt.toLowerCase().includes(p.toLowerCase()));
    const scrollH = PAGE.scrollHeight;
    // bottom-most rendered content
    const bottoms = all.map(el => el.getBoundingClientRect().bottom - frameTop);
    const lastBottom = Math.round(Math.max(...bottoms));
    // column heights
    const side = document.querySelector('.side'), main = document.querySelector('.main');
    const g = el => el ? { h: Math.round(el.getBoundingClientRect().height), bottom: Math.round(el.getBoundingClientRect().bottom - frameTop) } : null;
    const natural = el => {
      if (!el) return null;
      const top = el.getBoundingClientRect().top;
      const kids = Array.from(el.children);
      if (!kids.length) return Math.round(el.scrollHeight);
      const last = Math.max(...kids.map(k => k.getBoundingClientRect().bottom));
      return Math.round(last - top);
    };
    const panels = Array.from(document.querySelectorAll('.main > *')).map(el => ({
      c: el.getAttribute('class'), h: Math.round(el.getBoundingClientRect().height)
    }));
    const sideKids = Array.from(document.querySelectorAll('.side > *')).map(el => ({
      t: (el.querySelector('.label') ? el.querySelector('.label').textContent : (el.getAttribute('class') || el.tagName)).trim().slice(0, 22),
      h: Math.round(el.getBoundingClientRect().height)
    }));
    return {
      page: Math.round(pw)+'x'+Math.round(ph),
      scrollH, overflow: scrollH > ph + 1,
      lastContentBottom: lastBottom,
      bottomGap: Math.round(ph - lastBottom),
      side: g(side), main: g(main),
      sideNatural: natural(side), mainNatural: natural(main),
      panels, sideKids,
      overlapsCount: overlaps.length,
      overlaps: overlaps.slice(0, 25),
      missing,
      found: PHRASES.length - missing.length,
      total: PHRASES.length,
      imgs: (function(){ const s=Array.from(document.images); return { total: s.length, broken: s.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')) }; })(),
    };
  })()`;

  const res = await Runtime.evaluate({ expression: expr, returnByValue: true });
  await cdp.close();
  if (res.result && res.result.value) return res.result.value;
  return { evalError: JSON.stringify(res.exceptionDetails || res).slice(0, 2000) };
}

(async () => {
  for (const t of themes) {
    const r = await measure(t.theme, t.print);
    console.log('\n=== ' + t.name + ' ===');
    if (r.evalError) { console.log('EVAL ERROR:', r.evalError); continue; }
    console.log('page:', r.page, '| scrollH:', r.scrollH, '| overflow:', r.overflow);
    console.log('lastContentBottom:', r.lastContentBottom, '| bottomGap:', r.bottomGap);
    console.log('side:', JSON.stringify(r.side), '| main:', JSON.stringify(r.main));
    console.log('natural -> side:', r.sideNatural, '| main:', r.mainNatural);
    console.log('main panels:', JSON.stringify(r.panels));
    console.log('side kids:', JSON.stringify(r.sideKids));
    console.log('imgs:', r.imgs.total, 'broken:', JSON.stringify(r.imgs.broken));
    console.log('overlaps:', r.overlapsCount, r.overlaps);
    console.log('content:', r.found + '/' + r.total, r.missing.length ? ('MISSING -> ' + r.missing.join(' | ')) : 'OK');
  }
  process.exit(0);
})();
