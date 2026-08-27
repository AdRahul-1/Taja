import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Leaf, Sparkles, ShieldCheck, HeartHandshake, HelpCircle, Check, X } from "lucide-react";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Why Bengal Chooses Taja | 5 Pillars of the Taja Difference",
  description:
    "Discover why Bengal reaches for Taja Chanachur every evening. Small brass kadai roasting, pure heritage spices, mustard oil crispness, and zero trans-fat nitrogen lock by R.R. Food Products.",
  keywords: [
    "Why Choose Taja Chanachur",
    "Taja Chanachur difference",
    "Best chanachur in West Bengal",
    "Handmade kadai chanachur vs factory",
    "Healthy vegetarian tea time snacks",
    "Authentic Bengali adda chanachur",
  ],
  alternates: {
    canonical: "/why-choose-taja",
  },
};

const FAQS = [
  {
    q: "What makes Taja Chanachur different from commercial factory snacks?",
    a: "Unlike mass-produced snacks made in automated extrusion plants using palm oil and artificial flavor enhancers, Taja Chanachur is handcrafted in small 25kg brass kadais in Raniganj, West Bengal. We use whole roasted cumin, pure rock salt, and authentic spices ground daily in-house.",
  },
  {
    q: "Is Taja Chanachur 100% vegetarian and FSSAI certified?",
    a: "Yes. Taja Chanachur is manufactured in a certified 100% vegetarian facility under statutory FSSAI License No. 12821013000000, adhering strictly to food safety and hygiene regulations.",
  },
  {
    q: "How does Taja keep its crunch fresh without artificial preservatives?",
    a: "We pack every batch immediately upon roasting under food-grade multi-layer nitrogen barrier foils. This locks out oxygen and moisture, preserving the heirloom crunch for up to 90 days completely naturally.",
  },
  {
    q: "Where is Taja Chanachur manufactured?",
    a: "Taja Chanachur is manufactured and packaged exclusively by R.R. Food Products at our traditional kitchen facility in Raniganj, Paschim Bardhaman, West Bengal.",
  },
  {
    q: "What pack sizes are available for retail and wholesale?",
    a: "We offer ₹10 Pocket Buddy (50g), ₹35 Big Brother (150g), and ₹90 Family Celebration (350g) retail packs, as well as 1kg and 5kg bulk cases for wholesale tea stalls and distributors.",
  },
];

