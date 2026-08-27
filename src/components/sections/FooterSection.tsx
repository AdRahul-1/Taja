"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, ShieldCheck, MapPin, Phone, Mail, Award } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="relative z-40 pointer-events-auto bg-navy-950 text-cream-50 pt-16 pb-12 px-4 sm:px-6 lg:px-12 border-t-2 border-gold/40">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-gold/20">
          {/* Brand & Credential Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/taja.webp"
                  alt="Taja Chanachur"
                  width={60}
                  height={60}
                  className="object-contain w-full h-full pointer-events-none select-none"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-cream-50 block leading-tight">
                  TAJA CHANACHUR
                </span>
                <span className="font-bengaliDisplay text-xs text-gold font-medium">
                  সন্ধ্যার খাঁটি চানাচুর • ২০০৯ থেকে
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-100/75 leading-relaxed">
              Crafted with authentic tradition in Raniganj,Paschim Bardhaman, West Bengal by R.R. Food Products.
              Slow-roasted in brass kadais to deliver the golden crunch of Bengal tea-time.
            </p>

            {/* Manufacturer Seal */}
            <div className="p-3 rounded-xl bg-navy-900/90 border border-gold/30 flex items-center gap-3">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="/rr_logo.png"
                  alt="R.R. Food Products"
                  width={40}
                  height={40}
                  className="object-contain pointer-events-none select-none"
                />
              </div>
              <div className="text-xs">
                <span className="font-bold text-gold block">Manufactured by R.R. Food Products</span>
                <span className="text-[11px] text-cream-100/60">Raniganj, Paschim Bardhaman, WB</span>
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-gold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-cream-100/80">
              <li>
                <Link href="#hero" className="hover:text-gold transition-colors inline-block py-0.5 cursor-pointer">
                  Flagship Stage
                </Link>
              </li>
              <li>
                <Link href="#story" className="hover:text-gold transition-colors inline-block py-0.5 cursor-pointer">
                  The Maker&apos;s Story
                </Link>
              </li>
              <li>
                <Link href="#why-taja" className="hover:text-gold transition-colors inline-block py-0.5 cursor-pointer">
                  Why Taja
                </Link>
              </li>
              <li>
                <Link href="#ingredients" className="hover:text-gold transition-colors inline-block py-0.5 cursor-pointer">
                  Authentic Ingredients
                </Link>
              </li>
              <li>
                <Link href="#shelf" className="hover:text-gold transition-colors inline-block py-0.5 cursor-pointer">
                  The Complete Shelf
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-gold transition-colors inline-block py-0.5 cursor-pointer">
                  Distributor Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Product SKUs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-gold">
              Signature Flavors
            </h4>
            <ul className="space-y-2 text-xs text-cream-100/80">
              <li className="flex items-center justify-between">
                <span>Special Jhal (₹10 / ₹35 / ₹90)</span>
                <span className="font-bengaliDisplay text-gold/80">স্পেশাল ঝাল</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tak Jhal Misti (₹10 / ₹35 / ₹90)</span>
                <span className="font-bengaliDisplay text-gold/80">টক ঝাল মিষ্টি</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Family Pack (400gm)</span>
                <span className="font-bengaliDisplay text-gold/80">ফ্যামিলি প্যাক</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Jumbo Master Pack (500gm)</span>
                <span className="font-bengaliDisplay text-gold/80">জাম্বো প্যাক</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Special Masala Chira</span>
                <span className="font-bengaliDisplay text-gold/80">মশলা চিঁড়ে</span>
              </li>
            </ul>
          </div>

          {/* Statutory Compliance & Address (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-gold">
              Statutory Compliance
            </h4>
            <div className="p-3.5 rounded-xl bg-navy-900 border border-gold/40 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="font-bold text-xs text-cream-50">FSSAI Certified</span>
              </div>
              <p className="text-[11px] font-mono text-gold bg-navy-950 px-2 py-1 rounded border border-gold/20 select-all">
                Lic. No. 12821013000000
              </p>
              <p className="text-[10px] text-cream-100/60 leading-tight">
                Food Safety and Standards Authority of India (FSSAI) compliance standards strictly maintained.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-cream-100/70">Connect:</span>
              <Link
                href="https://www.instagram.com/new_taja/"
                target="_blank"
                className="p-2 rounded-full bg-navy-900 border border-gold/30 text-gold hover:bg-gold hover:text-navy-950 transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61558675132758"
                target="_blank"
                className="p-2 rounded-full bg-navy-900 border border-gold/30 text-gold hover:bg-gold hover:text-navy-950 transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-100/60 text-center sm:text-left">
          <p>© {new Date().getFullYear()} R.R. Food Products • All Rights Reserved. Taja Chanachur™</p>
          <div className="flex items-center gap-6">
            <span className="font-bengaliDisplay text-gold text-xs">
              খাঁটি স্বাদে বাংলার চা-টাইম
            </span>
            <span>Made with pride in Raniganj, West Bengal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
