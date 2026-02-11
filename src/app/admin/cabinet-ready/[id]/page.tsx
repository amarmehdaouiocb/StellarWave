"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Types
type Lead = {
  id: string;
  created_at: string;
  prenom: string;
  email: string;
  rdv: string;
  poste: string;
  collaborateurs: string;
  clients: string;
  preparation: string;
  outils: string;
  logiciel: string | null;
  frustrations: string[] | null;
  temps_passe: string | null;
  services: string[] | null;
  projet_autre: string | null;
  budget: string | null;
  contacted_at?: string | null;
  notes?: string | null;
};

// Labels
const preparationLabels: Record<string, { label: string; color: string; icon: string }> = {
  "pas-commence": { label: "Pas encore commencé", color: "#ef4444", icon: "🔴" },
  reflexion: { label: "En réflexion / phase de cadrage", color: "#f97316", icon: "🟡" },
  "en-cours": { label: "En cours de déploiement", color: "#3b82f6", icon: "🔵" },
  avance: { label: "Bien avancé (>50% des clients prêts)", color: "#10b981", icon: "🟢" },
};

const posteLabels: Record<string, string> = {
  associe: "Associé(e) / Dirigeant(e)",
  directeur: "Directeur(trice) de cabinet",
  "responsable-production": "Responsable production",
  "responsable-mission": "Responsable de mission",
  collaborateur: "Collaborateur(trice)",
  autre: "Autre",
};

const collaborateursLabels: Record<string, string> = {
  "1-5": "1 à 5 collaborateurs",
  "6-10": "6 à 10 collaborateurs",
  "11-20": "11 à 20 collaborateurs",
  "21-50": "21 à 50 collaborateurs",
  "50+": "Plus de 50 collaborateurs",
};

const clientsLabels: Record<string, string> = {
  "<100": "Moins de 100 clients",
  "100-200": "100 à 200 clients",
  "200-500": "200 à 500 clients",
  "500-1000": "500 à 1000 clients",
  "1000+": "Plus de 1000 clients",
};

const outilsLabels: Record<string, { label: string; icon: string }> = {
  excel: { label: "Fichier Excel / Google Sheets", icon: "📊" },
  "logiciel-comptable": { label: "Module du logiciel comptable", icon: "💻" },
  crm: { label: "CRM / outil de gestion interne", icon: "🗂️" },
  rien: { label: "Pas d'outil dédié", icon: "❌" },
};

const frustrationLabels: Record<string, { label: string; icon: string }> = {
  visibilite: { label: "Manque de visibilité sur l'avancement", icon: "👁️" },
  temps: { label: "Temps perdu en saisie manuelle", icon: "⏰" },
  relances: { label: "Relances clients chronophages", icon: "📞" },
  anomalies: { label: "Anomalies détectées trop tard", icon: "⚠️" },
  coordination: { label: "Coordination équipe difficile", icon: "👥" },
};

const tempsPasseLabels: Record<string, string> = {
  "<2h": "Moins de 2h par semaine",
  "2-5h": "2 à 5h par semaine",
  "5-10h": "5 à 10h par semaine",
  "10h+": "Plus de 10h par semaine",
};

const serviceLabels: Record<string, { label: string; icon: string; color: string }> = {
  "audit-preparation": { label: "Audit de préparation", icon: "🔍", color: "#3b82f6" },
  "dev-sur-mesure": { label: "Développement sur-mesure", icon: "⚙️", color: "#8b5cf6" },
  "ia-automatisation": { label: "IA & Automatisation", icon: "🤖", color: "#10b981" },
  formation: { label: "Formation équipe", icon: "📚", color: "#f59e0b" },
  aucun: { label: "Aucun pour le moment", icon: "—", color: "#64748b" },
};

const rdvLabels: Record<string, { label: string; color: string; icon: string }> = {
  oui: { label: "Oui, avec plaisir", color: "#10b981", icon: "✅" },
  "peut-etre": { label: "Peut-être, recontactez-moi", color: "#f97316", icon: "🤔" },
  non: { label: "Non, mais tenez-moi informé(e)", color: "#64748b", icon: "📧" },
};

