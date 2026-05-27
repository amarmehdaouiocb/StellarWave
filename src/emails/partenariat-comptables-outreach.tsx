import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

type PartenariatComptablesOutreachEmailProps = {
  /** URL de prise de RDV (Google Calendar) */
  bookingUrl?: string;
  /** Source du logo (URL hébergée ou cid: pour inline) */
  logoSrc?: string;
  /** Source de la photo du fondateur (URL hébergée ou cid: pour inline) */
  photoSrc?: string;
  /** Intro « warm » (relance après un appel) au lieu de la prise de contact froide */
  warm?: boolean;
};

const STEPS = [
  "On échange avec le client et on cadre précisément son besoin.",
  "On établit le devis — prix fixe, validé avant tout démarrage.",
  "On gère la livraison, la mise en production et le support.",
] as const;

const TOOLS = [
  "CRM",
  "Apps mobiles",
  "Dashboards",
  "Portails client",
  "Automatisations",
] as const;

const SECTORS = [
  "Restaurants indépendants",
  "Centres de formation Taxi/VTC & médicale",
  "Acteurs de la copropriété",
] as const;

// Polices du site (Clash Display titres + Cabinet Grotesk corps), chargées en
// @font-face depuis stellarwave.fr. Clients sans webfont (Gmail) → fallback
// sans-serif système (jamais de serif/calligraphie).
const FONT_FACE_CSS = `
@font-face{font-family:'Clash Display';font-style:normal;font-weight:600;font-display:swap;src:url('https://stellarwave.fr/fonts/ClashDisplay-Semibold.woff2') format('woff2');}
@font-face{font-family:'Clash Display';font-style:normal;font-weight:700;font-display:swap;src:url('https://stellarwave.fr/fonts/ClashDisplay-Bold.woff2') format('woff2');}
@font-face{font-family:'Cabinet Grotesk';font-style:normal;font-weight:400;font-display:swap;src:url('https://stellarwave.fr/fonts/CabinetGrotesk-Regular.woff2') format('woff2');}
@font-face{font-family:'Cabinet Grotesk';font-style:normal;font-weight:500;font-display:swap;src:url('https://stellarwave.fr/fonts/CabinetGrotesk-Medium.woff2') format('woff2');}
@font-face{font-family:'Cabinet Grotesk';font-style:normal;font-weight:700;font-display:swap;src:url('https://stellarwave.fr/fonts/CabinetGrotesk-Bold.woff2') format('woff2');}
`;

