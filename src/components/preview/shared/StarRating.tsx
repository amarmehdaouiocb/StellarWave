"use client";

interface StarRatingProps {
  note: number;
  nbAvis: number;
  accentColor: string;
  textColor: string;
  fontBody: string;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export function StarRating({
  note,
  nbAvis,
  accentColor,
  textColor,
  fontBody,
  size = "md",
  showCount = true,
}: StarRatingProps) {
  const filled = Math.round(note);
  const empty = 5 - filled;
  const fontSize = size === "sm" ? "0.9rem" : size === "lg" ? "1.6rem" : "1.1rem";
  const textSize = size === "sm" ? "0.7rem" : size === "lg" ? "1rem" : "0.8rem";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize, color: accentColor, letterSpacing: 2 }}>
        {"★".repeat(filled)}
        {"☆".repeat(empty)}
      </span>
      {showCount && (
        <span
          style={{
            fontFamily: fontBody,
            fontSize: textSize,
            color: textColor,
            opacity: 0.6,
          }}
        >
          {note}/5 — {nbAvis} avis Google
        </span>
      )}
    </div>
  );
}
