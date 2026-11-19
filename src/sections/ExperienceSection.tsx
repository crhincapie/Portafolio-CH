"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { experienceItems, originChapter } from "@/content/experience";
import { pickLocale } from "@/content/i18n";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   EXPERIENCIA · El recorrido
   Una historia anclada al scroll: cada capítulo es una etapa de
   la carrera (del origen gráfico al liderazgo de producto) con su
   escena, sus años y sus logros. En móvil se convierte en una
   línea de tiempo vertical.
   ───────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

type Chapter = {
  id: string;
  dates: string;
  title: string;
  role: string;
  summary: string;
  /** Solo en el origen: la progresión de roles iniciales. */
  path?: string[];
  scene: ReactNode;
};

/* ── Escenas (vectoriales, coherentes con cada etapa) ─────── */

function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("absolute rounded-2xl border border-white/10 bg-zinc-950/70 light:border-zinc-900/10 light:bg-white/80", className)}>{children}</div>;
}

function Bar({ w, className }: { w: string; className?: string }) {
  return <span className={cn("block h-1.5 rounded bg-current/30", className)} style={{ width: w }} />;
}

function SceneOrigin() {
  return (
    <>
      <Frame className="inset-[10%_34%_10%_8%] overflow-hidden">
        <span className="absolute left-[10%] top-[8%] text-[clamp(56px,7vw,104px)] font-semibold leading-none tracking-tighter">Aa</span>
        <span className="absolute bottom-[12%] right-[10%] h-[34%] w-[46%] rounded-full bg-[#00feff]/80 mix-blend-screen light:mix-blend-multiply" />
        <span className="absolute bottom-[22%] right-[30%] h-[30%] w-[40%] rounded-full bg-[#6366f1]/80 mix-blend-screen light:mix-blend-multiply" />
        <span className="absolute bottom-[8%] left-[10%] flex flex-col gap-1.5">
          <Bar w="70px" />
          <Bar w="44px" />
        </span>
      </Frame>
      {/* Herramienta pluma: curva bézier con manejadores */}
      <svg viewBox="0 0 300 220" className="absolute inset-[14%_6%_14%_44%] h-[72%] w-[50%] overflow-visible" fill="none">
        <motion.path
          d="M20 180 C 60 40, 170 30, 200 110 S 270 190, 285 60"
          stroke="#00feff"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease }}
        />
        <path d="M60 40 L200 110 L170 30" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 4" />
        {[
          [20, 180],
          [200, 110],
          [285, 60],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 5} y={y - 5} width="10" height="10" fill="white" stroke="#00feff" strokeWidth="1.5" />
        ))}
        {[
          [60, 40],
          [170, 30],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#00feff" />
        ))}
      </svg>
    </>
  );
}

function SceneFitpal() {
  const code = [
    ["text-[#c084fc]", "50%"],
    ["text-[#00feff]", "70%"],
    ["text-current", "56%"],
    ["text-[#00feff]", "40%"],
    ["text-current", "64%"],
    ["text-[#c084fc]", "34%"],
    ["text-current", "52%"],
  ] as const;
  return (
    <>
      <Frame className="inset-[12%_36%_12%_6%] overflow-hidden">
        <div className="flex h-[11%] items-center gap-1.5 border-b border-white/10 px-[5%] light:border-zinc-900/10">
          {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c) => (
            <span key={c} className={cn("h-2 w-2 rounded-full", c)} />
          ))}
          <span className="ml-3 text-[10px] text-faint">App.tsx</span>
        </div>
        <div className="space-y-[5%] p-[7%]">
          {code.map(([c, w], i) => (
            <motion.span
              key={i}
              className={cn("block h-1.5 rounded bg-current opacity-60", c)}
              style={{ marginLeft: `${(i % 3) * 8}%` }}
              initial={{ width: 0 }}
              animate={{ width: w }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease }}
            />
          ))}
        </div>
      </Frame>
      <Frame className="inset-[6%_8%_6%_58%] overflow-hidden rounded-[22px]">
        <span className="absolute left-1/2 top-[3%] h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-current/20" />
        <div className="absolute inset-x-[8%] top-[12%] h-[26%] rounded-xl bg-gradient-to-br from-[#00feff]/70 to-[#6366f1]/70" />
        <div className="absolute inset-x-[8%] top-[44%] space-y-[8%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-5 w-5 shrink-0 rounded-full bg-current/15" />
              <span className="flex-1 space-y-1">
                <Bar w="80%" />
                <Bar w="50%" className="bg-current/20" />
              </span>
            </div>
          ))}
        </div>
        <span className="absolute inset-x-[8%] bottom-[5%] flex h-[8%] items-center justify-center rounded-full bg-[#00feff] text-[9px] font-bold text-zinc-950">CTA</span>
      </Frame>
    </>
  );
}

