import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactConfirmationEmailProps = {
  firstName: string;
};

export function ContactConfirmationEmail({
  firstName,
}: ContactConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Merci {firstName} ! Nous avons bien reçu votre demande - Stellar Wave
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>✦ Stellar Wave</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>
              Merci pour votre demande, {firstName} !
            </Heading>

            <Text style={text}>
              Nous avons bien reçu votre demande de devis et notre équipe
              l&apos;analyse actuellement.
            </Text>

            <Text style={text}>
              <strong>Prochaines étapes :</strong>
            </Text>

            <Section style={stepsContainer}>
              <Text style={stepText}>
                <span style={stepNumber}>1</span> Analyse de votre demande par
                notre équipe
              </Text>
              <Text style={stepText}>
                <span style={stepNumber}>2</span> Prise de contact sous 24-48h
                pour un premier échange
              </Text>
              <Text style={stepText}>
                <span style={stepNumber}>3</span> Proposition détaillée avec
                planning et budget
              </Text>
            </Section>

            <Text style={text}>
              En attendant, n&apos;hésitez pas à consulter nos études de cas
              pour découvrir notre travail.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href="https://stellarwave.fr/#case-studies">
                Voir nos réalisations
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

export default ContactConfirmationEmail;

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

const stepsContainer = {
  margin: "24px 0",
  padding: "24px",
  backgroundColor: "#1a1a1e",
  borderRadius: "8px",
};

const stepText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#d4d4d8",
  margin: "12px 0",
  display: "flex" as const,
  alignItems: "center" as const,
};

const stepNumber = {
  display: "inline-block",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: "#f59e0b",
  color: "#000000",
  fontSize: "12px",
  fontWeight: "600",
  textAlign: "center" as const,
  lineHeight: "24px",
  marginRight: "12px",
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
