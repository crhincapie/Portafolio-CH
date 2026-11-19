import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { GalleryCarousel } from "@/components/case-study/GalleryCarousel";
import { PrototypeLinkButton } from "@/components/case-study/PrototypeLinkButton";
import { CaseDock, CaseHeroScreen, CountUp, ProcessTrack, ScrollQuote } from "@/components/case-study/StatCards";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { pickLocale } from "@/content/i18n";
import { PROJECTS, getProjectBySlug } from "@/content/projects";
import { buildCreativeWorkJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

type Props = { slug: string };

type Theme = {
  accent: string; // hex (dark, vivid neon)
  accentLight: string; // hex, readable on light surfaces
  soft: string; // tailwind bg for glow
  glow: string; // boxShadow hue
  grad: string; // bg-gradient class for underline
  ring: string;
};

const THEMES: Record<string, Theme> = {
  "logi-ops": {
    accent: "#4fd8ff",
    accentLight: "#0284c7",
    soft: "bg-sky-400/20",
    glow: "rgba(79,216,255,0.18)",
    grad: "from-cyan-400 via-sky-400 to-blue-500",
    ring: "border-sky-400/30",
  },
  "balanc-funcional": {
    accent: "#7dffd9",
    accentLight: "#0d9488",
    soft: "bg-emerald-400/20",
    glow: "rgba(107,255,191,0.18)",
    grad: "from-emerald-400 via-cyan-400 to-emerald-500",
    ring: "border-emerald-400/30",
  },
  "turismo-sostenible": {
    accent: "#55e6a5",
    accentLight: "#059669",
    soft: "bg-emerald-400/20",
    glow: "rgba(85,230,165,0.18)",
    grad: "from-emerald-400 via-teal-400 to-green-500",
    ring: "border-emerald-400/30",
  },
  agrocash: {
    accent: "#ffb547",
    accentLight: "#d97706",
    soft: "bg-amber-400/20",
    glow: "rgba(255,181,71,0.18)",
    grad: "from-amber-400 via-orange-400 to-amber-600",
    ring: "border-amber-400/30",
  },
  "bienestar-a-la-carta": {
    accent: "#ff7da5",
    accentLight: "#e11d48",
    soft: "bg-rose-400/20",
    glow: "rgba(255,125,165,0.18)",
    grad: "from-rose-400 via-pink-400 to-rose-500",
    ring: "border-rose-400/30",
  },
  "hola-vivienda": {
    accent: "#6ec1ff",
    accentLight: "#0284c7",
    soft: "bg-sky-400/20",
    glow: "rgba(110,193,255,0.18)",
    grad: "from-sky-400 via-blue-400 to-sky-600",
    ring: "border-sky-400/30",
  },
  "un-asunto-de-dos": {
    accent: "#c39bff",
    accentLight: "#6d28d9",
    soft: "bg-violet-400/20",
    glow: "rgba(195,155,255,0.18)",
    grad: "from-violet-400 via-purple-400 to-violet-600",
    ring: "border-violet-400/30",
  },
  "avaluador-playground": {
    accent: "#ff9f6e",
    accentLight: "#ea580c",
    soft: "bg-orange-400/20",
    glow: "rgba(255,159,110,0.18)",
    grad: "from-orange-400 via-amber-400 to-orange-600",
    ring: "border-orange-400/30",
  },
  "davivienda-e-learning": {
    accent: "#5eead4",
    accentLight: "#0d9488",
    soft: "bg-teal-400/20",
    glow: "rgba(94,234,212,0.18)",
    grad: "from-teal-400 via-cyan-400 to-teal-600",
    ring: "border-teal-400/30",
  },
  "publicacion-inmueble": {
    accent: "#84ccff",
    accentLight: "#2563eb",
    soft: "bg-blue-400/20",
    glow: "rgba(132,204,255,0.18)",
    grad: "from-blue-400 via-cyan-400 to-blue-600",
    ring: "border-blue-400/30",
  },
};

const STEPS: { key: string; source: "research" | "uxProcess" | "wireframes" | "decisions" }[] = [
  { key: "stepResearch", source: "research" },
  { key: "stepMap", source: "uxProcess" },
  { key: "stepPrototype", source: "wireframes" },
  { key: "stepDecide", source: "decisions" },
];

/* ─────────────────────────────────────────────────────────────
   CASO DE ESTUDIO
   Hero con la pantalla que se endereza en 3D → ficha en bento →
   el reto conectado al objetivo (el nodo y la barra del monograma)
   → proceso en carril horizontal → diseño en bento → resultados
   que cuentan → el aprendizaje que se enciende al leer → galería
   → siguiente caso. Un dock flotante acompaña todo el recorrido.
   ───────────────────────────────────────────────────────────── */
export async function CaseStudyView({ slug }: Props) {
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("caseStudy");
  const locale = await getLocale();
  const cs = project.caseStudy;
  const theme = THEMES[slug] ?? THEMES["balanc-funcional"];
  const L = (v: { es: string; en: string }) => pickLocale(locale, v);
  const label = (key: string) => t(`label_${key}` as Parameters<typeof t>[0]);

  const prototype = project.prototypeUrl ?? cs.prototypeUrl;
  const gallery = project.gallery ?? [];
  const heroImage = project.heroImage ?? gallery[0] ?? `/images/projects/${project.slug}/home.webp`;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const nextImage = next.heroImage ?? next.gallery?.[0];

  const path = locale === "es" ? `/projects/${project.slug}` : `/en/projects/${project.slug}`;
  const url = `${siteConfig.url.replace(/\/$/, "")}${path}`;
  const host = prototype ? new URL(prototype).host : `${new URL(siteConfig.url).host}${path}`;

  const creativeLd = buildCreativeWorkJsonLd({
    locale,
    name: L(project.title),
    description: L(project.summary),
    url,
    datePublished: `${project.year}-01-01`,
  });

  const sections = [
    { id: "resumen", label: label("navSummary") },
    { id: "reto", label: label("navChallenge") },
    { id: "proceso", label: label("navProcess") },
    { id: "diseno", label: label("navDesign") },
    { id: "resultados", label: label("navResults") },
    { id: "aprendizaje", label: label("navLearning") },
  ];

  const imgA = gallery[1] ?? heroImage;
  const imgB = gallery[2] ?? gallery[0] ?? heroImage;
  const mobileShots = project.galleryVariant === "mobile";

  return (
    <article
      className="relative overflow-x-clip pb-24 [--a:var(--acc)] light:[--a:var(--acc-l)]"
      style={{ "--acc": theme.accent, "--acc-l": theme.accentLight } as CSSProperties}
    >
      <JsonLd data={[creativeLd]} />
      <CaseDock items={sections} title={label("onThisCase")} />

      {/* Ambiente del caso */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[120vh] overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]" style={{ backgroundColor: "var(--a)" }} />
        <div className="absolute right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* ————— HERO ————— */}
        <header className="pt-10 md:pt-16">
          <div className="flex items-center justify-between gap-4 text-sm">
            <Link href="/projects" className="group inline-flex items-center gap-2 text-muted transition hover:text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition group-hover:-translate-x-0.5 group-hover:border-[color:var(--a)]">
                <ArrowLeft />
              </span>
              {label("allCases")}
            </Link>
            <span className="text-faint">
              {label("case")} <span className="font-semibold tabular-nums text-ink">{String(index + 1).padStart(2, "0")}</span> / {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-2 md:mt-16">
            <span className="rounded-full border px-3.5 py-1.5 text-sm font-medium text-[color:var(--a)]" style={{ borderColor: "color-mix(in srgb, var(--a) 40%, transparent)", backgroundColor: "color-mix(in srgb, var(--a) 8%, transparent)" }}>
              {L(project.company)}
            </span>
            <span className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-soft">{project.year}</span>
          </div>

          <h1 className="mt-6 max-w-[14ch] text-balance text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-ink">
            {L(project.title)}
          </h1>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-soft md:text-xl">{L(project.summary)}</p>
            <div className="flex flex-col gap-4 md:items-end">
              <p className="text-sm text-muted">
                {label("role")} <span className="ml-1 font-semibold text-ink">{L(project.role)}</span>
              </p>
              <div className="flex w-full flex-wrap gap-3 md:justify-end">
                {prototype ? (
                  <div className="min-w-[12rem] flex-1 md:flex-none">
                    <PrototypeLinkButton label={t("openPrototype")} url={prototype} aspectRatio={project.prototypeAspect} zoom={project.prototypeZoom} />
                  </div>
                ) : null}
                <a href="#proceso" className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-line-strong px-5 py-3 text-sm font-medium text-ink transition hover:border-[color:var(--a)]">
                  {label("viewProcess")}
                  <ArrowDown />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-14">
            <CaseHeroScreen
              src={heroImage}
              alt={L(project.title)}
              host={host}
              notes={[
                { label: label("screensNote"), value: cs.interfaces },
                { label: label("componentsNote"), value: cs.components },
              ]}
            />
          </div>
        </header>

        {/* ————— RESUMEN · bento ————— */}
        <section id="resumen" className="scroll-mt-24 pt-24 md:pt-32">
          <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12">
            <Tile className="md:col-span-6 lg:col-span-7 lg:row-span-2" tint>
              <Eyebrow>{t("context")}</Eyebrow>
              <p className="mt-6 text-pretty text-2xl font-medium leading-snug tracking-[-0.02em] text-ink md:text-[2rem]">{L(cs.context)}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-10">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line-strong px-3 py-1 text-xs text-soft">
                    {tag}
                  </span>
                ))}
              </div>
            </Tile>

            <Tile className="md:col-span-3 lg:col-span-5">
              <Eyebrow>{label("role")}</Eyebrow>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-ink">{L(project.role)}</p>
              <p className="mt-2 text-sm text-muted">
                {L(project.company)}, {project.year}
              </p>
            </Tile>

            <Tile className="md:col-span-3 lg:col-span-5">
              <div className="grid h-full grid-cols-2 divide-x divide-line">
                <div className="pr-4">
                  <p className="text-[clamp(2.6rem,5vw,3.8rem)] font-semibold leading-none tracking-[-0.04em] text-[color:var(--a)]">
                    <CountUp value={cs.interfaces} />
                  </p>
                  <p className="mt-3 text-sm text-muted">{label("screensNote")}</p>
                </div>
                <div className="pl-5">
                  <p className="text-[clamp(2.6rem,5vw,3.8rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                    <CountUp value={cs.components} />
                  </p>
                  <p className="mt-3 text-sm text-muted">{label("componentsNote")}</p>
                </div>
              </div>
            </Tile>

            <Tile className="md:col-span-3 lg:col-span-6">
              <Eyebrow>{label("tools")}</Eyebrow>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cs.tools.map((tool) => (
                  <li key={tool} className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.03] px-3 py-2 text-sm text-soft light:bg-zinc-900/[0.03]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.08] text-[10px] font-semibold text-ink light:bg-zinc-900/[0.08]">
                      {tool.charAt(0)}
                    </span>
                    {tool}
                  </li>
                ))}
              </ul>
            </Tile>

            <Tile className="md:col-span-3 lg:col-span-6">
              <Eyebrow>{label("tech")}</Eyebrow>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cs.techStack.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border px-3 py-2 text-sm text-[color:var(--a)]"
                    style={{ borderColor: "color-mix(in srgb, var(--a) 30%, transparent)", backgroundColor: "color-mix(in srgb, var(--a) 6%, transparent)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Tile>
          </div>
        </section>

        {/* ————— RETO → OBJETIVO ————— */}
        <section id="reto" className="scroll-mt-24 pt-24 md:pt-32">
          <div className="glass-surface relative overflow-hidden rounded-[32px]">
            <div className="grid md:grid-cols-[1fr_auto_1fr]">
              <div className="p-8 md:p-12">
                <Eyebrow muted>{label("problem")}</Eyebrow>
                <p className="mt-6 text-pretty text-2xl font-medium leading-snug tracking-[-0.02em] text-soft md:text-3xl">{L(cs.problem)}</p>
              </div>

              {/* Conector: nodo → barra → asta (el monograma CH) */}
              <div aria-hidden className="flex items-center justify-center px-8 md:px-2">
                <svg viewBox="0 0 120 60" className="h-14 w-28 rotate-90 md:h-16 md:w-32 md:rotate-0">
                  <circle cx="14" cy="30" r="8" className="fill-none stroke-current text-faint" strokeWidth="3" />
                  <path d="M26 30 H100" stroke="var(--a)" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 9" />
                  <path d="M106 12 V48" stroke="var(--a)" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </div>

              <div className="relative p-8 md:p-12" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--a) 10%, transparent), transparent 70%)" }}>
                <Eyebrow>{label("goals")}</Eyebrow>
                <p className="mt-6 text-pretty text-2xl font-semibold leading-snug tracking-[-0.02em] text-ink md:text-3xl">{L(cs.goals)}</p>
              </div>
            </div>
            <div className="grid gap-4 border-t border-line p-8 md:grid-cols-[12rem_1fr] md:p-12">
              <Eyebrow>{label("research")}</Eyebrow>
              <p className="max-w-3xl text-pretty text-lg leading-relaxed text-soft">{L(cs.research)}</p>
            </div>
          </div>
        </section>
      </div>

      {/* ————— PROCESO ————— */}
      <section id="proceso" className="scroll-mt-0 pt-24 md:pt-32">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <ProcessTrack
            heading={label("processTitle")}
            intro={label("processIntro")}
            steps={STEPS.map((s) => ({ title: label(s.key), text: L(cs[s.source]) }))}
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* ————— DISEÑO · bento ————— */}
        <section id="diseno" className="scroll-mt-24 pt-24 md:pt-32">
          <h2 className="mb-10 max-w-[16ch] text-balance text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">{label("designTitle")}</h2>
          <div className="grid gap-4 md:grid-cols-12">
            <Tile className="!p-0 md:col-span-7" tint>
              <div className="p-7 md:p-9">
                <Eyebrow>{label("uiExploration")}</Eyebrow>
                <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-soft">{L(cs.uiExploration)}</p>
              </div>
              <div className="relative mx-7 mt-auto h-64 overflow-hidden rounded-t-2xl border border-b-0 border-line-strong md:mx-9 md:h-80">
                <Image src={imgA} alt={label("uiExploration")} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-top transition-transform duration-[2500ms] ease-out hover:scale-[1.03]" />
              </div>
            </Tile>

            <Tile className="!p-0 md:col-span-5">
              <div className="relative h-full min-h-[22rem] overflow-hidden">
                <Image src={imgB} alt={label("wireframes")} fill sizes="(min-width: 768px) 40vw, 100vw" className={cn("object-cover", mobileShots ? "object-top" : "object-left-top")} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full bg-black/50 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                  {label("wireframes")}
                </span>
              </div>
            </Tile>

            <Tile className="md:col-span-12">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                <div>
                  <Eyebrow>{label("designSystem")}</Eyebrow>
                  <p className="mt-4 text-pretty text-lg leading-relaxed text-soft md:text-xl">{L(cs.designSystem)}</p>
                </div>
                <div className="grid gap-6 rounded-3xl border border-line p-5 sm:grid-cols-[auto_1fr] sm:p-6">
                  <div className="flex items-end justify-between gap-4 sm:flex-col sm:items-start">
                    <span className="text-[5.5rem] font-semibold leading-none tracking-[-0.05em] text-ink">Aa</span>
                    <span className="mt-2 text-xs text-muted">Figtree</span>
                  </div>
                  <div className="space-y-5">
                    <div className="flex gap-2">
                      {[
                        { c: "var(--acc)", n: "Primary" },
                        { c: "var(--acc-l)", n: "On light" },
                        { c: "#6366f1", n: "Indigo" },
                        { c: "#18181b", n: "Surface" },
                        { c: "#fafaf9", n: "Canvas" },
                      ].map((sw) => (
                        <div key={sw.n} className="flex-1">
                          <div className="aspect-square rounded-xl border border-line-strong" style={{ backgroundColor: sw.c }} />
                          <p className="mt-1.5 truncate text-[11px] text-faint">{sw.n}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[color:var(--a)] px-4 py-2 text-xs font-semibold text-zinc-950 light:text-white">Button</span>
                      <span className="rounded-full border border-line-strong px-4 py-2 text-xs text-soft">Secondary</span>
                      <span className="h-6 w-11 rounded-full bg-[color:var(--a)] p-0.5">
                        <span className="ml-auto block h-5 w-5 rounded-full bg-white" />
                      </span>
                      <span className="ml-auto text-sm text-muted">
                        <CountUp value={cs.components} className="font-semibold text-ink" /> {label("shortComponents")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Tile>
          </div>
        </section>

        {/* ————— RESULTADOS ————— */}
        <section id="resultados" className="scroll-mt-24 pt-24 md:pt-32">
          <div className="relative overflow-hidden rounded-[32px] border border-line-strong bg-zinc-950 p-8 text-white md:p-14 light:bg-zinc-950">
            <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-30 blur-[100px]" style={{ backgroundColor: "var(--acc)" }} />
            <div aria-hidden className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-indigo-500/25 blur-[100px]" />
            <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--acc)" }}>
                  {label("results")}
                </p>
                <p className="mt-6 text-pretty text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.03em]">{L(cs.results)}</p>
                {cs.metrics?.length ? (
                  <ul className="mt-10 space-y-4">
                    {cs.metrics.map((m, i) => (
                      <li key={i} className="flex gap-4 text-base leading-relaxed text-zinc-300">
                        <span className="mt-2 flex shrink-0 items-center">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--acc)" }} />
                          <span className="h-[2px] w-4" style={{ backgroundColor: "var(--acc)" }} />
                        </span>
                        {L(m)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="grid grid-cols-3 gap-3 self-end lg:grid-cols-1">
                {[
                  { v: cs.interfaces, l: label("heroScreens") },
                  { v: cs.components, l: label("heroComponents") },
                  { v: STEPS.length, l: label("metricSteps") },
                ].map((n) => (
                  <div key={n.l} className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:flex-row lg:items-baseline lg:justify-between lg:p-5">
                    <span className="text-xs text-zinc-400 lg:order-2 lg:text-sm">{n.l}</span>
                    <CountUp value={n.v} className="text-4xl font-semibold tracking-[-0.04em] lg:text-6xl" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ————— APRENDIZAJE ————— */}
        <section id="aprendizaje" className="scroll-mt-24 py-28 md:py-40">
          <p className="mb-8 text-sm font-medium text-[color:var(--a)]">{label("learnings")}</p>
          <ScrollQuote text={L(cs.learnings)} />
        </section>

        {/* ————— GALERÍA ————— */}
        {gallery.length > 1 ? (
          <section className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink md:text-4xl">{t("gallery")}</h2>
              <span className="text-sm text-faint">
                {gallery.length} {label("galleryCount")}
              </span>
            </div>
            <GalleryCarousel images={gallery} title={L(project.title)} variant={project.galleryVariant} />
          </section>
        ) : null}

        {/* ————— SIGUIENTE CASO ————— */}
        <section className="pt-24 md:pt-32">
          <Link
            href={`/projects/${next.slug}`}
            className="group glass-surface relative grid overflow-hidden rounded-[32px] md:grid-cols-[1fr_1fr]"
          >
            <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
              <p className="text-sm text-muted">{label("next")}</p>
              <div>
                <p className="text-sm text-faint">
                  {L(next.company)}, {next.year}
                </p>
                <p className="mt-3 text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">{L(next.title)}</p>
              </div>
              <span className="inline-flex w-fit items-center gap-3 rounded-full bg-[#00feff] px-5 py-3 text-sm font-semibold text-zinc-950 transition group-hover:gap-4">
                {t("viewCase")}
                <ArrowRight />
              </span>
            </div>
            {nextImage ? (
              <div className="relative min-h-[16rem] overflow-hidden md:min-h-[24rem]">
                <Image
                  src={nextImage}
                  alt={L(next.title)}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
            ) : null}
          </Link>
        </section>
      </div>
    </article>
  );
}

/* ————— piezas de presentación ————— */

function Tile({ children, className, tint }: { children: ReactNode; className?: string; tint?: boolean }) {
  return (
    <div
      className={cn("glass-surface relative flex flex-col overflow-hidden rounded-[28px] p-7 md:p-9", className)}
      style={tint ? { backgroundImage: "linear-gradient(140deg, color-mix(in srgb, var(--a) 9%, transparent), transparent 55%)" } : undefined}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <p className={cn("flex items-center gap-2 text-sm font-medium", muted ? "text-muted" : "text-[color:var(--a)]")}>
      <span aria-hidden className={cn("h-2 w-2 rounded-full", muted ? "border-2 border-current" : "bg-current")} />
      {children}
    </p>
  );
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}
