import type { Metadata } from "next";
import "./globals.css";
import { Kalnia } from "next/font/google";
import Main from "./Main";
const kalnia = Kalnia({ subsets: ["latin"] });
import { Inter } from "next/font/google";

const jockeyOne = Inter({ subsets: ["latin"], weight: "400" });
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
	metadataBase: new URL("https://rrfoodproducts.com"),
	title: {
		default: "R.R. Food Products | Taja Chanachur & Tea Time Snacks",
		template: "%s | R.R. Food Products",
	},
	description:
		"R.R. Food Products makes crispy Taja Chanachur and authentic tea-time snacks from Raniganj, West Bengal. Discover delicious snacks made with quality ingredients.",
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
		siteName: "R.R. Food Products",
		title: "R.R. Food Products | Taja Chanachur & Tea Time Snacks",
		description:
			"R.R. Food Products makes crispy Taja Chanachur and authentic tea-time snacks from Raniganj, West Bengal. Discover delicious snacks made with quality ingredients.",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "R.R. Food Products - Taja Chanachur and Tea Time Snacks",
			},
		],
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
	twitter: {
		card: "summary_large_image",
		site: "@RRFoodProducts",
		title: "R.R. Food Products | Taja Chanachur & Tea Time Snacks",
		description:
			"R.R. Food Products makes crispy Taja Chanachur and authentic tea-time snacks from Raniganj, West Bengal. Discover delicious snacks made with quality ingredients.",
		images: ["/og-image.jpg"],
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": ["Organization", "FoodEstablishment"],
			"@id": "https://rrfoodproducts.com/#organization",
			name: "R.R. Food Products",
			alternateName: ["Taja Chanachur", "RR Food Products", "Taja"],
			url: "https://rrfoodproducts.com",
			logo: {
				"@type": "ImageObject",
				url: "https://rrfoodproducts.com/rr_logo.png",
				width: 227,
				height: 243,
				caption: "R.R. Food Products Logo",
			},
			image: "https://rrfoodproducts.com/og-image.jpg",
			description:
				"R.R. Food Products crafts crispy Taja Chanachur and authentic tea-time snacks from Raniganj, West Bengal since 2009.",
			foundingDate: "2009",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Raniganj",
				addressRegion: "West Bengal",
				addressCountry: "IN",
			},
			brand: {
				"@type": "Brand",
				name: "Taja Chanachur",
				url: "https://rrfoodproducts.com",
			},
			knowsAbout: [
				"Chanachur",
				"Bengali Chanachur",
				"Tea-Time Snacks",
				"Masala Chira",
				"Indian Snacks",
			],
			contactPoint: {
				"@type": "ContactPoint",
				contactType: "Customer Support & Inquiries",
				url: "https://rrfoodproducts.com/contact-us",
				availableLanguage: ["en", "bn", "hi"],
			},
			sameAs: [
				"https://www.facebook.com/profile.php?id=61558675132758",
				"https://www.instagram.com/new_taja/",
			],
		},
		{
			"@type": "WebSite",
			"@id": "https://rrfoodproducts.com/#website",
			url: "https://rrfoodproducts.com",
			name: "R.R. Food Products",
			alternateName: "Taja Chanachur",
			description:
				"Crispy Taja Chanachur and authentic tea-time snacks from Raniganj, West Bengal.",
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
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={`${kalnia.className} bg-background`}>
				<div className={`${jockeyOne.className}`}>
					<Toaster />
				</div>
				<Main>{children}</Main>
			</body>
		</html>
	);
}
