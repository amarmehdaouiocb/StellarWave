"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { navPillIndicator } from "@/lib/animations";

const navTabs = [
  { id: "services", label: "Services" },
  { id: "proof", label: "Réalisations" },
  { id: "process", label: "Process" },
  { id: "offers", label: "Offres" },
  { id: "contact", label: "Contact" },
];

interface NavPillProps {
  className?: string;
}

export function NavPill({ className }: NavPillProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active tab based on scroll position
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
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        "hidden md:flex items-center gap-1",
        "px-2 py-2 rounded-full",
        // Light theme glass
        "bg-white/80 backdrop-blur-xl border border-[oklch(0_0_0_/_8%)]",
        "transition-all duration-300",
        isScrolled && "shadow-lg",
        className
      )}
      style={{
        boxShadow: isScrolled
          ? "0 8px 32px oklch(0.2 0.01 250 / 10%), 0 32px 80px oklch(0.2 0.01 250 / 8%)"
          : "0 2px 8px oklch(0.2 0.01 250 / 4%)",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {navTabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Link
            key={tab.id}
            href={`#${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-2 rounded-full",
              "text-sm font-medium",
              "transition-colors duration-200",
              isActive
                ? "text-white"
                : "text-[var(--neutral-600)] hover:text-[var(--accent-dark)]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill-active"
                className="absolute inset-0 rounded-full bg-[var(--electric-blue)]"
                variants={navPillIndicator}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  boxShadow: "0 4px 12px oklch(0.55 0.25 255 / 25%)",
                }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </Link>
        );
      })}

      {/* Search button */}
      <button
        className={cn(
          "ml-2 flex h-9 w-9 items-center justify-center rounded-full",
          "text-[var(--neutral-500)] hover:text-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/10",
          "transition-colors duration-200"
        )}
        aria-label="Rechercher"
      >
        <MagnifyingGlass className="h-4 w-4" weight="bold" />
      </button>
    </motion.nav>
  );
}
