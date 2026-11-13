"use client";

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS, pad2 } from "@/data/site";
import { prefersReduced, tiltLeave, tiltMove } from "@/lib/motion";

const LONGEST = Math.max(...TESTIMONIALS.map((t) => t[2].length));
const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);

export default function Testimonials() {
  const [ti, setTi] = useState(0);
  const hold = useRef(false);
  const picked = useRef(0);
  const n = TESTIMONIALS.length;
  const pick = (i: number) => { picked.current = Date.now(); setTi(((i % n) + n) % n); };

  // Auto-advance every 7s while in view; pause on hover, hidden tab, and 14s after a manual pick.
  useEffect(() => {
    const reduced = prefersReduced();
    const id = window.setInterval(() => {
      if (reduced || hold.current || document.hidden || Date.now() - picked.current < 14000) return;
      const el = document.getElementById("testimonials");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      setTi((s) => (s + 1) % n);
    }, 7000);
    return () => clearInterval(id);
  }, [n]);

  return (
    <>
      <div data-reveal="1" className="head-row tst__head">
        <h2 className="h2">In the words of people I&apos;ve worked with.</h2>
        <div className="tst__ctrl">
          <span className="tst__count"><b>{pad2(ti + 1)}</b> / {pad2(n)}</span>
          <div className="tst__btns">
            <button onClick={() => pick(ti - 1)} aria-label="Previous" className="tst__btn">←</button>
            <button onClick={() => pick(ti + 1)} aria-label="Next" className="tst__btn">→</button>
          </div>
        </div>
      </div>
      <div className="tst__body" onMouseEnter={() => { hold.current = true; }} onMouseLeave={() => { hold.current = false; }}>
        <div data-reveal="1" className="tst__stage">
          <div className="tilt-host" onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
            <div className="tst__stack">
              <div className="tst__ghost1" />
              <div className="tst__ghost2" />
              <div className="tst__card">
                <div className="tst__orb1" />
                <div className="tst__orb2" />
                <div className="tst__top">
                  <span className="tst__quote-mark" aria-hidden="true">“</span>
                  <span className="tst__badge"><i />LinkedIn recommendation</span>
                </div>
                <div className="tst__slides">
                  {TESTIMONIALS.map(([name, role, q], i) => (
                    <figure key={name} className={"tst__fig" + (i === ti ? " is-on" : "")} aria-hidden={i !== ti}>
                      <blockquote style={{ fontSize: `calc(clamp(16px,1.5vw,21px) * ${Math.min(2.1, Math.sqrt(LONGEST / q.length)).toFixed(3)})` }}>{q}</blockquote>
                      <figcaption>
                        <span className="avatar">{initials(name)}</span>
                        <span className="tst__who"><b>{name}</b><span>{role}</span></span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-reveal="1" className="tst__pickers">
          {TESTIMONIALS.map(([name, role], i) => (
            <button key={name} onClick={() => pick(i)} className={"tst__pick" + (i === ti ? " is-on" : "")} aria-pressed={i === ti}>
              <span className="tst__pick-av">{initials(name)}</span>
              <span className="tst__pick-txt"><b>{name}</b><span>{role}</span></span>
              <span className="tst__pick-num">{pad2(i + 1)}</span>
            </button>
          ))}
          <a href="/testimonial.mp4" target="_blank" rel="noopener" className="tst__video">
            <span className="tst__play">▶</span>
            <span className="tst__vtxt">
              <span className="k">Video testimonial</span>
              <span className="t">Watch Robby&apos;s message</span>
              <span className="s">Robby Choucair, Director of Marketing at One Click Digital</span>
            </span>
          </a>
          <a href="https://www.linkedin.com/in/abdulmanan-dev/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noopener" className="tst__li">
            View recommendations on LinkedIn ↗
          </a>
        </div>
      </div>
    </>
  );
}
