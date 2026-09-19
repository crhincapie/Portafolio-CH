import { CvVersion, CV_ACTIVE_KEY, CV_STORAGE_KEY, CV_OFFICIAL_ID } from "./types";
import { OFFICIAL_VERSION } from "./seed";

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function deepClone<T>(value: T): T {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function isValidVersion(value: unknown): value is CvVersion {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<CvVersion>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.readOnly === "boolean" &&
    v.data !== null &&
    typeof v.data === "object"
  );
}

export function ensureOfficial(list: CvVersion[]): CvVersion[] {
  if (list.some((v) => v.id === CV_OFFICIAL_ID)) return list;
  return [deepClone(OFFICIAL_VERSION), ...list];
}

export function loadVersions(): CvVersion[] {
  if (typeof window === "undefined") return [deepClone(OFFICIAL_VERSION)];
  try {
    const raw = window.localStorage.getItem(CV_STORAGE_KEY);
    if (!raw) return [deepClone(OFFICIAL_VERSION)];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [deepClone(OFFICIAL_VERSION)];
    const valid = parsed.filter(isValidVersion);
    return ensureOfficial(valid);
  } catch {
    return [deepClone(OFFICIAL_VERSION)];
  }
}

export function saveVersions(list: CvVersion[]): void {
  try {
    window.localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* storage may be unavailable; ignore */
  }
}

export function loadActiveId(): string {
  try {
    return window.localStorage.getItem(CV_ACTIVE_KEY) || CV_OFFICIAL_ID;
  } catch {
    return CV_OFFICIAL_ID;
  }
}

export function saveActiveId(id: string): void {
  try {
    window.localStorage.setItem(CV_ACTIVE_KEY, id);
  } catch {
    /* ignore */
  }
}

export function newVersion(base: CvVersion, name: string): CvVersion {
  const now = Date.now();
  return {
    id: createId(),
    name: name.trim() || `Versión de ${new Date().toLocaleDateString()}`,
    createdAt: now,
    updatedAt: now,
    readOnly: false,
    data: deepClone(base.data),
  };
}

export function exportJson(list: CvVersion[]): void {
  const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cv-privada-versiones-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importJson(json: string): { ok: true; versions: CvVersion[] } | { ok: false; message: string } {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return { ok: false, message: "El archivo no contiene un arreglo de versiones." };
    const valid = parsed.filter(isValidVersion);
    if (valid.length === 0) return { ok: false, message: "No se encontraron versiones válidas en el archivo." };
    return { ok: true, versions: ensureOfficial(valid) };
  } catch {
    return { ok: false, message: "El archivo JSON no es válido." };
  }
}