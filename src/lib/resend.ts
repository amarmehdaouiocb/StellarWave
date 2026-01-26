import { Resend } from "resend";

// Création lazy de l'instance Resend pour éviter les erreurs au build
let resendInstance: Resend | null = null;

export const getResend = (): Resend | null => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY non définie - les emails ne seront pas envoyés");
    return null;
  }

  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }

  return resendInstance;
};

// Export pour compatibilité (mais préférer getResend())
export const resend = {
  emails: {
    send: async (...args: Parameters<Resend["emails"]["send"]>) => {
      const instance = getResend();
      if (!instance) {
        console.warn("Resend non configuré - email non envoyé");
        return { data: null, error: null };
      }
      return instance.emails.send(...args);
    },
  },
};

// Configuration email
export const emailConfig = {
  from: "Stellar Wave <contact@stellarwave.fr>",
  replyTo: "contact@stellarwave.fr",
  // Email interne pour recevoir les notifications
  notificationEmail: "contact@stellarwave.fr",
} as const;

// Types pour les données email
export type ContactEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  existingUrl?: string;
  referralSource?: string;
};

export type AuditEmailData = {
  email: string;
  url: string;
};
