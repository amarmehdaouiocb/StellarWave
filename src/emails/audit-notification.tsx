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
import type { PsiCategoryScores } from "@/lib/supabase";

type AuditNotificationEmailProps = {
  email: string;
  url: string;
  /** True si l'audit a été livré (envoyé après le pipeline) */
  completed?: boolean;
  mobileScores?: PsiCategoryScores | null;
  desktopScores?: PsiCategoryScores | null;
};

export function AuditNotificationEmail({
  email,
  url,
  completed = false,
  mobileScores,
  desktopScores,
}: AuditNotificationEmailProps) {
  if (completed) {
    return <CompletedEmail email={email} url={url} mobileScores={mobileScores} desktopScores={desktopScores} />;
  }
  return <PendingEmail email={email} url={url} />;
}

function PendingEmail({ email, url }: { email: string; url: string }) {
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
            <Text style={text}>
              ⚙️ Pipeline auto en cours d&apos;exécution. Le PDF sera envoyé au
              prospect dans quelques minutes (PSI mobile + desktop, audit SEO,
              génération PDF, envoi Resend). Tu recevras un mail de confirmation
              à la fin avec les scores.
            </Text>
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

function CompletedEmail({
  email,
  url,
  mobileScores,
  desktopScores,
}: {
  email: string;
  url: string;
  mobileScores?: PsiCategoryScores | null;
  desktopScores?: PsiCategoryScores | null;
}) {
  return (
    <Html>
      <Head />
      <Preview>Audit livré : {url}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>✅ Audit livré au prospect</Heading>

          <Section style={section}>
            <Text style={text}>
              <strong>Email :</strong>{" "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            <Text style={text}>
              <strong>Site analysé :</strong>{" "}
              <Link href={url} style={link}>
                {url}
              </Link>
            </Text>
          </Section>

          {(mobileScores || desktopScores) && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading as="h2" style={subheading}>
                  Résumé des scores
                </Heading>
                {mobileScores && (
                  <Text style={text}>
                    <strong>Mobile :</strong> Perf {mobileScores.performance} ·
                    SEO {mobileScores.seo} · A11y {mobileScores.accessibility} ·
                    Best practices {mobileScores.bestPractices}
                  </Text>
                )}
                {desktopScores && (
                  <Text style={text}>
                    <strong>Desktop :</strong> Perf {desktopScores.performance}{" "}
                    · SEO {desktopScores.seo} · A11y{" "}
                    {desktopScores.accessibility} · Best practices{" "}
                    {desktopScores.bestPractices}
                  </Text>
                )}
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Section style={section}>
            <Text style={text}>
              💡 Tu peux maintenant relancer le prospect d&apos;ici 3-5 jours
              pour proposer un appel découverte basé sur les recos du PDF.
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Livré le {new Date().toLocaleDateString("fr-FR")} à{" "}
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

const link = {
  color: "#0ea5e9",
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
