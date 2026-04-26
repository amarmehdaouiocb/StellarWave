"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { CaseStudyModal } from "./CaseStudyModal";
import "./HorizontalGallery.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CaseStudyCard({
  study,
  onOpen,
}: {
  study: CaseStudy;
  onOpen: () => void;
}) {
  const Icon = study.Icon;
  return (
    // .hg-card-pos = wrapper positionné par GSAP (transforms d'éventail)
    // .hg-card    = card visuelle, propre transition hover (n'interfère pas avec GSAP)
    <div className="hg-card-pos">
      <button
        type="button"
        className="hg-card"
        onClick={onOpen}
        aria-label={`Voir le cas d'étude : ${study.title}`}
        style={{ background: study.gradient, color: study.accent }}
      >
        {/* Illustration en background (si fournie). Le mask gradient garde
            la lisibilité du texte sur le bas de la card. Si l'image n'existe
            pas, le navigateur fallback sur le gradient seul. */}
        {study.illustration && (
          <div
            className="hg-card-illustration"
            style={{ backgroundImage: `url("${study.illustration}")` }}
            aria-hidden
          />
        )}

        <div className="hg-card-header">
          <span className="hg-card-platform">
            <Icon weight="fill" />
            {study.category}
          </span>
          <span className="hg-card-handle">{study.title}</span>
        </div>

        <div className="hg-card-glow" aria-hidden />

        <div className="hg-card-body">
          <p className="hg-card-caption">{study.tagline}</p>
        </div>

        <div className="hg-card-footer">
          <span className="hg-card-meta">
            {study.sections.stack.slice(0, 2).join(" · ")}
          </span>
          <span className="hg-card-arrow" aria-hidden>
            <ArrowUpRight weight="bold" />
          </span>
        </div>
      </button>
    </div>
  );
}

