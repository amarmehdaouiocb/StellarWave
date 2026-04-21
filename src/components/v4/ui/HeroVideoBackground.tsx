"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroVideoBackgroundProps {
  videoSrc: string;
}

export function HeroVideoBackground({ videoSrc }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Parallax effect on scroll
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (videoRef.current) {
      // Auto-play policy handling
      videoRef.current.play().catch((e) => {
        console.warn("Autoplay was prevented:", e);
      });
    }
  }, []);

  return (
    <motion.div 
      style={{ y, scale }}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#050505]"
    >
      {/* Fallback color / loading state */}
      <div 
        className={`absolute inset-0 bg-[#050505] transition-opacity duration-1000 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`} 
      />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setIsLoaded(true)}
        className="object-cover w-full h-full scale-[1.02] opacity-60"
        poster="/v4/video/poster.jpg" // Optional poster image
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlays for depth and text readability */}
      {/* 1. Heavy noise for physical texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      
      {/* 2. Gradient fade to match background at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
      
      {/* 3. Vignette effect around edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] opacity-80" />
      
      {/* 4. Subtle brand color light bleed */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-b from-[#E0FF31]/5 to-transparent rounded-full blur-[120px] mix-blend-screen pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
    </motion.div>
  );
}
