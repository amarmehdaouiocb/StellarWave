# Pipeline Outbound — StellarWave

Pipeline de prospection multi-canal (cold email + LinkedIn automatisé) pour générer des leads qualifiés sur ICP transversal PMEs.

---

## Objectif

Générer **6-12 leads qualifiés/mois** via outbound multi-canal, CAC ~50-150€/lead, avec ~3h/sem de monitoring solo.

---

## ICP cible

| Critère | Valeur |
|---|---|
| Taille | 50-200 salariés (sweet spot 80-150) |
| CA | 1-30M€ |
| Maturité digitale | Process critiques tournent sur Excel / Google Sheets / mails / Notion mal exploité |
| Pain | Erreurs manuelles, double saisie, scaling impossible, dépendance à 1 personne |
| Décideur | Dirigeant, DAF, Directeur opérations, Responsable transformation digitale (PAS DSI) |
| Géo M1-M6 | Île-de-France (75, 92, 93, 94) |
| Géo M7+ | France entière |
| Exclusions | Grands groupes (>500p), retail pur, ESN/agences (concurrents), administrations |

---

## Schéma global

```
┌─────────────────────────────────────────────────────────┐
│                    1. ICP DÉFINI                         │
│  PME 50-200p, IDF, DAF/Dir Ops/DG/Gérant, pain Excel    │
└──────────────────────────┬──────────────────────────────┘
                           v
┌─────────────────────────────────────────────────────────┐
│            2. SOURCING — LinkedIn Sales Nav             │
│  Filtres avancés -> 200-300 profils LinkedIn/semaine    │
│                       80€/mois                           │
└──────────────────────────┬──────────────────────────────┘
                           v
                  Export liste profils
                           v
┌─────────────────────────────────────────────────────────┐
│           3. ENRICHISSEMENT — Dropcontact               │
│  URLs LinkedIn -> emails nominatifs vérifiés (90%+)     │
│                       30€/mois                           │
└──────────────────────────┬──────────────────────────────┘
                           v
                Liste enrichie ~150 prospects/sem
                  (drop-off ~25% emails non trouvés)
                           v
              ┌────────────┴────────────┐
              v                         v
┌────────────────────────┐  ┌────────────────────────────┐
│  4a. EMAIL — Lemlist   │  │  4b. LINKEDIN — Waalaxy    │
│  Séquence 4 emails/14j │  │  Visite -> invit -> msg    │
│  Personnalisation auto │  │  -> relance J+5            │
│  Lien désinscription   │  │  Anti-détection LinkedIn   │
│       70€/mois          │  │       60€/mois             │
└────────────┬───────────┘  └─────────────┬──────────────┘
             v                            v
   Taux réponse 5-10%          Taux acceptation 30%
   = 7-15 réponses/sem        Taux réponse 10-20%
                              = 5-10 réponses/sem
             └────────────┬───────────────┘
                          v
              Réponses positives consolidées
              (déduplication multi-canal)
                          v
┌─────────────────────────────────────────────────────────┐
│           5. CAPTURE — Calendly + Resend                │
│  RDV 30 min booké OU email diagnostic envoyé            │
│                    Calendly Free                         │
└──────────────────────────┬──────────────────────────────┘
                           v
┌─────────────────────────────────────────────────────────┐
│         6. QUALIFICATION — Notion CRM                   │
│  Tag MQL/SQL selon signaux ICP                          │
│  Suivi RDV -> propal -> deal                            │
│                    0€ ou Folk 15€                        │
└──────────────────────────┬──────────────────────────────┘
                           v
              6-12 leads qualifiés/mois
                           v
                   Propal -> Signature
```

---

## Outils — rôle et coût

### LinkedIn Sales Navigator — 80€/mois

**Rôle** : sourcing des prospects ICP via filtres avancés.

**Pourquoi indispensable** : LinkedIn gratuit ne permet pas de filtrer par taille d'entreprise précise, titre exact, géo précise, ancienneté poste. Sans Sales Nav, pas de liste qualifiée à attaquer.

