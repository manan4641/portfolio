"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FEATURED, PROJECTS, pad2 } from "@/data/site";
import { pointer, prefersReduced } from "@/lib/motion";

/**
 * 03 — Featured Projects. Scroll-pinned section; scroll progress rotates a 3D ring of
 * browser-framed screenshots. Port of the projects part of initFx() in the design.
 */
export default function FeaturedProjects() {
  const router = useRouter();
  const [pi, setPi] = useState(0);
  const piRef = useRef(0);
  const sec = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const N = FEATURED.length;

  const goProj = (i: number) => {
    const s = sec.current;
    if (!s) return;
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY + i * window.innerHeight * 0.62, behavior: prefersReduced() ? "auto" : "smooth" });
  };
  const open = (i: number) => router.push(`/portfolio/${FEATURED[i].slug}`, { scroll: false });

  useEffect(() => {
    const reduced = prefersReduced();
    let raf = 0, pk = "", pR = 0, pa: number | null = null, mx = 0, my = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const s = sec.current, ring = track.current, st = stage.current;
      if (!s || !ring || !st) return;
      const cards = ring.querySelectorAll<HTMLElement>("article");
      const vw = window.innerWidth, vh = window.innerHeight;
      const stepPx = vh * 0.62, total = (N - 1) * stepPx, stepA = 360 / N;
      const txt = text.current?.parentElement, tr = txt ? txt.getBoundingClientRect() : null;
      const side = !!tr && st.getBoundingClientRect().left > tr.right - 12;
      const gp = Math.max(10, Math.min(28, vh * 0.024));
      const topH = (pin.current?.firstElementChild as HTMLElement | null)?.offsetHeight ?? 44;
      const avail = vh - 106 - topH - 2 * gp - (side || !tr ? 0 : tr.height + 6);
      const key = vw + "x" + vh + "x" + N + "x" + Math.round(avail / 24);
      if (pk !== key) {
        pk = key;
        const w = Math.round(Math.max(170, Math.min(vw < 900 ? vw * 0.66 : Math.min(vw * 0.42, 640), (avail - 56) / 0.74)));
        pR = Math.round(w / 2 / Math.tan(Math.PI / N) + 40);
        s.style.height = Math.round(vh + total) + "px";
        st.style.height = Math.round(w * 0.74 + 56) + "px";
        cards.forEach((a, i) => { a.style.width = w + "px"; a.style.transform = `translate(-50%,-50%) rotateY(${i * stepA}deg) translateZ(${pR}px)`; });
      }
      const top = s.getBoundingClientRect().top;
      if (top > vh || top < -(vh + total)) return;
      const p = Math.max(0, Math.min(1, -top / (total || 1))), target = p * (N - 1);
      pa = pa == null || reduced ? target : pa + (target - pa) * 0.12;
      mx += ((reduced ? 0 : pointer.x) - mx) * 0.06; my += ((reduced ? 0 : pointer.y) - my) * 0.06;
      ring.style.transform = `translateZ(${-pR}px) rotateX(${(-6 - my * 4).toFixed(2)}deg) rotateY(${(-pa * stepA + mx * 6).toFixed(2)}deg)`;
      cards.forEach((a, i) => {
        let d = Math.abs(i - pa!); d = Math.min(d, N - d);
        const o = d > 2.3 ? "0" : (1 - d * 0.36).toFixed(2);
        for (const c of Array.from(a.children)) (c as HTMLElement).style.opacity = o;
        a.style.pointerEvents = d > 1.6 ? "none" : "auto";
      });
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const idx = Math.round(target);
      if (idx !== piRef.current) {
        piRef.current = idx;
        setPi(idx);
        const tx = text.current;
        if (tx && !reduced) { tx.style.animation = "none"; void tx.offsetWidth; tx.style.animation = "amPage .55s cubic-bezier(.16,1,.3,1) both"; }
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [N]);

  const ap = FEATURED[Math.min(pi, N - 1)];

  return (
    <section id="projects" ref={sec} className="proj" aria-label="Featured projects">
      <div ref={pin} className="proj__pin">
        <div className="proj__row proj__top">
          <div className="eyebrow">03 — Featured Projects</div>
          <Link href="/portfolio" className="btn-pill">View all {PROJECTS.length} projects →</Link>
        </div>
        <div className="proj__row proj__main">
          <div className="proj__info">
            <div ref={text} className="proj__text" aria-live="polite">
              <div className="proj__count"><span className="proj__num">{pad2(pi + 1)}</span><span>/ {pad2(N)}</span></div>
              <h3 className="proj__name">{ap.name}</h3>
              <div className="proj__compact">{ap.catLine} · {ap.period}</div>
              <div className="proj__cat">{ap.cat}</div>
              <p className="proj__desc">{ap.desc}</p>
              <dl className="proj__spec">
                <div><dt>Client</dt><dd>{ap.loc}</dd></div>
                <div><dt>Timeline</dt><dd>{ap.period}</dd></div>
                <div><dt>Stack</dt><dd>{ap.stack}</dd></div>
              </dl>
            </div>
            <div className="proj__actions">
              <a href={ap.url} target="_blank" rel="noopener" className="btn-visit">Visit Live Website ↗</a>
              <Link href={`/portfolio/${ap.slug}`} scroll={false} className="btn-details">Details</Link>
              <div className="proj__arrows">
                <button onClick={() => goProj(Math.max(0, pi - 1))} aria-label="Previous project" className="btn-round">←</button>
                <button onClick={() => goProj(Math.min(N - 1, pi + 1))} aria-label="Next project" className="btn-round">→</button>
              </div>
            </div>
          </div>
          <div ref={stage} className="proj__stage">
            <div className="proj__glow" />
            <div ref={track} className="proj__track">
              {FEATURED.map((p, i) => (
                <article key={p.slug} className="pcard" onClick={() => (i === piRef.current ? open(i) : goProj(i))}>
                  <div className="pcard__frame">
                    <div className="pcard__bar"><i /><i /><i /><span>{p.host}</span></div>
                    <div className="shot">
                      <span>live preview · {p.host}</span>
                      <Image src={p.shot} alt={p.alt} width={1280} height={800} sizes="(max-width: 900px) 66vw, 640px" />
                    </div>
                    <div className="pcard__shine" />
                  </div>
                  <div className="pcard__base"><div className="pcard__keys" /><div className="pcard__pad" /></div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="proj__bar-track"><div ref={bar} className="proj__bar" /></div>
      </div>
    </section>
  );
}
