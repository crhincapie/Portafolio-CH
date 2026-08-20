import type { Localized } from "./types";

export type Testimonial = {
  name: string;
  role: Localized;
  company: string;
  quote: Localized;
  sectionTitle?: Localized;
};

export const testimonials: Testimonial[] = [
  {
    name: "Yasmin Ayala",
    company: "Compensar",
    role: { es: "Profesional Senior", en: "Senior Professional" },
    sectionTitle: { es: "Perspectiva de Producto / Negocio", en: "Product / Business Perspective" },
    quote: {
      es: "Cristian tiene una visión de producto que va más allá del diseño. Entiende las necesidades del negocio, cuestiona con criterio, estructura las decisiones y logra convertir problemas complejos en propuestas claras, viables y accionables.",
      en: "Cristian has a product vision that goes beyond design. He understands business needs, questions with judgment, structures decisions, and turns complex problems into clear, viable, and actionable proposals.",
    },
  },
  {
    name: "Johan Patiño",
    company: "Mercado Libre",
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    sectionTitle: { es: "Alineación con Tecnología", en: "Technology Alignment" },
    quote: {
      es: "Su fortaleza está en conectar diseño y tecnología. Cristian entiende las restricciones técnicas, anticipa dependencias y facilita la conversación con ingeniería, logrando acuerdos sobre alcance, tiempos y prioridades sin perder de vista la experiencia.",
      en: "His strength lies in connecting design and technology. Cristian understands technical constraints, anticipates dependencies, and facilitates conversation with engineering, reaching agreements on scope, timelines, and priorities without losing sight of the experience.",
    },
  },
  {
    name: "Daniel Flechas",
    company: "Globant",
    role: { es: "Product Manager", en: "Product Manager" },
    sectionTitle: { es: "Planeación y Liderazgo", en: "Planning and Leadership" },
    quote: {
      es: "Cristian lidera desde la claridad y la organización. Sabe estructurar equipos, priorizar, negociar tiempos y mantener el foco en los objetivos. Su capacidad para alinear diferentes perfiles hace que los equipos avancen con mayor autonomía y dirección.",
      en: "Cristian leads through clarity and organization. He knows how to structure teams, prioritize, negotiate timelines, and keep focus on objectives. His ability to align different profiles makes teams move forward with greater autonomy and direction.",
    },
  },
  {
    name: "Brayhan Garcia",
    company: "Evertec",
    role: { es: "Diseñador UX/UI", en: "UX/UI Designer" },
    sectionTitle: { es: "Proceso de Diseño", en: "Design Process" },
    quote: {
      es: "Tiene una mirada de diseño profundamente orientada a producto. No se limita a resolver interfaces: investiga, cuestiona, construye sistemas y eleva el estándar del equipo, incorporando nuevas metodologías, tecnología e IA cuando realmente aportan valor.",
      en: "He has a design perspective deeply oriented to product. He doesn't just solve interfaces: he researches, questions, builds systems, and raises the team's standard, incorporating new methodologies, technology, and AI when they truly add value.",
    },
  },
];
