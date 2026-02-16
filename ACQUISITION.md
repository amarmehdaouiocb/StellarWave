# Facilsite — Playbook d'acquisition clients

> Objectif : signer les 50 premiers clients en 90 jours.
> Cible : commerces locaux français sans site web ou avec un site obsolète.

---

## 1. Prospection directe via Google Maps (Canal #1)

### Pourquoi c'est le canal prioritaire
- Les prospects sont identifiables (pas de site web = besoin évident)
- Tu peux leur montrer une preview AVANT qu'ils paient
- Taux de conversion élevé car le besoin est réel et visible

### Process étape par étape

1. **Scraper Google Maps** par ville + catégorie (voir `tools/gmaps-scraper/`)
2. **Filtrer** les commerces sans site web ou avec un site daté
3. **Créer une preview personnalisée** en 15 min (template + infos du commerce)
4. **Contacter** par téléphone ou email avec le lien de la preview
5. **Relancer** J+3 et J+7 si pas de réponse

### Catégories à cibler en priorité (meilleur taux de conversion)

| Priorité | Catégorie | Pourquoi |
|----------|-----------|----------|
| 1 | Restaurants / Pizzerias | Besoin de menu en ligne, réservations |
| 2 | Salons de coiffure / beauté | Prise de RDV en ligne = argument massue |
| 3 | Boulangeries / Pâtisseries | Visuels appétissants, horaires |
| 4 | Artisans (plombier, électricien) | SEO local = source de clients pour eux |
| 5 | Cabinets médicaux / paramédicaux | Obligation d'information, RDV en ligne |
| 6 | Fleuristes | Saisonnier, fort besoin visuel |
| 7 | Boutiques de vêtements | Vitrine produits |

### Villes à attaquer en premier

Commence par les villes moyennes (50k–200k habitants) — moins de concurrence que Paris, commerces plus accessibles :
- Lyon, Bordeaux, Nantes, Toulouse, Montpellier
- Puis : Rennes, Strasbourg, Lille, Nice, Marseille
- Ensuite : villes plus petites (Angers, Tours, Dijon, Clermont-Ferrand…)

### Script d'appel téléphonique

> « Bonjour, je suis [Prénom] de Facilsite. Je travaille avec des [restaurants/salons/etc.] de [ville] pour les aider à avoir un site web professionnel.
>
> J'ai vu que [nom du commerce] n'avait pas encore de site — j'ai pris la liberté de créer une maquette gratuite pour vous montrer ce que ça pourrait donner. Est-ce que je peux vous envoyer le lien par SMS ? Ça prend 30 secondes à regarder.
>
> Si ça vous plaît, on en discute. Si ça ne vous plaît pas, il n'y a aucun engagement. »

### Template email de prospection

**Objet** : J'ai créé une maquette de site pour [Nom du commerce] (gratuit)

> Bonjour [Prénom],
>
> Je m'appelle [Prénom] et j'aide les commerces de [Ville] à avoir un site web professionnel sans se ruiner.
>
> J'ai remarqué que [Nom du commerce] n'avait pas encore de site web. J'ai pris quelques minutes pour imaginer à quoi pourrait ressembler le vôtre :
>
> 👉 **[Lien vers la preview]**
>
> C'est 100% gratuit et sans engagement. Si le résultat vous plaît, on peut en discuter. Sinon, pas de souci !
>
> Pour info, nos tarifs commencent à 299€ (création) + 19€/mois (hébergement + support).
>
> Bonne journée,
> [Prénom]
> Facilsite — facilsite.fr

### Séquence de relance

| Jour | Action | Canal |
|------|--------|-------|
| J+0 | Envoi de la preview | Email + SMS |
| J+3 | Relance courte | Email : "Avez-vous eu le temps de regarder ?" |
| J+7 | Relance avec argument | Email : témoignage client + "offre valable cette semaine" |
| J+14 | Dernier message | Email : "Je ne vous relancerai plus, mais le lien reste actif" |

---

## 2. Google Ads (clients chauds, ROI rapide)

