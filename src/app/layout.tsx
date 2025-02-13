import type { Metadata } from "next";
import "./globals.css";
import { Kalnia } from "next/font/google";
import Main from "./Main";
const kalnia = Kalnia({ subsets: ["latin"] });
import { Inter } from "next/font/google";

const jockeyOne = Inter({ subsets: ["latin"], weight: "400" });
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
	title: "R.R. Food Products | Premium Chanachur & Authentic Tea Time Snacks",
	description:
		"Discover R.R. Food Products, the home of premium, crispy chanachur and delicious tea-time snacks from Raniganj, West Bengal. Made with high-quality ingredients, our snacks bring authentic flavors to your plate.",

	icons: {
		icon: "/favicon.ico",
	},
	keywords: [
		"New Taja Chanachur",
		"Taja Chanachur Raniganj",
		"R.R. Food Products Raniganj",
		"R.R. Foods Raniganj",
		"Chanachur from Raniganj",
		"Snack brands Raniganj",
		"Best snacks West Bengal",
		"Authentic Chanachur",
		"Tea time snacks West Bengal",
		"Indian snacks online",
		"Healthy crispy snacks",
		"Delicious tea-time snacks",
		"Buy snacks online India",
		"Best chanachur West Bengal",
		"Traditional Indian snacks",
		"Crispy chanachur West Bengal",
		"Order snacks online Raniganj",
		"Tasty tea snacks India",
		"Taja Chanachur online",
		"Raniganj tea snacks",
		"Authentic Indian chanachur",
		"Taja"
	],
	openGraph: {
		title: "R.R. Food Products | Premium Chanachur & Authentic Tea Time Snacks",
		description:
			"R.R. Food Products offers high-quality chanachur and tea-time snacks from Raniganj, West Bengal. Perfect for every occasion, our snacks combine tradition and flavor. Shop online for the authentic taste of Indian snacks!",
		url: "https://www.rrfoodproducts.com",
		type: "website",
		images: [
			{
				url: "https://firebasestorage.googleapis.com/v0/b/aspirants-b1e24.appspot.com/o/icon%2Ffavicon.ico?alt=media&token=97997e1a-f711-4401-b834-7cfff6a224e6",
				width: 1200,
				height: 630,
				alt: "R.R. Food Products Logo",
			},
		],
		locale: "en_IN",
	},
	robots: {
		index: true,
		follow: true,
	},
	twitter: {
		card: "summary_large_image",
		site: "@RRFoodProducts",
		title: "Authentic Chanachur & Tea Snacks from R.R. Food Products",
		description:
			"Savor the finest crispy chanachur and tea-time snacks from R.R. Food Products, Raniganj, West Bengal. Authentic Indian flavors crafted with care.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${kalnia.className}`}>
				<h1 className="hidden">Taja chanachur(RR FOOD PRODUCTS)</h1>
				<div className={`${jockeyOne.className}`}>
					<Toaster />
				</div>
				<Main>{children}</Main>
			</body>
		</html>
	);
}
