"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTilt, Check, Lightning, FileText, ChartBar, Target } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { leadMagnet } from "@/config/brand";
import { leadMagnetSchema, LeadMagnetFormData, validateAntiSpam } from "@/lib/validators";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTAButton } from "@/components/shared/CTAButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const features = [
  { icon: ChartBar, label: leadMagnet.features[0] },
  { icon: FileText, label: leadMagnet.features[1] },
  { icon: Target, label: leadMagnet.features[2] },
  { icon: Lightning, label: leadMagnet.features[3] },
];

export function LeadMagnet() {
  const [formTimestamp] = useState(Date.now());
  const [isSuccess, setIsSuccess] = useState(false);

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
    // Anti-spam validation
    const { isBot, reason } = validateAntiSpam({
      website: data.website,
      _timestamp: formTimestamp,
    });

    if (isBot) {
      console.log("Bot detected:", reason);
      // Silently fail for bots
      setIsSuccess(true);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Lead magnet form submitted:", data);
    setIsSuccess(true);
    reset();
  };

  return (
    <AnimatedSection
      id="lead-magnet"
      className="section-padding relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[var(--ember-amber)] opacity-5 blur-[150px] rounded-full" />
      </div>

      <div className="relative container-wide lg:pl-64">
        <GlassCard className="max-w-4xl mx-auto p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Content */}
            <motion.div variants={fadeInUp}>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full aurora-gradient text-xs font-semibold text-primary-foreground mb-6">
                <Lightning className="h-3 w-3" weight="fill" />
                {leadMagnet.subtitle}
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {leadMagnet.title}
              </h2>
              <p className="text-muted-foreground mb-8">
                {leadMagnet.description}
              </p>

              {/* Features */}
              <motion.ul
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.li
                      key={index}
                      variants={staggerItem}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                        <Icon className="h-4 w-4 text-[var(--ember-amber)]" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature.label}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={fadeInUp}>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 rounded-2xl bg-white/5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full aurora-gradient mb-4">
                    <Check className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Demande envoyée !
                  </h3>
                  <p className="text-muted-foreground">
                    Vous recevrez votre mini-audit par email sous 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="lead-email" className="text-foreground">
                      Votre email professionnel
                    </Label>
                    <Input
                      id="lead-email"
                      type="email"
                      placeholder="vous@entreprise.com"
                      className="input-premium"
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
                    <Label htmlFor="lead-url" className="text-foreground">
                      URL de votre site
                    </Label>
                    <Input
                      id="lead-url"
                      type="url"
                      placeholder="https://votre-site.com"
                      className="input-premium"
                      {...register("url")}
                    />
                    {errors.url && (
                      <p className="text-sm text-destructive">
                        {errors.url.message}
                      </p>
                    )}
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

                  {/* Submit */}
                  <CTAButton
                    type="submit"
                    variant="primary"
                    className="w-full"
                    loading={isSubmitting}
                    icon={<PaperPlaneTilt className="h-4 w-4" weight="duotone" />}
                  >
                    Recevoir mon mini-audit
                  </CTAButton>

                  <p className="text-xs text-muted-foreground text-center">
                    En soumettant ce formulaire, vous acceptez de recevoir des
                    communications de notre part. Aucun spam.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </AnimatedSection>
  );
}
