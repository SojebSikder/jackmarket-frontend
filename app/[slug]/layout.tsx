import { AuthHelper } from "@/helper/auth.helper";
import LayoutClientPage from "./Components/layoutClientPage";

const Dashboard = async ({ children }: { children: any }) => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();
  return (
    <LayoutClientPage isLoggedIn={isLoggedIn}>{children}</LayoutClientPage>
  );
};

export default Dashboard;
