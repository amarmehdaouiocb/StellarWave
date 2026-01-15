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

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <SidebarGlass />
      <NavPill />

      {/* Main content */}
      <main id="main-content" className="relative">
        {/* Hero - Full screen cinematic */}
        <Hero />

        {/* Trust banner - Client logos */}
        <TrustBanner />

        {/* Projects carousel */}
        <ProjectsCarousel />

        {/* Services grid */}
        <Services />

        {/* Why us / Differentiation */}
        <WhyUs />

        {/* Case studies */}
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
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
