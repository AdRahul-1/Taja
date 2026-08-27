"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AlponaSeamDividerProps {
  /**
   * Theme transition mode:
   * - 'navy-to-cream': Top is Navy, Bottom is Cream
   * - 'cream-to-navy': Top is Cream, Bottom is Navy
   * - 'cream-to-cream': Subtle divider within cream sections
   */
  variant?: "navy-to-cream" | "cream-to-navy" | "cream-to-cream";
  align?: "center" | "left" | "right";
  className?: string;
}

export default function AlponaSeamDivider({
  variant = "cream-to-navy",
  align = "center",
  className = "",
}: AlponaSeamDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !dividerRef.current) return;

    const el = dividerRef.current;
    const paths = el.querySelectorAll<SVGPathElement>(".alpona-path");

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        if (typeof path.getTotalLength === "function") {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          });
        }
      });
    }, dividerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const alignmentClass =
    align === "left"
      ? "justify-start pl-6 lg:pl-12"
      : align === "right"
      ? "justify-end pr-6 lg:pr-12"
      : "justify-center";

  return (
    <div
      ref={dividerRef}
      className={`relative w-full overflow-hidden flex items-center ${alignmentClass} z-20 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-5xl h-14 sm:h-18 lg:h-20 text-gold"
      >
        {/* Left Fading Hairline Baseline */}
        <line
          x1="0"
          y1="40"
          x2="460"
          y2="40"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
          className="alpona-path"
        />

        {/* Right Fading Hairline Baseline */}
        <line
          x1="740"
          y1="40"
          x2="1200"
          y2="40"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
          className="alpona-path"
        />

        {/* Abstracted Bengali Alpona / Rice-grain threshold flourishes */}
        {/* Left Flourish Wing */}
        <path
          d="M 460 40 C 490 40, 510 20, 540 20 C 565 20, 580 34, 595 40"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="alpona-path"
        />
        <path
          d="M 475 40 C 500 40, 518 56, 545 56 C 570 56, 585 46, 595 40"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="alpona-path"
        />
        <path
          d="M 520 28 C 530 33, 545 33, 555 28"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="alpona-path"
        />
        <circle cx="510" cy="20" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="540" cy="16" r="2.5" fill="currentColor" />
        <circle cx="570" cy="22" r="2" fill="currentColor" opacity="0.8" />

        {/* Center Lotus Bud / Sacred Threshold Pinnacle */}
        <path
          d="M 595 40 C 590 30, 595 10, 600 6 C 605 10, 610 30, 605 40"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="alpona-path"
        />
        <path
          d="M 597 40 C 585 30, 582 18, 590 14 C 596 11, 600 24, 600 40"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="alpona-path"
        />
        <path
          d="M 603 40 C 615 30, 618 18, 610 14 C 604 11, 600 24, 600 40"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="alpona-path"
        />
        <circle cx="600" cy="4" r="2" fill="currentColor" />

        {/* Center Lower Petal Loop */}
        <path
          d="M 595 40 C 590 52, 595 68, 600 74 C 605 68, 610 52, 605 40"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="alpona-path"
        />
        <circle cx="600" cy="76" r="2" fill="currentColor" />

        {/* Right Flourish Wing */}
        <path
          d="M 740 40 C 710 40, 690 20, 660 20 C 635 20, 620 34, 605 40"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="alpona-path"
        />
        <path
          d="M 725 40 C 700 40, 682 56, 655 56 C 630 56, 615 46, 605 40"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="alpona-path"
        />
        <path
          d="M 680 28 C 670 33, 655 33, 645 28"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="alpona-path"
        />
        <circle cx="690" cy="20" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="660" cy="16" r="2.5" fill="currentColor" />
        <circle cx="630" cy="22" r="2" fill="currentColor" opacity="0.8" />

        {/* Geometric Diamond Accents */}
        <polygon
          points="460,40 464,36 468,40 464,44"
          fill="currentColor"
          opacity="0.8"
        />
        <polygon
          points="740,40 736,36 732,40 736,44"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