### Pourquoi
- Les gens qui cherchent "créer site web commerce" ont un besoin immédiat
- Coût par clic : 1–4€ selon les mots-clés
- Budget recommandé : 15–25€/jour pour commencer

### Mots-clés à cibler

**Haute intention (priorité 1) :**
- "créer site internet commerce"
- "site web restaurant prix"
- "faire un site pour mon commerce"
- "site internet professionnel pas cher"
- "site web boulangerie"
- "site internet salon de coiffure"

**Moyenne intention (priorité 2) :**
- "comment avoir un site web"
- "site vitrine professionnel"
- "agence web pour commerce"
- "devis site internet"

### Mots-clés négatifs (à exclure)
- "gratuit" (sauf si tu veux qualifier par la preview gratuite)
- "wordpress", "wix", "template"
- "formation", "cours", "tuto"
- "emploi", "stage", "alternance"

### Structure de campagne

```
Campagne 1 : Recherche — Haute intention
├── Groupe : Restaurants
│   └── "site web restaurant", "site internet restaurant prix"
├── Groupe : Coiffure/Beauté
│   └── "site salon coiffure", "site institut beauté"
├── Groupe : Générique commerce
│   └── "site web commerce local", "créer site commerce"
└── Groupe : Prix/Devis
    └── "prix site internet", "devis site web professionnel"

Campagne 2 : Recherche — Moyenne intention
└── Groupes similaires avec mots-clés plus larges
```

### Landing page dédiée
- Utilise ta landing Facilsite existante
- Ajoute un paramètre UTM pour tracker les conversions Google Ads
- Teste des variantes de headline par secteur ("Un site web pour votre restaurant en 24h")

---

## 3. SEO & Content Marketing (long terme, gratuit)

### Pages à créer (SEO local)
Chaque page cible un mot-clé longue traîne :
- `/site-web-restaurant` — "Création de site web pour restaurant"
- `/site-web-coiffeur` — "Site internet salon de coiffure"
- `/site-web-boulangerie` — "Site web boulangerie pâtisserie"
- `/site-web-artisan` — "Site internet artisan"
- `/creation-site-[ville]` — "Création site internet Lyon/Bordeaux/etc."

### Structure SEO de chaque page
1. H1 avec le mot-clé principal
2. Sous-titre avec la promesse ("En 24h, sans engagement")
3. Exemple de site réalisé pour ce secteur (screenshot/mockup)
4. 3 arguments clés pour ce secteur spécifique
5. Témoignage d'un client du même secteur
6. CTA : "Voir ma preview gratuite"
7. FAQ spécifique au secteur

### Articles de blog
- "Pourquoi votre restaurant a besoin d'un site web en 2026"
- "Combien coûte un site internet pour un commerce local ?"
- "Site web vs page Facebook : pourquoi les deux sont nécessaires"
- "5 erreurs que font les commerçants avec leur site internet"
- "Comment apparaître en premier sur Google Maps"

### Google Business Profile
- Crée un profil Google Business pour Facilsite
- Poste régulièrement des exemples de réalisations
- Demande des avis à chaque client satisfait

---

## 4. Réseaux sociaux

### Facebook (canal principal pour les commerçants)

**Groupes à rejoindre :**
- "Commerçants de [Ville]"
- "Entrepreneurs [Ville]"
- "Auto-entrepreneurs France"
- "Créateurs d'entreprise"
- "Artisans et commerçants de France"

**Quoi poster (1–2x/semaine) :**
- Avant/après d'un site créé (capture ton composant BeforeAfter)
- Témoignage client avec photo
- "Quel type de commerce a le plus besoin d'un site ?" (sondage = engagement)
- Story de création : "Ce matin, un boulanger de Nantes m'a contacté. En 4h, voilà son site."

**Règle d'or :** Ne pas spammer. Apporter de la valeur d'abord (conseils SEO, astuces Google Maps), vendre ensuite.

### Instagram

- Posts carousel : "5 raisons d'avoir un site web pour votre commerce"
- Reels : timelapse de création d'un site (écran partagé)
- Stories : sondages, questions, avant/après
- Hashtags : #commercelocal #entrepreneurfrance #sitewebpro #digitallocal

