import type { Localized } from "./types";

export function pickLocale(locale: string, value: Localized) {
  return locale === "en" ? value.en : value.es;
}
