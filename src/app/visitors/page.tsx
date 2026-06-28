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
              Visualize os últimos acessos ao site, incluindo IP, localidade, página visitada e navegador.
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
            <div className="overflow-x-auto rounded-3xl border border-neutral-800 bg-[#0c0c0f] p-4 shadow-[0_0_40px_rgba(0,0,0,0.35)] sm:p-6">
              <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm text-neutral-200">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">IP</th>
                    <th className="px-4 py-3">Local</th>
                    <th className="px-4 py-3">URL</th>
                    <th className="px-4 py-3">Navegador</th>
                    <th className="px-4 py-3">Visitor ID</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((visit, index) => (
                    <tr key={`${visit.timestamp}-${index}`} className="border-t border-neutral-800/80">
                      <td className="px-4 py-4 align-top text-neutral-300">
                        {new Date(visit.timestamp).toLocaleString("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                        <div className="mt-1 text-[11px] text-neutral-500">{visit.timezone || "-"}</div>
                      </td>
                      <td className="px-4 py-4 align-top text-neutral-300">
                        <span className="inline-flex max-w-[12rem] truncate rounded-full bg-neutral-900 px-2 py-1 text-[11px] text-neutral-300">
                          {visit.ip}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top text-neutral-300">
                        {visit.geo?.city || "-"}, {visit.geo?.region || "-"}
                        <div className="mt-1 text-[11px] text-neutral-500">{visit.geo?.country || "-"}</div>
                      </td>
                      <td className="px-4 py-4 align-top text-neutral-300">
                        <a
                          href={visit.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-paper transition hover:text-white"
                        >
                          {new URL(visit.url).pathname || "/"}
                        </a>
                      </td>
                      <td className="px-4 py-4 align-top text-neutral-300">
                        <div className="max-w-[20rem] truncate text-sm">{visit.userAgent}</div>
                        <div className="mt-1 text-[11px] text-neutral-500">{visit.platform}</div>
                      </td>
                      <td className="px-4 py-4 align-top text-neutral-300">
                        <div className="max-w-[14rem] truncate text-sm">{visit.visitorId || "-"}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
