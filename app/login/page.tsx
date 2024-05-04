"use client";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { UserService } from "@/service/user/user.service";
import { CustomToast } from "@/utils/Toast/CustomToast";
import { useRouter } from "next/navigation";
import { CookieHelper } from "@/helper/cookie.helper";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toastId = useRef<any>(null);

  // handle login
  const handleLogin = async (e: any) => {
    e.preventDefault();
    toastId.current = CustomToast.show("Please wait...");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = {
      email: email,
      password: password,
    };
    setMessage(null);
    setErrorMessage("");
    setLoading(true);
    try {
      const userService = await UserService.login(data);
      const response = userService.data;
      if (response.success) {
        setMessage(response.message);
        setLoading(false);

        CustomToast.update(toastId.current, response.message);

        if (response.authorization) {
          CookieHelper.set({
            key: "token",
            value: response.authorization.token,
          });
          document.location.href = "/";
          // router.push(`/auth/login`);
        }
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
    <div>
      <DashboardNav />
      <div className=" flex items-center justify-center  w-full  lg:mt-20 p-10 ">
        <div className=" lg:w-96 w-full  ">
          <p className=" flex  text-sm text-gray-600 font-semibold">
            <Link href="/dashboard" className="underline">
              <IoIosArrowBack className="text-xl cursor-pointer" />{" "}
            </Link>
            Back{" "}
          </p>
          <h1 className="font-bold text-3xl mt-4 mb-2">Welcome back</h1>
          <p className="mb-2 text-gray-600">
            To log in, please enter your details below.
          </p>

          {loading && <div>Please wait...</div>}
          {/* {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>} */}
          <CustomToastContainer />

          {/* Input fields and the form started */}
          <form onSubmit={handleLogin} className="space-y-6 mt-4">
            <div className="space-y-2 text-sm">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="EMAIL"
                className="w-full px-4 py-3  border border-gray-300 bg-white   "
              />
            </div>
            <div className="space-y-2 text-sm relative  ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="PASSWORD"
                className="w-full px-4 py-3  border border-gray-300 bg-white  "
              />

              <span
                className=" absolute right-5 top-1  cursor-pointer text-2xl text-[#3994e4] "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>

              <div className="flex justify-end text-xs ">
                <a href="/forgetPass" className="hover:underline text-primary">
                  Forgot your Password?
                </a>
              </div>
            </div>
            {/* Sign in Button */}
            <button
              type="submit"
              className=" rounded p-2 px-4 font-semibold text-white bg-primary duration-300 active:scale-95 w-full"
            >
              {" "}
              Login{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
