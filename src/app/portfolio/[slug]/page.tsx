import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { PROJECTS, SITE_URL, getProject } from "@/data/site";
import { PERSON_ID, jsonLdString, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const wp = p.alt.includes("custom WordPress website");
  const title = `${p.name}: ${wp ? "WordPress Website" : "Website"} Project`;
  const url = `/portfolio/${p.slug}`;
  return pageMeta({ title: title + " | Abdul Manan", description: p.desc, path: url, image: { url: p.shot, width: 1280, height: 800, alt: p.alt } });
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.desc,
    url: `${SITE_URL}/portfolio/${p.slug}`,
    image: SITE_URL + p.shot,
    creator: { "@id": PERSON_ID, "@type": "Person", name: "Abdul Manan" },
    keywords: p.tags.join(", "),
    sameAs: p.url,
  };
  return (
    <div className="am-page pd-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      <ProjectDetail p={p} close={<Link href="/portfolio" className="pd__close" aria-label="Close">✕</Link>} />
    </div>
  );
}
