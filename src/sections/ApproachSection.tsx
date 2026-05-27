import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerReveal } from "@/components/ui/Reveal";
import { AnimatedItem } from "@/components/ui/AnimatedItem";

export async function ApproachSection() {
  const t = await getTranslations("approach");
  const paragraphs = t("body").split("\n\n");
  const pills = [t("pill1"), t("pill2"), t("pill3"), t("pill4")];

  return (
    <section id="enfoque" className="scroll-mt-28 border-b border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-10 px-4 md:px-6">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} />
        </Reveal>
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <Reveal delay={0.1}>
            <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
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
                as="li"
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-zinc-950 px-4 py-4 text-sm font-medium text-white"
              >
                {pill}
              </AnimatedItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
