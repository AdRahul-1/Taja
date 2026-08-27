import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Flame, Sparkles, Check, Phone, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/sections/FooterSection";
import { PRODUCTS_CATALOG } from "@/constants/bilingualCopy";

export const metadata: Metadata = {
  title: "All Products & Pricing | Taja Chanachur Full Catalogue",
  description:
    "Explore the complete range of Taja Chanachur: Special Jhal (₹10, ₹35, ₹90), Tak Jhal Misti, and Masala Chira. Handcrafted by R.R. Food Products in Raniganj with zero trans-fat nitrogen lock.",
  keywords: [
    "Taja Chanachur Products",
    "Special Jhal Chanachur ₹10",
    "Tak Jhal Misti Chanachur ₹35",
    "Family Chanachur Pack ₹90",
    "Masala Chira Raniganj",
    "Bengali tea-time snacks price list",
    "Wholesale Chanachur distributor Bengal",
  ],
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Taja Chanachur Full Product Catalogue",
    description:
      "Handcrafted Bengali chanachur, roasted peanuts, and traditional tea-time snacks by R.R. Food Products in Raniganj, West Bengal.",
    url: "https://tajachanachur.com/products",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PRODUCTS_CATALOG.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: `Taja Chanachur - ${product.title} (${product.flavor})`,
          image: `https://tajachanachur.com${product.image}`,
          description: product.description,
          offers: {
            "@type": "Offer",
            price: product.price.replace("₹", "").split("/")[0].trim(),
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-cream-100 text-espresso-900 flex flex-col justify-between selection:bg-gold selection:text-espresso-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />

      <Header />

      <main className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full flex-1">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold uppercase tracking-wider text-gold-dark flex items-center gap-2">
          <Link href="/" className="hover:text-heritageRed transition-colors">Home</Link>
          <span>/</span>
          <span className="text-espresso-700">All Products</span>
        </nav>

        {/* Hero Catalogue Display Header */}
        <section className="max-w-4xl mb-14 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-bold uppercase tracking-widest">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>THE COMPLETE TAJA PANTRY CATALOGUE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-espresso-900 leading-[1.1]">
            Small Kadai Batches, <br />
            <span className="text-heritageRed italic font-normal">Sized for Every Adda.</span>
          </h1>

          <p className="font-bengaliDisplay text-espresso-700 text-xl sm:text-2xl font-medium">
            ছোট পকেট প্যাক থেকে ফ্যামিলি সেলিব্রেশন — প্রতি ব্যাচে খাঁটি স্বাদ
          </p>

          <p className="text-base sm:text-lg text-espresso-800 leading-relaxed font-normal max-w-3xl">
            Whether it’s a quick solo tea break with our ₹10 Pocket Buddy or an evening gathering 
            around the family table with our ₹90 Celebration Pack, every single grain is flame-roasted 
            in pure edible oil and sealed fresh under nitrogen barrier protection.
          </p>
        </section>

        {/* Complete Product Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
          {PRODUCTS_CATALOG.map((product) => (
            <article
              key={product.id}
              className="group rounded-3xl bg-cream-50/95 text-espresso-900 border border-gold/40 hover:border-gold-dark hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative p-6 select-none"
            >
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-20 px-2.5 py-0.5 rounded-full bg-navy-900 text-gold text-[10px] font-bold tracking-wider uppercase border border-gold/40 shadow-sm">
                  {product.badge}
                </div>
              )}

              {/* Price Tag Pill in Heritage Red */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-heritageRed text-cream-50 text-xs font-bold tracking-wider shadow-md">
                {product.price}
              </div>

              {/* Product Pack Photo */}
              <div className="relative aspect-square w-full my-6 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={`${product.title} (${product.flavor}) - Taja Chanachur`}
                  width={340}
                  height={340}
                  draggable={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain w-4/5 h-4/5 filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                />
              </div>

              {/* Product Details & Tasting Profile */}
              <div className="pt-3 border-t border-gold/30 flex flex-col justify-between flex-1 relative z-20 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-gold-dark font-bold uppercase tracking-wider mb-1">
                    <span>{product.flavor}</span>
                    <span className="font-bengaliDisplay text-xs font-semibold text-heritageRed">
                      {product.flavorBn}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-espresso-900 group-hover:text-gold-dark transition-colors leading-snug">
                    {product.title}
                  </h2>

                  <p className="text-xs text-espresso-muted mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gold/20 flex items-center justify-between text-xs">
                  <span className="font-bold text-espresso-800 bg-cream-200/80 px-2.5 py-1 rounded-lg">
                    {product.netWt}
                  </span>
                  <span className="text-gold-dark font-semibold">
                    100% Vegetarian
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Nutritional Quality & Ingredient Profile Highlights */}
        <section className="rounded-3xl bg-cream-50/95 border-2 border-gold/40 p-8 sm:p-12 shadow-xl mb-24 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              THE HONEST RECIPE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900">
              What Goes Into Every Single Pack of Taja
            </h2>
            <p className="text-sm text-espresso-800 leading-relaxed">
              We take pride in transparent labeling. No hidden chemicals, no synthetic colors, and no recycled oils.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-cream-100/80 border border-gold/30 space-y-2">
              <h3 className="font-serif font-bold text-base text-espresso-900">Bengal Gram Besan Sev</h3>
              <p className="text-xs text-espresso-700 leading-relaxed font-normal">
                Slow-extruded through micro-pore plates directly into hot brass kadais for signature crunch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-100/80 border border-gold/30 space-y-2">
              <h3 className="font-serif font-bold text-base text-espresso-900">Roasted Bengal Peanuts</h3>
              <p className="text-xs text-espresso-700 leading-relaxed font-normal">
                Plump, golden-roasted groundnuts providing rich protein and nutty depth.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-100/80 border border-gold/30 space-y-2">
              <h3 className="font-serif font-bold text-base text-espresso-900">Sun-Dried Chillies</h3>
              <p className="text-xs text-espresso-700 leading-relaxed font-normal">
                Heirloom Guntur red chillies sun-dried and hand-pounded for lingering heat without burning.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-100/80 border border-gold/30 space-y-2">
              <h3 className="font-serif font-bold text-base text-espresso-900">Black Rock Salt (Bit Nun)</h3>
              <p className="text-xs text-espresso-700 leading-relaxed font-normal">
                Natural Himalayan black salt lending the iconic pungent warmth beloved across Bengal.
              </p>
            </div>
          </div>
        </section>

        {/* Wholesale Order & Dealership Banner */}
        <section className="rounded-3xl bg-navy-950 text-cream-50 p-8 sm:p-12 border-2 border-gold/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block">
              B2B & DISTRIBUTOR SUPPLY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
              Stock Taja Chanachur in Your Store or Region
            </h2>
            <p className="text-xs sm:text-sm text-cream-100/75 leading-relaxed font-normal">
              Direct factory dispatch from our Raniganj production unit across West Bengal, 
              Jharkhand, and Eastern India with guaranteed 90-day shelf life.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/contact-us"
              className="px-6 py-3.5 rounded-full bg-gold hover:bg-gold-light text-navy-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
            >
              <span>Distributor Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="tel:+919434000000"
              className="px-6 py-3.5 rounded-full bg-cream-50/10 hover:bg-cream-50/20 text-cream-100 font-bold text-xs uppercase tracking-widest transition-all border border-gold/40 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Call Wholesale Desk</span>
            </a>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
