import Image from "next/image";
import { PdfPage } from "@/components/plaquette/PdfPage";
import { BlobBackground } from "@/components/plaquette/BlobBackground";
import { PrintButton } from "@/components/plaquette/PrintButton";

export const metadata = {
  title: "Guide de l'apporteur — StellarWave",
  description:
    "Support de vente pour les apporteurs d'affaires StellarWave (programme d'affiliation 8 %).",
  robots: { index: false, follow: false },
};

const CYAN = "#38bdf8";
const CYAN_LIGHT = "#7dd3fc";
const MONA = "var(--font-mona), system-ui, sans-serif";
const SERIF = "var(--font-btn), Georgia, serif";

export default function GuideApporteurPage() {
  return (
    <>
      <PdfPage noise={false}>
        <Cover />
      </PdfPage>
      <PdfPage noise={false}>
        <Deal />
      </PdfPage>
      <PdfPage noise={false}>
        <Signals />
      </PdfPage>
      <PdfPage noise={false}>
        <Offers />
      </PdfPage>
      <PdfPage noise={false}>
        <Proofs />
      </PdfPage>
      <PdfPage noise={false}>
        <HowToTalk />
      </PdfPage>
      <PdfPage noise={false}>
        <HandOff />
      </PdfPage>

      <a
        href="/decks/commerciaux/stellarwave-guide-apporteur-fr.pdf"
        download
        className="print-hidden"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999,
          background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
          color: "#000",
          padding: "12px 20px",
          borderRadius: "999px",
          fontFamily: MONA,
          fontSize: "13px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        ↓ Télécharger le PDF
      </a>
      <PrintButton />
    </>
  );
}

/* ───────────────────────── Helpers ───────────────────────── */

function Eyebrow({
  children,
  color = "#94a3b8",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className="pdf-micro-caps"
      style={{
        color,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "8pt",
      }}
    >
      <span style={{ width: "10mm", height: "1px", background: color }} />
      {children}
    </div>
  );
}

function Jumbo({ n }: { n: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "8mm",
        right: "12mm",
        fontFamily: SERIF,
        fontStyle: "italic",
        fontSize: "180pt",
        color: "rgba(56,189,248,0.07)",
        lineHeight: 0.85,
        letterSpacing: "-0.05em",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      {n}
    </div>
  );
}

function Footer({ n }: { n: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "4mm",
        borderTop: "1px solid rgba(56,189,248,0.15)",
      }}
    >
      <div style={{ fontFamily: MONA, fontSize: "8.5pt", color: "#94a3b8" }}>
        stellarwave.fr · contact@stellarwave.fr · +33 6 25 05 97 32
      </div>
      <div className="pdf-page-number" style={{ color: CYAN, fontSize: "8.5pt" }}>
        <span style={{ color: "#94a3b8" }}>PAGE</span> 0{n}{" "}
        <span style={{ color: "#475569" }}>/</span>{" "}
        <span style={{ color: "#94a3b8" }}>07</span>
      </div>
    </div>
  );
}

function TopBar({ label }: { label: string }) {
  return (
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
        width={220}
        height={50}
        priority
        style={{ height: "10mm", width: "auto" }}
      />
      <span className="pdf-micro-caps" style={{ color: "#94a3b8", fontSize: "7.5pt" }}>
        {label}
      </span>
    </div>
  );
}

