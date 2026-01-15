import { SidebarGlass, NavPill, Footer } from "@/components/layout";
import {
  Hero,
  TrustBanner,
  ProjectsCarousel,
  Services,
  WhyUs,
  CaseStudies,
  ProofCards,
  Process,
  Offers,
  LeadMagnet,
  EstimateForm,
  FAQ,
} from "@/components/sections";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

// New "WOW" sections
import { MosaicAZ } from "@/components/sections/MosaicAZ";
import { FullBleedCaseStudy } from "@/components/sections/FullBleedCaseStudy";
import { FullBleedCloud } from "@/components/sections/FullBleedCloud";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgress variant="gradient" />

      {/* Navigation */}
      <SidebarGlass />
      <NavPill />

      {/* Main content */}
      <main id="main-content" className="relative">
        {/* ============================================
            SECTION 1: HERO (100vh - Cinematic)
            ============================================ */}
        <Hero />

        {/* Trust banner - Client logos */}
        <TrustBanner />

        {/* ============================================
            SECTION 2: MOSAIC "Le Digital de A à Z"
            Grid with saturated power cards
            ============================================ */}
        <MosaicAZ />

        {/* ============================================
            SECTION 3: FULL-BLEED CASE STUDY (100vh)
            Big statement + floating mockup
            ============================================ */}
        <FullBleedCaseStudy />

        {/* ============================================
            SECTION 4: SERVICES (Cards grid)
            ============================================ */}
        <Services />

        {/* Why us / Differentiation */}
        <WhyUs />

        {/* ============================================
            SECTION 5: FULL-BLEED CLOUD (100vh)
            Monoline wireframe + cloud cards
            ============================================ */}
        <FullBleedCloud />

        {/* ============================================
            SECTION 6: RÉALISATIONS (Grid + Filters)
            ============================================ */}
        <ProjectsCarousel />

        {/* Case studies - Detailed */}
        <CaseStudies />

        {/* Proof - Before/After metrics */}
        <ProofCards />

        {/* Process - 4 steps */}
        <Process />

        {/* Pricing offers */}
        <Offers />

        {/* Lead magnet - Mini audit form */}
        <LeadMagnet />

        {/* Main contact form */}
        <EstimateForm />

        {/* FAQ */}
        <FAQ />

        {/* ============================================
            SECTION 7: FINAL CTA (Simple, Énorme)
            ============================================ */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
