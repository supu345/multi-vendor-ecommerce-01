import MainLayout from "../../layout/MainLayout";
import { privateRoutes } from "./privateRoutes";

export const getRoutes = () => ({
  path: "/",
  element: <MainLayout />,
  children: privateRoutes,
});
