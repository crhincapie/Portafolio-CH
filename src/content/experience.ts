import type { Localized } from "./types";

export const experienceItems: {
  company: Localized;
  period: Localized;
  role: Localized;
  summary: Localized;
}[] = [
  {
    company: { es: "ADL Digital Lab", en: "ADL Digital Lab" },
    period: { es: "Reciente", en: "Recent" },
    role: { es: "Product / UX Lead", en: "Product / UX Lead" },
    summary: {
      es: "Liderazgo de Product Design en productos digitales complejos, alineando negocio, ingeniería y diseño desde discovery hasta ejecución.",
      en: "Product Design leadership for complex digital products, aligning business, engineering, and design from discovery to execution.",
    },
  },
  {
    company: { es: "Scotiabank Colpatria", en: "Scotiabank Colpatria" },
    period: { es: "Fintech", en: "Fintech" },
    role: { es: "UX/UI & Product Design", en: "UX/UI & Product Design" },
    summary: {
      es: "Diseño de productos financieros centrados en confianza, claridad y conversión, reduciendo fricción en flujos críticos y contextos regulados.",
      en: "Financial product design focused on trust, clarity, and conversion, reducing friction in critical flows and regulated contexts.",
    },
  },
  {
    company: { es: "Compensar", en: "Compensar" },
    period: { es: "Salud & servicios", en: "Health & services" },
    role: { es: "Product Designer", en: "Product Designer" },
    summary: {
      es: "Evolución de productos digitales de bienestar y servicios, impulsando innovación, accesibilidad, automatización e IA aplicada.",
      en: "Evolution of digital wellbeing and service products, driving innovation, accessibility, automation, and applied AI.",
    },
  },
];
