import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const LOG_DIR = path.join(process.cwd(), "data");
const LOG_FILE = path.join(LOG_DIR, "visits.jsonl");

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
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

async function saveVisit(entry: Record<string, unknown>) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blobName = `visits/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.json`;
    await put(blobName, JSON.stringify(entry), {
      access: "public",
      contentType: "application/json",
    });
    return;
  }

  await mkdir(LOG_DIR, { recursive: true });
  await appendFile(LOG_FILE, `${JSON.stringify(entry)}\n`, "utf8");
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TrackPayload;

    const entry = {
      timestamp: new Date().toISOString(),
      ip: getClientIp(request),
      visitorId: body.visitorId ?? null,
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
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
