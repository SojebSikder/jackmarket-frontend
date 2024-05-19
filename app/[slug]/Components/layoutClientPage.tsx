"use client";
import DashboardNav from "../../../components/Dashboard/DashboardNav";
import DashboardSideBar from "../../../components/Dashboard/DashboardSideBar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/common/Footer";

const LayoutClientPage = ({
  children,
  isLoggedIn,
  footerData,
}: {
  children: any;
  isLoggedIn: any;
  footerData: any;
}) => {
  const [isActiveMenu, setIsActiveMenu] = useState(true);

  const pathname = usePathname();

  return (
    <div className="relative font-inter">
      <div className="fixed top-0 w-full z-40">
        <DashboardNav
          isLoggedIn={isLoggedIn}
          isActiveMenu={isActiveMenu}
          setIsActiveMenu={setIsActiveMenu}
        />
      </div>

      {/* Conditional rendering of DashboardSideBar */}
      <div
        className={`hidden lg:block fixed top-0  h-screen bg-white md:w-[240px] w-full pt-[66px] z-20 transition-all duration-300 overflow-y-auto `}
      >
        <DashboardSideBar
          isActiveMenu={isActiveMenu}
          setIsActiveMenu={setIsActiveMenu}
          pathname={pathname}
        />
      </div>
      {/* Conditional rendering of DashboardSideBar */}
      <div
        className={`lg:hidden block fixed top-0  h-screen bg-white md:w-[240px] w-full pt-[66px] z-20 transition-all duration-300 overflow-y-auto ${
          isActiveMenu ? "hidden" : "block"
        }`}
      >
        <DashboardSideBar
          isActiveMenu={isActiveMenu}
          setIsActiveMenu={setIsActiveMenu}
          pathname={pathname}
        />
      </div>

      <div className="lg:ml-[240px] min-h-screen lg:mt-[66px] mt-14 p-5">
        {children}
      </div>

      <div className="w-full lg:pl-[200px] pl-5">
        <Footer footerData={footerData} />
      </div>
    </div>
  );
};

export default LayoutClientPage;
