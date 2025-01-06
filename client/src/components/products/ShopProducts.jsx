import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Ratings from "../Ratings";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import {
//   add_to_card,
//   messageClear,
//   add_to_wishlist,
// } from "../../store/reducers/cardReducer";

const ShopProducts = ({ styles, products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.auth);
  // const { successMessage, errorMessage } = useSelector((state) => state.card);

  // const add_card = (id) => {
  //   if (userInfo) {
  //     dispatch(
  //       add_to_card({
  //         userId: userInfo.id,
  //         quantity: 1,
  //         productId: id,
  //       })
  //     );
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   if (successMessage) {
  //     toast.success(successMessage);
  //     dispatch(messageClear());
  //   }
  //   if (errorMessage) {
  //     toast.error(errorMessage);
  //     dispatch(messageClear());
  //   }
  // }, [errorMessage, successMessage]);

  // const add_wishlist = (pro) => {
  //   dispatch(
  //     add_to_wishlist({
  //       userId: userInfo.id,
  //       productId: pro._id,
  //       name: pro.name,
  //       price: pro.price,
  //       image: pro.images[0],
  //       discount: pro.discount,
  //       rating: pro.rating,
  //       slug: pro.slug,
  //     })
  //   );
  // };

  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-3"
      } gap-6`}
    >
      {products?.length ? (
        products.map((p) => (
          <div
            key={p.id}
            className={`flex flex-col justify-start items-center w-full bg-white p-3 rounded-md shadow-md hover:shadow-lg transition-all`}
          >
            {/* Image Section */}
            <div className="w-full relative group h-[210px] md:h-[270px] overflow-hidden">
              <img
                className="h-full rounded-md w-full object-cover"
                src={p.images[0]}
                alt="Product Image"
              />
              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                <li
                  //onClick={() => add_wishlist(p)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiFillHeart />
                </li>
                <Link
                  to={`/product/details/${p.slug}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaEye />
                </Link>
                <li
                  //onClick={() => add_card(p._id)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiOutlineShoppingCart />
                </li>
              </ul>
            </div>

            {/* Product Details Section */}
            <div className="mt-4 text-center">
              <h2 className="text-md text-slate-700 font-medium">{p.name}</h2>
              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="text-md font-bold text-slate-700">
                  ${p.price}
                </span>
                <div className="flex text-lg">
                  <Ratings ratings={p.rating} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ShopProducts;
