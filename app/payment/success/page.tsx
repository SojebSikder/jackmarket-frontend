import React from "react";
import ClientSuccessPage from "./Components/ClientSuccessPage";
import { AuthHelper } from "@/helper/auth.helper";

export default async function Page() {
  const isLoggedIn = await AuthHelper.checkLoggedIn();
  return <ClientSuccessPage isLoggedIn={isLoggedIn} />;
}
