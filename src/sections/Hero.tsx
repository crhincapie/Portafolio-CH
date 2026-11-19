"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CVModal } from "@/components/case-study/CVModal";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   HERO · "Anatomía de un producto"
   El elemento 3D es la profesión misma: un producto despiezado
   en sus capas (Research → Arquitectura → Wireframe → Design
   System → UI). Cada rol ilumina las capas que trabaja; al hacer
   scroll las capas se ensamblan en un producto terminado.
   ───────────────────────────────────────────────────────────── */

const SLIDES = [1, 2, 3, 4] as const;
const SLIDE_MS = 10000;

/** Capas que se iluminan en cada rol (índices de abajo hacia arriba). */
const ACTIVE_LAYERS: Record<number, number[]> = {
  0: [0, 1, 2, 3, 4], // Product Designer: todo el producto
  1: [0, 1, 4], // Diseño de Producto: estrategia → resultado
  2: [2, 3, 4], // UX/UI: wireframe, sistema, interfaz
  3: [0, 1], // Service Design: investigación y blueprint
};

const ROLE_ICONS: ReactNode[] = [
  <svg key="pd" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>,
  <svg key="prd" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></svg>,
  <svg key="ux" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M9 20V9" /></svg>,
  <svg key="sd" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="2" /><circle cx="19" cy="18" r="2" /><path d="M7 6h6a3 3 0 0 1 0 6H11a3 3 0 0 0 0 6h6" /></svg>,
];

const LAYER_KEYS = ["layerResearch", "layerArchitecture", "layerWireframe", "layerSystem", "layerUi"] as const;

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Arte de cada capa (todo vectorial / CSS, sin imágenes) ─── */

function ResearchArt() {
  const notes = [
    "left-[8%] top-[14%] rotate-[-4deg] bg-[#00feff]/25",
    "left-[30%] top-[10%] rotate-[3deg] bg-white/15 light:bg-zinc-900/10",
    "left-[52%] top-[16%] rotate-[-2deg] bg-[#6366f1]/30",
    "left-[12%] top-[46%] rotate-[2deg] bg-white/15 light:bg-zinc-900/10",
    "left-[34%] top-[44%] rotate-[-3deg] bg-[#00feff]/20",
  ];
  return (
    <>
      {notes.map((c, i) => (
        <span key={i} className={cn("absolute h-[22%] w-[17%] rounded-md", c)}>
          <span className="absolute left-[14%] top-[22%] h-[6%] w-[60%] rounded bg-current opacity-40" />
          <span className="absolute left-[14%] top-[42%] h-[6%] w-[44%] rounded bg-current opacity-30" />
        </span>
      ))}
      <svg viewBox="0 0 420 300" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M250 230 C 290 170, 320 260, 360 190 S 400 120, 410 150" stroke="#00feff" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
        {[
          [250, 230],
          [305, 214],
          [360, 190],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#00feff" />
        ))}
      </svg>
    </>
  );
}

function ArchitectureArt() {
  const nodes = [
    { x: 175, y: 30, w: 70 },
    { x: 60, y: 120, w: 70 },
    { x: 175, y: 120, w: 70 },
    { x: 290, y: 120, w: 70 },
    { x: 30, y: 215, w: 60 },
    { x: 110, y: 215, w: 60 },
    { x: 290, y: 215, w: 70 },
  ];
  const links = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
    [1, 5],
    [3, 6],
  ];
  return (
    <svg viewBox="0 0 420 300" className="absolute inset-0 h-full w-full" fill="none">
      {links.map(([a, b], i) => {
        const A = nodes[a];
        const B = nodes[b];
        const ax = A.x + A.w / 2;
        const bx = B.x + B.w / 2;
        return (
          <path
            key={i}
            d={`M${ax} ${A.y + 34} V ${(A.y + 34 + B.y) / 2} H ${bx} V ${B.y}`}
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={n.w} height="34" rx="8" fill="currentColor" fillOpacity={i === 0 ? 0.18 : 0.08} stroke={i === 0 ? "#00feff" : "currentColor"} strokeOpacity={i === 0 ? 0.8 : 0.3} />
          <rect x={n.x + 12} y={n.y + 14} width={n.w * 0.5} height="5" rx="2.5" fill="currentColor" fillOpacity="0.45" />
        </g>
      ))}
    </svg>
  );
}