function SectionTitle({
  light,
  accent,
  strong,
}: {
  light: string;
  accent?: string;
  strong?: string;
}) {
  return (
    <h2
      style={{
        fontFamily: MONA,
        fontSize: "34pt",
        fontWeight: 300,
        lineHeight: 1.0,
        letterSpacing: "-0.03em",
        color: "rgba(255,255,255,0.6)",
        margin: "5mm 0 0 0",
      }}
    >
      {light}{" "}
      {accent ? (
        <span style={{ fontFamily: SERIF, fontStyle: "italic", color: CYAN }}>
          {accent}
        </span>
      ) : null}
      {strong ? (
        <span style={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.04em" }}>
          {" "}
          {strong}
        </span>
      ) : null}
    </h2>
  );
}

/* ───────────────────────── Page 1 — Couverture ───────────────────────── */

function Cover() {
  return (
    <>
      <BlobBackground variant="top-left" intensity="intense" />
      <Jumbo n="∞" />
      <div
        className="pdf-content"
        style={{ inset: "16mm", zIndex: 2, justifyContent: "space-between" }}
      >
        <TopBar label="Programme d'affiliation · 2026" />

        <div style={{ marginRight: "10mm" }}>
          <Eyebrow color={CYAN}>Guide de l'apporteur</Eyebrow>
          <h1
            style={{
              fontFamily: MONA,
              fontSize: "62pt",
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.6)",
              margin: "6mm 0 0 0",
            }}
          >
            Vous présentez.
            <br />
            <span style={{ fontFamily: SERIF, fontStyle: "italic", color: CYAN }}>
              On construit.
            </span>
            <br />
            <span style={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.045em" }}>
              Vous touchez 8&nbsp;%.
            </span>
          </h1>
          <p
            style={{
              marginTop: "9mm",
              fontFamily: MONA,
              fontSize: "13pt",
              lineHeight: 1.5,
              color: "#cbd5e1",
              maxWidth: "150mm",
            }}
          >
            Tout ce qu'il faut pour parler de StellarWave et toucher votre
            commission —{" "}
            <span style={{ color: "#94a3b8" }}>
              sans rien connaître à la technique.
            </span>
          </p>
        </div>

        <Footer n={1} />
      </div>
    </>
  );
}

/* ───────────────────────── Page 2 — Le deal ───────────────────────── */

const STEPS = [
  {
    n: "1",
    t: "Vous présentez",
    d: "Un dirigeant a un besoin digital ? Vous nous le présentez. C'est tout.",
  },
  {
    n: "2",
    t: "On gère tout",
    d: "Cadrage, devis à prix fixe, développement, livraison et support. Zéro travail pour vous.",
  },
  {
    n: "3",
    t: "Vous êtes payé",
    d: "Le projet est signé puis encaissé ? Vous touchez votre commission.",
  },
];

function Deal() {
  return (
    <>
      <BlobBackground variant="top-right" intensity="default" />
      <Jumbo n="01" />
      <div className="pdf-content" style={{ inset: "16mm", zIndex: 2, justifyContent: "space-between" }}>
        <TopBar label="Le deal" />
        <div>
          <Eyebrow color={CYAN}>En 30 secondes</Eyebrow>
          <SectionTitle light="Simple." accent="Sans risque." strong="Rémunérateur." />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5mm" }}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                background: "#0f172a",
                border: "1px solid rgba(56,189,248,0.18)",
                borderRadius: "12px",
                padding: "7mm 6mm",
              }}
            >
              <div
                style={{
                  width: "10mm",
                  height: "10mm",
                  borderRadius: "8px",
                  background: CYAN,
                  color: "#020617",
                  fontFamily: MONA,
                  fontWeight: 800,
                  fontSize: "16pt",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "4mm",
                }}
              >
                {s.n}
              </div>
              <div style={{ fontFamily: MONA, fontWeight: 700, fontSize: "13pt", color: "#fff", marginBottom: "2mm" }}>
                {s.t}
              </div>
              <div style={{ fontFamily: MONA, fontSize: "10pt", lineHeight: 1.45, color: "#cbd5e1" }}>
                {s.d}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#0ea5e9",
            borderRadius: "14px",
            padding: "8mm 9mm",
            color: "#020617",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="pdf-micro-caps" style={{ color: "rgba(2,6,23,0.6)", fontSize: "8pt" }}>
              Votre commission
            </div>
            <div style={{ fontFamily: MONA, fontWeight: 800, fontSize: "30pt", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              8 % du contrat
            </div>
            <div style={{ fontFamily: MONA, fontSize: "11pt", fontWeight: 600, color: "#0c1f33" }}>
              Soit 1 440 à 3 200 € par client présenté.
            </div>
            <div style={{ fontFamily: MONA, fontSize: "8pt", color: "#0c1f33", opacity: 0.65, marginTop: "1mm" }}>
              Fourchette indicative — sur un projet sur mesure typique.
            </div>
          </div>
          <div style={{ textAlign: "right", fontFamily: MONA, fontSize: "9.5pt", color: "#0c1f33", maxWidth: "60mm", lineHeight: 1.5 }}>
            Versé à l'encaissement.
            <br />
            Sans exclusivité, sans engagement.
            <br />
            <strong>Aucun risque pour vous.</strong>
          </div>
        </div>

        <Footer n={2} />
      </div>
    </>
  );
}

/* ───────────────────────── Page 3 — Qui présenter ───────────────────────── */

const SIGNALS = [
  "« Mon site date / je n'ai pas de site. »",
  "« On gère tout sur Excel. »",
  "« Je refais les mêmes tâches en boucle. »",
  "« Je passe mes soirées sur les devis et les relances. »",
  "« Je réponds 50 fois aux mêmes questions clients. »",
  "« J'aimerais une appli mais je ne sais pas par où commencer. »",
  "« Mon logiciel actuel ne fait pas ce que je veux. »",
  "« Mes clients m'appellent pour un oui ou un non. »",
];

function Signals() {
  return (
    <>
      <BlobBackground variant="center" intensity="subtle" />
      <Jumbo n="02" />
      <div className="pdf-content" style={{ inset: "16mm", zIndex: 2, justifyContent: "space-between" }}>
        <TopBar label="Qui présenter" />
        <div>
          <Eyebrow color={CYAN}>Tendez l'oreille</Eyebrow>
          <SectionTitle light="Ces phrases" strong="= un client pour nous." />
          <p style={{ fontFamily: MONA, fontSize: "11pt", color: "#94a3b8", marginTop: "4mm", maxWidth: "150mm", lineHeight: 1.5 }}>
            Dès qu'un dirigeant lâche une de ces phrases, notez-le et présentez-le. Vous n'avez pas à savoir <em>comment</em> on le fait.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5mm" }}>
          {SIGNALS.map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4mm",
                background: "#0f172a",
                border: "1px solid rgba(56,189,248,0.12)",
                borderRadius: "10px",
                padding: "5mm 6mm",
                fontFamily: MONA,
                fontSize: "11pt",
                color: "#e2e8f0",
              }}
            >
              <span style={{ color: CYAN, fontSize: "16pt", fontFamily: SERIF }}>›</span>
              {s}
            </div>
          ))}
        </div>

        <div style={{ fontFamily: MONA, fontSize: "10.5pt", color: "#cbd5e1", lineHeight: 1.5 }}>
          <strong style={{ color: CYAN_LIGHT }}>Le bon profil :</strong> dirigeant de PME, TPE, artisan, commerçant, formateur, profession libérale… avec une galère digitale et de quoi investir.
        </div>

        <Footer n={3} />
      </div>
    </>
  );
}

