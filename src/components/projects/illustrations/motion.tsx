"use client";

/*
 * Lenguaje de movimiento inspirado en LottieLab (lottielab.com).
 *
 * Sus ilustraciones (Bento Blocks, Data, Statistics widget, Integrations)
 * comparten un mismo toolkit de animación:
 *   - Cada elemento es una capa independiente con su propia línea de tiempo.
 *   - Entradas escalonadas con easing "natural" (acelera y frena como la
 *     fricción/gravedad) y bounce (resorte).
 *   - Líneas que se "dibujan" (trim path: sweep start/end/offset).
 *   - Barras que crecen, medidores que se llenan, scan beams, pings.
 *   - Bucles continuos suaves + respuesta al hover (intensificación).
 */

import {
  motion,
  useReducedMotion,
  type MotionStyle,
  type TargetAndTransition,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";
import { useSpotlightCardSafe } from "@/components/ui/SpotlightCard";

/** Presets de easing de LottieLab. */
export const EASE = {
  /** Fricción natural: arranca despacio, acelera y frena al final. */
  natural: [0.22, 1, 0.36, 1] as const,
  /** Arranque lento que acelera (gravedad). */
  accelerate: [0.55, 0, 1, 0.45] as const,
  /** Arranque rápido que frena. */
  slowDown: [0, 0, 0.2, 1] as const,
  linear: [0, 0, 1, 1] as const,
};

export const springIn = (delay = 0): Transition => ({
  type: "spring",
  bounce: 0.55,
  duration: 0.8,
  delay,
});

export const naturalIn = (delay = 0): Transition => ({
  duration: 0.9,
  ease: EASE.natural,
  delay,
});

export type EnterKind =
  | "fade"
  | "pop"
  | "rise"
  | "drop"
  | "slideL"
  | "slideR"
  | "swing"
  | "draw";

/** Variantes de entrada al estilo LottieLab (escalonadas con delay). */
export const enterVariants = (kind: EnterKind, delay = 0): Variants => {
  switch (kind) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.8, ease: EASE.natural, delay } },
      };
    case "pop":
      return {
        hidden: { opacity: 0, scale: 0.5 },
        show: { opacity: 1, scale: 1, transition: springIn(delay) },
      };
    case "rise":
      return {
        hidden: { opacity: 0, y: 44 },
        show: { opacity: 1, y: 0, transition: { ...naturalIn(delay), duration: 0.95 } },
      };
    case "drop":
      return {
        hidden: { opacity: 0, y: -44 },
        show: { opacity: 1, y: 0, transition: springIn(delay) },
      };
    case "slideL":
      return {
        hidden: { opacity: 0, x: -44 },
        show: { opacity: 1, x: 0, transition: { ...naturalIn(delay), duration: 0.9 } },
      };
    case "slideR":
      return {
        hidden: { opacity: 0, x: 44 },
        show: { opacity: 1, x: 0, transition: { ...naturalIn(delay), duration: 0.9 } },
      };
    case "swing":
      return {
        hidden: { opacity: 0, rotate: -12, scale: 0.85 },
        show: { opacity: 1, rotate: 0, scale: 1, transition: springIn(delay) },
      };
    case "draw":
      return {
        hidden: { opacity: 0, pathLength: 0 },
        show: {
          opacity: 1,
          pathLength: 1,
          transition: { duration: 1.3, ease: EASE.natural, delay },
        },
      };
  }
};

const NEUTRAL: TargetAndTransition = { x: 0, y: 0, scale: 1, rotate: 0 };

interface ElemProps {
  /** Variantes de entrada (hidden → show), escalonadas por la escena. */
  enter: Variants;
  /** Bucle continuo (se activa tras la entrada). */
  loop?: TargetAndTransition;
  loopT?: Transition;
  /** Movimiento extra al hacer hover en la card. */
  hover?: TargetAndTransition;
  hoverT?: Transition;
  style?: MotionStyle;
  children: ReactNode;
}

/**
 * Capa vectorial: entrada (variants) → bucle continuo → respuesta al hover.
 * Es la unidad equivalente a una capa en el timeline de LottieLab.
 */
export function Elem({ enter, loop, loopT, hover, hoverT, style, children }: ElemProps) {
  const reduce = useReducedMotion();
  return (
    <motion.g variants={enter} style={style}>
      <motion.g
        initial={false}
        animate={reduce ? undefined : loop}
        transition={loopT}
        style={{ willChange: "transform" }}
      >
        {hover ? (
          <HoverWrap hover={hover} hoverT={hoverT}>
            {children}
          </HoverWrap>
        ) : (
          children
        )}
      </motion.g>
    </motion.g>
  );
}

function HoverWrap({
  hover,
  hoverT,
  children,
}: {
  hover: TargetAndTransition;
  hoverT?: Transition;
  children: ReactNode;
}) {
  const ctx = useSpotlightCardSafe();
  const reduce = useReducedMotion();
  const hovered = ctx?.hovered ?? false;
  return (
    <motion.g
      initial={false}
      animate={!reduce && hovered ? hover : NEUTRAL}
      transition={hoverT ?? { duration: 0.6, ease: EASE.natural }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.g>
  );
}

interface SceneProps {
  children: ReactNode;
}

/**
 * Raíz de cada escena: SVG de 800×600 que cubre la card (slice) y orquesta
 * la entrada escalonada de todas las capas (whileInView, una sola vez).
 */
export function Scene({ children }: SceneProps) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <motion.g
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, margin: "-40px" }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.g>
    </svg>
  );
}
