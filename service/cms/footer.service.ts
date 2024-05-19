import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const FooterService = {
  findAll: async () => {
    const _config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return await Fetch.get(`/footer`, _config);
  },
};