const budgetLabels: Record<string, { label: string; color: string }> = {
  "<50": { label: "Moins de 50€/mois", color: "#64748b" },
  "50-100": { label: "50 à 100€/mois", color: "#3b82f6" },
  "100-200": { label: "100 à 200€/mois", color: "#8b5cf6" },
  "200-500": { label: "200 à 500€/mois", color: "#10b981" },
  "500+": { label: "Plus de 500€/mois", color: "#f59e0b" },
  "ne-sait-pas": { label: "Ne sait pas encore", color: "#94a3b8" },
};

// Lazy Supabase client
function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const supabase = useMemo(() => getSupabaseClient(), []);

  useEffect(() => {
    async function fetchLead() {
      if (!supabase) {
        setError("Configuration Supabase manquante");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("cabinet_ready_responses")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        setError("Lead non trouvé");
        setLoading(false);
        return;
      }

      setLead(data);
      setLoading(false);
    }

    fetchLead();
  }, [id, supabase]);

  const copyEmail = () => {
    if (lead?.email) {
      navigator.clipboard.writeText(lead.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openMailto = () => {
    if (lead?.email) {
      const subject = encodeURIComponent(`Cabinet Ready — Échange sur la facturation électronique`);
      const body = encodeURIComponent(`Bonjour ${lead.prenom},\n\nSuite à votre réponse au questionnaire Cabinet Ready, je souhaitais...`);
      window.open(`mailto:${lead.email}?subject=${subject}&body=${body}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getLeadScore = () => {
    if (!lead) return 0;
    let score = 0;

    // RDV oui = +40 points
    if (lead.rdv === "oui") score += 40;
    else if (lead.rdv === "peut-etre") score += 20;

    // Frustrations = +10 points par frustration
    if (lead.frustrations) score += lead.frustrations.length * 10;

    // Services intéressés (hors "aucun") = +10 points par service
    if (lead.services) {
      score += lead.services.filter(s => s !== "aucun").length * 10;
    }

    // Préparation pas commencée ou réflexion = +10 (plus de potentiel)
    if (lead.preparation === "pas-commence" || lead.preparation === "reflexion") {
      score += 10;
    }

    // Taille cabinet = bonus
    if (lead.collaborateurs === "21-50" || lead.collaborateurs === "50+") {
      score += 15;
    } else if (lead.collaborateurs === "11-20") {
      score += 10;
    }

    return Math.min(score, 100);
  };

  const isHotLead = () => {
    if (!lead) return false;
    return lead.rdv === "oui" && lead.frustrations && lead.frustrations.length >= 2;
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="loader"></div>
        <p>Chargement du lead...</p>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="detail-loading">
        <p style={{ color: "#ef4444" }}>⚠️ {error || "Lead non trouvé"}</p>
        <button onClick={() => router.push("/admin/cabinet-ready")} className="back-btn">
          ← Retour au dashboard
        </button>
      </div>
    );
  }

  const prepInfo = preparationLabels[lead.preparation] || { label: lead.preparation, color: "#64748b", icon: "❓" };
  const rdvInfo = rdvLabels[lead.rdv] || { label: lead.rdv, color: "#64748b", icon: "❓" };
  const score = getLeadScore();
  const hot = isHotLead();

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap");

        :root {
          --bg-primary: #0a0f1a;
          --bg-secondary: #0f172a;
          --bg-card: #1e293b;
          --bg-card-hover: #273548;
          --border: #334155;
          --text-primary: #f8fafc;
          --text-secondary: #94a3b8;
          --text-muted: #64748b;
          --accent: #f59e0b;
          --accent-dim: rgba(245, 158, 11, 0.15);
          --success: #10b981;
          --warning: #f97316;
          --danger: #ef4444;
          --info: #3b82f6;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: "DM Sans", sans-serif;
          min-height: 100vh;
        }

        .detail-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 1rem;
          color: var(--text-secondary);
        }

        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .back-btn {
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          border-color: var(--accent);
        }

        .detail-page {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header */
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .back-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }

        .back-link:hover {
          background: var(--bg-card-hover);
          color: var(--accent);
          border-color: var(--accent);
          transform: translateX(-2px);
        }

        .lead-identity {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .lead-name {
          font-family: "JetBrains Mono", monospace;
          font-size: 1.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hot-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2));
          border: 1px solid rgba(239, 68, 68, 0.4);
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #ef4444;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          animation: fire-pulse 2s infinite;
        }

        @keyframes fire-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3); }
          50% { box-shadow: 0 0 12px 4px rgba(239, 68, 68, 0.15); }
        }

        .lead-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .lead-meta span {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
        }

        .score-ring {
          position: relative;
          width: 72px;
          height: 72px;
        }

        .score-ring svg {
          transform: rotate(-90deg);
        }

        .score-ring circle {
          fill: none;
          stroke-width: 6;
        }

        .score-ring .bg {
          stroke: var(--border);
        }

        .score-ring .progress {
          stroke: var(--accent);
          stroke-linecap: round;
          transition: stroke-dashoffset 0.5s ease;
        }

        .score-value {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "JetBrains Mono", monospace;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .score-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Main Grid */
        .detail-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .main-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .side-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Cards */
        .detail-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border);
          background: var(--bg-secondary);
        }

        .card-title {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-title::before {
          content: "";
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 2px;
        }

        .card-body {
          padding: 1.25rem;
        }

        /* Contact Card */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .contact-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .contact-value {
          font-size: 1rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .contact-value.email {
          color: var(--accent);
          font-family: "JetBrains Mono", monospace;
          font-size: 0.9rem;
        }

        .copy-btn {
          padding: 0.25rem 0.5rem;
          background: var(--accent-dim);
          border: none;
          border-radius: 4px;
          color: var(--accent);
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          background: var(--accent);
          color: var(--bg-primary);
        }

        /* Cabinet Profile */
        .profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .profile-stat {
          text-align: center;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border);
        }

        .profile-stat-value {
          font-family: "JetBrains Mono", monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent);
          line-height: 1;
        }

        .profile-stat-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .profile-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 0;
          border-bottom: 1px solid var(--border);
        }

        .profile-item:last-child {
          border-bottom: none;
        }

        .profile-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .profile-value {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Preparation Status */
        .prep-status {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border-left: 4px solid var(--prep-color, var(--accent));
        }

        .prep-icon {
          font-size: 2rem;
        }

        .prep-content {
          flex: 1;
        }

        .prep-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .prep-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Frustrations */
        .frustration-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .frustration-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border);
          transition: all 0.2s;
        }

        .frustration-item:hover {
          border-color: var(--warning);
          background: rgba(249, 115, 22, 0.05);
        }

        .frustration-icon {
          font-size: 1.25rem;
        }

        .frustration-text {
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .empty-state {
          padding: 2rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .temps-passe {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .temps-passe-icon {
          font-size: 1.25rem;
        }

        .temps-passe-content {
          flex: 1;
        }

        .temps-passe-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .temps-passe-value {
          font-size: 0.9rem;
          color: var(--danger);
          font-weight: 600;
        }

        /* Services */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .service-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border);
          transition: all 0.2s;
        }

        .service-item:hover {
          border-color: var(--service-color, var(--accent));
        }

        .service-icon {
          font-size: 1.5rem;
        }

        .service-text {
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .projet-autre {
          margin-top: 1rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px dashed var(--border);
        }

        .projet-autre-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .projet-autre-value {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-style: italic;
        }

        /* RDV Status */
        .rdv-status {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 2px solid var(--rdv-color, var(--border));
        }

        .rdv-icon {
          font-size: 2rem;
        }

        .rdv-content {
          flex: 1;
        }

        .rdv-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .rdv-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--rdv-color, var(--text-primary));
        }

        /* Budget */
        .budget-display {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 2px solid var(--budget-color, var(--border));
        }

        .budget-icon {
          font-size: 2rem;
        }

        .budget-content {
          flex: 1;
        }

        .budget-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .budget-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--budget-color, var(--text-primary));
        }

        /* Actions */
        .actions-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          text-decoration: none;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, var(--accent), #d97706);
          color: var(--bg-primary);
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
        }

        .action-btn.secondary {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-primary);
        }

        .action-btn.secondary:hover {
          border-color: var(--accent);
          background: var(--bg-card-hover);
        }

        /* Timeline */
        .timeline {
          position: relative;
          padding-left: 1.5rem;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: var(--border);
        }

        .timeline-item {
          position: relative;
          padding-bottom: 1.25rem;
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        .timeline-dot {
          position: absolute;
          left: -1.5rem;
          top: 4px;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border-radius: 50%;
          border: 3px solid var(--bg-card);
        }

        .timeline-content {
          padding-left: 0.5rem;
        }

        .timeline-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .timeline-date {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: "JetBrains Mono", monospace;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .detail-page {
            padding: 1rem;
          }

          .detail-header {
            flex-direction: column;
            gap: 1.5rem;
          }

          .header-right {
            align-items: flex-start;
            flex-direction: row;
            gap: 1.5rem;
          }

          .profile-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <motion.div
        className="detail-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <header className="detail-header">
          <div className="header-left">
            <motion.a
              href="/admin/cabinet-ready"
              className="back-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </motion.a>
            <div className="lead-identity">
              <h1 className="lead-name">
                {lead.prenom}
                {hot && (
                  <span className="hot-badge">
                    🔥 Lead chaud
                  </span>
                )}
              </h1>
              <div className="lead-meta">
                <span>📧 {lead.email}</span>
                <span>•</span>
                <span>📅 {formatDate(lead.created_at)}</span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="score-ring">
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle className="bg" cx="36" cy="36" r="30" />
                <circle
                  className="progress"
                  cx="36"
                  cy="36"
                  r="30"
                  strokeDasharray={`${(score / 100) * 188.5} 188.5`}
                />
              </svg>
              <span className="score-value">{score}</span>
            </div>
            <span className="score-label">Score Lead</span>
          </div>
        </header>

        {/* Main Grid */}
        <div className="detail-grid">
          {/* Main Column */}
          <div className="main-column">
            {/* Contact */}
            <motion.div
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-header">
                <h2 className="card-title">Contact</h2>
              </div>
              <div className="card-body">
                <div className="contact-grid">
                  <div className="contact-item">
                    <span className="contact-label">Prénom</span>
                    <span className="contact-value">{lead.prenom}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Poste</span>
                    <span className="contact-value">{posteLabels[lead.poste] || lead.poste}</span>
                  </div>
                  <div className="contact-item" style={{ gridColumn: "1 / -1" }}>
                    <span className="contact-label">Email</span>
                    <span className="contact-value email">
                      {lead.email}
                      <button className="copy-btn" onClick={copyEmail}>
                        {copied ? "✓ Copié" : "Copier"}
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cabinet Profile */}
            <motion.div
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="card-header">
                <h2 className="card-title">Profil Cabinet</h2>
              </div>
              <div className="card-body">
                <div className="profile-stats">
                  <div className="profile-stat">
                    <div className="profile-stat-value">
                      {lead.collaborateurs.replace(/[^0-9+-]/g, "") || lead.collaborateurs}
                    </div>
                    <div className="profile-stat-label">Collaborateurs</div>
                  </div>
                  <div className="profile-stat">
                    <div className="profile-stat-value">
                      {lead.clients.replace(/[^0-9+-]/g, "") || lead.clients}
                    </div>
                    <div className="profile-stat-label">Clients</div>
                  </div>
                  <div className="profile-stat">
                    <div className="profile-stat-value">
                      {outilsLabels[lead.outils]?.icon || "📁"}
                    </div>
                    <div className="profile-stat-label">Outil actuel</div>
                  </div>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Taille équipe</span>
                  <span className="profile-value">{collaborateursLabels[lead.collaborateurs] || lead.collaborateurs}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Portefeuille clients</span>
                  <span className="profile-value">{clientsLabels[lead.clients] || lead.clients}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Outil de suivi</span>
                  <span className="profile-value">
                    {outilsLabels[lead.outils]?.icon} {outilsLabels[lead.outils]?.label || lead.outils}
                  </span>
                </div>
                {lead.logiciel && (
                  <div className="profile-item">
                    <span className="profile-label">Logiciel comptable</span>
                    <span className="profile-value" style={{ textTransform: "capitalize" }}>{lead.logiciel}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Preparation */}
            <motion.div
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-header">
                <h2 className="card-title">État de Préparation</h2>
              </div>
              <div className="card-body">
                <div className="prep-status" style={{ "--prep-color": prepInfo.color } as React.CSSProperties}>
                  <span className="prep-icon">{prepInfo.icon}</span>
                  <div className="prep-content">
                    <div className="prep-label">Niveau actuel</div>
                    <div className="prep-value">{prepInfo.label}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Frustrations */}
            <motion.div
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="card-header">
                <h2 className="card-title">Points de Douleur</h2>
                {lead.frustrations && lead.frustrations.length > 0 && (
                  <span style={{
                    background: "rgba(239, 68, 68, 0.15)",
                    color: "#ef4444",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: 600
                  }}>
                    {lead.frustrations.length} frustration{lead.frustrations.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="card-body">
                {lead.frustrations && lead.frustrations.length > 0 ? (
                  <>
                    <div className="frustration-list">
                      {lead.frustrations.map((f) => {
                        const info = frustrationLabels[f] || { label: f, icon: "❓" };
                        return (
                          <div key={f} className="frustration-item">
                            <span className="frustration-icon">{info.icon}</span>
                            <span className="frustration-text">{info.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    {lead.temps_passe && (
                      <div className="temps-passe">
                        <span className="temps-passe-icon">⏱️</span>
                        <div className="temps-passe-content">
                          <div className="temps-passe-label">Temps perdu par semaine</div>
                          <div className="temps-passe-value">{tempsPasseLabels[lead.temps_passe] || lead.temps_passe}</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="empty-state">Aucune frustration signalée</div>
                )}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card-header">
                <h2 className="card-title">Intérêt Services</h2>
              </div>
              <div className="card-body">
                {lead.services && lead.services.length > 0 ? (
                  <>
                    <div className="services-grid">
                      {lead.services.map((s) => {
                        const info = serviceLabels[s] || { label: s, icon: "📦", color: "#64748b" };
                        return (
                          <div
                            key={s}
                            className="service-item"
                            style={{ "--service-color": info.color } as React.CSSProperties}
                          >
                            <span className="service-icon">{info.icon}</span>
                            <span className="service-text">{info.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    {lead.projet_autre && (
                      <div className="projet-autre">
                        <div className="projet-autre-label">Autre projet mentionné</div>
                        <div className="projet-autre-value">"{lead.projet_autre}"</div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="empty-state">Aucun service sélectionné</div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Side Column */}
          <div className="side-column">
            {/* RDV Status */}
            <motion.div
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="card-header">
                <h2 className="card-title">Disponibilité RDV</h2>
              </div>
              <div className="card-body">
                <div className="rdv-status" style={{ "--rdv-color": rdvInfo.color } as React.CSSProperties}>
                  <span className="rdv-icon">{rdvInfo.icon}</span>
                  <div className="rdv-content">
                    <div className="rdv-label">Souhaite un échange</div>
                    <div className="rdv-value">{rdvInfo.label}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Budget */}
            {lead.budget && (
              <motion.div
                className="detail-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                <div className="card-header">
                  <h2 className="card-title">Budget Envisagé</h2>
                </div>
                <div className="card-body">
                  <div className="budget-display" style={{ "--budget-color": budgetLabels[lead.budget]?.color || "#64748b" } as React.CSSProperties}>
                    <span className="budget-icon">💰</span>
                    <div className="budget-content">
                      <div className="budget-label">Fourchette mensuelle</div>
                      <div className="budget-value">{budgetLabels[lead.budget]?.label || lead.budget}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-header">
                <h2 className="card-title">Actions</h2>
              </div>
              <div className="card-body">
                <div className="actions-list">
                  <motion.button
                    className="action-btn primary"
                    onClick={openMailto}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✉️ Envoyer un email
                  </motion.button>
                  <motion.button
                    className="action-btn secondary"
                    onClick={copyEmail}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    📋 {copied ? "Email copié !" : "Copier l'email"}
                  </motion.button>
                  <motion.a
                    href={`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(lead.prenom)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🔗 Rechercher sur LinkedIn
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="card-header">
                <h2 className="card-title">Historique</h2>
              </div>
              <div className="card-body">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <div className="timeline-title">Formulaire soumis</div>
                      <div className="timeline-date">{formatDate(lead.created_at)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
