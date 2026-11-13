import type { Metadata } from "next";
import Image from "next/image";
import { SubNav } from "@/components/Nav";
import Tilt from "@/components/Tilt";
import { TrackedLink } from "@/components/ContactForm";
import { products } from "@/data/products";
import { SITE_URL } from "@/data/site";
import { PERSON_ID, jsonLdString, pageMeta } from "@/lib/seo";

// No layout for this page exists in the design; it is composed from the design's own
// components (Services intro, award cards, primary button) so it matches the new site.
const TITLE = "Free WordPress Plugins & Tools";
const DESC = "Free WordPress tools by Abdul Manan, including a plugin that converts existing JPG and PNG images to WebP for faster page loads.";

export const metadata: Metadata = pageMeta({ title: TITLE + " | Abdul Manan", description: DESC, path: "/products" });

export default function ProductsPage() {
  const live = products.filter((p) => p.link);
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: live.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "SoftwareApplication", name: p.title, description: p.description.trim(), applicationCategory: "WordPress plugin", operatingSystem: "WordPress", url: `${SITE_URL}/products`, author: { "@id": PERSON_ID }, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    })),
  };
  return (
    <div className="am-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      <SubNav current="products" />
      <section className="si">
        <div className="si__glow" />
        <div className="si__in">
          <div className="eyebrow">Products</div>
          <h1 className="si__h1">Digital <span className="grad-text">Products</span></h1>
          <p className="si__lead">Premium tools, plugins, and resources to help you build better software, faster. Meticulously crafted with clean code and modern design.</p>
        </div>
      </section>
      <main className="sl" style={{ paddingBottom: "clamp(80px, 11vw, 150px)" }}>
        <div className="wrap prod-grid">
          {products.map((p, i) => (
            <Tilt key={p.id} className="tilt-1000">
              <div className={"prod" + (i % 2 ? " prod--gold" : "")}>
                {p.image && (
                  <div className="prod__img">
                    <Image src={p.image} alt={p.title} fill sizes="(max-width: 900px) 100vw, 600px" />
                  </div>
                )}
                <div className="prod__body">
                  <div className="prod__top"><span>{p.category}</span><span>{p.link ? "Free" : "Coming soon"}</span></div>
                  <h2>{p.title}</h2>
                  <p>{p.description.trim()}</p>
                  <div className="prod__cta">
                    {p.link ? (
                      <TrackedLink href={p.link} className="btn-primary" event="product_download_click" meta={{ id: p.id, title: p.title }}>
                        Download plugin <span>↓</span>
                      </TrackedLink>
                    ) : (
                      <span className="prod__soon">In development</span>
                    )}
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </main>
      <section className="sc" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <footer className="footer" style={{ marginTop: 0 }}>
            <span>© {new Date().getFullYear()} Abdul Manan. All rights reserved.</span>
            <span className="mono">Freelance Web Developer · Web Support Specialist</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
