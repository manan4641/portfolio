"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PROJECTS, PROJECT_FILTERS, pad2 } from "@/data/site";
import { tiltLeave, tiltMove } from "@/lib/motion";

export default function ProjectGrid() {
  const [filter, setFilter] = useState("All");
  const shown = PROJECTS.filter((p) => filter === "All" || p.cats.includes(filter));
  return (
    <>
      <h1 className="ov__h">All Projects </h1>
      <div className="chips ov__chips">
        {PROJECT_FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={"chip" + (f === filter ? " is-on" : "")} aria-pressed={f === filter}>{f}</button>
        ))}
      </div>
      <div className="grid-cards">
        {shown.map((p) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`} scroll={false} className="acard">
            <div style={{ perspective: 1000 }} onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
              <div className="acard__frame">
                <div className="shot">
                  <span>{p.host}</span>
                  <Image src={p.shot} alt={p.alt} width={1280} height={800} sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 400px" />
                </div>
              </div>
            </div>
            <div className="acard__meta">
              <div className="acard__row"><h2 className="acard__h">{p.name}</h2><span className="acard__period">{p.period}</span></div>
              <div className="acard__cat">{p.catLine}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
