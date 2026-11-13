import { EMAIL, SAME_AS, SITE_URL } from "@/data/site";

export const HOME_TITLE = "Freelance Web Developer | Abdul Manan";
export const HOME_DESC =
  "Freelance web developer and web support specialist. 7+ years building and maintaining WordPress, WooCommerce and Webflow sites for clients worldwide.";

export const SERVICES_TITLE = "Web Development & Website Support Services | Abdul Manan";
export const SERVICES_DESC =
  "Web development services from a freelance web developer: WordPress, WooCommerce, Webflow, speed optimization, technical SEO, maintenance and migrations.";

const U = SITE_URL + "/";
export const PERSON_ID = U + "#person";

// JSON-LD for Home, exactly as specified in the design (componentDidMount).
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Abdul Manan",
      url: U,
      jobTitle: "Freelance Web Developer",
      email: "mailto:" + EMAIL,
      address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
      knowsAbout: ["WordPress", "WooCommerce", "Webflow", "Custom WordPress theme development", "Core Web Vitals", "WordPress migration"],
      sameAs: SAME_AS,
    },
    {
      "@type": "ProfessionalService",
      "@id": U + "#service",
      name: "Abdul Manan — Freelance Web Developer",
      url: U,
      founder: { "@id": PERSON_ID },
      areaServed: ["GB", "AU", "AE", "PK"],
      serviceType: ["Custom WordPress development", "WooCommerce development", "Webflow development", "WordPress speed optimization", "WordPress migration"],
      sameAs: SAME_AS,
    },
  ],
};

export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Abdul Manan — Freelance Web Developer" };

type MetaInput = {
  title: string; // full title as it should appear in the browser tab
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  article?: { publishedTime: string; section: string };
};

// Page metadata with canonical, Open Graph and Twitter mirroring title/description,
// always summary_large_image with a share image.
export function pageMeta({ title, description, path, image = OG_IMAGE, article }: MetaInput) {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: article ? ("article" as const) : ("website" as const),
      url: path,
      siteName: "Abdul Manan",
      locale: "en_US",
      title,
      description,
      images: [image],
      ...(article ? { publishedTime: article.publishedTime, section: article.section, authors: ["Abdul Manan"] } : {}),
    },
    twitter: { card: "summary_large_image" as const, title, description, images: [image.url] },
  };
}
