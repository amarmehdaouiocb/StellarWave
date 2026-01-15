"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { faqs, brand } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { fadeInUp, staggerContainer, staggerItemBlur, easings } from "@/lib/animations";
import { ChatCircle, Plus, Minus, Question } from "@phosphor-icons/react";

// Premium accordion item component
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
          "rounded-2xl overflow-hidden transition-all duration-500",
          "bg-white/[0.02] border border-white/5",
          isOpen
            ? "bg-white/[0.04] border-[var(--ember-amber)]/20 shadow-glow-cyan/10"
            : "hover:bg-white/[0.03] hover:border-white/10"
        )}
        layout
      >
        {/* Question / Trigger */}
        <button
          onClick={onToggle}
          className="w-full text-left px-6 py-5 flex items-center gap-4"
        >
          {/* Number indicator */}
          <motion.div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300",
              isOpen
                ? "bg-gradient-to-br from-[var(--ember-amber)] to-[var(--ember-rose)] text-white"
                : "bg-white/5 text-muted-foreground group-hover:bg-white/10"
            )}
            animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.4, ease: easings.smooth }}
          >
            <span className="text-sm font-bold">
              {(index + 1).toString().padStart(2, "0")}
            </span>
          </motion.div>

          {/* Question text */}
          <span
            className={cn(
              "flex-1 text-lg font-medium transition-colors duration-300",
              isOpen
                ? "text-gradient-hero"
                : "text-foreground group-hover:text-[var(--ember-amber)]"
            )}
          >
            {faq.question}
          </span>

          {/* Toggle icon */}
          <motion.div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
              isOpen
                ? "bg-[var(--ember-amber)]/20 text-[var(--ember-amber)]"
                : "bg-white/5 text-muted-foreground"
            )}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: easings.smooth }}
          >
            {isOpen ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
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
              <div className="px-6 pb-6 pl-20">
                {/* Decorative line */}
                <div className="w-12 h-px bg-gradient-to-r from-[var(--ember-amber)] to-transparent mb-4" />

                <motion.p
                  className="text-muted-foreground text-body-relaxed leading-relaxed"
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
    <AnimatedSection id="faq" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[var(--ember-amber)] opacity-5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[var(--ember-coral)] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="relative container-wide lg:pl-64">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-highlight text-sm font-medium text-muted-foreground mb-6 shadow-premium-sm"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easings.smooth }}
              >
                <Question className="h-4 w-4 text-[var(--ember-amber)]" weight="duotone" />
                FAQ
              </motion.span>

              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-display">
                Questions{" "}
                <span className="text-gradient-hero">fréquentes</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-body-relaxed">
                Vous avez d&apos;autres questions ? N&apos;hésitez pas à nous
                contacter directement.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-8 p-4 rounded-xl glass-highlight">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">
                    {faqs.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">&lt;24h</div>
                  <div className="text-xs text-muted-foreground">Réponse</div>
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
              <p className="text-sm text-muted-foreground">
                Vous ne trouvez pas votre réponse ?{" "}
                <a
                  href={`mailto:${brand.contactEmail}`}
                  className="text-[var(--ember-amber)] hover:text-[var(--ember-coral)] transition-colors font-medium"
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
