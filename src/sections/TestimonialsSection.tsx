import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";
import { pickLocale } from "@/content/i18n";
import { Reveal, StaggerReveal } from "@/components/ui/Reveal";
import { AnimatedItem } from "@/components/ui/AnimatedItem";

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");
  const locale = await getLocale();

  return (
    <section id="testimonios" className="glass-ambient scroll-mt-28 border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />
        </Reveal>

        <StaggerReveal className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <AnimatedItem
              key={item.name}
              as="figure"
              className="group h-full transition duration-300 hover:scale-[1.02] motion-reduce:transition-none"
            >
              <div className="glass-surface glass-blur flex h-full flex-col justify-between rounded-3xl border border-line-strong p-6 transition-colors duration-300 group-hover:border-[#00feff]/70">
                {item.sectionTitle && (
                  <p className="accent-chip mb-4 text-xs font-semibold uppercase tracking-widest">
                    {pickLocale(locale, item.sectionTitle)}
                  </p>
                )}
                <blockquote className="text-pretty text-base leading-relaxed text-soft">
                  {pickLocale(locale, item.quote)}
                </blockquote>
                <figcaption className="mt-6 space-y-1 text-sm text-muted">
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p>
                    {pickLocale(locale, item.role)} · {item.company}
                  </p>
                </figcaption>
              </div>
            </AnimatedItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
