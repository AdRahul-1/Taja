"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRODUCTS_CATALOG, SKUProduct } from "@/constants/bilingualCopy";
import { trackEvent } from "@/lib/analytics";
import { Flip } from "@/lib/gsapConfig";
import { Eye, X, CheckCircle2, ShoppingBag } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ShelfSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<SKUProduct | null>(null);
  const isReducedMotion = useReducedMotion();

  const filterTabs = [
    { id: "all", label: "All Packs", labelBn: "সকল প্যাক" },
    { id: "jhal", label: "Special Jhal", labelBn: "স্পেশাল ঝাল" },
    { id: "misti", label: "Tak Jhal Misti", labelBn: "টক ঝাল মিষ্টি" },
    { id: "medium", label: "Masala Chira", labelBn: "মশলা চিঁড়ে" },
  ];

  const filteredProducts = PRODUCTS_CATALOG.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.spiceLevel === selectedCategory;
  });

  const handleProductClick = (product: SKUProduct) => {
    setSelectedProduct(product);
    trackEvent({
      name: "shelf_sku_opened",
      payload: { skuId: product.id, title: product.title, price: product.price },
    });
  };

  const handleFilterChange = (catId: string) => {
    if (isReducedMotion || typeof window === "undefined") {
      setSelectedCategory(catId);
      trackEvent({ name: "shelf_filter_changed", payload: { filter: catId } });
      return;
    }

    // Capture layout state before filter update
    const state = Flip.getState(".shelf-card");
    setSelectedCategory(catId);
    trackEvent({ name: "shelf_filter_changed", payload: { filter: catId } });

    // Execute GSAP Flip layout animation after React re-renders DOM
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: "brandEase",
        scale: true,
        stagger: 0.03,
        onComplete: () => {
          // ensure layout settles cleanly
        },
      });
    });
  };

  return (
    <section
      id="shelf"
      className="relative bg-cream-50 text-espresso-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-gold/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-200/70 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>THE TAJA PANTRY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-espresso-900 leading-tight">
            The Complete Range, <br />
            <span className="text-gold-dark italic font-normal">Fresh From the Kadai.</span>
          </h2>
          <p className="font-bengaliDisplay text-espresso-700 text-lg sm:text-xl mt-3 font-medium">
            ছোট পকেট প্যাক থেকে ফ্যামিলি সেলিব্রেশন
          </p>
        </div>

        {/* Spice Level & Category Filter Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-cream-100 border border-gold/40 shadow-inner">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-navy-900 text-cream-50 shadow-md shadow-navy-900/20"
                      : "text-espresso-800 hover:text-navy-900 hover:bg-cream-200/60"
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
        </div>

        {/* Product Catalog Grid (4 Columns Desktop with Flip support) */}
        <div className="shelf-grid grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 min-h-[400px]">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="shelf-card group cursor-pointer rounded-2xl bg-cream-100/90 border border-gold/30 hover:border-gold hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between overflow-hidden relative p-5"
            >
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 px-2.5 py-0.5 rounded-full bg-navy-900 text-gold text-[10px] font-bold tracking-wider uppercase border border-gold/40 shadow-sm">
                  {product.badge}
                </div>
              )}

              {/* Price Tag Pill in Heritage Red */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-heritageRed text-cream-50 text-xs font-bold tracking-wider shadow-md">
                {product.price}
              </div>

              {/* Product Pack Photo with Studio Drop Shadow (Lazy loaded) */}
              <div className="relative aspect-square w-full my-6 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={`${product.title} (${product.flavor}) - Taja Chanachur`}
                  width={340}
                  height={340}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain w-4/5 h-4/5 filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)] group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              {/* Product Details */}
              <div className="pt-2 border-t border-gold/20 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-gold-dark font-bold uppercase tracking-wider mb-1">
                    <span>{product.flavor}</span>
                    <span className="font-bengaliDisplay text-xs font-medium">
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
                  <span className="font-semibold text-espresso-700 bg-cream-200/80 px-2.5 py-1 rounded-md">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="bg-cream-50 text-espresso-900 rounded-3xl border-2 border-gold max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-cream-200/80 text-espresso-900 hover:bg-gold hover:text-navy-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid sm:grid-cols-2 gap-8 items-center">
                {/* Visual */}
                <div className="relative aspect-square w-full bg-cream-100 rounded-2xl p-6 flex items-center justify-center border border-gold/30">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    width={400}
                    height={400}
                    className="object-contain w-full h-full filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.35)]"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-heritageRed text-cream-50 text-xs font-bold shadow-md">
                    {selectedProduct.price}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gold-dark uppercase">
                      {selectedProduct.flavor} •{" "}
                      <span className="font-bengaliDisplay">{selectedProduct.flavorBn}</span>
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

                  {/* Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href="#contact"
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 py-3 rounded-full bg-heritageRed text-cream-50 font-semibold text-xs tracking-wider uppercase text-center hover:bg-heritageRed-hover transition-colors shadow-md"
                    >
                      Retail / Tasting Inquiry
                    </a>
                    <a
                      href="#distributor-form"
                      onClick={() => setSelectedProduct(null)}
                      className="py-3 px-4 rounded-full border border-gold text-gold-dark font-semibold text-xs tracking-wider uppercase text-center hover:bg-gold/15 transition-colors"
                    >
                      Bulk Order
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
