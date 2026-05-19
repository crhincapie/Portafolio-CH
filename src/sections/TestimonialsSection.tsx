import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";
import { pickLocale } from "@/content/i18n";

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");
  const locale = await getLocale();

  return (
    <section id="testimonios" className="scroll-mt-28 border-b border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/60 p-6"
            >
              <blockquote className="text-pretty text-base leading-relaxed text-zinc-200">
                {pickLocale(locale, item.quote)}
              </blockquote>
              <figcaption className="mt-6 space-y-1 text-sm text-zinc-400">
                <p className="font-semibold text-white">{item.name}</p>
                <p>
                  {pickLocale(locale, item.role)} · {item.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
