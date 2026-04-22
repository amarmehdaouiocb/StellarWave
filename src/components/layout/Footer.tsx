"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LinkedinLogo,
  XLogo,
  GithubLogo,
} from "@phosphor-icons/react";
import { brand } from "@/config/brand";
import { fadeInUp } from "@/lib/animations";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "R\u00e9alisations", href: "#proof" },
  { label: "Process", href: "#process" },
  { label: "Offres", href: "#offers" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Mentions l\u00e9gales", href: "/mentions-legales" },
  { label: "Confidentialit\u00e9", href: "/confidentialite" },
  { label: "CGV", href: "/cgv" },
];

const socialLinks = [
  { icon: LinkedinLogo, href: brand.socials.linkedin, label: "LinkedIn" },
  { icon: XLogo, href: brand.socials.twitter, label: "Twitter" },
  { icon: GithubLogo, href: brand.socials.github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer style={{ background: "#010409" }} className="text-white">
      {/* Lime decorative line */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.3) 50%, transparent 100%)",
        }}
      />

      <div className="container-wide" style={{ paddingTop: "clamp(80px, 10vw, 120px)", paddingBottom: "clamp(40px, 5vw, 60px)" }}>
        {/* Signature brand name — oversized editorial */}
        <motion.div
          className="mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2
            className="cursor-pointer select-none"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(4rem, 10vw, 8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.5)",
              transition: "color 500ms ease",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "rgba(255, 255, 255, 1)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255, 255, 255, 0.5)"; }}
          >
            Stellar Wave
          </h2>
        </motion.div>

        {/* Compact 2-column layout */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Nav + Legal */}
          <div className="flex gap-16">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#38bdf8" }}>
                Navigation
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: "var(--text-body)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#38bdf8" }}>
                L&eacute;gal
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: "var(--text-body)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact info — compact */}
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${brand.contactEmail}`}
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ color: "var(--text-body)" }}
            >
              {brand.contactEmail}
            </a>
            <a
              href={`tel:${brand.phone}`}
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ color: "var(--text-body)" }}
            >
              {brand.phone}
            </a>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              Paris, France
            </span>

            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: "rgba(56, 189, 248, 0.06)",
                      border: "1px solid rgba(56, 189, 248, 0.12)",
                      color: "var(--text-muted)",
                    }}
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(56, 189, 248, 0.08)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} {brand.name}. Tous droits r&eacute;serv&eacute;s.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Con&ccedil;u avec <span style={{ color: "#38bdf8" }}>rigueur</span> &agrave; Paris
          </p>
        </div>
      </div>
    </footer>
  );
}