// Bascule SSR-safe entre useLayoutEffect (browser) et useEffect (server)
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const openCase = openSlug
    ? caseStudies.find((c) => c.slug === openSlug) ?? null
    : null;

  // ----- GSAP : Card Fan on Hover (Raymmar / Webflow ref) -----
  // L'éventail est posé en CSS pur (cf. HorizontalGallery.css :nth-child).
  // GSAP gère :
  //   1. fade-in du STACK au scroll (les cards apparaissent empilées au centre)
  //   2. HOVER du container deck → déploiement en éventail
  //   3. MOUSELEAVE du container deck → retour au stack
  //   4. HOVER d'une card individuelle (en mode fan) → pull out of deck
  useIsoLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Listener sur .hg-deck-area (zone hit étendue), PAS sur .hg-deck.
    // Sinon, quand une card est lifted en pull-out (Y=-130px), elle dépasse
    // le deck box → la souris peut sortir des bounds visuels du deck →
    // mouseleave deck déclenché → collapseToStack → tout s'effondre.
    const deck =
      sectionRef.current?.querySelector<HTMLElement>(".hg-deck-area");
    const cards = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>(".hg-card-pos") ?? [],
    );
    if (!deck || !cards.length) return;

    // Sauvegarder le z-index naturel CSS de chaque card AVANT toute
    // manipulation inline (cf. :nth-child dans HorizontalGallery.css).
    // Sera utilisé en cible du retour progressif du z-index au mouseleave.
    cards.forEach((card) => {
      const z = getComputedStyle(card).zIndex;
      card.dataset.hgNaturalZ = z === "auto" ? "1" : z;
    });

    // Type pour stocker la ref du zProxy en cours sur la card. Permet de
    // killer le tween zProxy au prochain hover/deploy/collapse, sinon il
    // continue à overrider card.style.zIndex en arrière-plan (le proxy
    // n'est pas la card → killTweensOf(card) ne le touche pas).
    type CardWithProxy = HTMLElement & { _hgZProxy?: { z: number } };
    const killZProxy = (card: HTMLElement) => {
      const proxy = (card as CardWithProxy)._hgZProxy;
      if (proxy) {
        gsap.killTweensOf(proxy);
        delete (card as CardWithProxy)._hgZProxy;
      }
    };

    // Stack initial = cards empilées au centre, légères rotations alternées
    // (façon "deck de cartes posé sur la table"). 9 entrées (= nombre de cards).
    const stackPositions = [
      { x: -10, rot: -3 },
      { x: 8, rot: 4 },
      { x: -5, rot: -2 },
      { x: 12, rot: 5 },
      { x: 0, rot: 0 },
      { x: -8, rot: -4 },
      { x: 6, rot: 3 },
      { x: -12, rot: -5 },
      { x: 4, rot: 2 },
    ];

    const readVar = (el: Element, name: string, fallback: string) =>
      getComputedStyle(el as HTMLElement).getPropertyValue(name).trim() ||
      fallback;

    // État courant : true si le fan est déployé (hover du deck)
    let isFanDeployed = false;

    const ctx = gsap.context(() => {
      // Phase 0 — état initial : stack au centre, invisible
      cards.forEach((card, i) => {
        const sp = stackPositions[i % stackPositions.length];
        gsap.set(card, {
          "--hg-fan-x": `${sp.x}px`,
          "--hg-fan-y": "0px",
          "--hg-fan-rot": `${sp.rot}deg`,
          opacity: 0,
        });
      });

      // Reveal au scroll : fade-in du STACK (pas de déploiement automatique).
      // Les cards apparaissent empilées — c'est le hover qui déploiera ensuite.
      gsap.to(cards, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: { each: 0.05, from: "center" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    // ---------- Helpers : déploiement / repli du fan ----------
    const deployFan = () => {
      if (isFanDeployed) return;
      isFanDeployed = true;

      cards.forEach((card) => {
        gsap.killTweensOf(card);
        killZProxy(card);
        // Reset z-index au déploiement (le pull-out individuel le bumpe ensuite)
        card.style.zIndex = "";
      });

      gsap.to(cards, {
        "--hg-fan-x": (_i: number, el: Element) =>
          readVar(el, "--hg-fan-x-base", "0px"),
        "--hg-fan-y": (_i: number, el: Element) =>
          readVar(el, "--hg-fan-y-base", "0px"),
        "--hg-fan-rot": (_i: number, el: Element) =>
          readVar(el, "--hg-fan-rot-base", "0deg"),
        "--hg-fan-scale": 1,
        duration: 1.0,
        ease: "expo.out",
        stagger: { each: 0.05, from: "center" },
        overwrite: "auto",
      });
    };

    const collapseToStack = () => {
      if (!isFanDeployed) return;
      isFanDeployed = false;

      cards.forEach((card, i) => {
        gsap.killTweensOf(card);
        killZProxy(card);
        const sp = stackPositions[i % stackPositions.length];
        gsap.to(card, {
          "--hg-fan-x": `${sp.x}px`,
          "--hg-fan-y": "0px",
          "--hg-fan-rot": `${sp.rot}deg`,
          "--hg-fan-scale": 1,
          duration: 0.85,
          ease: "power3.inOut",
          overwrite: "auto",
          onComplete: () => {
            card.style.zIndex = "";
          },
        });
      });
    };

    // ---------- Listener container deck (mouseenter / mouseleave) ----------
    // mouseleave (pas mouseout) ne se propage pas et ne se déclenche QUE
    // quand on quitte vraiment le deck (pas en passant à un enfant card).
    const onDeckEnter = () => deployFan();
    const onDeckLeave = () => collapseToStack();

    deck.addEventListener("mouseenter", onDeckEnter);
    deck.addEventListener("mouseleave", onDeckLeave);

    // ---------- Hover individuel : pull out of deck ----------
    // z-index incrémental → la dernière card survolée est TOUJOURS au-dessus,
    // même si l'animation de retour des autres n'est pas terminée.
    let topZ = 50;
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const onEnter = () => {
        if (!isFanDeployed) return; // Pas de pull-out tant que le fan n'est pas déployé
        gsap.killTweensOf(card);
        killZProxy(card); // Killer le tween z-index retour s'il était en cours
        topZ += 1;
        card.style.zIndex = String(topZ);

        // Timeline orchestrée : Y/scale partent ensemble, rotation suit
        // avec un micro delay → mouvement organique décomposé.
        const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
        tl.to(
          card,
          { "--hg-fan-y": "-130px", duration: 0.75, ease: "expo.out" },
          0,
        );
        tl.to(
          card,
          { "--hg-fan-rot": "0deg", duration: 0.95, ease: "expo.out" },
          0.04,
        );
        tl.to(
          card,
          { "--hg-fan-scale": 1.08, duration: 0.65, ease: "back.out(1.4)" },
          0,
        );
      };

      const onLeave = () => {
        // Si on quitte la card pour aller hors du deck → collapseToStack
        // s'occupera de tout. Ici on retourne à la position fan UNIQUEMENT
        // si on est encore en mode fan (sinon le collapse est déjà en cours).
        if (!isFanDeployed) return;
        gsap.killTweensOf(card);
        killZProxy(card); // Au cas où un précédent retour serait encore en cours
        const cs = getComputedStyle(card);
        const baseY = cs.getPropertyValue("--hg-fan-y-base").trim() || "0px";
        const baseRot =
          cs.getPropertyValue("--hg-fan-rot-base").trim() || "0deg";

        // Z-index : animation progressive de la valeur courante vers la
        // valeur naturelle CSS, via un proxy object. Le proxy est stocké
        // sur la card (._hgZProxy) pour pouvoir être killé au prochain
        // hover/deploy/collapse — sinon le tween survit à killTweensOf(card)
        // et continue à overrider card.style.zIndex en arrière-plan.
        const naturalZ = parseInt(card.dataset.hgNaturalZ || "1", 10);
        const startZ =
          parseInt(card.style.zIndex || `${naturalZ}`, 10) || naturalZ;
        const zProxy = { z: startZ };
        (card as CardWithProxy)._hgZProxy = zProxy;

        const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
        tl.to(
          card,
          { "--hg-fan-y": baseY, duration: 1.0, ease: "power3.inOut" },
          0,
        );
        tl.to(
          card,
          { "--hg-fan-rot": baseRot, duration: 1.2, ease: "power3.inOut" },
          0.05,
        );
        tl.to(
          card,
          { "--hg-fan-scale": 1, duration: 0.85, ease: "power2.inOut" },
          0,
        );
        gsap.to(zProxy, {
          z: naturalZ,
          duration: 1.0,
          ease: "power3.inOut",
          onUpdate: () => {
            card.style.zIndex = String(Math.round(zProxy.z));
          },
          onComplete: () => {
            // Reset à vide → repasse au z-index naturel CSS
            card.style.zIndex = "";
            // Nettoyer la ref une fois le tween terminé
            if ((card as CardWithProxy)._hgZProxy === zProxy) {
              delete (card as CardWithProxy)._hgZProxy;
            }
          },
        });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      deck.removeEventListener("mouseenter", onDeckEnter);
      deck.removeEventListener("mouseleave", onDeckLeave);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="hg-section"
      data-screen-label="Projects"
    >
      <div className="hg-overlay" aria-hidden />
      <div className="hg-edge-top" aria-hidden />

      <div className="hg-inner">
        <div className="hg-layout">
          {/* Title — bi-typo "Ce qu'on construit" */}
          <motion.h2
            className="hg-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hg-title-display">Ce qu&rsquo;on</span>
            <span className="hg-title-serif">construit</span>
          </motion.h2>

          <motion.div
            className="hg-accent-line"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0.5 }}
          />

          <motion.p
            className="hg-subtitle"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Survolez pour déployer l&rsquo;éventail. Cliquez sur une card pour
            ouvrir le cas d&rsquo;étude.
          </motion.p>

          {/* Fan deck (9 cards via :nth-child + GSAP).
              .hg-deck-area = wrapper avec hit-area étendue vers le haut
              pour couvrir la zone du pull-out (sinon mouseleave fire
              prématurément quand une card est lifted). Les listeners
              sont sur ce wrapper, pas sur .hg-deck. */}
          <div className="hg-deck-area">
            <div className="hg-deck">
              <div className="hg-deck-track">
                {caseStudies.map((study) => (
                  <CaseStudyCard
                    key={study.slug}
                    study={study}
                    onOpen={() => setOpenSlug(study.slug)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hg-edge-bottom" aria-hidden />

      {/* Modal case study — animation entry/exit via AnimatePresence */}
      <AnimatePresence>
        {openCase && (
          <CaseStudyModal
            study={openCase}
            onClose={() => setOpenSlug(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default HorizontalGallery;
