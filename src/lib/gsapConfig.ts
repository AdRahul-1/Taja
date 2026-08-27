import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";

// Register Core Plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, CustomEase);
  // Register the strict brandEase: cubic-bezier(0.65, 0, 0.35, 1)
  CustomEase.create("brandEase", "0.65, 0, 0.35, 1");
}

/**
 * Strict 3-Tier Sitewide Timing System
 * Micro: 0.4s (power2.out)
 * Section Reveal: 0.8s (brandEase)
 * Hero / Signature Moment: 1.2s (power3.out)
 */
export const GSAP_TIMING = {
  micro: {
    duration: 0.4,
    ease: "power2.out",
  },
  section: {
    duration: 0.8,
    ease: "brandEase",
  },
  hero: {
    duration: 1.2,
    ease: "power3.out",
  },
} as const;

export { gsap, ScrollTrigger, Flip, CustomEase };
