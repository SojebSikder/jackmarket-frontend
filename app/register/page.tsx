import { AuthHelper } from "@/helper/auth.helper";
import RegisterClientPage from "./Components/RegisterClientPage";

const Page = async () => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();

  return <RegisterClientPage isLoggedIn={isLoggedIn} />;
};

export default Page;
