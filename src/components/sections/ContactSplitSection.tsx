"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { gsap } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Building2, MessageSquare, Send, Phone, Mail, ChevronDown } from "lucide-react";

// 1. Consumer Form Schema
const ConsumerFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  contactNo: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit mobile number."),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  city: z.string().min(2, "City is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

// 2. Streamlined Distributor Form Schema
const DistributorFormSchema = z.object({
  businessName: z.string().min(3, "Business Name is required."),
  contactPerson: z.string().min(3, "Contact Person is required."),
  contactNo: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit mobile number."),
  gstNumber: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GSTIN format (e.g. 19ABCDE1234F1Z5)."
    ),
  location: z.string().min(3, "City, State is required."),
  volumeTier: z.enum([
    "TIER_1_50_CASES",
    "TIER_2_200_CASES",
    "TIER_3_SUPER_STOCKIST",
  ]),
  notes: z.string().optional().or(z.literal("")),
  _hp_company_url: z.string().optional(),
});

type ConsumerFormValues = z.infer<typeof ConsumerFormSchema>;
type DistributorFormValues = z.infer<typeof DistributorFormSchema>;

export default function ContactSplitSection() {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();
  const [consumerSubmitting, setConsumerSubmitting] = useState(false);
  const [distributorSubmitting, setDistributorSubmitting] = useState(false);
  const [showOptionalNotes, setShowOptionalNotes] = useState(false);
  const [submissionStartTime] = useState(Date.now());

  // Consumer Form
  const {
    register: registerConsumer,
    handleSubmit: handleConsumerSubmit,
    reset: resetConsumer,
    formState: { errors: consumerErrors },
  } = useForm<ConsumerFormValues>({
    resolver: zodResolver(ConsumerFormSchema),
  });

  // Distributor Form
  const {
    register: registerDistributor,
    handleSubmit: handleDistributorSubmit,
    reset: resetDistributor,
    formState: { errors: distributorErrors },
  } = useForm<DistributorFormValues>({
    resolver: zodResolver(DistributorFormSchema),
    defaultValues: {
      volumeTier: "TIER_1_50_CASES",
    },
  });

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Line mask-reveals on scroll for header elements (never hides/reverses prematurely)
      const lines = gsap.utils.toArray<HTMLElement>(".contact-line-reveal");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 2. Synchronized Cards Initial Reveal
      gsap.fromTo(
        ".contact-forms-grid",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-forms-grid",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Submission handler for Consumer form
  const onConsumerSubmit = async (data: ConsumerFormValues) => {
    setConsumerSubmitting(true);
    trackEvent({ name: "consumer_feedback_submitted", payload: { city: data.city } });

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "consumer",
          ...data,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast({
        title: "Message Sent! (বার্তা পাঠানো হয়েছে)",
        description: "Thank you for reaching out to Taja Chanachur. We will get back to you soon!",
        variant: "default",
      });
      resetConsumer();
    } catch (err) {
      toast({
        title: "Submission Error",
        description: "Could not send your feedback. Please call our customer desk.",
        variant: "destructive",
      });
    } finally {
      setConsumerSubmitting(false);
    }
  };

  // Submission handler for Distributor inquiry
  const onDistributorSubmit = async (data: DistributorFormValues) => {
    // Bot defense: Honeypot check
    if (data._hp_company_url && data._hp_company_url.length > 0) {
      return;
    }

    // Bot defense: Minimum human interaction time (2.5s)
    const timeElapsed = (Date.now() - submissionStartTime) / 1000;
    if (timeElapsed < 2.5) {
      toast({
        title: "Submission Error",
        description: "Please take a moment to review before submitting.",
        variant: "destructive",
      });
      return;
    }

    setDistributorSubmitting(true);
    trackEvent({
      name: "distributor_inquiry_submitted",
      payload: { state: data.location, volumeTier: data.volumeTier },
    });

    try {
      const res = await fetch("/api/distributor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Inquiry submission failed");

      toast({
        title: "Inquiry Received! (আবেদন গৃহীত হয়েছে)",
        description: "Our regional trade manager for Raniganj will connect with you within 24 hours.",
        variant: "default",
      });
      resetDistributor();
      setShowOptionalNotes(false);
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: "Could not register your inquiry. Please call +91 94340 00000 directly.",
        variant: "destructive",
      });
    } finally {
      setDistributorSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-transparent text-espresso-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-gold/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Locomotive Scroll Speed & Exact Masked Line Reveal */}
        <div
          data-scroll
          data-scroll-speed="0.9"
          className="text-center max-w-3xl mx-auto mb-16 will-change-transform"
        >
          <div className="overflow-hidden">
            <div className="contact-line-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-200/90 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3 will-change-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-dark inline-block"></span>
              <span>DIRECT CONNECT</span>
            </div>
          </div>

          <div className="overflow-hidden pb-3">
            <h2 className="contact-line-reveal font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-espresso-900 leading-[1.12] pb-2 will-change-transform">
              Let’s Talk Snacks, <br />
              <span className="text-heritageRed italic font-normal inline-block pt-1 pb-1">Stories & Partnerships.</span>
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="contact-line-reveal font-bengaliDisplay text-espresso-700 text-lg sm:text-xl mt-3 font-medium will-change-transform">
              ভোক্তা মতামত ও পাইকারি ডিস্ট্রিবিউটর যোগাযোগ
            </p>
          </div>
        </div>

        {/* 
          100% Balanced & Level Forms Grid with Authentic Locomotive Scroll Parallax (data-scroll-speed="0.65")
        */}
        <div
          data-scroll
          data-scroll-speed="0.65"
          className="contact-forms-grid grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch will-change-transform"
        >
          {/* Left Column: Consumer Feedback & Retail (Warm Ivory Paper Card) */}
          <div className="lg:col-span-7 bg-cream-50/98 rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-xl backdrop-blur-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/30">
                <div className="p-2.5 rounded-xl bg-heritageRed/15 text-heritageRed border border-heritageRed/30 shrink-0">
                  <MessageSquare className="w-5 h-5 text-heritageRed" />
                </div>
                <div>
                  <div className="overflow-hidden pb-1">
                    <h3 className="contact-line-reveal font-serif text-2xl font-bold text-espresso-900 will-change-transform">
                      Tell Us What You Think
                    </h3>
                  </div>
                  <div className="overflow-hidden">
                    <p className="contact-line-reveal text-xs text-espresso-muted will-change-transform">
                      Consumer feedback, store availability queries, and greetings for our Raniganj kitchen.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConsumerSubmit(onConsumerSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso-900 mb-1">
                      Your Name *
                    </label>
                    <input
                      {...registerConsumer("name")}
                      placeholder="e.g. Anirban Roy"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/40 bg-cream-50 text-espresso-900 placeholder:text-espresso-muted/60 text-sm focus:outline-none focus:border-heritageRed focus:ring-1 focus:ring-heritageRed shadow-sm"
                    />
                    {consumerErrors.name && (
                      <p className="text-heritageRed text-xs mt-1">{consumerErrors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso-900 mb-1">
                      Phone Number *
                    </label>
                    <input
                      {...registerConsumer("contactNo")}
                      placeholder="10-digit mobile number"
                      type="tel"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/40 bg-cream-50 text-espresso-900 placeholder:text-espresso-muted/60 text-sm focus:outline-none focus:border-heritageRed focus:ring-1 focus:ring-heritageRed shadow-sm"
                    />
                    {consumerErrors.contactNo && (
                      <p className="text-heritageRed text-xs mt-1">{consumerErrors.contactNo.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso-900 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      {...registerConsumer("email")}
                      placeholder="yourname@gmail.com"
                      type="email"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/40 bg-cream-50 text-espresso-900 placeholder:text-espresso-muted/60 text-sm focus:outline-none focus:border-heritageRed focus:ring-1 focus:ring-heritageRed shadow-sm"
                    />
                    {consumerErrors.email && (
                      <p className="text-heritageRed text-xs mt-1">{consumerErrors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso-900 mb-1">
                      City / District *
                    </label>
                    <input
                      {...registerConsumer("city")}
                      placeholder="e.g. Asansol / Kolkata"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/40 bg-cream-50 text-espresso-900 placeholder:text-espresso-muted/60 text-sm focus:outline-none focus:border-heritageRed focus:ring-1 focus:ring-heritageRed shadow-sm"
                    />
                    {consumerErrors.city && (
                      <p className="text-heritageRed text-xs mt-1">{consumerErrors.city.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-espresso-900 mb-1">
                    Your Message / Review *
                  </label>
                  <textarea
                    {...registerConsumer("message")}
                    rows={4}
                    placeholder="Tell us about your favorite Taja packet, taste review, or local store availability..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/40 bg-cream-50 text-espresso-900 placeholder:text-espresso-muted/60 text-sm focus:outline-none focus:border-heritageRed focus:ring-1 focus:ring-heritageRed resize-none shadow-sm"
                  />
                  {consumerErrors.message && (
                    <p className="text-heritageRed text-xs mt-1">{consumerErrors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={consumerSubmitting}
                  className="w-full py-3.5 rounded-xl bg-heritageRed hover:bg-heritageRed-hover text-cream-50 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-heritageRed/25 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{consumerSubmitting ? "Submitting..." : "Submit"}</span>
                </button>
              </form>
            </div>

            {/* Direct Support Badges */}
            <div className="mt-8 pt-6 border-t border-gold/30 flex flex-wrap items-center justify-between gap-4 text-xs text-espresso-700">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-heritageRed" />
                <span className="font-medium">Customer Desk: +91 94340 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-heritageRed" />
                <span className="font-medium">feedback@tajachanachur.com</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bulk & Distributor Enquiries (Deep Midnight Navy Authority Card) */}
          <div
            id="distributor-form"
            className="lg:col-span-5 bg-navy-950 text-cream-50 rounded-3xl border-2 border-gold/50 p-6 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between h-full relative"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-gold/30">
                <div className="p-2.5 rounded-xl bg-gold/20 text-gold border border-gold/40 shrink-0">
                  <Building2 className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="overflow-hidden">
                    <span className="contact-line-reveal text-[10px] uppercase font-bold tracking-widest text-gold block will-change-transform">
                      B2B WHOLESALE
                    </span>
                  </div>
                  <div className="overflow-hidden pb-1">
                    <h3 className="contact-line-reveal font-serif text-2xl font-bold text-cream-50 leading-tight will-change-transform">
                      Distributor Portal
                    </h3>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden">
                <p className="contact-line-reveal text-xs text-cream-100/75 mb-4 leading-relaxed will-change-transform">
                  Direct wholesale plant dispatch across West Bengal, Jharkhand & Eastern India.
                </p>
              </div>

              <form onSubmit={handleDistributorSubmit(onDistributorSubmit)} className="space-y-3.5">
                {/* Honeypot hidden input */}
                <input
                  type="text"
                  {...registerDistributor("_hp_company_url")}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                      Business Name *
                    </label>
                    <input
                      {...registerDistributor("businessName")}
                      placeholder="Maa Tara Traders"
                      className="w-full px-3.5 py-2 rounded-xl border border-navy-700 bg-navy-900 text-cream-50 placeholder:text-cream-100/30 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    {distributorErrors.businessName && (
                      <p className="text-heritageRed text-[11px] mt-1">
                        {distributorErrors.businessName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                      Contact Person *
                    </label>
                    <input
                      {...registerDistributor("contactPerson")}
                      placeholder="Proprietor Name"
                      className="w-full px-3.5 py-2 rounded-xl border border-navy-700 bg-navy-900 text-cream-50 placeholder:text-cream-100/30 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    {distributorErrors.contactPerson && (
                      <p className="text-heritageRed text-[11px] mt-1">
                        {distributorErrors.contactPerson.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                      Mobile Number *
                    </label>
                    <input
                      {...registerDistributor("contactNo")}
                      placeholder="10-digit mobile"
                      type="tel"
                      className="w-full px-3.5 py-2 rounded-xl border border-navy-700 bg-navy-900 text-cream-50 placeholder:text-cream-100/30 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    {distributorErrors.contactNo && (
                      <p className="text-heritageRed text-[11px] mt-1">
                        {distributorErrors.contactNo.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                      GSTIN (GST Number) *
                    </label>
                    <input
                      {...registerDistributor("gstNumber")}
                      placeholder="19AAAAA0000A1Z5"
                      className="w-full px-3.5 py-2 rounded-xl border border-navy-700 bg-navy-900 text-cream-50 placeholder:text-cream-100/30 text-xs uppercase focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    {distributorErrors.gstNumber && (
                      <p className="text-heritageRed text-[11px] mt-1">
                        {distributorErrors.gstNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                    Location (City, State) *
                  </label>
                  <input
                    {...registerDistributor("location")}
                    placeholder="e.g. Raniganj, West Bengal"
                    className="w-full px-3.5 py-2 rounded-xl border border-navy-700 bg-navy-900 text-cream-50 placeholder:text-cream-100/30 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                  {distributorErrors.location && (
                    <p className="text-heritageRed text-[11px] mt-1">
                      {distributorErrors.location.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                    Anticipated Volume *
                  </label>
                  <select
                    {...registerDistributor("volumeTier")}
                    className="w-full px-3.5 py-2 rounded-xl border border-navy-700 bg-navy-900 text-cream-50 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold cursor-pointer"
                  >
                    <option value="TIER_1_50_CASES">50 – 100 Cases (Retailer)</option>
                    <option value="TIER_2_200_CASES">200 – 500 Cases (Distributor)</option>
                    <option value="TIER_3_SUPER_STOCKIST">500+ Cases (Super Stockist)</option>
                  </select>
                </div>

                {/* Collapsible Optional Field */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowOptionalNotes(!showOptionalNotes)}
                    className="text-[11px] text-gold/80 hover:text-gold flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                  >
                    <span>+ Add special notes (Optional)</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        showOptionalNotes ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {showOptionalNotes && (
                    <textarea
                      {...registerDistributor("notes")}
                      rows={2}
                      placeholder="Existing distribution routes, fleet capability, or questions..."
                      className="w-full mt-2 px-3.5 py-2 rounded-xl border border-navy-700 bg-navy-900 text-cream-50 placeholder:text-cream-100/30 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={distributorSubmitting}
                  className="w-full mt-2 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-navy-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-gold/20 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-navy-950" />
                  <span>{distributorSubmitting ? "Submitting..." : "Submit"}</span>
                </button>
              </form>
            </div>

            {/* Direct Support Badges */}
            <div className="mt-6 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4 text-xs text-cream-100/75">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span className="font-medium">Trade Desk: +91 94340 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span className="font-medium">b2b@tajachanachur.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
