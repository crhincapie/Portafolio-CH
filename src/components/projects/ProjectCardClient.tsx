"use client";

import { useState, ReactNode } from "react";
import { useRouter } from "@/i18n/navigation";
import { PrototypeModal } from "@/components/case-study/PrototypeModal";
import type { Project } from "@/content/types";
import { pickLocale } from "@/content/i18n";
import { useEffect } from "react";

interface ProjectCardClientProps {
  project: Project;
  children: ReactNode;
  featured?: boolean;
}

// Contenido detallado de proyectos
const projectContent: Record<string, Record<string, Record<string, string>>> = {
  "balanc-funcional": {
    es: {
      problematic:
        "Los usuarios presentaban dificultades para mantener hábitos saludables debido a experiencias fragmentadas, baja motivación, falta de personalización y escasa orientación conductual.",
      solution:
        "Diseño de una plataforma wellness enfocada en mejorar retención, engagement y adopción de hábitos saludables mediante flujos personalizados y experiencias emocionales.",
      about:
        "Ecosistema digital enfocado en bienestar y salud diseñado para mejorar hábitos saludables mediante experiencias guiadas, personalización y diseño orientado al comportamiento del usuario.",
    },
    en: {
      problematic:
        "Users faced difficulties maintaining healthy habits due to fragmented experiences, low motivation, lack of personalization, and poor behavioral guidance.",
      solution:
        "Design of a wellness platform focused on improving retention, engagement, and adoption of healthy habits through personalized flows and emotional experiences.",
      about:
        "Digital ecosystem focused on wellness and health designed to improve healthy habits through guided experiences, personalization, and user behavior-oriented design.",
    },
  },
  "turismo-sostenible": {
    es: {
      problematic:
        "Los usuarios interesados en turismo sostenible no contaban con una plataforma centralizada, intuitiva y confiable para descubrir, comparar y reservar experiencias eco-responsables.",
      solution:
        "Diseño de una plataforma escalable de turismo sostenible enfocada en mejorar el descubrimiento de destinos, conversión, confianza y engagement mediante UX estratégico y una interfaz moderna orientada a exploración.",
      about:
        "Plataforma digital enfocada en turismo sostenible diseñada para conectar usuarios con experiencias eco-conscientes, mejorando descubrimiento, interacción, intención de reserva y engagement digital mediante una experiencia inmersiva y centrada en el usuario.",
    },
    en: {
      problematic:
        "Users interested in sustainable tourism lacked a centralized, intuitive, and reliable platform to discover, compare, and book eco-responsible experiences.",
      solution:
        "Design of a scalable sustainable tourism platform focused on improving destination discovery, conversion, trust, and engagement through strategic UX and a modern exploration-oriented interface.",
      about:
        "Digital platform focused on sustainable tourism designed to connect users with eco-conscious experiences, improving discovery, interaction, booking intent, and digital engagement through an immersive, user-centered experience.",
    },
  },
  agrocash: {
    es: {
      problematic:
        "Los usuarios agrícolas presentan barreras de acceso a servicios financieros digitales debido a complejidad operativa, baja alfabetización digital y ecosistemas fragmentados.",
      solution:
        "Diseño de producto agrotech-fintech enfocado en inclusión financiera, simplificación operativa y accesibilidad digital para usuarios del sector agrícola.",
      about:
        "Concepto fintech/agrotech diseñado para facilitar acceso financiero y gestión operativa a usuarios agrícolas mediante servicios digitales simples, accesibles y escalables.",
    },
    en: {
      problematic:
        "Agricultural users face barriers to accessing digital financial services due to operational complexity, low digital literacy, and fragmented ecosystems.",
      solution:
        "Design of an agrotech-fintech product focused on financial inclusion, operational simplification, and digital accessibility for agricultural sector users.",
      about:
        "Fintech/agrotech concept designed to facilitate financial access and operational management for agricultural users through simple, accessible, and scalable digital services.",
    },
  },
};

function getProjectContent(slug: string, type: "problematic" | "solution" | "about", locale: string): string {
  const content = projectContent[slug]?.[locale]?.[type];
  return content || "";
}

export function ProjectCardClient({ project, children, featured = false }: ProjectCardClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [locale, setLocale] = useState("es");

  // Get locale from localStorage or detect
  useEffect(() => {
    const lang = localStorage.getItem("NEXT_LOCALE") || document.documentElement.lang || "es";
    setLocale(lang);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const prototypeButton = (e.target as HTMLElement).closest("button[data-prototype]");
    const caseButton = (e.target as HTMLElement).closest("button[data-case]");
    const detailsButton = (e.target as HTMLElement).closest("button[data-details]");

    if (prototypeButton) {
      setIsModalOpen(true);
    } else if (caseButton && featured) {
      setIsFlipped(!isFlipped);
    } else if (detailsButton) {
      router.push(`/projects/${project.slug}`);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.6s ease-in-out",
          }}
        >
          {/* Front face */}
          <div style={{ backfaceVisibility: "hidden" }}>
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
            }}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-2xl transition">
              {/* Scrollable content area */}
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
                <h3 className="text-lg font-semibold text-white">{pickLocale(locale, project.title)}</h3>
                
                {/* Problemática */}
                <div>
                  <h4 className="text-sm font-semibold text-[#00feff] mb-2">Problemática</h4>
                  <p className="text-xs leading-relaxed text-zinc-300">{getProjectContent(project.slug, "problematic", locale)}</p>
                </div>
                
                {/* Solución */}
                <div>
                  <h4 className="text-sm font-semibold text-[#00feff] mb-2">Solución</h4>
                  <p className="text-xs leading-relaxed text-zinc-300">{getProjectContent(project.slug, "solution", locale)}</p>
                </div>
                
                {/* Sobre el proyecto */}
                <div>
                  <h4 className="text-sm font-semibold text-[#00feff] mb-2">Sobre el proyecto</h4>
                  <p className="text-xs leading-relaxed text-zinc-300">{getProjectContent(project.slug, "about", locale)}</p>
                </div>
              </div>

              {/* Back button */}
              <div className="flex items-center justify-center gap-3 border-t border-white/10 p-4">
                <button
                  data-case
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:border-[#00feff]/60 hover:text-[#00feff]"
                  title="Volver"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Volver</span>
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
      />
    </>
  );
}
