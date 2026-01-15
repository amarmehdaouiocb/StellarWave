import { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/merci", "/api/"],
      },
    ],
    sitemap: `${brand.siteUrl}/sitemap.xml`,
  };
}
