"use client";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import productImg from "../../../public/Dashboard/ShoppingCart/image (8).png";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import { Tabs } from "flowbite-react";

const Page = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const carouselImages = [productImg, productImg, productImg, productImg];
  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1
    );
  const nextSlider = useCallback(
    () =>
      setCurrentSlider((currentSlider) =>
        currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1
      ),
    [carouselImages.length]
  );

  // if you don't want to change the slider automatically then you can just remove the useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);
  return (
    <div className="lg:mt-0 mt-14">
      {/*  */}
      <p className=" md:flex hidden  text-sm text-gray-500   ">
        <Link href="/dashboard">Home</Link>{" "}
        <IoIosArrowForward className="text-xl cursor-pointer" />
        Aufstriche & Cerealien{" "}
        <IoIosArrowForward className="text-xl cursor-pointer" />
        Musli-& Proteinriegel
        <IoIosArrowForward className="text-xl cursor-pointer" />3 Bears Pocket
        Porrifage mohinge Banane 55g{" "}
      </p>

      {/* content  */}

      <div className=" md:flex  gap-10 mt-10">
        {/* left side */}
        <div className=" lg:w-96 md:w-72 w-full  lg:h-[350px] md:h-[220px]  relative overflow-hidden ">
          {/* arrow right */}
          <button
            onClick={nextSlider}
            className="absolute top-1/2 z-50 right-3  flex justify-center items-center rounded-full w-6 h-6 md:w-8 md:h-8"
          >
            <IoIosArrowForward className="text-xl cursor-pointer w-4 h-4 md:w-6 md:h-6 icon" />
          </button>
          {/* dots */}
          <div className="flex justify-center items-center rounded-full z-[5] absolute bottom-4 w-full gap-1">
            {carouselImages.map((_, inx) => (
              <button
                key={inx}
                onClick={() => setCurrentSlider(inx)}
                className={`rounded-full border-2 border-black duration-500 bg-white ${
                  currentSlider === inx ? "w-5" : "wz-2"
                } h-3`}
              ></button>
            ))}
          </div>
          {/* Carousel container */}
          <div
            className="ease-linear duration-500 flex transform-gpu"
            style={{ transform: `translateX(-${currentSlider * 100}%)` }}
          >
            {/* sliders */}
            {carouselImages.map((slide, inx) => (
              <Image
                key={inx}
                src={slide}
                className=" object-cover"
                alt={"product image "}
              />
            ))}
          </div>
          <p className=" absolute top-3 right-0 p-1 bg-primary text-white front-bold rounded-tl-xl rounded-bl-xl px-3 text-lg">
            - 30%
          </p>
        </div>
        {/* right side */}
        <div className="">
          <h1 className="text-2xl  font-semibold  lg:w-96 ">
            3Bears Pocket Porridge Mohnige Banane 55g
          </h1>
          <p className="text-lg mt-3">
            €1.32 <del className="text-gray-500">€1.89</del>
          </p>
          <p className="text-sm text-gray-500">€24,00 / 1kg</p>
          <div className="mt-7">
            <Button>{" Add Item "}</Button>
          </div>
        </div>
      </div>
      {/* tabs */}
      <div className="mt-14 mb-32 ">
        <Tabs style="underline">
          <Tabs.Item title="Product Information">
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              {" "}
              Porridge bars (oat-based muesli bars) with bananas and poppy
              seeds.
            </span>
            . Porridge redefined. Our pocket porridge combines the best of all
            worlds. Ready to eat like a bar and with all the benefits that you
            already know from our porridge. Only the best ingredients and a
            fabulous taste with extra fruit! Now finally for on the go. Just
            tear open and enjoy.
          </Tabs.Item>
          <Tabs.Item title="Ingredients and allergens">
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Dashboard tab&apos;s associated content
            </span>
            . Porridge redefined. Our pocket porridge combines the best of all
            worlds. Ready to eat like a bar and with all the benefits that you
            already know from our porridge. Only the best ingredients and a
            fabulous taste with extra fruit! Now finally for on the go. Just
            tear open and enjoy.
          </Tabs.Item>
          <Tabs.Item title="Preservation and storage">
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Settings tab&apos;s associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
          <Tabs.Item title="Manufacturer">
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab&apos;s associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
          <Tabs.Item title="Nutritional values (per 100 g):">
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab&apos;s associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
