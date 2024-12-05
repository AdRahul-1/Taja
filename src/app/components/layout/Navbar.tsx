"use client";
import Image from "next/image";
import React, { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, AlignRight } from "lucide-react";
import { Jockey_One } from "next/font/google";
const jockeyOne = Jockey_One({ subsets: ["latin"], weight: "400" });

const links = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "About Us",
		href: "/about-us",
	},
	{
		name: "Contact Us",
		href: "/contact-us",
	},
];
function Navbar() {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState(false);
	const div = useRef<HTMLUListElement>(null);
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.id !== "trigger-btn" && target !== div.current) {
				setActiveSection(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<nav
			className={` fixed top-0 right-3 md:right-0 flex py-5 items-center justify-center md:w-full z-50 ${
				pathname !== "/" &&
				"md:border-b md:border-slate-800 md:bg-slate-200/70  md:backdrop-blur-sm"
			}`}
		>
			<button
				className="bg-[#1c1c1c] px-4 py-2 text-white rounded-full md:hidden"
				id="trigger-btn"
				onClick={() => setActiveSection(true)}
			>
				<span className="pointer-events-none">
					<AlignRight />
				</span>
			</button>
			<ul
				className={`text-2xl gap-12 ${
					pathname === "/" ? "text-white" : "text-black"
				} justify-center hidden md:flex`}
			>
				{links.map((link) => (
					<li key={link.name}>
						<Link
							href={`${link.href}`}
							className={pathname === link.href ? "opacity-100" : "opacity-50"}
						>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
			<ul
				className={`text-2xl gap-12
					 text-black justify-center flex items-center flex-col h-dvh md:hidden bg-slate-100 backdrop-blur-md top-0 right-0 fixed w-1/2 min-w-56  ${
							activeSection ? "translate-x-0" : "translate-x-full"
						} transition-all`}
				ref={div}
			>
				<button
					className="absolute right-4 top-4"
					onClick={() => setActiveSection(false)}
				>
					<X size={40} />
				</button>
				{links.map((link) => (
					<li key={link.name}>
						<Link
							href={`${link.href}`}
							className={`${
								pathname === link.href ? "opacity-100" : "opacity-50"
							}`}
						>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default memo(Navbar);
