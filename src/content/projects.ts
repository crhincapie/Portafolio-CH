import type { CaseStudyContent, Project } from "./types";

const cs = (
  partial: Omit<CaseStudyContent, "tools" | "techStack"> & {
    tools?: string[];
    techStack?: string[];
  },
): CaseStudyContent => ({
  tools: partial.tools ?? ["Figma", "Maze", "Notion", "Jira"],
  techStack: partial.techStack ?? ["Design system", "React", "Web"],
  ...partial,
});

const featuredBalanc: CaseStudyContent = cs({
  context: {
    es: "BalanC Funcional es una propuesta de salud digital orientada a hábitos y adherencia, con foco en confianza y claridad operativa.",
    en: "BalanC Funcional is a digital health proposition focused on habits and adherence, with emphasis on trust and operational clarity.",
  },
  problem: {
    es: "Equilibrar tono clínico y humano, reducir ansiedad en flujos largos y construir una identidad fresca sin sacrificar credibilidad.",
    en: "Balance clinical and human tone, reduce anxiety in long flows, and build a fresh identity without sacrificing credibility.",
  },
  goals: {
    es: "Mejorar comprensión del valor, completitud de onboarding y una base UI escalable para iteraciones futuras.",
    en: "Improve value comprehension, onboarding completion, and a scalable UI foundation for future iterations.",
  },
  research: {
    es: "Entrevistas, journey maps y análisis de abandono; priorización de señales de confianza y micro-asistencia contextual.",
    en: "Interviews, journey maps, and drop-off analysis; prioritizing trust signals and contextual micro-guidance.",
  },
  uxProcess: {
    es: "Flujos modulares, estados explícitos y jerarquía basada en intención: dónde estoy, qué gano, qué sigue.",
    en: "Modular flows, explicit states, and intent-based hierarchy: where am I, what do I gain, what’s next.",
  },
  wireframes: {
    es: "Wireframes funcionales de alta fidelidad para validar estructura antes del UI y acelerar handoff.",
    en: "High-fidelity functional wireframes to validate structure before UI and speed handoff.",
  },
  uiExploration: {
    es: "Exploración visual con acentos cian controlados, tipografía legible y look futurista pero accesible.",
    en: "Visual exploration with controlled cyan accents, legible type, and a futuristic yet accessible look.",
  },
  designSystem: {
    es: "Tokens semánticos, variantes de componentes y guías de contenido para salud; documentación orientada a desarrollo.",
    en: "Semantic tokens, component variants, and health content guidelines—documentation oriented to engineering.",
  },
  decisions: {
    es: "Claridad sobre ornamentación: consistencia y velocidad de comprensión primero, especialmente en salud digital.",
    en: "Clarity over ornamentation—consistency and comprehension speed first, especially in digital health.",
  },
  results: {
    es: "Experiencia cohesiva lista para iteración continua, con narrativa alineada a adherencia y confianza.",
    en: "A cohesive experience ready for continuous iteration, with narrative aligned to adherence and trust.",
  },
  learnings: {
    es: "En salud, el diseño gestiona riesgo percibido; la disciplina de sistema se traduce en velocidad de equipo.",
    en: "In health, design manages perceived risk; system discipline translates into team velocity.",
  },
  metrics: [
    {
      es: "Reducción cualitativa de fricción en onboarding (validación interna).",
      en: "Qualitative reduction of onboarding friction (internal validation).",
    },
  ],
  figmaUrl: null,
  prototypeUrl: "https://embed.figma.com/proto/0DrKFvC908Swabcxxdmnvz/BalanC-Funcional?node-id=12931-16913&scaling=scale-down-width&content-scaling=fixed&page-id=1%3A13&starting-point-node-id=12931%3A16913&embed-host=share",
});

