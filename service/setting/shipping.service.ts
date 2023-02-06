import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Shipping service
 */
export class ShippingService {
  static async findAll() {
    const res = await Fetch.get(`/shipping`, config);
    return res.data;
  }

  static async findOne(id: number) {
    const res = await Fetch.get(`/shipping/${id}`, config);
    return res.data;
  }
}
