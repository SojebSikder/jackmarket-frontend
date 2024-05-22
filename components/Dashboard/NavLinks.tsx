"use client";
import Link from "next/link";
import HomeIcon from "../../public/Dashboard/SideBar/HomeIcon.png";
import PacketIcon from "../../public/Dashboard/SideBar/PacketIcon.png";
import BurgerIcon from "../../public/Dashboard/SideBar/BurgerIcon.png";
import StickIcon from "../../public/Dashboard/SideBar/stickIcon.png";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const NavLinks = ({ pathname, isActiveMenu, categoryData }) => {
  const [dropDownState, setDropDownState] = useState(false);
  return (
    <div className="pl-2 py-4">
      <Link href="/">
        <div className="flex items-center gap-2 pb-7 hover:tracking-[0.1em] duration-200 hover:scale-95  ">
          <Image src={HomeIcon} alt="Home icon" /> Home
        </div>
      </Link>

      <h2 className=" uppercase text-gray-500 font-semibold text-sm pb-3">
        Categories
      </h2>
      {/* <Link
        href="/dashboard"
        className={` ${
          pathname === "/dashboard"
            ? "text-black font-semibold bg-gray-300 "
            : "text-gray-600 "
        }`}
      >
        <h1 className="flex items-center gap-2 my-3 hover:tracking-[0.1em] duration-200 hover:scale-95 ">
          <Image src={HomeIcon} alt="Home icon" /> Angebote
        </h1>
      </Link>

      <Link
        href="/dashboard/hotFood"
        className={` ${
          pathname === "/dashboard/hotFood"
            ? "text-black font-semibold bg-gray-300 "
            : "text-gray-600 "
        }`}
      >
        <h1 className="flex items-center gap-2 my-3 hover:tracking-[0.1em] duration-200 hover:scale-95">
          <Image src={PacketIcon} alt="Home icon" /> Hot food by Curb
        </h1>
      </Link> */}

      {categoryData.map((category: any) => {
        return (
          <>
            <div key={category.id}>
              <h1 className="flex items-center gap-2 my-3 hover:tracking-[0.1em] duration-200 hover:scale-95">
                <Image src={BurgerIcon} alt="Home icon" />
                <Link
                  href={`/products?category=${category.id}`}
                  // onClick={() => setDropDownState(!dropDownState)}
                  className={`${
                    pathname === `/products?category=${category.id}`
                      ? "text-black font-semibold bg-gray-300 "
                      : "text-gray-600 "
                  }`}
                >
                  {category.name}
                </Link>
                {category.sub_categories.length > 0 &&
                  (dropDownState ? (
                    <IoIosArrowUp
                      className="duration-150"
                      onClick={() => setDropDownState(!dropDownState)}
                    />
                  ) : (
                    <IoIosArrowDown
                      className="duration-150"
                      onClick={() => setDropDownState(!dropDownState)}
                    />
                  ))}
              </h1>
              {category.sub_categories.map((subCategory: any) => {
                return (
                  <div key={subCategory.id} className="duration-300">
                    {dropDownState && (
                      <ul className="duration-300 ">
                        <li className="px-3 hover:tracking-[0.1em] duration-200 hover:scale-95">
                          <Link
                            href={`/products?category=${subCategory.id}`}
                            className={` ${
                              pathname === "/dashboard/frisch&fertig/snacks"
                                ? "text-black font-semibold  "
                                : "text-gray-600 "
                            }`}
                          >
                            {subCategory.name}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        );
      })}

      {/* <Link
        href="/dashboard/feinkost"
        className={` ${
          pathname === "/dashboard/feinkost"
            ? "text-black font-semibold bg-gray-300 "
            : "text-gray-600 "
        }`}
      >
        <h1 className="flex items-center gap-2 my-3 hover:tracking-[0.1em] duration-200 hover:scale-95">
          <Image src={StickIcon} alt="Home icon" /> Feinkost
        </h1>
      </Link>
      <Link
        href="/dashboard/frisch&fertig"
        className={` ${
          pathname === "/dashboard/frisch&fertig"
            ? "text-black font-semibold bg-gray-300 "
            : "text-gray-600 "
        }`}
      >
        <h1 className="flex items-center gap-2 my-3 hover:tracking-[0.1em] duration-200 hover:scale-95">
          <Image src={BurgerIcon} alt="Home icon" /> Frisch & Fertig
        </h1>
      </Link>
      <Link
        href="/dashboard/frisch&fertig"
        className={` ${
          pathname === "/dashboard/frisch&fertig"
            ? "text-black font-semibold bg-gray-300 "
            : "text-gray-600 "
        }`}
      >
        <h1 className="flex items-center gap-2 my-3 hover:tracking-[0.1em] duration-200 hover:scale-95">
          <Image src={BurgerIcon} alt="Home icon" /> Frisch & Fertig
        </h1>
      </Link>
      <Link
        href="/dashboard/frisch&fertig"
        className={` ${
          pathname === "/dashboard/frisch&fertig"
            ? "text-black font-semibold bg-gray-300 "
            : "text-gray-600 "
        }`}
      >
        <h1 className="flex items-center gap-2 my-3 hover:tracking-[0.1em] duration-200 hover:scale-95">
          <Image src={BurgerIcon} alt="Home icon" /> Frisch & Fertig
        </h1>
      </Link>
      <Link
        href="/dashboard/frisch&fertig/frisch&fertig"
        className={` ${
          pathname === "/dashboard/frisch&fertig"
            ? "text-black font-semibold bg-gray-300 "
            : "text-gray-600 "
        }`}
      >
        <h1 className="flex items-center gap-2 my-3 hover:tracking-[0.1em] duration-200 hover:scale-95">
          <Image src={BurgerIcon} alt="Home icon" /> Frisch & Fertig
        </h1>
      </Link>
      <Link
        href="/dashboard/frisch&fertig"
        className={` ${
          pathname === "/dashboard/frisch&fertig"
            ? "text-black font-semibold bg-gray-300 "
            : "text-gray-600 "
        }`}
      >
        <h1 className="flex items-center gap-2 hover:tracking-[0.1em] duration-200 hover:scale-95">
          <Image src={BurgerIcon} alt="Home icon" /> Frisch & Fertig
        </h1>
      </Link> */}
    </div>
  );
};

export default NavLinks;
