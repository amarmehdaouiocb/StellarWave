/**
 * Google PageSpeed Insights API v5 wrapper.
 * - Fetch mobile + desktop en parallèle
 * - Parse scores, Core Web Vitals, opportunities, audits SEO
 * - Quota gratuit : 25 000 req/jour avec API key, beaucoup moins sans
 *
 * Doc : https://developers.google.com/speed/docs/insights/v5/get-started
 */
import type {
  PsiCategoryScores,
  PsiCoreWebVitals,
  PsiOpportunity,
  PsiResult,
  PsiStrategy,
} from "@/lib/supabase";

const PSI_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

const PSI_TIMEOUT_MS = 70_000;

type LighthouseAudit = {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode?: string;
  numericValue?: number;
  details?: { type?: string };
};

type LighthouseResult = {
  categories: {
    performance: { score: number };
    seo: { score: number };
    accessibility: { score: number };
    "best-practices": { score: number };
  };
  audits: Record<string, LighthouseAudit>;
};

type PsiResponse = {
  lighthouseResult: LighthouseResult;
};

/**
 * Lance un audit PSI sur une URL pour une stratégie donnée (mobile/desktop).
 * Throw en cas d'erreur réseau, timeout, quota dépassé, etc.
 */
export async function runPSI(
  url: string,
  strategy: PsiStrategy,
): Promise<PsiResult> {
  const params = new URLSearchParams({ url, strategy });
  for (const cat of [
    "performance",
    "seo",
    "accessibility",
    "best-practices",
  ]) {
    params.append("category", cat);
  }

  const apiKey = process.env.GOOGLE_PSI_API_KEY;
  if (apiKey) params.set("key", apiKey);

  const response = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
    signal: AbortSignal.timeout(PSI_TIMEOUT_MS),
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `PSI ${strategy} failed (${response.status}): ${text.slice(0, 200)}`,
    );
  }

  const json = (await response.json()) as PsiResponse;
  const lh = json.lighthouseResult;

  const scores: PsiCategoryScores = {
    performance: Math.round((lh.categories.performance.score ?? 0) * 100),
    seo: Math.round((lh.categories.seo.score ?? 0) * 100),
    accessibility: Math.round((lh.categories.accessibility.score ?? 0) * 100),
    bestPractices: Math.round(
      (lh.categories["best-practices"].score ?? 0) * 100,
    ),
  };

  const metrics: PsiCoreWebVitals = {
    lcp: Math.round(lh.audits["largest-contentful-paint"]?.numericValue ?? 0),
    fcp: Math.round(lh.audits["first-contentful-paint"]?.numericValue ?? 0),
    cls: Number((lh.audits["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(3)),
    tbt: Math.round(lh.audits["total-blocking-time"]?.numericValue ?? 0),
    si: Math.round(lh.audits["speed-index"]?.numericValue ?? 0),
  };

  const opportunities: PsiOpportunity[] = Object.values(lh.audits)
    .filter(
      (a) =>
        a.details?.type === "opportunity" &&
        typeof a.numericValue === "number" &&
        a.numericValue > 100,
    )
    .map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      savingsMs: Math.round(a.numericValue ?? 0),
    }))
    .sort((a, b) => b.savingsMs - a.savingsMs)
    .slice(0, 8);

  const failedAudits = Object.values(lh.audits)
    .filter(
      (a) =>
        a.score !== null &&
        a.score < 0.9 &&
        a.scoreDisplayMode === "binary",
    )
    .map((a) => ({ id: a.id, title: a.title }));

  return {
    strategy,
    scores,
    metrics,
    opportunities,
    failedAudits,
  };
}

/**
 * Lance les deux stratégies (mobile + desktop) en parallèle.
 * Tolère un échec partiel : si une stratégie échoue mais pas l'autre,
 * retourne ce qu'on a avec un flag _partial.
 */
export async function runPSIBoth(url: string): Promise<{
  mobile: PsiResult | null;
  desktop: PsiResult | null;
  _partial: boolean;
}> {
  const [mobileResult, desktopResult] = await Promise.allSettled([
    runPSI(url, "mobile"),
    runPSI(url, "desktop"),
  ]);

  const mobile =
    mobileResult.status === "fulfilled" ? mobileResult.value : null;
  const desktop =
    desktopResult.status === "fulfilled" ? desktopResult.value : null;

  if (!mobile && !desktop) {
    const errors = [
      mobileResult.status === "rejected" ? mobileResult.reason : null,
      desktopResult.status === "rejected" ? desktopResult.reason : null,
    ]
      .filter(Boolean)
      .map((e) => (e instanceof Error ? e.message : String(e)))
      .join(" | ");
    throw new Error(`PSI both strategies failed: ${errors}`);
  }

  return {
    mobile,
    desktop,
    _partial: !mobile || !desktop,
  };
}
