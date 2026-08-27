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

    // Ultra-Smooth Luxury Lenis Smooth Scroll Configuration with Jitter Prevention
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
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
    // Smooth frame dips gracefully on low-end devices instead of hard jumping
    gsap.ticker.lagSmoothing(500, 33);

    // Global scroll progress tracker
    const mainTrigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    // Authentic Locomotive v5 Parallax Elements
    const parallaxTriggers: ScrollTrigger[] = [];
    const parallaxElements = document.querySelectorAll<HTMLElement>(
      "[data-scroll-speed], [data-speed]"
    );

    parallaxElements.forEach((el) => {
      const speedAttr =
        el.getAttribute("data-scroll-speed") || el.getAttribute("data-speed") || "1";
      const speed = parseFloat(speedAttr);
      if (isNaN(speed) || speed === 1) return;

      const distance = (1 - speed) * 120;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.0,
        onUpdate: (self) => {
          const currentY = -distance * (1 - self.progress * 2);
          gsap.set(el, { y: currentY, force3D: true });
        },
      });
      parallaxTriggers.push(trigger);
    });

    // Refresh after fonts load to prevent layout shifts
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Refresh after initial mount and subsequent layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleWindowLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleWindowLoad);
      parallaxTriggers.forEach((t) => t.kill());
      gsap.ticker.remove(rafTicker);
      mainTrigger.kill();
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.refresh();
    };
  }, [isReducedMotion, setProgress]);

  return <>{children}</>;
}
