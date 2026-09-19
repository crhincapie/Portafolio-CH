"use client";

import { useEffect, useMemo, useState } from "react";
import { Field, LangInput, LANG_BADGE, LangCode, SmallBtn, TextArea, TextInput } from "./fields";
import { useCvStore } from "@/lib/cv/useCvStore";
import { CvData, CvSectionKey } from "@/lib/cv/types";
import { OFFICIAL_TOOLS, COMPANY_LOGOS } from "@/lib/cv/seed";

const SECTION_LABELS: Record<CvSectionKey, string> = {
  identity: "Identidad",
  contact: "Contacto",
  profile: "Perfil Profesional",
  skills: "Habilidades",
  tools: "Herramientas & Tecnología",
  social: "Redes",
  languages: "Idiomas",
  references: "Referencias",
  education: "Educación",
  experience: "Experiencia",
};

interface EditSectionPanelProps {
  section: CvSectionKey | null;
  lang: LangCode;
  jobId?: string | null;
  onClose: () => void;
}

export function EditSectionPanel({ section, lang, jobId, onClose }: EditSectionPanelProps) {
  const { active, updateData, createFromData } = useCvStore();
  const [draft, setDraft] = useState<CvData>(() => structuredClone(active.data));
  const [versionName, setVersionName] = useState("");

  useEffect(() => {
    if (section) {
      setDraft(structuredClone(active.data));
      setVersionName("");
    }
  }, [section, active]);

  const appliesToOfficial = active.readOnly;
  const canSave = !appliesToOfficial || versionName.trim().length > 0;

  const bounds = useMemo(
    () => (section ? (base: Partial<CvData>) => setDraft((d) => ({ ...d, ...base })) : null),
    [section],
  );

  if (!section || !bounds) return null;

  const handleSave = () => {
    if (!canSave) return;
    if (appliesToOfficial) {
      createFromData(versionName, draft);
    } else {
      updateData(draft);
    }
    onClose();
  };

  return (
    <div className="cv-editor-panel no-print fixed bottom-3 right-3 top-16 z-40 flex w-[380px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface-1/95 shadow-2xl backdrop-blur-xl sm:w-[400px]">
      {/* ─── Cabecera ─── */}
      <header className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <h2 className="text-base font-extrabold tracking-tight text-ink">Editar · {SECTION_LABELS[section]}</h2>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            {appliesToOfficial
              ? "La versión oficial no se modifica. Guardará como nueva versión con nombre."
              : `Guardando sobre “${active.name}”.`}{" "}
            Editando solo <b className="text-ink">{LANG_BADGE[lang]}</b>; la otra traducción se conserva.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar editor"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition hover:border-[#00feff] hover:text-[#00feff]"
        >
          ✕
        </button>
      </header>

      {/* ─── Formulario ─── */}
      <form className="flex-1 overflow-y-auto px-4 py-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-5">
          <SectionForm
            key={`${active.id}-${section}`}
            section={section}
            draft={draft}
            setDraft={bounds}
            lang={lang}
            jobId={jobId}
          />

          {appliesToOfficial && (
            <div className="rounded-2xl border border-line bg-overlay p-4">
              <Field label="Nombre de la nueva versión">
                <TextInput
                  value={versionName}
                  onChange={setVersionName}
                  placeholder="Ej. V2 · Experiencia 2026, V3 · Perfil en inglés…"
                />
              </Field>
            </div>
          )}
        </div>
      </form>

      {/* ─── Pie ─── */}
      <footer className="flex flex-wrap items-center gap-3 border-t border-line bg-canvas/40 px-4 py-3">
        <button
          type="button"
          disabled={!canSave}
          onClick={handleSave}
          className="rounded-full bg-[#00feff] px-6 py-2 text-sm font-bold text-zinc-950 transition hover:bg-[#7afcff] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {appliesToOfficial ? "Guardar como nueva versión" : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-line-strong px-5 py-2 text-sm font-semibold text-muted transition hover:text-ink"
        >
          Cancelar
        </button>
        {appliesToOfficial && (
          <span className="ml-auto flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-600 dark:text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Oficial protegida
          </span>
        )}
      </footer>
    </div>
  );
}

