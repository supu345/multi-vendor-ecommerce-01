import axios from "axios";
const api = axios.create({
  // baseURL: "http://localhost:5000/api",

  baseURL: "https://ecom-shop-api.onrender.com/api",
  withCredentials: true,
});
export default api;
