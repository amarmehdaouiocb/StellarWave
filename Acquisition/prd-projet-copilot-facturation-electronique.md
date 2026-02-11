# PRD - Copilot Facturation Electronique (Cabinets Comptables)

## 1. Meta
- Produit: `Cabinet Ready Copilot` (nom de travail)
- Version PRD: `v1.0`
- Date: `10 fevrier 2026`
- Owner: `Founding team`
- Horizon: `90 jours (MVP)`

## 2. Contexte
La reforme de facturation electronique en France impose des jalons fermes:
- `1 septembre 2026`: reception obligatoire pour toutes les entreprises + emission obligatoire pour grandes entreprises et ETI.
- `1 septembre 2027`: emission obligatoire pour PME, TPE et micro-entreprises.

Les cabinets comptables doivent:
- preparer des portefeuilles clients heterogenes;
- coordonner plusieurs outils/plateformes;
- suivre des incidents de flux et des retards de preparation;
- communiquer en continu avec leurs clients.

## 3. Probleme a resoudre
Les cabinets n'ont pas un cockpit unique pour piloter la transition a l'echelle portefeuille.

Aujourd'hui:
- la preparation est geree par tableurs/emails disperses;
- la visibilite sur l'avancement reel est faible;
- les anomalies sont detectees tard;
- les relances clients sont manuelles et chronophages.

Impact:
- risque operationnel et reputational pour le cabinet;
- surcharge des equipes production;
- perte de marge sur des taches non facturables.

## 4. Vision produit
Construire un **cockpit + moteur d'exécution** qui transforme une migration chaotique en process pilotable, traçable et répétable.

### 4.1 Positionnement stratégique

**Ce que nous NE sommes PAS :**
- Un "dashboard de scores" (gadget remplaçable par Excel)
- Un outil de plus dans la stack cabinet
- Une checklist glorifiée

**Ce que nous SOMMES :**
- Un **cockpit opérationnel** avec moteur d'exécution intégré
- Une **mission clé en main** : "on vous met prêt et on prouve que vous êtes prêt"
- Un **outil d'industrialisation** de l'accompagnement client

### 4.2 Les 5 piliers "non-gadget"

| Pilier | Description | Valeur différenciante |
|--------|-------------|----------------------|
| **1. Cartographie clients** | Segmentation (taille, risque, outil, volumétrie) | Vue portefeuille en 10 secondes |
| **2. Playbooks** | Tâches + relances automatisées + templates multi-canal | Industrialise l'accompagnement |
| **3. Audit trail** | Qui a fait quoi, quand, preuves jointes | Protection juridique du cabinet |
| **4. Vue cabinet** | Charge restante, clients à risque, priorisation auto | Pilotage opérationnel quotidien |
| **5. Agnostique outils** | Import CSV/Excel, pas de lock-in | Fonctionne avec tous les outils |

### 4.3 Test "anti-gadget"

En entretien prospect, signal positif :
> "Je paierais pour que ça me fasse gagner du temps et que ça industrialise l'accompagnement. Je veux que ça pilote mes relances + me sorte une liste d'actions."

Signal négatif (= gadget) :
> "C'est joli, mais je peux le faire sur mon outil actuel / Excel."

### 4.4 Positionnement concurrentiel

| Concurrent | Approche | Notre différenciation |
|------------|----------|----------------------|
| **MyUnisoft** | Tableau de bord intégré à leur suite | Agnostique, focus exécution |
| **Cegid** | Checklists cabinet | Automatisation + preuves |
| **Sage** | Étapes d'accompagnement | Multi-tenant, multi-outils |
| **Excel** | Manuel, dispersé | Orchestration + traçabilité |

Le produit n'est pas un ERP comptable.
Le produit est une **couche d'orchestration, d'exécution et de preuve**.

## 5. Objectifs et non-objectifs
## Objectifs business (J90)
- Signer `10 cabinets payants`.
- Atteindre `6k-15k EUR` de MRR.
- Convertir `>=70%` des clients service (audit/migration) vers abonnement cockpit.

## Objectifs produit (J90)
- Reduire de `30%` le temps de suivi readiness par portefeuille.
- Atteindre `>=90%` de completion des mandats sur clients cibles actifs.
- Detecter et assigner `>=95%` des anomalies critiques en moins de 24h.

## Non-objectifs (MVP)
- Tenue comptable et production comptable complete.
- Remplacement des outils coeur cabinet.
- Automatisation complete sans supervision humaine.

