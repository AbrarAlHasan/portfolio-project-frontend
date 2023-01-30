import React from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import Dashboard from './Pages/Dashboard/Main'
import ForgetPassEmail from './Pages/Auth/ForgotPass/Email'
import ForgetPassNewpass from './Pages/Auth/ForgotPass/NewPass'
import PageNotFound from './Pages/PagenotFound'

export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/forgetPass/email" element={<ForgetPassEmail/>}/><Route path="/forgetPass/newpass" element={<ForgetPassNewpass/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
