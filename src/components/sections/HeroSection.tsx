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
      // 1. Hero pack settle-in (1.2s, power3.out)
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

      // 2. Looping ambient steam wisps drift (independent of scroll)
      gsap.to(".steam-wisp", {
        y: -40,
        opacity: 0,
        duration: 4,
        repeat: -1,
        ease: "sine.inOut",
        stagger: { each: 1.3, repeat: -1 },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isReducedMotion, activeFlavor]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen bg-navy-900 overflow-hidden flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-12 text-cream-50"
    >
      {/* 
        Single off-center, heavily-blurred radial glow with NO visible edge 
        (Only 1 blurred glow layer rendering in the hero viewport to maintain 60fps)
      */}
      <div
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[420px] h-[420px] lg:w-[540px] lg:h-[540px] rounded-full pointer-events-none -z-0 opacity-35 blur-[85px] transition-colors duration-1000"
        style={{
          backgroundColor: isJhal ? "#B91C1C" : "#C9982E",
        }}
      />

      {/* Decorative Kadai Hairline Watermark in background */}
      <div className="absolute right-4 bottom-0 pointer-events-none opacity-[0.035] select-none -z-0">
        <span className="font-serif text-[28vw] font-black text-gold leading-none tracking-tighter">
          TAJA
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto relative z-20">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          {/* Bilingual Eyebrow (No generic Sparkles icon — clean gold dot) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block"></span>
              <span>ESTD. 2009 • RANIGANJ</span>
            </span>
            <span className="font-bengaliDisplay text-sm text-gold/90 font-medium">
              {HERO_COPY.eyebrowBn}
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-cream-50 leading-[1.08]">
            Your evening <br className="hidden sm:inline" />
            <span className="text-gold italic font-normal">ritual,</span> since 2009.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-cream-100/85 max-w-xl leading-relaxed font-normal">
            Hand-blended in small brass <span className="text-gold font-medium">kadai</span> batches in
            Raniganj, West Bengal. Golden sev ribbons, slow-roasted Bengal peanuts, and aromatic stone-ground
            spices crafted for the authentic connoisseur of evening tea.
          </p>

          {/* Interactive Flavor Variant Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
            <span className="text-xs uppercase tracking-widest text-gold/80 font-semibold">
              Select Signature Blend:
            </span>
            <div className="inline-flex p-1 rounded-full bg-navy-950/80 border border-gold/30 backdrop-blur-sm shadow-inner">
              <button
                type="button"
                onClick={() => handleFlavorToggle("jhal")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  isJhal
                    ? "bg-heritageRed text-cream-50 shadow-md shadow-heritageRed/30"
                    : "text-cream-50/70 hover:text-cream-50"
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
                    : "text-cream-50/70 hover:text-cream-50"
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
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-heritageRed hover:bg-heritageRed-hover text-cream-50 font-semibold text-sm tracking-wider uppercase transition-all transform hover:translate-y-[-2px] shadow-lg shadow-heritageRed/30 group"
            >
              <span>{HERO_COPY.ctaPrimary}</span>
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
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-gold/40 text-gold hover:text-cream-50 hover:bg-gold/15 font-semibold text-xs tracking-wider uppercase transition-all"
            >
              <span>{HERO_COPY.ctaSecondary}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quality Credentials Micro Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-cream-100/70 border-t border-gold/20 w-full">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>FSSAI Certified • Lic. 12821013000000</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>100% Vegetarian</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>Zero Trans-Fat Nitrogen Pack</span>
            </div>
          </div>
        </div>

        {/* Right Column: DOM-First LCP Pack Visual with Steam Wisps (No hard ring borders) */}
        <div className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0">
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {/* Translucent Steam Wisps (Subtle atmospheric motion) */}
            <div className="absolute -top-12 left-1/3 w-32 h-32 pointer-events-none z-30 opacity-40">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path
                  className="steam-wisp"
                  d="M30 80C35 60 25 40 32 20"
                  stroke="rgba(251, 243, 231, 0.45)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="steam-wisp"
                  d="M50 85C56 65 44 45 52 25"
                  stroke="rgba(201, 152, 46, 0.35)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className="steam-wisp"
                  d="M68 80C72 62 62 42 70 22"
                  stroke="rgba(251, 243, 231, 0.4)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* DOM-First LCP Image (Immediate High Priority Render) */}
            <div className="hero-pack-visual relative w-full h-full transform hover:scale-105 transition-transform duration-500 will-change-transform z-20 flex items-center justify-center">
              <Image
                src={isJhal ? "/10_rs_jhal_red_new.webp" : "/10_rs_misti_new.webp"}
                alt={`Taja Chanachur ${isJhal ? "Special Jhal" : "Tak Jhal Misti"} 50g Flagship Pack`}
                width={700}
                height={700}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 320px, (max-width: 1200px) 400px, 500px"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.6)] animate-float"
              />
            </div>

            {/* Floating Price & Authenticity Badge */}
            <div className="absolute bottom-4 right-2 sm:right-4 z-30 bg-navy-950/90 border border-gold/50 rounded-2xl px-4 py-2.5 backdrop-blur-md shadow-xl flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gold font-bold">MRP ONLY</span>
                <span className="font-serif text-xl font-bold text-cream-50 leading-none">₹10</span>
              </div>
              <div className="w-px h-7 bg-gold/30"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-cream-50/70">Pack Size</span>
                <span className="text-xs font-semibold text-cream-50">50g Net Wt.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
