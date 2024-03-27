
import Image from 'next/image';
import Button from './../common/Button';
import image from "../../public/Delivery/world-map.png";
const Delivery = () => {
    return (
      <div className=" flex justify-center items-center gap-32 px-32 my-32">
        <div className=" my-5 flex-1 ">
          <h1 className=" font-bold text-3xl text-secondary">
            You order, we deliver
          </h1>
          <p className="text-gray-600 my-5 font-medium ">
            We&apos;re already in 100+ cities, but if you <br /> don’t find yours –
            we’re on our way to <br /> deliver your groceries! Sign up now to <br /> stay in
            the know.
          </p>
          <Button >Start Shopping</Button>
          <p className='mt-10 text-lg text-gray-500'>
            City not listed? <span className=' text-secondary underline cursor-pointer'>Signup for our waitlist</span>
          </p>
        </div>
        <div className="flex-1">
          <Image alt={"world map"} src={image} width={300}  />
        </div>
      </div>
    );
};

export default Delivery;