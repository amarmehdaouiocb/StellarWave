"use client";

import { motion } from "framer-motion";
import {
  RocketLaunch,
  Globe,
  Stack,
  DeviceMobile,
  Cloud,
} from "@phosphor-icons/react";
import ArrowNarrowRightIcon from "@/components/ui/arrow-narrow-right-icon";
import SparklesIcon from "@/components/ui/sparkles-icon";
import { cn } from "@/lib/utils";
import { services, type IconName } from "@/config/brand";

// Icon map for looking up Phosphor icons by name
const iconMap: Record<string, React.ElementType> = {
  RocketLaunch,
  Globe,
  Stack,
  DeviceMobile,
  Cloud,
};
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  staggerContainer,
  staggerItemBlur,
  fadeInUp,
  easings,
} from "@/lib/animations";

// Icon component - Light theme
function ServiceIcon({
  icon: Icon,
  isHighlighted,
}: {
  icon: React.ElementType;
  isHighlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300",
        isHighlighted
          ? "bg-[var(--electric-blue)]"
          : "bg-[var(--electric-blue)]/10 group-hover:bg-[var(--electric-blue)]/15"
      )}
    >
      <Icon
        weight="duotone"
        className={cn(
          "h-7 w-7",
          isHighlighted ? "text-white" : "text-[var(--electric-blue)]"
        )}
      />
    </div>
  );
}

// Service card - Light theme with white cards and soft shadows
function ServiceCard({
  service,
  index,
  isHighlighted,
  className,
}: {
  service: (typeof services)[number];
  index: number;
  isHighlighted: boolean;
  className?: string;
}) {
  const Icon = iconMap[service.iconName] || RocketLaunch;

  return (
    <motion.div
      variants={staggerItemBlur}
      className={cn("group", className)}
    >
      <div
        className={cn(
          "h-full flex flex-col",
          "bg-white rounded-3xl p-8",
          "border transition-all duration-300",
          isHighlighted
            ? "border-[var(--electric-blue)]/30"
            : "border-[oklch(0_0_0_/_6%)] hover:border-[var(--electric-blue)]/20"
        )}
        style={{
          boxShadow: isHighlighted
            ? "0 8px 30px -4px oklch(0.55 0.25 255 / 12%), 0 24px 60px -12px oklch(0.2 0.01 250 / 10%)"
            : "0 4px 20px -4px oklch(0.2 0.01 250 / 8%), 0 12px 40px -8px oklch(0.2 0.01 250 / 6%)",
        }}
      >
        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Header with icon and badge */}
          <div className="flex items-start justify-between mb-6">
            <ServiceIcon icon={Icon} isHighlighted={isHighlighted} />
            {isHighlighted && (
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--electric-blue)]/10 border border-[var(--electric-blue)]/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <SparklesIcon size={14} className="text-[var(--electric-blue)]" />
                <span className="text-xs font-medium text-[var(--electric-blue)]">
                  Populaire
                </span>
              </motion.div>
            )}
          </div>

          {/* Title */}
          <h3
            className={cn(
              "text-xl font-semibold mb-3 transition-colors duration-300",
              isHighlighted
                ? "text-[var(--electric-blue)]"
                : "text-[var(--accent-dark)] group-hover:text-[var(--electric-blue)]"
            )}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[var(--neutral-500)] mb-6 flex-grow leading-relaxed">
            {service.description}
          </p>

          {/* Features with animated bullets */}
          <ul className="space-y-2.5 mb-6">
            {service.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className="flex items-center gap-3 text-sm text-[var(--neutral-500)]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: featureIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full flex-shrink-0",
                    isHighlighted
                      ? "bg-[var(--electric-blue)]"
                      : "bg-[var(--neutral-400)] group-hover:bg-[var(--electric-blue)]"
                  )}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
                <span className="group-hover:text-[var(--neutral-600)] transition-colors">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="#contact"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium mt-auto",
              "transition-all duration-300",
              isHighlighted
                ? "text-[var(--electric-blue)]"
                : "text-[var(--neutral-500)] hover:text-[var(--electric-blue)]"
            )}
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
  return (
    <AnimatedSection id="services" className="section-padding bg-[var(--background)]">
      <div className="container-wide">
        {/* Header with enhanced styling */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-white border border-[oklch(0_0_0_/_8%)] text-sm font-medium text-[var(--neutral-600)] mb-6"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              boxShadow: "0 2px 8px oklch(0.2 0.01 250 / 4%)",
            }}
          >
            Nos expertises
          </motion.span>
          <h2 className="text-display-mega text-[var(--accent-dark)] mb-6">
            Des solutions{" "}
            <span className="text-gradient-hero">sur mesure</span> pour
            chaque besoin
          </h2>
          <p className="text-lg text-[var(--neutral-500)] leading-relaxed">
            Du prototypage rapide au déploiement en production, nous couvrons
            l&apos;ensemble du cycle de vie de vos produits digitaux.
          </p>
        </motion.div>

        {/* Bento grid layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const isHighlighted = index === 2; // Web Apps is highlighted

            // Bento layout: highlighted card spans 2 columns on large screens
            const gridClass = isHighlighted
              ? "md:col-span-2 lg:col-span-2 lg:row-span-1"
              : "";

            return (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isHighlighted={isHighlighted}
                className={gridClass}
              />
            );
          })}
        </motion.div>

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
            Demander une estimation
          </CTAButton>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
