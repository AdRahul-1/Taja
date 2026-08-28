"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ScrollProvider from "@/components/providers/ScrollProvider";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import WhyTajaSection from "@/components/sections/WhyTajaSection";
import IngredientsSection from "@/components/sections/IngredientsSection";
import ShelfSection from "@/components/sections/ShelfSection";
import ContactSplitSection from "@/components/sections/ContactSplitSection";
import FooterSection from "@/components/sections/FooterSection";
import ContinuousGoldThread from "@/components/ui/ContinuousGoldThread";

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
