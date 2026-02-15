"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const showcases = [
  {
    name: "Le Petit Jardin",
    type: "Restaurant",
    color: "from-emerald-500/20 to-teal-500/10",
    accent: "#10b981",
    description: "Site vitrine avec menu en ligne, réservations et galerie photos.",
    features: ["Menu interactif", "Réservation", "Galerie"],
  },
  {
    name: "Studio Éclat",
    type: "Salon de coiffure",
    color: "from-pink-500/20 to-rose-500/10",
    accent: "#ec4899",
    description: "Prise de rendez-vous en ligne et présentation des prestations.",
    features: ["Rendez-vous", "Tarifs", "Portfolio"],
  },
  {
    name: "Maison Dorée",
    type: "Boulangerie",
    color: "from-amber-500/20 to-yellow-500/10",
    accent: "#f59e0b",
    description: "Vitrine produits, commandes spéciales et programme fidélité.",
    features: ["Catalogue", "Commandes", "Fidélité"],
  },
  {
    name: "Dr. Martin",
    type: "Cabinet médical",
    color: "from-blue-500/20 to-cyan-500/10",
    accent: "#3b82f6",
    description: "Prise de rendez-vous, informations pratiques et spécialités.",
    features: ["Rendez-vous", "Spécialités", "Accès"],
  },
  {
    name: "L'Atelier Floral",
    type: "Fleuriste",
    color: "from-violet-500/20 to-purple-500/10",
    accent: "#8b5cf6",
    description: "Catalogue de créations, commandes en ligne et livraison.",
    features: ["Catalogue", "Livraison", "Sur-mesure"],
  },
  {
    name: "Fit & Form",
    type: "Salle de sport",
    color: "from-orange-500/20 to-red-500/10",
    accent: "#f97316",
    description: "Planning des cours, abonnements et espace membre.",
    features: ["Planning", "Abonnements", "Coachs"],
  },
];

function ShowcaseCard({
  site,
  index,
}: {
  site: (typeof showcases)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card overflow-hidden h-full">
        {/* Site preview mockup */}
        <div
          className={`relative aspect-[4/3] bg-gradient-to-br ${site.color} p-4 sm:p-6 overflow-hidden`}
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            <div
              className="ml-2 flex-1 h-5 rounded-md max-w-48"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div className="h-full flex items-center px-2">
                <span className="text-[9px] opacity-40" style={{ color: site.accent }}>
                  www.{site.name.toLowerCase().replace(/[^a-z]/g, "")}.fr
                </span>
              </div>
            </div>
          </div>

          {/* Mockup content */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded" style={{ background: site.accent, opacity: 0.4 }} />
              <div className="w-20 h-2 rounded-full" style={{ background: site.accent, opacity: 0.2 }} />
            </div>
            <div className="w-3/4 h-3 rounded-full bg-white/15" />
            <div className="w-full h-5 rounded-full bg-white/10" />
            <div className="w-2/3 h-5 rounded-full" style={{ background: `${site.accent}20` }} />
            <div className="flex gap-2 mt-3">
              <div className="w-16 h-6 rounded-lg" style={{ background: `${site.accent}40` }} />
              <div className="w-16 h-6 rounded-lg bg-white/10" />
            </div>
          </div>

          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle at 50% 80%, ${site.accent}15, transparent 60%)`,
            }}
          />
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {site.name}
            </h3>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                background: `${site.accent}15`,
                color: site.accent,
              }}
            >
              {site.type}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            {site.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {site.features.map((f) => (
              <span
                key={f}
                className="text-xs px-2.5 py-1 rounded-lg"
                style={{
                  background: "var(--bg-elevated)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  const ref = useRef(null);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "var(--accent-subtle)",
              color: "var(--accent-primary)",
            }}
          >
            Nos réalisations
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Des sites qui{" "}
            <span className="text-gradient">convertissent</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Chaque commerce est unique. Voici quelques exemples de sites
            créés pour nos clients.
          </p>
        </motion.div>

        {/* Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map((site, index) => (
            <ShowcaseCard key={index} site={site} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
