import type { Metadata } from "next";
import { brand, legalEntity } from "@/config/brand";
import { LegalPage, LegalSection, AccentLink } from "@/components/legal/LegalPage";

const LAST_UPDATED = "25 mai 2026";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données personnelles (RGPD) du site ${brand.siteUrl}, édité par ${legalEntity.name}.`,
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Protection des données"
      title="Politique de confidentialité"
      lastUpdated={LAST_UPDATED}
      intro={
        <p>
          {legalEntity.name} accorde une grande importance à la protection de vos données
          personnelles. La présente politique décrit les données que nous collectons via le site{" "}
          <AccentLink href={brand.siteUrl} external>
            {brand.siteUrl.replace("https://", "")}
          </AccentLink>
          , les raisons de leur traitement et les droits dont vous disposez, conformément au
          Règlement général sur la protection des données (RGPD) et à la loi «&nbsp;Informatique et
          Libertés&nbsp;».
        </p>
      }
    >
      <LegalSection index="01" title="Responsable du traitement">
        <p>
          Le responsable du traitement des données est la société {legalEntity.name},{" "}
          {legalEntity.legalForm}, dont le siège social est situé {legalEntity.headquarters},
          immatriculée au {legalEntity.rcs}.
        </p>
        <p>
          Pour toute question relative à vos données&nbsp;:{" "}
          <AccentLink href={`mailto:${legalEntity.email}`}>{legalEntity.email}</AccentLink>.
        </p>
      </LegalSection>

      <LegalSection index="02" title="Données collectées">
        <p>Nous collectons uniquement les données nécessaires aux finalités décrites ci-dessous&nbsp;:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span style={{ color: "var(--text-title)" }}>Données d&apos;identification et de contact</span>{" "}
            transmises via nos formulaires (demande de devis, mini-audit)&nbsp;: nom, prénom, adresse
            e-mail, numéro de téléphone, société.
          </li>
          <li>
            <span style={{ color: "var(--text-title)" }}>Contenu de vos demandes</span>&nbsp;:
            description de projet, éventuelles pièces jointes, URL de site.
          </li>
          <li>
            <span style={{ color: "var(--text-title)" }}>Données de navigation</span>&nbsp;: pages
            consultées et statistiques d&apos;audience, collectées via des cookies de mesure.
          </li>
        </ul>
      </LegalSection>

      <LegalSection index="03" title="Finalités et bases légales">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Répondre à vos demandes et établir un devis — base&nbsp;: mesures précontractuelles à
            votre demande.
          </li>
          <li>
            Gérer la relation commerciale et contractuelle — base&nbsp;: exécution du contrat.
          </li>
          <li>
            Mesurer l&apos;audience du site et l&apos;améliorer — base&nbsp;: votre consentement
            (cookies) ou notre intérêt légitime.
          </li>
        </ul>
      </LegalSection>

      <LegalSection index="04" title="Destinataires et sous-traitants">
        <p>
          Vos données sont destinées à {legalEntity.name}. Pour fonctionner, le site s&apos;appuie
          sur des prestataires techniques (sous-traitants au sens du RGPD), agissant sur nos
          instructions&nbsp;:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span style={{ color: "var(--text-title)" }}>Vercel Inc.</span> — hébergement du site.
          </li>
          <li>
            <span style={{ color: "var(--text-title)" }}>Resend</span> — acheminement des e-mails
            (notifications et accusés de réception).
          </li>
          <li>
            <span style={{ color: "var(--text-title)" }}>Supabase</span> — stockage sécurisé de
            certaines demandes.
          </li>
          <li>
            <span style={{ color: "var(--text-title)" }}>Google Analytics</span> — mesure
            d&apos;audience.
          </li>
        </ul>
        <p>Nous ne vendons ni ne louons vos données personnelles à des tiers.</p>
      </LegalSection>

      <LegalSection index="05" title="Transferts hors Union européenne">
        <p>
          Certains de nos sous-traitants (notamment Vercel et Google) peuvent traiter des données
          en dehors de l&apos;Union européenne, en particulier aux États-Unis. Ces transferts sont
          encadrés par des garanties appropriées (clauses contractuelles types de la Commission
          européenne ou mécanismes équivalents).
        </p>
      </LegalSection>

      <LegalSection index="06" title="Durées de conservation">
        <ul className="list-disc space-y-2 pl-5">
          <li>Données de prospects&nbsp;: jusqu&apos;à 3&nbsp;ans à compter du dernier contact.</li>
          <li>
            Données clients&nbsp;: pendant la durée de la relation contractuelle, puis selon les
            obligations légales (notamment comptables) applicables.
          </li>
          <li>Cookies de mesure d&apos;audience&nbsp;: 13&nbsp;mois maximum.</li>
        </ul>
      </LegalSection>

      <LegalSection index="07" title="Vos droits">
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, de limitation, d&apos;opposition et de portabilité de vos données, ainsi
          que du droit de définir des directives relatives à leur sort après votre décès.
        </p>
        <p>
          Vous pouvez exercer ces droits à tout moment en écrivant à{" "}
          <AccentLink href={`mailto:${legalEntity.email}`}>{legalEntity.email}</AccentLink>. Si vous
          estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez
          adresser une réclamation à la CNIL —{" "}
          <AccentLink href="https://www.cnil.fr" external>
            www.cnil.fr
          </AccentLink>
          .
        </p>
      </LegalSection>

      <LegalSection index="08" title="Cookies">
        <p>
          Le site dépose des cookies de mesure d&apos;audience (Google Analytics). Vous pouvez à tout
          moment configurer votre navigateur pour accepter ou refuser les cookies, ou être averti de
          leur dépôt. Le refus des cookies de mesure n&apos;affecte pas l&apos;accès au site.
        </p>
      </LegalSection>

      <LegalSection index="09" title="Sécurité">
        <p>
          {legalEntity.name} met en œuvre des mesures techniques et organisationnelles appropriées
          afin de protéger vos données contre tout accès non autorisé, perte ou divulgation.
        </p>
      </LegalSection>

      <LegalSection index="10" title="Modifications">
        <p>
          La présente politique peut être mise à jour pour refléter les évolutions légales ou
          techniques. La date de dernière mise à jour figure en haut de cette page.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
