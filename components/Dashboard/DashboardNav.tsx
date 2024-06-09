"use client";
import Image from "next/image";
import logo from "../../public/logo/jacmarketIcon.png";
import Link from "next/link"; // Import Link from next/link
import { useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

// icon in react icon
import { SlInfo } from "react-icons/sl";
import { BsCart4 } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import listIcon from "../../public/Dashboard/navbar/profile-icon.png";
import { FaUserPlus, FaFirstOrder } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { CookieHelper } from "@/helper/cookie.helper";
import { UtilHelper } from "@/helper/util.helper";
import { ProductService } from "@/service/product/product.service";

const DashboardNav = ({
  isActiveMenu,
  setIsActiveMenu,
  isLoggedIn,
}: {
  isActiveMenu?: any;
  setIsActiveMenu?: any;
  isLoggedIn?: any;
}) => {
  const [dropDownState, setDropDownState] = useState(false);
  const [userDrop, setUserDrop] = useState(false);
  const dropDownMenuRef = useRef();

  // useEffect(() => {
  //   const closeDropDown = (e) => {
  //     if (
  //       dropDownMenuRef.current &&
  //       !dropDownMenuRef.current.contains(e.target)
  //     ) {
  //       setDropDownState(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", closeDropDown);
  //   return () => {
  //     document.removeEventListener("mousedown", closeDropDown);
  //   };
  // }, []);

  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState();
  const [searchSuccess, setSearchSuccess] = useState(false);

  const searchProduct = async (value: string) => {
    try {
      const response = await ProductService.search(value);
      // console.log(response.data.data.data);

      setProducts(response.data.data.data);
      setSearchSuccess(true);
    } catch (error) {
      setSearchSuccess(false);
    }
  };

  const handleOnInput = (e: any) => {
    if (e.target.value) {
      setSearchText(e.target.value);
      setShowSearch(true);
      searchProduct(e.target.value);
    } else {
      setShowSearch(false);
    }
  };
  const showResult = UtilHelper.debounce(handleOnInput, 300);

  const handleOnClick = (e) => {
    if (!searchText) {
      return alert("Enter query to search");
    }
    window.location.href = `/search?q=${searchText}`;
  };
  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      if (!searchText) {
        return alert("Enter query to search");
      }
      window.location.href = `/search?q=${searchText}`;
    }
  };

  const handleLogout = () => {
    CookieHelper.destroy({ key: "token" });
    window.location.reload();
  };

  return (
    <div className="h-full w-full flex items-center justify-between gap-6 bg-white shadow-md shadow-gray-300 py-2 px-5">
      <div className="flex items-center gap-3">
        {/* menubar and close bar */}
        {isActiveMenu ? (
          <IoMdMenu
            onClick={() => setIsActiveMenu(!isActiveMenu)}
            className=" text-3xl lg:hidden block"
          />
        ) : (
          <MdOutlineClose
            onClick={() => setIsActiveMenu(!isActiveMenu)}
            className=" text-3xl lg:hidden block"
          />
        )}

        {/* Wrap Image component with Link component */}
        <Link href="/">
          {/* You need to use anchor tag inside Link */}
          <Image alt="logo" src={logo} className="w-10" />
        </Link>
      </div>

      <div className="flex items-center gap-10">
        {/* search bar */}

        <form className="flex ">
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              name="q"
              onInput={(e) => showResult(e)}
              onKeyUp={handleOnEnter}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-lg   border border-gray-300 lg:pr-52 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary"
              placeholder="Bread, milk, eggs..."
            />
            <button
              type="button"
              onClick={handleOnClick}
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-lg border border-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary  dark:hover:bg-primary dark:focus:ring-primary "
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
        <div
          style={{ display: !showSearch && "none" }}
          className="absolute max-md:top-[43px] top-[52px]  z-[200] bg-white border-[#e5e5e5] border"
        >
          <div className="list-search pt-[15px] max-h-[400px] scrollbar-hide overflow-auto">
            <ul>
              {searchSuccess && products.length > 0 ? (
                products.map((item: any, i) => (
                  <li key={i}>
                    <a
                      href={`/products/${item.id}`}
                      className="flex items-center p-[5px_15px] border-b border-[#e5e5e5]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element*/}
                      <img
                        src={item.images.length > 0 && item.images[0].image_url}
                        width="65"
                        height="65"
                        alt="img"
                        className="mr-[15px]"
                      />
                      <p className="text-[12px]">{item.name}</p>
                    </a>
                  </li>
                ))
              ) : (
                <li>Item not found</li>
              )}
            </ul>
          </div>
          {/* <div className="bottom-btn w-full p-[15px_54px] border-t border-[#e5e5e5]">
            <button
              onClick={handleOnClick}
              className="text-[13px] font-medium p-[10px_15px] border border-black w-full hover:bg-black hover:text-white delay-50 transition-all"
            >
              SEE ALL {">"}
            </button>
          </div> */}
        </div>

        {/* links */}
        <div className="lg:flex items-center gap-4 hidden ">
          {isLoggedIn ? (
            <Link href="/myproduct" className=" flex items-center gap-1">
              <Image alt="logo" src={listIcon} className="w-5" />
              <span className=" text-sm">My products</span>
            </Link>
          ) : (
            <></>
          )}

          <Link href="#" className=" flex items-center gap-1">
            <LuUser2 />

            <div className="relative" ref={dropDownMenuRef}>
              <button
                onClick={() => setDropDownState(!dropDownState)}
                className="relative flex items-center gap-1 py-2 "
              >
                <span>My account</span>
              </button>
              {dropDownState && (
                <ul className="absolute top-10 left-0 z-10 space-y-2 rounded  bg-white  p-2 text-gray-700 w-52 border">
                  {isLoggedIn ? (
                    <>
                      <li className="px-3 hover:underline">
                        <Link
                          href="/profile"
                          className=" flex items-center gap-1 border-b pb-2"
                        >
                          {" "}
                          <FaUserPlus />{" "}
                          <span className=" text-sm">Profile</span>
                        </Link>
                      </li>
                      <li className="px-3 hover:underline">
                        <Link
                          href="/myorder"
                          className=" flex items-center gap-1 border-b pb-2"
                        >
                          {" "}
                          <FaFirstOrder />{" "}
                          <span className=" text-sm">My order</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="px-3 hover:underline">
                      <Link
                        href="/account"
                        className=" flex items-center gap-1 border-b pb-2"
                      >
                        {" "}
                        <FaUserPlus />{" "}
                        <span className=" text-sm">
                          Create account / Log In
                        </span>
                      </Link>
                    </li>
                  )}

                  <li className="px-3 hover:underline">
                    <Link
                      href="/faq"
                      className=" flex items-center gap-1 border-b pb-2 "
                    >
                      <FaQuestion /> <span className=" text-sm">FAQ</span>
                    </Link>
                  </li>
                  <li className="px-3 hover:underline">
                    <Link href="/help" className=" flex items-center gap-1 ">
                      <TiMessages />{" "}
                      <span className=" text-sm">Need Help?</span>
                    </Link>
                  </li>

                  {isLoggedIn ? (
                    <li className="px-3 hover:underline">
                      <button
                        onClick={handleLogout}
                        className=" flex items-center gap-1 border-b pb-2"
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              )}
            </div>
          </Link>
          <Link href="/help" className=" flex items-center gap-1">
            <SlInfo />
            <span className=" text-sm">Help & contact</span>
          </Link>
          <Link
            href="/cart"
            className=" flex items-center gap-1 border border-black rounded-2xl p-2"
          >
            <BsCart4 />
            <span className=" text-sm">Basket</span>
          </Link>
        </div>

        {/* mobile view  */}
        <div className="block lg:hidden relative" ref={dropDownMenuRef}>
          <button
            onClick={() => setUserDrop(!userDrop)}
            className="relative flex items-center gap-1 py-2 "
          >
            <FaUser className="text-2xl cursor-pointer" />
          </button>
          {userDrop && (
            <div className="absolute lg:flex items-center gap-4   top-12 right-2 z-10 space-y-2 rounded  bg-white  p-2 text-gray-700 w-52 border">
              <Link
                href="/dashboard/productDetails"
                className=" flex items-center gap-1"
              >
                <Image alt="logo" src={listIcon} className="w-5" />
                <span className=" text-sm">My products</span>
              </Link>
              <Link href="#" className=" flex items-center gap-1">
                <LuUser2 />

                <div className="relative" ref={dropDownMenuRef}>
                  <button
                    onClick={() => setDropDownState(!dropDownState)}
                    className="relative flex items-center gap-1 py-2 "
                  >
                    <span>My account</span>
                  </button>
                  {dropDownState && (
                    <ul className="absolute top-10 right-0 z-10 space-y-2 rounded  bg-white  p-2 text-gray-700 w-52 border">
                      <li className="px-3 hover:underline">
                        <Link
                          href="/register"
                          className=" flex items-center gap-1 border-b pb-2"
                        >
                          {" "}
                          <FaUserPlus />{" "}
                          <span className=" text-sm">
                            Create account / Log In
                          </span>
                        </Link>
                      </li>
                      <li className="px-3 hover:underline">
                        <Link
                          href="#"
                          className=" flex items-center gap-1 border-b pb-2 "
                        >
                          <FaQuestion /> <span className=" text-sm">FAQ</span>
                        </Link>
                      </li>
                      <li className="px-3 hover:underline">
                        <Link href="#" className=" flex items-center gap-1 ">
                          <TiMessages />{" "}
                          <span className=" text-sm">Need Help?</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </Link>
              <Link
                href="/dashboard/help&contact"
                className=" flex items-center gap-1"
              >
                <SlInfo />
                <span className=" text-sm">Help & contact</span>
              </Link>
              <Link
                href="/shoppingCard"
                className=" flex items-center gap-1 border border-black rounded-2xl p-2"
              >
                <BsCart4 />
                <span className=" text-sm">Basket</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
