import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, string, z } from "zod";
import "../../style.css";
import { Link,useNavigate } from "react-router-dom";


function Index() {
  const navigate=useNavigate()
  const schema = z.object({
    otp: string(),
    pass:string().min(8,{message:"Min 8 Characters Required"}),
    re_pass:string().min(8,{message:"Min 8 Characters Required"})
  }).superRefine(({pass,re_pass},ctx)=>{
    if(pass!==re_pass){
      ctx.addIssue({
        code:"custom",
        path:["re_pass"],
        message:"The Passwords didn't Match"
      })
    }
  });

  const { register, control, handleSubmit, formState,reset } = useForm({
    defaultValues: { otp: "",pass:"",re_pass:""},
    resolver: zodResolver(schema),
  });


  const { errors } = formState;

  const onSubmit = (formValues: {
    otp?: string;
    pass:string;
    re_pass:string
  }): void => {
    console.log(formValues);
    reset();
    setTimeout(()=>navigate("/"),1000)
  };
  return (
    <div className="w-screen login_window_container">
      <div className="login-glass-effect">
        <div className="flex justify-center items-center h-screen ">
          <div className="flex flex-col items-center rounded-tl-[50px] rounded-br-[50px] p-5 w-[400px] login_box">
            <h1 className="text-xl bold mt-5 text-white">New Password</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-11/12 flex flex-col justify-center items-center my-5 gap-4"
            >
              <div className="w-full ">
                <input
                  {...register("otp")}
                  placeholder="Otp"
                  className="login_input w-11/12"
                />
                <div style={{ color: "red" }} className="ml-[10px]">
                  {errors?.otp?.message}
                </div>
              </div>

              <div className="w-full ">
                <input
                  {...register("pass")}
                  placeholder="New Password"
                  className="login_input w-11/12"
                />
                <div style={{ color: "red" }} className="ml-[10px]">
                  {errors?.pass?.message}
                </div>
              </div>

              <div className="w-full ">
                <input
                  {...register("re_pass")}
                  placeholder="Re-New Password"
                  className="login_input w-11/12"
                />
                <div style={{ color: "red" }} className="ml-[10px]">
                  {errors?.re_pass?.message}
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
