import { lazy } from "react";

const Home = lazy(() => import("../../views/Home"));
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const publicRoutes = [
  {
    path: "/",
    element: <Home />, // JSX format
  },
  {
    path: "/login",
    element: <Login />, // JSX format
  },
  {
    path: "/register",
    element: <Register />, // JSX format
  },
  {
    path: "/admin/login",
    element: <AdminLogin />, // JSX format
  },
];

export default publicRoutes;
