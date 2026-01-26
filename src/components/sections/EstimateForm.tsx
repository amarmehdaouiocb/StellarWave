"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTilt, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { brand } from "@/config/brand";
import {
  estimateFormSchema,
  EstimateFormData,
  projectTypeOptions,
  budgetOptions,
  timelineOptions,
  referralSourceOptions,
  validateAntiSpam,
} from "@/lib/validators";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTAButton } from "@/components/shared/CTAButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export function EstimateForm() {
  const router = useRouter();
  const [formTimestamp] = useState(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EstimateFormData>({
    resolver: zodResolver(estimateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      projectType: undefined,
      budget: undefined,
      timeline: undefined,
      description: "",
      existingUrl: "",
      referralSource: undefined,
      consent: false as unknown as true,
      website: "", // Honeypot
      _timestamp: formTimestamp,
    },
  });

  const onSubmit = async (data: EstimateFormData) => {
    // Anti-spam validation (also done server-side)
    const { isBot, reason } = validateAntiSpam({
      website: data.website,
      _timestamp: formTimestamp,
    });

    if (isBot) {
      console.log("Bot detected:", reason);
      // Redirect anyway to not reveal bot detection
      router.push("/merci");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Form submission error:", errorData);
        // Still redirect to not reveal errors to users
      }

      router.push("/merci");
    } catch (error) {
      console.error("Form submission error:", error);
      // Still redirect on error to provide consistent UX
      router.push("/merci");
    }
  };

  return (
    <AnimatedSection
      id="contact"
      className="section-padding bg-[var(--background)]"
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
        >
          <span
            className="inline-block px-4 py-2 rounded-full bg-white border border-[oklch(0_0_0_/_8%)] text-sm font-medium text-[var(--neutral-600)] mb-6"
            style={{ boxShadow: "0 2px 8px oklch(0.2 0.01 250 / 4%)" }}
          >
            Parlons de votre projet
          </span>
          <h2 className="text-display-mega text-[var(--accent-dark)] mb-6">
            Recevoir une <span className="text-gradient-hero">estimation</span>
          </h2>
          <p className="text-lg text-[var(--neutral-500)]">
            Décrivez votre projet et recevez une proposition détaillée sous 48h.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info sidebar */}
          <motion.div
            className="lg:col-span-1"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="sticky top-32 space-y-6">
              <motion.div variants={staggerItem}>
                <GlassCard className="mb-6" variant="default">
                  <h3 className="text-lg font-semibold text-[var(--accent-dark)] mb-4">
                    Autres moyens de nous contacter
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href={`mailto:${brand.contactEmail}`}
                        className="flex items-center gap-3 text-[var(--neutral-500)] hover:text-[var(--accent-dark)] transition-colors"
                      >
                        <EnvelopeSimple className="h-5 w-5 text-[var(--electric-blue)]" weight="duotone" />
                        {brand.contactEmail}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${brand.phone}`}
                        className="flex items-center gap-3 text-[var(--neutral-500)] hover:text-[var(--accent-dark)] transition-colors"
                      >
                        <Phone className="h-5 w-5 text-[var(--electric-blue)]" weight="duotone" />
                        {brand.phone}
                      </a>
                    </li>
                    <li>
                      <div className="flex items-center gap-3 text-[var(--neutral-500)]">
                        <MapPin className="h-5 w-5 text-[var(--electric-blue)]" weight="duotone" />
                        {brand.address}
                      </div>
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div variants={staggerItem}>
                <GlassCard variant="default">
                  <h3 className="text-lg font-semibold text-[var(--accent-dark)] mb-4">
                    Délai de réponse
                  </h3>
                  <p className="text-[var(--neutral-500)] mb-4">
                    Nous répondons à toutes les demandes sous 24-48h ouvrées.
                  </p>
                  <p className="text-sm text-[var(--neutral-400)]">
                    Besoin urgent ? Appelez-nous directement.
                  </p>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeInUp}
          >
            <GlassCard className="p-8" variant="default">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal info */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent-dark)] mb-6">
                    Vos coordonnées
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        className="input-premium"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        className="input-premium"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email professionnel *</Label>
                      <Input
                        id="email"
                        type="email"
                        className="input-premium"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="input-premium"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        className="input-premium"
                        {...register("company")}
                      />
                    </div>
                  </div>
                </div>

                {/* Project info */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent-dark)] mb-6">
                    Votre projet
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Type de projet *</Label>
                      <select
                        id="projectType"
                        className="input-premium w-full"
                        {...register("projectType")}
                      >
                        <option value="">Sélectionnez...</option>
                        {projectTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="text-sm text-destructive">
                          {errors.projectType.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget indicatif *</Label>
                      <select
                        id="budget"
                        className="input-premium w-full"
                        {...register("budget")}
                      >
                        <option value="">Sélectionnez...</option>
                        {budgetOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p className="text-sm text-destructive">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Délai souhaité *</Label>
                      <select
                        id="timeline"
                        className="input-premium w-full"
                        {...register("timeline")}
                      >
                        <option value="">Sélectionnez...</option>
                        {timelineOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.timeline && (
                        <p className="text-sm text-destructive">
                          {errors.timeline.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="existingUrl">Site existant (si applicable)</Label>
                      <Input
                        id="existingUrl"
                        type="url"
                        placeholder="https://..."
                        className="input-premium"
                        {...register("existingUrl")}
                      />
                      {errors.existingUrl && (
                        <p className="text-sm text-destructive">
                          {errors.existingUrl.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="description">
                        Décrivez votre projet *
                      </Label>
                      <Textarea
                        id="description"
                        rows={6}
                        placeholder="Objectifs, fonctionnalités souhaitées, contraintes..."
                        className="input-premium resize-none"
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-sm text-destructive">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referralSource">
                        Comment nous avez-vous connu ?
                      </Label>
                      <select
                        id="referralSource"
                        className="input-premium w-full"
                        {...register("referralSource")}
                      >
                        <option value="">Sélectionnez...</option>
                        {referralSourceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Honeypot - hidden */}
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

                {/* RGPD consent */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                      {...register("consent")}
                    />
                    <Label htmlFor="consent" className="text-sm text-[var(--neutral-500)]">
                      J&apos;accepte que mes données soient utilisées pour traiter ma
                      demande et me recontacter. Consultez notre{" "}
                      <a
                        href="/confidentialite"
                        className="text-[var(--electric-blue)] hover:underline"
                      >
                        politique de confidentialité
                      </a>
                      . *
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-destructive">
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <CTAButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  loading={isSubmitting}
                  icon={<PaperPlaneTilt className="h-5 w-5" weight="duotone" />}
                >
                  Envoyer ma demande
                </CTAButton>

                <p className="text-xs text-[var(--neutral-400)]">
                  * Champs obligatoires. Vos données sont traitées conformément au
                  RGPD et ne seront jamais partagées avec des tiers.
                </p>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
