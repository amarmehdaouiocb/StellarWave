"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeSimple, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { fadeInUp, revealOnScroll } from "@/lib/animations";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="relative bg-[var(--apple-bg)] py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          {...revealOnScroll}
          className="mx-auto max-w-xl text-center"
        >
          <div className="mb-5 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--electric-blue)]/8 text-[var(--electric-blue)]">
              <EnvelopeSimple size={24} weight="duotone" />
            </div>
          </div>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
            Restez informés de nos{" "}
            <span className="text-gradient">dernières réalisations</span>
          </h2>
          <p className="mt-3 text-sm text-[var(--neutral-500)]">
            Recevez nos études de cas, insights et bonnes pratiques directement dans votre boîte mail.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm font-medium text-emerald-700"
            >
              <CheckCircle size={20} weight="fill" />
              Merci ! Vous recevrez nos prochaines actualités.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
              <div className="relative flex-1">
                <EnvelopeSimple
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full rounded-xl border border-[var(--border)] bg-white py-3.5 pr-4 pl-11 text-sm text-[var(--foreground)] placeholder:text-[var(--neutral-400)] shadow-[var(--shadow-xs)] transition-all focus:border-[var(--electric-blue)] focus:ring-2 focus:ring-[var(--electric-blue)]/15 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[var(--electric-blue)] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--electric-blue-dark)] hover:shadow-lg"
              >
                S&apos;inscrire
                <ArrowRight size={16} weight="bold" />
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-[var(--neutral-400)]">
            Pas de spam. Désinscription en un clic.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
