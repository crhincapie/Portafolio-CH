import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceItems } from "@/content/experience";
import { pickLocale } from "@/content/i18n";

export async function ExperienceSection() {
  const t = await getTranslations("experience");
  const locale = await getLocale();

  return (
    <section id="experiencia" className="scroll-mt-28 border-b border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />

        <div className="grid gap-6 md:grid-cols-3">
          {experienceItems.map((job) => (
            <article
              key={job.company.es}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-zinc-950 p-6 transition hover:border-[#00feff]/40"
            >
              <div className="absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-40 bg-[radial-gradient(circle_at_top,rgba(0,254,255,0.35),transparent_60%)]" />
              <div className="relative space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00feff]/90">
                  {pickLocale(locale, job.period)}
                </p>
                <h3 className="text-xl font-semibold text-white">{pickLocale(locale, job.company)}</h3>
                <p className="text-sm text-zinc-400">{pickLocale(locale, job.role)}</p>
                <p className="text-sm leading-relaxed text-zinc-300">{pickLocale(locale, job.summary)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
