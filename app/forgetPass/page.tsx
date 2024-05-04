import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import { AuthHelper } from "@/helper/auth.helper";

const Page = async () => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();
  return (
    <div>
      <DashboardNav isLoggedIn={isLoggedIn} />
      <div className=" flex items-center justify-center  w-full  lg:mt-28 md:mt-10 p-10 ">
        <div className="  ">
          <p className=" flex  text-sm text-gray-600 font-semibold">
            <Link href="/dashboard" className="underline">
              <IoIosArrowBack className="text-xl cursor-pointer" />{" "}
            </Link>
            Back{" "}
          </p>
          <h1 className="font-bold text-3xl my-4">Forgot Password</h1>
          <p className="mb-2">
            Give us your email and we’ll send you <br /> instructions on how to
            reset your password
          </p>

          <div className="space-y-2 text-sm my-4">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="EMAIL"
              className="w-full px-4 py-3  border border-gray-300 bg-white   "
            />
          </div>

          <Link href="/register" className="">
            <button className=" rounded p-2 px-4 font-semibold text-white bg-primary duration-300 active:scale-95 w-full">
              {" "}
              Send instructions{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
