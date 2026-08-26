import React, { memo, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { Jockey_One } from "next/font/google";
const jockeyOne = Jockey_One({ subsets: ["latin"], weight: "400" });
import Image from "next/image";
import { ChevronRight } from "lucide-react";
function DrawerComp({
	children,
	itemsArray,
}: {
	children: React.ReactNode;
	itemsArray: ImageItem[];
}) {
	const [selected, setSelected] = useState(0);
	const [open, setOpen] = useState(false);

	const preloadDrawerImages = () => {
		if (typeof window !== "undefined") {
			itemsArray.forEach((item) => {
				const img = new window.Image();
				img.src = item.url;
			});
		}
	};

	return (
		<Drawer onOpenChange={setOpen}>
			<DrawerTrigger
				onMouseEnter={preloadDrawerImages}
				onTouchStart={preloadDrawerImages}
				onFocus={preloadDrawerImages}
			>
				{children}
			</DrawerTrigger>
			<DrawerContent
				className={`${jockeyOne.className} border-0 transition-all duration-300 ease-in-out rounded-t-3xl`}
				style={{ backgroundColor: itemsArray[selected].theme }}
			>
				<div
					className={`flex justify-around items-center transition-all md:w-[80vw] p-4 md:p-0 ${
						open ? "opacity-100" : "opacity-0"
					}`}
				>
					<div className="w-96 h-[26rem] overflow-hidden p-5 absolute top-0 left-1/2 md:static -translate-x-1/2 md:-translate-x-0 -translate-y-[70%] md:-translate-y-0">
						<div className="w-full max-w-80 h-full relative m-auto md:m-0">
							{itemsArray.map((item, index) => (
								<div
									className={`w-full transition-all duration-300 ease-in-out h-full absolute top-0 left-0 ${
										selected === index
											? "translate-x-0 opacity-100"
											: "translate-x-[120%] opacity-0"
									}`}
									key={index}
								>
									<div className="absolute inset-0 top-0 left-0 flex items-center justify-center">
										{selected === index && (
											<div className="size-10 rounded-full border-2 border-white/20 border-t-white animate-spin absolute" />
										)}
										<Image
											src={item.url}
											alt={item.title}
											width={320}
											height={400}
											priority
											sizes="(max-width: 768px) 280px, 320px"
											className={`w-full h-full object-contain relative z-10 ${
												selected === index && "image-shadow"
											} `}
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white/70 p-4 rounded-3xl relative w-[29rem] h-64 flex flex-col justify-between mt-[4rem]">
						<h2 className="text-4xl">{itemsArray[selected].title}</h2>
						<div
							className="flex items-center justify-between"
							style={{ color: itemsArray[selected].theme }}
						>
							<h3 className="text-3xl">{itemsArray[selected].flavor}</h3>
							<button
								onClick={() =>
									setSelected((prev) => (prev + 1) % itemsArray.length)
								}
							>
								<ChevronRight size={40} />
							</button>
						</div>
						<div className="">
							<h4 className="text-lg">Avalabile in:-</h4>
							<h3 className="text-2xl">MRP: ₹{itemsArray[selected].price}</h3>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default memo(DrawerComp);
