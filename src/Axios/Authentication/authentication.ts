import axios, { axiosPrivate } from "../axios";
import {
  loginType,
  registerType,
  verifyEmailType,
} from "./authenticationInterface";

export const registerUser = async (data: registerType) => {
  const response = await axios.post("/register", data);
  return response;
};

export const verifyOTP = async (data: verifyEmailType) => {
  const response = await axios.post("/verifyOTP", data);
  return response;
};

export const loginUser = async ({ email, password }: loginType) => {
  const data = { email, password };
  const response = await axios.post("login", data, { withCredentials: true });
  return response;
};
export const getAllUsers = async () => {
  const data = await axiosPrivate.get("/users");
  return data;
};

export const logout = async () => {
  const data = await axios.post("/logout");
  return data;
};

export const verifyRefreshToken = async () => {
  const data = await axios.get("/refreshToken");
};
