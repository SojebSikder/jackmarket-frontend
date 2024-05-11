import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CheckoutService = {
  store: async ({
    shipping_zone_id,
    fname,
    lname,
    email,
    context = null,
  }: {
    shipping_zone_id: number;
    fname?: string;
    lname: string;
    email: string;
    context?: any;
  }) => {
    const userToken = CookieHelper.get({ key: "token", context });
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      shipping_zone_id,
      fname,
      lname,
      email,
    };

    return await Fetch.post(`/checkout`, data, _config);
  },

  update: async (
    id: number,
    {
      product_id,
      variant_id,
      quantity,
      context = null,
    }: {
      product_id: number;
      variant_id?: number;
      quantity: number;
      context?: any;
    }
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      product_id,
      variant_id,
      quantity,
    };

    return await Fetch.put(`/cart/${id}`, data, _config);
  },
};
