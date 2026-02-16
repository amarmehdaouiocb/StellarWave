"use client";

interface PreviewBannerProps {
  fontBody: string;
  primaryColor: string;
  accentColor: string;
  textOnPrimary: string;
}

export function PreviewBanner({
  fontBody,
  primaryColor,
  accentColor,
  textOnPrimary,
}: PreviewBannerProps) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: primaryColor,
        borderBottom: `2px solid ${accentColor}`,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: fontBody,
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            background: accentColor,
            color: primaryColor,
            padding: "3px 10px",
            borderRadius: 3,
          }}
        >
          APERÇU
        </span>
        <span
          style={{
            fontFamily: fontBody,
            fontSize: "0.85rem",
            color: textOnPrimary,
            opacity: 0.9,
          }}
        >
          Votre futur site web par <strong>Facilsite</strong>
        </span>
        <a
          href="https://stellarwave.fr/facilsite"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: fontBody,
            fontSize: "0.8rem",
            fontWeight: 600,
            color: accentColor,
            textDecoration: "none",
            marginLeft: "auto",
          }}
        >
          Obtenir ce site →
        </a>
      </div>
    </div>
  );
}