function SceneBank() {
  return (
    <>
      <Frame className="inset-[6%_30%_6%_30%] overflow-hidden rounded-[24px]">
        <span className="absolute left-1/2 top-[3%] h-[2.5%] w-[28%] -translate-x-1/2 rounded-full bg-current/20" />
        <div className="absolute inset-x-[8%] top-[10%] h-[30%] overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-[7%] text-white light:from-zinc-900 light:to-zinc-700">
          <span className="block text-[9px] opacity-60">Balance</span>
          <span className="mt-1 block text-[clamp(14px,1.6vw,22px)] font-semibold tracking-tight">$ ••••••</span>
          <span className="absolute bottom-[12%] right-[8%] h-5 w-8 rounded bg-[#00feff]/80" />
        </div>
        <div className="absolute inset-x-[8%] top-[46%] space-y-[9%]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={cn("h-5 w-5 shrink-0 rounded-lg", i % 2 ? "bg-[#6366f1]/40" : "bg-[#00feff]/30")} />
              <span className="flex-1 space-y-1">
                <Bar w="70%" />
                <Bar w="40%" className="bg-current/20" />
              </span>
              <Bar w="18%" />
            </div>
          ))}
        </div>
      </Frame>
      <motion.div
        className="glass-surface absolute right-[8%] top-[20%] flex items-center gap-2 rounded-2xl px-3 py-2.5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#00feff]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6z" />
          <path d="M8.5 12l2.5 2.5 4.5-5" />
        </svg>
        <Bar w="56px" className="bg-current/40" />
      </motion.div>
      <motion.div
        className="glass-surface absolute bottom-[18%] left-[7%] w-[22%] space-y-2 rounded-2xl p-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease }}
      >
        <Bar w="70%" />
        <span className="block h-1.5 overflow-hidden rounded bg-current/15">
          <motion.span className="block h-full rounded bg-[#00feff]" initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 1.2, delay: 0.6, ease }} />
        </span>
      </motion.div>
    </>
  );
}

function SceneADL() {
  const nodes = [
    { x: 30, y: 40, w: 70 },
    { x: 150, y: 40, w: 70 },
    { x: 270, y: 20, w: 70 },
    { x: 270, y: 90, w: 70 },
    { x: 150, y: 150, w: 70 },
    { x: 270, y: 170, w: 70 },
  ];
  const links = [
    [0, 1],
    [1, 2],
    [1, 3],
    [3, 4],
    [4, 5],
  ];
  return (
    <>
      <svg viewBox="0 0 370 230" className="absolute inset-[10%_6%_26%_6%] h-[64%] w-[88%] overflow-visible" fill="none">
        {links.map(([a, b], i) => {
          const A = nodes[a];
          const B = nodes[b];
          return (
            <motion.path
              key={i}
              d={`M${A.x + A.w} ${A.y + 16} C ${A.x + A.w + 30} ${A.y + 16}, ${B.x - 30} ${B.y + 16}, ${B.x} ${B.y + 16}`}
              stroke="#00feff"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease }}
            />
          );
        })}
        {nodes.map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width={n.w} height="32" rx={i === 3 ? 16 : 8} className="fill-zinc-950/80 light:fill-white" stroke="currentColor" strokeOpacity="0.3" />
            <rect x={n.x + 12} y={n.y + 13} width={n.w * 0.55} height="5" rx="2.5" fill="currentColor" fillOpacity="0.45" />
          </g>
        ))}
      </svg>
      <motion.div
        className="glass-surface absolute bottom-[8%] left-[6%] right-[44%] space-y-2 rounded-2xl p-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
      >
        <div className="flex items-center justify-between">
          <Bar w="40%" />
          <span className="text-[10px] font-semibold text-[#00feff]">5/5</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-1.5 flex-1 rounded bg-[#00feff]/70" />
          ))}
        </div>
      </motion.div>
      <motion.span
        className="absolute bottom-[10%] right-[8%] h-[16%] w-[22%] rotate-[4deg] rounded-md bg-[#6366f1]/40 p-2"
        initial={{ opacity: 0, rotate: 12 }}
        animate={{ opacity: 1, rotate: 4 }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
      >
        <Bar w="80%" className="bg-current/50" />
        <Bar w="56%" className="mt-1.5 bg-current/40" />
      </motion.span>
    </>
  );
}