## 6. Utilisateurs cibles
## Persona 1 - Associe / Directeur de cabinet
- Besoin: vue portefeuille, risque global, priorisation.
- KPI: taux de readiness, incidents critiques, respect deadlines.

## Persona 2 - Responsable production / mission
- Besoin: orchestration quotidienne, assignation, suivi dossier.
- KPI: backlog d'anomalies, SLA de traitement, avancement.

## Persona 3 - Collaborateur comptable
- Besoin: actions claires dossier par dossier, templates de relance.
- KPI: taches traitees, temps passe, erreurs evitees.

## Persona 4 - Admin cabinet
- Besoin: gestion utilisateurs, droits, parametrage portfolio.
- KPI: activation equipes, hygiene des donnees.

## 7. Proposition de valeur
"En 1 dashboard, votre cabinet suit la readiness facture electronique de tout le portefeuille, traite les anomalies plus vite, et securise les deadlines 2026/2027."

## 8. Scope fonctionnel
## P0 (MVP J90)
1. Gestion cabinet et portefeuille
- creer un cabinet;
- importer la liste clients (CSV);
- segmenter clients (taille, regime, priorite, statut readiness).

2. Registre mandats
- suivi collecte mandats par client;
- statuts: `a lancer`, `en cours`, `valide`, `bloque`;
- pieces manquantes et responsable assigne.

3. Calendrier obligations
- regles de deadline par typologie entreprise;
- vue echeances par portefeuille;
- alertes de retard.

4. Ingestion statuts de flux
- import CSV standardise (prioritaire);
- mapping statuts vers taxonomie interne;
- historisation des changements de statut.

5. Detection et file d'anomalies
- regles simples (doublon, statut incoherent, bloquage long);
- severite (`low`, `medium`, `high`, `critical`);
- assignation + commentaire + date cible.

6. Relances client
- templates email par type de blocage;
- envoi unitaire et en masse;
- tracking envoi / ouverture / reponse (si dispo).

7. Dashboard readiness
- score readiness global cabinet;
- score par segment et par client;
- widgets: clients a risque, anomalies ouvertes, SLA incident.

8. Journal d'actions (audit trail basique)
- qui a fait quoi, quand, sur quel client/dossier.

## P1 (post-MVP, 3-6 mois)
- connecteurs API natifs (selon outils les plus utilises);
- portail client self-serve pour pieces/mandats;
- automatisation de suggestions d'action (copilot assistant);
- exports rapports hebdo auto PDF.

## P2 (6-12 mois)
- orchestration multi-entites groupe cabinet;
- moteur de regles avance;
- scoring risque predicitf;
- marketplace de connecteurs.

## 9. User stories cle (MVP)
1. En tant que responsable production, je veux voir tous les clients en retard afin de prioriser l'equipe ce matin.
2. En tant que collaborateur, je veux assigner une anomalie a un collegue avec deadline et commentaire.
3. En tant qu'associe, je veux un score readiness global pour savoir si le cabinet est sur trajectoire.
4. En tant qu'admin, je veux importer mon portefeuille en CSV en moins de 10 minutes.
5. En tant que responsable mission, je veux lancer une campagne de relance sur les clients "mandat manquant".

## 10. Exigences fonctionnelles detaillees
## 10.1 Import portefeuille CSV
- format minimal: `client_id`, `raison_sociale`, `segment`, `email_contact`.
- validation schema + rapport d'erreurs ligne par ligne.
- import de `10 000` lignes max par job.

## 10.2 Readiness score
- score `0-100` par client calcule via pondérations:
  - mandat: 30%
  - statut flux: 40%
  - anomalies critiques ouvertes: 30%
- score portefeuille = moyenne ponderee par priorite client.

## 10.3 Moteur anomalies (v1 regles)
- regle A: client sans mandat valide a J-30 d'echeance.
- regle B: statut flux "bloque" > 72h.
- regle C: statut incoherent (ex: "pret" + piece obligatoire manquante).
- regle D: absence de mise a jour dossier > 14 jours.

## 10.4 Workflow incident
- creation auto/manuelle;
- assignation obligatoire;
- commentaire obligatoire a la cloture;
- statut incident: `open`, `in_progress`, `resolved`, `wont_fix`.

## 10.5 Relances
- templates parametrables par cabinet;
- variables dynamiques (`{{client_name}}`, `{{blocking_reason}}`, `{{deadline}}`);
- log des envois pour traçabilite.

