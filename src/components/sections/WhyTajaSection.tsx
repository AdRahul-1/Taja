"use client";

import React, { useEffect, useRef } from "react";
import { gsap, GSAP_TIMING } from "@/lib/gsapConfig";
import { DIFFERENTIATORS } from "@/constants/bilingualCopy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  KadaiWokIcon,
  KadaiHandIcon,
  KadaiFlameIcon,
  KadaiLeafIcon,
  KadaiPackIcon,
  KadaiChaiIcon,
} from "@/components/icons/KadaiIcons";

export default function WhyTajaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Staggered card entrance (0.8s, brandEase)
      gsap.fromTo(
        ".why-item-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: GSAP_TIMING.section.duration,
          ease: GSAP_TIMING.section.ease,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".why-grid",
            start: "top 85%",
            once: true,
          },
        }
      );

      // 2. Custom SVG Icon stroke self-drawing as each card enters viewport
      const cards = gsap.utils.toArray<HTMLElement>(".why-item-card");
      cards.forEach((card) => {
        const paths = card.querySelectorAll<SVGPathElement>(".kadai-icon-path");
        paths.forEach((path) => {
          if (typeof path.getTotalLength === "function") {
            const len = path.getTotalLength();
            gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: GSAP_TIMING.section.duration,
              ease: GSAP_TIMING.section.ease,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const renderKadaiIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-gold transition-transform group-hover:scale-110";
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
        return <KadaiChaiIcon className={iconClass} />;
      case "hand":
      default:
        return <KadaiHandIcon className={iconClass} />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-taja"
      className="relative bg-navy-900 text-cream-50 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-gold/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block"></span>
            <span>THE TAJA DIFFERENCE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Why Bengal Reaches for <br />
            <span className="text-gold italic font-normal">Taja Every Evening.</span>
          </h2>
          <p className="font-bengaliDisplay text-gold/90 text-lg sm:text-xl mt-3 font-medium">
            কেন তাজা চানাচুর খাঁটি ও অনন্য?
          </p>
        </div>

        {/* 6-Item Editorial Grid with Hairline Gold Separators */}
        <div className="why-grid grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 relative">
          {DIFFERENTIATORS.map((diff, index) => (
            <div
              key={diff.id}
              className="why-item-card group flex flex-col items-start relative pt-6 border-t border-gold/30 hover:border-gold transition-all duration-300 opacity-100"
            >
              {/* Custom SVG Icon Container */}
              <div className="flex items-center justify-between w-full mb-4">
                <div className="p-2.5 rounded-xl bg-navy-950 border border-gold/30 shadow-inner group-hover:border-gold transition-colors">
                  {renderKadaiIcon(diff.iconName)}
                </div>
                <span className="text-xs font-bold text-gold/50 font-serif tracking-widest">
                  0{index + 1}
                </span>
              </div>

              {/* Bilingual Titles */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-50 group-hover:text-gold transition-colors mb-1">
                {diff.titleEn}
              </h3>
              <h4 className="font-bengaliDisplay text-sm text-gold/90 font-medium mb-3">
                {diff.titleBn}
              </h4>

              {/* Description */}
              <p className="text-sm text-cream-100/75 leading-relaxed font-normal">
                {diff.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner Accent */}
        <div className="mt-20 pt-8 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-100/60 text-center sm:text-left">
          <span>R.R. Food Products • Traditional Food Safety & Hygiene Standards</span>
          <span className="font-bengaliDisplay text-gold text-sm font-medium">
            প্রতিটি দানা মুচমুচে ও সতেজ
          </span>
        </div>
      </div>
    </section>
  );
}
