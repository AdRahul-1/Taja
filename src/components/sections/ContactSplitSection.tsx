"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { gsap, GSAP_TIMING } from "@/lib/gsapConfig";
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

// 2. Streamlined Distributor Form Schema (Combined Location & Lean Fields)
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
      // Quiet settle animation on scroll entrance (0.8s, brandEase)
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: GSAP_TIMING.section.duration,
          ease: GSAP_TIMING.section.ease,
          stagger: 0.1,
          scrollTrigger: {
            trigger: "#contact",
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Consumer Submit Handler
  const onConsumerSubmit = async (values: ConsumerFormValues) => {
    setConsumerSubmitting(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast({
        title: "Feedback Received!",
        description: "Thank you for sharing your tea-time thoughts with Taja Chanachur.",
      });
      trackEvent({ name: "consumer_feedback_submitted" });
      resetConsumer();
    } catch (err) {
      toast({
        title: "Submission Error",
        description: "Could not send message. Please try again or reach out directly.",
        variant: "destructive",
      });
    } finally {
      setConsumerSubmitting(false);
    }
  };

  // Distributor Submit Handler
  const onDistributorSubmit = async (values: DistributorFormValues) => {
    setDistributorSubmitting(true);
    try {
      // Split location into city and state for API contract
      const [cityPart = "", statePart = ""] = values.location.split(",");

      const payload = {
        businessName: values.businessName,
        contactPerson: values.contactPerson,
        contactNo: values.contactNo,
        gstNumber: values.gstNumber,
        city: cityPart.trim() || values.location,
        state: statePart.trim() || "West Bengal",
        volumeTier: values.volumeTier,
        notes: values.notes || "",
        _hp_company_url: values._hp_company_url,
        _submission_start: submissionStartTime,
      };

      const res = await fetch("/api/distributor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      toast({
        title: "Distributor Inquiry Registered!",
        description: data.message || "Our sales team will contact you within 24 business hours.",
      });

      trackEvent({
        name: "distributor_inquiry_submitted",
        payload: { state: statePart.trim() || "West Bengal", volumeTier: values.volumeTier },
      });

      resetDistributor();
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err.message || "Failed to submit distributor inquiry.",
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
      className="relative bg-navy-900 text-cream-50 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-gold/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block"></span>
            <span>DIRECT CONNECT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Let’s Talk Snacks, <br />
            <span className="text-gold italic font-normal">Stories & Partnerships.</span>
          </h2>
          <p className="font-bengaliDisplay text-gold/90 text-lg sm:text-xl mt-3 font-medium">
            ভোক্তা মতামত ও পাইকারি ডিস্ট্রিবিউটর যোগাযোগ
          </p>
        </div>

        {/* 
          Rebalanced 2:1 Visual Weight: 
          Consumer Form (lg:col-span-8 ~67%) vs Distributor Form (lg:col-span-4 ~33%)
        */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Consumer Feedback & Retail (Primary 2:1 Weight) */}
          <div className="contact-card lg:col-span-8 bg-navy-950/85 rounded-3xl border border-gold/40 p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between opacity-100">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/20">
                <div className="p-2.5 rounded-xl bg-heritageRed/20 text-heritageRed border border-heritageRed/40">
                  <MessageSquare className="w-5 h-5 text-heritageRed" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cream-50">
                    Tell Us What You Think
                  </h3>
                  <p className="text-xs text-cream-100/70">
                    Consumer feedback, store availability queries, and greetings for our Raniganj kitchen.
                  </p>
                </div>
              </div>

              <form onSubmit={handleConsumerSubmit(onConsumerSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gold/90 block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      {...registerConsumer("name")}
                      placeholder="e.g. Anirban Roy"
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gold/30 text-cream-50 text-sm placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                    />
                    {consumerErrors.name && (
                      <p className="text-xs text-red-400 mt-1">{consumerErrors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gold/90 block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      {...registerConsumer("contactNo")}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gold/30 text-cream-50 text-sm placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                    />
                    {consumerErrors.contactNo && (
                      <p className="text-xs text-red-400 mt-1">{consumerErrors.contactNo.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gold/90 block mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      {...registerConsumer("email")}
                      type="email"
                      placeholder="yourname@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gold/30 text-cream-50 text-sm placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gold/90 block mb-1.5">
                      City / District *
                    </label>
                    <input
                      {...registerConsumer("city")}
                      placeholder="e.g. Asansol / Kolkata"
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gold/30 text-cream-50 text-sm placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                    />
                    {consumerErrors.city && (
                      <p className="text-xs text-red-400 mt-1">{consumerErrors.city.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gold/90 block mb-1.5">
                    Your Message / Review *
                  </label>
                  <textarea
                    {...registerConsumer("message")}
                    rows={4}
                    placeholder="Tell us about your favorite Taja packet, taste review, or local store availability..."
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gold/30 text-cream-50 text-sm placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                  />
                  {consumerErrors.message && (
                    <p className="text-xs text-red-400 mt-1">{consumerErrors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={consumerSubmitting}
                  className="w-full py-3.5 rounded-xl bg-heritageRed hover:bg-heritageRed-hover text-cream-50 font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg shadow-heritageRed/30 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{consumerSubmitting ? "Sending..." : "Submit Message"}</span>
                </button>
              </form>
            </div>

            {/* Direct Support Badges */}
            <div className="mt-8 pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4 text-xs text-cream-100/70">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>Customer Desk: +91 94340 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span>feedback@tajachanachur.com</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bulk & Distributor Enquiries (Compact Secondary B2B Weight) */}
          <div
            id="distributor-form"
            className="contact-card lg:col-span-4 bg-navy-950/95 rounded-3xl border border-gold/50 p-6 shadow-2xl backdrop-blur-md relative opacity-100"
          >
            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-gold/20">
              <div className="p-2 rounded-lg bg-gold/20 text-gold border border-gold/40">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
                  B2B WHOLESALE
                </span>
                <h3 className="font-serif text-lg font-bold text-cream-50 leading-tight">
                  Distributor Portal
                </h3>
              </div>
            </div>

            <p className="text-[11px] text-cream-100/75 mb-4 leading-relaxed">
              Direct wholesale plant dispatch across West Bengal, Jharkhand & Eastern India.
            </p>

            <form onSubmit={handleDistributorSubmit(onDistributorSubmit)} className="space-y-3">
              {/* Honeypot hidden input */}
              <input
                type="text"
                {...registerDistributor("_hp_company_url")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gold block mb-1">
                  Business / Agency Name *
                </label>
                <input
                  {...registerDistributor("businessName")}
                  placeholder="e.g. Maa Tara Traders"
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-gold/30 text-cream-50 text-xs placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                />
                {distributorErrors.businessName && (
                  <p className="text-[10px] text-red-400 mt-0.5">
                    {distributorErrors.businessName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gold block mb-1">
                  Contact Person *
                </label>
                <input
                  {...registerDistributor("contactPerson")}
                  placeholder="Partner / Proprietor"
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-gold/30 text-cream-50 text-xs placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                />
                {distributorErrors.contactPerson && (
                  <p className="text-[10px] text-red-400 mt-0.5">
                    {distributorErrors.contactPerson.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gold block mb-1">
                  Mobile Number *
                </label>
                <input
                  {...registerDistributor("contactNo")}
                  placeholder="10-digit mobile"
                  maxLength={10}
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-gold/30 text-cream-50 text-xs placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                />
                {distributorErrors.contactNo && (
                  <p className="text-[10px] text-red-400 mt-0.5">
                    {distributorErrors.contactNo.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gold block mb-1">
                  GSTIN (GST Number) *
                </label>
                <input
                  {...registerDistributor("gstNumber")}
                  placeholder="19AAAAA0000A1Z5"
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-gold/30 text-cream-50 text-xs font-mono placeholder:text-cream-100/30 focus:outline-none focus:border-gold uppercase"
                />
                {distributorErrors.gstNumber && (
                  <p className="text-[10px] text-red-400 mt-0.5">
                    {distributorErrors.gstNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gold block mb-1">
                  Location (City, State) *
                </label>
                <input
                  {...registerDistributor("location")}
                  placeholder="e.g. Raniganj, West Bengal"
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-gold/30 text-cream-50 text-xs placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                />
                {distributorErrors.location && (
                  <p className="text-[10px] text-red-400 mt-0.5">
                    {distributorErrors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gold block mb-1">
                  Anticipated Volume *
                </label>
                <select
                  {...registerDistributor("volumeTier")}
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-gold/30 text-cream-50 text-xs focus:outline-none focus:border-gold"
                >
                  <option value="TIER_1_50_CASES">50 – 100 Cases (Retailer)</option>
                  <option value="TIER_2_200_CASES">100 – 500 Cases (Wholesaler)</option>
                  <option value="TIER_3_SUPER_STOCKIST">500+ Cases (Super Stockist)</option>
                </select>
              </div>

              {/* Collapsible Additional Notes Drawer */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowOptionalNotes(!showOptionalNotes)}
                  className="text-[10px] text-gold/80 hover:text-gold flex items-center gap-1 font-semibold uppercase tracking-wider"
                >
                  <span>{showOptionalNotes ? "Hide Notes" : "+ Add Special Notes (Optional)"}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showOptionalNotes ? "rotate-180" : ""}`} />
                </button>
                {showOptionalNotes && (
                  <textarea
                    {...registerDistributor("notes")}
                    rows={2}
                    placeholder="Existing territory coverage, vehicle fleet, or queries..."
                    className="w-full mt-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-gold/30 text-cream-50 text-xs placeholder:text-cream-100/30 focus:outline-none focus:border-gold"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={distributorSubmitting}
                className="w-full mt-2 py-2.5 rounded-lg border border-gold bg-gold/15 hover:bg-gold hover:text-navy-950 text-gold font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{distributorSubmitting ? "Submitting..." : "Send B2B Enquiry"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
