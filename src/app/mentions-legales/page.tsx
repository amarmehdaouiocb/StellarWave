import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { brand, legalEntity, hosting } from "@/config/brand";
import { Logo } from "@/components/layout";
import { Footer } from "@/components/layout/Footer";
import { AuroraGlow, NoiseOverlay } from "@/components/shared/NoiseOverlay";

const LAST_UPDATED = "25 mai 2026";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${brand.siteUrl} édité par la société ${legalEntity.name} (${legalEntity.legalForm}).`,
  alternates: { canonical: "/mentions-legales" },
};

const ACCENT = "#38bdf8";

// Une ligne « label / valeur » de la fiche d'identité de l'éditeur.
function IdentityRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
      style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <dt
        className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] sm:w-44"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </dt>
      <dd className="text-[15px] leading-relaxed" style={{ color: "var(--text-title)" }}>
        {value}
      </dd>
    </div>
  );
}

// Une section numérotée du document.
function LegalSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 scroll-mt-28">
      <div className="mb-5 flex items-baseline gap-4">
        <span
          className="text-sm font-semibold tabular-nums"
          style={{ color: ACCENT, fontFamily: "var(--font-display)" }}
          aria-hidden="true"
        >
          {index}
        </span>
        <h2
          className="text-2xl font-bold sm:text-3xl"
          style={{ color: "var(--text-title)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
      </div>
      <div
        className="space-y-4 text-[15px] leading-[1.75] sm:pl-10"
        style={{ color: "var(--text-body)" }}
      >
        {children}
      </div>
    </section>
  );
}

// Lien stylé en accent (interne ou externe).
function AccentLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className = "underline decoration-[1.5px] underline-offset-4 transition-opacity hover:opacity-70";
  const style = { color: ACCENT };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Logo variant="fixed-topleft" height={44} priority />

      <main
        id="main-content"
        className="relative min-h-screen overflow-hidden"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Atmosphère : dégradé + aurora discrète + grain */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% -10%, rgba(56, 189, 248, 0.08) 0%, transparent 55%)",
            }}
          />
          <AuroraGlow animated={false} className="opacity-60" />
          <NoiseOverlay opacity={0.035} />
        </div>

        <article className="relative z-10 mx-auto w-full max-w-[820px] px-6 pb-28 pt-36 sm:pt-40">
          {/* En-tête */}
          <header>
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              Informations légales
            </p>
            <h1
              className="mt-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl"
              style={{ color: "var(--text-title)", letterSpacing: "-0.03em", lineHeight: "1" }}
            >
              Mentions légales
            </h1>
            <p className="mt-5 text-sm" style={{ color: "var(--text-muted)" }}>
              Dernière mise à jour&nbsp;: {LAST_UPDATED}
            </p>
            <p className="mt-6 max-w-prose text-[15px] leading-relaxed" style={{ color: "var(--text-body)" }}>
              Conformément à la loi n°&nbsp;2004-575 du 21&nbsp;juin 2004 pour la confiance dans
              l&apos;économie numérique (LCEN), voici les informations relatives à l&apos;éditeur et à
              l&apos;hébergeur du site{" "}
              <AccentLink href={brand.siteUrl} external>
                {brand.siteUrl.replace("https://", "")}
              </AccentLink>
              .
            </p>
          </header>

          {/* Fiche d'identité de l'éditeur */}
          <section className="mt-14">
            <div
              className="rounded-3xl p-6 sm:p-8"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(56, 189, 248, 0.14)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
              }}
            >
              <h2
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: ACCENT }}
              >
                Éditeur du site
              </h2>
              <dl className="mt-2">
                <IdentityRow label="Dénomination" value={legalEntity.name} />
                <IdentityRow label="Forme juridique" value={legalEntity.legalForm} />
                <IdentityRow label="Capital social" value={legalEntity.capital} />
                <IdentityRow label="Immatriculation" value={legalEntity.rcs} />
                <IdentityRow label="SIREN" value={legalEntity.siren} />
                <IdentityRow label="TVA intracom." value={legalEntity.vatNumber} />
                <IdentityRow label="Siège social" value={legalEntity.headquarters} />
                <IdentityRow label="Directeur de publication" value={legalEntity.publicationDirector} />
              </dl>
              <div
                className="mt-6 flex flex-col gap-3 pt-6 sm:flex-row sm:gap-8"
                style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
              >
                <a
                  href={`mailto:${legalEntity.email}`}
                  className="text-[15px] transition-opacity hover:opacity-70"
                  style={{ color: ACCENT }}
                >
                  {legalEntity.email}
                </a>
                <a
                  href={`tel:${legalEntity.phone.replace(/\s/g, "")}`}
                  className="text-[15px] transition-opacity hover:opacity-70"
                  style={{ color: ACCENT }}
                >
                  {legalEntity.phone}
                </a>
              </div>
            </div>
          </section>

          {/* Sections détaillées */}
          <LegalSection index="01" title="Directeur de la publication">
            <p>
              Le directeur de la publication du site est {legalEntity.publicationDirector}, en sa
              qualité de représentant légal de la société {legalEntity.name}.
            </p>
          </LegalSection>

          <LegalSection index="02" title="Hébergement">
            <p>Le site est hébergé par&nbsp;:</p>
            <p>
              <span style={{ color: "var(--text-title)" }}>{hosting.name}</span>
              <br />
              {hosting.address}
              <br />
              <AccentLink href={hosting.url} external>
                {hosting.url.replace("https://", "")}
              </AccentLink>
            </p>
          </LegalSection>

          <LegalSection index="03" title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus présents sur le site (structure, textes, visuels, logos,
              illustrations, éléments graphiques, code source) est la propriété exclusive de{" "}
              {legalEntity.name}, sauf mention contraire, et est protégé par le droit français et
              international de la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou adaptation, totale ou
              partielle, de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite
              sans l&apos;autorisation écrite préalable de {legalEntity.name}.
            </p>
          </LegalSection>

          <LegalSection index="04" title="Données personnelles">
            <p>
              Les données collectées via les formulaires du site (notamment demande de devis et
              mini-audit) sont traitées par {legalEntity.name} aux seules fins de répondre aux
              demandes des utilisateurs et de la relation commerciale qui en découle.
            </p>
            <p>
              Conformément au Règlement général sur la protection des données (RGPD) et à la loi
              «&nbsp;Informatique et Libertés&nbsp;», vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement, d&apos;opposition et de portabilité de vos données. Ces
              droits peuvent être exercés à tout moment en écrivant à{" "}
              <AccentLink href={`mailto:${legalEntity.email}`}>{legalEntity.email}</AccentLink>. Pour
              le détail des traitements, consultez notre{" "}
              <AccentLink href="/confidentialite">politique de confidentialité</AccentLink>.
            </p>
          </LegalSection>

          <LegalSection index="05" title="Cookies">
            <p>
              Le site utilise des cookies de mesure d&apos;audience (Google Analytics) afin d&apos;établir
              des statistiques de fréquentation. Vous pouvez configurer votre navigateur pour refuser
              les cookies ou être averti de leur dépôt.
            </p>
          </LegalSection>

          <LegalSection index="06" title="Liens hypertextes et responsabilité">
            <p>
              {legalEntity.name} s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
              informations diffusées sur le site, sans toutefois pouvoir en garantir l&apos;exhaustivité.
              Le site peut contenir des liens vers des sites tiers&nbsp;; {legalEntity.name} n&apos;exerce
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </LegalSection>

          <LegalSection index="07" title="Droit applicable et litiges">
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige et à
              défaut de résolution amiable, les tribunaux du ressort du siège social de{" "}
              {legalEntity.name} seront seuls compétents.
            </p>
          </LegalSection>

          {/* Retour */}
          <div className="mt-20 border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <ArrowLeft className="h-4 w-4" weight="bold" />
              Retour à l&apos;accueil
            </Link>
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}
