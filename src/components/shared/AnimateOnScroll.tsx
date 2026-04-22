"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimateOnScrollProps = {
  children: ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
  triggerPosition?: string;
  once?: boolean;
  style?: React.CSSProperties;
  id?: string;
};

/**
 * AnimateOnScroll - GSAP ScrollTrigger driven animations
 * Elements rise from `y` offset with opacity 0->1
 * Children are staggered by `stagger` ms
 */
export function AnimateOnScroll({
  children,
  className,
  as: Tag = "div",
  stagger = 0.12,
  delay = 0,
  y = 40,
  duration = 0.8,
  triggerPosition = "top 85%",
  once = true,
  style,
  id,
}: AnimateOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const childElements = el.children;

    if (childElements.length === 0) {
      // Animate the container itself
      gsap.set(el, { opacity: 0, y });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: triggerPosition,
          once,
        },
      });
    } else {
      // Animate children with stagger
      gsap.set(childElements, { opacity: 0, y });
      gsap.to(childElements, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: triggerPosition,
          once,
        },
      });
    }

    // Fallback: force visible after 2s if ScrollTrigger hasn't fired
    // (headless browsers, screenshot tools, etc.)
    const fallbackTimer = setTimeout(() => {
      if (el) {
        if (childElements.length === 0) {
          gsap.set(el, { opacity: 1, y: 0 });
        } else {
          gsap.set(childElements, { opacity: 1, y: 0 });
        }
      }
    }, 2000);

    return () => {
      clearTimeout(fallbackTimer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [y, duration, delay, stagger, triggerPosition, once]);

  return (
    <div ref={containerRef} className={className} style={style} id={id}>
      {children}
    </div>
  );
}
