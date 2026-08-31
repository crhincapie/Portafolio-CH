"use client";

import { useState, ReactNode } from "react";
import { useRouter } from "@/i18n/navigation";
import { PrototypeModal } from "@/components/case-study/PrototypeModal";
import type { Project } from "@/content/types";
import { pickLocale } from "@/content/i18n";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

interface ProjectCardClientProps {
  project: Project;
  children: ReactNode;
  featured?: boolean;
  className?: string;
}

// Contenido detallado de proyectos
const projectContent: Record<string, Record<string, Record<string, string>>> = {
  "balanc-funcional": {
    es: {
      problematic:
        "Los usuarios tenían dificultades para mantener hábitos saludables debido a baja motivación, experiencias fragmentadas y poca personalización.",
      solution:
        "Diseño de una experiencia digital personalizada para facilitar la adopción de hábitos mediante flujos guiados y decisiones basadas en comportamiento.",
      about:
        "Ecosistema digital de bienestar que combina personalización, guía y diseño conductual para acompañar al usuario en la construcción de hábitos.",
    },
    en: {
      problematic:
        "Users had difficulty maintaining healthy habits due to low motivation, fragmented experiences, and limited personalization.",
      solution:
        "Design of a personalized digital experience to facilitate habit adoption through guided flows and behavior-based decisions.",
      about:
        "Digital wellness ecosystem combining personalization, guidance, and behavioral design to support users in building sustainable habits.",
    },
  },
  "turismo-sostenible": {
    es: {
      problematic:
        "Los usuarios encontraban dificultades para descubrir y comparar experiencias sostenibles en un entorno confiable y fácil de explorar.",
      solution:
        "Diseño de una plataforma centrada en descubrimiento, comparación y confianza, utilizando UX estratégico y una experiencia orientada a exploración.",
      about:
        "Plataforma digital que conecta usuarios con experiencias sostenibles mediante una experiencia clara, exploratoria y centrada en la toma de decisión.",
    },
    en: {
      problematic:
        "Users found it difficult to discover and compare sustainable experiences in a trustworthy, easy-to-explore environment.",
      solution:
        "Design of a platform focused on discovery, comparison, and trust, using strategic UX and an exploration-oriented experience.",
      about:
        "Digital platform connecting users with sustainable experiences through a clear, exploratory, and decision-focused experience.",
    },
  },
  agrocash: {
    es: {
      problematic:
        "Los usuarios agrícolas enfrentaban barreras de acceso financiero por procesos complejos, baja familiaridad digital y servicios fragmentados.",
      solution:
        "Diseño de una solución agrotech-fintech enfocada en inclusión financiera, simplificación operativa y accesibilidad digital.",
      about:
        "Concepto fintech para facilitar el acceso financiero y la gestión operativa mediante servicios digitales simples, accesibles y escalables.",
    },
    en: {
      problematic:
        "Agricultural users faced financial access barriers due to complex processes, low digital familiarity, and fragmented services.",
      solution:
        "Design of an agrotech-fintech solution focused on financial inclusion, operational simplification, and digital accessibility.",
      about:
        "Fintech concept to facilitate financial access and operational management through simple, accessible, and scalable digital services.",
    },
  },
  "bienestar-a-la-carta": {
    es: {
      problematic:
        "Personalización sin complejidad: control sin abrumar con opciones.",
      solution:
        "Se alinearon negocio y usuarios con entregables incrementales y métricas claras de adopción, mediante benchmark, entrevistas y priorización por impacto/esfuerzo. Se iteró con prototipos navegables y validación continua con stakeholders.",
      about:
        "Resumen del proyecto: Bienestar a la Carta. Entrega lista para iteración con patrones compartidos. Velocidad sostenible nace de sistemas claros y comunicación honesta diseño–negocio.",
    },
    en: {
      problematic:
        "Personalization without complexity—control without option overload.",
      solution:
        "Business and users were aligned with incremental deliverables and clear adoption metrics, through benchmarking, interviews, and impact/effort prioritization to focus the roadmap. Iteration with navigable prototypes and continuous stakeholder validation.",
      about:
        "Project summary: Bienestar a la Carta. Delivery ready for iteration with shared patterns. Sustainable speed comes from clear systems and honest design–business communication.",
    },
  },
  "hola-vivienda": {
    es: {
      problematic:
        "Reducir incertidumbre en etapas tempranas del funnel inmobiliario.",
      solution:
        "Se alinearon negocio y usuarios con entregables incrementales y métricas claras de adopción, mediante benchmark, entrevistas y priorización por impacto/esfuerzo. Se iteró con prototipos navegables y validación continua con stakeholders.",
      about:
        "Resumen del proyecto: Hola Vivienda. Entrega lista para iteración con patrones compartidos. Velocidad sostenible nace de sistemas claros y comunicación honesta diseño–negocio.",
    },
    en: {
      problematic:
        "Reduce uncertainty in early stages of the real-estate funnel.",
      solution:
        "Business and users were aligned with incremental deliverables and clear adoption metrics, through benchmarking, interviews, and impact/effort prioritization to focus the roadmap. Iteration with navigable prototypes and continuous stakeholder validation.",
      about:
        "Project summary: Hola Vivienda. Delivery ready for iteration with shared patterns. Sustainable speed comes from clear systems and honest design–business communication.",
    },
  },
  "un-asunto-de-dos": {
    es: {
      problematic:
        "Equilibrar tono emocional con claridad de tareas para retención saludable.",
      solution:
        "Se alinearon negocio y usuarios con entregables incrementales y métricas claras de adopción, mediante benchmark, entrevistas y priorización por impacto/esfuerzo. Se iteró con prototipos navegables y validación continua con stakeholders.",
      about:
        "Resumen del proyecto: Un asunto de dos. Entrega lista para iteración con patrones compartidos. Velocidad sostenible nace de sistemas claros y comunicación honesta diseño–negocio.",
    },
    en: {
      problematic:
        "Balance emotional tone with task clarity for healthy retention.",
      solution:
        "Business and users were aligned with incremental deliverables and clear adoption metrics, through benchmarking, interviews, and impact/effort prioritization to focus the roadmap. Iteration with navigable prototypes and continuous stakeholder validation.",
      about:
        "Project summary: Un asunto de dos. Delivery ready for iteration with shared patterns. Sustainable speed comes from clear systems and honest design–business communication.",
    },
  },
  "avaluador-playground": {
    es: {
      problematic:
        "Traducir modelos complejos a interacciones comprensibles para usuarios no técnicos.",
      solution:
        "Se alinearon negocio y usuarios con entregables incrementales y métricas claras de adopción, mediante benchmark, entrevistas y priorización por impacto/esfuerzo. Se iteró con prototipos navegables y validación continua con stakeholders.",
      about:
        "Resumen del proyecto: Avaluador de Inmuebles. Entrega lista para iteración con patrones compartidos. Velocidad sostenible nace de sistemas claros y comunicación honesta diseño–negocio.",
    },
    en: {
      problematic:
        "Translate complex models into understandable interactions for non-technical users.",
      solution:
        "Business and users were aligned with incremental deliverables and clear adoption metrics, through benchmarking, interviews, and impact/effort prioritization to focus the roadmap. Iteration with navigable prototypes and continuous stakeholder validation.",
      about:
        "Project summary: Avaluador de Inmuebles. Delivery ready for iteration with shared patterns. Sustainable speed comes from clear systems and honest design–business communication.",
    },
  },
  "davivienda-e-learning": {
    es: {
      problematic:
        "Reducir abandono con micro-lecciones y patrones consistentes.",
      solution:
        "Se alinearon negocio y usuarios con entregables incrementales y métricas claras de adopción, mediante benchmark, entrevistas y priorización por impacto/esfuerzo. Se iteró con prototipos navegables y validación continua con stakeholders.",
      about:
        "Resumen del proyecto: E-learning corporativo. Entrega lista para iteración con patrones compartidos. Velocidad sostenible nace de sistemas claros y comunicación honesta diseño–negocio.",
    },
    en: {
      problematic:
        "Reduce churn with micro-lessons and consistent patterns.",
      solution:
        "Business and users were aligned with incremental deliverables and clear adoption metrics, through benchmarking, interviews, and impact/effort prioritization to focus the roadmap. Iteration with navigable prototypes and continuous stakeholder validation.",
      about:
        "Project summary: Corporate e-learning. Delivery ready for iteration with shared patterns. Sustainable speed comes from clear systems and honest design–business communication.",
    },
  },
  "publicacion-inmueble": {
    es: {
      problematic:
        "Formularios largos en pasos comprensibles con recuperación de contexto.",
      solution:
        "Se alinearon negocio y usuarios con entregables incrementales y métricas claras de adopción, mediante benchmark, entrevistas y priorización por impacto/esfuerzo. Se iteró con prototipos navegables y validación continua con stakeholders.",
      about:
        "Resumen del proyecto: Publicación de Inmueble. Entrega lista para iteración con patrones compartidos. Velocidad sostenible nace de sistemas claros y comunicación honesta diseño–negocio.",
    },
    en: {
      problematic:
        "Long forms split into understandable steps with context recovery.",
      solution:
        "Business and users were aligned with incremental deliverables and clear adoption metrics, through benchmarking, interviews, and impact/effort prioritization to focus the roadmap. Iteration with navigable prototypes and continuous stakeholder validation.",
      about:
        "Project summary: Property publishing. Delivery ready for iteration with shared patterns. Sustainable speed comes from clear systems and honest design–business communication.",
    },
  },
};

