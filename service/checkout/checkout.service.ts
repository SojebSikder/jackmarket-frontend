import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CheckoutService = {
  findOne: async ({
    checkout_id,
    token,
    context = null,
  }: {
    checkout_id: string;
    token?: string;
    context?: any;
  }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/checkout/${checkout_id}`, _config);
  },
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
};
