import { z } from "zod";

// Lead magnet form (mini-audit)
export const leadMagnetSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer une adresse email valide"),
  url: z
    .string()
    .min(1, "L'URL du site est requise")
    .url("Veuillez entrer une URL valide (ex: https://example.com)"),
  // Honeypot field - should be empty
  website: z.string().max(0, "Erreur de validation").optional(),
  // Timestamp for timing check
  _timestamp: z.number().optional(),
});

export type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>;

// Main estimate form
export const estimateFormSchema = z.object({
  // Contact info
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer une adresse email valide"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(val),
      "Veuillez entrer un numéro de téléphone valide"
    ),
  company: z.string().optional(),

  // Project info
  projectType: z.enum(
    ["landing-page", "website", "web-app", "mobile-app", "cloud", "other"],
    {
      message: "Veuillez sélectionner un type de projet",
    }
  ),
  budget: z.enum(["5k-10k", "10k-25k", "25k-50k", "50k-100k", "100k+", "unknown"], {
    message: "Veuillez sélectionner une fourchette de budget",
  }),
  timeline: z.enum(["asap", "1-2months", "3-6months", "6months+", "flexible"], {
    message: "Veuillez sélectionner un délai",
  }),
  description: z
    .string()
    .min(20, "Décrivez votre projet en au moins 20 caractères")
    .max(2000, "La description ne peut pas dépasser 2000 caractères"),

  // Optional fields
  existingUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().url().safeParse(val).success,
      "Veuillez entrer une URL valide"
    ),
  referralSource: z
    .enum(["google", "linkedin", "referral", "social", "other", ""])
    .optional(),

  // RGPD consent
  consent: z.literal(true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),

  // Honeypot field - should be empty
  website: z.string().max(0, "Erreur de validation").optional(),
  // Timestamp for timing check
  _timestamp: z.number().optional(),
});

export type EstimateFormData = z.infer<typeof estimateFormSchema>;

// Project type options for select
export const projectTypeOptions = [
  { value: "landing-page", label: "Landing page premium" },
  { value: "website", label: "Site web / vitrine" },
  { value: "web-app", label: "Application web (SaaS, dashboard...)" },
  { value: "mobile-app", label: "Application mobile (iOS/Android)" },
  { value: "cloud", label: "Architecture cloud / DevOps" },
  { value: "other", label: "Autre" },
] as const;

// Budget options
export const budgetOptions = [
  { value: "5k-10k", label: "5 000€ - 10 000€" },
  { value: "10k-25k", label: "10 000€ - 25 000€" },
  { value: "25k-50k", label: "25 000€ - 50 000€" },
  { value: "50k-100k", label: "50 000€ - 100 000€" },
  { value: "100k+", label: "Plus de 100 000€" },
  { value: "unknown", label: "Je ne sais pas encore" },
] as const;

// Timeline options
export const timelineOptions = [
  { value: "asap", label: "Dès que possible" },
  { value: "1-2months", label: "1 à 2 mois" },
  { value: "3-6months", label: "3 à 6 mois" },
  { value: "6months+", label: "Plus de 6 mois" },
  { value: "flexible", label: "Flexible" },
] as const;

// Referral source options
export const referralSourceOptions = [
  { value: "google", label: "Recherche Google" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Recommandation" },
  { value: "social", label: "Réseaux sociaux" },
  { value: "other", label: "Autre" },
] as const;

// Timing check: minimum seconds before form can be submitted
export const MIN_FORM_SUBMISSION_TIME = 3;

// Validate timing (returns true if submission is too fast = likely bot)
export const isBotSubmission = (timestamp: number | undefined): boolean => {
  if (!timestamp) return false;
  const elapsedSeconds = (Date.now() - timestamp) / 1000;
  return elapsedSeconds < MIN_FORM_SUBMISSION_TIME;
};

// Check honeypot (returns true if honeypot is filled = likely bot)
export const isHoneypotFilled = (honeypot: string | undefined): boolean => {
  return !!honeypot && honeypot.length > 0;
};

// Combined bot check
export const validateAntiSpam = (data: {
  website?: string;
  _timestamp?: number;
}): { isBot: boolean; reason?: string } => {
  if (isHoneypotFilled(data.website)) {
    return { isBot: true, reason: "honeypot" };
  }
  if (isBotSubmission(data._timestamp)) {
    return { isBot: true, reason: "timing" };
  }
  return { isBot: false };
};
