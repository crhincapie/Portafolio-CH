import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/content/projects";
import { BentoProjectCard, type BentoVariant } from "@/components/projects/BentoProjectCard";
import { Reveal, StaggerReveal } from "@/components/ui/Reveal";
import { AnimatedItem } from "@/components/ui/AnimatedItem";
import { cn } from "@/lib/utils";

const BENTO_LAYOUT: Record<string, { span: string; variant: BentoVariant }> = {
  "balanc-funcional": { span: "sm:col-span-2 lg:col-span-7 lg:row-span-2", variant: "flagship" },
  "turismo-sostenible": { span: "lg:col-span-5", variant: "featured" },
  agrocash: { span: "lg:col-span-5", variant: "featured" },
  "bienestar-a-la-carta": { span: "lg:col-span-8", variant: "secondary" },
  "avaluador-playground": { span: "lg:col-span-8", variant: "secondary" },
  "publicacion-inmueble": { span: "lg:col-span-8", variant: "secondary" },
};

const DEFAULT_LAYOUT = { span: "lg:col-span-4", variant: "secondary" as BentoVariant };

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const locale = await getLocale();

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
