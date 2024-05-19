import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const PageService = {
  findOne: async (slug: string) => {
    const _config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return await Fetch.get(`/page/${slug}`, _config);
  },
};
