/**
 * Audit SEO complémentaire à PSI.
 * Fetch HTML brut + regex pour extraire :
 * - title, meta description (longueur optimale)
 * - canonical
 * - Open Graph tags
 * - structured data (JSON-LD count + types)
 * - HTTPS, HSTS, X-Content-Type-Options
 * - robots.txt et sitemap.xml présents
 *
 * Pas de cheerio : regex suffit pour ces signaux courants et reste léger.
 */
import type { SeoData } from "@/lib/supabase";

const FETCH_TIMEOUT_MS = 10_000;

const fetchWithTimeout = (url: string, init?: RequestInit) =>
  fetch(url, {
    ...init,
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    redirect: "follow",
    headers: {
      "User-Agent": "StellarWaveAuditBot/1.0 (+https://stellarwave.fr)",
      Accept: "text/html,application/xhtml+xml,*/*;q=0.8",
      ...init?.headers,
    },
  });

export async function runSeoChecks(targetUrl: string): Promise<SeoData> {
  const u = new URL(targetUrl);
  const origin = `${u.protocol}//${u.host}`;

  const [pageRes, robotsRes, sitemapRes] = await Promise.allSettled([
    fetchWithTimeout(targetUrl),
    fetchWithTimeout(`${origin}/robots.txt`),
    fetchWithTimeout(`${origin}/sitemap.xml`),
  ]);

  const pageOk = pageRes.status === "fulfilled";
  const html = pageOk ? await pageRes.value.text().catch(() => "") : "";
  const headers = pageOk ? pageRes.value.headers : new Headers();
  const finalUrl = pageOk ? pageRes.value.url : targetUrl;
  const httpStatus = pageOk ? pageRes.value.status : 0;

  // Regex helpers
  const metaContent = (name: string): string | null => {
    const m = html.match(
      new RegExp(
        `<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']+)["']`,
        "i",
      ),
    );
    return m?.[1]?.trim() ?? null;
  };

  const ogContent = (prop: string): string | null => {
    const m = html.match(
      new RegExp(
        `<meta[^>]+property=["']og:${prop}["'][^>]*content=["']([^"']+)["']`,
        "i",
      ),
    );
    return m?.[1]?.trim() ?? null;
  };

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch?.[1]?.trim() ?? null;

  const canonicalMatch = html.match(
    /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
  );
  const canonical = canonicalMatch?.[1]?.trim() ?? null;

  const description = metaContent("description");

  // JSON-LD : compter et extraire les @type
  const jsonLdMatches = [
    ...html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  const jsonLdData = jsonLdMatches
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    })
    .filter((d): d is Record<string, unknown> => d !== null);

  const jsonLdTypes = jsonLdData
    .flatMap((d) => {
      const type = d["@type"];
      if (Array.isArray(type)) return type as string[];
      if (typeof type === "string") return [type];
      return [];
    })
    .filter(Boolean);

  return {
    https: u.protocol === "https:",
    redirected: finalUrl !== targetUrl,
    finalUrl,
    httpStatus,
    title: {
      value: title,
      length: title?.length ?? 0,
      optimal: !!title && title.length >= 30 && title.length <= 60,
    },
    description: {
      value: description,
      length: description?.length ?? 0,
      optimal:
        !!description && description.length >= 120 && description.length <= 160,
    },
    canonical: {
      value: canonical,
      present: !!canonical,
    },
    openGraph: {
      title: ogContent("title"),
      description: ogContent("description"),
      image: ogContent("image"),
      type: ogContent("type"),
      complete:
        !!(ogContent("title") && ogContent("description") && ogContent("image")),
    },
    structuredData: {
      count: jsonLdData.length,
      types: [...new Set(jsonLdTypes)],
    },
    robotsTxt: {
      present: robotsRes.status === "fulfilled" && robotsRes.value.ok,
    },
    sitemap: {
      present: sitemapRes.status === "fulfilled" && sitemapRes.value.ok,
    },
    securityHeaders: {
      hsts: headers.get("strict-transport-security") !== null,
      xContentType:
        headers.get("x-content-type-options")?.toLowerCase() === "nosniff",
    },
  };
}
