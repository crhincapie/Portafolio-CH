"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { CVModal } from "@/components/case-study/CVModal";
import Image from "next/image";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.55, 
      ease: [0.22, 1, 0.36, 1] as const
    } 
  },
};

export function Hero() {
  const t = useTranslations("hero");
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="mesh-bg pointer-events-none absolute inset-0 opacity-90" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-4 pb-20 pt-10 md:flex-row md:items-end md:px-6 md:pb-24 md:pt-16">
        <motion.div className="flex-1 space-y-8" variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00feff]/90">
            {t("kicker")}
          </motion.p>

          <div className="space-y-4">
            <motion.h1
              variants={item}
              className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              <span className="block text-zinc-200">{t("line1")}</span>
              <span className="text-gradient-accent mt-2 block">{t("line2")}</span>
            </motion.h1>
            <motion.p variants={item} className="max-w-xl text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
              {t("lead")}
            </motion.p>
          </div>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-[#00feff] px-6 py-3 text-sm font-semibold text-zinc-950 transition duration-200 hover:bg-[#7afcff] hover:shadow-lg active:scale-95"
            >
              {t("ctaCv")}
            </button>
            <Button href="#proyectos" variant="outline">
              {t("ctaProjects")}
            </Button>
          </motion.div>

          <motion.p variants={item} className="text-xs text-zinc-500">
            {t("roles")}
          </motion.p>
          <motion.p variants={item} className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-600">
            {t("clients")}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex w-full flex-col gap-6 md:max-w-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(0,254,255,0.12)]">
            <Image
              src="/images/profile-cristian.png"
              alt="Cristian Hincapié - Product Designer & UX/UI Lead"
              width={400}
              height={500}
              priority
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,254,255,0.35),transparent_55%)]" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-zinc-950/70 p-4 text-xs text-zinc-300 backdrop-blur-md">
              <p className="font-medium text-white">Cristian Hincapié</p>
              <p className="mt-1 text-zinc-400">Product · UX/UI · Lead</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-zinc-400">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-2xl font-semibold text-white">{t("statYearsValue")}</p>
              <p className="mt-1 text-[11px] leading-snug">{t("statYearsLabel")}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-sm font-semibold text-white">{t("statSectorsValue")}</p>
              <p className="mt-1 text-[11px] leading-snug">{t("statSectorsLabel")}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-sm font-semibold text-white">{t("statCraftValue")}</p>
              <p className="mt-1 text-[11px] leading-snug">{t("statCraftLabel")}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-500">
          <span>{t("scroll")}</span>
          <span className="h-10 w-px bg-gradient-to-b from-[#00feff] to-transparent" />
        </div>
      </div>

      {/* CV Modal */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </section>
  );
}
