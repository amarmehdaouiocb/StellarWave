"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "Combien de temps faut-il pour avoir mon site ?",
    a: "Votre preview est prête en moins de 24h après soumission du formulaire. Une fois validée, la mise en ligne prend quelques heures. Du formulaire au site live : moins de 48h.",
  },
  {
    q: "Dois-je avoir des compétences techniques ?",
    a: "Absolument pas. Vous nous donnez le nom de votre commerce, votre activité et vos coordonnées. On s'occupe de tout le reste : design, développement, hébergement, nom de domaine.",
  },
  {
    q: "Que se passe-t-il si la preview ne me plaît pas ?",
    a: "La preview est 100% gratuite et sans engagement. Si elle ne vous convient pas, vous ne payez rien. Nous proposons également des ajustements gratuits pour affiner le résultat.",
  },
  {
    q: "Est-ce que je peux modifier mon site après la mise en ligne ?",
    a: "Bien sûr ! Selon votre forfait, vous bénéficiez de modifications incluses. Pour le forfait Pro et Premium, les modifications sont illimitées.",
  },
  {
    q: "Qu'est-ce qui est inclus dans le prix mensuel ?",
    a: "L'hébergement, le certificat SSL (https), la maintenance, les mises à jour de sécurité, le support technique et la sauvegarde quotidienne de votre site.",
  },
  {
    q: "Puis-je utiliser mon propre nom de domaine ?",
    a: "Oui ! Si vous avez déjà un nom de domaine, nous le configurons pour vous. Sinon, nous vous aidons à en choisir un et l'incluons dans votre forfait.",
  },
  {
    q: "Comment fonctionne le système de réservation ?",
    a: "Disponible avec les forfaits Pro et Premium, il permet à vos clients de réserver directement depuis votre site. Vous recevez une notification par email et pouvez gérer vos créneaux facilement.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="faq-item"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span
          className="text-lg font-semibold pr-8 transition-colors duration-200"
          style={{
            fontFamily: "var(--font-display)",
            color: isOpen ? "var(--accent-primary)" : "var(--text-primary)",
          }}
        >
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            background: isOpen ? "var(--accent-subtle)" : "var(--bg-elevated)",
            color: isOpen ? "var(--accent-primary)" : "var(--text-muted)",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-6 leading-relaxed max-w-3xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6">
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
            Questions fréquentes
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Vous avez des questions ?
            <br />
            <span className="text-gradient">On a les réponses</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Tout ce que vous devez savoir avant de vous lancer.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="glass-card p-2 sm:p-4">
          <div className="px-4 sm:px-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
