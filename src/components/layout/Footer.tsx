"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-6">
        <div className="max-w-md space-y-4">
          <p className="text-sm font-semibold text-ink">{t("title")}</p>
          <p className="text-sm leading-relaxed text-muted">{t("subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted">
          <a className="hover:text-accent-text" href={siteConfig.linkedin} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <a className="hover:text-accent-text" href={siteConfig.behance} rel="noreferrer" target="_blank">
            Behance
          </a>
          <a className="hover:text-accent-text" href={`mailto:${siteConfig.email}`}>
            Email
          </a>
          <a
            className="hover:text-accent-text"
            href={`https://wa.me/${siteConfig.whatsapp}`}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-faint">
        © {year}. {t("rights")}
      </div>
    </footer>
  );
}
