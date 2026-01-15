import { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Calendar,
  ArrowRight,
  FileText,
  Clock,
  MessageSquare,
} from "lucide-react";
import { brand, thankYouPage } from "@/config/brand";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTAButton } from "@/components/shared/CTAButton";
import { AuroraGlow, NoiseOverlay } from "@/components/shared/NoiseOverlay";

export const metadata: Metadata = {
  title: "Merci pour votre demande",
  description:
    "Votre demande a bien été envoyée. Nous vous recontactons sous 24h.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[oklch(0.12_0.02_270)]" />
        <AuroraGlow />
        <NoiseOverlay opacity={0.04} />
      </div>

      <div className="relative z-10 container-wide px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success header */}
          <div className="text-center mb-12">
            {/* Success icon */}
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full aurora-gradient mb-8">
              <Check className="h-10 w-10 text-primary-foreground" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {thankYouPage.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {thankYouPage.subtitle}
            </p>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Next steps */}
            <GlassCard>
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Clock className="h-5 w-5 text-[var(--aurora-cyan)]" />
                Prochaines étapes
              </h2>

              <div className="space-y-6">
                {thankYouPage.nextSteps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-foreground">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Brief checklist */}
            <GlassCard>
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <FileText className="h-5 w-5 text-[var(--aurora-cyan)]" />
                Préparez votre brief
              </h2>

              <p className="text-muted-foreground mb-6">
                Pour maximiser l&apos;efficacité de notre premier échange, pensez à
                préparer :
              </p>

              <ul className="space-y-3">
                {thankYouPage.briefChecklist.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--aurora-cyan)]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-sm text-muted-foreground">
                  Vous pouvez également nous envoyer ces éléments par email à{" "}
                  <a
                    href={`mailto:${brand.contactEmail}`}
                    className="text-[var(--aurora-cyan)] hover:underline"
                  >
                    {brand.contactEmail}
                  </a>
                </p>
              </div>
            </GlassCard>
          </div>

          {/* CTA section */}
          <div className="text-center">
            <GlassCard className="inline-block p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center justify-center gap-3">
                <MessageSquare className="h-5 w-5 text-[var(--aurora-cyan)]" />
                Envie de gagner du temps ?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Réservez directement un créneau dans notre calendrier pour un
                appel découverte de 30 minutes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CTAButton
                  variant="primary"
                  icon={<Calendar className="h-5 w-5" />}
                  href={brand.calendlyUrl}
                >
                  Réserver un appel
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  icon={<ArrowRight className="h-5 w-5" />}
                  href="/"
                >
                  Retour à l&apos;accueil
                </CTAButton>
              </div>
            </GlassCard>
          </div>

          {/* Back link */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Retourner sur le site
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