function WireframeArt() {
  return (
    <div className="absolute inset-[7%] flex flex-col gap-[5%] text-current">
      <div className="flex h-[10%] items-center justify-between rounded-md border border-current/25 px-[3%]">
        <span className="h-[30%] w-[14%] rounded bg-current/30" />
        <span className="flex w-[40%] justify-end gap-[8%]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-[22%] rounded bg-current/25" />
          ))}
        </span>
      </div>
      <div className="relative h-[38%] overflow-hidden rounded-md border border-dashed border-current/35">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-[4%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-[10%] rounded-md border border-current/25 p-[8%]">
            <span className="h-[34%] rounded bg-current/15" />
            <span className="h-1.5 w-[70%] rounded bg-current/30" />
            <span className="h-1.5 w-[50%] rounded bg-current/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemArt() {
  return (
    <div className="absolute inset-[8%] grid grid-cols-[1.1fr_1fr] gap-[6%]">
      <div className="flex flex-col justify-between">
        <div className="flex gap-[6%]">
          {["bg-[#00feff]", "bg-[#6366f1]", "bg-zinc-100 light:bg-zinc-900", "bg-zinc-500"].map((c) => (
            <span key={c} className={cn("aspect-square w-[20%] rounded-full ring-1 ring-white/20", c)} />
          ))}
        </div>
        <p className="text-[clamp(28px,4vw,52px)] font-semibold leading-none tracking-tight text-current">Aa</p>
        <div className="flex flex-col gap-1.5">
          <span className="h-1.5 w-[80%] rounded bg-current/40" />
          <span className="h-1.5 w-[60%] rounded bg-current/25" />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <span className="flex h-[18%] items-center justify-center rounded-full bg-[#00feff] text-[9px] font-bold text-zinc-950">Button</span>
        <span className="flex h-[18%] items-center justify-center rounded-full border border-current/40 text-[9px] font-semibold">Button</span>
        <span className="relative h-[14%] w-[46%] rounded-full bg-[#00feff]/80">
          <span className="absolute right-[6%] top-1/2 aspect-square h-[70%] -translate-y-1/2 rounded-full bg-white" />
        </span>
        <span className="flex gap-1.5">
          <span className="rounded-full bg-current/15 px-2 py-0.5 text-[8px] font-semibold">Chip</span>
          <span className="rounded-full bg-[#6366f1]/40 px-2 py-0.5 text-[8px] font-semibold">Tag</span>
        </span>
      </div>
    </div>
  );
}

