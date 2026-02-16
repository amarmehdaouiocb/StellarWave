"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "Tarifs", href: "#pricing" },
  { label: "Réalisations", href: "#showcases" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.05]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          borderBottom: "1px solid",
          borderColor: useTransform(borderOpacity, (v) =>
            `rgba(128, 128, 128, ${v})`
          ),
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: "var(--bg-primary)",
            opacity: bgOpacity,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 text-xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: "var(--gradient-accent)",
                  boxShadow: "0 4px 12px var(--accent-glow)",
                }}
              >
                <span className="text-white font-extrabold text-lg">S</span>
              </div>
              <span style={{ color: "var(--text-primary)" }}>Facilsite</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-200 relative group"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-secondary)")
                  }
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full group-hover:w-full transition-all duration-300"
                    style={{ background: "var(--accent-primary)" }}
                  />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <a
                href="#"
                className="text-sm font-medium transition-colors duration-200 px-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Se connecter
              </a>
              <motion.a
                href="#top"
                className="btn-primary py-2.5 px-5 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Preview gratuite
              </motion.a>
            </div>

            {/* Mobile actions */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl"
                style={{
                  color: "var(--text-primary)",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          pointerEvents: isMobileMenuOpen ? ("auto" as const) : ("none" as const),
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-20 left-0 right-0 z-40 lg:hidden"
      >
        <div
          className="mx-4 p-6 glass-card"
          style={{ border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium py-2 transition-colors duration-200"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </a>
            ))}
            <hr style={{ borderColor: "var(--border-subtle)" }} />
            <a
              href="#"
              className="font-medium py-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Se connecter
            </a>
            <a href="#top" className="btn-primary text-center">
              Preview gratuite
            </a>
          </div>
        </div>
      </motion.div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
