# Sprints Site — StellarWave M1 à M6

Liste consolidée des actions site pour exécuter le plan d'acquisition v2 (SEO + Ads + Outbound + Inbound enrichi).

Référence stratégie complète : `~/.claude/plans/j-aimerais-qu-on-r-fl-chisse-harmonic-treehouse.md`
Pipeline outbound : `docs/pipeline-outbound.md`

---

## Vue d'ensemble

| Sprint | Focus | Effort | Critique |
|---|---|---:|---|
| S1 | SEO foundations + tracking | 12-15h | OUI (bloque mesure) |
| S2 | Calculateur ROI + hub `/outils-internes` | 20-25h | OUI (bloque ads + cold email) |
| S3 | Hub `/automatisation-pme` + home + case studies + newsletter | 18-22h | Moyenne |
| S4 | Case studies détaillés + pages légales + premier article | 12-17h | Moyenne (légales bloquent Lemlist) |
| **Total M1** | | **62-79h** | |
| Continu M1-M6 | 2 articles/mois + itérations + A/B tests | ~10h/mois | - |
| M5+ | Parrainage + Partenariats prescripteurs | 5-10h | - |

---

## Sprint 1 — SEO foundations + tracking (semaine 1)

Tout est parallélisable, peu de dépendances. Critical path car débloque la mesure de tout le reste.

| # | Action | Fichier | Effort |
|---|---|---|---:|
| 1 | Compléter le sitemap (ajouter `/blog`, `/audit-gratuit`, articles dynamiques depuis `src/content/blog.ts`, futurs hubs) | `src/app/sitemap.ts` | 1h |
| 2 | Auditer le robots.ts (vérifier Disallow, sitemap reference) | `src/app/robots.ts` | 30min |
| 3 | Enrichir le JSON-LD layout : `LocalBusiness` (Paris, areaServed France), `BreadcrumbList` | `src/app/layout.tsx` | 2h |
| 4 | Ajouter les IDs ads et tracking au config (Meta Pixel ID, LinkedIn Partner ID, GA4 conversion IDs) | `src/config/brand.ts` | 30min |
| 5 | Créer le composant Meta Pixel client | `src/components/analytics/MetaPixel.tsx` | 1h |
| 6 | Créer le composant LinkedIn Insight Tag | `src/components/analytics/LinkedInInsightTag.tsx` | 1h |
| 7 | Créer l'API route Meta CAPI server-side (déduplication ID + hash email) | `src/app/api/meta-capi/route.ts` | 3h |
| 8 | Ajouter 4 conversions GA4 : `lead_magnet_download`, `calendly_booked`, `form_submit_qualified`, `roi_calculator_completed` | `src/components/analytics/GoogleAnalytics.tsx` (existant) + helper events | 2h |
| 9 | Soumettre sitemap à Search Console + Bing Webmaster | (manuel hors code) | 30min |
| 10 | Créer Google Business Profile (catégorie "Service de développement de logiciels") | (manuel hors code) | 1h |

**Test fin de S1** : Meta Pixel fire (Pixel Helper Chrome) + LinkedIn Insight Tag fire + sitemap valide + JSON-LD valide (search.google.com/test/rich-results).

---

## Sprint 2 — Calculateur ROI + hub `/outils-internes` (semaine 2)

Déblocage critique. Sans ça, ni Campagne 1 Google Ads, ni séquence Lemlist (email J+7) ne convertissent.

| # | Action | Fichier | Effort |
|---|---|---|---:|
| 11 | Créer le composant Calculateur ROI interactif (4 inputs / 3 outputs / email gate) | `src/components/lead-magnets/CalculateurROI.tsx` | 8-10h |
| 12 | Créer la page calculateur (avec layout, FAQ, social proof) | `src/app/calculateur-roi/page.tsx` | 2h |
| 13 | Créer l'API route de réception emails (validation Zod + Resend + GA4 event) | `src/app/api/roi-calculator/route.ts` | 2h |
| 14 | Créer template email Resend pour résultats détaillés | `src/emails/calculateur-roi-results.tsx` | 2h |
| 15 | Créer le hub `/outils-internes` (hero + bénéfices + 3 case studies preview + CTA Calculateur + CTA RDV + FAQ) | `src/app/outils-internes/page.tsx` | 6-8h |
| 16 | Tracking du Calculateur : event `roi_calculator_completed` + Meta Pixel `Lead` + LinkedIn Insight `LeadGenForm` | (intégré dans 11) | inclus |