export default function WhyChooseTajaPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-cream-100 text-espresso-900 flex flex-col justify-between selection:bg-gold selection:text-espresso-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full flex-1">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold uppercase tracking-wider text-gold-dark flex items-center gap-2">
          <Link href="/" className="hover:text-heritageRed transition-colors">Home</Link>
          <span>/</span>
          <span className="text-espresso-700">The Taja Difference</span>
        </nav>

        {/* Hero Display Header */}
        <section className="max-w-4xl mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE 5 PILLARS OF AUTHENTICITY</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-espresso-900 leading-[1.1]">
            Why Bengal Reaches for <br />
            <span className="text-heritageRed italic font-normal">Taja Every Single Evening.</span>
          </h1>

          <p className="font-bengaliDisplay text-espresso-700 text-xl sm:text-2xl font-medium">
            কেন তাজা চানাচুর বাংলার প্রতিটি চায়ের আড্ডার অবিচ্ছেদ্য অংশ?
          </p>

          <p className="text-base sm:text-lg text-espresso-800 leading-relaxed font-normal max-w-3xl">
            In an era where most snack brands cut corners with synthetic flavor powders and automated 
            mass extruders, R.R. Food Products continues to uphold five uncompromising pillars of 
            traditional Bengali craftsmanship.
          </p>
        </section>

        {/* The 5 Pillars Detailed Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {/* Pillar 01 */}
          <div className="p-8 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-3xl font-bold text-gold-dark/60">01</span>
              <h2 className="font-serif text-2xl font-bold text-espresso-900">
                Small Kadai Batches
              </h2>
              <span className="font-bengaliDisplay text-sm text-heritageRed font-semibold block">
                হাতে তৈরি ছোট কড়াই ব্যাচ
              </span>
              <p className="text-sm text-espresso-800 leading-relaxed font-normal">
                Never mass-extruded in multi-ton factories. Every single batch is roasted and hand-tossed 
                in 25kg traditional brass kadais for uniform spice infusion and delicate heirloom crunch.
              </p>
            </div>
            <div className="pt-4 border-t border-gold/20 text-xs font-bold text-gold-dark">
              ✓ 100% Flame Roasted by Artisans
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="p-8 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-3xl font-bold text-gold-dark/60">02</span>
              <h2 className="font-serif text-2xl font-bold text-espresso-900">
                Pure Heritage Spices
              </h2>
              <span className="font-bengaliDisplay text-sm text-heritageRed font-semibold block">
                খাঁটি মশলার নিজস্ব ঐতিহ্য
              </span>
              <p className="text-sm text-espresso-800 leading-relaxed font-normal">
                Whole cumin, rock salt, and sun-dried Guntur chillies ground fresh daily in-house in 
                Raniganj. No synthetic taste enhancers, MSG, or artificial coloring agents.
              </p>
            </div>
            <div className="pt-4 border-t border-gold/20 text-xs font-bold text-gold-dark">
              ✓ Ground Fresh Daily in Raniganj
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="p-8 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-3xl font-bold text-gold-dark/60">03</span>
              <h2 className="font-serif text-2xl font-bold text-espresso-900">
                Mustard Oil Crispness
              </h2>
              <span className="font-bengaliDisplay text-sm text-heritageRed font-semibold block">
                সরিষার তেলের খাস্তা স্বাদ
              </span>
              <p className="text-sm text-espresso-800 leading-relaxed font-normal">
                Fried to a delicate golden crisp in pure edible oil, delivering the authentic pungent 
                warmth beloved across Bengal’s street-side tea stalls and family gatherings.
              </p>
            </div>
            <div className="pt-4 border-t border-gold/20 text-xs font-bold text-gold-dark">
              ✓ Authentic Pungent Bengali Warmth
            </div>
          </div>

          {/* Pillar 04 */}
          <div className="p-8 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-3xl font-bold text-gold-dark/60">04</span>
              <h2 className="font-serif text-2xl font-bold text-espresso-900">
                Zero Trans-Fat Nitrogen Lock
              </h2>
              <span className="font-bengaliDisplay text-sm text-heritageRed font-semibold block">
                এয়ারটাইট নাইট্রোজেন ফ্রেশনেস
              </span>
              <p className="text-sm text-espresso-800 leading-relaxed font-normal">
                Packed immediately under multi-layer food-grade nitrogen barrier foils to lock in crunch 
                and aroma for 90 days without requiring chemical preservatives or additives.
              </p>
            </div>
            <div className="pt-4 border-t border-gold/20 text-xs font-bold text-gold-dark">
              ✓ 90-Day Freshness Guarantee
            </div>
          </div>

          {/* Pillar 05 */}
          <div className="p-8 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-lg space-y-4 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div className="space-y-3">
              <span className="font-serif text-3xl font-bold text-gold-dark/60">05</span>
              <h2 className="font-serif text-2xl font-bold text-espresso-900">
                The Sacred Evening Tea Ritual
              </h2>
              <span className="font-bengaliDisplay text-sm text-heritageRed font-semibold block">
                সন্ধ্যার আড্ডার চিরন্তন সঙ্গী
              </span>
              <p className="text-sm text-espresso-800 leading-relaxed font-normal max-w-2xl">
                The undisputed centerpiece of Bengali adda. Perfectly paired with steaming earthen clay 
                cups (bhar) of ginger chai, lively political discussions, family stories, and sunset memories.
              </p>
            </div>
            <div className="pt-4 border-t border-gold/20 text-xs font-bold text-heritageRed">
              ★ The Heartbeat of Bengali Adda Culture
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison Table */}
        <section className="mb-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              HONEST COMPARISON
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900">
              Commercial Factory Snacks vs. Taja Handcrafted
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border-2 border-gold/40 bg-cream-50/95 shadow-xl">
            <table className="w-full text-left text-sm text-espresso-900 border-collapse">
              <thead>
                <tr className="bg-navy-950 text-cream-50 border-b border-gold/40">
                  <th className="py-4 px-6 font-serif text-base">Key Feature</th>
                  <th className="py-4 px-6 font-serif text-base text-gold">Taja Handcrafted Chanachur</th>
                  <th className="py-4 px-6 font-serif text-base text-cream-200/60">Commercial Factory Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/20">
                <tr className="hover:bg-cream-100/50 transition-colors">
                  <td className="py-4 px-6 font-bold">Roasting Method</td>
                  <td className="py-4 px-6 text-emerald-800 font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Traditional Brass Kadai Hand-Tossed
                  </td>
                  <td className="py-4 px-6 text-espresso-600 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500 shrink-0" />
                    Mass Industrial Hot-Air Conveyors
                  </td>
                </tr>

                <tr className="hover:bg-cream-100/50 transition-colors">
                  <td className="py-4 px-6 font-bold">Spice Sourcing</td>
                  <td className="py-4 px-6 text-emerald-800 font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Whole Guntur chillies & cumin ground daily
                  </td>
                  <td className="py-4 px-6 text-espresso-600 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500 shrink-0" />
                    Pre-mixed synthetic chemical powders & MSG
                  </td>
                </tr>

                <tr className="hover:bg-cream-100/50 transition-colors">
                  <td className="py-4 px-6 font-bold">Preservatives & Shelf Life</td>
                  <td className="py-4 px-6 text-emerald-800 font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Zero chemicals; sealed under 100% nitrogen
                  </td>
                  <td className="py-4 px-6 text-espresso-600 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500 shrink-0" />
                    Chemical preservatives (BHA / TBHQ)
                  </td>
                </tr>

                <tr className="hover:bg-cream-100/50 transition-colors">
                  <td className="py-4 px-6 font-bold">Vegetarian Certification</td>
                  <td className="py-4 px-6 text-emerald-800 font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    100% Pure Vegetarian FSSAI Certified
                  </td>
                  <td className="py-4 px-6 text-espresso-600">Standard Commercial Lines</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Frequently Asked Questions (FAQ) */}
        <section className="mb-24 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-espresso-700">
              Everything you need to know about our ingredients, manufacturing, and distribution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-cream-50/95 border border-gold/40 shadow-sm space-y-3"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                  <h3 className="font-serif text-lg font-bold text-espresso-900 leading-snug">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-espresso-800 leading-relaxed font-normal pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="rounded-3xl bg-navy-950 text-cream-50 p-8 sm:p-12 border-2 border-gold/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-cream-50">Ready to Taste the Kadai Difference?</h2>
            <p className="text-xs text-cream-200/70">Discover our full product range or partner with our Raniganj kitchen.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-heritageRed hover:bg-heritageRed-hover text-cream-50 font-bold text-xs uppercase tracking-widest transition-all"
            >
              View Products
            </Link>
            <Link
              href="/contact-us"
              className="px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-navy-950 font-bold text-xs uppercase tracking-widest transition-all"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
