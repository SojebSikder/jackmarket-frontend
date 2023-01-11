import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class ProductService {
  static async findAll(page?: number) {
    const data = await Fetch.get(`/product?page=${page}`, config);
    return data.data;
  }
  static async findOne(id: number) {
    const data = await Fetch.get(`/product/${id}`, config);
    return data.data;
  }
  static create(data: any) {
    throw new Error("Method not implemented.");
  }
  static update(id: number, data: any) {
    throw new Error("Method not implemented.");
  }
  static delete(id: number) {
    throw new Error("Method not implemented.");
  }
}
