"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export function HeroStat({
  value,
  label,
  short,
  accent,
  accentLight,
}: {
  value: string;
  label: string;
  short?: string;
  accent: string;
  accentLight: string;
}) {
  const { theme } = useTheme();
  const color = theme === "light" ? accentLight : accent;
  return (
    <div className="rounded-2xl border border-line-strong bg-zinc-900/85 p-3 text-center backdrop-blur light:bg-surface-2 sm:p-4">
      <div className="text-2xl font-black tracking-tight sm:text-3xl" style={{ color }}>
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase leading-none tracking-wide text-muted sm:text-[11px] sm:tracking-widest">
        {short ? (
          <>
            <span className="sm:hidden">{short}</span>
            <span className="hidden sm:inline">{label}</span>
          </>
        ) : (
          label
        )}
      </div>
    </div>
  );
}

export function BigNumber({
  value,
  label,
  short,
  accent,
  accentLight,
}: {
  value: string;
  label: string;
  short?: string;
  accent: string;
  accentLight: string;
}) {
  const { theme } = useTheme();
  const color = theme === "light" ? accentLight : accent;
  return (
    <div className={cn("rounded-3xl border border-line-strong bg-zinc-900/85 p-4 text-center backdrop-blur light:bg-surface-2 sm:p-5")}>
      <div className="text-4xl font-black md:text-6xl" style={{ color }}>
        {value}
      </div>
      <div className="mt-2 text-[10px] uppercase leading-none tracking-wide text-muted sm:text-xs sm:tracking-widest">
        {short ? (
          <>
            <span className="sm:hidden">{short}</span>
            <span className="hidden sm:inline">{label}</span>
          </>
        ) : (
          label
        )}
      </div>
    </div>
  );
}