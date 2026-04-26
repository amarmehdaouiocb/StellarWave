"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type LogoProps = {
  variant?: "fixed-topleft" | "inline";
  height?: number | string;
  href?: string;
  priority?: boolean;
  className?: string;
};

export function Logo({
  variant = "inline",
  height = 40,
  href = "/",
  priority = false,
  className,
}: LogoProps) {
  const numericHeight =
    typeof height === "number" ? height : undefined;

  const imgEl = (
    <Image
      src="/logo.svg"
      alt="Stellar Wave"
      width={numericHeight ? Math.round(numericHeight * (487 / 625)) : 80}
      height={numericHeight ?? 100}
      priority={priority}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        width: "auto",
        display: "block",
      }}
    />
  );

  if (variant === "fixed-topleft") {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          position: "fixed",
          top: 24,
          left: 28,
          zIndex: 50,
        }}
      >
        <Link
          href={href}
          aria-label="Stellar Wave — retour accueil"
          className="group inline-flex items-center"
          style={{
            filter:
              "drop-shadow(0 0 12px rgba(56, 189, 248, 0.15)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.25))",
            transition: "filter 400ms ease, transform 400ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter =
              "drop-shadow(0 0 18px rgba(56, 189, 248, 0.35)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter =
              "drop-shadow(0 0 12px rgba(56, 189, 248, 0.15)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.25))";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          {imgEl}
        </Link>
      </motion.div>
    );
  }

  return (
    <Link
      href={href}
      aria-label="Stellar Wave — retour accueil"
      className={className}
      style={{ display: "inline-block" }}
    >
      {imgEl}
    </Link>
  );
}

export default Logo;
