"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Briefcase,
  FolderKanban,
  Package,
  Cloud,
  HelpCircle,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@/config/brand";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fadeInLeft, navPillIndicator } from "@/lib/animations";

const navItems = [
  { id: "hero", label: "Accueil", icon: Home, href: "#hero" },
  { id: "services", label: "Services", icon: Briefcase, href: "#services" },
  { id: "projects", label: "Projets", icon: FolderKanban, href: "#projects" },
  { id: "offers", label: "Offres", icon: Package, href: "#offers" },
  { id: "cloud", label: "Cloud", icon: Cloud, href: "#cloud" },
  { id: "faq", label: "FAQ", icon: HelpCircle, href: "#faq" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

interface SidebarGlassProps {
  className?: string;
}

export function SidebarGlass({ className }: SidebarGlassProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

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
          "glass-heavy",
          className
        )}
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
            <Mail className="h-4 w-4" />
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
              "flex h-12 w-12 items-center justify-center rounded-xl",
              "glass-heavy",
              "transition-transform hover:scale-105 active:scale-95"
            )}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 glass-heavy border-white/10 p-0">
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
              <Mail className="h-4 w-4" />
              <span>Nous contacter</span>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
