import styles from "../styles/Home.module.css";
import { Alert, Button, Container, Tab, Tabs } from "react-bootstrap";
import Navbar from "../../../components/partial/header/Navbar";
import Sidebar from "../../../components/partial/sidebar/Sidebar";
import ProductCard from "../../../components/resuable/product/ProductCard";
import { getSetting } from "../../../utils/Setting";
import { ProductService } from "../../../service/product/product.service";
import { CategoryService } from "../../../service/category/category.service";
import Footer from "../../../components/partial/footer/Footer";
import { FooterService } from "../../../service/page/footer.service";
import Main from "../../../components/partial/Main";
import CustomCarousel from "../../../components/resuable/custom/CustomCarousel";
import CustomButton from "../../../components/resuable/custom/CustomButton";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const id = query.id;

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
          <div className="row">
            <div className="col">
              <CustomCarousel images={productData.images} />
            </div>
            <div style={{ marginLeft: "20px" }} className="col">
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                {productData.name}
              </div>
              <div className="mt-2">
                {productData.is_sale ? (
                  <>
                    <span style={{ fontSize: "20px" }}>
                      {productData.currency_sign}
                      {productData.price}{" "}
                    </span>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#787878",
                        fontSize: "20px",
                      }}
                    >
                      {productData.currency_sign}
                      {productData.price}
                    </span>
                  </>
                ) : (
                  <span>
                    {productData.currency_sign}
                    {productData.price}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <CustomButton>Add item</CustomButton>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Tabs
              defaultActiveKey={`_productinformation`}
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab
                eventKey={`_productinformation`}
                title={`Description`}
                dangerouslySetInnerHTML={{ __html: productData.description }}
              ></Tab>
              {productData.details.map((detail: any) => {
                return (
                  <Tab
                    key={detail.id}
                    eventKey={`${detail.name}`}
                    title={`${detail.name}`}
                    dangerouslySetInnerHTML={{ __html: detail.body }}
                  ></Tab>
                );
              })}
            </Tabs>
            <hr className="mt-5" />
          </div>
        </Container>
        <Footer footerData={footerData} />
      </Main>
    </>
  );
}
