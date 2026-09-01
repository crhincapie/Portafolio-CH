import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { GalleryCarousel } from "@/components/case-study/GalleryCarousel";
import { PrototypeLinkButton } from "@/components/case-study/PrototypeLinkButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { pickLocale } from "@/content/i18n";
import { getProjectBySlug } from "@/content/projects";
import { buildCreativeWorkJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

type Props = { slug: string };

type Theme = {
  accent: string; // hex
  soft: string; // tailwind bg for glow
  glow: string; // boxShadow hue
  grad: string; // bg-gradient class for underline
  ring: string;
};

const THEMES: Record<string, Theme> = {
  "balanc-funcional": {
    accent: "#7dffd9",
    soft: "bg-emerald-400/20",
    glow: "rgba(107,255,191,0.18)",
    grad: "from-emerald-400 via-cyan-400 to-emerald-500",
    ring: "border-emerald-400/30",
  },
  "turismo-sostenible": {
    accent: "#55e6a5",
    soft: "bg-emerald-400/20",
    glow: "rgba(85,230,165,0.18)",
    grad: "from-emerald-400 via-teal-400 to-green-500",
    ring: "border-emerald-400/30",
  },
  agrocash: {
    accent: "#ffb547",
    soft: "bg-amber-400/20",
    glow: "rgba(255,181,71,0.18)",
    grad: "from-amber-400 via-orange-400 to-amber-600",
    ring: "border-amber-400/30",
  },
  "bienestar-a-la-carta": {
    accent: "#ff7da5",
    soft: "bg-rose-400/20",
    glow: "rgba(255,125,165,0.18)",
    grad: "from-rose-400 via-pink-400 to-rose-500",
    ring: "border-rose-400/30",
  },
  "hola-vivienda": {
    accent: "#6ec1ff",
    soft: "bg-sky-400/20",
    glow: "rgba(110,193,255,0.18)",
    grad: "from-sky-400 via-blue-400 to-sky-600",
    ring: "border-sky-400/30",
  },
  "un-asunto-de-dos": {
    accent: "#c39bff",
    soft: "bg-violet-400/20",
    glow: "rgba(195,155,255,0.18)",
    grad: "from-violet-400 via-purple-400 to-violet-600",
    ring: "border-violet-400/30",
  },
  "avaluador-playground": {
    accent: "#ff9f6e",
    soft: "bg-orange-400/20",
    glow: "rgba(255,159,110,0.18)",
    grad: "from-orange-400 via-amber-400 to-orange-600",
    ring: "border-orange-400/30",
  },
  "davivienda-e-learning": {
    accent: "#5eead4",
    soft: "bg-teal-400/20",
    glow: "rgba(94,234,212,0.18)",
    grad: "from-teal-400 via-cyan-400 to-teal-600",
    ring: "border-teal-400/30",
  },
  "publicacion-inmueble": {
    accent: "#84ccff",
    soft: "bg-blue-400/20",
    glow: "rgba(132,204,255,0.18)",
    grad: "from-blue-400 via-cyan-400 to-blue-600",
    ring: "border-blue-400/30",
  },
};

const STEPS: { key: string; source: "research" | "uxProcess" | "wireframes" | "results" }[] = [
  { key: "stepResearch", source: "research" },
  { key: "stepMap", source: "uxProcess" },
  { key: "stepPrototype", source: "wireframes" },
  { key: "stepValidate", source: "results" },
];

export async function CaseStudyView({ slug }: Props) {
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("caseStudy");
  const locale = await getLocale();
  const cs = project.caseStudy;

  const theme = THEMES[slug] ?? THEMES["balanc-funcional"];

  const figma = project.figmaUrl ?? cs.figmaUrl;
  const prototype = project.prototypeUrl ?? cs.prototypeUrl;
  const gallery = project.gallery ?? [];

  const path = locale === "es" ? `/projects/${project.slug}` : `/en/projects/${project.slug}`;
  const url = `${siteConfig.url.replace(/\/$/, "")}${path}`;

  const creativeLd = buildCreativeWorkJsonLd({
    locale,
    name: pickLocale(locale, project.title),
    description: pickLocale(locale, project.summary),
    url,
    datePublished: `${project.year}-01-01`,
  });

  const heroImage = project.heroImage ?? (gallery[0] ?? `/images/projects/${project.slug}/home.webp`);
  const displayGallery = gallery.length > 1 ? gallery : gallery;
  const screens = new Set(gallery).size;
  const processSteps = STEPS.length;

  const label = (key: string) => t(`label_${key}` as Parameters<typeof t>[0]);

  return (
    <article className="border-b border-white/5 pb-20 pt-8 md:pb-28 md:pt-12">
      <JsonLd data={[creativeLd]} />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* ————— HERO BANNER ————— */}
        <section
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black"
          style={{ boxShadow: `0 0 120px ${theme.glow}` }}
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: theme.accent, opacity: 0.18 }}
          />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:items-end md:p-12 lg:p-16">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em]"
                  style={{ borderColor: theme.accent + "55", backgroundColor: theme.accent + "14", color: theme.accent }}
                >
                  {pickLocale(locale, project.company)}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                  {project.year}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
                  {pickLocale(locale, project.role)}
                </span>
              </div>

              <h1 className="max-w-3xl text-balance text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                {pickLocale(locale, project.title)}
              </h1>

              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-zinc-300 md:text-xl">
                {pickLocale(locale, project.summary)}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <div className="grid w-full grid-cols-3 gap-3 md:w-auto md:min-w-[240px]">
                <HeroStat value={project.year} label={label("heroYear")} accent={theme.accent} />
                <HeroStat value={cs.tools.length.toString()} label={label("heroTools")} accent={theme.accent} />
                <HeroStat value={screens.toString()} label={label("heroScreens")} accent={theme.accent} />
              </div>

              <div className="flex w-full flex-col gap-2 md:items-end">
                {prototype ? (
                  <PrototypeLinkButton label={t("openPrototype")} url={prototype} aspectRatio={project.prototypeAspect} zoom={project.prototypeZoom} />
                ) : null}
                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#00feff]/60 hover:text-[#00feff] md:w-auto"
                >
                  ← {t("back")}
                </Link>
              </div>
            </div>
          </div>

          <div className={cn("relative h-2 w-full bg-gradient-to-r", theme.grad)} />
        </section>

        {/* ————— HERO IMAGE ————— */}
        <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src={heroImage}
            alt={pickLocale(locale, project.title)}
            width={1600}
            height={900}
            sizes="100vw"
            quality={90}
            className="aspect-[21/10] w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-3 p-6">
            <p className="max-w-md text-sm text-zinc-300">{pickLocale(locale, cs.context)}</p>
            <span
              className="rounded-full bg-black/50 px-4 py-1.5 text-xs uppercase tracking-widest backdrop-blur"
              style={{ color: theme.accent }}
            >
              {label("heroHow")}
            </span>
          </div>
        </div>

        {/* ————— PROBLEM + ROLE BENTO ————— */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Problem */}
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-500/15 via-zinc-950 to-zinc-950 p-8 lg:col-span-7 lg:p-10"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-rose-500/20 blur-3xl" />
            <Label accent>{label("problem")}</Label>
            <p className="mt-5 text-pretty text-2xl font-semibold leading-snug text-white md:text-3xl">
              {pickLocale(locale, cs.problem)}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <MiniFact num="01" text={pickLocale(locale, project.role)} />
              <MiniFact num="02" text={project.year} />
              <MiniFact num="03" text={pickLocale(locale, project.company)} />
            </div>
          </div>

          {/* Role + tools */}
          <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-zinc-950/60 p-8 lg:col-span-5">
            <div className="space-y-4">
              <Label accent>{label("role")}</Label>
              <p className="text-3xl font-bold tracking-tight text-white">{pickLocale(locale, project.role)}</p>
              <p className="text-sm text-zinc-400">
                {pickLocale(locale, project.company)} · {project.year}
              </p>
            </div>
            <div className="min-h-px flex-1 border-t border-white/10" />
            <div>
              <Label>{label("tools")}</Label>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cs.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label>{label("tech")}</Label>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cs.techStack.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border px-3 py-1.5 text-sm"
                    style={{ borderColor: theme.accent + "33", backgroundColor: theme.accent + "0d", color: theme.accent }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Goals */}
          <div className="rounded-[2rem] border border-white/10 bg-zinc-950/60 p-8 lg:col-span-5">
            <Label accent index="01">
              {label("goals")}
            </Label>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-300">
              {pickLocale(locale, cs.goals)}
            </p>
          </div>

          {/* Research */}
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-600/15 via-zinc-950 to-zinc-950 p-8 lg:col-span-7 lg:p-10"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
            <Label accent index="02" iconColor="text-indigo-400">
              {label("research")}
            </Label>
            <p className="mt-4 max-w-2xl text-pretty text-xl leading-relaxed text-zinc-200 md:text-2xl">
              {pickLocale(locale, cs.research)}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ————— PROCESS ————— */}
        <section className="mt-6 rounded-[2rem] border border-white/10 bg-zinc-950/60 p-8 md:p-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <Label accent index="03">
                {label("process")}
              </Label>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">{label("processTitle")}</h3>
            </div>
            <span className="hidden text-6xl font-black text-zinc-800 md:block">{project.year}</span>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b to-zinc-950 p-6",
                  i === 0 ? "from-emerald-500/25" : i === 1 ? "from-cyan-500/25" : i === 2 ? "from-fuchsia-500/25" : "from-violet-500/25",
                )}
              >
                <span className="text-5xl font-black text-white/10">0{i + 1}</span>
                <p className="mt-4 text-lg font-semibold text-white">{label(s.key)}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{pickLocale(locale, cs[s.source])}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ————— DESIGN CHUNK ————— */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Wireframes + image */}
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/60 lg:col-span-4">
            <div className="p-7">
              <Label accent index="04" iconColor="text-fuchsia-400">
                {label("wireframes")}
              </Label>
              <p className="mt-3 text-pretty leading-relaxed text-zinc-300">{pickLocale(locale, cs.wireframes)}</p>
            </div>
            {displayGallery[0] ? (
              <Image
                src={displayGallery[0]}
                alt={label("wireframes")}
                width={1200}
                height={800}
                className="h-56 w-full object-cover object-top"
              />
            ) : null}
          </div>

          {/* UI exploration + image */}
          <div
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br via-zinc-950 to-zinc-950 lg:col-span-8"
            style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent}14, #09090b 55%)` }}
          >
            <div className="grid gap-6 p-7 md:grid-cols-2 md:p-9">
              <div>
                <Label accent index="05" iconColor="text-[#00feff]">
                  {label("uiExploration")}
                </Label>
                <p className="mt-3 text-pretty text-lg leading-relaxed text-zinc-200 md:text-xl">
                  {pickLocale(locale, cs.uiExploration)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((p, i) => (
                    <span key={i} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: theme.accent + "40", backgroundColor: theme.accent + "0d", color: theme.accent }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              {displayGallery[1] ? (
                <Image
                  src={displayGallery[1]}
                  alt={label("uiExploration")}
                  width={1200}
                  height={800}
                  className="w-full rounded-2xl border border-white/10 object-cover object-top"
                />
              ) : null}
            </div>
          </div>

          {/* Design system */}
          <div className="rounded-[2rem] border border-white/10 bg-zinc-950/60 p-8 lg:col-span-7">
            <Label accent index="06">
              {label("designSystem")}
            </Label>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-200 md:text-xl">
              {pickLocale(locale, cs.designSystem)}
            </p>
            <div className="mt-6 grid grid-cols-4 gap-3">
              <ColorSwatch c={theme.accent} label="Accent" />
              <ColorSwatch c="#ffffff" label="Base" />
              <ColorSwatch c="#3f3f46" label="Surface" />
              <ColorSwatch c="#fbbf24" label="Alert" />
            </div>
          </div>

          {/* Decisions */}
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-500/15 via-zinc-950 to-zinc-950 p-8 lg:col-span-5"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-1/3 translate-x-1/3 rounded-full bg-emerald-400/20 blur-3xl" />
            <Label accent icon="◎" iconColor="text-emerald-400">
              {label("decisions")}
            </Label>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-200">{pickLocale(locale, cs.decisions)}</p>
          </div>
        </section>

        {/* ————— RESULTS ————— */}
        <section
          className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 md:p-12"
          style={{ boxShadow: `0 0 100px ${theme.glow}` }}
        >
          <div
            className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl"
            style={{ backgroundColor: theme.accent, opacity: 0.14 }}
          />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Label accent icon="→" iconColor="text-[#00feff]">
                {label("results")}
              </Label>
              <p className="mt-4 max-w-xl text-pretty text-2xl font-semibold leading-snug text-white md:text-3xl">
                {pickLocale(locale, cs.results)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {cs.metrics?.length ? (
                  cs.metrics.map((m, i) => (
                    <span key={i} className="rounded-2xl border px-5 py-3 text-sm" style={{ borderColor: theme.accent + "40", backgroundColor: theme.accent + "0d", color: theme.accent }}>
                      {pickLocale(locale, m)}
                    </span>
                  ))
                ) : (
                  <span className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-300">
                    {cs.techStack.slice(0, 1).join(", ")}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <BigNumber value={screens.toString()} label={label("metricScreens")} accent={theme.accent} />
              <BigNumber value={cs.tools.length.toString()} label={label("metricTools")} accent={theme.accent} />
              <BigNumber value={processSteps.toString()} label={label("metricSteps")} accent={theme.accent} />
            </div>
          </div>
        </section>

        {/* ————— LEARNINGS ————— */}
        <section className="mt-6 rounded-[2rem] border border-white/10 bg-zinc-950/60 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <Label accent icon="§" iconColor="text-amber-400">
                {label("learnings")}
              </Label>
            </div>
            <div>
              <p className="text-pretty text-xl font-medium leading-relaxed text-white md:text-2xl">
                “{pickLocale(locale, cs.learnings)}”
              </p>
            </div>
          </div>
        </section>

        {/* ————— GALLERY CAROUSEL ————— */}
        {gallery.length > 1 ? (
          <section className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{t("gallery")}</h3>
              <span className="text-sm text-zinc-500">{gallery.length} {label("galleryCount")}</span>
            </div>
            <GalleryCarousel
              images={gallery}
              title={pickLocale(locale, project.title)}
              variant={project.galleryVariant}
            />
          </section>
        ) : null}
      </div>
    </article>
  );
}

/* ————— presentational helpers ————— */

function HeroStat({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center backdrop-blur">
      <div className="text-3xl font-black tracking-tight" style={{ color: accent }}>
        {value}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-zinc-400">{label}</div>
    </div>
  );
}

function MiniFact({ num, text }: { num: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-lg font-black text-rose-300">{num}</div>
      <div className="mt-1 text-xs text-zinc-300">{text}</div>
    </div>
  );
}

function BigNumber({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-5 text-center backdrop-blur">
      <div
        className="bg-clip-text text-5xl font-black text-transparent md:text-6xl"
        style={{ backgroundImage: `linear-gradient(135deg, ${accent}, #818cf8)` }}
      >
        {value}
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-zinc-400">{label}</div>
    </div>
  );
}

function ColorSwatch({ c, label }: { c: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-14 w-14 rounded-2xl border border-white/20" style={{ backgroundColor: c }} />
      <span className="text-[11px] text-zinc-400">{label}</span>
    </div>
  );
}

function Label({
  children,
  accent,
  icon,
  index,
  iconColor = "text-[#00feff]",
}: {
  children: string;
  accent?: boolean;
  icon?: string;
  index?: string;
  iconColor?: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
      {accent ? (
        <span
          className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-bold"
          style={{ color: iconColor }}
        >
          {icon ?? "●"}
        </span>
      ) : null}
      <span className="text-zinc-400">{children}</span>
      {index ? <span className="ml-1 text-zinc-600">{index}</span> : null}
      <span className={cn("h-px flex-1", accent ? "bg-white/15" : "bg-white/10")} />
    </div>
  );
}
