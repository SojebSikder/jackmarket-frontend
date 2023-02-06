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
import { CartHelper, CartMeta } from "../../helper/cart.helper";
import { BiMinus, BiPlus } from "react-icons/bi";
import QuantityButton from "../../components/resuable/product/QuantityButton";
import { useEffect, useReducer, useState } from "react";
import CustomToast from "../../components/resuable/custom/CustomToast";
import { AppConfig } from "../../config/app.config";
import { useRouter } from "next/router";
import { CheckoutService } from "../../service/order/checkout.service";
import CustomImage from "../../components/resuable/custom/CustomImage";
import { ShippingService } from "../../service/setting/shipping.service";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const checkout_id = query.checkout_id;

  const settings = await getSetting();

  const footerService = await FooterService.findAll();
  const footerData = footerService.data;

  const checkoutService = await CheckoutService.findOne(checkout_id, context);
  const cartData = checkoutService;

  const shippingService = await ShippingService.findOne(
    checkoutService.data.shipping_zone_id
  );
  const shippingData = shippingService.data;

  return {
    props: {
      footerData: footerData,
      settings: settings,
      host: req.headers.host,
      cartData: cartData,
      shippingData: shippingData,
    },
  };
};

export default function Index({
  footerData,
  settings,
  host,
  cartData,
  shippingData,
}: {
  footerData: any;
  settings: any;
  host: string;
  cartData: any;
  shippingData: any;
}) {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const totalCost = () => {
    if (shippingData) {
      return Number(cartData.order_total) + Number(shippingData.price);
    } else {
      return Number(cartData.order_total);
    }
  };

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

        if (!checkoutService.error) {
          setMessage(checkoutService.message);
          setLoading(false);
          const checkout_id = checkoutService.data.checkout_id;
          router.push(`/checkout?checkout_id=${checkout_id}`);
        } else {
          setMessage(checkoutService.message);
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
        title={`Checkout - ${getSettingValue("name", settings)}`}
        description={`${getSettingValue("meta_description", settings)}`}
        keyword={`${getSettingValue("meta_keyword", settings)}`}
        url={`${host}/cart`}
        domain={host}
      />
      <Navbar />
      <Main>
        <Container>
          <CustomToast show={showToast} onClose={handleCloseToast}>
            {message}
          </CustomToast>
          <div className="row">
            <div className="col">
              <div
                className="mb-3"
                style={{ fontSize: "32px", fontWeight: "bold" }}
              >
                Checkout
              </div>
              <div className="d-flex">
                <div className="d-flex flex-column w-50">
                  {/* shiping info */}
                  <div
                    className="mb-3"
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    Shipping info
                  </div>
                  {loading && <div>Please wait...</div>}
                  {message && <div>{message}</div>}
                  <form onSubmit={handleCheckout} method="post">
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="fname"
                        placeholder="First name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="lname"
                        placeholder="Last name"
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
                      <select className="form-control" name="country_id" id="">
                        <option value="">Bangladesh</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="address1"
                        placeholder="Address"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="address2"
                        placeholder="Apartment, suite, etc. (optional)"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="city"
                        placeholder="City"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="postal_code"
                        placeholder="Postal code"
                      />
                    </div>

                    <div>
                      <CustomButton
                        type="submit"
                        name="submitBtn"
                        style={{ width: "100%", height: "54px" }}
                      >
                        Place order
                      </CustomButton>
                    </div>
                  </form>
                </div>

                {/* product info */}
                <div className="ms-4">
                  <div
                    className="mb-3"
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    Order summary
                  </div>
                  <div
                    className="p-4"
                    style={{
                      borderRadius: "5px",
                      background: "#F8F8F8",
                      width: "381px",
                    }}
                  >
                    <div>
                      {cartData.data.checkout_items.map((item: any) => {
                        return (
                          <div
                            key={item.id}
                            className="d-flex justify-content-between"
                          >
                            <div className="d-flex">
                              <div>
                                <CustomImage
                                  src={`${item.product.images[0].image_url}`}
                                  title={`${item.product.images[0].title}`}
                                  alt={`${item.product.images[0].alt_text}`}
                                />
                              </div>
                              <div>{item.product.name}</div>
                            </div>

                            <div className="justify-content-between">
                              {item.currency_sign}
                              {item.subtotal}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <span>Subtotal</span>
                      </div>
                      <div>
                        <span>
                          {cartData.data.currency_sign}
                          {cartData.subtotal}
                        </span>
                      </div>
                    </div>
                    {/* <div className="d-flex justify-content-between">
                      <div>
                        <span>Delivery fee</span>
                      </div>
                      <div>
                        <span>$1.00</span>
                      </div>
                    </div> */}
                    <div className="d-flex justify-content-between">
                      <div>
                        <span>Shipping</span>
                      </div>
                      <div>
                        <span>
                          {cartData.data.currency_sign}
                          {shippingData && shippingData.price}
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="fw-bold">Total</span>
                      </div>
                      <div>
                        <span className="fw-bold">
                          {cartData.data.currency_sign}
                          {totalCost()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Footer footerData={footerData} />
      </Main>
    </>
  );
}
