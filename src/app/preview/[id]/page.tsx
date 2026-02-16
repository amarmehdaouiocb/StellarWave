import { notFound } from "next/navigation";
import { detectTheme } from "@/lib/preview-themes";
import type { Metadata } from "next";
import "./preview.css";

interface Prospect {
  id: string;
  nom: string;
  adresse: string;
  telephone: string;
  site_web: string | null;
  google_maps: string;
  note: number | null;
  nb_avis: number;
  type_commerce: string;
  recherche: string;
  ville: string;
  photos: string[];
}

async function getProspect(id: string): Promise<Prospect | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
  if (!url || !key) return null;

  const res = await fetch(
    `${url}/rest/v1/prospects?id=eq.${id}&select=*`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data[0] || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const prospect = await getProspect(id);
  if (!prospect) return { title: "Preview introuvable" };

  return {
    title: `${prospect.nom} — Votre site web par Facilsite`,
    description: `Aperçu du site web professionnel de ${prospect.nom}, ${prospect.ville}`,
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prospect = await getProspect(id);
  if (!prospect) notFound();

  const theme = detectTheme(prospect.type_commerce, prospect.recherche);

  const cssVars = {
    "--pv-primary": theme.primary,
    "--pv-accent": theme.accent,
    "--pv-bg": theme.bg,
    "--pv-bg-alt": theme.bgAlt,
    "--pv-on-primary": theme.textOnPrimary,
  } as React.CSSProperties;

  // Extraire le type lisible depuis la recherche
  const typeLabel = prospect.recherche
    .replace(new RegExp(prospect.ville, "i"), "")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="pv" style={cssVars}>
      {/* ── Banner Facilsite ── */}
      <div className="pv-banner">
        <div className="pv-banner__inner">
          <span className="pv-banner__badge">APERÇU</span>
          <span className="pv-banner__text">
            Votre futur site web par <strong>Facilsite</strong>
          </span>
          <a
            href="https://stellarwave.fr/facilsite"
            target="_blank"
            rel="noopener noreferrer"
            className="pv-banner__cta"
          >
            Obtenir ce site →
          </a>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="pv-hero">
        {prospect.photos?.[0] && (
          <div
            className="pv-hero__bg"
            style={{ backgroundImage: `url(${prospect.photos[0]})` }}
          />
        )}
        <div className="pv-hero__grain" />
        <div className="pv-hero__content pv-anim pv-anim--1">
          <span className="pv-hero__type">{typeLabel}</span>
          <h1 className="pv-hero__name">{prospect.nom}</h1>
          <p className="pv-hero__tagline">{theme.tagline}</p>
          <div className="pv-hero__meta">
            {prospect.telephone && (
              <a href={`tel:${prospect.telephone.replace(/\s/g, "")}`} className="pv-hero__phone">
                📞 {prospect.telephone}
              </a>
            )}
            <span className="pv-hero__address">📍 {prospect.adresse}</span>
          </div>
          {prospect.note && (
            <div className="pv-hero__rating">
              <span className="pv-hero__stars">
                {"★".repeat(Math.round(prospect.note))}
                {"☆".repeat(5 - Math.round(prospect.note))}
              </span>
              <span className="pv-hero__rating-text">
                {prospect.note}/5 — {prospect.nb_avis} avis Google
              </span>
            </div>
          )}
        </div>
        <div className="pv-hero__deco" />
      </section>

      {/* ── Services ── */}
      <section className="pv-services">
        <div className="pv-services__inner">
          <h2 className="pv-section-title pv-anim pv-anim--2">Nos Services</h2>
          <div className="pv-services__grid">
            {theme.services.map((svc, i) => (
              <div
                key={svc.name}
                className={`pv-service-card pv-anim pv-anim--${i + 3}`}
              >
                <span className="pv-service-card__icon">{svc.icon}</span>
                <h3 className="pv-service-card__name">{svc.name}</h3>
                <p className="pv-service-card__desc">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Galerie Photos ── */}
      {prospect.photos && prospect.photos.length > 0 && (
        <section className="pv-gallery">
          <div className="pv-gallery__inner">
            <h2 className="pv-section-title pv-anim pv-anim--7">Notre Établissement</h2>
            <div className="pv-gallery__grid">
              {prospect.photos.slice(0, 4).map((photo, i) => (
                <div
                  key={i}
                  className={`pv-gallery__item pv-anim pv-anim--${i + 8}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`${prospect.nom} — photo ${i + 1}`}
                    className="pv-gallery__img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── À propos ── */}
      <section className="pv-about">
        <div className="pv-about__inner pv-anim pv-anim--7">
          <h2 className="pv-section-title">
            Votre {typeLabel.toLowerCase()} de confiance à {prospect.ville}
          </h2>
          <div className="pv-about__divider" />
          <p className="pv-about__text">
            Bienvenue chez <strong>{prospect.nom}</strong>. Situé au cœur de{" "}
            {prospect.ville}, nous mettons notre savoir-faire et notre passion
            au service de notre clientèle depuis des années. Qualité, proximité
            et professionnalisme sont les valeurs qui nous guident au quotidien.
          </p>
          <p className="pv-about__text">
            N&apos;hésitez pas à nous contacter pour toute question ou pour
            prendre rendez-vous. Nous serons ravis de vous accueillir.
          </p>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="pv-contact">
        <div className="pv-contact__inner">
          <h2 className="pv-section-title pv-anim pv-anim--8" style={{ color: "var(--pv-on-primary)" }}>
            Nous contacter
          </h2>
          <div className="pv-contact__grid">
            <div className="pv-contact__item pv-anim pv-anim--9">
              <span className="pv-contact__icon">📞</span>
              <span className="pv-contact__label">Téléphone</span>
              {prospect.telephone ? (
                <a
                  href={`tel:${prospect.telephone.replace(/\s/g, "")}`}
                  className="pv-contact__value pv-contact__value--link"
                >
                  {prospect.telephone}
                </a>
              ) : (
                <span className="pv-contact__value">—</span>
              )}
            </div>
            <div className="pv-contact__item pv-anim pv-anim--10">
              <span className="pv-contact__icon">📍</span>
              <span className="pv-contact__label">Adresse</span>
              <span className="pv-contact__value">{prospect.adresse}</span>
            </div>
            <div className="pv-contact__item pv-anim pv-anim--11">
              <span className="pv-contact__icon">🕐</span>
              <span className="pv-contact__label">Horaires</span>
              <span className="pv-contact__value">Lun-Sam : 9h-19h</span>
            </div>
          </div>
          {prospect.google_maps && (
            <a
              href={prospect.google_maps}
              target="_blank"
              rel="noopener noreferrer"
              className="pv-contact__maps-link pv-anim pv-anim--12"
            >
              Voir sur Google Maps →
            </a>
          )}
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="pv-cta">
        <div className="pv-cta__inner pv-anim pv-anim--13">
          <h2 className="pv-cta__title">Ce site vous plaît ?</h2>
          <p className="pv-cta__subtitle">
            Facilsite crée votre site web professionnel, clé en main, à partir
            de <strong>29€/mois</strong>. Mise en ligne en 24h.
          </p>
          <a
            href="https://stellarwave.fr/facilsite"
            target="_blank"
            rel="noopener noreferrer"
            className="pv-cta__button"
          >
            Je veux mon site →
          </a>
          <p className="pv-cta__mention">
            Aperçu généré automatiquement par Facilsite — Les informations proviennent de Google Maps.
          </p>
        </div>
      </section>
    </div>
  );
}
