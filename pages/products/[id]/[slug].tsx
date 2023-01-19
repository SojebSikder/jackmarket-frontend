import React from "react";
import styles from "../styles/Home.module.css";
import { Alert, Button, Container, Tab, Tabs } from "react-bootstrap";
import Navbar from "../../../components/partial/header/Navbar";
import Sidebar from "../../../components/partial/sidebar/Sidebar";
import ProductCard from "../../../components/resuable/product/ProductCard";
import { getSetting, getSettingValue } from "../../../utils/Setting";
import { ProductService } from "../../../service/product/product.service";
import { CategoryService } from "../../../service/category/category.service";
import Footer from "../../../components/partial/footer/Footer";
import { FooterService } from "../../../service/page/footer.service";
import Main from "../../../components/partial/Main";
import CustomCarousel from "../../../components/resuable/custom/CustomCarousel";
import CustomButton from "../../../components/resuable/custom/CustomButton";
import Meta from "../../../components/partial/header/Meta";
import { CartHelper } from "../../../helper/cart.helper";
import { BiPlus, BiMinus } from "react-icons/bi";

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
  settings,
  host,
}: {
  footerData: any;
  productData: any;
  categoryData: any;
  settings: any;
  host: string;
}) {
  const addToCart = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = {
      product_id: productData.id,
      quantity: 1,
    };

    // session based cart
    CartHelper.store(data);
  };

  return (
    <>
      <Meta
        title={`${
          productData.meta_title ? productData.meta_title : productData.title
        } - ${getSettingValue("name", settings)}`}
        description={productData.meta_description}
        price={productData.price}
        currency={productData.currency_code}
        keyword={productData.meta_keyword}
        image={`${
          productData.images.length > 0 && productData.images[0].image_url
        }`}
        url={`${host}/products/${productData.id}/${productData.slug}`}
        type={"product"}
        availability={productData.availability}
        brand={productData.brand}
        product_id={productData.id}
        domain={host}
      />
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
                <CustomButton onClick={addToCart}>Add item</CustomButton>
                {/* <button>
                  <BiMinus />
                </button>
                <span>2</span>
                <button>
                  <BiPlus />
                </button> */}
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
