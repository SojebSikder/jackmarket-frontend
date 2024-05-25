import ProductCard from "@/components/Dashboard/ProductCard";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
const Page = () => {
  return (
    <div>
      <p className=" flex  text-sm text-gray-600 font-semibold">
        <Link href="/dashboard">Home</Link>{" "}
        <IoIosArrowForward className="text-xl cursor-pointer" />
        Frisch & Fertig{" "}
      </p>

      <div className="flex justify-between mt-5 border-b-2  pb-7 ">
        <h1 className="text-2xl font-bold ">Frisch & Fertig</h1>
        <p className="text-sm text-gray-400 font-semibold">145 product </p>
      </div>
      {/* 1st card */}
      <div className=" flex justify-between mt-10">
        <h1 className=" font-bold text-xl ">Obst- & Gemüse-Snacks</h1>
        <div className="flex items-center gap-2 mt-5">
          <IoIosArrowBack className="text-xl cursor-pointer" />
          <IoIosArrowForward className="text-xl cursor-pointer" />
        </div>
      </div>
      <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-5 my-4">
        {/* <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /> */}
      </div>
      {/* 2nd card */}
      <div className=" flex justify-between mt-20">
        <h1 className=" font-bold text-xl ">Sushi</h1>
        <div className="flex items-center gap-2 mt-5">
          <IoIosArrowBack className="text-xl cursor-pointer" />
          <IoIosArrowForward className="text-xl cursor-pointer" />
        </div>
      </div>
      <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-5 my-4 mb-10">
        {/* <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /> */}
      </div>
    </div>
  );
};

export default Page;
