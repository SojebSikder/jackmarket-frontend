import { ProductService } from "@/service/product/product.service";
import ProductClientPage from "./Components/ProductClientPage";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const query = String(searchParams?.q) || "";

  const productService = await ProductService.search(query);
  return (
    <ProductClientPage query={query} productData={productService.data} />
  );
};

export default Page;
