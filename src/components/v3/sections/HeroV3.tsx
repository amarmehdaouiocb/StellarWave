"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { MagneticButton } from "../shared/MagneticButton";

export function HeroV3() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-32 pb-20 overflow-hidden bg-v3-mesh">
      {/* Background glow effects - Ember Luxe */}
      <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-[var(--v3-ember-amber)]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-[var(--v3-ember-coral)]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (Split Screen Asymmetry) */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full v3-liquid-glass mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--v3-ember-amber)] animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                Product & Cloud Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, type: "spring", stiffness: 50 }}
              className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tighter mb-6 font-display"
            >
              <span className="block font-thin text-white/70">Engineered for</span>
              <span className="block font-black text-white">
                Unfair <span className="text-v3-gradient">Advantage.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-[var(--v3-foreground-muted)] max-w-[50ch] leading-relaxed mb-10 font-sans"
            >
              Landing pages that convert at 4.8%, bespoke web applications, and cloud architecture that cuts your infrastructure costs by 65%. 
              <br className="hidden md:block" />
              We don&apos;t just build software. We engineer ROI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <MagneticButton href="#contact" variant="primary">
                Réserver un audit gratuit
                <ArrowRight weight="bold" />
              </MagneticButton>
              <MagneticButton href="#work" variant="secondary">
                Voir nos résultats
              </MagneticButton>
            </motion.div>

            {/* Social Proof Mini */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--v3-background)] bg-zinc-800 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for avatars, use solid color to avoid Unsplash */}
                    <div className={`w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-600`} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex text-[var(--v3-ember-amber)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} weight="fill" className="w-4 h-4" />
                  ))}
                </div>
                <span className="text-sm text-white/60">
                  <strong className="text-white font-medium">5.0/5</strong> par nos partenaires
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Abstract Art / Empty Space for Visual Density 4 */}
          {/* We keep this relatively empty or put a highly abstract 3D-like shape or simple structural lines */}
          <div className="hidden lg:flex lg:col-span-4 justify-end relative h-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.4, type: "spring" }}
              className="absolute top-1/2 -translate-y-1/2 right-0 w-[400px] h-[600px] rounded-[40px] v3-liquid-glass flex items-center justify-center overflow-hidden"
            >
              {/* Abstract structural grid inside */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="relative z-10 text-center">
                <div className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent leading-none">
                  V3
                </div>
                <div className="text-xs font-mono tracking-[0.2em] text-[var(--v3-ember-amber)] uppercase mt-4">
                  System Online
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