## 11. Exigences non fonctionnelles
- Disponibilite cible MVP: `99.5%`.
- Temps de chargement dashboard P95 < `2.5s` (portefeuille <= 5 000 clients).
- Traitement import 10 000 lignes < `5 min`.
- RPO <= `24h`, RTO <= `8h`.

## 12. Securite et conformite
- RBAC par role (`owner`, `manager`, `collaborator`, `viewer`).
- isolation stricte multi-tenant par cabinet.
- chiffrement en transit (TLS) et au repos.
- journalisation actions sensibles (read/update/export/delete).
- retention logs configurable (12-36 mois).
- conformite RGPD:
  - minimisation donnees;
  - base legale et finalites documentees;
  - droit d'acces/suppression;
  - DPA et politique de retention.

Note: le MVP ne traite pas de donnees medicales; HDS hors scope initial.

## 13. Integrations
## MVP
- Import CSV universel (obligatoire).
- SMTP/Email provider (Resend ou equivalent).

## Post-MVP
- connecteurs API vers ecosysteme cabinet priorises par demande client.

## 14. Data model (haut niveau)
- `tenants` (cabinet)
- `users`
- `clients`
- `mandates`
- `readiness_snapshots`
- `flow_status_events`
- `anomalies`
- `tasks`
- `email_templates`
- `email_logs`
- `audit_logs`

Contraintes:
- toutes les tables metier contiennent `tenant_id`.
- index sur `tenant_id`, `client_id`, `status`, `updated_at`.

## 15. UX et parcours cle
## Parcours A - Onboarding cabinet
1. creation compte;
2. import CSV clients;
3. mapping colonnes;
4. dashboard initial genere;
5. premiere campagne de relance.

Temps cible: `<60 minutes`.

## Parcours B - Daily ops responsable production
1. ouverture dashboard;
2. filtre "critical + overdue";
3. assignation incidents;
4. suivi resolution;
5. export recap hebdo.

Temps cible: `<20 minutes` pour prioriser la journee.

## 16. Instrumentation et KPI
## KPI activation
- time-to-first-value (premier score readiness genere) < `1h`.
- taux completion onboarding > `70%`.

## KPI usage
- WAU/MAU > `60%`.
- nb incidents traites par semaine par cabinet.
- temps median de resolution incident.

## KPI business
- conversion essai -> payant > `20%`.
- churn logo mensuel < `3%` (objectif long terme).
- expansion MRR via upsell > `10%` a 6 mois.

## 17. Packaging et pricing (MVP)
## Plan Start
- `299 EUR/mois`
- 1 manager + 3 collaborateurs
- 500 clients portefeuille

## Plan Pro
- `699 EUR/mois`
- 3 managers + 15 collaborateurs
- 3 000 clients

## Plan Scale
- `1 200 EUR/mois+`
- limites custom + onboarding dedie

Services one-shot:
- audit readiness;
- migration portefeuille;
- formation equipe.

## 18. Roadmap execution
## Milestone 1 (J1-J14)
- discovery + pre-sales + 3 audits signes.

## Milestone 2 (J15-J35)
- delivery concierge + specification finale MVP.

## Milestone 3 (J36-J60)
- MVP v1 en beta fermee (3-5 cabinets).

## Milestone 4 (J61-J75)
- go-to-market initial + 2 cas clients.

## Milestone 5 (J76-J90)
- 10 cabinets payants + stabilisation retention.

## 19. Risques et mitigations
1. Cycle commercial plus long que prevu.
- Mitigation: vendre offre audit court cycle avant SaaS.

2. Heterogeneite des donnees clients.
- Mitigation: CSV template standard + assistant mapping.

3. Dependance connecteurs.
- Mitigation: CSV-first operationnel des J1.

4. Scope creep produit.
- Mitigation: gouvernance stricte P0, comite priorisation hebdo.

## 20. Criteres d'acceptation MVP (Definition of Done)
- Onboarding complet d'un cabinet reel <= 1h.
- Import CSV 5 000 clients sans erreur bloquante.
- Dashboard readiness visible et exploitable par role manager.
- Workflow incident complet (create/assign/resolve/log).
- Relance email de masse fonctionnelle avec logs.
- Isolation tenant validee par tests.
- 3 cabinets beta actifs 4 semaines consecutives.

## 21. Questions ouvertes
1. Quelles integrations API doivent passer avant les autres selon les 5 premiers clients?
2. Quel niveau de personnalisation des templates email est requis en P0?
3. Quel SLA support vendre des le plan Pro?
4. Faut-il inclure un portail client externe en P1 ou le garder en service managé?

---

