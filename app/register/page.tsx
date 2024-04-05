
"use client"
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

const page = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <DashboardNav />
            <div className=' flex items-center justify-center  w-full  lg:mt-12 p-10' >
                <div className=" lg:w-96 w-full  ">
                    <p className=" flex  text-sm text-gray-600 font-semibold"><Link href='/dashboard' className='underline'><IoIosArrowBack className="text-xl cursor-pointer" /> </Link>Back  </p>
                    <h1 className='font-bold text-3xl mt-4 mb-2'>Create an account</h1>
                    <p className='mb-2 text-gray-600'>Let’s get you ready to place your order</p>


                    {/* Input fields and the form started */}
                    <form action="" className="space-y-6 mt-4">
                        <div className=" text-sm flex items-center gap-3">

                            <input type="text" name="FName" id="FName" placeholder="FIRST NAME" className="w-full px-4 py-3  border border-gray-300 bg-white   " />
                            <input type="text" name="  LName" id="LName" placeholder="LAST NAME" className="w-full px-4 py-3  border border-gray-300 bg-white   " />
                        </div>
                        <div className="space-y-2 text-sm">

                            <input type="email" name="email" id="email" placeholder="EMAIL" className="w-full px-4 py-3  border border-gray-300 bg-white   " />
                        </div>
                        <div className="space-y-2 text-sm relative  ">

                            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="PASSWORD" className="w-full px-4 py-3  border border-gray-300 bg-white  " />

                            <span className=" absolute right-5 top-1  cursor-pointer text-2xl text-[#3994e4] " onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>

                           
                               
                           
                        </div>
                         <p  className=" text-center text-xs mt-3 ">
                                    By creating an account, you agree to our Terms of Use and  <br/> Privacy Policy .
                                </p>
                        {/* Sign in Button */}
                        <button className=" rounded p-2 px-4 font-semibold text-white bg-primary duration-300 active:scale-95 w-full"> Create account  </button>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default page;