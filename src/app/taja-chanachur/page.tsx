import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Leaf, Sparkles, ShieldCheck, MapPin, Phone, Mail, Instagram, Facebook, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/sections/FooterSection";
import { PRODUCTS_CATALOG } from "@/constants/bilingualCopy";

export const metadata: Metadata = {
  title: "Taja Chanachur | Official Brand Page by R.R. Food Products Raniganj",
  description:
    "Official page for Taja Chanachur by R.R. Food Products (Raniganj, West Bengal since 2009). Discover Special Jhal, Tak Jhal Misti, and Masala Chira in ₹10, ₹35, and ₹90 packs. FSSAI Lic. No. 12825023000187.",
  keywords: [
    "Taja Chanachur",
    "Taja Chanachur official website",
    "R.R. Food Products Taja Chanachur",
    "Taja Special Jhal Chanachur",
    "Taja Tak Jhal Misti",
    "Taja Chanachur price ₹10 ₹35 ₹90",
    "Raniganj Chanachur factory",
    "Bengali tea time chanachur",
  ],
  alternates: {
    canonical: "/taja-chanachur",
  },
};

export default function TajaChanachurPage() {
  const brandPageSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: "Taja Chanachur",
    alternateName: ["Taja", "New Taja Chanachur"],
    url: "https://tajachanachur.com/taja-chanachur",
    logo: "https://tajachanachur.com/rr_logo.png",
    image: "https://tajachanachur.com/10_rs_jhal_red_new.webp",
    description:
      "Taja Chanachur is an authentic Bengali tea-time snack brand manufactured by R.R. Food Products in Raniganj, West Bengal since 2009.",
    manufacturer: {
      "@type": "Organization",
      name: "R.R. Food Products",
      url: "https://tajachanachur.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Raniganj",
        addressLocality: "Raniganj, Paschim Bardhaman",
        addressRegion: "West Bengal",
        postalCode: "713347",
        addressCountry: "IN",
      },
    },
    sameAs: [
      "https://www.instagram.com/new_taja/",
      "https://www.facebook.com/profile.php?id=61558675132758",
    ],
  };

  return (
    <div className="min-h-screen bg-cream-100 text-espresso-900 flex flex-col justify-between selection:bg-gold selection:text-espresso-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandPageSchema) }}
      />

      <Header />

      <main className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full flex-1">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold uppercase tracking-wider text-gold-dark flex items-center gap-2">
          <Link href="/" className="hover:text-heritageRed transition-colors">Home</Link>
          <span>/</span>
          <span className="text-espresso-700">Taja Chanachur Official</span>
        </nav>

        {/* Brand Display Hero Header */}
        <section className="max-w-4xl mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-gold-dark inline-block" />
            <span>OFFICIAL BRAND HUB • A BRAND OF R.R. FOOD PRODUCTS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-espresso-900 leading-[1.1]">
            Taja Chanachur — Authentic <br />
            <span className="text-heritageRed italic font-normal">Bengali Kadai Craft Since 2009.</span>
          </h1>

          <p className="font-bengaliDisplay text-espresso-700 text-xl sm:text-2xl font-medium">
            তাজা চানাচুর — আর.আর. ফুড প্রোডাক্টসের খাঁটি নিবেদন
          </p>

          <p className="text-base sm:text-lg text-espresso-800 leading-relaxed font-normal max-w-3xl">
            <strong>R.R. Food Products</strong> is the sole manufacturer of <strong>Taja Chanachur</strong>, 
            crafted in Raniganj, West Bengal. Hand-blended in small brass kadais with golden besan sev, 
            slow-roasted Bengal peanuts, and aromatic ground spices for Bengal’s iconic evening tea ritual.
          </p>
        </section>

        {/* Official Brand Identity Card & Social Accounts */}
        <section className="grid lg:grid-cols-12 gap-8 mb-20 items-stretch">
          <div className="lg:col-span-8 p-8 rounded-3xl bg-cream-50/95 border-2 border-gold/40 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gold/30">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-espresso-900">Brand & Manufacturer Authority</h2>
                  <p className="text-xs text-espresso-muted">Statutory FSSAI License: 12825023000187</p>
                </div>
                <div className="px-3.5 py-1 rounded-full bg-navy-950 text-gold text-xs font-bold tracking-wider uppercase">
                  ESTD. 2009
                </div>
              </div>

              <p className="text-sm text-espresso-800 leading-relaxed font-normal">
                Taja Chanachur was created with an uncompromising commitment to heirloom quality. 
                Unlike mass-market commercial snacks extruded in industrial factories, our recipes rely 
                on artisan flame roasting, pure mustard oil frying, and multi-layer nitrogen lock packaging.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 text-xs font-semibold text-espresso-800">
                  <CheckCircle2 className="w-4 h-4 text-heritageRed shrink-0" />
                  <span>Manufacturer: R.R. Food Products</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-espresso-800">
                  <CheckCircle2 className="w-4 h-4 text-heritageRed shrink-0" />
                  <span>Plant: Raniganj, Paschim Bardhaman, WB</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-espresso-800">
                  <CheckCircle2 className="w-4 h-4 text-heritageRed shrink-0" />
                  <span>100% Pure Vegetarian Certified</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-espresso-800">
                  <CheckCircle2 className="w-4 h-4 text-heritageRed shrink-0" />
                  <span>Zero Trans-Fat Nitrogen Freshness</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/30 flex flex-wrap items-center gap-4">
              <Link
                href="/about-us"
                className="text-xs font-bold uppercase tracking-wider text-gold-dark hover:text-heritageRed transition-colors flex items-center gap-1.5"
              >
                <span>Read Full 15-Year Story</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Official Social Media Source of Truth */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-navy-950 text-cream-50 border-2 border-gold/50 shadow-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
                SOURCE OF TRUTH
              </span>
              <h2 className="font-serif text-2xl font-bold text-cream-50">
                Official Social Media
              </h2>
              <p className="text-xs text-cream-100/75 leading-relaxed">
                Connect with our official verified community accounts for festival announcements, 
                retail availability, and fresh batch updates.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="https://www.instagram.com/new_taja/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-navy-900 border border-gold/40 hover:border-gold hover:bg-gold/10 transition-all text-xs font-bold text-cream-50"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-heritageRed" />
                  <div>
                    <span className="block">Instagram</span>
                    <span className="text-[11px] text-gold font-normal">@new_taja</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gold" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61558675132758"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-navy-900 border border-gold/40 hover:border-gold hover:bg-gold/10 transition-all text-xs font-bold text-cream-50"
              >
                <div className="flex items-center gap-3">
                  <Facebook className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="block">Facebook</span>
                    <span className="text-[11px] text-gold font-normal">New Taja</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gold" />
              </a>
            </div>
          </div>
        </section>

        {/* Complete Taja Product Range & Sizing */}
        <section className="mb-24 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              PRODUCT LINEUP & SIZES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900">
              The Signature Blends of Taja Chanachur
            </h2>
            <p className="text-sm text-espresso-700">
              Available in ₹10 Pocket Buddy, ₹35 Big Brother, and ₹90 Family Adda Celebration packs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {PRODUCTS_CATALOG.map((product) => (
              <div
                key={product.id}
                className="rounded-3xl bg-cream-50/95 border border-gold/40 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative"
              >
                {product.badge && (
                  <div className="absolute top-4 left-4 z-20 px-2.5 py-0.5 rounded-full bg-navy-900 text-gold text-[10px] font-bold tracking-wider uppercase border border-gold/40">
                    {product.badge}
                  </div>
                )}

                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-heritageRed text-cream-50 text-xs font-bold tracking-wider shadow-md">
                  {product.price}
                </div>

                <div className="relative aspect-square w-full my-6 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={`Taja ${product.flavor} Chanachur ${product.netWt} Pack by R.R. Food Products`}
                    width={320}
                    height={320}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain w-4/5 h-4/5 filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.2)]"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-gold/20">
                  <div className="flex items-center justify-between text-xs text-gold-dark font-bold uppercase">
                    <span>{product.flavor}</span>
                    <span className="font-bengaliDisplay text-heritageRed">{product.flavorBn}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-espresso-900">{product.title}</h3>
                  <p className="text-xs text-espresso-muted line-clamp-2">{product.description}</p>

                  <div className="pt-2 flex items-center justify-between text-xs font-semibold">
                    <span className="bg-cream-200 px-2.5 py-1 rounded-lg text-espresso-800">{product.netWt}</span>
                    <Link href="/contact-us" className="text-heritageRed font-bold hover:underline">
                      Enquire Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manufacturing & Plant Location */}
        <section className="rounded-3xl bg-cream-50/95 border-2 border-gold/40 p-8 sm:p-12 shadow-xl mb-24 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              PRODUCTION & WHOLESALE DISPATCH
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900">
              Manufactured in Raniganj, West Bengal
            </h2>
            <p className="text-sm text-espresso-800 leading-relaxed font-normal">
              Our central manufacturing kitchen is strategically located in Raniganj (Paschim Bardhaman), 
              delivering fresh daily supply to distributors and tea vendor networks across 
              Asansol, Durgapur, Bardhaman, Bankura, Purulia, Kolkata, and Eastern India.
            </p>

            <div className="space-y-2 pt-2 text-xs text-espresso-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-heritageRed" />
                <span>R.R. Food Products, Raniganj, West Bengal – 713347</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-heritageRed" />
                <span>Customer & Distributor Desk: +91 94340 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-heritageRed" />
                <span>feedback@tajachanachur.com / b2b@tajachanachur.com</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-navy-950 text-cream-50 border border-gold/40 space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold">Wholesale Dealership Application</h3>
            <p className="text-xs text-cream-200/80 leading-relaxed">
              Are you a distributor or retail snack stockist in West Bengal, Jharkhand, or Bihar? 
              Partner directly with R.R. Food Products for high-margin, fast-moving Taja inventory.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-gold hover:bg-gold-light text-navy-950 font-bold text-xs uppercase tracking-widest transition-all"
            >
              Apply for Dealership
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
