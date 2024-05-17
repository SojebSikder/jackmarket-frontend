import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const ShippingService = {
  findAll: async () => {
    return await Fetch.get(`/shipping`, config);
  },
  findOne: async (id: number) => {
    return await Fetch.get(`/shipping/${id}`, config);
  },
};
