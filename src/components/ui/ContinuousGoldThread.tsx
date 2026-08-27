"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ContinuousGoldThread() {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !pathRef.current || !containerRef.current) {
      return;
    }

    const path = pathRef.current;
    const container = containerRef.current;

    const ctx = gsap.context(() => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Scrub the drawing of the continuous gold thread across the entire page scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#main-content",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 bottom-0 left-4 sm:left-8 lg:left-12 w-8 pointer-events-none z-10 hidden md:block overflow-visible"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full text-gold"
        preserveAspectRatio="none"
        viewBox="0 0 32 6000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Continuous Single Gold Thread Running Full Page Height */}
        <path
          ref={pathRef}
          d="M 16 0 L 16 1200 C 16 1240 28 1260 28 1300 C 28 1340 16 1360 16 1400 L 16 2600 C 16 2640 4 2660 4 2700 C 4 2740 16 2760 16 2800 L 16 4200 C 16 4240 28 4260 28 4300 C 28 4340 16 4360 16 4400 L 16 6000"
          stroke="#C9982E"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />

        {/* Delicate Ornamental Node Accent at Top */}
        <circle cx="16" cy="120" r="3" fill="#C9982E" opacity="0.9" />
        <circle cx="16" cy="120" r="6" stroke="#C9982E" strokeWidth="0.8" opacity="0.6" />

        {/* Delicate Ornamental Node Accent at Mid-Story */}
        <circle cx="28" cy="1300" r="2.5" fill="#C9982E" opacity="0.9" />

        {/* Delicate Ornamental Node Accent at Ingredients */}
        <circle cx="4" cy="2700" r="2.5" fill="#C9982E" opacity="0.9" />

        {/* Delicate Ornamental Node Accent at Shelf */}
        <circle cx="28" cy="4300" r="2.5" fill="#C9982E" opacity="0.9" />
      </svg>
    </div>
  );
}
