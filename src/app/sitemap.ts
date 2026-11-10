import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/app-home.webp`, `${site.url}/mascot/happy.webp`],
    },
    {
      url: `${site.url}/privasi`,
      lastModified: new Date("2026-09-28"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
