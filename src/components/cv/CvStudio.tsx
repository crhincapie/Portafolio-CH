"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useCvStore } from "@/lib/cv/useCvStore";
import { CvSectionKey } from "@/lib/cv/types";
import { CvSheetStage } from "./CvSheetStage";
import { VersionPanel } from "./VersionPanel";
import { EditSectionPanel } from "./EditSectionPanel";
import { cn } from "@/lib/utils";

const SECTIONS: { key: CvSectionKey; label: string }[] = [
  { key: "experience", label: "Experiencia" },
  { key: "profile", label: "Perfil Profesional" },
  { key: "skills", label: "Habilidades" },
  { key: "tools", label: "Herramientas & Tecnología" },
  { key: "identity", label: "Identidad" },
  { key: "contact", label: "Contacto" },
  { key: "social", label: "Redes" },
  { key: "languages", label: "Idiomas" },
  { key: "references", label: "Referencias" },
  { key: "education", label: "Educación" },
];

export function CvStudio() {
  const { active, activeId, versions, select } = useCvStore();
  const { theme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const [lang, setLang] = useState<"es" | "en">(locale === "en" ? "en" : "es");
  const [editSection, setEditSection] = useState<CvSectionKey | null>(null);
  const [editJobId, setEditJobId] = useState<string | null>(null);

  const handleEdit = (k: CvSectionKey, jobId?: string) => {
    if (jobId) {
      setEditSection("experience");
      setEditJobId(jobId);
      return;
    }
    setEditJobId(null);
    setEditSection(editSection === k ? null : k);
  };

  const handleLogout = async () => {
    await fetch("/api/cv/logout", { method: "POST" });
    router.refresh();
  };

  // Ajusta el tamaño de página al alto real de la hoja (una sola página, sin espacios en blanco).
  const handlePrint = () => {
    const sheet = document.querySelector<HTMLElement>(".cv-sheet .page");
    const hPx = sheet ? sheet.offsetHeight : 1740;
    const hPt = Math.round(hPx * (72 / 96));
    const style = document.createElement("style");
    style.dataset.cvPageSize = "1";
    style.textContent = `@page { size: 594pt ${Math.max(1305, hPt)}pt; margin: 0; }`;
    document.head.appendChild(style);
    const cleanup = () => {
      document.head.removeChild(style);
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
    setTimeout(cleanup, 1500);
  };

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      {/* ─── Barra superior ─── */}
      <header className="no-print sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-canvas/85 px-3 backdrop-blur-xl sm:px-5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00feff] text-xs font-black text-zinc-950">
          CV
        </span>
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-extrabold leading-tight text-ink">Editor CV privado</p>
          <p className="truncate text-[11px] leading-tight text-muted">
            {active.readOnly ? "Versión protegida" : "Versión editable"} · {active.name}
          </p>
        </div>

        <div className="ml-2 hidden shrink-0 md:block">
          <select
            value={activeId}
            onChange={(e) => select(e.target.value)}
            className="max-w-[220px] rounded-xl border border-line bg-surface-1 px-2.5 py-1.5 text-xs font-semibold text-ink outline-none focus:border-[#00feff]"
            title="Cambiar de versión"
          >
            {versions.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex overflow-hidden rounded-full border border-line">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold uppercase transition",
                  lang === l ? "bg-[#00feff] text-zinc-950" : "bg-surface-1 text-muted hover:text-ink",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={handlePrint}
            className="hidden rounded-full bg-[#00feff] px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-[#7afcff] active:scale-95 sm:inline-flex"
          >
            Descargar PDF
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center rounded-full bg-[#00feff] px-3 py-2 text-xs font-bold text-zinc-950 transition hover:bg-[#7afcff] active:scale-95 sm:hidden"
            aria-label="Descargar PDF"
          >
            PDF
          </button>
          <Link
            href="/"
            className="hidden rounded-full border border-line-strong px-4 py-2 text-xs font-semibold text-muted transition hover:border-[#00feff] hover:text-[#00feff] lg:inline-flex"
          >
            Ver sitio
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-line-strong px-4 py-2 text-xs font-semibold text-muted transition hover:border-red-400/60 hover:text-red-400"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* ─── Cuerpo ─── */}
      <div className="cv-layout-row flex h-[calc(100dvh-3.5rem)]">
        <main className="cv-print-area flex-1 overflow-auto p-3 sm:p-5">
          <CvSheetStage data={active.data} theme={theme} lang={lang} onEditSection={handleEdit} />
        </main>

        <aside className="no-print w-[330px] shrink-0 space-y-7 overflow-y-auto border-l border-line bg-canvas/60 p-4 sm:w-[360px]">
          <VersionPanel />

          <section>
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-ink">Secciones · Editar</h3>
            <ul className="space-y-1.5">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => handleEdit(s.key)}
                    aria-pressed={editSection === s.key}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition",
                      editSection === s.key
                        ? "border-[#00feff] bg-accent-soft"
                        : "border-line bg-surface-1 hover:border-[#00feff]/50 hover:bg-accent-soft",
                    )}
                  >
                    <span className="text-sm font-semibold text-ink">{s.label}</span>
                    <span className="rounded-full border border-line-strong px-3 py-1 text-[11px] font-bold text-muted transition group-hover:border-[#00feff] group-hover:text-[#00feff]">
                      Editar
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <p className="rounded-2xl border border-line bg-overlay p-3 text-[11px] leading-relaxed text-muted">
            La versión <b className="text-ink">Oficial</b> pública nunca se modifica. Cada guardado sobre ella crea una
            nueva versión con nombre. Usa <b className="text-ink">Exportar JSON</b> para respaldar tus versiones o
            llevarlas a otro dispositivo.
          </p>
        </aside>
      </div>

      <EditSectionPanel
        section={editSection}
        lang={lang}
        jobId={editJobId}
        onClose={() => setEditSection(null)}
      />
    </div>
  );
}