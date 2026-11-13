import type { Metadata } from "next";
import Link from "next/link";
import { SubNav } from "@/components/Nav";
import SmoothHtml from "@/components/SmoothHtml";
import { EMAIL, SITE_URL } from "@/data/site";
import { SERVICE_SECTIONS } from "@/data/services";
import { PERSON_ID, SERVICES_DESC, SERVICES_TITLE, jsonLdString, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: SERVICES_TITLE, description: SERVICES_DESC, path: "/services" });

const SHOW_JUMP_LINKS = true;

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web development and website support services",
  itemListElement: SERVICE_SECTIONS.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "Service", name: s.h2, description: s.p, url: `${SITE_URL}/services#${s.id}`, provider: { "@id": PERSON_ID }, areaServed: ["GB", "AU", "AE", "PK"] },
  })),
};

export default function ServicesPage() {
  return (
    <div className="am-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(itemList) }} />
      <SmoothHtml />
      <SubNav current="services" />

      <section className="si">
        <div className="si__glow" />
        <div className="si__in">
          <div className="eyebrow">Services</div>
          <h1 className="si__h1">Web development and <span className="grad-text">website support</span> services.</h1>
          <p className="si__lead">I&apos;m Abdul Manan, a freelance web developer and web support specialist with 7+ years of experience. I build, optimize and maintain websites on WordPress, WooCommerce, Webflow and other platforms for clients in the UK, Australia, UAE and Pakistan.</p>
          {SHOW_JUMP_LINKS && (
            <nav aria-label="Services on this page" className="si__jump">
              {SERVICE_SECTIONS.map((s) => <a key={s.id} href={"#" + s.id}>{s.jump}</a>)}
            </nav>
          )}
        </div>
      </section>

      <main className="sl">
        <div className="wrap">
          {SERVICE_SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className="sl__sec">
              <div>
                <div className="sl__num">{String(i + 1).padStart(2, "0")}</div>
                <h2 className="sl__h2">{s.h2}</h2>
              </div>
              <div>
                <p className="sl__p">{s.p}</p>
                <ul className="sl__ul">{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            </section>
          ))}
        </div>
      </main>

      <section className="sc">
        <div className="wrap">
          <h2 className="h2">Need a freelance web developer?</h2>
          <p className="sc__p">Tell me what you need built, fixed or looked after. I&apos;m available for contract work, consultancy and on-site positions.</p>
          <div className="sc__btns">
            <Link href="/#contact" className="btn-primary">Let&apos;s Talk <span>→</span></Link>
            <a href={`mailto:${EMAIL}`} className="btn-ghost">{EMAIL}</a>
          </div>
          <footer className="footer">
            <span>© {new Date().getFullYear()} Abdul Manan. All rights reserved.</span>
            <span className="mono">Freelance Web Developer · Web Support Specialist</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
