import type { Metadata } from "next";
import { brand, legalEntity, hosting } from "@/config/brand";
import {
  LegalPage,
  LegalSection,
  AccentLink,
  IdentityRow,
  LEGAL_ACCENT,
} from "@/components/legal/LegalPage";

const LAST_UPDATED = "25 mai 2026";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${brand.siteUrl} édité par la société ${legalEntity.name} (${legalEntity.legalForm}).`,
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      lastUpdated={LAST_UPDATED}
      intro={
        <p>
          Conformément à la loi n°&nbsp;2004-575 du 21&nbsp;juin 2004 pour la confiance dans
          l&apos;économie numérique (LCEN), voici les informations relatives à l&apos;éditeur et à
          l&apos;hébergeur du site{" "}
          <AccentLink href={brand.siteUrl} external>
            {brand.siteUrl.replace("https://", "")}
          </AccentLink>
          .
        </p>
      }
    >
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
            style={{ color: LEGAL_ACCENT }}
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
              style={{ color: LEGAL_ACCENT }}
            >
              {legalEntity.email}
            </a>
            <a
              href={`tel:${legalEntity.phone.replace(/\s/g, "")}`}
              className="text-[15px] transition-opacity hover:opacity-70"
              style={{ color: LEGAL_ACCENT }}
            >
              {legalEntity.phone}
            </a>
          </div>
        </div>
      </section>

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
          mini-audit) sont traitées par {legalEntity.name} aux seules fins de répondre aux demandes
          des utilisateurs et de la relation commerciale qui en découle.
        </p>
        <p>
          Conformément au Règlement général sur la protection des données (RGPD) et à la loi
          «&nbsp;Informatique et Libertés&nbsp;», vous disposez d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, d&apos;opposition et de portabilité de vos données. Ces
          droits peuvent être exercés en écrivant à{" "}
          <AccentLink href={`mailto:${legalEntity.email}`}>{legalEntity.email}</AccentLink>. Pour le
          détail des traitements, consultez notre{" "}
          <AccentLink href="/confidentialite">politique de confidentialité</AccentLink>.
        </p>
      </LegalSection>

      <LegalSection index="05" title="Cookies">
        <p>
          Le site utilise des cookies de mesure d&apos;audience (Google Analytics) afin
          d&apos;établir des statistiques de fréquentation. Vous pouvez configurer votre navigateur
          pour refuser les cookies ou être averti de leur dépôt.
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
    </LegalPage>
  );
}
