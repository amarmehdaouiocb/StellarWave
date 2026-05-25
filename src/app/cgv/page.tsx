import type { Metadata } from "next";
import { brand, legalEntity } from "@/config/brand";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

const LAST_UPDATED = "25 mai 2026";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: `Conditions générales de vente des prestations de ${legalEntity.name} proposées via le site ${brand.siteUrl}.`,
  alternates: { canonical: "/cgv" },
};

export default function CGVPage() {
  return (
    <LegalPage
      eyebrow="Conditions contractuelles"
      title="Conditions générales de vente"
      lastUpdated={LAST_UPDATED}
      intro={
        <p>
          Les présentes conditions générales de vente (CGV) régissent les prestations de services
          numériques (conseil, conception, développement, architecture cloud) fournies par{" "}
          {legalEntity.name}, {legalEntity.legalForm}, dont le siège social est situé{" "}
          {legalEntity.headquarters} ({legalEntity.rcs}). Toute commande implique l&apos;adhésion
          sans réserve du client aux présentes CGV.
        </p>
      }
    >
      <LegalSection index="01" title="Objet et champ d'application">
        <p>
          Les présentes CGV définissent les conditions dans lesquelles {legalEntity.name} réalise ses
          prestations. Elles prévalent sur tout autre document du client, sauf accord écrit
          contraire. Le devis accepté et les présentes CGV forment le contrat entre les parties.
        </p>
      </LegalSection>

      <LegalSection index="02" title="Devis et commande">
        <p>
          Chaque prestation fait l&apos;objet d&apos;un devis détaillé et personnalisé, précisant le
          périmètre, les livrables, le calendrier et le prix. La commande est ferme à compter de
          l&apos;acceptation écrite du devis par le client (signature ou validation par e-mail). Le
          devis a une durée de validité indiquée sur le document&nbsp;; à défaut, elle est de
          30&nbsp;jours.
        </p>
      </LegalSection>

      <LegalSection index="03" title="Prix">
        <p>
          Les prix sont exprimés en euros et hors taxes (HT)&nbsp;; la TVA applicable est ajoutée au
          taux en vigueur. Les prix sont ceux figurant sur le devis accepté. Les prestations
          supplémentaires, hors du périmètre convenu, font l&apos;objet d&apos;un devis
          complémentaire.
        </p>
      </LegalSection>

      <LegalSection index="04" title="Modalités de paiement">
        <p>
          Sauf stipulation contraire au devis, les factures sont payables à 30&nbsp;jours à compter
          de leur date d&apos;émission. Un acompte peut être demandé à la commande selon les
          modalités précisées au devis. Les paiements s&apos;effectuent par virement bancaire.
        </p>
      </LegalSection>

      <LegalSection index="05" title="Retard de paiement">
        <p>
          Conformément aux articles L.&nbsp;441-10 et D.&nbsp;441-5 du Code de commerce, tout retard
          de paiement entraîne de plein droit l&apos;application de pénalités de retard (au taux
          d&apos;intérêt de la Banque centrale européenne majoré de 10&nbsp;points), ainsi qu&apos;une
          indemnité forfaitaire pour frais de recouvrement de 40&nbsp;euros, sans préjudice de toute
          autre indemnisation.
        </p>
      </LegalSection>

      <LegalSection index="06" title="Délais d'exécution">
        <p>
          Les délais indiqués au devis sont donnés à titre indicatif et courent à compter de la
          réception de l&apos;acompte éventuel et des éléments nécessaires à la prestation. Les
          retards imputables au client ou à un tiers ne sauraient engager la responsabilité de{" "}
          {legalEntity.name}.
        </p>
      </LegalSection>

      <LegalSection index="07" title="Obligations du client">
        <p>
          Le client s&apos;engage à collaborer activement, à fournir en temps utile les informations,
          contenus et accès nécessaires, et à garantir qu&apos;il détient les droits sur les
          éléments qu&apos;il transmet (textes, images, marques). Le client demeure responsable de la
          conformité de ces éléments.
        </p>
      </LegalSection>

      <LegalSection index="08" title="Propriété intellectuelle">
        <p>
          Les droits de propriété intellectuelle sur les livrables sont cédés au client après
          paiement intégral du prix. Jusqu&apos;à complet paiement, {legalEntity.name} demeure
          titulaire des droits sur les développements réalisés. {legalEntity.name} conserve la
          propriété de ses savoir-faire, méthodes et composants réutilisables préexistants, ainsi
          que le droit de mentionner la prestation à titre de référence, sauf demande contraire du
          client.
        </p>
      </LegalSection>

      <LegalSection index="09" title="Confidentialité">
        <p>
          Chaque partie s&apos;engage à conserver confidentielles les informations communiquées par
          l&apos;autre partie dans le cadre de la prestation et à ne pas les divulguer à des tiers
          sans autorisation préalable.
        </p>
      </LegalSection>

      <LegalSection index="10" title="Responsabilité">
        <p>
          {legalEntity.name} est tenue à une obligation de moyens. Sa responsabilité ne saurait être
          engagée pour les dommages indirects (perte de chiffre d&apos;affaires, de données ou
          d&apos;exploitation). En tout état de cause, la responsabilité de {legalEntity.name} est
          limitée au montant des sommes effectivement versées au titre de la prestation concernée.
        </p>
      </LegalSection>

      <LegalSection index="11" title="Résiliation">
        <p>
          En cas de manquement grave de l&apos;une des parties à ses obligations, non réparé dans un
          délai de 15&nbsp;jours après mise en demeure, l&apos;autre partie peut résilier le contrat
          de plein droit. Les prestations réalisées jusqu&apos;à la date de résiliation restent dues.
        </p>
      </LegalSection>

      <LegalSection index="12" title="Droit applicable et litiges">
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, les parties
          s&apos;efforceront de trouver une solution amiable. À défaut, et lorsque le client est un
          professionnel, les tribunaux du ressort du siège social de {legalEntity.name} seront seuls
          compétents. Lorsque le client est un consommateur, il peut recourir à un médiateur de la
          consommation dans les conditions prévues par le Code de la consommation.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
