"use client";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import cycleIcon from "../../../public/Dashboard/ShoppingCart/cycle-icon.png";
import busket from "../../../public/Dashboard/ShoppingCart/buskat 1.png";
import item from "../../../public/Dashboard/ShoppingCart/image (7).png";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Quantity from "@/components/common/Quantity";
import { CustomToast } from "@/utils/Toast/CustomToast";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { CartService } from "@/service/cart/cart.service";
import { CheckoutService } from "@/service/checkout/checkout.service";
import { useRouter } from "next/navigation";
import { OrderService } from "@/service/order/order.service";

const OrderClientPage = ({
  orderData,
  isLoggedIn,
}: {
  orderData: any;
  isLoggedIn?: any;
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toastId = useRef<any>(null);

  const handlePayment = async (
    e: any,
    order_id: number,
    payment_provider_id: number
  ) => {
    e.preventDefault();
    if (loading === true) {
      return;
    }
    setLoading(true);

    toastId.current = CustomToast.show("Please wait...");

    const data = {
      order_id: order_id,
      payment_provider_id: payment_provider_id,
    };

    try {
      const orderService = await OrderService.pay(data);
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
        <Link href="/products">
          <p className=" flex  text-sm text-gray-600 font-semibold">
            <IoIosArrowBack className="text-xl cursor-pointer" />
            Continue shopping{" "}
          </p>
        </Link>
        <h1 className=" font-bold text-2xl py-5">My orders </h1>
        {/* total card */}
        <div className="mt-5">
          {/* 1st cart */}

          <div className=" over-flow-hidden">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Orders ({orderData.data.length})
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.data.map((orderItem: any) => {
                    return (
                      <tr
                        key={orderItem.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          #{orderItem.invoice_number}
                        </th>
                        <td className="px-6 py-4">
                          {orderItem.currency_sign}
                          {orderItem.order_total}
                        </td>
                        <td className="px-6 py-4">{orderItem.status}</td>
                        <td className="px-6 py-4">
                          {orderItem.payment_status}
                          {orderItem.payment_status == "unpaid" && (
                            <button
                              disabled={loading}
                              onClick={(e) =>
                                handlePayment(
                                  e,
                                  orderItem.id,
                                  orderItem.payment_provider_id
                                )
                              }
                              className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md"
                            >
                              Pay now
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Link href="/products">
              <p className=" flex  text-sm text-gray-600 font-semibold">
                <IoIosArrowBack className="text-xl cursor-pointer" />
                Continue shopping
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderClientPage;
