"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { faqs, brand } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { fadeInUp, staggerContainer, staggerItemBlur, easings } from "@/lib/animations";
import { ChatCircle, Plus, Minus, Question } from "@phosphor-icons/react";

// Premium accordion item - Apple-like XL cards
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
        className="overflow-hidden transition-all duration-300"
        style={{
          background: "white",
          borderRadius: "var(--card-radius-xl)",
          border: isOpen
            ? "1px solid rgba(102, 126, 234, 0.25)"
            : "1px solid rgba(255, 255, 255, 0.40)",
          boxShadow: isOpen
            ? "var(--shadow-apple-lg)"
            : "var(--shadow-apple-md)",
        }}
        layout
      >
        {/* Question / Trigger */}
        <button
          onClick={onToggle}
          className="w-full text-left px-8 py-6 flex items-center gap-4"
        >
          {/* Number indicator - Gradient style */}
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300"
            style={{
              background: isOpen
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "rgba(102, 126, 234, 0.08)",
              color: isOpen ? "white" : "#667eea"
            }}
          >
            <span className="text-sm font-bold">
              {(index + 1).toString().padStart(2, "0")}
            </span>
          </div>

          {/* Question text */}
          <span
            className="flex-1 text-lg font-medium transition-colors duration-300"
            style={{
              color: isOpen ? "#667eea" : "#111111"
            }}
          >
            {faq.question}
          </span>

          {/* Toggle icon */}
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
            style={{
              background: isOpen ? "rgba(102, 126, 234, 0.12)" : "rgba(17, 17, 17, 0.04)",
              color: isOpen ? "#667eea" : "rgba(17, 17, 17, 0.4)"
            }}
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
                  className="leading-relaxed text-[15px]"
                  style={{ color: "rgba(17, 17, 17, 0.6)" }}
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
    <AnimatedSection
      id="faq"
      className="section-padding"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
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
              {/* Badge - Glass style */}
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium mb-8"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easings.smooth }}
                style={{
                  background: "rgba(255, 255, 255, 0.80)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.60)",
                  boxShadow: "var(--shadow-apple-sm)",
                  color: "rgba(17, 17, 17, 0.6)"
                }}
              >
                <Question className="h-4 w-4" style={{ color: "#667eea" }} weight="duotone" />
                FAQ
              </motion.span>

              {/* Editorial two-tone title */}
              <h2
                className="mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.03em"
                }}
              >
                <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Questions </span>
                <span style={{ color: "#111111", fontWeight: 600 }}>fréquentes</span>
              </h2>
              <p
                className="mb-8 leading-relaxed"
                style={{ color: "rgba(17, 17, 17, 0.6)" }}
              >
                Vous avez d&apos;autres questions ? N&apos;hésitez pas à nous
                contacter directement.
              </p>

              {/* Stats - Glass panel */}
              <div
                className="flex items-center gap-6 mb-8 p-5 rounded-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.80)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.60)",
                  boxShadow: "var(--shadow-apple-md)",
                }}
              >
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    {faqs.length}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(17, 17, 17, 0.5)" }}>Questions</div>
                </div>
                <div className="h-10 w-px" style={{ background: "rgba(17, 17, 17, 0.1)" }} />
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    &lt;24h
                  </div>
                  <div className="text-xs" style={{ color: "rgba(17, 17, 17, 0.5)" }}>Réponse</div>
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
