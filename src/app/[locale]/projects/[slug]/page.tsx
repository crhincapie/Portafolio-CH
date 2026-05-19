import type { Metadata } from "next";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { getAllProjectSlugs, getProjectBySlug } from "@/content/projects";
import { pickLocale } from "@/content/i18n";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = pickLocale(locale, project.title);
  const description = pickLocale(locale, project.summary);
  const esPath = `/projects/${slug}`;
  const enPath = `/en/projects/${slug}`;

  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
    twitter: { title, description, card: "summary_large_image" },
    alternates: {
      canonical: locale === "es" ? esPath : enPath,
      languages: { es: esPath, en: enPath },
    },
  };
}

export default async function ProjectCasePage({ params }: { params: Params }) {
  const { slug } = await params;
  return <CaseStudyView slug={slug} />;
}
