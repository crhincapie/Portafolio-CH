import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { pickLocale } from "@/content/i18n";
import { getProjectBySlug } from "@/content/projects";
import { buildCreativeWorkJsonLd } from "@/lib/structured-data";

type Props = { slug: string };

export async function CaseStudyView({ slug }: Props) {
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("caseStudy");
  const locale = await getLocale();
  const cs = project.caseStudy;

  const figma = project.figmaUrl ?? cs.figmaUrl;
  const prototype = project.prototypeUrl ?? cs.prototypeUrl;

  const path = locale === "es" ? `/projects/${project.slug}` : `/en/projects/${project.slug}`;
  const url = `${siteConfig.url.replace(/\/$/, "")}${path}`;

  const creativeLd = buildCreativeWorkJsonLd({
    locale,
    name: pickLocale(locale, project.title),
    description: pickLocale(locale, project.summary),
    url,
    datePublished: `${project.year}-01-01`,
  });

  const blocks = [
    { title: t("context"), body: pickLocale(locale, cs.context) },
    { title: t("problem"), body: pickLocale(locale, cs.problem) },
    { title: t("goals"), body: pickLocale(locale, cs.goals) },
    { title: t("research"), body: pickLocale(locale, cs.research) },
    { title: t("uxProcess"), body: pickLocale(locale, cs.uxProcess) },
    { title: t("wireframes"), body: pickLocale(locale, cs.wireframes) },
    { title: t("uiExploration"), body: pickLocale(locale, cs.uiExploration) },
    { title: t("designSystem"), body: pickLocale(locale, cs.designSystem) },
    { title: t("decisions"), body: pickLocale(locale, cs.decisions) },
    { title: t("results"), body: pickLocale(locale, cs.results) },
    { title: t("learnings"), body: pickLocale(locale, cs.learnings) },
  ];

  return (
    <article className="border-b border-white/5 pb-20 pt-10 md:pb-28 md:pt-16">
      <JsonLd data={[creativeLd]} />

      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00feff]/90">
              {pickLocale(locale, project.company)} · {project.year}
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              {pickLocale(locale, project.title)}
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400">
              {pickLocale(locale, project.summary)}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition hover:border-[#00feff]/60 hover:text-[#00feff]"
          >
            {t("back")}
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-[0_0_80px_rgba(0,254,255,0.12)]">
          <Image
            src={`/images/projects/${project.slug}/home.png`}
            alt={pickLocale(locale, project.title)}
            width={1600}
            height={900}
            className="aspect-[21/9] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,254,255,0.45),transparent_55%)] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        <div className="grid gap-10 md:grid-cols-[1.05fr_0.35fr]">
          <div className="space-y-12">
            {blocks.map((block) => (
              <section key={block.title} className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">{block.title}</h2>
                <p className="text-pretty text-base leading-relaxed text-zinc-200 md:text-lg">{block.body}</p>
              </section>
            ))}

            {cs.metrics?.length ? (
              <section className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">{t("metrics")}</h2>
                <ul className="grid gap-3 md:grid-cols-2">
                  {cs.metrics.map((m, i) => (
                    <li
                      key={i}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-zinc-200"
                    >
                      {pickLocale(locale, m)}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">{t("gallery")}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery?.map((src, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
                  >
                    <Image
                      src={src}
                      alt={`${pickLocale(locale, project.title)} screenshot ${i + 1}`}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500">{t("galleryNote")}</p>
            </section>
          </div>

          <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">{t("tools")}</h3>
              <ul className="mt-3 space-y-2">
                {cs.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">{t("techStack")}</h3>
              <ul className="mt-3 space-y-2">
                {cs.techStack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">{t("links")}</h3>
              <div className="mt-3 space-y-3">
                {figma ? (
                  <a
                    className="block rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-[#00feff] transition hover:border-[#00feff]/50"
                    href={figma}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t("openFigma")}
                  </a>
                ) : null}
                {prototype ? (
                  <a
                    className="block rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-[#00feff] transition hover:border-[#00feff]/50"
                    href={prototype}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t("openPrototype")}
                  </a>
                ) : null}
                {!figma && !prototype ? <p className="text-xs leading-relaxed text-zinc-500">{t("noLinks")}</p> : null}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
