import ProductCard from "@/components/Dashboard/ProductCard";

const ProductClientPage = ({
  query,
  productData,
}: {
  query?: string;
  productData: any;
}) => {
  return (
    <div className="lg:mt-0 mt-14">
      {/* 1st card */}
      <p>
        You search for <b>{query}</b>
      </p>
      <p>
        Found {productData.count} records at {productData.time}
      </p>
      <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-5 my-4">
        {productData.data.data.map((product: any) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductClientPage;
