"use client";

import { ReactNode } from "react";
import { Localized } from "@/lib/cv/types";
import { cn } from "@/lib/utils";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-xl border border-line bg-surface-1 px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-[#00feff] outline-none";

export function TextInput(props: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const { value, onChange, placeholder, type } = props;
  return (
    <input
      type={type ?? "text"}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClasses}
    />
  );
}

export function TextArea(props: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const { value, onChange, placeholder, rows } = props;
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows ?? 3}
      onChange={(e) => onChange(e.target.value)}
      className={cn(inputClasses, "resize-y leading-relaxed")}
    />
  );
}

export type LangCode = "es" | "en";

export const LANG_BADGE: Record<LangCode, string> = { es: "ES", en: "EN" };

/** Campo de un solo idioma (el segun seleccionado en el toggle superior). */
export function LangInput(props: {
  label: string;
  value: Localized;
  onChange: (value: Localized) => void;
  lang: LangCode;
  textarea?: boolean;
  placeholder?: string;
}) {
  const { label, value, onChange, lang, textarea, placeholder } = props;
  return (
    <Field label={`${label} · ${LANG_BADGE[lang]}`}>
      <LangEditor value={value} onChange={onChange} lang={lang} textarea={textarea} placeholder={placeholder} />
    </Field>
  );
}

export function LangEditor(props: {
  value: Localized;
  onChange: (value: Localized) => void;
  lang: LangCode;
  textarea?: boolean;
  placeholder?: string;
}) {
  const { value, onChange, lang, textarea, placeholder } = props;
  const set = (v: string) => onChange({ ...value, [lang]: v });
  if (textarea) {
    return <TextArea value={value[lang]} placeholder={placeholder} onChange={set} />;
  }
  return <TextInput value={value[lang]} placeholder={placeholder} onChange={set} />;
}

export function SmallBtn(props: {
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "ghost" | "danger";
  children: ReactNode;
}) {
  const { type = "button", onClick, variant = "ghost", children } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold transition active:scale-95",
        variant === "danger"
          ? "border border-red-400/40 text-red-400 hover:bg-red-500/10"
          : "border border-line-strong text-muted hover:border-[#00feff] hover:text-[#00feff]",
      )}
    >
      {children}
    </button>
  );
}