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

          {/* Education */}
          <section className="main-section education-section">
            <h2 className="main-section-title">
              <span className="section-icon">
                <GraduationCap weight="bold" />
              </span>
              {t.education}
            </h2>
            <div className="education-list">
              {profile.education.map((edu) => (
                <div key={edu.degree} className="education-item">
                  <div className="education-degree">{edu.degree}</div>
                  <div className="education-school">{edu.school} • {edu.year}</div>
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

        /* MAIN CONTENT */
        .cv-main {
          padding: 2rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
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

          .cv-container {
            padding: 0;
            background: white;
          }

          .cv-page {
            max-width: none;
            border-radius: 0;
            box-shadow: none;
            border: none;
            grid-template-columns: 240px 1fr;
          }

          .cv-sidebar {
            background: #f8fafc;
            border-right: 2px solid #e2e8f0;
            padding: 0.6rem 0.5rem;
            gap: 0.35rem;
          }

          .sidebar-header {
            padding-bottom: 0.4rem;
          }

          .avatar-container {
            width: 60px;
            height: 60px;
            margin-bottom: 0.3rem;
          }

          .sidebar-name {
            color: #1e293b;
            font-size: 1rem;
          }

          .sidebar-title {
            color: #3b82f6;
            font-size: 0.55rem;
            line-height: 1.25;
          }

          .availability-badge {
            background: #ecfdf5;
            border-color: #10b981;
            color: #059669;
            padding: 0.2rem 0.4rem;
            font-size: 0.5rem;
          }

          .availability-dot {
            width: 5px;
            height: 5px;
          }

          .rate-badge {
            background: #eff6ff;
            border-color: #3b82f6;
            padding: 0.35rem;
          }

          .rate-value {
            color: #2563eb;
            font-size: 1rem;
          }

          .rate-label, .rate-remote {
            color: #64748b;
            font-size: 0.5rem;
          }

          .sidebar-section {
            padding-top: 0.3rem;
            border-top-color: #e2e8f0;
          }

          .sidebar-section-title {
            color: #64748b;
            font-size: 0.5rem;
            margin-bottom: 0.25rem;
          }

          .contact-list {
            gap: 0.15rem;
          }

          .contact-item {
            color: #1e293b;
            font-size: 0.52rem;
            gap: 0.3rem;
          }

          .contact-icon {
            color: #3b82f6;
            width: 10px;
            height: 10px;
          }

          .skill-category {
            margin-bottom: 0.25rem;
          }

          .skill-category-header {
            font-size: 0.52rem;
            margin-bottom: 0.15rem;
            gap: 0.25rem;
          }

          .skill-category-header svg {
            width: 10px;
            height: 10px;
          }

          .skill-name {
            color: #1e293b;
            font-size: 0.48rem;
          }

          .skill-bar-bg {
            background: #e2e8f0;
            height: 2px;
          }

          .skill-item {
            gap: 0.05rem;
            margin-bottom: 0.1rem;
          }

          .languages-list {
            gap: 0.1rem;
          }

          .language-item {
            padding: 0;
          }

          .language-name {
            color: #1e293b;
            font-size: 0.5rem;
          }

          .language-level {
            color: #64748b;
            font-size: 0.45rem;
          }

          .cv-main {
            padding: 0.75rem 1rem;
            gap: 0.5rem;
          }

          .main-section {
            margin-bottom: 0;
          }

          .main-section-title {
            color: #1e293b;
            border-bottom-color: #3b82f6;
            font-size: 0.8rem;
            margin-bottom: 0.35rem;
            padding-bottom: 0.2rem;
          }

          .section-icon {
            background: #eff6ff;
            color: #3b82f6;
            width: 18px;
            height: 18px;
          }

          .summary-text {
            color: #334155;
            font-size: 0.62rem;
            line-height: 1.45;
          }

          .stats-grid {
            gap: 0.4rem;
            margin-top: 0.5rem;
          }

          .stat-card {
            background: #f8fafc;
            border-color: #e2e8f0;
            padding: 0.35rem;
          }

          .stat-value {
            color: #2563eb;
            font-size: 0.95rem;
          }

          .stat-label {
            color: #64748b;
            font-size: 0.5rem;
          }

          .experience-timeline {
            gap: 0.5rem;
            padding-left: 0.85rem;
          }

          .experience-timeline::before {
            background: linear-gradient(180deg, #3b82f6, #8b5cf6);
            left: 2px;
          }

          .timeline-marker {
            background: #3b82f6;
            border-color: white;
            box-shadow: 0 0 0 2px #3b82f6;
            width: 8px;
            height: 8px;
            left: -0.85rem;
            top: 4px;
          }

          .experience-header {
            margin-bottom: 0.2rem;
          }

          .experience-role {
            color: #1e293b;
            font-size: 0.72rem;
          }

          .freelance-badge {
            font-size: 0.45rem;
            padding: 0.08rem 0.25rem;
          }

          .experience-meta {
            font-size: 0.58rem;
          }

          .experience-company {
            color: #3b82f6;
          }

          .experience-achievements {
            margin-bottom: 0.25rem;
          }

          .experience-achievements li {
            color: #334155;
            font-size: 0.58rem;
            line-height: 1.35;
            padding-left: 0.6rem;
            margin-bottom: 0.08rem;
          }

          .experience-achievements li::before {
            color: #3b82f6;
          }

          .experience-stack {
            gap: 0.15rem;
          }

          .tech-tag {
            background: #eff6ff;
            color: #2563eb;
            border-color: #bfdbfe;
            font-size: 0.5rem;
            padding: 0.08rem 0.25rem;
          }

          .certifications-section,
          .education-section {
            page-break-inside: avoid;
          }

          .certifications-grid {
            gap: 0.3rem;
            grid-template-columns: repeat(3, 1fr);
          }

          .certification-card {
            background: #f8fafc;
            border-color: #e2e8f0;
            padding: 0.3rem 0.4rem;
          }

          .cert-name {
            color: #1e293b;
            font-size: 0.55rem;
          }

          .cert-issuer {
            color: #64748b;
            font-size: 0.48rem;
          }

          .education-list {
            gap: 0.25rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }

          .education-item {
            background: #f8fafc;
            border-color: #e2e8f0;
            padding: 0.3rem 0.4rem;
          }

          .education-degree {
            color: #1e293b;
            font-size: 0.58rem;
          }

          .education-school {
            color: #64748b;
            font-size: 0.5rem;
          }

          .avatar-ring {
            animation: none;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          }

          .availability-dot {
            animation: none;
          }
        }

        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
