"use client";

import { useTranslations } from "next-intl";

export function SkipToContent() {
  const t = useTranslations("a11y");
  return (
    <a
      href="#contenido-principal"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:text-[#00feff] focus:ring-2 focus:ring-[#00feff]/60"
    >
      {t("skip")}
    </a>
  );
}
