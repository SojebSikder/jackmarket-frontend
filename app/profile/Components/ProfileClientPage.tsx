"use client";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import { useRef, useState } from "react";
import { CustomToast } from "@/utils/Toast/CustomToast";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { useRouter } from "next/navigation";
import { UserService } from "@/service/user/user.service";

const ProfileClientPage = ({
  userDetails,
  isLoggedIn,
}: {
  userDetails: any;
  isLoggedIn?: any;
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toastId = useRef<any>(null);

  const saveProfileData = async (e: any) => {
    e.preventDefault();
    toastId.current = CustomToast.show("Please wait...");

    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;

    const data = {
      fname: fname ? fname : userDetails.data.fname,
      lname: lname ? lname : userDetails.data.lname,
      email: email ? email : userDetails.data.email,
    };

    try {
      const userService = await UserService.update(data);
      const response = userService.data;
      if (response.success) {
        setMessage(response.message);
        setLoading(false);

        CustomToast.update(toastId.current, response.message);
      } else {
        setErrorMessage(response.message);
        setLoading(false);
        CustomToast.update(toastId.current, response.message);
      }
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setLoading(false);
        CustomToast.update(toastId.current, error.response.data.message);
      } else {
        setErrorMessage(error.message);
        setLoading(false);
        CustomToast.update(toastId.current, error.message);
      }
    }
  };

  return (
    <div>
      <DashboardNav isLoggedIn={isLoggedIn} />
      <CustomToastContainer />
      <div className="md:px-10 px-5 py-5">
        <h1 className=" font-bold text-2xl py-5">Profile </h1>
        {/* total card */}
        <div className="lg:flex  gap-5 justify-center mt-5">
          {/* 1st cart */}

          <div className=" over-flow-hidden">
            {/* header */}
            <div className=" flex">
              <form onSubmit={saveProfileData}>
                <div className="m-4">
                  <div className="mb-2">
                    <label htmlFor="">First name:</label>
                  </div>
                  <input
                    id="fname"
                    name="fname"
                    type="text"
                    defaultValue={`${userDetails.data.fname}`}
                  />
                </div>
                <div className="m-4">
                  <div className="mb-2">
                    <label htmlFor="">Last name:</label>
                  </div>
                  <input
                    id="lname"
                    name="lname"
                    type="text"
                    defaultValue={`${userDetails.data.lname}`}
                  />
                </div>
                <div className="m-4">
                  <div className="mb-2">
                    <label htmlFor="">Email:</label>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={`${userDetails.data.email}`}
                  />
                </div>
                <div className="m-4">
                  <button
                    type="submit"
                    className=" rounded p-2 px-4 font-semibold  bg-[#E9D7D8] text-primary duration-300 active:scale-95 w-full"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            {/* items */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClientPage;