interface SectionFormProps {
  section: CvSectionKey;
  draft: CvData;
  setDraft: (base: Partial<CvData>) => void;
  lang: LangCode;
  jobId?: string | null;
}

function SectionForm({ section, draft, setDraft, lang, jobId }: SectionFormProps) {
  switch (section) {
    case "identity":
      return (
        <>
          <Field label="Nombre">
            <TextInput
              value={draft.identity.name}
              onChange={(v) => setDraft({ identity: { ...draft.identity, name: v } })}
            />
          </Field>
          <LangInput
            label="Cargo principal"
            lang={lang}
            value={draft.identity.role}
            onChange={(v) => setDraft({ identity: { ...draft.identity, role: v } })}
          />
          <LangInput
            label="Segundo cargo"
            lang={lang}
            value={draft.identity.role2}
            onChange={(v) => setDraft({ identity: { ...draft.identity, role2: v } })}
          />
          <Field label="Chips (separados por coma)">
            <TextInput
              value={draft.identity.chips.join(", ")}
              onChange={(v) =>
                setDraft({
                  identity: {
                    ...draft.identity,
                    chips: v.split(",").map((c) => c.trim()).filter(Boolean),
                  },
                })
              }
            />
          </Field>
          <LangInput
            label="Frase breve (tagline)"
            textarea
            lang={lang}
            value={draft.identity.tagline}
            onChange={(v) => setDraft({ identity: { ...draft.identity, tagline: v } })}
          />
        </>
      );

    case "contact":
      return (
        <>
          <Field label="Email">
            <TextInput
              value={draft.contact.email}
              onChange={(v) => setDraft({ contact: { ...draft.contact, email: v } })}
            />
          </Field>
          <Field label="Teléfono">
            <TextInput
              value={draft.contact.phone}
              onChange={(v) => setDraft({ contact: { ...draft.contact, phone: v } })}
            />
          </Field>
          <LangInput
            label="Ubicación"
            lang={lang}
            value={draft.contact.location}
            onChange={(v) => setDraft({ contact: { ...draft.contact, location: v } })}
          />
        </>
      );

    case "profile":
      return <ProfileBlock paragraphs={draft.profile} onChange={(v) => setDraft({ profile: v })} lang={lang} />;

    case "skills":
      return <SkillsEditor groups={draft.skills} onChange={(v) => setDraft({ skills: v })} lang={lang} />;

    case "tools":
      return <ToolsEditor tools={draft.tools} onChange={(v) => setDraft({ tools: v })} />;

    case "social":
      return (
        <>
          <Field label="URL de LinkedIn">
            <TextInput value={draft.social.linkedin} onChange={(v) => setDraft({ social: { ...draft.social, linkedin: v } })} />
          </Field>
          <Field label="URL del portafolio">
            <TextInput
              value={draft.social.portfolio}
              onChange={(v) => setDraft({ social: { ...draft.social, portfolio: v } })}
            />
          </Field>
        </>
      );

    case "languages":
      return <LanguagesEditor languages={draft.languages} onChange={(v) => setDraft({ languages: v })} lang={lang} />;

    case "references":
      return <ReferencesEditor references={draft.references} onChange={(v) => setDraft({ references: v })} lang={lang} />;

    case "education":
      return <EducationEditor education={draft.education} onChange={(v) => setDraft({ education: v })} lang={lang} />;

    case "experience":
      return <ExperienceEditor experience={draft.experience} onChange={(v) => setDraft({ experience: v })} lang={lang} initialJobId={jobId} />;
  }
}

/* ─── Sub-editores ─── */

const splitParagraphs = (t: string) => t.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);

const splitLines = (t: string) => t.split("\n").map((s) => s.trim()).filter(Boolean);

