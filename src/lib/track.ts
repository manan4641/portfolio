"use client";

import { track as vercelTrack } from "@vercel/analytics";

// Click tracking carried over from the previous site: Vercel Analytics event + /api/track log line.
export function track(event: string, meta: Record<string, string> = {}) {
  try {
    vercelTrack(event, meta);
  } catch {}
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, meta, page: location.pathname }),
      keepalive: true,
    });
  } catch {}
}
