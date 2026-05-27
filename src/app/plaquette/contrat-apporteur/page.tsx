import Image from "next/image";
import { PrintButton } from "@/components/plaquette/PrintButton";

export const metadata = {
  title: "Contrat d'apporteur d'affaires — StellarWave",
  description: "Contrat d'apporteur d'affaires StellarWave (programme d'affiliation).",
  robots: { index: false, follow: false },
};

const INK = "#1a1a2e";
const MUTED = "#475569";
const ACCENT = "#0284c7";
const MONA = "var(--font-mona), system-ui, sans-serif";
const SERIF = "var(--font-btn), Georgia, serif";

const page: React.CSSProperties = {
  background: "#ffffff",
  color: INK,
  display: "flex",
  flexDirection: "column",
};

export default function ContratApporteurPage() {
  return (
    <>
      {/* PAGE 1 */}
      <section className="pdf-page" style={page}>
        <Banner />
        <div style={{ padding: "9mm 18mm 0", flex: 1 }}>
          <h1
            style={{
              fontFamily: MONA,
              fontSize: "21pt",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Contrat d'apporteur d'affaires
          </h1>
          <div style={{ height: "2px", width: "26mm", background: ACCENT, margin: "3mm 0 6mm" }} />

          <p style={para}>Entre les soussignés :</p>
          <p style={para}>
            <strong>STELLARWAVE</strong>, société par actions simplifiée à associé unique (SASU)
            au capital de 500 €, dont le siège social est situé 23 Rue de Normandie, 93000 Bobigny,
            immatriculée au R.C.S. de Bobigny sous le numéro 104 979 125, représentée par
            M. Amar Mehdaoui en sa qualité de Président, ci-après «&nbsp;la Société&nbsp;»,
          </p>
          <p style={{ ...para, textAlign: "center", fontWeight: 700, margin: "2mm 0" }}>et</p>
          <p style={para}>
            <Fill w="70mm" /> , <Fill w="42mm" label="" />, demeurant <Fill w="78mm" />,
            {" "}immatriculé(e) sous le n° SIREN <Fill w="34mm" />, ci-après «&nbsp;l'Apporteur&nbsp;».
          </p>

          <Article n="1" title="Objet">
            L'Apporteur met en relation la Société avec des prospects susceptibles de souscrire à
            ses prestations (développement de logiciels, sites, applications, automatisations).
            L'Apporteur agit en toute indépendance, en son nom propre. Le présent contrat ne confère
            aucun mandat de représentation, de négociation ou d'engagement au nom de la Société.
          </Article>

          <Article n="2" title="Mission de l'Apporteur">
            L'Apporteur identifie des prospects et les présente à la Société (mise en relation
            qualifiée). Il ne négocie pas, ne fixe ni prix ni délai, et ne s'engage pas au nom de la
            Société. La Société demeure seule décisionnaire de l'acceptation d'un projet et de ses
            conditions.
          </Article>

          <Article n="3" title="Déclaration des affaires">
            Une affaire est réputée «&nbsp;apportée&nbsp;» lorsque l'Apporteur transmet à la Société
            l'identité du prospect avant tout contact préexistant de la Société avec ce prospect.
            En cas de prospect déjà connu ou en cours, la Société en informe l'Apporteur sous cinq (5)
            jours ouvrés.
          </Article>

          <Article n="4" title="Rémunération">
            L'Apporteur perçoit <strong>huit pour cent (8&nbsp;%)</strong> du montant HT effectivement
            encaissé par la Société au titre du contrat conclu avec un prospect apporté. La commission
            est due uniquement après encaissement par la Société (aucune avance), au prorata des sommes
            encaissées en cas de paiement échelonné. Le versement intervient sous trente (30) jours
            suivant l'encaissement, sur présentation d'une facture émise par l'Apporteur. La commission
            s'applique aux contrats signés avec le prospect apporté dans les douze (12) mois suivant sa
            présentation.
          </Article>

          <Article n="5" title="Non-exclusivité">
            Le présent contrat est non exclusif : chaque partie reste libre de collaborer avec des
            tiers. Aucun volume minimum n'est imposé à l'Apporteur.
          </Article>

          <Article n="6" title="Confidentialité">
            Chaque partie s'engage à ne pas divulguer les informations confidentielles échangées
            (prospects, devis, conditions), pendant la durée du contrat et deux (2) ans après son terme.
          </Article>
        </div>
        <FooterBar n={1} />
      </section>

      {/* PAGE 2 */}
      <section className="pdf-page" style={page}>
        <MiniHeader />
        <div style={{ padding: "4mm 18mm 0", flex: 1 }}>
          <Article n="7" title="Protection des données (RGPD)">
            L'Apporteur ne transmet de données personnelles de prospects qu'avec leur information
            préalable et une base légale valable. La Société traite ces données conformément au
            Règlement (UE) 2016/679 (RGPD), pour la seule finalité de la mise en relation commerciale.
          </Article>

          <Article n="8" title="Durée et résiliation">
            Le présent contrat est conclu pour une durée de douze (12) mois, renouvelable par tacite
            reconduction. Il peut être résilié par chaque partie moyennant un préavis de trente (30)
            jours notifié par écrit. Les affaires déjà apportées avant la résiliation restent dues selon
            l'article 4.
          </Article>

          <Article n="9" title="Indépendance">
            Le présent contrat ne crée aucun lien de subordination ni contrat de travail. L'Apporteur
            assume seul ses obligations sociales et fiscales.
          </Article>

          <Article n="10" title="Droit applicable et litiges">
            Le présent contrat est régi par le droit français. À défaut d'accord amiable, compétence est
            attribuée aux tribunaux du ressort du siège social de la Société.
          </Article>

          <div style={{ marginTop: "10mm", fontFamily: MONA, fontSize: "10pt", color: INK }}>
            Fait à <Fill w="44mm" />, le <Fill w="38mm" />, en deux (2) exemplaires originaux.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14mm", marginTop: "12mm" }}>
            <SignatureBlock role="La Société" sub="Amar Mehdaoui — Président" />
            <SignatureBlock role="L'Apporteur" sub="Nom et signature, précédés de « Lu et approuvé »" />
          </div>
        </div>
        <FooterBar n={2} />
      </section>

      <a
        href="/decks/commerciaux/stellarwave-contrat-apporteur.pdf"
        download
        className="print-hidden"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999,
          background: ACCENT,
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "999px",
          fontFamily: MONA,
          fontSize: "13px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        ↓ Télécharger le contrat
      </a>
      <PrintButton />
    </>
  );
}

/* ───────────────────────── Helpers ───────────────────────── */

const para: React.CSSProperties = {
  fontFamily: MONA,
  fontSize: "9.5pt",
  lineHeight: 1.55,
  color: INK,
  margin: "0 0 3mm",
  textAlign: "justify",
};

function Banner() {
  return (
    <div
      style={{
        background: "#020617",
        padding: "11mm 18mm 8mm",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Image src="/logo.svg" alt="StellarWave" width={220} height={50} priority style={{ height: "9mm", width: "auto" }} />
      <div style={{ textAlign: "right", fontFamily: MONA, fontSize: "7pt", color: "#94a3b8", lineHeight: 1.5 }}>
        <div style={{ color: "#38bdf8", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>
          Éditeur de logiciels
        </div>
        <div style={{ marginTop: "1.5mm" }}>
          SASU · RCS Bobigny 104 979 125 · 23 Rue de Normandie, 93000 Bobigny
        </div>
      </div>
    </div>
  );
}

function MiniHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12mm 18mm 0",
        fontFamily: MONA,
        fontSize: "8pt",
        color: MUTED,
      }}
    >
      <span style={{ fontWeight: 700, color: "#0f172a" }}>StellarWave</span>
      <span>Contrat d'apporteur d'affaires</span>
    </div>
  );
}

function Article({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: "5mm" }}>
      <div style={{ fontFamily: MONA, fontSize: "10.5pt", fontWeight: 700, color: "#0f172a", marginBottom: "1.5mm" }}>
        <span style={{ color: ACCENT }}>Article {n}</span>
        <span style={{ color: "#cbd5e1", margin: "0 2mm" }}>—</span>
        {title}
      </div>
      <p style={para}>{children}</p>
    </div>
  );
}

