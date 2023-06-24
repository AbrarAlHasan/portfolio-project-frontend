import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, string, z } from "zod";
import "../style.css";
import { Link, useNavigate } from "react-router-dom";

import VisibleIcon from "../../../assets/icons/visibility";
import VisibleOffIcon from "../../../assets/icons/visibility_off";
import { loginUser } from "../../../Axios/Authentication/authentication";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

function Index() {
  const schema = z.object({
    email: string().email(),
    password: string().min(8, { message: "Min 8 Characters are Required" }),
  });

  const { register, control, handleSubmit, formState, reset } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const navigation = useNavigate();

  const passRef = useRef<HTMLInputElement>(null);
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);

  //!Show and Hide Password Functionality
  const changePassVisibility = () => {
    setShowPass(!showPass);
    //#Tried to Do using Ref but the Ref is orking but the Hook form is making error and not Printing the Values
    // if (passRef.current != undefined) {
    //   passRef.current.type = showPass ? "password" : "text";
    // }
  };

  const { errors } = formState;

  const onSubmit = async (formValues: {
    email?: string;
    password?: string;
  }): Promise<void> => {
    const response = await loginUser({
      email: formValues?.email,
      password: formValues?.password,
    });
    if (response.status === 200) {
      setUserDetails(response.data);
      console.log(response.data);
      navigation("/dashboard");
    }
  };
  return (
    <div className="w-screen login_window_container">
      <div className="login-glass-effect">
        <div className="flex justify-center items-center h-screen ">
          <div className="flex flex-col items-center rounded-tl-[50px] rounded-br-[50px] p-5 w-[400px] login_box">
            <h1 className="text-xl bold mt-5 text-white">Welcome Back !</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-11/12 flex flex-col justify-center items-center my-5 gap-4"
            >
              <div className="w-full ">
                <input
                  {...register("email")}
                  placeholder="Email"
                  className="login_input w-11/12"
                />
                <div style={{ color: "red" }} className="ml-[10px]">
                  {errors?.email?.message}
                </div>
              </div>
              <div className="w-full relative">
                <input
                  {...register("password")}
                  placeholder="Password"
                  className="login_input w-11/12 "
                  type={"password"}
                />
                <div
                  className="absolute right-7 top-[20px] hover:cursor-pointer"
                  onClick={changePassVisibility}
                >
                  {showPass ? <VisibleOffIcon /> : <VisibleIcon />}
                </div>

                <div style={{ color: "red" }} className="ml-[10px]">
                  {errors?.password?.message}
                </div>
              </div>
              <div className="self-end mx-4 ">
                <Link
                  className="text-white text-sm hover:cursor-pointer"
                  to="/forgetpass/email"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className=" flex justify-center items-center ">
                <button
                  type="submit"
                  className="text-white  bg-[#7F1E85] px-5 py-2 rounded-lg w-max"
                >
                  Login
                </button>
              </div>
              <div className="my-3">
                <Link
                  className="text-white text-sm hover:cursor-pointer"
                  to="/signup"
                >
                  New User? Signup Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
