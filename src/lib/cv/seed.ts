import {
  CvVersion,
  CV_OFFICIAL_ID,
  Localized,
  CvJob,
} from "./types";

const L = (es: string, en: string): Localized => ({ es, en });

export const OFFICIAL_TOOLS = [
  { name: "Figma", logo: "figma.svg" },
  { name: "Maze", logo: "maze.svg" },
  { name: "Miro", logo: "miro.svg" },
  { name: "Adobe", logo: "adobe.svg" },
  { name: "HTML", logo: "html5.svg" },
  { name: "CSS", logo: "css.svg" },
  { name: "JavaScript", logo: "javascript.svg" },
  { name: "React", logo: "react.svg" },
  { name: "Angular", logo: "angular.svg" },
  { name: "Ionic", logo: "ionic.svg" },
  { name: "GitHub", logo: "github.svg" },
  { name: "Bitbucket", logo: "bitbucket.svg" },
  { name: "Claude", logo: "claude.svg" },
  { name: "Gemini", logo: "googlegemini.svg" },
  { name: "Copilot", logo: "copilot.svg" },
  { name: "GPT", logo: "openai.svg" },
  { name: "Power Autom.", logo: "powerautomate.svg" },
  { name: "n8n", logo: "n8n.svg" },
];

export const COMPANY_LOGOS = [
  "compensar.png",
  "adlldigitallab.png",
  "scotiabankcolpatria.png",
  "fitpal.png",
  "poligran.png",
  "cen.png",
  "coursera.png",
  "santander.png",
];

