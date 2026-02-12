export type SkillLevel = "expert" | "advanced" | "intermediate";

export type Skill = {
  name: string;
  level: SkillLevel;
  icon?: string;
};

export type SkillCategory = {
  title: string;
  color: string;
  skills: Skill[];
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "freelance" | "cdi" | "cdd" | "stage";
  achievements: string[];
  stack: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  badge?: string;
};

export type Project = {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  image?: string;
};

export type ProfileData = {
  personal: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    availability: string;
    tjm: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  skills: SkillCategory[];
  experience: Experience[];
  certifications: Certification[];
  projects: Project[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
};

export const profile: ProfileData = {
  personal: {
    name: "Amar Mehdaoui",
    title: "Senior Full-Stack Engineer & Cloud Architect | SaaS • AI • Kubernetes",
    bio: "Développeur Full-Stack Senior (React, Next.js, TypeScript, Node.js, Python) et Architecte Cloud certifié (AWS, GCP, Azure, Kubernetes, Terraform). 9+ ans d'expérience en conception de plateformes SaaS multi-tenant, architectures microservices event-driven et solutions AI/LLM. Expertise combinée Dev + Ops + IA : du code au déploiement K8s, de l'API au RAG pipeline. Track record : grands comptes CAC40 (Orange Business), scale-ups FinTech, et création produit from scratch (Fidelya SaaS).",
    avatar: "/avatar.jpg",
    email: "amar@stellarwave.fr",
    phone: "+33 6 25 05 97 32",
    location: "Paris, France (Full Remote)",
    linkedin: "https://linkedin.com/in/amar-mehdaoui",
    github: "https://github.com/amarmehdaouiocb",
    website: "https://stellarwave.fr",
    availability: "Disponible immédiatement",
    tjm: "700€ - 950€",
  },
  stats: [
    { label: "Années d'expérience", value: "9+" },
    { label: "Projets livrés", value: "50+" },
    { label: "Certifications Cloud", value: "5" },
    { label: "Savings FinOps", value: "-18%" },
  ],
  skills: [
    {
      title: "Full-Stack",
      color: "#3b82f6",
      skills: [
        { name: "React / Next.js 15", level: "expert" },
        { name: "TypeScript / JavaScript", level: "expert" },
        { name: "Node.js / Express / Fastify", level: "expert" },
        { name: "Python / FastAPI", level: "advanced" },
        { name: "Tailwind CSS / Framer Motion", level: "expert" },
        { name: "tRPC / Prisma / Drizzle", level: "advanced" },
      ],
    },
    {
      title: "Bases de données & APIs",
      color: "#10b981",
      skills: [
        { name: "PostgreSQL / Supabase", level: "expert" },
        { name: "Redis / Kafka", level: "advanced" },
        { name: "REST / GraphQL / gRPC", level: "expert" },
        { name: "Event-Driven / CQRS", level: "advanced" },
        { name: "MongoDB / DynamoDB", level: "advanced" },
        { name: "Elasticsearch", level: "intermediate" },
      ],
    },
    {
      title: "Cloud & DevOps",
      color: "#f59e0b",
      skills: [
        { name: "AWS (ECS, Lambda, RDS, S3, CDK)", level: "expert" },
        { name: "GCP / Azure", level: "advanced" },
        { name: "Kubernetes / Helm / Istio", level: "advanced" },
        { name: "Terraform / Pulumi", level: "advanced" },
        { name: "CI/CD (GitHub Actions, GitLab)", level: "expert" },
        { name: "Datadog / Prometheus / Grafana", level: "advanced" },
      ],
    },
    {
      title: "AI & Architecture",
      color: "#8b5cf6",
      skills: [
        { name: "LangChain / LlamaIndex / RAG", level: "advanced" },
        { name: "OpenAI API / Claude API", level: "advanced" },
        { name: "Vector DB (Pinecone, Weaviate)", level: "intermediate" },
        { name: "Architecture multi-tenant SaaS", level: "expert" },
        { name: "Microservices / DDD", level: "expert" },
        { name: "FinOps / Cost Optimization", level: "expert" },
      ],
    },
  ],
  experience: [
    {
      role: "Fondateur & Lead Full-Stack Developer",
      company: "Fidelya",
      location: "Full Remote",
      period: "2025 - Présent",
      type: "freelance",
      achievements: [
        "Architecture et développement from scratch d'un SaaS B2B multi-tenant pour la fidélisation restaurant (React, TypeScript, Node.js, Supabase)",
        "Frontend : SPA React/TypeScript avec dashboards temps réel, système de rôles (admin/caissier), analytics avancés",
        "Backend : APIs REST Node.js/Express, PostgreSQL avec Row Level Security, architecture event-driven, moteur de campagnes automatisées",
        "Intégration IA : RAG pipeline avec LangChain + Azure AI Document Intelligence pour OCR et analyse sémantique de tickets",
        "Features : QR code loyalty, Apple Wallet passes, campagnes omnicanal automatisées (SMS, WhatsApp, email, push)",
      ],
      stack: ["React", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "LangChain", "Azure AI", "Vercel"],
    },
    {
      role: "Cloud Solution Architect",
      company: "Orange Business",
      location: "Paris (Hybrid → Remote)",
      period: "Janvier 2020 - Décembre 2024",
      type: "cdi",
      achievements: [
        "Design d'architectures cloud multi-cloud (AWS, Azure, GCP) pour 15+ grands comptes CAC40 et ETI",
        "Lead technique pré-sales : réponses à appels d'offres (€500K-5M), ateliers techniques, présentations C-level, POC",
        "Pilotage de migrations microservices/Kubernetes : HLD/LLD, IaC Terraform, pipelines CI/CD, monitoring Datadog",
        "FinOps : réduction de 18% des coûts cloud annuels via tagging policies, rightsizing, Reserved Instances",
        "Mission détachée scale-up FinTech (6 mois) : migration monolithe → 12 microservices K8s, Istio service mesh, multi-région EU/US",
      ],
      stack: ["AWS", "Azure", "GCP", "Kubernetes", "Istio", "Terraform", "Python", "TypeScript", "GitLab CI", "Datadog"],
    },
    {
      role: "Consultant Cloud & DevOps Indépendant",
      company: "Freelance",
      location: "Full Remote",
      period: "Novembre 2018 - Décembre 2019",
      type: "freelance",
      achievements: [
        "Missions courtes pour PME/startups : migrations AWS, mise en place CI/CD, conteneurisation Docker/K8s",
        "Développement d'outils d'automatisation internes : scripts Python, chatbots Slack, intégrations API tierces",
        "Formation continue et préparation aux certifications cloud (AWS, GCP) — obtenues ultérieurement",
        "Contributions open source : PR mergées sur terraform-aws-modules, amélioration de modules Terraform communautaires",
      ],
      stack: ["AWS", "Docker", "Kubernetes", "Terraform", "Python", "Ansible", "CI/CD"],
    },
    {
      role: "DevOps Engineer",
      company: "Orange",
      location: "Paris, France",
      period: "Septembre 2017 - Octobre 2018",
      type: "cdi",
      achievements: [
        "Développement full-stack d'une application interne (Python/JS) et automatisation de workflows data critiques",
        "Migration de données à grande échelle via Talend ETL — 100% intégrité, zero downtime",
        "Mise en place de pipelines CI/CD : réduction de 37% du temps de déploiement, tests automatisés",
        "Évangélisation DevOps : formation des équipes dev/ops, mise en place de pratiques GitFlow, monitoring, alerting",
      ],
      stack: ["Python", "JavaScript", "Talend ETL", "Jenkins", "Docker", "PostgreSQL", "Linux"],
    },
    {
      role: "Full-Stack Developer & DevOps",
      company: "Devoto",
      location: "Paris, France",
      period: "Avril 2015 - Septembre 2017",
      type: "cdi",
      achievements: [
        "Construction from scratch d'un CMS/ERP propriétaire en .NET — architecture n-tiers, API REST, frontend responsive",
        "Livraison de 17 sites web clients avec performances optimisées (< 3s load time) et architecture SEO-friendly",
        "Administration serveur IIS/SQL Server et support N3 — SLA 99.5%, résolution de 94% des incidents critiques < 4h",
      ],
      stack: [".NET", "C#", "JavaScript", "SQL Server", "IIS", "Windows Server"],
    },
  ],
  certifications: [
    {
      name: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      name: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "2023",
    },
    {
      name: "Kubernetes Application Developer (CKAD)",
      issuer: "CNCF",
      date: "2022",
    },
    {
      name: "Terraform Associate",
      issuer: "HashiCorp",
      date: "2022",
    },
    {
      name: "Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      date: "2021",
    },
  ],
  projects: [
    {
      name: "Fidelya — SaaS B2B",
      description: "Plateforme SaaS multi-tenant AI-powered pour la fidélisation restaurant. Architecture scalable : React/TypeScript frontend, Node.js/Supabase backend avec RLS, RAG pipeline LangChain + Azure AI pour OCR et analyse sémantique. Features : QR loyalty, Apple Wallet, campagnes omnicanal.",
      tech: ["React", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "LangChain", "Azure AI", "Vercel"],
    },
    {
      name: "DocuMind — AI Assistant",
      description: "Assistant IA pour recherche sémantique dans documentation technique. RAG pipeline : chunking intelligent, embeddings OpenAI, vector search Pinecone, génération contextuelle. Interface React avec streaming responses.",
      tech: ["Python", "LangChain", "OpenAI API", "Pinecone", "FastAPI", "React", "TypeScript"],
    },
    {
      name: "FinTech Migration — Scale-up",
      description: "Mission détachée Orange Business : migration monolithe Java → 12 microservices Kubernetes. Istio service mesh, multi-région EU/US pour conformité RGPD, réduction time-to-market de 40%.",
      tech: ["Kubernetes", "Istio", "AWS EKS", "Terraform", "GitLab CI", "Datadog", "Java", "Go"],
    },
    {
      name: "Stellar Wave — Studio",
      description: "Mon studio freelance — Landing page premium Next.js 15 avec acquisition automatisée, formulaires intelligents, analytics et déploiement CI/CD Vercel.",
      tech: ["Next.js 15", "Tailwind CSS 4", "Framer Motion", "Resend", "Vercel"],
      url: "https://stellarwave.fr",
    },
    {
      name: "Open Source Contributions",
      description: "Contributions actives : terraform-aws-modules (module ECS optimisé), Supabase (documentation RLS patterns), LangChain (exemples RAG). 15+ PR mergées.",
      tech: ["Terraform", "TypeScript", "Python", "Supabase", "LangChain"],
    },
  ],
  education: [
    {
      degree: "Master of Science — Cloud & Big Data",
      school: "ITESCIA, Cergy-Pontoise",
      year: "2018",
    },
    {
      degree: "DUT Informatique",
      school: "Université Paris 13, Villetaneuse",
      year: "2015",
    },
  ],
  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "Courant (C1, TOEIC 950)" },
    { name: "Arabe", level: "Professionnel" },
    { name: "Espagnol", level: "Intermédiaire (B2)" },
  ],
};
