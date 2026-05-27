import { PdfPageLandscape } from "@/components/plaquette/PdfPageLandscape";
import { AiOpsPage1Cover } from "@/components/plaquette/ai-operations/Page1Cover";
import { AiOpsPage2Problem } from "@/components/plaquette/ai-operations/Page2Problem";
import { AiOpsPage3Approach } from "@/components/plaquette/ai-operations/Page3Approach";
import { PrintButton } from "@/components/plaquette/PrintButton";
import "./landscape.css";

export const metadata = {
  title: "Opérations IA pour cabinets de gestion — StellarWave",
  description:
    "Deck commercial AI Operations — version preview 3 pages (FR, A4 landscape).",
  robots: { index: false, follow: false },
};

export default function AiOperationsDeckPage() {
  return (
    <>
      <PdfPageLandscape>
        <AiOpsPage1Cover />
      </PdfPageLandscape>
      <PdfPageLandscape>
        <AiOpsPage2Problem />
      </PdfPageLandscape>
      <PdfPageLandscape>
        <AiOpsPage3Approach />
      </PdfPageLandscape>

      <a
        href="/decks/stellarwave-ai-operations-fr.pdf"
        download
        className="print-hidden"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999,
          background:
            "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
          color: "#000",
          padding: "12px 20px",
          borderRadius: "999px",
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.02em",
          textDecoration: "none",
          boxShadow:
            "0 8px 24px rgba(56,189,248,0.4), 0 2px 8px rgba(0,0,0,0.4)",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        ↓ Télécharger le PDF (preview 3 pages)
      </a>

      <PrintButton />
    </>
  );
}
