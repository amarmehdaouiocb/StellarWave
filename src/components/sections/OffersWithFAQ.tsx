"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, ArrowRight, Sparkle, Lightning, Buildings, Plus, Minus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { offers, faqs } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, staggerItemBlur, fadeInUp, easings } from "@/lib/animations";

// Plan icons mapping
const planIcons = [Lightning, Star, Buildings];

// Pricing card - Apple-like XL cards
function PricingCard({
  offer,
  index,
}: {
  offer: (typeof offers)[number];
  index: number;
}) {
  const Icon = planIcons[index];
  const isDark = offer.popular;

  return (
    <motion.div
      variants={staggerItemBlur}
      className={cn(
        "relative group",
        offer.popular && "z-10 md:-mt-4 md:mb-4"
      )}
    >
      <div
        className="h-full flex flex-col relative overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)"
            : "white",
          borderRadius: "var(--card-radius-xl)",
          padding: "32px",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.40)",
          boxShadow: isDark
            ? "var(--shadow-apple-xl)"
            : "var(--shadow-apple-lg)",
        }}
      >
        {/* Dark card inner glow */}
        {isDark && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
            }}
          />
        )}

        {/* Popular badge */}
        {offer.popular && (
          <motion.div
            className="absolute -top-px left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-b-xl text-xs font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                boxShadow: "0 4px 16px rgba(59, 130, 246, 0.35)",
              }}
            >
              <Sparkle className="h-3 w-3" weight="fill" />
              Recommandé
            </span>
          </motion.div>
        )}

        {/* Content */}
        <div className={cn("relative z-10 flex flex-col h-full", offer.popular && "pt-3")}>
          {/* Icon and name */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                background: isDark
                  ? "rgba(59, 130, 246, 0.20)"
                  : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              }}
            >
              <Icon className="h-6 w-6 text-white" weight="duotone" />
            </div>
            <h3
              className="text-xl font-semibold"
              style={{ color: isDark ? "white" : "#111111" }}
            >
              {offer.name}
            </h3>
          </div>

          {/* Description */}
          <p
            className="text-sm mb-5 leading-relaxed"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(17,17,17,0.6)" }}
          >
            {offer.description}
          </p>

          {/* Price */}
          <div
            className="text-2xl font-bold mb-6"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)"
                : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {offer.price}
          </div>

          {/* Features */}
          <ul className="space-y-2.5 mb-6 flex-grow">
            {offer.features.slice(0, 4).map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-start gap-2.5 text-sm"
                style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(17,17,17,0.6)" }}
              >
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                  style={{
                    background: isDark
                      ? "rgba(59, 130, 246, 0.25)"
                      : "rgba(59, 130, 246, 0.12)",
                  }}
                >
                  <Check
                    className="h-3 w-3"
                    style={{ color: isDark ? "rgba(59, 130, 246, 0.9)" : "#3b82f6" }}
                    weight="bold"
                  />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-sm rounded-xl transition-all duration-300"
            style={
              isDark
                ? {
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "white",
                    boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)",
                  }
                : {
                    background: "rgba(59, 130, 246, 0.08)",
                    color: "#3b82f6",
                    border: "1px solid rgba(59, 130, 246, 0.15)",
                  }
            }
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {offer.cta}
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// Compact FAQ accordion item
function FAQItemCompact({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="overflow-hidden transition-all duration-300"
      style={{
        background: "white",
        borderRadius: "var(--card-radius-lg)",
        border: isOpen
          ? "1px solid rgba(59, 130, 246, 0.25)"
          : "1px solid rgba(17, 17, 17, 0.08)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center gap-3"
      >
        <span
          className="flex-1 text-sm font-medium"
          style={{ color: isOpen ? "#3b82f6" : "#111111" }}
        >
          {faq.question}
        </span>
        <motion.div
          className="flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0"
          style={{
            background: isOpen ? "rgba(59, 130, 246, 0.12)" : "rgba(17, 17, 17, 0.04)",
            color: isOpen ? "#3b82f6" : "rgba(17, 17, 17, 0.4)",
          }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <Minus className="h-3 w-3" weight="bold" />
          ) : (
            <Plus className="h-3 w-3" weight="bold" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.3 }, opacity: { duration: 0.2 } }}
          >
            <div className="px-5 pb-4">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(17, 17, 17, 0.6)" }}
              >
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function OffersWithFAQ() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  // Show only first 5 FAQs for conciseness
  const displayedFAQs = faqs.slice(0, 5);

  return (
    <AnimatedSection
      id="offers"
      className="section-padding"
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
            Tarifs transparents
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
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Des offres </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>sans surprise</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(17, 17, 17, 0.6)" }}
          >
            Choisissez la formule adaptée à votre projet. Prix fixe, livraison garantie.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {offers.map((offer, index) => (
            <PricingCard key={offer.id} offer={offer} index={index} />
          ))}
        </motion.div>

        {/* FAQ Section - Integrated */}
        <motion.div
          className="max-w-3xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h3
              className="text-2xl font-semibold mb-2"
              style={{ color: "#111111" }}
            >
              Questions fréquentes
            </h3>
            <p
              className="text-sm"
              style={{ color: "rgba(17, 17, 17, 0.6)" }}
            >
              Tout ce que vous devez savoir avant de démarrer
            </p>
          </div>

          <div className="space-y-3">
            {displayedFAQs.map((faq, index) => (
              <FAQItemCompact
                key={index}
                faq={faq}
                index={index}
                isOpen={openFAQIndex === index}
                onToggle={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
              />
            ))}
          </div>

          {/* More questions link */}
          <motion.p
            className="text-center mt-6 text-sm"
            style={{ color: "rgba(17, 17, 17, 0.5)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            D&apos;autres questions ?{" "}
            <a
              href="#contact"
              className="font-medium hover:underline"
              style={{ color: "#3b82f6" }}
            >
              Contactez-nous
            </a>
          </motion.p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export default OffersWithFAQ;
