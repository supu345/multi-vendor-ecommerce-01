import Details from "./pages/Details";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shops from "./pages/Shops";
import { useDispatch } from "react-redux";
import { get_category } from "./store/reducers/homeReducer";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Card from "./pages/Card";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import CategoryShops from "./pages/CategoryShop";
import Chat from "./components/dashboard/Chat";
import SearchProducts from "./pages/SearchProducts";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shipping from "./pages/Shipping";
import Orders from "./components/dashboard/Orders";
import Wishlist from "./components/dashboard/Wishlist";
import Order from "./components/dashboard/Order";
import ChangePassword from "./components/dashboard/ChangePassword";
import Index from "./components/dashboard/Index";
import Payment from "./pages/Payment";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_category());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/details/:slug" element={<Details />} />
        <Route path="/products?" element={<CategoryShops />} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="order/details/:orderId" element={<Order />} />
            <Route path="chage-password" element={<ChangePassword />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
