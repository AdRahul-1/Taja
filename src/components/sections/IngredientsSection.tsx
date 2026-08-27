"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { INGREDIENTS } from "@/constants/bilingualCopy";
import { trackEvent } from "@/lib/analytics";
import { gsap, GSAP_TIMING } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Info } from "lucide-react";

export default function IngredientsSection() {
  const [activeIngredient, setActiveIngredient] = useState(INGREDIENTS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();

  const handleSelect = (ing: typeof INGREDIENTS[0]) => {
    setActiveIngredient(ing);
    trackEvent({
      name: "ingredient_inspected",
      payload: { id: ing.id, name: ing.nameEn },
    });
  };

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Cards settle with slight random rotation (-2.5 to 2.5 deg) staggered (0.8s, brandEase)
      gsap.fromTo(
        ".ingredient-card",
        {
          y: 20,
          rotate: () => gsap.utils.random(-2.5, 2.5),
          opacity: 0,
        },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: GSAP_TIMING.section.duration,
          ease: GSAP_TIMING.section.ease,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".ingredients-grid",
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="relative bg-cream-50 text-espresso-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-gold/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header (No Sparkles icon — clean gold dot) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-200/70 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark inline-block"></span>
            <span>HONEST INGREDIENTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-espresso-900 leading-tight">
            The Secrets of the <br />
            <span className="text-gold-dark italic font-normal">Perfect Handful.</span>
          </h2>
          <p className="font-bengaliDisplay text-espresso-700 text-lg sm:text-xl mt-3 font-medium">
            খাঁটি উপাদানের নিখুঁত মেলবন্ধন
          </p>
        </div>

        {/* 6-Ingredient Showcase Grid */}
        <div className="ingredients-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {INGREDIENTS.map((ing) => {
            const isSelected = activeIngredient.id === ing.id;
            return (
              <div
                key={ing.id}
                onClick={() => handleSelect(ing)}
                className={`ingredient-card group cursor-pointer rounded-2xl p-5 transition-all duration-300 border opacity-100 ${
                  isSelected
                    ? "bg-cream-100 border-gold shadow-lg shadow-gold/15 translate-y-[-4px]"
                    : "bg-cream-50/70 border-gold/30 hover:border-gold hover:bg-cream-100 hover:shadow-md"
                }`}
              >
                {/* Visual Macro Card */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 border border-gold/30 bg-espresso-900">
                  <Image
                    src={ing.image}
                    alt={`${ing.nameEn} - Authentic ingredient in Taja Chanachur`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-950/85 border border-gold/40 text-gold text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
                    {ing.tag}
                  </div>
                </div>

                {/* Bilingual Titles */}
                <div className="space-y-1">
                  <span className="font-bengaliDisplay text-base text-gold-dark font-semibold block leading-tight">
                    {ing.nameBn}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-espresso-900 group-hover:text-gold-dark transition-colors">
                    {ing.nameEn}
                  </h3>
                  <p className="text-xs text-espresso-muted font-medium">
                    {ing.subtitleEn} • <span className="font-bengaliDisplay">{ing.subtitleBn}</span>
                  </p>
                </div>

                {/* Tasting Notes */}
                <p className="text-xs sm:text-sm text-espresso-800 mt-3 leading-relaxed border-t border-gold/20 pt-3">
                  {ing.notesEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sensory Quality Statement Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-navy-900 text-cream-50 border border-gold/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-full bg-gold/20 text-gold border border-gold/40 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-gold">
                No Artificial Additives or Adulterants
              </h4>
              <p className="text-xs sm:text-sm text-cream-100/80 mt-1 max-w-2xl">
                Every ingredient is sourced from verified regional farmers, cleaned, and quality-tested
                before reaching our Raniganj roasting kadais.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="px-4 py-2 rounded-full border border-gold/50 text-gold text-xs font-bold uppercase tracking-widest">
              100% PURE & CRISP
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
