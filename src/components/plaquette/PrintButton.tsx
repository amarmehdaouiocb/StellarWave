"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hidden"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "230px",
        zIndex: 999,
        background: "rgba(15, 23, 42, 0.9)",
        color: "#cbd5e1",
        padding: "12px 18px",
        borderRadius: "999px",
        fontFamily: "var(--font-mona), system-ui, sans-serif",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.04em",
        border: "1px solid rgba(56,189,248,0.3)",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      ⌘P · Imprimer
    </button>
  );
}
