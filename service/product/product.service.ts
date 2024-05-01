import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const ProductService = {
  findAll: async (page: number = 1) => {
    return await Fetch.get(`/product?page=${page}`, config);
  },
  findAllProductWithCategories: async (page: number = 1) => {
    return await Fetch.get(
      `/product/productWithCategory?page=${page}`,
      config
    );
  },
  findOne: async (id: number) => {
    return await Fetch.get(`/product/${id}`, config);
  },
};
