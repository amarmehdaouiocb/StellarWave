import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { BlobBackground } from "./BlobBackground";

const workflowSteps = [
  {
    num: "01",
    title: "Demande reçue",
    desc: "Ordre & devis arrivent par email",
    icon: "@",
  },
  {
    num: "02",
    title: "Détection auto",
    desc: "Intervention créée immédiatement",
    icon: "⌘",
  },
  {
    num: "03",
    title: "Alerte équipe",
    desc: "Notification mobile instantanée",
    icon: "→",
  },
  {
    num: "04",
    title: "Photos in situ",
    desc: "Avant / après uploadées",
    icon: "▣",
  },
  {
    num: "05",
    title: "Rapport & Facture",
    desc: "Générés automatiquement",
    icon: "✎",
  },
  {
    num: "06",
    title: "Suivi paiement",
    desc: "Trésorerie centralisée",
    icon: "€",
  },
];

const autoPacks = [
  {
    name: "Pilote",
    price: "À partir de 8 000 €",
    description: "Pour automatiser un workflow critique.",
    features: [
      "Cadrage du workflow",
      "Outil sur mesure",
      "Notifications automatiques",
      "4–6 semaines · 2 mois support",
    ],
    popular: false,
  },
  {
    name: "Workflow",
    price: "À partir de 18 000 €",
    description: "Outil interne complet pour vos équipes.",
    features: [
      "Plateforme web + mobile",
      "Tableau de bord & reporting",
      "Documents générés auto",
      "6–10 semaines · support 3 mois",
      "Formation équipe incluse",
    ],
    popular: true,
  },
  {
    name: "Suite",
    price: "À partir de 35 000 €",
    description: "Plateforme métier multi-équipes.",
    features: [
      "Architecture multi-services",
      "Intégrations sur mesure",
      "Multi-rôles, multi-équipes",
      "8–14 semaines · SLA garanti",
      "Évolutions continues",
    ],
    popular: false,
  },
];

const automationMetrics = [
  { value: "4h", label: "Économisées / jour", sub: "Saisie & coordination" },
  { value: "8 750€", label: "Gain annuel net", sub: "Rentabilisé en 24 mois" },
  { value: "100%", label: "Traçabilité", sub: "Qui · Quand · Quoi" },
  { value: "0", label: "Oubli de facture", sub: "Vs ~3 / mois avant" },
];

