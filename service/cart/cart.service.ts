import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CartService = {
  findAll: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/cart`, _config);
  },

  store: async ({
    product_id,
    variant_id,
    quantity,
    context = null,
  }: {
    product_id: number;
    variant_id?: number;
    quantity: number;
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
      product_id,
      variant_id,
      quantity,
    };

    return await Fetch.post(`/cart`, data, _config);
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

  // apply coupon
  applyCoupon: async ({
    code,
    context = null,
  }: {
    code: string;
    context: any;
  }) => {
    const userToken = CookieHelper.get({ key: "token", context });
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      code: code,
    };
    return await Fetch.post(`/coupon`, data, _config);
  },
};
