import { ProductService } from "@/service/product/product.service";
import ProductClientPage from "./Components/ProductClientPage";

const Page = async () => {
  const productService = await ProductService.findAllProductWithCategories();
  return <ProductClientPage productData={productService.data.data} />;
};

export default Page;
