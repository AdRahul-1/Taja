"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { DIFFERENTIATORS } from "@/constants/bilingualCopy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  KadaiWokIcon,
  KadaiFlameIcon,
  KadaiLeafIcon,
  KadaiPackIcon,
  KadaiChaiIcon,
} from "@/components/icons/KadaiIcons";

// 5 Curated Core Points for Maximum Impact
const CURATED_POINTS = [
  {
    id: "precision-batches",
    titleEn: "Precision Crafted Batches",
    titleBn: "আধুনিক প্রযুক্তিতে, ঐতিহ্যের স্বাদ",
    descEn:
      "Where modern technology meets Taja tradition. Advanced machinery gives every batch precise roasting, even seasoning, and consistent crunch—so every pack delivers the same unmistakable Taja experience.",
    icon: "kadai",
    number: "01",
  },
  {
    id: "heritage-spices",
    titleEn: "Pure Heritage Spices",
    titleBn: "খাঁটি মশলার নিজস্ব ঐতিহ্য",
    descEn:
      "Whole roasted cumin, black rock salt, sun-dried Guntur chillies, and secret Bengal spice aromatics ground fresh in-house daily in Raniganj.",
    icon: "leaf",
    number: "02",
  },
  {
    id: "mustard-crispness",
    titleEn: "Mustard Oil Crispness",
    titleBn: "সরিষার তেলের খাস্তা স্বাদ",
    descEn:
      "Fried to a delicate golden crunch in pure edible oil, delivering the authentic pungent warmth beloved across Bengal's tea stalls.",
    icon: "flame",
    number: "03",
  },
  {
    id: "zero-trans-fat",
    titleEn: "Zero Trans-Fat Nitrogen Lock",
    titleBn: "এয়ারটাইট নাইট্রোজেন ফ্রেশনেস",
    descEn:
      "Packed immediately under food-grade nitrogen barrier foils to lock in crunch and aroma without artificial preservatives.",
    icon: "pack",
    number: "04",
  },
  {
    id: "evening-chai",
    titleEn: "The Evening Tea Ritual",
    titleBn: "সন্ধ্যার আড্ডার চিরন্তন সঙ্গী",
    descEn:
      "The undisputed centerpiece of Bengali adda. Perfectly paired with steaming clay cups of ginger tea and endless conversations.",
    icon: "chai",
    number: "05",
  },
];

