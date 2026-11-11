import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { FEATURES } from "@/lib/features";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/app/home.webp`, `${site.url}/app/kasir.webp`, `${site.url}/warung/toko-sembako.webp`],
    },
    ...FEATURES.map((f) => ({
      url: `${site.url}/${f.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: f.screens.map((s) => `${site.url}/app/${s}.webp`),
    })),
    {
      url: `${site.url}/privasi`,
      lastModified: new Date("2026-09-28"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
