import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class CategoryService {
  static async findAll(page?: number) {
    const data = await Fetch.get(`/category`, config);
    return data.data;
  }
  static async findOne(id: number) {
    const data = await Fetch.get(`/category/${id}`, config);
    return data.data;
  }
}
