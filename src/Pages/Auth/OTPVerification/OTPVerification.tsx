import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, string, z } from "zod";
import "../style.css";
import { Link, useNavigate } from "react-router-dom";

import VisibleIcon from "../../../assets/icons/visibility";
import VisibleOffIcon from "../../../assets/icons/visibility_off";
import { verifyOTP } from "../../../Axios/Authentication/authentication";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

function OTPVerification() {
  const schema = z.object({
    otp: number().min(6, { message: "Min 6 Characters are Required" }),
  });

  const { register, control, handleSubmit, formState, reset } = useForm({
    defaultValues: { otp: null },
    resolver: zodResolver(schema),
  });
  const navigation = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
  console.log(userDetails);

  const { errors } = formState;

  const onSubmit = async (formValues: {
    otp?: number | null | undefined;
  }): Promise<void> => {
    console.log(formValues?.otp, userDetails?._id);
    const response = await verifyOTP({
      otp: formValues.otp,
      userId: userDetails?._id,
    });
    if (response.status == 200) {
      setUserDetails(undefined);
      navigation("/");
    }
    reset();
  };
  return (
    <div className="w-screen login_window_container">
      <div className="login-glass-effect">
        <div className="flex justify-center items-center h-screen ">
          <div className="flex flex-col items-center rounded-tl-[50px] rounded-br-[50px] p-5 w-[400px] login_box">
            <h1 className="text-xl bold mt-5 text-white">{`Hello ${userDetails?.firstName}`}</h1>
            <h3 className="text-lg mt-2 text-white">Please Enter the OTP</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-11/12 flex flex-col justify-center items-center my-5 gap-4"
            >
              <div className="w-full ">
                <input
                  {...register("otp", { valueAsNumber: true })}
                  placeholder="OTP"
                  className="login_input w-11/12"
                />
                <div style={{ color: "red" }} className="ml-[10px]">
                  {errors?.otp?.message}
                </div>
                <div className="text-white flex justify-end">Resend OTP</div>
              </div>

              <div className=" flex justify-center items-center ">
                <button
                  type="submit"
                  className="text-white  bg-[#7F1E85] px-5 py-2 rounded-lg w-max"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
