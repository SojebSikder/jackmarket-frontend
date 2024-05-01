import img1 from "../../public/Dashboard/anogebote/image (4).png";
import icon from "../../public/Dashboard/anogebote/icon.png";
import Image from "next/image";
import Link from "next/link";
const ProductCard = ({ product }: { product: any }) => {
  return (
    <Link href={`/products/${product.id}`} className="w-44 ">
      <div className="relative overflow-hidden">
        <Image src={img1} alt="" className=" w-full object-cover " />
        <div className="bg-primary -skew-x-[16deg] w-12 h-16  absolute top-0 right-3  "></div>
        <div className="bg-secondary -skew-x-[17deg] w-16 h-6  absolute top-5 right-5  "></div>
        <p className="absolute top-[2px] right-2 text-xs text-white font-bold">
          - {product.discount}%
        </p>
        <p className="absolute top-5 right-7 text-white font-semibold">0.22€</p>
        <p className="absolute top-[45px] right-7 text-[10px] text-white font-bold">
          {" "}
          <del>0.72€</del>
        </p>
        <Link
          href="/shoppingCard"
          className="bg-primary p-1 rounded-md w-8 absolute bottom-0 right-2 cursor-pointer active:scale-95 duration-200"
        >
          <Image src={icon} alt="" className=" w-full object-cover " />
        </Link>
      </div>
      {/* <p>
        €1.32 <del className="text-gray-500">€1.89</del>
      </p> */}
      <h3 className=" font-semibold">{product.name}</h3>
      {/* <p>€24.00 / 1kg</p> */}
      <p>
        {product.currency_sign}
        {product.new_price}
        <del className="text-gray-500">
          {product.currency_sign}
          {product.price}
        </del>
      </p>
    </Link>
  );
};

export default ProductCard;
