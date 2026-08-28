"use client";

import React, { useState, useEffect, useRef } from "react";
import { INGREDIENTS } from "@/constants/bilingualCopy";
import { trackEvent } from "@/lib/analytics";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight, MoveHorizontal } from "lucide-react";

export default function IngredientsSection() {
  const [activeIngredient, setActiveIngredient] = useState(INGREDIENTS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const handleSelect = (ing: typeof INGREDIENTS[0]) => {
    setActiveIngredient(ing);
    trackEvent({
      name: "ingredient_inspected",
      payload: { id: ing.id, name: ing.nameEn },
    });
  };

  useEffect(() => {
    if (
      isReducedMotion ||
      typeof window === "undefined" ||
      !sectionRef.current ||
      !cardsWrapperRef.current ||
      !trackRef.current
    ) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;

    const mm = gsap.matchMedia(sectionRef);

    // 1. DESKTOP / TABLET VIEWPORT (>= 768px): Horizontal Pinned Scroll
    mm.add("(min-width: 768px)", () => {
      // Header reveals
      const lines = gsap.utils.toArray<HTMLElement>(".ing-line-reveal");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const cards = gsap.utils.toArray<HTMLElement>(".ing-card-item", track);
      if (cards.length > 0) {
        const firstCard = cards[0];
        const lastCard = cards[cards.length - 1];

        // Card 1 (01 — Roasted Bengal Peanuts) starts centered in the screen
        const getStartX = () => {
          const card1Center = firstCard.offsetLeft + firstCard.offsetWidth / 2;
          return window.innerWidth / 2 - card1Center;
        };

        // Last card (09 — Raisins & Roasted Cashews) finishes at the right side of the viewport + 50% card width margin
        const getEndX = () => {
          const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
          const rightMargin = lastCard.offsetWidth * 0.5;
          return window.innerWidth - lastCardRight - rightMargin;
        };

        // Pinning scroll distance directly proportional to the actual horizontal travel
        const getScrollDistance = () => {
          const totalTravel = Math.abs(getStartX() - getEndX());
          return Math.max(window.innerHeight * 1.8, totalTravel * 1.05);
        };

        gsap.fromTo(
          track,
          { x: getStartX },
          {
            x: getEndX,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: () => {
                const currentX = gsap.getProperty(track, "x") as number;
                const screenCenter = window.innerWidth / 2;
                let closestIndex = 0;
                let minDiff = Infinity;
                cards.forEach((card, i) => {
                  const cardCenter = card.offsetLeft + card.offsetWidth / 2 + currentX;
                  const diff = Math.abs(cardCenter - screenCenter);
                  if (diff < minDiff) {
                    minDiff = diff;
                    closestIndex = i;
                  }
                });
                if (INGREDIENTS[closestIndex]) {
                  setActiveIngredient(INGREDIENTS[closestIndex]);
                }
              },
            },
          }
        );
      }
    });

    // 2. MOBILE VIEWPORT (< 768px): Natural Horizontal Swipeable Carousel
    mm.add("(max-width: 767px)", () => {
      gsap.set(track, { clearProps: "all" });

      const lines = gsap.utils.toArray<HTMLElement>(".ing-line-reveal");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="relative bg-transparent text-espresso-900 min-h-screen md:h-screen pt-20 sm:pt-24 pb-8 overflow-visible md:overflow-hidden border-t border-gold/30 flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="overflow-hidden">
              <div className="ing-line-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-2 will-change-transform">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark inline-block"></span>
                <span>HONEST INGREDIENTS</span>
              </div>
            </div>

            <div className="overflow-hidden pb-3">
              <h2 className="ing-line-reveal font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-espresso-900 leading-[1.12] pb-2 will-change-transform">
                The Secrets of the <br className="hidden sm:inline" />
                <span className="text-heritageRed italic font-normal inline-block pt-1 pb-1">Perfect Handful.</span>
              </h2>
            </div>

            <div className="overflow-hidden">
              <p className="ing-line-reveal font-bengaliDisplay text-espresso-700 text-sm sm:text-base mt-0.5 font-medium will-change-transform">
                খাঁটি উপাদানের নিখুঁত মেলবন্ধন
              </p>
            </div>
          </div>

          {/* Desktop Prompt */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-espresso-800 bg-cream-200/90 px-4 py-2 rounded-full border border-gold/40 shadow-sm backdrop-blur-sm">
            <span>Scroll to Explore Handful</span>
            <ArrowRight className="w-3.5 h-3.5 animate-pulse text-heritageRed" />
          </div>

          {/* Mobile Swipe Prompt */}
          <div className="flex md:hidden items-center gap-2 text-xs font-bold text-espresso-800 bg-cream-200/80 px-3 py-1.5 rounded-full border border-gold/30 w-fit">
            <MoveHorizontal className="w-3.5 h-3.5 text-heritageRed" />
            <span>Swipe Horizontally</span>
          </div>
        </div>
      </div>

      {/* 
        Cards Container:
        Horizontal scroll on desktop, native touch swipe on mobile
      */}
      <div
        ref={cardsWrapperRef}
        className="w-full relative flex-1 flex items-center overflow-x-auto md:overflow-hidden py-4 md:py-2 z-10 will-change-transform no-scrollbar"
      >
        <div
          ref={trackRef}
          className="relative w-max flex items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-12 will-change-transform select-none"
        >
          {INGREDIENTS.map((item, index) => {
            const isSelected = activeIngredient.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`ing-card-item group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] min-h-[300px] sm:min-h-[320px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer border transition-all duration-500 relative overflow-hidden backdrop-blur-md select-none ${
                  isSelected
                    ? "bg-cream-50 border-gold-dark shadow-2xl scale-102 ring-2 ring-gold-dark"
                    : "bg-gradient-to-b from-cream-50/98 via-cream-100/90 to-cream-200/75 border-gold/50 hover:border-gold-dark hover:shadow-2xl hover:translate-y-[-4px]"
                }`}
              >
                {/* Large Subtle Editorial Watermark Number in background */}
                <span className="absolute -bottom-6 -right-3 font-serif text-8xl sm:text-9xl font-black text-gold/10 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105 group-hover:text-gold/15">
                  0{index + 1}
                </span>

                {/* Top Row: Index Badge + Category Tag */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200/90 border border-gold/40 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-dark inline-block" />
                    <span className="font-serif text-xs font-bold text-gold-dark tracking-widest">
                      0{index + 1}
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-heritageRed/10 border border-heritageRed/30 text-heritageRed text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Middle Content: Eye-catching Bold Editorial Typography */}
                <div className="my-auto py-4 relative z-10">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 leading-[1.15] mb-1.5 group-hover:text-gold-dark transition-colors">
                    {item.nameEn}
                  </h3>
                  <p className="font-bengaliDisplay text-lg sm:text-xl font-bold text-heritageRed mb-3 tracking-wide">
                    {item.nameBn}
                  </p>
                  <p className="text-sm sm:text-base text-espresso-800 leading-relaxed font-normal">
                    {item.notesEn}
                  </p>
                </div>

                {/* Bottom Row: Accent Subtitle Line */}
                <div className="pt-3 border-t border-gold/30 flex items-center justify-between text-xs relative z-10">
                  <span className="font-bold text-gold-dark uppercase tracking-wider">
                    {item.subtitleEn}
                  </span>
                  <span className="font-bengaliDisplay text-espresso-700 font-semibold">
                    {item.subtitleBn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
