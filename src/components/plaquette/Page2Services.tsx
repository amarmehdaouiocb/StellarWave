import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { BlobBackground } from "./BlobBackground";
import { services } from "@/config/brand";

// Override commercial : on masque les références aux technos (React, Next.js,
// CMS headless, GraphQL, PWA, React Native, Flutter…) au profit de bénéfices
// métier compréhensibles par un dirigeant non-technique.
const featureOverrides: Record<string, readonly string[]> = {
  "landing-pages": [
    "Lighthouse 95+",
    "SEO avancé",
    "Tests A/B intégrés",
    "Analytics intégré",
  ],
  websites: [
    "Design sur mesure",
    "Édition autonome",
    "Multi-langue",
    "Performance optimale",
  ],
  "web-apps": [
    "Architecture moderne",
    "Intégrations sur mesure",
    "Synchronisation instantanée",
    "Mode hors-ligne",
  ],
  "mobile-apps": [
    "iOS & Android",
    "Développement unifié",
    "Notifications push",
    "Mode hors-ligne",
  ],
};

const descriptionOverrides: Record<string, string> = {
  "landing-pages":
    "Pages de conversion ultra-optimisées. SEO avancé, performance Lighthouse 95+, design qui convertit.",
  websites:
    "Sites vitrines et corporate qui marquent les esprits. Design premium, édition autonome, performances exceptionnelles.",
  "web-apps":
    "SaaS, dashboards, portails métier. Architecture moderne, scalabilité native, expérience utilisateur fluide.",
  "mobile-apps":
    "Applications iOS et Android premium. Publication App Store & Play Store, équipe unifiée pour les deux plateformes.",
};

const webServices = services
  .filter((s) => s.id !== "cloud")
  .map((s) => ({
    ...s,
    features: featureOverrides[s.id] ?? s.features,
    description: descriptionOverrides[s.id] ?? s.description,
  }));

// Quatre paliers commerciaux. Growth est split en Lite (MVP lean ~6 sem,
// 1 rôle, 6-10 écrans) et Pro (app complète multi-rôles, intégrations,
// 3 mois support, formation) — pour aligner le prix à la promesse réelle.
type CommercialOffer = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular: boolean;
};

const commercialOffers: CommercialOffer[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Pour tester notre approche sur un projet ciblé.",
    price: "À partir de 5 000 €",
    features: [
      "Landing page ou site vitrine",
      "Design premium responsive",
      "SEO de base",
      "Lighthouse 90+",
      "2 semaines de support",
    ],
    popular: false,
  },
  {
    id: "growth-lite",
    name: "Growth Lite",
    description: "MVP lean pour valider votre produit en 6 semaines.",
    price: "À partir de 15 000 €",
    features: [
      "Application web (1 rôle)",
      "6 à 10 écrans fonctionnels",
      "Auth + base de données",
      "Design soigné, pas custom",
      "1 mois de support",
    ],
    popular: true,
  },
  {
    id: "growth-pro",
    name: "Growth Pro",
    description: "Application complète pour les projets ambitieux.",
    price: "À partir de 28 000 €",
    features: [
      "App multi-rôles complète",
      "Design system sur mesure",
      "Intégrations sur mesure",
      "Tests qualité automatisés",
      "3 mois de support",
      "Formation équipe",
    ],
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Pour les projets stratégiques.",
    price: "Sur mesure",
    features: [
      "Infrastructure complète",
      "Applications multi-plateformes",
      "Équipe dédiée",
      "SLA garanti",
      "Support prioritaire 24/7",
      "Évolutions continues",
    ],
    popular: false,
  },
];

