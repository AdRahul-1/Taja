import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ShieldCheck, Flame, Leaf, Clock, MapPin, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "About Our Heritage | R.R. Food Products & Taja Chanachur Since 2009",
  description:
    "Discover the story of R.R. Food Products, crafting authentic Bengali tea-time snacks and Taja Chanachur in small brass kadais in Raniganj, West Bengal since 2009. FSSAI Lic. No. 12825023000187.",
  keywords: [
    "About Taja Chanachur",
    "R.R. Food Products Raniganj",
    "Bengali Chanachur history",
    "Kadai roasting tradition West Bengal",
    "Tea-time snacks manufacturer Raniganj",
    "FSSAI licensed chanachur Bengal",
  ],
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About R.R. Food Products & Taja Chanachur",
    description:
      "The official story and manufacturing heritage of Taja Chanachur, crafted by R.R. Food Products in Raniganj, West Bengal since 2009.",
    url: "https://tajachanachur.com/about-us",
    mainEntity: {
      "@type": "Organization",
      name: "R.R. Food Products",
      foundingDate: "2009",
      foundingLocation: "Raniganj, West Bengal, India",
      description:
        "Preserving traditional brass kadai flame roast and authentic Bengali spice blending for over 15 years.",
    },
  };

  return (
    <div className="min-h-screen bg-cream-100 text-espresso-900 flex flex-col justify-between selection:bg-gold selection:text-espresso-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      
      <Header />

      <main className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full flex-1">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold uppercase tracking-wider text-gold-dark flex items-center gap-2">
          <Link href="/" className="hover:text-heritageRed transition-colors">Home</Link>
          <span>/</span>
          <span className="text-espresso-700">About Our Heritage</span>
        </nav>

        {/* Hero Display Header */}
        <section className="max-w-4xl mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-gold-dark inline-block" />
            <span>ESTABLISHED 2009 • RANIGANJ, WEST BENGAL</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-espresso-900 leading-[1.1]">
            Fifteen Years of Honoring <br />
            <span className="text-heritageRed italic font-normal">the Sacred Kadai Roast.</span>
          </h1>

          <p className="font-bengaliDisplay text-espresso-700 text-xl sm:text-2xl font-medium">
            ১৫ বছর ধরে খাঁটি স্বাদের অবিচল ঐতিহ্য ও আস্থার প্রতীক
          </p>

          <p className="text-base sm:text-lg text-espresso-800 leading-relaxed font-normal max-w-3xl">
            In 2009, R.R. Food Products was founded in Raniganj with a singular refusal: we refused 
            to replace traditional brass kadai flame roasting with mass-industrial extruder machines. 
            Over fifteen years later, every handful of Taja Chanachur still preserves the authentic 
            smoky warmth and heirloom crunch that defines Bengal’s cherished evening adda.
          </p>
        </section>

        {/* Documentary Photography & Artisan Card */}
        <section className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24">
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 bg-espresso-900 group">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/artisan_kadai.jpg"
                alt="Artisan hand-blending authentic Bengali chanachur in a traditional brass kadai wok over fire embers in Raniganj"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-6 bg-navy-950 text-cream-50 border-t border-gold/30 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-base font-bold text-gold">The Raniganj Brass Kadai Kitchen</h2>
                <p className="text-xs text-cream-100/70 mt-0.5">Handcrafted daily in small 25kg batches.</p>
              </div>
              <span className="text-xs font-bold text-gold-dark uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                100% FLAME ROASTED
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 leading-tight">
              Why We Never Switched to <br />
              <span className="text-heritageRed italic font-normal">Mass Industrial Factories.</span>
            </h2>

            <p className="text-sm sm:text-base text-espresso-800 leading-relaxed font-normal">
              Commercial snack factories prioritize volume over taste, passing dough through high-pressure 
              extruders and artificial flavor sprays. But true Bengali chanachur requires human touch: 
              gauging the exact temperature of pure mustard oil, feeling the crispness of besan ribbons, 
              and tossing roasted peanuts at the precise second when ground cumin releases its aromatic oils.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-cream-50/90 border border-gold/40 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-gold-dark font-bold text-sm">
                  <Flame className="w-4 h-4 text-heritageRed" />
                  <span>Slow Kadai Roasting</span>
                </div>
                <p className="text-xs text-espresso-700 leading-relaxed">
                  Even spice distribution without scorching delicate lentil crisps.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cream-50/90 border border-gold/40 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-gold-dark font-bold text-sm">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>100% Pure Vegetarian</span>
                </div>
                <p className="text-xs text-espresso-700 leading-relaxed">
                  Clean, certified plant-based facility adhering to statutory FSSAI standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 15-Year Milestone Timeline */}
        <section className="mb-24 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              OUR JOURNEY & MILESTONES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900">
              The Evolution of an Heirloom Flavor
            </h2>
            <p className="text-sm text-espresso-700">
              From a single local kadai in Raniganj to over 10,000 retail tea stalls across Eastern India.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-md space-y-3">
              <span className="font-serif text-3xl font-bold text-heritageRed">2009</span>
              <h3 className="font-serif text-lg font-bold text-espresso-900">The First Brass Kadai</h3>
              <p className="text-xs text-espresso-700 leading-relaxed font-normal">
                R.R. Food Products opens its first small kitchen in Raniganj, serving local neighbourhood tea vendors.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-md space-y-3">
              <span className="font-serif text-3xl font-bold text-heritageRed">2014</span>
              <h3 className="font-serif text-lg font-bold text-espresso-900">The Special Jhal Formula</h3>
              <p className="text-xs text-espresso-700 leading-relaxed font-normal">
                Mastered our proprietary 7-spice blend combining sun-dried Guntur chillies with pure rock salt.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-md space-y-3">
              <span className="font-serif text-3xl font-bold text-heritageRed">2019</span>
              <h3 className="font-serif text-lg font-bold text-espresso-900">Nitrogen Lock Packaging</h3>
              <p className="text-xs text-espresso-700 leading-relaxed font-normal">
                Introduced airtight multi-layer nitrogen barrier foils, locking in 90-day crunch without chemical preservatives.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-md space-y-3">
              <span className="font-serif text-3xl font-bold text-heritageRed">2024+</span>
              <h3 className="font-serif text-lg font-bold text-espresso-900">Regional B2B Expansion</h3>
              <p className="text-xs text-espresso-700 leading-relaxed font-normal">
                Distributing across West Bengal, Jharkhand, and Bihar through direct wholesale supply lines.
              </p>
            </div>
          </div>
        </section>

        {/* Quality Guarantee & Statutory Compliance */}
        <section className="rounded-3xl bg-navy-950 text-cream-50 p-8 sm:p-12 border-2 border-gold/50 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gold/30">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-1">
                STATUTORY COMPLIANCE & SAFETY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
                FSSAI Certified Manufacturing Standards
              </h2>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gold/15 border border-gold/40 text-gold text-xs font-bold tracking-wider uppercase">
              FSSAI Lic. No. 12825023000187
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-cream-100">Zero Trans-Fat</h3>
                <p className="text-xs text-cream-200/70 mt-1">Fried strictly in fresh edible oil with zero trans-fats.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-cream-100">No Preservatives</h3>
                <p className="text-xs text-cream-200/70 mt-1">Crunch is protected naturally through food-grade nitrogen.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-cream-100">Daily In-House Milling</h3>
                <p className="text-xs text-cream-200/70 mt-1">Whole cumin and spices ground fresh daily in Raniganj.</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-gold/30 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-heritageRed hover:bg-heritageRed-hover text-cream-50 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-heritageRed/30"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/why-choose-taja"
              className="px-6 py-3 rounded-full bg-cream-50/10 hover:bg-cream-50/20 text-cream-100 font-bold text-xs uppercase tracking-widest transition-all border border-gold/40"
            >
              The 5 Differentiators
            </Link>
            <Link
              href="/contact-us"
              className="px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-navy-950 font-bold text-xs uppercase tracking-widest transition-all ml-auto"
            >
              Distributor Inquiry
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
