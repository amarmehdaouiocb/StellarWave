import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { BlobBackground } from "./BlobBackground";

const retainers = [
  {
    name: "Maintenance Premium",
    price: "À partir de 490 € / mois",
    tagline: "Votre digital toujours à jour, sans y penser.",
    icon: "⚙",
    features: [
      "Mises à jour sécurité & dépendances",
      "Monitoring uptime 24/7 + alertes",
      "Hotfixes mineurs (≤ 2 h / mois)",
      "Sauvegardes journalières",
      "Rapport mensuel de santé",
    ],
    note: "+ 290 €/mois par app mobile (gestion stores)",
    popular: false,
  },
  {
    name: "Croissance & Acquisition",
    price: "À partir de 1 490 € / mois",
    tagline: "Plus de trafic qualifié, plus de leads, plus de ventes.",
    icon: "↗",
    features: [
      "SEO continu (audit, contenu, mots-clés)",
      "Pilotage Google Ads / Meta / LinkedIn",
      "A/B testing & optimisation conversion",
      "Email marketing & automation",
      "Reporting business mensuel",
      "1 RDV stratégique / mois",
    ],
    note: "Hors budget media (à votre charge)",
    popular: true,
  },
  {
    name: "Évolutions Produit",
    price: "À partir de 2 990 € / mois",
    tagline: "Votre produit avance en continu, sans recruter.",
    icon: "✦",
    features: [
      "4–6 jours de dev senior / mois",
      "1 design sprint inclus",
      "Backlog priorisé avec vous",
      "Direction technique partielle",
      "Gestion releases (web + stores)",
      "Sans engagement (mois par mois)",
    ],
    note: "Idéal alternative à un recrutement CTO / dev senior",
    popular: false,
  },
];

const addons = [
  { label: "Direction artistique mensuelle", price: "990 €/mois" },
  { label: "CTO partiel (1 j/mois)", price: "1 290 €/mois" },
  { label: "Dashboard analytics sur mesure", price: "390 €/mois" },
];

export function Page5Recurring() {
  return (
    <>
      <BlobBackground variant="top-left" intensity="default" />

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
        05
      </div>

      <PageHeader pageNumber="05" pageLabel="Continuité mensuelle" />

      <div
        className="pdf-content"
        style={{ inset: "30mm 14mm 24mm 14mm", zIndex: 2 }}
      >
        {/* TITRE */}
        <div style={{ marginBottom: "5mm" }}>
          <div
            className="pdf-micro-caps"
            style={{ color: "#38bdf8", marginBottom: "2mm", fontSize: "7.5pt" }}
          >
            Récurrent · Trois retainers mensuels
          </div>
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
            Le projet livré,{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#38bdf8",
                }}
              >
                la croissance
              </span>{" "}
              commence.
            </span>
          </h2>
          <p
            style={{
              marginTop: "2mm",
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "9.5pt",
              color: "#94a3b8",
              maxWidth: "150mm",
              margin: "2mm 0 0 0",
              lineHeight: 1.5,
            }}
          >
            On reste à vos côtés après la mise en production : maintenir,
            faire grandir le trafic et les ventes, faire évoluer le produit.
            Trois retainers conçus pour vous éviter de recruter trop vite.
          </p>
        </div>

        {/* GRILLE 3 retainers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.08fr 1fr",
            gap: "3.5mm",
            alignItems: "stretch",
            marginBottom: "5mm",
          }}
        >
          {retainers.map((r) => (
            <RetainerCard key={r.name} {...r} />
          ))}
        </div>

        {/* HAIRLINE + ADD-ONS */}
        <div className="pdf-hairline" style={{ marginBottom: "4mm" }} />

        <div style={{ marginBottom: "4mm" }}>
          <div
            className="pdf-micro-caps"
            style={{
              color: "#38bdf8",
              fontSize: "7.5pt",
              marginBottom: "3mm",
            }}
          >
            Add-ons · Disponibles à la carte
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "3mm",
            }}
          >
            {addons.map((a) => (
              <div
                key={a.label}
                style={{
                  padding: "3mm 4mm",
                  borderRadius: "8px",
                  border: "1px dashed rgba(56,189,248,0.30)",
                  background: "rgba(56,189,248,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1mm",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "9pt",
                    fontWeight: 600,
                    color: "#ffffff",
                    letterSpacing: "-0.005em",
                  }}
                >
                  + {a.label}
                </div>
                <div
                  className="text-gradient"
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "10pt",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {a.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CITATION + Devis */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "3mm",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "5mm",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-btn), Georgia, serif",
              fontStyle: "italic",
              fontSize: "10.5pt",
              color: "#cbd5e1",
              lineHeight: 1.3,
            }}
          >
            Engagement{" "}
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>
              mois par mois
            </span>
            . Vous arrêtez quand vous voulez.
          </div>
          <div
            className="pdf-micro-caps"
            style={{
              fontSize: "7pt",
              color: "#94a3b8",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "6mm",
                height: "1px",
                background: "rgba(148,163,184,0.4)",
              }}
            />
            Devis personnalisé · Validé sous 48 h
          </div>
        </div>
      </div>

      <PageFooter pageNumber="05" />
    </>
  );
}

