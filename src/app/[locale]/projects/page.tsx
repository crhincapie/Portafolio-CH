import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsIndexGrid, type IndexProjectData } from "@/components/projects/ProjectIndexCards";
import { PROJECTS } from "@/content/projects";
import { pickLocale } from "@/content/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function ProjectsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");

  const toData = (
    p: (typeof PROJECTS)[number],
  ): IndexProjectData => ({
    slug: p.slug,
    title: pickLocale(locale, p.title),
    company: pickLocale(locale, p.company),
    summary: pickLocale(locale, p.summary),
    role: pickLocale(locale, p.role),
    year: p.year,
    tags: p.tags,
    featured: p.featured,
  });

  const projects = PROJECTS.map(toData);

  return (
    <div className="border-b border-line pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />

        <ProjectsIndexGrid
          projects={projects}
          labels={{ featured: t("featured"), viewCase: t("viewCase") }}
        />
      </div>
    </div>
  );
}