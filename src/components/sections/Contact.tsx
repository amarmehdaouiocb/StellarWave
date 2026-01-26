"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaperPlaneTilt,
  Check,
  ArrowRight,
  ArrowLeft,
  RocketLaunch,
  Globe,
  Stack,
  DeviceMobile,
  Cloud,
  Question,
  Lightning,
  Clock,
  CurrencyEur,
  User,
  Envelope,
  Phone,
  Buildings,
  Link,
  ChatText,
  CheckCircle,
  Info,
} from "@phosphor-icons/react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fadeInUp, easings } from "@/lib/animations";

// Project type icons
const projectTypeIcons: Record<string, React.ElementType> = {
  "landing-page": RocketLaunch,
  website: Globe,
  "web-app": Stack,
  "mobile-app": DeviceMobile,
  cloud: Cloud,
  other: Question,
};

// Price ranges per project type
const priceRanges: Record<string, { min: number; max: number; label: string }> = {
  "landing-page": { min: 3000, max: 8000, label: "Landing Page Premium" },
  website: { min: 5000, max: 15000, label: "Site Web" },
  "web-app": { min: 15000, max: 80000, label: "Application Web" },
  "mobile-app": { min: 20000, max: 100000, label: "Application Mobile" },
  cloud: { min: 4000, max: 25000, label: "Architecture Cloud" },
  other: { min: 5000, max: 50000, label: "Projet sur mesure" },
};

// Timeline multipliers
const timelineMultipliers: Record<string, number> = {
  asap: 1.2,
  "1-2months": 1.0,
  "3-6months": 0.95,
  "6months+": 0.9,
  flexible: 1.0,
};

// Format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
};

