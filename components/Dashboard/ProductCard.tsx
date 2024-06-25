"use client";

import img1 from "../../public/Dashboard/anogebote/image (4).png";
import icon from "../../public/Dashboard/anogebote/icon.png";
import Image from "next/image";
import Link from "next/link";
import CustomImage from "../common/CustomImage";
import { useRef, useState } from "react";
import { CustomToast } from "@/utils/Toast/CustomToast";
import { CartService } from "@/service/cart/cart.service";
import CustomToastContainer from "../CustomToast/CustomToastContainer";

const ProductCard = ({ product }: { product: any }) => {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toastId = useRef<any>(null);

  const [count, setCount] = useState(1);

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

  return (
    <div className="w-44">
      {/* <Link href={`/products/${product.id}`} className="w-44 "> */}
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`} className="w-44 ">
          <CustomImage
            src={`${product.images[0].image_url}`}
            style={{ height: "300px", width: "300px" }}
            height={300}
            width={300}
            alt=""
            // className="w-full object-contain "
          />
        </Link>
        {/* <div className="bg-primary -skew-x-[16deg] w-12 h-16  absolute top-0 right-3  "></div>
        <div className="bg-secondary -skew-x-[17deg] w-16 h-6  absolute top-5 right-5  "></div>
        <p className="absolute top-[2px] right-2 text-xs text-white font-bold">
          - {product.discount}%
        </p>
        <p className="absolute top-5 right-7 text-white font-semibold">0.22€</p>
        <p className="absolute top-[45px] right-7 text-[10px] text-white font-bold">
          {" "}
          <del>0.72€</del>
        </p> */}
        <button
          // href="/shoppingCard"
          onClick={addToCart}
          className="bg-primary p-1 rounded-md w-8 absolute bottom-0 right-2 cursor-pointer active:scale-95 duration-200"
        >
          <Image src={icon} alt="" className=" w-full object-cover " />
        </button>
      </div>
      {/* <p>
        €1.32 <del className="text-gray-500">€1.89</del>
      </p> */}
      <Link href={`/products/${product.id}`} className="w-44 ">
        <h3 className=" font-semibold">{product.name}</h3>
        {/* <p>€24.00 / 1kg</p> */}
        <p>
          {product.currency_sign}
          {product.new_price}
          <del className="text-gray-500">
            {product.currency_sign}
            {product.price}
          </del>
        </p>
      </Link>
      {/* </Link> */}
    </div>
  );
};

export default ProductCard;
