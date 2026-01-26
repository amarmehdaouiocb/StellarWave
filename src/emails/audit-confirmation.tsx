import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type AuditConfirmationEmailProps = {
  url: string;
};

export function AuditConfirmationEmail({ url }: AuditConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Votre mini-audit est en préparation - Stellar Wave
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>✦ Stellar Wave</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>
              Votre mini-audit est en préparation ! 🔍
            </Heading>

            <Text style={text}>
              Merci de votre intérêt pour notre mini-audit Performance & SEO.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                <strong>Site analysé :</strong>
              </Text>
              <Text style={urlText}>{url}</Text>
            </Section>

            <Text style={text}>
              <strong>Ce que vous allez recevoir sous 24h :</strong>
            </Text>

            <Section style={featuresList}>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Score Lighthouse détaillé
                (Performance, SEO, Accessibilité)
              </Text>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Audit SEO technique complet
              </Text>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Recommandations priorisées par
                impact
              </Text>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Estimation des gains potentiels
              </Text>
            </Section>

            <Text style={text}>
              Si vous avez des questions en attendant, n&apos;hésitez pas à nous
              contacter.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href="https://stellarwave.fr/#contact">
                Nous contacter
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              Stellar Wave - Product & Cloud Studio
            </Text>
            <Text style={footerText}>
              Paris, France | contact@stellarwave.fr
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default AuditConfirmationEmail;

// Styles
const main = {
  backgroundColor: "#0a0a0b",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#121214",
  margin: "0 auto",
  borderRadius: "12px",
  overflow: "hidden",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#1a1a1e",
  padding: "24px 48px",
  textAlign: "center" as const,
};

const logoText = {
  color: "#f59e0b",
  fontSize: "20px",
  fontWeight: "700",
  margin: 0,
};

const content = {
  padding: "48px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#ffffff",
  margin: "0 0 24px",
  lineHeight: "1.3",
};

const text = {
  fontSize: "15px",
  lineHeight: "26px",
  color: "#a1a1aa",
  margin: "16px 0",
};

const highlightBox = {
  margin: "24px 0",
  padding: "20px",
  backgroundColor: "#1a1a1e",
  borderRadius: "8px",
  borderLeft: "4px solid #f59e0b",
};

const highlightText = {
  fontSize: "14px",
  color: "#a1a1aa",
  margin: "0 0 8px",
};

const urlText = {
  fontSize: "16px",
  color: "#f59e0b",
  margin: "0",
  wordBreak: "break-all" as const,
};

const featuresList = {
  margin: "24px 0",
};

const featureItem = {
  fontSize: "14px",
  lineHeight: "32px",
  color: "#d4d4d8",
  margin: "0",
};

const checkmark = {
  color: "#22c55e",
  marginRight: "8px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#f59e0b",
  borderRadius: "8px",
  color: "#000000",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#27272a",
  margin: "0",
};

const footer = {
  padding: "24px 48px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#71717a",
  margin: "4px 0",
};