function pairBlocks(esText: string, enText: string, splitter: (t: string) => string[]): { es: string; en: string }[] {
  const a = splitter(esText);
  const b = splitter(enText);
  const max = Math.max(a.length, b.length);
  return Array.from({ length: max }, (_, i) => ({ es: a[i] ?? "", en: b[i] ?? "" }));
}

function toBlock(list: { es: string; en: string }[], lang: LangCode, sep = "\n") {
  return list.map((x) => x[lang]).join(sep);
}

/** Perfil profesional: se edita como un solo bloque; un párrafo por cada línea en blanco. */
function ProfileBlock({
  paragraphs,
  onChange,
  lang,
}: {
  paragraphs: CvData["profile"];
  onChange: (v: CvData["profile"]) => void;
  lang: LangCode;
}) {
  const [texts, setTexts] = useState<Record<LangCode, string>>(() => ({
    es: toBlock(paragraphs, "es", "\n\n"),
    en: toBlock(paragraphs, "en", "\n\n"),
  }));

  const apply = (l: LangCode, v: string) => {
    const next = { ...texts, [l]: v };
    setTexts(next);
    onChange(pairBlocks(next.es, next.en, splitParagraphs));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted">
          Esta sección se edita en un solo bloque. Separa los párrafos con una línea en blanco.
        </p>
        <span className="shrink-0 rounded-full bg-[#00feff] px-2.5 py-0.5 text-[10px] font-bold text-zinc-950">
          Bloque · {LANG_BADGE[lang]}
        </span>
      </div>
      <TextArea
        value={texts[lang]}
        onChange={(v) => apply(lang, v)}
        rows={14}
        placeholder={"Primer párrafo del perfil…\n\nSegundo párrafo…\n\nUsa **texto** para resaltarlo en negrita."}
      />
    </div>
  );
}

