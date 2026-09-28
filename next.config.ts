import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [{ source: "/privasi.html", destination: "/privasi", permanent: true }];
  },
};

export default nextConfig;