/* ───────────────────────── Page 4 — Ce qu'on sait faire ───────────────────────── */

const OFFERS = [
  {
    t: "Sites & boutiques en ligne",
    d: "Vitrines qui donnent envie de vous contacter, sites de vente, prise de rendez-vous.",
    p: "Déjà fait pour : formation, artisanat",
  },
  {
    t: "Applications mobiles",
    d: "Une appli iPhone + Android pour vos clients ou vos équipes — qui marche même sans connexion.",
    p: "Déjà fait pour : auto-école, formation",
  },
  {
    t: "Outils de gestion sur mesure",
    d: "Remplacez vos fichiers Excel : suivi clients, tableaux de bord, espaces privés sécurisés.",
    p: "Déjà fait pour : restaurant, syndic",
  },
  {
    t: "Assistants IA & automatisations",
    d: "Des assistants qui travaillent à votre place : réponses WhatsApp, tri des mails, devis et factures générés automatiquement.",
    p: "Déjà fait pour : restaurant (WhatsApp), bâtiment (mails & devis)",
    star: true,
  },
  {
    t: "Image de marque",
    d: "Logo, identité, cartes de visite prêtes pour l'imprimeur, signatures e-mail.",
    p: "Déjà fait pour : formation médicale",
  },
];

function Offers() {
  return (
    <>
      <BlobBackground variant="top-left" intensity="default" />
      <Jumbo n="03" />
      <div className="pdf-content" style={{ inset: "16mm", zIndex: 2, justifyContent: "space-between" }}>
        <TopBar label="Ce qu'on sait faire" />
        <div>
          <Eyebrow color={CYAN}>Nos offres, en clair</Eyebrow>
          <SectionTitle light="On transforme une galère" strong="en outil." />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3mm" }}>
          {OFFERS.map((o) => (
            <div
              key={o.t}
              style={{
                background: o.star ? "rgba(56,189,248,0.08)" : "#0f172a",
                border: `1px solid ${o.star ? "rgba(56,189,248,0.4)" : "rgba(56,189,248,0.12)"}`,
                borderRadius: "10px",
                padding: "5mm 7mm",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "6mm",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MONA, fontWeight: 700, fontSize: "13pt", color: o.star ? CYAN_LIGHT : "#fff" }}>
                  {o.t}
                  {o.star ? <span style={{ fontFamily: SERIF, fontStyle: "italic", color: CYAN, fontSize: "11pt" }}> · le plus demandé</span> : null}
                </div>
                <div style={{ fontFamily: MONA, fontSize: "10pt", color: "#cbd5e1", lineHeight: 1.4, marginTop: "1.5mm" }}>
                  {o.d}
                </div>
              </div>
              <div style={{ fontFamily: MONA, fontSize: "8pt", color: "#94a3b8", textAlign: "right", maxWidth: "48mm", lineHeight: 1.4 }}>
                {o.p}
              </div>
            </div>
          ))}
        </div>

        <Footer n={4} />
      </div>
    </>
  );
}

