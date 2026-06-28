import { appendFile, mkdir, readFile, stat } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const LOG_DIR = path.join(process.cwd(), "data");
const LOG_FILE = path.join(LOG_DIR, "visits.jsonl");
const PROD_LOG_FILE = "/tmp/visits.jsonl";
const VISIT_LOGS: Array<Record<string, unknown>> = [];

type TrackPayload = {
  visitorId?: string;
  userAgent?: string;
  language?: string;
  languages?: string;
  screen?: string;
  viewport?: string;
  colorDepth?: number;
  timezone?: string;
  referrer?: string;
  url?: string;
  platform?: string;
};

function getClientIp(request: NextRequest): string {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  return "unknown";
}

function decodeHeader(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value) || null;
  } catch {
    return value || null;
  }
}

// Vercel injeta os dados de geolocalização nos headers da requisição (grátis e
// instantâneo). É a fonte mais confiável em produção.
function getGeoFromHeaders(request: NextRequest): Record<string, unknown> | null {
  const city = decodeHeader(request.headers.get("x-vercel-ip-city"));
  const country = decodeHeader(request.headers.get("x-vercel-ip-country"));
  const region = decodeHeader(request.headers.get("x-vercel-ip-country-region"));
  const latitude = decodeHeader(request.headers.get("x-vercel-ip-latitude"));
  const longitude = decodeHeader(request.headers.get("x-vercel-ip-longitude"));
  const timezone = decodeHeader(request.headers.get("x-vercel-ip-timezone"));
  const postal = decodeHeader(request.headers.get("x-vercel-ip-postal-code"));

  if (!city && !country && !region) return null;

  return {
    country,
    region,
    city,
    postal,
    latitude,
    longitude,
    timezone,
    org: null,
    source: "vercel-headers",
  };
}

// Fallback: consulta uma API externa de geolocalização por IP. Tenta dois
// provedores porque o gratuito (ipapi.co) costuma estourar o limite e devolver
// { error: true } com status 200.
async function getGeoFromApi(ip: string): Promise<Record<string, unknown> | null> {
  if (!ip || ip === "unknown") return null;

  // Provedor 1: ipwho.is (sem chave, limite generoso)
  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      const data = (await response.json()) as Record<string, unknown>;
      if (data.success !== false && data.city) {
        return {
          country: data.country ?? null,
          region: data.region ?? null,
          city: data.city ?? null,
          postal: data.postal ?? null,
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
          timezone:
            (data.timezone as Record<string, unknown> | undefined)?.id ?? data.timezone ?? null,
          org: (data.connection as Record<string, unknown> | undefined)?.isp ?? null,
          source: "ipwho.is",
        };
      }
    }
  } catch {
    // tenta o próximo provedor
  }

  // Provedor 2: ipapi.co
  try {
    const response = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      const data = (await response.json()) as Record<string, unknown>;
      if (!data.error && data.city) {
        return {
          country: data.country_name ?? data.country ?? null,
          region: data.region ?? null,
          city: data.city ?? null,
          postal: data.postal ?? null,
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
          timezone: data.timezone ?? null,
          org: data.org ?? null,
          source: "ipapi.co",
        };
      }
    }
  } catch {
    // sem geo
  }

  return null;
}

async function getGeoData(
  request: NextRequest,
  ip: string
): Promise<Record<string, unknown> | null> {
  const headerGeo = getGeoFromHeaders(request);
  // Se os headers já trazem cidade, usa direto (mais rápido e confiável).
  if (headerGeo?.city) return headerGeo;

  const apiGeo = await getGeoFromApi(ip);
  if (apiGeo) return apiGeo;

  // Como último recurso devolve o que veio dos headers (país/região), mesmo sem cidade.
  return headerGeo;
}

function isLocalDev() {
  return process.env.NODE_ENV !== "production";
}

async function saveVisit(entry: Record<string, unknown>) {
  console.log("[track]", JSON.stringify(entry));

  if (isLocalDev()) {
    await mkdir(LOG_DIR, { recursive: true });
    await appendFile(LOG_FILE, `${JSON.stringify(entry)}\n`, "utf8");
  } else {
    await appendFile(PROD_LOG_FILE, `${JSON.stringify(entry)}\n`, "utf8");
  }

  VISIT_LOGS.push(entry);
  if (VISIT_LOGS.length > 100) VISIT_LOGS.shift();
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? request.headers.get("x-track-token");

  if (!process.env.TRACK_VIEW_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        message: "Defina TRACK_VIEW_TOKEN nas variáveis de ambiente da Vercel para ver os registros.",
      },
      { status: 401 }
    );
  }

  if (token !== process.env.TRACK_VIEW_TOKEN) {
    return NextResponse.json({ ok: false, message: "Token inválido." }, { status: 401 });
  }

  try {
    const visits = VISIT_LOGS.slice().reverse();

    if (!isLocalDev()) {
      try {
        await stat(PROD_LOG_FILE);
        const fileContent = await readFile(PROD_LOG_FILE, "utf8");
        const lines = fileContent.trim().split("\n").filter(Boolean);
        const fileVisits = lines.map((line) => JSON.parse(line) as Record<string, unknown>);
        visits.unshift(...fileVisits.slice(-50).reverse());
      } catch {
        // ignora se não houver arquivo ainda
      }
    }

    return NextResponse.json({ ok: true, count: visits.length, visits });
  } catch (error) {
    console.error("[track GET error]", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Não foi possível carregar os registros.",
        error: error instanceof Error ? error.message : String(error),
        debug: {
          hasToken: Boolean(process.env.TRACK_VIEW_TOKEN),
          env: process.env.NODE_ENV,
        },
      },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      Allow: "GET, POST, OPTIONS, HEAD",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TrackPayload;
    const ip = getClientIp(request);
    const geo = await getGeoData(request, ip);

    const entry = {
      timestamp: new Date().toISOString(),
      ip,
      visitorId: body.visitorId ?? null,
      geo,
      userAgent: body.userAgent ?? request.headers.get("user-agent") ?? "",
      language: body.language ?? "",
      languages: body.languages ?? "",
      screen: body.screen ?? "",
      viewport: body.viewport ?? "",
      colorDepth: body.colorDepth ?? null,
      timezone: body.timezone ?? "",
      referrer: body.referrer ?? "",
      url: body.url ?? "",
      platform: body.platform ?? "",
      acceptLanguage: request.headers.get("accept-language") ?? "",
      host: request.headers.get("host") ?? "",
    };

    await saveVisit(entry);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[track POST error]", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Erro ao processar a requisição.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
