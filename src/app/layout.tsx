import type { Metadata } from "next";
import "./globals.css";
import { Kalnia } from "next/font/google";
import Main from "./Main";

const kalnia = Kalnia({ subsets: ["latin"] });

export const metadata: Metadata = {
	title:
		"R.R. Food Products | Delicious Chanachur & Tea Time Snacks from Raniganj, West Bengal",
	description:
		"R.R. Food Products offers premium, crunchy chanachur and a variety of tea-time snacks made with love and high-quality ingredients. Based in Raniganj, West Bengal, our snacks are perfect for every occasion. Shop now for authentic, flavorful chanachur!",
	icons: {
		icon: "/favicon.ico",
	},
	keywords: [
		"Taja Chanachur",
		"Chanachur",
		"tea time snacks",
		"snacks for tea",
		"R.R. Food Products",
		"Rr food products",
		"healthy snacks",
		"Indian snacks",
		"Raniganj snacks",
		"authentic chanachur",
		"crispy snacks",
		"snacks from West Bengal",
		"delicious chanachur",
		"crispy Indian snacks",
		"rrfoodproducts",
		"rrfood",
		"tajachanachur",
		"taja chanachur raniganj",
		"new taja",
		"newtajachanachur",
		"taja",
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
		url: "https://www.rrfoodproducts.com",
		type: "website",
		images: [
			{
				url: "https://firebasestorage.googleapis.com/v0/b/aspirants-b1e24.appspot.com/o/icon%2Ffavicon.ico?alt=media&token=97997e1a-f711-4401-b834-7cfff6a224e6",
				width: 1200,
				height: 630,
				alt: "R.R. Food Products",
			},
		],
		locale: "en_IN",
	},
	robots: {
		index: true,
		follow: true,
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
				className={`${kalnia.className}`}
			>
				
				<Main>{children}</Main>
			</body>
		</html>
	);
}
