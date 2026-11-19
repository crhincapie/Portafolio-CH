"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { CVModal } from "@/components/case-study/CVModal";
import { BehanceIcon, LinkedinIcon, MailIcon, WhatsAppIcon } from "@/components/contact/ContactIcons";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   CONTACTO · "Empecemos la conversación"
   Un redactor de correo real: eliges el tema, escribes si
   quieres, y el botón abre tu correo con todo listo. Al lado,
   los demás canales y la hora local en Bogotá.
   ───────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

function useBogotaTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-CO", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Bogota" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function Channel({
  href,
  onClick,
  icon,
  label,
  hint,
}: {
  href?: string;
  onClick?: () => void;
  icon: ReactNode;
  label: string;
  hint: string;
}) {
  const cls =
    "group glass-surface relative flex items-center gap-4 overflow-hidden rounded-2xl px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00feff]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00feff]/60";
  const body = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-ink transition-colors group-hover:bg-[#00feff] group-hover:text-zinc-950 light:bg-zinc-900/[0.06]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="block truncate text-xs text-faint">{hint}</span>
      </span>
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-text" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {body}
    </button>
  );
}

export function ContactSection() {
  const t = useTranslations("contact");
  const reduced = !!useReducedMotion();
  const time = useBogotaTime();
  const topics = [t("topic1"), t("topic2"), t("topic3"), t("topic4")];
  const [topic, setTopic] = useState(0);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const ids = { msg: useId(), topics: useId() };

  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(topics[topic])}${message.trim() ? `&body=${encodeURIComponent(message.trim())}` : ""}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const titleWords = t("title").split(" ");

  return (
    <section id="contacto" className="relative isolate scroll-mt-28 overflow-hidden py-24 md:py-36">
      {/* Fondo: ondas que salen del punto de disponibilidad */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_80%_20%,rgba(0,254,255,0.14),transparent_60%),radial-gradient(700px_500px_at_10%_90%,rgba(99,102,241,0.14),transparent_60%)]" />
        <div className="absolute left-[78%] top-[18%]">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00feff]/20"
              initial={{ scale: 0.15, opacity: 0 }}
              animate={reduced ? { scale: 0.25 + i * 0.25, opacity: 0.4 } : { scale: [0.15, 1.2], opacity: [0.6, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-6">
            <p className="accent-chip text-xs font-semibold uppercase tracking-[0.35em]">{t("kicker")}</p>
            <h2 className="max-w-[16ch] text-balance text-[clamp(2.6rem,6.6vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink">
              {titleWords.map((w, i) => (
                <motion.span
                  key={i}
                  className="mr-[0.22em] inline-block"
                  initial={reduced ? false : { opacity: 0, y: "0.4em", filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease }}
                >
                  {w}
                </motion.span>
              ))}
            </h2>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">{t("subtitle")}</p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#00feff]/40 bg-[#00feff]/[0.08] px-4 py-2 text-xs font-semibold text-accent-text light:text-[#0e7490]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00feff] opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00feff]" />
              </span>
              {t("availability")}
            </span>
            <span className="text-sm text-muted">
              {t("localTime")} <span className="font-semibold tabular-nums text-ink">{time ?? "--:--"}</span>
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Redactor */}
          <motion.div
            className="glass-surface glass-blur overflow-hidden rounded-[28px]"
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c) => (
                <span key={c} className={cn("h-2.5 w-2.5 rounded-full", c)} />
              ))}
              <span className="ml-3 text-sm font-semibold text-ink">{t("composeTitle")}</span>
            </div>

            <div className="divide-y divide-line">
              <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                <span className="w-16 text-sm text-faint">{t("composeTo")}</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1.5 text-sm font-medium text-ink light:bg-zinc-900/[0.05]">
                  <MailIcon className="h-4 w-4 text-accent-text light:text-[#0e7490]" />
                  {siteConfig.email}
                </span>
                <button
                  type="button"
                  onClick={copy}
                  className="ml-auto rounded-full border border-line-strong px-3 py-1.5 text-xs font-medium text-soft transition hover:border-[#00feff]/50 hover:text-ink"
                  aria-live="polite"
                >
                  {copied ? t("copied") : t("copy")}
                </button>
              </div>

              <div className="flex flex-wrap items-start gap-3 px-5 py-4">
                <span id={ids.topics} className="w-16 pt-1.5 text-sm text-faint">
                  {t("composeSubject")}
                </span>
                <div role="radiogroup" aria-labelledby={ids.topics} className="flex flex-1 flex-wrap gap-2">
                  {topics.map((tp, i) => (
                    <button
                      key={tp}
                      type="button"
                      role="radio"
                      aria-checked={topic === i}
                      onClick={() => setTopic(i)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                        topic === i
                          ? "border-[#00feff] bg-[#00feff] text-zinc-950"
                          : "border-line-strong text-soft hover:border-[#00feff]/50 hover:text-ink",
                      )}
                    >
                      {tp}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4">
                <label htmlFor={ids.msg} className="mb-2 flex items-baseline justify-between text-sm text-faint">
                  {t("composeMessage")}
                  <span className="text-xs">{t("composeOptional")}</span>
                </label>
                <textarea
                  id={ids.msg}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("composePlaceholder")}
                  className="w-full resize-none rounded-2xl border border-line bg-transparent px-4 py-3 text-base text-ink placeholder:text-faint focus:border-[#00feff]/60 focus:outline-none focus:ring-2 focus:ring-[#00feff]/20"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                <p className="text-xs text-faint">{t("footnote")}</p>
                <a
                  href={mailto}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#00feff] px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_rgba(0,254,255,0.3)] transition hover:bg-[#7afcff] hover:shadow-[0_0_60px_rgba(0,254,255,0.45)]"
                >
                  <MailIcon className="h-4.5 w-4.5" />
                  {t("emailCta")}
                  <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Canales */}
          <div className="flex flex-col gap-3">
            <p className="px-1 text-xs font-semibold uppercase tracking-[0.25em] text-faint">{t("channels")}</p>
            <Channel href={`https://wa.me/${siteConfig.whatsapp}`} icon={<WhatsAppIcon className="h-5 w-5" />} label={t("whatsappCta")} hint={t("whatsappHint")} />
            <Channel href={siteConfig.linkedin} icon={<LinkedinIcon className="h-5 w-5" />} label={t("linkedinCta")} hint={t("linkedinHint")} />
            <Channel href={siteConfig.behance} icon={<BehanceIcon className="h-5 w-5" />} label={t("behanceCta")} hint={t("behanceHint")} />
            <Channel
              onClick={() => setCvOpen(true)}
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                </svg>
              }
              label={t("downloadCV")}
              hint={t("cvHint")}
            />
          </div>
        </div>
      </div>

      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </section>
  );
}