export default function WhyTajaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointsTrackRef = useRef<HTMLDivElement>(null);
  const eveningRef = useRef<HTMLSpanElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !sectionRef.current || !pointsTrackRef.current) {
      return;
    }

    const section = sectionRef.current;
    const pointsTrack = pointsTrackRef.current;

    const mm = gsap.matchMedia(sectionRef);

    // 1. DESKTOP / LARGE TABLET VIEWPORT (>= 1024px): Luxury Pinned Master Timeline
    mm.add("(min-width: 1024px)", () => {
      // Header Line Mask Reveals
      const lines = gsap.utils.toArray<HTMLElement>(".why-line-reveal");
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

      // Precision Vertical Pin & Scroll from Point 01 in center to Point 05 in center
      const items = gsap.utils.toArray<HTMLElement>(".why-point-item");
      if (items.length > 0) {
        const firstItem = items[0];
        const lastItem = items[items.length - 1];

        // Returns the vertical center of an item relative to pointsTrack's untransformed origin
        const getItemRelativeCenter = (el: HTMLElement) => {
          const trackRect = pointsTrack.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          // Subtracting trackRect.top cancels out any active Y transform on pointsTrack
          return elRect.top - trackRect.top + el.offsetHeight / 2;
        };

        // Start position: Card 01 centered vertically in the right-side section container
        const getStartY = () => {
          const container = pointsTrack.parentElement;
          const containerHeight = container ? container.clientHeight : window.innerHeight;
          const card1Center = getItemRelativeCenter(firstItem);
          return containerHeight / 2 - card1Center;
        };

        // End position: Card 05 centered vertically in the right-side section container
        const getEndY = () => {
          const container = pointsTrack.parentElement;
          const containerHeight = container ? container.clientHeight : window.innerHeight;
          const card5Center = getItemRelativeCenter(lastItem);
          return containerHeight / 2 - card5Center;
        };

        // Scroll travel distance for comfortable reading and smooth unpinning
        const getScrollDistance = () => {
          return Math.max(Math.abs(getStartY() - getEndY()) * 1.25, 800);
        };

        // Initialize all SVG icon paths with strokeDashoffset
        items.forEach((item) => {
          const paths = item.querySelectorAll<SVGPathElement>(".kadai-icon-path");
          paths.forEach((path) => {
            if (typeof path.getTotalLength === "function") {
              const len = path.getTotalLength() || 100;
              gsap.set(path, { strokeDasharray: len + 1, strokeDashoffset: len + 1 });
            }
          });
        });

        // Master Timeline for Pinned Section & Individual SVG Drawing
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Move pointsTrack smoothly so Card 01 starts in center and Card 05 ends in center
        tl.fromTo(
          pointsTrack,
          { y: getStartY },
          {
            y: getEndY,
            ease: "none",
            duration: 5,
          },
          0
        );

        // Calculate card positions relative to total span so SVG paths draw right as each card arrives in center
        const totalSpan = getItemRelativeCenter(lastItem) - getItemRelativeCenter(firstItem);

        items.forEach((item, index) => {
          const paths = item.querySelectorAll<SVGPathElement>(".kadai-icon-path");
          const iconBox = item.querySelector<HTMLElement>(".why-icon-box");

          const itemRelative = getItemRelativeCenter(item) - getItemRelativeCenter(firstItem);
          const ratio = totalSpan > 0 ? Math.min(1, Math.max(0, itemRelative / totalSpan)) : index / 4;
          const startTime = ratio * 4.2;

          paths.forEach((path) => {
            tl.to(
              path,
              {
                strokeDashoffset: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              Math.max(0, startTime - 0.1)
            );
          });

          if (iconBox) {
            tl.fromTo(
              iconBox,
              { scale: 0.85, opacity: 0.5 },
              { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
              Math.max(0, startTime - 0.1)
            );
          }
        });
      }
    });

    // 2. MOBILE / NARROW VIEWPORT (< 1024px): Natural Smooth Vertical Scroll Flow
    mm.add("(max-width: 1023px)", () => {
      // Clear any fixed transforms for natural mobile scrolling
      gsap.set(pointsTrack, { clearProps: "all" });

      const items = gsap.utils.toArray<HTMLElement>(".why-point-item");
      items.forEach((item) => {
        const paths = item.querySelectorAll<SVGPathElement>(".kadai-icon-path");
        const iconBox = item.querySelector<HTMLElement>(".why-icon-box");

        paths.forEach((path) => {
          if (typeof path.getTotalLength === "function") {
            const len = path.getTotalLength();
            gsap.set(path, { strokeDasharray: len + 1, strokeDashoffset: len + 1 });
          }
        });

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        cardTl
          .fromTo(
            item,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          )
          .to(paths, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
          .fromTo(
            iconBox,
            { scale: 0.85, opacity: 0.5 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" },
            "-=0.4"
          );
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, [isReducedMotion]);

  const renderIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-gold-dark";
    switch (iconName) {
      case "kadai":
        return <KadaiWokIcon className={iconClass} />;
      case "leaf":
        return <KadaiLeafIcon className={iconClass} />;
      case "flame":
        return <KadaiFlameIcon className={iconClass} />;
      case "pack":
        return <KadaiPackIcon className={iconClass} />;
      case "chai":
      default:
        return <KadaiChaiIcon className={iconClass} />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-taja"
      className="relative bg-transparent text-espresso-900 min-h-screen lg:h-screen overflow-visible lg:overflow-hidden border-t border-gold/30 flex items-center py-20 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full h-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* 
          LEFT COLUMN (lg:col-span-5):
          Pinned Main Headline on Desktop, Natural Top Header on Mobile
        */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 self-start lg:self-center pr-0 lg:pr-4">
          <div className="overflow-hidden pb-1">
            <div className="why-line-reveal flex items-center gap-2 will-change-transform">
              <span className="w-2 h-2 rounded-full bg-gold-dark inline-block"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
                THE TAJA DIFFERENCE
              </span>
            </div>
          </div>

          <div className="overflow-hidden pb-3">
            <h2 className="why-line-reveal font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-espresso-900 leading-[1.12] pb-2 will-change-transform">
              Why Bengal <br />
              Reaches for <br />
              <span
                ref={eveningRef}
                className="text-heritageRed italic font-normal inline-block pt-1 pb-2"
              >
                Taja Every Evening.
              </span>
            </h2>
          </div>

          <div className="overflow-hidden pb-1">
            <p className="why-line-reveal font-bengaliDisplay text-espresso-700 text-lg sm:text-xl font-medium will-change-transform">
              কেন তাজা চানাচুর খাঁটি ও অনন্য?
            </p>
          </div>

          <div className="overflow-hidden pb-1">
            <p className="why-line-reveal text-sm sm:text-base text-espresso-800 leading-relaxed font-normal will-change-transform">
              Since 2009, R.R. Food Products has refused industrial shortcuts, preserving the
              sacred brass kadai flame roast and authentic Bengal spice blending.
            </p>
          </div>

          {/* Quality Credential */}
          <div className="pt-4 border-t border-gold/30 flex items-center justify-between text-xs text-espresso-muted">
            <span>FSSAI Certified • Lic. 12825023000187</span>
            <span className="font-serif text-gold-dark font-bold">Raniganj, WB</span>
          </div>
        </div>

        {/* 
          RIGHT COLUMN (lg:col-span-7):
          Flat Typography-Driven Points with Smooth Scroll on Desktop & Natural Stack on Mobile
        */}
        <div className="lg:col-span-7 h-auto lg:h-full flex flex-col justify-start overflow-visible lg:overflow-hidden relative mt-8 lg:mt-0">
          <div
            ref={pointsTrackRef}
            className="relative w-full space-y-12 sm:space-y-16 lg:space-y-20 will-change-transform"
          >
            {CURATED_POINTS.map((point) => (
              <div
                key={point.id}
                className="why-point-item group flex items-start gap-5 sm:gap-8 pb-8 sm:pb-12 border-b border-gold/30 last:border-0"
              >
                {/* Number Callout */}
                <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-dark/60 group-hover:text-gold-dark transition-colors shrink-0 w-8 pt-1">
                  {point.number}
                </div>

                {/* Animated Gold Linework Icon with Individual SVG Drawing */}
                <div className="why-icon-box w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-cream-200/90 border border-gold/40 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-gold/20 group-hover:border-gold-dark transition-all duration-300">
                  {renderIcon(point.icon)}
                </div>

                {/* Flat Typography Content */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-espresso-900 group-hover:text-gold-dark transition-colors">
                      {point.titleEn}
                    </h3>
                    <span className="font-bengaliDisplay text-xs sm:text-sm text-heritageRed font-semibold">
                      {point.titleBn}
                    </span>
                  </div>
                  <p className="text-xs sm:text-base text-espresso-800 leading-relaxed font-normal">
                    {point.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
