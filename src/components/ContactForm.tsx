"use client";

import { useEffect, useState } from "react";
import { EMAIL } from "@/data/site";
import { track } from "@/lib/track";

// mailto form, as in the design.
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    track("contact_form_submit", { location: "home_contact" });
    window.location.href =
      `mailto:${EMAIL}?subject=` + encodeURIComponent(String(f.get("subject"))) +
      "&body=" + encodeURIComponent(f.get("message") + "\n\n" + f.get("name") + "\n" + f.get("email"));
    setSent(true);
  };
  return (
    <form data-reveal="1" onSubmit={send} className="form">
      <div className="form__row">
        <label>Name<input name="name" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <label>Subject<input name="subject" required /></label>
      <label>Message<textarea name="message" required rows={5} /></label>
      <button type="submit">Send Message</button>
      {sent && <div className="form__sent" role="status">Your email app should now be open with the message ready to send.</div>}
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
