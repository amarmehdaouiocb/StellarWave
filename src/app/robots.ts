import { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/merci", // thank-you page, aucun intérêt SEO (absente du sitemap)
          "/plaquette", // decks privés (lien envoyé sur demande)
          "/admin", // back-office, non public
          "/cv-ats", // version CV pour robots ATS, pas pour le SEO
          "/v2", // variantes/redesigns de la home → duplicate content
          "/v3",
          "/v4",
        ],
      },
    ],
    sitemap: `${brand.siteUrl}/sitemap.xml`,
  };
}
