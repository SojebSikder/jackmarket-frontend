import styles from "../styles/Home.module.css";
import { Alert, Button, Container, Tab, Tabs } from "react-bootstrap";
import Navbar from "../../components/partial/header/Navbar";
import Sidebar from "../../components/partial/sidebar/Sidebar";
import ProductCard from "../../components/resuable/product/ProductCard";
import { getSetting, getSettingValue } from "../../utils/Setting";
import { ProductService } from "../../service/product/product.service";
import { CategoryService } from "../../service/category/category.service";
import Footer from "../../components/partial/footer/Footer";
import { FooterService } from "../../service/page/footer.service";
import Main from "../../components/partial/Main";
import CustomCarousel from "../../components/resuable/custom/CustomCarousel";
import CustomButton from "../../components/resuable/custom/CustomButton";
import Meta from "../../components/partial/header/Meta";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const settings = await getSetting();

  const footerService = await FooterService.findAll();
  const footerData = footerService.data;

  return {
    props: {
      footerData: footerData,
      settings: settings,
      host: req.headers.host,
    },
  };
};
export default function Index({
  footerData,
  settings,
  host,
}: {
  footerData: any;
  settings: any;
  host: string;
}) {
  return (
    <>
      <Meta
        title={`Shopping cart - ${getSettingValue("name", settings)}`}
        description={`${getSettingValue("meta_description", settings)}`}
        keyword={`${getSettingValue("meta_keyword", settings)}`}
        url={`${host}/cart`}
        domain={host}
      />
      <Navbar />
      <Main>
        <Container>
          <div className="row">
            <div className="col">
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                Shopping cart
              </div>
              <div className="mt-4">
                <CustomButton>Delivery</CustomButton>
              </div>
              <div className="mt-4">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th>Your items (8)</th>
                      <th>Quantity</th>
                      <th>Item price</th>
                      <th>Items total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>vegetables</td>
                      <td>10</td>
                      <td>$6</td>
                      <td>$13.78</td>
                    </tr>
                    <tr>
                      <td>vegetables</td>
                      <td>10</td>
                      <td>$6</td>
                      <td>$13.78</td>
                    </tr>
                    <tr>
                      <td>vegetables</td>
                      <td>10</td>
                      <td>$6</td>
                      <td>$13.78</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
        <Footer footerData={footerData} />
      </Main>
    </>
  );
}
