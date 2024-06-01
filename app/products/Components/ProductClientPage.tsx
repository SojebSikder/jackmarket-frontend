import ProductCard from "@/components/Dashboard/ProductCard";

const ProductClientPage = ({ productData }: { productData: any }) => {
  return (
    <div className="lg:mt-0 mt-14">
      {/* 1st card */}
      <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-5 my-4">
        {productData.data.map((product: any) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>

      {/* <div key={product.id}>
        <div className=" flex justify-between">
          <h1 className=" font-bold text-xl ">{product.name}</h1>
          <div className="flex items-center gap-2 mt-5">
            <IoIosArrowBack className="text-xl cursor-pointer" />
            <IoIosArrowForward className="text-xl cursor-pointer" />
          </div>
        </div>
        <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-5 my-4">
          <ProductCard key={product.id} product={product} />;
        </div>
      </div> */}

      {/* 2nd card */}
      {/* <div className=" flex justify-between mt-10">
        <h1 className=" font-bold text-xl ">Angebote 💸</h1>
        <div className="flex items-center gap-2 mt-5">
          <IoIosArrowBack className="text-xl cursor-pointer" />
          <IoIosArrowForward className="text-xl cursor-pointer" />
        </div>
      </div>
      <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-5 my-4 ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div> */}
      {/* 3rd card */}
      {/* <div className=" flex justify-between mt-10">
        <h1 className=" font-bold text-xl ">Angebote 💸</h1>
        <div className="flex items-center gap-2 mt-5">
          <IoIosArrowBack className="text-xl cursor-pointer" />
          <IoIosArrowForward className="text-xl cursor-pointer" />
        </div>
      </div>
      <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-5 my-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div> */}
    </div>
  );
};

export default ProductClientPage;
