"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#FDF9F2] flex flex-col items-center justify-center px-4 select-none">
      {/* Fixed Full-Viewport Warm Bengali Heritage Parchment Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FDF9F2] via-[#FAF3E7] to-[#F4EADA]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm text-center space-y-6">
        {/* Animated Brass Kadai Wok & Flame Icon with Rising Steam */}
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Pulsing Gold Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping opacity-30" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-heritageRed border-r-gold animate-spin duration-1000" />
          
          <div className="w-16 h-16 rounded-2xl bg-cream-200/90 border border-gold/50 shadow-md flex items-center justify-center">
            <svg
              className="w-9 h-9 text-gold-dark"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Kadai Wok Outline */}
              <path d="M3 13c1 5 4.5 7 9 7s8-2 9-7H3z" className="text-espresso-900" />
              {/* Brass Handles */}
              <path d="M3 13c-1.5 0-2.5-.8-2.5-2s1-2 2.5-2" />
              <path d="M21 13c1.5 0 2.5-.8 2.5-2s-1-2-2.5-2" />
              {/* Rising Aromatic Steam Waves */}
              <path d="M8 8c0-2 1-3 1-5" className="text-gold animate-pulse" />
              <path d="M12 7c0-2 1-3 1-5" className="text-heritageRed animate-pulse delay-100" />
              <path d="M16 8c0-2 1-3 1-5" className="text-gold animate-pulse delay-200" />
            </svg>
          </div>
        </div>

        {/* Brand Name & Typography */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-[10px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark inline-block animate-pulse" />
            <span>ESTD. 2009 • RANIGANJ, WB</span>
          </div>

          <h2 className="font-serif text-2xl font-bold tracking-tight text-espresso-900">
            TAJA CHANACHUR
          </h2>

          <p className="font-bengaliDisplay text-heritageRed text-sm font-semibold">
            খাঁটি সন্ধ্যার আড্ডা, ২০০৯ থেকে
          </p>

          <p className="text-xs text-espresso-muted font-normal max-w-xs pt-1">
            Hand-blending small brass kadai batches with authentic spices for your evening tea...
          </p>
        </div>
      </div>
    </div>
  );
}