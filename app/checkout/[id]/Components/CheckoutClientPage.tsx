"use client";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import item from "../../../../public/Dashboard/ShoppingCart/image (7).png";
import Image from "next/image";
import { useRef, useState } from "react";
import { CustomToast } from "@/utils/Toast/CustomToast";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { OrderService } from "@/service/order/order.service";
import { CookieHelper } from "@/helper/cookie.helper";

const CheckoutClientPage = ({
  checkoutData,
  shippingData,
  isLoggedIn,
}: {
  checkoutData: any;
  shippingData: any;
  isLoggedIn?: any;
}) => {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toastId = useRef<any>(null);

  const cookieAddress1 = CookieHelper.get({ key: "address1" });

  const handleOrder = async (e: any) => {
    e.preventDefault();
    toastId.current = CustomToast.show("Please wait...");

    const shipping_fname = e.target.shipping_fname.value;
    const shipping_lname = e.target.shipping_lname.value;
    const shipping_country = e.target.shipping_country.value;
    const shipping_address1 = e.target.shipping_address1.value;
    const shipping_address2 = e.target.shipping_address2.value;
    const shipping_city = e.target.shipping_city.value;
    const shipping_state = e.target.shipping_state.value;
    const shipping_zip = e.target.shipping_zip.value;
    const email = e.target.email.value;
    const shipping_phone = e.target.shipping_phone.value;
    const payment_provider_id = e.target.payment_provider_id.value;

    // const billing = e.target.billing.value;
    // const billing_fname = e.target.billing_fname.value;
    // const billing_lname = e.target.billing_lname.value;
    // const billing_country = e.target.billing_country.value;
    // const billing_address1 = e.target.billing_address1.value;
    // const billing_address2 = e.target.billing_address2.value;
    // const billing_city = e.target.billing_city.value;
    // const billing_state = e.target.billing_state.value;
    // const billing_zip = e.target.billing_zip.value;

    const data = {
      checkout_id: checkoutData.data.uuid,
      shipping_fname,
      shipping_lname,
      shipping_country,
      shipping_address1,
      shipping_address2,
      shipping_city,
      shipping_state,
      shipping_zip,
      email,
      shipping_phone,

      // billing,
      // billing_fname,
      // billing_lname,
      // billing_country,
      // billing_address1,
      // billing_address2,
      // billing_city,
      // billing_state,
      // billing_zip,

      payment_provider_id: payment_provider_id,
    };

    try {
      const orderService = await OrderService.store(data);
      const response = orderService.data;
      if (response.success) {
        setLoading(false);
        CustomToast.update(toastId.current, response.message);
        if (response.redirect) {
          window.location.replace(response.redirect_url);
        }
      } else {
        setLoading(false);
        CustomToast.update(toastId.current, response.message);
      }
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        setLoading(false);
        CustomToast.update(toastId.current, error.response.data.message);
      } else {
        setLoading(false);
        CustomToast.update(toastId.current, error.message);
      }
    }
  };

  return (
    <div>
      <DashboardNav isLoggedIn={isLoggedIn} />
      <CustomToastContainer />
      <div className="md:px-10 px-5 py-5">
        <Link href="/home">
          <p className=" flex  text-sm text-gray-600 font-semibold">
            <IoIosArrowBack className="text-xl cursor-pointer" />
            Continue shopping
          </p>
        </Link>
        <h1 className=" font-bold text-2xl py-5">Checkout</h1>
        {/* total card */}
        <form onSubmit={handleOrder}>
          <div className="lg:flex  gap-5 justify-between mt-5">
            {/* 1st cart */}

            <div className=" over-flow-hidden">
              {/* header */}
              <div
                className=" flex items-center lg:gap-80 md:gap-44 gap-5  uppercase bg-gray-200 p-2 mt-5 rounded-md px-5 font-semibold text-gray-600 
                        text-[8px] md:text-base"
              >
                <h3>YourItems ({checkoutData.data.checkout_items.length})</h3>
                <div className=" flex items-center  gap-2 md:gap-8 ">
                  <h3>Quantity</h3>
                  <h3>item Price </h3>
                  <h3>items total</h3>
                </div>
              </div>
              {/* items */}
              {checkoutData.data.checkout_items.map((cartItem: any) => {
                return (
                  <>
                    <div className="my-3 flex items-center gap-5 border-b border-black pb-3">
                      <Image src={item} alt="item" />
                      <h2 className=" font-semibold md:block hidden ">
                        {cartItem.product.name}
                      </h2>
                      {cartItem.quantity}
                      <p className="md:text-lg text-xs md:pl-5 pl-1">
                        {cartItem.product.currency_sign}
                        {cartItem.product.new_price}
                        {/* <span className="text-sm">
                        <br /> €14.60 / 1l
                      </span> */}
                      </p>
                      <p className="md:text-lg text-xs md:pl-5 ">
                        {cartItem.product.currency_sign}
                        {cartItem.subtotal}
                      </p>
                    </div>
                  </>
                );
              })}

              {/* end items */}

              {/* shipping address */}
              <div>
                <div className="space-y-2 text-sm">
                  <input
                    type="text"
                    name="shipping_fname"
                    id="shipping_fname"
                    defaultValue={checkoutData.data.fname}
                    placeholder="First name"
                    className="w-full mb-2 px-4 py-3  border border-gray-300 bg-white   "
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <input
                    type="text"
                    name="shipping_lname"
                    id="shipping_lname"
                    defaultValue={checkoutData.data.lname}
                    placeholder="Last name"
                    className="w-full mb-2 px-4 py-3  border border-gray-300 bg-white   "
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <label htmlFor=""></label>
                  <select
                    // onChange={handleChangeShipping}
                    className="mb-2"
                    name="shipping_country"
                    id="shipping_country"
                  >
                    {shippingData.countries.map((country: any) => {
                      return (
                        <>
                          <option value={country.id}>{country.name}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div className="space-y-2 text-sm">
                  <input
                    type="shipping_address1"
                    name="shipping_address1"
                    id="shipping_address1"
                    placeholder="Address 1"
                    className="w-full mb-2 px-4 py-3  border border-gray-300 bg-white   "
                    defaultValue={cookieAddress1}
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <input
                    type="shipping_address2"
                    name="shipping_address2"
                    id="shipping_address2"
                    placeholder="Address 2"
                    className="w-full mb-2 px-4 py-3  border border-gray-300 bg-white   "
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <input
                    type="shipping_city"
                    name="shipping_city"
                    id="shipping_city"
                    placeholder="City"
                    className="w-full mb-2 px-4 py-3  border border-gray-300 bg-white   "
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <input
                    type="shipping_state"
                    name="shipping_state"
                    id="shipping_state"
                    placeholder="State"
                    className="w-full mb-2 px-4 py-3  border border-gray-300 bg-white   "
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <input
                    type="shipping_zip"
                    name="shipping_zip"
                    id="shipping_zip"
                    placeholder="Zip"
                    className="w-full mb-2 px-4 py-3  border border-gray-300 bg-white   "
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={checkoutData.data.email}
                    placeholder="Email"
                    className="w-full mb-2 px-4 py-3  border border-gray-300 bg-white   "
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <input
                    type="shipping_phone"
                    name="shipping_phone"
                    id="shipping_phone"
                    placeholder="Phone"
                    className="w-full mb-2 px-4 py-3  border border-gray-300 bg-white   "
                  />
                </div>
              </div>
            </div>

            {/* 2nd cart */}
            <div className=" flex-1 mt-5">
              <div className=" bg-gray-200 p-3 rounded-md">
                <h3 className="flex items-center justify-between font-semibold">
                  {" "}
                  <span>Subtotal</span>{" "}
                  <span>
                    {checkoutData.data.currency_sign}
                    {checkoutData.subtotal}
                  </span>{" "}
                </h3>
                {/* discount */}
                <h3 className="flex items-center justify-between font-semibold">
                  {" "}
                  <span>Discount</span>{" "}
                  {checkoutData.coupon_discounted.map((coupon: any, key) => {
                    return (
                      <span key={key}>
                        -
                        {coupon.amount_type === "percentage"
                          ? coupon.amount + "%"
                          : checkoutData.currency_sign}
                      </span>
                    );
                  })}
                </h3>
                <h3 className="flex items-center justify-between border-b border-gray-400 pb-4 ">
                  <span className="flex items-center gap-1 ">
                    Delivery fee{" "}
                  </span>{" "}
                  <span>
                    {shippingData.currency_sign}
                    {shippingData.price}
                  </span>{" "}
                </h3>
                {/* <h3 className="flex items-center justify-between py-3 ">
                <span>Deposit</span> <span>€37.58</span>{" "}
              </h3> */}
                {/* <h3 className="flex items-center justify-between border-b border-gray-400 pb-4 ">
                <span className="flex items-center gap-1 ">
                  Delivery fee{" "}
                  <IoMdInformationCircleOutline className="text-red-600 cursor-pointer" />
                </span>{" "}
                <span>€37.58</span>{" "}
              </h3> */}
                <h3 className="flex items-center justify-between font-semibold mt-2">
                  <span>Total</span>{" "}
                  <span>
                    {checkoutData.data.currency_sign}
                    {Number(checkoutData.total) + Number(shippingData.price)}
                  </span>{" "}
                </h3>
                <p className="text-gray-500 text-xs mt-2">incl. VAT</p>
              </div>
              <div>
                {/* payment option */}
                <div className="space-y-2 text-sm">
                  <label htmlFor=""></label>
                  <select
                    // onChange={handleChangeShipping}
                    className="mb-2"
                    name="payment_provider_id"
                    id="payment_provider_id"
                  >
                    {shippingData.payment_providers.map((payment: any) => {
                      return (
                        <>
                          <option value={payment.id}>{payment.label}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary p-3 text-white w-full rounded-md mt-4 font-semibold"
              >
                Place order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutClientPage;