function SceneCompensar() {
  return (
    <>
      <Frame className="inset-[8%_40%_30%_6%] grid grid-cols-3 gap-[6%] p-[6%]">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={i}
            className={cn("rounded-lg border border-current/15", i === 0 ? "bg-[#00feff]/70" : i === 4 ? "bg-[#6366f1]/50" : "bg-current/[0.06]")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
          />
        ))}
      </Frame>
      {/* IA aplicada */}
      <motion.div
        className="glass-surface absolute bottom-[10%] left-[6%] right-[40%] flex items-center gap-2.5 rounded-full px-4 py-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#00feff]" fill="currentColor">
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
        </svg>
        <motion.span className="block h-1.5 rounded bg-current/40" initial={{ width: 0 }} animate={{ width: "64%" }} transition={{ duration: 1, delay: 0.7, ease }} />
        <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-[#00feff]" />
      </motion.div>
      {/* Automatización */}
      <svg viewBox="0 0 160 260" className="absolute inset-[8%_6%_8%_64%] h-[84%] w-[30%] overflow-visible" fill="none">
        {[30, 110, 190].map((y, i) => (
          <g key={i}>
            {i < 2 && (
              <motion.path d={`M80 ${y + 40} V ${y + 80}`} stroke="#00feff" strokeWidth="1.5" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 + i * 0.3 }} />
            )}
            <rect x="30" y={y} width="100" height="40" rx="12" className="fill-zinc-950/80 light:fill-white" stroke={i === 1 ? "#00feff" : "currentColor"} strokeOpacity={i === 1 ? 0.9 : 0.3} />
            <circle cx="52" cy={y + 20} r="8" fill={i === 1 ? "#00feff" : "currentColor"} fillOpacity={i === 1 ? 0.9 : 0.25} />
            <rect x="68" y={y + 17} width="46" height="6" rx="3" fill="currentColor" fillOpacity="0.4" />
          </g>
        ))}
      </svg>
    </>
  );
}

