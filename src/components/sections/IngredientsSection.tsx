"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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

      const cards = track.querySelectorAll<HTMLElement>(".ing-card-item");
      if (cards.length > 0) {
        const firstCard = cards[0];
        const lastCard = cards[cards.length - 1];

        const getStartX = () => {
          const card1Center = firstCard.offsetLeft + firstCard.offsetWidth / 2;
          return window.innerWidth / 2 - card1Center;
        };

        const getEndX = () => {
          const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
          const rightMargin = Math.max(90, lastCard.offsetWidth * 0.30);
          return window.innerWidth - lastCardRight - rightMargin;
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
              end: () => `+=${Math.max(window.innerHeight * 1.6, Math.abs(getStartX() - getEndX()) + 350)}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
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
          className="flex items-center gap-4 sm:gap-6 md:gap-8 px-4 will-change-transform select-none"
        >
          {INGREDIENTS.map((item, index) => {
            const isSelected = activeIngredient.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`ing-card-item group flex-shrink-0 w-[260px] sm:w-[300px] md:w-[360px] h-[360px] sm:h-[390px] md:h-[410px] rounded-3xl flex flex-col justify-between cursor-pointer border transition-all duration-300 relative overflow-hidden backdrop-blur-sm select-none ${
                  isSelected
                    ? "bg-cream-50/98 border-gold-dark shadow-2xl scale-102 ring-2 ring-gold-dark"
                    : "bg-cream-50/95 border-gold/40 hover:border-gold-dark hover:shadow-2xl hover:translate-y-[-4px]"
                }`}
              >
                {/* Invisible anti-theft copy protection shield */}
                <div
                  className="img-shield"
                  onContextMenu={(e) => e.preventDefault()}
                  aria-hidden="true"
                />

                {/* Full-Card Top Visual Banner with Smooth Hover Zoom Effect */}
                <div className="relative w-full h-[52%] overflow-hidden bg-espresso-950 select-none">
                  <Image
                    src={item.image}
                    alt={`${item.nameEn} - Bengali Chanachur Authentic Ingredient`}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 360px"
                    draggable={false}
                    className="object-cover w-full h-full transform group-hover:scale-115 transition-transform duration-700 ease-out pointer-events-none select-none"
                  />
                  {/* Subtle Gradient Shadow for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Floating Badge & Index */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full bg-navy-950/85 backdrop-blur-sm text-gold font-serif text-xs font-bold tracking-widest border border-gold/40 shadow-sm">
                      0{index + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cream-100/90 backdrop-blur-sm text-espresso-900 text-[10px] sm:text-[11px] font-bold border border-gold/40 shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Bottom Content: English + Bengali Typography */}
                <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-1 border-t border-gold/30 bg-cream-50/95 relative z-20">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-espresso-900 leading-snug group-hover:text-gold-dark transition-colors">
                        {item.nameEn}
                      </h3>
                      <span className="font-bengaliDisplay text-xs font-bold text-heritageRed ml-2 shrink-0">
                        {item.nameBn}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-espresso-800 line-clamp-2 leading-relaxed font-normal">
                      {item.notesEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gold/20 flex items-center justify-between text-[10px] sm:text-[11px] text-espresso-muted">
                    <span className="font-semibold text-gold-dark uppercase tracking-wider">
                      {item.subtitleEn}
                    </span>
                    <span className="font-bengaliDisplay text-espresso-600">
                      {item.subtitleBn}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
