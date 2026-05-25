import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

// Image metadata
export const runtime = "edge";
export const alt = `${brand.name} — ${brand.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const SKY = "#38bdf8";

// Generate OG image — identité Ember Luxe (fond nuit + accent sky + monogramme).
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0b1526 0%, #050b18 55%, #020617 100%)",
          position: "relative",
        }}
      >
        {/* Halos « stellaires » sky (radial-gradient — pas de blur, non supporté par Satori) */}
        <div
          style={{
            position: "absolute",
            top: "-260px",
            left: "-180px",
            width: "760px",
            height: "760px",
            background: "radial-gradient(circle, rgba(56,189,248,0.28) 0%, rgba(56,189,248,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-300px",
            right: "-200px",
            width: "720px",
            height: "720px",
            background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, rgba(14,165,233,0) 70%)",
          }}
        />

        {/* Liseré supérieur accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: `linear-gradient(90deg, transparent 0%, ${SKY} 50%, transparent 100%)`,
          }}
        />

        {/* Bloc central */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Squircle + monogramme (même ADN que le favicon) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "148px",
              height: "148px",
              borderRadius: "36px",
              background: "linear-gradient(135deg, #0c1730 0%, #060d1c 100%)",
              border: "1px solid rgba(56,189,248,0.30)",
              boxShadow: "0 24px 60px rgba(2,6,23,0.6)",
              marginBottom: "44px",
            }}
          >
            <svg width="84" height="108" viewBox="0 0 487 625" fill="#eef5ff">
              <path d="M 0 625 L 0 190.5 A 40.5 40.5 0 0 1 81 190.5 L 81 584.5 A 40.5 40.5 0 0 1 40.5 625 Z" />
              <path
                fillRule="evenodd"
                d="M 109 625 L 109 134.5 A 134.5 134.5 0 0 1 378 134.5 L 378 625 Z M 187 625 L 187 154 A 57.5 57.5 0 0 1 302 154 L 302 625 Z"
              />
              <path d="M 487 625 L 446.5 625 A 40.5 40.5 0 0 1 406 584.5 L 406 190.5 A 40.5 40.5 0 0 1 487 190.5 Z" />
              <circle cx="243.5" cy="283.5" r="25.5" />
            </svg>
          </div>

          {/* Nom de marque */}
          <div
            style={{
              fontSize: "82px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            {brand.name}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "32px",
              color: SKY,
              marginTop: "18px",
              letterSpacing: "0.5px",
            }}
          >
            {brand.tagline}
          </div>

          {/* Pills services */}
          <div style={{ display: "flex", gap: "14px", marginTop: "46px" }}>
            {["Landing Pages", "Web Apps", "Mobile", "Cloud"].map((service) => (
              <div
                key={service}
                style={{
                  display: "flex",
                  padding: "12px 26px",
                  borderRadius: "999px",
                  background: "rgba(56,189,248,0.08)",
                  border: "1px solid rgba(56,189,248,0.22)",
                  color: "#cbd5e1",
                  fontSize: "20px",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* URL en pied */}
        <div
          style={{
            position: "absolute",
            bottom: "44px",
            display: "flex",
            alignItems: "center",
            fontSize: "22px",
            color: "rgba(203,213,225,0.65)",
            letterSpacing: "1px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              background: SKY,
              marginRight: "12px",
            }}
          />
          {brand.siteUrl.replace("https://", "")}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
