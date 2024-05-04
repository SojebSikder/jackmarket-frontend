import { UserService } from "@/service/user/user.service";
import { cookies } from "next/headers";

/**
 * AuthHelper
 */
export const AuthHelper = {
  checkLoggedIn: async () => {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    try {
      const userService = await UserService.getUserDetails({
        token: token?.value,
      });
      const response = userService.data;

      if (response.success) {
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
};
