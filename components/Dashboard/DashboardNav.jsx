import Image from "next/image";
import logo from '../../public/logo/jacmarketIcon.png'

const DashboardNav = () => {
    return (
      <div className="h-full w-full flex items-center justify-between gap-6 bg-white  shadow">
      <Image alt="logo " src={logo}/>
      </div>
    );
};

export default DashboardNav;