"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { ArrowRight, ArrowDown } from "lucide-react";
import { brand } from "@/config/brand";

export function HeroAsymmetric() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Client-side only rendering for Framer Motion continuous animations
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full flex items-center bg-[#09090b] overflow-hidden pt-20"
    >
      {/* Absolute Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      {/* Decorative ambient light */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-gradient-to-b from-[var(--ember-amber)]/20 to-transparent rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-gradient-to-t from-[var(--ember-coral)]/10 to-transparent rounded-full blur-[100px] opacity-30 mix-blend-screen pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Content (Text) - 7 cols */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="col-span-1 lg:col-span-7 flex flex-col items-start pt-10 lg:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--ember-amber)] animate-pulse" />
            <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">Éditeur de logiciels</span>
          </motion.div>

          <h1 className="text-mega text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-extrabold tracking-tighter leading-[0.85] mb-6">
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              STELLAR
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-gradient-accent"
            >
              WAVE.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg lg:text-xl text-zinc-400 max-w-xl font-light leading-relaxed mb-12"
          >
            Nous créons des produits digitaux exceptionnels et des infrastructures Cloud robustes. 
            Évitez le générique, optez pour l&apos;inoubliable.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <a href={brand.bookingUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <MagneticButton variant="primary" className="w-full sm:w-auto">
                Lancer un projet <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </a>
            <a href="#expertises" className="w-full sm:w-auto">
              <MagneticButton variant="outline" className="w-full sm:w-auto">
                Nos expertises
              </MagneticButton>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content (Visual) - 5 cols */}
        <div className="col-span-1 lg:col-span-5 h-[50vh] lg:h-[80vh] relative hidden lg:block perspective-[1000px]">
          {mounted && (
            <motion.div 
              style={{ y: y2 }}
              className="w-full h-full relative"
              initial={{ opacity: 0, rotateY: 20, rotateX: 10, z: -100 }}
              animate={{ opacity: 1, rotateY: -10, rotateX: 5, z: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              {/* Glass layered cards representing our work/dashboard */}
              <div className="absolute top-[10%] left-[5%] w-[80%] h-[50%] liquid-glass rounded-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 flex flex-col p-6 overflow-hidden group">
                {/* Simulated dashboard UI inside glass */}
                <div className="w-full h-8 flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
                <div className="flex-1 w-full bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-xl animate-pulse" />
                
                {/* Interactive reflection */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />
              </div>

              <div className="absolute top-[40%] right-[0%] w-[70%] h-[40%] liquid-glass rounded-3xl border border-[var(--ember-amber)]/20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20 flex p-6 backdrop-blur-xl group">
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-full bg-[var(--ember-amber)]/20 flex items-center justify-center border border-[var(--ember-amber)]/30">
                    <div className="w-4 h-4 rounded-full bg-[var(--ember-amber)] shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                  </div>
                  <div className="space-y-2 mt-auto">
                    <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 animate-bounce hidden md:block">
        <ArrowDown className="w-5 h-5 opacity-50" />
      </div>
    </section>
  );
}
