"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PROJECTS } from "@/content/projects";
import { pickLocale } from "@/content/i18n";
import { ProjectRows, accentOf, type IndexProjectData } from "@/components/projects/ProjectIndexCards";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   PROYECTOS · "El mazo de casos"
   Los casos destacados se apilan como un mazo: cada uno sube y
   cubre al anterior, que se aleja. Las capturas reales se
   recorren al pasar el cursor, como si navegaras el producto.
   El resto de casos vive en un índice tipográfico con vista
   previa que sigue al cursor.
   ───────────────────────────────────────────────────────────── */

type Card = IndexProjectData & { metric?: string };

function useIsDesktop() {
  const [desk, setDesk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setDesk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desk;
}

function DeckCard({
  p,
  i,
  total,
  progress,
  labels,
}: {
  p: Card;
  i: number;
  total: number;
  progress: MotionValue<number>;
  labels: { viewCase: string; prototype: string };
}) {
  const reduced = !!useReducedMotion();
  const desktop = useIsDesktop();
  const animate = desktop && !reduced;
  const color = accentOf(p.slug);
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i - 1) * 0.045]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, i === total - 1 ? 0 : 0.55]);

  return (
    <div
      className="relative mb-5 md:sticky md:top-[96px] md:mb-0 md:flex md:h-[calc(100svh-120px)] md:max-h-[720px] md:min-h-[560px] md:items-start md:pt-[var(--deck-offset)]"
      style={{ ["--deck-offset" as string]: `${i * 14}px` }}
    >
      <motion.article
        style={animate ? { scale, transformOrigin: "50% 0%" } : undefined}
        className="group relative grid w-full md:h-full overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950 text-zinc-100 shadow-[0_-30px_80px_-40px_rgba(0,0,0,0.8)] light:border-zinc-900/10 light:bg-white light:text-zinc-900 md:grid-cols-[0.92fr_1.08fr]"
      >
        {/* halo del proyecto */}
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-40 blur-3xl" style={{ background: color }} />

        <div className="relative z-10 flex flex-col gap-5 p-7 md:p-10">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="tabular-nums" style={{ color }}>
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="text-zinc-400 light:text-zinc-500">
              {p.company} · {p.year}
            </span>
          </div>
          <h3 className="mt-auto text-balance text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">{p.title}</h3>
          <p className="text-sm font-medium text-zinc-300 light:text-zinc-600">{p.role}</p>
          <p className="max-w-md text-pretty text-[15px] leading-relaxed text-zinc-400 light:text-zinc-600">{p.summary}</p>
          {p.metric && (
            <p className="flex max-w-md gap-2.5 text-sm leading-snug text-zinc-300 light:text-zinc-700">
              <span aria-hidden className="mt-[0.4em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
              {p.metric}
            </p>
          )}
          <ul className="flex flex-wrap gap-1.5">
            {p.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-white/12 px-2.5 py-1 text-[11px] text-zinc-400 light:border-zinc-900/12 light:text-zinc-600">
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <Link
              href={`/projects/${p.slug}`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:brightness-110"
              style={{ background: color }}
            >
              {labels.viewCase}
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            {p.prototypeUrl && (
              <a
                href={p.prototypeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition hover:border-white/40 light:border-zinc-900/15 light:hover:border-zinc-900/40"
              >
                {labels.prototype}
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </a>
            )}
          </div>
        </div>

        {/* Captura real en un marco de navegador: se recorre al pasar el cursor */}
        <Link
          href={`/projects/${p.slug}`}
          tabIndex={-1}
          aria-hidden
          className="relative hidden overflow-hidden md:block"
        >
          <div className="absolute inset-y-[8%] left-0 right-[-6%] overflow-hidden rounded-l-2xl border border-white/10 bg-zinc-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:-translate-x-[3%] light:border-zinc-900/10">
            <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-zinc-900/90 px-3">
              {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c) => (
                <span key={c} className={cn("h-2 w-2 rounded-full", c)} />
              ))}
              <span className="ml-3 h-4 flex-1 rounded-full bg-white/5" />
            </div>
            <div className="relative h-[calc(100%-2rem)]">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 1280px) 55vw, 680px"
                  className="object-cover object-top transition-[object-position] duration-[5000ms] ease-in-out group-hover:object-bottom"
                />
              )}
            </div>
          </div>
        </Link>
        {/* móvil: imagen arriba */}
        {p.image && (
          <div className="relative order-first h-44 overflow-hidden md:hidden">
            <Image src={p.image} alt={p.title} fill sizes="100vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent light:from-white" />
          </div>
        )}
        {/* velo al quedar atrás */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-black" style={{ opacity: animate ? dim : 0 }} />
      </motion.article>
    </div>
  );
}

export function ProjectsSection() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ["start start", "end end"] });

  const toData = (p: (typeof PROJECTS)[number]): Card => ({
    slug: p.slug,
    title: pickLocale(locale, p.title),
    company: pickLocale(locale, p.company),
    summary: pickLocale(locale, p.summary),
    role: pickLocale(locale, p.role),
    year: p.year,
    tags: p.tags,
    featured: p.featured,
    image: p.heroImage ?? p.gallery?.[0],
    prototypeUrl: p.prototypeUrl,
    metric: p.caseStudy.metrics?.[0] ? pickLocale(locale, p.caseStudy.metrics[0]) : undefined,
  });

  const featured = PROJECTS.filter((p) => p.featured).map(toData);
  const others = PROJECTS.filter((p) => !p.featured).map(toData);

  const viewAll = (
    <Link
      href="/projects"
      className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink transition hover:border-[#00feff]/60 hover:text-accent-text light:hover:text-[#0e7490]"
    >
      {t("viewAll")}
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00feff] text-zinc-950 transition-transform group-hover:rotate-45">
        <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
      </span>
    </Link>
  );

  return (
    <section id="proyectos" className="glass-ambient scroll-mt-28 border-b border-line py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="accent-chip text-xs font-semibold uppercase tracking-[0.35em]">{t("kicker")}</p>
            <h2 className="text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">{t("title")}</h2>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">{t("subtitle")}</p>
          </div>
          {viewAll}
        </div>

        <div ref={deckRef} className="relative">
          {featured.map((p, i) => (
            <DeckCard
              key={p.slug}
              p={p}
              i={i}
              total={featured.length}
              progress={scrollYProgress}
              labels={{ viewCase: t("viewCase"), prototype: t("prototype") }}
            />
          ))}
        </div>

        <div className="mt-24 space-y-10 md:mt-32">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-faint">{t("moreTitle")}</p>
              <h3 className="text-[clamp(1.8rem,3.6vw,3rem)] font-semibold tracking-[-0.04em] text-ink">{t("moreHeadline")}</h3>
              <p className="max-w-xl text-pretty text-muted">{t("moreSubtitle")}</p>
            </div>
          </div>
          <ProjectRows projects={others} startIndex={featured.length} viewCaseLabel={t("viewCase")} />
          <div className="flex justify-center pt-4">{viewAll}</div>
        </div>
      </div>
    </section>
  );
}
