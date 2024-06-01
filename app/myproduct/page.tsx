import { AuthHelper } from "@/helper/auth.helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserFavoriteProductService } from "@/service/user/user-favorite-product.service";
import MyProductClientPage from "./Components/MyProductClientPage";

const Page = async () => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();

  if (!isLoggedIn) {
    redirect("/login");
  }

  let userFavoriteProductData;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    // fetch cart info
    const userFavoriteProductService = await UserFavoriteProductService.findAll(
      { token: String(token?.value) }
    );
    userFavoriteProductData = userFavoriteProductService.data;
  } catch (error) {}

  return (
    <MyProductClientPage
      userFavoriteProductData={userFavoriteProductData}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default Page;
