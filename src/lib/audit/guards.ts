/**
 * Anti-abuse guards exécutés AVANT d'insérer une row audit_requests.
 * 5 vérifications :
 *   1. Rate limit IP    : 3 demandes / heure / IP
 *   2. Quota email      : 1 audit / email / mois
 *   3. URL atteignable  : HEAD request, status < 400
 *   4. Blacklist domaine
 *   5. Quota global     : 100 audits/mois max
 */
import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const HOUR_MS = 3_600_000;
const MONTH_MS = 30 * 86_400_000;

const BLACKLIST_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "stellarwave.fr",
  "www.stellarwave.fr",
  "example.com",
  "www.example.com",
  "test.com",
]);

const MONTHLY_HARD_CAP = 100;
const MONTHLY_ALERT_THRESHOLD = 80;

export type GuardResult =
  | { ok: true }
  | { ok: false; reason: string; status: number };

export type GuardInput = {
  email: string;
  url: string;
};

export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0]?.trim() ?? "unknown";
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export async function runGuards(
  data: GuardInput,
  req: NextRequest,
): Promise<GuardResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Si Supabase n'est pas configuré, on laisse passer mais on log.
    // Les checks IP/quota ne sont pas critiques en dev local.
    console.warn("[Guards] Supabase non configuré — guards skipped");
    // On garde quand même les checks "stateless" : URL HEAD + blacklist.
    return await runStatelessGuards(data);
  }

  // 1) Blacklist domaine
  let host: string;
  try {
    host = new URL(data.url).hostname.toLowerCase();
  } catch {
    return { ok: false, reason: "URL invalide.", status: 400 };
  }
  if (BLACKLIST_HOSTS.has(host)) {
    return { ok: false, reason: "Domaine non autorisé.", status: 400 };
  }

  // 2) URL atteignable (HEAD)
  const headOk = await isUrlReachable(data.url);
  if (!headOk.ok) {
    return {
      ok: false,
      reason: headOk.reason,
      status: 400,
    };
  }

  const ip = getClientIp(req);
  const oneHourAgo = new Date(Date.now() - HOUR_MS).toISOString();
  const oneMonthAgo = new Date(Date.now() - MONTH_MS).toISOString();

  // 3) Rate limit IP (3/h)
  if (ip !== "unknown") {
    const { count: ipCount } = await supabase
      .from("audit_requests")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", oneHourAgo);

    if ((ipCount ?? 0) >= 3) {
      return {
        ok: false,
        reason: "Trop de demandes depuis votre adresse. Réessayez dans 1 heure.",
        status: 429,
      };
    }
  }

  // 4) Quota email (1/mois)
  const { count: emailCount } = await supabase
    .from("audit_requests")
    .select("*", { count: "exact", head: true })
    .eq("email", data.email.toLowerCase())
    .gte("created_at", oneMonthAgo);

  if ((emailCount ?? 0) >= 1) {
    return {
      ok: false,
      reason:
        "Vous avez déjà reçu un audit ce mois-ci. Contactez-nous pour un audit personnalisé.",
      status: 429,
    };
  }

  // 5) Quota mensuel global
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const { count: monthCount } = await supabase
    .from("audit_requests")
    .select("*", { count: "exact", head: true })
    .gte("created_at", monthStart.toISOString());

  const totalMonth = monthCount ?? 0;
  if (totalMonth >= MONTHLY_HARD_CAP) {
    return {
      ok: false,
      reason:
        "Quota mensuel atteint. L'équipe vous recontacte dès le mois prochain.",
      status: 503,
    };
  }

  // Note : alerte Slack à 80/100 envoyée par la route, pas ici (pour éviter
  // les imports circulaires et garder guards.ts pur).

  return { ok: true };
}

async function runStatelessGuards(data: GuardInput): Promise<GuardResult> {
  let host: string;
  try {
    host = new URL(data.url).hostname.toLowerCase();
  } catch {
    return { ok: false, reason: "URL invalide.", status: 400 };
  }
  if (BLACKLIST_HOSTS.has(host)) {
    return { ok: false, reason: "Domaine non autorisé.", status: 400 };
  }
  const headOk = await isUrlReachable(data.url);
  if (!headOk.ok) {
    return { ok: false, reason: headOk.reason, status: 400 };
  }
  return { ok: true };
}

async function isUrlReachable(
  url: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  try {
    // HEAD d'abord (le moins coûteux)
    const headRes = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5_000),
      redirect: "follow",
      headers: { "User-Agent": "StellarWaveAuditBot/1.0" },
    });
    if (headRes.status >= 400 && headRes.status !== 405) {
      return {
        ok: false,
        reason: `Site inaccessible (HTTP ${headRes.status}). Vérifiez l'URL.`,
      };
    }
    // Certains serveurs refusent HEAD (405) — fallback GET avec timeout court
    if (headRes.status === 405) {
      const getRes = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(8_000),
        redirect: "follow",
        headers: { "User-Agent": "StellarWaveAuditBot/1.0" },
      });
      if (getRes.status >= 400) {
        return {
          ok: false,
          reason: `Site inaccessible (HTTP ${getRes.status}). Vérifiez l'URL.`,
        };
      }
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      reason: "URL injoignable. Vérifiez que le site est en ligne.",
    };
  }
}

/**
 * Compteur mensuel pour la scarcité (route /api/audit/quota).
 * Retourne le nombre d'audits restants ce mois.
 */
export async function getMonthlyRemaining(): Promise<{
  remaining: number;
  monthLabel: string;
  hardCap: number;
}> {
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const monthLabel = monthStart.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      remaining: MONTHLY_HARD_CAP,
      monthLabel,
      hardCap: MONTHLY_HARD_CAP,
    };
  }

  const { count } = await supabase
    .from("audit_requests")
    .select("*", { count: "exact", head: true })
    .gte("created_at", monthStart.toISOString());

  const used = count ?? 0;
  return {
    remaining: Math.max(0, MONTHLY_HARD_CAP - used),
    monthLabel,
    hardCap: MONTHLY_HARD_CAP,
  };
}

export { MONTHLY_HARD_CAP, MONTHLY_ALERT_THRESHOLD };