const JOBS: CvJob[] = [
  {
    id: "compensar",
    logo: "compensar.png",
    role: L("Product Designer Senior", "Senior Product Designer"),
    company: L("Compensar", "Compensar"),
    dates: L("Sep 2023 - Mayo 2026", "Sep 2023 - May 2026"),
    location: L("Bogotá · Col.", "Bogotá · Col."),
    bullets: [
      L(
        "Lideré iniciativas de **diseño y evolución** de productos digitales, conectando necesidades de usuarios, objetivos de negocio y viabilidad tecnológica.",
        "Led **design and evolution** initiatives for digital products, connecting user needs, business objectives, and technical feasibility.",
      ),
      L(
        "Diseño experiencias **end-to-end**: desde investigación y arquitectura de información hasta user flows, prototipos, interfaces de alta fidelidad, validación y evolución del producto.",
        "Design **end-to-end** experiences: from research and information architecture to user flows, prototypes, high-fidelity interfaces, validation, and product evolution.",
      ),
      L(
        "Trabajo con equipos multidisciplinarios y stakeholders para transformar problemas de negocio y necesidades de usuario en **soluciones digitales claras y accionables**.",
        "Work with cross-functional teams and stakeholders to transform business problems and user needs into **clear, actionable digital solutions**.",
      ),
      L(
        "Diseño y evoluciono **Design Systems**, creando patrones y componentes reutilizables que favorecen consistencia, escalabilidad y eficiencia del producto.",
        "Design and evolve **Design Systems**, creating reusable patterns and components that support consistency, scalability, and product efficiency.",
      ),
      L(
        "Utilizo investigación, **analítica digital** y comportamiento de usuarios para identificar oportunidades y orientar decisiones de diseño.",
        "Use research, **digital analytics**, and user behavior to identify opportunities and guide design decisions.",
      ),
      L(
        "Facilito **workshops** y sesiones colaborativas para alinear equipos, explorar alternativas y definir soluciones.",
        "Facilitate **workshops** and collaborative sessions to align teams, explore alternatives, and define solutions.",
      ),
      L(
        "Administro y optimizo plataformas digitales utilizadas por **más de 300 usuarios**, identificando oportunidades de mejora en experiencia, adopción y eficiencia operativa.",
        "Manage and optimize digital platforms used by **more than 300 users**, identifying opportunities to improve experience, adoption, and operational efficiency.",
      ),
      L(
        "Exploro y aplico herramientas de **Inteligencia Artificial** — incluyendo Copilot, Gemini y Claude — para acelerar investigación, ideación, documentación y procesos de diseño.",
        "Explore and apply **Artificial Intelligence** tools — including Copilot, Gemini, and Claude — to accelerate research, ideation, documentation, and design processes.",
      ),
      L(
        "Diseño automatizaciones con **Power Automate y n8n** para optimizar procesos internos y reducir tareas operativas.",
        "Design automations with **Power Automate and n8n** to streamline internal processes and reduce operational workload.",
      ),
    ],
  },
  {
    id: "adl",
    logo: "adlldigitallab.png",
    role: L("Diseñador UX/UI Senior", "Senior UX/UI Designer"),
    company: L("ADL Digital Lab", "ADL Digital Lab"),
    dates: L("Jun 2022 - Jul 2023", "Jun 2022 - Jul 2023"),
    location: L("Bogotá · Col.", "Bogotá · Col."),
    bullets: [
      L(
        "Lideré proyectos de **UX/UI web y mobile**, participando en todo el proceso, desde discovery hasta implementación.",
        "Led **web and mobile UX/UI** projects, contributing across the entire process, from discovery to implementation.",
      ),
      L(
        "Transformé necesidades de usuarios y objetivos comerciales en **user flows, arquitectura de información, wireframes, prototipos y UI de alta fidelidad**.",
        "Transformed user needs and business goals into **user flows, information architecture, wireframes, prototypes, and high-fidelity UI**.",
      ),
      L(
        "Ejecuté **investigación con usuarios** y pruebas de usabilidad para validar hipótesis, detectar fricciones y orientar decisiones de diseño.",
        "Conducted **user research** and usability testing to validate hypotheses, identify friction points, and guide design decisions.",
      ),
      L(
        "Diseñé experiencias enfocadas en **usabilidad, conversión y claridad de interacción**, equilibrando necesidades de usuario y objetivos de negocio.",
        "Designed experiences focused on **usability, conversion, and interaction clarity**, balancing user needs with business goals.",
      ),
      L(
        "Colaboré directamente con equipos de **producto, negocio y desarrollo** para asegurar la viabilidad técnica y la correcta implementación de las soluciones.",
        "Collaborated directly with **product, business, and development** teams to ensure technical feasibility and proper implementation of the solutions.",
      ),
      L(
        "Analicé **comportamiento de usuarios** y métricas de desempeño para identificar oportunidades de optimización y evolución del producto.",
        "Analyzed **user behavior** and performance metrics to identify opportunities for product optimization and evolution.",
      ),
      L(
        "Incorporé herramientas de **Inteligencia Artificial** en procesos de ideación, exploración y documentación para acelerar el ciclo de diseño.",
        "Integrated **Artificial Intelligence** tools into ideation, exploration, and documentation processes to accelerate the design cycle.",
      ),
    ],
  },
  {
    id: "scotiabank",
    logo: "scotiabankcolpatria.png",
    role: L("Diseñador UX/UI Senior", "Senior UX/UI Designer"),
    company: L("Scotiabank Colpatria", "Scotiabank Colpatria"),
    dates: L("Ago 2021 - Mayo 2022", "Aug 2021 - May 2022"),
    location: L("Bogotá · Col.", "Bogotá · Col."),
    bullets: [
      L(
        "Diseñé y optimicé experiencias digitales para **productos financieros web y mobile**, trabajando flujos y necesidades de alta sensibilidad para el usuario.",
        "Designed and optimized digital experiences for **web and mobile financial products**, working on highly sensitive flows and user needs.",
      ),
      L(
        "Lideré **investigaciones, pruebas de usabilidad y validaciones funcionales** para identificar fricciones y mejorar la experiencia digital.",
        "Led **research, usability testing, and functional validation** to identify friction points and improve the digital experience.",
      ),
      L(
        "Definí **user flows, arquitectura de información y prototipos de alta fidelidad**, traduciendo necesidades de usuario y negocio en soluciones digitales.",
        "Defined **user flows, information architecture, and high-fidelity prototypes**, translating user and business needs into digital solutions.",
      ),
      L(
        "Colaboré con equipos de **producto, tecnología y negocio** para evolucionar continuamente los canales digitales.",
        "Collaborated with **product, technology, and business** teams to continuously evolve digital channels.",
      ),
      L(
        "Analicé **métricas y comportamiento de usuarios** para identificar oportunidades de mejora y priorizar decisiones de diseño.",
        "Analyzed **metrics and user behavior** to identify improvement opportunities and prioritize design decisions.",
      ),
      L(
        "Acompañé la **implementación con equipos de desarrollo**, asegurando la correcta interpretación y calidad de las soluciones diseñadas.",
        "Supported **implementation alongside development teams**, ensuring the correct interpretation and quality of the designed solutions.",
      ),
    ],
  },
  {
    id: "fitpal",
    logo: "fitpal.png",
    role: L("Diseñador Front End", "Front-End Designer"),
    company: L("Fitpal SAS", "Fitpal SAS"),
    dates: L("Mar 2018 - Ago 2021", "Mar 2018 - Aug 2021"),
    location: L("Bogotá · Col.", "Bogotá · Col."),
    bullets: [
      L(
        "Diseñé y desarrollé experiencias digitales para **plataformas web y aplicaciones móviles**, conectando UX/UI con implementación Front-End.",
        "Designed and developed digital experiences for **web platforms and mobile applications**, bridging UX/UI and Front-End implementation.",
      ),
      L(
        "Definí **flujos de usuario y experiencias de producto** en colaboración con equipos de negocio y tecnología.",
        "Defined **user flows and product experiences** in collaboration with business and technology teams.",
      ),
      L(
        "Construí **interfaces y componentes reutilizables** orientados a consistencia visual y eficiencia de desarrollo.",
        "Built **reusable interfaces and components** focused on visual consistency and development efficiency.",
      ),
      L(
        "Desarrollé soluciones utilizando **React, Angular, Ionic, HTML, CSS y JavaScript**.",
        "Developed solutions using **React, Angular, Ionic, HTML, CSS, and JavaScript**.",
      ),
      L(
        "Construí **landing pages y experiencias digitales orientadas a conversión**.",
        "Built **conversion-focused landing pages and digital experiences**.",
      ),
    ],
  },
];

