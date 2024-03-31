"use client";
import DashboardNav from "./../../components/Dashboard/DashboardNav";
import DashboardSideBar from "./../../components/Dashboard/DashboardSideBar";
import Footer from "./../../components/common/Footer";
import { useState } from "react";
import { usePathname } from "next/navigation";
const Dashboard = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const pathname = usePathname();
  return (
    <div className=" relative font-inter">
      <div className=" fixed top-0 w-full  z-20">
        <DashboardNav />
      </div>
      <div className="hidden lg:block  fixed top-0 left-0 h-screen bg-white w-[240px] pt-[66px] z-10 ">
        <DashboardSideBar
          isActiveMenu={isActiveMenu}
          setIsActiveMenu={setIsActiveMenu}
          pathname={pathname}
        />
      </div>
      <div className=" lg:ml-[240px]  min-h-screen bg-slate-300 lg:mt-[66px] p-5 ">
        {children}
      </div>
      <div className=" w-full  lg:pl-[200px] pl-5  ">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
