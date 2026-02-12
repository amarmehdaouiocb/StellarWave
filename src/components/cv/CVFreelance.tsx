"use client";

import { useState } from "react";
import { ProfileData } from "@/config/profile";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  LinkedinLogo,
  GithubLogo,
  Globe,
  Certificate,
  GraduationCap,
  Briefcase,
  Code,
  Cloud,
  Database,
  Lightning,
  Sun,
  Moon
} from "@phosphor-icons/react";

type CVFreelanceProps = {
  profile: ProfileData;
  lang: "fr" | "en";
};

const labels = {
  fr: {
    summary: "Profil",
    experience: "Expérience",
    skills: "Compétences",
    certifications: "Certifications",
    education: "Formation",
    languages: "Langues",
    availability: "Disponibilité",
    rate: "TJM",
    remote: "Full Remote",
    contact: "Contact",
  },
  en: {
    summary: "Profile",
    experience: "Experience",
    skills: "Skills",
    certifications: "Certifications",
    education: "Education",
    languages: "Languages",
    availability: "Availability",
    rate: "Daily Rate",
    remote: "Full Remote",
    contact: "Contact",
  },
};

const skillIcons: Record<string, React.ReactNode> = {
  "Full-Stack": <Code weight="bold" className="w-4 h-4" />,
  "Bases de données & APIs": <Database weight="bold" className="w-4 h-4" />,
  "Databases & APIs": <Database weight="bold" className="w-4 h-4" />,
  "Cloud & DevOps": <Cloud weight="bold" className="w-4 h-4" />,
  "AI & SaaS": <Lightning weight="bold" className="w-4 h-4" />,
};

const levelWidth = {
  expert: "100%",
  advanced: "80%",
  intermediate: "60%",
};

const levelLabel = {
  fr: { expert: "Expert", advanced: "Avancé", intermediate: "Intermédiaire" },
  en: { expert: "Expert", advanced: "Advanced", intermediate: "Intermediate" },
};

