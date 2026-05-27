"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroVideoBackground } from "../ui/HeroVideoBackground";

export function HeroV4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center overflow-hidden">
      
      {/* The new Video Background Component */}
      {/* Note: Place your generated showreel in public/v4/video/showreel.mp4 */}
      <HeroVideoBackground videoSrc="/v4/video/showreel.mp4" />

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity }}
        className="v4-container relative z-10 w-full pt-32 pb-20 flex flex-col justify-center min-h-[100dvh]"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[#E0FF31] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.2em] text-white uppercase">StellarWave Showreel 26</span>
            </div>
            
            <h1 className="v4-mega-type font-sans font-bold mb-8 text-white drop-shadow-2xl">
              Engineering<br/>
              <span className="font-editorial italic font-normal text-white/70">Perfection.</span>
            </h1>

            <p className="v4-body-type max-w-xl mb-12 text-white/80 drop-shadow-md">
              We build high-end digital products and resilient cloud infrastructures. 
              Leave the generic behind. Demand the unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#E0FF31] text-black font-sans font-semibold rounded-full hover:bg-white transition-colors duration-300 transform hover:-translate-y-1">
                Lancer un projet
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-sans font-medium border border-white/20 rounded-full hover:bg-white/10 backdrop-blur-sm transition-colors duration-300">
                Nos Expertises
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-50"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
