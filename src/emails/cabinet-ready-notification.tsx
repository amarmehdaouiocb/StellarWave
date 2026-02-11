import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Row,
  Column,
} from "@react-email/components";

// Types pour les données du formulaire
export type CabinetReadyEmailData = {
  // Contact
  prenom: string;
  email: string;
  rdv: string;
  // Cabinet
  poste: string;
  collaborateurs: string;
  clients: string;
  // Préparation
  preparation: string;
  outils: string;
  logiciel?: string;
  // Frustrations
  frustrations?: string;
  tempsPasse?: string;
  // Upsell
  services?: string;
  projetAutre?: string;
  budget?: string;
};

// Labels avec emojis pour lisibilité
const posteLabels: Record<string, string> = {
  associe: "Associé(e) / Dirigeant(e)",
  directeur: "Directeur(trice) de cabinet",
  "responsable-production": "Responsable production",
  "responsable-mission": "Responsable de mission",
  collaborateur: "Collaborateur(trice)",
  autre: "Autre",
};

const preparationConfig: Record<string, { label: string; color: string; bg: string }> = {
  "pas-commence": { label: "Pas encore commencé", color: "#dc2626", bg: "#fef2f2" },
  reflexion: { label: "En réflexion / cadrage", color: "#d97706", bg: "#fffbeb" },
  "en-cours": { label: "En cours de déploiement", color: "#2563eb", bg: "#eff6ff" },
  avance: { label: "Bien avancé (>50%)", color: "#16a34a", bg: "#f0fdf4" },
};

const outilsLabels: Record<string, string> = {
  excel: "📊 Excel / Google Sheets",
  "logiciel-comptable": "💻 Module logiciel comptable",
  crm: "🗂️ CRM / outil interne",
  rien: "❌ Pas d'outil dédié",
};

const rdvConfig: Record<string, { label: string; icon: string }> = {
  oui: { label: "Oui, avec plaisir", icon: "✅" },
  "peut-etre": { label: "Peut-être, à recontacter", icon: "🤔" },
  non: { label: "Non, mais tenir informé", icon: "📧" },
};

const frustrationLabels: Record<string, string> = {
  visibilite: "Manque de visibilité globale",
  temps: "Trop de temps passé sur le suivi",
  relances: "Relances clients chronophages",
  anomalies: "Anomalies détectées trop tard",
  coordination: "Coordination équipe difficile",
};

const serviceLabels: Record<string, string> = {
  "audit-preparation": "🔍 Audit de préparation",
  "dev-sur-mesure": "🛠️ Développement sur-mesure",
  "ia-automatisation": "🤖 IA & Automatisation",
  formation: "📚 Formation / Accompagnement",
  aucun: "Pas pour le moment",
};

const budgetLabels: Record<string, string> = {
  "<50": "💰 Moins de 50€/mois",
  "50-100": "💰 50 à 100€/mois",
  "100-200": "💰 100 à 200€/mois",
  "200-500": "💰 200 à 500€/mois",
  "500+": "💰 Plus de 500€/mois",
  "ne-sait-pas": "🤷 Ne sait pas encore",
};

