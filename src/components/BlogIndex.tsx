"use client";

import Link from "next/link";
import { useState } from "react";
import { BLOG_CATS, pad2 } from "@/data/site";
import { POSTS } from "@/data/posts";
import { tiltLeave, tiltMove, tiltSoft } from "@/lib/motion";
import BlogCover from "./BlogCover";

// All Articles: filter chips, a large LATEST card and a grid of the rest.
export default function BlogIndex() {
  const [cat, setCat] = useState("All");
  const all = POSTS.map((p, i) => ({ ...p, i }));
  const posts = all.filter((p) => cat === "All" || p.cat === cat);
  const lead = posts[0];
  return (
    <>
      <h1 className="ov__h">All Articles <span>{pad2(posts.length)}</span></h1>
      <div className="chips ov__chips">
        {BLOG_CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={"chip" + (c === cat ? " is-on" : "")} aria-pressed={c === cat}>{c}</button>
        ))}
      </div>
      {lead && (
        <Link href={`/blog/${lead.slug}`} className="blead" onMouseMove={tiltSoft} onMouseLeave={tiltLeave}>
          <div className="blead__in">
            <BlogCover index={lead.i} cat={lead.cat} variant="lead" />
            <div className="blead__txt">
              <span className="blead__meta">LATEST · {lead.date} · {lead.read}</span>
              <h2 className="blead__h">{lead.title}</h2>
              <p>{lead.desc}</p>
              <span className="blead__cta">Read article →</span>
            </div>
          </div>
        </Link>
      )}
      <div className="bgrid">
        {posts.slice(1).map((b) => (
          <Link key={b.slug} href={`/blog/${b.slug}`} className="bcard" onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
            <div className="bcard__in">
              <BlogCover index={b.i} cat={b.cat} variant="card" />
              <div className="bcard__txt">
                <span className="bcard__meta">{b.date} · {b.read}</span>
                <h2 className="bcard__h">{b.title}</h2>
                <p>{b.desc}</p>
                <span className="bcard__cta">Read article →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
