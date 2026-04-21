"use client";

import { motion } from "framer-motion";

const logos = [
  "Fidelya", "BoatAcademy", "OnMangeQuoi", "RA Bâtiment", 
  "Fidelya", "BoatAcademy", "OnMangeQuoi", "RA Bâtiment"
];

export function MarqueeV3() {
  return (
    <section className="py-24 border-y border-white/[0.02] relative overflow-hidden bg-[var(--v3-background)]">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[var(--v3-background)] via-transparent to-[var(--v3-background)]" />
      
      <div className="flex w-[200%] gap-12">
        <motion.div 
          className="flex flex-1 justify-around items-center gap-12"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {logos.map((logo, i) => (
            <div key={i} className="text-2xl md:text-3xl font-display font-black text-white/20 uppercase tracking-widest whitespace-nowrap">
              {logo}
            </div>
          ))}
        </motion.div>
        
        {/* Duplicate for seamless infinite loop */}
        <motion.div 
          className="flex flex-1 justify-around items-center gap-12"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {logos.map((logo, i) => (
            <div key={i} className="text-2xl md:text-3xl font-display font-black text-white/20 uppercase tracking-widest whitespace-nowrap">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
