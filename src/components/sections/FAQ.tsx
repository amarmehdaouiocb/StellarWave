"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { faqs, brand } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { fadeInUp, staggerContainer, staggerItemBlur, easings } from "@/lib/animations";
import { ChatCircle, Plus, Minus, Question } from "@phosphor-icons/react";

// Premium accordion item - Light theme
function FAQItem({
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
    <motion.div
      variants={staggerItemBlur}
      className="group"
    >
      <motion.div
        className={cn(
          "rounded-3xl overflow-hidden transition-all duration-500",
          "bg-white border",
          isOpen
            ? "border-[var(--electric-blue)]/30"
            : "border-[oklch(0_0_0_/_6%)] hover:border-[var(--electric-blue)]/20"
        )}
        style={{
          boxShadow: isOpen
            ? "0 8px 30px -4px oklch(0.55 0.25 255 / 10%), 0 20px 60px -12px oklch(0.2 0.01 250 / 8%)"
            : "0 4px 20px -4px oklch(0.2 0.01 250 / 8%), 0 12px 40px -8px oklch(0.2 0.01 250 / 6%)",
        }}
        layout
      >
        {/* Question / Trigger */}
        <button
          onClick={onToggle}
          className="w-full text-left px-8 py-6 flex items-center gap-4"
        >
          {/* Number indicator */}
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300",
              isOpen
                ? "bg-[var(--electric-blue)] text-white"
                : "bg-[var(--neutral-100)] text-[var(--neutral-500)] group-hover:bg-[var(--electric-blue)]/10 group-hover:text-[var(--electric-blue)]"
            )}
          >
            <span className="text-sm font-bold">
              {(index + 1).toString().padStart(2, "0")}
            </span>
          </div>

          {/* Question text */}
          <span
            className={cn(
              "flex-1 text-lg font-medium transition-colors duration-300",
              isOpen
                ? "text-[var(--electric-blue)]"
                : "text-[var(--accent-dark)] group-hover:text-[var(--electric-blue)]"
            )}
          >
            {faq.question}
          </span>

          {/* Toggle icon */}
          <motion.div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
              isOpen
                ? "bg-[var(--electric-blue)]/15 text-[var(--electric-blue)]"
                : "bg-[var(--neutral-100)] text-[var(--neutral-500)]"
            )}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: easings.smooth }}
          >
            {isOpen ? (
              <Minus className="h-4 w-4" weight="bold" />
            ) : (
              <Plus className="h-4 w-4" weight="bold" />
            )}
          </motion.div>
        </button>

        {/* Answer / Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: easings.smooth },
                opacity: { duration: 0.3, delay: isOpen ? 0.1 : 0 },
              }}
            >
              <div className="px-8 pb-8 pl-24">
                <motion.p
                  className="text-[var(--neutral-500)] leading-relaxed"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AnimatedSection id="faq" className="section-padding bg-[var(--background)]">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left column - Header */}
          <motion.div
            className="lg:col-span-1"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="sticky top-32">
              {/* Badge */}
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[oklch(0_0_0_/_8%)] text-sm font-medium text-[var(--neutral-600)] mb-6"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easings.smooth }}
                style={{
                  boxShadow: "0 2px 8px oklch(0.2 0.01 250 / 4%)",
                }}
              >
                <Question className="h-4 w-4 text-[var(--electric-blue)]" weight="duotone" />
                FAQ
              </motion.span>

              <h2 className="text-display-mega text-[var(--accent-dark)] mb-6">
                Questions{" "}
                <span className="text-gradient-hero">fréquentes</span>
              </h2>
              <p className="text-[var(--neutral-500)] mb-8 leading-relaxed">
                Vous avez d&apos;autres questions ? N&apos;hésitez pas à nous
                contacter directement.
              </p>

              {/* Stats */}
              <div
                className="flex items-center gap-6 mb-8 p-4 rounded-xl bg-white border border-[oklch(0_0_0_/_8%)]"
                style={{
                  boxShadow: "0 2px 8px oklch(0.2 0.01 250 / 4%)",
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient-hero">
                    {faqs.length}
                  </div>
                  <div className="text-xs text-[var(--neutral-500)]">Questions</div>
                </div>
                <div className="h-10 w-px bg-[var(--neutral-200)]" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient-hero">&lt;24h</div>
                  <div className="text-xs text-[var(--neutral-500)]">Réponse</div>
                </div>
              </div>

              <CTAButton
                variant="secondary"
                icon={<ChatCircle className="h-4 w-4" weight="duotone" />}
                href={`mailto:${brand.contactEmail}`}
              >
                Poser une question
              </CTAButton>
            </div>
          </motion.div>

          {/* Right column - Accordion */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}

            {/* Bottom help text */}
            <motion.div
              className="text-center pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-[var(--neutral-500)]">
                Vous ne trouvez pas votre réponse ?{" "}
                <a
                  href={`mailto:${brand.contactEmail}`}
                  className="text-[var(--electric-blue)] hover:text-[var(--electric-blue-dark)] transition-colors font-medium"
                >
                  Contactez-nous
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
