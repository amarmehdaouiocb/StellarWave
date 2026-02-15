"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Mise en ligne en 24h",
    description: "Votre site est prêt en moins d'une journée. Pas de délais interminables, pas de réunions inutiles.",
    gradient: "from-amber-500 to-orange-500",
    accentColor: "#f59e0b",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "100% responsive",
    description: "Parfait sur mobile, tablette et ordinateur. Vos clients vous trouvent partout.",
    gradient: "from-blue-500 to-cyan-500",
    accentColor: "#3b82f6",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Optimisé pour Google",
    description: "Référencement local inclus. Apparaissez dans les premiers résultats de votre zone.",
    gradient: "from-emerald-500 to-teal-500",
    accentColor: "#10b981",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Réservations en ligne",
    description: "Vos clients réservent directement. Moins d'appels, plus de temps pour votre métier.",
    gradient: "from-violet-500 to-purple-500",
    accentColor: "#8b5cf6",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Design sur-mesure",
    description: "Un design unique qui reflète l'identité de votre commerce. Pas de template générique.",
    gradient: "from-pink-500 to-rose-500",
    accentColor: "#ec4899",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Support inclus",
    description: "Une question ? Notre équipe répond en moins de 2h. Vous n'êtes jamais seul.",
    gradient: "from-amber-500 to-yellow-500",
    accentColor: "#f59e0b",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="group relative glass-card p-8 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      {/* Gradient border on hover */}
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} p-[1px]`}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full h-full rounded-3xl" style={{ background: "var(--bg-primary)" }} />
      </motion.div>

      {/* Corner glow */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: feature.accentColor, filter: "blur(40px)" }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6`}
          animate={{ rotate: isHovered ? 5 : 0, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white">{feature.icon}</span>
        </motion.div>

        <h3
          className="text-xl font-bold mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {feature.title}
        </h3>
        <p style={{ color: "var(--text-secondary)" }} className="leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Decorative number */}
      <span
        className="absolute top-6 right-6 text-6xl font-bold select-none"
        style={{ color: "var(--text-primary)", opacity: 0.03 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(232, 147, 12, 0.04)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "var(--accent-subtle)",
              color: "var(--accent-primary)",
            }}
          >
            Pourquoi nous choisir
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tout ce dont vous avez besoin,
            <br />
            <span className="text-gradient">rien de superflu</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Un site professionnel ne devrait pas coûter des milliers d&apos;euros ni
            prendre des mois. Voici ce qui est inclus.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
