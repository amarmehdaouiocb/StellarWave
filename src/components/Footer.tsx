"use client";

import { motion } from "framer-motion";

const footerLinks = {
  produit: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Comment ça marche", href: "#how-it-works" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Réalisations", href: "#showcases" },
  ],
  entreprise: [
    { label: "À propos", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Mentions légales", href: "#" },
    { label: "CGV", href: "#" },
    { label: "Confidentialité", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card glow-border p-12 lg:p-16 text-center overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, var(--accent-subtle), transparent)" }}
          />

          <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Prêt à lancer
              <br />
              <span className="text-gradient">votre site web ?</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
              Rejoignez les 2 500+ commerces qui ont déjà fait confiance à Facilsite.
              Preview gratuite, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="#top"
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Demander ma preview gratuite
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              <a href="#pricing" className="btn-secondary">
                Voir les tarifs
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Links */}
      <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-xl font-bold mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <span>Facilsite</span>
              </a>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                Des sites web professionnels pour les commerces locaux. Simple, rapide, efficace.
              </p>
              <div className="flex gap-4">
                {[
                  <path key="tw" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />,
                  <path key="tg" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.02-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.94.12.78.89z" />,
                  <path key="ig" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
                  <path key="li" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
                ].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: "var(--bg-elevated)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{icon}</svg>
                  </a>
                ))}
              </div>
            </div>

            {(["produit", "entreprise", "legal"] as const).map((section) => (
              <div key={section}>
                <h4 className="font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </h4>
                <ul className="space-y-3">
                  {footerLinks[section].map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="transition-colors duration-200"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              &copy; {new Date().getFullYear()} Facilsite. Tous droits réservés.
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Fait avec &hearts; en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