function UiArt({ animate }: { animate: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <div className="absolute inset-x-0 top-0 flex h-[13%] items-center gap-2 border-b border-white/10 px-[5%] light:border-zinc-900/10">
        <span className="h-2 w-2 rounded-full bg-[#00feff]" />
        <span className="h-1.5 w-[18%] rounded bg-current/50" />
        <span className="ml-auto h-[46%] w-[16%] rounded-full bg-[#00feff]" />
      </div>
      <div className="absolute inset-x-[5%] top-[20%] grid h-[30%] grid-cols-3 gap-[3%]">
        {[0.9, 0.6, 0.75].map((w, i) => (
          <div key={i} className="flex flex-col justify-between rounded-lg bg-white/[0.06] p-[8%] light:bg-zinc-900/[0.05]">
            <span className="h-1.5 rounded bg-current/30" style={{ width: `${w * 60}%` }} />
            <span className="h-3 rounded bg-current/70" style={{ width: `${w * 70}%` }} />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-[5%] bottom-[8%] top-[56%] rounded-lg bg-white/[0.05] light:bg-zinc-900/[0.04]">
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="ch-ui-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#00feff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#00feff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 80 C 40 70, 60 40, 100 52 S 160 30, 200 36 S 260 12, 300 18 V100 H0Z" fill="url(#ch-ui-fill)" />
          <motion.path
            d="M0 80 C 40 70, 60 40, 100 52 S 160 30, 200 36 S 260 12, 300 18"
            fill="none"
            stroke="#00feff"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: animate ? 0 : 1 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 1.1, ease }}
          />
        </svg>
      </div>
      {/* Selección estilo herramienta de diseño */}
      <div className="absolute left-[3.5%] top-[18.5%] h-[33%] w-[31%] rounded-lg border border-[#00feff]">
        {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((p) => (
          <span key={p} className={cn("absolute h-2 w-2 rounded-[2px] border border-[#00feff] bg-white", p)} />
        ))}
      </div>
    </div>
  );
}

const LAYER_ART = [ResearchArt, ArchitectureArt, WireframeArt, SystemArt] as const;

function StackLayer({
  index,
  gap,
  active,
  children,
  reduced,
}: {
  index: number;
  gap: MotionValue<number>;
  active: boolean;
  children: ReactNode;
  reduced: boolean;
}) {
  const z = useTransform(gap, (g) => g * index);
  return (
    <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ z }}>
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl border text-zinc-100 transition-[border-color,box-shadow,opacity,background-color] duration-700 light:text-zinc-800",
          index === 4
            ? "bg-zinc-950/85 light:bg-white/90"
            : "bg-white/[0.035] light:bg-white/55",
          active
            ? "border-[#00feff]/55 opacity-100 shadow-[0_0_0_1px_rgba(0,254,255,0.08),0_30px_60px_-30px_rgba(0,254,255,0.55)] light:border-[#0e7490]/45"
            : "border-white/10 opacity-[0.32] light:border-zinc-900/10",
        )}
        initial={reduced ? false : { opacity: 0, z: 260 }}
        animate={{ opacity: active ? 1 : 0.32, z: 0 }}
        transition={{ duration: 1.1, delay: reduced ? 0 : 0.35 + index * 0.14, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ProductStack({ slide }: { slide: number }) {
  const t = useTranslations("hero");
  const reduced = !!useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  // Scroll: al salir del hero las capas se ensamblan en un producto terminado.
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["center center", "end start"] });
  const assemble = useTransform(scrollYProgress, [0, 1], [1, 0.12]);
  const hoverGap = useSpring(hover ? 1.35 : 1, { stiffness: 120, damping: 20 });
  useEffect(() => {
    hoverGap.set(hover ? 1.35 : 1);
  }, [hover, hoverGap]);
  const gap = useTransform([assemble, hoverGap] as MotionValue<number>[], ([a, h]: number[]) => 54 * a * h);

  // Puntero: inclinación sutil del producto.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [62, 52]), { stiffness: 60, damping: 18 });
  const rz = useSpring(useTransform(mx, [-1, 1], [-44, -32]), { stiffness: 60, damping: 18 });

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced || e.pointerType !== "mouse") return;
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    },
    [mx, my, reduced],
  );

  const active = ACTIVE_LAYERS[slide] ?? ACTIVE_LAYERS[0];

  return (
    <figure
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[620px] select-none"
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        mx.set(0);
        my.set(0);
      }}
      aria-label={`${t("stackLabel")}: ${LAYER_KEYS.map((k) => t(k)).join(", ")}`}
    >
      <div className="relative mx-auto aspect-[1.12] w-full [perspective:1800px]">
        <motion.div
          className="absolute left-1/2 top-[50%] h-[56%] w-[80%] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
          style={{ rotateX: rx, rotateZ: rz }}
        >
          {/* sombra de contacto */}
          <div className="absolute inset-[-6%] rounded-[40px] bg-[radial-gradient(closest-side,rgba(0,254,255,0.18),transparent)] blur-2xl light:bg-[radial-gradient(closest-side,rgba(14,116,144,0.22),transparent)]" />
          {LAYER_ART.map((Art, i) => (
            <StackLayer key={i} index={i} gap={gap} active={active.includes(i)} reduced={reduced}>
              <Art />
            </StackLayer>
          ))}
          <StackLayer index={4} gap={gap} active={active.includes(4)} reduced={reduced}>
            <UiArt animate={!reduced} />
          </StackLayer>
        </motion.div>

        {/* Cursor multijugador (como en una herramienta de diseño) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[46%] top-[30%] z-10"
          animate={
            reduced
              ? undefined
              : { x: [0, 70, 40, -30, 0], y: [0, 24, 80, 50, 0] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
            <path d="M4 3l15 7-6.5 2L9 19z" fill="#00feff" stroke="#041416" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          <span className="ml-4 mt-0.5 inline-block rounded-full rounded-tl-none bg-[#00feff] px-2.5 py-1 text-[11px] font-semibold text-zinc-950">
            Cristian
          </span>
        </motion.div>
      </div>

      {/* Leyenda de capas (de arriba hacia abajo, como se ven) */}
      <figcaption className="-mt-4 flex flex-col items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-faint">{t("stackLabel")}</span>
        <ol className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
          {[...LAYER_KEYS].reverse().map((k, ri) => {
            const i = LAYER_KEYS.length - 1 - ri;
            const on = active.includes(i);
            return (
              <li
                key={k}
                className={cn(
                  "flex items-center gap-2 text-xs font-medium transition-colors duration-500",
                  on ? "text-ink" : "text-faint",
                )}
              >
                <span className={cn("tabular-nums", on ? "text-accent-text light:text-[#0e7490]" : "")}>0{i + 1}</span>
                {t(k)}
              </li>
            );
          })}
        </ol>
      </figcaption>
    </figure>
  );
}

/* ── Visual 1 · Product Designer: retrato como "frame" de diseño ── */

