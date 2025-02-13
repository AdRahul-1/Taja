
import Image from "next/image";
import ContactUsForm from "../components/ContactUsForm";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Contact Us | R.R. Food Products",
	description:
		"Contact R.R. Food Products for any inquiries, feedback, or suggestions.",
}
function ContactUsPage() {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
			<div className="bg-white  shadow-md rounded-lg p-8 flex lg:w-fit w-full items-center gap-10 mt-6">
				<Image
					src="/Customer Service.svg"
					alt=""
					width={400}
					height={400}
					className=" w-96 h-96 object-contain md:block hidden"
				></Image>
				<div className="">
					<h1 className="text-2xl font-semibold text-gray-800 text-center">
						Contact Us
					</h1>
					<p className="text-gray-600 text-center mb-6">
						We{`'`}d love to hear from you! Please fill out the form below.
					</p>
					<ContactUsForm />
				</div>
			</div>
		</div>
	);
}

export default ContactUsPage;
