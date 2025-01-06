import React from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
const Contact = () => {
  return (
    <div>
      <Headers />
      <div className="w-full bg-white">
        <div className="w-[85%] lg:w-[90%] ">
          <div className=" ml-[200px] mt-4">
            <img
              src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?t=st=1736141089~exp=1736144689~hmac=71c00d50cf7d09b5c62e6739890617fd26106b41f42b4da0e68b6733e8448c53&w=900"
              alt="image"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
