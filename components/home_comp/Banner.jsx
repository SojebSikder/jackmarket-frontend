import Image from "next/image";
import logo from "../../assets/logo/jacmarketIcon.png";
import Button from './../common/Button';

const Banner = () => {
  return (
    <div className="bg-sPrimary h-screen lg:px-20 lg:pt-32 flex item-center justify-between gap-96 ">
      <div className=" flex-1">
        <Image src={logo} width={60} height={30} alt="logo" />
        <h1 className=" font-bold text-5xl text-secondary pt-10 pb-10 ">
          Your Groceries in minutes{" "}
        </h1>
        <p className=" pb-10 ">
          Your one-stop online shope. From fresh produce and household staples
          to cooking essentials, we&apos;re the service that always delivers,To
          your door, and within minutes.{" "}
        </p>

        <Button children={'Shop now'}/>
        

      </div>
      <div className=" flex-1"></div>
    </div>
  );
};

export default Banner;
