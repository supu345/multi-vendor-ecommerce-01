import React from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Slider from "../components/slider";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import { useDispatch, useSelector } from "react-redux";
import { get_category, get_products } from "../store/reducers/homeReducer";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const {
    categorys,
    products,
    latest_product,
    topRated_product,
    discount_product,
    status,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_category());
    dispatch(get_products());
  }, [dispatch]);
  return (
    <div className="w-full">
      <Headers categorys={categorys} />
      {/* <Banner /> */}
      <Slider />
      <div className="my-4">
        <Categorys categorys={categorys} />
      </div>

      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-3 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Product" products={latest_product} />
            </div>
            <div className="overflow-hidden">
              <Products title="Top Rated Product" products={topRated_product} />
            </div>
            <div className="overflow-hidden">
              <Products title="Discount Product" products={discount_product} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
