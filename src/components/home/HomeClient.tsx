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

// Dynamically import Three.js WebGL canvas layer (never blocks SSR / FCP / LCP)
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
      <div className="relative min-h-screen bg-navy-900 text-cream-50 overflow-x-hidden selection:bg-gold selection:text-navy-900">
        {/* Dynamic WebGL Canvas Layer (Mounts asynchronously without blocking LCP) */}
        {mountCanvas && <HeroScene activeFlavor={activeFlavor} />}

        {/* Global Editorial Luxury Header */}
        <Header />

        {/* Main 7-Section Cinematic Storytelling Flow */}
        <main id="main-content" className="relative z-20">
          {/* Section 1: Flagship Cinematic Hero */}
          <HeroSection
            activeFlavor={activeFlavor}
            onFlavorChange={setActiveFlavor}
          />

          {/* Section 2: Since 2009 Heritage & Maker Story */}
          <StorySection />

          {/* Section 3: Why Taja (Six Differentiators) */}
          <WhyTajaSection />

          {/* Section 4: Authentic Bilingual Ingredients Showcase */}
          <IngredientsSection />

          {/* Section 5: The Shelf (Full Product Catalogue & Filter) */}
          <ShelfSection />

          {/* Section 6: Split Contact (Consumer Feedback & Distributor B2B Portal) */}
          <ContactSplitSection />
        </main>

        {/* Section 7: Credentialed Footer with Statutory FSSAI Registration */}
        <FooterSection />
      </div>
    </ScrollProvider>
  );
}
