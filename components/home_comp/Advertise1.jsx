import Image from "next/image";
//image from
import advertiseImage from "../../public/Advertisement/landingBanner.png";

const Advertise1 = () => {
  return (
    <div className=" w-full h-screen ">
      <Image alt="" src={advertiseImage} className=" object-cover w-full h-full" />
    </div>
  );
};

export default Advertise1;
