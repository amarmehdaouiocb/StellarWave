import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PaletteIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Animate the color dots with a staggered rotation
      animate(
        ".palette-dot-1",
        { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] },
        { duration: 0.4, ease: "easeInOut" }
      );
      animate(
        ".palette-dot-2",
        { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] },
        { duration: 0.4, ease: "easeInOut", delay: 0.1 }
      );
      animate(
        ".palette-dot-3",
        { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] },
        { duration: 0.4, ease: "easeInOut", delay: 0.2 }
      );
      // Rotate the entire palette slightly
      animate(
        ".palette-base",
        { rotate: [0, -8, 0] },
        { duration: 0.5, ease: "easeInOut" }
      );
    };

    const stop = () => {
      animate(
        ".palette-dot-1",
        { scale: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" }
      );
      animate(
        ".palette-dot-2",
        { scale: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" }
      );
      animate(
        ".palette-dot-3",
        { scale: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" }
      );
      animate(
        ".palette-base",
        { rotate: 0 },
        { duration: 0.2, ease: "easeInOut" }
      );
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.svg
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
      >
        {/* Palette base shape */}
        <motion.path
          className="palette-base"
          d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"
        />
        {/* Color dots */}
        <motion.circle
          className="palette-dot-1"
          cx="7.5"
          cy="10"
          r="1.5"
          fill={color}
          stroke="none"
        />
        <motion.circle
          className="palette-dot-2"
          cx="12"
          cy="7.5"
          r="1.5"
          fill={color}
          stroke="none"
        />
        <motion.circle
          className="palette-dot-3"
          cx="16.5"
          cy="10"
          r="1.5"
          fill={color}
          stroke="none"
        />
      </motion.svg>
    );
  }
);

PaletteIcon.displayName = "PaletteIcon";

export default PaletteIcon;
