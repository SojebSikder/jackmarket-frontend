import { AuthHelper } from "@/helper/auth.helper";
import MyOrderClientPage from "./Components/MyOrderClientPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ShippingService } from "@/service/shipping/shipping.service";
import { OrderService } from "@/service/order/order.service";

const Page = async () => {
  const isLoggedIn = await AuthHelper.checkLoggedIn();

  if (!isLoggedIn) {
    redirect("/login");
  }

  let orderData;
  let shippingData;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    // fetch cart info
    const orderService = await OrderService.findAll({
      token: token?.value,
    });
    orderData = orderService.data;

  } catch (error) {}

  return (
    <MyOrderClientPage
      orderData={orderData}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default Page;
