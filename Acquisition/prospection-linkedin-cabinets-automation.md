# Prospection LinkedIn CabReady — Automatisation Claude Code

> **Objectif** : Automatiser la prospection LinkedIn via Claude Code + Chrome Extension
> **Cible** : Associés/Directeurs de cabinets comptables (6-50 collaborateurs)
> **URL landing** : https://www.stellarwave.fr/cabinet-ready/

---

## 1. Prérequis

### Extensions et outils
- Claude Code CLI
- Extension Chrome "Claude in Chrome" (MCP)
- Compte LinkedIn connecté (Premium recommandé pour InMails)

### Session active
```bash
# Vérifier que l'extension Chrome est connectée
mcp__claude-in-chrome__tabs_context_mcp
```

---

## 2. Recherche de profils (automatisée)

### URLs de recherche prêtes à l'emploi

**Associés cabinets comptables :**
```
https://www.linkedin.com/search/results/people/?keywords=%22associ%C3%A9%22%20%22cabinet%20comptable%22&origin=GLOBAL_SEARCH_HEADER
```

**Directeurs expertise comptable :**
```
https://www.linkedin.com/search/results/people/?keywords=%22directeur%22%20%22expertise%20comptable%22&origin=GLOBAL_SEARCH_HEADER
```

**Experts-comptables associés :**
```
https://www.linkedin.com/search/results/people/?keywords=%22expert-comptable%22%20%22associ%C3%A9%22&origin=GLOBAL_SEARCH_HEADER
```

**Responsables production cabinet :**
```
https://www.linkedin.com/search/results/people/?keywords=%22responsable%20production%22%20%22cabinet%22%20comptable&origin=GLOBAL_SEARCH_HEADER
```

### Workflow de navigation
```
1. Naviguer vers l'URL de recherche
2. Attendre le chargement (2s)
3. Screenshot pour analyser les résultats
4. Cliquer sur un profil intéressant
5. Extraire le username depuis l'URL (/in/[username]/)
```

---

## 3. Analyse du profil

### Éléments à extraire
| Élément | Usage |
|---------|-------|
| **Prénom** | Personnalisation |
| **Nom du cabinet** | Accroche |
| **Poste exact** | Adapter le ton |
| **Localisation** | Contexte régional |
| **Connexions communes** | Mention si pertinent |
| **Posts récents** | Accroche contextuelle (facture élec, digitalisation) |

### Signaux prioritaires
- ✅ Mentionne "facturation électronique" dans posts/activité
- ✅ Membre de groupes EC/digitalisation
- ✅ Cabinet de 10-50 personnes (vérifier page entreprise)
- ✅ Poste : Associé, Directeur, Managing Partner
- ⚠️ Éviter : Comptable salarié, stagiaire, grandes structures (>100)

### ⛔ Qualification OBLIGATOIRE avant envoi

**AVANT d'envoyer un message, vérifier que le profil coche AU MOINS 3 critères :**

| Critère | Vérification |
|---------|--------------|
| 🏢 **Cabinet comptable** | Le poste mentionne explicitement "cabinet", "expertise comptable", "EC" |
| 👔 **Décideur** | Associé, Directeur, Gérant, Managing Partner, DG (PAS salarié/collaborateur) |
| 📊 **Taille 6-50** | Vérifier la page entreprise LinkedIn si possible |
| 🎯 **Activité EC** | Expert-comptable, commissaire aux comptes, audit |
| 🇫🇷 **France** | Basé en France (facturation électronique 2026 = réglementation FR) |

