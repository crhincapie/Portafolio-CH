"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CVModal } from "@/components/case-study/CVModal";

// ─── Config ──────────────────────────────────────────────────
const W = 1920;
const H = 1080;

interface SlideDef {
  id: string;
  title: string[];
  subtitle: string;
  desc: string;
  heroType: "profile" | "uxui" | "sd" | "process";
  accent: string;
  gradient: string[];
  logos: string;
}

const SLIDES: SlideDef[] = [
  {
    id: "product-designer",
    title: ["Product", "Designer"],
    subtitle: "Senior Product Designer — Bogotá / remoto",
    desc: "UX/UI, liderazgo multidisciplinario y ejecución técnica — de la estrategia al pixel, sin perder de vista las métricas.",
    heroType: "profile",
    accent: "#00feff",
    gradient: ["#0a0e1a", "#0d0f1a"],
    logos: "product-designer",
  },
  {
    id: "product-design",
    title: ["Diseño de", "Producto"],
    subtitle: "Product Design",
    desc: "De la estrategia al pixel. Lidero productos digitales con visión de negocio, sistemas de diseño y ejecución técnica.",
    heroType: "process",
    accent: "#60a5fa",
    gradient: ["#0a0e1a", "#0d121a"],
    logos: "product-design",
  },
  {
    id: "ux-ui",
    title: ["Diseño", "UX/UI"],
    subtitle: "UX/UI Design",
    desc: "Investigación, prototipado y diseño visual de alta fidelidad. Experiencias intuitivas y accesibles que conectan con usuarios reales.",
    heroType: "uxui",
    accent: "#00feff",
    gradient: ["#0a1418", "#0a1018"],
    logos: "ux-ui",
  },
  {
    id: "service-design",
    title: ["Service", "Design"],
    subtitle: "Service Design",
    desc: "Diseño de servicios centrados en el usuario. Mapeo de journeys, blueprints y transformación de experiencias integrales.",
    heroType: "sd",
    accent: "#c084fc",
    gradient: ["#0e0a14", "#120e0a"],
    logos: "service-design",
  },
];

