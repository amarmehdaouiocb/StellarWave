# Sales Deck — Contenu (FR)

> Source pour `stellarwave-ai-ops-fr.pdf`. 10 pages.
> Audience : COO / Directeur des Opérations de cabinets de gestion de patrimoine et family offices (5-50 conseillers, encours 50 M€ – 2 Mds€).
> Voix : sobre, institutionnelle, orientée ROI. Aucun marketing creux.
> Adaptation : USD → EUR, "advisor" → "conseiller en gestion de patrimoine (CGP)", références FR/BE/CH ajoutées.

---

## Page 1 — Couverture

**Layout** : centré, marge top 60%. Motif constellation décoratif faible opacité.

**Background** : `#0A0E1A` uni + halo amber 6% en haut à droite.

**Contenu** :

- **Tag (majuscules amber)** : `STELLARWAVE × GESTION DE PATRIMOINE`
- **H1 (ClashDisplay 96)** : `Opérations IA`<br>`pour cabinets de gestion`
- **Sous-titre italique violet (CabinetGrotesk 32)** : *« Des systèmes d'automatisation sur mesure qui rendent à vos conseillers seniors 10 à 15 heures par semaine. »*
- **Caption bas-centre (Outfit 13)** : `Cadre d'engagement premium — édition 2026`
- **Footer** : logo StellarWave + `stellarwave.fr/operations-ia`

---

## Page 2 — Le problème

**Layout** : 55% supérieur = bloc stat hero. 45% inférieur = 3 colonnes de douleurs.

**Background** : `#0A0E1A` + halo coral subtil en haut à droite.

**Contenu** :

- **Label (majuscules amber)** : `LE COÛT INVISIBLE`
- **Stat hero (ClashDisplay 160, amber)** : `30 %`
- **Sous-stat (Outfit 28, blanc)** : du temps de vos meilleurs conseillers est consommé par des tâches que l'IA traite en quelques minutes.
- **Body (Outfit 22, secondaire)** : Onboarding clients, réponses aux appels d'offres, revues conformité, reporting trimestriel. Les tâches que personne ne facture. Celles qui rongent silencieusement vos collaborateurs les mieux payés.

**Trois colonnes de douleurs** (Outfit, body 18, accent coral sur les chiffres) :

```
┌─ Onboarding client ────────┐  ┌─ Réponses aux AO ───────────┐  ┌─ Revues conformité ─────────┐
│                            │  │                              │  │                              │
│  8 heures                  │  │  5 800 heures                │  │  30–40 % du coût admin       │
│  par nouveau client        │  │  par an (équipe 10 personnes)│  │  dépensé en pure perte       │
│                            │  │                              │  │                              │
│  KYC, ouverture de compte, │  │  Les AO institutionnels      │  │  Lecture, traçabilité,       │
│  rédaction du DEC, dossier │  │  consomment jusqu'à 23 %     │  │  reportings ACPR — règles    │
│  dépositaire.              │  │  de la capacité totale.      │  │  fixes traitées à la main.   │
└────────────────────────────┘  └──────────────────────────────┘  └──────────────────────────────┘
```

- **Bandeau bas (Outfit 16, italique violet)** : *À 250 € de coût horaire chargé par conseiller, un cabinet de 5 conseillers perd plus de 165 000 € de capacité senior chaque année — sans qu'aucun client ne le remarque.*

**Sources (footnotes 11px) — bas de page** :
- ¹ RFXAI — *Win More Deals in Less Time*. ² Empaxis — *AI Use Cases in Wealth Management*. ³ Calcul interne : 5 conseillers × 10 h/sem × 250 € × 50 sem = 625 000 €. Estimation conservative à 165 k€ (plancher).

---

## Page 3 — Pourquoi les solutions actuelles échouent

**Layout** : tableau comparatif 4 lignes. Label top + ligne de résumé. Tableau remplit 70% verticalement.

**Background** : `#0A0E1A` + ligne amber 1px décorative en haut.

**Contenu** :

- **Label majuscules amber** : `LES QUATRE FAUSSES PISTES`
- **H2 (ClashDisplay 56)** : Pourquoi la majorité des projets IA bloquent dans les cabinets de gestion.

**Tableau comparatif** (3 colonnes : Option / Promesse / Pourquoi ça échoue) :

