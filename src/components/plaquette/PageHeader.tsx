import Image from "next/image";

type PageHeaderProps = {
  pageLabel: string;
  pageNumber: string;
};

export function PageHeader({ pageLabel, pageNumber }: PageHeaderProps) {
  return (
    <header className="pdf-page-header">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Image
          src="/logo.svg"
          alt="Stellar Wave"
          width={120}
          height={28}
          priority
          style={{ height: "8mm", width: "auto" }}
        />
      </div>
      <div
        className="pdf-micro-caps"
        style={{
          color: "#38bdf8",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#38bdf8",
            boxShadow: "0 0 12px rgba(56,189,248,0.6)",
          }}
        />
        {pageNumber} · {pageLabel}
      </div>
    </header>
  );
}
