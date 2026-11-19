"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface IndexProjectData {
  slug: string;
  title: string;
  company: string;
  summary: string;
  role: string;
  year: string;
  tags: string[];
  featured: boolean;
  image?: string;
  prototypeUrl?: string | null;
}

// Cada proyecto conserva su propio "tinte" de acento.
export const PROJECT_ACCENTS: Record<string, string> = {
  "logi-ops": "#00feff",
  "balanc-funcional": "#2dd4bf",
  "turismo-sostenible": "#34d399",
  agrocash: "#a3e635",
  "bienestar-a-la-carta": "#f472b6",
  "hola-vivienda": "#f59e0b",
  "un-asunto-de-dos": "#c084fc",
  "avaluador-playground": "#60a5fa",
  "davivienda-e-learning": "#818cf8",
  "publicacion-inmueble": "#fb923c",
};

export const accentOf = (slug: string) => PROJECT_ACCENTS[slug] ?? "#00feff";

const ease = [0.22, 1, 0.36, 1] as const;

function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/* ── Índice tipográfico con vista previa que sigue al cursor ─────── */

export function ProjectRows({
  projects,
  startIndex = 0,
  viewCaseLabel,
}: {
  projects: IndexProjectData[];
  startIndex?: number;
  viewCaseLabel: string;
}) {
  const reduced = !!useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 26 });
  const sy = useSpring(y, { stiffness: 200, damping: 26 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const active = hover !== null ? projects[hover] : null;

  return (
    <ul ref={listRef} className="relative border-t border-line" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
      {projects.map((p, i) => {
        const color = accentOf(p.slug);
        return (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/projects/${p.slug}`}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 outline-none transition-[padding] duration-500 md:grid-cols-[3.5rem_minmax(0,1.4fr)_minmax(0,1fr)_4rem_auto] md:gap-6 md:py-8 md:hover:pl-4 focus-visible:pl-4"
              aria-label={`${viewCaseLabel}: ${p.title}`}
            >
              {/* Miniatura (móvil) */}
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line md:hidden">
                {p.image && <Image src={p.image} alt="" fill sizes="56px" className="object-cover object-top" />}
              </span>
              <span className="hidden text-sm tabular-nums text-faint md:block">{String(startIndex + i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="block truncate text-[clamp(1.35rem,3vw,2.6rem)] font-semibold leading-tight tracking-[-0.035em] text-ink transition-colors duration-300 group-hover:text-[var(--row-accent)]" style={{ ["--row-accent" as string]: color }}>
                  {p.title}
                </span>
                <span className="mt-1 block truncate text-sm text-muted md:hidden">
                  {p.company} · {p.year}
                </span>
              </span>
              <span className="hidden truncate text-sm text-muted md:block">
                {p.company} — {p.role}
              </span>
              <span className="hidden text-sm tabular-nums text-muted md:block">{p.year}</span>
              <span
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-soft transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:text-zinc-950"
                style={{ ["--row-accent" as string]: color }}
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-[var(--row-accent)] transition-transform duration-300 group-hover:scale-100" />
                <Arrow className="relative h-4 w-4" />
              </span>
            </Link>
          </li>
        );
      })}

      {/* Vista previa flotante (escritorio) */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {active?.image && (
              <motion.div
                key={active.slug}
                className="relative -translate-y-1/2 translate-x-10 overflow-hidden rounded-2xl border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
                style={{ width: 340, height: 230, boxShadow: `0 30px 80px -30px ${accentOf(active.slug)}66` }}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.45, ease } }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <Image src={active.image} alt="" fill sizes="340px" className="object-cover object-top" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </ul>
  );
}

/* ── Galería (vista alternativa del índice) ─────────────────────── */

function GalleryCard({ p, index, viewCaseLabel }: { p: IndexProjectData; index: number; viewCaseLabel: string }) {
  const color = accentOf(p.slug);
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-[#00feff]/60 rounded-[28px]"
      aria-label={`${viewCaseLabel}: ${p.title}`}
    >
      <div className="glass-surface relative overflow-hidden rounded-[28px] p-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-zinc-900">
          {p.image && (
            <Image
              src={p.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover object-top transition-[transform,object-position] duration-[2500ms] ease-out group-hover:scale-[1.03] group-hover:object-bottom"
            />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-zinc-950/70 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-end justify-between gap-4 px-3 pb-3 pt-4">
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-medium" style={{ color }}>
              {p.company} · {p.year}
            </p>
            <h3 className="truncate text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
            <p className="line-clamp-2 text-sm text-muted">{p.summary}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-soft transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#00feff] group-hover:text-zinc-950">
            <Arrow className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

interface ProjectsIndexGridProps {
  projects: IndexProjectData[];
  labels: {
    featured: string;
    all: string;
    viewCase: string;
    list: string;
    gallery: string;
    filterLabel: string;
    viewLabel: string;
  };
}

export function ProjectsIndexGrid({ projects, labels }: ProjectsIndexGridProps) {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [view, setView] = useState<"list" | "gallery">("gallery");
  const list = filter === "featured" ? projects.filter((p) => p.featured) : projects;

  const seg = (on: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
      on ? "bg-[#00feff] text-zinc-950" : "text-muted hover:text-ink",
    );

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={labels.filterLabel} className="glass-surface flex rounded-full p-1">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={seg(filter === "all")}>
            {labels.all} <span className="tabular-nums opacity-60">{projects.length}</span>
          </button>
          <button type="button" aria-pressed={filter === "featured"} onClick={() => setFilter("featured")} className={seg(filter === "featured")}>
            {labels.featured} <span className="tabular-nums opacity-60">{projects.filter((p) => p.featured).length}</span>
          </button>
        </div>
        <div role="group" aria-label={labels.viewLabel} className="glass-surface flex rounded-full p-1">
          <button type="button" aria-pressed={view === "gallery"} onClick={() => setView("gallery")} className={seg(view === "gallery")}>
            {labels.gallery}
          </button>
          <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")} className={seg(view === "list")}>
            {labels.list}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${view}-${filter}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
        >
          {view === "list" ? (
            <ProjectRows projects={list} viewCaseLabel={labels.viewCase} />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {list.map((p, i) => (
                <GalleryCard key={p.slug} p={p} index={i} viewCaseLabel={labels.viewCase} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
