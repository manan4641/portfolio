import type { Metadata } from "next";
import Link from "next/link";
import BlogIndex from "@/components/BlogIndex";
import { SITE_URL } from "@/data/site";
import { POSTS } from "@/data/posts";
import { PERSON_ID, jsonLdString, pageMeta } from "@/lib/seo";

const TITLE = "Journal: WordPress, Performance & Technical SEO Articles";
const DESC = "Notes on development, performance and the web: WordPress migrations, Core Web Vitals, GoHighLevel integrations, technical SEO and website security, by freelance web developer Abdul Manan.";

export const metadata: Metadata = pageMeta({ title: TITLE + " | Abdul Manan", description: DESC, path: "/blog" });

const ld = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Abdul Manan — Journal",
  url: `${SITE_URL}/blog`,
  author: { "@id": PERSON_ID },
  blogPost: POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.iso })),
};

export default function BlogPage() {
  return (
    <div className="am-page ov ov--blog">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      <div className="ov__in">
        <div className="ov__top">
          <span className="eyebrow">Journal · 2024 — 2025</span>
          <Link href="/#blog" className="btn-back">← Back to home</Link>
        </div>
        <BlogIndex />
      </div>
    </div>
  );
}
