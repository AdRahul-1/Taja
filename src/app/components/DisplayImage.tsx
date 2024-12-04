import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { memo, useRef } from "react";
import {useAnimationStore} from "@/store/Animations"
function DisplayImage({ selectedImage }: { selectedImage: DisplayImage }) {
	const div = useRef<HTMLDivElement>(null);
	const image = useRef<HTMLDivElement>(null);
	const store=useAnimationStore()
	useGSAP(() => {
		if (!image.current||store.animations) return;
		gsap.from(image.current, {
			opacity: 0,
			duration: 1.2,
			scale: 2,
			ease: "bounce",
			delay:.2,
		});
		gsap.from(div.current, {
			opacity: 0,
			duration: 1.2,
			scale: 0,
			ease: "expo",
			delay:.1,
		});
	}, []);
	return (
		<div
			className="aspect-square  min-h-[50%] sm:min-h-[26rem] h-[40dvh] lg:h-[50dvh] xl:h-[70dvh] max-h-[600px] relative flex items-center justify-center z-20"
			data-scroll
			data-scroll-speed="-.2"
		>
			<div
				className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -z-0"
				style={{
					backgroundColor: selectedImage.blurCircle,
					filter: "blur(100px)",
				}}
			></div>
			<div className="absolute inset-0" ref={div}>
				<div className="absolute w-[calc(100%+5rem)] h-[calc(100%+5rem)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 rounded-full"></div>
				<div
					className="absolute w-[calc(100%-3rem)] h-[calc(100%-3rem)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
					style={{ backgroundColor: selectedImage.innerCircle }}
				></div>
			</div>

			<div className="absolute inset-0 z-10" ref={image}>
				<Image
					src={selectedImage.url}
					alt="mainImage"
					className="w-full h-full object-contain -rotate-6 filter image-shadow"
					width={1000}
					height={1000}
					priority 
					
				/>
			</div>
		</div>
	);
}

export default memo(DisplayImage);
