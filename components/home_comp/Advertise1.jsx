import Image from "next/image";
//image from
import advertiseImage from "../../assets/Advertisement/landingBanner.png";

const Advertise1 = () => {
  return (
    <div className=" w-full h-screen ">
      <Image alt="" src={advertiseImage} className=" object-cover w-full" />
    </div>
  );
};

export default Advertise1;
