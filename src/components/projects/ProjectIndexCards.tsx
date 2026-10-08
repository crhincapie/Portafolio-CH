"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { AnimatedIllustration } from "@/components/projects/AnimatedIllustration";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Tilt } from "@/components/motion/Parallax";
import { StaggerReveal, staggerItem } from "@/components/ui/Reveal";
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
}

interface ProjectsIndexGridProps {
  projects: IndexProjectData[];
  labels: {
    featured: string;
    viewCase: string;
  };
}

// Cada proyecto recibe su propio "tinte" de borde y resplandor.
const ACCENTS: Record<string, string> = {
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

// Bento único con todos los casos: Logi'Ops como flagship a la
// izquierda (2 filas), los otros destacados a su derecha y el
// resto en filas de tres; cierra un projecto ancho.
const SPANS: Record<string, string> = {
  "logi-ops": "sm:col-span-2 lg:[grid-column:1/9] lg:[grid-row:1/3]",
  "balanc-funcional": "lg:[grid-column:9/13] lg:[grid-row:1/2]",
  "turismo-sostenible": "lg:[grid-column:9/13] lg:[grid-row:2/3]",
  agrocash: "lg:[grid-column:1/5] lg:[grid-row:3/4]",
  "bienestar-a-la-carta": "lg:[grid-column:5/9] lg:[grid-row:3/4]",
  "hola-vivienda": "lg:[grid-column:9/13] lg:[grid-row:3/4]",
  "un-asunto-de-dos": "lg:[grid-column:1/5] lg:[grid-row:4/5]",
  "avaluador-playground": "lg:[grid-column:5/9] lg:[grid-row:4/5]",
  "davivienda-e-learning": "lg:[grid-column:9/13] lg:[grid-row:4/5]",
  "publicacion-inmueble": "lg:[grid-column:1/13] lg:[grid-row:5/6]",
};

const DEFAULT_SPAN = "sm:col-span-2 lg:col-span-4";

function accent(slug: string): string {
  return ACCENTS[slug] ?? "#00feff";
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h10M10 4l5 5-5 5" />
    </svg>
  );
}

function ProjectIndexCard({
  data,
  labels,
  large = false,
  className,
}: {
  data: IndexProjectData;
  labels: ProjectsIndexGridProps["labels"];
  large?: boolean;
  className?: string;
}) {
  const color = accent(data.slug);

  return (
    <motion.div variants={staggerItem} className={cn("h-full", className)}>
      <Tilt max={5} className="h-full">
        <Link
          href={`/projects/${data.slug}`}
          className="group block h-full rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-[#00feff]/60"
        >
          <SpotlightCard
            spotlightColor={`${color}30`}
            className="relative h-full rounded-[26px] transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
          >
            {/* Borde de vidrio con tinte del proyecto */}
            <div
              className="relative h-full rounded-[26px] p-px"
              style={{
                background: `linear-gradient(160deg, ${color}78 0%, rgba(255,255,255,0.14) 42%, ${color}34 100%)`,
              }}
            >
              <div className="liquid-card relative h-full overflow-hidden rounded-[25px]">
                <AnimatedIllustration slug={data.slug} title={`${data.title} — fondo animado`} />

                {/* Velo de legibilidad */}
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/10 light:from-white light:via-white/65 light:to-transparent" />

                {/* Barrido especular tipo líquido al hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-30 -translate-x-[170%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[170%] light:via-white/45"
                />

                {data.featured && (
                  <span className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl light:border-white/60 light:bg-white/60 light:text-zinc-700">
                    {labels.featured}
                  </span>
                )}

                <div
                  className={cn(
                    "absolute inset-0 z-10 flex flex-col justify-end gap-2.5 p-6",
                    large && "lg:p-8",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="font-medium uppercase tracking-[0.25em]" style={{ color }}>
                      {data.role}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-zinc-500 light:bg-zinc-400" />
                    <span className="text-zinc-400 light:text-muted">{data.company}</span>
                    <span className="h-1 w-1 rounded-full bg-zinc-500 light:bg-zinc-400" />
                    <span className="text-zinc-400 light:text-muted">{data.year}</span>
                  </div>
                  <h2 className={cn("font-semibold tracking-tight text-white light:text-ink", large ? "text-2xl lg:text-3xl" : "text-xl md:text-2xl")}>
                    {data.title}
                  </h2>
                  <p className={cn("max-w-2xl text-sm leading-relaxed text-zinc-300 light:text-soft", large ? "line-clamp-3" : "line-clamp-2")}>
                    {data.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[10px] border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-zinc-300 light:border-zinc-900/10 light:bg-zinc-900/[0.04] light:text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 pt-2 text-sm font-semibold transition group-hover:gap-3">
                    <span className="text-white light:text-ink group-hover:text-[#00feff] light:group-hover:text-[#0e7490]">
                      {labels.viewCase}
                    </span>
                    <span
                      className="grid h-8 w-8 place-items-center rounded-[12px] border text-white transition group-hover:bg-[#00feff]/20 light:text-ink light:group-hover:bg-[#00feff]/25"
                      style={{ borderColor: `${color}55` }}
                    >
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </Link>
      </Tilt>
    </motion.div>
  );
}

export function ProjectsIndexGrid({ projects, labels }: ProjectsIndexGridProps) {
  return (
    <StaggerReveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
      {projects.map((project) => {
        const span = SPANS[project.slug] ?? DEFAULT_SPAN;
        const isLogi = project.slug === "logi-ops";
        return (
          <ProjectIndexCard
            key={project.slug}
            data={project}
            labels={labels}
            large={isLogi}
            className={cn(span, isLogi ? "min-h-[420px]" : "min-h-[300px]")}
          />
        );
      })}
    </StaggerReveal>
  );
}