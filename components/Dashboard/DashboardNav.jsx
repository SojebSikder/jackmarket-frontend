import Image from "next/image";
import logo from '../../public/logo/jacmarketIcon.png'

const DashboardNav = () => {
    return (
      <div className="h-full w-full flex items-center   justify-between gap-6 bg-white  shadow py-2 px-10">
      <Image alt="logo " src={logo} className="w-10  "/>

      <div>
        {/* search bar */}

      </div>
      </div>
    );
};

export default DashboardNav;