export function PartenariatComptablesOutreachEmail({
  bookingUrl = "https://calendar.app.google/51BiLHgAVhsLrxTC9",
  logoSrc = "https://stellarwave.fr/logo-footer.png",
  photoSrc = "https://stellarwave.fr/avatar.jpg",
  warm = false,
}: PartenariatComptablesOutreachEmailProps) {
  return (
    <Html lang="fr">
      <Head>
        <style>{FONT_FACE_CSS}</style>
      </Head>
      <Preview>
        Un partenariat simple : vous présentez un client, on gère tout le reste
        — 10 % du contrat revient au cabinet.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* ───────── HERO ───────── */}
          <Section style={hero}>
            <Img
              src={logoSrc}
              width={36}
              height={48}
              alt="StellarWave"
              style={heroLogo}
            />
            <Text style={wordmark}>StellarWave</Text>
            <Text style={brandTagline}>ÉDITEUR DE LOGICIELS</Text>

            <Text style={heroLabel}>
              <span style={heroLabelLine}>—</span>
              &nbsp;&nbsp;PARTENARIAT · CABINETS COMPTABLES · 2026
            </Text>

            <Heading style={heroHeadline}>
              Un partenaire <span style={heroAccent}>informatique</span>
              <br />
              pour vos clients.
            </Heading>

            <Section style={{ textAlign: "center" as const }}>
              <Button style={heroButton} href={bookingUrl}>
                Réserver 30 minutes&nbsp;&nbsp;→
              </Button>
            </Section>
          </Section>

          {/* ───────── INTRO ───────── */}
          <Section style={content}>
            <Text style={greeting}>Bonjour,</Text>
            {warm ? (
              <>
                <Text style={paragraph}>
                  On a échangé au téléphone il y a environ un mois, au sujet
                  d&rsquo;un partenariat possible entre votre cabinet et{" "}
                  <strong style={strong}>StellarWave</strong>. Comme convenu, je
                  vous envoie les éléments de présentation.
                </Text>
                <Text style={paragraph}>
                  Pour rappel, on développe des logiciels sur mesure pour les
                  PME&nbsp;: quand l&rsquo;un de vos clients a un besoin sur la
                  partie informatique, vous nous le présentez, et on
                  s&rsquo;occupe de tout le reste.
                </Text>
              </>
            ) : (
              <>
                <Text style={paragraph}>
                  Je suis Amar, fondateur de{" "}
                  <strong style={strong}>StellarWave</strong>, une entreprise de
                  développement logiciel sur mesure pour PME.
                </Text>
                <Text style={paragraph}>
                  Je contacte quelques cabinets d&rsquo;expertise comptable pour
                  mettre en place un partenariat simple : quand l&rsquo;un de vos
                  clients a un besoin sur la partie informatique, vous pouvez nous
                  le présenter.
                </Text>
              </>
            )}
          </Section>

          <Divider />

          {/* ───────── COMMENT ÇA MARCHE ───────── */}
          <Section style={content}>
            <Text style={sectionLabel}>COMMENT ÇA SE PASSE</Text>
            <Heading style={sectionHeading}>
              Vous présentez,{" "}
              <span style={sectionHeadingAccent}>on s&rsquo;occupe du reste.</span>
            </Heading>

            <Section style={stepsWrap}>
              {STEPS.map((step, i) => (
                <Row key={i} style={stepRow}>
                  <Column style={stepBadgeCol}>
                    <span style={stepBadge}>{i + 1}</span>
                  </Column>
                  <Column>
                    <Text style={stepText}>{step}</Text>
                  </Column>
                </Row>
              ))}
            </Section>

            <Section style={benefitBox}>
              <Text style={benefitText}>
                Le cabinet ne porte pas la mission technique, ne prend
                <strong style={benefitStrong}>
                  {" "}
                  aucun risque projet
                </strong>
                , et garde un partenaire fiable à recommander.
              </Text>
            </Section>
          </Section>

          <Divider />

          {/* ───────── CE QU'ON A DÉJÀ LIVRÉ ───────── */}
          <Section style={content}>
            <Text style={sectionLabel}>CE QU&rsquo;ON A DÉJÀ LIVRÉ</Text>
            <Heading style={sectionHeading}>
              Des outils déjà en production.
            </Heading>
            <Text style={paragraph}>
              On a déjà construit des outils pour&nbsp;:
            </Text>

            <Section style={{ margin: "4px 0 20px" }}>
              {SECTORS.map((sector) => (
                <Text key={sector} style={sectorItem}>
                  <span style={sectorMark}>›</span> {sector}
                </Text>
              ))}
            </Section>

            <Section style={pillsWrap}>
              {TOOLS.map((tool) => (
                <span key={tool} style={pill}>
                  {tool}
                </span>
              ))}
            </Section>
          </Section>

          {/* ───────── CTA — RÉMUNÉRATION ───────── */}
          <Section style={ctaOuter}>
            <Section style={ctaCard}>
              <Text style={ctaKicker}>LA RÉMUNÉRATION DU CABINET</Text>
              <Heading style={ctaHeadline}>
                10 % du contrat,
                <br />à l&rsquo;encaissement.
              </Heading>
              <Text style={ctaSub}>
                Si un projet est signé puis encaissé, le cabinet touche 10 % du
                contrat — sans exclusivité ni engagement de volume.
              </Text>
              <Section style={{ textAlign: "center" as const }}>
                <Button style={ctaButton} href={bookingUrl}>
                  Réserver 30 minutes&nbsp;&nbsp;→
                </Button>
              </Section>
              <Text style={ctaQuestion}>
                Est-ce que le sujet mérite un échange de 30 minutes avec la bonne
                personne chez vous&nbsp;?
              </Text>
            </Section>
          </Section>

          {/* ───────── PIÈCES JOINTES + SIGNATURE ───────── */}
          <Section style={content}>
            <Text style={attachNote}>
              📎 Vous trouverez notre présentation et les modalités du
              partenariat en pièce jointe.
            </Text>
            <Hr style={signatureHr} />
            <Text style={signOff}>Bonne journée,</Text>
            <Row style={sigRow}>
              <Column style={sigPhotoCol}>
                <Img
                  src={photoSrc}
                  width={64}
                  height={64}
                  alt="Amar Mehdaoui"
                  style={sigPhoto}
                />
              </Column>
              <Column style={sigInfoCol}>
                <Text style={signName}>Amar Mehdaoui</Text>
                <Text style={sigTitle}>Fondateur · StellarWave</Text>
                <Text style={signMeta}>
                  <Link href="mailto:contact@stellarwave.fr" style={signLink}>
                    contact@stellarwave.fr
                  </Link>{" "}
                  ·{" "}
                  <Link href="https://stellarwave.fr" style={signLink}>
                    stellarwave.fr
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ───────── FOOTER (minimal, sans redondance) ───────── */}
          <Section style={footer}>
            <Text style={footerMeta}>
              STELLARWAVE · Éditeur de logiciels — SASU au capital de
              500&nbsp;€ · RCS&nbsp;Bobigny&nbsp;104&nbsp;979&nbsp;125
              <br />
              Siège&nbsp;: 23 Rue de Normandie, 93000&nbsp;Bobigny ·
              contact@stellarwave.fr · +33&nbsp;6&nbsp;25&nbsp;05&nbsp;97&nbsp;32
            </Text>
            <Text style={unsubNote}>
              Si ce message n&rsquo;est pas pertinent, répondez simplement
              «&nbsp;<strong style={{ color: "#94a3b8" }}>stop</strong>&nbsp;» et
              je ne vous recontacterai pas.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Divider() {
  return (
    <Section style={dividerWrap}>
      <div style={dividerLine} />
    </Section>
  );
}

