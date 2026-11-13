"use client";

import { useEffect } from "react";
import { intro, pointer, prefersReduced } from "@/lib/motion";

/**
 * Page-level effects for Home, ported from initFx()/componentDidMount():
 * loader counter, hero intro, scroll progress bar, scroll reveals, magnetic buttons.
 * All text is server-rendered; the loader only overlays it (see the inline script in page.tsx).
 */
export default function HomeFx() {
  useEffect(() => {
    const reduced = prefersReduced();
    const root = document.documentElement;
    const ease = "cubic-bezier(.16,1,.3,1)";
    const timers: number[] = [];
    let dead = false;

    // ---- intro ----
    const lines = Array.from(document.querySelectorAll<HTMLElement>("[data-line]"));
    const introEls = Array.from(document.querySelectorAll<HTMLElement>("[data-intro]"));
    const play = () => {
      intro.t = performance.now();
      lines.forEach((el, i) => { el.style.transition = `transform 1.3s ${ease} ${i * 0.13}s`; el.style.transform = "none"; });
      introEls.forEach((el, i) => {
        const d = 0.45 + i * 0.12;
        el.style.transition = `opacity 1s ease ${d}s, transform 1.1s ${ease} ${d}s`;
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      timers.push(window.setTimeout(() => root.classList.remove("am-intro"), 3200));
    };

    const L = document.querySelector<HTMLElement>(".loader");
    if (root.classList.contains("am-intro") && !reduced && L) {
      const num = L.querySelector<HTMLElement>(".loader__num");
      const bar = L.querySelector<HTMLElement>(".loader__bar");
      const t0 = performance.now(), D = 1500;
      const tick = (now: number) => {
        if (dead) return;
        const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3);
        if (num) num.textContent = String(Math.round(e * 100)).padStart(2, "0");
        if (bar) bar.style.transform = `scaleX(${e})`;
        if (k < 1) requestAnimationFrame(tick);
        else {
          L.style.transition = "transform .9s cubic-bezier(.76,0,.24,1)";
          L.style.transform = "translateY(-100%)";
          timers.push(window.setTimeout(play, 300));
          timers.push(window.setTimeout(() => { L.style.display = "none"; }, 1000));
        }
      };
      requestAnimationFrame(tick);
    } else {
      root.classList.remove("am-intro");
      intro.t = performance.now() - 2400; // no fly-in when arriving without the loader
    }

    // ---- reveals ----
    let io: IntersectionObserver | null = null;
    if (!reduced && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) => es.forEach((en) => {
          if (en.isIntersecting) {
            const t = en.target as HTMLElement;
            t.style.opacity = "1";
            t.style.transform = "none";
            io!.unobserve(t);
          }
        }),
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const dl = ((Array.prototype.indexOf.call(el.parentNode!.children, el) % 6) * 0.08);
        el.style.opacity = "0";
        el.style.transform = "translateY(48px)";
        el.style.transition = `opacity 1s ${ease} ${dl}s, transform 1.1s ${ease} ${dl}s`;
        io!.observe(el);
      });
      timers.push(window.setTimeout(() => document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) { el.style.opacity = "1"; el.style.transform = "none"; }
      }), 1500));
    }

    // ---- pointer + magnetic buttons ----
    const mags = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-magnet]"));
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      mags.forEach((el) => {
        const r = el.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = Math.hypot(dx, dy) < 120 ? `translate(${(dx * 0.28).toFixed(1)}px,${(dy * 0.28).toFixed(1)}px)` : "";
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // ---- scroll progress ----
    const P = document.querySelector<HTMLElement>(".progress");
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!P) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      P.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    raf = requestAnimationFrame(loop);

    return () => {
      dead = true;
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return null;
}
