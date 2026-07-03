import Image from "next/image";
import { ProjectCardClient } from "@/components/projects/ProjectCardClient";
import type { Project } from "@/content/types";
import { pickLocale } from "@/content/i18n";

interface ProjectCardProps {
  project: Project;
  locale: string;
  t: (key: string) => string;
  featured?: boolean;
}

export function ProjectCard({ project, locale, t, featured = false }: ProjectCardProps) {
  return (
    <ProjectCardClient project={project} featured={featured}>
      <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 transition hover:border-[#00feff]/50">
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
          <Image
            src={`/images/projects/${project.slug}.png`}
            alt={pickLocale(locale, project.title)}
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,254,255,0.45),transparent_55%)] opacity-80 transition group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-300">
            {project.year}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <p className="text-xs text-zinc-500">{pickLocale(locale, project.company)}</p>
          <h3 className="text-xl font-semibold text-white">{pickLocale(locale, project.title)}</h3>
          <p className="text-sm leading-relaxed text-zinc-400">{pickLocale(locale, project.summary)}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Botones */}
          <div className="flex flex-col gap-2 pt-4">
            {featured ? (
              <div className="flex gap-2 lg:flex-wrap">
                <button
                  data-case
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:border-[#00feff]/60 hover:text-[#00feff]"
                  title={t("viewCase")}
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Caso</span>
                </button>
                <button
                  data-prototype
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#00feff] px-6 py-3 text-sm font-medium text-zinc-950 shadow-[0_0_40px_rgba(0,254,255,0.25)] transition hover:bg-[#7afcff]"
                  title="Ver prototipo"
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Prototipo</span>
                </button>
                <button
                  data-details
                  className="flex-1 lg:basis-full rounded-full bg-[#00feff] px-6 py-3 text-sm font-medium text-zinc-950 shadow-[0_0_40px_rgba(0,254,255,0.25)] transition hover:bg-[#7afcff]"
                  title="Ver detalles del proyecto"
                >
                  Ver Detalles
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  data-prototype
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#00feff] px-6 py-3 text-sm font-medium text-zinc-950 shadow-[0_0_40px_rgba(0,254,255,0.25)] transition hover:bg-[#7afcff]"
                  title="Ver prototipo"
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Prototipo</span>
                </button>
                <button
                  data-details
                  className="flex-1 rounded-full bg-[#00feff] px-6 py-3 text-sm font-medium text-zinc-950 shadow-[0_0_40px_rgba(0,254,255,0.25)] transition hover:bg-[#7afcff]"
                  title="Ver detalles del proyecto"
                >
                  Ver Detalles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProjectCardClient>
  );
}
