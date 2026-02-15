"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import Showcase from "@/components/Showcase";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <main id="top" className="relative">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <BeforeAfter />
      <Showcase />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
