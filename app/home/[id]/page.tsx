import { ProductService } from "@/service/product/product.service";
import ProductDetailsClientPage from "./Components/ProductDetailsClientPage";
import { Metadata } from "next";
import { AppConfig } from "@/config/app.config";

async function getProductData(id: number) {
  try {
    const productService = await ProductService.findOne(id);

    const response = productService.data.data;

    return response;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const productData = await getProductData(params.id);
  return {
    title: `${productData.name} - ${AppConfig().app.name}`,
    description: productData.meta_description,
  };
}
export default async function Page({ params }: { params: { id: number } }) {
  const productService = await ProductService.findOne(params.id);
  return <ProductDetailsClientPage product={productService.data.data} />;
}
