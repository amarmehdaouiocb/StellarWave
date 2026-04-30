/**
 * Composant PDF du rapport d'audit Performance & SEO.
 * Utilise @react-pdf/renderer avec les fonts officielles du site
 * Stellar Wave (Cabinet Grotesk + Behind the Nineties).
 *
 * Le PDF est généré côté serveur (Vercel Function) puis attaché
 * à l'email Resend envoyé au prospect.
 *
 * Style : éditorial premium dark (cohérent plaquette + pitch).
 *  - Page 1 : Cover éditoriale + scores + Core Web Vitals
 *  - Page 2 : Audit SEO + Recommandations + CTA
 */
import path from "node:path";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Circle,
  Path,
} from "@react-pdf/renderer";
import type { PsiData, PsiResult, SeoData } from "@/lib/supabase";
import type { Recommendation } from "./recommendations";

// ============================================================================
// FONTS — chargées depuis public/fonts/ (déjà bundled avec le déploiement)
// ============================================================================
const FONTS_DIR = path.resolve(process.cwd(), "public/fonts");

Font.register({
  family: "CabinetGrotesk",
  fonts: [
    {
      src: path.join(FONTS_DIR, "CabinetGrotesk-Regular.woff2"),
      fontWeight: 400,
    },
    {
      src: path.join(FONTS_DIR, "CabinetGrotesk-Medium.woff2"),
      fontWeight: 500,
    },
    {
      src: path.join(FONTS_DIR, "CabinetGrotesk-Bold.woff2"),
      fontWeight: 700,
    },
    {
      src: path.join(FONTS_DIR, "CabinetGrotesk-Extrabold.woff2"),
      fontWeight: 800,
    },
  ],
});

Font.register({
  family: "BehindTheNineties",
  fonts: [
    {
      src: path.join(FONTS_DIR, "Behind-The-Nineties-Rg.otf"),
      fontWeight: 400,
    },
    {
      src: path.join(FONTS_DIR, "Behind-The-Nineties-It.otf"),
      fontWeight: 400,
      fontStyle: "italic",
    },
    {
      src: path.join(FONTS_DIR, "Behind-The-Nineties-Bd-It.otf"),
      fontWeight: 700,
      fontStyle: "italic",
    },
  ],
});

// ============================================================================
// COULEURS — alignées sur le design system StellarWave (Lime Sky / Dark Green)
// ============================================================================
const COLORS = {
  bg: "#020617",
  bgAlt: "#0f172a",
  card: "#1e293b",
  border: "rgba(56, 189, 248, 0.18)",
  borderStrong: "rgba(56, 189, 248, 0.5)",
  lime: "#38bdf8",
  limeLight: "#7dd3fc",
  limeDark: "#0ea5e9",
  white: "#ffffff",
  whiteSoft: "rgba(255, 255, 255, 0.55)",
  body: "#cbd5e1",
  muted: "#94a3b8",
  dim: "#64748b",
  scoreGood: "#22c55e",
  scoreAvg: "#f59e0b",
  scoreBad: "#ef4444",
} as const;

const FONT_DISPLAY = "CabinetGrotesk";
const FONT_SERIF = "BehindTheNineties";

const scoreColor = (score: number) => {
  if (score >= 90) return COLORS.scoreGood;
  if (score >= 50) return COLORS.scoreAvg;
  return COLORS.scoreBad;
};

