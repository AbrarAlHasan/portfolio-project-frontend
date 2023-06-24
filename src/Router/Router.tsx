import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Dashboard from "../Pages/Dashboard/Main";
import ForgetPassEmail from "../Pages/Auth/ForgotPass/Email";
import ForgetPassNewpass from "../Pages/Auth/ForgotPass/NewPass";
import PageNotFound from "../Pages/PagenotFound";
import OTPVerification from "../Pages/Auth/OTPVerification/OTPVerification";
import ProtectedRouter from "./ProtectedRouter";
import AuthRouter from "./AuthRouter";
import PersistLogin from "../Components/Auth/PersistLogin";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRouter />}>
          <Route element={<PersistLogin />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route path="/otpVerification" element={<OTPVerification />} />
          <Route path="/forgetPass/email" element={<ForgetPassEmail />} />
          <Route path="/forgetPass/newpass" element={<ForgetPassNewpass />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route element={<ProtectedRouter />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
