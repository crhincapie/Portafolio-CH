"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/content/testimonials";
import { pickLocale } from "@/content/i18n";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   TESTIMONIOS · "El hilo"
   El feedback llega como en el canal de un equipo de producto:
   al hacer scroll alguien escribe, aparece su mensaje y empuja
   a los anteriores. En móvil, el hilo se lee de forma natural.
   ───────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;
const AVATAR = [
  "from-[#00feff] to-[#0e7490] text-zinc-950",
  "from-[#6366f1] to-[#312e81] text-white",
  "from-[#2dd4bf] to-[#115e59] text-zinc-950",
  "from-[#c084fc] to-[#6b21a8] text-white",
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

function Avatar({ i, name, size = "md" }: { i: number; name: string; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold ring-2 ring-[var(--canvas)]",
        AVATAR[i % AVATAR.length],
        size === "sm" ? "h-8 w-8 text-[10px]" : "h-10 w-10 text-xs",
      )}
    >
      {initials(name)}
    </span>
  );
}

function Typing({ name, i }: { name: string; i: number }) {
  const t = useTranslations("testimonials");
  return (
    <motion.div
      layout
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      <Avatar i={i} name={name} size="sm" />
      <span className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-white/[0.06] px-3.5 py-3 light:bg-zinc-900/[0.06]">
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="h-1.5 w-1.5 rounded-full bg-current text-soft"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
          />
        ))}
      </span>
      <span className="text-xs text-faint">{t("typing", { name: name.split(" ")[0] })}</span>
    </motion.div>
  );
}

function Message({ i, compact }: { i: number; compact?: boolean }) {
  const locale = useLocale();
  const q = testimonials[i];
  return (
    <motion.figure
      layout
      className="flex gap-3"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } }}
    >
      <Avatar i={i} name={q.name} />
      <div className="min-w-0 flex-1 space-y-1.5">
        <figcaption className="flex flex-wrap items-baseline gap-x-2 text-sm">
          <span className="font-semibold text-ink">{q.name}</span>
          <span className="text-xs text-faint">
            {pickLocale(locale, q.role)} · {q.company}
          </span>
        </figcaption>
        <blockquote
          className={cn(
            "glass-surface rounded-2xl rounded-tl-md px-4 py-3.5 text-pretty leading-relaxed text-soft",
            compact ? "text-[15px]" : "text-[15px] md:text-base",
          )}
        >
          {q.sectionTitle && (
            <span className="mb-2 inline-flex rounded-full bg-[#00feff]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-text light:bg-[#0e7490]/10 light:text-[#0e7490]">
              {pickLocale(locale, q.sectionTitle)}
            </span>
          )}
          <span className="block">{pickLocale(locale, q.quote)}</span>
        </blockquote>
      </div>
    </motion.figure>
  );
}

function ChannelHeader() {
  const t = useTranslations("testimonials");
  return (
    <div className="flex items-center justify-between border-b border-line px-5 py-4">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00feff]/15 text-sm font-bold text-accent-text light:text-[#0e7490]">#</span>
        <div>
          <p className="text-sm font-semibold text-ink">{t("channel")}</p>
          <p className="text-[11px] text-faint">{t("members", { count: testimonials.length })}</p>
        </div>
      </div>
      <div className="flex -space-x-2">
        {testimonials.map((q, i) => (
          <Avatar key={q.name} i={i} name={q.name} size="sm" />
        ))}
      </div>
    </div>
  );
}

function Heading() {
  const t = useTranslations("testimonials");
  return (
    <div className="space-y-4">
      <p className="accent-chip text-xs font-semibold uppercase tracking-[0.35em]">{t("kicker")}</p>
      <h2 className="text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">{t("title")}</h2>
      <p className="max-w-md text-pretty text-base leading-relaxed text-muted md:text-lg">{t("subtitle")}</p>
    </div>
  );
}

/* Escritorio: hilo anclado al scroll */
function PinnedThread() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const n = testimonials.length;
  const [state, setState] = useState({ count: reduced ? n : 1, typing: false });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced) return;
    const x = p * n;
    const count = Math.min(n, Math.max(1, Math.floor(x) + 1));
    const typing = count < n && x - Math.floor(x) > 0.55;
    if (count !== state.count || typing !== state.typing) setState({ count, typing });
  });

  const current = Math.min(n - 1, state.count - 1);

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${n * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[0.85fr_1.15fr] items-center gap-14 px-6 pt-16">
          <div className="space-y-10">
            <Heading />
            <ol className="space-y-1">
              {testimonials.map((q, i) => (
                <li
                  key={q.name}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-500",
                    i === current ? "bg-white/[0.05] light:bg-zinc-900/[0.04]" : "opacity-45",
                  )}
                >
                  <Avatar i={i} name={q.name} size="sm" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{q.name}</span>
                    <span className="block truncate text-xs text-faint">{q.company}</span>
                  </span>
                  {i < state.count && (
                    <svg aria-hidden viewBox="0 0 16 16" className="ml-auto h-4 w-4 text-accent-text light:text-[#0e7490]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 8.5l3 3 5-6M7 11.5l1 0 5-6" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="glass-surface glass-blur flex h-[min(74vh,680px)] flex-col overflow-hidden rounded-[28px]">
            <ChannelHeader />
            <div className="relative flex flex-1 flex-col justify-end gap-6 overflow-hidden p-6 [mask-image:linear-gradient(to_bottom,transparent,#000_22%)]" aria-live="polite">
              {testimonials.slice(0, state.count).map((q, i) => (
                <Message key={q.name} i={i} />
              ))}
              <AnimatePresence>{state.typing && <Typing key="typing" i={state.count} name={testimonials[state.count].name} />}</AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Móvil / tablet: el hilo completo, con cada mensaje entrando al leerse */
function StaticThread() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 md:px-6 lg:hidden">
      <Heading />
      <div className="glass-surface overflow-hidden rounded-[28px]">
        <ChannelHeader />
        <div className="space-y-7 p-5">
          {testimonials.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.6, ease }}
            >
              <Message i={i} compact />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="glass-ambient scroll-mt-28 border-b border-line py-24 lg:py-0">
      <PinnedThread />
      <StaticThread />
    </section>
  );
}
