"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import ParticleField from "./ParticleField";

// ── Typewriter hook ──
const WORDS = ["professionnel", "moderne", "performant", "unique"];
const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 400;

function useTypewriter() {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplay(word.slice(0, display.length + 1));
          if (display.length + 1 === word.length) {
            setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
            return;
          }
        } else {
          setDisplay(word.slice(0, display.length - 1));
          if (display.length - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % WORDS.length);
            return;
          }
        }
      },
      isDeleting ? DELETE_SPEED : TYPE_SPEED
    );

    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIndex]);

  return display;
}

// ── Form steps ──
const BUSINESS_TYPES = [
  "Restaurant",
  "Salon de coiffure",
  "Boulangerie / Pâtisserie",
  "Institut de beauté",
  "Boutique / Commerce",
  "Artisan / Freelance",
  "Cabinet médical",
  "Autre",
];

type FormData = {
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  style: string;
  message: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export default function Hero() {
  const typedWord = useTypewriter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessType: "",
    email: "",
    phone: "",
    style: "moderne",
    message: "",
  });

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      nextStep();
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };

  const canProceed = () => {
    if (step === 0) return formData.businessName.length > 0 && formData.businessType.length > 0;
    if (step === 1) return formData.email.length > 0;
    return true;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle background */}
      <ParticleField />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/40 to-[var(--bg-primary)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/60 via-transparent to-[var(--bg-primary)]/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "var(--accent-subtle)",
                  border: "1px solid var(--accent-glow)",
                  color: "var(--accent-primary)",
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent-primary)" }} />
                Plus de 2 500 commerces accompagnés
              </span>
            </motion.div>

            {/* Headline with typewriter */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Votre site web
              <br />
              <span className="text-gradient">{typedWord}</span>
              <span
                className="inline-block w-[3px] h-[0.85em] ml-1 align-middle"
                style={{
                  background: "var(--accent-primary)",
                  animation: "typewriter-blink 1s step-end infinite",
                }}
              />
              <br />
              en 24 heures
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Obtenez une preview gratuite de votre futur site. Pas de
              compétences techniques requises, pas d&apos;engagement.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {["Preview gratuite", "Sans engagement", "Livré en 24h"].map(
                (text) => (
                  <div key={text} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{text}</span>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Right — Multi-step form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="glass-card glow-border p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-6">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Demandez votre preview gratuite
                </h2>
                <p style={{ color: "var(--text-secondary)" }}>
                  {step === 0 && "Parlez-nous de votre commerce"}
                  {step === 1 && "Comment vous contacter ?"}
                  {step === 2 && "Dernières préférences"}
                </p>
              </div>

              {/* Step indicators */}
              <div className="flex items-center justify-center gap-3 mb-8">
                {[0, 1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className={`step-dot ${
                        s === step ? "active" : s < step ? "completed" : "pending"
                      }`}
                    />
                    {s < 2 && (
                      <div
                        className="w-8 h-0.5 rounded-full transition-colors duration-300"
                        style={{
                          background:
                            s < step
                              ? "var(--accent-primary)"
                              : "var(--border-subtle)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait" custom={direction}>
                  {/* Step 0: Business info */}
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <label htmlFor="business" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                          Nom de votre commerce
                        </label>
                        <input
                          type="text"
                          id="business"
                          value={formData.businessName}
                          onChange={(e) => updateField("businessName", e.target.value)}
                          placeholder="Ex: Restaurant Le Petit Bistrot"
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                          Type d&apos;activité
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {BUSINESS_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => updateField("businessType", type)}
                              className="px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                              style={{
                                background:
                                  formData.businessType === type
                                    ? "var(--accent-subtle)"
                                    : "var(--bg-elevated)",
                                border: `1px solid ${
                                  formData.businessType === type
                                    ? "var(--accent-primary)"
                                    : "var(--border-subtle)"
                                }`,
                                color:
                                  formData.businessType === type
                                    ? "var(--accent-primary)"
                                    : "var(--text-secondary)",
                              }}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1: Contact */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                          Votre email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="vous@exemple.com"
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                          Téléphone <span style={{ color: "var(--text-muted)" }}>(optionnel)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="06 12 34 56 78"
                          className="input-field"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Preferences */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                          Style souhaité
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "moderne", label: "Moderne", emoji: "✨" },
                            { id: "classique", label: "Classique", emoji: "🏛️" },
                            { id: "coloré", label: "Coloré", emoji: "🎨" },
                          ].map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => updateField("style", s.id)}
                              className="flex flex-col items-center gap-1.5 px-3 py-4 rounded-xl text-sm font-medium transition-all duration-200"
                              style={{
                                background:
                                  formData.style === s.id
                                    ? "var(--accent-subtle)"
                                    : "var(--bg-elevated)",
                                border: `1px solid ${
                                  formData.style === s.id
                                    ? "var(--accent-primary)"
                                    : "var(--border-subtle)"
                                }`,
                                color:
                                  formData.style === s.id
                                    ? "var(--accent-primary)"
                                    : "var(--text-secondary)",
                              }}
                            >
                              <span className="text-xl">{s.emoji}</span>
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                          Message <span style={{ color: "var(--text-muted)" }}>(optionnel)</span>
                        </label>
                        <textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          placeholder="Dites-nous en plus sur votre projet..."
                          className="input-field"
                          rows={3}
                          style={{ resize: "none" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-6">
                  {step > 0 && (
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary py-3 px-5"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                  )}

                  <motion.button
                    type="submit"
                    disabled={!canProceed() || isSubmitting}
                    className="btn-primary flex-1 py-3"
                    whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                    whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                    style={{
                      opacity: canProceed() ? 1 : 0.5,
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : step < 2 ? (
                      <>
                        Continuer
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Recevoir ma preview gratuite
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </div>

                <p className="text-xs text-center mt-4" style={{ color: "var(--text-muted)" }}>
                  En soumettant ce formulaire, vous acceptez d&apos;être contacté par email.
                  Pas de spam, promis.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full flex items-start justify-center p-1"
          style={{ border: "2px solid var(--text-muted)" }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ background: "var(--accent-primary)" }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
