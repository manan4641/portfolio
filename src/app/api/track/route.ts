import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { event, meta } = body || {};

  console.info("[TRACK_EVENT]", {
    event: body.event, meta: body.meta,
    title: body.title,
    file: body.file,
    productId: body.productId,
    page: body.page,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