export function CabinetReadyNotificationEmail({
  prenom,
  email,
  rdv,
  poste,
  collaborateurs,
  clients,
  preparation,
  outils,
  logiciel,
  frustrations,
  tempsPasse,
  services,
  projetAutre,
  budget,
}: CabinetReadyEmailData) {
  const prepConfig = preparationConfig[preparation] || preparationConfig["pas-commence"];
  const rdvInfo = rdvConfig[rdv] || rdvConfig["non"];

  // Parser les frustrations (string comma-separated)
  const frustrationList = frustrations?.split(", ").filter(Boolean) || [];

  // Parser les services (string comma-separated)
  const serviceList = services?.split(", ").filter(Boolean) || [];
  const hasUpsellInterest = serviceList.length > 0 && !serviceList.includes("aucun");

  return (
    <Html>
      <Head>
        <style>{`
          @media only screen and (max-width: 600px) {
            .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
          }
        `}</style>
      </Head>
      <Preview>
        Cabinet Ready — {prenom} ({posteLabels[poste] || poste}) • {collaborateurs} collab.
      </Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Header avec gradient */}
          <Section style={header}>
            <Text style={headerBrand}>CABINET READY</Text>
            <Heading style={headerTitle}>{prenom}</Heading>
            <Text style={headerSubtitle}>
              {posteLabels[poste] || poste}
            </Text>
          </Section>

          {/* Quick Stats Bar */}
          <Section style={statsBar}>
            <Row>
              <Column style={statItem}>
                <Text style={statNumber}>{collaborateurs}</Text>
                <Text style={statLabel}>Collaborateurs</Text>
              </Column>
              <Column style={statDivider}></Column>
              <Column style={statItem}>
                <Text style={statNumber}>{clients}</Text>
                <Text style={statLabel}>Clients</Text>
              </Column>
              <Column style={statDivider}></Column>
              <Column style={statItem}>
                <Text style={statNumber}>{rdvInfo.icon}</Text>
                <Text style={statLabel}>Dispo RDV</Text>
              </Column>
            </Row>
          </Section>

          {/* Contact Section */}
          <Section style={sectionCard} className="mobile-padding">
            <Text style={sectionIcon}>📧</Text>
            <Heading as="h2" style={sectionTitle}>Contact</Heading>
            <Row style={infoRow}>
              <Column style={infoLabel}>Email</Column>
              <Column style={infoValue}>
                <Link href={`mailto:${email}`} style={emailLink}>{email}</Link>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={infoLabel}>Disponibilité</Column>
              <Column style={infoValue}>{rdvInfo.icon} {rdvInfo.label}</Column>
            </Row>
          </Section>

          {/* Préparation Section - avec badge */}
          <Section style={sectionCard} className="mobile-padding">
            <Text style={sectionIcon}>📊</Text>
            <Heading as="h2" style={sectionTitle}>État de préparation</Heading>

            {/* Status Badge */}
            <Section style={{
              ...statusBadge,
              backgroundColor: prepConfig.bg,
              borderLeft: `4px solid ${prepConfig.color}`,
            }}>
              <Text style={{
                ...statusText,
                color: prepConfig.color,
              }}>
                {prepConfig.label}
              </Text>
            </Section>

            <Row style={infoRow}>
              <Column style={infoLabel}>Outil actuel</Column>
              <Column style={infoValue}>{outilsLabels[outils] || outils}</Column>
            </Row>
            {logiciel && (
              <Row style={infoRow}>
                <Column style={infoLabel}>Logiciel comptable</Column>
                <Column style={infoValue}>{logiciel}</Column>
              </Row>
            )}
          </Section>

          {/* Frustrations Section */}
          {frustrationList.length > 0 && (
            <Section style={sectionCard} className="mobile-padding">
              <Text style={sectionIcon}>😤</Text>
              <Heading as="h2" style={sectionTitle}>Points de friction</Heading>

              {frustrationList.map((f, i) => (
                <Section key={i} style={frustrationItem}>
                  <Text style={frustrationBullet}>•</Text>
                  <Text style={frustrationText}>
                    {frustrationLabels[f] || f}
                  </Text>
                </Section>
              ))}

              {tempsPasse && (
                <Section style={timeSpentBox}>
                  <Text style={timeSpentLabel}>Temps passé / semaine</Text>
                  <Text style={timeSpentValue}>{tempsPasse}</Text>
                </Section>
              )}
            </Section>
          )}

          {/* Upsell Section */}
          {hasUpsellInterest && (
            <Section style={upsellCard} className="mobile-padding">
              <Text style={sectionIcon}>🚀</Text>
              <Heading as="h2" style={upsellTitle}>Intérêt Services Agence</Heading>

              {serviceList.filter(s => s !== "aucun").map((s, i) => (
                <Section key={i} style={serviceItem}>
                  <Text style={serviceText}>
                    {serviceLabels[s] || s}
                  </Text>
                </Section>
              ))}

              {projetAutre && (
                <Section style={projetBox}>
                  <Text style={projetLabel}>Projet mentionné :</Text>
                  <Text style={projetText}>"{projetAutre}"</Text>
                </Section>
              )}
            </Section>
          )}

          {/* No Upsell Interest */}
          {!hasUpsellInterest && (
            <Section style={sectionCard} className="mobile-padding">
              <Text style={sectionIcon}>📋</Text>
              <Heading as="h2" style={sectionTitle}>Services Agence</Heading>
              <Text style={noInterestText}>Pas d'intérêt pour le moment</Text>
            </Section>
          )}

          {/* Budget Section */}
          {budget && (
            <Section style={budgetCard} className="mobile-padding">
              <Text style={sectionIcon}>💰</Text>
              <Heading as="h2" style={sectionTitle}>Budget Envisagé</Heading>
              <Text style={budgetValue}>{budgetLabels[budget] || budget}</Text>
            </Section>
          )}

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerDate}>
              Reçu le {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Link href={`mailto:${email}`} style={footerCta}>
              Répondre à {prenom} →
            </Link>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

export default CabinetReadyNotificationEmail;

// ============================================
// STYLES
// ============================================

const main = {
  backgroundColor: "#f1f5f9",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  padding: "40px 20px",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "16px",
  overflow: "hidden" as const,
  boxShadow: "0 4px 24px rgba(15, 23, 42, 0.08)",
};

// Header
const header = {
  backgroundColor: "#0f172a",
  padding: "40px 48px 32px",
  textAlign: "center" as const,
};

const headerBrand = {
  fontSize: "11px",
  fontWeight: "600" as const,
  letterSpacing: "0.15em",
  color: "#f59e0b",
  margin: "0 0 16px",
  textTransform: "uppercase" as const,
};

const headerTitle = {
  fontSize: "36px",
  fontWeight: "700" as const,
  color: "#ffffff",
  margin: "0 0 8px",
  letterSpacing: "-0.02em",
};

const headerSubtitle = {
  fontSize: "16px",
  color: "#94a3b8",
  margin: "0",
};

// Stats Bar
const statsBar = {
  backgroundColor: "#1e293b",
  padding: "20px 48px",
};

const statItem = {
  textAlign: "center" as const,
  width: "33%",
};

const statDivider = {
  width: "1px",
  backgroundColor: "#334155",
};

const statNumber = {
  fontSize: "20px",
  fontWeight: "700" as const,
  color: "#fbbf24",
  margin: "0",
};

const statLabel = {
  fontSize: "11px",
  color: "#94a3b8",
  margin: "4px 0 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

// Section Cards
const sectionCard = {
  padding: "28px 48px",
  borderBottom: "1px solid #e2e8f0",
};

const sectionIcon = {
  fontSize: "24px",
  margin: "0 0 8px",
};

const sectionTitle = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: "#64748b",
  margin: "0 0 20px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const infoRow = {
  marginBottom: "12px",
};

const infoLabel = {
  fontSize: "13px",
  color: "#94a3b8",
  width: "140px",
  verticalAlign: "top" as const,
};

const infoValue = {
  fontSize: "15px",
  color: "#1e293b",
  fontWeight: "500" as const,
};

const emailLink = {
  color: "#f59e0b",
  textDecoration: "none",
  fontWeight: "600" as const,
};

// Status Badge
const statusBadge = {
  padding: "16px 20px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const statusText = {
  fontSize: "15px",
  fontWeight: "600" as const,
  margin: "0",
};

// Frustrations
const frustrationItem = {
  display: "flex" as const,
  marginBottom: "8px",
};

const frustrationBullet = {
  color: "#ef6c4a",
  fontSize: "18px",
  marginRight: "12px",
  lineHeight: "24px",
  margin: "0 12px 0 0",
};

const frustrationText = {
  fontSize: "14px",
  color: "#475569",
  margin: "0",
  lineHeight: "24px",
};

const timeSpentBox = {
  backgroundColor: "#fef3c7",
  padding: "12px 16px",
  borderRadius: "8px",
  marginTop: "16px",
};

const timeSpentLabel = {
  fontSize: "11px",
  color: "#92400e",
  margin: "0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const timeSpentValue = {
  fontSize: "18px",
  fontWeight: "700" as const,
  color: "#92400e",
  margin: "4px 0 0",
};

// Upsell Section
const upsellCard = {
  padding: "28px 48px",
  backgroundColor: "#fffbeb",
  borderBottom: "1px solid #fde68a",
};

const upsellTitle = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: "#d97706",
  margin: "0 0 20px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const serviceItem = {
  backgroundColor: "#ffffff",
  padding: "12px 16px",
  borderRadius: "8px",
  marginBottom: "8px",
  border: "1px solid #fde68a",
};

