"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "En 24h, j'avais un site magnifique. Mes clients me trouvent maintenant sur Google et mes réservations ont doublé.",
    author: "Marie Laurent",
    role: "Restaurant Le Petit Jardin",
    location: "Lyon",
    avatar: "ML",
    rating: 5,
  },
  {
    quote: "Je repoussais la création d'un site depuis des années. Simplisite a tout simplifié. Le résultat est exactement ce que je voulais.",
    author: "Thomas Dubois",
    role: "Salon de coiffure TD",
    location: "Paris",
    avatar: "TD",
    rating: 5,
  },
  {
    quote: "Le support est incroyable. Chaque modification est faite en quelques heures. Je recommande à tous les commerçants.",
    author: "Sophie Martin",
    role: "Boutique Fleurs & Sens",
    location: "Bordeaux",
    avatar: "SM",
    rating: 5,
  },
  {
    quote: "Rapport qualité-prix imbattable. Mon ancien prestataire me facturait 3x plus cher pour un site moins bien.",
    author: "Pierre Moreau",
    role: "Boulangerie du Marché",
    location: "Nantes",
    avatar: "PM",
    rating: 5,
  },
  {
    quote: "La preview gratuite m'a convaincu. J'ai pu voir exactement à quoi ressemblerait mon site avant de payer.",
    author: "Julie Petit",
    role: "Institut Beauté Julie",
    location: "Marseille",
    avatar: "JP",
    rating: 5,
  },
  {
    quote: "En tant que pizzeria, j'avais besoin d'un site avec mon menu. Ils ont tout intégré parfaitement.",
    author: "Marco Rossi",
    role: "Pizzeria Bella Napoli",
    location: "Nice",
    avatar: "MR",
    rating: 5,
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
      className="glass-card p-8 h-full flex flex-col group hover:bg-[var(--bg-card-hover)] transition-all duration-400"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--accent-primary)" }}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-lg leading-relaxed flex-grow mb-6" style={{ color: "var(--text-secondary)" }}>
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
          style={{ background: "var(--gradient-accent)" }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold">{testimonial.author}</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {testimonial.role} &bull; {testimonial.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
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
            Témoignages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ils nous font confiance
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Plus de 2 500 commerces nous ont choisi. Découvrez ce qu&apos;ils en pensent.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "2 500+", label: "Commerces accompagnés" },
            { value: "98%", label: "Satisfaction client" },
            { value: "24h", label: "Délai moyen de livraison" },
            { value: "4.9/5", label: "Note moyenne" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gradient mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {stat.value}
              </p>
              <p style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
