export type Localized = { es: string; en: string };

export type CaseStudyContent = {
  context: Localized;
  problem: Localized;
  goals: Localized;
  research: Localized;
  uxProcess: Localized;
  wireframes: Localized;
  uiExploration: Localized;
  designSystem: Localized;
  decisions: Localized;
  results: Localized;
  learnings: Localized;
  metrics?: Localized[];
  tools: string[];
  techStack: string[];
  figmaUrl?: string | null;
  prototypeUrl?: string | null;
};

export type Project = {
  slug: string;
  featured: boolean;
  year: string;
  company: Localized;
  role: Localized;
  title: Localized;
  summary: Localized;
  tags: string[];
  figmaUrl?: string | null;
  prototypeUrl?: string | null;
  caseStudy: CaseStudyContent;
};
