"use client";

import { createContext, useContext, useEffect, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface ParallaxValue {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const ParallaxContext = createContext<ParallaxValue | null>(null);

function useParallax(): ParallaxValue {
  const ctx = useContext(ParallaxContext);
  if (!ctx) throw new Error("useParallax must be used within <ParallaxProvider>");
  return ctx;
}

const SPRING = { stiffness: 90, damping: 20, mass: 0.5 };

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const x = useSpring(nx, SPRING);
  const y = useSpring(ny, SPRING);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      nx.set(e.clientX / window.innerWidth - 0.5);
      ny.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });

    const coarse = window.matchMedia("(pointer: coarse)");
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      nx.set(Math.max(-0.5, Math.min(0.5, e.gamma / 90)));
      ny.set(Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 90)));
    };
    let gyro = false;
    if (coarse.matches && typeof window.DeviceOrientationEvent !== "undefined") {
      window.addEventListener("deviceorientation", onOrientation);
      gyro = true;
    }

    return () => {
      window.removeEventListener("pointermove", move);
      if (gyro) window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [nx, ny]);

  return <ParallaxContext.Provider value={{ x, y }}>{children}</ParallaxContext.Provider>;
}

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number;
  className?: string;
  style?: CSSProperties;
}

export function ParallaxLayer({ children, depth = 1, className, style }: ParallaxLayerProps) {
  const reduce = useReducedMotion();
  const { x, y } = useParallax();
  const tx = useTransform(x, (v) => (reduce ? 0 : v * depth * 44));
  const ty = useTransform(y, (v) => (reduce ? 0 : v * depth * 44));
  return (
    <motion.div className={className} style={{ x: tx, y: ty, ...style }}>
      {children}
    </motion.div>
  );
}

interface TiltProps {
  children: ReactNode;
  max?: number;
  className?: string;
  style?: CSSProperties;
}

export function Tilt({ children, max = 7, className, style }: TiltProps) {
  const reduce = useReducedMotion();
  const { x, y } = useParallax();
  const rx = useTransform(y, (v) => (reduce ? 0 : -v * max));
  const ry = useTransform(x, (v) => (reduce ? 0 : v * max));
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
    >
      {children}
    </motion.div>
  );
}

interface MouseGlowProps {
  color?: string;
  size?: number;
  className?: string;
}

export function MouseGlow({ color = "rgba(0,254,255,0.14)", size = 520, className = "" }: MouseGlowProps) {
  const { x, y } = useParallax();
  const left = useTransform(x, (v) => `${(v + 0.5) * 100}%`);
  const top = useTransform(y, (v) => `${(v + 0.5) * 100}%`);
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${className}`}
      style={{
        left,
        top,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        mixBlendMode: "screen",
        filter: "blur(48px)",
      }}
    />
  );
}