**Specs Calculateur ROI** :
- Inputs : nb personnes utilisant Excel, h/sem perdues (saisie + erreurs), coût horaire moyen (préchargé 35€/h), nb erreurs/incidents/mois
- Outputs : économies annuelles brutes, temps gagné/an (jours travaillés), ROI 18 mois sur ticket 15k€ par défaut
- CTA primaire : "Recevoir le détail par email" (gate email)
- CTA secondaire : "Réserver 30 min" (Calendly)

**Test fin de S2** : Calculateur fonctionnel end-to-end (form → email Resend → CAPI → GA4 conversion event), hub Lighthouse > 90.

---

## Sprint 3 — Hub `/automatisation-pme` + home + case studies + newsletter (semaine 3)

| # | Action | Fichier | Effort |
|---|---|---|---:|
| 17 | Créer `src/content/case-studies.ts` (data des 5 cas — Applisyndicos, Fidelya, BoatAcademy, RA Bâtiment, OnMangeQuoi : titre, secteur, problème, solution, métriques avant/après, durée, témoignage) | `src/content/case-studies.ts` | 3-4h |
| 18 | Créer le hub `/automatisation-pme` (hero + 3 pains + offre audit 7k€ + case studies pertinents + CTA RDV) | `src/app/automatisation-pme/page.tsx` | 5-6h |
| 19 | Refonte hero home : dual-CTA "Site & web app" / "Outil interne sur mesure" + mise en avant Calculateur ROI | `src/app/page.tsx` | 3-4h |
| 20 | Créer la page index `/cas-clients` (cards avec filtre secteur + lien détail) | `src/app/cas-clients/page.tsx` | 2-3h |
| 21 | Créer la route dynamique `/cas-clients/[slug]` (template article enrichi schema `Article`) | `src/app/cas-clients/[slug]/page.tsx` | 2-3h |
| 22 | Créer composant NewsletterForm (sticky footer ou hero hub) | `src/components/forms/NewsletterForm.tsx` | 2h |
| 23 | Créer API route abonnement newsletter (Resend list management) | `src/app/api/newsletter-subscribe/route.ts` | 2h |
| 24 | Open Graph optimisé pour partage LinkedIn (image dynamique par article + case study) | `src/app/blog/[slug]/page.tsx` + `cas-clients/[slug]/page.tsx` | 2h |

**Test fin de S3** : home dual-CTA visible, hubs `/outils-internes` et `/automatisation-pme` indexés, OG images générées correctement (LinkedIn Post Inspector).

---

## Sprint 4 — Case studies détaillés + pages légales + premier article (semaine 4)

| # | Action | Fichier | Effort |
|---|---|---|---:|
| 25 | Rédiger 2 case studies détaillés (Applisyndicos + Fidelya) en data structurée enrichie + sections (contexte / problème / solution / métriques / témoignage) | `src/content/case-studies.ts` (extension) | 4-5h rédactionnel |
| 26 | Créer template email Resend pour newsletter mensuelle | `src/emails/newsletter-mensuelle.tsx` | 2h |
| 27 | Créer page de désinscription email (URL référencée Lemlist + newsletter, avec preferences granulaires) | `src/app/desinscription/page.tsx` | 1-2h |
| 28 | Vérifier ou créer mentions légales | `src/app/mentions-legales/page.tsx` | 1h |
| 29 | Vérifier ou créer politique de confidentialité (RGPD-compliant, mention cold email opt-out + intérêt légitime) | `src/app/politique-confidentialite/page.tsx` | 1-2h |
| 30 | Vérifier ou créer CGV | `src/app/cgv/page.tsx` | 1h |
| 31 | Premier article publié ("Excel vs app interne : ROI calculé en 5 minutes") avec lien vers Calculateur ROI | `src/content/blog.ts` (extension) + content | 3-4h rédactionnel |

**Test fin de S4** : pages légales accessibles depuis footer, désinscription fonctionnelle, premier article publié et lié dans le sitemap. **Go pour Lemlist warm-up.**

---

## Continu M1-M6

