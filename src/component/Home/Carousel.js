import React from "react";
import Slider from "react-slick";
import { FaBitcoin, FaLock, FaUsers, FaChartLine, FaRegStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CryptoMarketToday from "./CryptoMarketToday";

const Carousel = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0px",
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
      icon: <FaBitcoin className="text-5xl text-yellow-400" />,
      title: "Crypto Investment",
      description: "Earn passive income by investing in top-performing cryptocurrencies.",
    },
    {
      icon: <FaLock className="text-5xl text-blue-500" />,
      title: "Secure Wallet",
      description: "Your assets are protected with cutting-edge encryption technology.",
    },
    {
      icon: <FaUsers className="text-5xl text-green-500" />,
      title: "Global Community",
      description: "Join a network of over 30 million users worldwide.",
    },
    {
      icon: <FaChartLine className="text-5xl text-red-400" />,
      title: "Advanced Analytics",
      description: "Make informed decisions with real-time data and market trends.",
    },
    {
      icon: <FaRegStar className="text-5xl text-purple-400" />,
      title: "Trusted Platform",
      description: "Ranked as the #1 crypto exchange by global investors.",
    },
  ];

  return (
    <>
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Why Choose Us
          </h2>
          <Slider {...settings}>
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 text-center shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
              >
                <div className="mb-4 p-4 bg-yellow-700 rounded-full inline-block">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
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