/* ───────────────────────── Page 5 — Réalisations ───────────────────────── */

const PROOFS = [
  { e: "🍽️", t: "Fidelya", s: "Restauration", d: "Fidélité client + caisse + relances WhatsApp automatiques." },
  { e: "🏗️", t: "RA Bâtiment", s: "Bâtiment", d: "Suivi des chantiers, rapports par mail, devis & factures auto." },
  { e: "⛵", t: "BoatAcademy", s: "Auto-école bateau", d: "Appli mobile élève (iPhone + Android) + paiement en ligne." },
  { e: "🚕", t: "École Gallieni", s: "Formation TAXI/VTC", d: "Appli native sauvée et republiée sur l'App Store + suivi élèves." },
  { e: "🥖", t: "OnMangeQuoi", s: "Commerces alimentaires", d: "Référencement de 1000+ commerces + back-office d'admin." },
  { e: "📹", t: "Stellarvision", s: "Copropriétés", d: "Extraction vidéo à la demande, 100 % conforme RGPD." },
];

function Proofs() {
  return (
    <>
      <BlobBackground variant="bottom-right" intensity="default" />
      <Jumbo n="04" />
      <div className="pdf-content" style={{ inset: "16mm", zIndex: 2, justifyContent: "space-between" }}>
        <TopBar label="Nos réalisations" />
        <div>
          <Eyebrow color={CYAN}>Des preuves, pas des promesses</Eyebrow>
          <SectionTitle light="Déjà livré," accent="déjà en service." />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5mm" }}>
          {PROOFS.map((p) => (
            <div
              key={p.t}
              style={{
                background: "#0f172a",
                border: "1px solid rgba(56,189,248,0.12)",
                borderRadius: "10px",
                padding: "5mm 6mm",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "3mm", marginBottom: "1.5mm" }}>
                <span style={{ fontSize: "13pt" }}>{p.e}</span>
                <span style={{ fontFamily: MONA, fontWeight: 700, fontSize: "12.5pt", color: "#fff" }}>{p.t}</span>
                <span className="pdf-micro-caps" style={{ color: CYAN, fontSize: "6.5pt" }}>{p.s}</span>
              </div>
              <div style={{ fontFamily: MONA, fontSize: "10pt", color: "#cbd5e1", lineHeight: 1.45 }}>{p.d}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: MONA, fontSize: "10pt", color: "#94a3b8", lineHeight: 1.5 }}>
          Secteurs déjà adressés : <strong style={{ color: "#cbd5e1" }}>restauration, bâtiment, formation, copropriété, commerce, artisanat.</strong> Citez l'exemple le plus proche de votre contact.
        </div>

        <Footer n={5} />
      </div>
    </>
  );
}

/* ───────────────────────── Page 6 — Comment en parler ───────────────────────── */

const OBJECTIONS = [
  { q: "« Ça coûte combien ? »", a: "« Ça dépend du projet — c'est pour ça qu'ils font un devis à prix fixe gratuit. Pas de surprise, validé avant de démarrer. »" },
  { q: "« J'ai déjà un prestataire. »", a: "« Top — ça vaut un 2ᵉ avis gratuit, sans engagement. Beaucoup voient la différence sur le suivi. »" },
  { q: "« C'est fiable, vous êtes qui ? »", a: "« StellarWave, éditeur de logiciels en Île-de-France. Ils ont livré pour des restaurants, écoles, syndics… Je peux t'envoyer des exemples. »" },
];

function HowToTalk() {
  return (
    <>
      <BlobBackground variant="top-right" intensity="subtle" />
      <Jumbo n="05" />
      <div className="pdf-content" style={{ inset: "16mm", zIndex: 2, justifyContent: "space-between" }}>
        <TopBar label="Comment en parler" />
        <div>
          <Eyebrow color={CYAN}>Votre script</Eyebrow>
          <SectionTitle light="30 secondes" strong="pour lancer le sujet." />
        </div>

        <div
          style={{
            background: "#0f172a",
            borderLeft: `3px solid ${CYAN}`,
            borderRadius: "10px",
            padding: "7mm 8mm",
            fontFamily: MONA,
            fontSize: "12pt",
            lineHeight: 1.6,
            color: "#e2e8f0",
            fontStyle: "italic",
          }}
        >
          « Tu me disais que tu galères avec{" "}
          <strong style={{ color: CYAN_LIGHT, fontStyle: "normal" }}>
            ton site / Excel / des tâches répétitives
          </strong>{" "}
          ? J'ai un partenaire,{" "}
          <strong style={{ color: CYAN_LIGHT, fontStyle: "normal" }}>
            StellarWave
          </strong>{" "}
          : ils créent des logiciels sur mesure pour des PME comme la tienne, et
          ont déjà accompagné des boîtes de ton secteur. Tu veux que je te les
          présente ? C'est un audit gratuit, sans engagement. »
        </div>

        <div>
          <Eyebrow color="#94a3b8">Répondre aux 3 questions classiques</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5mm", marginTop: "3mm" }}>
            {OBJECTIONS.map((o) => (
              <div key={o.q} style={{ background: "#0b1220", borderRadius: "8px", padding: "4mm 6mm" }}>
                <div style={{ fontFamily: MONA, fontWeight: 700, fontSize: "10.5pt", color: "#fff", marginBottom: "1mm" }}>{o.q}</div>
                <div style={{ fontFamily: MONA, fontSize: "10pt", color: "#cbd5e1", lineHeight: 1.45 }}>{o.a}</div>
              </div>
            ))}
          </div>
        </div>

        <Footer n={6} />
      </div>
    </>
  );
}

/* ───────────────────────── Page 7 — Passer la main ───────────────────────── */

function HandOff() {
  return (
    <>
      <BlobBackground variant="center" intensity="intense" />
      <Jumbo n="06" />
      <div className="pdf-content" style={{ inset: "16mm", zIndex: 2, justifyContent: "space-between" }}>
        <TopBar label="Passer la main" />
        <div>
          <Eyebrow color={CYAN}>La dernière étape</Eyebrow>
          <SectionTitle light="Vous transmettez," strong="on prend le relais." />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4mm" }}>
          <div style={{ fontFamily: MONA, fontSize: "12pt", color: "#e2e8f0", lineHeight: 1.6 }}>
            Présentez-nous le contact en une phrase : <strong style={{ color: CYAN_LIGHT }}>nom, entreprise, et le besoin</strong>. Par e-mail, WhatsApp, ou en nous mettant en copie. On reprend la main <strong>sous 24 à 48 h</strong>.
          </div>
          <div
            style={{
              background: "#0ea5e9",
              borderRadius: "14px",
              padding: "8mm 9mm",
              color: "#020617",
            }}
          >
            <div className="pdf-micro-caps" style={{ color: "rgba(2,6,23,0.6)", fontSize: "8pt" }}>
              Pour présenter un contact ou poser une question
            </div>
            <div style={{ fontFamily: MONA, fontWeight: 800, fontSize: "22pt", margin: "2mm 0", letterSpacing: "-0.02em" }}>
              contact@stellarwave.fr
            </div>
            <div style={{ fontFamily: MONA, fontSize: "11pt", fontWeight: 600, color: "#0c1f33" }}>
              Réserver 30 min : calendar.app.google/51BiLHgAVhsLrxTC9 · +33 6 25 05 97 32
            </div>
          </div>
          <div style={{ fontFamily: MONA, fontSize: "10.5pt", color: "#94a3b8", lineHeight: 1.5 }}>
            Vous restez informé à chaque étape, et vous touchez votre commission <strong style={{ color: "#cbd5e1" }}>dès l'encaissement du client</strong>.
          </div>
        </div>

        <div style={{ fontFamily: MONA, fontSize: "7.5pt", color: "#64748b", lineHeight: 1.5, borderTop: "1px solid rgba(56,189,248,0.15)", paddingTop: "4mm" }}>
          STELLARWAVE · Éditeur de logiciels — SASU au capital de 500 € · RCS Bobigny 104 979 125 · 23 Rue de Normandie, 93000 Bobigny · contact@stellarwave.fr · stellarwave.fr
        </div>
      </div>
    </>
  );
}
