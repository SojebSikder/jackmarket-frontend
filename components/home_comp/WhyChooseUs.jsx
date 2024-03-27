import Image from "next/image";
import SectionTitle from "../common/SectionTitle";
import image from "../../public/WhyChooseUs/whychooseUsIamge.png";
import Button from "../common/Button";

const WhyChooseUs = () => {
  return (
    <div>
      <SectionTitle title={"Why you'll love us"} />
      <div className=" flex justify-center gap-20 px-32 my-20  text-center ">
        <div className="mx-auto ">
          <Image
            className="mx-auto "
            src={image}
            alt="2300+ Items"
            width={120}
            height={50}
          />
          <h1 className="my-2  text-secondary font-semibold text-xl">
            2300+ Items
          </h1>
          <p>
            Find all your supermarket staples and favorite brands at a great
            price.
          </p>
        </div>
        <div>
          <Image
            className="mx-auto "
            src={image}
            alt="2300+ Items"
            width={120}
            height={50}
          />
          <h1 className="my-2  text-secondary font-semibold text-xl">
            Speedy delivery
          </h1>
          <p>
            Our riders offer quick, hassle-free grocery delivery wherever you
            happen to be.
          </p>
        </div>
        <div>
          <Image
            className="mx-auto "
            src={image}
            alt="2300+ Items"
            width={120}
            height={50}
          />
          <h1 className="my-2  text-secondary font-semibold text-xl">
            Quality produce
          </h1>
          <p>
            Top up your weekly shop with an array of fresh and organic fruit and
            veggies.
          </p>
        </div>
      </div>
      <div className=" text-center my-10">
        <Button>Start Shopping</Button>
      </div>
    </div>
  );
};

export default WhyChooseUs;
