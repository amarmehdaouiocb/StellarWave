import { PdfPage } from "@/components/plaquette/PdfPage";
import { ExpressPage1 } from "@/components/plaquette/express/ExpressPage1";
import { ExpressPage2 } from "@/components/plaquette/express/ExpressPage2";
import { PrintButton } from "@/components/plaquette/PrintButton";

export const metadata = {
  title: "Plaquette express — StellarWave",
  description: "Plaquette pitch 2 pages, version courte.",
  robots: { index: false, follow: false },
};

export default function PlaquetteExpressPage() {
  return (
    <>
      <PdfPage noise={false}>
        <ExpressPage1 />
      </PdfPage>
      <PdfPage noise={false}>
        <ExpressPage2 />
      </PdfPage>

      {/* Bouton flottant — masqué à l'impression */}
      <a
        href="/stellarwave-pitch.pdf"
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
        ↓ Télécharger le PDF (pitch 2 pages)
      </a>

      <PrintButton />
    </>
  );
}
