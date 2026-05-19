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
      es: "Dirección de experiencia en productos digitales complejos, alineando negocio, ingeniería y diseño con entregables medibles.",
      en: "Leading experience for complex digital products, aligning business, engineering, and design with measurable outcomes.",
    },
  },
  {
    company: { es: "Scotiabank Colpatria", en: "Scotiabank Colpatria" },
    period: { es: "Fintech", en: "Fintech" },
    role: { es: "UX/UI & Product Design", en: "UX/UI & Product Design" },
    summary: {
      es: "Flujos críticos, confianza y claridad en contextos regulados; diseño orientado a conversión y reducción de fricción.",
      en: "Critical flows, trust, and clarity in regulated contexts; design aimed at conversion and friction reduction.",
    },
  },
  {
    company: { es: "Compensar", en: "Compensar" },
    period: { es: "Salud & servicios", en: "Health & services" },
    role: { es: "Product Designer", en: "Product Designer" },
    summary: {
      es: "Productos de bienestar y servicios con alta demanda de accesibilidad, consistencia y operación a escala.",
      en: "Wellbeing and service products with strong demands for accessibility, consistency, and scale.",
    },
  },
];