const scoreLabel = (score: number) => {
  if (score >= 90) return "BON";
  if (score >= 50) return "MOYEN";
  return "FAIBLE";
};

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.bg,
    color: COLORS.white,
    fontFamily: FONT_DISPLAY,
    padding: 36,
    fontSize: 10,
    flexDirection: "column",
    position: "relative",
  },
  // Numéro jumbo en filigrane (signature éditoriale plaquette)
  jumboNumber: {
    position: "absolute",
    top: 18,
    right: 24,
    fontFamily: FONT_SERIF,
    fontStyle: "italic",
    fontSize: 130,
    color: "rgba(56, 189, 248, 0.06)",
    letterSpacing: -2,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    borderBottomStyle: "solid",
    zIndex: 5,
  },
  logoMark: {
    color: COLORS.lime,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: 1,
  },
  logoTagline: {
    color: COLORS.muted,
    fontFamily: FONT_DISPLAY,
    fontSize: 7,
    letterSpacing: 1.8,
    marginTop: 3,
    textTransform: "uppercase",
    fontWeight: 500,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  reportTitle: {
    color: COLORS.white,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: 12,
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  reportMeta: {
    color: COLORS.muted,
    fontSize: 8,
    fontFamily: FONT_DISPLAY,
  },
  // Hero éditorial
  hero: {
    marginBottom: 18,
    zIndex: 5,
  },
  heroTagline: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  heroTaglineLine: {
    width: 24,
    height: 0.8,
    backgroundColor: COLORS.lime,
    marginRight: 8,
  },
  heroTaglineText: {
    color: COLORS.lime,
    fontSize: 7,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
  },
  heroTitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 1.05,
    color: COLORS.whiteSoft,
    letterSpacing: -0.7,
    marginBottom: 4,
  },
  heroTitleStrong: {
    fontFamily: FONT_DISPLAY,
    fontSize: 28,
    fontWeight: 800,
    color: COLORS.white,
    letterSpacing: -0.9,
  },
  heroTitleAccent: {
    fontFamily: FONT_SERIF,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: 28,
    color: COLORS.lime,
  },
  heroUrl: {
    color: COLORS.lime,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: 14,
    marginTop: 8,
    letterSpacing: -0.2,
  },
  heroSubtitle: {
    color: COLORS.body,
    fontSize: 9.5,
    lineHeight: 1.55,
    marginTop: 6,
    fontFamily: FONT_DISPLAY,
    maxWidth: "85%",
  },
  // Hairline lime
  hairline: {
    height: 0.8,
    backgroundColor: COLORS.borderStrong,
    marginVertical: 14,
  },
  // Section header (signature éditoriale)
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  sectionNumber: {
    fontFamily: FONT_SERIF,
    fontStyle: "italic",
    fontSize: 14,
    color: "rgba(56, 189, 248, 0.55)",
    fontWeight: 400,
  },
  sectionLine: {
    width: 14,
    height: 0.8,
    backgroundColor: "rgba(56, 189, 248, 0.5)",
  },
  sectionLabel: {
    color: COLORS.muted,
    fontSize: 7,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
  },
  sectionTitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.white,
    marginBottom: 10,
    letterSpacing: -0.4,
  },
  sectionTitleSoft: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 400,
    color: COLORS.whiteSoft,
  },
  sectionTitleAccent: {
    fontFamily: FONT_SERIF,
    fontStyle: "italic",
    fontWeight: 400,
    color: COLORS.lime,
  },
  section: {
    marginBottom: 16,
  },
  // Scores
  scoresGrid: {
    flexDirection: "row",
    gap: 8,
  },
  scoreColumn: {
    flex: 1,
    backgroundColor: COLORS.bgAlt,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "solid",
    position: "relative",
    overflow: "hidden",
  },
  scoreColumnAccentLine: {
    position: "absolute",
    top: 0,
    left: 12,
    width: 24,
    height: 1.2,
    backgroundColor: COLORS.lime,
  },
  scoreColumnHeader: {
    marginBottom: 10,
  },
  scoreStrategy: {
    color: COLORS.muted,
    fontSize: 7,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(56, 189, 248, 0.06)",
    borderBottomStyle: "solid",
  },
  scoreCategory: {
    color: COLORS.body,
    fontSize: 9,
    fontFamily: FONT_DISPLAY,
  },
  scoreValueWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  scoreValue: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: 16,
    letterSpacing: -0.5,
  },
  scoreBadge: {
    fontSize: 6,
    paddingVertical: 1.5,
    paddingHorizontal: 4,
    borderRadius: 999,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    letterSpacing: 0.6,
  },
  // CWV
  cwvGrid: {
    flexDirection: "row",
    gap: 6,
  },
  cwvCard: {
    flex: 1,
    backgroundColor: COLORS.bgAlt,
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "solid",
    position: "relative",
    overflow: "hidden",
  },
  cwvAccentLine: {
    position: "absolute",
    top: 0,
    left: 8,
    width: 14,
    height: 0.8,
    backgroundColor: COLORS.lime,
  },
  cwvLabel: {
    color: COLORS.muted,
    fontSize: 6.5,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 3,
    marginTop: 4,
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
  },
  cwvValue: {
    color: COLORS.lime,
    fontSize: 14,
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    letterSpacing: -0.4,
  },
  cwvUnit: {
    color: COLORS.muted,
    fontSize: 7,
    fontFamily: FONT_DISPLAY,
  },
  // SEO checklist
  seoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  seoItem: {
    width: "48.5%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bgAlt,
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "solid",
    gap: 8,
  },
  seoCheck: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  seoCheckPass: { backgroundColor: COLORS.scoreGood },
  seoCheckFail: { backgroundColor: COLORS.scoreBad },
  seoCheckIcon: {
    color: COLORS.white,
    fontSize: 9,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
  },
  seoLabel: {
    color: COLORS.body,
    fontSize: 8.5,
    flex: 1,
    fontFamily: FONT_DISPLAY,
  },
  // Recommendations
  recoCard: {
    flexDirection: "row",
    backgroundColor: COLORS.bgAlt,
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "solid",
    gap: 12,
    position: "relative",
    overflow: "hidden",
  },
  recoAccentLine: {
    position: "absolute",
    top: 0,
    left: 12,
    width: 18,
    height: 1.2,
    backgroundColor: COLORS.lime,
  },
  recoNumber: {
    fontFamily: FONT_SERIF,
    fontStyle: "italic",
    fontSize: 22,
    color: COLORS.lime,
    width: 26,
    letterSpacing: -0.5,
    fontWeight: 400,
  },
  recoBody: {
    flex: 1,
  },
  recoTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  recoTitle: {
    color: COLORS.white,
    fontSize: 10.5,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    flex: 1,
    paddingRight: 8,
    letterSpacing: -0.2,
  },
  recoBadge: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    color: COLORS.lime,
    fontSize: 6.5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 4,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    letterSpacing: 0.6,
  },
  recoDetail: {
    color: COLORS.body,
    fontSize: 8.5,
    lineHeight: 1.5,
    fontFamily: FONT_DISPLAY,
  },
  // CTA — pitch-style avec gradient lime
  cta: {
    backgroundColor: COLORS.lime,
    borderRadius: 12,
    padding: 18,
    marginTop: 14,
    position: "relative",
    overflow: "hidden",
  },
  ctaBadge: {
    backgroundColor: "#000000",
    color: COLORS.lime,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 999,
    fontSize: 6.5,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    letterSpacing: 1.5,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  ctaTitle: {
    color: "#000000",
    fontSize: 22,
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    marginBottom: 4,
    letterSpacing: -0.7,
  },
  ctaTitleAccent: {
    fontFamily: FONT_SERIF,
    fontStyle: "italic",
    fontWeight: 400,
    color: "#000000",
  },
  ctaText: {
    color: "rgba(0, 0, 0, 0.78)",
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 12,
    maxWidth: "80%",
    fontFamily: FONT_DISPLAY,
  },
  ctaButton: {
    backgroundColor: "#000000",
    color: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    fontSize: 10,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    alignSelf: "flex-start",
  },
  // Footer
  footer: {
    marginTop: "auto",
    paddingTop: 12,
    borderTopWidth: 0.8,
    borderTopColor: COLORS.border,
    borderTopStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 5,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 7,
    fontFamily: FONT_DISPLAY,
  },
  footerPage: {
    color: COLORS.lime,
    fontSize: 7.5,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    letterSpacing: 1.5,
  },
});