function SceneToday() {
  const layers = [0, 1, 2, 3, 4];
  return (
    <>
      <div className="absolute inset-0 [perspective:1400px]">
        <div className="absolute left-1/2 top-1/2 h-[46%] w-[52%] -translate-x-1/2 -translate-y-1/2 [transform:rotateX(58deg)_rotateZ(-38deg)] [transform-style:preserve-3d]">
          {layers.map((i) => (
            <motion.span
              key={i}
              className={cn(
                "absolute inset-0 rounded-xl border",
                i === 4 ? "border-[#00feff]/70 bg-zinc-950/90 shadow-[0_30px_60px_-30px_rgba(0,254,255,0.6)] light:bg-white" : "border-white/15 bg-white/[0.04] light:border-zinc-900/15 light:bg-white/50",
              )}
              initial={{ z: i * 40 }}
              animate={{ z: i * 6 }}
              transition={{ duration: 1.4, delay: 0.2, ease }}
            >
              {i === 4 && (
                <span className="absolute inset-[12%] grid grid-cols-3 gap-[6%]">
                  <span className="col-span-3 rounded bg-[#00feff]/70" />
                  <span className="rounded bg-current/15" />
                  <span className="rounded bg-current/15" />
                  <span className="rounded bg-current/15" />
                </span>
              )}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-[10%] left-1/2 flex -translate-x-1/2 items-center">
        {["CH", "PM", "DEV", "UX", "QA"].map((s, i) => (
          <motion.span
            key={s}
            className={cn(
              "-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--canvas)] text-[9px] font-bold first:ml-0",
              i === 0 ? "bg-[#00feff] text-zinc-950" : "bg-zinc-800 text-zinc-300 light:bg-zinc-200 light:text-zinc-700",
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </>
  );
}

/* ── Datos del recorrido ─────────────────────────────────── */

function useChapters(): Chapter[] {
  const t = useTranslations("experience");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const byId = Object.fromEntries(experienceItems.map((e) => [e.id, e]));
  const job = (id: string, scene: ReactNode): Chapter => {
    const e = byId[id];
    return {
      id,
      dates: pickLocale(locale, e.dates),
      title: pickLocale(locale, e.company),
      role: pickLocale(locale, e.role),
      summary: pickLocale(locale, e.summary),
      scene,
    };
  };
  return [
    {
      id: "origen",
      dates: pickLocale(locale, originChapter.dates),
      title: t("originTitle"),
      role: t("originRole"),
      summary: t("originSummary"),
      path: originChapter.path.map((r) => pickLocale(locale, r)),
      scene: <SceneOrigin />,
    },
    job("fitpal", <SceneFitpal />),
    job("scotiabank", <SceneBank />),
    job("adl", <SceneADL />),
    job("compensar", <SceneCompensar />),
    {
      id: "hoy",
      dates: t("nowDates"),
      title: t("nowTitle"),
      role: tf("subtitle"),
      summary: t("nowSummary"),
      scene: <SceneToday />,
    },
  ];
}

function Stage({ chapter, className }: { chapter: Chapter; className?: string }) {
  return (
    <div className={cn("glass-surface relative aspect-[16/11] w-full overflow-hidden rounded-[28px] text-zinc-100 light:text-zinc-800", className)}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] light:bg-[radial-gradient(rgba(24,24,27,0.09)_1px,transparent_1px)]" />
      {chapter.scene}
    </div>
  );
}

function ChapterText({ c, index, total, compact }: { c: Chapter; index: number; total: number; compact?: boolean }) {
  const t = useTranslations("experience");
  return (
    <div className="space-y-5">
      <p className="text-xs font-semibold tabular-nums text-faint">
        {t("chapter")} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <div className="space-y-2">
        <p className="text-sm font-semibold tabular-nums tracking-wide text-accent-text light:text-[#0e7490]">{c.dates}</p>
        <h3 className={cn("font-semibold tracking-[-0.04em] text-ink", compact ? "text-3xl" : "text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[0.98]")}>{c.title}</h3>
        <p className="text-base font-medium text-soft">{c.role}</p>
      </div>
      <p className={cn("text-pretty leading-relaxed text-soft", compact ? "text-[15px]" : "text-base md:text-[17px]")}>{c.summary}</p>
      {c.path && (
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 pt-1" aria-label={c.role}>
          {c.path.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium",
                  i === c.path!.length - 1
                    ? "border-[#00feff]/60 bg-[#00feff]/10 text-ink"
                    : "border-line-strong text-soft",
                )}
              >
                {step}
              </span>
              {i < c.path!.length - 1 && (
                <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3 text-faint" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* ── Escritorio: historia anclada al scroll ─────────────── */

function PinnedJourney({ chapters }: { chapters: Chapter[] }) {
  const t = useTranslations("experience");
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const fillH = useTransform(fill, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(chapters.length - 1, Math.max(0, Math.floor(p * chapters.length)));
    if (i !== index) setIndex(i);
  });

  const c = chapters[index];
  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / chapters.length), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${chapters.length * 85}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_minmax(0,0.92fr)_minmax(0,1.08fr)] items-center gap-12 px-6 pt-16">
          {/* Riel de años */}
          <nav aria-label={t("kicker")} className="relative flex h-[62vh] flex-col justify-between py-1">
            <span aria-hidden className="absolute left-[5px] top-0 h-full w-px bg-line-strong" />
            <motion.span aria-hidden className="absolute left-[5px] top-0 w-px bg-[#00feff] shadow-[0_0_10px_#00feff]" style={{ height: fillH }} />
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => jump(i)}
                aria-current={i === index ? "step" : undefined}
                className="group relative flex items-center gap-3 text-left"
              >
                <span
                  className={cn(
                    "relative z-10 h-[11px] w-[11px] rounded-full border transition-all duration-500",
                    i <= index ? "border-[#00feff] bg-[#00feff] shadow-[0_0_10px_#00feff]" : "border-line-strong bg-[var(--canvas)]",
                  )}
                />
                <span className={cn("text-xs font-medium tabular-nums transition-colors", i === index ? "text-ink" : "text-faint group-hover:text-soft")}>
                  {ch.dates.split("—")[0].trim().replace(/^[A-Za-zé]+\s/, "")}
                </span>
              </button>
            ))}
          </nav>

          <div className="relative min-h-[64vh]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={c.id}
                initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } }}
                exit={reduced ? undefined : { opacity: 0, y: -20, filter: "blur(6px)", transition: { duration: 0.3 } }}
                className="flex min-h-[64vh] flex-col justify-center"
              >
                <ChapterText c={c} index={index} total={chapters.length} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative [perspective:1600px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={c.id}
                initial={reduced ? false : { opacity: 0, rotateY: -14, scale: 0.94, filter: "blur(8px)" }}
                animate={{ opacity: 1, rotateY: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease } }}
                exit={reduced ? undefined : { opacity: 0, rotateY: 12, scale: 0.96, filter: "blur(8px)", transition: { duration: 0.35 } }}
              >
                <Stage chapter={c} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-5 flex items-center gap-3 text-xs text-faint">
              <span className="h-px w-8 bg-line-strong" />
              {t("scrollHint")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Móvil / tablet: línea de tiempo vertical ───────────── */

function TimelineJourney({ chapters }: { chapters: Chapter[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <ol ref={ref} className="relative space-y-16 pl-8 lg:hidden">
      <span aria-hidden className="absolute left-[5px] top-2 h-full w-px bg-line-strong" />
      <motion.span aria-hidden className="absolute left-[5px] top-2 h-full w-px origin-top bg-[#00feff] shadow-[0_0_10px_#00feff]" style={{ scaleY }} />
      {chapters.map((c, i) => (
        <li key={c.id} className="relative space-y-6">
          <span aria-hidden className="absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border border-[#00feff] bg-[#00feff] shadow-[0_0_10px_#00feff]" />
          <ChapterText c={c} index={i} total={chapters.length} compact />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.8, ease }}
          >
            <Stage chapter={c} className="rounded-3xl" />
          </motion.div>
        </li>
      ))}
    </ol>
  );
}

export function ExperienceSection() {
  const t = useTranslations("experience");
  const chapters = useChapters();
  return (
    <section id="experiencia" className="glass-ambient scroll-mt-28 border-b border-line pt-24 md:pt-36">
      <div className="mx-auto max-w-6xl space-y-4 px-4 md:px-6">
        <p className="accent-chip text-xs font-semibold uppercase tracking-[0.35em]">{t("kicker")}</p>
        <h2 className="max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">{t("title")}</h2>
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">{t("subtitle")}</p>
      </div>
      <PinnedJourney chapters={chapters} />
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-14 md:px-6 lg:hidden">
        <TimelineJourney chapters={chapters} />
      </div>
    </section>
  );
}