**Filtres types à sauvegarder** :
- Company size : 51-200 employees
- Geography : Île-de-France (M1-M6) puis France (M7+)
- Job title (current) : DAF, Directeur opérations, Directeur général, Gérant, Chief Operating Officer, Head of Operations, Responsable transformation digitale
- Years in current position : 1-5 ans (poste assez stable, mais pas figé)
- Spotlights : changed jobs in last 90 days (signal d'achat — nouveau décideur veut faire ses preuves)
- Exclusions : grands groupes, ESN/agences

### Dropcontact — 30€/mois

**Rôle** : enrichissement des emails nominatifs vérifiés depuis URLs LinkedIn.

**Output** : `prenom.nom@entreprise.fr` vérifié (90%+ taux de validité, 75%+ taux de découverte).

**Alternatives** : Hunter.io (généraliste), Apollo (base monde, qualité FR moindre). Dropcontact est le plus FR-friendly et RGPD-natif.

### Lemlist — 70€/mois

**Rôle** : envoi automatisé de séquences cold email (4 emails sur 14 jours).

**Fonctionnalités clés** :
- Espacement intelligent des envois (anti-spam Gmail/Outlook)
- Warm-up automatique du domaine
- Personnalisation par variables (`{{prenom}}`, `{{entreprise}}`, image dynamique avec logo)
- Stop automatique si réponse OU désinscription
- Tracking : taux ouverture / clic / réponse / RDV booké
- Lien désinscription auto-injecté (conformité RGPD)

### Waalaxy — 60€/mois

**Rôle** : outreach LinkedIn automatisé en parallèle du cold email (multi-touch).

**Fonctionnalités clés** :
- Séquences : visite profil -> invitation personnalisée -> message si acceptation -> relance J+5
- Anti-détection LinkedIn (rythme humain, randomisation)
- RGPD natif, outil français
- Pourquoi en parallèle de Lemlist : multi-touch (email + LinkedIn) sur le même prospect = +10-20% taux de réponse vs un seul canal

### Calendly Free — 0€

**Rôle** : booking automatique des RDV 30 min quand un prospect répond positivement.

**Alternative** : Cal.com self-host si tu veux 0€ et plus de contrôle.

### Notion DB — 0€ (ou Folk 15€/mois)

**Rôle** : CRM léger pour suivi leads -> qualifiés -> RDV -> deals.

**Structure minimale** :
- Nom / Email / LinkedIn
- Entreprise / Taille / Secteur
- Source (Lemlist / Waalaxy)
- Statut (Lead / MQL / SQL / Propal / Signé / Perdu)
- Date dernier contact
- Notes

---

## Métriques attendues (mensuel, conservateur)

| Étape | Volume | Taux | Sortie |
|---|---:|---:|---:|
| Profils sourcés Sales Nav | 1 000 | - | - |
| Emails enrichis Dropcontact | 750 | 75% | 750 |
| Cold emails envoyés Lemlist | 750 | - | - |
| Ouvertures email | 225-300 | 30-40% | - |
| Réponses email | 30-60 | 4-8% | - |
| Réponses positives email | 8-15 | 25-30% des réponses | 8-15 |
| Invitations LinkedIn Waalaxy | 400 | - | - |
| Acceptations | 120 | 30% | - |
| Réponses LinkedIn | 12-24 | 10-20% des acceptés | - |
| Réponses positives LinkedIn | 4-8 | 30% | 4-8 |
| **Total leads bruts (dédupliqués)** | | | **10-20/mois** |
| Leads qualifiés (signaux ICP >=2) | | 60% | **6-12/mois** |
| RDV pris | | 60% | 4-7/mois |
| Deals signés | | 25% | 1-2/mois |

---

## Workflow hebdomadaire (3h/sem)

### Lundi 9h-10h — Sourcing (1h)
- Sales Nav : exécuter recherche sauvegardée -> export 250 nouveaux profils
- Filtre dédoublonnage avec base existante (check Notion)

### Lundi 10h-10h30 — Enrichissement (15 min actif)
- Upload liste Dropcontact (traitement auto ~15 min)
- Récupération CSV enrichi (~75% emails trouvés)

### Lundi 10h30-11h — Lancement séquences (30 min)
- Lemlist : import liste, démarrage séquence (puis auto)
- Waalaxy : import même liste, démarrage scénario (puis auto)

### Mercredi 30 min — Monitoring
- Check Lemlist replies + Waalaxy replies
- Réponse manuelle aux leads positifs (passage Calendly)
- Tag dans Notion CRM

### Vendredi 30 min — Review hebdo
- KPIs : taux ouverture, réponse, RDV bookés
- Ajustement copy si taux sous baseline
- Traitement désinscriptions, audit RGPD léger

**Total : 3h/semaine = 12h/mois.**

---

## Séquence cold email Lemlist (template)

### Email 1 — Hook pain (J+0)

**Objet** : `{{prenom}}, Excel chez {{entreprise}} ?` (max 50 caractères)

**Corps** :
```
{{prenom}},

Vu votre rôle de {{titre}} chez {{entreprise}}, vous gérez probablement
des process critiques sur Excel ou Google Sheets aujourd'hui.

Question simple : combien d'heures votre équipe perd par semaine
en saisie, doublons, ou erreurs liées à ces fichiers ?

Je suis dev freelance, je remplace ces tableurs par des apps internes
sur mesure (8 semaines, ticket fixe).

Worth 15 min pour creuser ?

Amar
StellarWave - stellarwave.fr/outils-internes
[Désinscription en bas]
```

### Email 2 — Preuve sociale (J+3)

**Objet** : `Re: {{entreprise}} - case study Applisyndicos`

**Corps** :
```
{{prenom}},

Pour donner du concret : un cabinet syndic gérait 280 immeubles
sur 14 fichiers Excel imbriqués. Une personne "savait faire", elle
est partie, panique.

Refonte en app web sur mesure : 11 semaines.
Résultat : -65% temps gestion, 0 dépendance à une personne.

Le pattern revient partout : RH, finance, ops, planning, devis.

15 min pour voir si ça vous parle ?
[Lien Calendly]

Amar
```

### Email 3 — Calculateur ROI (J+7)

**Objet** : `Estimation ROI Excel -> app sur mesure`

**Corps** :
```
{{prenom}},

J'ai mis en ligne un calculateur qui estime en 2 min ce que coûte
votre stack Excel actuel et ce qu'une app sur mesure rapporterait.

[Lien Calculateur ROI]

Output : économies annuelles + ROI 18 mois sur le ticket type.
Aucun email demandé en input.

Si le résultat vous parle, on en discute.

Amar
```

### Email 4 — Breakup (J+14)

**Objet** : `Je ferme le dossier {{entreprise}}`

**Corps** :
```
{{prenom}},

Je ne veux pas insister inutilement.

Je classe le dossier {{entreprise}}. Si jamais le sujet ressort
plus tard, mon mail reste ouvert.

Bonne continuation.

Amar
```

---

## Conformité RGPD — checklist non-négociable

- [ ] Adresses **nominatives** (`prenom.nom@`) uniquement, pas de génériques `contact@`
- [ ] Lien **désinscription fonctionnel** dans chaque email Lemlist
- [ ] Mentions légales + signature pro complète
- [ ] Documentation **intérêt légitime** (ICP fit + pertinence du rôle ciblé)
- [ ] Rétention **3 ans max** post-dernier contact actif
- [ ] Désinscription traitée **sous 48h**
- [ ] Aucun achat de listes brokers
- [ ] Audit mensuel : 5 emails de contrôle
- [ ] Pas de scraping massif (Waalaxy : <100 invitations/sem, randomisation active)

**Base légale** : opt-out B2B nominatif autorisé par CNIL si message pertinent au rôle pro. Position défendable mais pas garantie à 100% (peut évoluer en 2026 avec refonte e-privacy EU).

---

## Définition lead qualifié

Lead = réponse positive ou RDV pris.

**Lead qualifié = au moins 2 signaux** parmi :
- Entreprise 50-200 salariés (lookup Pappers/LinkedIn)
- Mention process/Excel/manuel dans réponse libre
- Email pro (pas gmail/orange/free)
- Budget évoqué OU urgence évoquée
- RDV Calendly pris (= MQL -> SQL automatique)

---

## Coût total mensuel

| Poste | Coût |
|---|---:|
| LinkedIn Sales Navigator | 80€ |
| Dropcontact | 30€ |
| Lemlist | 70€ |
| Waalaxy | 60€ |
| Calendly Free / Notion | 0€ |
| **Total outbound** | **240€/mois** |

CAC moyen attendu sur 6-12 leads qualifiés = 20-40€/lead qualifié, ou 120-240€/RDV pris.

---

## Garde-fous opérationnels

| Risque | Garde-fou |
|---|---|
| Détection LinkedIn Waalaxy | Volumes <100 invitations/sem, randomisation active, pas de scraping massif |
| Plainte RGPD / spam | Audit hebdo désinscriptions <0,3%. Si 1 plainte CNIL -> pause Lemlist immédiate |
| Délivrabilité email dégradée | Warm-up Lemlist actif 4 semaines avant ramp-up. Si bounce >5% -> review domaine |
| Saisonnalité juillet-août | Pause Lemlist (vacances = 0 réponse), Waalaxy reste actif à 50% |
| Délivery client > 35h/sem | Geler nouveaux ajouts liste, garder Waalaxy en passif |
| CAC > 500€ sur 30j roulants | Audit séquence + re-ciblage ICP avant relance |

---

## Stack à mettre en place pour démarrer

### Étape 1 — Compte Sales Navigator (jour J)
- Souscription via LinkedIn -> 80€/mois HT
- Configurer 1-2 recherches sauvegardées avec filtres ICP
- Alertes hebdomadaires nouveaux profils matchant

### Étape 2 — Outils outbound (J+1)
- Compte Dropcontact -> 30€/mois
- Compte Lemlist -> 70€/mois (Standard plan)
- Compte Waalaxy -> 60€/mois (Business plan)
- Tous reliés à boîte mail pro `contact@stellarwave.fr` ou `amar@stellarwave.fr`

### Étape 3 — Warm-up domaine (J+1 à J+28)
- Lemlist warm-up automatique (4 semaines avant envois en volume)
- Pendant ce temps : préparer séquence + listes

### Étape 4 — Première liste cible (J+2)
- Sales Nav -> export 200 profils ICP IDF
- Dropcontact -> enrichissement (~150 emails)
- Import dans Lemlist + Waalaxy

### Étape 5 — Lancement séquence (J+28 post-warm-up)
- Démarrage Lemlist 30/jour pendant 5 jours
- Démarrage Waalaxy 20 invitations/jour
- Monitoring quotidien semaine 1

### Étape 6 — Routine établie (J+35)
- Workflow hebdomadaire 3h/sem
- Review KPIs hebdo
- Ajustements copy/ciblage à 30 jours
