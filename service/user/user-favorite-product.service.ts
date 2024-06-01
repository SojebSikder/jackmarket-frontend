import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const UserFavoriteProductService = {
  findAll: async ({ token, query = "" }: { token: string; query?: string }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    return await Fetch.get(`/user-favorite-product${query}`, _config);
  },

  store: async ({
    product_id,
    context = null,
  }: {
    product_id: number;
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
      product_id: product_id,
    };

    return await Fetch.post(`/user-favorite-product`, data, _config);
  },
};