## 22. Validation Marché - Questionnaire Cabinet Ready

### 22.1 Méthodologie
Avant développement, validation des hypothèses via:
- **Questionnaire en ligne**: https://www.stellarwave.fr/cabinet-ready/
- **Interviews qualitatives**: 25 min avec prospects qualifiés
- **Prospection LinkedIn**: cabinets 6-50 collaborateurs

### 22.2 Données collectées par le questionnaire

#### Profil cabinet (validation ICP)
| Question | Valeurs | Insight recherché |
|----------|---------|-------------------|
| Poste | Associé, Directeur, Resp. production, Resp. mission, Collaborateur | Qui est le décideur/influenceur |
| Nb collaborateurs | 1-5, 6-10, 11-20, 21-50, 50+ | Segment prioritaire |
| Nb clients | <100, 100-200, 200-500, 500-1000, 1000+ | Complexité portefeuille |

#### État de préparation (validation du problème)
| Question | Valeurs | Insight recherché |
|----------|---------|-------------------|
| Préparation FE | Pas commencé, Réflexion, En cours, Avancé | Maturité marché, urgence |
| Outil actuel | Excel, Logiciel comptable, CRM, Rien | Concurrence, habitudes |
| Logiciel comptable | Texte libre | Intégrations prioritaires |

#### Points de douleur (validation proposition de valeur)
| Question | Valeurs | Insight recherché |
|----------|---------|-------------------|
| Frustrations | Visibilité, Temps perdu, Relances, Anomalies tardives, Coordination | Features prioritaires |
| Temps perdu/semaine | <2h, 2-5h, 5-10h, 10h+ | Quantification du problème |

#### Willingness to pay (validation pricing)
| Question | Valeurs | Insight recherché |
|----------|---------|-------------------|
| Budget mensuel | <50€, 50-100€, 100-200€, 200-500€, 500+€, Ne sait pas | Élasticité prix, positionnement |

#### Intérêt services (upsell)
| Question | Valeurs | Insight recherché |
|----------|---------|-------------------|
| Services agence | Audit, Dev sur-mesure, IA/Automation, Formation | Cross-sell potentiel |
| Projet autre | Texte libre | Besoins non anticipés |

#### Qualification lead
| Question | Valeurs | Insight recherché |
|----------|---------|-------------------|
| Disponibilité RDV | Oui, Peut-être, Non | Conversion potentielle |

### 22.3 Métriques de succès validation
| Métrique | Objectif | Status |
|----------|----------|--------|
| Réponses questionnaire | 50+ | 🔄 En cours |
| Interviews réalisées | 10-15 | 🔄 En cours |
| Taux "Pas commencé" + "Réflexion" | >50% | À mesurer |
| Taux frustrations ≥2 | >60% | À mesurer |
| Budget 100€+/mois | >40% | À mesurer |
| Taux RDV "Oui" | >20% | À mesurer |

### 22.4 Hypothèses à valider

#### Hypothèse 1: Le problème existe
- **Test**: % répondants avec frustrations ≥2
- **Seuil validation**: >60%
- **Impact si invalidé**: Pivoter ou abandonner

#### Hypothèse 2: Le timing est bon
- **Test**: % "Pas commencé" ou "Réflexion"
- **Seuil validation**: >50%
- **Impact si invalidé**: Adapter messaging, attendre

#### Hypothèse 3: Le pricing est viable
- **Test**: % budget ≥100€/mois
- **Seuil validation**: >40%
- **Impact si invalidé**: Revoir pricing ou positionnement

#### Hypothèse 4: L'ICP est correct
- **Test**: Corrélation taille cabinet / frustrations / budget
- **Seuil validation**: Signal clair sur segment
- **Impact si invalidé**: Affiner persona cible

### 22.5 Dashboard analytics
- **URL**: https://www.stellarwave.fr/admin/cabinet-ready/
- **Données temps réel**: Supabase + subscriptions
- **Requêtes clés**: Voir `docs/supabase-setup.md`

### 22.6 Insights collectés (à mettre à jour)

> **Note**: Cette section sera enrichie au fur et à mesure des réponses.

#### Répartition préparation
```
À compléter après N réponses
```

#### Top frustrations
```
À compléter après N réponses
```

#### Fourchettes budget
```
À compléter après N réponses
```

#### Logiciels comptables mentionnés
```
À compléter après N réponses
```

### 22.7 Décisions prises suite validation

| Date | Insight | Décision | Impact PRD |
|------|---------|----------|------------|
| - | - | - | - |

