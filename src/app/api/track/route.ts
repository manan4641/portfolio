import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { event, meta } = body || {};

  console.log("[TRACK]", {
    event: event || "unknown",
    meta: meta || {},
    time: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
