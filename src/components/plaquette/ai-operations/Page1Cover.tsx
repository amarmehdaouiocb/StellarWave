import Image from "next/image";
import { BlobBackground } from "../BlobBackground";

export function AiOpsPage1Cover() {
  return (
    <>
      <BlobBackground variant="top-right" intensity="default" />
      <BlobBackground variant="bottom-right" intensity="subtle" />

      {/* Numéro jumbo top-right — agrandi en landscape */}
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
        01
      </div>

      <div
        className="pdf-content-landscape"
        style={{
          inset: "14mm",
          zIndex: 2,
          justifyContent: "space-between",
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
            width={240}
            height={54}
            priority
            style={{ height: "12mm", width: "auto" }}
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
                width: "10mm",
                height: "1px",
                background: "rgba(56,189,248,0.5)",
              }}
            />
            <span className="pdf-micro-caps" style={{ color: "#94a3b8" }}>
              Stellar Wave × Wealth Management · Paris
            </span>
          </div>
        </div>

        {/* HERO bloc principal */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "20mm",
            alignItems: "center",
            flex: 1,
            marginTop: "4mm",
            marginBottom: "4mm",
          }}
        >
          {/* Colonne gauche — eyebrow + H1 + subtitle */}
          <div>
            <div
              className="pdf-micro-caps"
              style={{
                color: "#38bdf8",
                marginBottom: "8mm",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "10pt",
              }}
            >
              <span
                style={{
                  width: "16mm",
                  height: "1px",
                  background: "#38bdf8",
                }}
              />
              Opérations IA · Édition 2026
            </div>

            <h1
              style={{
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontSize: "76pt",
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                color: "rgba(255,255,255,0.55)",
                margin: 0,
              }}
            >
              Opérations IA
              <br />
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#38bdf8",
                }}
              >
                pour
              </span>{" "}
              <span
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.05em",
                }}
              >
                cabinets
              </span>
              <br />
              de gestion.
            </h1>

            <p
              style={{
                marginTop: "12mm",
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontSize: "15pt",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "#cbd5e1",
                maxWidth: "170mm",
                margin: "12mm 0 0 0",
              }}
            >
              Des systèmes d&apos;automatisation sur mesure qui rendent à vos
              conseillers seniors{" "}
              <span
                style={{
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                10 à 15 heures par semaine
              </span>
              <span style={{ color: "#94a3b8" }}>
                {" "}
                — onboarding, AO, conformité, reporting trimestriel.
              </span>
            </p>
          </div>

          {/* Colonne droite — KPI signatures */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5mm",
            }}
          >
            <div
              className="pdf-micro-caps"
              style={{
                color: "#94a3b8",
                fontSize: "8pt",
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
              Capacité rendue par an
            </div>

            <div
              style={{
                background: "#0f172a",
                border: "1px solid rgba(56,189,248,0.30)",
                borderRadius: "14px",
                padding: "7mm 8mm",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: "8mm",
                  width: "20mm",
                  height: "1.5px",
                  background: "#38bdf8",
                }}
              />
              <div
                className="text-gradient"
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "56pt",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "3mm",
                }}
              >
                625 k€
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "10pt",
                  color: "#cbd5e1",
                  lineHeight: 1.45,
                }}
              >
                Cabinet de 5 conseillers — 10 h/sem × 50 sem × 250 €/h chargé.
                <br />
                <span style={{ color: "#94a3b8" }}>
                  Mesuré dans nos engagements, pas projeté.
                </span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3mm",
              }}
            >
              <MiniStat value="1,2 mois" label="Payback médian" />
              <MiniStat value="6 – 10 sem" label="Délai de livraison" />
            </div>

            <div
              style={{
                marginTop: "2mm",
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontSize: "14pt",
                color: "#a78bfa",
                lineHeight: 1.45,
                paddingLeft: "5mm",
                borderLeft: "2px solid rgba(167,139,250,0.5)",
              }}
            >
              « Aucun marketing creux.
              <br />
              Le ROI est calculable avant de vendre. »
            </div>
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
              fontSize: "9.5pt",
              color: "#94a3b8",
            }}
          >
            stellarwave.fr/operations-ia · amar@stellarwave.fr · +33 6 25 05 97
            32
          </div>
          <div
            className="pdf-page-number"
            style={{ color: "#38bdf8", fontSize: "9pt" }}
          >
            <span style={{ color: "#94a3b8" }}>PAGE</span> 01{" "}
            <span style={{ color: "#475569" }}>/</span>{" "}
            <span style={{ color: "#94a3b8" }}>10</span>
          </div>
        </div>
      </div>
    </>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "10px",
        padding: "4mm 5mm",
        position: "relative",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "5mm",
          width: "8mm",
          height: "1.5px",
          background: "#38bdf8",
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "20pt",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          marginBottom: "1.5mm",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div
        className="pdf-micro-caps"
        style={{ color: "#94a3b8", fontSize: "7pt" }}
      >
        {label}
      </div>
    </div>
  );
}
