"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

// Force dynamic rendering to avoid build-time errors
export const dynamic = "force-dynamic";

// Types
type Response = {
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
};

type Stats = {
  total: number;
  byPreparation: Record<string, number>;
  byPoste: Record<string, number>;
  byOutils: Record<string, number>;
  byLogiciel: Record<string, number>;
  frustrationCounts: Record<string, number>;
  serviceCounts: Record<string, number>;
  rdvOui: number;
  avgFrustrations: number;
};

// Labels
const preparationLabels: Record<string, { label: string; color: string }> = {
  "pas-commence": { label: "Pas commencé", color: "#ef4444" },
  reflexion: { label: "En réflexion", color: "#f97316" },
  "en-cours": { label: "En cours", color: "#3b82f6" },
  avance: { label: "Avancé", color: "#10b981" },
};

const posteLabels: Record<string, string> = {
  associe: "Associé(e)",
  directeur: "Directeur(trice)",
  "responsable-production": "Resp. Production",
  "responsable-mission": "Resp. Mission",
  collaborateur: "Collaborateur",
  autre: "Autre",
};

const frustrationLabels: Record<string, string> = {
  visibilite: "Manque visibilité",
  temps: "Temps perdu",
  relances: "Relances chronophages",
  anomalies: "Anomalies tardives",
  coordination: "Coordination difficile",
};

const serviceLabels: Record<string, string> = {
  "audit-preparation": "Audit préparation",
  "dev-sur-mesure": "Dev sur-mesure",
  "ia-automatisation": "IA & Automation",
  formation: "Formation",
  aucun: "Aucun intérêt",
};

