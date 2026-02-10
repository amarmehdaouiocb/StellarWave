"use client";

import Link from "next/link";
import { LinkedinLogo, TwitterLogo, GithubLogo, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";
import { brand } from "@/config/brand";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Landing Pages", href: "#services" },
      { label: "Applications Web", href: "#services" },
      { label: "Architecture Cloud", href: "#services" },
      { label: "Apps Mobile", href: "#services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Process", href: "#process" },
      { label: "Projets", href: "#projets" },
      { label: "FAQ", href: "#faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

const socialLinks = [
  { icon: <LinkedinLogo size={20} weight="bold" />, href: brand.socials.linkedin, label: "LinkedIn" },
  { icon: <TwitterLogo size={20} weight="bold" />, href: brand.socials.twitter, label: "Twitter" },
  { icon: <GithubLogo size={20} weight="bold" />, href: brand.socials.github, label: "GitHub" },
];

export function FooterMarqo() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand column */}
          <div>
            <Link href="/v2" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--electric-blue)]">
                <span className="text-sm font-bold text-white">SW</span>
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)]">
                {brand.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--neutral-500)]">
              {brand.tagline}. Nous construisons des produits digitaux qui génèrent des résultats mesurables.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--neutral-500)] transition-all hover:border-[var(--electric-blue)]/20 hover:bg-[var(--electric-blue)]/5 hover:text-[var(--electric-blue)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--neutral-400)]">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--neutral-500)] transition-colors hover:text-[var(--foreground)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--neutral-400)]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${brand.contactEmail}`}
                  className="flex items-center gap-2.5 text-sm text-[var(--neutral-500)] transition-colors hover:text-[var(--foreground)]"
                >
                  <EnvelopeSimple size={16} className="flex-shrink-0" />
                  {brand.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.phone}`}
                  className="flex items-center gap-2.5 text-sm text-[var(--neutral-500)] transition-colors hover:text-[var(--foreground)]"
                >
                  <Phone size={16} className="flex-shrink-0" />
                  {brand.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[var(--neutral-500)]">
                <MapPin size={16} className="flex-shrink-0" />
                {brand.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--neutral-400)]">
            &copy; {new Date().getFullYear()} {brand.name}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[var(--neutral-400)] transition-colors hover:text-[var(--neutral-600)]">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-[var(--neutral-400)] transition-colors hover:text-[var(--neutral-600)]">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
