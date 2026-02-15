"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

export default function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "var(--accent-subtle)",
              color: "var(--accent-primary)",
            }}
          >
            Avant / Après
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            La différence est{" "}
            <span className="text-gradient">flagrante</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Glissez pour comparer un site générique avec un site Simplisite.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden select-none touch-none glass-card"
            style={{ aspectRatio: "16/9" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* AFTER (full background) */}
            <div className="absolute inset-0 p-6 sm:p-10"
              style={{ background: "linear-gradient(135deg, #0c1220 0%, #162032 100%)" }}
            >
              {/* Modern site mockup */}
              <div className="h-full flex flex-col">
                {/* Nav */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg" style={{ background: "var(--gradient-accent)" }} />
                    <div className="w-24 h-3 rounded-full" style={{ background: "rgba(232,147,12,0.3)" }} />
                  </div>
                  <div className="hidden sm:flex gap-4">
                    {[1,2,3].map(i => <div key={i} className="w-16 h-2.5 rounded-full bg-white/10" />)}
                  </div>
                  <div className="w-24 h-8 rounded-lg" style={{ background: "var(--gradient-accent)" }} />
                </div>
                {/* Hero area */}
                <div className="flex-1 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="flex-1 space-y-4">
                    <div className="w-3/4 h-5 rounded-full bg-white/20" />
                    <div className="w-full h-8 rounded-full bg-white/15" />
                    <div className="w-2/3 h-8 rounded-full" style={{ background: "rgba(232,147,12,0.2)" }} />
                    <div className="w-full h-3 rounded-full bg-white/8 mt-4" />
                    <div className="w-4/5 h-3 rounded-full bg-white/8" />
                    <div className="flex gap-3 mt-4">
                      <div className="w-32 h-10 rounded-xl" style={{ background: "var(--gradient-accent)" }} />
                      <div className="w-32 h-10 rounded-xl border border-white/20" />
                    </div>
                  </div>
                  <div className="hidden sm:block w-2/5 aspect-square rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/10" />
                </div>
                {/* Features */}
                <div className="hidden sm:grid grid-cols-3 gap-4 mt-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-8 h-8 rounded-lg mb-3" style={{ background: `rgba(232,147,12,${0.1 + i*0.05})` }} />
                      <div className="w-2/3 h-3 rounded-full bg-white/15 mb-2" />
                      <div className="w-full h-2 rounded-full bg-white/8" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: "var(--gradient-accent)", color: "#fff" }}
              >
                Avec Simplisite
              </div>
            </div>

            {/* BEFORE (clipped overlay) */}
            <div
              className="absolute inset-0 p-6 sm:p-10"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                background: "#f5f5f5",
              }}
            >
              {/* Basic ugly site mockup */}
              <div className="h-full flex flex-col">
                {/* Nav */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-300">
                  <div className="text-sm font-bold text-gray-700">Mon Commerce</div>
                  <div className="hidden sm:flex gap-3">
                    {["Accueil", "Menu", "Contact"].map(t => (
                      <span key={t} className="text-xs text-blue-600 underline">{t}</span>
                    ))}
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="w-full h-5 rounded bg-gray-300" />
                  <div className="w-4/5 h-5 rounded bg-gray-300" />
                  <div className="w-2/3 h-5 rounded bg-gray-200" />
                  <div className="mt-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded">
                    <div className="w-full h-3 rounded bg-yellow-300/50 mb-2" />
                    <div className="w-3/4 h-3 rounded bg-yellow-300/50" />
                  </div>
                  <div className="mt-4 w-full h-3 rounded bg-gray-200" />
                  <div className="w-full h-3 rounded bg-gray-200" />
                  <div className="w-1/2 h-3 rounded bg-gray-200" />
                  <div className="mt-4 flex gap-2">
                    <div className="w-24 h-8 rounded bg-blue-500/30 border border-blue-500" />
                  </div>
                </div>
                {/* Footer */}
                <div className="mt-4 pt-2 border-t border-gray-300">
                  <div className="w-2/3 h-2 rounded bg-gray-300" />
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-400 text-white">
                Site générique
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
            >
              <div className="h-full w-0.5" style={{ background: "var(--accent-primary)" }} />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: "var(--gradient-accent)",
                  boxShadow: "0 4px 20px var(--accent-glow)",
                  cursor: "ew-resize",
                }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
