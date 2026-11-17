import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
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
