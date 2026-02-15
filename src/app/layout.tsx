import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Simplisite | Votre site web professionnel en 24h",
  description:
    "Obtenez un site web professionnel pour votre commerce local. Preview gratuite, mise en ligne en 24h. Rejoignez les milliers de commerçants qui ont déjà fait confiance à Simplisite.",
  keywords: [
    "site web commerce local",
    "création site internet",
    "site professionnel",
    "commerce local",
    "restaurant site web",
    "salon coiffure site",
  ],
  openGraph: {
    title: "Simplisite | Votre site web professionnel en 24h",
    description:
      "Obtenez un site web professionnel pour votre commerce local. Preview gratuite.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${bricolage.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="gradient-mesh" />
          <div className="noise-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
