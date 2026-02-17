"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/preview-animations";
import type { TemplateName } from "@/lib/template-registry";
import type { Transition } from "framer-motion";

interface ContactFormProps {
  template: TemplateName;
  accentColor: string;
  primaryColor: string;
  bgColor: string;
  bgAltColor: string;
  textOnPrimary: string;
  fontDisplay: string;
  fontBody: string;
  transition: Transition;
}

type InputStyle = {
  base: React.CSSProperties;
  focus: React.CSSProperties;
  button: React.CSSProperties;
};

function getInputStyles(
  template: TemplateName,
  accent: string,
  primary: string,
  bg: string,
  textOnPrimary: string,
  fontBody: string,
): InputStyle {
  const common: React.CSSProperties = {
    fontFamily: fontBody,
    fontSize: "0.95rem",
    color: primary,
    width: "100%",
    padding: "12px 16px",
    outline: "none",
    background: "transparent",
    boxSizing: "border-box",
  };

  switch (template) {
    case "editorial":
      return {
        base: {
          ...common,
          border: "none",
          borderBottom: `1px solid ${primary}20`,
          borderRadius: 0,
          padding: "12px 4px",
        },
        focus: { borderBottomColor: accent },
        button: {
          fontFamily: fontBody,
          fontSize: "0.95rem",
          fontWeight: 600,
          color: textOnPrimary,
          background: accent,
          border: "none",
          borderRadius: 0,
          padding: "14px 32px",
          cursor: "pointer",
          width: "auto",
        },
      };
    case "portfolio":
      return {
        base: {
          ...common,
          border: `1px solid ${primary}15`,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        },
        focus: { boxShadow: `0 0 0 3px ${accent}30`, borderColor: accent },
        button: {
          fontFamily: fontBody,
          fontSize: "0.95rem",
          fontWeight: 600,
          color: textOnPrimary,
          background: primary,
          border: "none",
          borderRadius: 100,
          padding: "14px 40px",
          cursor: "pointer",
          width: "auto",
        },
      };
    case "professional":
      return {
        base: {
          ...common,
          border: `1px solid ${primary}20`,
          borderLeft: `3px solid transparent`,
          borderRadius: 4,
        },
        focus: { borderLeftColor: accent },
        button: {
          fontFamily: fontBody,
          fontSize: "0.95rem",
          fontWeight: 700,
          color: primary,
          background: accent,
          border: "none",
          borderRadius: 4,
          padding: "14px 32px",
          cursor: "pointer",
          width: "100%",
        },
      };
    case "modern":
    default:
      return {
        base: {
          ...common,
          border: `1px solid ${primary}15`,
          borderRadius: 8,
        },
        focus: { borderColor: accent, borderTopColor: accent },
        button: {
          fontFamily: fontBody,
          fontSize: "0.95rem",
          fontWeight: 600,
          color: textOnPrimary,
          background: primary,
          border: "none",
          borderRadius: 8,
          padding: "14px 32px",
          cursor: "pointer",
          width: "auto",
        },
      };
  }
}

export function ContactForm({
  template,
  accentColor,
  primaryColor,
  bgColor,
  bgAltColor,
  textOnPrimary,
  fontDisplay,
  fontBody,
  transition: trans,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const styles = getInputStyles(template, accentColor, primaryColor, bgColor, textOnPrimary, fontBody);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const fields = [
    { name: "name", label: "Nom", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Téléphone", type: "tel", required: false },
    { name: "message", label: "Message", type: "textarea", required: true },
  ];

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              textAlign: "center",
              padding: "48px 24px",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>✓</div>
            <p
              style={{
                fontFamily: fontDisplay,
                fontSize: "1.2rem",
                fontWeight: 600,
                color: primaryColor,
                margin: "0 0 8px",
              }}
            >
              Merci !
            </p>
            <p
              style={{
                fontFamily: fontBody,
                fontSize: "0.9rem",
                color: primaryColor,
                opacity: 0.6,
                margin: 0,
              }}
            >
              Votre message a bien été envoyé.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {fields.map((field) => (
              <motion.div key={field.name} variants={staggerItem} transition={trans}>
                {template === "editorial" && (
                  <label
                    style={{
                      fontFamily: fontDisplay,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: primaryColor,
                      opacity: 0.5,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {field.label}
                  </label>
                )}
                {field.type === "textarea" ? (
                  <textarea
                    placeholder={template === "editorial" ? "" : field.label}
                    required={field.required}
                    rows={4}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...styles.base,
                      resize: "vertical",
                      ...(focusedField === field.name ? styles.focus : {}),
                    }}
                  />
                ) : (
                  <input
                    type={field.type}
                    placeholder={template === "editorial" ? "" : field.label}
                    required={field.required}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...styles.base,
                      ...(focusedField === field.name ? styles.focus : {}),
                    }}
                  />
                )}
              </motion.div>
            ))}
            <motion.div variants={staggerItem} transition={trans}>
              <button
                type="submit"
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Envoyer le message
              </button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
