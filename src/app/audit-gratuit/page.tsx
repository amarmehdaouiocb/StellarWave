"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  PaperPlaneTilt,
  Check,
  Lightning,
  ChartBar,
  FileText,
  Target,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Star,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { brand, leadMagnet } from "@/config/brand";
import { leadMagnetSchema, LeadMagnetFormData, validateAntiSpam } from "@/lib/validators";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTAButton } from "@/components/shared/CTAButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";
import { fadeInUp, staggerContainer, staggerItem, heroTitle, heroSubtitle } from "@/lib/animations";

const features = [
  { icon: ChartBar, label: leadMagnet.features[0] },
  { icon: FileText, label: leadMagnet.features[1] },
  { icon: Target, label: leadMagnet.features[2] },
  { icon: Lightning, label: leadMagnet.features[3] },
];

const trustBadges = [
  { icon: Clock, label: "Livré sous 24h" },
  { icon: ShieldCheck, label: "100% gratuit" },
  { icon: Star, label: "Sans engagement" },
];

// Compteur de scarcité - réinitialise chaque mois
function useScarcityCounter() {
  const [remaining, setRemaining] = useState(5);

  useEffect(() => {
    // Simuler un compteur basé sur le localStorage pour persistance
    const stored = localStorage.getItem("audit_counter");
    const storedMonth = localStorage.getItem("audit_counter_month");
    const currentMonth = new Date().getMonth().toString();

    if (storedMonth !== currentMonth) {
      // Nouveau mois, réinitialiser
      localStorage.setItem("audit_counter", "5");
      localStorage.setItem("audit_counter_month", currentMonth);
      setRemaining(5);
    } else if (stored) {
      setRemaining(parseInt(stored, 10));
    }
  }, []);

  const decrement = () => {
    const newValue = Math.max(0, remaining - 1);
    setRemaining(newValue);
    localStorage.setItem("audit_counter", newValue.toString());
  };

  return { remaining, decrement };
}