export const OFFICIAL_VERSION: CvVersion = {
  id: CV_OFFICIAL_ID,
  name: "Oficial (versión pública)",
  createdAt: 0,
  updatedAt: 0,
  readOnly: true,
  data: {
    identity: {
      name: "Cristian Hincapié",
      role: L("Senior Product Designer", "Senior Product Designer"),
      role2: L("Design & UX/UI Lead", "Design & UX/UI Lead"),
      chips: ["UX/UI", "Digital Products", "Design Systems"],
      tagline: L(
        "8+ años diseñando productos digitales y experiencias centradas en las personas, conectando estrategia, UX, UI, tecnología y negocio.",
        "8+ years designing digital products and human-centered experiences, connecting strategy, UX, UI, technology, and business.",
      ),
    },
    contact: {
      email: "c.hincapie.design@gmail.com",
      phone: "(+57) 310 750 2995",
      location: L("Bogotá, Colombia", "Bogotá, Colombia"),
    },
    profile: [
      L(
        "Diseñador de producto con **más de 8 años de experiencia** creando y evolucionando productos digitales, plataformas web y experiencias centradas en las personas. Combino **UX · UI · Product Design · Service Design** para transformar necesidades de usuarios y negocio en experiencias digitales claras, útiles y viables.",
        "Product Designer with **over 8 years of experience** creating and evolving digital products, web platforms, and human-centered experiences. I combine **UX · UI · Product Design · Service Design** to transform user and business needs into clear, useful, and viable digital experiences.",
      ),
      L(
        "He participado en procesos **end-to-end**: desde discovery, investigación y definición de flujos, hasta prototipado, diseño de interfaces, **Design Systems**, validación y acompañamiento de implementación.",
        "I have worked across **end-to-end** processes: from discovery, research, and flow definition to prototyping, interface design, **Design Systems**, validation, and implementation support.",
      ),
      L(
        "Trabajo de forma cercana con equipos de **producto, tecnología y negocio** para convertir problemas complejos en soluciones simples y escalables.",
        "I work closely with **product, technology, and business** teams to turn complex problems into simple, scalable solutions.",
      ),
      L(
        "Mi experiencia en **Design Systems, analítica digital, Front-End e Inteligencia Artificial aplicada al diseño** me permite conectar la intención del diseño con su implementación y evolución en producto.",
        "My experience in **Design Systems, digital analytics, Front-End, and Artificial Intelligence applied to design** allows me to connect design intent with its implementation and product evolution.",
      ),
    ],
    skills: [
      {
        title: L("Producto & Diseño", "Product & Design"),
        tags: [
          { text: "Product Strategy", highlight: true },
          { text: "Product Discovery", highlight: true },
          { text: "UX Design", highlight: false },
          { text: "UI Design", highlight: false },
          { text: "Interaction Design", highlight: false },
          { text: "Information Architecture", highlight: false },
          { text: "User Flows", highlight: false },
          { text: "Wireframing", highlight: false },
          { text: "Prototyping", highlight: false },
          { text: "Usability Testing", highlight: false },
          { text: "Design Systems", highlight: true },
          { text: "Responsive", highlight: false },
          { text: "Mobile", highlight: false },
        ],
      },
      {
        title: L("Research & Validación", "Research & Validation"),
        tags: [
          { text: "User Research", highlight: true },
          { text: "Usability Testing", highlight: false },
          { text: "Qualitative Research", highlight: false },
          { text: "Benchmarking", highlight: false },
          { text: "Journey Mapping", highlight: false },
          { text: "Data-informed Design", highlight: false },
          { text: "Digital Analytics", highlight: false },
        ],
      },
      {
        title: L("IA aplicada", "Applied AI"),
        tags: [
          { text: "AI-assisted Research", highlight: true },
          { text: "AI-assisted Ideation", highlight: true },
        ],
      },
    ],
    tools: OFFICIAL_TOOLS,
    social: {
      linkedin: "https://www.linkedin.com/in/cristian-camilo-hincapie-ciro",
      portfolio: "https://portafolio-ch.vercel.app/",
    },
    languages: [
      { name: L("Español", "Spanish"), level: L("Nativo", "Native"), percent: 100 },
      { name: L("Inglés", "English"), level: L("Intermedio · B1", "Intermediate · B1"), percent: 55 },
    ],
    references: [
      {
        initials: "JT",
        name: "Julian Torres Gomez",
        role: L("CEO y Fundador", "CEO & Founder"),
        company: "Ontop",
        phone: "+1 (786) 922-1385",
      },
      {
        initials: "YA",
        name: "Yasmin Ayala Torres",
        role: L("Profesional Senior Innovación", "Senior Innovation Professional"),
        company: "Compensar",
        phone: "+1 (786) 922-1385",
      },
      {
        initials: "EF",
        name: "Edwin Nayib Fuentes",
        role: L("Líder de Tecnología", "Technology Lead"),
        company: "Ontop",
        phone: "300 871 8408",
      },
      {
        initials: "BF",
        name: "Brayhan Farid Garcia",
        role: L("Diseñador UI", "UI Designer"),
        company: "Evertec",
        phone: "319 257 9562",
      },
    ],
    education: [
      {
        logo: "poligran.png",
        title: L("Politécnico Gran Colombiano", "Politécnico Gran Colombiano"),
        subtitle: L("Diseño Gráfico Profesional", "Professional Graphic Design"),
        date: L("Marzo 2019", "March 2019"),
      },
      {
        initials: "CEN",
        title: L("Cenigraf", "Cenigraf"),
        subtitle: L("Productor Multimedia", "Multimedia Producer"),
        date: L("Noviembre 2016", "November 2016"),
      },
      {
        logo: "coursera.png",
        title: L("Coursera", "Coursera"),
        subtitle: L("Fundamentos UX", "UX Fundamentals"),
        date: L("Junio 2022", "June 2022"),
      },
      {
        logo: "santander.png",
        title: L("Santander Open Academy", "Santander Open Academy"),
        subtitle: L(
          "Gestión de Proyectos y Fundamentos de metodología Agile",
          "Project Management & Agile Fundamentals",
        ),
        date: L("2026", "2026"),
      },
      {
        logo: "santander.png",
        title: L("Santander Open Academy", "Santander Open Academy"),
        subtitle: L(
          "Google: Inteligencia Artificial y productividad",
          "Google: Artificial Intelligence & Productivity",
        ),
        date: L("2026", "2026"),
      },
    ],
    experience: JOBS,
  },
};