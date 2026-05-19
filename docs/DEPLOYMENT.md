# Despliegue y mantenimiento

## Requisitos

- Node.js 20+ (recomendado 22)
- npm

## Local

```bash
cd Portfolio
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

| Variable | Ejemplo | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://tu-dominio.com` | `metadataBase`, JSON-LD, sitemap, robots |

Fallback en `src/config/site.ts`: `https://cristianhincapie.com`.

## Vercel

1. Repo en GitHub con esta carpeta como raíz del proyecto.
2. Importar en Vercel (Next.js autodetectado).
3. Añadir `NEXT_PUBLIC_SITE_URL`.
4. Deploy. `@vercel/analytics` queda activo en producción.

## Contenido

- Textos UI: `src/messages/es.json`, `src/messages/en.json`.
- Proyectos y casos: `src/content/projects.ts` (incluye `figmaUrl` / `prototypeUrl` cuando los tengas).
- Contacto y redes: `src/config/site.ts`.

## CV e imágenes

- Coloca `public/cv.pdf` para el CTA “Ver CV”.
- Sustituye placeholders del Hero y galerías por assets en `public/` usando `next/image` cuando quieras optimización.

## SEO

- Global: `src/app/layout.tsx`.
- Por caso: `generateMetadata` en `src/app/[locale]/projects/[slug]/page.tsx`.

## CI

`.github/workflows/ci.yml` ejecuta lint, typecheck y build.
