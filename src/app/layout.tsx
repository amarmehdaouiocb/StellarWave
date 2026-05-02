import type { Metadata, Viewport } from "next";
import "./globals.css";
import { brand, seoKeywords } from "@/config/brand";
import { outfit, raleway, getFontVariables } from "@/lib/fonts";
import { GoogleAnalytics } from "@/components/analytics";
import { SmoothScroll } from "@/components/shared/SmoothScroll";

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    // Title court (47 chars) pour affichage complet dans les SERPs Google
    // (limite ~60 chars avant troncature).
    default: `${brand.name} — Studio Product & Cloud · Paris`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  keywords: [...seoKeywords],
  authors: [{ name: brand.name, url: brand.siteUrl }],
  creator: brand.name,
  publisher: brand.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: brand.siteUrl,
    siteName: brand.name,
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${brand.name} - ${brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.description,
    images: ["/opengraph-image"],
    creator: "@stellarwave",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: brand.siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#020617" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD Structured Data
function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: brand.siteUrl,
    logo: `${brand.siteUrl}/logo.svg`,
    description: brand.description,
    email: brand.contactEmail,
    telephone: brand.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    sameAs: [
      brand.socials.linkedin,
      brand.socials.twitter,
      brand.socials.github,
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.siteUrl,
    description: brand.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${brand.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const webDevServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Développement d'applications",
    description:
      "Développement d'applications web et mobiles sur mesure. Landing pages premium, sites web, applications SaaS, apps iOS et Android.",
    provider: {
      "@type": "Organization",
      name: brand.name,
    },
    areaServed: "FR",
    serviceType: "Web Development",
  };

  const cloudServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Architecture cloud",
    description:
      "Audit, optimisation et construction d'infrastructures cloud. AWS, GCP, Azure. FinOps, sécurité, performance.",
    provider: {
      "@type": "Organization",
      name: brand.name,
    },
    areaServed: "FR",
    serviceType: "Cloud Services",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webDevServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cloudServiceSchema) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <JsonLd />
        {/* Fallback: force animations-ready after 2s for headless/screenshot environments */}
        <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(function(){document.body.classList.add('animations-ready')},2000)`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${getFontVariables()} ${outfit.variable} ${raleway.variable} font-sans antialiased`}
        style={{ backgroundColor: "#020617", color: "#cbd5e1" }}
      >
        <GoogleAnalytics />
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg"
          style={{ background: "#38bdf8", color: "#000000" }}
        >
          Aller au contenu principal
        </a>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
