import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer utilise des modules Node natifs (fs, stream, etc.)
  // qu'il ne faut pas bundler côté serveur.
  serverExternalPackages: ["@react-pdf/renderer"],
  // Tree-shaking automatique des barrel imports : bundle Phosphor passe de
  // ~300 KB à ~30 KB sans changer une ligne dans les composants.
  experimental: {
    optimizePackageImports: [
      "@phosphor-icons/react",
      "lucide-react",
    ],
  },
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
