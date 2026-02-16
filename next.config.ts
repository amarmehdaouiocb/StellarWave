import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/facilsite",
        destination: "https://localsite-generator.vercel.app/facilsite",
      },
      {
        source: "/facilsite/:path*",
        destination: "https://localsite-generator.vercel.app/facilsite/:path*",
      },
    ];
  },
};

export default nextConfig;
