"use client";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import productImg from "../../../../public/Dashboard/ShoppingCart/image (8).png";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import { Tabs } from "flowbite-react";
import { StringHelper } from "@/helper/string.helper";

const ProductDetailsClientPage = ({ product }: { product: any }) => {
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
            {carouselImages.map((slide, inx) => (
              <button
                key={slide}
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
                key={slide}
                src={slide}
                className=" object-cover"
                alt={"product image "}
              />
            ))}
          </div>
          <p className=" absolute top-3 right-0 p-1 bg-primary text-white front-bold rounded-tl-xl rounded-bl-xl px-3 text-lg">
            - {product.discount}%
          </p>
        </div>
        {/* right side */}
        <div className="">
          <h1 className="text-2xl  font-semibold  lg:w-96 ">{product.name}</h1>
          <p className="text-lg mt-3">
            {product.currency_code}
            {product.new_price}{" "}
            <del className="text-gray-500">
              {product.currency_code}
              {product.price}
            </del>
          </p>
          {/* <p className="text-sm text-gray-500">€24,00 / 1kg</p> */}
          <div className="mt-7">
            <Button>{" Add Item "}</Button>
          </div>
        </div>
      </div>
      {/* tabs */}
      <div className="mt-14 mb-32 ">
        <Tabs style="underline">
          {product.details.map((detail: any) => {
            return (
              <Tabs.Item key={detail.id} title={detail.name}>
                <div dangerouslySetInnerHTML={{ __html: detail.body }}></div>
              </Tabs.Item>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailsClientPage;
