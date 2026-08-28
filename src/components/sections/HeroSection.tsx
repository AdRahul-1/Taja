"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, ChevronRight } from "lucide-react";
import { HERO_COPY } from "@/constants/bilingualCopy";
import { trackEvent } from "@/lib/analytics";
import { gsap, GSAP_TIMING } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroSectionProps {
  activeFlavor: "jhal" | "misti";
  onFlavorChange: (flavor: "jhal" | "misti") => void;
}

export default function HeroSection({ activeFlavor, onFlavorChange }: HeroSectionProps) {
  const isJhal = activeFlavor === "jhal";
  const heroRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();

  const handleFlavorToggle = (flavor: "jhal" | "misti") => {
    onFlavorChange(flavor);
    trackEvent({ name: "flavor_toggle_switched", payload: { flavor } });
  };

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero pack settle-in
      gsap.fromTo(
        ".hero-pack-visual",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: GSAP_TIMING.hero.duration,
          ease: GSAP_TIMING.hero.ease,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isReducedMotion, activeFlavor]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen bg-transparent overflow-hidden flex flex-col justify-between pt-28 pb-14 px-4 sm:px-6 lg:px-12 text-espresso-900"
    >


      {/* Bengali / English TAJA Watermark in background with smooth parallax */}
      <div
        data-scroll
        data-scroll-speed="0.4"
        className="absolute right-4 bottom-0 pointer-events-none opacity-[0.08] select-none -z-0 will-change-transform"
      >
        <span className="font-serif text-[26vw] font-black text-gold-dark leading-none tracking-tighter">
          TAJA
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto relative z-20">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          {/* Bilingual Eyebrow with Brand & Manufacturer Connection */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-dark inline-block"></span>
              <span>TAJA CHANACHUR — A BRAND OF R.R. FOOD PRODUCTS (ESTD. 2009)</span>
            </span>
            <span className="font-bengaliDisplay text-sm text-espresso-700 font-medium">
              {HERO_COPY.eyebrowBn}
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-espresso-900 leading-[1.08]">
            Your evening <br className="hidden sm:inline" />
            <span className="text-heritageRed italic font-normal">ritual,</span> since 2009.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-espresso-800 max-w-xl leading-relaxed font-normal">
            Hand-blended in small brass <span className="text-gold-dark font-semibold">kadai</span> batches in
            Raniganj, West Bengal. Golden sev ribbons, slow-roasted Bengal peanuts, and aromatic stone-ground
            spices crafted for the authentic connoisseur of evening tea.
          </p>

          {/* Interactive Flavor Variant Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
            <span className="text-xs uppercase tracking-widest text-espresso-700 font-bold">
              Select Signature Blend:
            </span>
            <div className="inline-flex p-1 rounded-full bg-cream-200/90 border border-gold/40 backdrop-blur-sm shadow-inner">
              <button
                type="button"
                onClick={() => handleFlavorToggle("jhal")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  isJhal
                    ? "bg-heritageRed text-cream-50 shadow-md shadow-heritageRed/30"
                    : "text-espresso-800 hover:text-heritageRed"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Special Jhal (ঝাল)</span>
              </button>
              <button
                type="button"
                onClick={() => handleFlavorToggle("misti")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  !isJhal
                    ? "bg-emerald-700 text-cream-50 shadow-md shadow-emerald-700/30"
                    : "text-espresso-800 hover:text-emerald-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Tak Jhal Misti (টক মিষ্টি)</span>
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#shelf"
              onClick={() =>
                trackEvent({
                  name: "hero_cta_explore_shelf",
                  payload: { flavor: activeFlavor },
                })
              }
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-heritageRed hover:bg-heritageRed-hover text-cream-50 font-bold text-sm tracking-wider uppercase transition-all transform hover:translate-y-[-2px] shadow-lg shadow-heritageRed/25 group cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#distributor-form"
              onClick={() =>
                trackEvent({
                  name: "distributor_cta_clicked",
                  payload: { source: "hero" },
                })
              }
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-navy-900/30 text-navy-900 hover:bg-navy-900 hover:text-cream-50 font-bold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer"
            >
              <span>Wholesale</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quality Credentials Micro Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-espresso-700 border-t border-gold/30 w-full">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-dark"></span>
              <span>FSSAI Certified • Lic. 12825023000187</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>100% Vegetarian</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-heritageRed"></span>
              <span>Zero Trans-Fat Nitrogen Pack</span>
            </div>
          </div>
        </div>

        {/* Right Column: Single Crisp High-Resolution Studio Pack (NO double background packet!) */}
        <div className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0">
          {/* Warm Heritage Red / Emerald Glow Backdrop - Positioned directly behind & lower under the packet */}
          <div
            className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full pointer-events-none z-0 opacity-60 blur-[85px] sm:blur-[95px] transition-colors duration-1000 will-change-transform"
            style={{
              backgroundColor: isJhal ? "#B91C1C" : "#059669",
            }}
          />

          <div className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-[4/5] flex items-center justify-center z-10">
            {/* DOM-First LCP Image (Single, clean, crisp with Anti-Theft Shield) */}
            <div className="hero-pack-visual relative w-full h-full transform hover:scale-105 transition-transform duration-500 will-change-transform z-20 flex items-center justify-center select-none">
              <div
                className="img-shield"
                onContextMenu={(e) => e.preventDefault()}
                aria-hidden="true"
              />
              <Image
                src={isJhal ? "/10_rs_jhal_red_new.webp" : "/10_rs_misti_new.webp"}
                alt={`Taja Chanachur ${isJhal ? "Special Jhal" : "Tak Jhal Misti"} 50g Flagship Pack`}
                width={650}
                height={650}
                priority
                fetchPriority="high"
                draggable={false}
                sizes="(max-width: 768px) 300px, 380px"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)] animate-float protected-image-layer pointer-events-none select-none"
              />
            </div>

            {/* Floating Price & Authenticity Badge */}
            <div className="absolute bottom-2 right-2 sm:right-4 z-30 bg-cream-50/95 border border-gold/50 rounded-2xl px-4 py-2.5 backdrop-blur-md shadow-xl flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gold-dark font-bold">MRP ONLY</span>
                <span className="font-serif text-xl font-bold text-espresso-900 leading-none">₹10</span>
              </div>
              <div className="w-px h-7 bg-gold/40"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-espresso-muted">Pack Size</span>
                <span className="text-xs font-semibold text-espresso-900">50g Net Wt.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
