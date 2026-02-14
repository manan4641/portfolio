import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const file = url.searchParams.get("file") || "";
  const title = url.searchParams.get("title") || "unknown";

  // Basic safety: allow only files inside /public/downloads
  // Prevent path traversal like ../../secret
  if (!file || file.includes("..") || file.includes("/") || file.includes("\\")) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  // ✅ This appears in Vercel Logs (Project → Logs)
  console.log("[DOWNLOAD]", { file, title, time: new Date().toISOString() });

  // Redirect to the real file in /public/downloads/
  return NextResponse.redirect(new URL(`/downloads/${file}`, url.origin), 302);
}