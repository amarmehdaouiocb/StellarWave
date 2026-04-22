"use client";

import { motion } from "framer-motion";

export function PerpetualShimmer() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
      <motion.div
        className="w-[200%] h-full opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        }}
        animate={{
          x: ["-100%", "50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
      />
    </div>
  );
}
