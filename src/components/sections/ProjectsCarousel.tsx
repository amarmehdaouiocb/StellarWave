"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CaretLeft, CaretRight, ArrowSquareOut } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { fadeInUp } from "@/lib/animations";

// Real projects data
const projects = [
  {
    id: "fidelya",
    title: "Fidelya",
    category: "SaaS / CRM",
    image: "/projects/fidelya.png",
    description: "CRM restaurant avec fidélité client, caisse web offline-first et portail membres QR code.",
    tech: ["React", "TypeScript", "Supabase", "TanStack Query"],
  },
  {
    id: "boatacademy",
    title: "BoatAcademy",
    category: "SaaS / Mobile",
    image: "/projects/boatacademy.png",
    description: "Plateforme SaaS pour auto-écoles nautiques avec admin web et app mobile élève.",
    tech: ["Next.js", "Expo", "Turbo", "Supabase", "Stripe"],
  },
  {
    id: "onmangequoi",
    title: "OnMangeQuoi",
    category: "PWA",
    image: "/projects/onmangequoi.png",
    description: "Annuaire alimentaire PWA avec onboarding restaurants et dashboard admin.",
    tech: ["React", "Vite", "Supabase", "Workbox"],
  },
  {
    id: "ra-batiment",
    title: "RA Bâtiment",
    category: "Site Vitrine",
    image: "/projects/ra-batiment.svg",
    description: "Site premium pour artisan BTP avec portfolio avant/après et formulaire de devis.",
    tech: ["Next.js 16", "React 19", "Framer Motion", "Tailwind v4"],
  },
];

export function ProjectsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <AnimatedSection
      id="projects"
      className="section-padding overflow-hidden"
    >
      <div className="container-wide lg:pl-64">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-12"
          variants={fadeInUp}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Nos <span className="text-gradient">réalisations</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Découvrez une sélection de projets qui illustrent notre expertise
              et notre approche orientée résultats.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                "glass transition-all duration-200",
                canScrollLeft
                  ? "hover:bg-white/10 text-foreground"
                  : "opacity-30 cursor-not-allowed text-muted-foreground"
              )}
              aria-label="Projet précédent"
            >
              <CaretLeft className="h-5 w-5" weight="bold" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                "glass transition-all duration-200",
                canScrollRight
                  ? "hover:bg-white/10 text-foreground"
                  : "opacity-30 cursor-not-allowed text-muted-foreground"
              )}
              aria-label="Projet suivant"
            >
              <CaretRight className="h-5 w-5" weight="bold" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x scrollbar-hide pb-4 -mx-4 px-4"
          onScroll={checkScrollButtons}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="flex-shrink-0 w-[320px] sm:w-[380px] scroll-snap-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full group cursor-pointer">
                {/* Project logo */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center p-6">
                  {/* Background gradient */}
                  <div className="absolute inset-0 aurora-gradient opacity-10" />

                  {/* Logo */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Image
                      src={project.image}
                      alt={`Logo ${project.title}`}
                      width={200}
                      height={150}
                      className="object-contain max-h-24 w-auto drop-shadow-lg"
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <span>Voir le projet</span>
                      <ArrowSquareOut className="h-4 w-4" weight="bold" />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Mobile dots indicator */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {projects.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === 0 ? "w-6 bg-[var(--ember-amber)]" : "w-2 bg-white/30"
              )}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