function getProjectContent(slug: string, type: "problematic" | "solution" | "about", locale: string): string {
  const content = projectContent[slug]?.[locale]?.[type];
  return content || "";
}

export function ProjectCardClient({ project, children, featured = false, className }: ProjectCardClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const t = useTranslations("projects");
  const locale = useLocale();

  const handleClick = (e: React.MouseEvent) => {
    const prototypeButton = (e.target as HTMLElement).closest("button[data-prototype]");
    const caseButton = (e.target as HTMLElement).closest("button[data-case]");
    const detailsButton = (e.target as HTMLElement).closest("button[data-details]");

    if (prototypeButton) {
      setIsModalOpen(true);
    } else if (caseButton && featured) {
      setIsFlipped((prev) => !prev);
    } else if (detailsButton) {
      router.push(`/projects/${project.slug}`);
    }
  };

  const handleFlipBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={cn("h-full", className)}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.6s ease-in-out",
          }}
        >
          {/* Front face */}
          <div
            className="h-full"
            style={{ backfaceVisibility: "hidden", pointerEvents: isFlipped ? "none" : "auto" }}
          >
            {children}
          </div>

          {/* Back face - Flip content */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: isFlipped ? "auto" : "none",
            }}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-2xl transition">
              {/* Scrollable content area */}
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
                <h3 className="text-lg font-semibold text-white">{pickLocale(locale, project.title)}</h3>
                
                {/* Problem */}
                <div>
                  <h4 className="text-sm font-semibold text-[#00feff] mb-2">{t("problem")}</h4>
                  <p className="text-xs leading-relaxed text-zinc-300">{getProjectContent(project.slug, "problematic", locale)}</p>
                </div>
                
                {/* Solution */}
                <div>
                  <h4 className="text-sm font-semibold text-[#00feff] mb-2">{t("solution")}</h4>
                  <p className="text-xs leading-relaxed text-zinc-300">{getProjectContent(project.slug, "solution", locale)}</p>
                </div>
                
                {/* About */}
                <div>
                  <h4 className="text-sm font-semibold text-[#00feff] mb-2">{t("aboutProject")}</h4>
                  <p className="text-xs leading-relaxed text-zinc-300">{getProjectContent(project.slug, "about", locale)}</p>
                </div>
              </div>

              {/* Back button */}
              <div className="flex items-center justify-center gap-3 border-t border-white/10 p-4">
                <button
                  data-case
                  onClick={handleFlipBack}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:border-[#00feff]/60 hover:text-[#00feff]"
                  title={t("back")}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{t("back")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <PrototypeModal
        isOpen={isModalOpen && !!project.prototypeUrl}
        onClose={() => setIsModalOpen(false)}
        prototypeUrl={project.prototypeUrl || ""}
        aspectRatio={project.prototypeAspect}
        zoom={project.prototypeZoom}
      />
    </>
  );
}
