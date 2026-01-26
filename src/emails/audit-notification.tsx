import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { AuditEmailData } from "@/lib/resend";

type AuditNotificationEmailProps = AuditEmailData;

export function AuditNotificationEmail({
  email,
  url,
}: AuditNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nouvelle demande de mini-audit pour {url}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>🔍 Nouvelle demande de mini-audit</Heading>

          <Section style={section}>
            <Text style={text}>
              <strong>Email :</strong>{" "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            <Text style={text}>
              <strong>Site à auditer :</strong>{" "}
              <Link href={url} style={link}>
                {url}
              </Link>
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Actions à effectuer
            </Heading>
            <Text style={checklistItem}>☐ Lancer l&apos;audit Lighthouse</Text>
            <Text style={checklistItem}>☐ Analyser le SEO technique</Text>
            <Text style={checklistItem}>☐ Préparer les recommandations</Text>
            <Text style={checklistItem}>☐ Envoyer le rapport PDF sous 24h</Text>
          </Section>

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

export default AuditNotificationEmail;

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

const checklistItem = {
  fontSize: "14px",
  lineHeight: "32px",
  color: "#525f7f",
  margin: "0",
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
