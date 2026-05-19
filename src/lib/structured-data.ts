import { siteConfig } from "@/config/site";

export function buildPersonJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Senior Product Designer",
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin, siteConfig.behance],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    knowsLanguage: ["Spanish", "English"],
    description:
      locale === "en"
        ? "Senior Product Designer focused on fintech, health, and complex digital products."
        : "Senior Product Designer enfocado en fintech, salud y productos digitales complejos.",
  };
}

export function buildWebSiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: locale === "en" ? "en-US" : "es-CO",
  };
}

export function buildCreativeWorkJsonLd(input: {
  locale: string;
  name: string;
  description: string;
  url: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: input.url,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    inLanguage: input.locale === "en" ? "en-US" : "es-CO",
    datePublished: input.datePublished,
  };
}
