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
import { getUser } from "../../utils/UserDetails";
import { OrderService } from "../../service/order/order.service";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const checkout_id = query.checkout_id;

  const settings = await getSetting();
  const userDetails = await getUser(context);

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
      userDetails: userDetails,
    },
  };
};

export default function Index({
  footerData,
  settings,
  host,
  cartData,
  shippingData,
  userDetails,
}: {
  footerData: any;
  settings: any;
  host: string;
  cartData: any;
  shippingData: any;
  userDetails: any;
}) {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [error_message, setError_message] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [billingAddress, setBillingAddress] = useState(1);
  const [storeCredit, setStoreCredit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    id:
      shippingData.payment_providers.length > 0 &&
      shippingData.payment_providers[0].id,
    name: "",
  });

  const [textInputShipping, setTextInputShipping] = useState({
    fname: userDetails ? `${userDetails.fname}` : "",
    lname: userDetails ? `${userDetails.lname}` : "",
    country: 0,
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: userDetails ? `${userDetails.phone ?? ""}` : "",
    email: userDetails ? `${userDetails.email ?? ""}` : "",
  });

  const [textInputBilling, setTextInputBilling] = useState({
    fname: "",
    lname: "",
    country: 0,
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    billing: 0,
  });

  const handleTextInputShipping = (event: any) => {
    setTextInputShipping({
      ...textInputShipping,
      [event.target.name]: event.target.value,
    });
  };
  const handleTextInputBilling = (event: any) => {
    setTextInputBilling({
      ...textInputBilling,
      [event.target.name]: event.target.value,
    });
  };

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

  const handleShowDialog = (message?: any) => {
    if (message) {
      setError_message(message);
    }
    setShowDialog(true);
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleCheckout = async () => {
    setMessage(null);
    setError_message(null);
    setLoading(true);
    handleShowDialog("Order processing. Please wait here...");

    const data = {
      checkout_id: String(cartData.data.uuid),
      // shipping address
      shipping_fname: textInputShipping.fname,
      shipping_lname: textInputShipping.lname,
      shipping_country: textInputShipping.country,
      shipping_address1: textInputShipping.address1,
      shipping_address2: textInputShipping.address2,
      shipping_city: textInputShipping.city,
      shipping_state: textInputShipping.state,
      shipping_zip: textInputShipping.zip,
      shipping_phone: textInputShipping.phone,
      email: textInputShipping.email,
      // billing address
      billing: textInputBilling.billing,
      billing_fname: textInputBilling.fname,
      billing_lname: textInputBilling.lname,
      billing_country: textInputBilling.country,
      billing_address1: textInputBilling.address1,
      billing_address2: textInputBilling.address2,
      billing_city: textInputBilling.city,
      billing_state: textInputBilling.state,
      billing_zip: textInputBilling.zip,
      // payment
      shipping_zone_id: shippingData.id,
      payment_provider_id: paymentMethod.id,
    };

    // store to server
    try {
      const order = await OrderService.store(data);
      if (!order.error) {
        // success
        handleShowDialog(order.message);
        // remove session cart
        CartHelper.removeAll();

        window.location.href = `/thankyou?message=${encodeURIComponent(
          order.message
        )}`;
      } else {
        handleShowDialog(order.message);
      }
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        handleShowDialog(error.response.data.message);
      } else {
        handleShowDialog(error.message);
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
              {loading && <div>Please wait...</div>}
              {message && <div>{message}</div>}
              {error_message && <div>{error_message}</div>}
              <div className="d-flex">
                <div className="d-flex flex-column w-50">
                  <form method="post">
                    <div>
                      {/* shiping info */}
                      <div
                        className="mb-3"
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        Shipping info
                      </div>

                      <div className="mb-2">
                        <input
                          className="form-control"
                          type="text"
                          name="fname"
                          placeholder="First name"
                          onChange={handleTextInputShipping}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          className="form-control"
                          type="text"
                          name="lname"
                          placeholder="Last name"
                          onChange={handleTextInputShipping}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          className="form-control"
                          type="text"
                          name="email"
                          placeholder="Email"
                          onChange={handleTextInputShipping}
                        />
                      </div>
                      <div className="mb-2">
                        <select
                          className="form-control"
                          name="country_id"
                          onChange={handleTextInputShipping}
                        >
                          <option value={0}>Select country</option>
                          {shippingData.countries.map((v: any, i: number) => (
                            <option key={i} value={v.id}>
                              {v.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-2">
                        <input
                          className="form-control"
                          type="text"
                          name="address1"
                          placeholder="Address"
                          onChange={handleTextInputShipping}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          className="form-control"
                          type="text"
                          name="address2"
                          placeholder="Apartment, suite, etc. (optional)"
                          onChange={handleTextInputShipping}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          className="form-control"
                          type="text"
                          name="city"
                          placeholder="City"
                          onChange={handleTextInputShipping}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          className="form-control"
                          type="text"
                          name="postal_code"
                          placeholder="Postal code"
                          onChange={handleTextInputShipping}
                        />
                      </div>
                    </div>
                  </form>

                  <div onChange={(e) => handleTextInputBilling(e)}>
                    <div>
                      <input
                        type="radio"
                        name="billing"
                        id="sameBilling"
                        value={0}
                        checked={textInputBilling.billing == 0 ? true : false}
                        readOnly
                      />
                      <label className="ms-2" htmlFor="sameBilling">
                        Same as shipping address
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="billing"
                        id="differentBilling"
                        value={1}
                        checked={textInputBilling.billing == 1 ? true : false}
                        readOnly
                      />
                      <label className="ms-2" htmlFor="differentBilling">
                        Use a different billing address
                      </label>
                    </div>
                  </div>

                  {textInputBilling.billing == 1 && (
                    <form method="post">
                      <div>
                        {/* shiping info */}
                        <div
                          className="mb-3"
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          Billing info
                        </div>

                        <div className="mb-2">
                          <input
                            className="form-control"
                            type="text"
                            name="fname"
                            placeholder="First name"
                            onChange={handleTextInputBilling}
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            className="form-control"
                            type="text"
                            name="lname"
                            placeholder="Last name"
                            onChange={handleTextInputBilling}
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleTextInputBilling}
                          />
                        </div>
                        <div className="mb-2">
                          <select
                            className="form-control"
                            name="country"
                            onChange={handleTextInputBilling}
                          >
                            <option value={0}>Select country</option>
                            {shippingData.countries.map((v: any, i: number) => (
                              <option key={v.id} value={v.id}>
                                {v.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-2">
                          <input
                            className="form-control"
                            type="text"
                            name="address1"
                            placeholder="Address"
                            onChange={handleTextInputBilling}
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            className="form-control"
                            type="text"
                            name="address2"
                            placeholder="Apartment, suite, etc. (optional)"
                            onChange={handleTextInputBilling}
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            className="form-control"
                            type="text"
                            name="city"
                            placeholder="City"
                            onChange={handleTextInputBilling}
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            className="form-control"
                            type="text"
                            name="postal_code"
                            placeholder="Postal code"
                            onChange={handleTextInputBilling}
                          />
                        </div>
                      </div>
                    </form>
                  )}

                  {/* payment saction */}
                  <div className="mt-3">
                    <div
                      className="mb-3"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Payment info
                    </div>
                    <div>
                      <select
                        className="form-control"
                        name="country"
                        onChange={handleTextInputBilling}
                      >
                        <option value={0}>Select payment type</option>
                        {shippingData.payment_providers.map(
                          (v: any, i: number) => (
                            // paymentMethod.id == provider.id
                            <option
                              key={v.id}
                              value={v.id}
                              selected={paymentMethod.id == v.id ? true : false}
                            >
                              {v.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <CustomButton
                      type="submit"
                      name="submitBtn"
                      style={{ width: "100%", height: "54px" }}
                      onClick={handleCheckout}
                    >
                      Place order
                    </CustomButton>
                  </div>
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
