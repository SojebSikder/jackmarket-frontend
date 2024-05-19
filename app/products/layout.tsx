import { AuthHelper } from "@/helper/auth.helper";
import LayoutClientPage from "./Components/layoutClientPage";
import { FooterService } from "@/service/cms/footer.service";

const Dashboard = async ({ children }: { children: any }) => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();

  let footerData;
  try {
    const footerService = await FooterService.findAll();
    footerData = footerService.data;
  } catch (error) {}

  return (
    <LayoutClientPage isLoggedIn={isLoggedIn} footerData={footerData.data}>
      {children}
    </LayoutClientPage>
  );
};

export default Dashboard;
