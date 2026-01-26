import { SidebarGlass, NavPill, Footer } from "@/components/layout";
import {
  Hero,
  Services,
  Proof,
  ProcessSimple,
  OffersWithFAQ,
  Contact,
} from "@/components/sections";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

export default function HomePage() {
  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgress variant="gradient" />

      {/* Navigation */}
      <SidebarGlass />
      <NavPill />

      {/* Main content - 6 sections optimisées pour la conversion */}
      <main id="main-content" className="relative">
        {/* 1. HERO - Hook + CTA immédiat */}
        <Hero />

        {/* 2. SERVICES - Nos expertises */}
        <Services />

        {/* 3. PROOF - Crédibilité (métriques + logos + case studies) */}
        <Proof />

        {/* 4. PROCESS - Transparence (3 étapes) */}
        <ProcessSimple />

        {/* 5. OFFERS - Pricing + FAQ intégrée */}
        <OffersWithFAQ />

        {/* 6. CONTACT - Formulaire de devis qualifié */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
