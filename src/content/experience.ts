import type { Localized } from "./types";

export const experienceItems: {
  company: Localized;
  period: Localized;
  role: Localized;
  summary: Localized;
}[] = [
  {
    company: { es: "Compensar", en: "Compensar" },
    period: { es: "Salud & servicios", en: "Health & services" },
    role: { es: "Profesional Senior - Product Designer", en: "Senior Professional - Product Designer" },
    summary: {
      es: "Evolución de productos digitales de bienestar y servicios, impulsando innovación, accesibilidad, automatización e IA aplicada.",
      en: "Evolution of digital wellbeing and service products, driving innovation, accessibility, automation, and applied AI.",
    },
  },
  {
    company: { es: "ADL Digital Lab", en: "ADL Digital Lab" },
    period: { es: "Reciente", en: "Recent" },
    role: { es: "Diseñador Senior UX/UI - Product Designer", en: "Senior UX/UI Designer - Product Designer" },
    summary: {
      es: "Liderazgo de Product Design en productos digitales complejos, alineando negocio, ingeniería y diseño desde discovery hasta ejecución.",
      en: "Product Design leadership for complex digital products, aligning business, engineering, and design from discovery to execution.",
    },
  },
  {
    company: { es: "Scotiabank Colpatria", en: "Scotiabank Colpatria" },
    period: { es: "Fintech", en: "Fintech" },
    role: { es: "Diseñador Senior UX/UI", en: "Senior UX/UI Designer" },
    summary: {
      es: "Diseño de productos financieros centrados en confianza, claridad y conversión, reduciendo fricción en flujos críticos y contextos regulados.",
      en: "Financial product design focused on trust, clarity, and conversion, reducing friction in critical flows and regulated contexts.",
    },
  },
  {
    company: { es: "Fitpal SAS", en: "Fitpal SAS" },
    period: { es: "UX/UI&desarrollo", en: "UX/UI&development" },
    role: { es: "Diseñador Front.", en: "Front Designer" },
    summary: {
      es: "Diseño y desarrollo de experiencias digitales para plataformas web y móviles, conectando la implementación Front-End con experiencias UX/UI orientadas a conversión.",
      en: "Designed and developed digital experiences for web and mobile platforms, bridging Front-End implementation with conversion-oriented UX/UI experiences.",
    },
  },
];