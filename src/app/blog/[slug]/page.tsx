import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCover from "@/components/BlogCover";
import ReadingProgress from "@/components/ReadingProgress";
import Tilt from "@/components/Tilt";
import { SITE_URL } from "@/data/site";
import { POSTS, getPost } from "@/data/posts";
import { PERSON_ID, jsonLdString, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  const url = `/blog/${p.slug}`;
  return {
    ...pageMeta({ title: p.title + " | Abdul Manan", description: p.desc, path: url, article: { publishedTime: p.iso, section: p.cat } }),
    authors: [{ name: "Abdul Manan", url: SITE_URL }],
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const i = POSTS.findIndex((p) => p.slug === params.slug);
  if (i < 0) notFound();
  const cp = POSTS[i], prev = POSTS[i - 1], next = POSTS[i + 1];
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cp.title,
    description: cp.desc,
    datePublished: cp.iso,
    dateModified: cp.iso,
    articleSection: cp.cat,
    author: { "@type": "Person", "@id": PERSON_ID, name: "Abdul Manan", url: SITE_URL + "/" },
    publisher: { "@type": "Person", "@id": PERSON_ID, name: "Abdul Manan" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${cp.slug}` },
    url: `${SITE_URL}/blog/${cp.slug}`,
    inLanguage: "en",
  };

  return (
    <div className="am-page art-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      <div className="art-bar">
        <div className="art-bar__in">
          <Link href="/blog" className="btn-back">← All articles</Link>
          <Link href="/" className="btn-back">Home</Link>
        </div>
        <ReadingProgress />
      </div>
      <article className="art">
        <div className="art__meta"><span className="art__cat">{cp.cat}</span><span>{cp.date}</span><span>{cp.read}</span></div>
        <h1 className="art__h1">{cp.title}</h1>
        <p className="art__stand">{cp.desc}</p>
        <div className="art__author">
          <span className="avatar">AM</span>
          <div><b>Abdul Manan</b><span>Senior Web Developer</span></div>
        </div>
        <Tilt soft className="art__cover">
          <div><BlogCover index={i} cat={cp.cat} variant="hero" /></div>
        </Tilt>
        <div className="art__cols">
          <dl className="art__dl">
            <div><dt className="dl-label">Category</dt><dd className="dl-val">{cp.cat}</dd></div>
            <div><dt className="dl-label">Published</dt><dd className="dl-val"><time dateTime={cp.iso}>{cp.date}</time></dd></div>
            <div><dt className="dl-label">Reading time</dt><dd className="dl-val">{cp.read}</dd></div>
          </dl>
          <div className="prose" dangerouslySetInnerHTML={{ __html: cp.html }} />
        </div>
        <nav className="art__nav" aria-label="More articles">
          {prev && <Link href={`/blog/${prev.slug}`}><span className="k">← Previous</span><span className="t">{prev.title}</span></Link>}
          {next && <Link href={`/blog/${next.slug}`} className="is-next"><span className="k">Next →</span><span className="t">{next.title}</span></Link>}
        </nav>
      </article>
    </div>
  );
}