// ============================================================================
// HELPERS
// ============================================================================
const fmtMs = (ms: number): { value: string; unit: string } => {
  if (ms >= 1000) {
    return { value: (ms / 1000).toFixed(1), unit: "s" };
  }
  return { value: Math.round(ms).toString(), unit: "ms" };
};

const fmtCls = (cls: number) => ({ value: cls.toFixed(2), unit: "" });

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function ScoreColumn({
  result,
  strategy,
}: {
  result: PsiResult | null;
  strategy: "Mobile" | "Desktop";
}) {
  if (!result) {
    return (
      <View style={styles.scoreColumn}>
        <View style={styles.scoreColumnAccentLine} />
        <View style={styles.scoreColumnHeader}>
          <Text style={styles.scoreStrategy}>{strategy}</Text>
        </View>
        <Text style={{ color: COLORS.muted, fontSize: 9 }}>
          Audit indisponible
        </Text>
      </View>
    );
  }

  const rows = [
    { label: "Performance", value: result.scores.performance },
    { label: "SEO", value: result.scores.seo },
    { label: "Accessibilité", value: result.scores.accessibility },
    { label: "Bonnes pratiques", value: result.scores.bestPractices },
  ];

  return (
    <View style={styles.scoreColumn}>
      <View style={styles.scoreColumnAccentLine} />
      <View style={styles.scoreColumnHeader}>
        <Text style={styles.scoreStrategy}>{strategy}</Text>
      </View>
      {rows.map((row) => (
        <View key={row.label} style={styles.scoreRow}>
          <Text style={styles.scoreCategory}>{row.label}</Text>
          <View style={styles.scoreValueWrap}>
            <Text
              style={[styles.scoreValue, { color: scoreColor(row.value) }]}
            >
              {row.value}
            </Text>
            <Text
              style={[
                styles.scoreBadge,
                {
                  backgroundColor: `${scoreColor(row.value)}22`,
                  color: scoreColor(row.value),
                },
              ]}
            >
              {scoreLabel(row.value)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function CwvCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <View style={styles.cwvCard}>
      <View style={styles.cwvAccentLine} />
      <Text style={styles.cwvLabel}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 2 }}>
        <Text style={styles.cwvValue}>{value}</Text>
        <Text style={styles.cwvUnit}>{unit}</Text>
      </View>
    </View>
  );
}

function SeoCheckItem({ label, pass }: { label: string; pass: boolean }) {
  return (
    <View style={styles.seoItem}>
      <View
        style={[
          styles.seoCheck,
          pass ? styles.seoCheckPass : styles.seoCheckFail,
        ]}
      >
        <Text style={styles.seoCheckIcon}>{pass ? "✓" : "✗"}</Text>
      </View>
      <Text style={styles.seoLabel}>{label}</Text>
    </View>
  );
}

function SectionHeader({ index, label }: { index: string; label: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionNumber}>{index}</Text>
      <View style={styles.sectionLine} />
      <Text style={styles.sectionLabel}>{label}</Text>
    </View>
  );
}

function PageHeader({ date }: { date: string }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.logoMark}>✦ STELLAR WAVE</Text>
        <Text style={styles.logoTagline}>Studio Product &amp; Cloud</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.reportTitle}>
          Mini-audit Performance &amp; SEO
        </Text>
        <Text style={styles.reportMeta}>{date}</Text>
      </View>
    </View>
  );
}