// Lazy Supabase client initialization
function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default function CabinetReadyDashboard() {
  const router = useRouter();
  const [responses, setResponses] = useState<Response[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [configError, setConfigError] = useState(false);

  // Lazy init Supabase client
  const supabase = useMemo(() => getSupabaseClient(), []);

  // Fetch data
  const fetchData = async () => {
    if (!supabase) {
      setConfigError(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("cabinet_ready_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    setResponses(data || []);
    calculateStats(data || []);
    setLastUpdated(new Date());
    setLoading(false);
  };

  // Calculate stats
  const calculateStats = (data: Response[]) => {
    const stats: Stats = {
      total: data.length,
      byPreparation: {},
      byPoste: {},
      byOutils: {},
      byLogiciel: {},
      frustrationCounts: {},
      serviceCounts: {},
      rdvOui: 0,
      avgFrustrations: 0,
    };

    let totalFrustrations = 0;

    data.forEach((r) => {
      // Preparation
      stats.byPreparation[r.preparation] =
        (stats.byPreparation[r.preparation] || 0) + 1;

      // Poste
      stats.byPoste[r.poste] = (stats.byPoste[r.poste] || 0) + 1;

      // Outils
      stats.byOutils[r.outils] = (stats.byOutils[r.outils] || 0) + 1;

      // Logiciel
      if (r.logiciel) {
        stats.byLogiciel[r.logiciel] =
          (stats.byLogiciel[r.logiciel] || 0) + 1;
      }

      // Frustrations
      if (r.frustrations) {
        totalFrustrations += r.frustrations.length;
        r.frustrations.forEach((f) => {
          stats.frustrationCounts[f] =
            (stats.frustrationCounts[f] || 0) + 1;
        });
      }

      // Services
      if (r.services) {
        r.services.forEach((s) => {
          stats.serviceCounts[s] = (stats.serviceCounts[s] || 0) + 1;
        });
      }

      // RDV
      if (r.rdv === "oui") stats.rdvOui++;
    });

    stats.avgFrustrations =
      data.length > 0 ? totalFrustrations / data.length : 0;

    setStats(stats);
  };

  useEffect(() => {
    fetchData();

    if (!supabase) return;

    // Real-time subscription
    const channel = supabase
      .channel("cabinet_ready_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cabinet_ready_responses" },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Filter responses
  const filteredResponses =
    filter === "all"
      ? responses
      : filter === "hot"
      ? responses.filter(
          (r) =>
            r.rdv === "oui" &&
            r.frustrations &&
            r.frustrations.length >= 2
        )
      : responses.filter((r) => r.preparation === filter);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (configError) {
    return (
      <div className="dashboard-loading">
        <p style={{ color: "#ef4444" }}>⚠️ Configuration Supabase manquante</p>
        <p style={{ opacity: 0.7, fontSize: 14 }}>
          Vérifiez les variables d&apos;environnement NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
        </p>
      </div>
    );
  }

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

        .dashboard-loading {
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
          to {
            transform: rotate(360deg);
          }
        }

        .dashboard {
          padding: 2rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .dashboard-title {
          font-family: "JetBrains Mono", monospace;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .dashboard-title::before {
          content: "";
          display: inline-block;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border-radius: 3px;
          animation: pulse-glow 2s infinite;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(245, 158, 11, 0);
          }
        }

        .dashboard-subtitle {
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }

        .header-meta {
          text-align: right;
        }

        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--success);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .last-update {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--stat-color, var(--accent));
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-family: "JetBrains Mono", monospace;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-detail {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .stat-detail span {
          color: var(--accent);
          font-weight: 600;
        }

        /* Charts Section */
        .charts-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .chart-title {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .chart-title::before {
          content: "//";
          color: var(--accent);
        }

        /* Bar Chart */
        .bar-chart {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .bar-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .bar-label {
          width: 120px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .bar-track {
          flex: 1;
          height: 24px;
          background: var(--bg-secondary);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .bar-fill {
          height: 100%;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.5rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.7rem;
          font-weight: 600;
          color: white;
          min-width: 30px;
          transition: width 0.5s ease;
        }

        .bar-count {
          width: 40px;
          text-align: right;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Filters */
        .filters-section {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }

        .filter-btn.active {
          background: var(--accent-dim);
          border-color: var(--accent);
          color: var(--accent);
        }

        .filter-btn .count {
          margin-left: 0.5rem;
          padding: 0.125rem 0.5rem;
          background: var(--bg-secondary);
          border-radius: 100px;
          font-size: 0.75rem;
        }

        .filter-btn.active .count {
          background: rgba(245, 158, 11, 0.2);
        }

        /* Table */
        .table-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }

        .table-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .table-title::before {
          content: "//";
          color: var(--accent);
        }

        .table-count {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .leads-table {
          width: 100%;
          border-collapse: collapse;
        }

        .leads-table th {
          text-align: left;
          padding: 0.875rem 1.5rem;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }

        .leads-table td {
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
          border-bottom: 1px solid var(--border);
          color: var(--text-secondary);
        }

        .leads-table tr:hover td {
          background: var(--bg-card-hover);
        }

        .leads-table tbody tr {
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .leads-table tbody tr:hover {
          transform: translateX(4px);
        }

        .leads-table tbody tr:hover td:first-child {
          border-left: 3px solid var(--accent);
          padding-left: calc(1.5rem - 3px);
        }

        .leads-table tr:last-child td {
          border-bottom: none;
        }

        .lead-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .lead-email {
          color: var(--accent);
          text-decoration: none;
          font-size: 0.8rem;
        }

        .lead-email:hover {
          text-decoration: underline;
        }

        .badge {
          display: inline-block;
          padding: 0.25rem 0.625rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .badge-danger {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }
        .badge-warning {
          background: rgba(249, 115, 22, 0.15);
          color: #f97316;
        }
        .badge-info {
          background: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
        }
        .badge-success {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .rdv-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .hot-lead {
          background: linear-gradient(
            90deg,
            rgba(245, 158, 11, 0.1) 0%,
            transparent 100%
          );
        }

        .hot-indicator {
          color: var(--accent);
          font-size: 1rem;
        }

        .frustrations-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .frustration-tag {
          padding: 0.125rem 0.5rem;
          background: var(--bg-secondary);
          border-radius: 4px;
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--text-muted);
        }

        .empty-state p {
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .charts-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 1rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
          }
          .header-meta {
            text-align: left;
          }
          .leads-table {
            font-size: 0.75rem;
          }
          .leads-table th,
          .leads-table td {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>

      <div className="dashboard">
        {/* Header */}
        <motion.header
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="dashboard-title">Cabinet Ready Analytics</h1>
            <p className="dashboard-subtitle">
              Analyse des réponses questionnaire · Validation marché
            </p>
          </div>
          <div className="header-meta">
            <div className="live-badge">
              <span className="live-dot"></span>
              Live
            </div>
            <p className="last-update">
              Mis à jour : {lastUpdated.toLocaleTimeString("fr-FR")}
            </p>
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-card" style={{ "--stat-color": "#f59e0b" } as any}>
            <div className="stat-label">Total réponses</div>
            <div className="stat-value">{stats?.total || 0}</div>
            <div className="stat-detail">
              <span>{stats?.rdvOui || 0}</span> dispo pour un call
            </div>
          </div>

          <div className="stat-card" style={{ "--stat-color": "#10b981" } as any}>
            <div className="stat-label">Leads chauds</div>
            <div className="stat-value">
              {responses.filter(
                (r) =>
                  r.rdv === "oui" && r.frustrations && r.frustrations.length >= 2
              ).length}
            </div>
            <div className="stat-detail">
              RDV oui + 2+ frustrations
            </div>
          </div>

          <div className="stat-card" style={{ "--stat-color": "#ef4444" } as any}>
            <div className="stat-label">Pas commencé</div>
            <div className="stat-value">
              {stats?.byPreparation["pas-commence"] || 0}
            </div>
            <div className="stat-detail">
              <span>
                {stats?.total
                  ? Math.round(
                      ((stats.byPreparation["pas-commence"] || 0) /
                        stats.total) *
                        100
                    )
                  : 0}
                %
              </span>{" "}
              du total
            </div>
          </div>

          <div className="stat-card" style={{ "--stat-color": "#3b82f6" } as any}>
            <div className="stat-label">Moy. frustrations</div>
            <div className="stat-value">
              {stats?.avgFrustrations.toFixed(1) || "0"}
            </div>
            <div className="stat-detail">
              par répondant
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <motion.div
          className="charts-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Preparation Chart */}
          <div className="chart-card">
            <h3 className="chart-title">État de préparation</h3>
            <div className="bar-chart">
              {Object.entries(preparationLabels).map(([key, { label, color }]) => {
                const count = stats?.byPreparation[key] || 0;
                const pct = stats?.total ? (count / stats.total) * 100 : 0;
                return (
                  <div className="bar-item" key={key}>
                    <span className="bar-label">{label}</span>
                    <div className="bar-track">
                      <motion.div
                        className="bar-fill"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(pct, 5)}%` }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {pct > 15 && `${Math.round(pct)}%`}
                      </motion.div>
                    </div>
                    <span className="bar-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Frustrations Chart */}
          <div className="chart-card">
            <h3 className="chart-title">Top frustrations</h3>
            <div className="bar-chart">
              {Object.entries(frustrationLabels)
                .map(([key, label]) => ({
                  key,
                  label,
                  count: stats?.frustrationCounts[key] || 0,
                }))
                .sort((a, b) => b.count - a.count)
                .map(({ key, label, count }) => {
                  const max = Math.max(
                    ...Object.values(stats?.frustrationCounts || { x: 1 })
                  );
                  const pct = max > 0 ? (count / max) * 100 : 0;
                  return (
                    <div className="bar-item" key={key}>
                      <span className="bar-label">{label}</span>
                      <div className="bar-track">
                        <motion.div
                          className="bar-fill"
                          style={{ background: "#f97316" }}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(pct, 5)}%` }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        />
                      </div>
                      <span className="bar-count">{count}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Outils Chart */}
          <div className="chart-card">
            <h3 className="chart-title">Outils actuels</h3>
            <div className="bar-chart">
              {[
                { key: "excel", label: "Excel/Sheets" },
                { key: "logiciel-comptable", label: "Logiciel comptable" },
                { key: "crm", label: "CRM/Outil interne" },
                { key: "rien", label: "Aucun outil" },
              ].map(({ key, label }) => {
                const count = stats?.byOutils[key] || 0;
                const pct = stats?.total ? (count / stats.total) * 100 : 0;
                return (
                  <div className="bar-item" key={key}>
                    <span className="bar-label">{label}</span>
                    <div className="bar-track">
                      <motion.div
                        className="bar-fill"
                        style={{ background: "#3b82f6" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(pct, 5)}%` }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      />
                    </div>
                    <span className="bar-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="filters-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Tous<span className="count">{stats?.total || 0}</span>
          </button>
          <button
            className={`filter-btn ${filter === "hot" ? "active" : ""}`}
            onClick={() => setFilter("hot")}
          >
            🔥 Leads chauds
            <span className="count">
              {responses.filter(
                (r) =>
                  r.rdv === "oui" && r.frustrations && r.frustrations.length >= 2
              ).length}
            </span>
          </button>
          {Object.entries(preparationLabels).map(([key, { label }]) => (
            <button
              key={key}
              className={`filter-btn ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
              <span className="count">{stats?.byPreparation[key] || 0}</span>
            </button>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          className="table-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="table-header">
            <h3 className="table-title">Réponses</h3>
            <span className="table-count">
              {filteredResponses.length} résultat
              {filteredResponses.length > 1 ? "s" : ""}
            </span>
          </div>

          {filteredResponses.length === 0 ? (
            <div className="empty-state">
              <p>📭</p>
              <p>Aucune réponse pour le moment</p>
            </div>
          ) : (
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Poste</th>
                  <th>Cabinet</th>
                  <th>Préparation</th>
                  <th>Frustrations</th>
                  <th>RDV</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredResponses.map((r) => {
                  const isHot =
                    r.rdv === "oui" &&
                    r.frustrations &&
                    r.frustrations.length >= 2;
                  const prepConfig =
                    preparationLabels[r.preparation] || preparationLabels["pas-commence"];

                  return (
                    <tr
                      key={r.id}
                      className={isHot ? "hot-lead" : ""}
                      onClick={() => router.push(`/admin/cabinet-ready/${r.id}`)}
                    >
                      <td>
                        <div className="lead-name">
                          {isHot && <span className="hot-indicator">🔥 </span>}
                          {r.prenom}
                        </div>
                        <span className="lead-email">
                          {r.email}
                        </span>
                      </td>
                      <td>{posteLabels[r.poste] || r.poste}</td>
                      <td>
                        {r.collaborateurs} collab.
                        <br />
                        <span style={{ color: "var(--text-muted)" }}>
                          {r.clients} clients
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            r.preparation === "pas-commence"
                              ? "badge-danger"
                              : r.preparation === "reflexion"
                              ? "badge-warning"
                              : r.preparation === "en-cours"
                              ? "badge-info"
                              : "badge-success"
                          }`}
                        >
                          {prepConfig.label}
                        </span>
                      </td>
                      <td>
                        <div className="frustrations-list">
                          {r.frustrations?.slice(0, 3).map((f) => (
                            <span key={f} className="frustration-tag">
                              {frustrationLabels[f] || f}
                            </span>
                          ))}
                          {(r.frustrations?.length || 0) > 3 && (
                            <span className="frustration-tag">
                              +{(r.frustrations?.length || 0) - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="rdv-badge">
                          {r.rdv === "oui"
                            ? "✅"
                            : r.rdv === "peut-etre"
                            ? "🤔"
                            : "❌"}
                        </span>
                      </td>
                      <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                        {new Date(r.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                        })}
                        <br />
                        {new Date(r.created_at).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </>
  );
}