| Option | Promesse | Pourquoi ça échoue |
|---|---|---|
| **ChatGPT Enterprise / Copilot** | « De l'IA pour tout le monde » | Sorties génériques. Aucune connaissance de vos modèles DEC, votre dépositaire, vos règles ACPR. Vos conseillers décrochent au bout de 15 jours. |
| **Make / Zapier / n8n** | « Automatisez sans code » | Logique en cascade fragile. Casse au premier changement d'API. Incapable de raisonner. Incapable de lire un document de 60 pages et d'en sortir 3 clauses à risque. |
| **Recruter un ingénieur IA** | « Internalisons » | 180 k€+ chargé. Ramp-up 12 mois. Risque de départ à 18 mois — l'architecture part avec lui. |
| **Conseil stratégique (Big-4)** | « Roadmap IA enterprise » | Engagement 400 k€ – 1,5 M€. 18 mois de delivery. Livrables PowerPoint. Code que vous ne possédez pas. |

- **Phrase de clôture (CabinetGrotesk italique 32, violet)** : *Il existe une cinquième voie.*

**Sources** : ⁴ AGIX Tech — *AI Automation Agency Costs*. ⁵ APEC + Robert Half 2025 (composite salaires).

---

## Page 4 — L'approche StellarWave

**Layout** : H1 en haut + 4 piliers en grille 2×2.

**Background** : `#0A0E1A` + halo amber 4% au centre.

**Contenu** :

- **Label majuscules amber** : `LA CINQUIÈME VOIE`
- **H1 (ClashDisplay 96)** : Des opérations IA<br>sur mesure. Livrées en semaines.<br>Possédées par vous.

