import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Fraunces, Tiro_Bangla, Noto_Sans_Bengali, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: "400",
  variable: "--font-tiro-bangla",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bangla",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tajachanachur.com"),
  title: {
    default: "Taja Chanachur | R.R. Food Products – Raniganj, West Bengal",
    template: "%s | Taja Chanachur – R.R. Food Products",
  },
  description:
    "Hand-blended in small brass kadai batches in Raniganj, West Bengal by R.R. Food Products. Discover authentic Bengali chanachur, roasted Bengal peanuts, crisp sev, and tea-time snacks.",
  keywords: [
    "Taja Chanachur",
    "R.R. Food Products",
    "rrfoodproducts.com",
    "tajachanachur.in",
    "tajachanachur.com",
    "Bengali Chanachur",
    "Tea Time Snacks",
    "Raniganj snacks manufacturer",
    "Special Jhal Chanachur",
    "Tak Jhal Misti Chanachur",
    "Masala Chira",
    "West Bengal authentic snacks",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rrfoodproducts.com",
    siteName: "Taja Chanachur | R.R. Food Products",
    title: "Taja Chanachur | R.R. Food Products – Raniganj",
    description:
      "Hand-blended in small brass kadai batches in Raniganj, West Bengal by R.R. Food Products since 2009. Official portal for rrfoodproducts.com and tajachanachur.in.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Taja Chanachur - Handcrafted Bengali Tea Time Snacks by R.R. Food Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taja Chanachur | R.R. Food Products – Raniganj",
    description:
      "Hand-blended in small brass kadai batches in Raniganj, West Bengal. Official portal for rrfoodproducts.com and tajachanachur.in.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const brandSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "FoodEstablishment"],
      "@id": "https://rrfoodproducts.com/#organization",
      name: "R.R. Food Products",
      alternateName: ["Taja Chanachur", "RR Food Products Raniganj", "New Taja Chanachur"],
      url: "https://rrfoodproducts.com",
      logo: {
        "@type": "ImageObject",
        url: "https://tajachanachur.com/rr_logo.png",
        width: 227,
        height: 243,
        caption: "R.R. Food Products Seal",
      },
      image: "https://tajachanachur.com/og-image.jpg",
      description:
        "R.R. Food Products is the manufacturer of Taja Chanachur and traditional Bengali tea-time snacks in Raniganj, West Bengal since 2009. FSSAI Lic. No. 12821013000000. Official domains: rrfoodproducts.com and tajachanachur.in.",
      foundingDate: "2009",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Raniganj",
        addressLocality: "Raniganj, Paschim Bardhaman",
        addressRegion: "West Bengal",
        postalCode: "713347",
        addressCountry: "IN",
      },
      brand: {
        "@type": "Brand",
        "@id": "https://tajachanachur.in/#brand",
        name: "Taja Chanachur",
        url: "https://tajachanachur.in",
        sameAs: [
          "https://rrfoodproducts.com",
          "https://tajachanachur.com",
          "https://rrfoodproducts.com/taja-chanachur",
        ],
      },
      knowsAbout: [
        "Chanachur",
        "Bengali Chanachur",
        "Special Jhal Chanachur",
        "Tak Jhal Misti",
        "Masala Chira",
        "Tea-Time Snacks",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support & Distributor Enquiries",
        url: "https://rrfoodproducts.com/contact-us",
        availableLanguage: ["en", "bn", "hi"],
      },
      sameAs: [
        "https://tajachanachur.in",
        "https://tajachanachur.com",
        "https://rrfoodproducts.com/taja-chanachur",
        "https://www.facebook.com/profile.php?id=61558675132758",
        "https://www.instagram.com/new_taja/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://rrfoodproducts.com/#website",
      url: "https://rrfoodproducts.com",
      name: "Taja Chanachur — R.R. Food Products",
      alternateName: ["Taja Chanachur Official", "tajachanachur.in", "rrfoodproducts.com"],
      description:
        "Official website for Taja Chanachur by R.R. Food Products (Raniganj, West Bengal). Accessible via rrfoodproducts.com and tajachanachur.in.",
      publisher: {
        "@id": "https://rrfoodproducts.com/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${tiroBangla.variable} ${notoSansBengali.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
        />
      </head>
      <body className="bg-cream-100 text-espresso-900 font-sans antialiased selection:bg-gold selection:text-espresso-900 relative min-h-screen">
        {/* Fixed Full-Viewport Warm Bengali Heritage Parchment Backdrop */}
        <div
          className="fixed inset-0 pointer-events-none -z-50 bg-gradient-to-b from-[#FDF9F2] via-[#FAF3E7] to-[#F4EADA]"
          aria-hidden="true"
        />

        {/* 
          CRAWLABLE SEMANTIC SEO ENGINE (sr-only: 100% visible to Googlebot / Search Crawlers, invisible in UI)
          Provides structured regional keywords, vernacular Bengali terms, product catalog index, and FSSAI credentials.
        */}
        <div className="sr-only" aria-hidden="false">
          <header>
            <h1>Taja Chanachur | Authentic Handcrafted Bengali Tea-Time Snacks by R.R. Food Products Since 2009</h1>
            <p>
              Manufactured with pride in Raniganj, West Bengal (FSSAI Lic. No. 12821013000000). 
              Crafted in small brass kadai batches with 100% pure roasted Bengal peanuts, crisp sev ribbons, 
              stone-ground heritage spices, and sealed under food-grade zero trans-fat nitrogen barrier foils.
            </p>
          </header>

          <nav aria-label="Sitemap Quick Index">
            <h2>Site Navigation & Product Catalog</h2>
            <ul>
              <li><Link href="/">Taja Chanachur Official Home</Link></li>
              <li><Link href="/taja-chanachur">Taja Chanachur — A Brand of R.R. Food Products Official Brand Hub</Link></li>
              <li><Link href="/about-us">About R.R. Food Products Heritage & Raniganj Kitchen History</Link></li>
              <li><Link href="/products">All Taja Chanachur Products, Pack Sizes & Prices</Link></li>
              <li><Link href="/why-choose-taja">Why Bengal Chooses Taja — The 5 Differentiators</Link></li>
              <li><Link href="/contact-us">Customer Feedback & Wholesale B2B Distributor Portal</Link></li>
            </ul>
          </nav>

          <section>
            <h2>Signature Product Blends & Packaging Variants</h2>
            <article>
              <h3>Taja Special Jhal Chanachur (তাজা স্পেশাল ঝাল চানাচুর)</h3>
              <p>
                Fiery, pungent, and heirloom-roasted Bengal chanachur blended with sun-dried Guntur chillies, 
                mustard oil crispness, black rock salt, and whole roasted cumin. Available in ₹10 Pocket Buddy (50g), 
                ₹35 Big Brother (150g), and ₹90 Family Adda Celebration (350g) nitrogen barrier packs.
              </p>
            </article>

            <article>
              <h3>Taja Tak Jhal Misti Chanachur (তাজা টক ঝাল মিষ্টি চানাচুর)</h3>
              <p>
                Sweet, tangy, and mildly spiced balanced harmony snack. Crisp besan boondi, golden sev, 
                and aromatic spices perfect for family evening tea rituals across West Bengal and Jharkhand.
              </p>
            </article>

            <article>
              <h3>Taja Masala Chira & Roasted Peanuts (মসলা চিঁড়ে ও ভাজা বাদাম)</h3>
              <p>
                Crunchy roasted beaten rice flakes tossed with turmeric, mustard oil, curry leaves, and crunchy peanuts.
              </p>
            </article>
          </section>

          <section>
            <h2>Multi-Domain Official Brand & Corporate Portal</h2>
            <p>
              This website serves as the unified official portal for both <strong>rrfoodproducts.com</strong> (corporate manufacturer) 
              and <strong>tajachanachur.in</strong> (consumer brand hub). Manufactured exclusively by R.R. Food Products 
              in Raniganj, Paschim Bardhaman, West Bengal (FSSAI Lic. No. 12821013000000).
            </p>
          </section>

          <section>
            <h2>Regional Distribution & Wholesale Supply Locations</h2>
            <p>
              Supplying retail shops, distributors, and tea stalls across Raniganj, Asansol, Durgapur, 
              Bardhaman, Bankura, Purulia, Kolkata, Howrah, Hooghly, Dhanbad, Bokaro, Ranchi, and Eastern India.
            </p>
            <p>
              বাংলা কিওয়ার্ড: তাজা চানাচুর, খাঁটি রানিগঞ্জ চানাচুর, ঝাল চানাচুর, সন্ধ্যার আড্ডা, আর আর ফুড প্রোডাক্টস, 
              হাতে তৈরি চানাচুর, পাইকারি ডিস্ট্রিবিউটর যোগাযোগ পশ্চিমবঙ্গ।
            </p>
          </section>
        </div>

        <Toaster />
        {children}
      </body>
    </html>
  );
}
