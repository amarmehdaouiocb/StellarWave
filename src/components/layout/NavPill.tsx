"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navTabs = [
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

interface NavPillProps {
  className?: string;
}

export function NavPill({ className }: NavPillProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navTabs.map((tab) => ({
        id: tab.id,
        element: document.getElementById(tab.id),
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed top-8 left-1/2 -translate-x-1/2 z-50",
        "hidden md:flex items-center gap-1",
        className
      )}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {navTabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isHovered = hoveredTab === tab.id;

        return (
          <Link
            key={tab.id}
            href={`#${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            className="relative flex items-center justify-center px-4 py-1.5"
          >
            {/* Active capsule — sky blue glass, slides between sections */}
            {isActive && (
              <motion.span
                layoutId="nav-active-capsule"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "rgba(56, 189, 248, 0.08)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  boxShadow:
                    "0 0 0 1px rgba(56,189,248,0.32), inset 0 1px 0 rgba(56,189,248,0.22), 0 0 18px rgba(56,189,248,0.10)",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}

            {/* Hover capsule — white glass, slides while hovering non-active items */}
            {isHovered && !isActive && (
              <motion.span
                layoutId="nav-hover-capsule"
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.13), inset 0 1px 0 rgba(255,255,255,0.10)",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}

            <span
              className="relative z-10 text-sm font-medium tracking-wide"
              style={{
                color:
                  isActive || isHovered
                    ? "#ffffff"
                    : "rgba(255,255,255,0.48)",
                textShadow: isActive
                  ? "0 0 18px rgba(56,189,248,0.50)"
                  : "none",
                transition: "color 0.18s ease, text-shadow 0.22s ease",
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </motion.nav>
  );
}