export function Page2Services() {
  return (
    <>
      <BlobBackground variant="top-right" intensity="subtle" />

      {/* Numéro jumbo en filigrane top-right */}
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
        02
      </div>

      <PageHeader pageNumber="02" pageLabel="L'offre" />

      <div
        className="pdf-content"
        style={{ inset: "30mm 14mm 24mm 14mm", zIndex: 2 }}
      >
        {/* ZONE A — SERVICES */}
        <div style={{ marginBottom: "5mm" }}>
          <h2
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "27pt",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            Quatre services.{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              Une{" "}
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#38bdf8",
                }}
              >
                exécution
              </span>
              .
            </span>
          </h2>
          <p
            style={{
              marginTop: "2mm",
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "9pt",
              color: "#94a3b8",
              maxWidth: "120mm",
              margin: "2mm 0 0 0",
            }}
          >
            Une seule équipe pour design, code, déploiement et performance.
            Du brief à la production, sans intermédiaire.
          </p>
        </div>

        {/* Grille 2x2 services */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3mm",
            marginBottom: "4mm",
          }}
        >
          {webServices.map((service, i) => (
            <ServiceCard
              key={service.id}
              index={String(i + 1).padStart(2, "0")}
              title={service.title}
              description={service.description}
              features={[...service.features]}
            />
          ))}
        </div>

        {/* Bandeau cloud en mention */}
        <div
          style={{
            marginBottom: "5mm",
            padding: "3mm 5mm",
            borderRadius: "8px",
            border: "1px dashed rgba(56,189,248,0.30)",
            background: "rgba(56,189,248,0.04)",
            display: "flex",
            alignItems: "center",
            gap: "6mm",
          }}
        >
          <div
            className="pdf-micro-caps"
            style={{
              color: "#38bdf8",
              whiteSpace: "nowrap",
              borderRight: "1px solid rgba(56,189,248,0.25)",
              paddingRight: "6mm",
              fontSize: "7.5pt",
            }}
          >
            + Architecture cloud
          </div>
          <div
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "8pt",
              color: "#cbd5e1",
              lineHeight: 1.35,
            }}
          >
            En complément de chaque projet : optimisation et sécurité de
            votre infrastructure d&apos;hébergement.{" "}
            <strong style={{ color: "#ffffff", fontWeight: 600 }}>
              –65 % de coûts d&apos;hébergement en moyenne.
            </strong>
          </div>
        </div>

        {/* Hairline separator */}
        <div className="pdf-hairline" style={{ marginBottom: "5mm" }} />

        {/* ZONE B — OFFRES TARIFÉES */}
        <div style={{ marginBottom: "4mm" }}>
          <div
            className="pdf-micro-caps"
            style={{ color: "#38bdf8", marginBottom: "2mm", fontSize: "7.5pt" }}
          >
            Tarifs · Prix fixes
          </div>
          <h2
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "22pt",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Quatre{" "}
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              formules
            </span>{" "}
            pour démarrer.
          </h2>
          <p
            style={{
              marginTop: "1.5mm",
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "8.5pt",
              color: "#94a3b8",
              margin: "1.5mm 0 0 0",
            }}
          >
            Devis validé avant le démarrage. Aucun dépassement refacturé.
          </p>
        </div>

        {/* Pricing 4 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr 1.05fr 1fr",
            gap: "2.5mm",
            alignItems: "stretch",
          }}
        >
          {commercialOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* Mention devis personnalisé */}
        <div
          style={{
            marginTop: "3mm",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="pdf-micro-caps"
            style={{
              fontSize: "7pt",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "8mm",
                height: "1px",
                background: "rgba(148,163,184,0.4)",
              }}
            />
            Devis personnalisé · Validé sous 48 h · Sans engagement
            <span
              style={{
                width: "8mm",
                height: "1px",
                background: "rgba(148,163,184,0.4)",
              }}
            />
          </div>
        </div>
      </div>

      <PageFooter pageNumber="02" />
    </>
  );
}

function ServiceCard({
  index,
  title,
  description,
  features,
}: {
  index: string;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "10px",
        padding: "4mm 5mm 4mm",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "5mm",
          width: "12mm",
          height: "1.5px",
          background: "#38bdf8",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "2mm",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "12pt",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-btn), Georgia, serif",
            fontStyle: "italic",
            fontSize: "14pt",
            color: "rgba(56,189,248,0.6)",
            lineHeight: 1,
          }}
        >
          {index}
        </span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "8pt",
          color: "#cbd5e1",
          lineHeight: 1.4,
          marginTop: 0,
          marginBottom: "2.5mm",
        }}
      >
        {description}
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "1mm",
          columnGap: "3mm",
        }}
      >
        {features.map((f) => (
          <li
            key={f}
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "7pt",
              color: "#cbd5e1",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>+</span> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OfferCard({
  offer,
}: {
  offer: CommercialOffer;
}) {
  const isPopular = offer.popular;
  return (
    <div
      style={{
        background: isPopular
          ? "linear-gradient(160deg, #1e293b 0%, #0f172a 100%)"
          : "#0a0f1d",
        border: isPopular
          ? "1px solid rgba(56,189,248,0.5)"
          : "1px solid rgba(56,189,248,0.15)",
        borderRadius: "10px",
        padding: "3.5mm 3.5mm 4mm",
        position: "relative",
        boxShadow: isPopular
          ? "0 0 40px rgba(56,189,248,0.10), inset 0 0 30px rgba(56,189,248,0.05)"
          : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isPopular && (
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
            fontSize: "5.8pt",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(56,189,248,0.4)",
          }}
        >
          ★ Le plus vendu
        </div>
      )}
      <div
        className="pdf-micro-caps"
        style={{
          color: isPopular ? "#38bdf8" : "#94a3b8",
          marginBottom: "1.5mm",
          fontSize: "7pt",
        }}
      >
        {offer.name}
      </div>
      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "7.5pt",
          color: "#cbd5e1",
          lineHeight: 1.3,
          margin: "0 0 2.5mm 0",
          minHeight: "11mm",
        }}
      >
        {offer.description}
      </p>
      <div
        className={isPopular ? "text-gradient" : ""}
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: isPopular ? "12.5pt" : "11pt",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: isPopular ? undefined : "#ffffff",
          marginBottom: "2.5mm",
        }}
      >
        {offer.price}
      </div>
      <div
        style={{
          width: "10mm",
          height: "1px",
          background: isPopular
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
        {offer.features.map((f) => (
          <li
            key={f}
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "7pt",
              color: "#cbd5e1",
              display: "flex",
              alignItems: "flex-start",
              gap: "4px",
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
