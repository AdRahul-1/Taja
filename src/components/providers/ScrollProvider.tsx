"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useScrollStore } from "@/store/scrollStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollProviderProps {
  children: React.ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const isReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const setProgress = useScrollStore((state) => state.setProgress);
  const setReducedMotion = useScrollStore((state) => state.setReducedMotion);

  useEffect(() => {
    setReducedMotion(isReducedMotion);
  }, [isReducedMotion, setReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reduced motion branch: rely strictly on native browser scrolling
    if (isReducedMotion) {
      const handleNativeScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
        setProgress(progress);
      };

      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleNativeScroll);
    }

    // Standard high-performance Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // Keep native touch scroll on mobile/iOS
    });
    lenisRef.current = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      if (typeof e.progress === "number") {
        setProgress(e.progress);
      }
    });

    const rafTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafTicker);
    gsap.ticker.lagSmoothing(0);

    // Global scroll progress tracker
    const mainTrigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    // Refresh ScrollTrigger after layout stabilizes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(rafTicker);
      mainTrigger.kill();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isReducedMotion, setProgress]);

  return <>{children}</>;
}
