"use client";

import { motion } from "framer-motion";
import {
  RocketLaunch,
  Stack,
  Cloud,
} from "@phosphor-icons/react";
import ArrowNarrowRightIcon from "@/components/ui/arrow-narrow-right-icon";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { fadeInUp, easings } from "@/lib/animations";

// 3 core services for bento grid — radical simplicity
const bentoServices = [
  {
    id: "product",
    icon: RocketLaunch,
    title: "Product Design & Dev",
    description: "Landing pages premium, sites web, applications SaaS. Du prototype Figma au d\u00e9ploiement production.",
    span: "col-span-1 md:col-span-7 md:row-span-2",
  },
  {
    id: "apps",
    icon: Stack,
    title: "Apps & Mobile",
    description: "Applications React Native et web apps temps r\u00e9el, architectur\u00e9es pour la scalabilit\u00e9.",
    span: "col-span-1 md:col-span-5",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & Infra",
    description: "Architecture serverless, FinOps, s\u00e9curit\u00e9. AWS, GCP, Azure.",
    span: "col-span-1 md:col-span-5",
  },
];

function BentoCard({
  service,
  index,
}: {
  service: (typeof bentoServices)[number];
  index: number;
}) {
  const Icon = service.icon;
  const isHero = index === 0;

  return (
    <motion.div
      className={`group relative ${service.span}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: easings.smooth }}
    >
      <div
        className="h-full flex flex-col relative"
        style={{
          background: "#1e293b",
          borderRadius: "var(--card-radius-2xl)",
          padding: isHero ? "56px" : "36px",
          border: "1px solid rgba(56, 189, 248, 0.15)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
          minHeight: isHero ? "400px" : "auto",
          transition: "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            borderRadius: "inherit",
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="flex flex-col h-full relative z-10">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl mb-8 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "rgba(56, 189, 248, 0.10)",
              border: "1px solid rgba(56, 189, 248, 0.15)",
            }}
          >
            <Icon weight="duotone" className="h-7 w-7" style={{ color: "#38bdf8" }} />
          </div>

          <h3
            className="font-semibold mb-4 text-white"
            style={{
              fontSize: isHero ? "clamp(1.5rem, 3vw, 2.25rem)" : "1.25rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {service.title}
          </h3>

          <p
            className="leading-relaxed mt-auto"
            style={{
              color: "var(--text-body)",
              fontSize: isHero ? "1.05rem" : "0.95rem",
            }}
          >
            {service.description}
          </p>

          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold mt-8 transition-colors duration-300"
            style={{ color: "#38bdf8" }}
            whileHover={{ x: 4 }}
          >
            D&eacute;couvrir
            <ArrowNarrowRightIcon size={16} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <AnimatedSection
      id="services"
      className="section-padding-tight overflow-hidden"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="container-wide">
        <motion.div
          className="mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium mb-10"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              background: "rgba(56, 189, 248, 0.06)",
              border: "1px solid rgba(56, 189, 248, 0.12)",
              color: "rgba(56, 189, 248, 0.8)",
            }}
          >
            Nos expertises
          </motion.span>

          <h2
            className="mb-10"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>Des solutions </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "#ffffff",
                fontWeight: 500,
                fontSize: "1.15em",
              }}
            >
              sur mesure
            </span>
          </h2>
          {/* Lime accent line — editorial separator */}
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "linear-gradient(90deg, #38bdf8 0%, transparent 100%)",
              marginTop: "32px",
              marginBottom: "24px",
            }}
          />
          <p
            className="text-lg leading-relaxed max-w-xl"
            style={{ color: "var(--text-body)" }}
          >
            Du prototypage au d&eacute;ploiement, nous couvrons
            l&apos;int&eacute;gralit&eacute; du cycle produit.
          </p>
        </motion.div>

        {/* Bento grid — asymmetric layout 7/5 columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {bentoServices.map((service, index) => (
            <BentoCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <CTAButton
            variant="primary"
            size="lg"
            icon={<ArrowNarrowRightIcon size={20} />}
            href="#contact"
          >
            Lancer un projet
          </CTAButton>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