// Step indicator
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
              i + 1 === currentStep
                ? "bg-[#3b82f6] text-white"
                : i + 1 < currentStep
                ? "bg-[#22c55e] text-white"
                : "bg-white/10 text-white/40"
            )}
          >
            {i + 1 < currentStep ? (
              <Check className="h-4 w-4" weight="bold" />
            ) : (
              i + 1
            )}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={cn(
                "h-0.5 w-8 transition-all duration-300",
                i + 1 < currentStep ? "bg-[#22c55e]" : "bg-white/10"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Price estimate card
function PriceEstimate({
  projectType,
  timeline,
}: {
  projectType: string;
  timeline: string;
}) {
  const estimate = useMemo(() => {
    if (!projectType) return null;
    const range = priceRanges[projectType];
    if (!range) return null;

    const multiplier = timelineMultipliers[timeline] || 1.0;
    return {
      min: Math.round(range.min * multiplier),
      max: Math.round(range.max * multiplier),
      label: range.label,
    };
  }, [projectType, timeline]);

  if (!estimate) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-5 rounded-2xl mb-6"
      style={{
        background: "rgba(59, 130, 246, 0.12)",
        border: "1px solid rgba(59, 130, 246, 0.25)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
          style={{ background: "rgba(59, 130, 246, 0.25)" }}
        >
          <CurrencyEur className="h-5 w-5 text-[#60a5fa]" weight="duotone" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Estimation indicative
            </span>
            <Info className="h-3.5 w-3.5 text-white/40" />
          </div>
          <div className="text-xl font-bold text-white mb-1">
            {formatPrice(estimate.min)} – {formatPrice(estimate.max)}
          </div>
          <p className="text-xs text-white/50">
            {estimate.label} • Prix final après étude détaillée
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Selection card for project type
function ProjectTypeCard({
  option,
  isSelected,
  onSelect,
}: {
  option: (typeof projectTypeOptions)[number];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const Icon = projectTypeIcons[option.value] || Question;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all duration-300 cursor-pointer",
        isSelected
          ? "ring-2 ring-[#3b82f6]"
          : "hover:bg-white/5"
      )}
      style={{
        background: isSelected ? "rgba(59, 130, 246, 0.15)" : "rgba(255, 255, 255, 0.05)",
        border: isSelected ? "1px solid rgba(59, 130, 246, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3"
        >
          <CheckCircle className="h-5 w-5 text-[#3b82f6]" weight="fill" />
        </motion.div>
      )}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: isSelected ? "rgba(59, 130, 246, 0.25)" : "rgba(255, 255, 255, 0.08)",
        }}
      >
        <Icon
          className={cn("h-6 w-6", isSelected ? "text-[#60a5fa]" : "text-white/60")}
          weight="duotone"
        />
      </div>
      <span
        className={cn(
          "text-sm font-medium",
          isSelected ? "text-white" : "text-white/70"
        )}
      >
        {option.label}
      </span>
    </motion.button>
  );
}

// Selection card for budget/timeline
function SelectionCard({
  option,
  isSelected,
  onSelect,
  icon: Icon,
}: {
  option: { value: string; label: string };
  isSelected: boolean;
  onSelect: () => void;
  icon: React.ElementType;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex items-center gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer w-full text-left",
        isSelected ? "ring-2 ring-[#3b82f6]" : "hover:bg-white/5"
      )}
      style={{
        background: isSelected ? "rgba(59, 130, 246, 0.12)" : "rgba(255, 255, 255, 0.05)",
        border: isSelected ? "1px solid rgba(59, 130, 246, 0.35)" : "1px solid rgba(255, 255, 255, 0.08)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
        style={{
          background: isSelected ? "rgba(59, 130, 246, 0.25)" : "rgba(255, 255, 255, 0.08)",
        }}
      >
        <Icon
          className={cn("h-4 w-4", isSelected ? "text-[#60a5fa]" : "text-white/50")}
          weight="duotone"
        />
      </div>
      <span
        className={cn(
          "text-sm font-medium flex-1",
          isSelected ? "text-white" : "text-white/70"
        )}
      >
        {option.label}
      </span>
      {isSelected && (
        <CheckCircle className="h-5 w-5 text-[#3b82f6]" weight="fill" />
      )}
    </motion.button>
  );
}

export function Contact() {
  const [step, setStep] = useState(1);
  const [formTimestamp] = useState(Date.now());
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
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
      consent: undefined,
      website: "",
      _timestamp: formTimestamp,
    },
  });

  const projectType = watch("projectType");
  const timeline = watch("timeline");
  const budget = watch("budget");

  const onSubmit = async (data: EstimateFormData) => {
    const { isBot } = validateAntiSpam({
      website: data.website,
      _timestamp: formTimestamp,
    });

    if (isBot) {
      setIsSuccess(true);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Contact form error");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Contact form error:", error);
      setIsSuccess(true);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof EstimateFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["projectType"];
    } else if (step === 2) {
      fieldsToValidate = ["budget", "timeline"];
    } else if (step === 3) {
      fieldsToValidate = ["firstName", "lastName", "email"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <AnimatedSection
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              background: "rgba(255, 255, 255, 0.80)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.60)",
              boxShadow: "var(--shadow-apple-sm)",
              color: "rgba(17, 17, 17, 0.6)",
            }}
          >
            Demander un devis
          </motion.span>

          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Parlons de </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>votre projet</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(17, 17, 17, 0.6)" }}
          >
            Réponse sous 24h • Premier appel gratuit • Sans engagement
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div
            className="relative overflow-hidden p-8 md:p-10"
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
                background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full mx-auto mb-6"
                    style={{
                      background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                      boxShadow: "0 8px 24px rgba(34, 197, 94, 0.35)",
                    }}
                  >
                    <Check className="h-10 w-10 text-white" weight="bold" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">
                    Demande envoyée !
                  </h3>
                  <p className="text-white/70 mb-6">
                    Nous avons bien reçu votre demande et reviendrons vers vous sous 24h.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.a
                      href={brand.calendlyUrl}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                      style={{
                        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                        color: "white",
                        boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Lightning className="h-4 w-4" weight="fill" />
                      Réserver un appel maintenant
                    </motion.a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <StepIndicator currentStep={step} totalSteps={4} />

                  <AnimatePresence mode="wait">
                    {/* Step 1: Project Type */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Quel type de projet ?
                        </h3>
                        <p className="text-white/60 text-sm mb-6">
                          Sélectionnez le type de projet qui correspond le mieux à votre besoin
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                          {projectTypeOptions.map((option) => (
                            <ProjectTypeCard
                              key={option.value}
                              option={option}
                              isSelected={projectType === option.value}
                              onSelect={() => setValue("projectType", option.value)}
                            />
                          ))}
                        </div>

                        {errors.projectType && (
                          <p className="text-red-400 text-sm mb-4">
                            {errors.projectType.message}
                          </p>
                        )}
                      </motion.div>
                    )}

                    {/* Step 2: Budget & Timeline */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Budget et délais
                        </h3>
                        <p className="text-white/60 text-sm mb-6">
                          Aidez-nous à calibrer notre proposition
                        </p>

                        <AnimatePresence>
                          {projectType && timeline && (
                            <PriceEstimate projectType={projectType} timeline={timeline} />
                          )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <Label className="text-white/80 text-sm mb-3 block">
                              Budget envisagé
                            </Label>
                            <div className="space-y-2">
                              {budgetOptions.map((option) => (
                                <SelectionCard
                                  key={option.value}
                                  option={option}
                                  isSelected={budget === option.value}
                                  onSelect={() => setValue("budget", option.value)}
                                  icon={CurrencyEur}
                                />
                              ))}
                            </div>
                            {errors.budget && (
                              <p className="text-red-400 text-sm mt-2">
                                {errors.budget.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label className="text-white/80 text-sm mb-3 block">
                              Délai souhaité
                            </Label>
                            <div className="space-y-2">
                              {timelineOptions.map((option) => (
                                <SelectionCard
                                  key={option.value}
                                  option={option}
                                  isSelected={timeline === option.value}
                                  onSelect={() => setValue("timeline", option.value)}
                                  icon={Clock}
                                />
                              ))}
                            </div>
                            {errors.timeline && (
                              <p className="text-red-400 text-sm mt-2">
                                {errors.timeline.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Contact Info */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Vos coordonnées
                        </h3>
                        <p className="text-white/60 text-sm mb-6">
                          Pour vous recontacter et préparer notre échange
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-white/80">
                              Prénom *
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <Input
                                id="firstName"
                                placeholder="Jean"
                                className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
                                {...register("firstName")}
                              />
                            </div>
                            {errors.firstName && (
                              <p className="text-red-400 text-xs">
                                {errors.firstName.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-white/80">
                              Nom *
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <Input
                                id="lastName"
                                placeholder="Dupont"
                                className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
                                {...register("lastName")}
                              />
                            </div>
                            {errors.lastName && (
                              <p className="text-red-400 text-xs">
                                {errors.lastName.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <Label htmlFor="email" className="text-white/80">
                            Email professionnel *
                          </Label>
                          <div className="relative">
                            <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="jean@entreprise.com"
                              className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
                              {...register("email")}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-400 text-xs">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white/80">
                              Téléphone
                            </Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+33 6 00 00 00 00"
                                className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
                                {...register("phone")}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="company" className="text-white/80">
                              Entreprise
                            </Label>
                            <div className="relative">
                              <Buildings className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <Input
                                id="company"
                                placeholder="Acme Inc."
                                className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
                                {...register("company")}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Project Details */}
                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Décrivez votre projet
                        </h3>
                        <p className="text-white/60 text-sm mb-6">
                          Plus vous êtes précis, plus notre réponse sera pertinente
                        </p>

                        <div className="space-y-2 mb-4">
                          <Label htmlFor="description" className="text-white/80">
                            Description du projet *
                          </Label>
                          <div className="relative">
                            <ChatText className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                            <Textarea
                              id="description"
                              placeholder="Décrivez votre projet : objectifs, fonctionnalités souhaitées, cible utilisateur..."
                              className="pl-10 min-h-[120px] bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
                              {...register("description")}
                            />
                          </div>
                          {errors.description && (
                            <p className="text-red-400 text-xs">
                              {errors.description.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 mb-4">
                          <Label htmlFor="existingUrl" className="text-white/80">
                            Site existant (optionnel)
                          </Label>
                          <div className="relative">
                            <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input
                              id="existingUrl"
                              type="url"
                              placeholder="https://votre-site-actuel.com"
                              className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
                              {...register("existingUrl")}
                            />
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <Label htmlFor="referralSource" className="text-white/80">
                            Comment nous avez-vous trouvé ?
                          </Label>
                          <select
                            id="referralSource"
                            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white focus:border-[#3b82f6] focus:ring-[#3b82f6]/20 focus:outline-none"
                            {...register("referralSource")}
                          >
                            <option value="" className="bg-[#1a1a2e]">Sélectionner...</option>
                            {referralSourceOptions.map((option) => (
                              <option key={option.value} value={option.value} className="bg-[#1a1a2e]">
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Consent */}
                        <div className="flex items-start gap-3 mb-6">
                          <input
                            type="checkbox"
                            id="consent"
                            className="mt-1 h-4 w-4 rounded border-white/15 bg-white/10 text-[#3b82f6] focus:ring-[#3b82f6]/20"
                            {...register("consent")}
                          />
                          <label htmlFor="consent" className="text-sm text-white/60">
                            J'accepte que mes données soient utilisées pour traiter ma demande et recevoir des communications de {brand.name}. *
                          </label>
                        </div>
                        {errors.consent && (
                          <p className="text-red-400 text-xs mb-4">
                            {errors.consent.message}
                          </p>
                        )}

                        {/* Honeypot */}
                        <input
                          type="text"
                          {...register("website")}
                          className="sr-only"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                        />
                        <input
                          type="hidden"
                          {...register("_timestamp", { valueAsNumber: true })}
                          value={formTimestamp}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-8">
                    {step > 1 ? (
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors"
                        whileTap={{ scale: 0.98 }}
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Retour
                      </motion.button>
                    ) : (
                      <div />
                    )}

                    {step < 4 ? (
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                        style={{
                          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                          color: "white",
                          boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)",
                        }}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Continuer
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-70"
                        style={{
                          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                          color: "white",
                          boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)",
                        }}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <PaperPlaneTilt className="h-4 w-4" weight="duotone" />
                        {isSubmitting ? "Envoi..." : "Envoyer ma demande"}
                      </motion.button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export default Contact;
