import React from "react";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/sections/FooterSection";
import StorySection from "@/components/sections/StorySection";
import WhyTajaSection from "@/components/sections/WhyTajaSection";

export const metadata: Metadata = {
  title: "About Our Heritage | R.R. Food Products & Taja Chanachur",
  description:
    "Learn about R.R. Food Products, crafting authentic Bengali tea-time snacks and Taja Chanachur in Raniganj, West Bengal since 2009. FSSAI Lic. No. 12821013000000.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <div className="bg-navy-900 text-cream-50 min-h-screen">
      <Header />
      <div className="pt-20">
        <StorySection />
        <WhyTajaSection />
      </div>
      <FooterSection />
    </div>
  );
}