function SkillsEditor({
  groups,
  onChange,
  lang,
}: {
  groups: CvData["skills"];
  onChange: (v: CvData["skills"]) => void;
  lang: LangCode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">Grupos de habilidades</p>
        <SmallBtn onClick={() => onChange([...groups, { title: { es: "Nuevo grupo", en: "New group" }, tags: [] }])}>
          + Añadir grupo
        </SmallBtn>
      </div>
      {groups.map((group, gi) => (
        <div key={gi} className="space-y-2 rounded-2xl border border-line bg-overlay p-3">
          <div className="flex items-center justify-between gap-2">
            <LangInput
              label="Título del grupo"
              lang={lang}
              value={group.title}
              onChange={(v) => onChange(groups.map((g, j) => (j === gi ? { ...g, title: v } : g)))}
            />
            <SmallBtn variant="danger" onClick={() => onChange(groups.filter((_, j) => j !== gi))}>
              Quitar
            </SmallBtn>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted">Habilidades (marca las destacadas)</p>
            <SmallBtn
              onClick={() =>
                onChange(
                  groups.map((g, j) =>
                    j === gi ? { ...g, tags: [...g.tags, { text: "", highlight: false }] } : g,
                  ),
                )
              }
            >
              + Añadir
            </SmallBtn>
          </div>
          <ul className="space-y-2">
            {group.tags.map((tag, ti) => (
              <li key={ti} className="flex items-center gap-2">
                <TextInput
                  value={tag.text}
                  placeholder="Habilidad…"
                  onChange={(v) =>
                    onChange(
                      groups.map((g, j) =>
                        j === gi ? { ...g, tags: g.tags.map((t, k) => (k === ti ? { ...t, text: v } : t)) } : g,
                      ),
                    )
                  }
                />
                <label className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
                  <input
                    type="checkbox"
                    checked={tag.highlight}
                    onChange={(e) =>
                      onChange(
                        groups.map((g, j) =>
                          j === gi ? { ...g, tags: g.tags.map((t, k) => (k === ti ? { ...t, highlight: e.target.checked } : t)) } : g,
                        ),
                      )
                    }
                    className="accent-[#00feff]"
                  />
                  Destacada
                </label>
                <SmallBtn
                  variant="danger"
                  onClick={() =>
                    onChange(groups.map((g, j) => (j === gi ? { ...g, tags: g.tags.filter((_, k) => k !== ti) } : g)))
                  }
                >
                  ✕
                </SmallBtn>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const TOOL_LOGOS = OFFICIAL_TOOLS.map((t) => t.logo).filter(Boolean) as string[];

function ToolsEditor({ tools, onChange }: { tools: CvData["tools"]; onChange: (v: CvData["tools"]) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">Herramientas y tecnología</p>
        <SmallBtn onClick={() => onChange([...tools, { name: "" }])}>+ Añadir herramienta</SmallBtn>
      </div>
      {tools.map((tool, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex-1">
            <TextInput
              value={tool.name}
              placeholder="Nombre (ej. Figma)"
              onChange={(v) => onChange(tools.map((t, j) => (j === i ? { ...t, name: v } : t)))}
            />
          </div>
          <div className="w-40 shrink-0">
            <select
              value={tool.logo ?? ""}
              onChange={(e) => onChange(tools.map((t, j) => (j === i ? { ...t, logo: e.target.value || undefined } : t)))}
              className="w-full rounded-xl border border-line bg-surface-1 px-2 py-2 text-sm text-ink outline-none"
            >
              <option value="">Sin logo</option>
              {TOOL_LOGOS.map((file) => (
                <option key={file} value={file}>
                  {file.replace(".svg", "")}
                </option>
              ))}
            </select>
          </div>
          <SmallBtn variant="danger" onClick={() => onChange(tools.filter((_, j) => j !== i))}>
            ✕
          </SmallBtn>
        </div>
      ))}
    </div>
  );
}

function LanguagesEditor({
  languages,
  onChange,
  lang,
}: {
  languages: CvData["languages"];
  onChange: (v: CvData["languages"]) => void;
  lang: LangCode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">Idiomas (el porcentaje es el ancho de la barra)</p>
        <SmallBtn onClick={() => onChange([...languages, { name: { es: "", en: "" }, level: { es: "", en: "" }, percent: 50 }])}>
          + Añadir idioma
        </SmallBtn>
      </div>
      {languages.map((langItem, i) => (
        <div key={i} className="space-y-2 rounded-2xl border border-line bg-overlay p-3">
          <div className="grid grid-cols-2 gap-3">
            <LangInput
              label="Idioma"
              lang={lang}
              value={langItem.name}
              onChange={(v) => onChange(languages.map((x, j) => (j === i ? { ...x, name: v } : x)))}
            />
            <LangInput
              label="Nivel"
              lang={lang}
              value={langItem.level}
              onChange={(v) => onChange(languages.map((x, j) => (j === i ? { ...x, level: v } : x)))}
            />
          </div>
          <div className="flex items-center gap-3">
            <Field label={`Nivel: ${langItem.percent}%`}>
              <input
                type="range"
                min={0}
                max={100}
                value={langItem.percent}
                onChange={(e) => onChange(languages.map((x, j) => (j === i ? { ...x, percent: Number(e.target.value) } : x)))}
                className="w-full accent-[#00feff]"
              />
            </Field>
            <SmallBtn variant="danger" onClick={() => onChange(languages.filter((_, j) => j !== i))}>
              Quitar
            </SmallBtn>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReferencesEditor({
  references,
  onChange,
  lang,
}: {
  references: CvData["references"];
  onChange: (v: CvData["references"]) => void;
  lang: LangCode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">Referencias</p>
        <SmallBtn
          onClick={() =>
            onChange([
              ...references,
              { initials: "", name: "", role: { es: "", en: "" }, company: "", phone: "" },
            ])
          }
        >
          + Añadir referencia
        </SmallBtn>
      </div>
      {references.map((ref, i) => (
        <div key={i} className="space-y-2 rounded-2xl border border-line bg-overlay p-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Iniciales">
              <TextInput value={ref.initials} onChange={(v) => onChange(references.map((x, j) => (j === i ? { ...x, initials: v } : x)))} />
            </Field>
            <Field label="Nombre">
              <TextInput value={ref.name} onChange={(v) => onChange(references.map((x, j) => (j === i ? { ...x, name: v } : x)))} />
            </Field>
            <LangInput
              label="Cargo"
              lang={lang}
              value={ref.role}
              onChange={(v) => onChange(references.map((x, j) => (j === i ? { ...x, role: v } : x)))}
            />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Empresa">
                <TextInput value={ref.company} onChange={(v) => onChange(references.map((x, j) => (j === i ? { ...x, company: v } : x)))} />
              </Field>
              <Field label="Teléfono">
                <TextInput value={ref.phone} onChange={(v) => onChange(references.map((x, j) => (j === i ? { ...x, phone: v } : x)))} />
              </Field>
            </div>
          </div>
          <div className="flex justify-end">
            <SmallBtn variant="danger" onClick={() => onChange(references.filter((_, j) => j !== i))}>
              Quitar
            </SmallBtn>
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationEditor({
  education,
  onChange,
  lang,
}: {
  education: CvData["education"];
  onChange: (v: CvData["education"]) => void;
  lang: LangCode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">Educación</p>
        <SmallBtn
          onClick={() =>
            onChange([...education, { logo: "", title: { es: "", en: "" }, subtitle: { es: "", en: "" }, date: { es: "", en: "" } }])
          }
        >
          + Añadir
        </SmallBtn>
      </div>
      {education.map((edu, i) => (
        <div key={i} className="space-y-2 rounded-2xl border border-line bg-overlay p-3">
          <div className="grid grid-cols-2 gap-2">
            <Field label="Logo (empresa)">
              <select
                value={edu.logo ?? ""}
                onChange={(e) =>
                  onChange(education.map((x, j) => (j === i ? { ...x, logo: e.target.value || undefined, initials: undefined } : x)))
                }
                className="w-full rounded-xl border border-line bg-surface-1 px-2 py-2 text-sm text-ink outline-none"
              >
                <option value="">Sin logo</option>
                {COMPANY_LOGOS.map((file) => (
                  <option key={file} value={file}>
                    {file.replace(".png", "")}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Iniciales (si no hay logo)">
              <TextInput
                value={edu.initials ?? ""}
                onChange={(v) =>
                  onChange(education.map((x, j) => (j === i ? { ...x, initials: v || undefined, logo: undefined } : x)))
                }
              />
            </Field>
            <LangInput label="Institución" lang={lang} value={edu.title} onChange={(v) => onChange(education.map((x, j) => (j === i ? { ...x, title: v } : x)))} />
            <LangInput label="Programa" lang={lang} value={edu.subtitle} onChange={(v) => onChange(education.map((x, j) => (j === i ? { ...x, subtitle: v } : x)))} />
            <LangInput label="Fecha" lang={lang} value={edu.date} onChange={(v) => onChange(education.map((x, j) => (j === i ? { ...x, date: v } : x)))} />
          </div>
          <div className="flex justify-end">
            <SmallBtn variant="danger" onClick={() => onChange(education.filter((_, j) => j !== i))}>
              Quitar
            </SmallBtn>
          </div>
        </div>
      ))}
    </div>
  );
}

type BulletList = CvData["experience"][number]["bullets"];

/** Logros de una experiencia: un solo bloque; cada línea es un bullet. */
function BulletsBlock({
  bullets,
  onChange,
  lang,
}: {
  bullets: BulletList;
  onChange: (v: BulletList) => void;
  lang: LangCode;
}) {
  const [texts, setTexts] = useState<Record<LangCode, string>>(() => ({
    es: toBlock(bullets, "es"),
    en: toBlock(bullets, "en"),
  }));

  const apply = (l: LangCode, v: string) => {
    const next = { ...texts, [l]: v };
    setTexts(next);
    onChange(pairBlocks(next.es, next.en, splitLines));
  };

  return (
    <div className="space-y-1">
      <p className="text-xs text-muted">
        Logros en un solo bloque: cada línea es un bullet. Usa **texto** para resaltarlo en negrita.
      </p>
      <TextArea
        value={texts[lang]}
        onChange={(v) => apply(lang, v)}
        rows={8}
        placeholder={"Primer logro **destacado**\nSegundo logro…\nTercer logro…"}
      />
    </div>
  );
}

function ExperienceEditor({
  experience,
  onChange,
  lang,
  initialJobId,
}: {
  experience: CvData["experience"];
  onChange: (v: CvData["experience"]) => void;
  lang: LangCode;
  initialJobId?: string | null;
}) {
  const [sel, setSel] = useState<string>(
    initialJobId && experience.some((j) => j.id === initialJobId) ? initialJobId : (experience[0]?.id ?? ""),
  );

  useEffect(() => {
    if (initialJobId && experience.some((j) => j.id === initialJobId)) setSel(initialJobId);
  }, [initialJobId, experience]);

  const job = experience.find((j) => j.id === sel) ?? experience[0];

  const setJob = (patch: Partial<CvData["experience"][number]>) =>
    onChange(experience.map((j) => (j.id === job?.id ? { ...j, ...patch } : j)));

  const removeJob = () => onChange(experience.filter((j) => j.id !== job?.id));

  const addJob = () => {
    const created: CvData["experience"][number] = {
      id: `job-${Date.now()}`,
      logo: "",
      role: { es: "", en: "" },
      company: { es: "", en: "" },
      dates: { es: "", en: "" },
      location: { es: "", en: "" },
      bullets: [],
    };
    onChange([...experience, created]);
    setSel(created.id);
  };

  if (!job) {
    return (
      <div className="rounded-2xl border border-line bg-overlay p-4 text-center">
        <p className="mb-3 text-sm text-muted">No hay experiencias aún.</p>
        <SmallBtn onClick={addJob}>+ Añadir experiencia</SmallBtn>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-muted">Edita cada experiencia de manera independiente</p>
        <SmallBtn onClick={addJob}>+ Añadir</SmallBtn>
      </div>

      <select
        value={job.id}
        onChange={(e) => setSel(e.target.value)}
        className="w-full rounded-xl border border-line bg-surface-1 px-3 py-2 text-sm font-semibold text-ink outline-none"
        title="Seleccionar experiencia"
      >
        {experience.map((x, i) => (
          <option key={x.id} value={x.id}>
            {x.company[lang] || x.role[lang] || `Experiencia ${i + 1}`}
          </option>
        ))}
      </select>

      <div key={job.id} className="space-y-3 rounded-2xl border border-line bg-overlay p-3">
        <div className="grid grid-cols-2 gap-3">
          <LangInput label="Cargo" lang={lang} value={job.role} onChange={(v) => setJob({ role: v })} />
          <Field label="Logo (empresa)">
            <select
              value={job.logo ?? ""}
              onChange={(e) => setJob({ logo: e.target.value || undefined })}
              className="w-full rounded-xl border border-line bg-surface-1 px-2 py-2 text-sm text-ink outline-none"
            >
              <option value="">Sin logo</option>
              {COMPANY_LOGOS.map((file) => (
                <option key={file} value={file}>
                  {file.replace(".png", "")}
                </option>
              ))}
            </select>
          </Field>
          <LangInput label="Empresa" lang={lang} value={job.company} onChange={(v) => setJob({ company: v })} />
          <LangInput label="Fechas" lang={lang} value={job.dates} onChange={(v) => setJob({ dates: v })} />
          <LangInput label="Ubicación" lang={lang} value={job.location} onChange={(v) => setJob({ location: v })} />
        </div>

        <div className="space-y-2 rounded-xl border border-line bg-canvas/40 p-3">
          <BulletsBlock key={job.id} bullets={job.bullets} onChange={(bullets) => setJob({ bullets })} lang={lang} />
        </div>

        <div className="flex justify-end">
          <SmallBtn variant="danger" onClick={removeJob}>
            Quitar esta experiencia
          </SmallBtn>
        </div>
      </div>
    </div>
  );
}