function PageFooter({ pageNum }: { pageNum: string }) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        stellarwave.fr · contact@stellarwave.fr · +33 6 25 05 97 32
      </Text>
      <Text style={styles.footerPage}>{pageNum} / 02</Text>
    </View>
  );
}

// ============================================================================
// DOCUMENT PRINCIPAL
// ============================================================================
export type AuditReportProps = {
  url: string;
  generatedAt: Date;
  psi: PsiData;
  seo: SeoData;
  recommendations: Recommendation[];
};

export function AuditReportDocument({
  url,
  generatedAt,
  psi,
  seo,
  recommendations,
}: AuditReportProps) {
  const dateStr = generatedAt.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const cwvSource = psi.mobile ?? psi.desktop;
  const lcp = cwvSource ? fmtMs(cwvSource.metrics.lcp) : null;
  const fcp = cwvSource ? fmtMs(cwvSource.metrics.fcp) : null;
  const cls = cwvSource ? fmtCls(cwvSource.metrics.cls) : null;
  const tbt = cwvSource ? fmtMs(cwvSource.metrics.tbt) : null;
  const si = cwvSource ? fmtMs(cwvSource.metrics.si) : null;

  const seoChecks = [
    { label: "HTTPS activé", pass: seo.https },
    { label: "Balise <title> présente", pass: !!seo.title.value },
    { label: "Longueur du titre optimale", pass: seo.title.optimal },
    { label: "Méta-description présente", pass: !!seo.description.value },
    { label: "Longueur description optimale", pass: seo.description.optimal },
    { label: "URL canonique définie", pass: seo.canonical.present },
    { label: "Open Graph complet", pass: seo.openGraph.complete },
    {
      label: `Données structurées (${seo.structuredData.count})`,
      pass: seo.structuredData.count > 0,
    },
    { label: "robots.txt présent", pass: seo.robotsTxt.present },
    { label: "sitemap.xml présent", pass: seo.sitemap.present },
    { label: "En-têtes de sécurité", pass: seo.securityHeaders.hsts },
    { label: "Page accessible (200 OK)", pass: seo.httpStatus < 400 },
  ];

  const topRecos = recommendations.slice(0, 6);

  return (
    <Document
      title="Mini-audit Performance & SEO — Stellar Wave"
      author="Stellar Wave"
      subject={`Audit de ${url}`}
    >
      {/* ===== PAGE 1 ===== */}
      <Page size="A4" style={styles.page}>
        {/* Numéro jumbo top-right */}
        <Text style={styles.jumboNumber}>01</Text>

        <PageHeader date={dateStr} />

        {/* HERO ÉDITORIAL */}
        <View style={styles.hero}>
          <View style={styles.heroTagline}>
            <View style={styles.heroTaglineLine} />
            <Text style={styles.heroTaglineText}>
              Diagnostic complet · {dateStr}
            </Text>
          </View>
          <Text style={styles.heroTitle}>
            Voici{" "}
            <Text style={styles.heroTitleAccent}>pourquoi</Text>{" "}
            <Text style={styles.heroTitleStrong}>vos visiteurs</Text>
          </Text>
          <Text style={styles.heroTitle}>
            <Text style={styles.heroTitleStrong}>partent.</Text>
          </Text>
          <Text style={styles.heroUrl}>→ {url}</Text>
          <Text style={styles.heroSubtitle}>
            Diagnostic basé sur les métriques officielles Google Lighthouse
            (mobile + desktop) et un audit SEO technique complémentaire de
            12 points de contrôle.
          </Text>
        </View>

        <View style={styles.hairline} />

        {/* SCORES */}
        <View style={styles.section}>
          <SectionHeader index="01" label="Scores globaux" />
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitleSoft}>Comment Google </Text>
            <Text style={styles.sectionTitleAccent}>note</Text> votre site
          </Text>
          <View style={styles.scoresGrid}>
            <ScoreColumn result={psi.mobile} strategy="Mobile" />
            <ScoreColumn result={psi.desktop} strategy="Desktop" />
          </View>
        </View>

        {/* CWV */}
        {cwvSource && (
          <View style={styles.section}>
            <SectionHeader index="02" label="Core Web Vitals · Mobile" />
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleSoft}>Les indicateurs qui </Text>
              <Text style={styles.sectionTitleAccent}>comptent</Text>
            </Text>
            <View style={styles.cwvGrid}>
              {lcp && <CwvCard label="LCP" value={lcp.value} unit={lcp.unit} />}
              {fcp && <CwvCard label="FCP" value={fcp.value} unit={fcp.unit} />}
              {cls && (
                <CwvCard label="CLS" value={cls.value} unit={cls.unit} />
              )}
              {tbt && <CwvCard label="TBT" value={tbt.value} unit={tbt.unit} />}
              {si && (
                <CwvCard label="Speed Idx" value={si.value} unit={si.unit} />
              )}
            </View>
            <Text
              style={{
                color: COLORS.muted,
                fontSize: 7.5,
                marginTop: 6,
                lineHeight: 1.4,
                fontFamily: FONT_DISPLAY,
              }}
            >
              LCP : temps d&apos;affichage du contenu principal · FCP : premier
              affichage · CLS : stabilité visuelle · TBT : temps de blocage ·
              Speed Index : vitesse perçue.
            </Text>
          </View>
        )}

        {psi._partial && (
          <View
            style={{
              padding: 8,
              backgroundColor: "rgba(245, 158, 11, 0.10)",
              borderRadius: 6,
              borderLeftWidth: 3,
              borderLeftColor: COLORS.scoreAvg,
              borderLeftStyle: "solid",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.scoreAvg,
                fontSize: 8,
                lineHeight: 1.5,
                fontFamily: FONT_DISPLAY,
              }}
            >
              ⚠ Audit partiel : une stratégie n&apos;a pas pu être complétée.
              Le diagnostic reste fiable sur la stratégie disponible.
            </Text>
          </View>
        )}

        <PageFooter pageNum="01" />
      </Page>

      {/* ===== PAGE 2 ===== */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.jumboNumber}>02</Text>

        <PageHeader date={dateStr} />

        {/* SEO CHECKLIST */}
        <View style={styles.section}>
          <SectionHeader index="03" label="Audit SEO technique" />
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitleSoft}>12 </Text>
            <Text style={styles.sectionTitleAccent}>points de contrôle</Text>
            <Text style={styles.sectionTitleSoft}> essentiels</Text>
          </Text>
          <View style={styles.seoGrid}>
            {seoChecks.map((c) => (
              <SeoCheckItem key={c.label} label={c.label} pass={c.pass} />
            ))}
          </View>
        </View>

        {/* RECOMMANDATIONS */}
        {topRecos.length > 0 && (
          <View style={styles.section}>
            <SectionHeader index="04" label="Recommandations prioritaires" />
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleSoft}>Par où </Text>
              <Text style={styles.sectionTitleAccent}>commencer</Text>
            </Text>
            {topRecos.map((reco, i) => (
              <View key={reco.id} style={styles.recoCard}>
                <View style={styles.recoAccentLine} />
                <Text style={styles.recoNumber}>
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <View style={styles.recoBody}>
                  <View style={styles.recoTitleRow}>
                    <Text style={styles.recoTitle}>{reco.title}</Text>
                    {reco.savings && (
                      <Text style={styles.recoBadge}>{reco.savings}</Text>
                    )}
                  </View>
                  <Text style={styles.recoDetail}>{reco.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaBadge}>★ ÉTAPE SUIVANTE</Text>
          <Text style={styles.ctaTitle}>
            <Text>Discutons de votre </Text>
            <Text style={styles.ctaTitleAccent}>plan d&apos;action.</Text>
          </Text>
          <Text style={styles.ctaText}>
            Notre équipe peut vous accompagner pour mettre en œuvre ces
            recommandations et atteindre un score Lighthouse 95+. Premier
            échange offert, sans engagement.
          </Text>
          <Text style={styles.ctaButton}>→ stellarwave.fr/#contact</Text>
        </View>

        <PageFooter pageNum="02" />
      </Page>
    </Document>
  );
}
