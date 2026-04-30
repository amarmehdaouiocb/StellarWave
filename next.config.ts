import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer utilise des modules Node natifs (fs, stream, etc.)
  // qu'il ne faut pas bundler côté serveur.
  serverExternalPackages: ["@react-pdf/renderer"],
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
