"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "Essentiel",
    description: "Parfait pour démarrer",
    price: 299,
    monthly: 19,
    popular: false,
    features: [
      "Site web professionnel",
      "Design responsive",
      "Domaine personnalisé",
      "Hébergement inclus",
      "Certificat SSL (https)",
      "Page contact",
      "Support par email",
    ],
    cta: "Commencer",
  },
  {
    name: "Pro",
    description: "Le plus populaire",
    price: 499,
    monthly: 29,
    popular: true,
    features: [
      "Tout de l'Essentiel +",
      "Réservations en ligne",
      "Formulaire de contact avancé",
      "Galerie photos",
      "Intégration Google Maps",
      "SEO local optimisé",
      "Support prioritaire",
      "Modifications illimitées",
    ],
    cta: "Choisir Pro",
  },
  {
    name: "Premium",
    description: "Pour les ambitieux",
    price: 799,
    monthly: 49,
    popular: false,
    features: [
      "Tout de Pro +",
      "Menu en ligne (restaurants)",
      "Système de fidélité",
      "Sync Google Business",
      "Analytics avancés",
      "Multi-langues",
      "Support téléphonique",
      "Account manager dédié",
    ],
    cta: "Choisir Premium",
  },
];

function PricingCard({
  plan,
  index,
  isInView,
}: {
  plan: (typeof plans)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className={`relative ${plan.popular ? "lg:-mt-8 lg:mb-8" : ""}`}
    >
      {plan.popular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold text-white shadow-lg"
            style={{ background: "var(--gradient-accent)", boxShadow: "0 8px 24px var(--accent-glow)" }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Le plus populaire
          </span>
        </div>
      )}

      <div
        className="relative h-full glass-card overflow-hidden transition-all duration-500"
        style={{
          borderColor: plan.popular ? "var(--accent-primary)" : undefined,
          borderWidth: plan.popular ? "1px" : undefined,
        }}
      >
        {plan.popular && (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, var(--accent-subtle), transparent)" }}
          />
        )}

        <div className="relative p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
              {plan.name}
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>{plan.description}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {plan.price}&euro;
              </span>
              <span style={{ color: "var(--text-secondary)" }}>setup</span>
            </div>
            <div className="mt-2" style={{ color: "var(--text-secondary)" }}>
              + <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{plan.monthly}&euro;</span>/mois
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ color: plan.popular ? "var(--accent-primary)" : "#10b981" }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span style={{ color: "var(--text-secondary)" }}>{feature}</span>
              </li>
            ))}
          </ul>

          <motion.button
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              plan.popular ? "btn-primary" : ""
            }`}
            style={
              !plan.popular
                ? {
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }
                : undefined
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {plan.cta}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--accent-subtle), transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "var(--accent-subtle)", color: "var(--accent-primary)" }}
          >
            Tarifs transparents
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Un prix juste,
            <br />
            <span className="text-gradient">sans surprise</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Pas de frais cachés. La preview est gratuite, vous ne payez que si vous êtes satisfait.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl"
            style={{
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.15)",
            }}
          >
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="text-left">
              <p className="font-semibold">Satisfait ou remboursé</p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                30 jours pour changer d&apos;avis, sans questions
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
