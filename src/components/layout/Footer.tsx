"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-6">
        <div className="max-w-md space-y-4">
          <p className="text-sm font-semibold text-white">{t("title")}</p>
          <p className="text-sm leading-relaxed text-zinc-400">{t("subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
          <a className="hover:text-[#00feff]" href={siteConfig.linkedin} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <a className="hover:text-[#00feff]" href={siteConfig.behance} rel="noreferrer" target="_blank">
            Behance
          </a>
          <a className="hover:text-[#00feff]" href={`mailto:${siteConfig.email}`}>
            Email
          </a>
          <a
            className="hover:text-[#00feff]"
            href={`https://wa.me/${siteConfig.whatsapp}`}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-zinc-500">
        © {year} {siteConfig.name}. {t("rights")}
      </div>
    </footer>
  );
}
