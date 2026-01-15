import { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = brand.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/merci`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    // Add more pages as they are created
    // {
    //   url: `${baseUrl}/mentions-legales`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.2,
    // },
    // {
    //   url: `${baseUrl}/confidentialite`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.2,
    // },
  ];
}
