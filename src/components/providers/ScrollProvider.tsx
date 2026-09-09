"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
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

    // Reset scroll to top on first-time load to prevent calculation offset bugs
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.scrollY > 0 && !window.location.hash) {
      window.scrollTo(0, 0);
    }

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

    // Ultra-Smooth Lenis Smooth Scroll Configuration
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      if (typeof e.progress === "number") {
        setProgress(e.progress);
      }
    });

    // Add Lenis update to GSAP ticker
    const rafTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafTicker);
    // Crucial: lagSmoothing(0) prevents GSAP from delaying or clamping frames on first-time hydration
    gsap.ticker.lagSmoothing(0);

    // Global scroll progress tracker
    const mainTrigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    // Parallax Elements - excluding components that handle their own entrance animations
    const parallaxTriggers: ScrollTrigger[] = [];
    const parallaxElements = document.querySelectorAll<HTMLElement>(
      "[data-scroll-speed]:not(.contact-forms-grid), [data-speed]:not(.contact-forms-grid)"
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

    // Multi-phase ScrollTrigger refresh to ensure first-time load positions are 100% accurate:
    // 1. Initial next-frame refresh
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // 2. Refresh after web fonts load
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // 3. Staggered timers to catch late hydration, dynamic imports, and image layout shifts
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 400);
    const timer3 = setTimeout(() => ScrollTrigger.refresh(), 1000);

    // 4. Window load event (or immediate if already loaded)
    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    // 5. ResizeObserver to catch lazy-loaded sections and dynamic image size changes
    let resizeTimer: NodeJS.Timeout | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeObserver.disconnect();
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
