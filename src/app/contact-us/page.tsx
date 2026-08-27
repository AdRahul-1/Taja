import React from "react";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/sections/FooterSection";
import ContactSplitSection from "@/components/sections/ContactSplitSection";

export const metadata: Metadata = {
  title: "Contact & Distributor Portal | Taja Chanachur",
  description:
    "Direct consumer feedback, retail queries, and B2B bulk distributor partnerships with R.R. Food Products in Raniganj, West Bengal.",
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <div className="bg-navy-900 text-cream-50 min-h-screen">
      <Header />
      <div className="pt-20">
        <ContactSplitSection />
      </div>
      <FooterSection />
    </div>
  );
}
