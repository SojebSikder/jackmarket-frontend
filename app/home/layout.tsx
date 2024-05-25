import { AuthHelper } from "@/helper/auth.helper";
import LayoutClientPage from "./Components/layoutClientPage";
import { FooterService } from "@/service/cms/footer.service";
import { CategoryService } from "@/service/category/category.service";

const Dashboard = async ({ children }: { children: any }) => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();

  let footerData;
  let categoryData;
  try {
    const footerService = await FooterService.findAll();
    footerData = footerService.data;

    const categoryService = await CategoryService.findAll();
    categoryData = categoryService.data;
  } catch (error) {}

  return (
    <LayoutClientPage
      isLoggedIn={isLoggedIn}
      footerData={footerData.data}
      categoryData={categoryData.data}
    >
      {children}
    </LayoutClientPage>
  );
};

export default Dashboard;