export default PartenariatComptablesOutreachEmail;

/* ──────────────────────────── STYLES ──────────────────────────── */

// Titres : Clash Display (site) → Outfit → système. Corps : Cabinet Grotesk
// (site) → Outfit → système. Aucune serif/italique (plus de « calligraphie »).
const DISPLAY_FONT =
  "'Clash Display', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const BODY_FONT =
  "'Cabinet Grotesk', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

const main = {
  backgroundColor: "#020617",
  fontFamily: BODY_FONT,
  margin: 0,
  padding: "24px 0",
};

const container = {
  backgroundColor: "#0f172a",
  margin: "0 auto",
  borderRadius: "16px",
  overflow: "hidden",
  maxWidth: "600px",
  border: "1px solid rgba(56, 189, 248, 0.18)",
};

/* HERO */
const hero = {
  backgroundColor: "#020617",
  backgroundImage:
    "radial-gradient(120% 120% at 80% -10%, rgba(56,189,248,0.22) 0%, rgba(2,6,23,0) 55%), radial-gradient(90% 90% at 0% 110%, rgba(14,165,233,0.16) 0%, rgba(2,6,23,0) 50%)",
  padding: "40px 48px 40px",
  textAlign: "center" as const,
  borderBottom: "1px solid rgba(56, 189, 248, 0.12)",
};

const heroLogo = {
  display: "block",
  margin: "0 auto 12px",
};

const wordmark = {
  color: "#ffffff",
  fontFamily: DISPLAY_FONT,
  fontSize: "25px",
  fontWeight: 700 as const,
  letterSpacing: "-0.01em",
  whiteSpace: "nowrap" as const,
  margin: 0,
};

const brandTagline = {
  color: "#64748b",
  fontSize: "10px",
  fontWeight: 700 as const,
  letterSpacing: "3px",
  margin: "6px 0 0",
};

const heroLabel = {
  color: "#38bdf8",
  fontSize: "10px",
  fontWeight: 700 as const,
  letterSpacing: "2px",
  margin: "32px 0 16px",
};

const heroLabelLine = {
  color: "#38bdf8",
};

const heroHeadline = {
  color: "#ffffff",
  fontFamily: DISPLAY_FONT,
  fontSize: "38px",
  fontWeight: 600 as const,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  margin: "0 0 32px",
};

const heroAccent = {
  color: "#38bdf8",
};

const heroButton = {
  background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
  backgroundColor: "#38bdf8",
  borderRadius: "999px",
  color: "#020617",
  fontFamily: DISPLAY_FONT,
  fontSize: "15px",
  fontWeight: 700 as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "15px 34px",
  letterSpacing: "0.1px",
};

/* CONTENT */
const content = {
  padding: "32px 48px",
};

const greeting = {
  fontSize: "16px",
  color: "#e2e8f0",
  fontWeight: 600 as const,
  margin: "0 0 16px",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "26px",
  color: "#cbd5e1",
  margin: "0 0 18px",
};

const strong = {
  color: "#ffffff",
  fontWeight: 700 as const,
};

/* SECTION HEADERS */
const sectionLabel = {
  color: "#38bdf8",
  fontSize: "10px",
  fontWeight: 700 as const,
  letterSpacing: "2px",
  margin: "0 0 10px",
};

const sectionHeading = {
  color: "#ffffff",
  fontFamily: DISPLAY_FONT,
  fontSize: "25px",
  fontWeight: 600 as const,
  lineHeight: 1.18,
  letterSpacing: "-0.02em",
  margin: "0 0 22px",
};

const sectionHeadingAccent = {
  color: "#38bdf8",
};

/* STEPS */
const stepsWrap = {
  margin: "0 0 8px",
};

const stepRow = {
  marginBottom: "14px",
};

const stepBadgeCol = {
  width: "40px",
  verticalAlign: "top" as const,
};

const stepBadge = {
  display: "inline-block",
  width: "28px",
  height: "28px",
  lineHeight: "28px",
  borderRadius: "8px",
  backgroundColor: "#38bdf8",
  color: "#020617",
  fontFamily: DISPLAY_FONT,
  fontSize: "13px",
  fontWeight: 700 as const,
  textAlign: "center" as const,
};