export function Page3AutomationAI() {
  return (
    <>
      <BlobBackground variant="top-right" intensity="default" />

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
        03
      </div>

      <PageHeader pageNumber="03" pageLabel="Automatisation sur mesure" />

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
            Nouveau · Outils internes &amp; automatisations
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
            Automatisez{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#38bdf8",
                }}
              >
                votre activité
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
              maxWidth: "150mm",
              margin: "2mm 0 0 0",
              lineHeight: 1.5,
            }}
          >
            Vos tâches manuelles répétitives transformées en outils internes
            sur mesure. Concept, design, développement et déploiement en{" "}
            <span style={{ color: "#ffffff", fontWeight: 600 }}>
              6&nbsp;à&nbsp;12&nbsp;semaines
            </span>
            .
          </p>
        </div>

        {/* CASE STUDY HEADER */}
        <div
          style={{
            marginBottom: "5mm",
            padding: "3.5mm 5mm",
            border: "1px solid rgba(56,189,248,0.25)",
            borderRadius: "10px",
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.06), rgba(56,189,248,0.02))",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "8mm",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                className="pdf-micro-caps"
                style={{
                  color: "#38bdf8",
                  fontSize: "7pt",
                  marginBottom: "1mm",
                }}
              >
                Cas d&apos;étude · Bâtiment / Syndic de copropriété
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
                CoproFlow{" "}
                <span style={{ color: "rgba(56,189,248,0.6)", fontWeight: 400 }}>
                  ×
                </span>{" "}
                AppliSyndicOS
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontSize: "8pt",
                  color: "#cbd5e1",
                  lineHeight: 1.4,
                }}
              >
                <strong style={{ color: "#ffffff", fontWeight: 600 }}>
                  RA Bâtiment
                </strong>{" "}
                ·{" "}
                <span style={{ color: "#94a3b8" }}>
                  partenaire syndic Atrium
                </span>
              </div>
              <div
                className="pdf-micro-caps"
                style={{
                  color: "#94a3b8",
                  fontSize: "6.5pt",
                  marginTop: "1mm",
                }}
              >
                En production · 2025
              </div>
            </div>
          </div>
        </div>

        {/* WORKFLOW 6 STEPS */}
        <div style={{ marginBottom: "5mm", position: "relative" }}>
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
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "1.5mm",
              position: "relative",
            }}
          >
            {workflowSteps.map((s) => (
              <WorkflowStep key={s.num} {...s} />
            ))}
          </div>
        </div>

        {/* METRICS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2.5mm",
            marginBottom: "5mm",
          }}
        >
          {automationMetrics.map((m) => (
            <AutoMetric key={m.label} {...m} />
          ))}
        </div>

        {/* HAIRLINE + TARIFS AUTOMATISATION */}
        <div className="pdf-hairline" style={{ marginBottom: "3.5mm" }} />

        <div style={{ marginBottom: "3mm" }}>
          <div
            className="pdf-micro-caps"
            style={{
              color: "#38bdf8",
              fontSize: "7.5pt",
              marginBottom: "1mm",
            }}
          >
            Tarifs · Trois paliers selon l&apos;ambition
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.08fr 1fr",
            gap: "3mm",
            alignItems: "stretch",
            marginBottom: "3mm",
          }}
        >
          {autoPacks.map((p) => (
            <AutoPackCard key={p.name} {...p} />
          ))}
        </div>

        {/* Mini-bande tease + devis */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "5mm",
            paddingTop: "2mm",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-btn), Georgia, serif",
              fontStyle: "italic",
              fontSize: "10pt",
              color: "#cbd5e1",
              lineHeight: 1.3,
            }}
          >
            Et vous ? Quelle tâche{" "}
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>manuelle</span>{" "}
            avale 5 h de votre semaine ?
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

      <PageFooter pageNumber="03" />
    </>
  );
}

function WorkflowStep({
  num,
  title,
  desc,
  icon,
}: {
  num: string;
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div style={{ position: "relative", paddingTop: "11mm", textAlign: "center" }}>
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
          fontSize: "10pt",
          fontWeight: 700,
          boxShadow: "0 0 0 4px #020617, 0 4px 16px rgba(56,189,248,0.4)",
        }}
      >
        {icon}
      </div>

      <div
        className="pdf-micro-caps"
        style={{ color: "#38bdf8", fontSize: "6pt", marginBottom: "1mm" }}
      >
        {num}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "9.5pt",
          fontWeight: 600,
          color: "#ffffff",
          lineHeight: 1.15,
          marginBottom: "1mm",
          letterSpacing: "-0.005em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "7pt",
          color: "#94a3b8",
          lineHeight: 1.35,
        }}
      >
        {desc}
      </div>
    </div>
  );
}

function AutoMetric({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.20)",
        borderRadius: "10px",
        padding: "4mm 4mm 3.5mm",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)",
        }}
      />
      <div
        className="text-gradient"
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "22pt",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          marginBottom: "2mm",
        }}
      >
        {value}
      </div>
      <div
        className="pdf-micro-caps"
        style={{ color: "#cbd5e1", fontSize: "7pt" }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "7pt",
          color: "#94a3b8",
          lineHeight: 1.35,
          marginTop: "1mm",
        }}
      >
        {sub}
      </div>
    </div>
  );
}

function AutoPackCard({
  name,
  price,
  description,
  features,
  popular,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
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
        padding: "3.5mm 4mm 4mm",
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
          ★ Recommandé
        </div>
      )}
      <div
        className="pdf-micro-caps"
        style={{
          color: popular ? "#38bdf8" : "#94a3b8",
          marginBottom: "1.5mm",
          fontSize: "7.5pt",
        }}
      >
        {name}
      </div>
      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "7.5pt",
          color: "#cbd5e1",
          lineHeight: 1.3,
          margin: "0 0 2.5mm 0",
          minHeight: "8mm",
        }}
      >
        {description}
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
          marginBottom: "2.5mm",
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
          marginBottom: "2.5mm",
        }}
      />
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1.2mm",
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
    </div>
  );
}
