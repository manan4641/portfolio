"use client";

import { useEffect, useRef } from "react";
import { prefersReduced } from "@/lib/motion";

const PAIRS = [0, 1].flatMap(() => [
  { a: "Have an idea?", b: "Let's talk" },
  { a: "Have a project?", b: "Let's build" },
]);

// Drifts continuously, speeds up with scroll velocity and skews up to 9° (mq2 in the design).
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = prefersReduced();
    let raf = 0, off = 0, lastY = window.scrollY, vel = 0, lastT = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(50, now - lastT); lastT = now;
      const y = window.scrollY; vel += (y - lastY - vel) * 0.15; lastY = y;
      const half = el.scrollWidth / 2;
      if (!half) return;
      off = (off + (reduced ? 0 : dt * 0.06 + Math.abs(vel) * 0.7)) % half;
      el.style.transform = `translate3d(${off - half}px,0,0) skewX(${Math.max(-9, Math.min(9, vel * 0.14 * -1)).toFixed(2)}deg)`;
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="mq" aria-hidden="true">
      <div ref={ref} className="mq__track">
        {PAIRS.map((w, i) => (
          <span key={i} className="mq__pair">
            <span className="mq__a">{w.a}</span>
            <span className="mq__dot" />
            <span className="mq__b">{w.b}</span>
            <span className="mq__dot mq__dot--gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
