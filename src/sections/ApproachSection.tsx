import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerReveal } from "@/components/ui/Reveal";
import { AnimatedItem } from "@/components/ui/AnimatedItem";

export async function ApproachSection() {
  const t = await getTranslations("approach");
  const paragraphs = t("body").split("\n\n");
  const pills = [t("pill1"), t("pill2"), t("pill3"), t("pill4")];

  return (
    <section id="enfoque" className="glass-ambient scroll-mt-28 border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-10 px-4 md:px-6">
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
          <StaggerReveal className="grid gap-3 sm:grid-cols-2" staggerDelay={0.06}>
            {pills.map((pill) => (
              <AnimatedItem
                key={pill}
                as="li"
                className="group list-none transition duration-300 hover:scale-[1.02] motion-reduce:transition-none"
              >
                <div className="glass-surface rounded-2xl border border-line-strong px-4 py-4 text-sm font-medium text-ink transition-colors duration-300 group-hover:border-[#00feff]/70">
                  {pill}
                </div>
              </AnimatedItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
