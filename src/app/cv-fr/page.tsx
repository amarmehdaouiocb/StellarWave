import { Metadata } from "next";
import { CVFreelance } from "@/components/cv/CVFreelance";
import { profile } from "@/config/profile";
import "./cv.css";

export const metadata: Metadata = {
  title: "CV Amar Mehdaoui - Senior Full-Stack & Cloud Architect | Freelance",
  description: "CV de Amar Mehdaoui - Développeur Full-Stack Senior et Architecte Cloud certifié. 9+ ans d'expérience en React, Node.js, AWS, Kubernetes. Disponible en freelance.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "CV Amar Mehdaoui - Senior Full-Stack & Cloud Architect",
    description: "Développeur Full-Stack Senior et Architecte Cloud certifié. React, Node.js, AWS, Kubernetes. 9+ ans d'expérience.",
    type: "profile",
    locale: "fr_FR",
  },
};

export default function CVFrenchPage() {
  return <CVFreelance profile={profile} lang="fr" />;
}
