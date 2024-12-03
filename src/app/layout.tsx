import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import { Kalnia, Jockey_One, Inria_Sans } from "next/font/google";
import Main from "./Main";

const kalnia = Kalnia({ subsets: ["latin"] });
const jockeyOne = Jockey_One({ subsets: ["latin"], weight: "400" });
const inriaSans = Inria_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title:
		"R.R. Food Products | Delicious Chanachur & Tea Time Snacks from Raniganj, West Bengal",
	description:
		"R.R. Food Products offers premium, crunchy chanachur and a variety of tea-time snacks made with love and high-quality ingredients. Based in Raniganj, West Bengal, our snacks are perfect for every occasion. Shop now for authentic, flavorful chanachur!",
	icons: {
		icon: "/favicon.ico",
	},
	keywords: [
		"chanachur",
		"tea time snacks",
		"snacks for tea",
		"R.R. Food Products",
		"healthy snacks",
		"Indian snacks",
		"Raniganj snacks",
		"authentic chanachur",
		"crispy snacks",
		"snacks from West Bengal",
		"buy chanachur online",
		"delicious chanachur",
		"crispy Indian snacks",
		"rrfoodproducts",
		"rrfood",
		"tajachanachur",
		"newtaja",
		"newtajachanachur",
		"taja",
		"tajachanachur",
		"tajachanachur",
		"rr foods",
		"rr food products",
		"rr food products raniganj",
		"rr food products raniganj west bengal",
		"taja chanachur",

	],
	openGraph: {
		title:
			"R.R. Food Products | Delicious Chanachur & Tea Time Snacks from Raniganj, West Bengal",
		description:
			"Craving the perfect snack? R.R. Food Products from Raniganj, West Bengal offers the best crispy chanachur and other delicious tea-time snacks. Order online now for the authentic taste of happiness!",
		url: "https://www.rrfoodproducts.com", // Replace with your actual site URL
		type: "website",
		images: [
			{
				url: "/images/chanachur-banner.jpg", // Replace with an actual image of your chanachur product
				width: 1200,
				height: 630,
				alt: "R.R. Food Products - Authentic Chanachur and Tea Time Snacks from Raniganj",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title:
			"R.R. Food Products | Delicious Chanachur & Tea Time Snacks from Raniganj, West Bengal",
		description:
			"Looking for authentic, crispy chanachur and other tea-time snacks? R.R. Food Products offers the best of both, made fresh in Raniganj, West Bengal. Order now!",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${jockeyOne.className} ${kalnia.className} ${inriaSans.className}`}
			>
				<Navbar />
				<Main>{children}</Main>
			</body>
		</html>
	);
}
