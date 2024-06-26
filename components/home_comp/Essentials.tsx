import Image from "next/image";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";
//image import from
import image from "../../public/Essentials/image.png";
import image1 from "../../public/Essentials/image (1).png";
import image2 from "../../public/Essentials/image (2).png";
import image3 from "../../public/Essentials/image (3).png";



const Essentials = () => {
    return (
      <div className=" my-16 ">
        <SectionTitle
          title={"Daily essentials. Essential daily."}
          shortDescription={
            "Tap your way from aisle to aisle and order what you need, when you need it."
          }
        />
        <div className=" grid lg:grid-cols-4 grid-cols-2 gap-5   md:px-32 px-5   py-10  text-center ">
          <div>
            <Image src={image} alt="Alcohol-free Drinks" className="mx-auto" />
            <p className="my-2">Alcohol-free Drinks</p>
          </div>
          <div>
            <Image src={image1} alt="Baked Goods" className="mx-auto" />
            <p className="my-2">Baked Goods</p>
          </div>
          <div>
            <Image src={image2} alt="Eggs & Dairy" className="mx-auto" />
            <p className="my-2">Eggs & Dairy</p>
          </div>
          <div>
            <Image src={image3} alt="Vegetables" className="mx-auto" />
            <p className="my-2">Vegetables</p>
          </div>
        </div>
        <div className=" text-center">
          <Button>Explore categories</Button>
        </div>
      </div>
    );
};

export default Essentials;



