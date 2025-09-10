import React from "react";
import { Instagram, Facebook } from "lucide-react";

import { Inria_Sans } from "next/font/google";
import Link from "next/link";
const inriaSans = Inria_Sans({ subsets: ["latin"], weight: "400" });
function Footer() {
	return (
		<footer className={`${inriaSans.className} p-3 bg-black text-white font-thin text-xs sm:text-base rounded-t-xl`}>
			<div className="p-2 text-center md:text-left">
				<div className="flex justify-between px-4 md:px-10 py-2 flex-col md:flex-row gap-4 md:gap-0">
					<div className="md:w-1/3">
						<p className="leading-none">
							© 2024 RR Food Products. All Rights Reserved.
						</p>
						<p className="text-xs hidden md:block">
							Delivering the finest tea-time snacks, crafted with quality and
							care. Proudly serving our customers with the best in taste and
							tradition.
						</p>
					</div>
					<div className="md:w-1/3">
						<div className="flex gap-5 md:justify-end justify-center items-center">
							<h5 className="">Follow Us:</h5>
							<Link
								href="https://www.instagram.com/new_taja/"
								className=""
								target="_blank"
							>
								<Instagram className="size-5 sm:size-6"/>
							</Link>
							<Link
								href="https://www.facebook.com/profile.php?id=61558675132758"
								className=""
								target="_blank"
							>
								<Facebook className="size-5 sm:size-6"/>
							</Link>
						</div>
					</div>
				</div>
				<p className="text-xs sm:text-base text-center leading-none">
					Stay connected for updates on new products and promotions!
				</p>
			</div>
		</footer>
	);
}

export default Footer;
