"use client";

import { useEffect, useRef, useState } from "react";
import { CATS } from "@/data/site";
import { fontStack, prefersReduced } from "@/lib/motion";

// Chips + orbiting skills canvas (port of initSkills) + plain accessible list.
export default function Skills() {
  const [cat, setCat] = useState(0);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({ cat: 0, catT: 0 });

  const pick = (i: number) => { state.current.cat = i; state.current.catT = 0; setCat(i); };

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const g = cv.getContext("2d")!;
    const reduced = prefersReduced();
    const FD = fontStack("display"), FB = fontStack("body");
    let rot = 0, speed = 1, hover = false, drag: number | null = null, last = performance.now(), raf = 0, dead = false;
    const enter = () => { hover = true; };
    const leave = () => { hover = false; drag = null; cv.style.cursor = "grab"; };
    const down = (e: PointerEvent) => { drag = e.clientX; cv.style.cursor = "grabbing"; };
    const up = () => { drag = null; cv.style.cursor = "grab"; };
    const move = (e: PointerEvent) => { if (drag != null) { rot += (e.clientX - drag) * 0.006; drag = e.clientX; } };
    cv.addEventListener("pointerenter", enter); cv.addEventListener("pointerleave", leave);
    cv.addEventListener("pointerdown", down); window.addEventListener("pointerup", up); cv.addEventListener("pointermove", move);

    const loop = (now: number) => {
      if (dead) return;
      raf = requestAnimationFrame(loop);
      const r = cv.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight || !r.width) { last = now; return; }
      const dpr = Math.min(window.devicePixelRatio || 1, 2), W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      speed += ((hover || reduced ? 0.12 : 1) - speed) * 0.06; if (drag == null) rot += dt * 0.28 * speed;
      const st = state.current;
      st.catT = Math.min(1, st.catT + dt * 1.6); const k = 1 - Math.pow(1 - st.catT, 3);
      const c = CATS[st.cat], labels = c.short || c.skills, n = labels.length;
      const cx = W / 2, cy = H / 2, R = Math.min(W * 0.4, H * 0.82) * (0.6 + 0.4 * k), f = R * 3.4, small = r.width < 640;
      g.clearRect(0, 0, W, H);
      const rings = [{ r: 0.58, inc: 0.42, tz: 0.22, dir: 1 }, { r: 1, inc: 0.36, tz: -0.2, dir: -0.7 }];
      type Ring = (typeof rings)[number];
      const proj = (ring: Ring, a: number) => {
        const x = Math.cos(a) * ring.r * R, z = Math.sin(a) * ring.r * R, y1 = z * Math.sin(ring.inc), z1 = z * Math.cos(ring.inc), co = Math.cos(ring.tz), s = Math.sin(ring.tz), sc = f / (f - z1);
        return { x: cx + (x * co - y1 * s) * sc, y: cy + (x * s + y1 * co) * sc, z: z1, sc, t: "", ri: 0 };
      };
      rings.forEach((ring, ri) => {
        g.beginPath();
        for (let i = 0; i <= 96; i++) { const p = proj(ring, (i / 96) * Math.PI * 2); if (i) g.lineTo(p.x, p.y); else g.moveTo(p.x, p.y); }
        g.strokeStyle = ri ? "rgba(246,180,14,.28)" : "rgba(117,170,219,.3)"; g.lineWidth = dpr; g.stroke();
      });
      const nodes = labels.map((t, i) => {
        const ri = n <= 3 ? 1 : i % 2, ring = rings[ri], cnt = n <= 3 ? n : ri ? Math.floor(n / 2) : Math.ceil(n / 2), idx = n <= 3 ? i : Math.floor(i / 2);
        const p = proj(ring, rot * ring.dir + (idx / cnt) * Math.PI * 2 + ri * 0.6); p.t = t; p.ri = ri; return p;
      }).sort((a, b) => a.z - b.z);
      const core = () => {
        const cr = R * 0.24;
        let gr = g.createRadialGradient(cx, cy, 0, cx, cy, cr * 3.4); gr.addColorStop(0, "rgba(74,158,230,.42)"); gr.addColorStop(0.45, "rgba(47,127,208,.12)"); gr.addColorStop(1, "rgba(47,127,208,0)"); g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, cr * 3.4, 0, 7); g.fill();
        gr = g.createRadialGradient(cx - cr * 0.35, cy - cr * 0.4, cr * 0.1, cx, cy, cr); gr.addColorStop(0, "#bfe0fb"); gr.addColorStop(0.5, "#3f8fd6"); gr.addColorStop(1, "#123a66"); g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, cr, 0, 7); g.fill();
        g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle";
        const fs = Math.max(11, cr * 0.26); g.font = `700 ${fs}px ${FD}`;
        const words = c.name.split(" "), lines: string[] = []; let ln = "";
        words.forEach((w) => { if (g.measureText(ln + " " + w).width > cr * 1.65 && ln) { lines.push(ln); ln = w; } else ln = ln ? ln + " " + w : w; }); lines.push(ln);
        g.save(); g.shadowColor = "rgba(4,10,20,.9)"; g.shadowBlur = fs * 0.7; g.shadowOffsetY = fs * 0.08; g.lineJoin = "round"; g.lineWidth = fs * 0.08; g.strokeStyle = "rgba(6,16,27,.45)";
        lines.forEach((l, i) => { const y = cy + (i - (lines.length - 1) / 2) * fs * 1.15; g.strokeText(l, cx, y); g.fillText(l, cx, y); });
        g.restore();
      };
      let cored = false;
      nodes.forEach((p) => {
        if (!cored && p.z >= 0) { core(); cored = true; }
        const depth = (p.z / R + 1) / 2, a = (0.4 + 0.6 * depth) * k, fs = (small ? 11.5 : 14) * dpr * p.sc;
        g.font = `500 ${fs}px ${FB}`;
        const tw = g.measureText(p.t).width, pw = tw + fs * 2.3, ph = fs * 2.2, x0 = p.x - pw / 2, y0 = p.y - ph / 2;
        g.globalAlpha = a; g.beginPath(); g.roundRect(x0, y0, pw, ph, ph / 2); g.fillStyle = "rgba(15,22,33,.92)"; g.fill();
        g.strokeStyle = p.ri ? "rgba(249,200,70,.6)" : "rgba(140,196,242,.65)"; g.lineWidth = dpr; g.stroke();
        g.beginPath(); g.arc(x0 + fs * 0.95, p.y, fs * 0.26, 0, 7); g.fillStyle = p.ri ? "#f9c846" : "#9fd8ff"; g.fill();
        g.fillStyle = "#eef3f8"; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(p.t, x0 + fs * 1.55, p.y + fs * 0.04); g.globalAlpha = 1;
      });
      if (!cored) core();
    };
    const go = () => { if (!dead) raf = requestAnimationFrame(loop); };
    if (document.fonts?.ready) document.fonts.ready.then(go); else go();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      cv.removeEventListener("pointerenter", enter); cv.removeEventListener("pointerleave", leave);
      cv.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); cv.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <>
      <div data-reveal="1" className="chips skills__chips">
        {CATS.map((c, i) => (
          <button key={c.name} onClick={() => pick(i)} className={"chip chip--lg" + (i === cat ? " is-on" : "")} aria-pressed={i === cat}>
            {c.name}
          </button>
        ))}
      </div>
      <canvas ref={cvRef} className="skills__canvas" aria-hidden="true" />
      <ul className="skills__list" aria-label={CATS[cat].name + " skills"}>
        {CATS[cat].skills.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </>
  );
}
