import Image from "next/image";
import logo from "../../public/logo/jacmarketIcon.png";
import Button from '../common/Button';

const Banner = () => {
  return (
    <div className="bg-sPrimary h-screen lg:px-20 px-10 lg:pt-32 md:pt-20 pt-24 flex item-center justify-between lg:gap-96 ">
      <div className=" flex-1">
        <Image src={logo} width={60} height={30} alt="logo" />
        <h1 className=" font-bold lg:text-5xl md:text-4xl text-2xl text-secondary lg:py-10 md:py-5 py-2 ">
          Your Groceries in minutes{" "}
        </h1>
        <p className=" lg:pb-10 md:pb-5 pb-2 ">
          Your one-stop online shope. From fresh produce and household staples
          to cooking essentials, we&apos;re the service that always delivers,To
          your door, and within minutes.{" "}
        </p>

        <Button>Shop now</Button>
        

      </div>
      <div className=" md:flex-1"></div>
    </div>
  );
};

export default Banner;
