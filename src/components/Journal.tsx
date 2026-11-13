"use client";

import Link from "next/link";
import { useState } from "react";
import { BLOG_CATS } from "@/data/site";
import { POSTS } from "@/data/posts";

// 08 — Journal: category chips, one featured article, list of the rest.
export default function Journal() {
  const [cat, setCat] = useState("All");
  const posts = POSTS.filter((p) => cat === "All" || p.cat === cat);
  const lead = posts[0];
  return (
    <>
      <div data-reveal="1" className="chips jr__chips">
        {BLOG_CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={"chip" + (c === cat ? " is-on" : "")} aria-pressed={c === cat}>{c}</button>
        ))}
      </div>
      <div className="jr__cols">
        {lead && (
          <Link href={`/blog/${lead.slug}`} className="jr__lead">
            <span className="jr__lead-meta">FEATURED · {lead.cat} · {lead.date} · {lead.read}</span>
            <h3>{lead.title}</h3>
            <p>{lead.desc}</p>
            <span className="jr__lead-cta">Read article →</span>
          </Link>
        )}
        <div className="jr__list">
          {posts.slice(1).map((b) => (
            <Link key={b.slug} href={`/blog/${b.slug}`} className="jr__item">
              <span className="jr__item-meta">{b.cat} · {b.date} · {b.read}</span>
              <span className="jr__item-t">{b.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
