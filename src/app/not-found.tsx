import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag, PhoneCall, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/sections/FooterSection";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-100 text-espresso-900 flex flex-col justify-between selection:bg-gold selection:text-espresso-900">
      <Header />

      <main className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center">
        {/* Animated Interactive Bengali Tea Cup & Chanachur Bowl Illustration */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="w-32 h-32 rounded-3xl bg-cream-200/90 border-2 border-gold/50 shadow-xl flex items-center justify-center relative overflow-hidden group">
            {/* Animated Background Steam Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-heritageRed/10 pointer-events-none" />

            <svg
              className="w-16 h-16 text-heritageRed animate-bounce duration-1000"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Earthen Clay Cup (Bhar) */}
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" x2="6" y1="2" y2="4" className="text-gold animate-pulse" />
              <line x1="10" x2="10" y1="2" y2="4" className="text-heritageRed animate-pulse delay-100" />
              <line x1="14" x2="14" y1="2" y2="4" className="text-gold animate-pulse delay-200" />
            </svg>
          </div>
        </div>

        {/* 404 Display Typography */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-heritageRed" />
            <span>ERROR 404 • SHELF NOT FOUND</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-espresso-900 leading-tight">
            Looks Like This Adda <br />
            <span className="text-heritageRed italic font-normal">Moved to Another Table.</span>
          </h1>

          <p className="font-bengaliDisplay text-espresso-700 text-xl font-medium">
            এই পাতার খোঁজ পাওয়া যায়নি — তবে চায়ের আড্ডা এখনো চালু আছে!
          </p>

          <p className="text-sm sm:text-base text-espresso-800 leading-relaxed font-normal max-w-lg mx-auto">
            The page you are looking for might have been savored with evening tea, or the link has changed. 
            Step back into our pantry to explore authentic Bengali snacks.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3.5 rounded-full bg-heritageRed hover:bg-heritageRed-hover text-cream-50 font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/products"
            className="px-6 py-3.5 rounded-full bg-cream-50/90 hover:bg-cream-200 text-espresso-900 font-bold text-xs uppercase tracking-widest transition-all border border-gold/40 shadow-sm flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-gold-dark" />
            <span>Browse Products</span>
          </Link>

          <Link
            href="/taja-chanachur"
            className="px-6 py-3.5 rounded-full bg-gold hover:bg-gold-light text-navy-950 font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
          >
            Taja Brand Hub
          </Link>
        </div>

        {/* Quick Help Card */}
        <div className="mt-14 p-6 rounded-3xl bg-cream-50/90 border border-gold/40 shadow-sm max-w-md w-full text-xs text-espresso-700 flex items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-bold text-espresso-900 block">Looking for wholesale dealership?</span>
            <span className="text-[11px] text-espresso-muted">Reach our Raniganj customer desk directly.</span>
          </div>
          <Link
            href="/contact-us"
            className="px-3.5 py-2 rounded-xl bg-navy-950 text-gold font-bold hover:bg-navy-900 transition-colors shrink-0 flex items-center gap-1.5"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Contact Desk</span>
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
