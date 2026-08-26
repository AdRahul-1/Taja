import Image from "next/image";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "About Us",
	description:
		"Learn about R.R. Food Products, crafting the finest tea-time snacks and Taja Chanachur in Raniganj, West Bengal since 2009.",
	alternates: {
		canonical: "/about-us",
	},
	openGraph: {
		title: "About Us | R.R. Food Products",
		description:
			"Learn about R.R. Food Products, crafting the finest tea-time snacks and Taja Chanachur in Raniganj, West Bengal since 2009.",
		url: "https://rrfoodproducts.com/about-us",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "About R.R. Food Products",
			},
		],
	},
};

const aboutJsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "AboutPage",
			"@id": "https://rrfoodproducts.com/about-us#webpage",
			url: "https://rrfoodproducts.com/about-us",
			name: "About Us | R.R. Food Products",
			description:
				"Learn about R.R. Food Products, crafting the finest tea-time snacks and Taja Chanachur in Raniganj, West Bengal since 2009.",
			isPartOf: {
				"@id": "https://rrfoodproducts.com/#website",
			},
			about: {
				"@id": "https://rrfoodproducts.com/#organization",
			},
			publisher: {
				"@id": "https://rrfoodproducts.com/#organization",
			},
		},
		{
			"@type": "BreadcrumbList",
			"@id": "https://rrfoodproducts.com/about-us#breadcrumb",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "https://rrfoodproducts.com",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "About Us",
					item: "https://rrfoodproducts.com/about-us",
				},
			],
		},
		{
			"@type": "FAQPage",
			"@id": "https://rrfoodproducts.com/about-us#faq",
			mainEntity: [
				{
					"@type": "Question",
					name: "Where is R.R. Food Products located?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "R.R. Food Products is based in Raniganj, West Bengal, India, where it has been manufacturing tea-time snacks since 2009.",
					},
				},
				{
					"@type": "Question",
					name: "What products does R.R. Food Products manufacture?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "R.R. Food Products specializes in authentic Bengali chanachur under the brand Taja Chanachur (including Special Jhal and Tak Jhal Misti varieties), Masala Chira, and a selection of crispy tea-time snacks.",
					},
				},
				{
					"@type": "Question",
					name: "What pack sizes are available for Taja Chanachur?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Taja Chanachur is available in multiple pack sizes including ₹5 (25g Pocket Pack), ₹10 (50g Pocket Buddy), ₹35 (150g Big Brother), and ₹90 (400g Family Pack and 500g Jumbo Pack).",
					},
				},
				{
					"@type": "Question",
					name: "How can distributors or customers contact R.R. Food Products?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Inquiries for distributorship, bulk orders, or customer feedback can be submitted directly through our official Contact Us page at rrfoodproducts.com/contact-us.",
					},
				},
			],
		},
	],
};

