import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

// Font yang sama dengan aplikasi Android (Plus Jakarta Sans).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · Stoqin",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "aplikasi kasir warung",
    "aplikasi kasir gratis",
    "aplikasi kasir offline",
    "aplikasi stok barang",
    "aplikasi warung kelontong",
    "aplikasi kulakan",
    "kulakan online",
    "belanja grosir online",
    "buku hutang digital",
    "aplikasi pencatatan hutang",
    "POS Android",
    "kasir QRIS",
    "aplikasi toko sembako",
    "aplikasi UMKM",
    "Stoqin",
  ],
  authors: [{ name: "Tim Stoqin", url: site.url }],
  creator: "Stoqin",
  publisher: site.company,
  category: "business",
  alternates: {
    canonical: "/",
    languages: { "id-ID": "/" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appLinks: {
    android: { package: site.androidPackage, app_name: site.name },
  },
  formatDetection: { telephone: false, address: false, email: false },
  // Isi env GOOGLE_SITE_VERIFICATION dengan kode dari Google Search Console (metode "Tag HTML").
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "google-play-app": `app-id=${site.androidPackage}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="min-h-dvh overflow-x-clip bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
