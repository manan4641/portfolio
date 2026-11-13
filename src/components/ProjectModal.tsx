"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Intercepted /portfolio/[slug]: shows the detail panel over the current page, as in the design.
export default function ProjectModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") router.back(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [router]);
  return (
    <div className="pd-back" onClick={() => router.back()} role="dialog" aria-modal="true">
      <div style={{ width: "100%", maxWidth: 1080, margin: "auto" }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function CloseBack() {
  const router = useRouter();
  return <button className="pd__close" onClick={() => router.back()} aria-label="Close">✕</button>;
}
