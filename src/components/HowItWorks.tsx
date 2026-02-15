"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Dites-nous qui vous êtes",
    description:
      "Remplissez notre formulaire en 2 minutes. Nom de votre commerce, activité, coordonnées. C'est tout ce dont nous avons besoin.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "On crée votre site",
    description:
      "Notre équipe génère une maquette complète en moins de 24h. Design professionnel, contenu adapté, prêt à être mis en ligne.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Vous validez la preview",
    description:
      "Recevez un lien vers votre preview par email. Ajustements gratuits inclus. Vous ne payez que si vous êtes satisfait.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Mise en ligne instantanée",
    description:
      "Un paiement, et votre site est live. Domaine personnalisé, hébergement inclus, et support continu.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "var(--accent-subtle)", color: "var(--accent-primary)" }}
          >
            Comment ça marche
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            4 étapes simples vers
            <br />
            <span className="text-gradient">votre nouveau site</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            De votre demande à un site en ligne, tout se passe en moins de 48h.
          </p>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Connection line */}
          <div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2"
            style={{
              background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)",
            }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative"
              >
                <div className="relative glass-card p-8 h-full group hover:bg-[var(--bg-card-hover)] transition-all duration-500">
                  <div className="relative z-10 mb-6">
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg"
                      style={{
                        background: "var(--gradient-accent)",
                        boxShadow: "0 8px 24px var(--accent-glow)",
                      }}
                    >
                      <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {step.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.description}
                  </p>

                  <div
                    className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {step.icon}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: "var(--accent-primary)", opacity: 0.5 }}>
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a href="#top" className="btn-primary inline-flex">
            Commencer maintenant
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
