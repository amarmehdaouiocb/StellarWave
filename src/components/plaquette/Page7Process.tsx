import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { BlobBackground } from "./BlobBackground";
import { processSteps, whyUs, leadMagnet, brand } from "@/config/brand";

// Override commercial : on reformule les features du mini-audit pour qu'elles
// parlent business plutôt que technique.
const auditFeatures = [
  "Score de performance détaillé (mobile + desktop)",
  "Audit SEO complet et actionnable",
  "Recommandations classées par impact",
  "Estimation chiffrée des gains de conversion",
];

const pillarLabel: Record<string, string> = {
  Lightning: "01",
  ShieldCheck: "02",
  TrendUp: "03",
  Handshake: "04",
};

export function Page7Process() {
  return (
    <>
      <BlobBackground variant="top-left" intensity="subtle" />

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
        07
      </div>

      <PageHeader pageNumber="07" pageLabel="Processus & Contact" />

      <div
        className="pdf-content"
        style={{ inset: "32mm 16mm 28mm 16mm", zIndex: 2 }}
      >
        {/* TITRE PROCESS */}
        <div style={{ marginBottom: "6mm" }}>
          <h2
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "30pt",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            Comment{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              on{" "}
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#38bdf8",
                }}
              >
                travaille
              </span>
              .
            </span>
          </h2>
          <p
            style={{
              marginTop: "2mm",
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "9.5pt",
              color: "#94a3b8",
            }}
          >
            Méthodologie agile, démos hebdomadaires, zéro mauvaise surprise.
          </p>
        </div>

        {/* TIMELINE 4 phases */}
        <div style={{ marginBottom: "8mm", position: "relative" }}>
          {/* Ligne lime gradient connectant les cercles */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "4mm",
              left: "12mm",
              right: "12mm",
              height: "1.5px",
              background:
                "linear-gradient(90deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "3mm",
              position: "relative",
            }}
          >
            {processSteps.map((s) => (
              <ProcessStep
                key={s.step}
                step={String(s.step).padStart(2, "0")}
                title={s.title}
                description={s.description}
                duration={s.duration}
                deliverables={[...s.deliverables]}
              />
            ))}
          </div>
        </div>

        {/* BLOC CTA MINI-AUDIT — lime gradient pleine largeur */}
        <div
          style={{
            position: "relative",
            marginBottom: "6mm",
            borderRadius: "14px",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)",
            padding: "7mm 8mm",
            color: "#000000",
            boxShadow: "0 20px 50px rgba(56,189,248,0.25)",
          }}
        >
          {/* Overlay noir pour contraste */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.10)",
            }}
          />
          {/* Pattern dots */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
              opacity: 0.5,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3mm",
                marginBottom: "4mm",
              }}
            >
              <span
                style={{
                  background: "#000000",
                  color: "#38bdf8",
                  padding: "1mm 3mm",
                  borderRadius: "999px",
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "7pt",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                ★ Gratuit
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "8pt",
                  color: "rgba(0,0,0,0.7)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                15 min · PDF récap sous 24 h
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.6fr 1fr",
                gap: "8mm",
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "26pt",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "#000000",
                    margin: "0 0 3mm 0",
                  }}
                >
                  Mini-audit
                  <br />
                  <span
                    style={{
                      fontFamily: "var(--font-btn), Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    Performance &amp; SEO.
                  </span>
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "9.5pt",
                    color: "rgba(0,0,0,0.78)",
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  {leadMagnet.description}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "4mm 0 0 0",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    rowGap: "1.5mm",
                    columnGap: "4mm",
                  }}
                >
                  {auditFeatures.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontFamily: "var(--font-mona), system-ui, sans-serif",
                        fontSize: "8pt",
                        color: "#000000",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontWeight: 500,
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3mm",
                }}
              >
                <a
                  href="https://stellarwave.fr/audit-gratuit"
                  style={{
                    background: "#000000",
                    color: "#ffffff",
                    padding: "5mm 8mm",
                    borderRadius: "999px",
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "11pt",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    textDecoration: "none",
                    textAlign: "center",
                    minWidth: "60mm",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  → Lancer mon audit
                </a>
                <span
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "7.5pt",
                    color: "rgba(0,0,0,0.7)",
                    letterSpacing: "0.06em",
                    fontWeight: 600,
                  }}
                >
                  stellarwave.fr/audit-gratuit
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT + PILIERS — 2 colonnes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8mm",
          }}
        >
          {/* GAUCHE — Contact */}
          <div>
            <div
              className="pdf-micro-caps"
              style={{ color: "#38bdf8", marginBottom: "3mm" }}
            >
              Parlons de votre projet
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.8mm",
              }}
            >
              <ContactLine label="Email" value={brand.contactEmail} />
              <ContactLine label="Tél" value={brand.phone} />
              <ContactLine label="Adresse" value={brand.address} />
              <ContactLine
                label="RDV"
                value="calendar.app.google/51BiLHgAVhsLrxTC9"
              />
            </div>
          </div>

          {/* DROITE — Piliers */}
          <div>
            <div
              className="pdf-micro-caps"
              style={{ color: "#38bdf8", marginBottom: "3mm" }}
            >
              Pourquoi Stellar Wave
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2.5mm 3mm",
              }}
            >
              {whyUs.map((p) => (
                <Pillar
                  key={p.title}
                  num={pillarLabel[p.iconName] ?? "•"}
                  title={p.title}
                  description={p.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <PageFooter pageNumber="07" />
    </>
  );
}

function ProcessStep({
  step,
  title,
  description,
  duration,
  deliverables,
}: {
  step: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}) {
  return (
    <div style={{ position: "relative", paddingTop: "11mm" }}>
      {/* Cercle lime sur la ligne */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "8mm",
          height: "8mm",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000000",
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "9pt",
          fontWeight: 700,
          boxShadow: "0 0 0 4px #020617, 0 4px 16px rgba(56,189,248,0.4)",
          letterSpacing: "-0.01em",
        }}
      >
        {step}
      </div>

      <div style={{ textAlign: "center", marginBottom: "2mm" }}>
        <h4
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "12pt",
            fontWeight: 600,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h4>
        <div
          className="pdf-micro-caps"
          style={{ color: "#38bdf8", fontSize: "6.5pt", marginTop: "1mm" }}
        >
          {duration}
        </div>
      </div>

      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "7.5pt",
          color: "#cbd5e1",
          lineHeight: 1.4,
          textAlign: "center",
          margin: "0 0 3mm 0",
        }}
      >
        {description}
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          borderTop: "1px dashed rgba(56,189,248,0.2)",
          paddingTop: "2mm",
        }}
      >
        {deliverables.map((d) => (
          <li
            key={d}
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "7pt",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>·</span> {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "5mm" }}>
      <span
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "7pt",
          color: "#64748b",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          minWidth: "16mm",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "11pt",
          color: "#ffffff",
          fontWeight: 500,
          letterSpacing: "-0.005em",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Pillar({
  num,
  title,
  description,
}: {
  num: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ display: "flex", gap: "3mm", alignItems: "flex-start" }}>
      <span
        style={{
          fontFamily: "var(--font-btn), Georgia, serif",
          fontStyle: "italic",
          fontSize: "16pt",
          color: "#38bdf8",
          lineHeight: 1,
          minWidth: "8mm",
          fontWeight: 400,
        }}
      >
        {num}
      </span>
      <div>
        <div
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "9.5pt",
            fontWeight: 600,
            color: "#ffffff",
            marginBottom: "1mm",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "7.5pt",
            color: "#94a3b8",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
