import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ContactBackground } from "@/components/contact/ContactBackground";
import {
  ArrowRightIcon,
  BehanceIcon,
  LinkedinIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/contact/ContactIcons";

export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section id="contacto" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-10 px-4 md:px-6">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />
        </Reveal>

        <Reveal delay={0.1}>
          <SpotlightCard
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#00feff]/80 hover:bg-zinc-900/70 hover:shadow-[0_0_60px_rgba(0,254,255,0.25)]"
          >
            <ContactBackground />

            <div className="relative grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-12">
              <div className="flex flex-col justify-between gap-8">
                <div className="space-y-4">
                  <p className="max-w-md text-sm leading-relaxed text-zinc-300">{t("footnote")}</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2.5 text-sm font-medium text-zinc-100 transition hover:text-[#00feff]"
                  >
                    <MailIcon className="h-4.5 w-4.5 text-[#00feff]" />
                    {siteConfig.email}
                  </a>
                </div>
                <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#00feff]/25 bg-[#00feff]/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#00feff]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00feff] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00feff]" />
                  </span>
                  {t("availability")}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#00feff] px-6 py-4 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_rgba(0,254,255,0.25)] transition hover:bg-[#7afcff] hover:shadow-[0_0_60px_rgba(0,254,255,0.4)]"
                >
                  <MailIcon className="h-5 w-5" />
                  <span>{t("emailCta")}</span>
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-4 text-xs font-medium text-zinc-200 transition hover:border-[#00feff]/60 hover:bg-[#00feff]/5 hover:text-[#00feff]"
                  >
                    <WhatsAppIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span>{t("whatsappCta")}</span>
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-4 text-xs font-medium text-zinc-200 transition hover:border-[#00feff]/60 hover:bg-[#00feff]/5 hover:text-[#00feff]"
                  >
                    <LinkedinIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span>{t("linkedinCta")}</span>
                  </a>
                  <a
                    href={siteConfig.behance}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-4 text-xs font-medium text-zinc-200 transition hover:border-[#00feff]/60 hover:bg-[#00feff]/5 hover:text-[#00feff]"
                  >
                    <BehanceIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span>{t("behanceCta")}</span>
                  </a>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
