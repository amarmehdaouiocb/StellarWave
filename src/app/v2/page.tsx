import {
  NavMarqo,
  HeroMarqo,
  FeaturesIntro,
  FeatureCards,
  ProcessMarqo,
  SocialProof,
  FAQMarqo,
  CTABanner,
  Newsletter,
  FooterMarqo,
} from "@/components/v2";

export default function V2Page() {
  return (
    <>
      {/* Navigation */}
      <NavMarqo />

      {/* Main content */}
      <main id="main-content" className="relative">
        {/* 1. HERO - Dark gradient with angular lines */}
        <HeroMarqo />

        {/* 2. FEATURES INTRO - Text + Dashboard mockup */}
        <FeaturesIntro />

        {/* 3. FEATURE CARDS - 2 key services */}
        <FeatureCards />

        {/* 4. PROCESS - 4-step workflow */}
        <ProcessMarqo />

        {/* 5. SOCIAL PROOF - Results + Logo carousel */}
        <SocialProof />

        {/* 6. FAQ - 2-column layout */}
        <FAQMarqo />

        {/* 7. CTA BANNER - Conversion push */}
        <CTABanner />

        {/* 8. NEWSLETTER - Email capture */}
        <Newsletter />
      </main>

      {/* Footer */}
      <FooterMarqo />
    </>
  );
}
