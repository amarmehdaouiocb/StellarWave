# Setup Google Search Console — Stellarwave

> Brancher Google Search Console (GSC) sur `stellarwave.fr` pour :
> - voir les requêtes qui amènent du trafic ;
> - surveiller l'indexation des pages ;
> - détecter les erreurs SEO ;
> - soumettre le sitemap ;
> - lier à Google Analytics 4 pour des données combinées.

---

## 0. Pré-requis

- ✅ `sitemap.ts` existe dans le projet *(à compléter, voir §7)*
- ✅ `robots.ts` existe *(à ajuster, voir §7)*
- ✅ Google Analytics 4 déjà branché
- ✅ Site live sur `https://stellarwave.fr` *(hébergé Vercel)*
- ⏳ Accès au DNS chez **OVH** *(pour la méthode recommandée)*

---

## 1. Choix du type de propriété — Domaine vs Préfixe d'URL

GSC propose 2 types de propriétés. Le choix structure tout le suivi.

### ⭐ Recommandé : Propriété de **domaine**

- Couvre `stellarwave.fr`, `www.stellarwave.fr`, `m.stellarwave.fr`, tout
  sous-domaine futur, et tous les protocoles (http + https)
- Une seule propriété à gérer
- Vérification : 1 enregistrement DNS TXT chez OVH
- ⚠️ Demande accès DNS

### Alternative : Propriété **Préfixe d'URL**

- Une propriété distincte par URL exacte (`https://stellarwave.fr` ≠
  `https://www.stellarwave.fr`)
- 4 méthodes de vérification disponibles *(balise HTML, fichier, GA,
  GTM, DNS)*
- ⚠️ Tu devras créer plusieurs propriétés pour couvrir
  `stellarwave.fr` + `www.stellarwave.fr`

→ **Verdict** : prends la propriété de domaine. Plus complète,
unique, et la vérification DNS est triviale chez OVH.

---

## 2. Procédure — Propriété de domaine *(recommandée)*

### Étape 1 — Créer la propriété

1. Va sur https://search.google.com/search-console
2. Connecte-toi avec le compte Google qui gérera GSC.
   - 💡 **Recommandation** : utilise `amar.mehdaoui@stellarwave.fr`
     *(Workspace)* — pas le Gmail perso. Tu pourras inviter des
     collaborateurs depuis ce compte plus tard.
3. Clique **"Ajouter une propriété"**.
4. Sélectionne **"Domaine"** *(colonne de gauche)*.
5. Tape : `stellarwave.fr`
6. Clique **"Continuer"**.

### Étape 2 — Récupérer l'enregistrement TXT

GSC affiche un enregistrement DNS du type :

```
google-site-verification=AbCdEfGhIjKlMnOpQrStUvWxYz1234567890_xyz
```

Copie cette valeur complète.

### Étape 3 — Ajouter l'enregistrement chez OVH

1. Connecte-toi sur https://www.ovh.com/manager → **Web Cloud** → **Domaines** → `stellarwave.fr`
2. Onglet **"Zone DNS"**
3. Bouton **"Ajouter une entrée"**
4. Type : **TXT**
5. Sous-domaine : *laisser vide* *(pour la racine du domaine)*
6. Cible (valeur TXT) : colle l'enregistrement Google Site Verification
7. TTL : laisser par défaut *(3600)*
8. Confirmer

### Étape 4 — Valider la propriété

