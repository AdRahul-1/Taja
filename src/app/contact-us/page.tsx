"use client";
import React from "react";

function ContactUs() {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
			<div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
				<h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
					Contact Us
				</h1>
				<p className="text-gray-600 text-center mb-6">
					We{`'`}d love to hear from you! Please fill out the form below.
				</p>
				<form
					className="space-y-4"
					action={`https://formsubmit.co/c8be25bfb9d04f34d244c1d7a571ecf3`}
                    method="POST"
				>
					{/* Name */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							placeholder="Your name"
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            name="name"
						/>
					</div>

					{/* Email */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Your email"
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					{/* Message */}
					<div>
						<label
							htmlFor="message"
							className="block text-sm font-medium text-gray-700"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							placeholder="Your message"
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						></textarea>
					</div>

					{/* Submit */}
					<div>
						<button
							type="submit"
							className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Send Message
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ContactUs;

// https://formsubmit.co/your@email.com
