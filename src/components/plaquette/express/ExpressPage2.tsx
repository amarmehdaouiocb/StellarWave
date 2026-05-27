import Image from "next/image";
import { BlobBackground } from "../BlobBackground";

const clientsLogos = [
  {
    name: "Fidelya",
    logo: "/projects/fidelya-logo.png",
    line: "Les restaurateurs savent rarement qui sont leurs clients ni comment les faire revenir. On a conçu Fidelya, une plateforme de fidélisation tout-en-un : points & cashback, caisse web, commande WhatsApp et campagnes email/SMS — pour transformer un client de passage en habitué.",
  },
  {
    name: "BoatAcademy",
    logo: "/projects/boatacademy-logo.png",
    line: "Un bateau-école qui voulait se dupliquer en franchise, mais tournait encore sur Excel et papier. On a livré une plateforme complète — gestion des sessions, paiements et inscriptions côté école, révisions, planning et paiement en ligne côté stagiaire — pensée multi-écoles pour ouvrir de nouveaux centres.",
  },
  {
    name: "OnMangeQuoi",
    logo: "/projects/onmangequoi.png",
    line: "OnMangeQuoi voulait référencer des centaines de commerces et leur donner de la visibilité, sans saisir chaque fiche à la main. On a créé un formulaire qui se remplit tout seul via Google Places, suggère des offres par IA, et un back-office pour valider et modérer en masse.",
  },
  {
    name: "RA Bâtiment",
    logo: "/projects/ra-batiment-dark.svg",
    line: "Une entreprise du bâtiment noyée sous l'administratif des syndics. On a livré deux outils : un site vitrine qui transforme les visiteurs en demandes de devis, et AppliSyndicOS, une appli web qui automatise tout le suivi — interventions reçues par mail, devis et factures générés, rapports au syndic, chantiers tracés (photos avant/après, commentaire terrain).",
  },
];

const steps = [
  { num: "01", title: "Brief & devis", desc: "Réponse sous 48 h, prix fixe validé." },
  { num: "02", title: "Design & build", desc: "Démos hebdo, vous voyez avancer." },
  { num: "03", title: "Mise en production", desc: "Déploiement progressif, formation équipe." },
  { num: "04", title: "Suivi & évolutions", desc: "Maintenance, optimisations, nouveautés." },
];

export function ExpressPage2() {
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
            alt="StellarWave"
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
            Preuve · Process · Contact
          </div>
        </div>

        {/* CLIENTS */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "28pt",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 5mm 0",
            }}
          >
            Ils nous ont{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#38bdf8",
                }}
              >
                fait confiance
              </span>
              .
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3mm",
            }}
          >
            {clientsLogos.map((c) => (
              <ClientRow key={c.name} {...c} />
            ))}
          </div>
        </div>

        {/* PROCESS 4 STEPS */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "20pt",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 4mm 0",
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
                ça se passe
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
            {steps.map((s) => (
              <div key={s.num}>
                <div
                  className="pdf-micro-caps"
                  style={{ color: "#38bdf8", fontSize: "7pt", marginBottom: "1.5mm" }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "11pt",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "1.5mm",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "8pt",
                    color: "#94a3b8",
                    lineHeight: 1.4,
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA MINI-AUDIT — aplat cyan opaque, sans couche composite :
            évite les artefacts de tuilage du viewer PDF de Gmail mobile) */}
        <div
          style={{
            borderRadius: "14px",
            background: "#0d95d2",
            padding: "8mm 9mm",
            color: "#000000",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8mm",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1.5 1 0" }}>
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
                ★ Gratuit · 15 min · PDF sous 24 h
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
                Mini-audit{" "}
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
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Score performance, audit SEO actionnable, recommandations
                priorisées et estimation chiffrée des gains.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3mm",
                flex: "1 1 0",
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
                  minWidth: "55mm",
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

        {/* CONTACT */}
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
            <ContactItem label="Email" value="contact@stellarwave.fr" />
            <ContactItem label="Tél" value="+33 6 25 05 97 32" />
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
            <span style={{ color: "#94a3b8" }}>PAGE</span> 02{" "}
            <span style={{ color: "#475569" }}>/</span>{" "}
            <span style={{ color: "#94a3b8" }}>02</span>
          </div>
        </div>
      </div>
    </>
  );
}

function ClientRow({
  name,
  logo,
  line,
}: {
  name: string;
  logo: string;
  line: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.18)",
        borderRadius: "10px",
        padding: "4mm 5mm",
        display: "flex",
        alignItems: "center",
        gap: "5mm",
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
          width: "10mm",
          height: "1.5px",
          background: "#38bdf8",
        }}
      />
      <div
        style={{
          width: "13mm",
          height: "13mm",
          borderRadius: "8px",
          background: "#ffffff",
          border: "1px solid rgba(56,189,248,0.15)",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          padding: "1.5mm",
        }}
      >
        <Image
          src={logo}
          alt={name}
          fill
          style={{ objectFit: "contain", padding: "1.5mm" }}
          sizes="52px"
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "13pt",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            marginBottom: "0.5mm",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "8pt",
            color: "#cbd5e1",
            lineHeight: 1.35,
          }}
        >
          {line}
        </div>
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
