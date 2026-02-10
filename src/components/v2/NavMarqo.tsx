"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { brand } from "@/config/brand";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export function NavMarqo() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/v2" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--electric-blue)]">
              <span className="text-sm font-bold text-white">SW</span>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)]">
              {brand.name}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--neutral-600)] transition-colors hover:bg-[var(--neutral-100)] hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#contact"
              className="text-sm font-medium text-[var(--neutral-600)] transition-colors hover:text-[var(--foreground)]"
            >
              Contact
            </a>
            <a
              href={brand.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[var(--electric-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--electric-blue-dark)] hover:shadow-lg"
            >
              Prendre RDV
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-[var(--neutral-100)] md:hidden"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 flex h-full w-[280px] flex-col bg-white p-6 shadow-2xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">{brand.name}</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[var(--neutral-100)]"
                  aria-label="Fermer le menu"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-[var(--neutral-700)] transition-colors hover:bg-[var(--neutral-100)]"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-[var(--neutral-700)] transition-colors hover:bg-[var(--neutral-100)]"
                >
                  Contact
                </a>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href={brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-xl bg-[var(--electric-blue)] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--electric-blue-dark)]"
                >
                  Prendre RDV
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
