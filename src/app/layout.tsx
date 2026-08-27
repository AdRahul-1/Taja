import type { Metadata } from "next";
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
    default: "Taja Chanachur | Authentic Bengali Tea-Time Snacks (Since 2009)",
    template: "%s | Taja Chanachur",
  },
  description:
    "Hand-blended in small brass kadai batches in Raniganj, West Bengal by R.R. Food Products. Discover authentic Bengali chanachur, roasted Bengal peanuts, crisp sev, and tea-time snacks.",
  keywords: [
    "Taja Chanachur",
    "Bengali Chanachur",
    "Tea Time Snacks",
    "Raniganj snacks",
    "Special Jhal Chanachur",
    "Tak Jhal Misti Chanachur",
    "R.R. Food Products",
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
    url: "https://tajachanachur.com",
    siteName: "Taja Chanachur",
    title: "Taja Chanachur | Authentic Bengali Tea-Time Snacks (Since 2009)",
    description:
      "Hand-blended in small brass kadai batches in Raniganj, West Bengal by R.R. Food Products since 2009. Crispy golden sev, slow-roasted peanuts, and pure heritage spices.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Taja Chanachur - Handcrafted Bengali Tea Time Snacks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taja Chanachur | Authentic Bengali Tea-Time Snacks",
    description:
      "Hand-blended in small brass kadai batches in Raniganj, West Bengal. Crisp golden sev and slow-roasted Bengal peanuts.",
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
      "@id": "https://tajachanachur.com/#organization",
      name: "R.R. Food Products",
      alternateName: ["Taja Chanachur", "RR Food Products Raniganj"],
      url: "https://tajachanachur.com",
      logo: {
        "@type": "ImageObject",
        url: "https://tajachanachur.com/rr_logo.png",
        width: 227,
        height: 243,
        caption: "R.R. Food Products Seal",
      },
      image: "https://tajachanachur.com/og-image.jpg",
      description:
        "R.R. Food Products crafts authentic Taja Chanachur and traditional tea-time snacks in Raniganj, West Bengal since 2009. FSSAI Lic. No. 12821013000000.",
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
        name: "Taja Chanachur",
        url: "https://tajachanachur.com",
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
        url: "https://tajachanachur.com/#contact",
        availableLanguage: ["en", "bn", "hi"],
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61558675132758",
        "https://www.instagram.com/new_taja/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://tajachanachur.com/#website",
      url: "https://tajachanachur.com",
      name: "Taja Chanachur",
      alternateName: "R.R. Food Products",
      description:
        "Authentic handcrafted Bengali chanachur and tea-time snacks since 2009.",
      publisher: {
        "@id": "https://tajachanachur.com/#organization",
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
      <body className="bg-navy-900 text-cream-50 font-sans antialiased selection:bg-gold selection:text-navy-900">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
