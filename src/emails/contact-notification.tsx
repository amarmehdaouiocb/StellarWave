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
} from "@react-email/components";
import type { ContactEmailData } from "@/lib/resend";

const projectTypeLabels: Record<string, string> = {
  "landing-page": "Landing page premium",
  website: "Site web / vitrine",
  "web-app": "Application web (SaaS, dashboard...)",
  "mobile-app": "Application mobile (iOS/Android)",
  cloud: "Architecture cloud / DevOps",
  other: "Autre",
};

const budgetLabels: Record<string, string> = {
  "5k-10k": "5 000€ - 10 000€",
  "10k-25k": "10 000€ - 25 000€",
  "25k-50k": "25 000€ - 50 000€",
  "50k-100k": "50 000€ - 100 000€",
  "100k+": "Plus de 100 000€",
  unknown: "Je ne sais pas encore",
};

const timelineLabels: Record<string, string> = {
  asap: "Dès que possible",
  "1-2months": "1 à 2 mois",
  "3-6months": "3 à 6 mois",
  "6months+": "Plus de 6 mois",
  flexible: "Flexible",
};

const referralLabels: Record<string, string> = {
  google: "Recherche Google",
  linkedin: "LinkedIn",
  referral: "Recommandation",
  social: "Réseaux sociaux",
  other: "Autre",
};

type ContactNotificationEmailProps = ContactEmailData;

export function ContactNotificationEmail({
  firstName,
  lastName,
  email,
  phone,
  company,
  projectType,
  budget,
  timeline,
  description,
  existingUrl,
  referralSource,
}: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Nouvelle demande de {firstName} {lastName} - {projectTypeLabels[projectType]}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>🚀 Nouvelle demande de devis</Heading>

          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Contact
            </Heading>
            <Text style={text}>
              <strong>Nom :</strong> {firstName} {lastName}
            </Text>
            <Text style={text}>
              <strong>Email :</strong>{" "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            {phone && (
              <Text style={text}>
                <strong>Téléphone :</strong>{" "}
                <Link href={`tel:${phone}`} style={link}>
                  {phone}
                </Link>
              </Text>
            )}
            {company && (
              <Text style={text}>
                <strong>Entreprise :</strong> {company}
              </Text>
            )}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Projet
            </Heading>
            <Text style={text}>
              <strong>Type :</strong> {projectTypeLabels[projectType]}
            </Text>
            <Text style={text}>
              <strong>Budget :</strong> {budgetLabels[budget]}
            </Text>
            <Text style={text}>
              <strong>Délai :</strong> {timelineLabels[timeline]}
            </Text>
            {existingUrl && (
              <Text style={text}>
                <strong>Site existant :</strong>{" "}
                <Link href={existingUrl} style={link}>
                  {existingUrl}
                </Link>
              </Text>
            )}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Description du projet
            </Heading>
            <Text style={descriptionText}>{description}</Text>
          </Section>

          {referralSource && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Text style={text}>
                  <strong>Source :</strong> {referralLabels[referralSource]}
                </Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Text style={footer}>
            Reçu le {new Date().toLocaleDateString("fr-FR")} à{" "}
            {new Date().toLocaleTimeString("fr-FR")}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#1a1a1a",
  padding: "0 48px",
  margin: "32px 0 24px",
};

const subheading = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1a1a1a",
  margin: "0 0 16px",
};

const section = {
  padding: "0 48px",
};

const text = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#525f7f",
  margin: "8px 0",
};

const descriptionText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#525f7f",
  backgroundColor: "#f8fafc",
  padding: "16px",
  borderRadius: "8px",
  whiteSpace: "pre-wrap" as const,
};

const link = {
  color: "#f59e0b",
  textDecoration: "none",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  fontSize: "12px",
  color: "#8898aa",
  padding: "0 48px",
};
