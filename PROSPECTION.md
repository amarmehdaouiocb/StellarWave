# Stratégie de Prospection — Simplisite

## Vue d'ensemble

193+ prospects qualifiés dans Supabase (Lyon, Marseille, Bordeaux).
Objectif : convertir 10-15 clients le premier mois → 350-600€ MRR.

---

## 1. Priorisation des prospects

### Tier A — Budget + besoin évident (appeler en premier)
| Niche | Pourquoi | Ticket moyen |
|-------|----------|--------------|
| Orthophonistes, podologues, kinés | Les patients cherchent sur Google, besoin de crédibilité | 49€/mois |
| Garages, carrosseries | Devis en ligne = plus de clients, secteur concurrentiel | 39€/mois |
| Salons de coiffure, instituts | Réservation en ligne, portfolio visuel | 39€/mois |

### Tier B — Volume, ticket plus accessible
| Niche | Pourquoi | Ticket moyen |
|-------|----------|--------------|
| Kebabs, snacks, sandwicheries | Menu + commande en ligne, très peu ont un site | 29€/mois |
| Pressings, retouches, cordonniers | Visibilité locale, horaires en ligne | 29€/mois |
| Lavages auto, toiletteurs | Prise de RDV, galerie photos | 29€/mois |

---

## 2. Canal principal : Appel + Preview SMS

### Le combo gagnant (taux de conversion x3)

```
Étape 1 → Générer le lien de preview personnalisé
Étape 2 → Envoyer par SMS/WhatsApp : "Bonjour [prénom], voici un aperçu
           de votre futur site web : [lien]. Qu'en pensez-vous ?"
Étape 3 → Appeler 30 min après l'envoi du SMS
```

### Script d'appel (30 secondes)

> "Bonjour, je suis [prénom] de Simplisite. Je vous ai envoyé un aperçu de
> site web pour [nom du commerce] par SMS. Vous avez eu le temps d'y jeter
> un œil ? On crée des sites professionnels clé en main pour les pros comme
> vous, à partir de 29€/mois. Est-ce que ça vous intéresserait d'en discuter
> 5 minutes ?"

### Si le prospect n'a pas vu le SMS

> "Pas de souci ! J'ai remarqué que [nom du commerce] n'a pas encore de site
> web. On en crée pour les commerces locaux, clé en main, et j'ai préparé un
> aperçu gratuit de ce que ça donnerait pour vous. Je peux vous l'envoyer
> par SMS maintenant ?"

### Objections courantes

| Objection | Réponse |
|-----------|---------|
| "C'est trop cher" | "29€/mois c'est moins d'1€/jour. Un seul client gagné grâce au site rentabilise des mois d'abonnement." |
| "J'ai pas le temps" | "Justement, on s'occupe de tout. Vous n'avez rien à faire, le site est prêt en 24h." |
| "J'ai déjà une page Facebook" | "Super ! Mais 70% des clients cherchent sur Google, pas Facebook. Un site vous rend visible là où ils cherchent." |
| "Je vais y réfléchir" | "Bien sûr ! L'aperçu reste disponible. Je vous rappelle dans 3 jours ?" |
| "Mon fils/neveu va me le faire" | "C'est une option ! Mais souvent ça prend des mois. On garantit une mise en ligne en 24h avec maintenance incluse." |

---

## 3. Calendrier de prospection (4 semaines)

### Semaine 1 — Santé (Lyon)
- **Cible** : Orthophonistes, podologues, kinés
- **Volume** : ~10 prospects
- **Action** : Envoyer previews + appels le lendemain matin (9h-11h)

### Semaine 2 — Auto (Lyon + Marseille)
- **Cible** : Carrosseries, lavages auto, garages
- **Volume** : ~15 prospects
- **Action** : SMS le lundi, appels mardi-mercredi

### Semaine 3 — Services (Lyon + Bordeaux)
- **Cible** : Retouche vêtement, cordonniers, pressings
- **Volume** : ~15 prospects
- **Action** : SMS le lundi, appels mardi-mercredi

### Semaine 4 — Alimentation (toutes villes)
- **Cible** : Kebabs, snacks, sandwicheries, crêperies
- **Volume** : ~20 prospects
- **Action** : Visiter en personne à l'heure creuse (14h-16h) + laisser flyer avec QR code

---

## 4. Suivi et relances

### Séquence de relance

```
Jour 0  → SMS avec preview + appel 30 min après
Jour 3  → Relance SMS : "Bonjour, avez-vous pu voir l'aperçu ?"
Jour 7  → Appel de relance (dernier essai)
Jour 14 → SMS final : "Offre spéciale : premier mois offert si vous signez cette semaine"
```

### Suivi dans Supabase

Mettre à jour les champs pour chaque prospect :
- `contacte` → true quand le premier contact est fait
- `preview_envoyee` → true quand le lien preview est envoyé
- `notes` → résumé de chaque interaction

---

## 5. Métriques cibles

| Étape | Taux estimé | Sur 193 prospects |
|-------|-------------|-------------------|
| Preview envoyée | 100% | 193 |
| Preview ouverte | ~50% | 97 |
| Appels passés | 100% | 193 |
| Décrochent | ~60% | 116 |
| Intéressés | ~25% | 29 |
| **Convertissent** | **~10%** | **12-15** |

**Objectif MRR mois 1** : 12 clients × 35€ moyen = **420€/mois**

---

## 6. Outils

| Outil | Usage |
|-------|-------|
| `scrape.mjs --batch` | Trouver de nouveaux prospects |
| `generate-links.mjs` | Générer les URLs de preview |
| Supabase dashboard | Suivre les statuts des prospects |
| WhatsApp Business | Envoyer les previews par SMS |
| Google Sheets | Tracker les appels et résultats |

---

## 7. Commandes utiles

```bash
# Scraper de nouveaux prospects
GOOGLE_MAPS_API_KEY=xxx node tools/gmaps-scraper/scrape.mjs --batch --ville Toulouse --hot-only --max 5

# Générer les liens de preview pour les prospects chauds
SUPABASE_URL=xxx SUPABASE_KEY=xxx node tools/preview-generator/generate-links.mjs --ville Lyon --priorite 1

# Générer pour tous les prospects non contactés
SUPABASE_URL=xxx SUPABASE_KEY=xxx node tools/preview-generator/generate-links.mjs --non-contactes
```
