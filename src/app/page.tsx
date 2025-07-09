"use client";
import { mainImage } from "@/constants";
import React, { useEffect, useState, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAnimationStore } from "@/store/Animations";
import { Jockey_One } from "next/font/google";
import { Kalnia } from "next/font/google";
import DrawerComp from "./components/DrawerComp";
import { itemsImages } from "@/constants";

const kalnia = Kalnia({ subsets: ["latin"] });
const jockeyOne = Jockey_One({ subsets: ["latin"], weight: "400" });
function getRandomRotation() {
  return Math.floor(Math.random() * 13) - 6;
}
const selectedImage = mainImage[Math.floor(Math.random() * mainImage.length)];
gsap.registerPlugin(useGSAP);


function Home() {
  const [isLocoEnabled, setIsLocoEnabled] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const shouldEnableLoco = window.innerWidth >= 768;
      setIsLocoEnabled(shouldEnableLoco);
    };
    window.addEventListener("resize", handleResize);
    if (!isLocoEnabled) {
      return;
    }
    const loco = new LocomotiveScroll();
    return () => {
      window.removeEventListener("resize", handleResize);
      loco.destroy();
    };
  }, []);

  const store = useAnimationStore();
  const main = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (store.animations) {
      return;
    }
    gsap.context(() => {
      gsap.from("[data-ring-circles]", {
        scale: 0,
        opacity: 0,
        ease: "expo.out",
        duration: 1.8,
      });
      gsap.from("[data-display-image]", {
        scale: 1.8,
        opacity: 0,
        ease: "bounce",
        duration: 1.5,
        delay: 0.1,
      });
      const t1 = gsap.timeline();
      t1.from("[data-taja-text]>span", {
        x: "-50%",
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        stagger: 0.2,
      });
      t1.from("[data-hero-text]>h1", {
        y: "-50%",
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        stagger: 0.2,
		delay:-.2,
      },"a");
      t1.from("[data-hero-text]>p", {
        y: "100%",
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        stagger: 0.2,
        onComplete: () => {
          store.setAnimation();
        },
      },"a");
      gsap.from("[data-display-items] > div", {
        y: "100%",
        opacity: 0,
        ease: "expo.out",
        duration: 2.5,
        stagger: 0.45,
      });
    }, main);
  }, []);

  return (
    <main
      className="min-h-dvh h-fit  text-white max-w-[100vw] overflow-x-hidden relative z-0"
      style={{ backgroundColor: selectedImage.bgColor }}
      ref={main}
    >
      <div className="w-20 xl:w-48 h-16 xl:h-[8rem] fixed top-3 xl:top-4 left-4 z-50">
        <Image
          src={"/taja.png"}
          height={500}
          width={500}
          alt="rr"
          className="w-full h-full drop-shadow-lg "
        ></Image>
      </div>
      <Image
        src={"/rr_logo.png"}
        height={100}
        width={100}
        alt="rr"
        className="w-8 xl:w-10 h-6 xl:h-10 drop-shadow-lg fixed top-4 right-4 z-50 hidden md:block"
      ></Image>
      <section className="relative flex items-center justify-between flex-col lg:flex-row lg:p-12 xl:p-20 gap-32 sm:gap-24 h-fit lg:h-dvh lg:gap-0">
        <div
          className="absolute top-10 xl:top-0 left-1/2 xl:left-10"
          data-scroll
          data-scroll-speed=".3"
        >
          <div className="-translate-x-1/2 xl:-translate-x-0 opacity-10">
            <h1
              className={`tracking-wide font-bold flex xl:-rotate-[20deg] ${jockeyOne.className} text-[13rem] lg:text-[23rem] xl:text-[27rem] `}
              data-taja-text
            >
              {"TAJA".split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </h1>
          </div>
        </div>

        <div
          className="translate-y-[30%] text-center lg:text-left mt-20 lg:mt-0 z-20"
          data-hero-text
        >
          <h1
            className={`text-6xl font-medium ${kalnia.className} leading-none stoke-text`}
          >
            Your evening <br /> partner
          </h1>
          <p className="text-xl md:text-2xl mt-1 lg:mt-5">Now more crispier</p>
        </div>

        <div
          className="aspect-square  min-h-[50%] sm:min-h-[26rem] h-[40dvh] lg:h-[50dvh] xl:h-[70dvh] max-h-[600px] relative flex items-center justify-center z-20"
          data-scroll
          data-scroll-speed="-.1"
        >
          <div
            className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -z-0"
            style={{
              backgroundColor: selectedImage.blurCircle,
              filter: "blur(100px)",
            }}
          ></div>

          <div className="absolute inset-0 z-0" data-ring-circles>
            <div className="absolute w-[calc(100%+5rem)] h-[calc(100%+5rem)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 rounded-full"></div>
            <div
              className="absolute w-[calc(100%-3rem)] h-[calc(100%-3rem)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: selectedImage.innerCircle }}
            />
          </div>

          <div className="absolute inset-0 z-30" data-display-image>
            <Image
              src={selectedImage.url}
              alt="mainImage"
              className="w-full h-full object-contain -rotate-6 filter image-shadow"
              width={1000}
              height={1000}
              priority
            />
            <div className="absolute top-0 left-0 w-full h-full z-10 -rotate-6"></div>
          </div>
        </div>

        <div className="static lg:absolute bottom-14 left-10 lg:translate-x-[10%] z-30">
          <div
            className="flex gap-3 flex-wrap md:flex-nowrap items-center justify-evenly sm:justify-center"
            data-display-items
          >
            {itemsImages.map((item, index) => (
              <div className="" key={index}>
                <DrawerComp itemsArray={item}>
                  <div
                    className="w-28 h-28 relative"
                    style={{
                      transform: `rotate(${getRandomRotation()}deg)`,
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full z-10"></div>
                    <Image
                      src={item[0].url}
                      alt={item[0].title}
                      width={100}
                      height={100}
                      priority
                      className="w-full h-full object-contain hover:drop-shadow-xl image-shadow-sm transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
                    />
                  </div>
                </DrawerComp>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex pt-10 lg:pt-20 relative lg:items-center lg:flex-row flex-col-reverse gap-5 h-fit">
        <div className="w-[90%] md:h-[35dvh] lg:h-[70dvh] lg:w-1/2 m-auto lg:m-0 relative">
          <Image
            src={"/Chira.png"}
            alt="Charaimge"
            width={1000}
            height={1000}
            className="w-full h-full object-contain image-shadow"
          />
          <div className="absolute top-0 left-0 w-full h-full z-10"></div>
        </div>
        <div
          className="w-full lg:w-fit px-5 lg:px-0"
          data-scroll
          data-scroll-speed=".1"
        >
          <h2 className="text-3xl md:text-4xl font-sembold">As Fun as New</h2>
          <h2 className="text-4xl md:text-5xl font-bold">
            Special Masala chira
          </h2>
          <h3 className=" md:text-lg mt-4">Available in MRP:- 10 & 5</h3>
        </div>
      </section>
    </main>
  );
}

export default Home;
