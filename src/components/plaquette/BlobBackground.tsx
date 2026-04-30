type BlobBackgroundProps = {
  variant?: "top-left" | "top-right" | "center" | "bottom-right";
  intensity?: "subtle" | "default" | "intense";
};

const positionMap: Record<NonNullable<BlobBackgroundProps["variant"]>, string> = {
  "top-left":
    "radial-gradient(ellipse 75% 55% at 18% 22%, rgba(56,189,248,0.18), transparent 65%)",
  "top-right":
    "radial-gradient(ellipse 70% 50% at 82% 18%, rgba(56,189,248,0.16), transparent 60%)",
  center:
    "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,189,248,0.12), transparent 65%)",
  "bottom-right":
    "radial-gradient(ellipse 90% 60% at 80% 88%, rgba(56,189,248,0.20), transparent 60%)",
};

const intensityScale: Record<NonNullable<BlobBackgroundProps["intensity"]>, number> = {
  subtle: 0.55,
  default: 1,
  intense: 1.4,
};

export function BlobBackground({
  variant = "top-left",
  intensity = "default",
}: BlobBackgroundProps) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: positionMap[variant],
        opacity: intensityScale[intensity],
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
