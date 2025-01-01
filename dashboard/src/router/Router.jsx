import { useRoutes } from "react-router-dom";

const Router = ({ allRoutes }) => {
  const routes = useRoutes(allRoutes);
  return routes || null; // Return null if no routes are matched
};

export default Router;
