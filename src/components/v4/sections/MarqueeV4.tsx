"use client";

import React from "react";
import { motion } from "framer-motion";

export function MarqueeV4() {
  return (
    <div className="py-8 bg-[#E0FF31] text-black overflow-hidden border-y border-white/10 transform -rotate-2 scale-105">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
      >
        <div className="flex items-center gap-8 px-4 font-mono text-xl font-bold uppercase tracking-widest">
          <span>Anti-Slop Design</span>
          <span className="text-black/30">✦</span>
          <span>Next.js 15</span>
          <span className="text-black/30">✦</span>
          <span>Framer Motion</span>
          <span className="text-black/30">✦</span>
          <span>Web GL</span>
          <span className="text-black/30">✦</span>
          <span>Tailwind CSS</span>
          <span className="text-black/30">✦</span>
          <span>Anti-Slop Design</span>
          <span className="text-black/30">✦</span>
          <span>Next.js 15</span>
          <span className="text-black/30">✦</span>
          <span>Framer Motion</span>
          <span className="text-black/30">✦</span>
          <span>Web GL</span>
          <span className="text-black/30">✦</span>
          <span>Tailwind CSS</span>
          <span className="text-black/30">✦</span>
        </div>
      </motion.div>
    </div>
  );
}
