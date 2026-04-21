import { HeroV3 } from "@/components/v3/sections/HeroV3";
import { MarqueeV3 } from "@/components/v3/sections/MarqueeV3";
import { BentoServicesV3 } from "@/components/v3/sections/BentoServicesV3";
import { ScrollStackProofV3 } from "@/components/v3/sections/ScrollStackProofV3";
import { ProcessTimelineV3 } from "@/components/v3/sections/ProcessTimelineV3";
import { PricingV3 } from "@/components/v3/sections/PricingV3";
import { ContactV3 } from "@/components/v3/sections/ContactV3";

export default function V3HomePage() {
  return (
    <main className="font-sans antialiased">
      {/* 1. HERO - Split Screen & Magnetic CTA */}
      <HeroV3 />
      
      {/* 2. Marquee - Social Proof */}
      <MarqueeV3 />
      
      {/* 3. Bento Grid - Services */}
      <BentoServicesV3 />

      {/* 4. Proof - Scroll Stack Case Studies */}
      <ScrollStackProofV3 />

      {/* 5. Process - Animated Timeline */}
      <ProcessTimelineV3 />

      {/* 6. Pricing - Focus Mode */}
      <PricingV3 />

      {/* 7. Contact - Call to Action */}
      <ContactV3 />
    </main>
  );
}
