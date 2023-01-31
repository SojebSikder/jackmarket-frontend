import { CartOption } from "../../helper/cart.helper";
import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class CheckoutService {
  static async store({
    fname,
    lname,
    email,
    mailing,
    cart_data,
    shipping_zone_id,
  }: {
    fname: string;
    lname: string;
    email: string;
    mailing: string;
    cart_data: CartOption[];
    shipping_zone_id?: number;
  }) {
    const data = {
      fname,
      lname,
      email,
      mailing,
      cart_data,
      shipping_zone_id,
    };
    const res = await Fetch.post(`/checkout`, data, config);
    return res.data;
  }
}