export function CVFreelance({ profile, lang }: CVFreelanceProps) {
  const t = labels[lang];
  const levelLabels = levelLabel[lang];
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`cv-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Action Buttons */}
      <div className="no-print fixed top-6 right-6 z-50 flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="theme-toggle-btn flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-colors shadow-lg"
          aria-label={isDarkMode ? (lang === "fr" ? "Mode clair" : "Light mode") : (lang === "fr" ? "Mode sombre" : "Dark mode")}
        >
          {isDarkMode ? <Sun weight="bold" className="w-5 h-5" /> : <Moon weight="bold" className="w-5 h-5" />}
        </button>
        {/* Print Button */}
        <button
          onClick={() => window.print()}
          className="print-btn flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          {lang === "fr" ? "Imprimer / PDF" : "Print / PDF"}
        </button>
      </div>

      <div className="cv-page">
        {/* SIDEBAR */}
        <aside className="cv-sidebar">
          {/* Photo & Name */}
          <div className="sidebar-header">
            <div className="avatar-container">
              <div className="avatar-ring" />
              <img
                src={profile.personal.avatar}
                alt={profile.personal.name}
                className="avatar-img"
              />
            </div>
            <h1 className="sidebar-name">{profile.personal.name}</h1>
            <p className="sidebar-title">{profile.personal.title}</p>
          </div>

          {/* Availability Badge */}
          <div className="availability-badge">
            <span className="availability-dot" />
            <span>{profile.personal.availability}</span>
          </div>

          {/* Rate Badge */}
          <div className="rate-badge">
            <span className="rate-label">{t.rate}</span>
            <span className="rate-value">{profile.personal.tjm}</span>
            <span className="rate-remote">{t.remote}</span>
          </div>

          {/* Contact */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">{t.contact}</h3>
            <div className="contact-list">
              <a href={`mailto:${profile.personal.email}`} className="contact-item">
                <EnvelopeSimple weight="bold" className="contact-icon" />
                <span>{profile.personal.email}</span>
              </a>
              <a href={`tel:${profile.personal.phone}`} className="contact-item">
                <Phone weight="bold" className="contact-icon" />
                <span>{profile.personal.phone}</span>
              </a>
              <div className="contact-item">
                <MapPin weight="bold" className="contact-icon" />
                <span>{profile.personal.location}</span>
              </div>
              <a href={profile.personal.linkedin} target="_blank" rel="noopener" className="contact-item">
                <LinkedinLogo weight="bold" className="contact-icon" />
                <span>LinkedIn</span>
              </a>
              <a href={profile.personal.github} target="_blank" rel="noopener" className="contact-item">
                <GithubLogo weight="bold" className="contact-icon" />
                <span>GitHub</span>
              </a>
              <a href={profile.personal.website} target="_blank" rel="noopener" className="contact-item">
                <Globe weight="bold" className="contact-icon" />
                <span>{profile.personal.website.replace("https://", "")}</span>
              </a>
            </div>
          </div>

          {/* Skills */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">{t.skills}</h3>
            <div className="skills-container">
              {profile.skills.map((category) => (
                <div key={category.title} className="skill-category">
                  <div className="skill-category-header" style={{ color: category.color }}>
                    {skillIcons[category.title] || <Code weight="bold" className="w-4 h-4" />}
                    <span>{category.title}</span>
                  </div>
                  <div className="skill-list">
                    {category.skills.slice(0, 4).map((skill) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <div className="skill-bar-bg">
                          <div
                            className="skill-bar-fill"
                            style={{
                              width: levelWidth[skill.level],
                              backgroundColor: category.color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">{t.languages}</h3>
            <div className="languages-list">
              {profile.languages.map((lang) => (
                <div key={lang.name} className="language-item">
                  <span className="language-name">{lang.name}</span>
                  <span className="language-level">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education - moved to sidebar for compact layout */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">{t.education}</h3>
            <div className="sidebar-education-list">
              {profile.education.map((edu) => (
                <div key={edu.degree} className="sidebar-education-item">
                  <div className="sidebar-edu-degree">{edu.degree}</div>
                  <div className="sidebar-edu-school">{edu.school} • {edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="cv-main">
          {/* Summary */}
          <section className="main-section">
            <h2 className="main-section-title">
              <span className="section-icon">
                <Briefcase weight="bold" />
              </span>
              {t.summary}
            </h2>
            <p className="summary-text">{profile.personal.bio}</p>

            {/* Stats */}
            <div className="stats-grid">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="main-section">
            <h2 className="main-section-title">
              <span className="section-icon">
                <Briefcase weight="bold" />
              </span>
              {t.experience}
            </h2>
            <div className="experience-timeline">
              {profile.experience.map((exp, idx) => (
                <div key={idx} className="experience-item">
                  <div className="timeline-marker" />
                  <div className="experience-header">
                    <div className="experience-title-row">
                      <h3 className="experience-role">{exp.role}</h3>
                      {exp.type === "freelance" && (
                        <span className="freelance-badge">Freelance</span>
                      )}
                    </div>
                    <div className="experience-meta">
                      <span className="experience-company">{exp.company}</span>
                      <span className="experience-separator">•</span>
                      <span className="experience-location">{exp.location}</span>
                      <span className="experience-separator">•</span>
                      <span className="experience-period">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="experience-achievements">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="experience-stack">
                    {exp.stack.slice(0, 8).map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="main-section certifications-section">
            <h2 className="main-section-title">
              <span className="section-icon">
                <Certificate weight="bold" />
              </span>
              {t.certifications}
            </h2>
            <div className="certifications-grid">
              {profile.certifications.map((cert) => (
                <div key={cert.name} className="certification-card">
                  <span className="cert-name">{cert.name}</span>
                  <span className="cert-issuer">{cert.issuer} • {cert.date}</span>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      <style jsx>{`
        /* ================================================
           DARK MODE VARIABLES (default)
           ================================================ */
        .cv-container.dark-mode {
          --cv-background: #0a0a0f;
          --cv-card: #12121c;
          --cv-foreground: #f0f0f5;
          --cv-muted-foreground: #71717a;
          --cv-sidebar-bg-start: #0d1117;
          --cv-sidebar-bg-end: #161b22;
          --cv-glass-bg: rgba(255, 255, 255, 0.04);
          --cv-glass-border: rgba(255, 255, 255, 0.08);
          --cv-electric-blue: #3b82f6;
          --cv-electric-blue-light: #60a5fa;
          --cv-electric-blue-dark: #2563eb;
          --cv-violet: #8b5cf6;
          --cv-skill-bar-bg: rgba(255, 255, 255, 0.1);
          --cv-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 32px 80px rgba(0, 0, 0, 0.4);
          --cv-avatar-border: #0d1117;
          --cv-btn-bg: #3b82f6;
          --cv-btn-text: #ffffff;
          --cv-btn-hover: #2563eb;
        }

        /* ================================================
           LIGHT MODE VARIABLES
           ================================================ */
        .cv-container.light-mode {
          --cv-background: #f8fafc;
          --cv-card: #ffffff;
          --cv-foreground: #1e293b;
          --cv-muted-foreground: #64748b;
          --cv-sidebar-bg-start: #f1f5f9;
          --cv-sidebar-bg-end: #e2e8f0;
          --cv-glass-bg: rgba(0, 0, 0, 0.02);
          --cv-glass-border: rgba(0, 0, 0, 0.08);
          --cv-electric-blue: #2563eb;
          --cv-electric-blue-light: #3b82f6;
          --cv-electric-blue-dark: #1d4ed8;
          --cv-violet: #7c3aed;
          --cv-skill-bar-bg: rgba(0, 0, 0, 0.08);
          --cv-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 8px 40px rgba(0, 0, 0, 0.05);
          --cv-avatar-border: #f1f5f9;
          --cv-btn-bg: #1e293b;
          --cv-btn-text: #ffffff;
          --cv-btn-hover: #334155;
        }

        .cv-container {
          min-height: 100vh;
          background: var(--cv-background);
          padding: 2rem;
          transition: background-color 0.3s ease;
        }

        /* Theme Toggle & Print Buttons */
        .theme-toggle-btn {
          background: var(--cv-btn-bg);
          color: var(--cv-btn-text);
        }

        .theme-toggle-btn:hover {
          background: var(--cv-btn-hover);
        }

        .print-btn {
          background: var(--cv-electric-blue);
          color: white;
        }

        .print-btn:hover {
          background: var(--cv-electric-blue-dark);
        }

        .cv-page {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 0;
          background: var(--cv-card);
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: var(--cv-shadow);
          border: 1px solid var(--cv-glass-border);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* SIDEBAR */
        .cv-sidebar {
          background: linear-gradient(180deg, var(--cv-sidebar-bg-start) 0%, var(--cv-sidebar-bg-end) 100%);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-right: 1px solid var(--cv-glass-border);
          transition: background 0.3s ease;
        }

        .sidebar-header {
          text-align: center;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--cv-glass-border);
        }

        .avatar-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 1rem;
        }

        .avatar-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--cv-electric-blue), var(--cv-violet), var(--cv-electric-blue-light));
          animation: ring-rotate 3s linear infinite;
        }

        @keyframes ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .avatar-img {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--cv-avatar-border);
          transition: border-color 0.3s ease;
        }

        .sidebar-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--cv-foreground);
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
          transition: color 0.3s ease;
        }

        .sidebar-title {
          font-size: 0.85rem;
          color: var(--cv-electric-blue-light);
          font-weight: 500;
          line-height: 1.4;
          transition: color 0.3s ease;
        }

        .availability-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 2rem;
          font-size: 0.8rem;
          color: #10b981;
          font-weight: 500;
        }

        .availability-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        .rate-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: var(--cv-glass-bg);
          border: 1px solid var(--cv-glass-border);
          border-radius: 1rem;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .rate-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--cv-muted-foreground);
          margin-bottom: 0.25rem;
          transition: color 0.3s ease;
        }

        .rate-value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--cv-electric-blue-light);
          transition: color 0.3s ease;
        }

        .rate-remote {
          font-size: 0.75rem;
          color: var(--cv-muted-foreground);
          margin-top: 0.25rem;
          transition: color 0.3s ease;
        }

        .sidebar-section {
          padding-top: 1rem;
          border-top: 1px solid var(--cv-glass-border);
          transition: border-color 0.3s ease;
        }

        .sidebar-section-title {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--cv-muted-foreground);
          margin-bottom: 0.75rem;
          transition: color 0.3s ease;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.8rem;
          color: var(--cv-foreground);
          text-decoration: none;
          transition: color 0.2s;
        }

        .contact-item:hover {
          color: var(--cv-electric-blue-light);
        }

        .contact-icon {
          width: 16px;
          height: 16px;
          color: var(--cv-electric-blue);
          flex-shrink: 0;
        }

        .skills-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skill-category-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .skill-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .skill-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .skill-name {
          font-size: 0.75rem;
          color: var(--cv-foreground);
          transition: color 0.3s ease;
        }

        .skill-bar-bg {
          height: 4px;
          background: var(--cv-skill-bar-bg);
          border-radius: 2px;
          overflow: hidden;
          transition: background-color 0.3s ease;
        }

        .skill-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        .languages-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .language-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .language-name {
          font-size: 0.8rem;
          color: var(--cv-foreground);
          transition: color 0.3s ease;
        }

        .language-level {
          font-size: 0.7rem;
          color: var(--cv-muted-foreground);
          transition: color 0.3s ease;
        }

        /* Sidebar Education */
        .inline-icon {
          width: 12px;
          height: 12px;
          margin-right: 0.35rem;
          vertical-align: -1px;
          color: var(--cv-electric-blue);
        }

        .sidebar-education-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .sidebar-education-item {
          padding: 0.5rem 0.65rem;
          background: var(--cv-glass-bg);
          border: 1px solid var(--cv-glass-border);
          border-radius: 0.4rem;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .sidebar-edu-degree {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--cv-foreground);
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .sidebar-edu-school {
          font-size: 0.65rem;
          color: var(--cv-muted-foreground);
          margin-top: 0.15rem;
          transition: color 0.3s ease;
        }

        /* MAIN CONTENT */
        .cv-main {
          padding: 2rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background: var(--cv-card);
          transition: background-color 0.3s ease;
        }

        .main-section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--cv-foreground);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--cv-electric-blue);
          transition: color 0.3s ease, border-color 0.3s ease;
        }

        .section-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: var(--cv-glass-bg);
          border-radius: 0.5rem;
          color: var(--cv-electric-blue);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .summary-text {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--cv-foreground);
          opacity: 0.9;
          transition: color 0.3s ease;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-top: 1.25rem;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: var(--cv-glass-bg);
          border: 1px solid var(--cv-glass-border);
          border-radius: 0.75rem;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--cv-electric-blue);
          transition: color 0.3s ease;
        }

        .stat-label {
          font-size: 0.7rem;
          color: var(--cv-muted-foreground);
          text-align: center;
          margin-top: 0.25rem;
          transition: color 0.3s ease;
        }

        .experience-timeline {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          padding-left: 1.5rem;
        }

        .experience-timeline::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: linear-gradient(180deg, var(--cv-electric-blue), var(--cv-violet));
          border-radius: 1px;
        }

        .experience-item {
          position: relative;
        }

        .timeline-marker {
          position: absolute;
          left: -1.5rem;
          top: 6px;
          width: 12px;
          height: 12px;
          background: var(--cv-electric-blue);
          border: 3px solid var(--cv-card);
          border-radius: 50%;
          box-shadow: 0 0 0 2px var(--cv-electric-blue);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .experience-header {
          margin-bottom: 0.75rem;
        }

        .experience-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .experience-role {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--cv-foreground);
          transition: color 0.3s ease;
        }

        .freelance-badge {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.5rem;
          background: rgba(139, 92, 246, 0.2);
          color: #a78bfa;
          border-radius: 0.25rem;
        }

        .experience-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--cv-muted-foreground);
          transition: color 0.3s ease;
        }

        .experience-company {
          color: var(--cv-electric-blue-light);
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .experience-separator {
          opacity: 0.5;
        }

        .experience-achievements {
          list-style: none;
          padding: 0;
          margin: 0 0 0.75rem 0;
        }

        .experience-achievements li {
          position: relative;
          padding-left: 1rem;
          font-size: 0.8rem;
          line-height: 1.6;
          color: var(--cv-foreground);
          opacity: 0.85;
          margin-bottom: 0.25rem;
          transition: color 0.3s ease;
        }

        .experience-achievements li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--cv-electric-blue);
          transition: color 0.3s ease;
        }

        .experience-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .tech-tag {
          font-size: 0.65rem;
          font-weight: 500;
          padding: 0.2rem 0.5rem;
          background: var(--cv-glass-bg);
          color: var(--cv-electric-blue-light);
          border-radius: 0.25rem;
          border: 1px solid var(--cv-glass-border);
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .certification-card {
          display: flex;
          flex-direction: column;
          padding: 0.75rem 1rem;
          background: var(--cv-glass-bg);
          border: 1px solid var(--cv-glass-border);
          border-radius: 0.5rem;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .cert-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--cv-foreground);
          margin-bottom: 0.2rem;
          transition: color 0.3s ease;
        }

        .cert-issuer {
          font-size: 0.7rem;
          color: var(--cv-muted-foreground);
          transition: color 0.3s ease;
        }

        .education-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .education-item {
          padding: 0.75rem 1rem;
          background: var(--cv-glass-bg);
          border: 1px solid var(--cv-glass-border);
          border-radius: 0.5rem;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .education-degree {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--cv-foreground);
          transition: color 0.3s ease;
        }

        .education-school {
          font-size: 0.75rem;
          color: var(--cv-muted-foreground);
          margin-top: 0.2rem;
          transition: color 0.3s ease;
        }

        /* ================================================
           RESPONSIVE STYLES
           ================================================ */

        /* Mobile (< 768px) */
        @media (max-width: 767px) {
          .cv-container {
            padding: 1rem;
          }

          .cv-page {
            grid-template-columns: 1fr;
            border-radius: 1rem;
          }

          .cv-sidebar {
            border-right: none;
            border-bottom: 1px solid var(--cv-glass-border);
            padding: 1.5rem 1rem;
            gap: 1.25rem;
          }

          .sidebar-header {
            padding-bottom: 1rem;
          }

          .avatar-container {
            width: 100px;
            height: 100px;
          }

          .sidebar-name {
            font-size: 1.35rem;
          }

          .sidebar-title {
            font-size: 0.8rem;
          }

          .availability-badge {
            font-size: 0.75rem;
            padding: 0.4rem 0.75rem;
          }

          .rate-badge {
            padding: 0.75rem;
          }

          .rate-value {
            font-size: 1.25rem;
          }

          .sidebar-section-title {
            font-size: 0.7rem;
          }

          .contact-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }

          .contact-item {
            font-size: 0.75rem;
            gap: 0.5rem;
          }

          .contact-icon {
            width: 14px;
            height: 14px;
          }

          .skills-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .skill-category-header {
            font-size: 0.75rem;
          }

          .skill-name {
            font-size: 0.7rem;
          }

          .skill-bar-bg {
            height: 3px;
          }

          .languages-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.4rem;
          }

          .language-name {
            font-size: 0.75rem;
          }

          .language-level {
            font-size: 0.65rem;
          }

          /* Sidebar Education - Mobile */
          .sidebar-education-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.4rem;
          }

          .sidebar-education-item {
            padding: 0.4rem 0.5rem;
          }

          .sidebar-edu-degree {
            font-size: 0.7rem;
          }

          .sidebar-edu-school {
            font-size: 0.6rem;
          }

          .cv-main {
            padding: 1.5rem 1rem;
            gap: 1.5rem;
          }

          .main-section-title {
            font-size: 1rem;
            gap: 0.5rem;
          }

          .section-icon {
            width: 24px;
            height: 24px;
          }

          .summary-text {
            font-size: 0.85rem;
            line-height: 1.6;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .stat-card {
            padding: 0.75rem;
          }

          .stat-value {
            font-size: 1.25rem;
          }

          .stat-label {
            font-size: 0.65rem;
          }

          .experience-timeline {
            padding-left: 1.25rem;
            gap: 1.25rem;
          }

          .experience-timeline::before {
            left: 4px;
          }

          .timeline-marker {
            width: 10px;
            height: 10px;
            left: -1.25rem;
          }

          .experience-role {
            font-size: 0.9rem;
          }

          .freelance-badge {
            font-size: 0.6rem;
            padding: 0.15rem 0.4rem;
          }

          .experience-meta {
            font-size: 0.75rem;
            flex-wrap: wrap;
            gap: 0.35rem;
          }

          .experience-achievements li {
            font-size: 0.75rem;
            line-height: 1.5;
            padding-left: 0.85rem;
          }

          .experience-stack {
            gap: 0.3rem;
          }

          .tech-tag {
            font-size: 0.6rem;
            padding: 0.15rem 0.4rem;
          }

          .certifications-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          .certification-card {
            padding: 0.6rem 0.75rem;
          }

          .cert-name {
            font-size: 0.75rem;
          }

          .cert-issuer {
            font-size: 0.65rem;
          }

          .education-list {
            gap: 0.6rem;
          }

          .education-item {
            padding: 0.6rem 0.75rem;
          }

          .education-degree {
            font-size: 0.8rem;
          }

          .education-school {
            font-size: 0.7rem;
          }
        }

        /* Small mobile (< 480px) */
        @media (max-width: 479px) {
          .cv-container {
            padding: 0.5rem;
          }

          .cv-page {
            border-radius: 0.75rem;
          }

          .cv-sidebar {
            padding: 1rem 0.75rem;
          }

          .avatar-container {
            width: 80px;
            height: 80px;
          }

          .sidebar-name {
            font-size: 1.2rem;
          }

          .sidebar-title {
            font-size: 0.75rem;
          }

          .contact-list {
            grid-template-columns: 1fr;
          }

          .skills-container {
            grid-template-columns: 1fr;
          }

          .languages-list {
            grid-template-columns: 1fr;
          }

          .cv-main {
            padding: 1rem 0.75rem;
            gap: 1.25rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .experience-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }

          .experience-separator {
            display: none;
          }
        }

        /* Tablet (768px - 1024px) */
        @media (min-width: 768px) and (max-width: 1024px) {
          .cv-page {
            grid-template-columns: 280px 1fr;
          }

          .cv-sidebar {
            padding: 1.5rem 1.25rem;
            gap: 1.25rem;
          }

          .avatar-container {
            width: 100px;
            height: 100px;
          }

          .sidebar-name {
            font-size: 1.35rem;
          }

          .cv-main {
            padding: 1.75rem 2rem;
            gap: 1.75rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .certifications-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Action buttons responsive */
        @media (max-width: 767px) {
          .no-print {
            position: fixed;
            top: auto;
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
            width: auto;
            justify-content: center;
            z-index: 100;
          }

          .print-btn {
            flex: 1;
            justify-content: center;
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
            border-radius: 0.75rem;
          }

          .theme-toggle-btn {
            width: 44px;
            height: 44px;
            border-radius: 0.75rem;
          }
        }

        /* ================================================
           PRINT STYLES
           ================================================ */
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Hide URL display in links */
          a[href]::after {
            content: none !important;
          }

          /* ---- COMMON PRINT LAYOUT (both modes) ---- */
          .cv-container {
            padding: 0 !important;
          }

          .cv-page {
            max-width: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            border: none !important;
            grid-template-columns: 240px 1fr !important;
          }

          .cv-sidebar {
            padding: 0.6rem 0.5rem !important;
            gap: 0.35rem !important;
          }

          .sidebar-header { padding-bottom: 0.4rem !important; }
          .avatar-container { width: 60px !important; height: 60px !important; margin-bottom: 0.3rem !important; }
          .sidebar-name { font-size: 1rem !important; }
          .sidebar-title { font-size: 0.55rem !important; line-height: 1.25 !important; }
          .availability-badge { padding: 0.2rem 0.4rem !important; font-size: 0.5rem !important; }
          .availability-dot { width: 5px !important; height: 5px !important; animation: none !important; }
          .rate-badge { padding: 0.35rem !important; }
          .rate-value { font-size: 1rem !important; }
          .rate-label, .rate-remote { font-size: 0.5rem !important; }
          .sidebar-section { padding-top: 0.3rem !important; }
          .sidebar-section-title { font-size: 0.5rem !important; margin-bottom: 0.25rem !important; }
          .contact-list { gap: 0.15rem !important; }
          .contact-item { font-size: 0.52rem !important; gap: 0.3rem !important; }
          .contact-icon { width: 10px !important; height: 10px !important; }
          .skill-category { margin-bottom: 0.25rem !important; }
          .skill-category-header { font-size: 0.52rem !important; margin-bottom: 0.15rem !important; gap: 0.25rem !important; }
          .skill-category-header svg { width: 10px !important; height: 10px !important; }
          .skill-name { font-size: 0.48rem !important; }
          .skill-bar-bg { height: 2px !important; }
          .skill-item { gap: 0.05rem !important; margin-bottom: 0.1rem !important; }
          .languages-list { gap: 0.1rem !important; }
          .language-item { padding: 0 !important; }
          .language-name { font-size: 0.5rem !important; }
          .language-level { font-size: 0.45rem !important; }
          .sidebar-education-list { gap: 0.2rem !important; }
          .sidebar-education-item { padding: 0.25rem 0.4rem !important; }
          .sidebar-edu-degree { font-size: 0.5rem !important; }
          .sidebar-edu-school { font-size: 0.45rem !important; }
          .inline-icon { width: 9px !important; height: 9px !important; }
          .cv-main { padding: 0.75rem 1rem !important; gap: 0.5rem !important; }
          .main-section { margin-bottom: 0 !important; }
          .main-section-title { font-size: 0.8rem !important; margin-bottom: 0.35rem !important; padding-bottom: 0.2rem !important; }
          .section-icon { width: 18px !important; height: 18px !important; }
          .summary-text { font-size: 0.62rem !important; line-height: 1.45 !important; }
          .stats-grid { gap: 0.4rem !important; margin-top: 0.5rem !important; }
          .stat-card { padding: 0.35rem !important; }
          .stat-value { font-size: 0.95rem !important; }
          .stat-label { font-size: 0.5rem !important; }
          .experience-timeline { gap: 0.5rem !important; padding-left: 0.85rem !important; }
          .experience-timeline::before { left: 2px !important; }
          .timeline-marker { width: 8px !important; height: 8px !important; left: -0.85rem !important; top: 4px !important; }
          .experience-header { margin-bottom: 0.2rem !important; }
          .experience-role { font-size: 0.72rem !important; }
          .freelance-badge { font-size: 0.45rem !important; padding: 0.08rem 0.25rem !important; }
          .experience-meta { font-size: 0.58rem !important; }
          .experience-achievements { margin-bottom: 0.25rem !important; }
          .experience-achievements li { font-size: 0.58rem !important; line-height: 1.35 !important; padding-left: 0.6rem !important; margin-bottom: 0.08rem !important; }
          .experience-stack { gap: 0.15rem !important; }
          .tech-tag { font-size: 0.5rem !important; padding: 0.08rem 0.25rem !important; }
          .certifications-section { page-break-inside: avoid !important; }
          .certifications-grid { gap: 0.3rem !important; grid-template-columns: repeat(3, 1fr) !important; }
          .certification-card { padding: 0.3rem 0.4rem !important; }
          .cert-name { font-size: 0.55rem !important; }
          .cert-issuer { font-size: 0.48rem !important; }
          .avatar-ring { animation: none !important; background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important; }

          /* ---- LIGHT MODE PRINT COLORS ---- */
          .cv-container.light-mode { background: white !important; }
          .cv-container.light-mode .cv-page { background: white !important; }
          .cv-container.light-mode .cv-sidebar { background: #f8fafc !important; border-right: 2px solid #e2e8f0 !important; }
          .cv-container.light-mode .cv-main { background: white !important; }
          .cv-container.light-mode .sidebar-name { color: #1e293b !important; }
          .cv-container.light-mode .sidebar-title { color: #3b82f6 !important; }
          .cv-container.light-mode .availability-badge { background: #ecfdf5 !important; border-color: #10b981 !important; color: #059669 !important; }
          .cv-container.light-mode .rate-badge { background: #eff6ff !important; border-color: #3b82f6 !important; }
          .cv-container.light-mode .rate-value { color: #2563eb !important; }
          .cv-container.light-mode .rate-label,
          .cv-container.light-mode .rate-remote { color: #64748b !important; }
          .cv-container.light-mode .sidebar-section { border-top-color: #e2e8f0 !important; }
          .cv-container.light-mode .sidebar-section-title { color: #64748b !important; }
          .cv-container.light-mode .contact-item { color: #1e293b !important; }
          .cv-container.light-mode .contact-icon { color: #3b82f6 !important; }
          .cv-container.light-mode .skill-name { color: #1e293b !important; }
          .cv-container.light-mode .skill-bar-bg { background: #e2e8f0 !important; }
          .cv-container.light-mode .language-name { color: #1e293b !important; }
          .cv-container.light-mode .language-level { color: #64748b !important; }
          .cv-container.light-mode .sidebar-education-item { background: #f8fafc !important; border-color: #e2e8f0 !important; }
          .cv-container.light-mode .sidebar-edu-degree { color: #1e293b !important; }
          .cv-container.light-mode .sidebar-edu-school { color: #64748b !important; }
          .cv-container.light-mode .main-section-title { color: #1e293b !important; border-bottom-color: #3b82f6 !important; }
          .cv-container.light-mode .section-icon { background: #eff6ff !important; color: #3b82f6 !important; }
          .cv-container.light-mode .summary-text { color: #334155 !important; }
          .cv-container.light-mode .stat-card { background: #f8fafc !important; border-color: #e2e8f0 !important; }
          .cv-container.light-mode .stat-value { color: #2563eb !important; }
          .cv-container.light-mode .stat-label { color: #64748b !important; }
          .cv-container.light-mode .experience-timeline::before { background: linear-gradient(180deg, #3b82f6, #8b5cf6) !important; }
          .cv-container.light-mode .timeline-marker { background: #3b82f6 !important; border-color: white !important; box-shadow: 0 0 0 2px #3b82f6 !important; }
          .cv-container.light-mode .experience-role { color: #1e293b !important; }
          .cv-container.light-mode .experience-meta { color: #64748b !important; }
          .cv-container.light-mode .experience-company { color: #3b82f6 !important; }
          .cv-container.light-mode .experience-achievements li { color: #334155 !important; }
          .cv-container.light-mode .experience-achievements li::before { color: #3b82f6 !important; }
          .cv-container.light-mode .tech-tag { background: #eff6ff !important; color: #2563eb !important; border-color: #bfdbfe !important; }
          .cv-container.light-mode .certification-card { background: #f8fafc !important; border-color: #e2e8f0 !important; }
          .cv-container.light-mode .cert-name { color: #1e293b !important; }
          .cv-container.light-mode .cert-issuer { color: #64748b !important; }
          .cv-container.light-mode .avatar-img { border-color: #f1f5f9 !important; }

          /* ---- DARK MODE PRINT COLORS ---- */
          .cv-container.dark-mode { background: #0a0a0f !important; }
          .cv-container.dark-mode .cv-page { background: #12121c !important; }
          .cv-container.dark-mode .cv-sidebar { background: linear-gradient(180deg, #0d1117 0%, #161b22 100%) !important; border-right: 2px solid rgba(255, 255, 255, 0.1) !important; }
          .cv-container.dark-mode .cv-main { background: #12121c !important; }
          .cv-container.dark-mode .sidebar-name { color: #f0f0f5 !important; }
          .cv-container.dark-mode .sidebar-title { color: #60a5fa !important; }
          .cv-container.dark-mode .availability-badge { background: rgba(16, 185, 129, 0.15) !important; border-color: rgba(16, 185, 129, 0.4) !important; color: #10b981 !important; }
          .cv-container.dark-mode .rate-badge { background: rgba(59, 130, 246, 0.1) !important; border-color: rgba(59, 130, 246, 0.3) !important; }
          .cv-container.dark-mode .rate-value { color: #60a5fa !important; }
          .cv-container.dark-mode .rate-label,
          .cv-container.dark-mode .rate-remote { color: #71717a !important; }
          .cv-container.dark-mode .sidebar-section { border-top-color: rgba(255, 255, 255, 0.08) !important; }
          .cv-container.dark-mode .sidebar-section-title { color: #71717a !important; }
          .cv-container.dark-mode .contact-item { color: #f0f0f5 !important; }
          .cv-container.dark-mode .contact-icon { color: #3b82f6 !important; }
          .cv-container.dark-mode .skill-name { color: #f0f0f5 !important; }
          .cv-container.dark-mode .skill-bar-bg { background: rgba(255, 255, 255, 0.1) !important; }
          .cv-container.dark-mode .language-name { color: #f0f0f5 !important; }
          .cv-container.dark-mode .language-level { color: #71717a !important; }
          .cv-container.dark-mode .sidebar-education-item { background: rgba(255, 255, 255, 0.04) !important; border-color: rgba(255, 255, 255, 0.08) !important; }
          .cv-container.dark-mode .sidebar-edu-degree { color: #f0f0f5 !important; }
          .cv-container.dark-mode .sidebar-edu-school { color: #71717a !important; }
          .cv-container.dark-mode .main-section-title { color: #f0f0f5 !important; border-bottom-color: #3b82f6 !important; }
          .cv-container.dark-mode .section-icon { background: rgba(59, 130, 246, 0.15) !important; color: #3b82f6 !important; }
          .cv-container.dark-mode .summary-text { color: #e0e0e8 !important; }
          .cv-container.dark-mode .stat-card { background: rgba(255, 255, 255, 0.04) !important; border-color: rgba(255, 255, 255, 0.08) !important; }
          .cv-container.dark-mode .stat-value { color: #3b82f6 !important; }
          .cv-container.dark-mode .stat-label { color: #71717a !important; }
          .cv-container.dark-mode .experience-timeline::before { background: linear-gradient(180deg, #3b82f6, #8b5cf6) !important; }
          .cv-container.dark-mode .timeline-marker { background: #3b82f6 !important; border-color: #12121c !important; box-shadow: 0 0 0 2px #3b82f6 !important; }
          .cv-container.dark-mode .experience-role { color: #f0f0f5 !important; }
          .cv-container.dark-mode .experience-meta { color: #71717a !important; }
          .cv-container.dark-mode .experience-company { color: #60a5fa !important; }
          .cv-container.dark-mode .experience-achievements li { color: #e0e0e8 !important; }
          .cv-container.dark-mode .experience-achievements li::before { color: #3b82f6 !important; }
          .cv-container.dark-mode .tech-tag { background: rgba(59, 130, 246, 0.1) !important; color: #60a5fa !important; border-color: rgba(59, 130, 246, 0.2) !important; }
          .cv-container.dark-mode .certification-card { background: rgba(255, 255, 255, 0.04) !important; border-color: rgba(255, 255, 255, 0.08) !important; }
          .cv-container.dark-mode .cert-name { color: #f0f0f5 !important; }
          .cv-container.dark-mode .cert-issuer { color: #71717a !important; }
          .cv-container.dark-mode .avatar-img { border-color: #0d1117 !important; }
        }

        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
