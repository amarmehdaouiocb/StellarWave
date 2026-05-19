import { brand } from "@/config/brand";

type BreadcrumbItem = {
  /** Libellé affiché dans le fil d'Ariane (ex: "Blog"). */
  name: string;
  /** Chemin relatif au domaine (ex: "/blog"). "" pour la page d'accueil. */
  path: string;
};

/**
 * Émet un JSON-LD `BreadcrumbList` (invisible) pour activer le fil d'Ariane
 * dans les résultats Google. À placer dans une page, en complément des
 * autres schémas (Article, etc.).
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${brand.siteUrl}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
