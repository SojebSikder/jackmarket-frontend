import { AuthHelper } from "@/helper/auth.helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileClientPage from "./Components/ProfileClientPage";
import { UserService } from "@/service/user/user.service";

const Page = async () => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();

  if (!isLoggedIn) {
    redirect("/login");
  }

  let userDetails;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const userService = await UserService.getUserDetails({
      token: token?.value,
    });

    userDetails = userService.data;
  } catch (error) {}

  return (
    <ProfileClientPage userDetails={userDetails} isLoggedIn={isLoggedIn} />
  );
};

export default Page;
