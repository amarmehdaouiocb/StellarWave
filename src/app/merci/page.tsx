import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  CalendarDots,
  ArrowLeft,
  ArrowRight,
  FileText,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { brand, thankYouPage } from "@/config/brand";

export const metadata: Metadata = {
  title: "Merci pour votre demande",
  description:
    "Votre demande a bien été envoyée. Nous vous recontactons sous 24h.",
  robots: {
    index: false,
    follow: false,
  },
};

const ACCENT = "#38bdf8";

export default function ThankYouPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#020617", color: "#ffffff" }}
    >
      {/* Fond atmosphérique — cohérent avec /audit-gratuit */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 25% 15%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(ellipse 80% 60% at 80% 90%, rgba(56,189,248,0.10), transparent 60%)",
        }}
      />
      {/* Dot grid subtil */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(56, 189, 248, 0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.06,
        }}
      />

      {/* Header */}
      <header className="relative z-10 py-6 px-6 md:px-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors"
            style={{ color: "#94a3b8" }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Retour au site</span>
          </Link>
          <Image
            src="/logo.svg"
            alt="Stellar Wave"
            width={140}
            height={32}
            priority
            style={{ height: "32px", width: "auto" }}
          />
        </div>
      </header>

      <main className="relative z-10 px-6 md:px-10 pb-24 pt-8">
        <div className="max-w-5xl mx-auto">
          {/* HERO */}
          <div className="max-w-3xl mb-16">
            {/* Pastille de succès */}
            <div
              className="inline-flex items-center justify-center rounded-2xl mb-8"
              style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                boxShadow: "0 12px 40px rgba(56,189,248,0.35)",
              }}
            >
              <Check className="h-8 w-8" weight="bold" style={{ color: "#000" }} />
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-3 mb-6">
              <span style={{ width: "32px", height: "1px", background: ACCENT }} />
              <span
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: ACCENT,
                }}
              >
                Demande bien reçue
              </span>
            </div>

            {/* Titre éditorial */}
            <h1
              style={{
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontSize: "clamp(44px, 6.5vw, 76px)",
                fontWeight: 300,
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                color: "rgba(255,255,255,0.55)",
                margin: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-btn), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: ACCENT,
                }}
              >
                Merci
              </span>{" "}
              pour
              <br />
              <span
                style={{
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.045em",
                }}
              >
                votre demande.
              </span>
            </h1>

            <p
              style={{
                marginTop: "28px",
                fontFamily: "var(--font-mona), system-ui, sans-serif",
                fontSize: "17px",
                fontWeight: 400,
                lineHeight: 1.55,
                color: "#cbd5e1",
                maxWidth: "560px",
              }}
            >
              {thankYouPage.subtitle} Pensez à vérifier vos spams si vous ne
              recevez rien sous{" "}
              <span style={{ color: "#ffffff", fontWeight: 600 }}>48 heures</span>.
            </p>
          </div>

          {/* Hairline */}
          <div
            className="mb-16"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.5) 30%, rgba(56,189,248,0.5) 70%, transparent 100%)",
            }}
          />

          {/* CONTENU — 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
            {/* Prochaines étapes */}
            <section>
              <SectionLabel index="01" label="Prochaines étapes" icon="clock" />
              <ol className="space-y-3">
                {thankYouPage.nextSteps.map((step) => (
                  <li
                    key={step.step}
                    className="flex items-start gap-4 p-4 rounded-xl"
                    style={{
                      background: "#0f172a",
                      border: "1px solid rgba(56,189,248,0.15)",
                    }}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                        color: "#000",
                        fontFamily: "var(--font-mona), system-ui, sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      {step.step}
                    </span>
                    <div>
                      <h3
                        style={{
                          color: "#ffffff",
                          fontSize: "15px",
                          fontWeight: 600,
                          margin: "2px 0 4px 0",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          color: "#94a3b8",
                          fontSize: "14px",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Préparez votre brief */}
            <section>
              <SectionLabel index="02" label="Préparez votre brief" icon="file" />
              <div
                className="p-6 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(160deg, #1e293b 0%, #0f172a 100%)",
                  border: "1px solid rgba(56,189,248,0.15)",
                }}
              >
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    margin: "0 0 20px 0",
                  }}
                >
                  Pour un premier échange efficace, ayez ces éléments en tête :
                </p>
                <ul className="space-y-3">
                  {thankYouPage.briefChecklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3"
                      style={{ color: "#cbd5e1", fontSize: "14px" }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "999px",
                          background: ACCENT,
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div
                  className="mt-6 pt-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
                    Vous pouvez aussi nous écrire à{" "}
                    <a
                      href={`mailto:${brand.contactEmail}`}
                      style={{ color: ACCENT, textDecoration: "none" }}
                    >
                      {brand.contactEmail}
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* CTA Calendly */}
          <div
            className="mt-12 rounded-2xl p-8 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(56,189,248,0.10), rgba(56,189,248,0.02))",
              border: "1px solid rgba(56,189,248,0.30)",
            }}
          >
            <div
              aria-hidden
              className="absolute"
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background:
                  "linear-gradient(90deg, transparent, #38bdf8 30%, #38bdf8 70%, transparent)",
              }}
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-mona), system-ui, sans-serif",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#ffffff",
                    letterSpacing: "-0.025em",
                    margin: "0 0 8px 0",
                  }}
                >
                  Envie de gagner du{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-btn), Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: ACCENT,
                    }}
                  >
                    temps
                  </span>{" "}
                  ?
                </h2>
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "15px",
                    lineHeight: 1.5,
                    margin: 0,
                    maxWidth: "440px",
                  }}
                >
                  Réservez directement un créneau pour un appel découverte de 30
                  minutes.
                </p>
              </div>
              <a
                href={brand.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full shrink-0 transition-all"
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                  color: "#000000",
                  padding: "14px 28px",
                  fontFamily: "var(--font-mona), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  boxShadow: "0 8px 24px rgba(56,189,248,0.35)",
                }}
              >
                <CalendarDots className="h-5 w-5" weight="bold" />
                Réserver un appel
              </a>
            </div>
          </div>

          {/* Retour */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#94a3b8" }}
            >
              Retour à l&apos;accueil
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 py-8 px-6 md:px-10"
        style={{ borderTop: "1px solid rgba(56,189,248,0.10)" }}
      >
        <div
          className="max-w-5xl mx-auto text-center"
          style={{ color: "#64748b", fontSize: "12px" }}
        >
          © {new Date().getFullYear()} {brand.name} · {brand.contactEmail} ·{" "}
          {brand.siteUrl.replace("https://", "")}
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({
  index,
  label,
  icon,
}: {
  index: string;
  label: string;
  icon: "clock" | "file";
}) {
  const Icon = icon === "clock" ? Clock : FileText;
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        style={{
          fontFamily: "var(--font-btn), Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "20px",
          color: "rgba(56,189,248,0.55)",
          lineHeight: 1,
        }}
      >
        {index}
      </span>
      <span style={{ width: "16px", height: "1px", background: "rgba(56,189,248,0.5)" }} />
      <Icon className="h-4 w-4" style={{ color: ACCENT }} />
      <span
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontWeight: 500,
          fontSize: "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#94a3b8",
        }}
      >
        {label}
      </span>
    </div>
  );
}
