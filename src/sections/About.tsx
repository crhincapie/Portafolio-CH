import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function About() {
  const t = await getTranslations("about");
  const body = t("body");
  const paragraphs = body.split("\n\n");

  return (
    <section id="sobre" className="scroll-mt-28 border-b border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <SectionHeading kicker={t("kicker")} title={t("title")} />
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
          <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-400">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00feff]/90">{t("locationLabel")}</p>
            <p className="text-base text-white">{t("location")}</p>
            <p>{t("languages")}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