| Action | Fichier(s) | Cadence |
|---|---|---|
| Publier 2 articles/mois (longue traîne intent commercial) | `src/content/blog.ts` | 2/mois |
| Nouveau case study mensuel détaillé | `src/content/case-studies.ts` | 1/mois |
| Newsletter mensuelle (envoi via Resend) | `src/emails/newsletter-mensuelle.tsx` (réutilisable) | 1/mois |
| 3 posts LinkedIn organique/semaine (manuel hors code) | - | 3/semaine |
| A/B test hero home (variantes message) | `src/app/page.tsx` | À M3, puis trimestriel |
| Itérations copy hubs selon Search Console | `src/app/outils-internes/page.tsx` + `automatisation-pme/page.tsx` | Mensuel |
| Schéma enrichi sur articles publiés (`Article` + `Person` auteur) | `src/app/blog/[slug]/page.tsx` | À chaque publication |

---

## M5+ — Inbound complémentaire

| # | Action | Fichier | Effort |
|---|---|---|---:|
| 32 | Page `/parrainage` + form (à activer post 1er deal closed) | `src/app/parrainage/page.tsx` | 3-4h |
| 33 | Template email NPS post-livraison (déclenche demande parrainage si score ≥ 9) | `src/emails/nps-post-delivery.tsx` | 2h |
| 34 | Landing partenariats prescripteurs (experts-comptables, consultants) | `src/app/partenaires/page.tsx` | 3-4h |
| 35 | Page sectorielle pilote (si Search Console révèle volume sur "logiciel sur mesure [secteur]") | `src/app/secteurs/[slug]/page.tsx` | 5-6h |

---

## Critical path

```
S1 Tracking ─────────────┐
                         │
S1 Sitemap + Schema ─────┤
                         │
                         ├─> S2 Calculateur ROI ────┐
                         │                          │
                         │                          ├─> Lemlist warm-up (J+28)
                         │                          │
                         │                          ├─> Google Ads Campagne 1 lancement (M2)
                         │                          │
S2 Hub /outils-internes ─┘                          │
                                                    │
S3 Newsletter form ─────> Capture audience ─────────┤
                                                    │
S4 Pages légales ─────> Conformité Lemlist ─────────┘
                                                    │
                                                    v
                                          M2 Outbound + Ads ON
```

**Bloquant pour le go-live ads + cold email** :
1. Sprint 1 tracking complet (sinon pilotage à l'aveugle)
2. Sprint 2 Calculateur ROI + hub `/outils-internes`
3. Sprint 4 pages légales + désinscription (sans elles, Lemlist non-conforme)

**Pas bloquant mais souhaitable avant ads** :
- Sprint 3 hub `/automatisation-pme` (nécessaire seulement pour Campagne 2 Google Ads M3)
- Sprint 3 home dual-CTA (impact taux conversion ~+15%)
- Sprint 4 case studies détaillés (preuve sociale dans ads + emails)

---

## Effort total

| Phase | Effort | Cumul |
|---|---:|---:|
| Sprint 1 | 12-15h | 15h |
| Sprint 2 | 20-25h | 40h |
| Sprint 3 | 18-22h | 62h |
| Sprint 4 | 12-17h | 79h |
| **M1 total** | **62-79h** | |
| Continu M2-M6 (10h/mois × 5) | 50h | 129h |
| M5+ inbound complémentaire | 13-18h | 147h |

**Charge solo M1 = ~70h** sur 4 semaines = **~18h/sem** dédiées site (sur 35h/sem totales).

Dépasse les 10-15h/sem prévues pour acquisition, donc **trade-off à arbitrer** :
- Soit délivery client réduite à 17h/sem en M1 (acceptable si pas de gros projet en cours)
- Soit étalement sur 6 semaines au lieu de 4 (M1 + S5-S6 de M2)
- Soit sous-traitance partielle (rédaction case studies, design OG images)

---

## Vérifications avant chaque go-live de page

- [ ] Lighthouse > 90 sur 4 axes (Performance, A11y, Best Practices, SEO)
- [ ] Schema validator OK (search.google.com/test/rich-results)
- [ ] Sitemap inclut la nouvelle page
- [ ] Meta Pixel fire (Pixel Helper Chrome)
- [ ] LinkedIn Insight Tag fire (LinkedIn Insight Tag Helper Chrome)
- [ ] Conversion test end-to-end : form → email Resend → CAPI → GA4 conversion event
- [ ] Mobile responsive (375px, 768px, 1280px)
- [ ] Open Graph image présente et valide (LinkedIn Post Inspector + Facebook Sharing Debugger)
- [ ] Footer inclut liens mentions légales + politique conf + désinscription
