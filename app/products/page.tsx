import { ProductService } from "@/service/product/product.service";
import ProductClientPage from "./Components/ProductClientPage";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  let query = "";

  if (searchParams) {
    query = Object.keys(searchParams)
      .map((key) => key + "=" + searchParams[key])
      .join("&");
  }

  const productService = await ProductService.findAll(`?${query}`);
  return <ProductClientPage productData={productService.data.data} />;
};

export default Page;
