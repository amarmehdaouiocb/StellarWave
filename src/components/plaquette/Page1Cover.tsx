import Image from "next/image";
import { BlobBackground } from "./BlobBackground";
import { MetricCard } from "./MetricCard";

// Override commercial des metrics : "Coûts cloud" → "Coûts d'hébergement"
// pour rester sur un vocabulaire non-technique.
const coverMetrics = [
  { value: "4.8%", label: "Taux de conversion moyen" },
  { value: "−65%", label: "Coûts d'hébergement réduits" },
  { value: "98+", label: "Score performance" },
  { value: "<48h", label: "Délai de réponse" },
] as const;

export function Page1Cover() {
  return (
    <>
      <BlobBackground variant="top-left" intensity="default" />

      {/* Numéro jumbo en filigrane top-right */}
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
        style={{
          inset: "16mm",
          paddingBottom: "36mm",
          justifyContent: "space-between",
          zIndex: 2,
        }}
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
              Studio Product &amp; Cloud · Paris
            </span>
          </div>
        </div>

        {/* CENTER — titre éditorial massif */}
        <div style={{ marginTop: "4mm", marginRight: "16mm" }}>
          <div
            className="pdf-micro-caps"
            style={{
              color: "#38bdf8",
              marginBottom: "8mm",
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
            Plaquette commerciale · 2026
          </div>

          <h1
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "82pt",
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            Créons
            <br />
            le digital{" "}
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              qui
            </span>
            <br />
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
              marginTop: "12mm",
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "13pt",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "#cbd5e1",
              maxWidth: "120mm",
            }}
          >
            Landing pages, applications web &amp; mobile, outils internes,
            visuels marketing.
            <br />
            <span style={{ color: "#94a3b8" }}>
              Exécution industrielle. Résultats mesurables.
            </span>
          </p>
        </div>

        {/* METRICS row */}
        <div>
          <div
            className="pdf-micro-caps"
            style={{
              color: "#94a3b8",
              marginBottom: "4mm",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "8mm",
                height: "1px",
                background: "rgba(148,163,184,0.5)",
              }}
            />
            Indicateurs sur projets web 2024-2025
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "4mm",
            }}
          >
            {coverMetrics.map((m) => (
              <MetricCard key={m.label} value={m.value} label={m.label} />
            ))}
          </div>
        </div>
      </div>

      {/* BAS — bande lime gradient (sœur de pdf-content, ancrée au pdf-page) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "32mm",
          background:
            "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)",
          display: "flex",
          alignItems: "center",
          paddingLeft: "16mm",
          paddingRight: "16mm",
          justifyContent: "space-between",
          zIndex: 3,
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.18)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.25) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            opacity: 0.4,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, color: "#000000" }}>
          <div
            style={{
              fontFamily: "var(--font-btn), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "15pt",
              lineHeight: 1.1,
              marginBottom: "1.5mm",
            }}
          >
            Demandez votre mini-audit gratuit.
          </div>
          <div
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "9pt",
              color: "rgba(0,0,0,0.78)",
              letterSpacing: "0.02em",
              fontWeight: 500,
            }}
          >
            stellarwave.fr/audit-gratuit · contact@stellarwave.fr ·
            +33 6 25 05 97 32
          </div>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            color: "#000000",
            textAlign: "right",
          }}
        >
          <div
            className="pdf-page-number"
            style={{ fontSize: "9pt", marginBottom: "1.5mm" }}
          >
            PAGE 01 / 07
          </div>
          <div
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "9pt",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Stellar Wave · 2026
          </div>
        </div>
      </div>
    </>
  );
}
