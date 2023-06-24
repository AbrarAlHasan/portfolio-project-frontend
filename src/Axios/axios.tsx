import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
const BASEURL = "http://localhost:8000";
export default axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});
export const axiosPrivate = axios.create({
  baseURL: BASEURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
