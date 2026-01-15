import { LucideIcon } from "lucide-react";

// Navigation
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
}

// Service
export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: readonly string[];
  cta: string;
}

// Case Study
export interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  image: string;
  context: string;
  action: string;
  results: readonly CaseStudyResult[];
}

// Proof Metric
export interface ProofMetric {
  label: string;
  before: number;
  after: number;
  suffix: string;
  description: string;
  inverse?: boolean;
}

// Process Step
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
  deliverables: readonly string[];
}

// Offer
export interface Offer {
  id: string;
  name: string;
  description: string;
  price: string;
  features: readonly string[];
  cta: string;
  popular: boolean;
}

// Cloud Offer
export interface CloudOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: readonly string[];
  duration: string;
  price: string;
}

// FAQ
export interface FAQ {
  question: string;
  answer: string;
}

// Hero Slide
export interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
}

// Hero Metric
export interface HeroMetric {
  value: string;
  label: string;
}

// Trusted Logo
export interface TrustedLogo {
  name: string;
  logo: string;
}

// Form States
export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface FormState {
  status: FormStatus;
  message?: string;
}

// Why Us Item
export interface WhyUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Thank You Page Next Step
export interface NextStep {
  step: number;
  title: string;
  description: string;
}

// Social Links
export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
  youtube?: string;
}

// SEO Metadata
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// JSON-LD Types
export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  description?: string;
  email?: string;
  telephone?: string;
  address?: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
  };
  areaServed?: string;
  serviceType?: string;
}
