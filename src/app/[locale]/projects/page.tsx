import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS, getFeaturedProjects } from "@/content/projects";
import { pickLocale } from "@/content/i18n";

export default async function ProjectsIndexPage() {
  const t = await getTranslations("projectsPage");
  const locale = await getLocale();
  const featured = getFeaturedProjects();
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="border-b border-white/5 pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <SectionHeading kicker={t("kicker")} title={t("title")} description={t("subtitle")} />

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{t("featured")}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.slug}
                href={`/${locale}/projects/${project.slug}`}
                className="rounded-3xl border border-white/10 bg-zinc-950/60 p-5 transition hover:border-[#00feff]/50"
              >
                <p className="text-xs text-zinc-500">{pickLocale(locale, project.company)}</p>
                <h2 className="mt-2 text-lg font-semibold text-white">{pickLocale(locale, project.title)}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{pickLocale(locale, project.summary)}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{t("all")}</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project) => (
              <Link
                key={project.slug}
                href={`/${locale}/projects/${project.slug}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#00feff]/40"
              >
                <p className="text-xs text-zinc-500">{pickLocale(locale, project.company)}</p>
                <p className="mt-2 text-sm font-semibold text-white">{pickLocale(locale, project.title)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
