import { AuthHelper } from "@/helper/auth.helper";
import CheckoutClientPage from "./Components/CheckoutClientPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ShippingService } from "@/service/shipping/shipping.service";
import { CheckoutService } from "@/service/checkout/checkout.service";

const Page = async ({ params }: { params: { id: number } }) => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();

  if (!isLoggedIn) {
    redirect("/login");
  }

  let checkoutData;
  let shippingData;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    // fetch cart info
    const checkoutService = await CheckoutService.findOne({
      token: token?.value,
      checkout_id: String(params.id),
    });
    checkoutData = checkoutService.data;

    // fetch shipping info
    const shippingService = await ShippingService.findOne(
      checkoutData.data.shipping_zone_id
    );
    shippingData = shippingService.data;
    
  } catch (error) {}

  return (
    <CheckoutClientPage
      checkoutData={checkoutData}
      shippingData={shippingData.data}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default Page;
