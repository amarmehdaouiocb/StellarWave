"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  TiktokLogo,
  YoutubeLogo,
  GithubLogo,
  DribbbleLogo,
  BehanceLogo,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { brand } from "@/config/brand";
import "./SocialFeed.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SocialPost = {
  id: string;
  platform: string;
  handle: string;
  caption: string;
  meta: string;
  Icon: React.ElementType;
  gradient: string;
  accent: string;
};

const posts: SocialPost[] = [
  {
    id: "ig-1",
    platform: "Instagram",
    handle: "@stellarwave",
    caption: "Drop : nouvelle landing page pour un client e-commerce.",
    meta: "1 247 likes",
    Icon: InstagramLogo,
    gradient:
      "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 35%, #6228d7 100%)",
    accent: "#ffffff",
  },
  {
    id: "li-1",
    platform: "LinkedIn",
    handle: "Stellar Wave",
    caption: "Comment passer un score Lighthouse de 45 à 98 en 30 jours.",
    meta: "412 réactions",
    Icon: LinkedinLogo,
    gradient:
      "linear-gradient(160deg, #0a66c2 0%, #1f7fd8 60%, #073860 100%)",
    accent: "#dbeafe",
  },
  {
    id: "x-1",
    platform: "X",
    handle: "@stellarwave",
    caption: "Shipping un dashboard SaaS en 3 sprints. Stack : Next 16 + Supabase.",
    meta: "2.1k impressions",
    Icon: XLogo,
    gradient: "linear-gradient(170deg, #0d0d0d 0%, #1f1f1f 100%)",
    accent: "#f5f5f5",
  },
  {
    id: "tt-1",
    platform: "TikTok",
    handle: "@stellarwave",
    caption: "Avant / après — refonte complète d'un site corporate.",
    meta: "84.5k vues",
    Icon: TiktokLogo,
    gradient:
      "linear-gradient(150deg, #25f4ee 0%, #000000 50%, #fe2c55 100%)",
    accent: "#ffffff",
  },
  {
    id: "yt-1",
    platform: "YouTube",
    handle: "Stellar Wave Studio",
    caption: "Tutoriel : architecture cloud serverless pour startups.",
    meta: "12k vues",
    Icon: YoutubeLogo,
    gradient:
      "linear-gradient(160deg, #ff0033 0%, #c4001d 60%, #5e000e 100%)",
    accent: "#ffe8eb",
  },
  {
    id: "gh-1",
    platform: "GitHub",
    handle: "stellarwave",
    caption: "Open-sourcing notre starter Next.js 16 + Supabase + Tailwind 4.",
    meta: "327 ★",
    Icon: GithubLogo,
    gradient:
      "linear-gradient(150deg, #1f2937 0%, #0f172a 50%, #020617 100%)",
    accent: "#7dd3fc",
  },
  {
    id: "dr-1",
    platform: "Dribbble",
    handle: "@stellarwave",
    caption: "Exploration UI : dashboard analytics dark theme.",
    meta: "892 likes",
    Icon: DribbbleLogo,
    gradient:
      "linear-gradient(155deg, #ea4c89 0%, #ff7eb8 60%, #6f1e3c 100%)",
    accent: "#ffe5f0",
  },
  {
    id: "be-1",
    platform: "Behance",
    handle: "stellarwave",
    caption: "Case study : refonte brand + site pour Fidelya.",
    meta: "1.4k vues",
    Icon: BehanceLogo,
    gradient:
      "linear-gradient(165deg, #1769ff 0%, #053eb0 60%, #001b56 100%)",
    accent: "#e0ecff",
  },
];

const socialLinks = [
  { label: "LinkedIn", href: brand.socials.linkedin },
  { label: "Twitter", href: brand.socials.twitter },
  { label: "GitHub", href: brand.socials.github },
];

function PostCard({ post }: { post: SocialPost }) {
  const Icon = post.Icon;
  return (
    // .sf-card-pos = wrapper positionné par GSAP (transforms d'éventail)
    // .sf-card    = card visuelle, propre transition hover (n'interfère pas avec GSAP)
    <div className="sf-card-pos">
      <article
        className="sf-card"
        style={{ background: post.gradient, color: post.accent }}
      >
        <div className="sf-card-header">
          <span className="sf-card-platform">
            <Icon weight="fill" />
            {post.platform}
          </span>
          <span className="sf-card-handle">{post.handle}</span>
        </div>

        <div className="sf-card-glow" aria-hidden />

        <div className="sf-card-body">
          <p className="sf-card-caption">{post.caption}</p>
        </div>

        <div className="sf-card-footer">
          <span className="sf-card-meta">{post.meta}</span>
          <span className="sf-card-arrow" aria-hidden>
            <ArrowUpRight weight="bold" />
          </span>
        </div>
      </article>
    </div>
  );
}

