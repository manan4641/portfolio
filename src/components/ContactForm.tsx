"use client";

import { useEffect, useState } from "react";
import { EMAIL } from "@/data/site";
import { track } from "@/lib/track";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
const NOTE: Record<Exclude<Status, "idle">, string> = {
  sending: "Sending…",
  sent: "Message sent. Thank you for reaching out! I'll get back to you shortly.",
  mailto: "Your email app should now be open with the message ready to send.",
  error: `Something went wrong sending your message. Please try again, or email ${EMAIL} directly.`,
};

// Sends through Web3Forms, like the previous site (same NEXT_PUBLIC_WEB3FORMS_KEY).
// Without a key it falls back to the design's mailto behaviour.
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const f = new FormData(form);
    track("contact_form_submit", { location: "home_contact" });
    if (!WEB3FORMS_KEY) {
      window.location.href =
        `mailto:${EMAIL}?subject=` + encodeURIComponent(String(f.get("subject"))) +
        "&body=" + encodeURIComponent(f.get("message") + "\n\n" + f.get("name") + "\n" + f.get("email"));
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const body = new FormData();
      body.append("access_key", WEB3FORMS_KEY);
      body.append("name", String(f.get("name")));
      body.append("email", String(f.get("email")));
      body.append("subject", `Portfolio - Abdul Manan: ${f.get("subject")}`);
      body.append("message", String(f.get("message")));
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || "send failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };
  return (
    <form data-reveal="1" onSubmit={send} className="form">
      <div className="form__row">
        <label>Name<input name="name" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <label>Subject<input name="subject" required /></label>
      <label>Message<textarea name="message" required rows={5} /></label>
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send Message"}</button>
      {status !== "idle" && status !== "sending" && (
        <div className={"form__sent" + (status === "error" ? " form__sent--err" : "")} role="status">{NOTE[status]}</div>
      )}
    </form>
  );
}

// "Islamabad 14:05 · GMT+5", updated every 30s.
export function IslamabadTime() {
  const fmt = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" });
  const [t, setT] = useState<string>("");
  useEffect(() => {
    setT(fmt());
    const id = window.setInterval(() => setT(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return <span className="mono" suppressHydrationWarning>Islamabad {t || "--:--"} · GMT+5</span>;
}

// Outbound link that records a click event (WhatsApp, LinkedIn, etc.).
export function TrackedLink({ event, meta, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; meta?: Record<string, string> }) {
  return <a {...rest} onClick={() => track(event, meta)} />;
}
