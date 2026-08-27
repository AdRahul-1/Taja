"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home, AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime exception for diagnostics
    console.error("Taja App Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FDF9F2] text-espresso-900 flex flex-col items-center justify-center px-4 py-16 text-center select-none relative">
      {/* Warm Background Parchment */}
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#FDF9F2] via-[#FAF3E7] to-[#F4EADA]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-lg space-y-6">
        {/* Animated Kadai Wok Error Indicator */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-cream-200/90 border-2 border-gold/50 shadow-xl flex items-center justify-center relative">
          <svg
            className="w-12 h-12 text-heritageRed animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 13c1 5 4.5 7 9 7s8-2 9-7H3z" />
            <path d="M3 13c-1.5 0-2.5-.8-2.5-2s1-2 2.5-2" />
            <path d="M21 13c1.5 0 2.5-.8 2.5-2s-1-2-2.5-2" />
            <circle cx="12" cy="7" r="1" className="fill-heritageRed" />
            <line x1="12" y1="2" x2="12" y2="4" className="text-gold" />
          </svg>
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-bold uppercase tracking-widest">
            <AlertCircle className="w-3.5 h-3.5 text-heritageRed" />
            <span>KADAI FLAME INTERRUPTED</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-espresso-900 leading-tight">
            A Slight Hiccup in the Roast
          </h1>

          <p className="font-bengaliDisplay text-espresso-700 text-lg font-medium">
            সাময়িক কারিগরি ত্রুটি — কড়াইয়ের আঁচে সামান্য সমস্যা হয়েছে
          </p>

          <p className="text-xs sm:text-sm text-espresso-800 leading-relaxed font-normal max-w-sm mx-auto">
            Something unexpected occurred while loading this batch. Let’s re-ignite the brass kadai and try again.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-heritageRed hover:bg-heritageRed-hover text-cream-50 font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-Toss the Batch</span>
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-cream-50/90 hover:bg-cream-200 text-espresso-900 font-bold text-xs uppercase tracking-widest transition-all border border-gold/40 shadow-sm flex items-center gap-2"
          >
            <Home className="w-3.5 h-3.5 text-gold-dark" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
