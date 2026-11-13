"use client";

// Shared pointer position in normalised device coords (-1..1), updated by HomeFx.
export const pointer = { x: 0, y: 0 };

export const prefersReduced = () =>
  typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// next/font renames families; canvas drawing needs the real (hashed) family name.
export function fontStack(kind: "display" | "body" | "mono") {
  if (typeof document === "undefined") return "sans-serif";
  const v = { display: "--font-bricolage", body: "--font-geist-sans", mono: "--font-geist-mono" }[kind];
  const fam = getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const fb = { display: '"Bricolage Grotesque", system-ui, sans-serif', body: "Geist, system-ui, sans-serif", mono: '"Geist Mono", ui-monospace, monospace' }[kind];
  return fam ? `${fam}, ${fb}` : fb;
}

// Smooth-scroll to a section id the way the prototype's go() does (40px offset).
export function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY - 40;
  window.scrollTo({ top, behavior: prefersReduced() ? "auto" : "smooth" });
}

// 3D tilt used by cards marked "tilt" in the design.
export function tiltMove(e: React.MouseEvent<HTMLElement>, deg = 9, z = true) {
  if (prefersReduced()) return;
  const host = e.currentTarget;
  const el = host.firstElementChild as HTMLElement | null;
  if (!el) return;
  const r = host.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `rotateY(${(x * deg).toFixed(2)}deg) rotateX(${(-y * deg).toFixed(2)}deg)${z ? " translateZ(10px)" : ""}`;
}
export function tiltLeave(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget.firstElementChild as HTMLElement | null;
  if (el) el.style.transform = "";
}
export const tiltSoft = (e: React.MouseEvent<HTMLElement>) => tiltMove(e, 5, false);

// Time the hero intro started (performance.now()); read by the 3D scene for its fly-in.
export const intro = { t: 0 };
