import Image from "next/image";
import { BlobBackground } from "../BlobBackground";

const pillars = [
  {
    num: "01",
    title: "Sur mesure",
    body: "Agents Claude + serveurs MCP + skill files, construits autour des workflows de VOTRE cabinet. Pas un template SaaS, pas un chatbot générique.",
    accent: "Vos opérations, codifiées.",
  },
  {
    num: "02",
    title: "Souveraineté des données",
    body: "Serveurs MCP déployables on-premise. API Anthropic : zéro rétention pour entraînement (contractuel). Conforme RGPD, SOC 2 en cours.",
    accent: "Vos données ne quittent pas votre périmètre.",
  },
  {
    num: "03",
    title: "Delivery menée par un senior",
    body: "Un seul architecte du discovery au déploiement. Pas de relais junior. Pas d'account manager. Pas de couche commerciale entre vous et l'exécution.",
    accent: "Vous parlez à la personne qui construit.",
  },
  {
    num: "04",
    title: "Opérations embarquées",
    body: "Le retainer mensuel maintient le système vivant : nouvelles automations, monitoring, correctifs. Le système grandit avec le cabinet.",
    accent: "Pas de pourrissement en production.",
  },
];

export function AiOpsPage3Approach() {
  return (
    <>
      <BlobBackground variant="center" intensity="subtle" />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "8mm",
          right: "16mm",
          fontFamily: "var(--font-btn), Georgia, serif",
          fontStyle: "italic",
          fontSize: "220pt",
          fontWeight: 400,
          color: "rgba(56,189,248,0.07)",
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        03
      </div>

      <div
        className="pdf-content-landscape"
        style={{
          inset: "14mm",
          zIndex: 2,
          justifyContent: "space-between",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            src="/logo.svg"
            alt="Stellar Wave"
            width={150}
            height={34}
            priority
            style={{ height: "9mm", width: "auto" }}
          />
          <div
            className="pdf-micro-caps"
            style={{
              color: "#38bdf8",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "9pt",
            }}
          >
            <span
              style={{
                width: "12mm",
                height: "1px",
                background: "#38bdf8",
              }}
            />
            La cinquième voie
          </div>
        </div>

        {/* H1 */}
        <div style={{ marginTop: "2mm" }}>
          <h1
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "54pt",
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              maxWidth: "220mm",
            }}
          >
            Des opérations IA{" "}
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              sur mesure.
            </span>{" "}
            Livrées en{" "}
            <span style={{ color: "#ffffff", fontWeight: 700 }}>semaines.</span>{" "}
            Possédées par{" "}
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              vous.
            </span>
          </h1>
        </div>

        {/* 4 piliers en grille 2x2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4mm",
            flex: 1,
            marginTop: "4mm",
            marginBottom: "4mm",
          }}
        >
          {pillars.map((p) => (
            <PillarCard key={p.num} {...p} />
          ))}
        </div>

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "3mm",
            borderTop: "1px solid rgba(56,189,248,0.15)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "9.5pt",
              color: "#94a3b8",
            }}
          >
            stellarwave.fr/operations-ia · amar@stellarwave.fr
          </div>
          <div
            className="pdf-page-number"
            style={{ color: "#38bdf8", fontSize: "9pt" }}
          >
            <span style={{ color: "#94a3b8" }}>PAGE</span> 03{" "}
            <span style={{ color: "#475569" }}>/</span>{" "}
            <span style={{ color: "#94a3b8" }}>10</span>
          </div>
        </div>
      </div>
    </>
  );
}

function PillarCard({
  num,
  title,
  body,
  accent,
}: {
  num: string;
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "14px",
        padding: "6mm 7mm 6mm",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "3mm",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "7mm",
          width: "14mm",
          height: "1.5px",
          background: "#38bdf8",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "5mm",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-btn), Georgia, serif",
            fontStyle: "italic",
            fontSize: "16pt",
            color: "rgba(56,189,248,0.55)",
            lineHeight: 1,
          }}
        >
          {num}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "17pt",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.015em",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {title}
        </h3>
      </div>

      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "10pt",
          color: "#cbd5e1",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {body}
      </p>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "3mm",
          borderTop: "1px solid rgba(56,189,248,0.15)",
          fontFamily: "var(--font-btn), Georgia, serif",
          fontStyle: "italic",
          fontSize: "12pt",
          color: "#38bdf8",
          lineHeight: 1.3,
        }}
      >
        {accent}
      </div>
    </div>
  );
}
