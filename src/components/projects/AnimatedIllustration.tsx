"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import { useSpotlightCardSafe } from "@/components/ui/SpotlightCard";
import {
  VectorIllustration,
  hasVectorIllustration,
} from "@/components/projects/illustrations";
import { cn } from "@/lib/utils";

interface AnimatedIllustrationProps {
  slug: string;
  title: string;
  className?: string;
}

interface AnimPreset {
  /** Movimiento base, siempre activo (bucle que nunca se reinicia). */
  idle: TargetAndTransition;
  idleTransition: Transition;
  /** Extra al hover: arranca en 0 → entra/sale suave, sin saltos. */
  hover: TargetAndTransition;
  hoverTransition: Transition;
  /** Intensidad del parallax que sigue al mouse. */
  parallaxX: number;
  parallaxY: number;
  /** Cómo "llega" la ilustración al entrar en pantalla. */
  entrance: EntranceKey;
}

type EntranceKey =
  | "none"
  | "fade"
  | "rise-spring"
  | "slide-left"
  | "slide-right"
  | "swing-in"
  | "construct"
  | "construct-bounce";

const SETTLE_T: Transition = {
  x: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  rotate: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const ZERO: TargetAndTransition = { x: "0%", y: "0%", rotate: 0, scale: 1 };

// Cada proyecto tiene una animación distinta, inspirada en LottieLab:
// entradas con bounce/slide/swing/construct y bucles propios (flotar, recorrer,
// balancear, orbitar). Todo es traslación + rotación (sin zoom continuo) y la
// imagen conserva su tamaño original.
const PRESETS: Record<string, AnimPreset> = {
  // BalanC Funcional → flotación orgánica (UI flotando en la app)
  "balanc-funcional": {
    idle: {
      x: ["0%", "-2.4%", "1.8%", "0%"],
      y: ["0%", "1.8%", "-2.2%", "0%"],
      rotate: [0, 0.35, -0.25, 0],
    },
    idleTransition: {
      x: { duration: 14, repeat: Infinity, ease: "easeInOut" as const },
      y: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
      rotate: { duration: 17, repeat: Infinity, ease: "easeInOut" as const },
    },
    hover: {
      x: ["0%", "-5%", "4%", "0%"],
      y: ["0%", "3.6%", "-4.6%", "0%"],
      rotate: [0, 0.8, -0.6, 0],
    },
    hoverTransition: {
      x: { duration: 6.5, repeat: Infinity, ease: "easeInOut" as const },
      y: { duration: 8.5, repeat: Infinity, ease: "easeInOut" as const },
      rotate: { duration: 11, repeat: Infinity, ease: "easeInOut" as const },
    },
    parallaxX: 30,
    parallaxY: 20,
    entrance: "rise-spring",
  },

  // Turismo Sostenible → recorrido horizontal (el paisaje avanza)
  "turismo-sostenible": {
    idle: {
      x: ["0%", "-9%", "-3%", "8%", "0%"],
      y: ["0%", "1.4%", "-1.1%", "0.9%", "0%"],
    },
    idleTransition: {
      x: { duration: 19, repeat: Infinity, ease: "easeInOut" as const },
      y: { duration: 15, repeat: Infinity, ease: "easeInOut" as const },
    },
    hover: {
      x: ["0%", "-12%", "0%", "12%", "0%"],
      y: ["0%", "2.2%", "-1.6%", "1.8%", "0%"],
    },
    hoverTransition: {
      x: { duration: 9, repeat: Infinity, ease: "easeInOut" as const },
      y: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
    },
    parallaxX: 40,
    parallaxY: 14,
    entrance: "slide-left",
  },

  // AgroCash → crecimiento (brota desde abajo con bounce)
  agrocash: {
    idle: {
      y: ["0%", "-2.2%", "0%"],
      x: ["0%", "-1%", "1%", "0%"],
    },
    idleTransition: {
      y: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
      x: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
    },
    hover: {
      y: ["0%", "-5%", "0%"],
      x: ["0%", "-2.5%", "2.5%", "0%"],
    },
    hoverTransition: {
      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const },
      x: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
    },
    parallaxX: 26,
    parallaxY: 18,
    entrance: "construct",
  },

  // Bienestar a la carta → balanceo (como una balanza)
  "bienestar-a-la-carta": {
    idle: {
      rotate: [0, 1.4, -1.4, 0],
      x: ["0%", "-1.8%", "1.8%", "0%"],
    },
    idleTransition: {
      rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" as const },
      x: { duration: 13, repeat: Infinity, ease: "easeInOut" as const },
    },
    hover: {
      rotate: [0, 3, -3, 0],
      x: ["0%", "-4%", "4%", "0%"],
    },
    hoverTransition: {
      rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const },
      x: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
    },
    parallaxX: 34,
    parallaxY: 26,
    entrance: "swing-in",
  },

  // Avaluador Playground → construcción (las piezas saltan a su lugar)
  "avaluador-playground": {
    idle: {
      y: ["0%", "1.5%", "0%"],
      x: ["0%", "-1.3%", "1.3%", "0%"],
    },
    idleTransition: {
      y: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
      x: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
    },
    hover: {
      y: ["0%", "3.2%", "0%"],
      x: ["0%", "-3%", "3%", "0%"],
    },
    hoverTransition: {
      y: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
      x: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
    },
    parallaxX: 28,
    parallaxY: 20,
    entrance: "construct-bounce",
  },

  // Publicación Inmueble → órbita (la propiedad en un recorrido circular)
  "publicacion-inmueble": {
    idle: {
      x: ["0%", "4.2%", "0%", "-4.2%", "0%"],
      y: ["0%", "-2.8%", "0%", "2.8%", "0%"],
    },
    idleTransition: {
      x: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
      y: { duration: 16, repeat: Infinity, ease: "easeInOut" as const },
    },
    hover: {
      x: ["0%", "7.5%", "0%", "-7.5%", "0%"],
      y: ["0%", "-5%", "0%", "5%", "0%"],
    },
    hoverTransition: {
      x: { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const },
      y: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
    },
    parallaxX: 42,
    parallaxY: 30,
    entrance: "slide-right",
  },
};

