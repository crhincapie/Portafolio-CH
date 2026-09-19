export interface Localized {
  es: string;
  en: string;
}

export interface CvSkillTag {
  text: string;
  highlight: boolean;
}

export interface CvSkillGroup {
  title: Localized;
  tags: CvSkillTag[];
}

export interface CvTool {
  name: string;
  logo?: string;
}

export interface CvLanguage {
  name: Localized;
  level: Localized;
  percent: number;
}

export interface CvReference {
  initials: string;
  name: string;
  role: Localized;
  company: string;
  phone: string;
}

export interface CvEducation {
  logo?: string;
  initials?: string;
  title: Localized;
  subtitle: Localized;
  date: Localized;
}

export interface CvJob {
  id: string;
  logo?: string;
  role: Localized;
  company: Localized;
  dates: Localized;
  location: Localized;
  bullets: Localized[];
}

export interface CvData {
  identity: {
    name: string;
    role: Localized;
    role2: Localized;
    chips: string[];
    tagline: Localized;
  };
  contact: {
    email: string;
    phone: string;
    location: Localized;
  };
  profile: Localized[];
  skills: CvSkillGroup[];
  tools: CvTool[];
  social: {
    linkedin: string;
    portfolio: string;
  };
  languages: CvLanguage[];
  references: CvReference[];
  education: CvEducation[];
  experience: CvJob[];
}

export interface CvVersion {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  readOnly: boolean;
  data: CvData;
}

export type CvSectionKey =
  | "identity"
  | "contact"
  | "profile"
  | "skills"
  | "tools"
  | "social"
  | "languages"
  | "references"
  | "education"
  | "experience";

export const CV_STORAGE_KEY = "ch-cv-versions";
export const CV_ACTIVE_KEY = "ch-cv-active";
export const CV_OFFICIAL_ID = "oficial";