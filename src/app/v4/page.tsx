import { HeroV4 } from "@/components/v4/sections/HeroV4";
import { EditorialBentoV4 } from "@/components/v4/sections/EditorialBentoV4";
import { MarqueeV4 } from "@/components/v4/sections/MarqueeV4";
import { FooterV4 } from "@/components/v4/sections/FooterV4";

export default function V4Page() {
  return (
    <>
      <div className="v4-noise" />
      <nav className="fixed top-0 inset-x-0 p-6 z-40 mix-blend-difference flex justify-between items-center v4-container">
        <div className="font-editorial text-2xl tracking-tighter italic">Stellar</div>
        <div className="text-xs font-mono uppercase tracking-widest text-[#E0FF31]">Studio / 2026</div>
      </nav>
      <main className="bg-[#050505] selection:bg-[#E0FF31] selection:text-black min-h-screen">
        <HeroV4 />
        <MarqueeV4 />
        <EditorialBentoV4 />
        <FooterV4 />
      </main>
    </>
  );
}
