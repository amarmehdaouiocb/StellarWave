"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/config/brand";
import { AnimatedSection, AnimatedItem } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { staggerContainer, fadeInUp } from "@/lib/animations";

// Mock projects data (would come from CMS in production)
const projects = [
  {
    id: "project-1",
    title: "Refonte E-commerce Premium",
    category: "E-commerce",
    image: "/projects/project-1.jpg",
    description: "Plateforme e-commerce haute performance avec +300% de conversion",
  },
  {
    id: "project-2",
    title: "Dashboard SaaS Analytics",
    category: "Web App",
    image: "/projects/project-2.jpg",
    description: "Interface de data visualisation en temps réel",
  },
  {
    id: "project-3",
    title: "App Mobile HealthTech",
    category: "Mobile",
    image: "/projects/project-3.jpg",
    description: "Application iOS/Android pour le suivi médical",
  },
  {
    id: "project-4",
    title: "Landing Page Fintech",
    category: "Landing Page",
    image: "/projects/project-4.jpg",
    description: "Page de conversion avec 12% de taux de conversion",
  },
  {
    id: "project-5",
    title: "Infrastructure Cloud Migration",
    category: "Cloud",
    image: "/projects/project-5.jpg",
    description: "Migration AWS avec -60% de coûts d'infrastructure",
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
              <ChevronLeft className="h-5 w-5" />
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
              <ChevronRight className="h-5 w-5" />
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
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-white/5 to-white/10">
                  {/* Placeholder gradient */}
                  <div className="absolute inset-0 aurora-gradient opacity-20" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <span>Voir le projet</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
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
                index === 0 ? "w-6 bg-[var(--aurora-cyan)]" : "w-2 bg-white/30"
              )}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
