"use client";

import { motion } from "framer-motion";

export function ContactBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0a0e1a,#0d0f1a)]" />

      <div
        className="absolute left-0 top-0 h-[60%] w-[50%] opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(ellipse at 20% 0%, #00feff, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 h-[50%] w-[40%] opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(ellipse at 100% 100%, #00feff, transparent 70%)" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,254,255,0.45),transparent_55%)] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/40" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.85, 0.85, 0], x: [0, 44, 96, 156], y: [0, -14, -28, -44], rotate: [0, -6, -10, -14] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute left-[22%] top-[38%] hidden text-[#00feff]/80 md:block"
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute -right-6 top-10 hidden w-40 rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm md:block"
      >
        <div className="flex items-center justify-center rounded-xl border border-[#00feff]/20 bg-[#00feff]/5 p-3">
          <svg className="h-7 w-7 text-[#00feff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="M3.5 6.5L12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-24 rounded-full bg-white/15" />
          <div className="h-1 w-16 rounded-full bg-white/10" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute -left-6 bottom-10 hidden w-44 rounded-2xl border border-white/10 bg-zinc-950/80 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00feff]/15 text-[10px] font-semibold text-[#00feff]">
            CH
          </span>
          <div className="space-y-1">
            <div className="h-1.5 w-16 rounded-full bg-white/15" />
            <div className="h-1 w-10 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="ml-auto w-fit rounded-xl rounded-br-sm border border-[#00feff]/25 bg-[#00feff]/10 px-2.5 py-1.5">
            <div className="h-1.5 w-20 rounded-full bg-[#00feff]/50" />
          </div>
          <div className="w-fit rounded-xl rounded-bl-sm border border-white/10 bg-white/5 px-2.5 py-1.5">
            <div className="h-1.5 w-16 rounded-full bg-white/25" />
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1 pl-1">
          <span className="h-1 w-1 animate-pulse rounded-full bg-[#00feff]" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-[#00feff]" style={{ animationDelay: "150ms" }} />
          <span className="h-1 w-1 animate-pulse rounded-full bg-[#00feff]" style={{ animationDelay: "300ms" }} />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-[16%] hidden text-[#00feff]/50 md:block"
      >
        <svg className="h-14 w-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round">
          <path d="M5 12.55a11 11 0 0114.08 0" />
          <path d="M1.42 9a16 16 0 0121.16 0" />
          <path d="M8.53 16.11a6 6 0 016.95 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
        </svg>
      </motion.div>
    </div>
  );
}
