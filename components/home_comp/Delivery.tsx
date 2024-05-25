import Image from "next/image";
import Button from "../common/Button";
import image from "../../public/Delivery/world-map.png";
import Link from "next/link";
const Delivery = () => {
  return (
    <div className=" md:flex justify-center items-center md:gap-32 lg:px-32 md:px-10 px-5 my-32">
      <div className=" my-5 flex-1 ">
        <h1 className=" font-bold text-3xl text-secondary">
          You order, we deliver
        </h1>
        <p className="text-gray-600 my-5 font-medium md:w-64 ">
          We&apos;re already in 100+ cities, but if you don’t find yours – we’re
          on our way to deliver your groceries! Sign up now to stay in the know.
        </p>

        <Link href={"/home"}>
          <Button>Start Shopping</Button>
        </Link>
        <p className="mt-10 md:text-lg text-sm text-gray-500">
          City not listed?{" "}
          <span className=" text-secondary underline cursor-pointer">
            Signup for our waitlist
          </span>
        </p>
      </div>
      <div className="flex-1">
        <Image alt={"world map"} src={image} className="w-72" />
      </div>
    </div>
  );
};

export default Delivery;
