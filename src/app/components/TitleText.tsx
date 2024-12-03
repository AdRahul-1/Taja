import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Kalnia } from "next/font/google";
const kalnia = Kalnia({ subsets: ["latin"] });

function TitleText() {
	const h2 = useRef<HTMLHeadingElement>(null);
	const p = useRef<HTMLHeadingElement>(null);
	useGSAP(() => {
		const t1 = gsap.timeline();
		t1.from(h2.current, {
			duration: 0.7,
			opacity: 0,
			y: -100,
			ease: "expo.out",
			delay: 0.3,
		});
		t1.from(p.current, { opacity: 0, y: "100%", ease: "expo.out" });
	}, []);
	return (
		<div className="translate-y-[30%] text-center lg:text-left mt-20 lg:mt-0 z-20">
			<h1
				className={`text-6xl font-medium ${kalnia.className} leading-none stoke-text`}
				ref={h2}
			>
				Your evening <br /> partner
			</h1>
			<p className="text-xl md:text-2xl mt-1 lg:mt-5" ref={p}>
				Now more crispier
			</p>
		</div>
	);
}

export default TitleText;
