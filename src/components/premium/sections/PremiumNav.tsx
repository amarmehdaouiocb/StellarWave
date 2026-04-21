"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { brand } from "@/config/brand";

export function PremiumNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div 
          className={`flex items-center justify-between transition-all duration-500 rounded-full ${
            scrolled ? "bg-zinc-950/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-2xl" : "px-2"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[var(--ember-amber)]" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter text-white">
              Stellar<span className="text-zinc-500">Wave</span>
            </span>
          </a>

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#expertises" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Expertises</a>
            <a href="#processus" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Processus</a>
            <a href="#contact" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Contact</a>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a href={brand.calendlyUrl} target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-[var(--ember-amber)] hover:text-black transition-colors">
                Démarrer
              </button>
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