**Quatre cards de piliers** (background #131829, border-radius 24) :

```
1.  SUR MESURE
    Agents Claude + serveurs MCP + skill files,
    construits autour des workflows DE VOTRE cabinet.
    Pas un template SaaS. Pas un chatbot générique.
    Vos opérations, codifiées.

2.  SOUVERAINETÉ DES DONNÉES
    Serveurs MCP déployables on-premise.
    API Anthropic : zéro rétention pour entraînement (contractuel).
    Conforme RGPD. SOC 2 en cours.
    Vos données clients ne quittent jamais votre périmètre.

3.  DELIVERY MENÉE PAR UN SENIOR
    Un seul architecte du discovery au déploiement.
    Pas de relais junior. Pas d'account manager.
    Vous parlez à la personne qui construit.

4.  OPÉRATIONS EMBARQUÉES
    Le retainer mensuel maintient le système vivant :
    nouvelles automations, monitoring, ajustements.
    Le système grandit avec le cabinet.
```

**Sources** : (aucune — positionnement)

---

## Page 5 — Cinq cas d'usage pour cabinets de gestion

**Layout** : 5 cards horizontales empilées OU grille 2-3 colonnes selon largeur. Chaque card : numéro / titre / body / métrique ROI.

**Background** : `#0A0E1A`.

**Contenu** :

- **Label majuscules amber** : `CE QUE NOUS CONSTRUISONS`
- **H2 (ClashDisplay 56)** : Cinq automations éprouvées pour les cabinets de gestion de patrimoine.

**Card 1 — Automatisation de l'onboarding client**
- Body : Récupère les pièces KYC, rédige le DEC à partir des notes d'entretien, génère le dossier dépositaire, fait remonter les manques au conseiller.
- ROI métrique (teal) : `8 h → 2 h par nouveau client (-75 %)`

**Card 2 — Système de réponse aux appels d'offres**
- Body : Lit l'AO institutionnel, retrouve les sections correspondantes dans votre base de connaissances, rédige la réponse. Le conseiller édite les 20 % finaux.
- ROI métrique (teal) : `-60 % temps de réponse, +16 % de taux de win`²

**Card 3 — Revue de conformité documentaire**
- Body : Lit les évolutions réglementaires (ACPR, AMF, ESMA), identifie les impacts sur vos DEC et fiches d'entrée en relation, rédige les amendements. Le RCSI valide.
- ROI métrique (teal) : `30–40 % de réduction du coût admin`³

**Card 4 — Génération des reportings trimestriels**
- Body : Récupère les données de portefeuille via API dépositaire, rédige une revue personnalisée par client (commentaire, attribution, recommandations). Le conseiller édite en 30 min vs 4 h en partant de zéro.
- ROI métrique (teal) : `4 h → 30 min par client (-87 %)`

**Card 5 — Intelligence prospects & matching conseiller**
- Body : Analyse le prospect entrant (LinkedIn, données publiques, contexte sectoriel), produit une note de 1 page, recommande le conseiller le mieux adapté à la spécialité du portefeuille.
- ROI métrique (teal) : `Note de pré-RDV prête en < 5 min`

**Footer** : *Chaque automation est livrée avec sa documentation, sa formation et 30 jours de support post-livraison.*

**Sources** : ¹ ² ³ identiques page 2.

---

## Page 6 — Le calcul du ROI

**Layout** : 40% supérieur = visualisation formule. 60% inférieur = tableau scénarios + payback.

**Background** : `#0A0E1A` + halo teal en bas à droite.

**Contenu** :

- **Label majuscules amber** : `LES CHIFFRES`
- **H2 (ClashDisplay 56)** : De la capacité rendue à votre cabinet — mesurée, pas promise.

**Visualisation formule** (centrée, grande) :
```
       Conseillers libérés    Heures/sem économisées   Coût horaire chargé    Semaines/an
  N  =        5             ×          10            ×        250 €         ×       50

                                                                          = 625 000 €
                                                                             de capacité
                                                                             rendue
                                                                             par an
```

Le chiffre amber `625 000 €` doit dominer. Autres chiffres en blanc cassé `#E7ECFF`.

**Tableau scénarios** (3 lignes) :

| Taille du cabinet | Heures économisées / sem | Capacité rendue / an | Payback Workflow Studio |
|---|---|---|---|
| 3 conseillers | 30 h | 375 k€ | 2 mois |
| 5 conseillers | 50 h | 625 k€ | 1,2 mois |
| 12 conseillers | 120 h | 1,5 M€ | < 1 mois |

**Bandeau bas** (italique violet) : *Nous mesurons le ROI dans nos engagements. Nous ne le projetons pas en slide.*

**Sources** : Calcul interne. Coût horaire chargé basé sur composite (salaire base 80-130 k€ × multiplicateur 1,4 ÷ 1 600 heures facturables).

---

## Page 7 — Cas client (adapté)

**Layout** : 2 colonnes 60/40. Gauche = narratif avant/après + chiffres. Droite = quote + panneau résultat.

**Background** : `#0A0E1A` + accent violet à gauche.

**Contenu** :

- **Label majuscules amber** : `CAS CLIENT`
- **H2 (ClashDisplay 56)** : Cabinet de services, 80 opérateurs terrain — avant / après.

**Disclosure (italique, haut colonne gauche, secondaire 14px)** : *Adapté d'un engagement StellarWave récent dans les services à fort volume opérationnel. Nous ne revendiquons pas de client en gestion de patrimoine à ce stade ; ce cas sera remplacé par une référence cabinet nommée dès la signature de notre premier client du segment. Les chiffres ci-dessous sont réels.*

**Colonne gauche — avant / après** :

```
AVANT                               APRÈS (12 semaines)
─────────────────────              ──────────────────────────
3 heures                            30 minutes
de coordination manuelle            de revue supervisée
par opérateur par jour              par opérateur par jour

Erreurs de saisie récurrentes       Zéro erreur de saisie sur 90 jours
détectées par le contrôleur         Piste d'audit auto-générée

Plafond à 80 opérateurs             Capacité jusqu'à 160 sans recrutement
sans embauche d'admin               Marge par opérateur +18 %
```

**Colonne droite — quote + panneau résultat** :

> *« On ne cherchait pas de l'IA. On cherchait à récupérer nos week-ends. »*
>
> — COO, client anonymisé

**Panneau résultat** (card #131829) :
- Investissement projet : 28 000 €
- Retainer : 3 200 € / mois
- Payback : mois 5
- Statut : engagement actif depuis 18+ mois

**Sources** : Données internes, engagement StellarWave 2024-2025.

---

## Page 8 — Offres & investissement

**Layout** : 3 cards de pricing horizontales. Largeur égale.

**Background** : `#0A0E1A`.

**Contenu** :

- **Label majuscules amber** : `MODÈLE D'ENGAGEMENT`
- **H2 (ClashDisplay 56)** : Trois manières de commencer.

**Card 1 — AUDIT DIAGNOSTIC**
- Prix (H1 amber) : `Gratuit`
- Sub : 30 min · visio · sans pitch
- Bullets :
  - Cartographie de 5 à 8 candidats d'automation
  - Classement par ROI / effort / risque
  - Synthèse écrite livrée sous 48 h
  - Aucun engagement de poursuivre
- CTA : `Réserver l'audit →`

**Card 2 — WORKFLOW STUDIO** (mise en avant, bordure amber)
- Prix (H1 amber) : `25 – 40 k€`
- Sub : 6-10 semaines · prix fixe · 5 automations livrées
- Bullets :
  - Discovery + design sur mesure
  - 5 automations en production
  - Documentation + formation équipe
  - 30 jours de support post-livraison
- CTA : `Demander un cadrage →`

**Card 3 — OPÉRATIONS IA**
- Prix (H1 amber) : `3 – 5 k€ / mois`
- Sub : 6 mois minimum · récurrent
- Bullets :
  - 1 nouvelle automation par mois
  - Monitoring + corrections edge cases
  - Revue ROI trimestrielle
  - Slack direct avec l'architecte
- CTA : `Discuter du retainer →`

**Bandeau footer** (Outfit 18, secondaire) : *La majorité des engagements : Workflow Studio en premier → retainer Opérations IA. Enveloppe première année : 60-90 k€ par client.*

**Sources** : Pricing aligné aux benchmarks 2026 des services AI automation (AGIX, Optimize with Sanwal, Monetize Bot).

---

## Page 9 — Process & sécurité

**Layout** : split 50/50. Gauche = timeline 4 étapes. Droite = stack sécurité.

**Background** : `#0A0E1A`.

**Contenu** :

- **Label majuscules amber** : `COMMENT ON TRAVAILLE`
- **H2 (ClashDisplay 56)** : Delivery prévisible. Architecture défendable.

**Colonne gauche — process en 4 étapes** :

```
Semaine 1                           Semaines 2-3
DISCOVERY                           DESIGN
Cartographie des workflows.         Architecture des skill files.
Entretiens parties prenantes.       Cadrage des serveurs MCP.
Classement des candidats.           Validation avant build.

Semaines 4-7                        Semaines 8-10
BUILD                               DEPLOY + FORMATION
Développement itératif.             Mise en production.
Démos hebdomadaires.                Formation équipe (1 session).
Tests + dry runs.                   Fenêtre de support 30 jours.
```

**Colonne droite — stack sécurité** :

```
LLM PROVIDER
API Anthropic Claude
Zéro rétention pour entraînement (contractuel)
Résidence des données EU & US au choix

ORCHESTRATION
Serveurs MCP — auto-hébergeables
Skill files versionnés dans VOTRE dépôt Git
Aucun SaaS tiers dans le chemin de la donnée

TRAITEMENT DES DONNÉES
Chiffrement au repos (AES-256)
Chiffrement en transit (TLS 1.3)
Conforme RGPD / EU AI Act
SOC 2 Type II — en cours (objectif Q4 2026)

CONTRÔLE D'ACCÈS
Rôles + audit
Kill switch par automation
Monitoring quotidien + revue mensuelle
```

**Sources** : Anthropic Trust Center, spécification MCP (Anthropic).

---

## Page 10 — Prochaine étape

**Layout** : style cover, centré. Motif constellation décoratif.

**Background** : `#0A0E1A` + halo amber subtil bas-centre.

**Contenu** :

- **Tag (majuscules amber)** : `PROCHAINE ÉTAPE`
- **H1 (ClashDisplay 96)** : Une question.<br>Trente minutes.<br>Votre roadmap.
- **Body (Outfit 22, secondaire)** : Réservez l'Audit Diagnostic. Nous cartographions 5 à 8 candidats d'automation pour votre cabinet, classés par ROI. Nous envoyons la synthèse sous 48 h. Vous décidez de la suite.
- **CTA pill primaire (amber, 480×80)** : `Réserver l'Audit Diagnostic →`
- **Caption sous CTA (Outfit 13, tertiaire)** : `cal.com/stellarwave/audit`
- **Contact secondaire** :
  ```
  Amar Mehdaoui
  Fondateur, StellarWave
  amar@stellarwave.fr
  linkedin.com/in/amar-mehdaoui
  ```
- **Footer** : `stellarwave.fr/operations-ia` · `Édition mai 2026`

**Sources** : (aucune — page finale)
