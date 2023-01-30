import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, string, z } from "zod";
import "../style.css";
import { Link } from "react-router-dom";

import VisibleIcon from "../../../assets/icons/visibility";
import VisibleOffIcon from "../../../assets/icons/visibility_off";

function Index() {
  const schema = z
    .object({
      name: string().min(3, { message: "Min 3 Characters Required" }),
      email: string().email(),
      password: string().min(8, { message: "Min 8 Characters are Required" }),
      re_password: string().min(8, {
        message: "Min 8 Characters are Required",
      }),
    })
    .superRefine(({ re_password, password }, ctx) => {
      if (re_password !== password) {
        ctx.addIssue({
          code: "custom",
          path:["re_password"],
          message: "The passwords didn't match",
        });
      }
    });

  const { register, control, handleSubmit, formState, reset } = useForm({
    defaultValues: { name: "", email: "", password: "", re_password: "" },
    resolver: zodResolver(schema),
  });

  const passRef = useRef<HTMLInputElement>(null);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  //!Show and Hide Password Functionality
  const changePassVisibility = (key: string): void => {
    key == "password" ? setShowPass(!showPass) : setShowRePass(!showRePass);
    //#Tried to Do using Ref but the Ref is orking but the Hook form is making error and not PRinting the Values
    // if (passRef.current != undefined) {
    //   passRef.current.type = showPass ? "password" : "text";
    // }
  };

  const { errors } = formState;
  console.log(errors)
  const onSubmit = (formValues: {
    name?: string;
    email?: string;
    password?: string;
    re_password?: string;
  }): void => {
    console.log(formValues);
    reset();
    
  };
  return (
    <div className="w-screen login_window_container">
      <div className="login-glass-effect">
        <div className="flex justify-center items-center h-screen ">
          <div className="flex flex-col items-center rounded-tl-[50px] rounded-br-[50px] p-5 w-[400px] login_box">
            <h1 className="text-xl bold mt-5 text-white">Register</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-11/12 flex flex-col justify-center items-center my-5 gap-4"
            >
              <div className="w-full ">
                <input
                  {...register("name")}
                  placeholder="Name"
                  className="login_input w-11/12"
                />
                <div style={{ color: "red" }} className="ml-[10px]">
                  {errors?.name?.message}
                </div>
              </div>
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
                  type={showPass?"password":"text"}
                />
                <div
                  className="absolute right-7 top-[20px] hover:cursor-pointer"
                  onClick={() => {
                    changePassVisibility("password");
                  }}
                >
                  {showPass ? <VisibleOffIcon /> : <VisibleIcon />}
                </div>

                <div style={{ color: "red" }} className="ml-[10px]">
                  {errors?.password?.message}
                </div>
              </div>

              <div className="w-full relative">
                <input
                  {...register("re_password")}
                  placeholder="Re-Password"
                  className="login_input w-11/12 "
                  type={showRePass?"password":"text"}

                />
                <div
                  className="absolute right-7 top-[20px] hover:cursor-pointer"
                  onClick={() => {
                    changePassVisibility("re_password");
                  }}
                >
                  {showRePass ? <VisibleOffIcon /> : <VisibleIcon />}
                </div>

                <div style={{ color: "red" }} className="ml-[10px]">
                  {errors?.re_password?.message}
                </div>
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
                  to="/"
                >
                  Already Registered? Login Now
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
