import { Metadata } from "next";
import { CVFreelance } from "@/components/cv/CVFreelance";
import { profileEn } from "@/config/profile.en";
import "./cv.css";

export const metadata: Metadata = {
  title: "CV Amar Mehdaoui - Senior Full-Stack & Cloud Architect | Freelance",
  description: "Amar Mehdaoui's CV - Senior Full-Stack Developer and Certified Cloud Architect. 9+ years experience in React, Node.js, AWS, Kubernetes. Available for freelance.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "CV Amar Mehdaoui - Senior Full-Stack & Cloud Architect",
    description: "Senior Full-Stack Developer and Certified Cloud Architect. React, Node.js, AWS, Kubernetes. 9+ years experience.",
    type: "profile",
    locale: "en_US",
  },
};

export default function CVEnglishPage() {
  return <CVFreelance profile={profileEn} lang="en" />;
}