function FloatChip({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.span
      className={cn(
        "glass-surface glass-blur absolute z-20 flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]",
        className,
      )}
      initial={reduced ? false : { opacity: 0, scale: 0.8, y: 10 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: 0.3 + delay },
        scale: { duration: 0.6, delay: 0.3 + delay, ease },
        y: { duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut", delay: delay },
      }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#00feff] shadow-[0_0_8px_#00feff]" />
      {children}
    </motion.span>
  );
}

function PortraitVisual() {
  const t = useTranslations("hero");
  const chips = t("roles").split("·").map((x) => x.trim());
  const pos = ["left-[2%] top-[26%]", "right-[0%] top-[16%]", "left-[6%] bottom-[24%]", "right-[4%] bottom-[30%]"];
  return (
    <div className="relative mx-auto aspect-[1.05] w-full max-w-[580px]">
      <div aria-hidden className="absolute left-1/2 top-[48%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,254,255,0.22),transparent)] blur-2xl light:bg-[radial-gradient(closest-side,rgba(14,116,144,0.18),transparent)]" />
      {/* Marco de selección como en una herramienta de diseño */}
      <div className="absolute left-1/2 top-[6%] h-[88%] w-[60%] -translate-x-1/2">
        <span className="absolute -top-6 left-0 flex items-center gap-1.5 whitespace-nowrap text-[10px] font-medium sm:text-[11px] text-accent-text light:text-[#0e7490]">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 1v14M11 1v14M1 5h14M1 11h14" /></svg>
          Cristian Hincapié — Product Designer
        </span>
        <div className="absolute inset-0 rounded-[2px] border border-[#00feff]/80 light:border-[#0e7490]/70">
          {["-left-[5px] -top-[5px]", "-right-[5px] -top-[5px]", "-bottom-[5px] -left-[5px]", "-bottom-[5px] -right-[5px]"].map((c) => (
            <span key={c} className={cn("absolute h-2.5 w-2.5 border border-[#00feff] bg-white light:border-[#0e7490]", c)} />
          ))}
        </div>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-[#00feff] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-zinc-950">
          480 × 600
        </span>
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero/profile-cutout.png"
            alt="Cristian Hincapié"
            fill
            priority
            sizes="(max-width: 1024px) 60vw, 340px"
            className="object-cover object-top light:hidden"
          />
          <Image
            src="/images/hero/profile-cristian-light.webp"
            alt="Cristian Hincapié"
            fill
            priority
            sizes="(max-width: 1024px) 60vw, 340px"
            className="hidden object-cover object-top light:block"
          />
        </div>
      </div>
      {chips.map((c, i) => (
        <FloatChip key={c} className={pos[i % pos.length]} delay={i * 0.25}>
          {c}
        </FloatChip>
      ))}
    </div>
  );
}

/* ── Visual 3 · Diseño UX/UI: del wireframe a la interfaz ─────── */

function UxUiVisual() {
  const t = useTranslations("hero");
  const reduced = !!useReducedMotion();
  const layers = ["Frame", "Header", "Hero card", "List", "Button"];
  return (
    <div className="relative mx-auto aspect-[1.05] w-full max-w-[580px] text-zinc-100 light:text-zinc-800">
      <div className="glass-surface absolute inset-[6%_0%_8%_0%] overflow-hidden rounded-[26px]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:20px_20px] light:bg-[radial-gradient(rgba(24,24,27,0.09)_1px,transparent_1px)]" />
        {/* Capas */}
        <div className="absolute bottom-[6%] left-[4%] top-[6%] hidden w-[24%] space-y-1.5 rounded-2xl border border-white/10 bg-zinc-950/70 p-3 sm:block light:border-zinc-900/10 light:bg-white/85">
          <p className="mb-2 text-[10px] font-semibold text-faint">{t("uiLayers")}</p>
          {layers.map((l, i) => (
            <p key={l} className={cn("flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10px]", i === 2 ? "bg-[#00feff]/15 text-ink" : "text-muted")} style={{ paddingLeft: i ? 14 : 6 }}>
              <span className={cn("h-2 w-2 rounded-[3px] border", i === 2 ? "border-[#00feff]" : "border-current/40")} />
              {l}
            </p>
          ))}
        </div>
        {/* Pantalla: wireframe abajo, UI arriba revelándose */}
        <div className="absolute left-1/2 top-1/2 aspect-[9/17] h-[84%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] border border-white/15 bg-zinc-950 light:border-zinc-900/15 light:bg-white">
          <div className="absolute inset-0 space-y-[6%] p-[9%]">
            <span className="block h-[4%] w-1/2 rounded border border-dashed border-current/40" />
            <span className="relative block h-[30%] rounded-lg border border-dashed border-current/40">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100"><path d="M0 0L100 100M100 0L0 100" stroke="currentColor" strokeOpacity="0.25" vectorEffect="non-scaling-stroke" /></svg>
            </span>
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="aspect-square w-[16%] rounded-md border border-dashed border-current/40" />
                <span className="h-1.5 flex-1 rounded border border-dashed border-current/30" />
              </span>
            ))}
            <span className="block h-[7%] rounded-full border border-dashed border-current/40" />
          </div>
          <motion.div
            className="absolute inset-0 space-y-[6%] bg-zinc-950 p-[9%] light:bg-white"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={reduced ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"] }}
            transition={{ duration: 7, times: [0, 0.4, 0.75, 1], repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="block h-[4%] w-1/2 rounded bg-current/70" />
            <span className="block h-[30%] rounded-lg bg-gradient-to-br from-[#00feff] to-[#6366f1]" />
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex items-center gap-2">
                <span className={cn("aspect-square w-[16%] rounded-md", i === 1 ? "bg-[#6366f1]/60" : "bg-[#00feff]/40")} />
                <span className="flex-1 space-y-1">
                  <span className="block h-1.5 w-[80%] rounded bg-current/60" />
                  <span className="block h-1.5 w-[50%] rounded bg-current/25" />
                </span>
              </span>
            ))}
            <span className="flex h-[7%] items-center justify-center rounded-full bg-[#00feff] text-[8px] font-bold text-zinc-950">CTA</span>
          </motion.div>
          <span className="absolute left-2 top-2 rounded-full bg-zinc-900/80 px-2 py-0.5 text-[9px] font-semibold text-zinc-300">Wireframe → UI</span>
        </div>
        {/* Propiedades */}
        <div className="absolute bottom-[6%] right-[4%] top-[6%] hidden w-[24%] space-y-3 rounded-2xl border border-white/10 bg-zinc-950/70 p-3 text-[10px] sm:block light:border-zinc-900/10 light:bg-white/85">
          <p className="font-semibold text-faint">{t("uiInspector")}</p>
          <div className="grid grid-cols-2 gap-1.5 tabular-nums text-muted">
            {["W 375", "H 812", "X 0", "Y 0"].map((v) => (
              <span key={v} className="rounded bg-current/[0.06] px-1.5 py-1">{v}</span>
            ))}
          </div>
          <div className="space-y-1.5">
            <p className="text-faint">Fill</p>
            <div className="flex gap-1.5">
              {["bg-[#00feff]", "bg-[#6366f1]", "bg-zinc-200", "bg-zinc-700"].map((c) => (
                <span key={c} className={cn("h-4 w-4 rounded-full ring-1 ring-white/20", c)} />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-faint">Type</p>
            <p className="font-semibold text-ink">Figtree · 16/24</p>
          </div>
          <div className="space-y-1">
            <p className="text-faint">Radius</p>
            <span className="block h-1 overflow-hidden rounded bg-current/15"><span className="block h-full w-[60%] rounded bg-[#00feff]" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Visual 4 · Service Design: blueprint de servicio ───────── */

function BlueprintVisual() {
  const t = useTranslations("hero");
  const reduced = !!useReducedMotion();
  const lanes = [t("bpUser"), t("bpFront"), t("bpBack"), t("bpSupport")];
  const cols = 5;
  // nodos activos por carril (columna)
  const nodes: [number, number][] = [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
    [0, 1], [2, 1], [3, 1],
    [1, 2], [2, 2], [4, 2],
    [2, 3], [4, 3],
  ];
  return (
    <div className="relative mx-auto aspect-[1.05] w-full max-w-[580px] text-zinc-100 light:text-zinc-800">
      <div className="glass-surface absolute inset-[6%_0%_8%_0%] overflow-hidden rounded-[26px] p-[5%]">
        {/* Curva de emoción */}
        <div className="relative h-[22%]">
          <p className="absolute left-0 top-0 text-[10px] font-semibold text-faint">{t("bpEmotion")}</p>
          <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="absolute inset-x-[18%] bottom-0 top-[18%] h-[82%] w-[82%] overflow-visible" fill="none">
            <motion.path
              d="M0 50 C 40 20, 80 70, 100 60 S 180 10, 200 30 S 280 75, 300 55 S 370 10, 400 15"
              stroke="#00feff"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease }}
            />
            {[[0, 50], [100, 60], [200, 30], [300, 55], [400, 15]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4.5" fill="#00feff" />
            ))}
          </svg>
        </div>
        {/* Carriles */}
        <div className="relative mt-[4%] grid h-[70%] grid-rows-4">
          {lanes.map((lane, r) => (
            <div key={lane} className={cn("relative grid grid-cols-[18%_1fr] items-center border-t", r === 2 ? "border-dashed border-[#00feff]/40" : "border-white/10 light:border-zinc-900/10")}>
              <span className="pr-2 text-[10px] font-semibold leading-tight text-muted">{lane}</span>
              <div className="relative grid h-full items-center" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {Array.from({ length: cols }).map((_, c) => {
                  const on = nodes.some(([nc, nr]) => nc === c && nr === r);
                  return (
                    <span key={c} className="flex justify-center">
                      {on && (
                        <motion.span
                          className={cn(
                            "h-[clamp(14px,2.4vw,22px)] w-[70%] rounded-md border",
                            r === 0 ? "border-[#00feff]/70 bg-[#00feff]/20" : r === 1 ? "border-[#6366f1]/60 bg-[#6366f1]/25" : "border-white/20 bg-white/[0.06] light:border-zinc-900/15 light:bg-zinc-900/[0.04]",
                          )}
                          initial={reduced ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + c * 0.12 + r * 0.06, ease }}
                        />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
          {/* conectores verticales (columna 2: un momento de verdad atraviesa todos los carriles) */}
          <motion.span
            aria-hidden
            className="absolute bottom-[12%] top-[12%] w-px origin-top bg-[#00feff]/70"
            style={{ left: `calc(18% + (82% / ${cols}) * 2.5)` }}
            initial={{ scaleY: reduced ? 1 : 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1, ease }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Selector de roles para móvil: píldoras que se expanden ──
   Solo la activa muestra su nombre y se llena con el avance
   del carrusel; las demás quedan como iconos (con nombre accesible). */
function RoleRail({
  slide,
  paused,
  reduced,
  onSelect,
  label,
  names,
}: {
  slide: number;
  paused: boolean;
  reduced: boolean;
  onSelect: (i: number) => void;
  label: string;
  names: string[];
}) {
  return (
    <div role="tablist" aria-label={label} className="mx-auto mt-3 flex max-w-[520px] items-center justify-center gap-1.5 min-[380px]:gap-2 lg:hidden">
      {names.map((name, i) => {
        const on = i === slide;
        return (
          <motion.button
            key={name}
            layout
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls="hero-visual"
            aria-label={name}
            onClick={() => onSelect(i)}
            transition={{ layout: { type: "spring", stiffness: 420, damping: 36 } }}
            className={cn(
              "relative isolate flex h-11 items-center min-[380px]:h-12 overflow-hidden rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00feff]/70",
              on
                ? "min-w-0 flex-1 gap-2 border-[#00feff]/60 bg-[#00feff]/[0.08] pl-1 pr-3 min-[380px]:gap-2.5 min-[380px]:pl-1.5 min-[380px]:pr-4 light:border-[#0e7490]/50 light:bg-[#0e7490]/[0.06]"
                : "w-10 shrink-0 justify-center min-[380px]:w-12 border-line-strong bg-white/[0.03] text-soft light:bg-white/70",
            )}
          >
            {on && (
              <motion.span
                key={`rail-${slide}-${paused}`}
                aria-hidden
                className="absolute inset-0 -z-10 origin-left bg-[#00feff]/[0.14] light:bg-[#0e7490]/[0.12]"
                initial={{ scaleX: reduced ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduced || paused ? 0 : SLIDE_MS / 1000, ease: "linear" }}
              />
            )}
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                on ? "bg-[#00feff] text-zinc-950" : "",
              )}
            >
              {ROLE_ICONS[i]}
            </span>
            {on && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.35, delay: 0.1 } }}
                className="min-w-0 truncate whitespace-nowrap text-[13px] font-semibold text-ink min-[380px]:text-sm"
              >
                {name}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function RoleVisual({ slide }: { slide: number }) {
  const reduced = !!useReducedMotion();
  return (
    <div className="relative [perspective:1600px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide}
          initial={reduced ? false : { opacity: 0, rotateY: -10, scale: 0.96, filter: "blur(10px)" }}
          animate={{ opacity: 1, rotateY: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease } }}
          exit={reduced ? undefined : { opacity: 0, rotateY: 8, scale: 0.97, filter: "blur(8px)", transition: { duration: 0.3 } }}
        >
          {slide === 0 && <PortraitVisual />}
          {slide === 1 && <ProductStack slide={0} />}
          {slide === 2 && <UxUiVisual />}
          {slide === 3 && <BlueprintVisual />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Marquee de la profesión (sin nombres de empresas) ─────── */

function MarqueeRow({ items, reverse, muted }: { items: string[]; reverse?: boolean; muted?: boolean }) {
  const row = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((w) => (
        <span key={w} className="flex items-center gap-8 whitespace-nowrap">
          {w}
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#00feff]/80 light:bg-[#0e7490]" />
        </span>
      ))}
    </span>
  );
  return (
    <div
      className={cn(
        "flex w-max",
        reverse ? "animate-[ch-marquee_70s_linear_infinite_reverse]" : "animate-[ch-marquee_60s_linear_infinite]",
        "group-hover:[animation-play-state:paused] motion-reduce:animate-none",
        muted ? "text-faint" : "text-soft",
      )}
    >
      {row}
      <span aria-hidden className="flex">
        {row}
      </span>
    </div>
  );
}

export function ProfessionMarquee() {
  const t = useTranslations("hero");
  const split = (s: string) => s.split("·").map((x) => x.trim()).filter(Boolean);
  const a = split(t("marquee"));
  const b = [...split(t("roles")), t("tagline1"), ...split(t("tagline2")), ...split(t("marquee2"))];
  return (
    <div
      className="group relative space-y-3 overflow-hidden border-y border-line py-6 text-sm font-medium tracking-tight md:text-base [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      aria-label={a.join(", ")}
    >
      <MarqueeRow items={a} />
      <MarqueeRow items={b} reverse muted />
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */

export function Hero() {
  const t = useTranslations("hero");
  const reduced = !!useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipeX = useRef<number | null>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [slide, paused, reduced]);

  const n = SLIDES[slide];
  const title1 = t(`slide${n}Title1`);
  const title2 = t(`slide${n}Title2`);

  const stats = [
    { v: t("statYearsValue"), l: t("statYearsLabel") },
    { v: t("statSectorsValue"), l: t("statSectorsLabel") },
    { v: t("statCraftValue"), l: t("statCraftLabel") },
  ];

  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      {/* Fondo: aurora de marca + lienzo de puntos (como el canvas de una herramienta de diseño) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_12%_8%,rgba(0,254,255,0.16),transparent_62%),radial-gradient(820px_560px_at_88%_30%,rgba(99,102,241,0.16),transparent_60%)] light:bg-[radial-gradient(900px_520px_at_12%_8%,rgba(13,148,136,0.16),transparent_62%),radial-gradient(820px_560px_at_88%_30%,rgba(99,102,241,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_45%,#000,transparent)] light:bg-[radial-gradient(rgba(24,24,27,0.12)_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-8 px-4 pb-10 pt-4 md:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pt-8 lg:gap-6 lg:pb-16">
        <div
          className="relative z-10 flex flex-col gap-6"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <motion.p
            className="flex items-center gap-2.5 text-sm text-muted"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00feff] opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00feff]" />
            </span>
            {t("kicker")}
          </motion.p>

          <h1 className="relative">
            <span className="sr-only">
              {t("line1")} {t("line2")}
            </span>
            <span aria-hidden className="block min-h-[2.1em] text-[clamp(3rem,8.4vw,6.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={slide} className="block" initial="out" animate="in" exit="exit">
                  {[title1, title2].map((line, li) => (
                    <span key={li} className="-mb-[0.1em] block overflow-hidden pb-[0.16em]">
                      {line.split(" ").map((word, wi) => (
                        <motion.span
                          key={wi}
                          className={cn("mr-[0.22em] inline-block", li === 1 && "text-gradient-accent -mb-[0.14em] pb-[0.14em]")}
                          variants={{
                            out: { y: "100%", opacity: 0, filter: "blur(8px)" },
                            in: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, delay: li * 0.08 + wi * 0.05, ease } },
                            exit: { y: "-60%", opacity: 0, filter: "blur(6px)", transition: { duration: 0.35, ease } },
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <div className="min-h-[7.5rem] max-w-xl space-y-3" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15, ease } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
                className="space-y-3"
              >
                <p className="text-lg font-medium text-ink md:text-xl">{t(`slide${n}Subtitle`)}</p>
                <p className="text-pretty text-base leading-relaxed text-muted md:text-lg">{t(`slide${n}Desc`)}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-full bg-[#00feff] px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_rgba(0,254,255,0.25)] transition hover:bg-[#7afcff] hover:shadow-[0_0_60px_rgba(0,254,255,0.4)]"
            >
              {t("ctaProjects")}
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setIsCVModalOpen(true)}
              className="glass-surface inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-ink transition hover:text-accent-text light:hover:text-[#0e7490]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5M9 13h6M9 17h4" />
              </svg>
              {t("ctaCv")}
            </button>
          </div>

          {/* Roles: tarjetas accionables que cambian la ilustración (escritorio) */}
          <div className="mt-1 hidden space-y-3 lg:block">
            <p className="flex items-center gap-2 text-xs font-medium text-faint">
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-accent-text light:text-[#0e7490]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-.5a6 6 0 0 1-4.6-2.2L4.5 15a1.5 1.5 0 0 1 2.3-1.9L9 15" />
              </svg>
              {t("rolesHint")}
            </p>
            <div role="tablist" aria-label={t("rolesLabel")} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SLIDES.map((sn, i) => {
                const on = i === slide;
                return (
                  <button
                    key={sn}
                    role="tab"
                    aria-selected={on}
                    aria-controls="hero-visual"
                    onClick={() => {
                      setSlide(i);
                    }}
                    className={cn(
                      "group relative flex min-h-[84px] cursor-pointer flex-col justify-between gap-3 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300",
                      "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00feff]/70",
                      on
                        ? "border-[#00feff]/60 bg-[#00feff]/[0.08] shadow-[0_18px_40px_-24px_rgba(0,254,255,0.8)] light:border-[#0e7490]/50 light:bg-[#0e7490]/[0.06]"
                        : "border-line-strong bg-white/[0.02] hover:border-[#00feff]/40 hover:bg-white/[0.04] light:bg-white/60",
                    )}
                  >
                    <span className="flex items-center justify-between">
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                          on ? "bg-[#00feff] text-zinc-950" : "bg-white/[0.06] text-soft group-hover:text-ink light:bg-zinc-900/[0.06]",
                        )}
                      >
                        {ROLE_ICONS[i]}
                      </span>
                      <svg aria-hidden viewBox="0 0 16 16" className={cn("h-3.5 w-3.5 transition-all", on ? "text-accent-text light:text-[#0e7490]" : "-translate-x-1 text-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100")} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                    <span className={cn("text-[13px] font-semibold leading-tight", on ? "text-ink" : "text-soft group-hover:text-ink")}>
                      {t(`slide${sn}Title1`)} {t(`slide${sn}Title2`)}
                    </span>
                    {on && (
                      <motion.span
                        key={`p-${slide}-${paused}`}
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#00feff]"
                        initial={{ scaleX: reduced ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: reduced || paused ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <dl className="mt-2 grid grid-cols-[auto_1fr_1fr] divide-x divide-line border-t border-line pt-5 text-sm">
            {stats.map((s, i) => (
              <div key={i} className={cn("space-y-1 px-4 first:pl-0", i === 0 && "pr-6")}>
                <dt className="text-[11px] text-faint">{s.l}</dt>
                <dd className={cn("font-semibold text-ink", i === 0 ? "text-3xl tracking-tight text-accent-text light:text-[#0e7490]" : "text-[13px] leading-snug")}>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-first min-w-0 lg:order-none">
          {/* Móvil y tablet: escenario con la ilustración como protagonista; se puede deslizar */}
          <div
            id="hero-visual"
            role="tabpanel"
            aria-label={`${t(`slide${n}Title1`)} ${t(`slide${n}Title2`)}`}
            className="relative mx-auto max-w-[520px] touch-pan-y max-lg:flex max-lg:h-[min(112vw,540px)] max-lg:items-center max-lg:justify-center lg:max-w-none"
            onTouchStart={(e) => {
              swipeX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (swipeX.current === null) return;
              const dx = e.changedTouches[0].clientX - swipeX.current;
              swipeX.current = null;
              if (Math.abs(dx) < 45) return;
              setSlide((s) => (s + (dx < 0 ? 1 : SLIDES.length - 1)) % SLIDES.length);
            }}
          >
            <div className={cn("w-full transition-[width,margin] duration-500", slide === 1 ? "max-lg:mt-24 max-lg:w-[min(72%,290px)]" : "max-lg:w-[min(94%,calc(100%-8px))] max-[380px]:w-[86%]")}>
              <RoleVisual slide={slide} />
            </div>
          </div>

          <RoleRail slide={slide} paused={paused} reduced={reduced} onSelect={setSlide} label={t("rolesLabel")} names={SLIDES.map((sn) => `${t(`slide${sn}Title1`)} ${t(`slide${sn}Title2`)}`)} />
        </div>
      </div>

      <ProfessionMarquee />

      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </section>
  );
}
