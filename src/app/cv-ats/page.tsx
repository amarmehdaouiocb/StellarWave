"use client";

import { motion } from "framer-motion";
import { FileDoc, DownloadSimple, CheckCircle, Robot } from "@phosphor-icons/react";
import Link from "next/link";

export default function CVATSPage() {
  const features = [
    "Format Word (.docx) compatible avec tous les ATS",
    "Police Arial standard - parsing optimal",
    "Structure linéaire sans colonnes complexes",
    "Mots-clés tech optimisés pour le SEO recruteur",
    "Sections clairement identifiées",
    "Bullet points standards"
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container-wide flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-display font-bold text-gradient">
            StellarWave
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/cv-fr"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              CV Web
            </Link>
            <Link
              href="/cv/amar-mehdaoui-fullstack-cloud-cv.docx"
              download
              className="btn-primary text-sm flex items-center gap-2"
            >
              <DownloadSimple weight="bold" className="w-4 h-4" />
              Télécharger
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 section-padding">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Robot weight="duotone" className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Optimisé ATS</span>
            </div>

            <h1 className="text-headline font-display font-bold text-foreground mb-6">
              CV Format Word
              <span className="text-gradient block">Compatible ATS</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Version optimisée pour les systèmes de suivi de candidatures (Applicant Tracking Systems).
              Format simple, mots-clés ciblés, parsing garanti.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cv/amar-mehdaoui-fullstack-cloud-cv.docx"
                download
                className="btn-primary text-lg px-8 py-4 flex items-center gap-3"
              >
                <FileDoc weight="duotone" className="w-6 h-6" />
                Télécharger le CV (.docx)
              </Link>
              <Link
                href="/cv-fr"
                className="btn-secondary text-lg px-8 py-4"
              >
                Voir le CV Web
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-card/30">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Pourquoi ce format ?
            </h2>
            <p className="text-muted-foreground">
              Les ATS rejettent 75% des CV à cause du formatage. Ce CV passe tous les filtres.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-glass p-8"
          >
            <ul className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle weight="duotone" className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Profile Summary */}
      <section className="section-padding">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-glass p-8"
          >
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              Amar Mehdaoui
            </h3>
            <p className="text-primary font-medium mb-4">
              Développeur Full-Stack Senior & Architecte Cloud
            </p>
            <p className="text-muted-foreground mb-6">
              9+ années d'expérience • React, Node.js, TypeScript, Python • AWS, GCP, Kubernetes •
              5 certifications Cloud • Full Remote
            </p>

            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "GCP", "Kubernetes", "Terraform", "PostgreSQL", "LangChain"].map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-muted-foreground mb-6">
              Besoin d'un développeur Full-Stack Senior pour votre projet ?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:amar@stellarwave.fr"
                className="btn-primary"
              >
                Me contacter
              </a>
              <a
                href="https://linkedin.com/in/amar-mehdaoui"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container-wide text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Amar Mehdaoui — StellarWave</p>
        </div>
      </footer>
    </main>
  );
}
