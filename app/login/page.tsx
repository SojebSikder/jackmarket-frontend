import { AuthHelper } from "@/helper/auth.helper";
import LoginClientPage from "./Components/LoginClientPage";

const Page = async () => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();
  return <LoginClientPage isLoggedIn={isLoggedIn} />;
};

export default Page;
