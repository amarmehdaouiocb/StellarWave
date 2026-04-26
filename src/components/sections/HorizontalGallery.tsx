"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { easings } from "@/lib/animations";

const galleryProjects = [
  {
    id: "ecommerce",
    tag: "E-commerce",
    client: "Maison Dorée",
    title: "Refonte e-commerce premium",
    description:
      "Migration Shopify vers Next.js headless. Expérience d'achat immersive avec animations scroll-driven.",
    metric: "+187%",
    metricLabel: "Taux de conversion",
    accentPosition: "top-left" as const,
  },
  {
    id: "saas-dashboard",
    tag: "SaaS",
    client: "DataPulse",
    title: "Dashboard temps réel",
    description:
      "Application SaaS B2B avec visualisation de données en temps réel. Architecture event-driven sur AWS.",
    metric: "12ms",
    metricLabel: "Latence P99",
    accentPosition: "bottom-right" as const,
  },
  {
    id: "mobile-app",
    tag: "Mobile",
    client: "UrbanFit",
    title: "App fitness cross-platform",
    description:
      "React Native avec synchronisation offline-first. Suivi d'entraînement, nutrition et communauté.",
    metric: "4.8★",
    metricLabel: "Note App Store",
    accentPosition: "top-right" as const,
  },
  {
    id: "cloud-migration",
    tag: "Cloud",
    client: "LogiTrack",
    title: "Migration multi-cloud",
    description:
      "Migration infrastructure monolithique vers architecture serverless. Réduction drastique des coûts opérationnels.",
    metric: "-72%",
    metricLabel: "Coûts infra",
    accentPosition: "bottom-left" as const,
  },
];

