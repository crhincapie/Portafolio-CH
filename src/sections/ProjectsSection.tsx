import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/content/projects";
import { BentoProjectCard, type BentoVariant } from "@/components/projects/BentoProjectCard";
import { Reveal, StaggerReveal } from "@/components/ui/Reveal";
import { AnimatedItem } from "@/components/ui/AnimatedItem";
import { cn } from "@/lib/utils";

const BENTO_LAYOUT: Record<string, { span: string; variant: BentoVariant }> = {
  "logi-ops": { span: "sm:col-span-2 lg:[grid-column:1/8] lg:[grid-row:1/3]", variant: "flagship" },
  "turismo-sostenible": { span: "lg:[grid-column:8/13] lg:[grid-row:1/2]", variant: "featured" },
  agrocash: { span: "lg:[grid-column:8/13] lg:[grid-row:2/3]", variant: "featured" },
  "balanc-funcional": { span: "sm:col-span-2 lg:[grid-column:1/8] lg:[grid-row:3/5]", variant: "flagship" },
  "bienestar-a-la-carta": { span: "lg:[grid-column:8/13] lg:[grid-row:3/4]", variant: "featured" },
  "hola-vivienda": { span: "lg:[grid-column:8/13] lg:[grid-row:4/5]", variant: "featured" },
  "un-asunto-de-dos": { span: "lg:[grid-column:1/5] lg:[grid-row:5/6]", variant: "secondary" },
  "avaluador-playground": { span: "lg:[grid-column:5/13] lg:[grid-row:5/6]", variant: "secondary" },
  "davivienda-e-learning": { span: "lg:[grid-column:1/5] lg:[grid-row:6/7]", variant: "secondary" },
  "publicacion-inmueble": { span: "lg:[grid-column:5/13] lg:[grid-row:6/7]", variant: "secondary" },
};

const DEFAULT_LAYOUT = { span: "lg:col-span-4", variant: "secondary" as BentoVariant };

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const locale = await getLocale();

  return (
    <section id="proyectos" className="glass-ambient scroll-mt-28 border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-14 px-4 md:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-line-strong px-5 py-2 text-sm font-medium text-ink transition hover:border-accent-strong hover:text-accent-text"
            >
              {t("viewAll")}
            </Link>
          </div>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {PROJECTS.map((project) => {
            const layout = BENTO_LAYOUT[project.slug] ?? DEFAULT_LAYOUT;
            return (
              <AnimatedItem key={project.slug} as="div" className={cn("h-full", layout.span)}>
                <BentoProjectCard
                  project={project}
                  locale={locale}
                  t={t}
                  variant={layout.variant}
                  className="h-full"
                />
              </AnimatedItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
