import Image from "next/image";
import type { Project } from "@/data/site";

// Project Detail panel (max-width 1080, radius 24). `close` is the ✕ control (button in the modal, link on the page).
export default function ProjectDetail({ p, close, headingLevel = 1 }: { p: Project; close: React.ReactNode; headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <article className="pd" onClick={undefined}>
      {close}
      <div className="shot shot--wide">
        <span>live preview · {p.host}</span>
        <Image src={p.shot} alt={p.alt} width={1280} height={800} sizes="(max-width: 1120px) 100vw, 1080px" priority />
      </div>
      <div className="pd__body">
        <div className="pd__main">
          <div className="pd__cat">{p.catLine}</div>
          <H className="pd__name">{p.name}</H>
          <p className="pd__desc">{p.desc}</p>
          <a href={p.url} target="_blank" rel="noopener" className="pd__visit">Visit Live Website ↗</a>
        </div>
        <dl className="pd__dl">
          <div><dt className="dl-label">Timeline</dt><dd className="dl-val">{p.period}</dd></div>
          <div><dt className="dl-label">Client location</dt><dd className="dl-val">{p.loc}</dd></div>
          <div><dt className="dl-label">Stack &amp; focus</dt><dd className="pd__tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</dd></div>
        </dl>
      </div>
    </article>
  );
}
