import styles from "../styles/Home.module.css";
import { Alert, Button, Container, Tab, Tabs } from "react-bootstrap";
import Navbar from "../components/partial/header/Navbar";
import Sidebar from "../components/partial/sidebar/Sidebar";
import ProductCard from "../components/resuable/product/ProductCard";
import { getSetting, getSettingValue } from "../utils/Setting";
import { ProductService } from "../service/product/product.service";
import { CategoryService } from "../service/category/category.service";
import Footer from "../components/partial/footer/Footer";
import { FooterService } from "../service/page/footer.service";
import Main from "../components/partial/Main";
import CustomCarousel from "../components/resuable/custom/CustomCarousel";
import CustomButton from "../components/resuable/custom/CustomButton";
import Meta from "../components/partial/header/Meta";
import { CartHelper, CartMeta } from "../helper/cart.helper";
import { BiMinus, BiPlus } from "react-icons/bi";
import QuantityButton from "../components/resuable/product/QuantityButton";
import { useEffect, useReducer, useState } from "react";
import CustomToast from "../components/resuable/custom/CustomToast";
import { AppConfig } from "../config/app.config";
import { useRouter } from "next/router";
import { CheckoutService } from "../service/order/checkout.service";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const settings = await getSetting();

  const footerService = await FooterService.findAll();
  const footerData = footerService.data;

  const cartData = await CartHelper.cartData(context);
  return {
    props: {
      footerData: footerData,
      settings: settings,
      host: req.headers.host,
      cartData: cartData,
    },
  };
};

export default function Index({
  footerData,
  settings,
  host,
  cartData,
}: {
  footerData: any;
  settings: any;
  host: string;
  cartData: CartMeta;
}) {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };
  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleCheckout = async (e: any) => {
    e.preventDefault();

    setMessage(null);
    setLoading(true);

    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const mailing = e.target.mailing.checked;
    const submitBtn = e.target.submitBtn;

    submitBtn.disabled = true;

    const cart_data = await CartHelper.findAll();
    if (cart_data) {
      const data = {
        fname: fname,
        lname: lname,
        email: email,
        mailing: mailing,
        shipping_zone_id: undefined,
        cart_data: cart_data,
      };
      try {
        const checkoutService = await CheckoutService.store(data);
        if (!checkoutService.data.error) {
          setMessage(checkoutService.data.message);
          setLoading(false);
          const checkout_id = checkoutService.data.data.checkout_id;
          router.push(`/checkout?checkout_id=${checkout_id}`);
        } else {
          setMessage(checkoutService.data.message);
          setLoading(false);
          submitBtn.disabled = false;
        }
      } catch (error: any) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          setMessage(error.response.data.message);
          setLoading(false);
        } else {
          setMessage(error.message);
          setLoading(false);
        }
        submitBtn.disabled = false;
      }
    }
  };

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
          <CustomToast show={showToast} onClose={handleCloseToast}>
            Saved successfully
          </CustomToast>
          <div className="row">
            <div className="col">
              <div
                className="mb-3"
                style={{ fontSize: "32px", fontWeight: "bold" }}
              >
                Contact information
              </div>
              <div className="d-flex flex-column w-50">
                {loading && <div>Please wait...</div>}
                {message && <div>{message}</div>}
                <form onSubmit={handleCheckout} method="post">
                  <div className="mb-2">
                    <input
                      className="form-control"
                      type="text"
                      name="fname"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      className="form-control"
                      type="text"
                      name="lname"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      id="mailing"
                      type="checkbox"
                      name="mailing"
                      defaultChecked={true}
                    />
                    <label htmlFor="mailing">
                      Save on future orders! Subscribe to our newsletter for
                      exclusive offers and secret sales. You can unsubscribe at
                      any time.{" "}
                    </label>
                  </div>
                  <div>
                    <CustomButton
                      onClick={handleCheckout}
                      type="submit"
                      name="submitBtn"
                      style={{ width: "100%", height: "54px" }}
                    >
                      Checkout
                    </CustomButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
        <Footer footerData={footerData} />
      </Main>
    </>
  );
}
