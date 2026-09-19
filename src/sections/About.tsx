import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export async function About() {
  const t = await getTranslations("about");
  const body = t("body");
  const paragraphs = body.split("\n\n");

  return (
    <section id="sobre" className="glass-ambient scroll-mt-28 border-b border-line px-0 py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} />
        </Reveal>
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <Reveal delay={0.1}>
            <div className="space-y-6 text-lg leading-relaxed text-soft">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <aside className="glass-surface glass-blur space-y-4 rounded-3xl border border-line-strong p-6 text-sm text-muted">
              <p className="accent-chip text-xs font-semibold uppercase tracking-[0.3em]">{t("locationLabel")}</p>
              <p className="text-base text-ink">{t("location")}</p>
              <p>{t("languages")}</p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
