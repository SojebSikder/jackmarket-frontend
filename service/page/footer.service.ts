import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class FooterService {
  static async findAll() {
    const data = await Fetch.get(`/footer`, config);
    return data.data;
  }
}
