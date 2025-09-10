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
import ContactUsForm from "./components/ContactUsForm";
import { Headset, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const kalnia = Kalnia({ subsets: ["latin"] });
const jockeyOne = Jockey_One({ subsets: ["latin"], weight: "400" });
function getRandomRotation() {
  return Math.floor(Math.random() * 13) - 6;
}
const selectedImage = mainImage[Math.floor(Math.random() * mainImage.length)];
gsap.registerPlugin(useGSAP);


function Home() {
  const [isLocoEnabled, setIsLocoEnabled] = useState(window.innerWidth >= 768);
  const loco = new LocomotiveScroll();
  useEffect(() => {
    const handleResize = () => {
      const shouldEnableLoco = window.innerWidth >= 768;
      setIsLocoEnabled(shouldEnableLoco);
    };
    window.addEventListener("resize", handleResize);
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
        // ease: "power2.out",
        duration: 1,
        stagger: 0.2,
      });
      t1.from("[data-hero-text]>h1", {
        y: "-50%",
        opacity: 0,
        // ease: "power2.out",
        duration: 1,
        stagger: 0.2,
        delay: -.3,
      }, "a");
      t1.from("[data-hero-text]>p", {
        y: "-50%",
        opacity: 0,
        // ease: "power2.out",
        duration: 1,
        stagger: 0.2,
      }, "a");
      t1.from("[data-buttons]", {
        y: "100%",
        opacity: 0,
        // ease: "power2.out",
        duration: 1,
        delay: -.2,
        stagger: 0.2,
        onComplete: () => {
          store.setAnimation();
        },
      });
      gsap.from("[data-display-items] > div", {
        y: "100%",
        opacity: 0,
        // ease: "expo.out",
        duration: 2.5,
        stagger: 0.45,
      });
    }, main);
  }, []);

  return (
    <main
      className="min-h-dvh text-white max-w-[100vw] overflow-x-hidden relative z-0"
      ref={main}
    >
      <div className="w-16 xl:w-48 h-12 xl:h-[8rem] fixed top-3 xl:top-4 left-4 z-50">
        <Image
          src={"/taja.png"}
          height={500}
          width={500}
          priority
          alt="rr"
          className="w-full h-full drop-shadow-lg "
        ></Image>
      </div>
      <Image
        src={"/rr_logo.png"}
        height={100}
        width={100}
        priority
        alt="rr"
        className="size-6 md:size-10 xl:size-12 drop-shadow-lg fixed top-4 right-4 z-50"
      ></Image>

      <section className="relative flex items-center justify-between flex-col lg:flex-row lg:p-12 xl:p-20 gap-32 sm:gap-24 h-fit lg:h-dvh lg:gap-0"
        style={{ backgroundColor: selectedImage.bgColor }}
      >
        <div
          className="absolute top-10 xl:top-0 left-1/2 xl:left-10"
          data-scroll={isLocoEnabled}
          data-scroll-speed={isLocoEnabled?".3":"0"}
        >
          <div className="-translate-x-1/2 sm:-translate-x-2/3 xl:-translate-x-0 opacity-10">
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
          className="translate-y-[30%] text-center lg:text-left mt-20 lg:mt-0 z-50 lg:z-20"
          data-hero-text
        >
          <h1
            className={`text-6xl font-medium ${kalnia.className} leading-none stoke-text`}
          >
            Your evening <br /> partner
          </h1>
          <p className="text-xl md:text-2xl mt-1 lg:mt-5">Now more crispier</p>

          <div className="flex gap-4 mt-5 justify-center sm:justify-start relative text-sm" data-buttons>
            <button className="flex gap-3 px-4 py-2 border border-white/50 rounded-full  items-center justify-center" onClick={() => loco.scrollTo("#contact")}>

              <Headset className="size-4" />Contact

            </button>
            <button className={cn("rounded-full flex gap-3 px-4 py-2   items-center justify-center", `bg-[${selectedImage.blurCircle}]`)} style={{ backgroundColor: selectedImage.innerCircle, color: "white" }} onClick={() => loco.scrollTo("#about")}>
              <Warehouse className="size-4" />About
            </button>
          </div>
        </div>

        <div
          className="aspect-square  min-h-[50%] sm:min-h-[26rem] h-[40dvh] lg:h-[50dvh] xl:h-[70dvh] max-h-[600px] relative flex items-center justify-center z-20"
          data-scroll={isLocoEnabled}
          data-scroll-speed={isLocoEnabled?"-.1":"0"}
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
              width={800}
              height={800}
              priority
            />
            <div className="absolute top-0 left-0 w-full h-full z-10 -rotate-6"></div>
          </div>
        </div>

        <div className="static lg:absolute bottom-7 xl:bottom-14 left-0 sm:translate-x-[8%] xl:translate-x-[10%] z-30">
          <div
            className="flex gap-3 flex-wrap md:flex-nowrap items-center justify-evenly sm:justify-center"
            data-display-items
          >
            {itemsImages.map((item, index) => (
              <div className="" key={index}>
                <DrawerComp itemsArray={item}>
                  <div
                    className="size-20 md:size-24 xl:size-28 relative"
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

      <section className="flex pt-10 lg:pt-20 relative lg:items-center lg:flex-row flex-col-reverse gap-5 h-fit relativve"

      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
            linear-gradient(180deg,${selectedImage.bgColor} 0%, rgba(255, 255, 255, 0) 100%)`,
            backgroundSize: "100% 100%",
          }}
        />
        <div className="w-[90%] md:h-[35dvh] lg:h-[70dvh] lg:w-1/2 m-auto lg:m-0 relative z-10">
          <Image
            src={"/Chira.png"}
            alt="Charaimge"
            width={1000}
            height={1000}
            className="w-full h-full object-contain image-shadow-sm"
          />
          <div className="absolute top-0 left-0 w-full h-full z-10"></div>
        </div>
        <div
          className="w-full lg:w-fit px-5 lg:px-0 relative z-10 sm:-translate-y-full"
          data-scroll={isLocoEnabled}
          data-scroll-speed={isLocoEnabled?".1":"0"}
        >
          <h2 className="text-3xl md:text-4xl font-sembold">As Fun as New</h2>
          <h2 className="text-4xl md:text-5xl font-bold">
            Special Masala chira
          </h2>
          <h3 className=" md:text-lg mt-4">Available in MRP:- 10 & 5</h3>
        </div>
      </section>


      <section className="relative min-h-screen w-full " id="about">
        {/* Cool Blue Glow Right */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(21, 190, 255, 0.5),
          transparent 70%
        )
      `,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Your Content/Components */}

        <div className=" py-14 px-6 relative z-10">
          <div className="max-w-7xl mx-auto ">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
              About Us
            </h1>
            <p className="text-lg text-gray-600 text-center mb-8">
              Since 2009, we have been crafting the finest tea-time snacks with a
              passion for quality and a dedication to customer satisfaction.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">

              <div>
                <Image
                  src="/ABOUT.webp"
                  alt="Tea Time Snacks"
                  className="rounded-lg shadow-md"
                  width={500}
                  height={500}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4">
                  Established in 2009, our journey began with a simple idea: to
                  bring joy to tea time with delicious, high-quality snacks. Over
                  the years, we have built a loyal customer base by never
                  compromising on taste or quality.
                </p>
                <p className="text-gray-600 mb-4">
                  Our snacks are made with the finest ingredients, ensuring every
                  bite delivers the perfect balance of flavor and freshness. From
                  crispy biscuits to savory munchies, we have something for everyone
                  to enjoy with their tea.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Our Commitment
                </h2>
                <p className="text-gray-600">
                  Customer satisfaction has always been at the heart of our
                  business. We continuously innovate and refine our products to meet
                  the evolving tastes of our customers while maintaining the
                  traditional essence of tea-time snacks.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Why Choose Us?
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-[#4563fe] rounded-full mr-3"></span>
                  Over a decade of experience in crafting tea-time snacks.
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-[#4563fe] rounded-full mr-3"></span>
                  Focus on quality, using the finest ingredients.
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-[#4563fe] rounded-full mr-3"></span>
                  Customer satisfaction as our top priority.
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-[#4563fe] rounded-full mr-3"></span>A
                  wide range of snacks to suit every tea-time occasion.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative" id="contact">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: `
        radial-gradient(
          circle at top left,
          rgba(173, 109, 244, 0.5),
          transparent 70%
        )
      `,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="min-h-screen flex items-center justify-center p-3 md:p-6 font-sans relative z-10">
          <div className="  rounded-lg sm:p-4 lg:p-8 flex lg:w-fit w-full items-center justify-center gap-10 mt-6">
            <Image
              src="/Customer Service.svg"
              alt=""
              width={400}
              height={400}
              className=" w-96 h-96 object-contain md:block hidden"
            ></Image>
            <div className="text-black">
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
      </section>
    </main>
  );
}

export default Home;
