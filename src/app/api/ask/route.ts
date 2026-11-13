import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { aiSystem } from "@/lib/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FALLBACK = "I couldn't reach the assistant just now. Please try again in a moment, or email web.abdulmanan@gmail.com.";
const SYSTEM = aiSystem();

// Small per-instance rate limit: 12 questions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), win = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < win);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 12;
}

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ text: FALLBACK }, { status: 503 });
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (limited(ip)) return NextResponse.json({ text: "You've asked a lot of questions in a short time. Please wait a few minutes, or email web.abdulmanan@gmail.com." }, { status: 429 });

  const body = (await req.json().catch(() => null)) as { messages?: Msg[] } | null;
  const raw = Array.isArray(body?.messages) ? body!.messages : [];
  // Last 9 messages, as in the design; validate shape and length.
  let messages: Anthropic.MessageParam[] = raw
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-9)
    .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === "user" ? 500 : 2000) }));
  while (messages.length && messages[0].role !== "user") messages = messages.slice(1);
  if (!messages.length || messages[messages.length - 1].role !== "user") return NextResponse.json({ text: FALLBACK }, { status: 400 });

  const client = new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 400,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages,
    });
    if (response.stop_reason === "refusal") {
      return NextResponse.json({ text: "Sorry, I can't help with that. For anything about Abdul's work, email web.abdulmanan@gmail.com." });
    }
    const text = response.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    return NextResponse.json({ text: text || "Sorry, I don't have an answer for that." });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) console.error("[ask] rate limited");
    else if (error instanceof Anthropic.AuthenticationError) console.error("[ask] invalid ANTHROPIC_API_KEY");
    else if (error instanceof Anthropic.APIError) console.error(`[ask] API error ${error.status}: ${error.message}`);
    else console.error("[ask]", error);
    return NextResponse.json({ text: FALLBACK }, { status: 502 });
  }
}
