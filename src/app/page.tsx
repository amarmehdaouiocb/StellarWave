import { NavPill, Footer } from "@/components/layout";
import {
  Hero,
  Services,
  HorizontalGallery,
  Proof,
  ProcessSimple,
  OffersWithFAQ,
  Contact,
} from "@/components/sections";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

function TypographicDivider() {
  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        backgroundColor: "#020617",
      }}
    >
      <span
        className="select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem, 15vw, 12rem)",
          fontWeight: 800,
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          color: "rgba(56, 189, 248, 0.25)",
        }}
      >
        M&Eacute;THODE.
      </span>
      {/* Lime anchor line under METHODE */}
      <div
        style={{
          width: "40%",
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.2) 50%, transparent 100%)",
          marginTop: "24px",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Scroll progress - lime gradient */}
      <ScrollProgress variant="gradient" />

      {/* Navigation */}
      <NavPill />

      {/* Main content */}
      <main id="main-content" className="relative">
        {/* 1. HERO - Split-text */}
        <Hero />

        {/* 2. SERVICES — tight spacing after hero */}
        <Services />

        {/* 3. HORIZONTAL GALLERY — signature visual rupture */}
        <HorizontalGallery />

        {/* 4. PROOF — loose spacing for breathing room */}
        <Proof />

        {/* Typographic divider — editorial rupture */}
        <TypographicDivider />

        {/* 5. PROCESS — tight spacing, dense sequence */}
        <ProcessSimple />

        {/* 6. OFFERS + FAQ — loose spacing for decision area */}
        <OffersWithFAQ />

        {/* 7. CONTACT */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
