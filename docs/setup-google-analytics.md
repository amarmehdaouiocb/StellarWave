# Guide : Configurer Google Analytics 4

## Étape 1 : Créer un compte GA4

1. Va sur [analytics.google.com](https://analytics.google.com)
2. Connecte-toi avec ton compte Google
3. Clique **"Commencer à mesurer"** (ou "Start measuring")

## Étape 2 : Configurer le compte

| Champ | Valeur |
|-------|--------|
| Nom du compte | `Stellar Wave` |
| Partage de données | Décoche tout (RGPD) ou garde les défauts |

→ Clique **Suivant**

## Étape 3 : Créer la propriété

| Champ | Valeur |
|-------|--------|
| Nom de la propriété | `stellarwave.fr` |
| Fuseau horaire | `France` |
| Devise | `Euro (€)` |

→ Clique **Suivant**

## Étape 4 : Infos sur l'entreprise

| Champ | Valeur |
|-------|--------|
| Secteur | `Services aux entreprises` ou `Technologie` |
| Taille | `Petite (1-10)` |
| Objectifs | Coche `Générer des prospects` + `Analyser le comportement` |

→ Clique **Créer**

## Étape 5 : Configurer le flux de données

1. Choisis **"Web"**
2. Remplis :
   - URL du site : `https://stellarwave.fr`
   - Nom du flux : `Site principal`
3. Clique **Créer le flux**

## Étape 6 : Récupérer l'ID de mesure

Après création, tu verras un écran avec :
```
ID DE MESURE : G-XXXXXXXXXX
```

## Étape 7 : Configurer le projet

Ouvre `.env.local` à la racine du projet et remplace :
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Par ton vrai ID de mesure.

## Vérifier que ça fonctionne

1. Lance le site : `npm run dev`
2. Va sur [analytics.google.com](https://analytics.google.com) → **Rapports** → **Temps réel**
3. Ouvre ton site dans un autre onglet
4. Tu devrais voir "1 utilisateur actif" dans GA
