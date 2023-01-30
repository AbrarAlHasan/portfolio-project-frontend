import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, string, z } from "zod";
import "../../style.css";
import { Link,useNavigate } from "react-router-dom";


function Index() {

  const navigation=useNavigate()

  const schema = z.object({
    email: string().email(),
  });

  const { register, control, handleSubmit, formState,reset } = useForm({
    defaultValues: { email: ""},
    resolver: zodResolver(schema),
  });


  const { errors } = formState;

  const onSubmit = (formValues: {
    email?: string;
  }): void => {
    console.log(formValues);
    reset()
    navigation("/forgetPass/newpass")
  };
  return (
    <div className="w-screen login_window_container">
      <div className="login-glass-effect">
        <div className="flex justify-center items-center h-screen ">
          <div className="flex flex-col items-center rounded-tl-[50px] rounded-br-[50px] p-5 w-[400px] login_box">
            <h1 className="text-xl bold mt-5 text-white">Password Reset</h1>
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
              
              <div className=" flex justify-center items-center ">
                <button type="submit" className="text-white  bg-[#7F1E85] px-5 py-2 rounded-lg w-max">
                  Reset Password
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
