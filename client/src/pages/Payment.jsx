import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import Stripe from "../components/Stripe";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  // Destructure safely with fallback values
  const { price = 0, items = 0, orderId = "" } = location.state || {};

  useEffect(() => {
    // Redirect if state is null or undefined
    if (!location.state) {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <div>
      <Headers />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4">
          <div className="flex flex-wrap ">
            <div className="w-7/12 ">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  {/* Payment Method Selection */}
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:5173/images/payment/stripe.png"
                        alt="stripe"
                      />
                      <span className="text-slate-600">Stripe</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("bkash")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "bkash" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:5173/images/payment/bkash.png"
                        alt="bkash"
                      />
                      <span className="text-slate-600">Bkash</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("nogot")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "nogot" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:5173/images/payment/nogot.png"
                        alt="nogot"
                      />
                      <span className="text-slate-600">Nogot</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("roket")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "roket" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:5173/images/payment/roket.png"
                        alt="roket"
                      />
                      <span className="text-slate-600">Roket</span>
                    </div>
                  </div>
                </div>
                {/* Payment Content */}
                {paymentMethod === "stripe" && (
                  <div>
                    <Stripe orderId={orderId} price={price} />
                  </div>
                )}
                {paymentMethod === "bkash" && (
                  <div className="w-full px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white">
                      Pay Now
                    </button>
                  </div>
                )}
                {paymentMethod === "nogot" && (
                  <div className="w-full px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white">
                      Pay Now
                    </button>
                  </div>
                )}
                {paymentMethod === "roket" && (
                  <div className="w-full px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white">
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-5/12 ">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                  <h2>Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>{items} items and shipping fee included</span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount</span>
                    <span className="text-lg text-orange-500">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;
