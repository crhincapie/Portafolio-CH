# Propuesta 2026 · Portafolio Cristian Hincapié

Rediseño completo, integrado al proyecto Next.js como sitio estático en `public/propuesta/`.

## Cómo verla
| Forma | Comando | URL |
|---|---|---|
| Desarrollo (recomendado) | `npm run dev` | http://localhost:3000/propuesta |
| Producción local | `npm run build` y luego `npm start` | http://localhost:3000/propuesta |
| Sin servidor | doble clic en `public/propuesta/index.html` | — |
| Vercel | se publica sola con el deploy | https://cristianhincapie.com/propuesta |

El sitio actual sigue intacto en `/`. La propuesta vive aparte en `/propuesta` para comparar ambos.

## Estructura
- `index.html` — documento único (vistas por hash: `#sobre`, `#casos`, `#caso-agrocash`…)
- `src/app.js` — vistas, rutas, interacciones (GSAP + ScrollTrigger + Lenis)
- `src/scene.js` — escena Three.js: vidrio líquido, retrato refractado, cintas de luz
- `src/glass.js` — refracción liquid glass (SVG displacement en Chromium, esmerilado en el resto)
- `assets/app.bundle.js` — `src/*` + three.js empaquetados (lo que carga la página)
- `assets/styles.css`, `assets/fonts.css` (Figtree embebida), `assets/data.js` (contenido 1:1 de `src/content` y `src/messages`)
- `assets/vendor/` — gsap 3.12.5, ScrollTrigger, lenis 1.1.13, three 0.160 (locales, sin CDN)

## Si editas `src/*.js`
Regenera el paquete con `npm run propuesta:build` (usa esbuild vía npx; no añade dependencias).
Textos y proyectos: edita `assets/data.js`.

## Concepto
"Del problema a la claridad": un objeto 3D de vidrio líquido narra el recorrido; caótico en el
hero (el problema), lente perfecta en el manifiesto (la claridad), lente detrás del "Hablemos".
