import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class PageService {
  static async findOne(slug: string) {
    const data = await Fetch.get(`/page/${slug}`, config);
    return data.data;
  }
}