const featuredTurismo: CaseStudyContent = cs({
  context: {
    es: "Turismo sostenible requiere inspiración con evidencia: destinos y decisiones sin greenwashing.",
    en: "Sustainable tourism needs inspiration with evidence—destinations and decisions without greenwashing.",
  },
  problem: {
    es: "Desconfianza ante claims ambientales vagos; necesidad de datos verificables y opciones accionables.",
    en: "Distrust of vague environmental claims—need for verifiable data and actionable options.",
  },
  goals: {
    es: "Mejorar comprensión de rutas sostenibles, engagement en itinerarios y plantillas para partners.",
    en: "Improve understanding of sustainable routes, itinerary engagement, and partner templates.",
  },
  research: {
    es: "Benchmark editorial, card sorting y revisión heurística; principios de transparencia y evidencia.",
    en: "Editorial benchmarking, card sorting, and heuristic review—transparency and evidence principles.",
  },
  uxProcess: {
    es: "Arquitectura por intención de viaje (descubrir, planificar, reservar) con storytelling por capas.",
    en: "Architecture by travel intent (discover, plan, book) with layered storytelling.",
  },
  wireframes: {
    es: "Layouts editoriales responsivos con CTAs contextuales; mobile-first para discovery.",
    en: "Responsive editorial layouts with contextual CTAs—mobile-first for discovery.",
  },
  uiExploration: {
    es: "Paleta orgánica con acentos digitales, fotografía honesta y tipografía editorial moderna.",
    en: "Organic palette with digital accents, honest photography, and modern editorial type.",
  },
  designSystem: {
    es: "Grid editorial, tokens de espaciado y componentes de itinerario; guías de tono responsable.",
    en: "Editorial grid, spacing tokens, itinerary components—responsible tone guidelines.",
  },
  decisions: {
    es: "Evitar saturación de badges eco; preferir datos, fuentes y comparaciones accionables.",
    en: "Avoid eco-badge saturation—prefer data, sources, and actionable comparisons.",
  },
  results: {
    es: "Sistema de páginas consistente para storytelling de destinos, escalable a nuevas regiones.",
    en: "A consistent page system for destination storytelling, scalable to new regions.",
  },
  learnings: {
    es: "Sostenibilidad es diseño de información: lo no verificable no compite globalmente.",
    en: "Sustainability is information design—if it isn’t verifiable, it won’t compete globally.",
  },
  figmaUrl: null,
  prototypeUrl: null,
});

const featuredAgro: CaseStudyContent = cs({
  context: {
    es: "AgroCash conecta servicios financieros rurales con operación en terreno: simplicidad, confianza local y baja tolerancia a error.",
    en: "AgroCash connects rural financial services with field operations—simplicity, local trust, and low error tolerance.",
  },
  problem: {
    es: "Alta carga cognitiva en desembolso y validación; necesidad de claridad inmediata y estados explícitos.",
    en: "High cognitive load in disbursement and validation—need for immediate clarity and explicit states.",
  },
  goals: {
    es: "Reducir errores de entrada, acelerar validación y estandarizar patrones multi-rol.",
    en: "Reduce input errors, speed validation, and standardize multi-role patterns.",
  },
  research: {
    es: "Observación contextual, shadowing y priorización por severidad de riesgo; momentos de verdad financieros.",
    en: "Contextual observation, shadowing, and risk-severity prioritization—financial moments of truth.",
  },
  uxProcess: {
    es: "Confirmaciones elegantes, feedback inmediato y microinteracciones para reducir ansiedad.",
    en: "Elegant confirmations, immediate feedback, and microinteractions to reduce anxiety.",
  },
  wireframes: {
    es: "Flujos lineales, bifurcaciones mínimas y estados vacíos educativos; consistencia entre canales.",
    en: "Linear flows, minimal branching, educational empty states—consistency across channels.",
  },
  uiExploration: {
    es: "UI sobria, alto contraste, legibilidad en exteriores y targets táctiles generosos.",
    en: "Sober UI, high contrast, outdoor readability, and generous tactile targets.",
  },
  designSystem: {
    es: "Biblioteca de formularios, tablas y estados críticos; mensajes de error humanos y AA.",
    en: "Form library, tables, critical states—human error messages and AA guidance.",
  },
  decisions: {
    es: "Verdad operativa sobre estética: lo bonito debe prevenir errores con dinero.",
    en: "Operational truth over aesthetics—beauty should help prevent money mistakes.",
  },
  results: {
    es: "Flujos más claros para roles críticos y base UI para despliegue incremental en campo.",
    en: "Clearer flows for critical roles and a UI foundation for incremental field rollout.",
  },
  learnings: {
    es: "En fintech rural, cada campo es una decisión de confianza.",
    en: "In rural fintech, every field is a trust decision.",
  },
  metrics: [
    {
      es: "Consistencia de patrones entre flujos críticos (auditoría UX).",
      en: "Pattern consistency across critical flows (UX audit).",
    },
  ],
  tools: ["Figma", "FigJam", "Hotjar", "Notion"],
  techStack: ["Design system", "React", "API-driven flows"],
  figmaUrl: null,
  prototypeUrl: null,
});

