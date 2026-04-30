import Image from "next/image";
import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { BlobBackground } from "./BlobBackground";
import { MetricCard } from "./MetricCard";
import { caseStudies } from "@/config/brand";

// Override commercial : on masque les noms de techno (React, Supabase,
// Next.js, Expo, Stripe, Workbox, Framer Motion, PWA…) pour rester sur
// des bénéfices métier compréhensibles par un dirigeant.
const csOverrides: Record<
  string,
  { action: string; results: string[] }
> = {
  fidelya: {
    action:
      "Plateforme tout-en-un : programme de fidélité, caisse en ligne et portail membres. Connexion sans mot de passe, fonctionne hors connexion.",
    results: [
      "Modules : CRM + Caisse + Portail",
      "Connexion : QR code instantané",
      "Mode hors-ligne : activé",
    ],
  },
  boatacademy: {
    action:
      "Triple solution : back-office web pour les écoles, application mobile iOS & Android pour les élèves, paiement en ligne sécurisé.",
    results: [
      "Plateformes : Web + iOS + Android",
      "Une seule base pour 3 plateformes",
      "Paiement : intégré et sécurisé",
    ],
  },
  onmangequoi: {
    action:
      "Annuaire web installable sur mobile, formulaires d'inscription publics, tableau de modération admin. Fonctionne sans connexion.",
    results: [
      "Type : Web installable",
      "Fonctions : Onboarding + Admin",
      "Mode hors-ligne : activé",
    ],
  },
  "ra-batiment": {
    action:
      "Site vitrine premium, animations soignées, portfolio avant/après, formulaire de devis qualifié, optimisation SEO locale.",
    results: [
      "Lighthouse : 95+",
      "Animations : haut de gamme",
      "SEO : optimisé local",
    ],
  },
};

const formattedMetrics = [
  {
    label: "Lighthouse",
    before: "45",
    after: "98",
    sublabel: "Performance, accessibilité, SEO",
  },
  {
    label: "TTFB",
    before: "2.4 s",
    after: "180 ms",
    sublabel: "Time to First Byte serveur",
  },
  {
    label: "Conversion",
    before: "1.2 %",
    after: "4.8 %",
    sublabel: "Taux de conversion moyen",
  },
  {
    label: "Coûts infra",
    before: "100 %",
    after: "− 65 %",
    sublabel: "Réduction mensuelle d'hébergement",
  },
];

