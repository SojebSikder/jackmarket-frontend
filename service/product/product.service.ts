import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const ProductService = {
  findAll: async (query = "") => {
    // return await Fetch.get(`/product?page=${page}`, config);
    return await Fetch.get(`/product${query}`, config);
  },
  findAllProductWithCategories: async (page: number = 1) => {
    return await Fetch.get(`/product/productWithCategory?page=${page}`, config);
  },
  findOne: async (id: number) => {
    return await Fetch.get(`/product/${id}`, config);
  },
};