const brief = (
  titleEs: string,
  titleEn: string,
  bodyEs: string,
  bodyEn: string,
): CaseStudyContent =>
  cs({
    context: { es: `Resumen del proyecto: ${titleEs}.`, en: `Project summary: ${titleEn}.` },
    problem: { es: bodyEs, en: bodyEn },
    goals: {
      es: "Alinear negocio y usuarios con entregables incrementales y métricas claras de adopción.",
      en: "Align business and users with incremental deliverables and clear adoption metrics.",
    },
    research: {
      es: "Benchmark, entrevistas y priorización por impacto/esfuerzo para enfocar el roadmap.",
      en: "Benchmarking, interviews, and impact/effort prioritization to focus the roadmap.",
    },
    uxProcess: {
      es: "Iteración con prototipos navegables y validación continua con stakeholders.",
      en: "Iteration with navigable prototypes and continuous stakeholder validation.",
    },
    wireframes: {
      es: "Estructuras modulares para acelerar decisiones y handoff.",
      en: "Modular structures to speed decisions and handoff.",
    },
    uiExploration: {
      es: "Exploraciones visuales alineadas a identidad y accesibilidad AA.",
      en: "Visual explorations aligned to brand and AA accessibility.",
    },
    designSystem: {
      es: "Componentes reutilizables y guías para consistencia multi-squad.",
      en: "Reusable components and guidelines for multi-squad consistency.",
    },
    decisions: {
      es: "Decisiones documentadas con trade-offs explícitos para escalar sin ambigüedad.",
      en: "Documented decisions with explicit trade-offs to scale without ambiguity.",
    },
    results: {
      es: "Entrega lista para iteración con patrones compartidos.",
      en: "Delivery ready for iteration with shared patterns.",
    },
    learnings: {
      es: "Velocidad sostenible nace de sistemas claros y comunicación honesta diseño–negocio.",
      en: "Sustainable speed comes from clear systems and honest design–business communication.",
    },
    figmaUrl: null,
    prototypeUrl: null,
  });

