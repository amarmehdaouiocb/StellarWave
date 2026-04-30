import type { ReactNode } from "react";

type MetricCardProps = {
  value: ReactNode;
  label: string;
  sublabel?: string;
  variant?: "default" | "compact" | "before-after";
  before?: string;
  after?: string;
};

export function MetricCard({
  value,
  label,
  sublabel,
  variant = "default",
  before,
  after,
}: MetricCardProps) {
  if (variant === "before-after" && before && after) {
    return (
      <div
        style={{
          background: "#0f172a",
          border: "1px solid rgba(56,189,248,0.20)",
          borderRadius: "10px",
          padding: "5mm 4mm",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="pdf-micro-caps"
          style={{ color: "#38bdf8", marginBottom: "3mm" }}
        >
          {label}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "6px",
            marginBottom: "2mm",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "11pt",
              fontWeight: 400,
              color: "#64748b",
              textDecoration: "line-through",
              textDecorationColor: "rgba(100,116,139,0.5)",
            }}
          >
            {before}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "11pt",
              color: "#475569",
            }}
          >
            →
          </span>
          <span
            className="text-gradient"
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontSize: "22pt",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {after}
          </span>
        </div>
        {sublabel && (
          <div
            style={{
              fontSize: "7.5pt",
              color: "#94a3b8",
              lineHeight: 1.4,
              marginTop: "2mm",
            }}
          >
            {sublabel}
          </div>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        style={{
          background: "#0f172a",
          border: "1px solid rgba(56,189,248,0.20)",
          borderRadius: "8px",
          padding: "4mm 5mm",
          textAlign: "center",
        }}
      >
        <div
          className="text-gradient"
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontSize: "20pt",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            marginBottom: "1.5mm",
          }}
        >
          {value}
        </div>
        <div
          className="pdf-micro-caps"
          style={{ color: "#94a3b8", fontSize: "7pt" }}
        >
          {label}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid rgba(56,189,248,0.20)",
        borderRadius: "10px",
        padding: "6mm 5mm 5mm",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)",
        }}
      />
      <div
        className="text-gradient"
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "26pt",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          marginBottom: "3mm",
        }}
      >
        {value}
      </div>
      <div
        className="pdf-micro-caps"
        style={{ color: "#cbd5e1", fontSize: "8pt" }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          style={{
            fontSize: "7.5pt",
            color: "#94a3b8",
            lineHeight: 1.4,
            marginTop: "1.5mm",
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
}
