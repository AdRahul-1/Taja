import React, { memo, use, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAnimationStore } from "@/store/Animations";
import { Jockey_One } from "next/font/google";

const jockeyOne = Jockey_One({ subsets: ["latin"], weight: "400" });
function TajaWatermark() {
	const store = useAnimationStore();
	const div = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		if (!div.current || store.animations) {
			return;
		}
		gsap.from(div.current.children, {
			x: "30%",
			delay: 0.5,
			stagger: {
				from: "end",
				each: 0.1,
			},
			opacity: 0,
		});
	}, []);
	return (
		<div
			className="absolute top-10 xl:top-0 left-1/2 xl:left-10"
			data-scroll
			data-scroll-speed=".3"
		>
			<div className="-translate-x-1/2 xl:-translate-x-0 opacity-10">
				<h1
					className={`tracking-wide font-bold flex xl:-rotate-[20deg] ${jockeyOne.className} text-[13rem] lg:text-[23rem] xl:text-[27rem] `}
					ref={div}
				>
					{"TAJA".split("").map((char, index) => (
						<span key={index}>{char}</span>
					))}
				</h1>
			</div>
		</div>
	);
}

export default memo(TajaWatermark);
