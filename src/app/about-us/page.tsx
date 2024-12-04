"use client";
import Image from "next/image";
import React from "react";

function AboutUs() {
	return (
		<div className="min-h-screen bg-gray-50 py-14 px-6">
			<div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
				<h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
					About Us
				</h1>
				<p className="text-lg text-gray-600 text-center mb-8">
					Since 2009, we have been crafting the finest tea-time snacks with a
					passion for quality and a dedication to customer satisfaction.
				</p>

				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* Image */}
					<div>
						<Image
							src="/ABOUT.webp"
							alt="Tea Time Snacks"
							className="rounded-lg shadow-md"
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
							Established in 2009, our journey began with a simple idea: to
							bring joy to tea time with delicious, high-quality snacks. Over
							the years, we have built a loyal customer base by never
							compromising on taste or quality.
						</p>
						<p className="text-gray-600 mb-4">
							Our snacks are made with the finest ingredients, ensuring every
							bite delivers the perfect balance of flavor and freshness. From
							crispy biscuits to savory munchies, we have something for everyone
							to enjoy with their tea.
						</p>
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Our Commitment
						</h2>
						<p className="text-gray-600">
							Customer satisfaction has always been at the heart of our
							business. We continuously innovate and refine our products to meet
							the evolving tastes of our customers while maintaining the
							traditional essence of tea-time snacks.
						</p>
					</div>
				</div>

				{/* Values Section */}
				<div className="mt-10">
					<h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
						Why Choose Us?
					</h2>
					<ul className="space-y-4 text-gray-600">
						<li className="flex items-center">
							<span className="w-4 h-4 bg-indigo-600 rounded-full mr-3"></span>
							Over a decade of experience in crafting tea-time snacks.
						</li>
						<li className="flex items-center">
							<span className="w-4 h-4 bg-indigo-600 rounded-full mr-3"></span>
							Focus on quality, using the finest ingredients.
						</li>
						<li className="flex items-center">
							<span className="w-4 h-4 bg-indigo-600 rounded-full mr-3"></span>
							Customer satisfaction as our top priority.
						</li>
						<li className="flex items-center">
							<span className="w-4 h-4 bg-indigo-600 rounded-full mr-3"></span>A
							wide range of snacks to suit every tea-time occasion.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default AboutUs;
