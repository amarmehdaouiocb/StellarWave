import { PdfPage } from "@/components/plaquette/PdfPage";
import { AffiliationCommerciauxPage1 } from "@/components/plaquette/affiliation-commerciaux/Page1";
import { AffiliationCommerciauxPage2 } from "@/components/plaquette/affiliation-commerciaux/Page2";
import { PrintButton } from "@/components/plaquette/PrintButton";

export const metadata = {
  title: "Programme d'affiliation — Apporteurs d'affaires — Stellar Wave",
  description:
    "Plaquette d'affiliation 2 pages destinée aux commerciaux et apporteurs d'affaires.",
  robots: { index: false, follow: false },
};

export default function AffiliationCommerciauxPlaquettePage() {
  return (
    <>
      <PdfPage>
        <AffiliationCommerciauxPage1 />
      </PdfPage>
      <PdfPage>
        <AffiliationCommerciauxPage2 />
      </PdfPage>

      <a
        href="/decks/stellarwave-affiliation-commerciaux-fr.pdf"
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
        ↓ Télécharger le PDF (2 pages)
      </a>

      <PrintButton />
    </>
  );
}
