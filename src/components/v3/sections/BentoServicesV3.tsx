import { LiquidGlassCard } from "../shared/LiquidGlassCard";
import { PerpetualShimmer } from "../shared/PerpetualShimmer";
import { Lightning, Cloud, DeviceMobile, RocketLaunch } from "@phosphor-icons/react/dist/ssr";

export function BentoServicesV3() {
  return (
    <section className="py-32 relative bg-[var(--v3-background)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Digital craftsmanship <br />
            <span className="text-white/40">at industrial scale.</span>
          </h2>
          <p className="text-[var(--v3-foreground-muted)] max-w-[60ch]">
            We merge premium aesthetics with hardcore engineering. No bloat, no AI slop. 
            Just systems that perform and interfaces that convert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Card 1: Landing Pages (Span 2 cols) */}
          <LiquidGlassCard className="md:col-span-2 row-span-1 group" delay={0.1}>
            <div className="flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-full bg-[var(--v3-ember-amber)]/10 flex items-center justify-center text-[var(--v3-ember-amber)]">
                <RocketLaunch size={24} weight="duotone" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">High-Conversion Landings</h3>
                <p className="text-[var(--v3-foreground-muted)] text-sm">
                  A/B tested structures, Lighthouse 98+, and copywriting that cuts through the noise.
                </p>
              </div>
            </div>
            <PerpetualShimmer />
          </LiquidGlassCard>

          {/* Card 2: Web Apps */}
          <LiquidGlassCard className="col-span-1 row-span-1" delay={0.2}>
            <div className="flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-full bg-[var(--v3-ember-coral)]/10 flex items-center justify-center text-[var(--v3-ember-coral)]">
                <Lightning size={24} weight="duotone" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Web Apps</h3>
                <p className="text-[var(--v3-foreground-muted)] text-sm">
                  React, Next.js, and state-of-the-art state management.
                </p>
              </div>
            </div>
          </LiquidGlassCard>

          {/* Card 3: Mobile (Span 1) */}
          <LiquidGlassCard className="col-span-1 row-span-1" delay={0.3}>
            <div className="flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                <DeviceMobile size={24} weight="duotone" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">iOS & Android</h3>
                <p className="text-[var(--v3-foreground-muted)] text-sm">
                  Native feel with Expo & React Native.
                </p>
              </div>
            </div>
          </LiquidGlassCard>

          {/* Card 4: Cloud Architecture (Span 2) */}
          <LiquidGlassCard className="md:col-span-2 row-span-1 relative overflow-hidden" delay={0.4}>
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Cloud size={24} weight="duotone" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Cloud Infrastructure</h3>
                <p className="text-[var(--v3-foreground-muted)] text-sm max-w-md">
                  Serverless scaling, FinOps audits, and zero-downtime deployments. 
                  We cut your AWS bills by up to 65%.
                </p>
              </div>
            </div>
            
            {/* Abstract Server Status Micro-Animation */}
            <div className="absolute right-8 top-8 bottom-8 w-32 flex flex-col gap-2 justify-center opacity-20 group-hover:opacity-60 transition-opacity duration-500">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--v3-ember-amber)] rounded-full animate-pulse" 
                    style={{ width: `${Math.random() * 60 + 20}%`, animationDelay: `${i * 0.2}s` }} 
                  />
                </div>
              ))}
            </div>
          </LiquidGlassCard>

        </div>
      </div>
    </section>
  );
}