function AboutUs() {
	return (
		<div className="min-h-screen bg-gray-50 py-14 px-6 font-sans">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
			/>
			<div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
				<nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
					<ol className="flex items-center space-x-2">
						<li>
							<Link href="/" className="hover:text-gray-900 transition-colors">
								Home
							</Link>
						</li>
						<li>/</li>
						<li className="text-gray-900 font-medium" aria-current="page">
							About Us
						</li>
					</ol>
				</nav>

				<h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
					About R.R. Food Products
				</h1>
				<p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
					Since 2009, R.R. Food Products has been crafting the finest tea-time
					snacks in Raniganj, West Bengal with a passion for quality, tradition, and customer satisfaction.
				</p>

				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* Image */}
					<div>
						<Image
							src="/ABOUT.webp"
							alt="Crafting authentic Taja Chanachur tea-time snacks at R.R. Food Products in Raniganj"
							className="rounded-lg shadow-md w-full h-auto object-cover"
							width={500}
							height={500}
						/>
					</div>

					{/* Content */}
					<div>
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Our Story
						</h2>
						<p className="text-gray-600 mb-4">
							Established in 2009 in Raniganj, West Bengal, our journey began with a simple idea: to
							bring joy to daily tea time with delicious, crispy, high-quality snacks. Over
							the years, we have built a loyal customer base across Bengal by never
							compromising on taste, freshness, or ingredients.
						</p>
						<p className="text-gray-600 mb-4">
							Our signature brand, <strong>Taja Chanachur</strong>, brings authentic flavors
							to every occasion. From spicy Special Jhal to sweet and tangy Tak Jhal Misti,
							our snacks are crafted to deliver the perfect crunch with your tea.
						</p>
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Our Commitment to Quality
						</h2>
						<p className="text-gray-600">
							Customer satisfaction has always been at the heart of our
							business. We continuously innovate and refine our recipes to meet
							the evolving tastes of snack lovers while honoring traditional Bengali snacking heritage.
						</p>
					</div>
				</div>

				{/* Values Section */}
				<div className="mt-12">
					<h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
						Why Choose Taja Chanachur?
					</h2>
					<ul className="grid sm:grid-cols-2 gap-4 text-gray-600 max-w-4xl mx-auto">
						<li className="flex items-center p-3 bg-gray-50 rounded-lg">
							<span className="w-3 h-3 bg-indigo-600 rounded-full mr-3 shrink-0"></span>
							<span>Over a decade of trusted experience since 2009.</span>
						</li>
						<li className="flex items-center p-3 bg-gray-50 rounded-lg">
							<span className="w-3 h-3 bg-indigo-600 rounded-full mr-3 shrink-0"></span>
							<span>Made with finest quality ingredients and spices.</span>
						</li>
						<li className="flex items-center p-3 bg-gray-50 rounded-lg">
							<span className="w-3 h-3 bg-indigo-600 rounded-full mr-3 shrink-0"></span>
							<span>Always crispy, fresh, and hygienically packed.</span>
						</li>
						<li className="flex items-center p-3 bg-gray-50 rounded-lg">
							<span className="w-3 h-3 bg-indigo-600 rounded-full mr-3 shrink-0"></span>
							<span>Diverse range of pack sizes for every tea-time occasion.</span>
						</li>
					</ul>
				</div>

				{/* FAQ Section */}
				<div className="mt-14 border-t pt-10">
					<h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
						Frequently Asked Questions
					</h2>
					<div className="space-y-6 max-w-4xl mx-auto">
						<div className="border border-gray-200 rounded-lg p-5">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Where is R.R. Food Products located?
							</h3>
							<p className="text-gray-600">
								R.R. Food Products is based in Raniganj, West Bengal, India, where our manufacturing unit has been actively operating since 2009.
							</p>
						</div>
						<div className="border border-gray-200 rounded-lg p-5">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								What products does R.R. Food Products manufacture?
							</h3>
							<p className="text-gray-600">
								We manufacture authentic Bengali chanachur under our flagship brand <strong>Taja Chanachur</strong> (available in Special Jhal and Tak Jhal Misti flavors), Special Masala Chira, and a variety of crispy tea-time snack mixtures.
							</p>
						</div>
						<div className="border border-gray-200 rounded-lg p-5">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								What pack sizes are available for Taja Chanachur?
							</h3>
							<p className="text-gray-600">
								Taja Chanachur is available in ₹5 (25g Pocket Pack), ₹10 (50g Pocket Buddy), ₹35 (150g Big Brother), and ₹90 (400g Family Pack and 500g Jumbo Pack) configurations.
							</p>
						</div>
						<div className="border border-gray-200 rounded-lg p-5">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								How can distributors or customers contact R.R. Food Products?
							</h3>
							<p className="text-gray-600">
								You can reach our team for distributorship, trade inquiries, or customer feedback through our official{" "}
								<Link href="/contact-us" className="text-indigo-600 underline font-medium hover:text-indigo-800">
									Contact Us page
								</Link>.
							</p>
						</div>
					</div>
				</div>

				<div className="mt-12 text-center text-xs text-gray-400 border-t pt-4">
					Published by R.R. Food Products • Raniganj, West Bengal, India
				</div>
			</div>
		</div>
	);
}

export default AboutUs;
