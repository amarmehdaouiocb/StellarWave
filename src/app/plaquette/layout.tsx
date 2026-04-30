import type { Metadata } from "next";
import "./print.css";

export const metadata: Metadata = {
  title: "Plaquette commerciale — Stellar Wave",
  description: "Plaquette PDF Stellar Wave, à usage interne et prospect.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PlaquetteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="plaquette-root">{children}</div>;
}
