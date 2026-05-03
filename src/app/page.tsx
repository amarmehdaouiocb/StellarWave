import { NavPill, Logo } from "@/components/layout";
import { Hero, Services } from "@/components/sections";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import {
  LazyHorizontalGallery,
  LazyContact,
  LazyFooter,
} from "@/components/lazy-sections";

export default function HomePage() {
  return (
    <>
      <ScrollProgress variant="gradient" />

      <Logo variant="fixed-topleft" height={44} priority />

      <NavPill />

      <main id="main-content" className="relative">
        <Hero />

        <Services />

        <LazyHorizontalGallery />

        <LazyContact />
      </main>

      <LazyFooter />
    </>
  );
}
