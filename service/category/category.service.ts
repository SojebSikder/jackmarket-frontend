import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CategoryService = {
  findAll: async () => {
    const _config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return await Fetch.get(`/category`, _config);
  },
};
