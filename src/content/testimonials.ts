import type { Localized } from "./types";

export type Testimonial = {
  name: string;
  role: Localized;
  company: string;
  quote: Localized;
};

export const testimonials: Testimonial[] = [
  {
    name: "Laura Méndez",
    company: "Series B Fintech",
    role: { es: "Product Manager", en: "Product Manager" },
    quote: {
      es: "Cristian no solo entrega interfaces impecables: traduce incertidumbre en decisiones, prioriza con criterio y empuja al equipo hacia un estándar de calidad que se nota en cada release.",
      en: "Cristian doesn't just ship polished interfaces—he turns ambiguity into decisions, prioritizes with judgment, and raises the team's quality bar in every release.",
    },
  },
  {
    name: "Daniel Ortega",
    company: "Banco regional",
    role: { es: "Tech Lead", en: "Tech Lead" },
    quote: {
      es: "Habla el idioma del sistema: entiende trade-offs, documenta bien y colabora con ingeniería sin fricción. Eso acelera delivery y reduce retrabajo.",
      en: "He speaks system language: understands trade-offs, documents well, and collaborates with engineering without friction—faster delivery, less rework.",
    },
  },
  {
    name: "Valentina Ríos",
    company: "HealthTech",
    role: { es: "CEO", en: "CEO" },
    quote: {
      es: "Necesitábamos claridad para inversionistas y usuarios al mismo tiempo. Cristian conectó narrativa, UX y métricas con un roadmap que el equipo pudo ejecutar.",
      en: "We needed clarity for investors and users at the same time. Cristian connected narrative, UX, and metrics with a roadmap the team could actually execute.",
    },
  },
  {
    name: "Andrés Páez",
    company: "Scale-up LATAM",
    role: { es: "Head of Design", en: "Head of Design" },
    quote: {
      es: "Es el tipo de senior que eleva el craft del equipo: sistemas, crítica constructiva y una mirada de producto que va más allá del layout.",
      en: "The kind of senior who elevates team craft—systems, constructive critique, and product thinking beyond the layout.",
    },
  },
];
