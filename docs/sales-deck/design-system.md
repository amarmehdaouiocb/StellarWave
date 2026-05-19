# Sales Deck — Design System

> Tokens visuels du deck `stellarwave-ai-ops-{en,fr}.pdf`.
> Direction : **institutionnel sobre × premium** — codes Bain/McKinsey × accents Ember Luxe.
> Le client cible (COO d'une RIA) doit pouvoir le poser sur la table d'un Investment Committee sans rougir.

---

## Format

| Propriété | Valeur |
|---|---|
| Aspect ratio | 16:9 (landscape) |
| Résolution canvas | 1920 × 1080 px |
| DPI export PNG | 200 |
| Format PDF | A4 paysage (297 × 210 mm) |
| Page count | 10 |
| Marge interne | 96 px (top/bottom), 120 px (left/right) |

---

## Palette — "Wealth Institutional" (extension Ember Luxe)

```
Background principal          #0A0E1A    (très sombre, presque noir bleuté)
Background card / surface     #131829    (1-step lighter pour cards)
Background card hover         #1A2038    (decorative)

Texte principal               #E7ECFF    (off-white bleuté)
Texte secondaire              #A6B0CF    (gris bleu, pour body)
Texte tertiaire               #6B7599    (footnotes, légendes)

Accent primaire (titres+CTA)  #F59E0B    (--ember-amber)
Accent primaire dim           #C97D08    (hover/dimmed amber)

Accent données positives      #2DD4BF    (--ember-teal — ROI, gains)
Accent données négatives      #EF6C4A    (--ember-coral — douleurs, coûts)
Accent éditorial / quote      #A78BFA    (--ember-violet — italic serif accents)

Lignes / borders              rgba(120,150,230,0.12)
Lignes accent                 rgba(245,158,11,0.35)    (amber 35%)
Glow background               rgba(28,65,230,0.18)     (deep blue radial)
```

### Règles d'usage couleur

- **#F59E0B amber = chiffre clé OU CTA**, jamais les deux dans la même page (max 1 amber hero par page)
- **#2DD4BF teal = uniquement ROI positif chiffré** (€/$, %, h économisées)
- **#EF6C4A coral = uniquement douleur/coût** sur page 2 et page 3
- **Texte body en #A6B0CF**, jamais en blanc pur — ça réduit le contraste et adoucit
- **Quotes / italic accents en #A78BFA** + font-serif italique

---

## Typographie

### Hiérarchie

| Niveau | Font | Weight | Size | Tracking | Line-height |
|---|---|---|---|---|---|
| Hero stat (page 2, 6) | ClashDisplay | 600 | 160 px | -0.02em | 1.0 |
| Title H1 (cover, sections) | ClashDisplay | 500 | 96 px | -0.015em | 1.05 |
| Title H2 (sub-section) | ClashDisplay | 500 | 56 px | -0.01em | 1.1 |
| Title H3 (card titles) | ClashDisplay | 500 | 32 px | -0.005em | 1.15 |
| Body large | Outfit | 400 | 22 px | 0 | 1.55 |
| Body | Outfit | 400 | 18 px | 0 | 1.6 |
| Caption / footnote | Outfit | 400 | 13 px | 0.02em | 1.4 |
| Label uppercase | Outfit | 500 | 12 px | 0.12em | 1.0 |
| Italic accent / quotes | CabinetGrotesk italic | 500 | 28 – 40 px | -0.005em | 1.3 |

### Fonts paths

Les .woff2 sont dans `public/fonts/`. Pour le Python rendering (PIL/canvas-design) il faut des `.ttf`. Cf. fallback :
- ClashDisplay → Inter Display 600 si .ttf indispo
- CabinetGrotesk → DM Serif Display italic
- Outfit → Inter regular

À vérifier au moment du build : présence des .ttf, sinon télécharger via `fonts.google.com` (Outfit, Spectral italic) ou utiliser `fontTools` pour convertir woff2→ttf.

---

## Grid et layouts

```
Page = 1920 × 1080
Marges = 120 (h) × 96 (v)
Zone utile = 1680 × 888

Colonnes : 12 cols × 132 px + 11 gutters × 12 px (cohérent CSS web)
```

### Layouts récurrents par type de page

**Cover (page 1, 10)** : centré vertical, max-width 1200, alignement centré.

**Stat hero (pages 2, 6)** : zone supérieure 60% = chiffre géant amber + label, zone inférieure 40% = 3 colonnes de douleurs/calculs.

**Comparison table (page 3)** : 4 lignes × 3 colonnes (option / faiblesse / coût). Hauteur cellule 130 px. Fond légèrement strié.

**Card grid (pages 4, 5, 8)** : 4 ou 5 cards side-by-side, hauteur 600 px, fond #131829, border-radius 24, padding 40.

**Two-column (pages 7, 9)** : 50/50 ou 60/40 split, séparateur central 1px amber 12% opacity.

**CTA-heavy (page 10)** : centré, large bouton amber 480×80, secondary links sous.

---

## Composants visuels

### Stat block hero
```
┌─────────────────────────┐
│  Label uppercase        │
│  Spectral 12 / .12em    │
│                         │
│  $750k                  │  ← amber #F59E0B, 160px
│                         │
│  Description body       │
│  Outfit 22 / 1.55       │
└─────────────────────────┘
```

### Use case card (page 5)
```
┌─────────────────────────────┐
│  [#] Use case title         │  ← H3 ClashDisplay 32
│                             │
│  Description courte         │  ← Body 18
│  2-3 lignes                 │
│                             │
│  ─────────────────          │
│                             │
│  ROI label    Number+unit   │  ← amber/teal accent
└─────────────────────────────┘
```

### Pricing card (page 8)
```
┌─────────────────────────────┐
│  Package name (label cap)   │
│                             │
│  $25-40 k                   │  ← H1 amber 96
│  ──── one-time              │
│                             │
│  Timeline                   │
│  Outcome bullet 1           │
│  Outcome bullet 2           │
│  Outcome bullet 3           │
│                             │
│  [ Book Diagnosis Call → ]  │  ← amber CTA pill
└─────────────────────────────┘
```

---

## Visual elements (decorative)

- **Top-left logo StellarWave** : 44 px height, sur toutes pages sauf cover (où il est centré).
- **Bottom-left page number** : `01 / 10` Outfit 12, color #6B7599.
- **Bottom-right URL** : `stellarwave.fr/ai-operations` Outfit 12, color #6B7599.
- **Constellation pattern** (decorative, low-opacity) : 30-50 dots rgba(159,179,255,0.12), seul sur la cover et page 10.
- **Radial glow** : `radial-gradient(800px 600px at 80% 10%, rgba(245,158,11,0.06), transparent 70%)` en background des pages stats.
- **Separator amber line** : 64 × 2 px, gradient amber → transparent (largeur 60%), placé sous les titres H1/H2.

---

## Voix & ton (lié au design)

- **Pas d'emoji** anywhere.
- **Pas de "we're excited / passionate"** — voix factuelle, ROI-driven, ton senior.
- **Quotes en italique violet** sont la SEULE place où on se permet du registre éditorial.
- **Chiffres avant adjectifs** : "10 hours saved per advisor per week" > "Massive time savings".
- **Style des CTA** : verbe d'action court. "Book Diagnosis Call" > "Get in touch with our team".

---

## Versions divergentes FR vs EN

| Élément | EN | FR |
|---|---|---|
| Currency | $ partout | € partout (taux conversion 1$ ≈ 0.92€ au jour) |
| AUM example | "$50M – $2B" | "50M€ – 2Mds€" |
| Quote citations | RFXAI, Empaxis (anglo) | Idem mais ajouter contextualisation FR/BE |
| Name "advisor" | advisor | conseiller en gestion de patrimoine (CGP) |
| Compliance | "compliance officer" | "responsable conformité / RCSI" |
| Stat coût horaire | $300/h fully-loaded | 250€/h fully-loaded |
| URL footer | stellarwave.fr/ai-operations | stellarwave.fr/operations-ia |
| CTA | "Book a 30-min Diagnosis Call" | "Réserver un audit de 30 min" |

---

## Checklist visuelle (par page, avant export)

- [ ] Chiffre hero unique visible en moins de 2 secondes
- [ ] Aucun chiffre sans source en footnote
- [ ] Hierarchie visuelle : 1 H1 max par page
- [ ] Logo + page number présents (sauf cover/last page)
- [ ] Contrast ratio ≥ 7:1 sur tout texte body
- [ ] Aucune zone vide aberrante (équilibre 60/40 ou 50/50)
- [ ] Lisibilité mobile validée (zoom 100% smartphone, lecture sans pinch)
