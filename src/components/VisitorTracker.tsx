"use client";

import { useEffect } from "react";

const VISITOR_COOKIE = "ana_visitor_id";

function getOrCreateVisitorId(): string {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${VISITOR_COOKIE}=`));

  if (match) return decodeURIComponent(match.split("=")[1]);

  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

  document.cookie = `${VISITOR_COOKIE}=${encodeURIComponent(id)}; path=/; max-age=31536000; SameSite=Lax`;
  return id;
}

export default function VisitorTracker() {
  useEffect(() => {
    const visitorId = getOrCreateVisitorId();

    const payload = {
      visitorId,
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(",") ?? "",
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: window.screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || "",
      url: window.location.href,
      platform: navigator.platform,
    };

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* falha silenciosa — não atrapalha a experiência */
    });
  }, []);

  return null;
}
