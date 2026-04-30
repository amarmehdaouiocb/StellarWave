import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { BlobBackground } from "./BlobBackground";

const capabilities = [
  {
    num: "01",
    title: "Mockups instantanés",
    description:
      "4 variantes de hero, banner ou landing prêtes en quelques minutes. Validation client avant la moindre ligne de code.",
    badge: "Quelques minutes",
  },
  {
    num: "02",
    title: "Cohérence brand garantie",
    description:
      "Un même personnage, produit ou décor décliné sur 50 + visuels. Identité jamais cassée.",
    badge: "Pixel-near",
  },
  {
    num: "03",
    title: "Variations multi-formats",
    description:
      "Un seul brief = 8 visuels parallèles : LinkedIn, Instagram, ads display, formats sociaux.",
    badge: "8 formats",
  },
  {
    num: "04",
    title: "Photoshoot sans shooting",
    description:
      "Lifestyle, packshot, fond blanc, mises en situation. Plus besoin de coûteux shootings.",
    badge: "−80 % budget photo",
  },
  {
    num: "05",
    title: "Texte fiable & multilangue",
    description:
      "Affiches, infographies, slides, packagings, badges. Latin, cyrillique, kanji, arabe.",
    badge: "Multilangue",
  },
  {
    num: "06",
    title: "Édition rapide",
    description:
      "Changer fond, couleur, modèle, tenue ou typo en quelques clics. Sans tout regénérer.",
    badge: "Sans regénération",
  },
];

const packs = [
  {
    name: "Visuel Express",
    price: "À partir de 800 €",
    description: "Pour tester la méthode sur un projet ciblé.",
    features: [
      "5 visuels brand cohérents",
      "Cohérence garantie sur tous",
      "Livraison sous 48 h",
      "2 itérations incluses",
    ],
    popular: false,
  },
  {
    name: "Refonte Marketing",
    price: "À partir de 2 500 €",
    description: "Toute votre comm sociale en un cycle.",
    features: [
      "30 visuels variations",
      "Storyboards LinkedIn / IG",
      "Photoshoot synthétique",
      "Bibliothèque réutilisable",
    ],
    popular: true,
  },
  {
    name: "Brand Library",
    price: "Sur mesure",
    description: "Asset System complet pour scale-up.",
    features: [
      "100 + assets brand",
      "Livre de styles",
      "Formation équipe interne",
      "Templates Figma livrés",
    ],
    popular: false,
  },
];

export function Page4WebdesignAI() {
  return (
    <>
      <BlobBackground variant="bottom-right" intensity="default" />

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
        04
      </div>

      <PageHeader pageNumber="04" pageLabel="Direction artistique" />

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
            Nouveau · Génération visuelle haute cadence
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
            Le design{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              à toute{" "}
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#38bdf8",
                }}
              >
                cadence
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
            Visuels marketing, brand assets, packshots et illustrations.
            Cohérence garantie, déclinaisons illimitées, délais et budgets
            divisés. Compatible avec votre charte graphique existante.
          </p>
        </div>

        {/* GRILLE 2x3 capacités */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "3mm",
            marginBottom: "5mm",
          }}
        >
          {capabilities.map((c) => (
            <CapabilityCard key={c.num} {...c} />
          ))}
        </div>

        {/* HAIRLINE + TARIFS */}
        <div className="pdf-hairline" style={{ marginBottom: "4mm" }} />

        <div style={{ marginBottom: "4mm" }}>
          <div
            className="pdf-micro-caps"
            style={{
              color: "#38bdf8",
              fontSize: "7.5pt",
              marginBottom: "1.5mm",
            }}
          >
            Packs · Disponible en standalone ou en complément Web&nbsp;/&nbsp;Apps
          </div>
          <h3
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "16pt",
              fontWeight: 400,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Trois{" "}
            <span
              style={{
                fontFamily: "var(--font-btn), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#38bdf8",
              }}
            >
              packs
            </span>{" "}
            pour démarrer.
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.08fr 1fr",
            gap: "3mm",
            alignItems: "stretch",
          }}
        >
          {packs.map((p) => (
            <PackCard key={p.name} {...p} />
          ))}
        </div>

        {/* CITATION ROI + mention devis */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "4mm",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2.5mm",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-btn), Georgia, serif",
              fontStyle: "italic",
              fontSize: "11pt",
              color: "#cbd5e1",
              textAlign: "center",
              maxWidth: "140mm",
              lineHeight: 1.4,
            }}
          >
            Itération design{" "}
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>
              10× plus rapide.
            </span>{" "}
            Coûts shooting{" "}
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>
              divisés par 5.
            </span>
          </div>
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
            Devis personnalisé · Validé sous 48 h
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

      <PageFooter pageNumber="04" />
    </>
  );
}

function CapabilityCard({
  num,
  title,
  description,
  badge,
}: {
  num: string;
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "10px",
        padding: "4mm 4mm 3.5mm",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
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
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "2mm",
        }}
      >
        <span
          className="pdf-micro-caps"
          style={{ color: "#94a3b8", fontSize: "6.5pt" }}
        >
          {num}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "6.5pt",
            color: "#38bdf8",
            background: "rgba(56,189,248,0.10)",
            border: "1px solid rgba(56,189,248,0.30)",
            padding: "0.4mm 2mm",
            borderRadius: "999px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "11pt",
          fontWeight: 600,
          color: "#ffffff",
          margin: "0 0 1.5mm 0",
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "7.5pt",
          color: "#cbd5e1",
          lineHeight: 1.4,
          margin: 0,
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

function PackCard({
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
          ★ Le plus demandé
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
          fontSize: popular ? "16pt" : "13pt",
          fontWeight: 700,
          lineHeight: 1,
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
