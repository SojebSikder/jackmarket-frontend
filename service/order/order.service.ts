import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const OrderService = {
  findAll: async ({
    token,
    context = null,
  }: {
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

    return await Fetch.get(`/order`, _config);
  },

  findOne: async ({
    order_id,
    token,
    context = null,
  }: {
    order_id: string;
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

    return await Fetch.get(`/order/${order_id}`, _config);
  },

  store: async ({
    checkout_id,
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

    billing,
    billing_fname,
    billing_lname,
    billing_country,
    billing_address1,
    billing_address2,
    billing_city,
    billing_state,
    billing_zip,

    payment_provider_id,

    context = null,
  }: {
    checkout_id: string;
    shipping_fname: string;
    shipping_lname: string;
    shipping_country: string;
    shipping_address1: string;
    shipping_address2: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zip: string;
    email: string;
    shipping_phone: string;

    billing?: string;
    billing_fname?: string;
    billing_lname?: string;
    billing_country?: string;
    billing_address1?: string;
    billing_address2?: string;
    billing_city?: string;
    billing_state?: string;
    billing_zip?: string;

    payment_provider_id: number;
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
      checkout_id,
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

      billing,
      billing_fname,
      billing_lname,
      billing_country,
      billing_address1,
      billing_address2,
      billing_city,
      billing_state,
      billing_zip,

      payment_provider_id,
    };

    return await Fetch.post(`/order`, data, _config);
  },

  pay: async ({
    order_id,
    payment_provider_id,
    token,
    context = null,
  }: {
    order_id: number;
    payment_provider_id: number;
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

    const data = {
      order_id,
      payment_provider_id,
    };

    return await Fetch.post(`/payment/pay`, data, _config);
  },
};
