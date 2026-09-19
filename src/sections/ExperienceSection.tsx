import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceItems } from "@/content/experience";
import { pickLocale } from "@/content/i18n";
import { Reveal, StaggerReveal } from "@/components/ui/Reveal";
import { AnimatedItem } from "@/components/ui/AnimatedItem";

export async function ExperienceSection() {
  const t = await getTranslations("experience");
  const locale = await getLocale();

  return (
    <section id="experiencia" className="glass-ambient scroll-mt-28 border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />
        </Reveal>

        <StaggerReveal className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {experienceItems.map((job) => (
            <AnimatedItem
              key={job.company.es}
              as="article"
              className="group transition duration-300 hover:scale-[1.02] motion-reduce:transition-none"
            >
              <div className="glass-surface glass-blur h-full rounded-3xl border border-line-strong p-6 transition-colors duration-300 group-hover:border-[#00feff]/70">
                <div className="relative space-y-3">
                  <p className="accent-chip text-xs font-semibold uppercase tracking-[0.3em]">
                    {pickLocale(locale, job.period)}
                  </p>
                  <h3 className="text-xl font-semibold text-ink">{pickLocale(locale, job.company)}</h3>
                  <p className="text-sm text-muted">{pickLocale(locale, job.role)}</p>
                  <p className="text-sm leading-relaxed text-soft">{pickLocale(locale, job.summary)}</p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
