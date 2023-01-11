import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class SitemapService {
  static async findAll() {
    const data = await Fetch.get(`/sitemap`, config);
    return data.data;
  }
}
