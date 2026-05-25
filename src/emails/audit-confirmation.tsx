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
  /** True si le PDF est en pièce jointe (email final) */
  ready?: boolean;
  /** True si le pipeline a échoué et que l'équipe a été alertée */
  delayed?: boolean;
};

export function AuditConfirmationEmail({
  url,
  ready = false,
  delayed = false,
}: AuditConfirmationEmailProps) {
  if (ready) return <ReadyEmail url={url} />;
  if (delayed) return <DelayedEmail url={url} />;
  return <PendingEmail url={url} />;
}

// Email envoyé immédiatement après soumission du formulaire
function PendingEmail({ url }: { url: string }) {
  return (
    <Html>
      <Head />
      <Preview>Votre mini-audit arrive dans quelques minutes</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>✦ Stellar Wave</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>
              Votre mini-audit est en route 🚀
            </Heading>

            <Text style={text}>
              Merci de votre demande. Notre système analyse votre site en ce
              moment.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                <strong>Site analysé :</strong>
              </Text>
              <Text style={urlText}>{url}</Text>
            </Section>

            <Text style={text}>
              <strong>
                Vous recevrez votre rapport PDF par email dans 5 à 10 minutes
                maximum.
              </strong>
            </Text>

            <Section style={featuresList}>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Score performance détaillé
                (mobile + desktop)
              </Text>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Audit SEO complet et actionnable
              </Text>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Recommandations classées par
                impact
              </Text>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Estimation chiffrée des gains
              </Text>
            </Section>

            <Text style={text}>
              Une question d&apos;ici là ? Nous sommes joignables à tout moment.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href="https://stellarwave.fr/#contact">
                Nous contacter
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />
          <FooterBlock />
        </Container>
      </Body>
    </Html>
  );
}

// Email final avec PDF en pièce jointe
function ReadyEmail({ url }: { url: string }) {
  return (
    <Html>
      <Head />
      <Preview>Votre mini-audit Performance & SEO est prêt</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>✦ Stellar Wave</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>
              Votre mini-audit est arrivé 📊
            </Heading>

            <Text style={text}>
              Bonne nouvelle : le rapport complet est en pièce jointe de cet
              email.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                <strong>Site analysé :</strong>
              </Text>
              <Text style={urlText}>{url}</Text>
            </Section>

            <Text style={text}>
              <strong>Au programme du PDF :</strong>
            </Text>

            <Section style={featuresList}>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Scores Performance, SEO,
                Accessibilité, Bonnes pratiques (mobile + desktop)
              </Text>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Core Web Vitals chiffrés (LCP,
                FCP, CLS, TBT, Speed Index)
              </Text>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> 12 points de contrôle SEO
                technique avec ✓/✗
              </Text>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> Top 6 recommandations
                priorisées par impact
              </Text>
            </Section>

            <Text style={text}>
              Envie d&apos;un coup de main pour mettre en œuvre ces
              recommandations ? Premier échange offert, sans engagement.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href="https://stellarwave.fr/#contact">
                Discutons-en
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />
          <FooterBlock />
        </Container>
      </Body>
    </Html>
  );
}

// Email de retard si le pipeline a échoué
function DelayedEmail({ url }: { url: string }) {
  return (
    <Html>
      <Head />
      <Preview>Votre audit prend un peu plus de temps que prévu</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>✦ Stellar Wave</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>
              Petit délai sur votre audit
            </Heading>

            <Text style={text}>
              Notre système d&apos;audit a rencontré une difficulté en
              analysant votre site.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                <strong>Site concerné :</strong>
              </Text>
              <Text style={urlText}>{url}</Text>
            </Section>

            <Text style={text}>
              <strong>Notre équipe a été alertée</strong> et reprend la main
              manuellement. Vous recevrez votre rapport au plus tard sous 24
              heures.
            </Text>

            <Text style={text}>
              Toutes nos excuses pour ce délai. Si vous voulez nous joindre
              directement :
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href="mailto:contact@stellarwave.fr">
                Écrire à l&apos;équipe
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />
          <FooterBlock />
        </Container>
      </Body>
    </Html>
  );
}

function FooterBlock() {
  return (
    <Section style={footer}>
      <Text style={footerText}>Stellar Wave — Éditeur de logiciels</Text>
      <Text style={footerText}>Île-de-France, France | contact@stellarwave.fr</Text>
    </Section>
  );
}

export default AuditConfirmationEmail;

// Styles — fond sombre cohérent avec la plaquette
const main = {
  backgroundColor: "#020617",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#0f172a",
  margin: "0 auto",
  borderRadius: "12px",
  overflow: "hidden",
  maxWidth: "600px",
  border: "1px solid rgba(56, 189, 248, 0.15)",
};

const header = {
  backgroundColor: "#020617",
  padding: "24px 48px",
  textAlign: "center" as const,
};

const logoText = {
  color: "#38bdf8",
  fontSize: "20px",
  fontWeight: "700",
  margin: 0,
  letterSpacing: "1px",
};

const content = {
  padding: "40px 48px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#ffffff",
  margin: "0 0 24px",
  lineHeight: "1.3",
  letterSpacing: "-0.3px",
};

const text = {
  fontSize: "15px",
  lineHeight: "26px",
  color: "#cbd5e1",
  margin: "16px 0",
};

const highlightBox = {
  margin: "24px 0",
  padding: "20px",
  backgroundColor: "#1e293b",
  borderRadius: "8px",
  borderLeft: "4px solid #38bdf8",
};

const highlightText = {
  fontSize: "13px",
  color: "#94a3b8",
  margin: "0 0 8px",
  letterSpacing: "0.5px",
  textTransform: "uppercase" as const,
};

const urlText = {
  fontSize: "16px",
  color: "#38bdf8",
  margin: "0",
  wordBreak: "break-all" as const,
  fontWeight: "600",
};

const featuresList = {
  margin: "24px 0",
};

const featureItem = {
  fontSize: "14px",
  lineHeight: "32px",
  color: "#cbd5e1",
  margin: "0",
};

const checkmark = {
  color: "#38bdf8",
  marginRight: "10px",
  fontWeight: "700",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0 8px",
};

const button = {
  background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
  borderRadius: "999px",
  color: "#000000",
  fontSize: "14px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 28px",
  letterSpacing: "0.2px",
};

const hr = {
  borderColor: "rgba(56, 189, 248, 0.15)",
  margin: "0",
};

const footer = {
  padding: "24px 48px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#64748b",
  margin: "4px 0",
};