const ENTRANCE: Record<EntranceKey, { hidden: TargetAndTransition; visible: TargetAndTransition; transition: Transition }> = {
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0.01 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
  "rise-spring": {
    hidden: { opacity: 0, y: "30%" },
    visible: { opacity: 1, y: "0%" },
    transition: { type: "spring", bounce: 0.4, duration: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: "-16%" },
    visible: { opacity: 1, x: "0%" },
    transition: { type: "spring", bounce: 0.3, duration: 0.9 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: "16%" },
    visible: { opacity: 1, x: "0%" },
    transition: { type: "spring", bounce: 0.3, duration: 0.9 },
  },
  "swing-in": {
    hidden: { opacity: 0, rotate: -8 },
    visible: { opacity: 1, rotate: 0 },
    transition: { type: "spring", bounce: 0.45, duration: 1 },
  },
  construct: {
    hidden: { opacity: 0, y: "60%", scale: 0.96 },
    visible: { opacity: 1, y: "0%", scale: 1 },
    transition: { type: "spring", bounce: 0.45, duration: 1 },
  },
  "construct-bounce": {
    hidden: { opacity: 0, y: "65%", scale: 0.95 },
    visible: { opacity: 1, y: "0%", scale: 1 },
    transition: { type: "spring", bounce: 0.65, duration: 1.1 },
  },
};

export function AnimatedIllustration({ slug, title, className }: AnimatedIllustrationProps) {
  const ctx = useSpotlightCardSafe();
  const hovered = ctx?.hovered ?? false;
  const reduce = useReducedMotion();
  const preset = PRESETS[slug] ?? PRESETS["balanc-funcional"];
  const entrance = ENTRANCE[preset.entrance];
  const vector = hasVectorIllustration(slug);

  const fallback = useMotionValue(0.5);
  const mx = ctx?.x ?? fallback;
  const my = ctx?.y ?? fallback;

  const parX = useTransform(mx, (v) => (v - 0.5) * -preset.parallaxX);
  const parY = useTransform(my, (v) => (v - 0.5) * -preset.parallaxY);

  return (
    <motion.div
      className={cn("absolute inset-0 overflow-hidden", className)}
      initial={reduce ? false : entrance.hidden}
      whileInView={reduce ? undefined : entrance.visible}
      viewport={{ once: true, margin: "-40px" }}
      transition={entrance.transition}
    >
      {/* Parallax que sigue al mouse */}
      <motion.div
        className="absolute -inset-[20%]"
        style={ctx && !reduce ? { x: parX, y: parY, willChange: "transform" } : { willChange: "transform" }}
      >
        {/* Bucle base: keyframes fijos → nunca se reinicia, sin parpadeo */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={reduce ? ZERO : preset.idle}
          transition={preset.idleTransition}
          style={{ willChange: "transform" }}
        >
          {/* Extra al hover: parte desde 0 → entra/sale de forma suave */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={reduce ? ZERO : hovered ? preset.hover : ZERO}
            transition={hovered ? preset.hoverTransition : SETTLE_T}
            style={{ willChange: "transform" }}
          >
            {vector ? (
              <VectorIllustration slug={slug} />
            ) : (
              <Image
                src={`/images/projects/${slug}.webp`}
                alt={title}
                fill
                priority={false}
                quality={90}
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Velo oscuro que se levanta al hover: la ilustración "prende" */}
      <div
        className="pointer-events-none absolute inset-0 bg-zinc-950/50 transition-opacity duration-700"
        style={{ opacity: hovered ? 0 : 1 }}
      />

      {/* Viñeta para profundidad */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, transparent 45%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </motion.div>
  );
}
