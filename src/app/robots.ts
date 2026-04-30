import { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/merci", "/api/", "/plaquette", "/plaquette/express"],
      },
    ],
    sitemap: `${brand.siteUrl}/sitemap.xml`,
  };
}
