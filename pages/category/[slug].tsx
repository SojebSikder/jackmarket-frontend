import styles from "../styles/Home.module.css";
import { Alert, Button, Container } from "react-bootstrap";
import Navbar from "../../components/partial/header/Navbar";
import Sidebar from "../../components/partial/sidebar/Sidebar";
import ProductCard from "../../components/resuable/product/ProductCard";
import { getSetting } from "../../utils/Setting";
import { ProductService } from "../../service/product/product.service";
import { CategoryService } from "../../service/category/category.service";
import Footer from "../../components/partial/footer/Footer";
import { FooterService } from "../../service/page/footer.service";
import Main from "../../components/partial/Main";
import Meta from "../../components/partial/header/Meta";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const page = query.page;
  const slug = query.slug;

  const settings = await getSetting();

  const categoryService = await CategoryService.findAll();
  const categoryData = categoryService.data;

  const singleCategoryService = await CategoryService.findOne(slug);
  const singleCategoryData = singleCategoryService.data;

  const footerService = await FooterService.findAll();
  const footerData = footerService.data;

  return {
    props: {
      footerData: footerData,
      categoryData: categoryData,
      singleCategoryData: singleCategoryData,
      settings: settings,
      host: req.headers.host,
    },
  };
};
export default function Index({
  footerData,
  categoryData,
  singleCategoryData,
  host,
}: {
  footerData: any;
  categoryData: any;
  singleCategoryData: any;
  host: string;
}) {
  // handle pagination button
  const handlePaginateLink = (e: any, page: number, prev = false) => {
    let params = new URLSearchParams(window.location.search);

    if (prev == null && page == 1) {
      page = 2;
    }

    params.set("page", page.toString());

    if (prev) {
      if (page == -1) {
        page = 0;
        params.delete("page");
      }
      if (page == 1) {
        page = 0;
        params.delete("page");
      }
    }

    const new_url = `/products?${params.toString()}`;
    document.location.href = new_url;
  };

  return (
    <>
      <Meta
        title={`${
          singleCategoryData.meta_title
            ? singleCategoryData.meta_title
            : singleCategoryData.name
        }`}
        description={singleCategoryData.meta_description}
        keyword={singleCategoryData.meta_keyword}
        image={`${singleCategoryData.image_url}`}
        url={`${host}/category/${singleCategoryData.slug}`}
        domain={host}
      />
      <Navbar />
      <Sidebar categoryData={categoryData} />
      <Main>
        <Container>
          <div className="row justify-content-md-start">
            {/* {productData.current_page == 1 ? (
              <></>
            ) : (
              <div
                style={{
                  marginBottom: "40px",
                }}
              >
                <div className="d-flex justify-content-center">
                  <button
                    onClick={(e) =>
                      handlePaginateLink(e, productData.current_page - 1, true)
                    }
                    className="btn btn-danger"
                  >
                    Load Previous
                  </button>
                </div>
              </div>
            )} */}
            <div className="row justify-content-between">
              <div className="col-4">
                <h1>{singleCategoryData.name}</h1>
              </div>
              <div className="col-4 text-end">
                <span>{singleCategoryData.products.length} products</span>
              </div>
              <hr style={{ marginTop: "10px" }} />
            </div>
            {singleCategoryData.products.length > 0 ? (
              singleCategoryData.products.map((product: any) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    name={`${product.name}`}
                    discount={product.discount}
                    is_sale={product.is_sale}
                    price={product.price}
                    currency_sign={product.currency_sign}
                    image={`${
                      product.images.length > 0
                        ? product.images[0].image_url
                        : ""
                    }`}
                  />
                );
              })
            ) : (
              <div>No products</div>
            )}

            {/* <div
              style={{
                marginBottom: "40px",
              }}
            >
              <div className="d-flex justify-content-center">
                Showing {productData.data.length} of {productData.total}
              </div>
              {productData.data.length > 0 && (
                <div className="d-flex justify-content-center">
                  <button
                    onClick={(e) =>
                      handlePaginateLink(e, productData.current_page + 1)
                    }
                    className="btn btn-danger"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div> */}
          </div>
        </Container>
        <Footer footerData={footerData} />
      </Main>
    </>
  );
}