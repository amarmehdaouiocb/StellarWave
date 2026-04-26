"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import type { CaseStudy } from "@/content/case-studies";
import "./CaseStudyModal.css";

type Props = {
  study: CaseStudy;
  onClose: () => void;
};

export function CaseStudyModal({ study, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const Icon = study.Icon;

  // ESC pour fermer + lock du scroll body + restore focus à la fermeture
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus initial sur le bouton close (focus trap minimal)
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Fermer uniquement sur click DIRECT sur le backdrop (pas un descendant)
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      className="csm-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onBackdropClick}
      role="presentation"
    >
      <motion.div
        ref={modalRef}
        className="csm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-study-${study.slug}-title`}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Hero gradient — reprend le gradient de la card source */}
        <div
          className="csm-hero"
          style={{ background: study.gradient, color: study.accent }}
        >
          {study.illustration && (
            <div
              className="csm-hero-illustration"
              style={{ backgroundImage: `url("${study.illustration}")` }}
              aria-hidden
            />
          )}
          <div className="csm-hero-glow" aria-hidden />

          <button
            ref={closeButtonRef}
            type="button"
            className="csm-close"
            onClick={onClose}
            aria-label="Fermer le cas d'étude"
          >
            <X weight="bold" />
          </button>

          <motion.span
            className="csm-category"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon weight="fill" />
            {study.category}
          </motion.span>

          <motion.h2
            id={`case-study-${study.slug}-title`}
            className="csm-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {study.title}
          </motion.h2>

          <motion.p
            className="csm-tagline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {study.tagline}
          </motion.p>
        </div>

        {/* Body — 3 sections + stack */}
        <div className="csm-body">
          <motion.section
            className="csm-section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="csm-section-label">01 — La société</p>
            <h3 className="csm-section-title">Le contexte</h3>
            <p className="csm-section-text">{study.sections.company}</p>
          </motion.section>

          <motion.section
            className="csm-section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.50, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="csm-section-label">02 — Le besoin</p>
            <h3 className="csm-section-title">Le painpoint</h3>
            <p className="csm-section-text">{study.sections.need}</p>
          </motion.section>

          <motion.section
            className="csm-section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="csm-section-label">03 — La solution</p>
            <h3 className="csm-section-title">Ce qu&rsquo;on a livré</h3>
            <p className="csm-section-text">{study.sections.solution}</p>

            <div className="csm-stack" aria-label="Stack technique">
              {study.sections.stack.map((item) => (
                <span key={item} className="csm-stack-badge">
                  {item}
                </span>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CaseStudyModal;
