import type { Metadata } from "next";
import "./print.css";

export const metadata: Metadata = {
  title: "Plaquette commerciale — StellarWave",
  description: "Plaquette PDF StellarWave, à usage interne et prospect.",
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
