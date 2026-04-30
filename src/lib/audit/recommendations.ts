/**
 * Mapping des audits Lighthouse + checks SEO vers des recommandations
 * en français, priorisées par impact business + savings ms.
 *
 * Chaque reco a un score d'impact (0-10) qui sert à les trier.
 * Les recos ne mentionnent JAMAIS la techno utilisée — elles parlent
 * uniquement bénéfices.
 */
import type { PsiData, SeoData } from "@/lib/supabase";

export type Recommendation = {
  id: string;
  title: string;
  detail: string;
  impact: number; // 0-10
  category: "performance" | "seo" | "accessibility" | "best-practices";
  savings?: string; // ex "3,2 s gagnés" si pertinent
};

// Mapping audit Lighthouse → reco FR business-focus
const LH_RECO_MAP: Record<
  string,
  {
    title: string;
    detail: string;
    impact: number;
    category: Recommendation["category"];
  }
> = {
  "render-blocking-resources": {
    title: "Réduire les ressources qui bloquent l'affichage",
    detail:
      "Vos visiteurs voient une page blanche pendant que des fichiers se chargent. Optimiser le chargement réduit ce délai de plusieurs secondes.",
    impact: 9,
    category: "performance",
  },
  "unused-css-rules": {
    title: "Supprimer le CSS inutilisé",
    detail:
      "Du code de style chargé pour rien ralentit la page. Le retirer rend l'affichage plus rapide.",
    impact: 7,
    category: "performance",
  },
  "unused-javascript": {
    title: "Alléger le JavaScript inutile",
    detail:
      "Du code JS chargé sans être utilisé pèse sur les performances. Le retirer fluidifie l'expérience.",
    impact: 8,
    category: "performance",
  },
  "uses-optimized-images": {
    title: "Compresser les images",
    detail:
      "Vos images peuvent être réduites de 60-80% sans perte visible. Économies massives en temps de chargement.",
    impact: 9,
    category: "performance",
  },
  "uses-webp-images": {
    title: "Adopter des formats d'image modernes",
    detail:
      "Les formats nouvelle génération réduisent jusqu'à 50% le poids des images. Gros gain mobile.",
    impact: 8,
    category: "performance",
  },
  "modern-image-formats": {
    title: "Adopter des formats d'image modernes",
    detail:
      "Les formats nouvelle génération réduisent jusqu'à 50% le poids des images. Gros gain mobile.",
    impact: 8,
    category: "performance",
  },
  "uses-text-compression": {
    title: "Activer la compression des fichiers",
    detail:
      "La compression côté serveur réduit la taille des fichiers texte de 70%. Mise en place rapide.",
    impact: 7,
    category: "performance",
  },
  "uses-rel-preconnect": {
    title: "Préconnecter aux services tiers",
    detail:
      "Indiquer au navigateur les services externes utilisés permet de gagner 200-400 ms.",
    impact: 5,
    category: "performance",
  },
  "efficient-animated-content": {
    title: "Optimiser les animations et vidéos",
    detail:
      "Les GIFs lourds peuvent être remplacés par des vidéos 10× plus légères.",
    impact: 6,
    category: "performance",
  },
  "server-response-time": {
    title: "Réduire le temps de réponse serveur",
    detail:
      "Votre serveur met trop de temps à répondre. Optimisations back-end ou CDN à envisager.",
    impact: 9,
    category: "performance",
  },
  "uses-responsive-images": {
    title: "Servir des images adaptées à chaque écran",
    detail:
      "Sur mobile, charger une image taille desktop est un gaspillage de bande passante.",
    impact: 7,
    category: "performance",
  },
  "offscreen-images": {
    title: "Charger les images au fil du défilement",
    detail:
      "Les images en bas de page ne devraient se charger qu'au moment d'être vues.",
    impact: 6,
    category: "performance",
  },
  "meta-description": {
    title: "Ajouter une méta-description",
    detail:
      "C'est le résumé qui apparaît dans Google sous votre titre. Sans, votre taux de clic chute.",
    impact: 8,
    category: "seo",
  },
  "document-title": {
    title: "Optimiser le titre de page",
    detail:
      "Titre clair et précis = meilleur classement Google + plus de clics.",
    impact: 9,
    category: "seo",
  },
  "link-text": {
    title: "Améliorer les libellés des liens",
    detail:
      "« Cliquez ici » n'aide pas Google. Un texte descriptif booste le SEO.",
    impact: 6,
    category: "seo",
  },
  "crawlable-anchors": {
    title: "Rendre tous les liens explorables",
    detail:
      "Certains liens sont invisibles pour Google. À corriger pour être bien indexé.",
    impact: 7,
    category: "seo",
  },
  "is-crawlable": {
    title: "Autoriser l'indexation par Google",
    detail:
      "Votre site bloque les moteurs de recherche. Vous êtes invisible sur Google !",
    impact: 10,
    category: "seo",
  },
  hreflang: {
    title: "Configurer les langues du site",
    detail:
      "Si vous visez plusieurs pays, configurer hreflang évite les pénalités SEO.",
    impact: 5,
    category: "seo",
  },
  viewport: {
    title: "Configurer l'affichage mobile",
    detail:
      "Sans viewport, votre site est inutilisable sur mobile. Critique en 2026.",
    impact: 10,
    category: "seo",
  },
  "tap-targets": {
    title: "Espacer les boutons sur mobile",
    detail:
      "Boutons trop proches = clics ratés sur mobile = utilisateurs frustrés qui partent.",
    impact: 6,
    category: "accessibility",
  },
  "color-contrast": {
    title: "Augmenter le contraste des textes",
    detail:
      "Texte trop clair = mauvaise lisibilité, surtout en plein jour. Vous perdez des lecteurs.",
    impact: 7,
    category: "accessibility",
  },
  "image-alt": {
    title: "Décrire les images",
    detail:
      "Les attributs alt aident Google à comprendre vos images, et les utilisateurs malvoyants. Double bénéfice.",
    impact: 7,
    category: "accessibility",
  },
};

