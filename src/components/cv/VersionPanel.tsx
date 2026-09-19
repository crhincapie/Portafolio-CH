"use client";

import { useRef, useState } from "react";
import { useCvStore } from "@/lib/cv/useCvStore";
import { deepClone } from "@/lib/cv/clientStore";
import { CV_OFFICIAL_ID } from "@/lib/cv/types";
import { cn } from "@/lib/utils";

export function VersionPanel() {
  const { versions, activeId, select, createFromData, rename, remove, exportAll, importAll } = useCvStore();
  const [newName, setNewName] = useState("");
  const [renameMap, setRenameMap] = useState<Record<string, string>>({});
  const [importError, setImportError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const base = versions.find((v) => v.id === activeId) ?? versions[0];
    createFromData(newName || `Versión ${versions.length}`, deepClone(base.data));
    setNewName("");
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = importAll(String(reader.result));
      setImportError(result.ok ? null : result.message ?? "Error al importar");
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-ink">Versiones</h3>
        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted">{versions.length}</span>
      </div>

      <div className="flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Nombre de la nueva versión…"
          className="w-full rounded-xl border border-line bg-surface-1 px-3 py-2 text-sm text-ink placeholder:text-faint outline-none focus:border-[#00feff]"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="shrink-0 rounded-xl bg-[#00feff] px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-[#7afcff] active:scale-95"
        >
          + Nueva
        </button>
      </div>

      <ul className="space-y-2">
        {versions.map((v) => {
          const active = v.id === activeId;
          const isOfficial = v.id === CV_OFFICIAL_ID;
          const renaming = renameMap[v.id] !== undefined;
          return (
            <li
              key={v.id}
              className={cn(
                "rounded-2xl border p-3 transition",
                active ? "border-[#00feff]/50 bg-accent-soft" : "border-line bg-surface-1",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => select(v.id)}
                  className="min-w-0 text-left"
                  title="Usar esta versión"
                >
                  <span className="block truncate text-sm font-bold text-ink">{v.name}</span>
                  <span className="mt-0.5 block text-[11px] text-muted">
                    {isOfficial ? "Protegida · no se modifica" : v.readOnly ? "Solo lectura" : "Editable"}
                    {!isOfficial && v.updatedAt
                      ? ` · ${new Date(v.updatedAt).toLocaleDateString()}`
                      : ""}
                  </span>
                </button>
                <span
                  className={cn(
                    "mt-1 h-2 w-2 shrink-0 rounded-full",
                    active ? "bg-[#00feff] shadow-[0_0_8px_rgba(0,254,255,0.8)]" : "bg-line-strong",
                  )}
                />
              </div>

              {renaming ? (
                <div className="mt-2 flex gap-2">
                  <input
                    autoFocus
                    value={renameMap[v.id] ?? v.name}
                    onChange={(e) => setRenameMap((m) => ({ ...m, [v.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        rename(v.id, renameMap[v.id] ?? v.name);
                        setRenameMap((m) => {
                          const next = { ...m };
                          delete next[v.id];
                          return next;
                        });
                      }
                    }}
                    className="w-full rounded-lg border border-line bg-canvas px-2 py-1 text-sm text-ink outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      rename(v.id, renameMap[v.id] ?? v.name);
                      setRenameMap((m) => {
                        const next = { ...m };
                        delete next[v.id];
                        return next;
                      });
                    }}
                    className="rounded-lg bg-[#00feff] px-2 py-1 text-xs font-bold text-zinc-950"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {!active && !isOfficial && (
                    <button type="button" onClick={() => select(v.id)} className="cv-panel-btn">
                      Usar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setRenameMap((m) => ({ ...m, [v.id]: v.name }))}
                    className="cv-panel-btn"
                  >
                    Renombrar
                  </button>
                  <button
                    type="button"
                    onClick={() => createFromData(`${v.name} (copia)`, deepClone(v.data))}
                    className="cv-panel-btn"
                  >
                    Duplicar
                  </button>
                  {!isOfficial && (
                    <button type="button" onClick={() => remove(v.id)} className="cv-panel-btn cv-panel-btn-danger">
                      Eliminar
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex gap-2 border-t border-line pt-3">
        <button type="button" onClick={exportAll} className="cv-panel-btn">
          Exportar JSON
        </button>
        <button type="button" onClick={() => fileRef.current?.click()} className="cv-panel-btn">
          Importar JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImportFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {importError && <p className="text-xs text-red-400">{importError}</p>}

      <style>{`
        .cv-panel-btn {
          border-radius: 9999px;
          border: 1px solid var(--line-strong);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 600;
          color: var(--muted);
          transition: .15s;
        }
        .cv-panel-btn:hover { border-color: #00feff; color: #00feff; }
        .cv-panel-btn-danger:hover { border-color: rgba(248,113,113,.6); color: #f87171; }
      `}</style>
    </div>
  );
}