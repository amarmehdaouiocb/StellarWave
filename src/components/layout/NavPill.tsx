"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navTabs = [
  { id: "services", label: "Services" },
  { id: "proof", label: "R\u00e9alisations" },
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
        "hidden md:flex items-center gap-8",
        className
      )}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {navTabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Link
            key={tab.id}
            href={`#${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-col items-center gap-1.5 group"
          >
            <span
              className="text-base font-medium tracking-wide transition-opacity duration-200"
              style={{
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
              }}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.span
                layoutId="nav-dot"
                className="block w-1 h-1 rounded-full"
                style={{ background: "#38bdf8" }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            {!isActive && (
              <span className="block w-1 h-1 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-200" />
            )}
          </Link>
        );
      })}
    </motion.nav>
  );
}
