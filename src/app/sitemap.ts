import type { MetadataRoute } from "next";
import { PROJECTS, SITE_URL } from "@/data/site";
import { POSTS } from "@/data/posts";

// Every indexable URL. /about, /awards and /contact now 301 to Home sections (next.config.mjs),
// so they are intentionally not listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, changeFrequency: "weekly" | "monthly" | "yearly", priority: number) => ({
    url: SITE_URL + path,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", "weekly", 1),
    page("/services", "monthly", 0.9),
    page("/portfolio", "weekly", 0.8),
    page("/blog", "weekly", 0.9),
    page("/products", "monthly", 0.7),
    ...PROJECTS.map((p) => page(`/portfolio/${p.slug}`, "yearly", 0.6)),
    ...POSTS.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.iso), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
