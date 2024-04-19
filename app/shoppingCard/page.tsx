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
    const [openModal, setOpenModal] = useState(false);

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
                        <button onClick={() => setOpenModal(true)} className='bg-primary p-3 text-white w-full rounded-md mt-4 font-semibold'>Checkout</button>

                        {/* checkout  modal  */}

                        <div className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 `}>
                            <div className={`absolute max-w-md rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white md:w-96 w-60  ${openModal ? 'scale-1 opacity-1 duration-300 ' : 'scale-0 opacity-0 duration-150'} `}>
                                <svg onClick={() => setOpenModal(false)} className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                                <h1 className="mb-2 text-2xl font-semibold">Flink&apos;s delivery fee</h1>
                                <p className="px-1 mb-3 text-sm opacity-80">Your delivery fee is only €1.99 </p>
                                <div className='  p-3 rounded-md'>
                                    <h3 className='flex items-center justify-between font-semibold text-gray-500'> <span>Subtotal</span>  <span>€37.58</span> </h3>
                                    <h3 className='flex items-center justify-between py-3 '><span>Deposit</span>   <span>€37.58</span> </h3>
                                    <h3 className='flex items-center justify-between  pb-4 '><span className="flex items-center gap-1 ">Delivery fee <IoMdInformationCircleOutline className="text-red-600 cursor-pointer" />
                                    </span>   <span>€37.58</span> </h3>
                                    
                                    
                                </div>
                                <Link href='/login' className='' onClick={() => setOpenModal(false)} ><button className=" rounded p-2 px-4 font-semibold  bg-[#E9D7D8] text-primary duration-300 active:scale-95 w-full"> Shop now  </button></Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;