**Profils à EXCLURE :**
- ❌ Consultants IT/Finance (même s'ils travaillent avec des cabinets)
- ❌ RH, Marketing, Commercial de cabinet
- ❌ Formateurs/Enseignants en comptabilité
- ❌ DAF/CFO d'entreprises (pas de cabinet)
- ❌ Experts-comptables salariés (pas décideurs)
- ❌ EC spécialisés/partenaires éditeurs ERP (Odoo, Sage, Cegid, Pennylane) — conflit d'intérêt potentiel

---

## 4. Envoi de message (automatisé)

### Navigation directe vers messagerie
```
https://www.linkedin.com/messaging/thread/new/?recipients=[username]
```

### Workflow d'envoi
```
1. Naviguer vers l'URL de messagerie
2. Attendre (2s)
3. Taper le nom dans le champ de recherche
4. Sélectionner le bon profil (vérifier titre)
5. Cliquer sur le champ de message
6. Taper le message personnalisé
7. Cliquer sur le bouton d'envoi (ref_submit ou coordonnées)
8. Vérifier l'envoi (URL change vers /messaging/thread/[id])
```

---

## 5. Templates de messages

> **IMPORTANT** : Toujours inclure le lien vers la landing page !
> L'objectif est de les diriger vers le formulaire, PAS de booker des calls (trop chronophage).

> **⚠️ ACCENTS OBLIGATOIRES** : Toujours utiliser les accents français (é, è, ê, à, ç, etc.)

### Message standard — Invitation LP

```
Bonjour [Prénom],

Je développe un outil de pilotage pour aider les cabinets comptables à suivre la transition facturation électronique de leurs clients.

Votre profil chez [Cabinet] correspond exactement à notre cible. J'aimerais beaucoup avoir votre avis.

J'ai créé une page qui explique le concept : https://www.stellarwave.fr/cabinet-ready/

Si ça vous parle, vous pouvez laisser vos coordonnées via le formulaire — je vous recontacte pour un échange rapide.

Amar
```

### Message — Profil qui a posté sur la facture électronique

```
Bonjour [Prénom],

J'ai vu votre post sur la facturation électronique — ça m'a interpellé.

Je travaille sur un outil de pilotage pour aider les cabinets à suivre la transition de leur portefeuille clients.

J'ai résumé le concept ici : https://www.stellarwave.fr/cabinet-ready/

Si ça vous intéresse, le formulaire en bas de page permet de me laisser vos coordonnées.

Amar
```

### Message — Connexions en commun

```
Bonjour [Prénom],

Je vois qu'on a [X] relations en commun dans l'écosystème expertise comptable.

Je développe un outil pour aider les cabinets à piloter la transition facturation électronique 2026. Votre expérience chez [Cabinet] m'intéresserait.

Voici le concept : https://www.stellarwave.fr/cabinet-ready/

Si ça vous parle, laissez-moi vos coordonnées via le formulaire !

Amar
```

### Message — Cabinet en région

```
Bonjour [Prénom],

Associé chez [Cabinet] à [Ville] — j'imagine que la transition facturation électronique est un sujet pour vos clients locaux.

Je travaille sur un outil pour aider les cabinets à piloter cette transition.

J'ai créé une page qui explique tout : https://www.stellarwave.fr/cabinet-ready/

Intéressé ? Le formulaire permet de me laisser vos coordonnées.

Amar
```

### Message court — InMail (économie de crédits)

```
Bonjour [Prénom],

Outil de pilotage facturation électronique pour cabinets comptables — votre avis m'intéresse.

Le concept : https://www.stellarwave.fr/cabinet-ready/

Si ça vous parle, laissez vos coordonnées via le formulaire.

Amar
```

---

## 6. Suivi des contacts

### Tableau de tracking

| Date | Prénom | Cabinet | Poste | Message | Réponse | Formulaire | Notes |
|------|--------|---------|-------|---------|---------|------------|-------|
| 2026-02-12 | Laurent | EXPERIAL CONSEIL | Associé | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-12 | Zied | Colead Finance | Associé | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-12 | Herbert | BDL | Associé | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-12 | Pierre | MyCFO | Associé | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-12 | Sébastien | Exponens | Associé | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-12 | Jean-Michel | - | EC/CAC Associé | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-12 | Zakaria | - | Dirigeant associé | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-12 | Thierry | Exponens | DG | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-12 | Nicolas | ACTHEOS SAGEC | Associé EC/CAC | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-12 | Philippe | ECA | Associé EC/CAC | ✅ | ⏳ | ⏳ | Session sans LP |
| 2026-02-13 | Didier | LPDE | EC spécialisé Odoo | ✅ | ⏳ | ⏳ | InMail avec LP + 260 relations communes |
| 2026-02-13 | Frederic | LAMY EXPERTS | EC Associé | ✅ | ⏳ | ⏳ | InMail avec LP + Jean Vetter relation commune |

### Statuts
- ⏳ En attente
- ✅ Fait/Positif
- ❌ Refusé/Pas de réponse
- 📝 Formulaire rempli
- 📞 Call planifié (si demandé par le prospect)

---

## 7. Checklist avant session

```
□ Extension Chrome connectée (tabs_context_mcp)
□ Compte LinkedIn loggué
□ Crédits InMail disponibles (vérifier si < 10)
□ Landing page accessible : https://www.stellarwave.fr/cabinet-ready/
□ Fichier tracking ouvert
□ Objectif du jour défini (ex: 10 messages)
```

---

## 8. Commandes Claude Code fréquentes

### Démarrer une session
```
"Ouvre LinkedIn et cherche des associés de cabinets comptables pour CabReady"
```

### Analyser un profil
```
"Analyse ce profil et dis-moi s'il correspond à notre ICP (cabinet 6-50 personnes, associé/directeur)"
```

### Envoyer un message
```
"Envoie un message personnalisé à [Prénom] du cabinet [X], mentionne [élément de personnalisation]"
```

### Batch de prospection
```
"Continue la prospection CabReady avec 10 messages personnalisés aux associés de cabinets comptables"
```

---

## 9. Bonnes pratiques automatisation

### Volume
- **Max 20-30 demandes/jour** (éviter détection LinkedIn)
- **Espacer les actions** de 30-60 secondes
- **Varier les messages** (pas de copier-coller identique)

### Personnalisation obligatoire
- ✅ Prénom
- ✅ Nom du cabinet
- ✅ Un élément contextuel (poste, région, connexion commune)

### À éviter
- ❌ Plus de 50 actions/jour
- ❌ Messages identiques en série
- ❌ Ignorer les refus (respecter les "non merci")
- ❌ Relancer plus de 2 fois

---

## 10. Métriques objectifs

| Métrique | Objectif | Calcul |
|----------|----------|--------|
| Taux de réponse message | > 15% | Réponses / Messages envoyés |
| Taux clic LP | > 30% | Clics LP / Réponses |
| Taux conversion formulaire | > 20% | Formulaires / Clics LP |
| **Objectif final** | **15-20 leads via formulaire** | |

> **Pourquoi formulaire > calls ?**
> - Moins chronophage (pas de calls de 25 min à répétition)
> - Filtre naturel : seuls les vrais intéressés remplissent
> - Scalable : permet d'envoyer plus de messages

---

## 11. Séquence type d'une session (30 min)

```
1. [5 min] Recherche LinkedIn — identifier 10-15 profils
2. [20 min] Envoi de messages personnalisés (10 max)
3. [5 min] Mise à jour du tracking + notes

Répéter 2-3x par semaine jusqu'à atteindre 10-15 interviews.
```

---

## 12. Exemples de profils idéaux

### Profil A — Associé cabinet moyen
- **Poste** : Associé / Expert-comptable
- **Cabinet** : 15-30 collaborateurs
- **Localisation** : Métropole régionale
- **Signaux** : Actif sur LinkedIn, posts sur digitalisation

### Profil B — Directeur production
- **Poste** : Directeur / Responsable production
- **Cabinet** : 20-50 collaborateurs
- **Signaux** : Gère le portefeuille clients, proche du terrain

### Profil C — Managing Partner innovant
- **Poste** : Managing Partner / Gérant
- **Cabinet** : 10-40 collaborateurs
- **Signaux** : Parle de transformation digitale, lab innovation

---

*Document créé le 12 février 2026*
*Complémentaire à : prospection-linkedin-cabinets.md*
