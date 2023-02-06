import { CartOption } from "../../helper/cart.helper";
import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class OrderService {
  static async store(
    {
      checkout_id,
      // shipping address
      shipping_fname,
      shipping_lname,
      shipping_country,
      shipping_address1,
      shipping_address2,
      shipping_city,
      shipping_state,
      shipping_zip,
      shipping_phone,
      email,
      // billing address
      billing,
      billing_fname,
      billing_lname,
      billing_country,
      billing_address1,
      billing_address2,
      billing_city,
      billing_state,
      billing_zip,
      // payment
      shipping_zone_id,
      payment_provider_id,
    }: {
      checkout_id: string;
      // shipping address
      shipping_fname: string;
      shipping_lname: string;
      shipping_country: number;
      shipping_address1: string;
      shipping_address2: string;
      shipping_city: string;
      shipping_state: string;
      shipping_zip: string;
      shipping_phone: string;
      email: string;
      // billing address
      billing: number;
      billing_fname: string;
      billing_lname: string;
      billing_country: number;
      billing_address1: string;
      billing_address2: string;
      billing_city: string;
      billing_state: string;
      billing_zip: string;
      // payment
      shipping_zone_id: number;
      payment_provider_id: number;
    },
    context = null
  ) {
    const data = {
      checkout_id,
      // shipping address
      shipping_fname,
      shipping_lname,
      shipping_country,
      shipping_address1,
      shipping_address2,
      shipping_city,
      shipping_state,
      shipping_zip,
      shipping_phone,
      email,
      // billing address
      billing,
      billing_fname,
      billing_lname,
      billing_country,
      billing_address1,
      billing_address2,
      billing_city,
      billing_state,
      billing_zip,
      // payment
      shipping_zone_id,
      payment_provider_id,
    };
    const res = await Fetch.post(`/order`, data, config);
    return res.data;
  }

  static async findOne(id: number, context = null) {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const res = await Fetch.get(`/order/${id}`, _config);
    return res.data;
  }
}
