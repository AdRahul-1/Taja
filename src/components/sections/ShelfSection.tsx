"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { PRODUCTS_CATALOG, SKUProduct } from "@/constants/bilingualCopy";
import { trackEvent } from "@/lib/analytics";
import { gsap } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Eye, X, CheckCircle2, ShoppingBag, PhoneCall, Building2 } from "lucide-react";

export default function ShelfSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<SKUProduct | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();

  const filterTabs = useMemo(
    () => [
      { id: "all", label: "All Packs", labelBn: "সকল প্যাক" },
      { id: "jhal", label: "Special Jhal", labelBn: "স্পেশাল ঝাল" },
      { id: "misti", label: "Tak Jhal Misti", labelBn: "টক ঝাল মিষ্টি" },
      { id: "medium", label: "Masala Chira", labelBn: "মশলা চিঁড়ে" },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return PRODUCTS_CATALOG;
    return PRODUCTS_CATALOG.filter((p) => p.spiceLevel === selectedCategory);
  }, [selectedCategory]);

  const handleProductClick = (product: SKUProduct) => {
    setSelectedProduct(product);
    trackEvent({
      name: "shelf_sku_opened",
      payload: { skuId: product.id, title: product.title, price: product.price },
    });
  };

  const handleFilterChange = (catId: string) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as any).startViewTransition(() => {
        setSelectedCategory(catId);
      });
    } else {
      setSelectedCategory(catId);
    }
    trackEvent({ name: "shelf_filter_changed", payload: { filter: catId } });
  };

  // 1. Header Entrance Mask-Reveal (Runs on scroll into section)
  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Line mask-reveals on scroll for header elements
      const lines = gsap.utils.toArray<HTMLElement>(".shelf-line-reveal");
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
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // 2. Individual Per-Card ScrollTrigger Animation (Triggers for each card as it enters view)
  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".shelf-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion, selectedCategory]);

  return (
    <section
      ref={sectionRef}
      id="shelf"
      className="relative bg-transparent text-espresso-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-gold/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Static Animated Section Header with Exact Masked Line Reveals */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="overflow-hidden">
            <div className="shelf-line-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3 will-change-transform">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>THE TAJA PANTRY</span>
            </div>
          </div>

          <div className="overflow-hidden pb-3">
            <h2 className="shelf-line-reveal font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-espresso-900 leading-[1.12] pb-2 will-change-transform">
              The Complete Range, <br />
              <span className="text-heritageRed italic font-normal inline-block pt-1 pb-1">Fresh From the Kadai.</span>
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="shelf-line-reveal font-bengaliDisplay text-espresso-700 text-lg sm:text-xl mt-3 font-medium will-change-transform">
              ছোট পকেট প্যাক থেকে ফ্যামিলি সেলিব্রেশন
            </p>
          </div>
        </div>

        {/* Spice Level & Category Filter Tabs */}
        <div className="flex justify-center mb-12 sm:mb-16 w-full">
          {/* Desktop Filter Pills */}
          <div className="hidden sm:inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-cream-200/90 border border-gold/40 shadow-inner backdrop-blur-md">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-navy-900 text-cream-50 font-bold shadow-md shadow-navy-900/20"
                      : "text-espresso-800 hover:text-navy-900 hover:bg-cream-100"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="font-bengaliDisplay text-xs opacity-80 ml-1.5">
                    ({tab.labelBn})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Filter Tabs: Clean 2x2 Grid with Elegant Rounded Borders */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-cream-200/90 border border-gold/40 shadow-inner backdrop-blur-md w-full max-w-sm sm:hidden">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 text-center flex flex-col items-center justify-center ${
                    isActive
                      ? "bg-navy-900 text-cream-50 font-bold shadow-sm"
                      : "text-espresso-800 hover:bg-cream-100/60"
                  }`}
                >
                  <span className="truncate">{tab.label}</span>
                  <span className="font-bengaliDisplay text-[10px] opacity-85">
                    ({tab.labelBn})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Catalog Grid (Smooth ViewTransitions without re-animating header) */}
        <div className="shelf-grid grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 min-h-[400px]">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              style={{
                viewTransitionName: `shelf-sku-${product.id}`,
              }}
              className="shelf-card group cursor-pointer rounded-3xl bg-cream-50/95 text-espresso-900 border border-gold/40 hover:border-gold-dark hover:shadow-2xl transition-colors duration-300 flex flex-col justify-between overflow-hidden relative p-5 sm:p-6 select-none will-change-transform"
            >
              {/* Invisible anti-theft copy protection shield */}
              <div
                className="img-shield"
                onContextMenu={(e) => e.preventDefault()}
                aria-hidden="true"
              />

              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-30 px-2.5 py-0.5 rounded-full bg-navy-900 text-gold text-[10px] font-bold tracking-wider uppercase border border-gold/40 shadow-sm">
                  {product.badge}
                </div>
              )}

              {/* Price Tag Pill in Heritage Red */}
              <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full bg-heritageRed text-cream-50 text-xs font-bold tracking-wider shadow-md">
                {product.price}
              </div>

              {/* Product Pack Photo with Protected Layer */}
              <div className="relative aspect-square w-full my-6 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={`${product.title} (${product.flavor}) - Taja Chanachur`}
                  width={340}
                  height={340}
                  draggable={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain w-4/5 h-4/5 filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] group-hover:scale-108 transition-transform duration-500 protected-image-layer pointer-events-none select-none"
                />
              </div>

              {/* Product Details */}
              <div className="pt-2 border-t border-gold/30 flex flex-col justify-between flex-1 relative z-20">
                <div>
                  <div className="flex items-center justify-between text-xs text-gold-dark font-bold uppercase tracking-wider mb-1">
                    <span>{product.flavor}</span>
                    <span className="font-bengaliDisplay text-xs font-semibold text-heritageRed">
                      {product.flavorBn}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-espresso-900 group-hover:text-gold-dark transition-colors leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-xs text-espresso-muted mt-1 line-clamp-2">
                    {product.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between text-xs">
                  <span className="font-semibold text-espresso-800 bg-cream-200/90 px-2.5 py-1 rounded-md">
                    Net Wt: {product.netWt}
                  </span>
                  <span className="inline-flex items-center gap-1 text-heritageRed font-bold group-hover:underline">
                    <span>Inspect</span>
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick View Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div
              className="bg-cream-50 text-espresso-900 rounded-3xl border-2 border-gold max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-cream-200/80 text-espresso-900 hover:bg-gold hover:text-navy-900 transition-colors cursor-pointer z-30"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid sm:grid-cols-2 gap-8 items-center">
                {/* Visual with Anti-Theft Shield */}
                <div className="relative aspect-square w-full bg-cream-100 rounded-2xl p-4 flex items-center justify-center border border-gold/30 select-none overflow-hidden">
                  <div
                    className="img-shield"
                    onContextMenu={(e) => e.preventDefault()}
                    aria-hidden="true"
                  />

                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-contain p-4 filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.35)] protected-image-layer pointer-events-none select-none"
                  />
                  <div className="absolute top-3 left-3 z-30 px-3 py-1 rounded-full bg-heritageRed text-cream-50 text-xs font-bold shadow-md">
                    {selectedProduct.price}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gold-dark uppercase">
                      {selectedProduct.flavor} •{" "}
                      <span className="font-bengaliDisplay text-heritageRed">{selectedProduct.flavorBn}</span>
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 mt-1">
                      {selectedProduct.title}
                    </h3>
                    <p className="text-xs font-semibold text-espresso-muted mt-1">
                      Net Weight: {selectedProduct.netWt}
                    </p>
                  </div>

                  <p className="text-sm text-espresso-800 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Ingredients Profile */}
                  <div className="space-y-2 pt-2 border-t border-gold/20">
                    <span className="text-xs font-bold uppercase tracking-wider text-espresso-900 block">
                      Ingredients Blend:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.ingredientsList.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-cream-200 text-espresso-900 font-medium"
                        >
                          <CheckCircle2 className="w-3 h-3 text-gold-dark" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Single-Word Crisp Action Buttons */}
                  <div className="pt-4 flex flex-row gap-3">
                    <a
                      href="#contact"
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 py-3.5 px-6 rounded-full bg-heritageRed hover:bg-heritageRed-hover text-cream-50 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md shadow-heritageRed/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Inquire</span>
                    </a>
                    <a
                      href="#distributor-form"
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 py-3.5 px-6 rounded-full bg-navy-950 hover:bg-navy-900 text-gold border border-gold/60 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-gold" />
                      <span>Wholesale</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
