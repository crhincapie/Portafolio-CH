import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsIndexGrid, type IndexProjectData } from "@/components/projects/ProjectIndexCards";
import { PROJECTS } from "@/content/projects";
import { pickLocale } from "@/content/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function ProjectsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");

  const toData = (p: (typeof PROJECTS)[number]): IndexProjectData => ({
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
  });

  const projects = PROJECTS.map(toData);

  return (
    <div className="glass-ambient border-b border-line pb-24 pt-14 md:pb-32 md:pt-20">
      <div className="mx-auto max-w-6xl space-y-14 px-4 md:px-6">
        <header className="space-y-5">
          <p className="accent-chip text-xs font-semibold uppercase tracking-[0.35em]">{t("kicker")}</p>
          <h1 className="text-balance text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink">{t("title")}</h1>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">{t("subtitle")}</p>
        </header>

        <ProjectsIndexGrid
          projects={projects}
          labels={{
            featured: t("featured"),
            all: t("all"),
            viewCase: t("viewCase"),
            list: t("list"),
            gallery: t("gallery"),
            filterLabel: t("filterLabel"),
            viewLabel: t("viewLabel"),
          }}
        />
      </div>
    </div>
  );
}
