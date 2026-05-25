import type { Metadata } from "next";
import "./v3.css";

export const metadata: Metadata = {
  title: "Stellar Wave V3 | Éditeur de logiciels",
  description: "Éditeur de logiciels pour PME et scale-up. Sites, applications web & mobile, outils internes et automatisations. Du brief au monitoring.",
};

export default function V3Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[var(--v3-background)] text-[var(--v3-foreground)] min-h-screen selection:bg-[var(--v3-ember-amber)] selection:text-black">
      {children}
    </div>
  );
}
