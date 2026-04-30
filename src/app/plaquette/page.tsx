import { PdfPage } from "@/components/plaquette/PdfPage";
import { Page1Cover } from "@/components/plaquette/Page1Cover";
import { Page2Services } from "@/components/plaquette/Page2Services";
import { Page3AutomationAI } from "@/components/plaquette/Page3AutomationAI";
import { Page4WebdesignAI } from "@/components/plaquette/Page4WebdesignAI";
import { Page5Recurring } from "@/components/plaquette/Page5Recurring";
import { Page6CaseStudies } from "@/components/plaquette/Page6CaseStudies";
import { Page7Process } from "@/components/plaquette/Page7Process";
import { PrintButton } from "@/components/plaquette/PrintButton";

export default function PlaquettePage() {
  return (
    <>
      <PdfPage>
        <Page1Cover />
      </PdfPage>
      <PdfPage>
        <Page2Services />
      </PdfPage>
      <PdfPage>
        <Page3AutomationAI />
      </PdfPage>
      <PdfPage>
        <Page4WebdesignAI />
      </PdfPage>
      <PdfPage>
        <Page5Recurring />
      </PdfPage>
      <PdfPage>
        <Page6CaseStudies />
      </PdfPage>
      <PdfPage>
        <Page7Process />
      </PdfPage>

      {/* Bouton flottant — masqué à l'impression */}
      <a
        href="/stellarwave-plaquette.pdf"
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
        ↓ Télécharger le PDF
      </a>

      <PrintButton />
    </>
  );
}