function Fill({ w, label }: { w: string; label?: string }) {
  return (
    <span style={{ display: "inline-block", position: "relative" }}>
      <span
        style={{
          display: "inline-block",
          width: w,
          borderBottom: "1px solid #94a3b8",
          height: "1em",
          verticalAlign: "bottom",
        }}
      />
      {label ? (
        <span style={{ fontSize: "6.5pt", color: "#94a3b8", position: "absolute", left: 0, top: "100%" }}>
          {label}
        </span>
      ) : null}
    </span>
  );
}

function SignatureBlock({ role, sub }: { role: string; sub: string }) {
  return (
    <div>
      <div style={{ fontFamily: MONA, fontSize: "10pt", fontWeight: 700, color: "#0f172a" }}>{role}</div>
      <div style={{ fontFamily: MONA, fontSize: "7.5pt", color: MUTED, marginTop: "1mm", lineHeight: 1.4 }}>{sub}</div>
      <div style={{ height: "28mm", border: "1px solid #e2e8f0", borderRadius: "6px", marginTop: "3mm", background: "#fbfdff" }} />
    </div>
  );
}

function FooterBar({ n }: { n: number }) {
  return (
    <div
      style={{
        padding: "0 18mm 11mm",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        fontFamily: MONA,
        fontSize: "7pt",
        color: "#94a3b8",
      }}
    >
      <span>
        StellarWave · contact@stellarwave.fr · stellarwave.fr · Paraphes : ______ / ______
      </span>
      <span style={{ fontWeight: 600, color: MUTED }}>Page {n} / 2</span>
    </div>
  );
}