export function Page6CaseStudies() {
  return (
    <>
      <BlobBackground variant="bottom-right" intensity="subtle" />

      {/* Numéro jumbo top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20mm",
          right: "10mm",
          fontFamily: "var(--font-btn), Georgia, serif",
          fontStyle: "italic",
          fontSize: "120pt",
          fontWeight: 400,
          color: "rgba(56,189,248,0.05)",
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        06
      </div>

      <PageHeader pageNumber="06" pageLabel="Ils nous font confiance" />

      <div
        className="pdf-content"
        style={{ inset: "30mm 14mm 24mm 14mm", zIndex: 2 }}
      >
        {/* TITRE ZONE A */}
        <div style={{ marginBottom: "4mm" }}>
          <h2
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "26pt",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            Des projets{" "}
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              qui parlent
            </span>{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              d&apos;eux-mêmes.
            </span>
          </h2>
        </div>

        {/* GRILLE 2x2 case studies */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3mm",
            marginBottom: "5mm",
          }}
        >
          {caseStudies.map((cs) => {
            const override = csOverrides[cs.id];
            return (
              <CaseStudyCard
                key={cs.id}
                client={cs.client}
                industry={cs.industry}
                context={cs.context}
                action={override?.action ?? cs.action}
                results={
                  override?.results ??
                  cs.results.map((r) => `${r.metric} : ${r.after}`)
                }
                image={cs.image}
              />
            );
          })}
        </div>

        {/* Hairline + Titre Zone B */}
        <div
          className="pdf-hairline"
          style={{ marginBottom: "4mm" }}
        />
        <div style={{ marginBottom: "3.5mm" }}>
          <div
            className="pdf-micro-caps"
            style={{ color: "#38bdf8", marginBottom: "1.5mm", fontSize: "7.5pt" }}
          >
            Preuve chiffrée · Projets 2024-2025
          </div>
          <h2
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "20pt",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            La performance,{" "}
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              ça se mesure
            </span>
            .
          </h2>
        </div>

        {/* 4 METRIC CARDS before/after */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2.5mm",
            marginBottom: "5mm",
          }}
        >
          {formattedMetrics.map((m) => (
            <MetricCard
              key={m.label}
              variant="before-after"
              value=""
              label={m.label}
              before={m.before}
              after={m.after}
              sublabel={m.sublabel}
            />
          ))}
        </div>

        {/* CITATION engagement */}
        <div style={{ position: "relative" }}>
          <div className="pdf-hairline-solid" style={{ marginBottom: "4mm" }} />
          <blockquote
            style={{
              margin: 0,
              padding: "0 8mm",
              position: "relative",
              textAlign: "center",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: "-4mm",
                left: "0",
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontSize: "32pt",
                color: "rgba(56,189,248,0.4)",
                lineHeight: 1,
              }}
            >
              «
            </span>
            <span
              aria-hidden
              style={{
                position: "absolute",
                bottom: "-7mm",
                right: "0",
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontSize: "32pt",
                color: "rgba(56,189,248,0.4)",
                lineHeight: 1,
              }}
            >
              »
            </span>
            <p
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "11.5pt",
                lineHeight: 1.4,
                color: "#ffffff",
                margin: 0,
              }}
            >
              100 % de projets livrés à temps. Moins de 48 h de délai de
              réponse moyen. Et zéro projet refacturé pour dépassement.
            </p>
            <div
              style={{
                marginTop: "2mm",
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontSize: "7pt",
                color: "#94a3b8",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              — Notre engagement contractuel
            </div>
          </blockquote>
          <div
            className="pdf-hairline-solid"
            style={{ marginTop: "4mm" }}
          />
        </div>
      </div>

      <PageFooter pageNumber="06" />
    </>
  );
}

function CaseStudyCard({
  client,
  industry,
  context,
  action,
  results,
  image,
}: {
  client: string;
  industry: string;
  context: string;
  action: string;
  results: string[];
  image: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "10px",
        padding: "3.5mm 4.5mm 3.5mm",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "5mm",
          width: "10mm",
          height: "1.5px",
          background: "#38bdf8",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2mm",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
          <h3
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "11pt",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {client}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "7pt",
              color: "#94a3b8",
              letterSpacing: "0.05em",
            }}
          >
            · {industry}
          </span>
        </div>
        {image && (
          <div
            style={{
              width: "10mm",
              height: "10mm",
              borderRadius: "5px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(56,189,248,0.15)",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src={image}
              alt={client}
              fill
              style={{ objectFit: "cover" }}
              sizes="40px"
            />
          </div>
        )}
      </div>

      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "7.5pt",
          color: "#cbd5e1",
          lineHeight: 1.35,
          margin: "0 0 2mm 0",
        }}
      >
        {context}
      </p>

      <div
        className="pdf-micro-caps"
        style={{
          color: "#38bdf8",
          fontSize: "6pt",
          marginBottom: "1mm",
        }}
      >
        Action
      </div>
      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "7.5pt",
          color: "#cbd5e1",
          lineHeight: 1.35,
          margin: "0 0 2.5mm 0",
        }}
      >
        {action}
      </p>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "2mm",
          borderTop: "1px dashed rgba(56,189,248,0.2)",
          display: "flex",
          flexWrap: "wrap",
          gap: "1mm 2.5mm",
        }}
      >
        {results.map((r) => (
          <span
            key={r}
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "6.5pt",
              color: "#cbd5e1",
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>→</span>
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