const serviceText = {
  fontSize: "14px",
  color: "#1e293b",
  margin: "0",
  fontWeight: "500" as const,
};

const projetBox = {
  backgroundColor: "#ffffff",
  padding: "16px",
  borderRadius: "8px",
  marginTop: "16px",
  border: "2px solid #f59e0b",
};

const projetLabel = {
  fontSize: "11px",
  color: "#d97706",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  fontWeight: "600" as const,
};

const projetText = {
  fontSize: "15px",
  color: "#1e293b",
  margin: "0",
  fontStyle: "italic" as const,
  lineHeight: "1.5",
};

const noInterestText = {
  fontSize: "14px",
  color: "#94a3b8",
  margin: "0",
  fontStyle: "italic" as const,
};

// Budget Section
const budgetCard = {
  padding: "28px 48px",
  backgroundColor: "#ecfdf5",
  borderBottom: "1px solid #a7f3d0",
};

const budgetValue = {
  fontSize: "18px",
  fontWeight: "700" as const,
  color: "#047857",
  margin: "0",
};

// Divider & Footer
const divider = {
  borderColor: "#e2e8f0",
  margin: "0",
};

const footer = {
  padding: "24px 48px 32px",
  textAlign: "center" as const,
};

const footerDate = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "0 0 16px",
};

const footerCta = {
  display: "inline-block",
  backgroundColor: "#0f172a",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600" as const,
  textDecoration: "none",
};
