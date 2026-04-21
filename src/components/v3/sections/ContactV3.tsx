"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "../shared/MagneticButton";

export function ContactV3() {
  return (
    <section className="py-32 relative bg-[var(--v3-background)] overflow-hidden" id="contact">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[var(--v3-ember-amber)]/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] font-display font-black tracking-tighter mb-8">
            Ready to scale <br />
            <span className="font-thin italic tracking-normal">your product?</span>
          </h2>
          
          <p className="text-xl text-[var(--v3-foreground-muted)] mb-12 max-w-xl mx-auto">
            Book a free 30-minute discovery call. We&apos;ll audit your current setup and provide an actionable roadmap.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <MagneticButton variant="primary">
              Book Discovery Call
            </MagneticButton>
            <div className="text-sm font-mono text-white/40">
              OR EMAIL US AT <br />
              <a href="mailto:contact@stellarwave.fr" className="text-white hover:text-[var(--v3-ember-amber)] transition-colors">
                CONTACT@STELLARWAVE.FR
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