### TikTok (fort potentiel viral)

- "Je crée un site web en 24h pour un commerce qui n'en a pas"
- "J'ai cherché les pires sites de restaurants et je les ai refaits"
- "Ce boulanger n'avait pas de site web. Voilà ce que j'ai fait."
- Format : face cam + screencast, 30–60 secondes

### LinkedIn

- Posts storytelling : "J'ai aidé 10 commerces de Lyon à avoir un site web. Voilà ce que j'ai appris."
- Cibler les consultants, comptables, accompagnateurs de créateurs d'entreprise
- Moins de volume mais meilleure qualité de contacts B2B

---

## 5. Partenariats stratégiques

### Experts-comptables
- **Pourquoi** : Ils voient des dizaines de commerçants, ils sont des conseillers de confiance
- **Offre** : 50€ de commission par client référé, ou 20% récurrent sur l'abonnement mensuel
- **Approche** : Email personnalisé + PDF de présentation + lien de parrainage unique
- **Cible** : Cabinets comptables dans les villes moyennes

### Chambres de Commerce (CCI)
- **Pourquoi** : Elles accompagnent les créateurs d'entreprise et les commerçants
- **Offre** : Atelier gratuit "Créer sa présence en ligne" + tarif préférentiel pour les adhérents
- **Approche** : Contacter le responsable "commerce" ou "numérique" de la CCI locale

### Associations de commerçants
- Chaque centre-ville a souvent une association de commerçants
- Proposer une offre groupée : -20% si 5+ commerçants du même quartier

### Agents immobiliers commerciaux
- Quand un commerce ouvre, il a besoin d'un site
- Commission par référence ou partenariat

### Imprimeurs / agences de communication locale
- Ils font les cartes de visite et flyers, mais pas les sites web
- Partenariat complémentaire : ils vendent Facilsite, tu vends leurs services print

---

## 6. Cold Email à grande échelle

### Sources de contacts
- **Scraper Google Maps** (notre outil)
- **Annuaires** : PagesJaunes, Yelp, TripAdvisor
- **Registres** : Infogreffe (nouveaux commerces immatriculés)

### Outils recommandés
- **Lemlist** ou **Instantly** pour l'envoi automatisé
- **Hunter.io** pour trouver les emails
- Sinon, format standard : contact@[nomentreprise].fr, info@, hello@

### Séquence email froide

**Email 1 — J+0 : L'accroche**
> Objet : [Nom du commerce] — votre site web est prêt (gratuit)
>
> Bonjour,
>
> J'ai créé une maquette de site web pour [Nom du commerce] à [Ville]. C'est entièrement gratuit, juste pour vous montrer ce que ça pourrait donner :
>
> 👉 [Lien preview]
>
> Si ça vous intéresse, on en discute. Sinon, bonne continuation !

**Email 2 — J+3 : La relance douce**
> Objet : Re: [Nom du commerce]
>
> Juste un petit mot pour savoir si vous aviez eu le temps de regarder la maquette. Le lien est toujours actif : [Lien]

**Email 3 — J+7 : La preuve sociale**
> Objet : Ce que disent les commerçants de [Ville]
>
> [Prénom], voici ce que Marie, restauratrice à Lyon, m'a dit après avoir reçu son site :
>
> *"En 24h, j'avais un site magnifique. Mes réservations ont doublé."*
>
> Votre preview est toujours disponible ici : [Lien]

**Email 4 — J+14 : Le dernier message**
> Objet : Je ne vous relancerai plus
>
> [Prénom], c'est mon dernier message. Si un jour vous avez besoin d'un site web pour [Nom du commerce], le lien de votre preview reste actif pendant 30 jours : [Lien]
>
> Bonne continuation !

---

## 7. Démarchage terrain

### Quand le faire
- Mardi à jeudi, 10h–12h ou 14h–16h (éviter le rush)
- Cibler les rues commerçantes des centres-villes

### Kit de démarchage
- **Smartphone** avec des exemples de sites à montrer
- **Flyer A5** : QR code vers facilsite.fr, tarifs, "preview gratuite"
- **Carte de visite** avec QR code

