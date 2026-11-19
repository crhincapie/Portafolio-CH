"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV = [
  { id: "sobre", key: "about" as const },
  { id: "experiencia", key: "experience" as const },
  { id: "proyectos", key: "projects" as const },
  { id: "enfoque", key: "approach" as const },
  { id: "testimonios", key: "testimonials" as const },
  { id: "contacto", key: "contact" as const },
];

/* ─────────────────────────────────────────────────────────────
   MARCA · Monograma CH
   La C abraza un nodo (el usuario en el centro). Desde el nodo
   sale el travesaño que lo conecta con el asta de la H: la
   estructura del producto. Diseño centrado en las personas,
   construido con criterio técnico.
   Retícula 120 × 120 · trazo 11 · C r30 centrada en (52.5, 60).
   ───────────────────────────────────────────────────────────── */
export const BRAND_MARK_PATHS = {
  c: "M67.5 34.02 A30 30 0 1 0 67.5 85.98",
  bar: "M52.5 60 H97.5",
  stem: "M97.5 30 V90",
  node: { cx: 52.5, cy: 60, r: 8.5 },
} as const;

export function BrandMark({ className, title }: { className?: string; title?: string }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("[--ch-a:#00feff] [--ch-b:#6366f1] light:[--ch-a:#0891b2] light:[--ch-b:#4f46e5]", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={`chg-${gid}`} gradientUnits="userSpaceOnUse" x1="55" y1="25" x2="100" y2="95">
          <stop offset="0" style={{ stopColor: "var(--ch-a)" }} />
          <stop offset="1" style={{ stopColor: "var(--ch-b)" }} />
        </linearGradient>
      </defs>
      <path d={BRAND_MARK_PATHS.c} fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
      <path
        d={BRAND_MARK_PATHS.bar}
        stroke={`url(#chg-${gid})`}
        strokeWidth="11"
        strokeLinecap="round"
        className="origin-[52.5px_60px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[1.04]"
      />
      <path d={BRAND_MARK_PATHS.stem} stroke={`url(#chg-${gid})`} strokeWidth="11" strokeLinecap="round" />
      <circle
        {...BRAND_MARK_PATHS.node}
        style={{ fill: "var(--ch-a)" }}
        className="origin-[52.5px_60px] transition-transform duration-500 group-hover:scale-125"
      />
    </svg>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = (routing.locales as readonly string[]).includes(segments[0] ?? "");
  const currentLocale = hasLocale ? segments[0] : routing.defaultLocale;
  const otherLocale = currentLocale === "es" ? "en" : "es";
  const basePath = hasLocale ? "/" + segments.slice(1).join("/") : pathname;
  const otherHref = `/${otherLocale}${basePath}`;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-4">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full border py-2 pl-2 pr-2 transition-[background-color,border-color,box-shadow] duration-500 md:pl-3",
          scrolled ? "glass-surface glass-blur border-line" : "border-transparent",
        )}
      >
        <Link href="/" className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-ink" aria-label="Cristian Hincapié">
          <BrandMark className="h-9 w-9 text-ink" />
          <span className="hidden sm:inline">Cristian Hincapié</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {NAV.map((item) => (
            <Link key={item.id} href={`/#${item.id}`} className="relative transition hover:text-ink">
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#00feff] transition-all duration-300 hover:w-full" />
              {t(item.key)}
            </Link>
          ))}
          <Link href="/projects" className="text-faint transition hover:text-ink">
            {t("caseStudies")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={otherHref}
            className="rounded-full border border-line-strong px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-soft transition hover:border-[#00feff]/50 hover:text-ink"
            hrefLang={otherLocale}
          >
            {otherLocale}
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-soft lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{t("menu")}</span>
            <span className="flex flex-col gap-1.5">
              <span className={cn("h-px w-5 bg-current transition", open && "translate-y-[3px] rotate-45")} />
              <span className={cn("h-px w-5 bg-current transition", open && "opacity-0")} />
              <span className={cn("h-px w-5 bg-current transition", open && "-translate-y-[7px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "glass-surface glass-blur mx-auto mt-2 max-w-6xl rounded-3xl px-6 py-5 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col gap-1 text-lg font-medium text-ink">
          {NAV.map((item) => (
            <Link key={item.id} className="py-1" href={`/#${item.id}`}>
              {t(item.key)}
            </Link>
          ))}
          <Link href="/projects" className="py-1">
            {t("caseStudies")}
          </Link>
        </div>
      </div>
    </header>
  );
}
