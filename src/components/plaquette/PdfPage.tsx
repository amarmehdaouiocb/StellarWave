import type { ReactNode } from "react";

type PdfPageProps = {
  children: ReactNode;
  className?: string;
  noise?: boolean;
  dotGrid?: boolean;
};

export function PdfPage({
  children,
  className = "",
  noise = true,
  dotGrid = false,
}: PdfPageProps) {
  const decorClasses = [
    noise ? "pdf-noise" : "",
    dotGrid ? "pdf-dot-grid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={`pdf-page ${decorClasses} ${className}`.trim()}
      style={{ background: "#020617", color: "#ffffff" }}
    >
      {children}
    </section>
  );
}
