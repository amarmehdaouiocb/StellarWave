"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";

export function PremiumContact() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section id="contact" className="py-32 bg-[#09090b] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--ember-amber)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter mb-6 text-white">
            Prêt à faire <span className="text-[var(--ember-amber)]">des vagues ?</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Parlez-nous de votre projet. Nous répondons sous 24h.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-zinc-950/50 backdrop-blur-xl shadow-2xl"
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="relative">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === 'name' ? '-top-6 text-xs text-[var(--ember-amber)]' : 'top-2 text-zinc-500'}`}>
                  Nom complet
                </label>
                <input 
                  type="text" 
                  onFocus={() => setFocused('name')}
                  onBlur={(e) => setFocused(e.target.value ? 'name' : null)}
                  className="w-full bg-transparent border-b border-white/10 focus:border-[var(--ember-amber)] py-2 text-white outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === 'email' ? '-top-6 text-xs text-[var(--ember-amber)]' : 'top-2 text-zinc-500'}`}>
                  Email professionnel
                </label>
                <input 
                  type="email" 
                  onFocus={() => setFocused('email')}
                  onBlur={(e) => setFocused(e.target.value ? 'email' : null)}
                  className="w-full bg-transparent border-b border-white/10 focus:border-[var(--ember-amber)] py-2 text-white outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div className="relative mt-12">
              <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === 'message' ? '-top-6 text-xs text-[var(--ember-amber)]' : 'top-2 text-zinc-500'}`}>
                Parlez-nous de votre projet...
              </label>
              <textarea 
                rows={4}
                onFocus={() => setFocused('message')}
                onBlur={(e) => setFocused(e.target.value ? 'message' : null)}
                className="w-full bg-transparent border-b border-white/10 focus:border-[var(--ember-amber)] py-2 text-white outline-none transition-colors resize-none"
              />
            </div>

            <div className="pt-8 flex justify-center">
              <MagneticButton variant="primary" className="w-full md:w-auto md:px-16" type="button">
                Envoyer la demande
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
