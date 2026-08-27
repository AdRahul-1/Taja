"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, GSAP_TIMING } from "@/lib/gsapConfig";
import { STORY_COPY } from "@/constants/bilingualCopy";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Line mask-reveals on scroll (0.8s, brandEase)
      const lines = gsap.utils.toArray<HTMLElement>(".story-line-reveal");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: GSAP_TIMING.section.duration,
            ease: GSAP_TIMING.section.ease,
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 2. Slow Ken Burns drift on the kadai maker photo (scrubbed to scroll)
      gsap.to(".kadai-photo-img", {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: "#story",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative bg-cream-50 text-espresso-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-gold/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Line Masks */}
        <div className="flex flex-col items-start mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-gold"></span>
            <span className="font-bengaliDisplay text-sm text-gold-dark font-medium tracking-wide">
              {STORY_COPY.eyebrowBn}
            </span>
            <span className="text-xs uppercase tracking-widest text-espresso-muted font-bold">
              • {STORY_COPY.eyebrowEn}
            </span>
          </div>

          <div className="overflow-hidden">
            <h2 className="story-line-reveal font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-espresso-900 leading-[1.12]">
              Hand-Blended in <br />
              <span className="text-gold-dark italic font-normal">Small Kadai Batches.</span>
            </h2>
          </div>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Stacked Story Narrative Sequence with Mask Reveals */}
          <div className="lg:col-span-6 space-y-10">
            {STORY_COPY.lines.map((item, index) => (
              <div
                key={index}
                className="relative pl-6 border-l-2 border-gold/40 hover:border-gold transition-colors overflow-hidden"
              >
                <div className="story-line-reveal">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-dark mb-1 block">
                    0{index + 1} — {item.title}
                  </span>
                  <p className="text-base sm:text-lg text-espresso-800 leading-relaxed font-normal">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}

            {/* Maker Quote Box */}
            <div className="overflow-hidden p-6 rounded-2xl bg-cream-100 border border-gold/40 shadow-sm mt-8">
              <div className="story-line-reveal">
                <p className="font-serif text-lg italic text-espresso-900 leading-snug">
                  “In Bengal, chanachur isn’t just an afternoon snack—it is the heartbeat of every adda,
                  the crisp punctuation to a cup of warm tea.”
                </p>
                <div className="mt-4 pt-3 border-t border-gold/30 flex items-center justify-between text-xs text-espresso-muted">
                  <span className="font-bold tracking-wider uppercase text-espresso-900">
                    R.R. FOOD PRODUCTS
                  </span>
                  <span>Raniganj, West Bengal (Est. 2009)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Documentary Photography Visual with Slow Ken Burns */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/30 bg-espresso-900">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/artisan_kadai.jpg"
                  alt="Artisan hand-blending authentic Bengali chanachur in a traditional brass kadai wok over glowing fire embers"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="kadai-photo-img object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Photo Caption */}
              <div className="p-5 bg-navy-950 text-cream-50 border-t border-gold/30 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-gold">
                    The Raniganj Kadai Tradition
                  </h4>
                  <p className="text-xs text-cream-100/70 mt-0.5">
                    Authentic small-batch flame roasting & hand-tossing.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full border border-gold/40 text-[10px] uppercase font-bold tracking-widest text-gold">
                  SINCE 2009
                </div>
              </div>
            </div>

            {/* Subordinate Trust Credentials */}
            <div className="mt-6 grid grid-cols-3 gap-4 w-full text-center">
              <div className="p-3 rounded-xl bg-cream-100/80 border border-gold/20">
                <span className="font-serif text-2xl font-bold text-heritageRed block">15+</span>
                <span className="text-[11px] font-semibold text-espresso-muted uppercase tracking-wider">
                  Years of Craft
                </span>
              </div>
              <div className="p-3 rounded-xl bg-cream-100/80 border border-gold/20">
                <span className="font-serif text-2xl font-bold text-gold-dark block">100%</span>
                <span className="text-[11px] font-semibold text-espresso-muted uppercase tracking-wider">
                  Kadai Roasted
                </span>
              </div>
              <div className="p-3 rounded-xl bg-cream-100/80 border border-gold/20">
                <span className="font-serif text-2xl font-bold text-navy-900 block">FSSAI</span>
                <span className="text-[11px] font-semibold text-espresso-muted uppercase tracking-wider">
                  Quality Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