function GalleryCard({
  project,
  index,
}: {
  project: (typeof galleryProjects)[number];
  index: number;
}) {
  return (
    <motion.div
      className="group relative flex-shrink-0 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: easings.smooth,
      }}
      style={{
        width: "min(500px, 80vw)",
        height: "420px",
      }}
    >
      <div
        className="h-full relative overflow-hidden gallery-card"
        style={{
          background:
            "linear-gradient(160deg, #1e293b 0%, #0f172a 100%)",
          borderRadius: "var(--card-radius-2xl)",
          border: "1px solid rgba(56, 189, 248, 0.12)",
          padding: "40px",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
          transition:
            "border-color 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Hover glow overlay — matches project pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            borderRadius: "inherit",
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56, 189, 248, 0.07) 0%, transparent 60%)",
          }}
        />

        {/* Decorative accent — unique per card */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, transparent 70%)",
            ...(project.accentPosition === "top-left" && {
              top: "-40px",
              left: "-40px",
            }),
            ...(project.accentPosition === "top-right" && {
              top: "-40px",
              right: "-40px",
            }),
            ...(project.accentPosition === "bottom-left" && {
              bottom: "-40px",
              left: "-40px",
            }),
            ...(project.accentPosition === "bottom-right" && {
              bottom: "-40px",
              right: "-40px",
            }),
          }}
        />

        {/* Sequential index — editorial numbering */}
        <div
          className="absolute select-none pointer-events-none"
          style={{
            top: "32px",
            right: "36px",
            fontFamily: "var(--font-display)",
            fontSize: "5rem",
            fontWeight: 800,
            lineHeight: 1,
            color: "rgba(56, 189, 248, 0.06)",
            letterSpacing: "-0.04em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="flex flex-col h-full relative z-10">
          {/* Tag + Arrow */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                background: "rgba(56, 189, 248, 0.08)",
                color: "rgba(56, 189, 248, 0.75)",
                border: "1px solid rgba(56, 189, 248, 0.12)",
                letterSpacing: "0.08em",
              }}
            >
              {project.tag}
            </span>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{
                background: "rgba(56, 189, 248, 0.10)",
                border: "1px solid rgba(56, 189, 248, 0.15)",
              }}
            >
              <ArrowUpRight
                className="h-4 w-4"
                style={{ color: "#38bdf8" }}
              />
            </div>
          </div>

          {/* Client name */}
          <div
            className="text-xs uppercase tracking-wider mb-3"
            style={{
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
            }}
          >
            {project.client}
          </div>

          {/* Title */}
          <h3
            className="font-semibold text-white mb-4"
            style={{
              fontSize: "clamp(1.3rem, 2.5vw, 1.65rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-auto"
            style={{ color: "var(--text-body)", maxWidth: "380px" }}
          >
            {project.description}
          </p>

          {/* Result metric — bottom anchor */}
          <div
            className="pt-5 mt-6"
            style={{
              borderTop: "1px solid rgba(56, 189, 248, 0.08)",
            }}
          >
            <div
              className="text-xs uppercase tracking-wider mb-1.5"
              style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}
            >
              {project.metricLabel}
            </div>
            <div
              className="text-2xl font-bold"
              style={{
                color: "#38bdf8",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              {project.metric}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for vertical fallback
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP ScrollTrigger horizontal scroll — desktop only
  useEffect(() => {
    if (isMobile) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    const initGSAP = async () => {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");

        const gsap = gsapModule.gsap || gsapModule.default;
        const ScrollTrigger =
          scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

        gsap.registerPlugin(ScrollTrigger);

        // Calculate the total distance to scroll
        const distance = track.scrollWidth - window.innerWidth;

        if (distance <= 0) return;

        ctx = gsap.context(() => {
          gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }, section);
      } catch {
        // GSAP not available — fallback: section remains as-is (scrollable overflow)
        if (section) {
          section.style.overflow = "auto";
        }
      }
    };

    // Small delay to ensure layout is settled
    const raf = requestAnimationFrame(() => {
      initGSAP();
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [isMobile]);

  // Headless fallback: force visibility after 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.style.opacity = "1";
        sectionRef.current.style.transform = "none";
      }
      if (trackRef.current) {
        trackRef.current.style.opacity = "1";
        trackRef.current.style.transform = "none";
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      style={{
        backgroundColor: "#020617",
        backgroundImage: "url('/projects/bg-what-we-build.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        paddingTop: isMobile ? "80px" : 0,
        paddingBottom: isMobile ? "80px" : 0,
      }}
    >
      {/* Dark overlay to keep text readable over the background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.55) 40%, rgba(2,6,23,0.72) 100%)",
          zIndex: 0,
        }}
      />

      {/* Subtle top edge gradient for section transition */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "120px",
          background:
            "linear-gradient(180deg, #0f172a 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Section header — visible on desktop (inside the pinned area) */}
      <div
        className={
          isMobile
            ? "container-default px-6 mb-12"
            : "absolute top-0 left-0 z-10 pt-20 pl-8 md:pl-12 lg:pl-16"
        }
        style={!isMobile ? { maxWidth: "400px" } : undefined}
      >
        <motion.h2
          className="mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easings.smooth }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile
              ? "clamp(2rem, 8vw, 3rem)"
              : "clamp(1.5rem, 3vw, 2.25rem)",
            lineHeight: "1.05",
            letterSpacing: "-0.02em",
            color: "var(--text-muted)",
          }}
        >
          Ce qu&apos;on{" "}
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "#ffffff",
              fontWeight: 500,
            }}
          >
            construit
          </span>
        </motion.h2>
        {/* Lime accent line */}
        <div
          style={{
            width: "60px",
            height: "2px",
            background:
              "linear-gradient(90deg, #38bdf8 0%, transparent 100%)",
            marginBottom: "12px",
          }}
        />
        <motion.p
          className="text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: easings.smooth }}
          style={{ color: "var(--text-body)" }}
        >
          Faites d&eacute;filer pour d&eacute;couvrir nos r&eacute;alisations.
        </motion.p>
      </div>

      {/* Track — horizontal on desktop, vertical stack on mobile */}
      <div
        ref={trackRef}
        className={
          isMobile
            ? "flex flex-col gap-6 px-6"
            : "flex items-center gap-10"
        }
        style={
          isMobile
            ? { marginTop: "6cm" }
            : {
                width: "max-content",
                height: "100vh",
                paddingLeft: "min(420px, 30vw)",
                paddingRight: "120px",
                marginTop: "6cm",
              }
        }
      >
        {galleryProjects.map((project, index) => (
          <GalleryCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Subtle bottom edge gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "120px",
          background:
            "linear-gradient(0deg, #020617 0%, transparent 100%)",
          zIndex: 1,
        }}
      />
    </section>
  );
}

export default HorizontalGallery;