// Bascule SSR-safe entre useLayoutEffect (browser) et useEffect (server)
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function SocialFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // ----- GSAP : reveal scroll-driven + hover orchestré -----
  // L'éventail est posé en CSS pur (cf. SocialFeed.css :nth-child),
  // GSAP gère uniquement :
  //   1. le fade-in stagger des cards à l'apparition de la section
  //   2. l'orchestration du hover (timeline décomposée en 3 propriétés
  //      avec eases différents) + gestion z-index incrémentale en JS
  //      pour éviter les race conditions entre cards survolées vite.
  useIsoLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const cards = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>(".sf-card-pos") ?? [],
    );
    if (!cards.length) return;

    // ---------- 1. Card Fan reveal — stack puis déploiement éventail ----------
    // État initial = stack désordonné (cards empilées au centre, petites
    // rotations alternées, façon "deck de cartes posé sur la table").
    // Au premier scroll dans la section, le stack se déploie en éventail
    // (timeline GSAP, stagger from center, ease expo.out).
    // Inspiré du Card Fan on Hover de Raymmar (Webflow).
    const stackPositions = [
      { x: -10, rot: -3 },
      { x:   8, rot:  4 },
      { x:  -5, rot: -2 },
      { x:  12, rot:  5 },
      { x:  -8, rot: -4 },
      { x:   6, rot:  3 },
      { x: -12, rot: -5 },
      { x:   4, rot:  2 },
    ];

    const ctx = gsap.context(() => {
      // Phase 0 — état initial (stack au centre, invisible)
      cards.forEach((card, i) => {
        const sp = stackPositions[i % stackPositions.length];
        gsap.set(card, {
          "--fan-x": `${sp.x}px`,
          "--fan-y": "0px",
          "--fan-rot": `${sp.rot}deg`,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",  // ne joue qu'une fois
        },
      });

      // Phase A — fade-in rapide du stack (les cards apparaissent empilées)
      tl.to(cards, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: { each: 0.04, from: "center" },
      });

      // Phase B — déploiement vers l'éventail
      // Valeurs cibles lues depuis le CSS (--fan-*-base posés par :nth-child)
      // Stagger "from center" → les cards centrales partent en premier,
      // les externes suivent → effet d'ouverture en éventail
      const readVar = (el: Element, name: string, fallback: string) =>
        getComputedStyle(el as HTMLElement).getPropertyValue(name).trim() ||
        fallback;

      tl.to(
        cards,
        {
          "--fan-x": (_i: number, el: Element) =>
            readVar(el, "--fan-x-base", "0px"),
          "--fan-y": (_i: number, el: Element) =>
            readVar(el, "--fan-y-base", "0px"),
          "--fan-rot": (_i: number, el: Element) =>
            readVar(el, "--fan-rot-base", "0deg"),
          duration: 1.3,
          ease: "expo.out",
          stagger: { each: 0.08, from: "center" },
        },
        "-=0.3",   // chevauchement léger avec la phase A
      );
    }, sectionRef);

    // ---------- 2. Hover : pull out of deck (Lando-like) ----------
    // z-index incrémental → la dernière card survolée est TOUJOURS au-dessus,
    // même si l'animation de retour des autres n'est pas terminée.
    let topZ = 50;
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const onEnter = () => {
        gsap.killTweensOf(card);
        topZ += 1;
        card.style.zIndex = String(topZ);

        // Timeline orchestrée : Y/scale partent ensemble, rotation suit
        // avec un micro delay → mouvement organique décomposé.
        const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
        tl.to(
          card,
          { "--fan-y": "-130px", duration: 0.75, ease: "expo.out" },
          0,
        );
        tl.to(
          card,
          { "--fan-rot": "0deg", duration: 0.95, ease: "expo.out" },
          0.04,
        );
        tl.to(
          card,
          { "--fan-scale": 1.08, duration: 0.65, ease: "back.out(1.4)" },
          0,
        );
      };

      const onLeave = () => {
        gsap.killTweensOf(card);
        const cs = getComputedStyle(card);
        const baseY = cs.getPropertyValue("--fan-y-base").trim() || "0px";
        const baseRot =
          cs.getPropertyValue("--fan-rot-base").trim() || "0deg";

        const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
        tl.to(
          card,
          { "--fan-y": baseY, duration: 1.0, ease: "power3.inOut" },
          0,
        );
        tl.to(
          card,
          { "--fan-rot": baseRot, duration: 1.2, ease: "power3.inOut" },
          0.05,
        );
        tl.to(
          card,
          {
            "--fan-scale": 1,
            duration: 0.85,
            ease: "power2.inOut",
            onComplete: () => {
              // Reset z-index une fois l'animation terminée. Si l'utilisateur
              // re-hover avant, onEnter bumpe topZ → écrase cette valeur.
              card.style.zIndex = "";
            },
          },
          0,
        );
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="socials"
      ref={sectionRef}
      className="sf-section"
      data-screen-label="Socials"
    >
      {/* .callout-socials-inner */}
      <div className="sf-inner">
        {/* .callout-socials-layout — column, gap = --gap * 2 */}
        <div className="sf-layout">
          {/* Title — bi-typo Mona Sans 900 + Bodoni italic (Brier substitute) */}
          <motion.h2
            className="sf-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="sf-title-thin">what&rsquo;s up</span>
            <span className="sf-title-serif">On Socials</span>
          </motion.h2>

          {/* .callout-socials-card-layout — pin container for ScrollTrigger */}
          <div className="sf-marquee" ref={pinRef}>
            <div className="sf-marquee-track" ref={trackRef}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* .callout-socials-intro-w + .callout-socials-links-layout */}
          <motion.div
            className="sf-footer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="sf-footer-intro">
              Follow Stellar Wave on social media
            </p>
            <nav className="sf-footer-links" aria-label="Réseaux sociaux">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  className="sf-footer-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SocialFeed;
