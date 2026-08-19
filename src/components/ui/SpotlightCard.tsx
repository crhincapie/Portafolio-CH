"use client";

import { createContext, useContext, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface SpotlightContextValue {
  x: MotionValue<number>;
  y: MotionValue<number>;
  hovered: boolean;
}

const SpotlightContext = createContext<SpotlightContextValue | null>(null);

function useSpotlightCard(): SpotlightContextValue {
  const ctx = useContext(SpotlightContext);
  if (!ctx) throw new Error("useSpotlightCard must be used within <SpotlightCard>");
  return ctx;
}

function useSpotlightCardSafe(): SpotlightContextValue | null {
  return useContext(SpotlightContext);
}

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
  spotlightColor?: string;
  style?: CSSProperties;
}

export function SpotlightCard({
  children,
  className,
  spotlight = true,
  spotlightColor = "rgba(0,254,255,0.35)",
  style,
}: SpotlightCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const x = useSpring(px, { stiffness: 320, damping: 32, mass: 0.25 });
  const y = useSpring(py, { stiffness: 320, damping: 32, mass: 0.25 });

  const spotX = useTransform(x, (v) => `${v * 100}%`);
  const spotY = useTransform(y, (v) => `${v * 100}%`);
  const spotlightBg = useMotionTemplate`radial-gradient(circle at ${spotX} ${spotY}, ${spotlightColor} 0%, transparent 65%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onEnter = () => setHovered(true);
  const onLeave = () => {
    setHovered(false);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <SpotlightContext.Provider value={{ x, y, hovered }}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className={className}
        style={style}
      >
        {children}
        {spotlight && !reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: spotlightBg }}
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ opacity: { duration: 0.5, ease: "easeOut" } }}
          />
        )}
      </div>
    </SpotlightContext.Provider>
  );
}

export { useSpotlightCard, useSpotlightCardSafe };
