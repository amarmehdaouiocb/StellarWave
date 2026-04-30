type PageFooterProps = {
  pageNumber: string;
  totalPages?: string;
};

export function PageFooter({ pageNumber, totalPages = "07" }: PageFooterProps) {
  return (
    <footer className="pdf-page-footer">
      <div
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontSize: "8.5pt",
          color: "#94a3b8",
          letterSpacing: "0.04em",
        }}
      >
        stellarwave.fr · contact@stellarwave.fr · +33 6 25 05 97 32
      </div>
      <div
        className="pdf-page-number"
        style={{ color: "#38bdf8", display: "flex", alignItems: "center", gap: "8px" }}
      >
        <span style={{ color: "#94a3b8" }}>PAGE</span>
        <span>{pageNumber}</span>
        <span style={{ color: "#475569" }}>/</span>
        <span style={{ color: "#94a3b8" }}>{totalPages}</span>
      </div>
    </footer>
  );
}
