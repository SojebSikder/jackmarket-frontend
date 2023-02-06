import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../utils/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class UserService {
  static async getUserDetails(context = null) {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = await Fetch.get(`/user/`, _config);
    return data;
  }

  // get user details
  // getUserDetails: async (context = null) => {
  //     const userToken = CookieHelper.get({ key: "token", context });

  //     const _config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + userToken,
  //       },
  //     };

  //     return await axios.get(`${AppConfig.apiUrl}/user`, _config);
  //   },
}
