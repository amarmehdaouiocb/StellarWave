"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  /** Path to the video source (WebM preferred) */
  videoSrc?: string;
  /** Path to the fallback MP4 video */
  videoSrcFallback?: string;
  /** Path to the 4K poster/fallback image */
  posterSrc: string;
  /** Dark overlay opacity (0-1) for text readability */
  overlayOpacity?: number;
  /** Parallax strength in pixels - higher = more movement */
  parallaxStrength?: number;
  /** Additional CSS classes */
  className?: string;
  /** Scale effect on scroll (default 1.1) */
  scaleOnScroll?: number;
}

export function VideoBackground({
  videoSrc,
  videoSrcFallback,
  posterSrc,
  overlayOpacity = 0.6,
  parallaxStrength = 150,
  className,
  scaleOnScroll = 1.2,
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Track window scroll directly for more dramatic parallax
  const { scrollY } = useScroll();

  // Calculate parallax based on raw scroll position
  // Background moves UP slower than scroll (classic parallax - distant = slower)
  // Negative values make background "lag behind" as you scroll down
  const y = useTransform(
    scrollY,
    [0, 1000],
    prefersReducedMotion ? [0, 0] : [0, -parallaxStrength]
  );

  const scale = useTransform(
    scrollY,
    [0, 800],
    prefersReducedMotion ? [1, 1] : [1, scaleOnScroll]
  );

  const opacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play video when loaded and in view
  useEffect(() => {
    if (isInView && videoRef.current && (videoSrc || videoSrcFallback)) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay - we have poster fallback
      });
    }
  }, [isInView, videoSrc, videoSrcFallback]);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const hasVideo = videoSrc || videoSrcFallback;

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {/* Video/Image Layer with Parallax - Extended bounds for movement */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          y,
          scale,
          opacity,
          top: "-10%",
          left: "-5%",
          right: "-5%",
          bottom: "-20%",
        }}
      >
        {/* 4K Background Image (always present as fallback) */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${posterSrc})`,
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Video Layer (on top of image when loaded) */}
        {hasVideo && isInView && (
          <motion.video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0 }}
            transition={{ duration: 1 }}
            onCanPlayThrough={handleVideoLoaded}
            playsInline
            muted
            loop
            preload="auto"
            poster={posterSrc}
          >
            {videoSrc && <source src={videoSrc} type="video/webm" />}
            {videoSrcFallback && (
              <source src={videoSrcFallback} type="video/mp4" />
            )}
          </motion.video>
        )}
      </motion.div>

      {/* Dark Overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"
        style={{ opacity: overlayOpacity }}
      />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.08 0.01 60 / 50%) 100%)",
        }}
      />

      {/* Subtle animated gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.79 0.08 85 / 15%) 0%, transparent 60%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default VideoBackground;
