import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

// Image metadata
export const runtime = "edge";
export const alt = `${brand.name} - ${brand.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Generate OG image
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
          background: "linear-gradient(135deg, #0a0a0b 0%, #1a1a2e 50%, #0a0a0b 100%)",
          position: "relative",
        }}
      >
        {/* Aurora glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-100px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "20%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              height: "100px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #14b8a6 100%)",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                fontSize: "56px",
                fontWeight: "bold",
                color: "#0a0a0b",
              }}
            >
              S
            </span>
          </div>

          {/* Brand name */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "16px",
              letterSpacing: "-2px",
            }}
          >
            {brand.name}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "32px",
              background: "linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "40px",
            }}
          >
            {brand.tagline}
          </p>

          {/* Services */}
          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            {["Landing Pages", "Web Apps", "Mobile", "Cloud"].map((service) => (
              <div
                key={service}
                style={{
                  padding: "12px 24px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "18px",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "20px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {brand.siteUrl.replace("https://", "")}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