1. Retour sur GSC
2. Clique **"Valider"**
3. Si l'enregistrement DNS s'est propagé *(habituellement 5-30 min, peut
   prendre jusqu'à 48 h)*, la vérification réussit ✅

> ⏳ Si la validation échoue, attends 1-2 h et relance. La propagation
> DNS est asynchrone.

---

## 3. Procédure alternative — Préfixe d'URL via balise HTML

Si tu ne veux pas (ou ne peux pas) toucher au DNS, utilise cette méthode.

### Étape 1 — Créer la propriété

Comme §2.1 mais sélectionne **"Préfixe de l'URL"** et tape
`https://stellarwave.fr` *(et plus tard `https://www.stellarwave.fr` aussi
puisque ton site redirige vers www)*.

### Étape 2 — Récupérer la balise meta

GSC propose plusieurs méthodes. Choisis **"Balise HTML"** :

```html
<meta name="google-site-verification" content="AbCdEfGhIjKlMnOpQrStUvWxYz..." />
```

### Étape 3 — Ajouter la balise dans le code Next.js

Dans `src/app/layout.tsx`, ajoute dans le `metadata` :

```typescript
export const metadata: Metadata = {
  // ... reste du metadata existant
  verification: {
    google: "AbCdEfGhIjKlMnOpQrStUvWxYz...",
  },
};
```

Next.js injectera automatiquement la meta tag dans le `<head>` de toutes
les pages.

### Étape 4 — Déployer + Valider

1. Push + déploiement Vercel automatique
2. Vérifier que la balise apparaît : `curl https://stellarwave.fr | grep "google-site-verification"`
3. Retour GSC → **"Valider"**

---

## 4. Soumettre le sitemap

Une fois la propriété validée :

1. Dans GSC, menu de gauche → **"Sitemaps"**
2. Champ "Ajouter un nouveau sitemap" → tape : `sitemap.xml`
3. Clique **"Envoyer"**

URL complète détectée par Google :
```
https://stellarwave.fr/sitemap.xml
```

Le statut passera à **"Réussite"** après ~1-24 h, et Google commencera à
crawler les URLs listées.

---

## 5. Lier Google Search Console à Google Analytics 4

Permet de voir les requêtes Google directement dans GA4 *(données combinées
mots-clés / pages / conversions)*.

### Étape 1 — Dans Google Analytics 4

1. https://analytics.google.com → ta propriété `stellarwave.fr`
2. **Admin** *(roue dentée en bas à gauche)*
3. Colonne "Propriété" → **"Liens Search Console"**
4. **"Lier"** → sélectionne ta propriété GSC `stellarwave.fr`
5. Sélectionne le flux Web *(stellarwave.fr)*
6. Confirme

### Étape 2 — Activer les rapports SC dans GA4

1. Dans GA4 → **Rapports**
2. **Bibliothèque** *(en bas à gauche)*
3. Active la collection **"Acquisition Search Console"** *(décoché par défaut)*

Tu auras désormais 2 nouveaux rapports :
- **Requêtes Google** *(quelles recherches mènent à ton site)*
- **Pages d'entrée organiques** *(quelles pages reçoivent ce trafic)*

---

## 6. Configuration recommandée

### Pays cible

1. GSC → **Paramètres** → **Paramètres internationaux** → **"Cible géographique"**
2. Sélectionne **France**

> ⚠️ Étape importante pour le SEO local. Sans ça, Google peut traiter
> ton site comme générique sans préférence géo.

### Adresse email pour alertes

1. GSC → **Paramètres** → **Préférences utilisateur**
2. Active toutes les notifications email
3. Vérifie que l'adresse pointe vers `amar.mehdaoui@stellarwave.fr`

### Inviter des utilisateurs

Quand tu auras une équipe :
1. **Paramètres** → **Utilisateurs et autorisations**
2. **Ajouter un utilisateur** → email + rôle :
   - **Propriétaire** : contrôle total
   - **Admin total** : tout sauf gérer les propriétaires
   - **Lecteur** : lecture seule *(recommandé pour les prestataires
     SEO externes)*

---

## 7. Audit du sitemap existant — points d'amélioration

Le `sitemap.ts` actuel est minimaliste *(2 URLs)* alors que le site
contient beaucoup plus de pages. À compléter pour maximiser l'indexation.

### Pages manquantes dans le sitemap

```typescript
// src/app/sitemap.ts — version complète recommandée
import { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { blogPosts } from "@/content/blog"; // si export disponible

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = brand.siteUrl;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                       lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/audit-gratuit`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`,             lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/cv-fr`,            lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/cv-en`,            lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    // Pages légales (à créer si pas déjà fait — important pour conformité GBP/RGPD)
    // { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    // { url: `${baseUrl}/confidentialite`,  lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Articles de blog dynamiques (à activer une fois blogPosts exposé)
  // const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt ?? post.publishedAt,
  //   changeFrequency: "monthly" as const,
  //   priority: 0.7,
  // }));

  return [...staticPages /*, ...blogPages*/];
}
```

### Incohérence robots.txt actuelle

Le `robots.ts` actuel bloque `/merci` :

```typescript
disallow: ["/merci", "/api/", "/plaquette", "/plaquette/express"],
```

… mais `/merci` est listé dans le sitemap → signal contradictoire.

**À corriger** :
- Soit retirer `/merci` du sitemap *(c'est une thank-you page, pas
  d'intérêt SEO, à retirer)*
- Soit débloquer dans robots *(plutôt non, c'est une page interne)*

→ **Recommandation** : retirer `/merci` du sitemap.

### Pages plaquette

`disallow: ["/plaquette", "/plaquette/express"]` bloque les pages
plaquette. C'est OK si elles sont privées *(lien envoyé sur demande)*,
sinon il faut les exposer.

---

## 8. À surveiller dans GSC après le branchement

| Métrique | Où | Fréquence |
|---|---|---|
| **Indexation** | Pages → Indexées | Hebdo |
| **Erreurs d'indexation** | Pages → Non indexées | Hebdo |
| **Couverture mobile** | Mobile Usability | Mensuel |
| **Core Web Vitals** | Expérience → Core Web Vitals | Mensuel |
| **Requêtes top** | Performances → Requêtes | Hebdo |
| **Pages top** | Performances → Pages | Hebdo |
| **CTR moyen** | Performances *(vue par défaut)* | Mensuel |
| **Liens externes** | Liens → Sites principaux référents | Mensuel |
| **Sécurité & actions manuelles** | Sécurité et actions manuelles | À la 1re alerte |

---

## 9. Bonus — outils complémentaires à brancher

Une fois GSC en place, étendre l'observabilité SEO :

| Outil | Usage | Effort |
|---|---|---|
| **Bing Webmaster Tools** | Indexation Bing + DuckDuckGo | 10 min *(importable depuis GSC)* |
| **Schema.org JSON-LD** | Rich snippets dans les SERP *(LocalBusiness, Organization, Person, Article)* | 30 min — gros boost SEO |
| **Open Graph + Twitter Cards** | Partages sociaux propres | À vérifier *(probable déjà fait par Next.js metadata)* |
| **Hreflang** | Si versions FR/EN du site | À ajouter si /cv-en, /en sont publiques |
| **PageSpeed Insights API** | Suivi Core Web Vitals automatisé | 1 h |

---

## 10. Timeline d'activation

| Jour | Action |
|---|---|
| **J0** | Créer propriété GSC + ajouter TXT chez OVH |
| **J0 → J+1** | Propagation DNS *(attente passive)* |
| **J+1** | Validation propriété + soumission sitemap |
| **J+2 → J+7** | Google crawle progressivement *(2-7 jours pour 1ère couverture)* |
| **J+7 → J+14** | Premières données dans GSC |
| **J+30** | Volume de données significatif *(requêtes, CTR, positions)* |
| **J+30** | Lier à GA4 |
| **J+60** | Premières optimisations basées sur les données réelles |

---

## 11. Checklist finale

- [ ] Propriété de domaine `stellarwave.fr` créée sur GSC
- [ ] Enregistrement TXT ajouté chez OVH
- [ ] Propriété validée
- [ ] Sitemap `https://stellarwave.fr/sitemap.xml` soumis
- [ ] Pays cible défini : **France**
- [ ] Email d'alertes configuré sur `amar.mehdaoui@stellarwave.fr`
- [ ] Sitemap enrichi *(audit-gratuit, blog, cv-fr, cv-en…)*
- [ ] Incohérence robots/sitemap corrigée *(retirer `/merci` du sitemap)*
- [ ] Lien GSC ↔ GA4 effectué
- [ ] Bing Webmaster Tools branché *(importé depuis GSC)*

---

## 12. Liens utiles

- [Google Search Console](https://search.google.com/search-console)
- [Doc officielle GSC](https://support.google.com/webmasters)
- [Manager OVH](https://www.ovh.com/manager) → Web Cloud → Domaines → `stellarwave.fr` → Zone DNS
- [Google Analytics 4](https://analytics.google.com)
- [Bing Webmaster Tools](https://www.bing.com/webmasters) *(à brancher après GSC)*
