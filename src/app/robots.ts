import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// Same rules as the previous public/robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
