"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const CHIPS: [string, string][] = [
  ["Experience", "Summarise Abdul's work experience."],
  ["Projects", "What are Abdul's featured projects?"],
  ["Skills", "What are Abdul's main skills and tools?"],
  ["Services", "What services does Abdul offer?"],
  ["Availability", "Is Abdul available for new work?"],
  ["Contact", "How can I contact Abdul?"],
];

// Floating "Ask AI" button + chat dialog. Answers come from /api/ask (Anthropic API, server-side).
export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (open && window.innerWidth >= 900) input.current?.focus(); }, [open]);
  // Scroll so the start of a new answer is visible; otherwise stick to the bottom.
  useEffect(() => {
    const cl = list.current;
    if (!cl) return;
    const ms = cl.querySelectorAll("[data-msg]"), last = ms[ms.length - 1] as HTMLElement | undefined, lm = chat[chat.length - 1];
    cl.scrollTop = last && lm && lm.role === "assistant" && !busy
      ? last.getBoundingClientRect().top - cl.getBoundingClientRect().top + cl.scrollTop - 12
      : cl.scrollHeight;
  }, [chat, busy]);

  const ask = async (q: string) => {
    if (busy) return;
    const next = chat.concat({ role: "user", content: q });
    setChat(next);
    setBusy(true);
    let a = "";
    try {
      const r = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.slice(-9) }) });
      a = String((await r.json()).text || "");
    } catch {
      a = "I couldn't reach the assistant just now. Please try again in a moment, or email web.abdulmanan@gmail.com.";
    }
    setChat((c) => c.concat({ role: "assistant", content: a.trim() || "Sorry, I don't have an answer for that." }));
    setBusy(false);
  };

  if (!open) {
    return (
      <button className="ask" onClick={() => setOpen(true)} aria-label="Ask AI about my work">
        <span className="ai-badge">AI</span>
        <span className="ask__txt"><b>Ask AI</b><span>About my work</span></span>
      </button>
    );
  }
  return (
    <div className="chat" role="dialog" aria-label="Ask AI">
      <div className="chat__head">
        <span className="ai-badge">AI</span>
        <span className="chat__who"><b>Abdul&apos;s AI</b><span>Experience, projects and skills</span></span>
        <button className="chat__close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
      </div>
      <div className="chat__chips">
        {CHIPS.map(([label, q]) => <button key={label} onClick={() => ask(q)}>{label}</button>)}
      </div>
      <div ref={list} className="chat__list" aria-live="polite">
        {!chat.length && !busy && (
          <div className="chat__empty">
            <b>Hi, I&apos;m Abdul&apos;s AI.</b>
            <span>Ask about his experience, projects, skills or services, or tap a topic above.</span>
          </div>
        )}
        {chat.map((m, i) => <div key={i} data-msg="1" className={"msg" + (m.role === "user" ? " msg--user" : "")}>{m.content}</div>)}
        {busy && <div className="msg msg--busy">Thinking…</div>}
      </div>
      <form
        className="chat__form"
        onSubmit={(e) => {
          e.preventDefault();
          const el = input.current, v = el ? el.value.trim() : "";
          if (!v || busy) return;
          el!.value = "";
          ask(v);
        }}
      >
        <div className="chat__input">
          <input ref={input} name="q" maxLength={500} autoComplete="off" placeholder="Ask about my work…" aria-label="Your question" />
          <button type="submit" aria-label="Send">↑</button>
        </div>
        <div className="chat__note">
          <span>AI answers can be wrong. For anything important, email Abdul.</span>
          {chat.length > 0 && <button type="button" onClick={() => { if (!busy) setChat([]); }}>Clear</button>}
        </div>
      </form>
    </div>
  );
}
