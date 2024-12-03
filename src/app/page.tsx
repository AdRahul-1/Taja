"use client";
import { mainImage } from "@/constants";
import React, { useEffect,useState } from "react";
import Footer from "./components/layout/Footer";
import LocomotiveScroll from "locomotive-scroll";
import Displayitems from "./components/Displayitems";
import TajaWatermark from "./components/TajaWatermark";
import TitleText from "./components/TitleText";
import DisplayImage from "./components/DisplayImage";
import Image from "next/image";

function Home() {
	const selectedImage = mainImage[Math.floor(Math.random() * mainImage.length)];
	const [isLocoEnabled, setIsLocoEnabled] = useState(window.innerWidth >= 768);

	useEffect(() => {
	  const handleResize = () => {
		const shouldEnableLoco = window.innerWidth >= 768;
		setIsLocoEnabled(shouldEnableLoco);
	  };
  
	  window.addEventListener('resize', handleResize);
  
	  return () => {
		window.removeEventListener('resize', handleResize);
	  };
	}, []);
  
	useEffect(() => {
	  if (!isLocoEnabled) {
		return;
	  }
	  const loco = new LocomotiveScroll();
	  return () => {
		loco.destroy();
	  };
	}, [isLocoEnabled]);

	return (
		<main
			className="min-h-dvh h-fit  text-white max-w-[100vw] overflow-x-hidden"
			style={{ backgroundColor: selectedImage.bgColor }}
		>
			<Image
				src={"/taja.png"}
				height={500}
				width={500}
				alt="rr"
				className="w-24 xl:w-44 h-24 xl:h-44 drop-shadow-lg fixed top-0 left-4 z-50"
			></Image>
				<Image
						src={"/rr_logo.png"}
						height={100}
						width={100}
						alt="rr"
						className="w-8 xl:w-10 h-8 xl:h-10 drop-shadow-lg fixed top-4 right-4 z-50"
					></Image>
			<section className="relative flex items-center justify-between flex-col lg:flex-row lg:p-12 xl:p-20 gap-32 sm:gap-24 h-fit lg:h-dvh lg:gap-0">
				<TajaWatermark />
				<TitleText />
				<DisplayImage selectedImage={selectedImage} />
				<div className="static lg:absolute bottom-14 left-10 lg:translate-x-[10%] z-20">
					<Displayitems />
				</div>
			</section>
			<section className="flex pt-10 lg:pt-20 relative  lg:items-center lg:flex-row flex-col-reverse gap-5 h-fit">
				<div className="w-[90%] md:h-[40dvh] lg:h-[80dvh] lg:w-1/2 m-auto lg:m-0">
					<Image
						src={"/Chira.webp"}
						alt="Charaimge"
						width={1000}
						height={1000}
						className="w-full h-full object-contain image-shadow"
					/>
				</div>
				<div
					className="w-full lg:w-fit px-5 lg:px-0"
					data-scroll
					data-scroll-speed=".1"
				>
					<h2 className="text-3xl md:text-4xl">As Old As Time</h2>
					<h2 className="text-4xl md:text-5xl">Our Special Chira</h2>
					<h3 className=" md:text-lg mt-4">At Rs: ₹2</h3>
				</div>
			</section>
			<Footer />
		</main>
	);
}

export default Home;
