import Image from "next/image";
import { BlobBackground } from "../BlobBackground";

const tools = [
  "Deck principal AI Operations",
  "2 case studies chiffrés",
  "Lien de tracking dédié",
  "Brief produit · 1 page",
];

const conditions = [
  "Versement à l'encaissement réel — pas d'avance",
  "Paiement 30 j après facturation client",
  "Aucune exclusivité, aucun engagement de volume",
];

export function AffiliationCommerciauxPage2() {
  return (
    <>
      <BlobBackground variant="bottom-right" intensity="subtle" />

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
        02
      </div>

      <div
        className="pdf-content"
        style={{ inset: "16mm", zIndex: 2, justifyContent: "space-between" }}
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
            alt="Stellar Wave"
            width={140}
            height={32}
            priority
            style={{ height: "8mm", width: "auto" }}
          />
          <div
            className="pdf-micro-caps"
            style={{
              color: "#38bdf8",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "8mm",
                height: "1px",
                background: "#38bdf8",
              }}
            />
            Pitch · Outils · Contact
          </div>
        </div>

        {/* PITCH HERO + CITATION */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "30pt",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 5mm 0",
            }}
          >
            30{" "}
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              secondes
            </span>{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              suffisent.
            </span>
          </h2>

          <div
            style={{
              background: "#0f172a",
              border: "1px solid rgba(56,189,248,0.30)",
              borderRadius: "14px",
              padding: "8mm 10mm",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: "10mm",
                width: "24mm",
                height: "1.5px",
                background: "#38bdf8",
              }}
            />
            <div
              className="pdf-micro-caps"
              style={{
                color: "#38bdf8",
                fontSize: "7.5pt",
                marginBottom: "5mm",
              }}
            >
              Le pitch à donner à votre prospect
            </div>

            <blockquote
              style={{
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontSize: "16pt",
                fontWeight: 400,
                lineHeight: 1.45,
                color: "#ffffff",
                margin: 0,
                letterSpacing: "-0.015em",
                quotes: "none",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                « Tu as encore des Excel partout dans ta boîte ? Stellar Wave
                construit l&apos;app
              </span>{" "}
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  color: "#38bdf8",
                }}
              >
                sur mesure
              </span>{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                qui les remplace. 6 à 10 semaines, ROI calculable avant
                signature,
              </span>{" "}
              <span style={{ fontWeight: 600, color: "#ffffff" }}>
                audit gratuit
              </span>{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                pour cadrer. Je te mets en relation si ça t&apos;intéresse —
                sans engagement. »
              </span>
            </blockquote>

            <p
              style={{
                marginTop: "5mm",
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontSize: "8pt",
                color: "#94a3b8",
                lineHeight: 1.45,
                margin: "5mm 0 0 0",
              }}
            >
              Adaptez à votre relation. Les mots-clés à garder absolument :{" "}
              <span style={{ color: "#cbd5e1" }}>
                « Excel » · « sur mesure » · « audit gratuit »
              </span>
              .
            </p>
          </div>
        </div>

        {/* OUTILS + CONDITIONS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5mm",
          }}
        >
          <div>
            <div
              className="pdf-micro-caps"
              style={{
                color: "#94a3b8",
                marginBottom: "3mm",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "7.5pt",
              }}
            >
              <span
                style={{
                  width: "8mm",
                  height: "1px",
                  background: "rgba(148,163,184,0.5)",
                }}
              />
              Outils fournis à chaque affilié
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2mm",
              }}
            >
              {tools.map((t, i) => (
                <ToolPill key={t} num={i + 1} label={t} />
              ))}
            </div>
          </div>
          <div>
            <div
              className="pdf-micro-caps"
              style={{
                color: "#94a3b8",
                marginBottom: "3mm",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "7.5pt",
              }}
            >
              <span
                style={{
                  width: "8mm",
                  height: "1px",
                  background: "rgba(148,163,184,0.5)",
                }}
              />
              Conditions clés
            </div>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "2.5mm",
              }}
            >
              {conditions.map((c) => (
                <li
                  key={c}
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "9.5pt",
                    color: "#cbd5e1",
                    lineHeight: 1.4,
                    paddingLeft: "6mm",
                    position: "relative",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "2mm",
                      width: "3mm",
                      height: "1.5px",
                      background: "#38bdf8",
                    }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA gradient cyan */}
        <div
          style={{
            position: "relative",
            borderRadius: "14px",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)",
            padding: "8mm 9mm",
            color: "#000000",
            boxShadow: "0 20px 50px rgba(56,189,248,0.25)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.10)",
            }}
          />
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
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: "8mm",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: "#000000",
                  color: "#38bdf8",
                  padding: "1mm 3mm",
                  borderRadius: "999px",
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "7pt",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "3mm",
                }}
              >
                Inscription gratuite · Réponse 24 h
              </div>
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
                Devenez{" "}
                <span
                  style={{
                    fontFamily: "var(--font-btn), Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  affilié.
                </span>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "9.5pt",
                  color: "rgba(0,0,0,0.78)",
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Un email pour vous inscrire. On vous renvoie le lien de
                tracking + les supports sous 24 h.
              </p>
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
                href="mailto:amar@stellarwave.fr?subject=Programme%20d'affiliation"
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
                  minWidth: "55mm",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                → M&apos;inscrire au programme
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
                amar@stellarwave.fr
              </span>
            </div>
          </div>
        </div>

        {/* CONTACT FOOTER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "8mm",
            alignItems: "center",
            paddingTop: "4mm",
            borderTop: "1px solid rgba(56,189,248,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8mm",
              flexWrap: "wrap",
              alignItems: "baseline",
            }}
          >
            <ContactItem label="Email" value="amar@stellarwave.fr" />
            <ContactItem label="Tél" value="+33 6 25 05 97 32" />
            <ContactItem label="Fondateur" value="Amar Mehdaoui" />
          </div>
          <div
            className="pdf-page-number"
            style={{ color: "#38bdf8", fontSize: "8.5pt" }}
          >
            <span style={{ color: "#94a3b8" }}>PAGE</span> 02{" "}
            <span style={{ color: "#475569" }}>/</span>{" "}
            <span style={{ color: "#94a3b8" }}>02</span>
          </div>
        </div>
      </div>
    </>
  );
}

function ToolPill({ num, label }: { num: number; label: string }) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "999px",
        padding: "2.5mm 5mm",
        display: "flex",
        alignItems: "center",
        gap: "4mm",
        position: "relative",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-btn), Georgia, serif",
          fontStyle: "italic",
          fontSize: "12pt",
          color: "#38bdf8",
          lineHeight: 1,
          minWidth: "8mm",
        }}
      >
        0{num}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "10pt",
          fontWeight: 500,
          color: "#ffffff",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5mm" }}>
      <span
        className="pdf-micro-caps"
        style={{ color: "#94a3b8", fontSize: "6.5pt" }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "10pt",
          color: "#ffffff",
          fontWeight: 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}
