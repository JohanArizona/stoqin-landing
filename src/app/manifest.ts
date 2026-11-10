import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stoqin — Kasir, Stok & Kulakan Warung",
    short_name: "Stoqin",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00680C",
    lang: "id",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    related_applications: [
      { platform: "play", url: `https://play.google.com/store/apps/details?id=${site.androidPackage}`, id: site.androidPackage },
    ],
  };
}
