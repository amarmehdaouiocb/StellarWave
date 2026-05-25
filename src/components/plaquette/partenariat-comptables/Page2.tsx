import Image from "next/image";
import { BlobBackground } from "../BlobBackground";

const steps = [
  {
    num: "01",
    title: "Intro",
    desc: "Un email, un appel. Vous nous présentez le client.",
  },
  {
    num: "02",
    title: "Audit gratuit",
    desc: "30 min visio. Synthèse écrite sous 48 h.",
  },
  {
    num: "03",
    title: "Devis 48 h",
    desc: "Cadrage chiffré, ROI estimé. Aucun engagement.",
  },
  {
    num: "04",
    title: "10 % à vous",
    desc: "À l'encaissement de chaque facture. Paiement 30 j.",
  },
];

export function PartenariatComptablesPage2() {
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
        04
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
            Mécanisme · Exemple · Contact
          </div>
        </div>

        {/* MECANISME */}
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
            Comment{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#38bdf8",
                }}
              >
                ça marche
              </span>
              .
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "3mm",
            }}
          >
            {steps.map((s, i) => (
              <StepCard key={s.num} step={s} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>

        {/* EXEMPLE CONCRET — encadré spécial */}
        <div
          style={{
            background: "#0f172a",
            border: "1px solid rgba(56,189,248,0.35)",
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
            className="pdf-micro-caps"
            style={{
              color: "#38bdf8",
              fontSize: "7.5pt",
              marginBottom: "4mm",
            }}
          >
            Exemple concret
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8mm",
            }}
          >
            <ExampleRow contract="25 000 €" commission="2 500 €" />
            <ExampleRow contract="35 000 €" commission="3 500 €" />
          </div>

          <p
            style={{
              marginTop: "5mm",
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "8.5pt",
              color: "#94a3b8",
              lineHeight: 1.45,
              margin: "5mm 0 0 0",
            }}
          >
            Sans rien faire au-delà de l&apos;intro initiale. Et vos clients
            gagnent en plus des dossiers comptables propres, exports natifs,
            moins de corrections en révision.
          </p>
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
                30 min · Sans engagement
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
                Cadrons le{" "}
                <span
                  style={{
                    fontFamily: "var(--font-btn), Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  partenariat.
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
                30 minutes pour valider l&apos;intérêt mutuel, décider du
                rythme et envoyer votre premier client.
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
                href="mailto:amar@stellarwave.fr?subject=Partenariat%20cabinet%20comptable"
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
                → Réserver 30 min
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
            <ContactItem
              label="RDV"
              value="calendar.app.google/51BiLHgAVhsLrxTC9"
              href="https://calendar.app.google/51BiLHgAVhsLrxTC9"
            />
          </div>
          <div
            className="pdf-page-number"
            style={{ color: "#38bdf8", fontSize: "8.5pt" }}
          >
            <span style={{ color: "#94a3b8" }}>PAGE</span> 04
          </div>
        </div>
      </div>
    </>
  );
}

function StepCard({
  step,
  isLast,
}: {
  step: { num: string; title: string; desc: string };
  isLast: boolean;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: isLast
          ? "1px solid rgba(56,189,248,0.45)"
          : "1px solid rgba(56,189,248,0.18)",
        borderRadius: "10px",
        padding: "5mm 4mm 5mm",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "2mm",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "4mm",
          width: isLast ? "16mm" : "8mm",
          height: "1.5px",
          background: "#38bdf8",
        }}
      />
      <span
        className="pdf-micro-caps"
        style={{
          color: isLast ? "#38bdf8" : "#94a3b8",
          fontSize: "7pt",
        }}
      >
        Étape {step.num}
      </span>
      <h4
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: isLast ? "15pt" : "13pt",
          fontWeight: 700,
          color: isLast ? "#38bdf8" : "#ffffff",
          letterSpacing: "-0.015em",
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {step.title}
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
        {step.desc}
      </p>
    </div>
  );
}

function ExampleRow({
  contract,
  commission,
}: {
  contract: string;
  commission: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5mm",
      }}
    >
      <div
        className="pdf-micro-caps"
        style={{ color: "#94a3b8", fontSize: "7pt" }}
      >
        Contrat signé
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "5mm",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "22pt",
            fontWeight: 300,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {contract}
        </span>
        <span
          style={{
            fontFamily: "var(--font-btn), Georgia, serif",
            fontStyle: "italic",
            fontSize: "16pt",
            color: "#38bdf8",
          }}
        >
          →
        </span>
        <span
          className="text-gradient"
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "26pt",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {commission}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "8.5pt",
          color: "#94a3b8",
        }}
      >
        pour vous, à l&apos;encaissement
      </div>
    </div>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const valueStyle = {
    fontFamily: "var(--font-mona), system-ui, sans-serif",
    fontSize: "10pt",
    color: "#ffffff",
    fontWeight: 500,
    textDecoration: "none",
  } as const;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5mm" }}>
      <span
        className="pdf-micro-caps"
        style={{ color: "#94a3b8", fontSize: "6.5pt" }}
      >
        {label}
      </span>
      {href ? (
        <a href={href} style={valueStyle}>
          {value}
        </a>
      ) : (
        <span style={valueStyle}>{value}</span>
      )}
    </div>
  );
}
