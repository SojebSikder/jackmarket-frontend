
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
const page = () => {
    return (
        <div className='  flex bg-gray-300 relative    '>
             <div className='  flex justify-between absolute top-0 right-2	'><AiOutlineClose className='-mt-5  text-2xl duration-200 active:scale-95'  /></div>
            <h2></h2>
            

            <Link href='#' className=''><button className=" rounded p-2 px-4 font-semibold  bg-[#E9D7D8] text-primary duration-300 active:scale-95 w-full"> Shop now  </button></Link>
        </div>
    );
};

export default page;