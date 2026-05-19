import { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = brand.siteUrl;
  const now = new Date();

  // Pages statiques publiques (indexables). /merci, /plaquette/*, /admin/*,
  // /v2-/v4 et /cv-ats sont volontairement absents : voir robots.ts.
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/audit-gratuit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cv-fr`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cv-en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    // Pages légales : à activer une fois /mentions-legales et /confidentialite créées.
    // { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    // { url: `${baseUrl}/confidentialite`,  lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Articles de blog dynamiques.
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
