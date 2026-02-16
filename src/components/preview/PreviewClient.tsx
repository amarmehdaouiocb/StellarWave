"use client";

import type { PreviewProps } from "@/lib/preview-types";
import { ModernTemplate } from "./templates/modern/ModernTemplate";
import { EditorialTemplate } from "./templates/editorial/EditorialTemplate";
import { PortfolioTemplate } from "./templates/portfolio/PortfolioTemplate";
import { ProfessionalTemplate } from "./templates/professional/ProfessionalTemplate";

export function PreviewClient(props: PreviewProps) {
  switch (props.template) {
    case "editorial":
      return <EditorialTemplate {...props} />;
    case "portfolio":
      return <PortfolioTemplate {...props} />;
    case "professional":
      return <ProfessionalTemplate {...props} />;
    case "modern":
    default:
      return <ModernTemplate {...props} />;
  }
}
