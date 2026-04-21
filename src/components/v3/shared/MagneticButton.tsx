"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  href?: string;
};

export function MagneticButton({ 
  children, 
  className, 
  onClick, 
  variant = "primary",
  href 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useTransform(x, (val) => val * 0.15);
  const ySpring = useTransform(y, (val) => val * 0.15);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseClasses = "relative flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium transition-colors duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-[var(--v3-ember-amber)] text-black hover:bg-[var(--v3-ember-amber-light)]",
    secondary: "v3-liquid-glass text-white hover:bg-white/5",
  };

  const Content = () => (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-45deg]"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      )}
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      {href ? (
        <a 
          href={href} 
          className={cn(baseClasses, variants[variant], className)}
          onClick={onClick}
        >
          <Content />
        </a>
      ) : (
        <button 
          className={cn(baseClasses, variants[variant], className)}
          onClick={onClick}
        >
          <Content />
        </button>
      )}
    </motion.div>
  );
}
