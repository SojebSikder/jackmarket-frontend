import DashboardNav from "@/components/Dashboard/DashboardNav";
import React from "react";

export default function ClientSuccessPage({
  isLoggedIn,
}: {
  isLoggedIn?: any;
}) {
  return (
    <div>
      <DashboardNav isLoggedIn={isLoggedIn} />
      <div className="flex justify-center mt-5">
        <p className="text-3xl">Payment cancelled</p>
      </div>
    </div>
  );
}
