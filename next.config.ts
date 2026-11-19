import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Digital Asset Links (App Links + berbagi kredensial Google untuk com.stoqin.app):
  // harus dilayani langsung sebagai JSON, tanpa redirect, di stoqin.id dan www.stoqin.id.
  async headers() {
    return [
      {
        source: "/.well-known/assetlinks.json",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // stoqin.id → www.stoqin.id, KECUALI /.well-known/ (assetlinks.json wajib dilayani tanpa redirect
      // supaya Android App Links & berbagi kredensial terverifikasi di kedua domain).
      {
        source: "/:path((?!\.well-known/).*)",
        has: [{ type: "host", value: "stoqin.id" }],
        destination: "https://www.stoqin.id/:path",
        permanent: true,
      },
      { source: "/privasi.html", destination: "/privasi", permanent: true },
      // URL halaman fitur lama → URL berkata kunci (301, aman untuk SEO).
      { source: "/kasir", destination: "/aplikasi-kasir-warung", permanent: true },
      { source: "/stok", destination: "/aplikasi-stok-barang", permanent: true },
      { source: "/buku-hutang", destination: "/aplikasi-buku-hutang", permanent: true },
      { source: "/kulakan", destination: "/aplikasi-kulakan-grosir", permanent: true },
      { source: "/laporan", destination: "/laporan-penjualan-warung", permanent: true },
    ];
  },
};

export default nextConfig;
