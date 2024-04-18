'use client'
import DashboardNav from "@/components/Dashboard/DashboardNav";
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";
import cycleIcon from "../../public/Dashboard/ShoppingCart/cycle-icon.png"
import busket from "../../public/Dashboard/ShoppingCart/buskat 1.png"
import item from "../../public/Dashboard/ShoppingCart/image (7).png"
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { PiMinus } from "react-icons/pi";
import { useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";




const Page = () => {
    const [count, setCount] = useState(2);

    const handleMinusClick = () => {
        setCount(count - 1);
    };

    const handlePlusClick = () => {
        setCount(count + 1);
    };
    return (
        <div>
            <DashboardNav />
            <div className="md:px-10 px-5 py-5">
                <p className=" flex  text-sm text-gray-600 font-semibold"><Link href='/dashboard'></Link> <IoIosArrowBack className="text-xl cursor-pointer" />Continue shopping </p>
                <h1 className=" font-bold text-2xl py-5">Shopping cart </h1>
                <div className=" flex  items-center gap-5">
                    <Link href='#'><button className=" p-2 bg-primary text-white  flex gap-2 items-center rounded-md active:scale-95 duration-200 "><Image src={cycleIcon} alt="logo" /> Delivery</button></Link>
                    <Link href='#'><button className=" p-2 border border-black flex gap-2 items-center rounded-md active:scale-95 duration-200 text-gray-700"><Image src={busket} alt="logo" /> Click & Collect</button></Link>


                </div>
                {/* total card */}
                <div className='lg:flex  gap-5 justify-between mt-5'>
                    {/* 1st cart */}

                    <div  className=' over-flow-hidden'>
                        {/* header */}
                        <div className=" flex items-center lg:gap-80 md:gap-44 gap-5  uppercase bg-gray-200 p-2 mt-5 rounded-md px-5 font-semibold text-gray-600 
                        text-[8px] md:text-base">
                            <h3>YourItems (3)</h3>
                            <div className=" flex items-center  gap-2 md:gap-8 ">
                                <h3>Quantity</h3>
                                <h3>item Price </h3>
                                <h3>items total</h3>
                            </div>
                        </div>
                        {/* items */}
                        <div className="my-3 flex items-center gap-5 border-b border-black pb-3">
                            <Image src={item} alt="item" />
                            <h2 className=" font-semibold md:block hidden ">Ben & Jerry&lsquo;s Chocolate Fudge Bronle 465ml</h2>
                            <div className="flex items-center border-2 rounded-md gap-1 font-semibold md:w-28 w-20 justify-around">
                                <PiMinus onClick={handleMinusClick} className='cursor-pointer' />
                                <p className="bg-primary p-1 px-3 text-white">{count}</p>
                                <FiPlus onClick={handlePlusClick} className='cursor-pointer'  />
                            </div>
                            <p className="md:text-lg text-xs md:pl-5 pl-1">€6.79<span className="text-sm"><br /> €14.60 / 1l</span></p>
                            <p className="md:text-lg text-xs md:pl-5 ">€13.58</p>

                        </div>
                        <p className=" flex  text-sm text-gray-600 font-semibold"><Link href='/dashboard'></Link> <IoIosArrowBack className="text-xl cursor-pointer" />Continue shopping </p>
                    </div>

                    {/* 2nd cart */}
                    <div className=' flex-1 mt-5'>
                        <div className=' bg-gray-200 p-3 rounded-md'>
                            <h3 className='flex items-center justify-between font-semibold'> <span>Subtotal</span>  <span>€37.58</span> </h3>
                        <h3 className='flex items-center justify-between py-3 '><span>Deposit</span>   <span>€37.58</span> </h3>
                        <h3 className='flex items-center justify-between border-b border-gray-400 pb-4 '><span className="flex items-center gap-1 ">Delivery fee <IoMdInformationCircleOutline className="text-red-600 cursor-pointer" />
 </span>   <span>€37.58</span> </h3>
                        <h3 className='flex items-center justify-between font-semibold mt-2'><span>Total</span>   <span>€37.58</span> </h3>
                        <p className='text-gray-500 text-xs mt-2'>incl. VAT</p>
                        </div>
                        <Link href='#'><button className='bg-primary p-3 text-white w-full rounded-md mt-4 font-semibold'>Checkout</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;