const stepText = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#e2e8f0",
  margin: 0,
  paddingTop: "2px",
};

const benefitBox = {
  marginTop: "18px",
  padding: "18px 20px",
  backgroundColor: "#0b1220",
  borderRadius: "10px",
  borderLeft: "3px solid #38bdf8",
};

const benefitText = {
  fontSize: "14px",
  lineHeight: "23px",
  color: "#cbd5e1",
  margin: 0,
};

const benefitStrong = {
  color: "#38bdf8",
  fontWeight: 700 as const,
};

/* SECTORS + PILLS */
const sectorItem = {
  fontSize: "15px",
  lineHeight: "28px",
  color: "#e2e8f0",
  margin: "0 0 2px",
};

const sectorMark = {
  color: "#38bdf8",
  fontWeight: 700 as const,
  marginRight: "8px",
};

const pillsWrap = {
  margin: "4px 0 0",
};

const pill = {
  display: "inline-block",
  padding: "7px 14px",
  margin: "0 8px 8px 0",
  borderRadius: "999px",
  border: "1px solid rgba(56, 189, 248, 0.35)",
  backgroundColor: "rgba(56, 189, 248, 0.07)",
  color: "#7dd3fc",
  fontSize: "13px",
  fontWeight: 600 as const,
};

/* CTA CARD */
const ctaOuter = {
  padding: "12px 48px 36px",
};

const ctaCard = {
  backgroundColor: "#0ea5e9",
  borderRadius: "16px",
  padding: "36px 32px 32px",
  textAlign: "center" as const,
};

const ctaKicker = {
  color: "rgba(2, 6, 23, 0.65)",
  fontSize: "10px",
  fontWeight: 700 as const,
  letterSpacing: "2px",
  margin: "0 0 10px",
};

const ctaHeadline = {
  color: "#020617",
  fontFamily: DISPLAY_FONT,
  fontSize: "32px",
  fontWeight: 700 as const,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  margin: "0 0 14px",
};

const ctaSub = {
  color: "#0c1f33",
  fontSize: "15px",
  lineHeight: "24px",
  fontWeight: 500 as const,
  margin: "0 auto 24px",
  maxWidth: "420px",
};

const ctaButton = {
  backgroundColor: "#020617",
  borderRadius: "999px",
  color: "#ffffff",
  fontFamily: DISPLAY_FONT,
  fontSize: "15px",
  fontWeight: 700 as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "15px 34px",
};

const ctaQuestion = {
  color: "#0c1f33",
  fontSize: "14px",
  lineHeight: "22px",
  fontWeight: 600 as const,
  margin: "22px auto 0",
  maxWidth: "420px",
};

/* SIGNATURE */
const attachNote = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#94a3b8",
  margin: "0 0 8px",
};

const signatureHr = {
  borderColor: "rgba(56, 189, 248, 0.15)",
  margin: "20px 0",
};

const signOff = {
  fontSize: "15px",
  color: "#cbd5e1",
  margin: "0 0 14px",
};

const sigRow = {
  width: "100%",
};

const sigPhotoCol = {
  width: "76px",
  verticalAlign: "middle" as const,
};

const sigPhoto = {
  borderRadius: "50%",
  border: "2px solid rgba(56, 189, 248, 0.4)",
  display: "block",
};

const sigInfoCol = {
  verticalAlign: "middle" as const,
};

const signName = {
  fontFamily: DISPLAY_FONT,
  fontSize: "19px",
  fontWeight: 700 as const,
  letterSpacing: "-0.01em",
  color: "#ffffff",
  margin: "0 0 2px",
};

const sigTitle = {
  fontSize: "13px",
  color: "#38bdf8",
  fontWeight: 600 as const,
  margin: "0 0 4px",
};

const signMeta = {
  fontSize: "13px",
  color: "#94a3b8",
  margin: 0,
};

const signLink = {
  color: "#38bdf8",
  textDecoration: "none",
};

/* DIVIDER */
const dividerWrap = {
  padding: "4px 0",
  textAlign: "center" as const,
};

const dividerLine = {
  display: "inline-block",
  width: "72px",
  height: "1px",
  backgroundColor: "rgba(148, 163, 184, 0.25)",
};

/* FOOTER */
const footer = {
  backgroundColor: "#020617",
  padding: "28px 48px 32px",
  textAlign: "center" as const,
  borderTop: "1px solid rgba(56, 189, 248, 0.12)",
};

const footerMeta = {
  fontSize: "12px",
  color: "#64748b",
  lineHeight: "20px",
  margin: "0 0 12px",
};

const unsubNote = {
  fontSize: "12px",
  lineHeight: "20px",
  color: "#64748b",
  margin: 0,
};
