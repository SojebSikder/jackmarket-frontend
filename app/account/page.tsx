import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import { AuthHelper } from "@/helper/auth.helper";
const Page = async () => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();

  return (
    <div>
      <DashboardNav isLoggedIn={isLoggedIn} />
      <div className=" flex items-center justify-center  w-full  lg:mt-28 ">
        <div className="  ">
          <p className=" flex  text-sm text-gray-600 font-semibold">
            <Link href="/dashboard" className="underline">
              <IoIosArrowBack className="text-xl cursor-pointer" />{" "}
            </Link>
            Back{" "}
          </p>
          <h1 className="font-bold text-3xl my-4">Let&apos;s get started</h1>
          <p className="mb-2">
            To continue checking out, please sign into your <br /> Flink
            account. If you don&apos;t yet have an account, <br /> you can
            create one now.
          </p>

          <div className="flex flex-col gap-3 mt-5">
            <Link href="/register" className="">
              <button className=" rounded p-2 px-4 font-semibold text-white bg-primary duration-300 active:scale-95 w-full">
                {" "}
                Create account{" "}
              </button>
            </Link>
            <Link href="/login" className="">
              <button className=" rounded p-2 px-4 font-semibold  bg-[#E9D7D8] text-primary duration-300 active:scale-95 w-full">
                {" "}
                Login{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
