import type { Localized } from "./types";

export type ExperienceItem = {
  id: string;
  company: Localized;
  period: Localized;
  role: Localized;
  dates: Localized;
  /** Resumen narrativo del rol: alcance, funciones y logros (sin listas). */
  summary: Localized;
};

export const experienceItems: ExperienceItem[] = [
  {
    id: "compensar",
    company: { es: "Compensar", en: "Compensar" },
    period: { es: "Salud & servicios", en: "Health & services" },
    role: { es: "Profesional Senior - Product Designer", en: "Senior Professional - Product Designer" },
    dates: { es: "2023 — 2026", en: "2023 — 2026" },
    summary: {
      es: "Lideré de punta a punta la evolución de productos digitales de bienestar y servicios: desde la investigación y la arquitectura de información hasta la interfaz final y su mejora continua. Construí un Design System que dio consistencia y velocidad a los equipos, optimicé plataformas usadas por más de 300 personas y llevé la IA y la automatización al día a día del diseño, reduciendo trabajo operativo y alineando a negocio y tecnología en torno a decisiones medibles.",
      en: "I led the end-to-end evolution of digital wellbeing and service products: from research and information architecture to the final interface and its continuous improvement. I built a Design System that brought consistency and speed to the teams, optimized platforms used by more than 300 people, and brought AI and automation into everyday design work, cutting operational effort and aligning business and technology around measurable decisions.",
    },
  },
  {
    id: "adl",
    company: { es: "ADL Digital Lab", en: "ADL Digital Lab" },
    period: { es: "Reciente", en: "Recent" },
    role: { es: "Diseñador Senior UX/UI - Product Designer", en: "Senior UX/UI Designer - Product Designer" },
    dates: { es: "2022 — 2023", en: "2022 — 2023" },
    summary: {
      es: "Asumí el liderazgo de diseño en productos digitales complejos, web y mobile, conectando negocio, ingeniería y diseño desde el discovery hasta la entrega. Convertí necesidades de usuario y metas comerciales en flujos, arquitectura y prototipos validados con usuarios reales, lo que permitió detectar fricciones antes de construir y lanzar experiencias más claras, usables y orientadas a conversión.",
      en: "I took on design leadership for complex web and mobile digital products, connecting business, engineering, and design from discovery to delivery. I turned user needs and business goals into flows, architecture, and prototypes validated with real users, which surfaced friction before building and led to clearer, more usable, conversion-oriented experiences.",
    },
  },
  {
    id: "scotiabank",
    company: { es: "Scotiabank Colpatria", en: "Scotiabank Colpatria" },
    period: { es: "Fintech", en: "Fintech" },
    role: { es: "Diseñador Senior UX/UI", en: "Senior UX/UI Designer" },
    dates: { es: "2021 — 2022", en: "2021 — 2022" },
    summary: {
      es: "Diseñé experiencias financieras donde la confianza es parte del producto. Trabajé flujos críticos de banca web y mobile en un entorno regulado, apoyado en investigación, pruebas de usabilidad y métricas de comportamiento, para reducir fricción en los momentos más sensibles y acompañar a desarrollo hasta que cada solución llegara a producción con la calidad diseñada.",
      en: "I designed financial experiences where trust is part of the product. I worked on critical web and mobile banking flows in a regulated environment, backed by research, usability testing, and behavioral metrics, to reduce friction in the most sensitive moments and partner with development until each solution shipped with the intended quality.",
    },
  },
  {
    id: "fitpal",
    company: { es: "Fitpal SAS", en: "Fitpal SAS" },
    period: { es: "UX/UI & desarrollo", en: "UX/UI & development" },
    role: { es: "Diseñador Front.", en: "Front Designer" },
    dates: { es: "2018 — 2021", en: "2018 — 2021" },
    summary: {
      es: "Aquí diseño y código se volvieron un solo oficio. Definí flujos y experiencias de producto junto a negocio y tecnología, y las construí yo mismo en React, Angular e Ionic con componentes reutilizables. El resultado fueron plataformas web y móviles consistentes, landing pages orientadas a conversión y una forma de diseñar que siempre piensa en cómo se construye.",
      en: "This is where design and code became one craft. I defined product flows and experiences with business and technology, and built them myself in React, Angular, and Ionic with reusable components. The result was consistent web and mobile platforms, conversion-focused landing pages, and a way of designing that always considers how things get built.",
    },
  },
];

/** Formación y primeros roles: abre el recorrido de la sección Experiencia. */
export const originChapter = {
  dates: { es: "2014 — 2018", en: "2014 — 2018" },
  path: [
    { es: "Técnico en sistemas", en: "Systems technician" },
    { es: "Web Master", en: "Web Master" },
    { es: "Productor Multimedia", en: "Multimedia Producer" },
    { es: "Diseñador Gráfico", en: "Graphic Designer" },
    { es: "Desarrollador Frontend", en: "Frontend Developer" },
  ] as Localized[],
};