// Pondération business : taille de l'opportunité en ms × facteur impact
function lighthouseToReco(
  opportunityId: string,
  savingsMs: number,
): Recommendation | null {
  const meta = LH_RECO_MAP[opportunityId];
  if (!meta) return null;

  const savings =
    savingsMs > 1000
      ? `${(savingsMs / 1000).toFixed(1)} s gagnés`
      : `${Math.round(savingsMs)} ms gagnés`;

  return {
    id: opportunityId,
    title: meta.title,
    detail: meta.detail,
    impact: meta.impact,
    category: meta.category,
    savings,
  };
}

function seoToRecos(seo: SeoData): Recommendation[] {
  const recos: Recommendation[] = [];

  if (!seo.https) {
    recos.push({
      id: "https",
      title: "Passer le site en HTTPS",
      detail:
        "Sans HTTPS, Google pénalise votre référencement et les navigateurs affichent un warning « non sécurisé ». Critique.",
      impact: 10,
      category: "best-practices",
    });
  }

  if (!seo.title.value) {
    recos.push({
      id: "no-title",
      title: "Ajouter une balise title",
      detail:
        "Page sans titre = invisible sur Google. C'est la base du SEO.",
      impact: 10,
      category: "seo",
    });
  } else if (!seo.title.optimal) {
    recos.push({
      id: "title-length",
      title: "Optimiser la longueur du titre",
      detail: `Votre titre fait ${seo.title.length} caractères. Cible : 30-60 pour un affichage optimal sur Google.`,
      impact: 6,
      category: "seo",
    });
  }

  if (!seo.description.value) {
    recos.push({
      id: "no-description",
      title: "Ajouter une méta-description",
      detail:
        "C'est le résumé sous votre titre dans Google. Sans, votre taux de clic chute de 30%.",
      impact: 8,
      category: "seo",
    });
  } else if (!seo.description.optimal) {
    recos.push({
      id: "description-length",
      title: "Optimiser la méta-description",
      detail: `Votre description fait ${seo.description.length} caractères. Cible : 120-160 pour un affichage complet sur Google.`,
      impact: 5,
      category: "seo",
    });
  }

  if (!seo.openGraph.complete) {
    recos.push({
      id: "open-graph",
      title: "Compléter les balises de partage social",
      detail:
        "Sans Open Graph (titre, description, image), vos liens partagés sur LinkedIn / WhatsApp s'affichent sans aperçu visuel. Les clics chutent.",
      impact: 7,
      category: "seo",
    });
  }

  if (seo.structuredData.count === 0) {
    recos.push({
      id: "structured-data",
      title: "Ajouter des données structurées",
      detail:
        "Les schémas JSON-LD permettent à Google d'afficher des extraits enrichis (étoiles, prix, FAQ). Visibilité boostée.",
      impact: 6,
      category: "seo",
    });
  }

  if (!seo.canonical.present) {
    recos.push({
      id: "canonical",
      title: "Définir l'URL canonique",
      detail:
        "Sans canonical, Google peut considérer plusieurs URLs comme des doublons et diluer votre référencement.",
      impact: 5,
      category: "seo",
    });
  }

  if (!seo.sitemap.present) {
    recos.push({
      id: "sitemap",
      title: "Publier un sitemap.xml",
      detail:
        "Le sitemap aide Google à découvrir et indexer toutes vos pages plus vite.",
      impact: 5,
      category: "seo",
    });
  }

  if (!seo.robotsTxt.present) {
    recos.push({
      id: "robots-txt",
      title: "Ajouter un robots.txt",
      detail:
        "Le robots.txt indique aux moteurs de recherche quelles pages explorer. Standard SEO.",
      impact: 4,
      category: "seo",
    });
  }

  return recos;
}

/**
 * Construit la liste de recommandations triées par impact décroissant.
 * Stratégie : top opportunités Lighthouse + tous les checks SEO failed.
 */
export function buildRecommendations(
  psi: PsiData,
  seo: SeoData,
): Recommendation[] {
  const recos: Recommendation[] = [];

  // Opportunités Lighthouse — on prend la stratégie mobile en priorité,
  // sinon desktop. Les opportunities sont déjà triées par savings ms.
  const psiResult = psi.mobile ?? psi.desktop;
  if (psiResult) {
    for (const opp of psiResult.opportunities) {
      const reco = lighthouseToReco(opp.id, opp.savingsMs);
      if (reco) recos.push(reco);
    }

    // Audits binary failed (viewport, is-crawlable, etc.)
    for (const audit of psiResult.failedAudits) {
      if (LH_RECO_MAP[audit.id]) {
        const meta = LH_RECO_MAP[audit.id];
        recos.push({
          id: audit.id,
          title: meta.title,
          detail: meta.detail,
          impact: meta.impact,
          category: meta.category,
        });
      }
    }
  }

  // Checks SEO complémentaires
  recos.push(...seoToRecos(seo));

  // Dédoublonner par id (un audit Lighthouse peut recouper un check SEO)
  const seen = new Set<string>();
  const unique = recos.filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });

  // Trier par impact décroissant
  return unique.sort((a, b) => b.impact - a.impact);
}
