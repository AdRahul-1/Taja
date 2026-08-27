"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Building2, PhoneCall } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface HeaderProps {
  onOpenDistributorModal?: () => void;
}

export default function Header({ onOpenDistributorModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Our Story", labelBn: "ইতিহাস", href: "#story" },
    { label: "Why Taja", labelBn: "কেন তাজা?", href: "#why-taja" },
    { label: "Ingredients", labelBn: "উপকরণ", href: "#ingredients" },
    { label: "The Shelf", labelBn: "প্রোডাক্টস", href: "#shelf" },
    { label: "Contact", labelBn: "যোগাযোগ", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-950/90 backdrop-blur-md border-b border-gold/20 py-3 shadow-lg"
          : "bg-gradient-to-b from-navy-950/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Bengali Companion */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            <Image
              src="/taja.webp"
              alt="Taja Chanachur Logo"
              width={80}
              height={80}
              priority
              className="object-contain w-full h-full drop-shadow-md group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-cream-50 group-hover:text-gold transition-colors leading-tight">
              TAJA CHANACHUR
            </span>
            <span className="font-bengaliDisplay text-xs text-gold/90 font-medium tracking-wide">
              খাঁটি সন্ধ্যার আড্ডা • ২০০৯ থেকে
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-cream-50/80 hover:text-gold transition-colors font-medium relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => {
              trackEvent({ name: "distributor_cta_clicked", payload: { source: "nav" } });
              if (onOpenDistributorModal) {
                onOpenDistributorModal();
              } else {
                const el = document.getElementById("distributor-form");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gold/50 text-gold text-xs font-semibold tracking-wider uppercase hover:bg-gold/10 transition-all shadow-sm"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Distributor Portal</span>
          </button>

          <Link
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-heritageRed text-cream-50 text-xs font-semibold tracking-wider uppercase hover:bg-heritageRed-hover transition-all shadow-md shadow-heritageRed/25"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-cream-50 hover:text-gold transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950/98 border-b border-gold/30 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium tracking-wider text-cream-50/90 hover:text-gold py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="font-bengaliDisplay text-xs text-gold/70">{link.labelBn}</span>
              </Link>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent({ name: "distributor_cta_clicked", payload: { source: "nav" } });
                const el = document.getElementById("distributor-form");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gold/60 text-gold text-xs font-semibold tracking-wider uppercase"
            >
              <Building2 className="w-4 h-4" />
              <span>Bulk & Distributor Enquiries</span>
            </button>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-heritageRed text-cream-50 text-xs font-semibold tracking-wider uppercase text-center"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
