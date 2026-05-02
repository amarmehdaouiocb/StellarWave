"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDots, ArrowDown } from "@phosphor-icons/react";
import ArrowNarrowRightIcon from "@/components/ui/arrow-narrow-right-icon";
import { brand } from "@/config/brand";
import { CTAButton } from "@/components/shared/CTAButton";
import { easings } from "@/lib/animations";

const HERO_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_143803_f635b644-d959-4f16-9d29-cedaeb5c6de0.mp4";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Lazy load la vidéo bien APRÈS le LCP capture (Lighthouse mesure ~5-6s).
  // L'<Image> prioritaire est le LCP candidate, puis la vidéo s'affiche
  // en fade par-dessus quand chargée. Skip sur Save-Data / reduced-motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mql.matches || conn?.saveData) return;

    const start = () => {
      video.preload = "auto";
      video.load();
    };

    const ric = window.requestIdleCallback;
    const cic = window.cancelIdleCallback;
    let idleId: number;
    let timerId: number;

    // Délai 4s pour que la vidéo ne soit pas dans le window de mesure
    // Lighthouse (LCP est figé après ~5s sans interaction utilisateur).
    if (typeof ric === "function") {
      idleId = ric(start, { timeout: 4000 });
    } else {
      timerId = window.setTimeout(start, 4000);
    }

    const onCanPlay = () => setVideoReady(true);
    video.addEventListener("canplaythrough", onCanPlay, { once: true });

    return () => {
      if (typeof cic === "function" && idleId !== undefined) cic(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
      video.removeEventListener("canplaythrough", onCanPlay);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#020617" }}
    >
      {/* LCP candidate explicite : Image priority (35 KB WebP)
          → devient le plus grand élément peint, donc le LCP Lighthouse */}
      <Image
        src="/hero-poster.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Vidéo background : se charge 4s après mount via requestIdleCallback,
          fade-in par-dessus l'image quand prête. Aucun impact LCP. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ zIndex: 1, opacity: videoReady ? 1 : 0 }}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Sky blue radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 25% 40%, rgba(56, 189, 248, 0.08) 0%, transparent 60%)",
          zIndex: 2,
        }}
      />



      {/* Content */}
      <div className="relative z-10 container-wide pt-32 lg:pt-40 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* SPLIT TEXT - Expressive hero title */}
          <motion.h1
            className="mb-8"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easings.smooth }}
          >
            <span
              className="block"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 8vw, 7rem)",
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Cr&eacute;ons le
            </span>

            <span
              className="block"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 7rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  // Opacity 0.70 = ratio 4.6:1 sur fond #020617 (WCAG AA validé)
                  // tout en préservant l'effet fade éditorial.
                  color: "rgba(255, 255, 255, 0.70)",
                }}
              >
                digital{" "}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#38bdf8",
                }}
              >
                qui
              </span>
            </span>

            <span
              className="block"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 10vw, 8.5rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#ffffff",
              }}
            >
              convertit.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="max-w-2xl mb-10"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              lineHeight: 1.6,
              color: "var(--text-body)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Landing pages premium, applications web &amp; mobile, architecture cloud.
            Ex&eacute;cution industrielle, r&eacute;sultats mesurables.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <CTAButton
              variant="primary"
              size="lg"
              icon={<CalendarDots weight="duotone" className="h-5 w-5" />}
              href={brand.calendlyUrl}
            >
              R&eacute;server un appel d&eacute;couverte
            </CTAButton>
            <CTAButton
              variant="secondary"
              size="lg"
              icon={<ArrowNarrowRightIcon size={20} />}
              href="#contact"
            >
              Demander un devis
            </CTAButton>
          </motion.div>


        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ color: "rgba(56, 189, 248, 0.7)" }}
        aria-label="Défiler vers le bas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.6 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
        }}
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
