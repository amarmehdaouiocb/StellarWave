"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/animations";

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Fallback: after 2.5s force display of final value (for headless/screenshot)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasStarted) {
        setDisplayValue(value);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [value, hasStarted]);

  useEffect(() => {
    if (!isInView) return;
    setHasStarted(true);
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 2.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, value, motionValue, rounded, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export function ImpactDivider() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: text moves slightly faster
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#08080c" }}
      aria-label="Statistique d'impact"
    >
      {/* Background radial glow -- scene effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: bgOpacity,
          background: "radial-gradient(ellipse 70% 80% at 50% 50%, #141428 0%, #08080c 70%)",
        }}
      />

      {/* Decorative horizontal lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245, 158, 11, 0.15), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245, 158, 11, 0.15), transparent)" }}
      />

      <div className="container-wide relative z-10">
        <div className="text-center">
          {/* Oversized stat -- the signature element */}
          <motion.div
            style={{ y: titleY }}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: easings.dramatic }}
          >
            <span
              className="block"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(8rem, 20vw, 16rem)",
                lineHeight: "0.85",
                fontWeight: 900,
                letterSpacing: "-0.06em",
                backgroundImage: "linear-gradient(160deg, #f59e0b 0%, rgba(245, 158, 11, 0.25) 80%, transparent 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <AnimatedNumber value={200} prefix="+" />
            </span>
          </motion.div>

          {/* Label beneath */}
          <motion.div
            style={{ y: subtitleY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.6, ease: easings.smooth }}
          >
            <span
              className="block mt-4 md:mt-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
                fontWeight: 300,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#b8b8cc",
              }}
            >
              projets livres
            </span>
            <span
              className="block mt-2"
              style={{
                fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                color: "#b8b8cc",
                fontWeight: 400,
              }}
            >
              avec un taux de satisfaction de 98%
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ImpactDivider;