function RetainerCard({
  name,
  price,
  tagline,
  icon,
  features,
  note,
  popular,
}: {
  name: string;
  price: string;
  tagline: string;
  icon: string;
  features: string[];
  note: string;
  popular: boolean;
}) {
  return (
    <div
      style={{
        background: popular
          ? "linear-gradient(160deg, #1e293b 0%, #0f172a 100%)"
          : "#0a0f1d",
        border: popular
          ? "1px solid rgba(56,189,248,0.5)"
          : "1px solid rgba(56,189,248,0.15)",
        borderRadius: "10px",
        padding: "4mm 4mm 4mm",
        position: "relative",
        boxShadow: popular
          ? "0 0 40px rgba(56,189,248,0.10), inset 0 0 30px rgba(56,189,248,0.05)"
          : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {popular && (
        <div
          style={{
            position: "absolute",
            top: "-2.5mm",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
            color: "#000000",
            padding: "0.8mm 3mm",
            borderRadius: "999px",
            fontSize: "6.2pt",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(56,189,248,0.4)",
          }}
        >
          ★ Le plus rentable
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5mm",
        }}
      >
        <span
          className="pdf-micro-caps"
          style={{
            color: popular ? "#38bdf8" : "#94a3b8",
            fontSize: "7pt",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-btn), Georgia, serif",
            fontStyle: "italic",
            fontSize: "16pt",
            color: "rgba(56,189,248,0.5)",
            lineHeight: 1,
          }}
        >
          {icon}
        </span>
      </div>

      <p
        style={{
          fontFamily: "var(--font-btn), Georgia, serif",
          fontStyle: "italic",
          fontSize: "9.5pt",
          color: "#ffffff",
          lineHeight: 1.3,
          margin: "0 0 3mm 0",
          minHeight: "9mm",
          fontWeight: 400,
        }}
      >
        {tagline}
      </p>

      <div
        className={popular ? "text-gradient" : ""}
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: popular ? "13pt" : "11pt",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: popular ? undefined : "#ffffff",
          marginBottom: "3mm",
        }}
      >
        {price}
      </div>

      <div
        style={{
          width: "10mm",
          height: "1px",
          background: popular
            ? "rgba(56,189,248,0.5)"
            : "rgba(148,163,184,0.3)",
          marginBottom: "3mm",
        }}
      />

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1.3mm",
          flex: 1,
        }}
      >
        {features.map((f) => (
          <li
            key={f}
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "7.5pt",
              color: "#cbd5e1",
              display: "flex",
              alignItems: "flex-start",
              gap: "5px",
              lineHeight: 1.3,
            }}
          >
            <span
              style={{
                color: "#38bdf8",
                fontWeight: 700,
                marginTop: "0.5px",
              }}
            >
              ✓
            </span>{" "}
            {f}
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "3mm",
          paddingTop: "2.5mm",
          borderTop: "1px dashed rgba(56,189,248,0.18)",
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "6.8pt",
          color: "#94a3b8",
          lineHeight: 1.35,
          fontStyle: "italic",
        }}
      >
        {note}
      </div>
    </div>
  );
}
