"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import MagnifierIcon from "@/components/ui/magnifier-icon";
import CodeIcon from "@/components/ui/code-icon";
import RocketIcon from "@/components/ui/rocket-icon";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { fadeInUp, easings } from "@/lib/animations";

const steps = [
  {
    step: 1,
    title: "Discovery & Design",
    duration: "1-3 semaines",
    description:
      "Compr\u00e9hension de vos enjeux, maquettes haute fid\u00e9lit\u00e9, prototype valid\u00e9.",
    deliverables: ["Brief valid\u00e9", "Maquettes Figma", "Roadmap"],
    Icon: MagnifierIcon,
  },
  {
    step: 2,
    title: "Build",
    duration: "4-12 semaines",
    description:
      "D\u00e9veloppement it\u00e9ratif avec d\u00e9mos hebdomadaires. Qualit\u00e9 industrielle garantie.",
    deliverables: ["Code source", "Tests automatis\u00e9s", "Documentation"],
    Icon: CodeIcon,
  },
  {
    step: 3,
    title: "Launch & Support",
    duration: "1-2 semaines",
    description:
      "D\u00e9ploiement progressif, monitoring, optimisations et accompagnement continu.",
    deliverables: ["Mise en production", "Formation", "Support 3 mois"],
    Icon: RocketIcon,
  },
];

function ProcessCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = step.Icon;
  const isHighlighted = index === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: easings.smooth }}
      className="relative"
    >
      {/* Step number */}
      <div
        className="absolute -top-5 left-6 text-[4rem] font-bold pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.05em",
          lineHeight: "1",
          color: isHighlighted
            ? "rgba(56, 189, 248, 0.10)"
            : "rgba(56, 189, 248, 0.05)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className="relative h-full"
        style={{
          background: isHighlighted ? "#283814" : "#1e293b",
          borderRadius: "var(--card-radius-2xl)",
          padding: "36px",
          border: isHighlighted
            ? "1px solid rgba(56, 189, 248, 0.25)"
            : "1px solid rgba(56, 189, 248, 0.15)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
          transition: "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {isHighlighted && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 60%)",
            }}
          />
        )}

        <div className="relative z-10">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
            style={{
              background: isHighlighted
                ? "rgba(56, 189, 248, 0.15)"
                : "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.12)",
            }}
          >
            <Icon size={22} color="#38bdf8" />
          </div>

          <span
            className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-4"
            style={{
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.12)",
              color: "#38bdf8",
            }}
          >
            {step.duration}
          </span>

          <h3 className="text-xl font-semibold mb-3 text-white">
            {step.title}
          </h3>

          <p
            className="mb-6 text-sm leading-relaxed"
            style={{ color: "var(--text-body)" }}
          >
            {step.description}
          </p>

          <div
            className="pt-4"
            style={{ borderTop: "1px solid rgba(56, 189, 248, 0.12)" }}
          >
            <span
              className="text-xs uppercase tracking-wider mb-3 block font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Livrables
            </span>
            <ul className="space-y-2">
              {step.deliverables.map((deliverable, deliverableIndex) => (
                <motion.li
                  key={deliverableIndex}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--text-body)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: index * 0.2 + 0.4 + deliverableIndex * 0.1,
                  }}
                >
                  <div
                    className="flex h-4 w-4 items-center justify-center rounded-full flex-shrink-0"
                    style={{ background: "rgba(56, 189, 248, 0.15)" }}
                  >
                    <CheckCircle
                      weight="duotone"
                      className="h-2.5 w-2.5"
                      style={{ color: "#38bdf8" }}
                    />
                  </div>
                  <span>{deliverable}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {index < steps.length - 1 && (
        <div
          className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(56, 189, 248, 0.20), transparent)",
          }}
        />
      )}
    </motion.div>
  );
}

export function ProcessSimple() {
  return (
    <AnimatedSection
      id="process"
      className="section-padding-tight"
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
            Notre m&eacute;thode
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
            <span style={{ color: "var(--text-muted)" }}>3 &eacute;tapes </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "#ffffff",
                fontWeight: 500,
                fontSize: "1.15em",
              }}
            >
              vers le succ&egrave;s
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
            Une m&eacute;thodologie &eacute;prouv&eacute;e pour des projets livr&eacute;s &agrave; temps, dans le budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <ProcessCard key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default ProcessSimple;
