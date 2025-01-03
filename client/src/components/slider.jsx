import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Hero1 from "../assets/hero4.jpg";
import Hero2 from "../assets/hero7.jpg";
import Hero3 from "../assets/hero3.jpg";
import Hero5 from "../assets/hero5.jpg";
import Hero6 from "../assets/hero6.jpg";
const sliderItems = [
  {
    image: Hero1,
    title:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
    desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
  },
  {
    image: Hero2,
    title:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
    desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
  },
  {
    image: Hero3,
    title:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
    desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
  },
  {
    image: Hero5,
    title:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
    desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
  },
  {
    image: Hero6,
    title:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
    desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Seesse quos praesentium, dolores maxime nisi adipisci earum",
  },
];

const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % sliderItems.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + sliderItems.length) % sliderItems.length
    );
  };

  useEffect(() => {
    if (sliderItems.length > 0) {
      const interval = setInterval(() => {
        nextImage();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentImage]);

  return (
    <div className="w-[85%] lg:w-[90%] mx-auto">
      <div className="container  px-2 rounded mt-4">
        <div className="relative h-[500px] md:h-[600px] w-full bg-slate-300 overflow-hidden z-10">
          <div className="absolute z-10 top-1/2 transform -translate-y-1/2 flex w-full justify-between px-4">
            <button
              onClick={prevImage}
              className="bg-white shadow-md rounded-full p-1 text-2xl"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1 text-2xl"
            >
              <FaAngleRight />
            </button>
          </div>
          <div
            className="flex h-full w-full transition-transform duration-1000"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {sliderItems.map((item, i) => (
              <div className="relative w-full h-full flex-shrink-0" key={i}>
                <img
                  src={item.image}
                  alt="ing"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute z-20 bottom-4 left-9 top-20 md:left-8 bg-opacity-0 text-black p-4 rounded flex flex-col items-start">
                  <div className="w-1/2 flex  mt-4">
                    <Link
                      to=""
                      className="text-white text-sm bg-green-700 rounded-md p-2 mb-2 inline-block"
                    >
                      From $1.5
                    </Link>
                  </div>
                  <div className="">
                    <h2 className="text-3xl md:text-3xl w-1/2 text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 w-1/2 text-sm text-white">{item.desc}</p>
                  </div>
                  <div className="w-1/2 flex  mt-4">
                    <Link
                      to=""
                      className="text-white text-xl bg-orange-400 rounded-md p-2  inline-block"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
