"use client";

import { useEffect, useRef } from "react";

// 2px reading-progress bar under the article's sticky top bar.
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = document.documentElement, max = Math.max(1, el.scrollHeight - window.innerHeight);
        if (ref.current) ref.current.style.transform = `scaleX(${Math.min(1, window.scrollY / max).toFixed(4)})`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="art-bar__prog" />;
}
