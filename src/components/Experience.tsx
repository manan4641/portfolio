"use client";

import { useState } from "react";
import { ROLES } from "@/data/site";

export default function Experience() {
  const [ri, setRi] = useState(0);
  const role = ROLES[ri];
  return (
    <div data-reveal="1" className="exp__cols">
      <div className="exp__list" role="tablist" aria-label="Roles">
        <span className="exp__rail" />
        {ROLES.map((r, i) => (
          <button key={r.company} role="tab" aria-selected={i === ri} onClick={() => setRi(i)} className={"exp__role" + (i === ri ? " is-on" : "")}>
            <span className="exp__dot" />
            <span className="exp__period">{r.period}</span>
            <span className="exp__company">{r.company}</span>
            <span className="exp__title">{r.title}</span>
          </button>
        ))}
      </div>
      <div className="exp__card" role="tabpanel">
        <div className="exp__meta">{role.period} · {role.place}</div>
        <h3 className="exp__h3">{role.title}</h3>
        <div className="exp__org">{role.company}</div>
        <ul className="exp__points">
          {role.points.map((pt) => <li key={pt}><span>{pt}</span></li>)}
        </ul>
        <div className="exp__tech">
          {role.tech.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}
