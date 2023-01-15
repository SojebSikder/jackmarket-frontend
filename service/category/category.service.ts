import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class CategoryService {
  static async findAll() {
    const data = await Fetch.get(`/category`, config);
    return data.data;
  }
  static async findOne(slug: number) {
    const data = await Fetch.get(`/category/${slug}`, config);
    return data.data;
  }
}
