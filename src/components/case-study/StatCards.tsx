"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Piezas interactivas del caso de estudio.
   El color del caso llega como la variable CSS --a (definida en
   CaseStudyView según el tema claro u oscuro).
   ───────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ——— Número que cuenta al entrar en pantalla ——— */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setN(value);
      return;
    }
    const c = animate(0, value, { duration: 1.4, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {n}
    </span>
  );
}

/* ——— Pantalla del hero: se endereza en 3D con el scroll ——— */
export function CaseHeroScreen({
  src,
  alt,
  host,
  notes,
}: {
  src: string;
  alt: string;
  host: string;
  notes: { label: string; value: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const rotateX = useTransform(p, [0, 1], [reduced ? 0 : 22, 0]);
  const scale = useTransform(p, [0, 1], [reduced ? 1 : 0.88, 1]);
  const y = useTransform(p, [0, 1], [reduced ? 0 : 60, 0]);
  const glow = useTransform(p, [0, 1], [0.15, 0.45]);

  return (
    <div ref={ref} className="relative [perspective:1600px]">
      <motion.div
        aria-hidden
        className="absolute inset-x-[8%] -bottom-6 top-[20%] -z-10 rounded-[3rem] blur-3xl"
        style={{ backgroundColor: "var(--a)", opacity: glow }}
      />
      <motion.div style={{ rotateX, scale, y, transformOrigin: "50% 100%" }} className="relative">
        <div className="overflow-hidden rounded-[22px] border border-line-strong bg-zinc-950 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] md:rounded-[28px]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-900/90 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="mx-auto hidden max-w-xs flex-1 truncate rounded-full bg-white/[0.06] px-4 py-1 text-center text-xs text-zinc-400 sm:block">
              {host}
            </span>
          </div>
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1000}
            sizes="(min-width: 1280px) 1200px, 100vw"
            quality={90}
            priority
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>

        {/* Anotaciones tipo inspector */}
        {notes.map((n, i) => (
          <motion.div
            key={n.label}
            className={cn(
              "absolute hidden items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/90 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl md:flex",
              i === 0 ? "-left-6 top-[18%]" : "-right-6 bottom-[16%]",
            )}
            initial={reduced ? false : { opacity: 0, x: i === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease }}
          >
            <span className="text-3xl font-semibold tracking-tight" style={{ color: "var(--acc)" }}>
              <CountUp value={n.value} />
            </span>
            <span className="max-w-[7rem] text-xs leading-tight text-zinc-300">{n.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ——— Dock del caso: aparece tras el hero y marca la sección activa ——— */
export function CaseDock({ items, title }: { items: { id: string; label: string }[]; title: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const first = document.getElementById(items[0]?.id ?? "");
      const footer = document.querySelector("footer");
      const top = first ? first.getBoundingClientRect().top : 0;
      const nearEnd = footer ? footer.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setShow(top < window.innerHeight * 0.7 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [items]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <motion.nav
      aria-label={title}
      initial={false}
      animate={show ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className={cn(
        "fixed inset-x-0 bottom-4 z-40 flex justify-center px-3",
        !show && "pointer-events-none",
      )}
    >
      <div className="relative max-w-full overflow-hidden rounded-full border border-line-strong bg-zinc-950/85 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl light:bg-white/90">
        <ol ref={listRef} className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it) => {
            const on = it.id === active;
            return (
              <li key={it.id} data-id={it.id} className="shrink-0">
                <a
                  href={`#${it.id}`}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "relative isolate flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                    on ? "font-semibold text-zinc-950 light:text-white" : "text-muted hover:text-ink",
                  )}
                >
                  {on ? (
                    <motion.span
                      layoutId="case-dock-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[color:var(--a)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {it.label}
                </a>
              </li>
            );
          })}
        </ol>
        <motion.span aria-hidden className="absolute bottom-0 left-0 h-[2px] bg-[color:var(--a)] opacity-60" style={{ width }} />
      </div>
    </motion.nav>
  );
}

/* ——— Proceso: carril horizontal fijado (desktop) / vertical (móvil) ——— */
type Step = { title: string; text: string };

function StepArt({ i }: { i: number }) {
  const common = "h-full w-full";
  if (i === 0)
    return (
      <svg viewBox="0 0 200 120" className={common} fill="none">
        <rect x="14" y="18" width="104" height="34" rx="17" className="fill-white/[0.06] stroke-line-strong light:fill-zinc-900/[0.04]" />
        <rect x="30" y="31" width="60" height="8" rx="4" className="fill-current opacity-30" />
        <rect x="82" y="64" width="104" height="34" rx="17" style={{ fill: "var(--a)", opacity: 0.18 }} />
        <rect x="98" y="77" width="72" height="8" rx="4" style={{ fill: "var(--a)" }} />
        <circle cx="160" cy="34" r="14" className="stroke-current opacity-40" strokeWidth="2" />
        <path d="m170 44 10 10" className="stroke-current opacity-40" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (i === 1)
    return (
      <svg viewBox="0 0 200 120" className={common} fill="none">
        <path d="M34 60 C70 60 70 26 104 26 M104 26 C140 26 140 92 172 92 M34 60 C70 60 70 94 104 94" className="stroke-current opacity-30" strokeWidth="2" />
        {[
          [34, 60],
          [104, 26],
          [104, 94],
          [172, 92],
        ].map(([x, y], k) => (
          <circle key={k} cx={x} cy={y} r={k === 3 ? 10 : 8} style={k === 3 ? { fill: "var(--a)" } : undefined} className={k === 3 ? "" : "fill-canvas stroke-current"} strokeWidth="2" />
        ))}
      </svg>
    );
  if (i === 2)
    return (
      <svg viewBox="0 0 200 120" className={common} fill="none">
        <rect x="50" y="8" width="100" height="104" rx="14" className="stroke-current opacity-40" strokeWidth="2" />
        <rect x="62" y="22" width="76" height="30" rx="6" style={{ fill: "var(--a)", opacity: 0.25 }} />
        <path d="M62 22 138 52 M138 22 62 52" className="stroke-current opacity-30" strokeWidth="1.5" />
        <rect x="62" y="62" width="50" height="7" rx="3.5" className="fill-current opacity-30" />
        <rect x="62" y="76" width="66" height="7" rx="3.5" className="fill-current opacity-20" />
        <rect x="62" y="92" width="76" height="12" rx="6" style={{ fill: "var(--a)" }} />
      </svg>
    );
  return (
    <svg viewBox="0 0 200 120" className={common} fill="none">
      {[46, 70, 58, 84, 96].map((h, k) => (
        <rect key={k} x={28 + k * 30} y={110 - h} width="18" height={h} rx="5" style={k === 4 ? { fill: "var(--a)" } : undefined} className={k === 4 ? "" : "fill-current opacity-20"} />
      ))}
      <path d="M37 60 67 40 97 50 127 28 157 16" className="stroke-current opacity-50" strokeWidth="2" strokeLinecap="round" />
      <circle cx="157" cy="16" r="6" style={{ fill: "var(--a)" }} />
    </svg>
  );
}

function StepCard({ s, i, total }: { s: Step; i: number; total: number }) {
  return (
    <article className="glass-surface relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 md:p-9">
      <div className="flex items-center justify-between text-sm text-faint">
        <span className="font-semibold text-[color:var(--a)]">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span>
          {i + 1} / {total}
        </span>
      </div>
      <div className="my-8 h-32 text-ink md:h-40">
        <StepArt i={i} />
      </div>
      <h3 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{s.title}</h3>
      <p className="mt-4 text-pretty text-base leading-relaxed text-soft md:text-lg">{s.text}</p>
    </article>
  );
}

function TrackLine({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="relative mt-10 h-[3px] rounded-full bg-line">
      <motion.div className="absolute inset-y-0 left-0 rounded-full bg-[color:var(--a)]" style={{ width }} />
      <motion.span
        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--a)] shadow-[0_0_20px_var(--a)]"
        style={{ left: width }}
      />
    </div>
  );
}

export function ProcessTrack({ steps, heading, intro }: { steps: Step[]; heading: string; intro: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setDesktop(mq.matches && !reduced);
      const tr = trackRef.current;
      if (tr) setShift(Math.max(0, tr.scrollWidth - tr.clientWidth));
    };
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced]);

  useEffect(() => {
    const tr = trackRef.current;
    if (!desktop || !tr) return;
    const measure = () => setShift(Math.max(0, tr.scrollWidth - tr.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    return () => ro.disconnect();
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(p, [0, 1], [0, -shift]);

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <h2 className="max-w-[14ch] text-balance text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">{heading}</h2>
      <p className="max-w-md text-pretty text-base leading-relaxed text-muted">{intro}</p>
    </div>
  );

  return (
    <div ref={ref} style={desktop ? { height: `${100 + steps.length * 45}vh` } : undefined} className="relative">
      {desktop ? (
        <div className="sticky top-0 flex h-svh flex-col justify-center">
          {header}
          <div ref={trackRef} className="mt-12">
            <motion.div style={{ x }} className="flex gap-6">
              {steps.map((s, i) => (
                <div key={s.title} className="w-[min(30rem,40vw)] shrink-0">
                  <StepCard s={s} i={i} total={steps.length} />
                </div>
              ))}
              <div className="w-[10vw] shrink-0" aria-hidden />
            </motion.div>
          </div>
          <TrackLine progress={p} />
        </div>
      ) : (
        <div className="space-y-10">
          {header}
          <div className="grid gap-5 md:grid-cols-2">
            {steps.map((s, i) => (
              <StepCard key={s.title} s={s} i={i} total={steps.length} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ——— Aprendizaje: las palabras se encienden con el scroll ——— */
function Word({ w, i, n, progress }: { w: string; i: number; n: number; progress: MotionValue<number> }) {
  const start = i / n;
  const opacity = useTransform(progress, [start, Math.min(1, start + 1.5 / n)], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {w}
    </motion.span>
  );
}

export function ScrollQuote({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="text-balance text-[clamp(1.9rem,4.4vw,4.2rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink"
    >
      {reduced
        ? text
        : words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} progress={scrollYProgress} />)}
    </p>
  );
}