export default function AuditGratuitPage() {
  const [formTimestamp] = useState(Date.now());
  const [isSuccess, setIsSuccess] = useState(false);
  const { remaining, decrement } = useScarcityCounter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadMagnetFormData>({
    resolver: zodResolver(leadMagnetSchema),
    defaultValues: {
      email: "",
      url: "",
      website: "", // Honeypot
      _timestamp: formTimestamp,
    },
  });

  const onSubmit = async (data: LeadMagnetFormData) => {
    const { isBot, reason } = validateAntiSpam({
      website: data.website,
      _timestamp: formTimestamp,
    });

    if (isBot) {
      console.log("Bot detected:", reason);
      setIsSuccess(true);
      return;
    }

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Audit form submission error");
      }

      decrement();
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Audit form submission error:", error);
      setIsSuccess(true);
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <NoiseOverlay />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[var(--ember-amber)] opacity-5 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[var(--ember-coral)] opacity-5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Retour au site</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-gradient font-semibold">✦ {brand.name}</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero section */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 pt-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge urgence */}
            {remaining > 0 && (
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ember-amber)]/10 border border-[var(--ember-amber)]/20 text-sm font-medium text-[var(--ember-amber)] mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ember-amber)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ember-amber)]" />
                </span>
                Plus que {remaining} audit{remaining > 1 ? "s" : ""} gratuit{remaining > 1 ? "s" : ""} ce mois-ci
              </motion.div>
            )}

            <motion.h1
              variants={heroTitle}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Mini-audit{" "}
              <span className="text-gradient">Performance & SEO</span>
            </motion.h1>

            <motion.p
              variants={heroSubtitle}
              className="text-lg sm:text-xl text-muted-foreground mb-8"
            >
              Découvrez les quick wins pour améliorer les performances et le
              référencement de votre site. Gratuit, sans engagement.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6"
            >
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Icon className="h-5 w-5 text-[var(--ember-amber)]" />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Features & testimonial */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* What you get */}
              <motion.div variants={fadeInUp}>
                <GlassCard className="p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Ce que vous allez recevoir
                  </h2>
                  <ul className="space-y-4">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <li key={index} className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--ember-amber)]/10">
                            <Icon className="h-5 w-5 text-[var(--ember-amber)]" />
                          </div>
                          <div>
                            <span className="text-foreground">{feature.label}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </GlassCard>
              </motion.div>

              {/* Testimonial */}
              <motion.div variants={fadeInUp}>
                <GlassCard variant="subtle" className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--ember-amber)] to-[var(--ember-coral)] text-primary-foreground font-semibold">
                      PL
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-[var(--ember-amber)]"
                            weight="fill"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic mb-3">
                        &ldquo;Le mini-audit m&apos;a permis d&apos;identifier 3 problèmes
                        critiques que je n&apos;avais jamais remarqués. Mon score
                        Lighthouse est passé de 45 à 92 en suivant les recommandations.&rdquo;
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        Pierre L.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Fondateur, SaaS B2B
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* How it works */}
              <motion.div variants={fadeInUp}>
                <GlassCard variant="subtle" className="p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Comment ça marche ?
                  </h3>
                  <ol className="space-y-4">
                    {[
                      "Entrez l'URL de votre site",
                      "Nous analysons performances et SEO",
                      "Recevez votre rapport PDF sous 24h",
                    ].map((step, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ember-amber)] text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:sticky lg:top-8"
            >
              <GlassCard
                variant="gradient"
                borderGlow
                className="p-8"
              >
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center text-center py-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full aurora-gradient mb-6">
                      <Check className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      Demande envoyée !
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Vous recevrez votre mini-audit par email sous 24h.
                    </p>
                    <Link
                      href="/"
                      className="text-[var(--ember-amber)] hover:underline"
                    >
                      Retourner sur le site
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Recevez votre audit gratuit
                      </h2>
                      <p className="text-muted-foreground">
                        Analyse complète en moins de 24h
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="audit-email" className="text-foreground">
                          Votre email professionnel
                        </Label>
                        <Input
                          id="audit-email"
                          type="email"
                          placeholder="vous@entreprise.com"
                          className="input-premium h-12"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* URL */}
                      <div className="space-y-2">
                        <Label htmlFor="audit-url" className="text-foreground">
                          URL de votre site
                        </Label>
                        <Input
                          id="audit-url"
                          type="url"
                          placeholder="https://votre-site.com"
                          className="input-premium h-12"
                          {...register("url")}
                        />
                        {errors.url && (
                          <p className="text-sm text-destructive">
                            {errors.url.message}
                          </p>
                        )}
                      </div>

                      {/* Honeypot */}
                      <input
                        type="text"
                        {...register("website")}
                        className="sr-only"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      {/* Hidden timestamp */}
                      <input
                        type="hidden"
                        {...register("_timestamp", { valueAsNumber: true })}
                        value={formTimestamp}
                      />

                      {/* Submit */}
                      <CTAButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        loading={isSubmitting}
                        icon={<PaperPlaneTilt className="h-5 w-5" weight="duotone" />}
                      >
                        {remaining > 0
                          ? "Recevoir mon mini-audit gratuit"
                          : "Rejoindre la liste d'attente"}
                      </CTAButton>

                      <p className="text-xs text-muted-foreground text-center">
                        En soumettant ce formulaire, vous acceptez de recevoir des
                        communications de notre part. Aucun spam, promis.
                      </p>
                    </form>

                    {/* Urgency reminder */}
                    {remaining > 0 && remaining <= 3 && (
                      <div className="mt-6 p-4 rounded-lg bg-[var(--ember-amber)]/5 border border-[var(--ember-amber)]/10">
                        <p className="text-sm text-center text-[var(--ember-amber)]">
                          ⚡ Seulement {remaining} place{remaining > 1 ? "s" : ""}{" "}
                          restante{remaining > 1 ? "s" : ""} ce mois-ci
                        </p>
                      </div>
                    )}
                  </>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {brand.name}. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
