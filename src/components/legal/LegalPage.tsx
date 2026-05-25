import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/layout";
import { Footer } from "@/components/layout/Footer";
import { AuroraGlow, NoiseOverlay } from "@/components/shared/NoiseOverlay";

// Accent du design system (token --lime / alias --ember-amber).
export const LEGAL_ACCENT = "#38bdf8";

// Lien stylé en accent, interne (Link) ou externe (a).
export function AccentLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  const className =
    "underline decoration-[1.5px] underline-offset-4 transition-opacity hover:opacity-70";
  const style = { color: LEGAL_ACCENT };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

// Section numérotée d'un document légal.
export function LegalSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-16 scroll-mt-28">
      <div className="mb-5 flex items-baseline gap-4">
        <span
          className="text-sm font-semibold tabular-nums"
          style={{ color: LEGAL_ACCENT, fontFamily: "var(--font-display)" }}
          aria-hidden="true"
        >
          {index}
        </span>
        <h2
          className="text-2xl font-bold sm:text-3xl"
          style={{ color: "var(--text-title)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
      </div>
      <div
        className="space-y-4 text-[15px] leading-[1.75] sm:pl-10"
        style={{ color: "var(--text-body)" }}
      >
        {children}
      </div>
    </section>
  );
}

// Ligne « label / valeur » d'une fiche d'identité (mentions légales).
export function IdentityRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
      style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <dt
        className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] sm:w-44"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </dt>
      <dd className="text-[15px] leading-relaxed" style={{ color: "var(--text-title)" }}>
        {value}
      </dd>
    </div>
  );
}

// Coquille commune aux pages légales : atmosphère, en-tête, retour, footer.
export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <Logo variant="fixed-topleft" height={44} priority />

      <main
        id="main-content"
        className="relative min-h-screen overflow-hidden"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Atmosphère : dégradé + aurora discrète + grain */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% -10%, rgba(56, 189, 248, 0.08) 0%, transparent 55%)",
            }}
          />
          <AuroraGlow animated={false} className="opacity-60" />
          <NoiseOverlay opacity={0.035} />
        </div>

        <article className="relative z-10 mx-auto w-full max-w-[820px] px-6 pb-28 pt-36 sm:pt-40">
          <header>
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: LEGAL_ACCENT }}
            >
              {eyebrow}
            </p>
            <h1
              className="mt-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl"
              style={{ color: "var(--text-title)", letterSpacing: "-0.03em", lineHeight: "1" }}
            >
              {title}
            </h1>
            <p className="mt-5 text-sm" style={{ color: "var(--text-muted)" }}>
              Dernière mise à jour&nbsp;: {lastUpdated}
            </p>
            <div
              className="mt-6 max-w-prose space-y-4 text-[15px] leading-relaxed"
              style={{ color: "var(--text-body)" }}
            >
              {intro}
            </div>
          </header>

          {children}

          <div className="mt-20 border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <ArrowLeft className="h-4 w-4" weight="bold" />
              Retour à l&apos;accueil
            </Link>
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}
