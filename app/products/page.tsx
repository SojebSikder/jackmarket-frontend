import { ProductService } from "@/service/product/product.service";
import ProductClientPage from "./Components/ProductClientPage";

const Page = async () => {
  const productService = await ProductService.findAll();

  return <ProductClientPage productData={productService.data} />;
};

export default Page;
