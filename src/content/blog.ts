export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  category: "performance" | "seo" | "cloud" | "dev" | "case-study";
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  publishedAt: string; // ISO date string
  readingTime: number; // minutes
  image?: string;
  tags: string[];
  featured?: boolean;
};

export const blogCategories = {
  performance: {
    label: "Performance",
    color: "var(--ember-amber)",
  },
  seo: {
    label: "SEO",
    color: "var(--ember-coral)",
  },
  cloud: {
    label: "Cloud",
    color: "var(--ember-teal)",
  },
  dev: {
    label: "Développement",
    color: "var(--ember-rose)",
  },
  "case-study": {
    label: "Étude de cas",
    color: "var(--ember-violet)",
  },
} as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "anatomie-landing-page-conversion",
    title: "Anatomie d'une landing page à 4.8% de conversion",
    excerpt:
      "Découvrez les 7 éléments clés qui ont permis de tripler le taux de conversion d'une landing page B2B. Analyse détaillée avec avant/après.",
    content: `
<p>Le taux de conversion moyen d'une landing page B2B oscille entre 1 et 3%. Pourtant, certaines pages atteignent régulièrement des taux de 5% et plus. Qu'est-ce qui fait la différence ?</p>

<h2>1. Un hook irrésistible au-dessus de la ligne de flottaison</h2>
<p>Les 3 premières secondes sont décisives. Votre proposition de valeur doit être immédiatement compréhensible et différenciante.</p>

<h3>Ce qui fonctionne :</h3>
<ul>
<li><strong>Résultat quantifié</strong> : "Réduisez vos coûts cloud de 40%"</li>
<li><strong>Spécificité</strong> : "Pour les équipes de 10-50 personnes"</li>
<li><strong>Urgence</strong> : "Commencez à économiser dès cette semaine"</li>
</ul>

<h2>2. Social proof stratégiquement placée</h2>
<p>Les logos de clients, témoignages et métriques doivent apparaître <em>avant</em> le premier CTA, pas après.</p>

<h2>3. Un seul CTA, répété intelligemment</h2>
<p>Chaque landing page efficace a un objectif unique. Un CTA principal répété 3-4 fois dans la page, avec des variations de contexte.</p>

<h2>4. Objections traitées proactivement</h2>
<p>Anticipez les freins à la conversion et répondez-y directement dans votre copie :</p>
<ul>
<li>"Pas de carte bancaire requise"</li>
<li>"Setup en 5 minutes"</li>
<li>"Annulation à tout moment"</li>
</ul>

<h2>5. Performance irréprochable</h2>
<p>Un score Lighthouse de 95+ n'est pas un luxe, c'est une nécessité. Chaque 100ms de délai supplémentaire coûte des conversions.</p>

<h2>6. Mobile-first, vraiment</h2>
<p>Plus de 60% du trafic est mobile. Si votre landing page n'est pas optimisée pour le pouce, vous perdez des leads.</p>

<h2>7. Formulaire minimaliste</h2>
<p>Chaque champ supplémentaire réduit les conversions de 5-10%. Ne demandez que l'essentiel :</p>
<ul>
<li>Email (obligatoire)</li>
<li>Prénom (optionnel mais utile pour la personnalisation)</li>
<li>Entreprise (si B2B)</li>
</ul>

<h2>Conclusion</h2>
<p>Une landing page à haute conversion n'est pas un accident. C'est le résultat d'une attention méticuleuse aux détails, d'itérations basées sur les données, et d'une compréhension profonde de votre audience.</p>

<p><strong>Besoin d'optimiser votre landing page ?</strong> Demandez un mini-audit gratuit.</p>
    `,
    category: "performance",
    author: {
      name: "Stellar Wave",
      role: "Product Studio",
    },
    publishedAt: "2024-01-15",
    readingTime: 6,
    tags: ["landing page", "conversion", "UX", "copywriting"],
    featured: true,
  },
  {
    slug: "lighthouse-98-optimisations",
    title: "Lighthouse 98 : Les 7 optimisations qui ont tout changé",
    excerpt:
      "Comment passer d'un score Lighthouse de 45 à 98 en une semaine. Guide technique détaillé avec des exemples de code concrets.",
    content: `
<p>Un site lent, c'est des utilisateurs frustrés et un référencement pénalisé. Voici comment nous avons transformé les performances d'un site Next.js.</p>

<h2>Contexte : le diagnostic initial</h2>
<p>Score Lighthouse initial : <strong>45/100</strong></p>
<ul>
<li>LCP (Largest Contentful Paint) : 4.2s</li>
<li>FID (First Input Delay) : 320ms</li>
<li>CLS (Cumulative Layout Shift) : 0.25</li>
</ul>

<h2>1. Optimisation des images</h2>
<p>Les images représentaient 70% du poids de la page. Solutions :</p>
<ul>
<li>Passage au format WebP/AVIF</li>
<li>Lazy loading natif</li>
<li>Dimensionnement responsive avec srcset</li>
</ul>

<h2>2. Code splitting agressif</h2>
<p>Le bundle JavaScript initial pesait 1.2MB. Après code splitting :</p>
<ul>
<li>Bundle initial : 180KB</li>
<li>Chargement dynamique des composants non-critiques</li>
</ul>

<h2>3. Fonts optimisées</h2>
<p>Les polices personnalisées causaient un FOIT de 800ms. Solutions :</p>
<ul>
<li>Preload des fonts critiques</li>
<li>font-display: swap</li>
<li>Subset des caractères utilisés</li>
</ul>

<h2>4. Élimination du CSS inutilisé</h2>
<p>40% du CSS n'était jamais utilisé. Avec PurgeCSS :</p>
<ul>
<li>CSS avant : 280KB</li>
<li>CSS après : 45KB</li>
</ul>

<h2>5. Cache HTTP optimal</h2>
<p>Configuration des headers Cache-Control pour assets statiques :</p>
<ul>
<li>Images : 1 an</li>
<li>JS/CSS : 1 an (avec hash)</li>
<li>HTML : no-cache</li>
</ul>

<h2>6. CDN et Edge caching</h2>
<p>Migration vers un CDN avec edge caching. Résultat : TTFB divisé par 4.</p>

<h2>7. Préchargement intelligent</h2>
<p>Prefetch des ressources critiques et preconnect aux domaines tiers.</p>

<h2>Résultats</h2>
<p>Score Lighthouse final : <strong>98/100</strong></p>
<ul>
<li>LCP : 1.1s (-74%)</li>
<li>FID : 12ms (-96%)</li>
<li>CLS : 0.02 (-92%)</li>
</ul>

<p><strong>Impact business :</strong> +23% de conversions sur la page principale.</p>
    `,
    category: "performance",
    author: {
      name: "Stellar Wave",
      role: "Product Studio",
    },
    publishedAt: "2024-01-08",
    readingTime: 8,
    tags: ["lighthouse", "performance", "next.js", "core web vitals"],
  },
  {
    slug: "reduire-facture-aws-65-percent",
    title: "Comment on a réduit de 65% la facture AWS d'un client",
    excerpt:
      "Audit FinOps complet d'une infrastructure AWS : identification des gaspillages, rightsizing, Reserved Instances, et Spot Instances.",
    content: `
<p>Une startup SaaS nous a contactés avec un problème courant : leur facture AWS avait triplé en 6 mois, passant de 5 000€ à 15 000€/mois. Voici comment nous l'avons ramenée à 5 200€.</p>

<h2>Phase 1 : L'audit</h2>
<p>Première étape : comprendre où va l'argent. Nous avons utilisé AWS Cost Explorer et nos propres outils d'analyse.</p>

<h3>Constats majeurs :</h3>
<ul>
<li>30% du compute tournait 24/7 alors que l'usage était principalement en heures ouvrées</li>
<li>Des instances EC2 surdimensionnées (m5.xlarge pour des workloads de t3.medium)</li>
<li>Aucune utilisation de Reserved Instances ou Savings Plans</li>
<li>Des snapshots EBS orphelins qui s'accumulaient</li>
</ul>

<h2>Phase 2 : Quick wins (Semaine 1)</h2>

<h3>Nettoyage des ressources inutilisées</h3>
<ul>
<li>Suppression de 2TB de snapshots orphelins : -800€/mois</li>
<li>Arrêt d'environnements de dev/staging la nuit et le week-end : -1 200€/mois</li>
<li>Suppression d'EIP non attachées : -50€/mois</li>
</ul>

<h2>Phase 3 : Rightsizing (Semaine 2)</h2>
<p>Analyse de l'utilisation CPU/RAM sur 30 jours :</p>
<ul>
<li>6 instances m5.xlarge → t3.large : -60% sur le compute</li>
<li>RDS db.r5.large → db.t3.medium : -45%</li>
</ul>

<h2>Phase 4 : Engagement (Semaine 3)</h2>
<p>Pour les workloads stables :</p>
<ul>
<li>Savings Plans 1 an sur 70% du compute : -30% supplémentaires</li>
<li>Reserved Instances RDS : -40%</li>
</ul>

<h2>Phase 5 : Architecture (Semaine 4)</h2>
<ul>
<li>Migration des jobs batch vers Spot Instances : -70% sur les workers</li>
<li>Mise en place d'auto-scaling basé sur la demande réelle</li>
</ul>

<h2>Résultat final</h2>
<table>
<tr><th>Poste</th><th>Avant</th><th>Après</th></tr>
<tr><td>EC2</td><td>8 500€</td><td>2 800€</td></tr>
<tr><td>RDS</td><td>3 200€</td><td>1 400€</td></tr>
<tr><td>EBS/S3</td><td>2 100€</td><td>800€</td></tr>
<tr><td>Autres</td><td>1 200€</td><td>200€</td></tr>
<tr><td><strong>Total</strong></td><td><strong>15 000€</strong></td><td><strong>5 200€</strong></td></tr>
</table>

<p><strong>Économie annuelle : 117 600€</strong></p>

<p>Besoin d'un audit FinOps ? Contactez-nous.</p>
    `,
    category: "cloud",
    author: {
      name: "Stellar Wave",
      role: "Cloud Studio",
    },
    publishedAt: "2024-01-02",
    readingTime: 7,
    tags: ["aws", "finops", "cloud", "optimisation"],
    featured: true,
  },
];

// Utility functions
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .filter(
      (post) =>
        post.category === currentPost.category ||
        post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}