// ─── Particles ────────────────────────────────────────────────
function hashSeed(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useParticles(count: number, seed: string) {
  return useMemo(
    () => {
      const rand = mulberry32(hashSeed(seed));
      return Array.from({ length: count }, () => ({
        x: rand() * W,
        y: rand() * H,
        r: 1 + rand() * 2.5,
        delay: rand() * 4,
        duration: 4 + rand() * 4,
        drift: -15 + rand() * 30,
      }));
    },
    [count, seed],
  );
}

// ─── Animated background ──────────────────────────────────────
function BgCanvas({ accent, gradient }: { accent: string; gradient: string[] }) {
  const particles = useParticles(25, accent);

  const waves = useMemo(
    () => [
      { y: H * 0.75, amp: 40, freq: 0.004, speed: 12, opacity: 0.06, width: 2 },
      { y: H * 0.82, amp: 25, freq: 0.006, speed: 9, opacity: 0.04, width: 1.5 },
      { y: H * 0.65, amp: 30, freq: 0.005, speed: 15, opacity: 0.03, width: 1 },
    ],
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }} />
      <div className="absolute left-0 top-0 h-[60%] w-[50%] opacity-30 blur-[120px]" style={{ background: `radial-gradient(ellipse at 20% 0%, ${accent}, transparent 70%)` }} />
      <div className="absolute bottom-0 right-0 h-[50%] w-[40%] opacity-15 blur-[100px]" style={{ background: `radial-gradient(ellipse at 100% 100%, ${accent}, transparent 70%)` }} />
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {particles.map((p, i) => (
          <motion.circle key={i} cx={p.x} cy={p.y} r={p.r} fill={accent}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0], y: [p.y, p.y + p.drift, p.y] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </svg>
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {waves.map((w, i) => (
          <motion.path key={i}
            d={`M${(() => { let p = ""; for (let x = 0; x <= W; x += 20) p += `${x},${w.y + Math.sin(x * w.freq) * w.amp} `; return p; })()}`}
            fill="none" stroke={accent} strokeWidth={w.width} opacity={w.opacity}
            animate={{ x: [0, -W * 0.5] }}
            transition={{ duration: w.speed, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── Brand logos SVG ──────────────────────────────────────────
function BrandLogo({ brand, color }: { brand: string; color: string }) {
  const s = "h-3.5 w-3.5 md:h-4 md:w-4";
  switch (brand) {
    case "figma":
      return (
        <svg viewBox="0 0 16 24" className={s}>
          <rect x="0" y="0" width="7" height="7" rx="1.8" fill="#F24E1E" />
          <rect x="9" y="0" width="7" height="7" rx="1.8" fill="#FF7262" />
          <rect x="0" y="8.5" width="7" height="7" rx="1.8" fill="#A259FF" />
          <rect x="9" y="8.5" width="7" height="7" rx="1.8" fill="#1ABCFE" />
          <rect x="0" y="17" width="7" height="7" rx="1.8" fill="#0ACF83" />
        </svg>
      );
    case "notion":
      return (
        <svg viewBox="0 0 24 24" className={s} fill="none">
          <rect x="1" y="1" width="22" height="22" rx="5" fill="white" fillOpacity="0.08" />
          <path d="M5 7h14M5 12h14M5 17h10" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
          <circle cx="17" cy="17" r="2" fill="white" opacity="0.25" />
        </svg>
      );
    case "jira":
      return (
        <svg viewBox="0 0 24 24" className={s} fill="none">
          <circle cx="12" cy="12" r="11" fill="#2684FF" />
          <path d="M12 6l-4.5 4.5a3.2 3.2 0 004.5 4.5 3.2 3.2 0 004.5-4.5L12 6z" fill="white" opacity="0.9" />
        </svg>
      );
    case "miro":
      return (
        <svg viewBox="0 0 24 24" className={s} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#FFD02F" opacity="0.9" />
          <path d="M8 18l3-12 3 12-3-4z" fill="black" opacity="0.15" />
          <path d="M6 14l3-8 3 8-3-3z" fill="black" opacity="0.2" />
        </svg>
      );
    case "figjam":
      return (
        <svg viewBox="0 0 24 24" className={s} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#F24E1E" opacity="0.8" />
          <path d="M7 7l10 10M17 7l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    case "maze":
      return (
        <svg viewBox="0 0 24 24" className={s} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#5C6BC0" opacity="0.9" />
          <path d="M6 6h3v3H6V6zm0 5h3v3H6v-3zm9-5h3v3h-3V6zm0 5h3v3h-3v-3z" fill="white" opacity="0.5" />
          <path d="M6 16h3v3H6v-3zm9-5h3v3h-3v-3z" fill="white" opacity="0.25" />
        </svg>
      );
    case "sketch":
      return (
        <svg viewBox="0 0 24 24" className={s} fill="none">
          <polygon points="12,3 21,10 12,21 3,10" fill="#F7B32B" opacity="0.85" />
          <polygon points="12,6 17,10 12,17 7,10" fill="white" opacity="0.2" />
        </svg>
      );
    case "illustrator":
      return (
        <svg viewBox="0 0 24 24" className={s} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#FF9A00" opacity="0.85" />
          <path d="M8 8l5 10M8 8l-2 6M8 8l-1 4" stroke="black" strokeWidth="1.3" strokeLinecap="round" opacity="0.15" />
          <path d="M16 8v7M16 8l-2 3M16 8l2 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    case "lucid":
      return (
        <svg viewBox="0 0 24 24" className={s} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#FF6B6B" opacity="0.8" />
          <path d="M8 12a4 4 0 118 0 4 4 0 01-8 0z" fill="white" opacity="0.4" />
          <path d="M12 8v8" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <path d="M8 12h8" stroke="white" strokeWidth="1.5" opacity="0.6" />
        </svg>
      );
    default:
      return (
        <div
          className="h-3.5 w-3.5 rounded-full md:h-4 md:w-4"
          style={{ backgroundColor: color }}
        />
      );
  }
}

// ─── Floating logos ──────────────────────────────────────────
interface LogoDef { label: string; color: string; bg: string; brand: string; x: number; y: number; delay: number; }
const LOGOS: Record<string, LogoDef[]> = {
  "product-designer": [
    { label: "Figma", color: "#F24E1E", bg: "rgba(242,78,30,0.15)", brand: "figma", x: 6, y: 20, delay: 0 },
    { label: "Notion", color: "#fff", bg: "rgba(255,255,255,0.1)", brand: "notion", x: 84, y: 16, delay: 0.4 },
    { label: "Jira", color: "#2684FF", bg: "rgba(38,132,255,0.15)", brand: "jira", x: 82, y: 74, delay: 0.8 },
    { label: "Miro", color: "#FFD02F", bg: "rgba(255,208,47,0.15)", brand: "miro", x: 8, y: 76, delay: 1.2 },
  ],
  "product-design": [
    { label: "Notion", color: "#fff", bg: "rgba(255,255,255,0.1)", brand: "notion", x: 6, y: 22, delay: 0 },
    { label: "Jira", color: "#2684FF", bg: "rgba(38,132,255,0.15)", brand: "jira", x: 85, y: 18, delay: 0.4 },
    { label: "Miro", color: "#FFD02F", bg: "rgba(255,208,47,0.15)", brand: "miro", x: 82, y: 72, delay: 0.8 },
    { label: "FigJam", color: "#F24E1E", bg: "rgba(242,78,30,0.15)", brand: "figjam", x: 8, y: 76, delay: 1.2 },
  ],
  "ux-ui": [
    { label: "Figma", color: "#F24E1E", bg: "rgba(242,78,30,0.15)", brand: "figma", x: 5, y: 18, delay: 0 },
    { label: "Maze", color: "#5C6BC0", bg: "rgba(92,107,192,0.15)", brand: "maze", x: 86, y: 14, delay: 0.5 },
    { label: "Sketch", color: "#F7B32B", bg: "rgba(247,179,43,0.15)", brand: "sketch", x: 7, y: 78, delay: 1 },
    { label: "Illustrator", color: "#FF9A00", bg: "rgba(255,154,0,0.15)", brand: "illustrator", x: 84, y: 80, delay: 1.5 },
  ],
  "service-design": [
    { label: "Miro", color: "#FFD02F", bg: "rgba(255,208,47,0.15)", brand: "miro", x: 6, y: 20, delay: 0 },
    { label: "Lucid", color: "#FF6B6B", bg: "rgba(255,107,107,0.15)", brand: "lucid", x: 86, y: 18, delay: 0.6 },
    { label: "Notion", color: "#fff", bg: "rgba(255,255,255,0.1)", brand: "notion", x: 8, y: 76, delay: 1.2 },
    { label: "Figma", color: "#F24E1E", bg: "rgba(242,78,30,0.15)", brand: "figma", x: 84, y: 78, delay: 1.8 },
  ],
};

function FloatingLogo({ logo }: { logo: LogoDef }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-10 hidden items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider shadow-lg backdrop-blur-xl md:inline-flex"
      style={{ left: `${logo.x}%`, top: `${logo.y}%`, color: logo.color, backgroundColor: logo.bg }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: [0, 1, 1, 1], scale: [0.3, 1, 1.05, 1], x: [0, 8, -6, 0], y: [0, -6, 4, 0] }}
      transition={{ duration: 5 + logo.delay, repeat: Infinity, delay: logo.delay, ease: "easeInOut", times: [0, 0.2, 0.5, 1] }}
    >
      <BrandLogo brand={logo.brand} color={logo.color} />
      <span>{logo.label}</span>
    </motion.div>
  );
}

// ─── UX/UI — design system component grid ─────────────────────
function UXUIVisual() {
  const accent = "#00feff";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="flex w-full items-center justify-center"
    >
      <motion.div
        className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[480px] lg:w-[480px]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Grid backdrop */}
        <svg className="absolute inset-0 h-full w-full" viewBox="-240 -240 480 480">
          <pattern id="uxuiGridLg" x="-240" y="-240" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.06" />
          </pattern>
          <rect x="-240" y="-240" width="480" height="480" fill="url(#uxuiGridLg)" />
        </svg>

        {/* Central screen — bigger */}
        <motion.div
          className="absolute z-10 flex flex-col overflow-hidden rounded-xl border backdrop-blur-sm"
          style={{ width: 270, height: 185, borderColor: `${accent}25`, backgroundColor: `${accent}06`, boxShadow: `0 16px 56px ${accent}08`, transform: "translate(0px, -5px)" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
            <div className="h-2 w-2 rounded-full bg-red-400/60" />
            <div className="h-2 w-2 rounded-full bg-yellow-400/60" />
            <div className="h-2 w-2 rounded-full bg-green-400/60" />
          </div>
          <div className="flex flex-1 gap-3 p-3">
            <div className="flex w-1/3 flex-col gap-2">
              <div className="h-4 w-full rounded bg-white/[0.08]" />
              <div className="h-4 w-3/4 rounded bg-white/[0.05]" />
              <div className="h-4 w-1/2 rounded bg-white/[0.03]" />
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
              <motion.div className="h-8 w-8 rounded-full" style={{ border: `2px solid ${accent}40` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Surrounding UI component cards — bigger + 2 extra */}
        {[
          { w: 105, h: 72, x: -160, y: -85, label: "Button", el: 0, delay: 0.25 },
          { w: 130, h: 72, x: 160, y: -95, label: "Card", el: 1, delay: 0.3 },
          { w: 105, h: 72, x: -170, y: 85, label: "Input", el: 2, delay: 0.4 },
          { w: 130, h: 72, x: 155, y: 90, label: "Toggle", el: 3, delay: 0.45 },
          { w: 100, h: 64, x: 0, y: -150, label: "Slider", el: 4, delay: 0.5 },
          { w: 100, h: 64, x: 0, y: 150, label: "Dropdown", el: 5, delay: 0.55 },
        ].map((c) => (
          <motion.div key={c.label}
            className="absolute z-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border backdrop-blur-sm"
            style={{ width: c.w, height: c.h, borderColor: `${accent}20`, backgroundColor: `${accent}05`, transform: `translate(${c.x}px, ${c.y}px)`, boxShadow: `0 4px 20px ${accent}06` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + c.delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {c.el === 0 && <div className="h-6 w-16 rounded-full" style={{ backgroundColor: accent + "25" }} />}
            {c.el === 1 && (
              <div className="flex flex-col gap-1">
                <div className="h-2 w-8 rounded bg-white/10" />
                <div className="h-2 w-12 rounded bg-white/[0.05]" />
              </div>
            )}
            {c.el === 2 && <div className="h-4 w-14 rounded border border-white/[0.08] bg-white/[0.03]" />}
            {c.el === 3 && <div className="flex items-center gap-1.5">
              <div className="h-3.5 w-6 rounded-full" style={{ backgroundColor: accent + "30" }} />
              <div className="h-3.5 w-6 rounded-full border border-white/10" />
            </div>}
            {c.el === 4 && <motion.div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: accent + "25" }}
              animate={{ width: ["60%", "100%", "60%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />}
            {c.el === 5 && (
              <div className="flex items-center gap-1 rounded border border-white/[0.08] px-2 py-1">
                <div className="h-1.5 w-6 rounded bg-white/10" />
                <svg width="6" height="4" viewBox="0 0 6 4" className="text-zinc-500">
                  <path d="M0 0l3 4 3-4z" fill="currentColor" />
                </svg>
              </div>
            )}
            <span className="text-[8px] font-medium uppercase tracking-wider text-zinc-500">{c.label}</span>
          </motion.div>
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="-240 -240 480 480">
          {[[-160, -85, 0, -5], [160, -95, 0, -5], [-170, 85, 0, -5], [155, 90, 0, -5], [0, -150, 0, -5], [0, 150, 0, -5]].map((c, i) => (
            <motion.line key={i} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]}
              stroke={accent} strokeWidth="0.5" opacity="0.1" strokeDasharray="2 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
            />
          ))}
        </svg>

        {/* Decorative floating dots */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i}
            className="absolute h-1.5 w-1.5 rounded-full md:h-2 md:w-2"
            style={{ backgroundColor: accent, opacity: 0.12 + i * 0.08 }}
            animate={{
              x: [0, (i + 1) * 10, 0],
              y: [0, (i % 2 === 0 ? -1 : 1) * (i + 1) * 6, 0],
              opacity: [0.12, 0.35, 0.12],
            }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── Product design — nodes on circle perimeter ──────────────
function ProcessVisual() {
  const phases = [
    { label: "Research", desc: "Descubrir", color: "#60a5fa", angle: -90 },
    { label: "Ideate", desc: "Concebir", color: "#818cf8", angle: 0 },
    { label: "Design", desc: "Crear", color: "#a78bfa", angle: 90 },
    { label: "Test", desc: "Validar", color: "#c084fc", angle: 180 },
  ];

  const cx = 200, cy = 200, circleR = 175, nodeR = 175;

  return (
    <>
      <style>{`@media(max-width:767px){.pv-node{left:calc(var(--pv-x)/480*100%)!important;top:calc(var(--pv-y)/480*100%)!important}}`}</style>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex w-full items-center justify-center"
      >
        <motion.div
        className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[480px] lg:w-[480px]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* SVG framework — viewBox 400 for ~20% visual gain */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
          {/* Large bounding circle */}
          <circle cx={cx} cy={cy} r={circleR} fill="none" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="4 6" opacity={0.15} />

          {/* Inner rings */}
          <circle cx={cx} cy={cy} r={50} fill="none" stroke="#4b5563" strokeWidth="0.4" opacity={0.12} />
          <circle cx={cx} cy={cy} r={100} fill="none" stroke="#4b5563" strokeWidth="0.3" strokeDasharray="2 4" opacity={0.08} />

          {/* Curved arcs connecting nodes ON the circle */}
          {phases.map((p, i) => {
            const a1 = (p.angle * Math.PI) / 180;
            const next = phases[(i + 1) % phases.length];
            const a2 = (next.angle * Math.PI) / 180;
            const midA = ((p.angle + next.angle) / 2 * Math.PI) / 180;
            const x1 = cx + (nodeR - 12) * Math.cos(a1);
            const y1 = cy + (nodeR - 12) * Math.sin(a1);
            const x2 = cx + (nodeR - 12) * Math.cos(a2);
            const y2 = cy + (nodeR - 12) * Math.sin(a2);
            const cpx = cx + (nodeR + 20) * Math.cos(midA);
            const cpy = cy + (nodeR + 20) * Math.sin(midA);
            return (
              <motion.path key={`arc-${i}`} d={`M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`}
                fill="none" stroke={p.color} strokeWidth="0.7" opacity="0.18"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
              />
            );
          })}
        </svg>

        {/* Central hub */}
        <motion.div
          className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-widest md:h-20 md:w-20 md:text-xs"
          style={{ backgroundColor: "#60a5fa12", border: "1px solid #60a5fa25", color: "#60a5fa" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          PD
        </motion.div>

        {/* Phase nodes — ON the circle perimeter */}
        {phases.map((p, i) => {
          const a = (p.angle * Math.PI) / 180;
          const x = cx + nodeR * Math.cos(a);
          const y = cy + nodeR * Math.sin(a);
          return (
            <motion.div key={p.label}
              className="pv-node absolute z-10 flex flex-col items-center"
              style={{ ...{ '--pv-x': x, '--pv-y': y } as React.CSSProperties, left: x, top: y, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
            >
              <motion.div
                className="flex h-[60px] w-[60px] items-center justify-center rounded-[18px] border md:h-24 md:w-24"
                style={{
                  backgroundColor: `${p.color}14`,
                  borderColor: `${p.color}30`,
                  boxShadow: `0 0 50px ${p.color}10`,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg font-bold md:text-2xl" style={{ color: p.color }}>
                  {"0" + (i + 1)}
                </span>
              </motion.div>
              <motion.span
                className="mt-1.5 text-xs font-semibold uppercase tracking-wider md:mt-1.5 md:text-sm"
                style={{ color: p.color }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
              >
                {p.label}
              </motion.span>
              <motion.span
                className="text-[10px] text-zinc-500 md:text-[10px]"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
              >
                {p.desc}
              </motion.span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
    </>
  );
}

// ─── Service design — pentagon nodes on perimeter ────────────
function ServiceDesignVisual() {
  const accent = "#c084fc";
  const phases = [
    { label: "Discover", desc: "Investigar", color: "#c084fc", angle: -90 },
    { label: "Define", desc: "Sintetizar", color: "#a78bfa", angle: -18 },
    { label: "Develop", desc: "Prototipar", color: "#818cf8", angle: 54 },
    { label: "Deliver", desc: "Implementar", color: "#6366f1", angle: 126 },
    { label: "Measure", desc: "Evaluar", color: "#c084fc", angle: 198 },
  ];

  const cx = 200, cy = 200, circleR = 175, nodeR = 175;

  return (
    <>
      <style>{`@media(max-width:767px){.sv-node{left:calc(var(--sv-x)/480*100%)!important;top:calc(var(--sv-y)/480*100%)!important}}`}</style>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex w-full items-center justify-center"
      >
        <motion.div
          className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[480px] lg:w-[480px]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
        {/* SVG layers — viewBox 400 for 20% visual gain */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
          {/* Outer bounding circle */}
          <circle cx={cx} cy={cy} r={circleR} fill="none" stroke={`${accent}10`} strokeWidth="0.5" strokeDasharray="4 8" />

          {/* Concentric rings */}
          <circle cx={cx} cy={cy} r={55} fill={`${accent}05`} stroke={`${accent}15`} strokeWidth="0.5" />
          <circle cx={cx} cy={cy} r={100} fill="none" stroke={`${accent}08`} strokeWidth="0.3" strokeDasharray="2 4" />

          {/* Curved outer arcs between adjacent phases */}
          {phases.map((p, i) => {
            const next = phases[(i + 1) % phases.length];
            const a1 = (p.angle * Math.PI) / 180;
            const a2 = (next.angle * Math.PI) / 180;
            const midA = ((p.angle + next.angle) / 2 * Math.PI) / 180;
            const x1 = cx + (nodeR - 12) * Math.cos(a1);
            const y1 = cy + (nodeR - 12) * Math.sin(a1);
            const x2 = cx + (nodeR - 12) * Math.cos(a2);
            const y2 = cy + (nodeR - 12) * Math.sin(a2);
            const cpx = cx + (nodeR + 22) * Math.cos(midA);
            const cpy = cy + (nodeR + 22) * Math.sin(midA);
            return (
              <motion.path key={`arc-${i}`} d={`M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`}
                fill="none" stroke={p.color} strokeWidth="0.6" opacity="0.18"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
              />
            );
          })}
        </svg>

        {/* Central hub */}
        <motion.div
          className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-widest md:h-20 md:w-20 md:text-xs"
          style={{ backgroundColor: `${accent}12`, border: `1px solid ${accent}25`, color: accent }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          SD
        </motion.div>

        {/* Phase nodes — on perimeter, bigger */}
        {phases.map((p, i) => {
          const a = (p.angle * Math.PI) / 180;
          const x = cx + nodeR * Math.cos(a);
          const y = cy + nodeR * Math.sin(a);
          return (
            <motion.div key={p.label}
              className="sv-node absolute z-10 flex flex-col items-center"
              style={{ ...{ '--sv-x': x, '--sv-y': y } as React.CSSProperties, left: x, top: y, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
            >
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-full border md:h-24 md:w-24"
                style={{
                  backgroundColor: `${p.color}14`,
                  borderColor: `${p.color}30`,
                  boxShadow: `0 0 50px ${p.color}10`,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="h-5 w-5 rounded-full md:h-6 md:w-6"
                  style={{ backgroundColor: p.color }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
                />
              </motion.div>
              <motion.span
                className="mt-2 text-xs font-semibold uppercase tracking-wider md:text-sm"
                style={{ color: p.color }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity }}
              >
                {p.label}
              </motion.span>
              <motion.span
                className="text-[10px] text-zinc-500 md:text-xs"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.5 + i * 0.2, repeat: Infinity }}
              >
                {p.desc}
              </motion.span>
            </motion.div>
          );
        })}

        {/* Bottom label */}
        <motion.div
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: `${accent}40` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          SERVICE DESIGN PROCESS
        </motion.div>
      </motion.div>
    </motion.div>
    </>
  );
}

// ─── Arrow ────────────────────────────────────────────────────
function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2.5 text-[#00feff] backdrop-blur-xl transition hover:border-[#00feff]/40 hover:bg-white/10 md:block"
      style={{ [dir]: "20px" }}
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M11 4L6 9L11 14" /> : <path d="M7 4L12 9L7 14" />}
      </svg>
    </button>
  );
}

// ─── Slide transition variants ────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
};

// ─── Slide content ──────────────────────────────────────────
function SlideContent({ slide, onOpenCV }: { slide: SlideDef; onOpenCV: () => void }) {
  const t = useTranslations("hero");
  const logos = LOGOS[slide.logos] ?? [];

  const line1 = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 } } };
  const line2 = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 } } };

  return (
    <motion.div className="absolute inset-0" variants={slideVariants} custom={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <BgCanvas accent={slide.accent} gradient={slide.gradient} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950" />

      {logos.map((logo) => <FloatingLogo key={logo.label} logo={logo} />)}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 pb-20 md:px-6 md:pb-0">
        {/* Mobile layout uses flex-col with visual flex-1 for consistent centering; desktop uses 3-col grid */}
        <div className="flex flex-1 flex-col items-center justify-center gap-6 md:grid md:grid-cols-[1fr_1.3fr_1fr] md:gap-6 lg:gap-10">
          {/* Left: Title */}
          <motion.div className="w-full pt-10 text-left md:pt-0 md:text-right" variants={line1} initial="hidden" animate="visible">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#00feff]/80 md:text-[11px]">
              {slide.subtitle}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-zinc-200">{slide.title[0]}</span>
              <br />
              <span className="text-gradient-accent">{slide.title[1]}</span>
            </h1>
          </motion.div>

          {/* Center: Hero visual */}
          <div className="flex w-full flex-1 items-center justify-center md:flex-none">
            <motion.div variants={line2} initial="hidden" animate="visible" className="pb-20 md:pb-0">
              {slide.heroType === "profile" ? (
                <div className="relative flex items-center justify-center">
                  <div className="pointer-events-none absolute h-[min(700px,90vw)] w-[min(700px,90vw)] rounded-full blur-3xl md:h-[700px] md:w-[700px]" style={{ background: `radial-gradient(circle at center, ${slide.accent}10 0%, ${slide.accent}05 40%, transparent 70%)` }} />
                  <div className="pointer-events-none absolute h-[min(520px,84vw)] w-[min(520px,84vw)] rounded-full border border-[#00feff]/10 md:h-[520px] md:w-[520px]" />
                  <motion.div className="pointer-events-none absolute -right-2 top-8 h-3 w-3 rounded-full bg-[#00feff]/30 md:-right-4 md:top-12 md:h-4 md:w-4"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div className="pointer-events-none absolute -bottom-4 left-4 h-2 w-2 rounded-full bg-[#00feff]/20 md:h-3 md:w-3"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
                  />
                  <motion.div className="pointer-events-none absolute -top-2 left-[20%] h-1.5 w-1.5 rounded-full bg-[#00feff]/40 md:h-2 md:w-2"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                  />
                  <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                    <Image src="/images/hero/profile-cutout.png" alt="Cristian Hincapié" width={400} height={500} priority
                      className="relative h-auto w-[min(300px,80vw)] object-contain sm:w-[350px] md:w-[420px] lg:w-[480px]" />
                  </motion.div>
                  {slide.id === "product-designer" && (
                    <div className="absolute left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 md:hidden" style={{ top: "calc(100% - 70px)" }}>
                      <button onClick={onOpenCV}
                        className="inline-flex items-center justify-center rounded-full bg-[#00feff] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition duration-200 hover:bg-[#7afcff] hover:shadow-lg active:scale-95">
                        {t("ctaCv")}
                      </button>
                      <Button href="#proyectos" variant="outline">{t("ctaProjects")}</Button>
                      <p className="text-center text-[10px] font-medium uppercase leading-tight tracking-[0.2em] text-zinc-600">
                        <span className="block whitespace-nowrap">Diseño centrado en el usuario</span>
                        <span className="block whitespace-nowrap">Producto digital · Experiencia de marca</span>
                      </p>
                    </div>
                  )}
                </div>
              ) : slide.heroType === "uxui" ? <UXUIVisual />
              : slide.heroType === "process" ? <ProcessVisual />
              : <ServiceDesignVisual />}
            </motion.div>
          </div>

          {/* Right: Description */}
          <motion.div className="relative z-10 mb-13 flex w-full flex-col gap-5 md:mb-0" variants={line2} initial="hidden" animate="visible">
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base lg:text-lg">{slide.desc}</p>
            {slide.id === "product-designer" && <p className="text-xs text-zinc-500">{t("roles")}</p>}
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              {slide.id === "product-designer" && (
                <button onClick={onOpenCV}
                  className="hidden rounded-full bg-[#00feff] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition duration-200 hover:bg-[#7afcff] hover:shadow-lg active:scale-95 md:inline-flex">
                  {t("ctaCv")}
                </button>
              )}
              {slide.id === "product-designer" ? (
                <Button href="#proyectos" variant="outline" className="hidden md:inline-flex">{t("ctaProjects")}</Button>
              ) : (
                <Button href="#proyectos" variant="outline">{t("ctaProjects")}</Button>
              )}
            </div>
            {slide.id === "product-designer" && (
              <p className="hidden text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-600 md:block">Diseño centrado en el usuario · Producto digital · Experiencia de marca</p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero ──────────────────────────────────────────────
export function Hero() {
  const t = useTranslations("hero");
  const [[slide, direction], setSlide] = useState([0, 1]);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const goTo = useCallback((i: number) => setSlide(([c]) => [((i % SLIDES.length) + SLIDES.length) % SLIDES.length, i > c ? 1 : -1]), []);
  const next = useCallback(() => setSlide(([c]) => [(c + 1) % SLIDES.length, 1]), []);
  const prev = useCallback(() => setSlide(([c]) => [(c - 1 + SLIDES.length) % SLIDES.length, -1]), []);

  useEffect(() => {
    const timer = setInterval(next, 12000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-screen overflow-x-hidden border-b border-white/5 bg-zinc-950 md:h-screen md:overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <SlideContent key={slide} slide={SLIDES[slide]} onOpenCV={() => setIsCVModalOpen(true)} />
      </AnimatePresence>

      <ArrowBtn dir="left" onClick={prev} />
      <ArrowBtn dir="right" onClick={next} />

      {/* ── Floating dots ── */}
      <div className="absolute bottom-20 left-4 z-30 flex items-center gap-2.5 md:bottom-24 md:left-8">
        {SLIDES.map((s, i) => (
          <button key={s.id} onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? "w-6 bg-[#00feff]" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Floating stat cards ── */}
      <div className={`absolute bottom-[88px] right-4 z-30 gap-1.5 md:bottom-20 md:right-8 ${slide === 0 ? "flex" : "hidden md:flex"}`}>
        {[
          { val: t("statYearsValue"), label: t("statYearsLabel") },
          { val: t("statSectorsValue"), label: t("statSectorsLabel") },
          { val: t("statCraftValue"), label: t("statCraftLabel") },
        ].map((card, i) => (
          <div key={i}
            className="flex w-[72px] flex-col items-center justify-center gap-0.5 rounded-xl border border-white/[0.08] bg-white/[0.06] px-1 py-2 text-center backdrop-blur-xl md:w-[84px] md:gap-1 md:rounded-2xl md:px-2 md:py-3">
            <p className="text-[10px] font-semibold leading-tight text-white md:text-xs">{card.val}</p>
            <p className="text-[7px] leading-tight text-zinc-500 md:text-[8px]">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Scroll */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 md:block">
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="flex h-7 w-[14px] items-start justify-center rounded-full border border-zinc-500/60 py-1.5"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div
              className="h-[7px] w-[2px] rounded-full bg-[#00feff]"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.span
            className="text-[9px] font-semibold uppercase tracking-[0.32em] text-zinc-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {t("scroll")}
          </motion.span>
        </motion.div>
      </div>

      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </section>
  );
}
