"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";

/* Manifiesto: el texto "se aclara" palabra por palabra al leerlo
   (el problema se vuelve claro); debajo, la intersección que guía
   cada decisión: negocio · usuarios · tecnología. */

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

function Venn() {
  const t = useTranslations("about");
  const reduced = !!useReducedMotion();
  const circles = [
    { cx: 200, cy: 150, from: { x: 0, y: -40 }, label: t("vennBusiness"), lx: 200, ly: 92 },
    { cx: 145, cy: 245, from: { x: -40, y: 26 }, label: t("vennUsers"), lx: 104, ly: 296 },
    { cx: 255, cy: 245, from: { x: 40, y: 26 }, label: t("vennTech"), lx: 296, ly: 296 },
  ];
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[420px]" aria-label={`${t("vennBusiness")} · ${t("vennUsers")} · ${t("vennTech")} → ${t("vennCore")}`}>
      <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible" aria-hidden>
        {circles.map((c, i) => (
          <motion.g
            key={i}
            initial={reduced ? false : { ...c.from, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <circle cx={c.cx} cy={c.cy} r="108" className="fill-[#00feff]/[0.04] stroke-line-strong light:fill-[#0e7490]/[0.04]" strokeWidth="1.2" />
            <text x={c.lx} y={c.ly} textAnchor="middle" className="fill-ink text-[15px] font-semibold">
              {c.label}
            </text>
          </motion.g>
        ))}
        <motion.g
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: "200px 213px" }}
        >
          <circle cx="200" cy="213" r="38" fill="#00feff" className="drop-shadow-[0_0_18px_rgba(0,254,255,0.6)]" />
          <text x="200" y="218" textAnchor="middle" className="fill-zinc-950 text-[12px] font-bold">
            {t("vennCore")}
          </text>
        </motion.g>
      </svg>
    </figure>
  );
}

export function About() {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const words = t("title").split(" ");
  const paragraphs = t("body").split("\n\n");

  return (
    <section id="sobre" className="glass-ambient scroll-mt-28 border-b border-line py-24 md:py-36">
      <div className="mx-auto max-w-6xl space-y-16 px-4 md:space-y-24 md:px-6">
        <div ref={ref} className="space-y-8">
          <p className="accent-chip text-xs font-semibold uppercase tracking-[0.35em]">{t("kicker")}</p>
          <h2 className="max-w-[14ch] text-balance text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">
            {words.map((w, i) => (
              <span key={i}>
                <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>{" "}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-pretty text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl"
                    : "text-pretty text-base leading-relaxed text-soft md:text-lg"
                }
              >
                {p}
              </p>
            ))}
            <dl className="flex flex-wrap gap-3 pt-2">
              <div className="glass-surface rounded-2xl px-5 py-3.5">
                <dt className="text-[11px] text-faint">{t("locationLabel")}</dt>
                <dd className="text-sm font-semibold text-ink">{t("location")}</dd>
              </div>
              <div className="glass-surface rounded-2xl px-5 py-3.5">
                <dt className="text-[11px] text-faint">{t("languagesLabel")}</dt>
                <dd className="text-sm font-semibold text-ink">{t("languages")}</dd>
              </div>
            </dl>
          </div>
          <Venn />
        </div>
      </div>
    </section>
  );
}
