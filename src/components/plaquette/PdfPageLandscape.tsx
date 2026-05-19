import type { ReactNode } from "react";

type PdfPageLandscapeProps = {
  children: ReactNode;
  className?: string;
  noise?: boolean;
  dotGrid?: boolean;
};

/**
 * Variante landscape (297×210mm) du composant PdfPage.
 * Réutilise les overlays noise/dot-grid (classes définies dans print.css).
 */
export function PdfPageLandscape({
  children,
  className = "",
  noise = true,
  dotGrid = false,
}: PdfPageLandscapeProps) {
  const decorClasses = [
    noise ? "pdf-noise" : "",
    dotGrid ? "pdf-dot-grid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={`pdf-page-landscape ${decorClasses} ${className}`.trim()}
      style={{ background: "#020617", color: "#ffffff" }}
    >
      {children}
    </section>
  );
}
