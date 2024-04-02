
import AngeboteCard from "@/components/Dashboard/AngeboteCard";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const page = () => {
    return (
        <div className="">
            {/* 1st card */}
            <div className=" flex justify-between">
                <h1 className=" font-bold text-xl ">Angebote 💸</h1>
                <div className="flex items-center gap-2 mt-5">
                    <IoIosArrowBack className="text-xl cursor-pointer" />
                    <IoIosArrowForward className="text-xl cursor-pointer" />

                </div>

            </div>
            <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5 my-4">
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                
            </div>
            {/* 2nd card */}
            <div className=" flex justify-between mt-10">
                <h1 className=" font-bold text-xl ">Angebote 💸</h1>
                <div className="flex items-center gap-2 mt-5">
                    <IoIosArrowBack className="text-xl cursor-pointer" />
                    <IoIosArrowForward className="text-xl cursor-pointer" />

                </div>

            </div>
            <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5 my-4">
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                
            </div>
            {/* 3rd card */}
            <div className=" flex justify-between mt-10">
                <h1 className=" font-bold text-xl ">Angebote 💸</h1>
                <div className="flex items-center gap-2 mt-5">
                    <IoIosArrowBack className="text-xl cursor-pointer" />
                    <IoIosArrowForward className="text-xl cursor-pointer" />

                </div>

            </div>
            <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5 my-4">
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                <AngeboteCard />
                
            </div>

        </div>
    );
};

export default page;