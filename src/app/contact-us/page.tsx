import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/sections/FooterSection";
import ContactSplitSection from "@/components/sections/ContactSplitSection";

export const metadata: Metadata = {
  title: "Contact & Wholesale Distributor Portal | Taja Chanachur Raniganj",
  description:
    "Get in touch with R.R. Food Products in Raniganj, West Bengal. Direct consumer feedback, retail inquiries, and B2B bulk dealership opportunities across Eastern India.",
  keywords: [
    "Contact Taja Chanachur",
    "R.R. Food Products Raniganj phone number",
    "Chanachur dealership West Bengal",
    "Wholesale snacks distributor contact Kolkata",
    "Snack factory address Raniganj",
  ],
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactUsPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact R.R. Food Products & Taja Chanachur",
    description:
      "Consumer feedback desk and B2B wholesale distributor application portal for Taja Chanachur.",
    url: "https://tajachanachur.com/contact-us",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "R.R. Food Products",
      telephone: "+91 94340 00000",
      email: "feedback@tajachanachur.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Raniganj",
        addressLocality: "Raniganj, Paschim Bardhaman",
        addressRegion: "West Bengal",
        postalCode: "713347",
        addressCountry: "IN",
      },
    },
  };

  return (
    <div className="min-h-screen bg-cream-100 text-espresso-900 flex flex-col justify-between selection:bg-gold selection:text-espresso-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <Header />

      <main className="pt-24 sm:pt-28 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-wider text-gold-dark flex items-center gap-2">
            <Link href="/" className="hover:text-heritageRed transition-colors">Home</Link>
            <span>/</span>
            <span className="text-espresso-700">Contact & Wholesale Portal</span>
          </nav>
        </div>

        <ContactSplitSection />
      </main>

      <FooterSection />
    </div>
  );
}
