import type { Metadata } from "next";
import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid";
import { PROJECTS, SITE_URL } from "@/data/site";
import { jsonLdString, pageMeta } from "@/lib/seo";

const TITLE = "Portfolio: WordPress, WooCommerce & Webflow Websites";
const DESC = `${PROJECTS.length} websites built and maintained by freelance web developer Abdul Manan for clients in the UK, Australia, the UAE, Europe and Pakistan: WordPress, WooCommerce, Webflow and corporate sites.`;

export const metadata: Metadata = pageMeta({ title: TITLE + " | Abdul Manan", description: DESC, path: "/portfolio" });

const ld = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "All Projects",
  url: `${SITE_URL}/portfolio`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PROJECTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/portfolio/${p.slug}`, name: p.name })),
  },
};

export default function PortfolioPage() {
  return (
    <div className="am-page ov">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      <div className="ov__in">
        <div className="ov__top">
          <span className="eyebrow">Portfolio · 2019 — Present</span>
          <Link href="/#projects" className="btn-back">← Back to home</Link>
        </div>
        <ProjectGrid />
      </div>
    </div>
  );
}
