"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PreviewProps } from "@/lib/preview-types";
import { ModernTemplate } from "./templates/modern/ModernTemplate";
import { EditorialTemplate } from "./templates/editorial/EditorialTemplate";
import { PortfolioTemplate } from "./templates/portfolio/PortfolioTemplate";
import { ProfessionalTemplate } from "./templates/professional/ProfessionalTemplate";
import { TemplateSwitcher } from "./shared/TemplateSwitcher";

export function PreviewClient(props: PreviewProps) {
  const { variants } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwitch = useCallback((index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeIndex]);

  // Déterminer le template et thème actifs
  const activeVariant = variants?.[activeIndex];
  const activeTemplate = activeVariant?.template ?? props.template;
  const activeTheme = activeVariant?.theme ?? props.theme;

  const templateProps: PreviewProps = {
    ...props,
    template: activeTemplate,
    theme: activeTheme,
  };

  const renderTemplate = () => {
    switch (activeTemplate) {
      case "editorial":
        return <EditorialTemplate {...templateProps} />;
      case "portfolio":
        return <PortfolioTemplate {...templateProps} />;
      case "professional":
        return <ProfessionalTemplate {...templateProps} />;
      case "modern":
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  // Sans variants, comportement original
  if (!variants || variants.length <= 1) {
    return renderTemplate();
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTemplate}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTemplate()}
        </motion.div>
      </AnimatePresence>
      <TemplateSwitcher
        variants={variants}
        activeIndex={activeIndex}
        onSwitch={handleSwitch}
      />
    </>
  );
}
