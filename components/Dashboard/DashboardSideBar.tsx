import NavLinks from "./NavLinks";
import { useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { LocaltionManager } from "@/utils/LocationManager";
import { CookieHelper } from "@/helper/cookie.helper";

const DashboardSideBar = ({
  isActiveMenu,
  setIsActiveMenu,
  pathname,
  categoryData,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [locationImageUrl, setLocationImageUrl] = useState();

  const [address, setAddress] = useState(CookieHelper.get({ key: "address1" }));

  const getCurrentLocation = () => {
    LocaltionManager.getLocation(setLocationImageUrl);
  };

  const handleAddressInputChange = (e: any) => {
    CookieHelper.set({ key: "address1", value: e.target.value });
    setAddress(e.target.value);
  };

  return (
    <div className="p-2 ">
      <div
        onClick={() => setOpenModal(true)}
        className=" flex items-center  gap-1 shadow-md  shadow-gray-400 rounded cursor-pointer duration-200 active:scale-95 overflow-y-auto"
      >
        <h2 className=" text-blue-600 bg-gray-100 p-2 px-3 m-2 rounded-md font-bold text-xs text-center">
          {/* 12 <br /> min. */}
        </h2>
        <div>
          <p className=" font-semibold text-gray-400 text-[12px] pb-1 ">
            We need your address
          </p>
          <p className=" font-bold text-red-400 text-[14px]">
            Add delivery address
          </p>
        </div>
      </div>
      {/* modal */}
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`text- absolute  md:w-[700px] rounded-xl drop-shadow-lg dark:bg-black dark:text-white ${
            openModal
              ? "scale-1 opacity-1 duration-300"
              : "scale-0 opacity-0 duration-150"
          }`}
        >
          <div className="  flex bg-white  md:h-96    ">
            <div className="bg-[#fdd8e9] text-primary px-5 py-10 rounded-s-2xl ">
              <h1 className="text-2xl font-bold mb-6">
                Enter your <br /> address
              </h1>
              <p>
                Get all your favorites <br /> delivered right to your <br />{" "}
                door.
              </p>
            </div>
            <div className="flex-1 px-5 py-10 rounded-e-2xl  ">
              <div className="  flex justify-between	">
                <h2 className="text-xl font-semibold mb-5 ">
                  Let’s check if we deliver to you
                </h2>
                <button
                  onClick={() => setOpenModal(false)}
                  className=" border hover:border-red-600 p-1 text-red-600 duration-150 hover:bg-red-600 hover:text-white -mt-6 rounded-full w-10 h-10 flex justify-center items-center "
                >
                  <AiOutlineClose className="  text-2xl duration-200 active:scale-95" />
                </button>
              </div>

              <form className="">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <GrFormSearch className="text-2xl text-gray-700" />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-800  bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={handleAddressInputChange}
                  />
                </div>
              </form>
              {/* <button onClick={getCurrentLocation}>
                <h3 className="font-semibold pl-4 mt-4">
                  Use my current location
                </h3>
                <p className=" pl-4 text-base text-gray-600">
                  Use my current location
                </p>
              </button>
              <img src={locationImageUrl} /> */}
            </div>
          </div>
        </div>
      </div>

      <NavLinks
        pathname={pathname}
        isActiveMenu={isActiveMenu}
        categoryData={categoryData}
      />
    </div>
  );
};

export default DashboardSideBar;
