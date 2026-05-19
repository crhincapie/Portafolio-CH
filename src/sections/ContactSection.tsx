import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section id="contacto" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-10 px-4 md:px-6">
        <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />

        <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-zinc-950 to-zinc-950 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-zinc-300">{t("footnote")}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button href={`mailto:${siteConfig.email}`}>{t("emailCta")}</Button>
            <Button href={`https://wa.me/${siteConfig.whatsapp}`} external variant="outline">
              {t("whatsappCta")}
            </Button>
            <Button href={siteConfig.linkedin} external variant="outline">
              {t("linkedinCta")}
            </Button>
            <Button href={siteConfig.behance} external variant="outline">
              {t("behanceCta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
