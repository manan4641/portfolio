"use client";

import { useEffect, useRef, useState } from "react";
import { goTo } from "@/lib/motion";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return <button className="to-top" onClick={() => goTo("home")} aria-label="Back to top">↑</button>;
}

const RAYS = Array.from({ length: 12 }, (_, i) => i * 30);
const Rays = () => (
  <svg viewBox="-30 -30 60 60"><g>{RAYS.map((r) => <line key={r} x1="9" y1="0" x2="17" y2="0" transform={`rotate(${r})`} />)}</g></svg>
);

// Low-poly faceted arrow cursor with pulsing rays (desktop only, >= 900px, fine pointer).
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    const upd = () => setOn(mq.matches);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    if (!on) { root.classList.remove("am-cur"); return; }
    const onMove = (e: MouseEvent) => {
      const c = ref.current;
      if (!c) return;
      root.classList.add("am-cur");
      const tg = e.target as Element | null;
      const cl = (s: string) => !!tg?.closest?.(s);
      const hot = cl("a,button,article");
      c.style.opacity = cl("input,textarea,select") ? "0" : "1";
      c.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      const rays = c.firstElementChild as HTMLElement, arrow = c.lastElementChild as HTMLElement;
      rays.style.opacity = hot ? "1" : ".55";
      rays.style.transform = hot ? "scale(1.5)" : "";
      arrow.style.transform = hot ? "scale(1.18)" : "";
    };
    const onLeave = () => { if (ref.current) ref.current.style.opacity = "0"; };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      root.classList.remove("am-cur");
    };
  }, [on]);
  if (!on) return null;
  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="cursor__rays"><Rays /><Rays /></div>
      <svg className="cursor__arrow" viewBox="0 0 34 34">
        <polygon points="2,2 16,8 11,11" fill="#8cc4f2" />
        <polygon points="2,2 11,11 7.5,16.5" fill="#4a9ee6" />
        <polygon points="16,8 30,14 15,17" fill="#2f7fc6" />
        <polygon points="16,8 15,17 11,11" fill="#5fb0ee" />
        <polygon points="11,11 15,17 7.5,16.5" fill="#1f5f9c" />
        <polygon points="7.5,16.5 15,17 13,31" fill="#2a72b5" />
        <path d="M2 2 30 14 15 17 13 31ZM2 2 11 11M16 8 11 11M16 8 15 17M11 11 15 17M11 11 7.5 16.5M7.5 16.5 15 17" fill="none" stroke="#d6ebfb" strokeWidth=".7" strokeLinejoin="round" strokeOpacity=".9" />
        <g fill="#fff">
          <circle cx="2" cy="2" r="1.3" /><circle cx="16" cy="8" r="1" /><circle cx="11" cy="11" r="1.1" /><circle cx="15" cy="17" r="1.1" /><circle cx="7.5" cy="16.5" r="1" /><circle cx="30" cy="14" r="1" /><circle cx="13" cy="31" r="1" />
        </g>
      </svg>
    </div>
  );
}
