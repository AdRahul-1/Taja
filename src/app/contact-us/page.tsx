
import Image from "next/image";
import ContactUsForm from "../components/ContactUsForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Contact Us",
	description:
		"Get in touch with R.R. Food Products for any inquiries, feedback, or suggestions in Raniganj, West Bengal.",
	alternates: {
		canonical: "/contact-us",
	},
	openGraph: {
		title: "Contact Us | R.R. Food Products",
		description:
			"Get in touch with R.R. Food Products for any inquiries, feedback, or suggestions in Raniganj, West Bengal.",
		url: "https://rrfoodproducts.com/contact-us",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Contact R.R. Food Products",
			},
		],
	},
};

const contactJsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "ContactPage",
			"@id": "https://rrfoodproducts.com/contact-us#webpage",
			url: "https://rrfoodproducts.com/contact-us",
			name: "Contact Us | R.R. Food Products",
			description:
				"Get in touch with R.R. Food Products for trade inquiries, distributorship, or feedback in Raniganj, West Bengal.",
			isPartOf: {
				"@id": "https://rrfoodproducts.com/#website",
			},
			about: {
				"@id": "https://rrfoodproducts.com/#organization",
			},
		},
		{
			"@type": "BreadcrumbList",
			"@id": "https://rrfoodproducts.com/contact-us#breadcrumb",
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
					name: "Contact Us",
					item: "https://rrfoodproducts.com/contact-us",
				},
			],
		},
	],
};

function ContactUsPage() {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
			/>
			<div className="w-full max-w-4xl mb-4">
				<nav aria-label="Breadcrumb" className="text-sm text-gray-500">
					<ol className="flex items-center space-x-2">
						<li>
							<Link href="/" className="hover:text-gray-900 transition-colors">
								Home
							</Link>
						</li>
						<li>/</li>
						<li className="text-gray-900 font-medium" aria-current="page">
							Contact Us
						</li>
					</ol>
				</nav>
			</div>
			<div className="bg-white shadow-md rounded-lg p-6 sm:p-8 flex lg:w-fit w-full items-center gap-10">
				<Image
					src="/Customer Service.svg"
					alt="R.R. Food Products Customer Service"
					width={400}
					height={400}
					className="w-96 h-96 object-contain md:block hidden"
				/>
				<div className="w-full">
					<h1 className="text-2xl font-semibold text-gray-800 text-center">
						Contact R.R. Food Products
					</h1>
					<p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
						We&apos;d love to hear from you! For distributorship, trade, or product inquiries, please fill out the form below.
					</p>
					<ContactUsForm />
					<p className="text-xs text-gray-400 text-center mt-6">
						R.R. Food Products • Raniganj, West Bengal, India
					</p>
				</div>
			</div>
		</div>
	);
}

export default ContactUsPage;
