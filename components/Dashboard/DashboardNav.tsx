"use client";
import Image from "next/image";
import logo from "../../public/logo/jacmarketIcon.png";
import Link from "next/link"; // Import Link from next/link

const DashboardNav = () => {
  return (
    <div className="h-full w-full flex items-center justify-between gap-6 bg-white shadow-md shadow-gray-300 py-2 px-10">
      {/* Wrap Image component with Link component */}
      <Link href="/">
        
          {/* You need to use anchor tag inside Link */}
          <Image alt="logo" src={logo} className="w-10" />
        
      </Link>

      <div>{/* search bar */}</div>
    </div>
  );
};

export default DashboardNav;
