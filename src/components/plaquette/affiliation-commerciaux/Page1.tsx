import Image from "next/image";
import { BlobBackground } from "../BlobBackground";

export function AffiliationCommerciauxPage1() {
  return (
    <>
      <BlobBackground variant="top-right" intensity="default" />

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
            Programme d&apos;affiliation commerciale · 2026
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
            Vendez Stellar Wave
            <br />
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              à
            </span>{" "}
            votre{" "}
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
            8 % sur chaque contrat signé.{" "}
            <span style={{ color: "#94a3b8" }}>
              Vous apportez l&apos;intro, on gère tout le reste — sans
              exclusivité.
            </span>
          </p>
        </div>

        {/* TROIS CARDS — produit / gains / répartition */}
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
            Le deal en un coup d&apos;œil
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.15fr 1fr",
              gap: "3mm",
            }}
          >
            {/* CARD 1 — Pour qui */}
            <div
              style={{
                background: "#0f172a",
                border: "1px solid rgba(56,189,248,0.18)",
                borderRadius: "12px",
                padding: "5mm 5mm",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: "2.5mm",
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
                className="pdf-micro-caps"
                style={{ color: "#94a3b8", fontSize: "7pt" }}
              >
                Pour qui
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "15pt",
                  fontWeight: 600,
                  color: "#ffffff",
                  letterSpacing: "-0.015em",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Toute PME avec
                <br />
                un besoin digital.
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "8.5pt",
                  color: "#cbd5e1",
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Site qui ne convertit plus, pas d&apos;app, outils internes à
                bâtir, tâches à automatiser. Le bon prospect : un dirigeant
                prêt à passer au digital.
              </p>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "3mm",
                  borderTop: "1px solid rgba(56,189,248,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1mm",
                }}
              >
                <div
                  className="pdf-micro-caps"
                  style={{ color: "#94a3b8", fontSize: "6.5pt" }}
                >
                  Cible idéale
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "13pt",
                    fontWeight: 600,
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  PME 5 – 200 personnes
                </div>
              </div>
            </div>

            {/* CARD 2 — Ce que vous gagnez (mise en avant) */}
            <div
              style={{
                background: "#0f172a",
                border: "1px solid rgba(56,189,248,0.45)",
                borderRadius: "12px",
                padding: "5mm 5mm",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: "2.5mm",
                boxShadow: "0 0 0 1px rgba(56,189,248,0.08) inset",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: "5mm",
                  width: "20mm",
                  height: "1.5px",
                  background: "#38bdf8",
                }}
              />
              <div
                className="pdf-micro-caps"
                style={{ color: "#38bdf8", fontSize: "7pt" }}
              >
                Ce que vous gagnez
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  className="text-gradient"
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "56pt",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.9,
                    whiteSpace: "nowrap",
                  }}
                >
                  8 %
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-btn), Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "15pt",
                    color: "rgba(56,189,248,0.55)",
                    marginTop: "1mm",
                  }}
                >
                  du contrat
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "8.5pt",
                  color: "#cbd5e1",
                  lineHeight: 1.4,
                }}
              >
                À la signature du contrat.
                <br />
                <span style={{ color: "#94a3b8" }}>
                  Versé à l&apos;encaissement, pas d&apos;avance.
                </span>
              </div>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "3mm",
                  borderTop: "1px solid rgba(56,189,248,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1mm",
                }}
              >
                <div
                  className="pdf-micro-caps"
                  style={{ color: "#94a3b8", fontSize: "6.5pt" }}
                >
                  Par client présenté
                </div>
                <div
                  className="text-gradient"
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "20pt",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  1 440 – 3 200 €
                </div>
                <div
                  className="pdf-micro-caps"
                  style={{
                    color: "#94a3b8",
                    fontSize: "6.5pt",
                    marginTop: "0.5mm",
                  }}
                >
                  Sur un ticket 18 – 40 k€
                </div>
              </div>
            </div>

            {/* CARD 3 — Répartition */}
            <div
              style={{
                background: "#0f172a",
                border: "1px solid rgba(56,189,248,0.18)",
                borderRadius: "12px",
                padding: "5mm 5mm",
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
                  left: "5mm",
                  width: "10mm",
                  height: "1.5px",
                  background: "#a78bfa",
                }}
              />
              <div
                className="pdf-micro-caps"
                style={{ color: "#a78bfa", fontSize: "7pt" }}
              >
                Qui fait quoi
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2mm" }}>
                <div
                  style={{
                    fontFamily: "var(--font-btn), Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "14pt",
                    color: "#38bdf8",
                  }}
                >
                  Vous
                </div>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1mm",
                  }}
                >
                  <li
                    style={{
                      fontFamily: "var(--font-mona), system-ui, sans-serif",
                      fontSize: "8.5pt",
                      color: "#cbd5e1",
                      lineHeight: 1.35,
                    }}
                  >
                    L&apos;intro et la qualification rapide.
                  </li>
                </ul>
              </div>

              <div
                style={{
                  height: "1px",
                  background: "rgba(56,189,248,0.15)",
                  margin: "1mm 0",
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "2mm" }}>
                <div
                  style={{
                    fontFamily: "var(--font-btn), Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "14pt",
                    color: "#38bdf8",
                  }}
                >
                  Nous
                </div>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1mm",
                  }}
                >
                  <li
                    style={{
                      fontFamily: "var(--font-mona), system-ui, sans-serif",
                      fontSize: "8.5pt",
                      color: "#cbd5e1",
                      lineHeight: 1.35,
                    }}
                  >
                    Audit, démo, devis, contrat, livraison, support — et
                    maintenance si le client la souhaite.
                  </li>
                </ul>
              </div>
            </div>
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
