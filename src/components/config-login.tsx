"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ConfigLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/config/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Nao foi possivel entrar.");
        return;
      }

      router.refresh();
    } catch {
      setError("Falha ao validar a senha.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-[520px] items-center px-6 py-16 sm:px-8">
      <div className="w-full rounded-[32px] border border-[#d7c7b4] bg-white/90 p-8 shadow-[0_24px_80px_rgba(73,43,19,0.12)] backdrop-blur sm:p-10">
        <div className="space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f6ede2] text-sm font-semibold uppercase tracking-[0.2em] text-[#7b624f]">
            CFG
          </div>
          <h1 className="text-3xl font-medium tracking-[-0.04em] text-[#1f1a16]">
            Painel de configuracao
          </h1>
          <p className="text-sm leading-6 text-[#6a5444]">
            Entre com a senha para editar precos, links de checkout e o script
            da UTMfy.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#5d4839]">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-[#d9c7b7] bg-[#fffaf4] px-4 py-3 text-base text-[#241a13] outline-none transition focus:border-[#c4844c] focus:ring-2 focus:ring-[#f3d4b7]"
              placeholder="Digite a senha"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
            <p className="rounded-2xl border border-[#f0b1a8] bg-[#fff1ef] px-4 py-3 text-sm text-[#9a3e31]">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffd092_0%,#e05d26_100%)] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Entrando..." : "Entrar no painel"}
          </button>
        </form>
      </div>
    </div>
  );
}
