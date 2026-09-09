"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ScrollProvider from "@/components/providers/ScrollProvider";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import ContinuousGoldThread from "@/components/ui/ContinuousGoldThread";

// Lazy-load below-the-fold sections with SSR preserved for SEO & zero LCP blocking
const StorySection = dynamic(() => import("@/components/sections/StorySection"), {
  ssr: true,
  loading: () => <SectionSkeleton height="min-h-[80vh]" />,
});
const WhyTajaSection = dynamic(() => import("@/components/sections/WhyTajaSection"), {
  ssr: true,
  loading: () => <SectionSkeleton height="min-h-[90vh]" />,
});
const IngredientsSection = dynamic(() => import("@/components/sections/IngredientsSection"), {
  ssr: true,
  loading: () => <SectionSkeleton height="min-h-[90vh]" />,
});
const ShelfSection = dynamic(() => import("@/components/sections/ShelfSection"), {
  ssr: true,
  loading: () => <SectionSkeleton height="min-h-[90vh]" />,
});
const ContactSplitSection = dynamic(() => import("@/components/sections/ContactSplitSection"), {
  ssr: true,
  loading: () => <SectionSkeleton height="min-h-[80vh]" />,
});
const FooterSection = dynamic(() => import("@/components/sections/FooterSection"), {
  ssr: true,
  loading: () => <SectionSkeleton height="min-h-[40vh]" />,
});

// Asynchronous Three.js WebGL background layer (mounts on idle, never blocks LCP)
const HeroScene = dynamic(() => import("@/components/canvas/HeroScene"), {
  ssr: false,
});

export default function HomeClient() {
  const [activeFlavor, setActiveFlavor] = useState<"jhal" | "misti">("jhal");
  const [mountCanvas, setMountCanvas] = useState(false);

  useEffect(() => {
    // Mount WebGL progressive enhancement layer after main DOM thread is idle
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => setMountCanvas(true), { timeout: 1500 });
      } else {
        const timer = setTimeout(() => setMountCanvas(true), 300);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <ScrollProvider>
      <div className="relative min-h-screen bg-transparent text-espresso-900 overflow-x-hidden selection:bg-gold selection:text-espresso-900">
        {/* Dynamic WebGL Canvas Layer (Mounts asynchronously without blocking LCP) */}
        {mountCanvas && <HeroScene />}

        <Header />

        {/* Sitewide Continuous Gold Thread Spine */}
        <ContinuousGoldThread />

        {/* Main 7-Section Cinematic Storytelling Flow */}
        <main id="main-content" className="relative z-20">
          {/* Section 1: Flagship Cinematic Hero */}
          <HeroSection
            activeFlavor={activeFlavor}
            onFlavorChange={setActiveFlavor}
          />

          {/* Section 2: Since 2009 Heritage & Maker Story */}
          <StorySection />

          {/* Section 3: Why Taja - Five Differentiators */}
          <WhyTajaSection />

          {/* Section 4: Authentic Bilingual Ingredients Showcase */}
          <IngredientsSection />

          {/* Section 5: The Shelf - Full Product Catalogue & Filter */}
          <ShelfSection />

          {/* Section 6: Split Contact - Consumer & Distributor Portal */}
          <ContactSplitSection />
        </main>

        {/* Section 7: Credentialed Footer with Statutory FSSAI Registration */}
        <FooterSection />
      </div>
    </ScrollProvider>
  );
}
