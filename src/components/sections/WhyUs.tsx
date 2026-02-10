"use client";

import { motion } from "framer-motion";
import {
  Lightning,
  ShieldCheck,
  TrendUp,
  Handshake,
} from "@phosphor-icons/react";
import { whyUs } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

// Icon map for looking up Phosphor icons by name
const iconMap: Record<string, React.ElementType> = {
  Lightning,
  ShieldCheck,
  TrendUp,
  Handshake,
};

export function WhyUs() {
  return (
    <AnimatedSection
      id="why-us"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
      <div className="relative container-wide">
        {/* Editorial Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(255, 255, 255, 0.80)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.60)",
              boxShadow: "var(--shadow-apple-sm)",
              color: "rgba(17, 17, 17, 0.6)"
            }}
          >
            Notre différence
          </motion.span>
          {/* Editorial two-tone title */}
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em"
            }}
          >
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Pourquoi choisir </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>Stellar Wave</span>
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}> ?</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(17, 17, 17, 0.6)" }}
          >
            Au-delà du code, nous apportons une vision produit et une exécution
            industrielle qui font la différence.
          </p>
        </motion.div>

        {/* Grid - Apple-like XL cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {whyUs.map((item, index) => {
            const Icon = iconMap[item.iconName] || Lightning;

            return (
              <motion.div key={index} variants={staggerItem} className="group">
                <div
                  className="h-full p-8"
                  style={{
                    background: "white",
                    borderRadius: "var(--card-radius-xl)",
                    border: "1px solid rgba(255, 255, 255, 0.40)",
                    boxShadow: "var(--shadow-apple-lg)",
                    transition: "transform 300ms ease-out, box-shadow 300ms ease-out",
                  }}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon - Gradient style */}
                    <div
                      className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      }}
                    >
                      <Icon weight="duotone" className="h-7 w-7 text-white" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{ color: "#111111" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-[15px] leading-relaxed"
                        style={{ color: "rgba(17, 17, 17, 0.6)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats row - Apple XL cards */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { value: "100%", label: "Projets livrés à temps" },
            { value: "24h", label: "Temps de réponse max" },
            { value: "98%", label: "Taux de satisfaction" },
            { value: "0", label: "Surprise sur le budget" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="text-center p-6"
              style={{
                background: "white",
                borderRadius: "var(--card-radius-xl)",
                border: "1px solid rgba(255, 255, 255, 0.40)",
                boxShadow: "var(--shadow-apple-md)",
              }}
              whileHover={{
                y: -4,
                boxShadow: "var(--shadow-apple-xl)",
              }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm"
                style={{ color: "rgba(17, 17, 17, 0.5)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
