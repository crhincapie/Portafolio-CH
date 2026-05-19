import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProjectSlugs } from "@/content/projects";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const slugs = getAllProjectSlugs();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    entries.push({
      url: `${base}${prefix || "/"}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: locale === routing.defaultLocale ? 1 : 0.9,
    });
    entries.push({
      url: `${base}${prefix}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    });
    for (const slug of slugs) {
      entries.push({
        url: `${base}${prefix}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
