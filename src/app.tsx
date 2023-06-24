import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./Router/Router";
import AuthProvider from "./Context/AuthContext/AuthContext";
export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
