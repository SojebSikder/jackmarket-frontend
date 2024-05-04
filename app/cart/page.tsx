import { AuthHelper } from "@/helper/auth.helper";
import CartClientPage from "./Components/CartClientPage";

const Page = async () => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();
  return <CartClientPage isLoggedIn={isLoggedIn} />;
};

export default Page;
