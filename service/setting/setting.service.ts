import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Setting service
 */
export class SettingService {
  static async findAll() {
    return await Fetch.get(`/setting`, config);
  }
  static async findOne(key: string) {
    return await Fetch.get(`/setting/${key}`, config);
  }
}
