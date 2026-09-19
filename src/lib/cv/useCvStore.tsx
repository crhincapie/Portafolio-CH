"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CvData, CvVersion, CV_OFFICIAL_ID } from "./types";
import {
  deepClone,
  exportJson,
  importJson,
  loadActiveId,
  loadVersions,
  newVersion,
  saveActiveId,
  saveVersions,
  createId,
} from "./clientStore";
import { OFFICIAL_VERSION } from "./seed";

interface CvStoreValue {
  versions: CvVersion[];
  activeId: string;
  active: CvVersion;
  official: CvVersion;
  select: (id: string) => void;
  createNamed: (name: string) => void;
  createFromData: (name: string, data: CvData) => void;
  updateData: (data: CvData) => boolean;
  rename: (id: string, name: string) => void;
  remove: (id: string) => void;
  exportAll: () => void;
  importAll: (json: string) => { ok: boolean; message?: string };
}

const CvStoreContext = createContext<CvStoreValue | null>(null);

export function CvStoreProvider({ children }: { children: ReactNode }) {
  const [versions, setVersions] = useState<CvVersion[]>(() => [deepClone(OFFICIAL_VERSION)]);
  const [activeId, setActiveIdState] = useState<string>(CV_OFFICIAL_ID);

  useEffect(() => {
    setVersions(loadVersions());
    setActiveIdState(loadActiveId());
  }, []);

  const persist = useCallback((list: CvVersion[], active: string) => {
    setVersions(list);
    saveVersions(list);
    setActiveIdState(active);
    saveActiveId(active);
  }, []);

  const active = useMemo(() => {
    const found = versions.find((v) => v.id === activeId);
    return found ?? versions.find((v) => v.id === CV_OFFICIAL_ID) ?? deepClone(OFFICIAL_VERSION);
  }, [versions, activeId]);

  const official = useMemo(() => {
    return versions.find((v) => v.id === CV_OFFICIAL_ID) ?? deepClone(OFFICIAL_VERSION);
  }, [versions]);

  const select = useCallback(
    (id: string) => {
      if (versions.some((v) => v.id === id)) persist(versions, id);
    },
    [versions, persist],
  );

  const createNamed = useCallback(
    (name: string) => {
      const created = newVersion(active, name);
      persist([created, ...versions], created.id);
    },
    [active, versions, persist],
  );

  const createFromData = useCallback(
    (name: string, data: CvData) => {
      const now = Date.now();
      const created: CvVersion = {
        id: createId(),
        name: name.trim() || `Versión de ${new Date().toLocaleDateString()}`,
        createdAt: now,
        updatedAt: now,
        readOnly: false,
        data,
      };
      persist([created, ...versions], created.id);
    },
    [versions, persist],
  );

  const updateData = useCallback(
    (data: CvData) => {
      const found = versions.find((v) => v.id === activeId);
      if (!found || found.readOnly) return false;
      const list = versions.map((v) => (v.id === activeId ? { ...v, data, updatedAt: Date.now() } : v));
      persist(list, activeId);
      return true;
    },
    [versions, activeId, persist],
  );

  const rename = useCallback(
    (id: string, name: string) => {
      const list = versions.map((v) => (v.id === id ? { ...v, name } : v));
      persist(list, activeId);
    },
    [versions, activeId, persist],
  );

  const remove = useCallback(
    (id: string) => {
      if (id === CV_OFFICIAL_ID) return;
      const list = versions.filter((v) => v.id !== id);
      const nextActive = id === activeId ? CV_OFFICIAL_ID : activeId;
      persist(list, nextActive);
    },
    [versions, activeId, persist],
  );

  const exportAll = useCallback(() => {
    exportJson(versions);
  }, [versions]);

  const importAll = useCallback(
    (json: string) => {
      const result = importJson(json);
      if (!result.ok) return { ok: false as const, message: result.message };
      setVersions(result.versions);
      saveVersions(result.versions);
      const candidate = result.versions.find((v) => v.id === activeId);
      const firstEditable = result.versions.find((v) => !v.readOnly);
      const nextActive = candidate?.id ?? firstEditable?.id ?? CV_OFFICIAL_ID;
      setActiveIdState(nextActive);
      saveActiveId(nextActive);
      return { ok: true as const };
    },
    [activeId],
  );

  const value = useMemo<CvStoreValue>(
    () => ({
      versions,
      activeId,
      active,
      official,
      select,
      createNamed,
      createFromData,
      updateData,
      rename,
      remove,
      exportAll,
      importAll,
    }),
    [
      versions,
      activeId,
      active,
      official,
      select,
      createNamed,
      createFromData,
      updateData,
      rename,
      remove,
      exportAll,
      importAll,
    ],
  );

  return <CvStoreContext.Provider value={value}>{children}</CvStoreContext.Provider>;
}

export function useCvStore(): CvStoreValue {
  const ctx = useContext(CvStoreContext);
  if (!ctx) throw new Error("useCvStore must be used within CvStoreProvider");
  return ctx;
}

export type { CvData };