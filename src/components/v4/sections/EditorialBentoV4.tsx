"use client";

import React from "react";
import { motion } from "framer-motion";

export function EditorialBentoV4() {
  return (
    <section className="py-32 v4-container relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
        
        {/* Large Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="col-span-1 md:col-span-2 row-span-2 v4-spotlight-border p-10 flex flex-col justify-between overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#8A2BE2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="max-w-lg z-10">
            <h2 className="font-editorial text-5xl md:text-7xl mb-6 leading-none">Engineering<br/>as Art.</h2>
            <p className="v4-body-type">We don&apos;t just write code. We architect experiences that feel physical, responsive, and inevitable. Every micro-interaction is calculated.</p>
          </div>

          {/* Abstract visual inside card */}
          <div className="relative w-full h-48 mt-12 rounded-xl overflow-hidden border border-white/5 bg-[#0a0a0a]">
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-32 h-32 border border-[#E0FF31]/30 rounded-full animate-[spin_10s_linear_infinite]" />
               <div className="absolute w-48 h-48 border border-[#8A2BE2]/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
               <div className="absolute font-mono text-[#E0FF31] text-xs">SYS.READY</div>
             </div>
          </div>
        </motion.div>

        {/* Small Stacked Cards */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="v4-spotlight-border p-8 flex flex-col group"
        >
          <div className="text-[#E0FF31] font-mono mb-auto">01 / PERFORMANCE</div>
          <h3 className="font-sans text-3xl font-medium mb-4">60 FPS Native.</h3>
          <p className="text-sm text-zinc-500">Fluid animations, optimized assets, and zero layout shifts. We build for speed.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="v4-spotlight-border p-8 flex flex-col bg-gradient-to-br from-[#111] to-[#1a1a1a]"
        >
          <div className="text-[#8A2BE2] font-mono mb-auto">02 / ARCHITECTURE</div>
          <h3 className="font-sans text-3xl font-medium mb-4">Cloud Native.</h3>
          <p className="text-sm text-zinc-500">Scalable serverless infrastructure designed for hyper-growth and resilience.</p>
        </motion.div>

      </div>
    </section>
  );
}
