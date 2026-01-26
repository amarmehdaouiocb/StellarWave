"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  RocketLaunch,
  Globe,
  Stack,
  DeviceMobile,
  Cloud,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import ArrowNarrowRightIcon from "@/components/ui/arrow-narrow-right-icon";
import { cn } from "@/lib/utils";
import { services } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { fadeInUp, easings } from "@/lib/animations";

// Icon map for looking up Phosphor icons by name
const iconMap: Record<string, React.ElementType> = {
  RocketLaunch,
  Globe,
  Stack,
  DeviceMobile,
  Cloud,
};

// Service card - Uniform dark premium style
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = iconMap[service.iconName] || RocketLaunch;

  return (
    <motion.div
      className="group relative flex-shrink-0"
      style={{ width: "380px" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: easings.smooth }}
    >
      <div
        className="h-full flex flex-col relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
          borderRadius: "var(--card-radius-xl)",
          padding: "32px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          minHeight: "420px",
          transition: "transform 300ms ease-out, box-shadow 300ms ease-out, border-color 300ms ease-out",
        }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            borderRadius: "inherit",
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.20) 0%, transparent 60%)",
          }}
        />

        {/* Subtle border glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            borderRadius: "inherit",
            border: "1px solid rgba(59, 130, 246, 0.3)",
          }}
        />

        {/* Content */}
        <div className="flex flex-col h-full relative z-10">
          {/* Icon */}
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110"
            style={{
              background: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.20)",
            }}
          >
            <Icon weight="duotone" className="h-7 w-7 text-[#60a5fa]" />
          </div>

          {/* Title */}
          <h3
            className="text-xl font-semibold mb-3 text-white transition-colors duration-300"
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            className="mb-6 flex-grow leading-relaxed text-[15px]"
            style={{ color: "rgba(255, 255, 255, 0.65)" }}
          >
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2.5 mb-6">
            {service.features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-center gap-3 text-sm"
                style={{ color: "rgba(255, 255, 255, 0.75)" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#3b82f6" }}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold mt-auto text-[#60a5fa] group-hover:text-white transition-colors duration-300"
            whileHover={{ x: 4 }}
          >
            {service.cta}
            <ArrowNarrowRightIcon size={16} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Check scroll position
  const checkScrollPosition = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    checkScrollPosition();
    carousel.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      carousel.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 400;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <AnimatedSection
      id="services"
      className="section-padding overflow-hidden"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              background: "rgba(255, 255, 255, 0.80)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.60)",
              boxShadow: "var(--shadow-apple-sm)",
              color: "rgba(17, 17, 17, 0.6)",
            }}
          >
            Nos expertises
          </motion.span>

          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Des solutions </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>sur mesure</span>
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}> pour chaque besoin</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(17, 17, 17, 0.6)" }}
          >
            Du prototypage rapide au déploiement en production, nous couvrons
            l&apos;ensemble du cycle de vie de vos produits digitaux.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Navigation Arrows */}
          <motion.button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
              canScrollLeft
                ? "opacity-100 cursor-pointer"
                : "opacity-0 pointer-events-none"
            )}
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Défiler vers la gauche"
          >
            <CaretLeft className="h-5 w-5 text-[#111111]" weight="bold" />
          </motion.button>

          <motion.button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
              canScrollRight
                ? "opacity-100 cursor-pointer"
                : "opacity-0 pointer-events-none"
            )}
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Défiler vers la droite"
          >
            <CaretRight className="h-5 w-5 text-[#111111]" weight="bold" />
          </motion.button>

          {/* Gradient Masks */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none transition-opacity duration-300",
              canScrollLeft ? "opacity-100" : "opacity-0"
            )}
            style={{
              background: "linear-gradient(to right, var(--apple-bg) 0%, transparent 100%)",
            }}
          />
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none transition-opacity duration-300",
              canScrollRight ? "opacity-100" : "opacity-0"
            )}
            style={{
              background: "linear-gradient(to left, var(--apple-bg) 0%, transparent 100%)",
            }}
          />

          {/* Scrollable Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pt-2 px-2 -mx-2 cursor-grab active:cursor-grabbing"
            style={{
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: "16px",
              scrollPaddingRight: "16px",
              WebkitOverflowScrolling: "touch",
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                style={{ scrollSnapAlign: "start" }}
              >
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>

          {/* Scroll Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!carouselRef.current) return;
                  const cardWidth = 380 + 24; // card width + gap
                  carouselRef.current.scrollTo({
                    left: index * cardWidth,
                    behavior: "smooth",
                  });
                }}
                className="h-2 rounded-full transition-all duration-300 hover:bg-[#3b82f6]"
                style={{
                  width: "24px",
                  background: "rgba(59, 130, 246, 0.3)",
                }}
                aria-label={`Aller à la carte ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-[var(--neutral-500)] mb-6">
            Vous avez un projet en tête ? Discutons-en.
          </p>
          <CTAButton
            variant="primary"
            size="lg"
            icon={<ArrowNarrowRightIcon size={20} />}
            href="#contact"
          >
            Demander un devis
          </CTAButton>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
