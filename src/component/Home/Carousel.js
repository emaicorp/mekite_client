import React from "react";
import Slider from "react-slick";
import { FaBitcoin, FaLock, FaUsers, FaChartLine, FaRegStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CryptoMarketToday from "./CryptoMarketToday"

const Carousel = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable continuous movement
    autoplaySpeed: 3000, // Time interval for auto-sliding
    centerMode: true, // Centers the active slide
    centerPadding: "0px", // Removes padding around centered slide
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Data for carousel items
  const carouselItems = [
    {
      icon: <FaBitcoin className="text-4xl text-yellow-400" />,
      title: "Crypto Investment",
      description: "Earn passive income by investing in top-performing cryptocurrencies.",
    },
    {
      icon: <FaLock className="text-4xl text-blue-500" />,
      title: "Secure Wallet",
      description: "Your assets are protected with cutting-edge encryption technology.",
    },
    {
      icon: <FaUsers className="text-4xl text-green-500" />,
      title: "Global Community",
      description: "Join a network of over 30 million users worldwide.",
    },
    {
      icon: <FaChartLine className="text-4xl text-red-400" />,
      title: "Advanced Analytics",
      description: "Make informed decisions with real-time data and market trends.",
    },
    {
      icon: <FaRegStar className="text-4xl text-purple-400" />,
      title: "Trusted Platform",
      description: "Ranked as the #1 crypto exchange by global investors.",
    },
  ];

  return (
    <>
        <section className="bg-gradient-to-r from-black via-green-700 to-black py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Why Choose Us
        </h2>
        <Slider {...settings}>
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-md p-4 text-center shadow-md hover:scale-105 transition-transform"
            >
              <div className="mb-2">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>

    <CryptoMarketToday />
    </>
  );
};

export default Carousel;