export const PROJECTS: Project[] = [
  {
    slug: "balanc-funcional",
    featured: true,
    year: "2024",
    company: { es: "Salud digital", en: "Digital health" },
    role: { es: "Lead Product & UX/UI", en: "Lead Product & UX/UI" },
    title: { es: "BalanC Funcional", en: "BalanC Funcional" },
    summary: {
      es: "Salud digital con adherencia, confianza e identidad futurista pero humana.",
      en: "Digital health focused on adherence, trust, and a futuristic yet human identity.",
    },
    tags: ["UX", "UI", "Design system", "Health"],
    figmaUrl: null,
    prototypeUrl: "https://embed.figma.com/proto/0DrKFvC908Swabcxxdmnvz/BalanC-Funcional?node-id=12931-16913&scaling=scale-down-width&content-scaling=fixed&page-id=1%3A13&starting-point-node-id=12931%3A16913&embed-host=share",
    galleryVariant: "desktop",
    gallery: [
      "/images/projects/balanc-funcional/home.webp",
      "/images/projects/balanc-funcional/programa.webp",
      "/images/projects/balanc-funcional/cita.webp",
      "/images/projects/balanc-funcional/dashboard.webp",
    ],
    caseStudy: featuredBalanc,
  },
  {
    slug: "turismo-sostenible",
    featured: true,
    year: "2024",
    company: { es: "Travel", en: "Travel" },
    role: { es: "Product Designer", en: "Product Designer" },
    title: { es: "Turismo Sostenible", en: "Sustainable Tourism" },
    summary: {
      es: "Editorial digital con evidencia, itinerarios y narrativa responsable.",
      en: "Digital editorial with evidence, itineraries, and responsible narrative.",
    },
    tags: ["Editorial", "UX writing", "Web"],
    figmaUrl: null,
    prototypeUrl: "https://embed.figma.com/proto/eqRQy3rA4X0neJvazufTIB/Turismo-sostenible?node-id=2017-4742&p=f&viewport=934%2C404%2C0.02&t=HJJ18AE8i4sX744O-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2017%3A4742&page-id=1%3A13&embed-host=share",
    heroImage: "/images/projects/Turismo-sostenible/principal.webp",
    gallery: [
      "/images/projects/Turismo-sostenible/Home.webp",
      "/images/projects/Turismo-sostenible/Select Room.webp",
      "/images/projects/Turismo-sostenible/Checkout.webp",
      "/images/projects/Turismo-sostenible/Reserva exitosa.webp",
    ],
    caseStudy: featuredTurismo,
  },
  {
    slug: "agrocash",
    featured: true,
    year: "2023",
    company: { es: "Fintech rural", en: "Rural fintech" },
    role: { es: "UX/UI Lead", en: "UX/UI Lead" },
    title: { es: "AgroCash", en: "AgroCash" },
    summary: {
      es: "Flujos financieros claros para operación en campo y confianza local.",
      en: "Clear financial flows for field operations and local trust.",
    },
    tags: ["Fintech", "Service design", "Accessibility"],
    figmaUrl: null,
    prototypeUrl: "https://embed.figma.com/proto/a7U3s366ZIXvXzse6lKh86/agrocash?node-id=9-28618&p=f&t=0WVS9DHOxP2u9w2w-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=9%3A28618&embed-host=share",
    heroImage: "/images/projects/AgroCash/Principal.webp",
    gallery: [
      "/images/projects/AgroCash/Sign Up.webp",
      "/images/projects/AgroCash/KYC - Pending.webp",
      "/images/projects/AgroCash/Scan Front Side.webp",
      "/images/projects/AgroCash/Scan Back Side.webp",
      "/images/projects/AgroCash/Personal Information.webp",
      "/images/projects/AgroCash/Portfolio.webp",
      "/images/projects/AgroCash/Whollet.webp",
      "/images/projects/AgroCash/Transactions.webp",
      "/images/projects/AgroCash/All Transaction.webp",
      "/images/projects/AgroCash/Filters open.webp",
      "/images/projects/AgroCash/Filtered.webp",
      "/images/projects/AgroCash/Specific Coin.webp",
      "/images/projects/AgroCash/Choose transaction type.webp",
      "/images/projects/AgroCash/Choose.webp",
      "/images/projects/AgroCash/Confirm.webp",
      "/images/projects/AgroCash/Keyboard.webp",
      "/images/projects/AgroCash/Withdrawal.webp",
      "/images/projects/AgroCash/Empty.webp",
      "/images/projects/AgroCash/3.webp",
      "/images/projects/AgroCash/4.webp",
      "/images/projects/AgroCash/5.webp",
      "/images/projects/AgroCash/6.webp",
      "/images/projects/AgroCash/7.webp",
      "/images/projects/AgroCash/8.webp",
      "/images/projects/AgroCash/9.webp",
      "/images/projects/AgroCash/10.webp",
      "/images/projects/AgroCash/11.webp",
      "/images/projects/AgroCash/12.webp",
      "/images/projects/AgroCash/13.webp",
    ],
    caseStudy: featuredAgro,
  },
  {
    slug: "bienestar-a-la-carta",
    featured: false,
    year: "2023",
    company: { es: "Wellbeing", en: "Wellbeing" },
    role: { es: "Product Designer", en: "Product Designer" },
    title: { es: "Bienestar a la Carta", en: "Bienestar a la Carta" },
    summary: {
      es: "Experiencia modular de bienestar con foco en claridad y personalización.",
      en: "Modular wellbeing experience focused on clarity and personalization.",
    },
    tags: ["Health", "UX"],
    figmaUrl: null,
    prototypeUrl: "https://embed.figma.com/proto/HZGwup476nu2R5kSuBkkm8/Bienestar-a-la-carta---Propuesta?node-id=1-5025&viewport=1560%2C2506%2C0.48&t=OFwIL2UMaxFVvnGB-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A5025&page-id=1%3A36&embed-host=share",
    prototypeAspect: 1512 / 1235,
    prototypeZoom: 1.12,
    heroImage: "/images/projects/Bienestar-a-la-carta/Principal.webp",
    heroCrop: "cover",
    galleryVariant: "desktop",
    gallery: [
      "/images/projects/Bienestar-a-la-carta/Categoría.webp",
      "/images/projects/Bienestar-a-la-carta/Filtros.webp",
      "/images/projects/Bienestar-a-la-carta/Listado.webp",
      "/images/projects/Bienestar-a-la-carta/Pago.webp",
    ],
    caseStudy: brief(
      "Bienestar a la Carta",
      "Bienestar a la Carta",
      "Personalización sin complejidad: control sin abrumar con opciones.",
      "Personalization without complexity—control without option overload.",
    ),
  },
  {
    slug: "hola-vivienda",
    featured: false,
    year: "2023",
    company: { es: "PropTech", en: "PropTech" },
    role: { es: "UX/UI", en: "UX/UI" },
    title: { es: "Hola Vivienda", en: "Hola Vivienda" },
    summary: {
      es: "Onboarding y exploración de inmuebles con foco en confianza y comparación.",
      en: "Onboarding and property exploration focused on trust and comparison.",
    },
    tags: ["PropTech", "UI"],
    figmaUrl: null,
    prototypeUrl: "https://embed.figma.com/proto/HkMYEet5BvGI3ndIsQ5Gqn/Hola-Vivienda---Arrendarte?node-id=180-57624&p=f&viewport=780%2C-8565%2C0.21&t=14pSwbePVIDGe4cw-1&scaling=contain&content-scaling=fixed&starting-point-node-id=180%3A57624&page-id=1%3A13&embed-host=share",
    prototypeAspect: 1440 / 1024,
    prototypeZoom: 1.12,
    heroImage: "/images/projects/Hola-vivienda/Principal.webp",
    heroCrop: "cover",
    galleryVariant: "desktop",
    gallery: [
      "/images/projects/Hola-vivienda/Login.webp",
      "/images/projects/Hola-vivienda/Desktop - 60.webp",
      "/images/projects/Hola-vivienda/Desktop - 62.webp",
      "/images/projects/Hola-vivienda/Desktop - 66.webp",
      "/images/projects/Hola-vivienda/Desktop - 69.webp",
    ],
    caseStudy: brief(
      "Hola Vivienda",
      "Hola Vivienda",
      "Reducir incertidumbre en etapas tempranas del funnel inmobiliario.",
      "Reduce uncertainty in early stages of the real-estate funnel.",
    ),
  },
  {
    slug: "un-asunto-de-dos",
    featured: false,
    year: "2022",
    company: { es: "Consumer", en: "Consumer" },
    role: { es: "Product Designer", en: "Product Designer" },
    title: { es: "Un asunto de dos", en: "Un asunto de dos" },
    summary: {
      es: "Producto consumer con narrativa emocional y flujos conversacionales.",
      en: "Consumer product with emotional narrative and conversational flows.",
    },
    tags: ["UX", "Storytelling"],
    figmaUrl: null,
    prototypeUrl: "https://embed.figma.com/proto/wmgn109JjfU4Uhz5CNeiXs/Un-asunto-de-dos---equilibradamente-Bienestar?node-id=7301-2&p=f&viewport=401%2C438%2C0.06&t=jyR0Kk796qwJlUqK-1&scaling=contain&content-scaling=fixed&starting-point-node-id=7301%3A2&page-id=1%3A13&embed-host=share",
    prototypeAspect: 1440 / 1024,
    prototypeZoom: 1.12,
    heroImage: "/images/projects/Un-asunto-de-dos/Principal.webp",
    heroCrop: "cover",
    galleryVariant: "desktop",
    gallery: [
      "/images/projects/Un-asunto-de-dos/Desktop - 2.webp",
      "/images/projects/Un-asunto-de-dos/Desktop - 3.webp",
      "/images/projects/Un-asunto-de-dos/Desktop - 4.webp",
      "/images/projects/Un-asunto-de-dos/Desktop - 5.webp",
      "/images/projects/Un-asunto-de-dos/Desktop - 7.webp",
    ],
    caseStudy: brief(
      "Un asunto de dos",
      "Un asunto de dos",
      "Equilibrar tono emocional con claridad de tareas para retención saludable.",
      "Balance emotional tone with task clarity for healthy retention.",
    ),
  },
  {
    slug: "avaluador-playground",
    featured: false,
    year: "2022",
    company: { es: "PropTech / Data", en: "PropTech / Data" },
    role: { es: "UX/UI", en: "UX/UI" },
    title: { es: "Avaluador de Inmuebles", en: "Avaluador de Inmuebles" },
    summary: {
      es: "Herramienta exploratoria para entender modelos de valuación con feedback inmediato.",
      en: "Exploratory tool to understand valuation models with immediate feedback.",
    },
    tags: ["UX", "Data viz"],
    figmaUrl: null,
    prototypeUrl: "https://embed.figma.com/proto/XtkvZjFQ8P0RvwDixj410p/Avaluador-_-Playground-_--120629.fig?node-id=1403-303808&p=f&t=dW4l28Lk9lx7XTCn-1&scaling=scale-down&content-scaling=fixed&page-id=3%3A121&starting-point-node-id=1403%3A303808&embed-host=share",
    prototypeAspect: 1920 / 1272,
    prototypeZoom: 1.12,
    heroImage: "/images/projects/Avaluador-inmuebles/Principal.webp",
    heroCrop: "cover",
    galleryVariant: "desktop",
    gallery: [
      "/images/projects/Avaluador-inmuebles/Publicación-nuevo-inmueble.webp",
      "/images/projects/Avaluador-inmuebles/Publicación-nuevo-inmueble (1).webp",
      "/images/projects/Avaluador-inmuebles/Publicación-nuevo-inmueble (2).webp",
      "/images/projects/Avaluador-inmuebles/Publicación-nuevo-inmueble (3).webp",
      "/images/projects/Avaluador-inmuebles/Datos de compra.webp",
      "/images/projects/Avaluador-inmuebles/Datos de compra (1).webp",
      "/images/projects/Avaluador-inmuebles/Pasarela de Pago Pay U.webp",
      "/images/projects/Avaluador-inmuebles/Pago exitoso.webp",
    ],
    caseStudy: brief(
      "Avaluador de Inmuebles",
      "Avaluador de Inmuebles",
      "Traducir modelos complejos a interacciones comprensibles para usuarios no técnicos.",
      "Translate complex models into understandable interactions for non-technical users.",
    ),
  },
  {
    slug: "davivienda-e-learning",
    featured: false,
    year: "2022",
    company: { es: "Davivienda", en: "Davivienda" },
    role: { es: "UX/UI", en: "UX/UI" },
    title: { es: "Davivienda E-learning", en: "Davivienda E-learning" },
    summary: {
      es: "Plataforma de aprendizaje con rutas claras, progreso visible y accesibilidad.",
      en: "Learning platform with clear paths, visible progress, and accessibility.",
    },
    tags: ["EdTech", "Enterprise"],
    figmaUrl: null,
    prototypeUrl: "https://embed.figma.com/proto/Vc8JnlxMQBGfUlqDquwYF7/Propuesta-Davivienda---Plataforma-E-learning?node-id=557-2301&p=f&t=XqeYowcXF6YGEe0E-1&scaling=scale-down-width&content-scaling=fixed&page-id=545%3A3&starting-point-node-id=557%3A2301&embed-host=share",
    prototypeAspect: 1440 / 1080,
    heroImage: "/images/projects/Davivienda-Elearning/Principal.webp",
    heroCrop: "cover",
    galleryVariant: "desktop",
    gallery: [
      "/images/projects/Davivienda-Elearning/Login.webp",
      "/images/projects/Davivienda-Elearning/Registro.webp",
      "/images/projects/Davivienda-Elearning/Dashboard alumno.webp",
      "/images/projects/Davivienda-Elearning/Cursos - oferta.webp",
      "/images/projects/Davivienda-Elearning/Datelles del curso.webp",
      "/images/projects/Davivienda-Elearning/Detalles del instructor.webp",
      "/images/projects/Davivienda-Elearning/Instructores.webp",
      "/images/projects/Davivienda-Elearning/Aplicar para ser instructor.webp",
    ],
    caseStudy: brief(
      "E-learning corporativo",
      "Corporate e-learning",
      "Reducir abandono con micro-lecciones y patrones consistentes.",
      "Reduce churn with micro-lessons and consistent patterns.",
    ),
  },
  {
    slug: "publicacion-inmueble",
    featured: false,
    year: "2021",
    company: { es: "PropTech", en: "PropTech" },
    role: { es: "Product Designer", en: "Product Designer" },
    title: { es: "Publicación de Inmueble", en: "Property publishing" },
    summary: {
      es: "Flujo guiado para publicar inmuebles con validaciones y claridad legal básica.",
      en: "Guided flow to publish properties with validations and basic legal clarity.",
    },
    tags: ["Forms", "PropTech"],
    figmaUrl: null,
    prototypeUrl: "https://embed.figma.com/proto/dXGc0Gp4cZqm1qvidAL2vZ/Publicaci%C3%B3n-de-inmueble-_-Playground-_--050623.fig?node-id=663-181991&p=f&t=2wxUXJsgWRzRkKsE-1&scaling=scale-down-width&content-scaling=fixed&page-id=3%3A121&starting-point-node-id=663%3A181306&embed-host=share",
    prototypeAspect: 1920 / 1272,
    prototypeZoom: 1.12,
    heroImage: "/images/projects/Publicacion-inmueble/Principal.webp",
    heroCrop: "cover",
    galleryVariant: "desktop",
    gallery: [
      "/images/projects/Publicacion-inmueble/Publicación-nuevo-inmueble.webp",
      "/images/projects/Publicacion-inmueble/Publicación-nuevo-inmueble (1).webp",
      "/images/projects/Publicacion-inmueble/Publicación-nuevo-inmueble (2).webp",
      "/images/projects/Publicacion-inmueble/Publicación-nuevo-inmueble (3).webp",
      "/images/projects/Publicacion-inmueble/Publicación-nuevo-inmueble (4).webp",
      "/images/projects/Publicacion-inmueble/Publicación-nuevo-inmueble (5).webp",
      "/images/projects/Publicacion-inmueble/Publicación-nuevo-inmueble (6).webp",
    ],
    caseStudy: brief(
      "Publicación de Inmueble",
      "Property publishing",
      "Formularios largos en pasos comprensibles con recuperación de contexto.",
      "Long forms split into understandable steps with context recovery.",
    ),
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return PROJECTS.filter((p) => p.featured);
}

export function getAllProjectSlugs() {
  return PROJECTS.map((p) => p.slug);
}
