"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LinkedinLogo, XLogo, GithubLogo, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { brand } from "@/config/brand";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const footerLinks = {
  services: [
    { label: "Landing Pages", href: "#services" },
    { label: "Sites Web", href: "#services" },
    { label: "Applications Web", href: "#services" },
    { label: "Apps Mobile", href: "#services" },
    { label: "Architecture Cloud", href: "#cloud" },
  ],
  company: [
    { label: "À propos", href: "#why-us" },
    { label: "Réalisations", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "CGV", href: "/cgv" },
  ],
};

const socialLinks = [
  { icon: LinkedinLogo, href: brand.socials.linkedin, label: "LinkedIn" },
  { icon: XLogo, href: brand.socials.twitter, label: "Twitter" },
  { icon: GithubLogo, href: brand.socials.github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--neutral-900)] text-white">
      <div className="container-wide section-padding">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand column */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--electric-blue)]"
                style={{
                  boxShadow: "0 4px 16px oklch(0.55 0.25 255 / 30%)",
                }}
              >
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{brand.name}</h2>
                <p className="text-sm text-[var(--neutral-400)]">{brand.tagline}</p>
              </div>
            </div>

            <p className="text-[var(--neutral-400)] mb-6 max-w-sm leading-relaxed">
              {brand.description}
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href={`mailto:${brand.contactEmail}`}
                className="flex items-center gap-3 text-[var(--neutral-400)] hover:text-white transition-colors"
              >
                <EnvelopeSimple className="h-4 w-4 text-[var(--electric-blue)]" weight="duotone" />
                <span>{brand.contactEmail}</span>
              </a>
              <a
                href={`tel:${brand.phone}`}
                className="flex items-center gap-3 text-[var(--neutral-400)] hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-[var(--electric-blue)]" weight="duotone" />
                <span>{brand.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-[var(--neutral-400)]">
                <MapPin className="h-4 w-4 text-[var(--electric-blue)]" weight="duotone" />
                <span>{brand.address}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      "bg-white/5 hover:bg-[var(--electric-blue)]/20",
                      "text-[var(--neutral-400)] hover:text-[var(--electric-blue)]",
                      "border border-white/10 hover:border-[var(--electric-blue)]/30",
                      "transition-all duration-200"
                    )}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Services column */}
          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[var(--neutral-400)] hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company column */}
          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[var(--neutral-400)] hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal column */}
          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Légal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[var(--neutral-400)] hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--neutral-400)]">
              &copy; {new Date().getFullYear()} {brand.name}. Tous droits réservés.
            </p>
            <p className="text-sm text-[var(--neutral-400)]">
              Conçu et développé avec{" "}
              <span className="text-[var(--electric-blue)]">passion</span> à Paris
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
