"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "sobre", key: "about" as const },
  { id: "experiencia", key: "experience" as const },
  { id: "proyectos", key: "projects" as const },
  { id: "enfoque", key: "approach" as const },
  { id: "testimonios", key: "testimonials" as const },
  { id: "contacto", key: "contact" as const },
];

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
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent transition-colors",
        scrolled && "border-white/5 bg-zinc-950/75 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-[#00feff] transition group-hover:border-[#00feff]/40">
            CH
          </span>
          <span className="hidden sm:inline">Cristian Hincapié</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="relative transition hover:text-white">
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#00feff] transition-all duration-300 hover:w-full" />
              {t(item.key)}
            </a>
          ))}
          <Link href="/projects" className="text-zinc-500 transition hover:text-white">
            {t("caseStudies")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={otherHref}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-zinc-300 transition hover:border-[#00feff]/50 hover:text-white"
            hrefLang={otherLocale}
          >
            {otherLocale}
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-200 md:hidden"
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
          "border-t border-white/5 bg-zinc-950/95 px-4 py-4 backdrop-blur-xl md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col gap-3 text-sm text-zinc-300">
          {NAV.map((item) => (
            <a key={item.id} className="py-1" href={`#${item.id}`}>
              {t(item.key)}
            </a>
          ))}
          <Link href="/projects" className="py-1">
            {t("caseStudies")}
          </Link>
        </div>
      </div>
    </header>
  );
}
