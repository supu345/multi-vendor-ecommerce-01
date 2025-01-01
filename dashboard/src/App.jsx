import { useEffect, useState } from "react";
import publicRoutes from "./router/routes/publicRoutes";
import Router from "./router/Router";
import { getRoutes } from "./router/routes";
function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);
  return <Router allRoutes={allRoutes} />;
}

export default App;
