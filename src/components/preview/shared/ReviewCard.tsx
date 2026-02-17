"use client";

import { motion } from "framer-motion";
import type { ProspectReview } from "@/lib/preview-types";
import type { TemplateName } from "@/lib/template-registry";
import { staggerContainer, staggerItem } from "@/lib/preview-animations";
import type { Transition } from "framer-motion";

interface ReviewSectionProps {
  reviews: ProspectReview[];
  sectionTitle: string;
  template: TemplateName;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  bgAltColor: string;
  textOnPrimary: string;
  fontDisplay: string;
  fontBody: string;
  transition: Transition;
}

function StarRow({ rating, color, size = 14 }: { rating: number; color: string; size?: number }) {
  return (
    <span style={{ color, fontSize: size, letterSpacing: 2, lineHeight: 1 }}>
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

/* ── Editorial variant: serif italic, oversized quotes, golden line ── */
function EditorialReview({
  review,
  primaryColor,
  accentColor,
  fontDisplay,
  fontBody,
}: {
  review: ProspectReview;
  primaryColor: string;
  accentColor: string;
  fontDisplay: string;
  fontBody: string;
}) {
  return (
    <div style={{ position: "relative", padding: "32px 0" }}>
      {/* Oversized French quotes */}
      <span
        style={{
          fontFamily: fontDisplay,
          fontSize: "4rem",
          lineHeight: 0.6,
          color: accentColor,
          opacity: 0.2,
          position: "absolute",
          top: 20,
          left: -4,
        }}
      >
        &laquo;
      </span>
      <div style={{ paddingLeft: 28 }}>
        <StarRow rating={review.rating} color={accentColor} />
        <p
          style={{
            fontFamily: fontDisplay,
            fontSize: "1.1rem",
            fontStyle: "italic",
            fontWeight: 400,
            color: primaryColor,
            lineHeight: 1.8,
            margin: "12px 0 16px",
            opacity: 0.85,
          }}
        >
          {truncate(review.text, 180)}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 24,
              height: 1,
              background: accentColor,
            }}
          />
          <span
            style={{
              fontFamily: fontBody,
              fontSize: "0.8rem",
              fontWeight: 600,
              color: primaryColor,
              opacity: 0.5,
              letterSpacing: "0.04em",
            }}
          >
            {review.author}
          </span>
          {review.relativeTime && (
            <span
              style={{
                fontFamily: fontBody,
                fontSize: "0.75rem",
                color: primaryColor,
                opacity: 0.35,
              }}
            >
              · {review.relativeTime}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Portfolio variant: rounded cards, soft shadow, gradient bg ── */
function PortfolioReview({
  review,
  primaryColor,
  accentColor,
  bgColor,
  fontDisplay,
  fontBody,
}: {
  review: ProspectReview;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  fontDisplay: string;
  fontBody: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: `0 16px 48px ${accentColor}12` }}
      style={{
        background: bgColor,
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <StarRow rating={review.rating} color={accentColor} size={16} />
      <p
        style={{
          fontFamily: fontBody,
          fontSize: "0.95rem",
          color: primaryColor,
          lineHeight: 1.7,
          margin: 0,
          opacity: 0.8,
          flex: 1,
        }}
      >
        {truncate(review.text, 150)}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Avatar circle with initial */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: `${accentColor}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fontDisplay,
            fontSize: "0.8rem",
            fontWeight: 700,
            color: accentColor,
          }}
        >
          {review.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontFamily: fontBody, fontSize: "0.8rem", fontWeight: 600, color: primaryColor }}>
            {review.author}
          </div>
          {review.relativeTime && (
            <div style={{ fontFamily: fontBody, fontSize: "0.7rem", color: primaryColor, opacity: 0.4 }}>
              {review.relativeTime}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Professional variant: thick accent left border, tinted bg ── */
function ProfessionalReview({
  review,
  primaryColor,
  accentColor,
  bgAltColor,
  fontDisplay,
  fontBody,
}: {
  review: ProspectReview;
  primaryColor: string;
  accentColor: string;
  bgAltColor: string;
  fontDisplay: string;
  fontBody: string;
}) {
  return (
    <div
      style={{
        background: bgAltColor,
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: 4,
        padding: "24px 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <StarRow rating={review.rating} color={accentColor} size={13} />
        {review.relativeTime && (
          <span style={{ fontFamily: fontBody, fontSize: "0.7rem", color: primaryColor, opacity: 0.4 }}>
            {review.relativeTime}
          </span>
        )}
      </div>
      <p
        style={{
          fontFamily: fontBody,
          fontSize: "0.92rem",
          color: primaryColor,
          lineHeight: 1.7,
          margin: "0 0 12px",
          opacity: 0.75,
        }}
      >
        {truncate(review.text, 160)}
      </p>
      <span
        style={{
          fontFamily: fontDisplay,
          fontSize: "0.8rem",
          fontWeight: 700,
          color: primaryColor,
          opacity: 0.6,
        }}
      >
        — {review.author}
      </span>
    </div>
  );
}

/* ── Modern variant: minimal card, fine border, accent top strip ── */
function ModernReview({
  review,
  primaryColor,
  accentColor,
  bgAltColor,
  fontDisplay,
  fontBody,
}: {
  review: ProspectReview;
  primaryColor: string;
  accentColor: string;
  bgAltColor: string;
  fontDisplay: string;
  fontBody: string;
}) {
  return (
    <div
      style={{
        background: bgAltColor,
        border: `1px solid ${primaryColor}08`,
        borderRadius: 8,
        padding: "24px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent top strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}60)`,
          borderRadius: "8px 8px 0 0",
        }}
      />
      <StarRow rating={review.rating} color={accentColor} size={13} />
      <p
        style={{
          fontFamily: fontBody,
          fontSize: "0.92rem",
          color: primaryColor,
          lineHeight: 1.7,
          margin: "10px 0 14px",
          opacity: 0.75,
        }}
      >
        {truncate(review.text, 150)}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: fontDisplay,
            fontSize: "0.8rem",
            fontWeight: 600,
            color: primaryColor,
            opacity: 0.6,
          }}
        >
          {review.author}
        </span>
        {review.relativeTime && (
          <>
            <span style={{ color: primaryColor, opacity: 0.2 }}>·</span>
            <span style={{ fontFamily: fontBody, fontSize: "0.72rem", color: primaryColor, opacity: 0.35 }}>
              {review.relativeTime}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main exported section ── */
export function ReviewSection({
  reviews,
  sectionTitle,
  template,
  primaryColor,
  accentColor,
  bgColor,
  bgAltColor,
  textOnPrimary,
  fontDisplay,
  fontBody,
  transition,
}: ReviewSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  const isEditorial = template === "editorial";

  // Editorial uses dark bg, others use bgAlt
  const sectionBg = isEditorial ? primaryColor : bgAltColor;
  const titleColor = isEditorial ? textOnPrimary : primaryColor;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={transition}
      style={{ padding: "80px 24px", background: sectionBg }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: isEditorial ? 56 : 48 }}>
          {isEditorial && (
            <div
              style={{
                width: 50,
                height: 1,
                background: accentColor,
                margin: "0 auto 20px",
              }}
            />
          )}
          <h2
            style={{
              fontFamily: fontDisplay,
              fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              fontWeight: isEditorial ? 600 : 700,
              color: titleColor,
              margin: 0,
              letterSpacing: isEditorial ? "-0.01em" : "-0.02em",
            }}
          >
            {sectionTitle}
          </h2>
          {template === "portfolio" && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: accentColor,
                    opacity: 1 - i * 0.25,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Reviews grid */}
        <motion.div
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns:
              isEditorial
                ? "1fr"
                : reviews.length === 1
                  ? "1fr"
                  : template === "portfolio"
                    ? "repeat(auto-fit, minmax(260px, 1fr))"
                    : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isEditorial ? 0 : template === "portfolio" ? 20 : 16,
          }}
        >
          {reviews.map((review, i) => (
            <motion.div key={i} variants={staggerItem} transition={transition}>
              {template === "editorial" ? (
                <EditorialReview
                  review={review}
                  primaryColor={textOnPrimary}
                  accentColor={accentColor}
                  fontDisplay={fontDisplay}
                  fontBody={fontBody}
                />
              ) : template === "portfolio" ? (
                <PortfolioReview
                  review={review}
                  primaryColor={primaryColor}
                  accentColor={accentColor}
                  bgColor={bgColor}
                  fontDisplay={fontDisplay}
                  fontBody={fontBody}
                />
              ) : template === "professional" ? (
                <ProfessionalReview
                  review={review}
                  primaryColor={primaryColor}
                  accentColor={accentColor}
                  bgAltColor={bgColor}
                  fontDisplay={fontDisplay}
                  fontBody={fontBody}
                />
              ) : (
                <ModernReview
                  review={review}
                  primaryColor={primaryColor}
                  accentColor={accentColor}
                  bgAltColor={bgColor}
                  fontDisplay={fontDisplay}
                  fontBody={fontBody}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Editorial closing line */}
        {isEditorial && (
          <div style={{ width: 50, height: 1, background: accentColor, margin: "20px auto 0" }} />
        )}
      </div>
    </motion.section>
  );
}
