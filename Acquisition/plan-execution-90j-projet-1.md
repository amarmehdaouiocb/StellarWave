# Plan d'execution 90 jours - Projet #1

## Contexte
Date de reference: `10 fevrier 2026`.

Le projet #1 est: **Copilot reforme facturation electronique pour cabinets comptables (multi-PDP / multi-outils)**.

Deadlines reglementaires a exploiter:
- `1 septembre 2026`: reception obligatoire + emission pour grandes entreprises/ETI.
- `1 septembre 2027`: emission pour PME/TPE/micro.

## Le projet etait-il dans le doc de base ?
**Oui, partiellement.**

Present dans `Acquisition/strategies-interactive.html`:
- `Niche 4 : Saisie comptable intelligente` (OCR, ecritures, rapprochement) - ligne ~`2564`.
- `PRD Niche 4 : Saisie comptable — ComptAI` - ligne ~`3029`.
- `Niche 8 : Gestion RH et paie (cabinets comptables)` - ligne ~`2673`.

Pas present tel quel:
- la these "orchestrateur reforme facture electronique multi-PDP" n'est pas explicite.
- l'angle "migration + monitoring inter-plateformes + operations cabinet" est un repositionnement strategique.

## Objectif 90 jours
Construire une offre qui vend vite en combinant:
- service (cash immediat),
- produit (revenu recurrent),
- distribution ciblee cabinets.

Objectif chiffré a J90:
- `10 cabinets payants` minimum.
- `MRR 6k-15k EUR` + `services setup 15k-40k EUR` cumulés.
- `>=3 cas clients` publiables.

## Offre commerciale (a vendre des J1)
Nom de travail: **CabReady 2026**.

### Offre A - Audit readiness (2 semaines)
- Livrable: diagnostic flux, ecarts process, plan de migration client par client.
- Prix: `1 500 a 4 000 EUR` par cabinet.

### Offre B - Migration factory (4-8 semaines)
- Livrable: onboarding dossiers, mandats, mapping outils, protocole incidents.
- Prix: `40 a 120 EUR` par dossier migre (minimum de projet).

### Offre C - Cockpit SaaS mensuel
- Livrable: dashboard readiness + alerting + suivi anomalies + relances.
- Prix: `299 a 1 200 EUR/mois` selon taille cabinet + option par dossier.

## Scope produit J90 (MVP strict)
Construire uniquement ce qui accelere la vente et l'operation:
- onboarding cabinet (utilisateurs, dossiers, segmentation clients);
- registre mandats + statut collecte;
- calendrier obligations (2026/2027) par typologie client;
- suivi statuts de flux (import CSV/API selon outils disponibles);
- file d'anomalies + assignation + commentaires;
- relances email templates pour clients retardataires;
- dashboard "readiness score" cabinet et par portefeuille.

Hors scope J90:
- moteur comptable complet;
- remplacement d'un outil coeur (ERP/cabinet software);
- automatisation profonde de production comptable.

## Plan 90 jours par phases

## Phase 1 (J1-J14) - Validation terrain + pre-sales
Objectif: vendre avant de construire.

Actions:
- interviewer `20-30` cabinets (associe, responsable production, pole social).
- identifier les 3 douleurs monetisables immediates.
- creer landing + one-pager offre + deck 10 slides.
- lancer prospection outbound ciblee (liste `200` cabinets).
- signer `3-5` audits readiness payants.

Livrables:
- proposition de valeur finale (1 phrase + 3 preuves ROI).
- script de vente + script de call 30 min.
- backlog produit priorise par frequence douleur.

KPI gate (fin J14):
- GO si `>=3` audits vendus.
- NO-GO si `<2` audits vendus et taux de conversion calls `<10%`.

## Phase 2 (J15-J35) - Concierge operationnel + preuve ROI
Objectif: produire des resultats manuellement + outillage leger.

Actions:
- executer audits et plans de migration cabinet par cabinet.
- gerer suivi readiness dans un outil interne simple (Notion/Sheet + scripts).
- mesurer temps gagne, anomalies detectees, taux de dossiers prets.
- extraire les patterns repetitifs a automatiser en MVP.

Livrables:
- 3 a 5 dossiers cas reels anonymises.
- modele de rapport standard.
- matrice ROI: "temps economise / risque evite / revenu protege".

KPI gate (fin J35):
- GO si `>=70%` des cabinets audits passent en mission migration.
- GO si au moins `2` clients demandent un suivi mensuel.

## Phase 3 (J36-J60) - Build MVP v1
Objectif: automatiser 30-40% du travail repetitif.

Actions produit:
- construire app web (auth, dossiers, mandats, readiness score).
- ingestion donnees via CSV d'abord, API ensuite.
- module anomalies + relances.
- journal d'actions (traçabilite basique).

Actions business:
- beta fermee avec `3-5` cabinets.
- point hebdo client + iteration 48h.

Livrables:
- MVP deploye en production restreinte.
- onboarding guide 60 min.
- pricing packagé (A/B/C).

KPI gate (fin J60):
- GO si `>=3` cabinets actifs chaque semaine.
- GO si NPS beta `>=30`.

## Phase 4 (J61-J75) - Go-to-market serre
Objectif: passer de beta a machine commerciale repetable.

Actions:
- publier 2 cas clients chiffrés.
- webinar mensuel "Ready 2026 en 45 min".
- sequence outbound 4 emails + relance LinkedIn.
- partenariat pilote avec 1 integrateur/consultant compta.

Livrables:
- playbook commercial (qualification, objection handling, closing).
- page pricing definitive.
- kit d'onboarding client.

KPI:
- `>=30` demos tenues.
- `>=8` propositions envoyees.
- taux de closing `>=20%`.

## Phase 5 (J76-J90) - Scale initial
Objectif: stabiliser retention + augmenter panier moyen.

Actions:
- onboarding structure en cohortes hebdo.
- upsell offre C (cockpit mensuel) aux clients A/B.
- suivi churn risque (usage, tickets, delais de traitement).
- preparer roadmap Q2 (connecteurs API prioritaires).

Livrables:
- 10 cabinets payants.
- runbook support.
- roadmap 6 mois orientee revenus.

KPI final J90:
- `10` cabinets payants.
- MRR `6k-15k EUR`.
- CAC payback `<3 mois`.
- retention logo a 30 jours `>=90%`.

## Cadence hebdomadaire
- Lundi: pipe commercial + demos.
- Mardi-Mercredi: produit + automatisation.
- Jeudi: onboarding clients + support.
- Vendredi: analytics KPI + priorisation semaine suivante.

Repartition temps fondateur:
- `45%` vente.
- `35%` produit.
- `20%` delivery/operations.

## Stack recommandee (rapide a ship)
- Front: Next.js.
- Back: API routes + jobs.
- DB/Auth: Supabase.
- Email: Resend.
- Paiement: Stripe.
- Tracking: PostHog/Plausible.

Principe: **CSV-first, API-second** pour vendre vite.

## Risques critiques et mitigations
- Risque: dependance aux APIs/outils tiers.
  - Mitigation: fallback CSV standardise.
- Risque: cycle de decision cabinet plus long que prevu.
  - Mitigation: offre audit courte et peu risquee.
- Risque: scope creep produit.
  - Mitigation: gouvernance stricte "MVP = readiness + anomalies + relances".

## Plan d'action immediat (7 prochains jours)
1. Finaliser l'offre A/B/C + tarification.
2. Construire landing + deck + script de call.
3. Constituer liste de 200 cabinets cibles.
4. Lancer 50 prises de contact personnalisees.
5. Book 10 entretiens de decouverte.
6. Closer les 3 premiers audits.

