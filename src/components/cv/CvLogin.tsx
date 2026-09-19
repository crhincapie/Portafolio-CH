"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CvLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cv/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.refresh();
        router.replace("/cv/editar");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch {
      setError("No se pudo conectar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <div className="mesh-bg absolute inset-0" aria-hidden="true" />
      <div className="glass-surface relative w-full max-w-sm rounded-3xl p-8">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00feff] text-xl font-black text-zinc-950">
            CV
          </span>
          <h1 className="text-lg font-extrabold tracking-tight text-ink">CV · Edición privada</h1>
          <p className="mt-1 text-sm text-muted">Acceso restringido al editor de la hoja de vida.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Usuario</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full rounded-xl border border-line bg-surface-1 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-faint focus:border-[#00feff]"
              placeholder="c.hincapie"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-line bg-surface-1 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-faint focus:border-[#00feff]"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-xs font-medium text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full rounded-full bg-[#00feff] px-6 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-[#7afcff] active:scale-95 disabled:opacity-40"
          >
            {loading ? "Verificando…" : "Entrar al editor"}
          </button>
        </form>
      </div>
    </main>
  );
}