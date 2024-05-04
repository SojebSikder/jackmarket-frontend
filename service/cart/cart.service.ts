import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CartService = {
  findAll: async (page: number = 1) => {
    return await Fetch.get(`/cart?page=${page}`, config);
  },
  findOne: async (id: number) => {
    return await Fetch.get(`/cart/${id}`, config);
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
};
