"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Gauge,
  CloudArrowUp,
  CurrencyCircleDollar,
  GitBranch,
  Eye,
  Lock,
  ArrowsOutCardinal,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

// Cloud services cards
const cloudServices = [
  {
    icon: Shield,
    title: "Audit & Sécurité",
    description: "Analyse complète de votre infrastructure, détection des vulnérabilités, mise en conformité.",
    color: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-400",
  },
  {
    icon: CloudArrowUp,
    title: "Infrastructure as Code",
    description: "Terraform, Pulumi, CloudFormation. Reproductible, versionné, auditable.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Gauge,
    title: "Performance & Scaling",
    description: "Auto-scaling, load balancing, CDN global. Votre app reste rapide sous n'importe quelle charge.",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: CurrencyCircleDollar,
    title: "FinOps",
    description: "Optimisation des coûts cloud. Visibilité, alertes, rightsizing automatique.",
    color: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-400",
  },
];

// Monoline SVG wireframe for architecture diagram
function ArchitectureWireframe() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Nodes */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.15">
        {/* VPC box */}
        <rect x="200" y="150" width="800" height="500" rx="20" strokeDasharray="8 4" />
        <text x="220" y="180" fontSize="14" fill="currentColor" opacity="0.3">VPC</text>

        {/* Public subnet */}
        <rect x="240" y="200" width="350" height="200" rx="12" />
        <text x="260" y="225" fontSize="12" fill="currentColor" opacity="0.3">Public Subnet</text>

        {/* Private subnet */}
        <rect x="610" y="200" width="350" height="200" rx="12" />
        <text x="630" y="225" fontSize="12" fill="currentColor" opacity="0.3">Private Subnet</text>

        {/* Load balancer */}
        <circle cx="415" cy="280" r="35" />
        <text x="395" y="285" fontSize="10" fill="currentColor" opacity="0.3">ALB</text>

        {/* EC2 instances */}
        <rect x="650" y="250" width="80" height="50" rx="8" />
        <rect x="750" y="250" width="80" height="50" rx="8" />
        <rect x="850" y="250" width="80" height="50" rx="8" />

        {/* RDS */}
        <rect x="700" y="350" width="100" height="60" rx="8" />
        <text x="720" y="385" fontSize="10" fill="currentColor" opacity="0.3">RDS</text>

        {/* S3 bucket */}
        <circle cx="300" cy="550" r="40" />
        <text x="280" y="555" fontSize="10" fill="currentColor" opacity="0.3">S3</text>

        {/* CloudFront */}
        <circle cx="150" cy="300" r="30" />
        <text x="130" y="305" fontSize="9" fill="currentColor" opacity="0.3">CDN</text>

        {/* Lambda */}
        <rect x="500" y="500" width="70" height="45" rx="8" />
        <text x="515" y="528" fontSize="9" fill="currentColor" opacity="0.3">Lambda</text>

        {/* Connection lines */}
        <path d="M180 300 L380 280" strokeDasharray="4 2" />
        <path d="M450 280 L650 275" strokeDasharray="4 2" />
        <path d="M750 300 L750 350" strokeDasharray="4 2" />
        <path d="M415 315 L415 500 L500 520" strokeDasharray="4 2" />
        <path d="M300 510 L300 400 L380 280" strokeDasharray="4 2" />

        {/* CI/CD pipeline */}
        <rect x="400" y="650" width="400" height="80" rx="12" strokeDasharray="8 4" />
        <text x="420" y="680" fontSize="11" fill="currentColor" opacity="0.3">CI/CD Pipeline</text>
        <rect x="450" y="695" width="60" height="25" rx="4" />
        <rect x="530" y="695" width="60" height="25" rx="4" />
        <rect x="610" y="695" width="60" height="25" rx="4" />
        <rect x="690" y="695" width="60" height="25" rx="4" />
        <path d="M510 708 L530 708" />
        <path d="M590 708 L610 708" />
        <path d="M670 708 L690 708" />
      </g>

      {/* Animated pulse on key nodes */}
      <motion.circle
        cx="415"
        cy="280"
        r="45"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.1"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx="750"
        cy="350"
        r="50"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.1"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </svg>
  );
}

export function FullBleedCloud() {
  return (
    <section
      id="cloud"
      className="relative min-h-screen flex items-center overflow-hidden py-20 lg:py-0"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.08_0.008_60)] to-background" />

      {/* Monoline architecture wireframe */}
      <div className="absolute inset-0 text-white pointer-events-none">
        <ArchitectureWireframe />
      </div>

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--ember-coral)] opacity-[0.03] blur-[200px] rounded-full" />

      {/* Content */}
      <div className="relative z-10 container-wide lg:pl-64 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--ember-coral)]/20 border border-[var(--ember-coral)]/30 text-[var(--ember-coral)] text-xs font-semibold uppercase tracking-wider mb-6">
            <CloudArrowUp weight="fill" className="h-3.5 w-3.5" />
            Architecture Cloud
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4" style={{ letterSpacing: "-0.04em", lineHeight: "0.95" }}>
            Infrastructure{" "}
            <span className="text-gradient-hero">scalable</span>
            <br />
            et sécurisée
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AWS, GCP, Azure. Nous construisons des architectures cloud modernes,
            automatisées et optimisées pour vos besoins.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {cloudServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className={cn(
                  "relative p-6 lg:p-8 rounded-[24px] overflow-hidden",
                  "bg-gradient-to-br",
                  service.color,
                  "backdrop-blur-xl",
                  "border border-white/10",
                  "hover-lift transition-all duration-500",
                  "group"
                )}
              >
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-background/60 backdrop-blur-xl" />

                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      "bg-white/5 border border-white/10",
                      "group-hover:scale-110 transition-transform duration-300"
                    )}>
                      <Icon weight="duotone" className={cn("h-6 w-6", service.iconColor)} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: Lock, label: "SOC2 Compliant" },
            { icon: Eye, label: "24/7 Monitoring" },
            { icon: GitBranch, label: "GitOps" },
            { icon: ArrowsOutCardinal, label: "Multi-Region" },
          ].map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
              >
                <Icon weight="duotone" className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{badge.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FullBleedCloud;
