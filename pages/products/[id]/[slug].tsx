import styles from "../styles/Home.module.css";
import { Alert, Button, Container } from "react-bootstrap";
import Navbar from "../../../components/partial/header/Navbar";
import Sidebar from "../../../components/partial/sidebar/Sidebar";
import ProductCard from "../../../components/resuable/product/ProductCard";
import { getSetting } from "../../../utils/Setting";
import { ProductService } from "../../../service/product/product.service";
import { CategoryService } from "../../../service/category/category.service";
import Footer from "../../../components/partial/footer/Footer";
import { FooterService } from "../../../service/page/footer.service";
import Main from "../../../components/partial/Main";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const id = query.id;
  const page = query.page;

  const settings = await getSetting();

  const categoryService = await CategoryService.findAll();
  const categoryData = categoryService.data;

  const footerService = await FooterService.findAll();
  const footerData = footerService.data;

  const productService = await ProductService.findOne(id);
  const productData = productService.data;

  return {
    props: {
      footerData: footerData,
      productData: productData,
      categoryData: categoryData,
      settings: settings,
      host: req.headers.host,
    },
  };
};
export default function Index({
  footerData,
  productData,
  categoryData,
}: {
  footerData: any;
  productData: any;
  categoryData: any;
}) {
  return (
    <>
      <Navbar />
      <Sidebar categoryData={categoryData} />
      <Main>
        <Container>
          <div>{productData.name}</div>
          <div
            dangerouslySetInnerHTML={{ __html: productData.description }}
          ></div>
        </Container>
        <Footer footerData={footerData} />
      </Main>
    </>
  );
}
