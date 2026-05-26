import Image from "next/image";
import { BlobBackground } from "../BlobBackground";

const reasons = [
  {
    num: "01",
    title: "Aucune mission à porter",
    desc: "On gère audit, devis, livraison, support. Vous gardez votre métier.",
  },
  {
    num: "02",
    title: "Clients fidélisés",
    desc: "L'outil devient leur quotidien. Ils ne quittent plus leur cabinet.",
  },
  {
    num: "03",
    title: "Commission à l'encaissement",
    desc: "Versement 30 j après chaque facture client. Pas d'avance.",
  },
  {
    num: "04",
    title: "Aucune exclusivité",
    desc: "Aucun engagement de volume. Vous proposez quand ça a du sens.",
  },
];

export function PartenariatComptablesPage1() {
  return (
    <>
      <BlobBackground variant="top-left" intensity="default" />

      {/* Numéro jumbo top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "8mm",
          right: "12mm",
          fontFamily: "var(--font-btn), Georgia, serif",
          fontStyle: "italic",
          fontSize: "180pt",
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
        className="pdf-content"
        style={{ inset: "16mm", zIndex: 2, justifyContent: "space-between" }}
      >
        {/* TOP — logo + tagline */}
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
            width={220}
            height={50}
            priority
            style={{ height: "8mm", width: "auto" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "8mm",
                height: "1px",
                background: "rgba(56,189,248,0.5)",
              }}
            />
            <span
              className="pdf-micro-caps"
              style={{ color: "#94a3b8" }}
            >
              Suite du pitch
            </span>
          </div>
        </div>

        {/* HERO */}
        <div style={{ marginTop: "4mm", marginRight: "20mm" }}>
          <div
            className="pdf-micro-caps"
            style={{
              color: "#38bdf8",
              marginBottom: "6mm",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "12mm",
                height: "1px",
                background: "#38bdf8",
              }}
            />
            Programme partenariat · Cabinets comptables · 2026
          </div>

          <h1
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "70pt",
              fontWeight: 300,
              lineHeight: 0.94,
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            Le partenariat
            <br />
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              qui
            </span>{" "}
            rémunère votre{" "}
            <span
              style={{
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.045em",
              }}
            >
              réseau.
            </span>
          </h1>

          <p
            style={{
              marginTop: "8mm",
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "13pt",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "#cbd5e1",
              maxWidth: "155mm",
              margin: "8mm 0 0 0",
            }}
          >
            Vous présentez un client PME, on conçoit le digital sur mesure
            dont il a besoin.{" "}
            <span style={{ color: "#94a3b8" }}>
              10 % du contrat signé vous revient — à l&apos;encaissement,
              sans engagement.
            </span>
          </p>
        </div>

        {/* CONSTAT vs OFFRE — 2 cards */}
        <div>
          <div
            className="pdf-micro-caps"
            style={{
              color: "#94a3b8",
              marginBottom: "4mm",
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
            Pourquoi cet alignement marche
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4mm",
            }}
          >
            <CompareCard
              label="Le constat"
              labelColor="#fb7185"
              title="Vos clients ont un retard digital."
              body="Site qui date, pas d'app, tout sur Excel, zéro automatisation. Au plus près de leur gestion, vous voyez ce retard avant tout le monde."
            />
            <CompareCard
              label="Ce que vous touchez"
              labelColor="#38bdf8"
              title="10 % du contrat, à l'encaissement."
              body="Sur un projet 18 – 40 k€, ça fait 1 800 à 4 000 € par client présenté — sans rien gérer après l'intro, et l'outil fidélise durablement vos clients."
              accent
            />
          </div>
        </div>

        {/* 4 RAISONS */}
        <div>
          <div
            className="pdf-micro-caps"
            style={{
              color: "#94a3b8",
              marginBottom: "4mm",
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
            Ce que ça change pour votre cabinet
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "3mm",
            }}
          >
            {reasons.map((r) => (
              <ReasonCard key={r.num} {...r} />
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "4mm",
            borderTop: "1px solid rgba(56,189,248,0.15)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "9pt",
              color: "#94a3b8",
            }}
          >
            stellarwave.fr · contact@stellarwave.fr · +33 6 25 05 97 32
          </div>
          <div
            className="pdf-page-number"
            style={{ color: "#38bdf8", fontSize: "8.5pt" }}
          >
            <span style={{ color: "#94a3b8" }}>PAGE</span> 03
          </div>
        </div>
      </div>
    </>
  );
}

function CompareCard({
  label,
  labelColor,
  title,
  body,
  accent = false,
}: {
  label: string;
  labelColor: string;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: accent
          ? "1px solid rgba(56,189,248,0.45)"
          : "1px solid rgba(56,189,248,0.18)",
        borderRadius: "12px",
        padding: "6mm 6mm 6mm",
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
          left: "6mm",
          width: accent ? "16mm" : "10mm",
          height: "1.5px",
          background: accent ? "#38bdf8" : labelColor,
        }}
      />
      <div
        className="pdf-micro-caps"
        style={{ color: labelColor, fontSize: "7.5pt" }}
      >
        {label}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "14pt",
          fontWeight: 600,
          color: "#ffffff",
          letterSpacing: "-0.015em",
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "9pt",
          color: "#cbd5e1",
          lineHeight: 1.45,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function ReasonCard({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "10px",
        padding: "4mm 4mm",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "1.5mm",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "4mm",
          width: "8mm",
          height: "1.5px",
          background: "#38bdf8",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-btn), Georgia, serif",
          fontStyle: "italic",
          fontSize: "13pt",
          color: "rgba(56,189,248,0.55)",
          lineHeight: 1,
        }}
      >
        {num}
      </span>
      <h4
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "10.5pt",
          fontWeight: 600,
          color: "#ffffff",
          letterSpacing: "-0.01em",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "8pt",
          color: "#94a3b8",
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
}
