"use client";

import { Check } from "@phosphor-icons/react/dist/ssr";
import { MagneticButton } from "../shared/MagneticButton";

const plans = [
  {
    name: "Starter",
    price: "5k€",
    desc: "Landing pages premium & audit de performance.",
    features: ["Design system sur mesure", "SEO technique", "Lighthouse 98+ garanti"],
  },
  {
    name: "Growth",
    price: "15k€",
    desc: "Applications web complètes et plateformes SaaS.",
    features: ["Architecture React/Next.js", "Backend & APIs", "Tests automatisés"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    desc: "Infrastructures cloud et transformation digitale globale.",
    features: ["Audit FinOps & Sécurité", "Multi-cloud AWS/GCP", "SLA garanti 24/7"],
  },
];

export function PricingV3() {
  return (
    <section className="py-32 bg-[var(--v3-background)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Invest in <span className="text-[var(--v3-ember-amber)]">Growth.</span>
            </h2>
            <p className="text-[var(--v3-foreground-muted)] max-w-md">
              Des forfaits transparents, un ROI mesurable. Pas de coûts cachés.
            </p>
          </div>
          <MagneticButton href="#contact" variant="secondary">
            Discuter de votre projet
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {plans.map((plan, i) => (
            <div key={i} className="py-12 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0 flex flex-col h-full group">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-2xl font-bold font-display">{plan.name}</h3>
                  {plan.highlight && (
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded bg-[var(--v3-ember-amber)]/10 text-[var(--v3-ember-amber)]">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-[var(--v3-foreground-muted)] text-sm">{plan.desc}</div>
              </div>
              
              <div className="text-5xl font-black tracking-tighter mb-12 group-hover:text-[var(--v3-ember-amber)] transition-colors">
                {plan.price}
              </div>

              <ul className="flex flex-col gap-4 mb-12 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="text-[var(--v3-ember-amber)] shrink-0 mt-0.5" weight="bold" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
