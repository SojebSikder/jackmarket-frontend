import { AuthHelper } from "@/helper/auth.helper";
import CartClientPage from "./Components/CartClientPage";
import { CartService } from "@/service/cart/cart.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ShippingService } from "@/service/shipping/shipping.service";
import { UserService } from "@/service/user/user.service";

const Page = async () => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();

  if (!isLoggedIn) {
    redirect("/login");
  }

  let userDetails;
  let cartData;
  let shippingData;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const userService = await UserService.getUserDetails({
      token: token?.value,
    });

    userDetails = userService.data;

    // fetch cart info
    const cartService = await CartService.findAll({
      token: token?.value,
    });
    cartData = cartService.data;

    // fetch shipping info
    const shippingService = await ShippingService.findAll();
    shippingData = shippingService.data;
  } catch (error) {}

  return (
    <CartClientPage
      userDetails={userDetails}
      cartData={cartData}
      shippingData={shippingData.data}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default Page;
