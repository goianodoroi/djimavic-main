"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { LinkPreset, SiteConfig } from "@/lib/site-config";

type SaveResponse = {
  ok?: boolean;
  error?: string;
};

function createPreset(index: number): LinkPreset {
  return {
    id: `preset-${Date.now()}-${index}`,
    name: `Par ${index + 1}`,
    mavic3ProUrl: "",
    mavic4ProUrl: "",
    isActive: false,
  };
}

function cloneConfig(config: SiteConfig): SiteConfig {
  return {
    prices: { ...config.prices },
    utmfyHeadScript: config.utmfyHeadScript,
    linkPresets: config.linkPresets.map((preset) => ({ ...preset })),
    updatedAt: config.updatedAt,
  };
}

function setActivePreset(presets: LinkPreset[], id: string) {
  return presets.map((preset) => ({
    ...preset,
    isActive: preset.id === id,
  }));
}

export function ConfigDashboard({
  initialConfig,
}: {
  initialConfig: SiteConfig;
}) {
  const router = useRouter();
  const [config, setConfig] = useState(() => cloneConfig(initialConfig));
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackTone, setFeedbackTone] = useState<"success" | "error">(
    "success",
  );

  const activePreset =
    config.linkPresets.find((preset) => preset.isActive) ?? config.linkPresets[0];

  function updatePreset(id: string, field: keyof LinkPreset, value: string | boolean) {
    setConfig((current) => ({
      ...current,
      linkPresets: current.linkPresets.map((preset) =>
        preset.id === id ? { ...preset, [field]: value } : preset,
      ),
    }));
  }

  function handleAddPreset() {
    setConfig((current) => ({
      ...current,
      linkPresets: [
        ...current.linkPresets,
        createPreset(current.linkPresets.length),
      ],
    }));
  }

  function handleRemovePreset(id: string) {
    setConfig((current) => {
      const nextPresets = current.linkPresets.filter((preset) => preset.id !== id);

      if (nextPresets.length === 0) {
        return {
          ...current,
          linkPresets: [createPreset(0)],
        };
      }

      if (!nextPresets.some((preset) => preset.isActive)) {
        nextPresets[0] = {
          ...nextPresets[0],
          isActive: true,
        };
      }

      return {
        ...current,
        linkPresets: nextPresets,
      };
    });
  }

  async function handleSave() {
    setFeedback("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...config,
          linkPresets:
            config.linkPresets.length > 0
              ? config.linkPresets
              : [{ ...createPreset(0), isActive: true }],
        }),
      });

      const data = (await response.json()) as SaveResponse & { config?: SiteConfig };

      if (!response.ok || !data.config) {
        setFeedbackTone("error");
        setFeedback(data.error ?? "Nao foi possivel salvar.");
        return;
      }

      setConfig(cloneConfig(data.config));
      setFeedbackTone("success");
      setFeedback("Configuracoes salvas com sucesso.");
      router.refresh();
    } catch {
      setFeedbackTone("error");
      setFeedback("Falha ao salvar as configuracoes.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/config/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="min-h-[100dvh] bg-[#f5ecdf] text-[#1f1a16]">
      <div className="mx-auto max-w-[1180px] px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 rounded-[34px] border border-[#dccbbb] bg-white/88 p-6 shadow-[0_24px_80px_rgba(73,43,19,0.12)] backdrop-blur sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9d7c62]">
              /config
            </p>
            <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-medium tracking-[-0.05em]">
              Central de configuracao
            </h1>
            <p className="max-w-[56ch] text-sm leading-6 text-[#6a5444]">
              Ajuste os precos, deixe varios pares de checkout prontos, escolha o
              par ativo e cole o script da UTMfy que deve ir no final do
              {" </head>"}.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d4c2b2] px-5 text-sm font-semibold text-[#3d2c1f] transition hover:border-[#c4844c] hover:text-[#1f1a16]"
            >
              Abrir home
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#f0cdc7] px-5 text-sm font-semibold text-[#9a3e31] transition hover:bg-[#fff4f2]"
            >
              Sair
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffd092_0%,#e05d26_100%)] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Salvando..." : "Salvar alteracoes"}
            </button>
          </div>
        </div>

        {feedback ? (
          <div
            className={`mt-5 rounded-[24px] border px-5 py-4 text-sm ${
              feedbackTone === "success"
                ? "border-[#cce2c8] bg-[#f4fbf2] text-[#375f35]"
                : "border-[#f0b1a8] bg-[#fff1ef] text-[#9a3e31]"
            }`}
          >
            {feedback}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6">
          <section className="rounded-[34px] border border-[#dccbbb] bg-white/90 p-6 shadow-[0_18px_60px_rgba(73,43,19,0.08)] sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9d7c62]">
                  Precos
                </p>
                <h2 className="text-[1.8rem] font-medium tracking-[-0.04em]">
                  Preco dos produtos
                </h2>
                <p className="text-sm leading-6 text-[#6a5444]">
                  O menor preco entre os dois modelos tambem aparece nos botoes da
                  home que levam para a selecao dos cards.
                </p>
              </div>
              <div className="rounded-full border border-[#ead8c8] bg-[#fcf7f1] px-4 py-2 text-sm text-[#6d5848]">
                Par ativo: {activePreset?.name ?? "Nao definido"}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="rounded-[28px] border border-[#e4d4c4] bg-[#fffaf5] p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7c62]">
                  DJI Mavic 4 Pro
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-[2rem] leading-none text-[#7b624f]">US$</span>
                  <input
                    value={config.prices.mavic4Pro}
                    onChange={(event) =>
                      setConfig((current) => ({
                        ...current,
                        prices: {
                          ...current.prices,
                          mavic4Pro: event.target.value,
                        },
                      }))
                    }
                    className="w-full rounded-2xl border border-[#dac8b8] bg-white px-4 py-3 text-2xl font-medium text-[#1f1a16] outline-none transition focus:border-[#c4844c] focus:ring-2 focus:ring-[#f3d4b7]"
                    inputMode="decimal"
                    placeholder="137"
                  />
                </div>
              </label>

              <label className="rounded-[28px] border border-[#e4d4c4] bg-[#fffaf5] p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7c62]">
                  DJI Mavic 3 Pro
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-[2rem] leading-none text-[#7b624f]">US$</span>
                  <input
                    value={config.prices.mavic3Pro}
                    onChange={(event) =>
                      setConfig((current) => ({
                        ...current,
                        prices: {
                          ...current.prices,
                          mavic3Pro: event.target.value,
                        },
                      }))
                    }
                    className="w-full rounded-2xl border border-[#dac8b8] bg-white px-4 py-3 text-2xl font-medium text-[#1f1a16] outline-none transition focus:border-[#c4844c] focus:ring-2 focus:ring-[#f3d4b7]"
                    inputMode="decimal"
                    placeholder="97"
                  />
                </div>
              </label>
            </div>
          </section>

          <section className="rounded-[34px] border border-[#dccbbb] bg-white/90 p-6 shadow-[0_18px_60px_rgba(73,43,19,0.08)] sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9d7c62]">
                  Checkout
                </p>
                <h2 className="text-[1.8rem] font-medium tracking-[-0.04em]">
                  Mult link por modelo
                </h2>
                <p className="text-sm leading-6 text-[#6a5444]">
                  Deixe varios pares prontos. So um fica ativo por vez, e e esse
                  par que a home usa quando alguem clica em cada produto.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddPreset}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9c7b7] bg-[#fffaf4] px-5 text-sm font-semibold text-[#3d2c1f] transition hover:border-[#c4844c]"
              >
                + Adicionar par
              </button>
            </div>

            <div className="mt-8 grid gap-5">
              {config.linkPresets.map((preset, index) => (
                <div
                  key={preset.id}
                  className={`rounded-[30px] border p-5 transition ${
                    preset.isActive
                      ? "border-[#df8d53] bg-[#fff6ee] shadow-[0_16px_32px_rgba(224,93,38,0.08)]"
                      : "border-[#e4d4c4] bg-[#fffaf5]"
                  }`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setConfig((current) => ({
                            ...current,
                            linkPresets: setActivePreset(current.linkPresets, preset.id),
                          }))
                        }
                        className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition ${
                          preset.isActive
                            ? "bg-[linear-gradient(135deg,#ffd092_0%,#e05d26_100%)] text-black"
                            : "border border-[#d9c7b7] bg-white text-[#3d2c1f] hover:border-[#c4844c]"
                        }`}
                      >
                        {preset.isActive ? "Par em uso" : "Usar este par"}
                      </button>

                      <span className="rounded-full border border-[#ead8c8] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9d7c62]">
                        {`Conjunto ${index + 1}`}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      {config.linkPresets.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => handleRemovePreset(preset.id)}
                          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#f0cdc7] px-4 text-sm font-semibold text-[#9a3e31] transition hover:bg-[#fff4f2]"
                        >
                          Remover
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[0.72fr_1fr_1fr]">
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7c62]">
                        Nome do par
                      </span>
                      <input
                        value={preset.name}
                        onChange={(event) =>
                          updatePreset(preset.id, "name", event.target.value)
                        }
                        className="w-full rounded-2xl border border-[#dac8b8] bg-white px-4 py-3 text-sm text-[#241a13] outline-none transition focus:border-[#c4844c] focus:ring-2 focus:ring-[#f3d4b7]"
                        placeholder="Par principal"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7c62]">
                        Checkout Mavic 4 Pro
                      </span>
                      <input
                        value={preset.mavic4ProUrl}
                        onChange={(event) =>
                          updatePreset(preset.id, "mavic4ProUrl", event.target.value)
                        }
                        className="w-full rounded-2xl border border-[#dac8b8] bg-white px-4 py-3 text-sm text-[#241a13] outline-none transition focus:border-[#c4844c] focus:ring-2 focus:ring-[#f3d4b7]"
                        placeholder="https://seu-checkout.com/mavic-4"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7c62]">
                        Checkout Mavic 3 Pro
                      </span>
                      <input
                        value={preset.mavic3ProUrl}
                        onChange={(event) =>
                          updatePreset(preset.id, "mavic3ProUrl", event.target.value)
                        }
                        className="w-full rounded-2xl border border-[#dac8b8] bg-white px-4 py-3 text-sm text-[#241a13] outline-none transition focus:border-[#c4844c] focus:ring-2 focus:ring-[#f3d4b7]"
                        placeholder="https://seu-checkout.com/mavic-3"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[34px] border border-[#dccbbb] bg-white/90 p-6 shadow-[0_18px_60px_rgba(73,43,19,0.08)] sm:p-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9d7c62]">
                Scripts
              </p>
              <h2 className="text-[1.8rem] font-medium tracking-[-0.04em]">
                Pixel UTMfy e script global
              </h2>
              <p className="max-w-[70ch] text-sm leading-6 text-[#6a5444]">
                Cole aqui o script da UTMfy. Se vier com a tag {"<script>"},
                tudo bem. O sistema injeta esse conteudo antes do fechamento do
                {" </head>"} em todas as paginas.
              </p>
            </div>

            <div className="mt-6 rounded-[28px] border border-[#e4d4c4] bg-[#fffaf5] p-4">
              <textarea
                value={config.utmfyHeadScript}
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    utmfyHeadScript: event.target.value,
                  }))
                }
                className="min-h-[260px] w-full resize-y rounded-[22px] border border-[#dac8b8] bg-[#fdf6ec] px-4 py-4 font-mono text-[13px] leading-6 text-[#3f3329] outline-none transition focus:border-[#c4844c] focus:ring-2 focus:ring-[#f3d4b7]"
                placeholder={`<script>\n  // cole seu script da UTMfy aqui\n</script>`}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
