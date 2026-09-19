import { ProjectCardClient } from "@/components/projects/ProjectCardClient";
import { AnimatedIllustration } from "@/components/projects/AnimatedIllustration";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Project } from "@/content/types";
import { pickLocale } from "@/content/i18n";
import { cn } from "@/lib/utils";

export type BentoVariant = "flagship" | "featured" | "secondary";

interface BentoProjectCardProps {
  project: Project;
  locale: string;
  t: (key: string) => string;
  variant?: BentoVariant;
  className?: string;
}

function BrowserChrome() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-7 items-center gap-1.5 bg-zinc-800/80 px-3 backdrop-blur-sm light:bg-white/85 light:backdrop-blur-md">
      <span className="h-2 w-2 rounded-full bg-red-500/80" />
      <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
      <span className="h-2 w-2 rounded-full bg-green-500/80" />
      <span className="ml-2 h-3 flex-1 max-w-[40%] rounded bg-zinc-700/50 light:bg-zinc-300/60" />
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300 light:border-zinc-900/10 light:bg-zinc-900/[0.04] light:text-zinc-600"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

interface CardActionsProps {
  featured: boolean;
  t: (key: string) => string;
}

function CardActions({ featured, t }: CardActionsProps) {
  const outlineBtn =
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:border-[#00feff]/60 hover:text-[#00feff] light:border-zinc-900/20 light:text-ink light:hover:border-[#0e7490]/70 light:hover:text-[#0e7490]";
  const solidBtn =
    "inline-flex items-center justify-center gap-2 rounded-full bg-[#00feff] px-6 py-3 text-sm font-medium text-zinc-950 shadow-[0_0_40px_rgba(0,254,255,0.25)] transition hover:bg-[#7afcff] light:shadow-[0_6px_24px_rgba(13,148,136,0.25)]";

  if (featured) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
        <button data-case className={cn(outlineBtn, "flex-1")} title={t("viewCase")}>
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{t("case")}</span>
        </button>
        <button data-prototype className={cn(solidBtn, "flex-1")} title={t("prototypeTitle")}>
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{t("prototype")}</span>
        </button>
        <button data-details className={cn(solidBtn, "flex-1 lg:basis-full")} title={t("viewDetailsTitle")}>
          {t("viewDetails")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button data-prototype className={cn(solidBtn, "flex-1")} title={t("prototypeTitle")}>
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{t("prototype")}</span>
      </button>
      <button data-details className={cn(solidBtn, "flex-1")} title={t("viewDetailsTitle")}>
        {t("viewDetails")}
      </button>
    </div>
  );
}

export function BentoProjectCard({
  project,
  locale,
  t,
  variant = "secondary",
  className,
}: BentoProjectCardProps) {
  const compact = variant !== "flagship";

  return (
    <SpotlightCard
      className={cn(
        "glass-surface glass-blur group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-white/15 transition hover:border-[#00feff]/80 hover:shadow-[0_0_60px_rgba(0,254,255,0.22)] light:border-zinc-400/50 light:hover:shadow-[0_18px_50px_rgba(13,148,136,0.16)]",
        compact ? "min-h-[340px]" : "min-h-[460px]",
        className,
      )}
    >
      <AnimatedIllustration
        slug={project.slug}
        title={pickLocale(locale, project.title)}
      />

      <BrowserChrome />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,254,255,0.45),transparent_55%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100 light:bg-[radial-gradient(circle_at_20%_0%,rgba(13,148,136,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20 light:from-white light:via-white/80 light:to-transparent" />

      <ProjectCardClient project={project} featured={project.featured} className="relative z-10 h-full">
        <div className="flex h-full flex-col justify-end gap-3 p-6 md:p-7">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 light:text-muted">{pickLocale(locale, project.company)}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600 light:bg-zinc-400" />
            <span className="font-medium uppercase tracking-[0.25em] text-[#00feff]/80 light:text-[#0e7490]">{project.year}</span>
          </div>
          <h3
            className={cn(
              "font-semibold tracking-tight text-white light:text-ink",
              compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl",
            )}
          >
            {pickLocale(locale, project.title)}
          </h3>
          <p
            className={cn(
              "max-w-2xl text-sm leading-relaxed text-zinc-300 light:text-soft",
              compact ? "line-clamp-2" : "line-clamp-3",
            )}
          >
            {pickLocale(locale, project.summary)}
          </p>
          <Tags tags={project.tags} />
          <div className="pt-1">
            <CardActions featured={project.featured} t={t} />
          </div>
        </div>
      </ProjectCardClient>
    </SpotlightCard>
  );
}
