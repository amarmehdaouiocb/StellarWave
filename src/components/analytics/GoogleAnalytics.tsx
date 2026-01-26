"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Typage pour gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// Hook pour tracker les pageviews
function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Track pageview
    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);
}

// Composant interne qui utilise useSearchParams
function AnalyticsTracker() {
  usePageTracking();
  return null;
}

// Fonctions utilitaires pour le tracking d'événements
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  window.gtag?.("event", eventName, parameters);
};

// Événements prédéfinis
export const analytics = {
  // Formulaires
  formStart: (formName: string) =>
    trackEvent("form_start", { form_name: formName }),
  formSubmit: (formName: string, success: boolean) =>
    trackEvent("form_submit", { form_name: formName, success }),

  // CTA
  ctaClick: (ctaName: string, location: string) =>
    trackEvent("cta_click", { cta_name: ctaName, location }),

  // Navigation
  externalLinkClick: (url: string) =>
    trackEvent("external_link_click", { link_url: url }),

  // Engagement
  scrollDepth: (percentage: number) =>
    trackEvent("scroll_depth", { percent_scrolled: percentage }),
  timeOnPage: (seconds: number) =>
    trackEvent("time_on_page", { engagement_time_seconds: seconds }),

  // Conversions
  leadGenerated: (source: string, type: string) =>
    trackEvent("generate_lead", { lead_source: source, lead_type: type }),
};

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      {/* Tracker component wrapped in Suspense for searchParams */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}
