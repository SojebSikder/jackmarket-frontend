"use client";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";
import { Tabs } from "flowbite-react";
import CustomImage from "@/components/common/CustomImage";
import { FiPlus } from "react-icons/fi";
import { PiMinus } from "react-icons/pi";
import { CartService } from "@/service/cart/cart.service";
import { CustomToast } from "@/utils/Toast/CustomToast";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";

const ProductDetailsClientPage = ({ product }: { product: any }) => {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toastId = useRef<any>(null);

  const [count, setCount] = useState(1);
  const [currentSlider, setCurrentSlider] = useState(0);

  const carouselImages = product.images;

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

  const handleMinusClick = () => {
    // setCount(count - 1);
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handlePlusClick = () => {
    setCount(count + 1);
  };

  const addToCart = async () => {
    toastId.current = CustomToast.show("Please wait...");

    const data = {
      product_id: Number(product.id),
      // variant_id: ,
      quantity: count,
    };

    try {
      const cartService = await CartService.store(data);
      const response = cartService.data;
      if (response.success) {
        setMessage(response.message);
        setLoading(false);

        CustomToast.update(toastId.current, response.message);
      } else {
        setErrorMessage(response.message);
        setLoading(false);
        CustomToast.update(toastId.current, response.message);
      }
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setLoading(false);
        CustomToast.update(toastId.current, error.response.data.message);
      } else {
        setErrorMessage(error.message);
        setLoading(false);
        CustomToast.update(toastId.current, error.message);
      }
    }
  };

  // if you don't want to change the slider automatically then you can just remove the useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <div className="lg:mt-0 mt-14">
      <CustomToastContainer />
      {/*  */}
      {/* <p className=" md:flex hidden  text-sm text-gray-500   ">
        <Link href="/dashboard">Home</Link>{" "}
        <IoIosArrowForward className="text-xl cursor-pointer" />
        Aufstriche & Cerealien{" "}
        <IoIosArrowForward className="text-xl cursor-pointer" />
        Musli-& Proteinriegel
        <IoIosArrowForward className="text-xl cursor-pointer" />3 Bears Pocket
        Porrifage mohinge Banane 55g{" "}
      </p> */}

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
            {carouselImages.map((slide: any, inx: number) => (
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
            {carouselImages.map((slide: any) => (
              <CustomImage
                key={slide.id}
                src={slide.image_url}
                className=" object-cover"
                alt={`${slide.alt_text}`}
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
          <div className="mt-7 flex items-center border-2 rounded-md gap-1 font-semibold md:w-28 w-20 justify-around">
            <PiMinus onClick={handleMinusClick} className="cursor-pointer" />
            <p className="bg-primary p-1 px-3 text-white">{count}</p>
            <FiPlus onClick={handlePlusClick} className="cursor-pointer" />
          </div>
          <div className="mt-7">
            <Button onClick={addToCart}>{" Add Item "}</Button>
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
