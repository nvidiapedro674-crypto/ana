"use client";

import { useEffect, useMemo, useState } from "react";

type Visit = {
  timestamp: string;
  ip: string;
  visitorId: string | null;
  geo?: {
    country?: string | null;
    region?: string | null;
    city?: string | null;
    postal?: string | null;
    latitude?: string | null;
    longitude?: string | null;
    timezone?: string | null;
    org?: string | null;
  } | null;
  userAgent: string;
  language: string;
  languages: string;
  screen: string;
  viewport: string;
  colorDepth: number | null;
  timezone: string;
  referrer: string;
  url: string;
  platform: string;
  acceptLanguage: string;
  host: string;
};

export default function VisitorsPage() {
  const [token, setToken] = useState("");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string | null>(null);

  const hasToken = token.trim().length > 0;

  useEffect(() => {
    if (!hasToken) return;

    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    fetch(`/api/track?token=${encodeURIComponent(token)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.message || `HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.ok && Array.isArray(data.visits)) {
          setVisits(data.visits);
          setStatus("ready");
        } else {
          throw new Error(data?.message || "Resposta inválida");
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Falha ao carregar visitas");
        setStatus("error");
      });

    return () => controller.abort();
  }, [hasToken, token]);

  const tokenHint = useMemo(() => {
    if (!token) return "Cole seu token aqui e clique em Carregar.";
    return "Token ativo. Os dados são carregados automaticamente.";
  }, [token]);

  return (
    <div className="min-h-screen bg-ink px-6 py-10 text-paper sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-neutral-800 bg-[#111113] p-8 shadow-[0_0_120px_rgba(0,0,0,0.25)] sm:p-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Painel de visitantes</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
              Logs de acesso
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-400 sm:text-base">
              Veja cada visita com IP, cidade, dispositivo, página e mais detalhes.
            </p>
          </div>
          <div className="w-full max-w-xl sm:w-auto">
            <label className="block text-xs uppercase tracking-[0.35em] text-neutral-500">
              Token de visualização
            </label>
            <div className="mt-3 flex gap-3">
              <input
                value={token}
                onChange={(event) => setToken(event.target.value)}
                className="w-full rounded-2xl border border-neutral-700 bg-[#151518] px-4 py-3 text-sm text-paper outline-none transition focus:border-paper focus:ring-2 focus:ring-paper/20"
                placeholder="Insira o TRACK_VIEW_TOKEN"
              />
              <button
                type="button"
                onClick={() => setToken(token.trim())}
                className="rounded-2xl bg-paper px-4 py-3 text-sm font-semibold text-ink transition hover:bg-neutral-200"
              >
                Carregar
              </button>
            </div>
            <p className="mt-2 text-xs text-neutral-500">{tokenHint}</p>
          </div>
        </div>

        <div className="space-y-4">
          {status === "loading" && (
            <div className="rounded-3xl border border-neutral-700 bg-[#111113] p-6 text-sm text-neutral-300">
              Carregando visitantes...
            </div>
          )}

          {status === "error" && error && (
            <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-red-200">
              Erro: {error}
            </div>
          )}

          {status === "ready" && visits.length === 0 && (
            <div className="rounded-3xl border border-neutral-700 bg-[#111113] p-6 text-sm text-neutral-300">
              Nenhuma visita encontrada. Verifique se o token está correto.
            </div>
          )}

          {visits.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {visits.map((visit, index) => (
                <article
                  key={`${visit.timestamp}-${index}`}
                  className="rounded-3xl border border-neutral-800 bg-[#0c0c0f] p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)]"
                >
                  <div className="mb-5 flex items-center justify-between gap-4 text-sm text-neutral-400">
                    <div>
                      <p className="font-semibold text-paper">{new Date(visit.timestamp).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</p>
                      <p className="mt-1 text-xs text-neutral-500">{visit.timezone || "Timezone não disponível"}</p>
                    </div>
                    <span className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-neutral-300">
                      {visit.geo?.country || "Desconhecido"}
                    </span>
                  </div>

                  <div className="mb-5 grid gap-3 rounded-3xl border border-neutral-800 bg-[#141417] p-4 text-sm text-neutral-300">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">IP</span>
                      <span className="truncate font-medium text-paper">{visit.ip}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Cidade</span>
                      <span className="truncate font-medium text-paper">
                        {visit.geo?.city || "-"}
                        {visit.geo?.region ? `, ${visit.geo.region}` : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Região</span>
                      <span className="truncate font-medium text-paper">{visit.geo?.region || "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Org</span>
                      <span className="truncate font-medium text-paper">{visit.geo?.org || "-"}</span>
                    </div>
                  </div>

                  <div className="grid gap-3 rounded-3xl border border-neutral-800 bg-[#141417] p-4 text-sm text-neutral-300">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Dispositivo</span>
                      <span className="truncate font-medium text-paper">{visit.platform}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Tela</span>
                      <span className="truncate font-medium text-paper">{visit.screen}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Viewport</span>
                      <span className="truncate font-medium text-paper">{visit.viewport}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Profundidade</span>
                      <span className="truncate font-medium text-paper">{visit.colorDepth ?? "-"}</span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-3xl border border-neutral-800 bg-[#141417] p-4 text-sm text-neutral-300">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Página</span>
                      <span className="truncate font-medium text-paper">{new URL(visit.url).pathname || "/"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Referência</span>
                      <span className="truncate font-medium text-paper">{visit.referrer || "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-neutral-500">Visitor ID</span>
                      <span className="truncate font-medium text-paper">{visit.visitorId || "-"}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
