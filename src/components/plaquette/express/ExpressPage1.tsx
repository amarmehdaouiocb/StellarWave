import Image from "next/image";
import { BlobBackground } from "../BlobBackground";

const services = [
  {
    title: "Sites web",
    desc: "Donnez envie à vos visiteurs de vous contacter.",
    price: "À partir de 2 500 €",
  },
  {
    title: "Applications web",
    desc: "Digitalisez votre métier, accélérez vos équipes.",
    price: "À partir de 15 000 €",
  },
  {
    title: "Apps iOS & Android",
    desc: "Soyez dans la poche de vos clients, partout.",
    price: "À partir de 18 000 €",
  },
  {
    title: "Outils internes",
    desc: "Libérez vos équipes des tâches répétitives.",
    price: "À partir de 8 000 €",
  },
  {
    title: "Direction artistique",
    desc: "Créez une image de marque qui marque.",
    price: "À partir de 800 €",
  },
  {
    title: "Automatisations sur mesure",
    desc: "Connectez vos outils, supprimez les tâches manuelles.",
    price: "À partir de 3 000 €",
  },
];

export function ExpressPage1() {
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
        01
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
            alt="StellarWave"
            width={220}
            height={50}
            priority
            style={{ height: "11mm", width: "auto" }}
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
              Éditeur de logiciels
            </span>
          </div>
        </div>

        {/* HERO */}
        <div style={{ marginTop: "6mm", marginRight: "20mm" }}>
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
            Pitch · 2026
          </div>

          <h1
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "76pt",
              fontWeight: 300,
              lineHeight: 0.94,
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            Créons le digital
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
            <span
              style={{
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.045em",
              }}
            >
              convertit.
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
              maxWidth: "150mm",
              margin: "8mm 0 0 0",
            }}
          >
            Éditeur de logiciels pour PME et scale-up.{" "}
            <span style={{ color: "#94a3b8" }}>
              On conçoit, on développe, on accompagne — du brief au monitoring.
            </span>
          </p>
        </div>

        {/* CE QU'ON FAIT — 4 services en row */}
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
            Ce qu&apos;on fait pour vous
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "2.5mm",
            }}
          >
            {services.map((s, i) => (
              <ServiceLine key={s.title} index={i + 1} {...s} />
            ))}
          </div>
        </div>

        {/* FOOTER mini */}
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
            <span style={{ color: "#94a3b8" }}>PAGE</span> 01{" "}
            <span style={{ color: "#475569" }}>/</span>{" "}
            <span style={{ color: "#94a3b8" }}>02</span>
          </div>
        </div>
      </div>
    </>
  );
}

function ServiceLine({
  index,
  title,
  desc,
  price,
}: {
  index: number;
  title: string;
  desc: string;
  price: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "10px",
        padding: "3mm 4mm 3mm",
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
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "3mm",
          marginBottom: "0.5mm",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-btn), Georgia, serif",
            fontStyle: "italic",
            fontSize: "13pt",
            color: "rgba(56,189,248,0.55)",
            lineHeight: 1,
          }}
        >
          0{index}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "11pt",
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
      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "7.5pt",
          color: "#cbd5e1",
          lineHeight: 1.35,
          margin: 0,
          minHeight: "8mm",
        }}
      >
        {desc}
      </p>
      <div
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "10.5pt",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          marginTop: "auto",
          color: "#7dd3fc",
        }}
      >
        {price}
      </div>
    </div>
  );
}