### Script terrain

> « Bonjour ! Je m'appelle [Prénom], je suis de Facilsite. On crée des sites web pour les commerces locaux. Je vois que [observation : pas de site, site ancien, juste une page Facebook…]. Est-ce que je peux vous montrer un exemple sur mon téléphone ? Ça prend 30 secondes. »

### Astuce : la photo du commerce
- Prends une photo de la devanture avant d'entrer
- Utilise-la dans la preview personnalisée que tu enverras après
- "J'ai intégré la photo de votre boutique dans la maquette" → effet wow

---

## 8. Programme de parrainage

### Offre
- **Parrain** : 1 mois gratuit (ou 50€ de réduction) pour chaque client référé
- **Filleul** : -10% sur la création

### Mise en place
- Email automatique à J+30 après la mise en ligne : "Connaissez-vous un commerçant qui aurait besoin d'un site ?"
- Lien de parrainage unique avec tracking
- Rappel à J+60 et J+90

### Pourquoi ça marche
- Les commerçants se connaissent entre eux (même rue, même marché, même CCI)
- Un site visible = pub naturelle ("C'est qui qui t'a fait ton site ?")

---

## 9. Marketplaces freelance (complément)

### Plateformes
- **Malt** : profil "Création de sites web pour commerces locaux"
- **ComeUp** (ex 5euros.com) : offre packagée à prix fixe
- **Fiverr** : si tu veux toucher l'international aussi

### Positionnement
- Ne pas se positionner en "développeur web" (trop concurrentiel)
- Se positionner en "spécialiste sites web pour commerces locaux"
- Mettre en avant : rapidité (24h), preview gratuite, tout inclus

---

## 10. Plan d'action — Les 90 premiers jours

### Semaine 1–2 : Mise en place
- [ ] Configurer le scraper Google Maps
- [ ] Préparer 3 templates de preview (restaurant, coiffeur, commerce générique)
- [ ] Créer les séquences email dans Lemlist/Instantly
- [ ] Créer profil Google Business
- [ ] Imprimer 200 flyers

### Semaine 3–4 : Premier sprint de prospection
- [ ] Scraper 500 commerces dans 2 villes (Lyon + Bordeaux)
- [ ] Créer 20 previews personnalisées
- [ ] Envoyer les 20 premiers emails
- [ ] 2 demi-journées de démarchage terrain
- [ ] Poster 3x sur les groupes Facebook

### Mois 2 : Accélérer
- [ ] Lancer Google Ads (15€/jour)
- [ ] Scraper 5 nouvelles villes
- [ ] Contacter 10 experts-comptables
- [ ] Contacter 3 CCI
- [ ] Publier 2 articles de blog SEO
- [ ] Premier post LinkedIn

### Mois 3 : Systématiser
- [ ] Automatiser le maximum (scraping → email → relance)
- [ ] Lancer le programme de parrainage
- [ ] Créer les pages SEO par secteur
- [ ] Poster sur TikTok/Instagram (1 reel/semaine)
- [ ] Analyser les données : quel canal convertit le mieux ?

---

## Métriques à suivre

| Métrique | Objectif Mois 1 | Objectif Mois 3 |
|----------|-----------------|-----------------|
| Prospects contactés | 100 | 500 |
| Previews envoyées | 20 | 100 |
| Taux de réponse | 15% | 20% |
| Clients signés | 5 | 25 |
| MRR (revenu mensuel récurrent) | 150€ | 750€ |
| Coût d'acquisition client | < 50€ | < 30€ |

---

## Pricing — Rappel et optimisation

| Plan | Création | Mensuel | Cible |
|------|----------|---------|-------|
| Essentiel | 299€ | 19€/mois | Artisans, petits commerces |
| Pro | 499€ | 29€/mois | Restaurants, salons (réservations) |
| Premium | 799€ | 49€/mois | Multi-sites, fonctions avancées |

**Astuce pricing :**
- Propose toujours le plan Pro en premier (c'est le sweet spot)
- Offre le premier mois gratuit pour réduire la friction
- Propose un paiement en 3x sans frais pour les plans > 400€
