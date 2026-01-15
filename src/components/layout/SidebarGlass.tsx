"use client";

import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import {
  House,
  Briefcase,
  Kanban,
  Package,
  Cloud,
  Question,
  EnvelopeSimple,
  List,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { brand } from "@/config/brand";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fadeInLeft, navPillIndicator } from "@/lib/animations";

const navItems = [
  { id: "hero", label: "Accueil", icon: House, href: "#hero" },
  { id: "services", label: "Services", icon: Briefcase, href: "#services" },
  { id: "projects", label: "Projets", icon: Kanban, href: "#projects" },
  { id: "offers", label: "Offres", icon: Package, href: "#offers" },
  { id: "cloud", label: "Cloud", icon: Cloud, href: "#cloud" },
  { id: "faq", label: "FAQ", icon: Question, href: "#faq" },
  { id: "contact", label: "Contact", icon: EnvelopeSimple, href: "#contact" },
];

interface SidebarGlassProps {
  className?: string;
}

export function SidebarGlass({ className }: SidebarGlassProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  // Mouse-follow shimmer effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const shimmerX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const shimmerY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  const NavContent = () => (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => handleNavClick(item.id)}
            className={cn(
              "relative flex items-center gap-3 px-4 py-3 rounded-xl",
              "text-muted-foreground transition-colors duration-200",
              "hover:text-foreground",
              isActive && "text-foreground"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-active-pill"
                className="absolute inset-0 rounded-xl bg-white/10"
                variants={navPillIndicator}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            )}
            <Icon className="relative z-10 h-5 w-5" />
            <span className="relative z-10 font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-20 lg:w-64",
          "hidden lg:flex flex-col",
          "liquid-glass liquid-glass-border rounded-r-3xl",
          className
        )}
        style={
          {
            "--shimmer-x": shimmerX,
            "--shimmer-y": shimmerY,
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-white/5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl aurora-gradient">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-foreground">{brand.name}</h1>
            <p className="text-xs text-muted-foreground">{brand.tagline}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <NavContent />
        </div>

        {/* CTA */}
        <div className="hidden lg:block p-4 border-t border-white/5">
          <Link
            href="#contact"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl aurora-gradient text-primary-foreground font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <EnvelopeSimple className="h-4 w-4" weight="duotone" />
            <span>Nous contacter</span>
          </Link>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            className={cn(
              "fixed left-4 top-4 z-50 lg:hidden",
              "flex h-12 w-12 items-center justify-center rounded-2xl",
              "liquid-glass liquid-glass-border",
              "transition-transform hover:scale-105 active:scale-95"
            )}
            aria-label="Ouvrir le menu"
          >
            <List className="h-5 w-5" weight="bold" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 liquid-glass border-white/10 p-0 rounded-r-3xl">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 px-4 py-6 border-b border-white/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl aurora-gradient">
              <span className="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{brand.name}</h1>
              <p className="text-xs text-muted-foreground">{brand.tagline}</p>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-3">
            <NavContent />
          </div>

          {/* Mobile CTA */}
          <div className="p-4 border-t border-white/5">
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl aurora-gradient text-primary-foreground font-semibold"
            >
              <EnvelopeSimple className="h-4 w-4" weight="duotone" />
              <span>Nous contacter</span>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
