import Image from "next/image";
import { BlobBackground } from "../BlobBackground";

const painPoints = [
  {
    num: "01",
    title: "Onboarding client",
    bigValue: "8 h",
    bigLabel: "par nouveau client",
    body: "KYC, ouverture de compte, rédaction du DEC, dossier dépositaire. Une journée senior perdue à chaque entrée en relation.",
  },
  {
    num: "02",
    title: "Réponses aux AO",
    bigValue: "5 800 h",
    bigLabel: "par an (équipe 10)",
    body: "Les AO institutionnels consomment jusqu'à 23 % de la capacité totale. Du contenu déjà écrit que personne ne retrouve à temps.",
  },
  {
    num: "03",
    title: "Revues conformité",
    bigValue: "30 – 40 %",
    bigLabel: "du coût admin",
    body: "Lecture des évolutions ACPR / AMF, traçabilité, reportings — règles fixes traitées à la main par des gens payés à conseiller.",
  },
];

export function AiOpsPage2Problem() {
  return (
    <>
      <BlobBackground variant="top-right" intensity="subtle" />

      {/* Numéro jumbo */}
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
        02
      </div>

      <div
        className="pdf-content-landscape"
        style={{
          inset: "14mm",
          zIndex: 2,
          justifyContent: "space-between",
        }}
      >
        {/* HEADER mini */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            src="/logo.svg"
            alt="StellarWave"
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
            Le coût invisible
          </div>
        </div>

        {/* HERO — stat 30% + sous-stat */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "16mm",
            alignItems: "center",
            marginTop: "2mm",
          }}
        >
          <div
            className="text-gradient"
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "180pt",
              fontWeight: 800,
              letterSpacing: "-0.06em",
              lineHeight: 0.85,
            }}
          >
            30 %
          </div>
          <div>
            <h2
              style={{
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontSize: "30pt",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "rgba(255,255,255,0.7)",
                margin: 0,
                maxWidth: "150mm",
              }}
            >
              du temps de vos meilleurs conseillers part en{" "}
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  color: "#38bdf8",
                  fontWeight: 400,
                }}
              >
                tâches
              </span>{" "}
              <span style={{ color: "#ffffff", fontWeight: 600 }}>
                automatisables.
              </span>
            </h2>
            <p
              style={{
                marginTop: "6mm",
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontSize: "12pt",
                color: "#94a3b8",
                lineHeight: 1.5,
                margin: "6mm 0 0 0",
                maxWidth: "150mm",
              }}
            >
              Onboarding, AO, conformité, reporting trimestriel — les tâches
              que personne ne facture, qui rongent silencieusement vos
              collaborateurs les mieux payés.
            </p>
          </div>
        </div>

        {/* 3 cards de douleurs */}
        <div>
          <div
            className="pdf-micro-caps"
            style={{
              color: "#94a3b8",
              marginBottom: "3mm",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "8pt",
            }}
          >
            <span
              style={{
                width: "8mm",
                height: "1px",
                background: "rgba(148,163,184,0.5)",
              }}
            />
            Trois douleurs, mesurées dans la profession
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "4mm",
            }}
          >
            {painPoints.map((p) => (
              <PainCard key={p.num} {...p} />
            ))}
          </div>
        </div>

        {/* BANDEAU violet — coût total */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(56,189,248,0.06) 100%)",
            border: "1px solid rgba(167,139,250,0.30)",
            borderRadius: "12px",
            padding: "5mm 7mm",
            display: "flex",
            alignItems: "center",
            gap: "8mm",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-btn), Georgia, serif",
              fontStyle: "italic",
              fontSize: "44pt",
              color: "#a78bfa",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            165 k€
          </div>
          <div
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "12pt",
              color: "#cbd5e1",
              lineHeight: 1.45,
              flex: 1,
            }}
          >
            <span style={{ color: "#ffffff", fontWeight: 600 }}>
              À 250 € l&apos;heure chargé, un cabinet de 5 conseillers perd
              165 k€+ de capacité senior par an.
            </span>{" "}
            <span style={{ color: "#94a3b8" }}>
              Sans qu&apos;aucun client ne le remarque. Sans qu&apos;aucune
              ligne du P&amp;L ne le révèle.
            </span>
          </div>
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
              fontSize: "8pt",
              color: "#475569",
              maxWidth: "180mm",
              lineHeight: 1.4,
            }}
          >
            ¹ RFXAI · ² Empaxis · ³ Calcul interne (5 × 10 h × 250 € × 50 sem =
            625 k€, plancher 165 k€).
          </div>
          <div
            className="pdf-page-number"
            style={{ color: "#38bdf8", fontSize: "9pt" }}
          >
            <span style={{ color: "#94a3b8" }}>PAGE</span> 02{" "}
            <span style={{ color: "#475569" }}>/</span>{" "}
            <span style={{ color: "#94a3b8" }}>10</span>
          </div>
        </div>
      </div>
    </>
  );
}

function PainCard({
  num,
  title,
  bigValue,
  bigLabel,
  body,
}: {
  num: string;
  title: string;
  bigValue: string;
  bigLabel: string;
  body: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "12px",
        padding: "5mm 6mm 6mm",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "2.5mm",
        minHeight: "55mm",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "6mm",
          width: "12mm",
          height: "1.5px",
          background: "#38bdf8",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "4mm",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-btn), Georgia, serif",
            fontStyle: "italic",
            fontSize: "14pt",
            color: "rgba(56,189,248,0.55)",
            lineHeight: 1,
          }}
        >
          {num}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "13pt",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {title}
        </h3>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "4mm",
          marginTop: "1mm",
        }}
      >
        <span
          className="text-gradient"
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "40pt",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {bigValue}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "9pt",
            color: "#94a3b8",
            fontWeight: 500,
          }}
        >
          {bigLabel}
        </span>
      </div>

      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "9.5pt",
          color: "#cbd5e1",
          lineHeight: 1.45,
          margin: 0,
          marginTop: "auto",
        }}
      >
        {body}
      </p>
    </div>
  );
}
