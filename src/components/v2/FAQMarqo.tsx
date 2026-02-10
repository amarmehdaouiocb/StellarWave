"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChatCircle } from "@phosphor-icons/react";
import { faqs, brand } from "@/config/brand";
import {
  fadeInLeft,
  fadeInRight,
  revealOnScroll,
  accordionContent,
  easings,
} from "@/lib/animations";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--electric-blue)]"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-[var(--foreground)] md:text-base">
          {question}
        </span>
        <div className="mt-0.5 flex-shrink-0">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: easings.smooth }}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--neutral-50)] text-[var(--neutral-500)] transition-colors"
          >
            {isOpen ? <Minus size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={accordionContent}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[var(--neutral-500)]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQMarqo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-white py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[40%_60%] lg:gap-20">
          {/* Left: Title + CTA */}
          <motion.div variants={fadeInLeft} {...revealOnScroll} className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl lg:text-5xl">
              Questions{" "}
              <span className="text-gradient">fréquentes</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--neutral-500)]">
              Tout ce que vous devez savoir avant de démarrer votre projet avec nous.
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--neutral-50)] p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--electric-blue)]/8 text-[var(--electric-blue)]">
                <ChatCircle size={22} weight="duotone" />
              </div>
              <h3 className="mb-2 font-display text-base font-semibold text-[var(--foreground)]">
                D&apos;autres questions ?
              </h3>
              <p className="mb-4 text-sm text-[var(--neutral-500)]">
                Notre équipe se tient à votre disposition pour répondre à toutes vos interrogations.
              </p>
              <a
                href={`mailto:${brand.contactEmail}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--electric-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--electric-blue-dark)] hover:shadow-lg"
              >
                Nous contacter
              </a>
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div variants={fadeInRight} {...revealOnScroll}>
            <div className="rounded-[var(--card-radius-xl)] border border-[var(--border)] bg-[var(--neutral-50)] p-6 md:p-8">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
