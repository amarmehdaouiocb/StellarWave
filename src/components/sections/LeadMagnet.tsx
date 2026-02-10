"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTilt, Check, Lightning, FileText, ChartBar, Target } from "@phosphor-icons/react";
import { leadMagnet } from "@/config/brand";
import { leadMagnetSchema, LeadMagnetFormData, validateAntiSpam } from "@/lib/validators";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
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
    // Anti-spam validation (also done server-side)
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

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Audit form submission error:", errorData);
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Audit form submission error:", error);
      // Still show success to provide consistent UX
      setIsSuccess(true);
      reset();
    }
  };

  return (
    <AnimatedSection
      id="lead-magnet"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
      <div className="relative container-wide">
        {/* Apple-like dark card */}
        <div
          className="max-w-4xl mx-auto p-10 md:p-14 relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
            borderRadius: "var(--card-radius-2xl)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "var(--shadow-apple-xl)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59, 130, 246, 0.18) 0%, transparent 60%)"
            }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Content */}
            <motion.div variants={fadeInUp}>
              {/* Badge - Glass style */}
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  color: "white",
                  boxShadow: "0 4px 16px rgba(59, 130, 246, 0.35)"
                }}
              >
                <Lightning className="h-3 w-3" weight="fill" />
                {leadMagnet.subtitle}
              </span>

              <h2
                className="text-2xl sm:text-3xl font-semibold mb-4"
                style={{ color: "white" }}
              >
                {leadMagnet.title}
              </h2>
              <p
                className="mb-8 leading-relaxed"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
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
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ background: "rgba(59, 130, 246, 0.20)" }}
                      >
                        <Icon className="h-4 w-4" style={{ color: "#60a5fa" }} />
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: "rgba(255, 255, 255, 0.8)" }}
                      >
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
                <div
                  className="flex flex-col items-center justify-center h-full text-center p-8 rounded-2xl"
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full mb-4"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                    }}
                  >
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "white" }}
                  >
                    Demande envoyée !
                  </h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Vous recevrez votre mini-audit par email sous 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="lead-email"
                      style={{ color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      Votre email professionnel
                    </Label>
                    <Input
                      id="lead-email"
                      type="email"
                      placeholder="vous@entreprise.com"
                      className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* URL */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="lead-url"
                      style={{ color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      URL de votre site
                    </Label>
                    <Input
                      id="lead-url"
                      type="url"
                      placeholder="https://votre-site.com"
                      className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
                      {...register("url")}
                    />
                    {errors.url && (
                      <p className="text-sm text-red-400">
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

                  {/* Submit - Gradient button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-base rounded-2xl disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)",
                    }}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      boxShadow: "0 12px 32px rgba(59, 130, 246, 0.45)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PaperPlaneTilt className="h-5 w-5" weight="duotone" />
                    {isSubmitting ? "Envoi..." : "Recevoir mon mini-audit"}
                  </motion.button>

                  <p
                    className="text-xs text-center"
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    En soumettant ce formulaire, vous acceptez de recevoir des
                    communications de notre part. Aucun spam.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
