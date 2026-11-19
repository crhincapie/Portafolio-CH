"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

/* Enfoque · "Diseño como sistema de decisiones": cuatro principios
   orbitan una decisión central y se conectan con ella. */

const ease = [0.22, 1, 0.36, 1] as const;

function DecisionSystem() {
  const t = useTranslations("approach");
  const reduced = !!useReducedMotion();
  const pills = [t("pill1"), t("pill2"), t("pill3"), t("pill4")];
  // posiciones en un lienzo 440×440 (centro 220,220)
  const pos = [
    { x: 220, y: 62 },
    { x: 356, y: 220 },
    { x: 220, y: 378 },
    { x: 84, y: 220 },
  ];
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[460px]" aria-label={`${t("core")}: ${pills.join(", ")}`}>
      <svg viewBox="0 0 440 440" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden fill="none">
        <circle cx="220" cy="220" r="158" className="stroke-line-strong" strokeWidth="1" />
        <motion.circle
          cx="220"
          cy="220"
          r="196"
          className="stroke-line"
          strokeWidth="1"
          strokeDasharray="2 8"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "220px 220px" }}
        />
        {pos.map((p, i) => (
          <motion.line
            key={i}
            x1="220"
            y1="220"
            x2={p.x}
            y2={p.y}
            stroke="#00feff"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease }}
          />
        ))}
        {/* pulso que recorre el sistema */}
        {!reduced && (
          <motion.circle
            r="3.5"
            fill="#00feff"
            animate={{ cx: [220, 220, 356, 220, 220, 84, 220], cy: [220, 62, 220, 378, 378, 220, 220] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#00feff] text-center text-sm font-bold text-zinc-950 shadow-[0_0_60px_rgba(0,254,255,0.45)]"
        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {t("core")}
      </motion.div>

      {pills.map((label, i) => (
        <motion.div
          key={label}
          className="glass-surface glass-blur absolute w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-2xl px-3 py-2.5 text-center text-[13px] font-semibold leading-snug text-ink"
          style={{ left: `${(pos[i].x / 440) * 100}%`, top: `${(pos[i].y / 440) * 100}%` }}
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.7, delay: 0.6 + i * 0.12, ease }}
        >
          {label}
        </motion.div>
      ))}
    </figure>
  );
}

export function ApproachSection() {
  const t = useTranslations("approach");
  const paragraphs = t("body").split("\n\n");

  return (
    <section id="enfoque" className="glass-ambient scroll-mt-28 border-b border-line py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 md:px-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="accent-chip text-xs font-semibold uppercase tracking-[0.35em]">{t("kicker")}</p>
            <h2 className="text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">{t("title")}</h2>
          </div>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="text-pretty border-l border-line-strong pl-5 text-base leading-relaxed text-soft md:text-lg"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
        <DecisionSystem />
      </div>
    </section>
  );
}
