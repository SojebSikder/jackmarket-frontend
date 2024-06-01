"use client";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useRef, useState } from "react";
import { CustomToast } from "@/utils/Toast/CustomToast";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { UserFavoriteProductService } from "@/service/user/user-favorite-product.service";

const MyProductClientPage = ({
  userFavoriteProductData,
  isLoggedIn,
}: {
  userFavoriteProductData: any;
  isLoggedIn?: any;
}) => {
  const [loading, setLoading] = useState(false);
  const toastId = useRef<any>(null);

  const handleDeleteFavorite = async (e: any, id: number) => {
    e.preventDefault();

    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) {
      return;
    }

    if (loading === true) {
      return;
    }
    setLoading(true);

    toastId.current = CustomToast.show("Please wait...");

    try {
      const userFavoriteProductService =
        await UserFavoriteProductService.delete({ id: id });
      const response = userFavoriteProductService.data;

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
        <h1 className=" font-bold text-2xl py-5">Favorite list </h1>
        {/* total card */}
        <div className="mt-5">
          {/* 1st cart */}

          <div className=" over-flow-hidden">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Products ({userFavoriteProductData.data.length})
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userFavoriteProductData.data.map(
                    (userFavoriteProduct: any) => {
                      return (
                        <tr
                          key={userFavoriteProduct.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <Link
                              href={`/products/${userFavoriteProduct.product.id}`}
                            >
                              {userFavoriteProduct.product.name}
                            </Link>
                          </th>
                          <td className="px-6 py-4">
                            {userFavoriteProduct.product.currency_sign}
                            {userFavoriteProduct.product.new_price}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-md"
                              onClick={(e) =>
                                handleDeleteFavorite(
                                  e,
                                  userFavoriteProduct.product.id
                                )
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
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

export default MyProductClientPage;
