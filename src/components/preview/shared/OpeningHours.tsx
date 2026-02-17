"use client";

import { motion } from "framer-motion";
import type { TemplateName } from "@/lib/template-registry";
import { staggerContainer, staggerItem } from "@/lib/preview-animations";
import type { Transition } from "framer-motion";

interface OpeningHoursProps {
  horaires: string[];
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

/**
 * Détecte le jour actuel (lundi=0...dimanche=6) dans les horaires Google.
 * Google retourne les jours en français : "Lundi: 09:00–19:00"
 */
function getCurrentDayIndex(): number {
  const jsDay = new Date().getDay(); // 0=dim, 1=lun...
  // Convertir JS (dim=0) → FR (lun=0)
  return jsDay === 0 ? 6 : jsDay - 1;
}

/**
 * Détermine si l'horaire indique "Fermé" ou similaire
 */
function isClosed(horaire: string): boolean {
  const lower = horaire.toLowerCase();
  return lower.includes("fermé") || lower.includes("closed");
}

/**
 * Sépare le jour et les heures depuis "Lundi: 09:00–19:00"
 */
function splitDayHours(horaire: string): { day: string; hours: string } {
  const colonIndex = horaire.indexOf(":");
  if (colonIndex === -1) return { day: horaire, hours: "" };
  // Attention: l'horaire peut contenir des ":" dans les heures (09:00)
  // Le premier ":" sépare le jour, sauf si le jour est court (3-4 chars)
  const parts = horaire.split(/:\s*/);
  if (parts.length >= 2) {
    return { day: parts[0], hours: parts.slice(1).join(": ") };
  }
  return { day: horaire, hours: "" };
}

export function OpeningHours({
  horaires,
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
}: OpeningHoursProps) {
  if (!horaires || horaires.length === 0) return null;

  const currentDay = getCurrentDayIndex();

  const isEditorial = template === "editorial";
  const sectionBg = isEditorial ? bgAltColor : bgColor;

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
      style={{ padding: "60px 24px", background: sectionBg }}
    >
      <div style={{ maxWidth: template === "modern" ? 600 : 700, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          {isEditorial && (
            <div style={{ width: 50, height: 1, background: accentColor, margin: "0 auto 20px" }} />
          )}
          <h2
            style={{
              fontFamily: fontDisplay,
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              fontWeight: isEditorial ? 600 : 700,
              color: primaryColor,
              margin: 0,
              letterSpacing: isEditorial ? "-0.01em" : "-0.02em",
            }}
          >
            {sectionTitle}
          </h2>
        </div>

        {/* Hours list */}
        <motion.div variants={staggerContainer}>
          {horaires.map((horaire, i) => {
            const isToday = i === currentDay;
            const closed = isClosed(horaire);
            const { day, hours } = splitDayHours(horaire);

            return (
              <motion.div
                key={i}
                variants={staggerItem}
                transition={transition}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding:
                    template === "professional"
                      ? "14px 16px"
                      : template === "modern"
                        ? "12px 16px"
                        : "14px 0",
                  background:
                    template === "professional"
                      ? i % 2 === 0
                        ? bgAltColor
                        : "transparent"
                      : template === "modern"
                        ? isToday
                          ? `${accentColor}08`
                          : "transparent"
                        : "transparent",
                  borderRadius: template === "portfolio" ? 8 : template === "modern" ? 6 : 2,
                  borderBottom:
                    template === "editorial"
                      ? `1px solid ${primaryColor}10`
                      : template === "portfolio"
                        ? `1px solid ${primaryColor}06`
                        : "none",
                  borderLeft:
                    template === "professional" && isToday
                      ? `3px solid ${accentColor}`
                      : template === "professional"
                        ? "3px solid transparent"
                        : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: fontBody,
                    fontSize: "0.9rem",
                    fontWeight: isToday ? 700 : 400,
                    color: isToday ? accentColor : primaryColor,
                    opacity: isToday ? 1 : 0.7,
                    minWidth: 100,
                  }}
                >
                  {day}
                </span>

                {/* Today badge */}
                {isToday && (
                  <span
                    style={{
                      fontFamily: fontBody,
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: closed ? "#c0392b" : accentColor,
                      background: closed ? "#c0392b15" : `${accentColor}15`,
                      padding: "2px 8px",
                      borderRadius: 100,
                      marginRight: 8,
                    }}
                  >
                    {closed ? "Fermé" : "Ouvert"}
                  </span>
                )}

                <span
                  style={{
                    fontFamily: fontBody,
                    fontSize: "0.88rem",
                    fontWeight: isToday ? 600 : 400,
                    color: closed
                      ? `${primaryColor}60`
                      : isToday
                        ? primaryColor
                        : primaryColor,
                    opacity: closed ? 0.5 : isToday ? 0.9 : 0.6,
                    textAlign: "right",
                  }}
                >
                  {hours}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
