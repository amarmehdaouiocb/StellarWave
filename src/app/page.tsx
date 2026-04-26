import { NavPill, Footer, Logo } from "@/components/layout";
import {
  Hero,
  Services,
  HorizontalGallery,
  SocialFeed,
  Contact,
} from "@/components/sections";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

export default function HomePage() {
  return (
    <>
      {/* Scroll progress - lime gradient */}
      <ScrollProgress variant="gradient" />

      {/* Logo - fixed top-left */}
      <Logo variant="fixed-topleft" height={44} priority />

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

        {/* 4. SOCIAL FEED — bi-typo title + marquee carousel */}
        <SocialFeed />

        {/* 5. CONTACT */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
