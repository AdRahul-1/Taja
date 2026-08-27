"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, GSAP_TIMING } from "@/lib/gsapConfig";
import { STORY_COPY } from "@/constants/bilingualCopy";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const fssaiRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Line mask-reveals on scroll for header and narrative paragraphs
      // Stays visible on downward scroll; only resets when scrolled back up above the section
      const lines = gsap.utils.toArray<HTMLElement>(".story-line-reveal");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 2. Maker Quote Box Bottom-to-Top Fade Up Reveal
      gsap.fromTo(
        ".story-quote-card",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-quote-card",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Live Animated Stat Counters on Scroll
      const animateStats = () => {
        if (yearsRef.current) {
          const yearsObj = { val: 0 };
          yearsRef.current.textContent = "0+";
          gsap.to(yearsObj, {
            val: 15,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              if (yearsRef.current) {
                yearsRef.current.textContent = `${Math.floor(yearsObj.val)}+`;
              }
            },
          });
        }

        if (percentRef.current) {
          const percentObj = { val: 0 };
          percentRef.current.textContent = "0%";
          gsap.to(percentObj, {
            val: 100,
            duration: 2.0,
            ease: "power2.out",
            onUpdate: () => {
              if (percentRef.current) {
                percentRef.current.textContent = `${Math.floor(percentObj.val)}%`;
              }
            },
          });
        }

        if (fssaiRef.current) {
          gsap.fromTo(
            fssaiRef.current,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: "power3.out",
            }
          );
        }
      };

      // ScrollTrigger: plays on downward scroll into view, only resets when scrolled completely back up
      gsap.timeline({
        scrollTrigger: {
          trigger: ".stat-counter-trigger",
          start: "top 88%",
          onEnter: animateStats,
          onLeaveBack: () => {
            if (yearsRef.current) yearsRef.current.textContent = "0+";
            if (percentRef.current) percentRef.current.textContent = "0%";
            if (fssaiRef.current) gsap.set(fssaiRef.current, { y: 35, opacity: 0 });
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative bg-transparent text-espresso-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-gold/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with ScrollTrigger Bottom-to-Top Reveal on every scroll in/out */}
        <div className="flex flex-col items-start mb-16 max-w-3xl">
          <div className="story-line-reveal flex items-center gap-3 mb-3 will-change-transform">
            <span className="w-8 h-px bg-gold-dark"></span>
            <span className="font-bengaliDisplay text-sm text-heritageRed font-semibold tracking-wide">
              {STORY_COPY.eyebrowBn}
            </span>
            <span className="text-xs uppercase tracking-widest text-espresso-700 font-bold">
              • {STORY_COPY.eyebrowEn}
            </span>
          </div>

          <div className="overflow-hidden pb-3">
            <h2 className="story-line-reveal font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-espresso-900 leading-[1.12] pb-2 will-change-transform">
              Hand-Blended in <br />
              <span className="text-heritageRed italic font-normal inline-block pt-1 pb-1">Small Kadai Batches.</span>
            </h2>
          </div>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Long-form narrative housed inside an Inset Warm Cream Paper Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl bg-cream-50/95 text-espresso-900 border border-gold/40 p-8 sm:p-10 shadow-xl space-y-8 backdrop-blur-sm">
              {STORY_COPY.lines.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-5 border-l-2 border-gold/60 hover:border-gold-dark transition-colors overflow-hidden"
                >
                  <div className="story-line-reveal will-change-transform">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-dark mb-1 block">
                      0{index + 1} — {item.title}
                    </span>
                    <p className="text-sm sm:text-base text-espresso-800 leading-relaxed font-normal">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Maker Quote Inset Paper Box with Bottom-to-Top Fade Up Reveal on every Scroll in/out */}
            <div className="story-quote-card p-6 sm:p-7 rounded-2xl bg-cream-200/70 text-espresso-900 border border-gold/40 shadow-md will-change-transform space-y-3">
              <p className="font-serif text-base sm:text-lg italic text-espresso-900 leading-snug">
                “R.R. Food Products is the manufacturer of Taja Chanachur, serving customers across Bengal and Eastern India with authentic small-batch brass kadai recipes since 2009.”
              </p>
              <div className="pt-3 border-t border-gold/30 flex items-center justify-between text-xs text-espresso-muted">
                <span className="font-bold tracking-wider uppercase text-espresso-900">
                  R.R. FOOD PRODUCTS • TAJA CHANACHUR
                </span>
                <span className="font-serif text-gold-dark font-bold">Raniganj, WB (Est. 2009)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Documentary Photography Visual with Parallax & Hover Zoom */}
          <div
            data-scroll
            data-scroll-speed="1.08"
            className="lg:col-span-6 flex flex-col items-center will-change-transform"
          >
            {/* Visual Photo Card with Anti-Copy Shield and Smooth Hover Zoom */}
            <div className="group relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 bg-espresso-900 select-none cursor-pointer transition-all duration-500 hover:shadow-gold/20 hover:border-gold">
              {/* Invisible anti-theft overlay shield */}
              <div
                className="img-shield"
                onContextMenu={(e) => e.preventDefault()}
                aria-hidden="true"
              />

              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/artisan_kadai.jpg"
                  alt="Artisan hand-blending authentic Bengali chanachur in a traditional brass kadai wok over glowing fire embers"
                  fill
                  draggable={false}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="kadai-photo-img object-cover will-change-transform protected-image-layer pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Photo Caption */}
              <div className="p-5 bg-navy-950 text-cream-50 border-t border-gold/30 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-gold group-hover:text-gold-light transition-colors">
                    The Raniganj Kadai Tradition
                  </h4>
                  <p className="text-xs text-cream-100/70 mt-0.5">
                    Authentic small-batch flame roasting & hand-tossing.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full border border-gold/40 text-[10px] uppercase font-bold tracking-widest text-gold group-hover:bg-gold/10 transition-colors">
                  SINCE 2009
                </div>
              </div>
            </div>

            {/* Editorial Asymmetric Stat Row with Live GSAP Animated Counters on every scroll in/out */}
            <div className="stat-counter-trigger mt-8 grid grid-cols-12 gap-6 w-full items-end pt-2">
              {/* Stat 1: 15+ Years (Increasing counter animation on every scroll) */}
              <div className="col-span-4 flex flex-col justify-end">
                <span
                  ref={yearsRef}
                  className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold text-heritageRed tracking-tight leading-none"
                >
                  15+
                </span>
                <div className="w-full h-px bg-gold/40 my-2" />
                <span className="text-[11px] sm:text-xs font-semibold text-espresso-muted uppercase tracking-wider">
                  Years of Craft
                </span>
              </div>

              {/* Stat 2: 100% Kadai Roasted (Increasing counter animation on every scroll) */}
              <div className="col-span-4 flex flex-col justify-end">
                <span
                  ref={percentRef}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gold-dark tracking-tight leading-none"
                >
                  100%
                </span>
                <div className="w-full h-px bg-gold-dark my-2" />
                <span className="text-[11px] sm:text-xs font-bold text-espresso-900 uppercase tracking-wider">
                  Kadai Flame Roast
                </span>
              </div>

              {/* Stat 3: FSSAI (Fade in from bottom to top on every scroll) */}
              <div ref={fssaiRef} className="col-span-4 flex flex-col justify-end will-change-transform">
                <span className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold text-navy-900 tracking-tight leading-none">
                  FSSAI
                </span>
                <div className="w-full h-px bg-gold/40 my-2" />
                <span className="text-[11px] sm:text-xs font-semibold text-espresso-muted uppercase tracking-wider">
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
