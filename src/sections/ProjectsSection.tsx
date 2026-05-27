import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS, getFeaturedProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal, StaggerReveal } from "@/components/ui/Reveal";
import { AnimatedItem } from "@/components/ui/AnimatedItem";

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const featured = getFeaturedProjects();
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="proyectos" className="scroll-mt-28 border-b border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-14 px-4 md:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition hover:border-[#00feff]/60 hover:text-[#00feff]"
            >
              {t("viewAll")}
            </Link>
          </div>
        </Reveal>

        <StaggerReveal className="grid gap-6 lg:grid-cols-3">
          {featured.map((project) => (
            <AnimatedItem as="div">
              <ProjectCard project={project} locale={locale} t={t} featured={true} />
            </AnimatedItem>
          ))}
        </StaggerReveal>

        <Reveal delay={0.15}>
          <div className="space-y-6">
            <SectionHeading
              kicker={t("moreTitle")}
              title={t("moreHeadline")}
              description={t("moreSubtitle")}
              className="max-w-2xl"
            />
          </div>
        </Reveal>
        <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project) => (
            <AnimatedItem as="div">
              <ProjectCard project={project} locale={locale} t={t} featured={false} />
            </AnimatedItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
